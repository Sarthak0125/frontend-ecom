import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { useEffect } from "react";
import axios from "axios";


function App() {
  const [api, setApi] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/api/hello");
      setApi(response.data);
    }
    fetchData();    
  }, []);
  return (
    <>
      <div>Hello</div>
      <div>{api}</div>
    </>
  );
}

export default App;
