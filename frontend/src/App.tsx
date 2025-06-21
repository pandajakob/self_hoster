import { useState } from "react";
import "./App.css";
import { Auth } from "./components/auth";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { FileUploader } from "./components/fileUploader";

function App() {
  const [user, setUser] = useState<Object | null>(null);
  console.log(user);

  const updateUser = (usr: any) => {
    setUser(usr);
  };
  return (
    <div>
      <Header />
      {!user ? <Auth setUser={updateUser} /> : <h1>Front Page</h1>}

      <FileUploader />

      <Footer />
    </div>
  );
}

export default App;
