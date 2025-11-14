import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
  e.preventDefault();
debugger;
  if (password !== confirmPassword) {
    setError("Passwords do not match!");
    return;
  }

  try {
    const response = await fetch("http://localhost:5116/api/auth/register", {
      method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({
    FullName: name,        // match DTO
    Email: email,
    Password: password,
    PhoneNumber: phone     // optional
      }),
    });

    if (response.status === 409) {
      setError("User already exists. Please login.");
    } else if (!response.ok) {
      const res = await response.json();
      setError(res.message || "Registration failed");
    } else {
      const registeredUser = await response.json();
      console.log("Registered user:", registeredUser);

      if (registeredUser.token) {
        localStorage.setItem("token", registeredUser.token);
      }

      setSuccess(`Welcome, ${registeredUser.name}! Registration successful.`);
      setError("");
      setTimeout(() => navigate("/dashboard"), 2000);
    }
  } catch (err) {
    setError("Server error. Please try again later.");
    console.error(err);
  }
};

    

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200 px-4">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-2xl rounded-3xl p-8 sm:p-10 border border-gray-200">
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-6 text-center text-blue-700">
            Register
          </h2>

          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          {success && <p className="text-green-600 text-center mb-4">{success}</p>}

          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <label className="block mb-1 font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-gray-50"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-gray-50"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-gray-50"
                placeholder="Enter password"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Confirm Password</label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-gray-50"
                placeholder="Confirm password"
              />
            </div>

            <div>
              <label className="block mb-1 font-medium text-gray-700">Phone (optional)</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition bg-gray-50"
                placeholder="Enter phone number"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition mt-2"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
