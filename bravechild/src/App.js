import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, StyledEngineProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './styles/theme';

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
import LearnMore from './components/LearnMore';

function App() {
    return (
        <StyledEngineProvider injectFirst>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Router>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/create-user" element={<CreateUser />} />
                        <Route path="/sponsor-donations" element={<SponsorDonations />} />
                        <Route path="/child-donations/:linkId" element={<SpecificChildDonations />} />
                        <Route path="/child-donations/numbers-donation-form" element={<NumbersDonationForm />} />
                        <Route path="/user-dashboard" element={
                            <ProtectedRoute route={<UserDashboard />}>
                                <UserDashboard />
                            </ProtectedRoute>
                        } />
                        <Route path="/super/secret/page" element={
                            <ProtectedRoute route={<SuperAdminPage />} allowedRoles={['super_admin']}>
                                <SuperAdminPage />
                            </ProtectedRoute>
                        } />
                    </Routes>
                </Router>
            </ThemeProvider>
        </StyledEngineProvider>
    );
}

export default App;