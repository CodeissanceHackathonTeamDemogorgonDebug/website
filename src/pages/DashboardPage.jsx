import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";
import { useFirebase } from "../context/Firebase"; // Import useFirebase to access Firestore
import { collection, getDocs } from "firebase/firestore";

const Dashboard = () => {
  const { db } = useFirebase();
  const [healthProgress, setHealthProgress] = useState(100);
  const [upcomingEvents, setUpcomingEvents] = useState([]); // State to hold upcoming events

  const features = [
    { icon: "🔔", title: "Reminders", count: 3, route: "/reminder" },
    { icon: "📞", title: "Appointment", count: 2, route: "/calls" },
    { icon: "⚠️", title: "Alerts", count: 0, route: "/alerts" },
    { icon: "❤️", title: "Health", count: 1, route: "/health" },
  ];

  // Fetch appointments from Firestore
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'AppointmentRequest'));
        const events = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUpcomingEvents(events);
      } catch (error) {
        console.error("Error fetching appointments: ", error);
      }
    };
    fetchAppointments();
  }, [db]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <header className="mb-8">
            <h1 className="text-4xl font-bold text-gray-900">Welcome to CareMate</h1>
            <p className="text-xl text-gray-600 mt-2">Your personal care assistant</p>
          </header>

          {/* Features Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {features.map((feature, index) => (
              <Link key={index} to={feature.route}>
                <div className="bg-white p-6 rounded-lg shadow-lg text-center cursor-pointer">
                  <div className="text-2xl mb-4">{feature.icon}</div>
                  <h3 className="text-lg font-semibold">{feature.title}</h3>
                  <p className="text-3xl font-bold">{feature.count}</p>
                </div>
              </Link>
            ))}
          </div>

          {/* Health Overview and Upcoming Events */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Health Overview Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-2">Health Overview</h2>
              <p className="text-gray-500 mb-4">Your daily health summary</p>
              <div className="flex items-center justify-between mb-4">
                <p className="text-lg font-semibold">Overall Health</p>
                <p className="text-green-500 text-2xl font-bold">{healthProgress}%</p>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-4 mb-4">
                <div
                  className="bg-green-500 h-4 rounded-full"
                  style={{ width: `${healthProgress}%` }}
                ></div>
              </div>
              <button
                onClick={() => setHealthProgress((prev) => Math.min(prev + 5, 100))}
                className="bg-black text-white px-4 py-2 w-full rounded-lg"
              >
                Update Health Data
              </button>
            </div>

            {/* Upcoming Events Card */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-bold mb-2">Upcoming Events</h2>
              <p className="text-gray-500 mb-4">Your schedule for today</p>
              <div className="space-y-4">
                {upcomingEvents.length === 0 ? (
                  <p>No upcoming appointments</p>
                ) : (
                  upcomingEvents.map((event, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-2 bg-gray-100 rounded-lg"
                    >
                      <div className="flex items-center">
                        <span className="text-lg mr-4">📅</span>
                        <div>
                          <p className="font-semibold">{event.title || "Appointment"}</p>
                          <p className="text-gray-500">{event.date && event.date.toDate().toLocaleString()}</p>
                        </div>
                      </div>
                      <span className="text-gray-400">{">"}</span>
                    </div>
                  ))
                )}
              </div>
              <button className="mt-4 bg-transparent border border-gray-500 text-gray-500 px-4 py-2 w-full rounded-lg">
                View All Events
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
