import { useState } from "react";
import "./App.css";
import { FileUploader } from "./components/fileUploader";
import { Login } from "./components/login";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { Profile } from "./components/profile";

function App() {

  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false); // {id: "", name: "", email: "", password: ""}

  const [page, setPage] = useState<String>("DEFAULT")


  const updateUserLoggedIn = (usr: any) => {
    setUserLoggedIn(usr);
  };

  const updatePage = (page: string) => {
    setPage(page);
  };
  return (
    <main>
      <Header userLoggedIn={userLoggedIn} onSetUserLoggedIn={updateUserLoggedIn} onUpdatePage={updatePage}/>
      {!userLoggedIn ? (
        <Login onSetUserLoggedIn={updateUserLoggedIn} />
      ) : (
        <div className="container">
          
          {page === "DEFAULT" ? 
          <FileUploader />: <div/>}
          
          {page === "PROFILE" ? 
          <Profile/> : <div/>}



        </div>
        
      )}
      <Footer/>
    </main>
  );
}

export default App;
