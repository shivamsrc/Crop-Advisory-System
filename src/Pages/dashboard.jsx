import React, { useMemo, useState } from "react";
import { Users, Stethoscope, ChevronDown, CloudSun, Droplets, Leaf, LogOut, Menu, Plus, Search, Settings, Sun, Thermometer, TrendingUp, Wheat, Wind, Sparkles, MapPin } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { ResponsiveContainer, RadialBarChart, RadialBar, PolarGrid, LineChart, Line, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell } from "recharts";
import { useNavigate } from "react-router-dom";

// --- Helper: fake data ---
const soilSnapshot = [
  { label: "Moisture", value: 180, unit: "mm" },
  { label: "Wind", value: 2, unit: "m/s" },
  { label: "Temp", value: 24, unit: "°C" },
  { label: "pH", value: 9.24, unit: "pH" },
];

const marketPrice = [
  { name: "Rice", price: 20.02, trend: 0.8 },
  { name: "Wheat", price: 4.83, trend: -0.4 },
  { name: "Maize", price: 2.32, trend: 0.2 },
];

const suitability = [{ name: "Suitability", value: 85 }];

const weatherToday = [
  { hour: "6am", temp: 23 },
  { hour: "9am", temp: 26 },
  { hour: "12pm", temp: 30 },
  { hour: "3pm", temp: 31 },
  { hour: "6pm", temp: 28 },
];

const tips = [
  "Irrigate in early morning to reduce evaporation.",
  "Add 25kg/acre potash if leaves are yellowing.",
  "Scout for brown planthopper after rains.",
];

