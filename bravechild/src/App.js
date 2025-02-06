//Library imports
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import UseToken from './services/UseToken';

// Page imports
import HomePage from './HomePage';
import Login from './components/login'
import CreateUser from './components/CreateUser'
import DonoPage from './components/Donation'
import SponsorDonations from './components/SponsorDonations';
import UserDashboard from './components/UserDashboard';

function App() {
    const { token, setToken } = UseToken();

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login setToken={setToken} />} />
                <Route path="/create-user" element={<CreateUser />} />
                <Route path="/donate" element={<DonoPage />} />
                <Route path="/sponsor-donations" element={<SponsorDonations />} />
                <Route path="/user-dashboard" element={<UserDashboard />} />
            </Routes>
        </Router>
    )  
}

export default App;