import { Routes, BrowserRouter as Router, Route } from 'react-router-dom';

import Signup from '../Features/Chat/Components/Signup/Signup';
import Chat from '../Features/Chat/Components/Chat';

import { AuthProvider } from '../Features/Chat/Context/Auth';

import './App.css';

const App = () => {
    return (
        <div className="general-layout">
            <Router basename="/">
                <AuthProvider>
                    <Routes>
                        <Route path="/" element={<Signup />} />
                        <Route path="/chat" element={<Chat />} />
                    </Routes>
                </AuthProvider>
            </Router>
        </div>
    );
};

export default App;
