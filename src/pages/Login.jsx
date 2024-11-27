import "../styles/login.css";
function Login() {
  return (
    <>
      <div className="content">
        <div className="login-card">
          <h1>Log In</h1>
          <form action="/" method="post" className="login-form">
            <div className="email-section">
              <label htmlFor="email">Email</label>
              <input type="email" name="email" id="email" />
            </div>
            <div className="password-section">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" id="password" />
            </div>
            <button type="submit" className="login-btn">
              Log In
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
