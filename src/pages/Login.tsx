
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Lock, User, ArrowRight } from 'lucide-react';

const Login = () => {
    const navigate = useNavigate();
    const [role, setRole] = useState<'admin' | 'operations'>('admin');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock login - accept any input
        if (role === 'admin') {
            navigate('/dashboard');
        } else {
            navigate('/ops/dashboard');
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50 p-4">
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
                <div className="p-8 pb-0 text-center">
                    <div className="w-16 h-16 bg-blue-700 rounded-lg mx-auto flex items-center justify-center text-white text-3xl font-bold mb-4 shadow-lg">
                        A
                    </div>
                    <h1 className="text-2xl font-bold text-gray-800 mb-2">Achariya Unified Internal Portal</h1>
                    <p className="text-gray-500 text-sm">Internal access for digital, admissions, and asset insights</p>
                </div>

                <div className="p-8">
                    <form onSubmit={handleLogin} className="space-y-5">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Select Role</label>
                            <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-lg">
                                <button
                                    type="button"
                                    onClick={() => setRole('admin')}
                                    className={`py-2 text-sm font-medium rounded-md transition-all ${role === 'admin'
                                            ? 'bg-white text-blue-700 shadow-sm'
                                            : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    Admin
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRole('operations')}
                                    className={`py-2 text-sm font-medium rounded-md transition-all ${role === 'operations'
                                            ? 'bg-white text-blue-700 shadow-sm'
                                            : 'text-gray-500 hover:text-gray-700'
                                        }`}
                                >
                                    Operations
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email or Username</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <User size={18} className="text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    placeholder={role === 'admin' ? 'admin@achariya.in' : 'ops@achariya.in'}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Lock size={18} className="text-gray-400" />
                                </div>
                                <input
                                    type="password"
                                    className="pl-10 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-700 text-white py-2.5 rounded-lg hover:bg-blue-800 transition-colors font-medium flex items-center justify-center space-x-2 shadow-md hover:shadow-lg"
                        >
                            <span>Log In</span>
                            <ArrowRight size={18} />
                        </button>
                    </form>

                    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
                        <p className="text-xs font-semibold text-blue-800 mb-2 uppercase tracking-wider">Example Credentials</p>
                        <div className="space-y-1 text-xs text-blue-700">
                            <p><span className="font-medium">Admin:</span> admin@achariya.in / Admin123</p>
                            <p><span className="font-medium">Operations:</span> ops@achariya.in / Ops123</p>
                        </div>
                    </div>

                    <div className="mt-6 text-center">
                        <p className="text-xs text-gray-400">
                            Need help? Contact IT Support at <a href="mailto:support@achariya.in" className="text-blue-600 hover:underline">support@achariya.in</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
