import React, { useState } from 'react';
import { Button, Badge } from './ui-components';
import { Search, Filter, CheckCircle, XCircle, Eye } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export interface Report {
  id: string;
  studentId: string;
  issueType: string;
  reason: string;
  status: 'Approved' | 'Rejected' | 'Pending';
  date: string;
  proofImage?: string;
  comment?: string;
}

interface AdminDashboardProps {
  reports: Report[];
  onUpdateStatus: (id: string, status: 'Approved' | 'Rejected') => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ reports, onUpdateStatus }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredReports = reports.filter(r => 
    r.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.issueType.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 space-y-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: 'Total Reports', value: reports.length, color: 'bg-blue-50 text-blue-700' },
          { label: 'Pending', value: reports.filter(r => r.status === 'Pending').length, color: 'bg-yellow-50 text-yellow-700' },
          { label: 'Resolved', value: reports.filter(r => r.status !== 'Pending').length, color: 'bg-green-50 text-green-700' },
        ].map((stat, i) => (
          <div key={i} className={`p-6 rounded-xl border border-slate-100 shadow-sm bg-white`}>
            <p className="text-sm font-medium text-slate-500">{stat.label}</p>
            <p className={`text-3xl font-bold mt-2 ${stat.color.split(' ')[1]}`}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-200 flex flex-wrap gap-4 items-center justify-between">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by Student ID or Issue Type..."
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button variant="secondary" size="sm" className="gap-2">
            <Filter size={16} /> Filter
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 text-slate-600 text-sm uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Student ID</th>
                <th className="px-6 py-4 font-semibold">Issue Type</th>
                <th className="px-6 py-4 font-semibold">Reason</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Proof</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredReports.map((report) => (
                <tr key={report.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-900">{report.studentId}</td>
                  <td className="px-6 py-4 text-slate-600">{report.issueType}</td>
                  <td className="px-6 py-4 text-slate-600 max-w-xs truncate">{report.reason}</td>
                  <td className="px-6 py-4">
                    <Badge status={report.status} />
                  </td>
                  <td className="px-6 py-4">
                    {report.proofImage ? (
                      <div className="w-10 h-10 rounded border border-slate-200 overflow-hidden cursor-pointer hover:ring-2 hover:ring-blue-500 transition-all">
                        <ImageWithFallback 
                          src={report.proofImage} 
                          alt="Proof" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400">No image</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    {report.status === 'Pending' ? (
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => onUpdateStatus(report.id, 'Approved')}
                          className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                          title="Approve"
                        >
                          <CheckCircle size={20} />
                        </button>
                        <button 
                          onClick={() => onUpdateStatus(report.id, 'Rejected')}
                          className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Reject"
                        >
                          <XCircle size={20} />
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-400 font-medium italic">Processed</span>
                    )}
                  </td>
                </tr>
              ))}
              {filteredReports.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-500 italic">
                    No reports found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
