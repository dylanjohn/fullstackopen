// LoginForm.jsx
import PropTypes from 'prop-types';

const LoginForm = ({
  handleSubmit,
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
}) => {
  return (
    <div className="w-full max-w-md mx-auto rounded-xl border border-gray-200 shadow-sm p-6 space-y-4 bg-white">
      <form onSubmit={handleSubmit} className="flex-1 flex flex-col">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold">Welcome back!</h1>
          <p className="text-gray-500 mt-1">Log in to continue to your blog</p>
        </div>

        <div className="flex flex-col gap-2 [&>input]:mb-3">
          <label htmlFor="username" className="text-sm font-medium">
            Username
          </label>
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
            placeholder="Your Username"
            required
            className="px-3 py-2 border border-gray-200 rounded-md text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-800"
          />

          <div>
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
          </div>
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
            placeholder="Your password"
            required
            className="px-3 py-2 border border-gray-200 rounded-md text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-800"
          />

          <button
            id="login"
            type="submit"
            className="mt-4 w-full rounded-md bg-black text-white px-4 py-2 text-sm font-medium hover:bg-gray-800 cursor-pointer"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
};

export default LoginForm;
