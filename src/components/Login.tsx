import React, { useState } from 'react';
import { Button } from './ui-components';
import { Mail, Lock, User, LogIn, AlertCircle, UserPlus } from 'lucide-react';

interface LoginProps {
  onLogin: (role: 'Admin' | 'Reporter' | 'Student', id?: string) => void;
  onRegister: (id: string, pass: string) => void;
  isRegistered: (id: string) => boolean;
}

export const Login: React.FC<LoginProps> = ({ onLogin, onRegister, isRegistered }) => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [role, setRole] = useState<'Admin' | 'Reporter' | 'Student'>('Student');
  const [studentId, setStudentId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (isLoginMode) {
      if (role === 'Student') {
        if (!isRegistered(studentId)) {
          setError('Student Roll No not found. Please register.');
          return;
        }
      }
      onLogin(role, role === 'Student' ? studentId : undefined);
    } else {
      if (studentId.length < 3) {
        setError('Please enter a valid Roll No.');
        return;
      }
      onRegister(studentId, password);
      setIsLoginMode(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 bg-[url('https://images.unsplash.com/photo-1763615834709-cd4b196980db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBzdHVkZW50JTIwdW5pdmVyc2l0eSUyMGNhbXB1c3xlbnwxfHx8fDE3NzA4NzQ4MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080')] bg-cover bg-center">
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px]" />
      
      <div className="relative w-full max-w-[420px] bg-white rounded-2xl shadow-2xl p-8 space-y-8 animate-in fade-in zoom-in duration-300">
        <div className="text-center space-y-2">
          <div className="w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center font-bold text-2xl mx-auto mb-4">R</div>
          <h1 className="text-2xl font-bold text-slate-900">
            {isLoginMode ? 'Welcome Back' : 'Student Registration'}
          </h1>
          <p className="text-slate-500">
            {isLoginMode ? 'Sign in to manage student reports' : 'Create your account to view reports'}
          </p>
        </div>

        {error && (
          <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg border border-red-100 flex items-center gap-2">
            <AlertCircle size={16} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">
              {role === 'Student' ? 'Student Roll No (e.g. CS290)' : 'Email Address'}
            </label>
            <div className="relative">
              {role === 'Student' ? (
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              ) : (
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              )}
              <input
                required
                type="text"
                placeholder={role === 'Student' ? "CS290" : "name@university.edu"}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                value={studentId}
                onChange={(e) => setStudentId(e.target.value.toUpperCase())}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                required
                type="password"
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {isLoginMode && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Login As</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                <select
                  className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-900 appearance-none bg-white"
                  value={role}
                  onChange={(e) => setRole(e.target.value as any)}
                >
                  <option value="Student">Student</option>
                  <option value="Reporter">Reporter (Faculty)</option>
                  <option value="Admin">Administrator</option>
                </select>
              </div>
            </div>
          )}

          <Button type="submit" className="w-full py-6 text-base gap-2">
            {isLoginMode ? <LogIn size={20} /> : <UserPlus size={20} />}
            {isLoginMode ? 'Sign In' : 'Register Now'}
          </Button>
        </form>

        <div className="text-center pt-2">
          {isLoginMode ? (
            <p className="text-sm text-slate-500">
              Are you a student? {' '}
              <button 
                onClick={() => { setIsLoginMode(false); setRole('Student'); }}
                className="font-semibold text-slate-900 hover:underline"
              >
                Register here
              </button>
            </p>
          ) : (
            <p className="text-sm text-slate-500">
              Already have an account? {' '}
              <button 
                onClick={() => setIsLoginMode(true)}
                className="font-semibold text-slate-900 hover:underline"
              >
                Login here
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
