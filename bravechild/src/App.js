//Library imports
import { BrowserRouter as Router, Route, Routes } from 'react-router';

// Page imports
import HomePage from './HomePage';
import Login from './components/login'
import CreateUser from './components/CreateUser'
import SponsorDonation from './components/SponsorDonation'

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/create-user" element={<CreateUser />} />
                <Route path="/sponsor-donation" element={<SponsorDonation />} />
            </Routes>
        </Router>
    )  
}

export default App;