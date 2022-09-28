import "./App.css";
import { Auth } from "./pages/Auth/Auth";
import { SignUp } from "./pages/SignUp/SignUp";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ForgetPassword } from "./pages/ForgetPassword/ForgetPassword";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
