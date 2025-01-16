//Library imports
import { BrowserRouter as Router, Route, Routes } from 'react-router';

// Page imports
import HomePage from './HomePage';
import Login from './components/Login'
import CreateUser from './components/CreateUser'

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/create-user" element={<CreateUser />} />
            </Routes>
        </Router>
    )  
}

export default App;