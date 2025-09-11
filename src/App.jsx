import {BrowserRouter, Routes, Route} from "react-router-dom";
import Dashboard from "./Pages/dashboard";
import InputPage from "./Pages/inputCropAdvisory";
import OutputPage from "./Pages/outputCropAdvisory";
import InputYieldPage from "./Pages/inputYieldProduction";
import Disease from "./Pages/cropDisease";
import Community from "./Pages/communityPage";

export default function App(){

  return <div>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard/>}/>
        <Route path="/input" element={<InputPage/>}/>
        <Route path="/output" element={<OutputPage/>}/>
        <Route path="/input-yield" element={<InputYieldPage/>}/>
        <Route path="/disease-analysis" element={<Disease/>}/>
        <Route path="/community" element={<Community/>}/>
      </Routes>
    </BrowserRouter>
  </div>
}