import { useState } from "react";
import "./App.css";
import { useEffect } from "react";
import axios from "axios";
import Input from "./components/Input";
import Button from "./components/Button";

function App() {
  const [api, setApi] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("/api/hello");
      setApi(response.data);
    };
    fetchData();
  }, []);
  return (
    <>
      <div>Hello</div>
      <div>{api}</div>
      <Input label="API Response " value={api} readOnly />
      <Button onClick={() => alert("Button Clicked!")}>Click Me</Button>
    </>
  );
}

export default App;