export default function Dashboard() {
  const [crop, setCrop] = useState("Rice");
  const [district, setDistrict] = useState("Bhopal");
  const [unit, setUnit] = useState("Metric");
  const [tipIndex, setTipIndex] = useState(0);
  const [notifications, setNotifications] = useState(true);
  const tip = tips[tipIndex % tips.length];
  const navigate = useNavigate();

  const pieData = useMemo(
    () => [
      { name: "Suitable", value: crop === "Rice" ? 85 : 72 },
      { name: "Remaining", value: crop === "Rice" ? 15 : 28 },
    ],
    [crop]
  );

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-[#eaf1ec] text-slate-800">
        {/* Top bar (mobile) */}
        <div className="lg:hidden flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <Button size="icon" variant="ghost" className="rounded-2xl"><Menu /></Button>
            <div className="font-semibold">Smart Advisor</div>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="rounded-xl bg-white text-slate-700 shadow">{unit}</Badge>
            <Button size="icon" variant="ghost" className="rounded-2xl"><LogOut /></Button>
          </div>
        </div>

        <div className="mx-auto grid max-w-[1500px] grid-cols-12 gap-6 px-4 py-6">
          {/* Sidebar */}
          <aside className="col-span-12 lg:col-span-2">
            <Card className="sticky top-4 rounded-3xl border-none bg-white/70 p-0 shadow-md backdrop-blur pt-4 pb-5">
              <CardHeader className="flex-row items-center gap-3 pb-2">
                <div className="h-10 w-10 overflow-hidden rounded-full bg-emerald-600/10 grid place-items-center">
                  <Wheat className="h-5 w-5 text-emerald-700" />
                </div>
                <div>
                  <CardTitle className="text-lg">Smart Advisor</CardTitle>
                  <CardDescription>Crop Advisory System</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="pt-0 px-4">
                <div className="grid gap-1">
                    <button className="flex items-center gap-3 rounded-2xl px-3 py-2 text-left transition hover:bg-emerald-50">
                        <span className="grid h-8 w-8 place-items-center rounded-xl bg-emerald-600/10 text-emerald-700">
                        <Leaf />
                        </span>
                        <span className="text-[15px]">Home</span>
                    </button>

                    <button className="flex items-center gap-3 rounded-2xl px-3 py-2 text-left transition hover:bg-emerald-50">
                        <span className="grid h-8 w-8 place-items-center rounded-xl bg-emerald-600/10 text-emerald-700">
                        <EditIcon />
                        </span>
                        <span className="text-[15px]">Input farm details</span>
                    </button>

                    <button onClick={()=>navigate("/input")} className="flex items-center gap-3 rounded-2xl px-3 py-2 text-left transition hover:bg-emerald-50">
                        <span className="grid h-8 w-8 place-items-center rounded-xl bg-emerald-600/10 text-emerald-700">
                        <Sparkles />
                        </span>
                        <span className="text-[15px]">Crop Recommendation</span>
                    </button>

                    <button onClick={()=>navigate("/input-yield")} className="flex items-center gap-3 rounded-2xl px-3 py-2 text-left transition hover:bg-emerald-50">
                        <span className="grid h-8 w-8 place-items-center rounded-xl bg-emerald-600/10 text-emerald-700">
                        <Sparkles />
                        </span>
                        <span className="text-[15px]">Yield Production</span>
                    </button>

                    <button className="flex items-center gap-3 rounded-2xl px-3 py-2 text-left transition hover:bg-emerald-50">
                        <span className="grid h-8 w-8 place-items-center rounded-xl bg-emerald-600/10 text-emerald-700">
                        <CloudSun />
                        </span>
                        <span className="text-[15px]">Weather updates</span>
                    </button>

                    <button className="flex items-center gap-3 rounded-2xl px-3 py-2 text-left transition hover:bg-emerald-50">
                        <span className="grid h-8 w-8 place-items-center rounded-xl bg-emerald-600/10 text-emerald-700">
                        <TrendingUp />
                        </span>
                        <span className="text-[15px]">Market prices</span>
                    </button>

                    <button className="flex items-center gap-3 rounded-2xl px-3 py-2 text-left transition hover:bg-emerald-50">
                        <span className="grid h-8 w-8 place-items-center rounded-xl bg-emerald-600/10 text-emerald-700">
                        <Users />
                        </span>
                        <span className="text-[15px]">Farmer posts</span>
                    </button>

                    <button onClick={()=>navigate("/disease-analysis")} className="flex items-center gap-3 rounded-2xl px-3 py-2 text-left transition hover:bg-emerald-50">
                      <span className="grid h-8 w-8 place-items-center rounded-xl bg-emerald-600/10 text-emerald-700">
                        <Stethoscope />
                      </span>
                      <span className="text-[15px]">Disease Prediction</span>
                    </button>

                    <button className="flex items-center gap-3 rounded-2xl px-3 py-2 text-left transition hover:bg-emerald-50">
                        <span className="grid h-8 w-8 place-items-center rounded-xl bg-emerald-600/10 text-emerald-700">
                        <Settings />
                        </span>
                        <span className="text-[15px]">Settings</span>
                    </button>
                </div>

              </CardContent>
            </Card>
          </aside>

          {/* Main content */}
          <main className="col-span-12 lg:col-span-10">
            {/* Header controls */}
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="text-sm text-slate-500">Smart Crop Advisory System</div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-2 rounded-2xl bg-white px-3 py-2 shadow">
                  <span className="text-sm text-slate-500">Unit</span>
                  <Tabs value={unit} onValueChange={setUnit} className="">
                    <TabsList className="rounded-xl bg-slate-100 p-1">
                      <TabsTrigger value="Metric" className="rounded-lg">Metric</TabsTrigger>
                      <TabsTrigger value="Imperial" className="rounded-lg">Imperial</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                <div className="flex items-center gap-2 rounded-2xl bg-white px-3 py-2 shadow">
                  <span className="text-sm text-slate-500">District</span>
                  <Button variant="ghost" className="gap-1 rounded-xl">
                    {district} <ChevronDown className="h-4 w-4" />
                  </Button>
                </div>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>
            </div>

            {/* Hero + Right cards */}
            <div className="grid grid-cols-12 gap-6">
              <Card className="col-span-12 md:col-span-7 xl:col-span-6 rounded-3xl border-none bg-white/70 shadow-md">
                <CardContent className="p-6">
                  <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">Demo</div>
                  <h1 className="mb-4 text-4xl font-extrabold tracking-tight md:text-5xl">Hello, farmer!<br />Here’s your <span className="whitespace-nowrap">farm overview</span></h1>
                  <div className="grid grid-cols-4 gap-3">
                    {soilSnapshot.map((s, i) => (
                      <div key={i} className="rounded-2xl bg-emerald-50 p-3 text-center">
                        <div className="text-xs text-slate-500">{s.label}</div>
                        <div className="text-lg font-semibold">{s.value}</div>
                        <div className="text-[10px] text-slate-400">{s.unit}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Suitability card */}
              <Card className="col-span-12 md:col-span-5 xl:col-span-4 rounded-3xl border-none bg-emerald-700 text-emerald-50 shadow-md">
                <CardContent className="p-6">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="text-emerald-50/80">{crop} — {pieData[0].value + 0}% Suitability</div>
                    <Badge variant="secondary" className="rounded-full bg-white/20 text-white">24h</Badge>
                  </div>
                  <div className="mb-4 text-xs text-emerald-100/80">Soil type: EVE5</div>
                  <div className="h-44">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={pieData}
                          innerRadius={60}
                          outerRadius={80}
                          paddingAngle={4}
                          dataKey="value"
                          stroke="none"
                        >
                          <Cell fill="#a7f3d0" />
                          <Cell fill="#064e3b" />
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex items-center justify-between">
                    <Button size="sm" className="rounded-xl bg-emerald-100 text-emerald-900 hover:bg-emerald-200" onClick={() => setCrop(crop === "Rice" ? "Wheat" : "Rice")}>Switch crop</Button>
                    <Button size="sm" variant="secondary" className="rounded-xl bg-white/10 text-white hover:bg-white/20">BW way</Button>
                  </div>
                </CardContent>
              </Card>

              {/* Tips of the day */}
              <Card className="col-span-12 xl:col-span-2 rounded-3xl border-none bg-amber-100 shadow-md">
                <CardContent className="p-6">
                  <div className="mb-2 font-semibold">Tips of the day</div>
                  <div className="mb-4 h-24 w-full rounded-2xl bg-gradient-to-b from-amber-200 to-amber-300" />
                  <div className="text-sm text-slate-700">{tip}</div>
                  <div className="mt-4 flex items-center gap-2">
                    <Button size="icon" variant="ghost" className="rounded-xl" onClick={() => setTipIndex((i) => (i + 2) % tips.length)}>
                      <ChevronDown className="rotate-90" />
                    </Button>
                    <Button size="icon" variant="ghost" className="rounded-xl" onClick={() => setTipIndex((i) => (i + 1) % tips.length)}>
                      <ChevronDown className="-rotate-90" />
                    </Button>
                    <Button size="icon" className="ml-auto rounded-xl"><Plus /></Button>
                  </div>
                </CardContent>
              </Card>

              {/* Lower grid */}
              <Card className="col-span-12 md:col-span-5 xl:col-span-4 rounded-3xl border-none bg-emerald-800 text-emerald-50 shadow-md">
                <CardContent className="p-6">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="font-semibold">Pv factor</div>
                    <Button size="icon" variant="ghost" className="rounded-xl text-emerald-100"><Plus /></Button>
                  </div>
                  <div className="mb-6 grid grid-cols-3 items-end gap-4">
                    <div>
                      <div className="text-[11px] text-emerald-200">Sun Index</div>
                      <div className="text-5xl font-bold">850</div>
                      <div className="text-[11px] text-emerald-200">Today</div>
                    </div>
                    <div className="col-span-2 h-24">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={weatherToday}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#0b4f3f" />
                          <XAxis dataKey="hour" stroke="#a7f3d0" tick={{ fontSize: 11 }} />
                          <YAxis hide />
                          <Line type="monotone" dataKey="temp" stroke="#a7f3d0" strokeWidth={3} dot={false} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div className="rounded-xl bg-emerald-700/60 p-3">
                      <div className="mb-1 flex items-center gap-1"><Sun className="h-3 w-3" /> UV</div>
                      <div className="text-emerald-100">20.5</div>
                    </div>
                    <div className="rounded-xl bg-emerald-700/60 p-3">
                      <div className="mb-1 flex items-center gap-1"><Droplets className="h-3 w-3" /> Humidity</div>
                      <div className="text-emerald-100">62%</div>
                    </div>
                    <div className="rounded-xl bg-emerald-700/60 p-3">
                      <div className="mb-1 flex items-center gap-1"><Wind className="h-3 w-3" /> Wind</div>
                      <div className="text-emerald-100">2 m/s</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-12 md:col-span-7 xl:col-span-4 rounded-3xl border-none bg-white/70 shadow-md">
                <CardHeader>
                  <CardTitle>Market Price – Crops</CardTitle>
                  <CardDescription>Average mandi prices (₹/kg)</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {marketPrice.map((m, i) => (
                      <div key={i} className="flex items-center gap-3 rounded-2xl bg-slate-50 p-3">
                        <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-600/10 text-emerald-700">
                          <Wheat className="h-4 w-4" />
                        </span>
                        <div className="mr-auto">
                          <div className="font-medium">{m.name}</div>
                          <div className="text-xs text-slate-500">Spot</div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold">₹ {m.price.toFixed(2)}</div>
                          <div className={`text-xs ${m.trend >= 0 ? "text-emerald-600" : "text-rose-600"}`}>{m.trend >= 0 ? "+" : ""}{(m.trend * 10).toFixed(1)}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-12 xl:col-span-3 rounded-3xl border-none bg-white/70 shadow-md">
                <CardHeader>
                  <CardTitle>Fertilizer</CardTitle>
                  <CardDescription>Quick picks</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <TogglePill icon={<Thermometer className="h-3 w-3" />} label="NPK 10-26-26" />
                    <TogglePill icon={<Droplets className="h-3 w-3" />} label="Urea" />
                    <TogglePill icon={<Leaf className="h-3 w-3" />} label="Micronutrients" />
                  </div>
                </CardContent>
              </Card>
              
              {/* Chatbot Icon */}
              <div className="fixed bottom-6 right-6 z-50">
                <button className="h-18 w-18 rounded-full shadow-lg overflow-hidden hover:scale-105 transition">
                  <img
                    src="https://img.freepik.com/premium-vector/chat-bot-icon-design-robot-say-hi-virtual-smart-assistant-bot-icon-chatbot-symbol-concept-voice_418020-456.jpg"
                    alt="Chatbot"
                    className="h-full w-full object-cover"
                  />
                </button>
              </div>

            </div>
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}

function TogglePill({ icon, label }) {
  const [on, setOn] = React.useState(false);
  return (
    <button
      onClick={() => setOn((v) => !v)}
      className={`flex w-full items-center justify-between gap-2 rounded-2xl px-3 py-2 ${
        on ? "bg-emerald-100 text-emerald-900" : "bg-slate-100 text-slate-700"
      }`}
    >
      <span className="flex items-center gap-2">
        <span className="grid h-7 w-7 place-items-center rounded-xl bg-white/60">
          {icon}
        </span>
        {label}
      </span>
      <Switch checked={on} />
    </button>
  );
}

function EditIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
      className="h-[18px] w-[18px]"
    >
      <path
        d="M4 21h4l11-11-4-4L4 17v4z"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="currentColor"
      />
    </svg>
  );
}
