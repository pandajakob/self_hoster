import { useState } from "react";
import "./App.css";
import { Auth } from "./pages/auth";

function App() {
  const [user, setUser] = useState(null);

  const updateUser = (usr:any) => {
    setUser(usr);
  }
  if (!user) {
    return <Auth setUser={updateUser}/>
  } else {
    return <h1>Front Page</h1>;
  }
}

export default App;
