import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    const handleLogin = (role: string) => {
        // Mock login logic
        if (role === 'student') navigate('/student/courses');
        if (role === 'teacher') navigate('/teacher/classes');
        if (role === 'admin') navigate('/admin/dashboard');
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">Achariya Portal</h1>
                <div className="space-y-4">
                    <button
                        onClick={() => handleLogin('student')}
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
                    >
                        Login as Student
                    </button>
                    <button
                        onClick={() => handleLogin('teacher')}
                        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-600 transition"
                    >
                        Login as Teacher
                    </button>
                    <button
                        onClick={() => handleLogin('admin')}
                        className="w-full bg-purple-500 text-white py-2 rounded hover:bg-purple-600 transition"
                    >
                        Login as Admin
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
