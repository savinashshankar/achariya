import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { FileText, Users, Monitor, AlertCircle, ArrowUp, ArrowDown } from 'lucide-react';
import { digitalRequestsData, admissionLeadsData, itAssetsData } from '../../data/mockData';

const Dashboard = () => {
  const navigate = useNavigate();

  // --- Calculations ---

  const totalDigitalRequests = digitalRequestsData.length;
  const highPriorityRequests = digitalRequestsData.filter(r => r.priority === 'High' || r.priority === 'Critical').length;
  const admissionsLeadsMonth = admissionLeadsData.filter(l => {
    const date = new Date(l.created_at);
    const now = new Date();
    return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
  }).length;
  const activeSensesPanels = itAssetsData.filter(a => a.asset_type === 'Senses Panel' && a.condition === 'Working').length;

  // Chart 1: Digital Requests by Status
  const requestsByStatus = useMemo(() => {
    const counts: Record<string, number> = {};
    digitalRequestsData.forEach(r => {
      counts[r.status] = (counts[r.status] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, []);

  // Chart 2: Digital Requests by Department
  const requestsByDept = useMemo(() => {
    const counts: Record<string, number> = {};
    digitalRequestsData.forEach(r => {
      counts[r.department] = (counts[r.department] || 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, []);

  // Chart 3: Admissions Leads per Week (Simplified to last 7 days for demo)
  const leadsPerDay = useMemo(() => {
    const counts: Record<string, number> = {};
    admissionLeadsData.forEach(l => {
      counts[l.created_at] = (counts[l.created_at] || 0) + 1;
    });
    return Object.entries(counts)
      .sort((a, b) => new Date(a[0]).getTime() - new Date(b[0]).getTime())
      .slice(-7)
      .map(([date, count]) => ({ date, count }));
  }, []);

  // Chart 4: Senses Panels by Campus and Condition
  const panelsByCampus = useMemo(() => {
    const data: Record<string, any> = {};
    itAssetsData.filter(a => a.asset_type === 'Senses Panel').forEach(a => {
      if (!data[a.campus]) {
        data[a.campus] = { name: a.campus, Working: 0, 'Needs Service': 0, 'Not Working': 0 };
      }
      data[a.campus][a.condition]++;
    });
    return Object.values(data);
  }, []);

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

  // --- Components ---

  const SummaryCard = ({ title, value, trend, icon: Icon, color, onClick }: any) => (
    <div
      onClick={onClick}
      className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition-shadow"
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-gray-500 mb-1">{title}</p>
          <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
        </div>
        <div className={`p-2 rounded-lg ${color}`}>
          <Icon size={20} className="text-white" />
        </div>
      </div>
      <div className="mt-4 flex items-center text-sm">
        <span className={`flex items-center font-medium ${trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
          {trend.startsWith('+') ? <ArrowUp size={14} className="mr-1" /> : <ArrowDown size={14} className="mr-1" />}
          {trend}
        </span>
        <span className="text-gray-400 ml-2">vs last month</span>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Welcome to Achariya Unified Internal Portal</h1>
        <p className="text-gray-500 mt-1">Quick view of requests, admissions, and assets</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <SummaryCard
          title="Total Digital Requests"
          value={totalDigitalRequests}
          trend="+12"
          icon={FileText}
          color="bg-blue-600"
          onClick={() => navigate('/digital-requests')}
        />
        <SummaryCard
          title="High Priority Pending"
          value={highPriorityRequests}
          trend="+5"
          icon={AlertCircle}
          color="bg-red-500"
          onClick={() => navigate('/digital-requests?priority=High')}
        />
        <SummaryCard
          title="Admissions Leads"
          value={admissionsLeadsMonth}
          trend="+8%"
          icon={Users}
          color="bg-green-500"
          onClick={() => navigate('/admissions')}
        />
        <SummaryCard
          title="Active Senses Panels"
          value={activeSensesPanels}
          trend="+2"
          icon={Monitor}
          color="bg-purple-500"
          onClick={() => navigate('/it-assets')}
        />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Digital Requests by Status */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Digital Requests by Status</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={requestsByStatus} onClick={(data) => data && navigate(`/digital-requests?status=${data.activeLabel}`)}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Digital Requests by Department */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Requests by Department</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={requestsByDept}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  fill="#8884d8"
                  paddingAngle={5}
                  dataKey="value"
                  onClick={(data) => navigate(`/digital-requests?department=${data.name}`)}
                >
                  {requestsByDept.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Admissions Leads Trend */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Admissions Leads (Last 7 Days)</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={leadsPerDay} onClick={(data) => data && navigate('/admissions')}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="count" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Senses Panels by Campus */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Senses Panels Status by Campus</h3>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={panelsByCampus} onClick={(data) => data && navigate(`/it-assets?campus=${data.activeLabel}`)}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="Working" stackId="a" fill="#10b981" />
                <Bar dataKey="Needs Service" stackId="a" fill="#f59e0b" />
                <Bar dataKey="Not Working" stackId="a" fill="#ef4444" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-semibold text-gray-800">Recent Activity</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 font-medium">
              <tr>
                <th className="px-6 py-3">Type</th>
                <th className="px-6 py-3">Description</th>
                <th className="px-6 py-3">Date</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {digitalRequestsData.slice(0, 5).map((req) => (
                <tr key={req.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-blue-600 font-medium">Digital Request</td>
                  <td className="px-6 py-4 text-gray-800">{req.request_type} - {req.department}</td>
                  <td className="px-6 py-4 text-gray-500">{req.created_at}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium 
                      ${req.status === 'Completed' ? 'bg-green-100 text-green-700' :
                        req.status === 'In Progress' ? 'bg-blue-100 text-blue-700' :
                          'bg-gray-100 text-gray-700'}`}>
                      {req.status}
                    </span>
                  </td>
                </tr>
              ))}
              {admissionLeadsData.slice(0, 5).map((lead) => (
                <tr key={lead.lead_id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-green-600 font-medium">Admission Lead</td>
                  <td className="px-6 py-4 text-gray-800">New lead: {lead.student_name} ({lead.grade_applied})</td>
                  <td className="px-6 py-4 text-gray-500">{lead.created_at}</td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                      {lead.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
