import React, { useState } from 'react';
import { Badge, Button } from './ui-components';
import { Report } from './AdminDashboard';
import { FileText, Clock, AlertCircle, Image as ImageIcon, Upload, X } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface StudentDashboardProps {
  reports: Report[];
  onUploadProof: (reportId: string, image: string) => void;
  readOnly?: boolean;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ reports, onUploadProof, readOnly = false }) => {
  const [uploadingFor, setUploadingFor] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, reportId: string) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUploadProof(reportId, reader.result as string);
        setUploadingFor(null);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">My Reports</h2>
        <p className="text-slate-500">View reports submitted by faculty and upload required proof.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reports.map((report) => (
          <div key={report.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 flex flex-col hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                <FileText size={24} />
              </div>
              <Badge status={report.status} />
            </div>
            
            <h3 className="text-lg font-bold text-slate-800 mb-1">{report.issueType}</h3>
            <p className="text-sm text-slate-500 mb-4 flex items-center gap-1">
              <Clock size={14} /> Reported on {report.date}
            </p>
            
            <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 flex-1">
              <p className="text-sm text-slate-700 italic line-clamp-3 mb-3">
                "{report.reason}"
              </p>
              
              {report.proofImage ? (
                <div className="relative h-32 w-full rounded border border-slate-200 overflow-hidden group">
                  <ImageWithFallback src={report.proofImage} alt="Proof" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-white text-xs font-medium">Proof Uploaded</span>
                  </div>
                </div>
              ) : !readOnly ? (
                <div className="mt-2">
                  <p className="text-[10px] uppercase tracking-wider font-bold text-red-500 mb-2">Action Required: Upload Proof</p>
                  <Button 
                    variant="secondary" 
                    size="sm" 
                    className="w-full gap-2 text-xs"
                    onClick={() => setUploadingFor(report.id)}
                  >
                    <Upload size={14} /> Upload Proof
                  </Button>
                </div>
              ) : (
                <div className="mt-2 p-2 bg-slate-100 rounded text-center">
                   <p className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Awaiting Student Proof</p>
                </div>
              )}
            </div>

            <div className="mt-6 flex items-center gap-2 text-xs text-slate-400 font-medium pt-4 border-t border-slate-50">
              <AlertCircle size={14} />
              Ref: {report.id}
            </div>
          </div>
        ))}

        {reports.length === 0 && (
          <div className="col-span-full py-16 text-center bg-white rounded-xl border border-dashed border-slate-300">
            <div className="mx-auto w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-3">
              <FileText size={24} />
            </div>
            <p className="text-slate-500 font-medium">No reports found.</p>
            <p className="text-sm text-slate-400">You don't have any reported issues at the moment.</p>
          </div>
        )}
      </div>

      {/* Upload Modal Mock */}
      {uploadingFor && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-2xl animate-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold">Upload Proof Document</h3>
              <button onClick={() => setUploadingFor(null)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <p className="text-sm text-slate-500 mb-6">Please upload a clear image of your supporting document for verification.</p>
            
            <label className="cursor-pointer group">
              <input 
                type="file" 
                className="hidden" 
                accept="image/*"
                onChange={(e) => handleFileUpload(e, uploadingFor)}
              />
              <div className="w-full h-40 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center justify-center gap-3 hover:bg-slate-50 hover:border-slate-400 transition-all">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 group-hover:text-blue-500 group-hover:bg-blue-50 transition-colors">
                  <Upload size={24} />
                </div>
                <span className="text-sm font-medium text-slate-600">Click to select image from computer</span>
                <span className="text-xs text-slate-400">JPG, PNG up to 5MB</span>
              </div>
            </label>
            
            <div className="mt-6 flex gap-3">
              <Button variant="ghost" className="flex-1" onClick={() => setUploadingFor(null)}>Cancel</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
