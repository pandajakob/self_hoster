import { FormEvent, useState } from "react";
import { Loader } from "./loader";
import { Register } from "./register";
import { AuthProps } from "../types/interfaces";

export function Login({onSetUserLoggedIn}:AuthProps) {
  const [isLoading, setLoading] = useState(false);
  const [goToRegiser, setgoToRegiser] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errorText, setErrorText] = useState("");

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
        setErrorText(response.statusText)
        return;
      }
      onSetUserLoggedIn(true);
    } catch (error) {
      onSetUserLoggedIn(false)
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  if (goToRegiser) {
    return <Register onSetUserLoggedIn={onSetUserLoggedIn}/>
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
          <small style={{color: "red"}}> {errorText} </small>
        </form>
        <small>
          {" "}
          Dont have an account? <a className="contrast" style={{cursor: "pointer"}} onClick={()=>{setgoToRegiser(true);}}>Register here</a>
        </small>
      </section>
  );
}
