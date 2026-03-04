import React from 'react';
import { AlertTriangle, Server, Database, ShieldAlert } from 'lucide-react';

const DatabaseError = () => {
    return (
        <div className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 font-sans">
            <div className="max-w-2xl w-full bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xl shadow-slate-200/50">
                {/* Header/Status Bar */}
                <div className="bg-white px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-red-500"></div>
                        <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                        <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                    </div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
                        System Halt
                    </div>
                </div>

                <div className="p-10">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8 mb-10 text-center sm:text-left">
                        <div className="p-5 bg-red-50 rounded-2xl border border-red-100">
                            <ShieldAlert className="w-12 h-12 text-red-600" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-extrabold text-slate-900 mb-2 tracking-tight">503 Service Unavailable</h1>
                            <p className="text-red-600 font-semibold text-sm bg-red-50 inline-block px-3 py-1 rounded-full border border-red-100">
                                Infrastructure Policy Violation: QUOTA_EXCEEDED
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6 text-slate-600 text-[15px] leading-relaxed">
                        <div className="bg-slate-50 p-6 rounded-xl border border-slate-100 space-y-3">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-400 font-medium">Infrastructure Provider</span>
                                <span className="text-slate-900 font-bold">MongoDB Atlas Global</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-400 font-medium">Environment Status</span>
                                <span className="text-red-600 font-bold uppercase tracking-tighter">Suspended</span>
                            </div>
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-slate-400 font-medium">Resource Cluster</span>
                                <span className="text-slate-900 font-mono text-xs">roote-prod-primary-01</span>
                            </div>
                        </div>

                        <p>
                            We regret to inform you that your application's database cluster has been <span className="font-bold text-slate-900">temporarily locked</span> by the infrastructure provider.
                        </p>

                        <div className="bg-red-50/50 border-l-4 border-red-500 p-5 rounded-r-xl italic text-red-800 text-sm">
                            "Fatal Exception: The account has exceeded its allocated free-tier data throughput and storage capacity. Read/Write access is restricted until an infrastructure tier upgrade or outstanding billing balance is resolved."
                        </div>

                        <p className="text-sm">
                            If you believe this is an error or need to restore access immediately, please visit the <span className="text-blue-600 font-bold underline cursor-pointer hover:text-blue-700">Billing & Payment Terminal</span> or contact your senior infrastructure engineer.
                        </p>
                    </div>

                    <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-3 text-xs font-bold text-slate-400 uppercase tracking-widest">
                            <Server className="w-4 h-4" />
                            <span>System v2.4.91</span>
                        </div>
                        <div className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-100 rounded-full text-[10px] font-bold text-red-400 uppercase tracking-tighter animate-pulse">
                            Handshake Failed: Access Blocked
                        </div>
                    </div>
                </div>
            </div>

            {/* Subtle background glow */}
            <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-red-50/20 via-slate-50 to-white -z-10"></div>
        </div>
    );
};

export default DatabaseError;
