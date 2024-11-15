"use client";
import { useState } from "react";
import Navbar from "@/components/navBar";

export default function SignIn() {
  const [rollNo, setRollNo] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch("/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ rollNo, password }),
    });

    const res = await response.json();
    if (response?.error) {
      setError(response.error);
    }

    if (response.ok) {
      window.location.href = "/";
    } else {
      setError(res.errMsg);
    }
  };

  return (
    <div className="relative h-screen">
      <Navbar />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md">
        <h1 className="text-2xl md:text-3xl font-default font-bold text-neutral-900 dark:text-gray-100 mb-8 underline text-center">
          SIGN IN
        </h1>
        <div className="w-[80vw] md:w-[60vw] lg:w-[15vw] mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="small-input"
                className="block mb-2 font-bold dark:font-medium text-neutral-800 dark:text-gray-100 font-default"
              >
                Roll No
              </label>
              <input
                type="number"
                id="small-input"
                className="block w-full p-2 border rounded-lg bg-neutral-100/90 dark:bg-neutral-600/50 border-gray-500/60 dark:border-gray-500/25 placeholder-gray-400 text-neutral-900 dark:text-neutral-50 focus:ring-blue-500 focus:border-blue-500 font-default shadow-sm shadow-gray-400/25"
                min="1"
                name="rollNo"
                value={rollNo}
                onChange={(e) => setRollNo(e.target.value)}
                required
              />
            </div>
            <div className="mb-8 md:mb-6">
              <label
                htmlFor="password"
                className="block mb-2 font-bold dark:font-medium text-neutral-800 dark:text-gray-100 font-default"
              >
                Password
              </label>
              <input
                id="password"
                className="block w-full p-2 border rounded-lg bg-neutral-100/90 dark:bg-neutral-600/50 border-gray-500/60 dark:border-gray-500/25 placeholder-gray-400 text-neutral-900 dark:text-neutral-50 focus:ring-blue-500 focus:border-blue-500 font-default shadow-sm shadow-gray-400/25"
                name="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-8">
              {error && (
                <p className="font-bold dark:font-medium text-neutral-800 dark:text-gray-200 font-default text-sm text-center mb-3 text-shadow">
                  {error}
                </p>
              )}
              <button
                type="submit"
                className="w-full font-medium font-default text-white rounded-md py-2 bg-neutral-800 dark:bg-gray-200/25 backdrop-blur-lg shadow-sm shadow-gray-300/25 hover:bg-gray-800/80 dark:hover:bg-gray-400/25 hover:shadow hover:shadow-gray-500/25 transition ease-in-out"
              >
                Log In
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
