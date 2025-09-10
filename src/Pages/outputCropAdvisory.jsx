import React, { useEffect, useState } from "react";
import axios from "axios";
import { Leaf, BarChart3, Calendar, Sprout, Sun, CloudRain, Droplets } from "lucide-react";
import { WhetherAtom } from "@/atoms/whetherAtom";
import { useRecoilValue, useSetRecoilState } from "recoil";

function CropCard({ image, name, suitability, sowingTime, fertilizers, yieldRange, soilType, weather }) {
  const showWhether = useRecoilValue(WhetherAtom);

  return (
    <div className="w-80 rounded-2xl shadow-md overflow-hidden bg-white">
      {/* Top header section */}
      <div className="relative w-full h-48">
        <img src={image} alt={name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <h2 className="absolute bottom-4 left-4 text-white text-xl font-bold tracking-wide drop-shadow-md">
          {name}
        </h2>
      </div>

      {/* Bottom content */}
      <div className="p-4">
        {/* Suitability */}
        <p className="text-gray-700 text-sm font-medium mb-1">Suitability score</p>
        <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
          <div
            className="h-2 rounded-full bg-green-500"
            style={{ width: `${suitability}%` }}
          />
        </div>
        <p className="text-gray-600 text-xs mb-3">
          This crop is {suitability}% suitable
        </p>

        {/* Info */}
        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-blue-500" />
            <span>{sowingTime}</span>
          </div>
          <div className="flex items-center gap-2">
            <Sprout className="w-4 h-4 text-green-600" />
            <span>{fertilizers}</span>
          </div>
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-yellow-500" />
            <span>{yieldRange}</span>
          </div>
          <div className="flex items-center gap-2">
            <Leaf className="w-4 h-4 text-purple-500" />
            <span>{soilType}</span>
          </div>
        </div>

        {/* Weather Info */}
        {showWhether && weather && (
          <div className="mt-4 p-3 rounded-lg bg-gray-50 text-xs text-gray-700 space-y-2">
            <div className="flex items-center gap-2">
              <Sun className="w-4 h-4 text-yellow-500" />
              <span>Temp: {weather.temp}°C</span>
            </div>
            <div className="flex items-center gap-2">
              <Droplets className="w-4 h-4 text-blue-500" />
              <span>Humidity: {weather.humidity}%</span>
            </div>
            <div className="flex items-center gap-2">
              <CloudRain className="w-4 h-4 text-indigo-500" />
              <span>Rainfall (24h): {weather.rainfall} mm</span>
            </div>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-4 flex justify-between items-center">
          <button className="px-3 py-1 text-xs font-medium text-green-600 bg-green-100 rounded-full hover:bg-green-200">
            Know more
          </button>
          <button className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200">
            Market prices
          </button>
        </div>
      </div>
    </div>
  );
}

export default function OutputPage() {
  const [weather, setWeather] = useState(null);
  const setShowWhether = useSetRecoilState(WhetherAtom);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const apiKey = "e168760cf6186f00d499c72f3ca76c99"; // replace with your OpenWeather API key

        try {
          // Use One Call 2.5 API instead of 3.0
          const res = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
        );

        setWeather({
          temp: res.data.main.temp,
          humidity: res.data.main.humidity,
          rainfall: res.data.rain ? res.data.rain["1h"] || 0 : 0,
        });;
        } catch (error) {
          console.error("Weather fetch error:", error);
        }
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#e1f0eb] p-8">
      {/* Top Navbar */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-2xl font-bold text-gray-800">Crop Advisory Card</h1>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-white rounded-full shadow-sm text-sm">Crop Library</button>
          <button onClick={()=>setShowWhether((prev)=>!prev)} className="px-4 py-2 bg-white rounded-full shadow-sm text-sm cursor-pointer hover:bg-green-200">Whether</button>
          <button className="px-4 py-2 bg-white rounded-full shadow-sm text-sm">English</button>
          <button className="px-4 py-2 bg-green-500 text-white rounded-full shadow-sm text-sm">हिंदी</button>
        </div>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 justify-items-center">
        <CropCard image="crop2.png" name="Rice" suitability={85} sowingTime="June 15 - July 10" fertilizers="NPK 20:20:0" yieldRange="2.5 - 3 tons/acre" soilType="Clayey, Loamy" weather={weather} />
        <CropCard image="crop1.png" name="Wheat" suitability={78} sowingTime="Nov 1 – Dec 15" fertilizers="DAP, Urea" yieldRange="3 – 4 tons/acre" soilType="Loamy, Sandy" weather={weather} />
        <CropCard image="crop3.png" name="Maize" suitability={70} sowingTime="July 1 - Aug 15" fertilizers="Urea, DAP" yieldRange="2 – 3 tons/acre" soilType="Loamy" weather={weather} />
        <CropCard image="crop4.png" name="Barley" suitability={65} sowingTime="Oct 15 - Nov 15" fertilizers="NPK 10:26:26" yieldRange="2.5 – 3.5 tons/acre" soilType="Sandy Loam" weather={weather} />
      </div>

      <div className="mt-12 flex flex-col items-center text-center text-gray-600">
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
