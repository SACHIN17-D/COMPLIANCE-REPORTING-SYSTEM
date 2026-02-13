import React, { useState } from 'react';
import { Button, Badge } from './ui-components';
import { Report } from './AdminDashboard';
import { Send, History } from 'lucide-react';

interface ReporterDashboardProps {
  reports: Report[];
  onSubmit: (studentId: string, issueType: string, reason: string) => void;
}

export const ReporterDashboard: React.FC<ReporterDashboardProps> = ({ reports, onSubmit }) => {
  const [formData, setFormData] = useState({
    studentId: '',
    issueType: 'Financial',
    reason: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentId || !formData.reason) return;
    onSubmit(formData.studentId, formData.issueType, formData.reason);
    setFormData({ studentId: '', issueType: 'Financial', reason: '' });
  };

  return (
    <div className="p-8 space-y-8 max-w-4xl mx-auto">
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 bg-slate-50/50 flex items-center gap-3">
          <Send size={20} className="text-slate-600" />
          <h2 className="text-lg font-semibold text-slate-800">Submit New Report</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Student Roll No (e.g. CS290)</label>
              <input
                required
                type="text"
                placeholder="e.g. CS290"
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400"
                value={formData.studentId}
                onChange={(e) => setFormData({...formData, studentId: e.target.value.toUpperCase()})}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Issue Type</label>
              <select
                className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400 bg-white"
                value={formData.issueType}
                onChange={(e) => setFormData({...formData, issueType: e.target.value})}
              >
                <option value="Financial">Financial</option>
                <option value="Academic">Academic</option>
                <option value="Disciplinary">Disciplinary</option>
                <option value="Medical">Medical</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Reason / Description</label>
            <textarea
              required
              rows={4}
              placeholder="Describe the issue in detail..."
              className="w-full px-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-400"
              value={formData.reason}
              onChange={(e) => setFormData({...formData, reason: e.target.value})}
            />
          </div>
          <div className="flex justify-end">
            <Button type="submit" className="w-full md:w-auto">Submit Report</Button>
          </div>
        </form>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2 text-slate-800">
          <History size={20} />
          <h2 className="text-lg font-semibold">Recently Submitted</h2>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-600 uppercase tracking-wider">
              <tr>
                <th className="px-6 py-3 font-semibold">Student ID</th>
                <th className="px-6 py-3 font-semibold">Type</th>
                <th className="px-6 py-3 font-semibold">Status</th>
                <th className="px-6 py-3 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {reports.slice().reverse().map((report) => (
                <tr key={report.id} className="hover:bg-slate-50/50">
                  <td className="px-6 py-4 font-medium">{report.studentId}</td>
                  <td className="px-6 py-4 text-slate-600">{report.issueType}</td>
                  <td className="px-6 py-4">
                    <Badge status={report.status} />
                  </td>
                  <td className="px-6 py-4 text-slate-500">{report.date}</td>
                </tr>
              ))}
              {reports.length === 0 && (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-slate-400 italic">No reports submitted yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
