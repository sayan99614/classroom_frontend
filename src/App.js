import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MainComponent from "./MainComponent";
import StudentLogin from "./StudentLogin";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" exact element={<MainComponent />} />
        <Route path="/login" exact element={<StudentLogin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
