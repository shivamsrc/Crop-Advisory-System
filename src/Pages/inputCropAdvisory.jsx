import { useState, useEffect } from "react";
import { getAllStates, getDistricts } from "india-state-district";
import axios from "axios";
import { Sun, Sprout, CloudRain } from "lucide-react";
import { useNavigate } from "react-router-dom";


export default function InputPage() {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [season, setSeason] = useState("");
  const [npk, setNpk] = useState({ N: "", P: "", K: "", PH: "" });
  const [weather, setWeather] = useState({
    temp: "",
    humidity: "",
    rainfall: "",
    location: "",
  });

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
    if (selectedDistrict) {
      setNpk({ N: "40", P: "30", K: "20", PH: "6.5" });

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            try {
              const apiKey = "e168760cf6186f00d499c72f3ca76c99"; // weather API key
              const res = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
              );

              const data = res.data;
              setWeather({
                temp: data.main.temp,
                humidity: data.main.humidity,
                rainfall: data.rain ? data.rain["3h"] || 0 : 0,
                location: data.name,
              });
            } catch (err) {
              console.error("Weather API error:", err);
            }
          },
          async (error) => {
            if (error.code === error.PERMISSION_DENIED) {
              console.warn("User denied location → falling back to district name");
              try {
                const apiKey = "e168760cf6186f00d499c72f3ca76c99";
                const res = await axios.get(
                  `https://api.openweathermap.org/data/2.5/weather?q=${selectedDistrict}&appid=${apiKey}&units=metric`
                );
                const data = res.data;
                setWeather({
                  temp: data.main.temp,
                  humidity: data.main.humidity,
                  rainfall: data.rain ? data.rain["1h"] || 0 : 0,
                  location: data.name,
                });
              } catch (err) {
                console.error("Weather API error:", err);
              }
            }
          }
        );
      }
    }
  }, [selectedDistrict]);

  const NPKhandler = (e) => {
    const {name, value} = e.target;
    setNpk((prev)=>({...prev, [name]: value}))
  }

  return (
    <div className="bg-[url('/crop-bg-image.png')] h-screen w-screen bg-cover bg-center flex flex-col items-center justify-center px-4">
      {/* Card */}
      <div className="bg-white/95 backdrop-blur-md border border-gray-200 p-8 rounded-2xl shadow-lg max-w-3xl w-full">
        {/* Heading */}
        <h1 className="text-3xl font-bold text-center mb-2 text-gray-800">
          Smart Crop Advisor
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Enter your farm details to get crop recommendations
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

          {/* NPK & PH */}
          <div className="grid grid-cols-4 gap-4">
            <div className="flex flex-col relative">
              <span className="absolute -top-3 right-2 bg-white/30 backdrop-blur-md border border-white/40 rounded-full px-0.5 py-0.5 text-xs font-medium text-gray-800 whitespace-nowrap">N (Nitrogen)</span>
              <input onChange={NPKhandler} name="N" type="text" placeholder="N" value={npk.N} className="p-3 rounded-lg border border-gray-300" />
            </div>
            <div className="flex flex-col relative">
              <span className="absolute -top-3 right-2 bg-white/30 backdrop-blur-md border border-white/40 rounded-full px-0.5 py-0.5 text-xs font-medium text-gray-800 whitespace-nowrap">P (Phosphorus)</span>
              <input onChange={NPKhandler} name="P" type="text" placeholder="P" value={npk.P} className="p-3 rounded-lg border border-gray-300" />
            </div>
            <div className="flex flex-col relative">
              <span className="absolute -top-3 right-2 bg-white/30 backdrop-blur-md border border-white/40 rounded-full px-0.5 py-0.5 text-xs font-medium text-gray-800 whitespace-nowrap">K (potassium)</span>
              <input onChange={NPKhandler} name="K" type="text" placeholder="K" value={npk.K} className="p-3 rounded-lg border border-gray-300" />
            </div>
            <div className="flex flex-col relative">
              <span className="absolute -top-3 right-2 bg-white/30 backdrop-blur-md border border-white/40 rounded-full px-0.5 py-0.5 text-xs font-medium text-gray-800 whitespace-nowrap">PH</span>
              <input onChange={NPKhandler} name="PH" type="text" placeholder="PH" value={npk.PH} className="p-3 rounded-lg border border-gray-300" />
            </div>
          </div>

          {/* Weather */}
          <div className="grid grid-cols-2 gap-4">
            <input type="text" placeholder="Location" value={weather.location || ""} readOnly className="p-3 rounded-lg border border-gray-300" />
            <input type="text" placeholder="Temperature" value={weather.temp ? `${weather.temp} °C` : ""} readOnly className="p-3 rounded-lg border border-gray-300" />
            <input type="text" placeholder="Humidity" value={weather.humidity ? `${weather.humidity}%` : ""} readOnly className="p-3 rounded-lg border border-gray-300" />
            <input type="text" placeholder="Rainfall" value={weather.rainfall !== "" ? `${weather.rainfall} mm` : ""} readOnly className="p-3 rounded-lg border border-gray-300" />
          </div>

          {/* Season */}
          <select
            value={season}
            onChange={(e) => setSeason(e.target.value)}
            className="p-3 rounded-lg border border-gray-300 w-full focus:ring focus:ring-green-200"
          >
            <option value="">-- Select Season/Month --</option>
            <option value="Kharif">Kharif (June–Oct)</option>
            <option value="Rabi">Rabi (Nov–Apr)</option>
            <option value="Zaid">Zaid (Summer)</option>
          </select>
        </div>

        {/* Button */}
        <button onClick={()=>{navigate("/output")}} className="mt-6 bg-green-600 text-white px-6 py-3 rounded-xl w-full font-semibold hover:bg-green-700 transition">
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
