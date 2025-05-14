import React, { useState } from 'react';
import axios from 'axios';
import { Inertia } from '@inertiajs/inertia';  // Import Inertia

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/login', {
        email,
        password,
        remember: rememberMe,
      });

      // If login is successful, clear errors and redirect to dashboard
      setErrors({});
      Inertia.visit('/dashboard');  // Inertia navigation to the dashboard
    } catch (error) {
      if (error.response && error.response.data.errors) {
        setErrors(error.response.data.errors);
      } else {
        setErrors({ general: 'Login failed. Please try again.' });
      }
    }
  };

  return (
    <div className="min-h-screen flex">
      <div
        className="w-1/2 bg-cover bg-center relative hidden md:block"
        style={{ backgroundImage: 'url("/images/Ajmera.jpg")' }}
      >
        <div className="absolute bottom-6 left-6 text-white">
          <h1 className="text-2xl font-bold">Welcome to Fidelis Technology Services Pvt Ltd</h1>
          <p className="text-sm">Your trusted technology partner</p>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="mb-6 text-center">
            <img src="/images/logo.png" alt="Fidelis" className="h-12 mx-auto mb-2" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {errors.general && (
              <p className="text-sm text-red-600">{errors.general}</p>
            )}

            <div>
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <input
                id="email"
                type="email"
                className="w-full mt-1 px-4 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />
              {errors.email && (
                <p className="text-sm text-red-600 mt-1">{errors.email}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              <input
                id="password"
                type="password"
                className="w-full mt-1 px-4 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {errors.password && (
                <p className="text-sm text-red-600 mt-1">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center justify-between text-sm">
              <label htmlFor="remember_me" className="flex items-center">
                <input
                  id="remember_me"
                  type="checkbox"
                  className="mr-2"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
              </label>
              <a href="/forgot-password" className="text-blue-600 hover:underline">
                Forgot your password?
              </a>
            </div>

            <div className="pt-4 flex gap-4">
              <button
                type="submit"
                className="w-full py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-black transition"
              >
                LOG IN
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
