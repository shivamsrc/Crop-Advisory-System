import { useState, useEffect } from "react";
import { getAllStates, getDistricts } from "india-state-district";
import { Sun, Sprout, CloudRain } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Soilhealth() {
  const [states, setStates] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [crop, setCrop] = useState("Wheat");
  const [area, setArea] = useState(1);
  const [npk, setNpk] = useState({ N: "", P: "", K: "", PH: "" });
  const [result, setResult] = useState(null);

  const navigate = useNavigate();

  const idealValues = {
    Wheat: { N: 120, P: 20, K: 15, pH: 6.5 },
    Rice: { N: 100, P: 25, K: 20, pH: 6.0 },
  };

  const conversions = {
    Urea: 0.46,
    DAP: 0.20,
    MOP: 0.60,
  };

  // Load states
  useEffect(() => {
    setStates(getAllStates());
  }, []);

  // Load districts based on selected state
  useEffect(() => {
    if (selectedState) {
      setDistricts(getDistricts(selectedState));
    } else {
      setDistricts([]);
      setSelectedDistrict("");
    }
  }, [selectedState]);

  // Handle NPK inputs
  const NPKhandler = (e) => {
    const { name, value } = e.target;
    setNpk((prev) => ({ ...prev, [name]: value }));
  };

  // Calculate fertilizer recommendations
  const calculateRecommendation = () => {
    const { N, P, K, PH } = npk;
    const ideal = idealValues[crop];
    const recs = [];

    const nDef = ideal.N - parseFloat(N || 0);
    if (nDef > 0) recs.push(`Add ${((nDef * area) / conversions.Urea).toFixed(1)} kg Urea per ${area} acre(s) for Nitrogen`);

    const pDef = ideal.P - parseFloat(P || 0);
    if (pDef > 0) recs.push(`Add ${((pDef * area) / conversions.DAP).toFixed(1)} kg DAP for Phosphorus`);

    const kDef = ideal.K - parseFloat(K || 0);
    if (kDef > 0) recs.push(`Add ${((kDef * area) / conversions.MOP).toFixed(1)} kg MOP for Potassium`);

    if (PH) {
      if (parseFloat(PH) < 6) recs.push("Soil is acidic → Apply lime");
      if (parseFloat(PH) > 8) recs.push("Soil is alkaline → Apply gypsum");
    }

    setResult({
      District: selectedDistrict,
      Crop: crop,
      Area: area,
      EnteredValues: { N: N || 0, P: P || 0, K: K || 0, pH: PH || "NA" },
      IdealValues: ideal,
      SoilHealth: recs.length ? "Needs Improvement" : "Good",
      Recommendations: recs,
    });
  };

  return (
    <div className="bg-[url('/crop-bg-image.png')] min-h-screen w-screen bg-cover bg-center flex flex-col items-center justify-center px-4 py-10">
      <div className={`bg-white/95 backdrop-blur-md border border-gray-200 p-8 rounded-2xl shadow-lg max-w-6xl w-full grid gap-8 ${result ? "grid-cols-1 md:grid-cols-2" : "grid-cols-1"}`}>
        
        {/* Input Section */}
        <div>
          <h1 className="text-2xl font-bold mb-4 text-gray-800">
            Soil Health & Fertilizer Advisor
          </h1>

          {/* State & District */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="p-3 rounded-lg border border-gray-300 w-full focus:ring focus:ring-green-200"
            >
              <option value="">-- Select State --</option>
              {states.map((st) => (
                <option key={st.code} value={st.code}>{st.name}</option>
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
                <option key={idx} value={dist}>{dist}</option>
              ))}
            </select>
          </div>

          {/* Crop & Area */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <select
              value={crop}
              onChange={(e) => setCrop(e.target.value)}
              className="p-3 rounded-lg border border-gray-300"
            >
              <option value="Wheat">Wheat</option>
              <option value="Rice">Rice</option>
            </select>
            <input
              type="number"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="Area (in acres)"
              className="p-3 rounded-lg border border-gray-300"
            />
          </div>

          {/* NPK Inputs */}
          <div className="grid grid-cols-4 gap-3 mb-4">
            <input onChange={NPKhandler} name="N" type="number" placeholder="N" value={npk.N} className="p-3 rounded-lg border border-gray-300" />
            <input onChange={NPKhandler} name="P" type="number" placeholder="P" value={npk.P} className="p-3 rounded-lg border border-gray-300" />
            <input onChange={NPKhandler} name="K" type="number" placeholder="K" value={npk.K} className="p-3 rounded-lg border border-gray-300" />
            <input onChange={NPKhandler} name="PH" type="number" placeholder="pH" value={npk.PH} className="p-3 rounded-lg border border-gray-300" />
          </div>

          <button
            onClick={calculateRecommendation}
            className="mt-4 bg-green-600 text-white px-6 py-3 rounded-xl w-full font-semibold hover:bg-green-700 transition"
          >
            Get Recommendations
          </button>
        </div>

        {/* Output Section */}
        {result && (
          <div className="border p-4 rounded-lg bg-gray-50 shadow-inner overflow-auto">
            <h2 className="text-xl font-semibold mb-4">Predicted Output</h2>
            <div className="space-y-3">
              <p><strong>District:</strong> {result.District}</p>
              <p><strong>Crop:</strong> {result.Crop}</p>
              <p><strong>Area:</strong> {result.Area} acre(s)</p>
              <p><strong>Soil Health:</strong> {result.SoilHealth}</p>

              <h4 className="mt-3 font-semibold">Soil Values:</h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="font-medium">Entered:</p>
                  <ul className="list-disc list-inside text-sm text-gray-700">
                    <li>N: {result.EnteredValues.N}</li>
                    <li>P: {result.EnteredValues.P}</li>
                    <li>K: {result.EnteredValues.K}</li>
                    <li>pH: {result.EnteredValues.pH}</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium">Ideal ({result.Crop}):</p>
                  <ul className="list-disc list-inside text-sm text-gray-700">
                    <li>N: {result.IdealValues.N}</li>
                    <li>P: {result.IdealValues.P}</li>
                    <li>K: {result.IdealValues.K}</li>
                    <li>pH: {result.IdealValues.pH}</li>
                  </ul>
                </div>
              </div>

              <h4 className="mt-3 font-semibold">Recommendations:</h4>
              {result.Recommendations.length > 0 ? (
                <ul className="list-disc list-inside">
                  {result.Recommendations.map((rec, idx) => (
                    <li key={idx}>{rec}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-green-700">No extra fertilizer needed.</p>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-6 flex flex-col items-center text-center text-gray-600">
        <div className="flex items-center space-x-4 mb-2">
          <Sun className="w-6 h-6 text-yellow-500" />
          <Sprout className="w-6 h-6 text-green-600" />
          <CloudRain className="w-6 h-6 text-blue-500" />
        </div>
        <p className="text-sm">
          Powered by <span className="font-semibold text-green-700">AI + Agriculture</span>
        </p>
      </div>
    </div>
  );
}
