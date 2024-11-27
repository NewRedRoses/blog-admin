function Login() {
  return (
    <>
      <div className="content">
        <form action="/" method="post" className="login-page">
          <div className="email-section">
            <label htmlFor="email">Email</label>
            <input type="email" name="email" id="email" />
          </div>
          <div className="password-section">
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" />
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
