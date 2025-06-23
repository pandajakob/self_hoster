import { FormEvent, useState } from "react";
import { Loader } from "./loader";
import { Register } from "./register";
// 1) Define the shape of your user object (as returned by your API)
interface User {
  name: string;
  email: string;
  // any other fields you return…
}
interface AuthProps {
  onSetUser: (user: User) => void;
}
export function Login({onSetUser}:AuthProps) {
  const [isLoading, setLoading] = useState(false);
  const [goToRegiser, setgoToRegiser] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login(e: FormEvent<HTMLFormElement>) {
    setLoading(true);
    const user = {email, password };
    try {
      let response = await fetch("/users/login/", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        console.log("error", response.statusText);
      }
      let data = await response.json();

      console.log("data",data);

      onSetUser(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  if (goToRegiser) {
    return <Register onSetUser={onSetUser}/>
  }
  
  if (isLoading) {
    return <Loader/>;
  }

  return (

      <section className="container">
        <h1> Login </h1>
        <form onSubmit={login}>
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
            placeholder="Password..."
            required
          ></input>
          <input type="submit" value="Submit" />
        </form>
        <small>
          {" "}
          Dont have an account? <a className="contrast" style={{cursor: "pointer"}} onClick={()=>{setgoToRegiser(true);}}>Register here</a>
        </small>
      </section>
  );
}
