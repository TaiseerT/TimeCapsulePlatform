export default function Login({ data, handleSubmit, setData }) {
  return (
    <>
      <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
        <div
          className="card shadow p-4"
          style={{ maxWidth: "400px", width: "100%" }}
        >
          <h3 className="text-center mb-4 text-primary">Welcome Back</h3>
          <p className="text-center text-muted mb-4">
            Log in to your account to continue exploring our services.
          </p>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address
              </label>
              <input
                value={data.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter your email"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                type="password"
                className="form-control"
                id="password"
                placeholder="Enter your password"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary w-100 mt-4">
              Login
            </button>
          </form>
          <p className="text-center mt-3">
            Don't have an account?{" "}
            <a
              href="/auth/register"
              className="text-primary text-decoration-none"
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
