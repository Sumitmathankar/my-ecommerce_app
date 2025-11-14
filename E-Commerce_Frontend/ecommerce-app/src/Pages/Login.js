import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
   debugger;
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://localhost:7193/api/auth/login", {
        email,
        password,
      });
      
       const user = response.data;
      // Save JWT token to localStorage
      localStorage.setItem("token", response.data.token);
       
      // Save user info for displaying name in navbar
    localStorage.setItem("user", JSON.stringify(user));
      // Redirect to dashboard (or wherever)
      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

   return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-2xl rounded-3xl p-8 sm:p-10 border border-gray-200">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 text-center text-blue-700 drop-shadow-md">
            Login
          </h2>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-gray-50"
                required
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-gray-50"
                required
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold text-lg hover:bg-blue-700 transition shadow-md"
            >
              Login
            </button>
          </form>

          <div className="mt-4">
            <button
              onClick={() => navigate("/register")}
              className="w-full bg-gradient-to-r from-purple-500 to-blue-500 text-white py-3 rounded-xl font-bold text-lg hover:from-purple-600 hover:to-blue-600 transition shadow-md"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;

