import { useState, useEffect } from "react";
import { getAllStates, getDistricts } from "india-state-district";
import axios from "axios";
import { Sun, Sprout, CloudRain } from "lucide-react";
import { useNavigate } from "react-router-dom";
import cropData from "../atoms/crops.json";

export default function InputYieldPage() {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [season, setSeason] = useState("");
  const [annualRainfall, setAnnualRainfall] = useState("");
  const [crop, setCrop] = useState("");
  const [farmArea, setFarmArea] = useState("");
  const [fertilizers, setFertilizers] = useState("");
  const [pesticides, setPesticides] = useState("");

  const navigate = useNavigate();

  // Load states initially
  useEffect(() => {
    setStates(getAllStates());
  }, []);

  // Load districts when state changes
  useEffect(() => {
    if (selectedState) {
      setDistricts(getDistricts(selectedState));
    } else {
      setDistricts([]);
      setSelectedDistrict("");
    }
  }, [selectedState]);

  // Ask for location when district is selected
  useEffect(() => {
  if (!selectedDistrict) return;

  // Step 1: Ask for geolocation
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;

        try {
          const year = new Date().getFullYear() - 1; // last year
          const startDate = `${year}-01-01`;
          const endDate = `${year}-12-31`;

          const res = await axios.get(
            `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${startDate}&end_date=${endDate}&daily=precipitation_sum&timezone=Asia/Kolkata`
          );

          // Sum daily precipitation to get annual rainfall
          const dailyData = res.data.daily.precipitation_sum;
          const annual = dailyData.reduce((a, b) => a + b, 0);
          setAnnualRainfall(`${Math.round(annual)} mm`); // round to nearest mm
        } 
        catch (err) {
          console.error("Open-Meteo API error:", err);
        }
      },
      (error) => {
            setAnnualRainfall("not found")     
        }
    );
  }
}, [selectedDistrict]);


  return (
    <div className="bg-[url('/crop-bg-image.png')] h-screen w-screen bg-cover bg-center flex flex-col items-center justify-center px-4">
      {/* Card */}
      <div className="bg-white/95 backdrop-blur-md border border-gray-200 p-8 rounded-2xl shadow-lg max-w-3xl w-full">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
          Smart Crop Advisor
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Enter your farm details to get yield prediction
        </p>

        {/* Input Form */}
        <div className="space-y-5">
          {/* State & District */}
          <div className="grid grid-cols-2 gap-4">
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="p-3 rounded-lg border border-gray-300 w-full focus:ring focus:ring-green-200"
            >
              <option value="">-- Select State --</option>
              {states.map((st) => (
                <option key={st.code} value={st.code}>
                  {st.name}
                </option>
              ))}
            </select>

            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="p-3 rounded-lg border border-gray-300 w-full focus:ring focus:ring-green-200"
              disabled={!selectedState}
            >
              <option value="">-- Select District --</option>
              {districts.map((dist, idx) => (
                <option key={idx} value={dist}>
                  {dist}
                </option>
              ))}
            </select>
          </div>

          {/* Crop Name & Annual Rainfall*/}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col relative">
              <select
                value={crop}
                onChange={(e)=>setCrop(e.target.value)}
                className="p-3 rounded-lg border border-gray-300"
              >
                <option value="">-- Select Crop --</option>
                {cropData.crops.map((val, i)=>(
                    <option key={i} value={val}>
                        {val}
                    </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col relative">
              <span className="absolute -top-3 right-2 bg-white/30 backdrop-blur-md border border-white/40 rounded-full px-0.5 py-0.5 text-xs font-medium text-gray-800 whitespace-nowrap">rainfall</span>
              <input type="text" placeholder="Annual Rainfall" readOnly value={annualRainfall} className="p-3 rounded-lg border border-gray-300" />
            </div>
          </div>

          {/* Farm Area & Fertilizers Quantity */}
          <div className="grid grid-cols-2 gap-4">
            <input onChange={(e)=>setFarmArea(e.target.value)} type="number" placeholder="Farm Area (in ha)" value={farmArea} className="p-3 rounded-lg border border-gray-300" />
            <input onChange={(e)=>setFarmArea(e.target.value)} type="number" placeholder="Fertilizers Quantity (in Kg)" value={fertilizers} className="p-3 rounded-lg border border-gray-300" />
          </div>

          {/* Season */}
          <div className="grid grid-cols-2 gap-4">
            <select
                value={season}
                onChange={(e) => setSeason(e.target.value)}
                className="p-3 rounded-lg border border-gray-300 w-full focus:ring focus:ring-green-200"
            >
                <option value="">-- Select Season/Month --</option>
                <option value="Kharif">Kharif (June-Oct)</option>
                <option value="Rabi">Rabi (Nov-Apr)</option>
                <option value="Zaid">Zaid (Summer)</option>
            </select>
            
            <input onChange={(e)=>setFarmArea(e.target.value)} type="number" placeholder="Pesticides Quantity (in Kg)" value={pesticides} className="p-3 rounded-lg border border-gray-300" />
          </div>
        </div>

        {/* Button */}
        <button onClick={()=>{navigate("/output-yield")}} className="mt-6 bg-green-600 text-white px-6 py-3 rounded-xl w-full font-semibold hover:bg-green-700 transition">
          Get Advisory
        </button>
      </div>

      {/* Footer */}
      <div className="mt-6 flex flex-col items-center text-center text-gray-600">
        <div className="flex items-center space-x-4 mb-2">
          <Sun className="w-6 h-6 text-yellow-500" />
          <Sprout className="w-6 h-6 text-green-600" />
          <CloudRain className="w-6 h-6 text-blue-500" />
      </div>
        <p className="text-sm">Powered by <span className="font-semibold text-green-700">AI + Agriculture</span></p>
      </div>
    </div>
  );
}
