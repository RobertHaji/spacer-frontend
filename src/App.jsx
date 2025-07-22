import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import Login from "./Login";
import SignUp from "./SignUp";
import Category from "./Category";
import Home from "./Home"; // <-- Add a Home component for "/"
import Footer from "./Footer"; // Optional but good for layout

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} /> {/* Homepage route */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/category" element={<Category />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
