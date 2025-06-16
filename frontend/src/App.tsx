import "./App.css";
import { Auth } from "./pages/auth";

function App() {
  let auth = null;
  
  if (!auth) {
    return Auth();
  } else {
    return <h1>Front Page</h1>;
  }
}

export default App;
