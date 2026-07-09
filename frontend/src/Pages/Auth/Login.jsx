import React, { useState } from "react";
import { CiLock, CiMail } from "react-icons/ci";
import { RiAdminFill } from "react-icons/ri";
import Button from "../../Components/Common/Button";
import useLogin from "../../hooks/useLogin";
import useUser from "@/hooks/useUser";
import { Link, Navigate } from "react-router";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const loginMutation = useLogin();
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

    if (loginMutation.isPending) {
      return;
    }

    if (!formData.email || !formData.password) {
      alert("Please fill in all fields.");
      return;
    }

    loginMutation.mutate(formData);

    if (loginMutation.isSuccess) {
      setFormData({
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
          Login
        </h1>

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

        {loginMutation.isError && (
          <p className="text-red-500 text-sm mb-4">
            {loginMutation.error.response?.data?.message ||
              "An error occurred."}
          </p>
        )}

        <Button isPrimary={true} className="w-full mt-4">
          Login
        </Button>

        <Link
          to="/register"
          replace
          className="text-blue-500 text-sm mt-4 block text-center hover:underline"
        >
          Don't have an account? Register
        </Link>
      </form>
    </main>
  );
}

export default Login;
