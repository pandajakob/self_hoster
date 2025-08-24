import { useEffect, useState } from "react";
import "./App.css";
import { FileUploader } from "./components/fileUploader";
import { Login } from "./components/login";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { Profile } from "./components/profile";
import { getUserInfo } from "./scripts/apiFunctions";
import { Loader } from "./components/loader";

interface File {
  name: string;
  dateCreated: string;
  size: number;
}
function App() {

  const [userLoggedIn, setUserLoggedIn] = useState<boolean>(false); // {id: "", name: "", email: "", password: ""}
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [page, setPage] = useState<String>("DEFAULT")

  const updateUserLoggedIn = (usr: any) => {
    setUserLoggedIn(usr);
  };

  const updatePage = (page: string) => {
    setPage(page);
  };

  useEffect(()=>{
    setIsLoading(true);
    getUserInfo().then((res)=>{setUserLoggedIn(res ? true : false)}).finally(()=>{setIsLoading(false)})
  },[])

  return (
    <main>
      <Header userLoggedIn={userLoggedIn} onSetUserLoggedIn={updateUserLoggedIn} onUpdatePage={updatePage}/>
      {!userLoggedIn ? (
        <Login onSetUserLoggedIn={updateUserLoggedIn} />
      ) : (
        <div className="container">

          {isLoading ? <Loader/> : <div/>}
          
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
