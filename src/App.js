import { Routes, Route } from "react-router";
import "./App.css";
import Hospital from "./pages/Hospital";
import Patients from "./pages/Patients";
import Wards from "./pages/Wards";
import Navigation from "./Components/Navigation";
function App() {
  return (
    <div className="App">
      <Navigation></Navigation>
      <Routes>
        <Route path="/" element={<Patients />}></Route>
        <Route path="/Wards" element={<Wards />}></Route>
        <Route path="/Hospital" element={<Hospital />}></Route>
      </Routes>
    </div>
  );
}

export default App;
