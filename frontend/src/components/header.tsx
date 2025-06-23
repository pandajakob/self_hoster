export function Header() {
  return (
    <div className="header">
      <a href="#default" className="logo">
        CompanyLogo
      </a>
      <div className="header-right">
        <a className="active" href="#home">
          Home
        </a>

        <a> Login</a>
        <a
          onClick={() => {
            fetch("/users/logout", {method: "POST"});
          }}
        >
          {" "}
          Logout
        </a>
      </div>
    </div>
  );
}
