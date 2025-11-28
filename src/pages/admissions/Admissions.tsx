import { useState, useMemo } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
} from 'recharts';
import { Search, UserPlus, Phone, Mail } from 'lucide-react';
import { admissionLeadsData } from '../../data/mockData';

const Admissions = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');

    const filteredLeads = useMemo(() => {
        return admissionLeadsData.filter((lead) => {
            const matchesSearch =
                lead.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                lead.parent_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                lead.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                lead.phone.includes(searchTerm);

            const matchesStatus = statusFilter === 'All' || lead.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [searchTerm, statusFilter]);

    const leadsBySource = useMemo(() => {
        const counts: Record<string, number> = {};
        admissionLeadsData.forEach((l) => {
            counts[l.source] = (counts[l.source] || 0) + 1;
        });
        return Object.entries(counts).map(([name, value]) => ({ name, value }));
    }, []);

    const conversionData = useMemo(() => {
        const stages = ['New', 'Contacted', 'Campus Visit', 'Application Submitted', 'Enrolled'];
        const counts: Record<string, number> = {};
        admissionLeadsData.forEach((l) => {
            counts[l.status] = (counts[l.status] || 0) + 1;
        });
        return stages.map((stage) => ({ name: stage, value: counts[stage] || 0 }));
    }, []);

    const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Admissions Insights</h1>
                    <p className="text-gray-500">Track leads, applications, and enrollment trends.</p>
                </div>
                <button className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    <UserPlus size={18} />
                    <span>Add New Lead</span>
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Leads by Source</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={leadsBySource}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    fill="#8884d8"
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {leadsBySource.map((_entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Lead Status Distribution</h3>
                    <div className="h-64">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={conversionData} layout="vertical">
                                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                                <XAxis type="number" />
                                <YAxis dataKey="name" type="category" width={120} />
                                <Tooltip />
                                <Bar dataKey="value" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    <h3 className="text-lg font-semibold text-gray-800">Recent Leads</h3>

                    <div className="flex gap-4 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search leads..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <select
                            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                        >
                            <option value="All">All Status</option>
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Campus Visit">Campus Visit</option>
                            <option value="Application Submitted">Application Submitted</option>
                            <option value="Enrolled">Enrolled</option>
                            <option value="Closed">Closed</option>
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500 font-medium">
                            <tr>
                                <th className="px-6 py-3">Student Name</th>
                                <th className="px-6 py-3">Grade</th>
                                <th className="px-6 py-3">Parent / Contact</th>
                                <th className="px-6 py-3">Source</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Last Contact</th>
                                <th className="px-6 py-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredLeads.map((lead) => (
                                <tr key={lead.lead_id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-800">{lead.student_name}</td>
                                    <td className="px-6 py-4 text-gray-600">{lead.grade_applied}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-gray-800 font-medium">{lead.parent_name}</span>
                                            <div className="flex items-center text-gray-500 text-xs mt-1">
                                                <Phone size={12} className="mr-1" /> {lead.phone}
                                            </div>
                                            <div className="flex items-center text-gray-500 text-xs mt-0.5">
                                                <Mail size={12} className="mr-1" /> {lead.email}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{lead.source}</td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`px-2 py-1 rounded-full text-xs font-medium ${lead.status === 'Enrolled'
                                                    ? 'bg-green-100 text-green-700'
                                                    : lead.status === 'Closed'
                                                        ? 'bg-gray-100 text-gray-700'
                                                        : 'bg-blue-100 text-blue-700'
                                                }`}
                                        >
                                            {lead.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">{lead.last_contact_date}</td>
                                    <td className="px-6 py-4">
                                        <button className="text-blue-600 hover:text-blue-800 font-medium text-xs">View Details</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
                    <span className="text-sm text-gray-500">Showing {filteredLeads.length} leads</span>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 border border-gray-300 rounded bg-white text-sm disabled:opacity-50" disabled>
                            Previous
                        </button>
                        <button className="px-3 py-1 border border-gray-300 rounded bg-white text-sm">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Admissions;
