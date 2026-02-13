import React, { useState } from 'react';
import { Sidebar, Header } from './components/Layout';
import { Login } from './components/Login';
import { AdminDashboard, Report } from './components/AdminDashboard';
import { ReporterDashboard } from './components/ReporterDashboard';
import { StudentDashboard } from './components/StudentDashboard';
import { motion, AnimatePresence } from 'motion/react';

const MOCK_REPORTS: Report[] = [
  {
    id: 'REP-001',
    studentId: 'CS290',
    issueType: 'Financial',
    reason: 'Outstanding tuition balance for Spring semester. Requires payment plan setup.',
    status: 'Pending',
    date: '2026-02-10',
    proofImage: 'https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=500'
  },
  {
    id: 'REP-002',
    studentId: 'CS290',
    issueType: 'Academic',
    reason: 'Request for late course withdrawal due to medical circumstances.',
    status: 'Approved',
    date: '2026-02-08',
    proofImage: 'https://images.unsplash.com/photo-1588072432836-e10032774350?q=80&w=500'
  },
  {
    id: 'REP-003',
    studentId: 'STU1102',
    issueType: 'Disciplinary',
    reason: 'Violation of campus quiet hours in Residential Hall B.',
    status: 'Rejected',
    date: '2026-02-05'
  }
];

type Role = 'Admin' | 'Reporter' | 'Student';

export default function App() {
  const [user, setUser] = useState<{ role: Role; id?: string } | null>(null);
  const [registeredStudents, setRegisteredStudents] = useState<string[]>(['CS290']);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [reports, setReports] = useState<Report[]>(MOCK_REPORTS);

  const handleLogin = (role: Role, id?: string) => {
    setUser({ role, id });
    if (role === 'Admin') setActiveTab('dashboard');
    else if (role === 'Reporter') setActiveTab('submit');
    else if (role === 'Student') setActiveTab('my-reports');
  };

  const handleRegister = (id: string, pass: string) => {
    setRegisteredStudents(prev => [...prev, id]);
  };

  const isRegistered = (id: string) => registeredStudents.includes(id);

  const handleLogout = () => {
    setUser(null);
  };

  const handleUpdateStatus = (id: string, status: 'Approved' | 'Rejected') => {
    setReports(prev => prev.map(r => r.id === id ? { ...r, status } : r));
  };

  const handleSubmitReport = (studentId: string, issueType: string, reason: string) => {
    const newReport: Report = {
      id: `REP-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      studentId,
      issueType,
      reason,
      status: 'Pending',
      date: new Date().toISOString().split('T')[0]
    };
    setReports(prev => [...prev, newReport]);
    setActiveTab('my-reports');
  };

  const handleUploadProof = (reportId: string, image: string) => {
    setReports(prev => prev.map(r => r.id === reportId ? { ...r, proofImage: image } : r));
  };

  if (!user) {
    return (
      <Login 
        onLogin={handleLogin} 
        onRegister={handleRegister} 
        isRegistered={isRegistered} 
      />
    );
  }

  const renderContent = () => {
    if (user.role === 'Admin') {
      if (activeTab === 'dashboard' || activeTab === 'reports') {
        return <AdminDashboard reports={reports} onUpdateStatus={handleUpdateStatus} />;
      }
      return <div className="p-8 text-center text-slate-500">Settings Page Placeholder</div>;
    }

    if (user.role === 'Reporter') {
      if (activeTab === 'submit') {
        return <ReporterDashboard reports={reports} onSubmit={handleSubmitReport} />;
      }
      return (
        <div className="p-8">
          <StudentDashboard 
            reports={reports} 
            onUploadProof={handleUploadProof} 
            readOnly={true}
          />
        </div>
      );
    }

    if (user.role === 'Student') {
      const studentReports = reports.filter(r => r.studentId === user.id);
      return (
        <StudentDashboard 
          reports={studentReports} 
          onUploadProof={handleUploadProof} 
        />
      );
    }

    return null;
  };

  const getPageTitle = () => {
    const titles: Record<string, string> = {
      dashboard: 'System Overview',
      reports: 'All Student Reports',
      settings: 'System Settings',
      submit: 'Submit New Incident',
      'my-reports': 'Report History'
    };
    return titles[activeTab] || 'Dashboard';
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans text-slate-900">
      <Sidebar 
        role={user.role} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLogout={handleLogout} 
      />
      
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        <Header title={getPageTitle()} userRole={user.role} />
        
        <main className="flex-1 overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
