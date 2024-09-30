import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Caregiver from './pages/CaregiverPage';
import Dashboard from './pages/DashboardPage'; 
import Navbar from './components/Navbar'; 
import Marketplace from './pages/Marketplace';
import LoginPage from './pages/login';
import { FirebaseProvider } from './context/Firebase';
import Reminders from './components/Reminders';
// import { FirebaseProvider } from './context/Firebase';

function App() {
  return (
    <FirebaseProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/caregiver" element={<Caregiver />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/marketplace" element={<Marketplace/>} />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/reminder" element={<Reminders/>} />
          <Route path="/calls" element={<Home />} />
          <Route path="/alerts" element={<Home />} />
          <Route path="/health" element={<Home />} />
          
        </Routes>
      </Router>
      </FirebaseProvider>
   
  );
}

export default App;