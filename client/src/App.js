import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import OurStory from "./pages/OurStory";
import HowWeWork from "./pages/HowWeWork";
import FAQs from "./pages/FAQs";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Volunteer from "./pages/Volunteer";
import NgoPartner from "./pages/NgoPartner";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/how-we-work" element={<HowWeWork />} />
        <Route path="/faqs" element={<FAQs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/volunteer" element={<Volunteer />} />
        <Route path="/ngo-partner" element={<NgoPartner />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;