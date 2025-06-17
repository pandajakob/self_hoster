import { useState } from "react";

export function Auth(setUser: any) {

  const [isLoading, setLoading] = useState(false);  
  const [haveAccount, setHaveAccount] = useState("");
  
  // user data:
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function register(e: any) {
    setLoading(true)
    e.preventDefault();
    const user = { name, email, password };
    try {
      let response = await fetch("/users/create/", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        console.log("error");
      }
      let data = await response.json();
      console.log(data)
      setUser(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  if (isLoading) {
    return <h1> loading...</h1>
  }

  if (haveAccount) {
    return <p> U already have account</p>;
  } else {
    return (
      <div className="App">
        <header className="App-header">
          <h1> Register </h1>
          <form onSubmit={register}>
            <label htmlFor="name"> Full name: </label>
            <input
              type="text"
              name="name"
              id="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              placeholder="Full name"
              required
              autoFocus
            ></input>

            <label htmlFor="email"> Email: </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              id="email"
              placeholder="Email..."
              required
            ></input>

            <label htmlFor="password"> Password: </label>
            <input
              type="password"
              name="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
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
  }
}
