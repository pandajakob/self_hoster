import { useState } from "react";
import "./App.css";
import { Auth } from "./components/auth";
import { FileUploader } from "./components/fileUploader";


function App() {
  type User = {id:string, name: string, email:string, password:string}
  const [user, setUser] = useState<User | null>(null);
  console.log(user);

  const updateUser = (usr: any) => {
    setUser(usr);
  };
  return (
    <main>

      {!user ? <Auth onSetUser={updateUser} /> : <h1>Front Page</h1>}
      
      <FileUploader />


    </main>
  );
}

export default App;
