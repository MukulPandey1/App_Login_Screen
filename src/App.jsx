import React, { useState } from "react";

function App() {
  const [screen, setScreen] = useState("home"); // home | create | login | account
  const [history, setHistory] = useState([]); // to track previous screens
  const [profilePic, setProfilePic] = useState("https://i.pravatar.cc/100");


  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    password: "",
    company: "",
    isAgency: "no",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNavigate = (nextScreen) => {
    setHistory((prev) => [...prev, screen]); // push current screen to history
    setScreen(nextScreen);
  };

  const handleBack = () => {
    if (history.length > 0) {
      const prev = history[history.length - 1];
      setHistory((prevHistory) => prevHistory.slice(0, -1));
      setScreen(prev);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setHistory((prev) => [...prev, screen]);
    setScreen("account");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfilePic(imageUrl);
    }
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-[320px] h-[620px] bg-white shadow-lg rounded-xl p-6 relative">
        {/* Back Button */}
        {screen !== "home" && (
          <button
            onClick={handleBack}
            className="absolute top-3 left-3 text-gray-600 hover:text-black"
          >
            ← Back
          </button>
        )}

        {/* Landing Page */}
        {screen === "home" && (
          <div className="flex flex-col justify-end h-[550px] text-left">
            <h1 className="text-2xl font-bold mb-3">Welcome to PopX</h1>
            <p className="text-gray-600 mb-5">
              Create account with filling your details here. If already registered then login.
            </p>
            <button
              onClick={() => handleNavigate("create")}
              className="w-full bg-[#6c25ff] text-white py-2 rounded-lg mb-3"
            >
              Create Account
            </button>
            <button
              onClick={() => handleNavigate("login")}
              className="w-full bg-[#cebafb] py-2 rounded-lg"
            >
              Already Registered? Login
            </button>
          </div>
        )}

        {/* Create Account Form */}
        {screen === "create" && (
          <form onSubmit={handleSubmit} className="space-y-4 mt-8">
            <h2 className="text-xl font-semibold mb-2">Create Account</h2>

            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              required
            />
            <input
              type="text"
              name="company"
              placeholder="Company"
              value={formData.company}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
            />

            <div>
              <p className="text-gray-600 mb-1">Are you an agency?</p>
              <label className="mr-4">
                <input
                  type="radio"
                  name="isAgency"
                  value="yes"
                  checked={formData.isAgency === "yes"}
                  onChange={handleChange}
                />{" "}
                Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="isAgency"
                  value="no"
                  checked={formData.isAgency === "no"}
                  onChange={handleChange}
                />{" "}
                No
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-[#6c25ff] text-white py-2 rounded-lg my-20"
            >
              Create Account
            </button>
          </form>
        )}

        {/* Login Form */}
        {screen === "login" && (
          <form onSubmit={handleSubmit} className="space-y-4 mt-8">
            <h2 className="text-xl font-semibold mb-2">Login</h2>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded-lg px-3 py-2"
              required
            />
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
            >
              Login
            </button>
          </form>
        )}

        {/* Account Page */}
        {screen === "account" && (
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
            <div className="flex items-center mb-3">

              <div className="relative w-16 h-16 mr-3">
                <img
                  src={profilePic}
                  alt="profile"
                  className="w-16 h-16 rounded-full object-cover"
                />

                {/* Hidden file input */}
                <input
                  type="file"
                  accept="image/*"
                  id="profileUpload"
                  onChange={handleImageUpload}
                  className="hidden"
                />

                {/* Camera icon */}
                <label
                  htmlFor="profileUpload"
                  className="absolute bottom-0 right-0 bg-gray-800 p-1 rounded-full cursor-pointer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14m-6 0l-4.553 2.276A1 1 0 013 15.382V8.618a1 1 0 011.447-.894L9 10m6 4l-6-4 6-4"
                    />
                  </svg>
                </label>
              </div>


              <div>
                <p className="font-semibold">{formData.name}</p>
                <p className="text-gray-600">{formData.email}</p>
              </div>
            </div>
            <p className="text-gray-700">
             Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores, quod?
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
