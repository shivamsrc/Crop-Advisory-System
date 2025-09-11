import React, { useState } from "react";
import { Users, Stethoscope, CloudSun, ChevronDown, Droplets, Leaf, LogOut, Menu, Plus, Search, Settings, Sun, Thermometer, TrendingUp, Wheat, Wind, Sparkles, MapPin, Edit as EditIcon, Image as ImageIcon, MessageCircle, Repeat2, Heart} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { ResponsiveContainer, RadialBarChart, RadialBar, PolarGrid, LineChart, Line, XAxis, YAxis, CartesianGrid, PieChart, Pie, Cell } from "recharts";
import { useNavigate } from "react-router-dom";

export default function Community() {
  const [activeTab, setActiveTab] = useState("for-you");
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen">
      {/* Left Sidebar */}
      <aside className="w-72 border-r border-gray-200 h-screen sticky top-0 overflow-y-auto">
        <div className="p-4">
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

            <button onClick={() => navigate("/input")} className="flex items-center gap-3 rounded-2xl px-3 py-2 text-left transition hover:bg-emerald-50">
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-emerald-600/10 text-emerald-700">
                <Sparkles />
              </span>
              <span className="text-[15px]">Crop Recommendation</span>
            </button>

            <button onClick={() => navigate("/input-yield")} className="flex items-center gap-3 rounded-2xl px-3 py-2 text-left transition hover:bg-emerald-50">
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
              <span className="text-[15px]">Farmer Community</span>
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
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-w-0 border-x border-gray-200">
        {/* Search Bar */}
        <div className="sticky top-0 bg-white/95 backdrop-blur z-10 p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              placeholder="Search Community"
              className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="flex">
              <TabsTrigger
                value="for-you"
                className="flex-1 py-4 font-semibold"
              >
                For you
              </TabsTrigger>
              <TabsTrigger
                value="following"
                className="flex-1 py-4 font-semibold"
              >
                Following
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Post Creation Area */}
        <div className="border-b border-gray-200 p-4">
          <div className="flex gap-4">
            <div className="h-10 w-10 rounded-full bg-emerald-600/10 grid place-items-center">
              <Wheat className="h-5 w-5 text-emerald-700" />
            </div>
            <div className="flex-1">
              <textarea
                placeholder="What's happening in your farm?"
                className="w-full p-2 text-gray-700 placeholder-gray-500 bg-transparent border-none focus:outline-none resize-none"
                rows="3"
              />
              <div className="flex items-center justify-between mt-2">
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon" className="rounded-full text-emerald-600">
                    <ImageIcon className="h-5 w-5" />
                  </Button>
                  <Button variant="ghost" size="icon" className="rounded-full text-emerald-600">
                    <MapPin className="h-5 w-5" />
                  </Button>
                </div>
                <Button className="rounded-full bg-emerald-600 hover:bg-emerald-700 text-white">
                  Post
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Posts Feed */}
        <div className="divide-y divide-gray-200">
          {/* Soybean Update Post */}
          <div className="p-4">
            <div className="flex gap-4">
              <div className="h-10 w-10 rounded-full bg-emerald-600/10 grid place-items-center">
                <Wheat className="h-5 w-5 text-emerald-700" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Farmer Ramesh</span>
                  <span className="text-gray-500">@rameshkisan</span>
                  <span className="text-gray-500">· 2h</span>
                </div>
                <p className="mt-2">Soybean prices touched ₹4,250 per quintal today in Bhopal mandi. Do you think it will go higher this season? 🌱📈</p>
                <img
                  src="https://tse3.mm.bing.net/th/id/OIP.P97jyixyjxflRkF7C1n8WwHaE1?pid=Api&P=0&h=220"
                  alt="Soybean field"
                  className="mt-3 rounded-xl w-full max-h-80 object-cover"
                />
                <div className="flex gap-8 mt-4 text-gray-500">
                  <button className="flex items-center gap-2 hover:text-emerald-600">
                    <MessageCircle className="h-4 w-4" />
                    <span>45</span>
                  </button>
                  <button className="flex items-center gap-2 hover:text-emerald-600">
                    <Repeat2 className="h-4 w-4" />
                    <span>32</span>
                  </button>
                  <button className="flex items-center gap-2 hover:text-emerald-600">
                    <Heart className="h-4 w-4" />
                    <span>156</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Dairy Scheme Post */}
          <div className="p-4">
            <div className="flex gap-4">
              <div className="h-10 w-10 rounded-full bg-emerald-600/10 grid place-items-center">
                <Wheat className="h-5 w-5 text-emerald-700" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Krishna Dairy</span>
                  <span className="text-gray-500">@krishnadairy</span>
                  <span className="text-gray-500">· 3h</span>
                </div>
                <p className="mt-2">The new NDDB dairy scheme sounds promising. Any other farmers planning to join milk cooperatives? 🐄🥛</p>
                <img
                  src="https://tse2.mm.bing.net/th/id/OIP.P65mSzQzKgEFWv5w0N56tAHaD4?pid=Api&P=0&h=220"
                  alt="Dairy farm"
                  className="mt-3 rounded-xl w-full max-h-80 object-cover"
                />
                <div className="flex gap-8 mt-4 text-gray-500">
                  <button className="flex items-center gap-2 hover:text-emerald-600">
                    <MessageCircle className="h-4 w-4" />
                    <span>67</span>
                  </button>
                  <button className="flex items-center gap-2 hover:text-emerald-600">
                    <Repeat2 className="h-4 w-4" />
                    <span>28</span>
                  </button>
                  <button className="flex items-center gap-2 hover:text-emerald-600">
                    <Heart className="h-4 w-4" />
                    <span>189</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Onion Storage Post */}
          <div className="p-4">
            <div className="flex gap-4">
              <div className="h-10 w-10 rounded-full bg-emerald-600/10 grid place-items-center">
                <Wheat className="h-5 w-5 text-emerald-700" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Anita</span>
                  <span className="text-gray-500">@anitafarmer</span>
                  <span className="text-gray-500">· 4h</span>
                </div>
                <p className="mt-2">Onion harvest was good this year, but storage is the challenge. How are you all protecting your stock from the rains? 🧅🌧</p>
                <div className="grid grid-cols-2 gap-2 mt-3">
                  <img
                    src="https://tse1.mm.bing.net/th/id/OIP.Ggih0L-FZUQX3V0a-3IwRAHaLL?pid=Api&P=0&h=220"
                    alt="Onion harvest"
                    className="rounded-xl w-full h-40 object-cover"
                  />
                  <img
                    src="https://tse2.mm.bing.net/th/id/OIP.O0RWU9h0HKFo0L58SQO1NAHaEK?pid=Api&P=0&h=220"
                    alt="Onion storage"
                    className="rounded-xl w-full h-40 object-cover"
                  />
                </div>
                <div className="flex gap-8 mt-4 text-gray-500">
                  <button className="flex items-center gap-2 hover:text-emerald-600">
                    <MessageCircle className="h-4 w-4" />
                    <span>89</span>
                  </button>
                  <button className="flex items-center gap-2 hover:text-emerald-600">
                    <Repeat2 className="h-4 w-4" />
                    <span>45</span>
                  </button>
                  <button className="flex items-center gap-2 hover:text-emerald-600">
                    <Heart className="h-4 w-4" />
                    <span>234</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Maize Price Post */}
          <div className="p-4">
            <div className="flex gap-4">
              <div className="h-10 w-10 rounded-full bg-emerald-600/10 grid place-items-center">
                <Wheat className="h-5 w-5 text-emerald-700" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Maize Farmer</span>
                  <span className="text-gray-500">@sehorefarmer</span>
                  <span className="text-gray-500">· 5h</span>
                </div>
                <p className="mt-2">Got ₹2,450 per quintal for maize in the mandi today. With poultry demand rising, I expect better prices soon. Anyone else seeing the same trend? �</p>
                <div className="flex gap-8 mt-4 text-gray-500">
                  <button className="flex items-center gap-2 hover:text-emerald-600">
                    <MessageCircle className="h-4 w-4" />
                    <span>56</span>
                  </button>
                  <button className="flex items-center gap-2 hover:text-emerald-600">
                    <Repeat2 className="h-4 w-4" />
                    <span>38</span>
                  </button>
                  <button className="flex items-center gap-2 hover:text-emerald-600">
                    <Heart className="h-4 w-4" />
                    <span>167</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Right Sidebar */}
      <aside className="w-80 p-4 sticky top-0 h-screen overflow-y-auto hidden lg:block">
        <Card className="mb-4">
          <CardHeader>
            <CardTitle>🌾 Farming Updates (Bhopal & MP)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="cursor-pointer hover:bg-gray-50 p-2 rounded">
                <div className="flex items-start gap-3">
                  <img
                    src="https://tse1.mm.bing.net/th/id/OIP.12h_SPWV-Y8MmoeuSh5BcAHaFj?pid=Api&P=0&h=220"
                    alt="Soybean"
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-medium">Soybean Cultivation in MP</p>
                    <p className="text-sm text-gray-500">Current mandi prices: ₹4,200–₹4,300 per quintal. Export demand expected to drive prices higher.</p>
                  </div>
                </div>
              </div>
              <div className="cursor-pointer hover:bg-gray-50 p-2 rounded">
                <div className="flex items-start gap-3">
                  <img
                    src="https://tse3.mm.bing.net/th/id/OIP.zsKDULMoM-AOgUJTGEt2AAHaEk?pid=Api&P=0&h=220"
                    alt="Onion"
                    className="w-16 h-16 object-cover"
                  />
                  <div>
                    <p className="font-medium">Onion Market Update</p>
                    <p className="text-sm text-gray-500">Wholesale prices down to ₹600–₹1,200 per quintal at Bhopal Mandi.</p>
                  </div>
                </div>
              </div>
              <div className="cursor-pointer hover:bg-gray-50 p-2 rounded">
                <div className="flex items-start gap-3">
                  <img
                    src="https://tse3.mm.bing.net/th/id/OIP.zZTTQdkTh4x-fHuMMwToVQHaEK?pid=Api&P=0&h=220"
                    alt="Maize"
                    className="w-16 h-16 object-cover"
                  />
                  <div>
                    <p className="font-medium">Maize Production Trends</p>
                    <p className="text-sm text-gray-500">Bhopal mandi price: ₹2,450/quintal. Rising poultry feed demand positive for prices.</p>
                  </div>
                </div>
              </div>
              <div className="cursor-pointer hover:bg-gray-50 p-2 rounded">
                <div className="flex items-start gap-3">
                  <img
                    src="https://tse2.mm.bing.net/th/id/OIP.jWJA1G_7ZTvSQz3hOrqjDgHaEK?pid=Api&P=0&h=220"
                    alt="Dairy Farm"
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-medium">Government Dairy Initiative</p>
                    <p className="text-sm text-gray-500">MP partners with NDDB to boost milk production. New cooperatives coming soon.</p>
                  </div>
                </div>
              </div>
              <div className="cursor-pointer hover:bg-gray-50 p-2 rounded">
                <div className="flex items-start gap-3">
                  <img
                    src="https://tse2.mm.bing.net/th/id/OIP.y1RnVb12194gQ7YKnfehNwHaD4?pid=Api&P=0&h=220"
                    alt="Relief Aid"
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <p className="font-medium">Relief Aid Distribution</p>
                    <p className="text-sm text-gray-500">₹20 crore distributed to disaster-affected farmers in MP, including Bhopal district.</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </aside>
    </div>
  );

}