//Library imports
import { BrowserRouter as Router, Route, Routes } from 'react-router';

// ProtectedRoutes import
import ProtectedRoute from './components/ProtectedRoutes';
// Page imports
import HomePage from './HomePage';
import Login from './components/Login'
import CreateUser from './components/CreateUser'
import DonoPage from './components/Donation'
import SponsorDonations from './components/SponsorDonations';
import UserDashboard from './components/UserDashboard';
import SpecificChildDonations from './components/SpecificChildDonations';
import NumbersDonationForm from './components/NumbersDonationForm';
import SuperAdminPage from './components/SuperAdminPage';

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/create-user" element={<CreateUser />} />
                <Route path="/donate" element={<DonoPage />} />
                <Route path="/sponsor-donations" element={<SponsorDonations />} />
                <Route path="/child-donations" element={<SpecificChildDonations />} />
                <Route path="/child-donations/numbers-donation-form" element={<NumbersDonationForm />} />
                <Route path="/user-dashboard" element={<ProtectedRoute route= {<UserDashboard />} > <UserDashboard /> </ProtectedRoute> } />

                <Route path="/super/secret/page" element={<ProtectedRoute route={ <SuperAdminPage /> } allowedRoles={['super_admin']}> <SuperAdminPage /> </ProtectedRoute> } />
            </Routes>
        </Router>
    )  
}

export default App;