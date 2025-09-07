import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      await login(form);
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      toast.error(
        err?.message ||
          "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleInsertCredentials = () => {
    setForm({ email: "thebaljitsinghin@gmail.com", password: "11111111" });
  };


  return (
    <div className="h-full flex items-end justify-center">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Sign in to Admin Account
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Welcome back! Please enter your details.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter your email"
            />
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-400 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              placeholder="Enter your password"
            />
          </div>

          {/* Button */}
          <div>
            {loading && (
              <p className="text-xs text-gray-500 mb-2">
                First time it may take time to start backend...
              </p>
            )}
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center items-center gap-2 py-2 px-4 text-sm font-medium rounded-lg text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {loading ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 
                      5.373 0 12h4zm2 5.291A7.962 
                      7.962 0 014 12H0c0 3.042 
                      1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Signing in...
                </>
              ) : (
                <>
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 
                      4v1a3 3 0 01-3 3H6a3 3 
                      0 01-3-3V7a3 3 0 013-3h7a3 
                      3 0 013 3v1"
                    />
                  </svg>
                  Sign in
                </>
              )}
            </button>
          </div>
        </form>

        {/* Extra */}
        <div className="text-sm text-center text-gray-600">
          <p>
            Sign in with test credentials{" "}
            <span
              onClick={handleInsertCredentials}
              className="font-medium text-indigo-600 hover:text-indigo-500 cursor-pointer"
            >
              Click here
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
