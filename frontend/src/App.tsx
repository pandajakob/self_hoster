import { useState } from "react";
import "./App.css";
import { FileUploader } from "./components/fileUploader";
import { Login } from "./components/login";
import { Header } from "./components/header";
import { Footer } from "./components/footer";

function App() {
  type User = { id: string; name: string; email: string; password: string };
  const [user, setUser] = useState<User | null>(null); // {id: "", name: "", email: "", password: ""}

  const updateUser = (usr: any) => {
    setUser(usr);
  };
  return (
    <main>
      <Header/>
      
      {!user ? (
        <Login onSetUser={updateUser} />
      ) : (
        <div className="container">
          <h1> Upload files: </h1>
          <FileUploader />
        </div>
      )}
      <Footer/>
    </main>
  );
}

export default App;
