import {BrowserRouter, Routes, Route} from "react-router-dom";
import Dashboard from "./Pages/dashboard";
import InputPage from "./Pages/inputCropAdvisory";
import OutputPage from "./Pages/outputCropAdvisory";
import InputYieldPage from "./Pages/inputYieldProduction";
import Disease from "./Pages/cropDisease";

export default function App(){

  return <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/input" element={<InputPage/>}/>
        <Route path="/output" element={<OutputPage/>}/>
        <Route path="/input-yield" element={<InputYieldPage/>}/>
        <Route path="/disease-analysis" element={<Disease/>}/>
      </Routes>
    </BrowserRouter>
  </div>
}