import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { auth, signInWithEmailAndPassword } from '../firebase';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Please fill in all fields');
      setLoading(false);
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log("User logged in!", userCredential.user);
      navigate('/home');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gray-100">

      <div className="grid md:grid-cols-2 items-center gap-4 max-w-4xl w-full p-4 shadow-lg rounded-md bg-white">

        {/* LEFT SIDE - FORM */}
        <div className="md:max-w-md w-full px-4 py-4">
          <form onSubmit={handleLogin}>

            <div className="mb-12">
              <h1 className="text-slate-900 text-3xl font-bold">Sign in</h1>
              <p className="text-[15px] mt-6 text-slate-600">
                Don't have an account
                <Link to="/register" className="text-blue-600 font-medium hover:underline ml-1">
                  Register here
                </Link>
              </p>
            </div>

            {/* EMAIL */}
            <div>
              <label className="text-slate-900 text-[13px] font-medium block mb-2">Email</label>
              <input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                className="w-full text-sm text-slate-900 placeholder:text-slate-500 border border-slate-300 focus:border-blue-600 focus:outline-none py-3 px-2 rounded-md"
              />
            </div>

            {/* PASSWORD */}
            <div className="mt-8">
              <label className="text-slate-900 text-[13px] font-medium block mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="w-full text-sm text-slate-900 placeholder:text-slate-500 border border-slate-300 focus:border-blue-600 focus:outline-none py-3 px-2 rounded-md"
              />
            </div>

            {/* REMEMBER + FORGOT */}
            <div className="flex flex-wrap items-center justify-between gap-4 mt-8">
              <div className="flex items-center">
                <input type="checkbox" className="h-4 w-4 text-blue-600 border-slate-300" />
                <label className="ml-2 text-sm text-slate-900">Remember me</label>
              </div>
              <a href="#" className="text-blue-600 text-sm hover:underline">
                Forgot Password?
              </a>
            </div>

            {/* BUTTON */}
            <div className="mt-12">
              <button
                type="submit"
                disabled={loading}
                className={`w-full py-2.5 px-4 text-sm font-medium rounded-md text-white ${loading ? 'bg-gray-400' : 'bg-blue-600 hover:bg-blue-700'
                  }`}
              >
                {loading ? 'Logging in...' : 'Sign in'}
              </button>
            </div>

            {/* ERROR */}
            {error && (
              <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
            )}

            {/* OR */}
            <div className="my-6 flex items-center gap-4">
              <hr className="w-full border-slate-300" />
              <p className="text-sm text-slate-900">or</p>
              <hr className="w-full border-slate-300" />
            </div>

            {/* SOCIAL (optional UI only) */}
            <div className="flex justify-center gap-6">
              <button type="button">🌐</button>
              <button type="button">🍎</button>
              <button type="button">📘</button>
            </div>

          </form>
        </div>

        {/* RIGHT SIDE IMAGE */}
        <div className="w-full h-full min-h-[400px] flex items-center bg-[#000842] rounded-xl p-8">
          <img
            src="/login-image.png"
            alt="login"
            className="w-full object-contain"
          />
        </div>

      </div>
    </div>
  );
}

export default Login;
