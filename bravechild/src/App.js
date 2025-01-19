//Library imports
import { BrowserRouter as Router, Route, Routes } from 'react-router';
import UseToken from './services/UseToken';

// Page imports
import HomePage from './HomePage';
import Login from './components/Login'
import CreateUser from './components/CreateUser'
import DonoPage from './components/Donation'

function App() {
    const { token, setToken } = UseToken();

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login setToken={setToken} />} />
                <Route path="/create-user" element={<CreateUser />} />
                <Route path="/donate" element={<DonoPage />} />
            </Routes>
        </Router>
    )  
}

export default App;