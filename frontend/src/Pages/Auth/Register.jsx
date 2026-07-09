import React, { useState } from "react";
import { CiLock, CiMail } from "react-icons/ci";
import { RiAdminFill } from "react-icons/ri";
import Button from "../../Components/Common/Button";
import useRegister from "../../hooks/useRegister";
import useUser from "@/hooks/useUser";
import { Link, Navigate } from "react-router";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const registerMutation = useRegister();
  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
    error: userError,
  } = useUser();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (registerMutation.isPending) {
      return;
    }

    if (!formData.username || !formData.email || !formData.password) {
      alert("Please fill in all fields.");
      return;
    }

    registerMutation.mutate(formData);

    if (registerMutation.isSuccess) {
      setFormData({
        username: "",
        email: "",
        password: "",
      });
    }
  };

  if (user?.data) {
    return <Navigate to="/dashboard" replace />;
  }

  return (
    <main className="w-full h-screen flex justify-center items-center pb-4">
      <form
        className="w-full max-w-160 p-8 border border-blue-500/10 bg-blue-500/3 rounded-2xl shadow-[0_0px_10px_rgba(0,0,0,0.05)]"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-semibold text-zinc-800 mb-6 flex gap-2 items-center">
          <RiAdminFill className="text-4xl text-blue-500" />
          Register
        </h1>

        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="username" className="text-lg">
            Username
          </label>
          <div className="h-16 md:w-160 max-w-full p-2 rounded-xl border-2 border-zinc-200 flex justify-between items-center focus-within:border-blue-500 duration-200">
            <CiMail className="text-2xl text-blue-500" />
            <input
              placeholder="Enter your username"
              className="w-full h-full outline-0 border-0 px-4 text-xl"
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="email" className="text-lg">
            Email
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
              required
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
              required
            />
          </div>
        </div>

        {registerMutation.isError && (
          <p className="mt-2 text-sm text-red-500">
            {registerMutation.error?.response?.data?.message ||
              registerMutation.error?.message ||
              "An error occurred. Please try again."}
          </p>
        )}

        <Button
          isPrimary={true}
          className="w-full mt-4"
          disabled={registerMutation.isPending}
        >
          {registerMutation.isPending ? "Registering..." : "Register"}
        </Button>

        <Link
          to="/login"
          replace
          className="text-blue-500 text-sm mt-4 block text-center hover:underline"
        >
          Already have an account? Login
        </Link>
      </form>
    </main>
  );
}

export default Register;
