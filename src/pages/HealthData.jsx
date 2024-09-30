import React, { useState, useEffect } from "react";
import { FaHeartbeat, FaBed } from "react-icons/fa";
import Navbar from "../components/Navbar";
import { gapi } from "gapi-script";
import { auth, provider } from "../context/Firebase"; 
import { useFirebase } from "../context/Firebase";

const CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID";
const API_KEY = "YOUR_GOOGLE_API_KEY";
const SCOPES = "https://www.googleapis.com/auth/fitness.activity.read https://www.googleapis.com/auth/fitness.heart_rate.read https://www.googleapis.com/auth/fitness.sleep.read";

const HealthData = () => {
  const [heartRate, setHeartRate] = useState(null);
  const [sleepHours, setSleepHours] = useState(null);
  const [sleepQuality, setSleepQuality] = useState(null);
  const [user, setUser] = useState(null); // Track Firebase Auth user

  // Firebase Google Sign-in
  const signInWithGoogle = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        setUser(result.user);
        initializeGoogleFitAPI(); // Initialize Google Fit API after login
      })
      .catch((error) => {
        console.error("Error during sign-in:", error);
      });
  };

  // Initialize Google Fit API after user signs in
  const initializeGoogleFitAPI = () => {
    function start() {
      gapi.client.init({
        apiKey: API_KEY,
        clientId: CLIENT_ID,
        scope: SCOPES,
        discoveryDocs: ["https://www.googleapis.com/discovery/v1/apis/fitness/v1/rest"],
      });
    }
    gapi.load("client:auth2", start);
  };

  // Fetch health data from Google Fit
  const fetchHealthData = async () => {
    try {
      const authInstance = gapi.auth2.getAuthInstance();
      if (!authInstance.isSignedIn.get()) {
        await authInstance.signIn();
      }

      // Fetch heart rate data
      const heartRateData = await gapi.client.fitness.users.dataSources.datasets.get({
        userId: "me",
        dataSourceId: "derived:com.google.heart_rate.bpm:com.google.android.gms:merge_heart_rate_bpm",
        datasetId: "startTime-endTime",
      });
      setHeartRate(heartRateData.point[0]?.value[0]?.fpVal || "N/A");

      // Fetch sleep data
      const sleepData = await gapi.client.fitness.users.dataSources.datasets.get({
        userId: "me",
        dataSourceId: "derived:com.google.sleep.segment:com.google.android.gms:merge_sleep_segments",
        datasetId: "startTime-endTime",
      });
      const sleepHours = calculateSleepHours(sleepData);
      setSleepHours(sleepHours);
      setSleepQuality(sleepHours >= 7 ? "Good" : "Poor");
    } catch (error) {
      console.error("Error fetching Google Fit data:", error);
    }
  };

  const calculateSleepHours = (sleepData) => {
    // Implement logic to calculate sleep hours from the data points returned
    return 7.5; // Placeholder logic for demo
  };

  useEffect(() => {
    if (user) {
      fetchHealthData();
    }
  }, [user]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          {!user ? (
            <div className="text-center">
              <h2 className="text-2xl">Sign in to access your health data</h2>
              <button
                className="bg-blue-500 text-white p-4 mt-4 rounded"
                onClick={signInWithGoogle}
              >
                Sign in with Google
              </button>
            </div>
          ) : (
            <>
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
                    <p className="text-4xl font-semibold mt-2">{heartRate ? `${heartRate} BPM` : "Loading..."}</p>
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
                    <p className="text-lg font-semibold mt-2">{sleepHours ? `${sleepHours} hours` : "Loading..."}</p>
                    <p className="text-lg text-green-500">{sleepQuality}</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default HealthData;