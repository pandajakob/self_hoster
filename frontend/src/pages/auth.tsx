import App from "../App";

export function Auth() {
  let loggedIn: Boolean = false;
  let haveAccount: Boolean = false;
  if (loggedIn) {
    return <h1> Already logged in</h1>
  }
  
  if (!haveAccount) {
    return (
      <div className="App">
        <header className="App-header">
          <h1> Register </h1>
          <form action="/users/create" method="post">
            <label htmlFor="name"> Full name: </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Full name"
              required
              autoFocus
            ></input>

            <label htmlFor="email"> Email: </label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email..."
              required
            ></input>

            <label htmlFor="password"> Password: </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="*************"
              required
            ></input>
            <input type="submit" value="Submit" />
          </form>
          <small>
            {" "}
            Already logged in? <a>login here</a>
          </small>
        </header>
      </div>
    );
  } else {
    return (
      <div className="App">
        <header className="App-header">
          <h1> Login </h1>
          <form method="GET" action="users/login">
            <label htmlFor="email"> Email: </label>
            <input
              type="email"
              name="email"
              id="emailInput"
              placeholder="Email..."
              required
            ></input>
            <label htmlFor="password"> Password: </label>
            <input
              type="password"
              name="password"
              id="passwordInput"
              placeholder="*************"
              required
            ></input>
            <button type="submit"> Login </button>
          </form>
        </header>
      </div>
    );
  }
}
