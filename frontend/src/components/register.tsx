import { FormEvent, useState } from "react";
import { Loader } from "./loader";
import { AuthProps } from "../types/interfaces";

export function Register({onSetUserLoggedIn}:AuthProps) {
  const [isLoading, setLoading] = useState(false);

  // user data:
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function register(e: FormEvent<HTMLFormElement>) {
    setLoading(true);
    const user = { name, email, password };
    try {
      let response = await fetch("/users/register/", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      if (!response.ok) {
        console.log("error", response.statusText);
      }
      let data = await response.json();

      console.log("data",data);

      onSetUserLoggedIn(true);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  
  if (isLoading) {
    return <Loader/>;
  }

  return (
    <div className="container">
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
            placeholder="Password..."
            required
          ></input>
          <input type="submit" value="Submit" />
        </form>
        <small>
          Already logged in? <a href="/">login here</a>
        </small>
    </div>
  );
}
