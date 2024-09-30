import React, { useState, useEffect } from "react";
import { FaHeartbeat, FaBed } from "react-icons/fa";
import Navbar from "../components/Navbar";

const HealthData = () => {
  const [heartRate, setHeartRate] = useState(75); // Placeholder for heart rate data
  const [sleepHours, setSleepHours] = useState(7.5); // Placeholder for sleep hours data
  const [sleepQuality, setSleepQuality] = useState("Good"); // Placeholder for sleep quality

  useEffect(() => {
    // Simulate fetching data from wearable devices
    const fetchHealthData = () => {
      // This is where you'd integrate with an API like Fitbit or Apple Health
      setHeartRate(75); // Replace with real heart rate data
      setSleepHours(7.5); // Replace with real sleep data
      setSleepQuality("Good"); // Replace with real sleep quality data
    };
    fetchHealthData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900">Health Data Overview</h1>
            <p className="text-xl text-gray-600 mt-2">Your vital health metrics from wearables</p>
          </header>

          {/* Health Metrics Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Heart Rate Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
              <div className="text-5xl text-red-500 mr-6">
                <FaHeartbeat />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">Heart Rate</h2>
                <p className="text-gray-500">Current Heart Rate</p>
                <p className="text-4xl font-semibold mt-2">{heartRate} BPM</p>
              </div>
            </div>

            {/* Sleep Data Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
              <div className="text-5xl text-blue-500 mr-6">
                <FaBed />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">Sleep Data</h2>
                <p className="text-gray-500">Last Night's Sleep</p>
                <p className="text-lg font-semibold mt-2">{sleepHours} hours</p>
                <p className="text-lg text-green-500">{sleepQuality}</p>
              </div>
            </div>
          </div>

          {/* History of Health Data */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold mb-6">Health History</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold">Heart Rate Over Time</h3>
                <p className="text-gray-500 mt-2">Graph or historical data of heart rate.</p>
                {/* Placeholder: Add a chart component like Chart.js here */}
              </div>
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-xl font-semibold">Sleep Patterns Over Time</h3>
                <p className="text-gray-500 mt-2">Graph or historical data of sleep patterns.</p>
                {/* Placeholder: Add a chart component like Chart.js here */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HealthData;