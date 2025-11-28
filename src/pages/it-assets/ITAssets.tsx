import { useState, useMemo } from 'react';
import { Search, Monitor, MapPin, Calendar, Wrench, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { itAssetsData } from '../../data/mockData';

const ITAssets = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [campusFilter, setCampusFilter] = useState('All');
    const [conditionFilter, setConditionFilter] = useState('All');

    // --- Filtering ---

    const filteredAssets = useMemo(() => {
        return itAssetsData.filter(asset => {
            const matchesSearch =
                asset.asset_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                asset.serial_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
                asset.room_no.toLowerCase().includes(searchTerm.toLowerCase()) ||
                asset.vendor_name.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesCampus = campusFilter === 'All' || asset.campus === campusFilter;
            const matchesCondition = conditionFilter === 'All' || asset.condition === conditionFilter;

            return matchesSearch && matchesCampus && matchesCondition;
        });
    }, [searchTerm, campusFilter, conditionFilter]);

    // --- Summary Stats ---

    const totalAssets = itAssetsData.length;
    const workingAssets = itAssetsData.filter(a => a.condition === 'Working').length;
    const needsServiceAssets = itAssetsData.filter(a => a.condition === 'Needs Service').length;
    const notWorkingAssets = itAssetsData.filter(a => a.condition === 'Not Working').length;
    const activeAMC = itAssetsData.filter(a => a.amc_status === 'Active').length;

    const getConditionColor = (condition: string) => {
        switch (condition) {
            case 'Working': return 'bg-green-100 text-green-700';
            case 'Needs Service': return 'bg-orange-100 text-orange-700';
            default: return 'bg-red-100 text-red-700';
        }
    };

    const getConditionIcon = (condition: string) => {
        switch (condition) {
            case 'Working': return <CheckCircle2 size={16} className="text-green-600" />;
            case 'Needs Service': return <Wrench size={16} className="text-orange-600" />;
            default: return <AlertTriangle size={16} className="text-red-600" />;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">IT Assets - Senses Panels</h1>
                    <p className="text-gray-500">Track and manage Senses Panel inventory and maintenance.</p>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Total Panels</p>
                            <p className="text-2xl font-bold text-gray-800">{totalAssets}</p>
                        </div>
                        <Monitor className="text-blue-600" size={24} />
                    </div>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Working</p>
                            <p className="text-2xl font-bold text-green-600">{workingAssets}</p>
                        </div>
                        <CheckCircle2 className="text-green-600" size={24} />
                    </div>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Needs Service</p>
                            <p className="text-2xl font-bold text-orange-600">{needsServiceAssets}</p>
                        </div>
                        <Wrench className="text-orange-600" size={24} />
                    </div>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Not Working</p>
                            <p className="text-2xl font-bold text-red-600">{notWorkingAssets}</p>
                        </div>
                        <AlertTriangle className="text-red-600" size={24} />
                    </div>
                </div>

                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-500 mb-1">Active AMC</p>
                            <p className="text-2xl font-bold text-blue-600">{activeAMC}</p>
                        </div>
                        <Calendar className="text-blue-600" size={24} />
                    </div>
                </div>
            </div>

            {/* Assets Table */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    <h3 className="text-lg font-semibold text-gray-800">All Senses Panels</h3>

                    <div className="flex gap-4 w-full md:w-auto">
                        <div className="relative flex-1 md:w-64">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search assets..."
                                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>

                        <select
                            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={campusFilter}
                            onChange={(e) => setCampusFilter(e.target.value)}
                        >
                            <option value="All">All Campuses</option>
                            <option value="ASM">ASM</option>
                            <option value="ABSM">ABSM</option>
                            <option value="SSV">SSV</option>
                            <option value="AASC">AASC</option>
                            <option value="ACET">ACET</option>
                        </select>

                        <select
                            className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={conditionFilter}
                            onChange={(e) => setConditionFilter(e.target.value)}
                        >
                            <option value="All">All Conditions</option>
                            <option value="Working">Working</option>
                            <option value="Needs Service">Needs Service</option>
                            <option value="Not Working">Not Working</option>
                        </select>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-50 text-gray-500 font-medium">
                            <tr>
                                <th className="px-6 py-3">Asset ID</th>
                                <th className="px-6 py-3">Campus / Room</th>
                                <th className="px-6 py-3">Serial No</th>
                                <th className="px-6 py-3">Vendor</th>
                                <th className="px-6 py-3">Condition</th>
                                <th className="px-6 py-3">AMC Status</th>
                                <th className="px-6 py-3">Last Service</th>
                                <th className="px-6 py-3">Next Service</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {filteredAssets.map((asset) => (
                                <tr key={asset.asset_id} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-blue-600">{asset.asset_id}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-gray-800 font-medium">{asset.campus}</span>
                                            <div className="flex items-center text-gray-500 text-xs mt-0.5">
                                                <MapPin size={12} className="mr-1" /> {asset.room_no}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600 font-mono text-xs">{asset.serial_no}</td>
                                    <td className="px-6 py-4 text-gray-600">{asset.vendor_name}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            {getConditionIcon(asset.condition)}
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getConditionColor(asset.condition)}`}>
                                                {asset.condition}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium 
                      ${asset.amc_status === 'Active' ? 'bg-green-100 text-green-700' :
                                                asset.amc_status === 'Expired' ? 'bg-red-100 text-red-700' :
                                                    'bg-gray-100 text-gray-700'}`}>
                                            {asset.amc_status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">{asset.last_serviced_date}</td>
                                    <td className="px-6 py-4 text-gray-500">{asset.next_service_date}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="p-4 border-t border-gray-100 bg-gray-50 flex justify-between items-center">
                    <span className="text-sm text-gray-500">Showing {filteredAssets.length} assets</span>
                    <div className="flex gap-2">
                        <button className="px-3 py-1 border border-gray-300 rounded bg-white text-sm disabled:opacity-50" disabled>Previous</button>
                        <button className="px-3 py-1 border border-gray-300 rounded bg-white text-sm">Next</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ITAssets;
