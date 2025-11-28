import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/admin/Dashboard';
import DigitalRequests from './pages/digital-requests/DigitalRequests';
import Admissions from './pages/admissions/Admissions';
import ITAssets from './pages/it-assets/ITAssets';
import Layout from './components/Layout';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />

                {/* Admin Routes */}
                <Route element={<Layout role="admin" />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/digital-requests" element={<DigitalRequests />} />
                    <Route path="/admissions" element={<Admissions />} />
                    <Route path="/it-assets" element={<ITAssets />} />
                    <Route path="/settings" element={<div className="p-4">Settings Page (Placeholder)</div>} />
                </Route>

                {/* Operations Routes - Reusing same components but Layout handles visibility */}
                <Route element={<Layout role="operations" />}>
                    {/* Operations sees same dashboard/requests/admissions but NO IT Assets */}
                    <Route path="/ops/dashboard" element={<Dashboard />} />
                    <Route path="/ops/digital-requests" element={<DigitalRequests />} />
                    <Route path="/ops/admissions" element={<Admissions />} />
                    <Route path="/ops/settings" element={<div className="p-4">Settings Page (Placeholder)</div>} />
                </Route>

                {/* Catch all */}
                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
