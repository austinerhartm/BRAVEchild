//Library imports
import { BrowserRouter as Router, Route, Routes } from 'react-router';

// Page imports
import HomePage from './HomePage';
import LoginPage from './components/login'

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
            </Routes>
        </Router>
    )  
}

export default App;