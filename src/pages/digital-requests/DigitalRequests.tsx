import { useState, useMemo } from 'react';
import { Search, X, User, Tag } from 'lucide-react';
import { digitalRequestsData, DigitalRequest } from '../../data/mockData';

const DigitalRequests = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All');
    const [deptFilter, setDeptFilter] = useState('All');
    const [priorityFilter, setPriorityFilter] = useState('All');
    const [selectedRequest, setSelectedRequest] = useState<DigitalRequest | null>(null);

    // --- Filtering ---

    const filteredRequests = useMemo(() => {
        return digitalRequestsData.filter(req => {
            const matchesSearch =
                req.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                req.request_type.toLowerCase().includes(searchTerm.toLowerCase()) ||
                req.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                req.requested_by.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesStatus = statusFilter === 'All' || req.status === statusFilter;
            const matchesDept = deptFilter === 'All' || req.department === deptFilter;
            const matchesPriority = priorityFilter === 'All' || req.priority === priorityFilter;

            return matchesSearch && matchesStatus && matchesDept && matchesPriority;
        });
    }, [searchTerm, statusFilter, deptFilter, priorityFilter]);

    // --- UI Helpers ---

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'Critical': return 'bg-red-100 text-red-700';
            case 'High': return 'bg-orange-100 text-orange-700';
            case 'Medium': return 'bg-yellow-100 text-yellow-700';
            default: return 'bg-green-100 text-green-700';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Completed': return 'bg-green-100 text-green-700';
            case 'In Progress': return 'bg-blue-100 text-blue-700';
            case 'Rejected': return 'bg-red-100 text-red-700';
            case 'On Hold': return 'bg-gray-100 text-gray-700';
            default: return 'bg-purple-100 text-purple-700';
        }
    };

    return (
        <div className="flex h-[calc(100vh-8rem)]">
            {/* Main List */}
            <div className={`flex-1 flex flex-col bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden ${selectedRequest ? 'mr-6 hidden lg:flex' : ''}`}>
                {/* Toolbar */}
                <div className="p-4 border-b border-gray-100 space-y-4">
                    <div className="flex justify-between items-center">
                        <h2 className="text-lg font-bold text-gray-800">Digital Requests</h2>
                        <span className="text-sm text-gray-500">{filteredRequests.length} requests found</span>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search requests..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
                            <select
                                className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="All">All Status</option>
                                <option value="New">New</option>
                                <option value="In Progress">In Progress</option>
                                <option value="On Hold">On Hold</option>
                                <option value="Completed">Completed</option>
                                <option value="Rejected">Rejected</option>
                            </select>

                            <select
                                className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={deptFilter}
                                onChange={(e) => setDeptFilter(e.target.value)}
                            >
                                <option value="All">All Depts</option>
                                <option value="Admissions">Admissions</option>
                                <option value="Marketing">Marketing</option>
                                <option value="IT">IT</option>
                                <option value="Academic">Academic</option>
                                <option value="Management">Management</option>
                            </select>

                            <select
                                className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={priorityFilter}
                                onChange={(e) => setPriorityFilter(e.target.value)}
                            >
                                <option value="All">All Priorities</option>
                                <option value="Critical">Critical</option>
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="flex-1 overflow-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500 font-medium sticky top-0 z-10">
                            <tr>
                                <th className="px-6 py-3">ID</th>
                                <th className="px-6 py-3">Type</th>
                                <th className="px-6 py-3">Department</th>
                                <th className="px-6 py-3">Priority</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Due Date</th>
                                <th className="px-6 py-3">Assigned To</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredRequests.map((req) => (
                                <tr
                                    key={req.id}
                                    onClick={() => setSelectedRequest(req)}
                                    className={`cursor-pointer hover:bg-blue-50 transition-colors ${selectedRequest?.id === req.id ? 'bg-blue-50' : ''}`}
                                >
                                    <td className="px-6 py-4 font-medium text-blue-600">{req.id}</td>
                                    <td className="px-6 py-4 text-gray-800">{req.request_type}</td>
                                    <td className="px-6 py-4 text-gray-600">{req.department}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(req.priority)}`}>
                                            {req.priority}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(req.status)}`}>
                                            {req.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">{req.due_date}</td>
                                    <td className="px-6 py-4 text-gray-600 flex items-center gap-2">
                                        <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
                                            {req.assigned_to.charAt(0)}
                                        </div>
                                        {req.assigned_to}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Detail Panel */}
            {selectedRequest && (
                <div className="w-full lg:w-96 bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col overflow-hidden animate-in slide-in-from-right-10 duration-300">
                    <div className="p-4 border-b border-gray-100 flex justify-between items-start bg-gray-50">
                        <div>
                            <h3 className="font-bold text-lg text-gray-800">{selectedRequest.id}</h3>
                            <p className="text-sm text-gray-500">Created on {selectedRequest.created_at}</p>
                        </div>
                        <button onClick={() => setSelectedRequest(null)} className="text-gray-400 hover:text-gray-600">
                            <X size={20} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        <div>
                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Request Details</label>
                            <h4 className="text-lg font-medium text-gray-800 mt-1">{selectedRequest.request_type}</h4>
                            <p className="text-gray-600 mt-2 text-sm leading-relaxed">{selectedRequest.description}</p>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-2 text-gray-500 mb-1">
                                    <User size={14} />
                                    <span className="text-xs font-medium">Requested By</span>
                                </div>
                                <p className="text-sm font-semibold text-gray-800">{selectedRequest.requested_by}</p>
                            </div>
                            <div className="p-3 bg-gray-50 rounded-lg">
                                <div className="flex items-center gap-2 text-gray-500 mb-1">
                                    <Tag size={14} />
                                    <span className="text-xs font-medium">Department</span>
                                </div>
                                <p className="text-sm font-semibold text-gray-800">{selectedRequest.department}</p>
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Status & Timeline</label>
                            <div className="mt-3 space-y-4">
                                {selectedRequest.timeline.map((event, idx) => (
                                    <div key={idx} className="flex gap-3">
                                        <div className="flex flex-col items-center">
                                            <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5"></div>
                                            {idx < selectedRequest.timeline.length - 1 && <div className="w-0.5 h-full bg-gray-100 mt-1"></div>}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-800">{event.status}</p>
                                            <p className="text-xs text-gray-500">{event.date}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Comments</label>
                            <div className="mt-3 space-y-3">
                                {selectedRequest.comments.map((comment, idx) => (
                                    <div key={idx} className="bg-gray-50 p-3 rounded-lg">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-xs font-bold text-gray-700">{comment.user}</span>
                                            <span className="text-xs text-gray-400">{comment.date}</span>
                                        </div>
                                        <p className="text-sm text-gray-600">{comment.text}</p>
                                    </div>
                                ))}
                                {selectedRequest.comments.length === 0 && (
                                    <p className="text-sm text-gray-400 italic">No comments yet.</p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="p-4 border-t border-gray-100 bg-gray-50">
                        <button className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors">
                            Add Comment
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DigitalRequests;
