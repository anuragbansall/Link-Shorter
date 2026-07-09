import React, { useEffect, useState } from "react";
import Button from "../../Components/Common/Button";
import { IoSettingsOutline } from "react-icons/io5";
import { CiLock, CiUser } from "react-icons/ci";
import { CiMail } from "react-icons/ci";
import useUpdateUser from "../../hooks/useUpdateUser";
import useUser from "../../hooks/useUser";

function Settings() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const updateUserMutation = useUpdateUser();
  const { data: userData, isLoading, isError, error } = useUser();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.username) {
      alert("Username  cannot be empty.");
      return;
    }

    if (formData.password && formData.password.length < 6) {
      alert("Password must be at least 6 characters long.");
      return;
    }

    if (updateUserMutation.isPending) {
      return;
    }

    updateUserMutation.mutate(formData);
  };

  useEffect(() => {
    if (userData && userData.data) {
      setFormData({
        username: userData?.data?.username || "",
        email: userData?.data?.email || "",
        password: "", // Password is not fetched for security reasons
      });
    }
  }, [userData]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="w-full h-full flex justify-center items-center pb-4">
      <form
        className="w-full max-w-160 p-8 border border-blue-500/10 bg-blue-500/3 rounded-2xl shadow-[0_0px_10px_rgba(0,0,0,0.05)]"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-semibold text-zinc-800 mb-6 flex gap-2 items-center">
          <IoSettingsOutline className="text-4xl text-blue-500" />
          Profile Settings
        </h1>

        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="username" className="text-lg">
            Username
          </label>
          <div className="h-16 md:w-160 max-w-full p-2 rounded-xl border-2 border-zinc-200 flex justify-between items-center focus-within:border-blue-500 duration-200">
            <CiUser className="text-2xl text-blue-500" />
            <input
              placeholder="Enter your username"
              className="w-full h-full outline-0 border-0 px-4 text-xl"
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="email" className="text-lg">
            Email{" "}
            <span className="text-sm text-zinc-500">(cannot be changed)</span>
          </label>
          <div className="h-16 md:w-160 max-w-full p-2 rounded-xl border-2 border-zinc-200 flex justify-between items-center focus-within:border-blue-500 duration-200">
            <CiMail className="text-2xl text-blue-500" />
            <input
              placeholder="Enter your email"
              className="w-full h-full outline-0 border-0 px-4 text-xl"
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="password" className="text-lg">
            Password
          </label>
          <div className="h-16 md:w-160 max-w-full p-2 rounded-xl border-2 border-zinc-200 flex justify-between items-center focus-within:border-blue-500 duration-200">
            <CiLock className="text-2xl text-blue-500" />
            <input
              placeholder="Enter your password"
              className="w-full h-full outline-0 border-0 px-4 text-xl"
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
        </div>

        <Button
          isPrimary={true}
          className="w-full mt-4"
          disabled={updateUserMutation.isPending}
        >
          {updateUserMutation.isPending ? "Updating..." : "Update Profile"}
        </Button>
      </form>
    </main>
  );
}

export default Settings;
