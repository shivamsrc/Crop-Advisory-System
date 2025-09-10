import {BrowserRouter, Routes, Route} from "react-router-dom";
import Dashboard from "./Pages/dashboard";
import InputPage from "./Pages/inputCropAdvisory";
import OutputPage from "./Pages/outputCropAdvisory";
import InputYieldPage from "./Pages/inputYieldProduction";

export default function App(){

  return <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/input" element={<InputPage/>}/>
        <Route path="/output" element={<OutputPage/>}/>
        <Route path="/input-yield" element={<InputYieldPage/>}/>
      </Routes>
    </BrowserRouter>
  </div>
}