import { useState } from "react";
import "./App.css";
import { FileUploader } from "./components/fileUploader";
import { Login } from "./components/login";
import { Header } from "./components/header";
import { Footer } from "./components/footer";

function App() {

  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(true); // {id: "", name: "", email: "", password: ""}

  const updateUserLoggedIn = (usr: any) => {
    setUserLoggedIn(usr);
  };
  return (
    <main>
      <Header/>
      {!userLoggedIn ? (
        <Login onSetUserLoggedIn={updateUserLoggedIn} />
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
