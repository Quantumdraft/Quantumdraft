import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Users, Settings, Database, ShieldAlert, BarChart3, Mail, LayoutDashboard } from "lucide-react";
import { useEffect, useState } from "react";
import logo from "@/assets/quantum-draft-logo.png";

const Admin = () => {
    const navigate = useNavigate();
    const [stats, setStats] = useState({
        users: 0,
        messages: 0,
        status: "Checking..."
    });

    useEffect(() => {
        // Fetch some basic stats to make it look alive
        fetch("http://localhost:3000/api/users")
            .then(res => res.json())
            .then(data => setStats(prev => ({ ...prev, users: data.length, status: "Connected" })))
            .catch(() => setStats(prev => ({ ...prev, status: "Offline" })));
    }, []);

    const adminModules = [
        { title: "User Management", description: "View and manage registered users", icon: Users, color: "text-primary" },
        { title: "System Settings", description: "Configure application parameters", icon: Settings, color: "text-primary" },
        { title: "Database Tools", description: "Monitor and optimize database", icon: Database, color: "text-primary" },
        { title: "Security Logs", description: "Review authentication trials", icon: ShieldAlert, color: "text-primary" },
        { title: "Analytics", description: "System performance and usage", icon: BarChart3, color: "text-primary" },
        { title: "Messages", description: "Review contact form submissions", icon: Mail, color: "text-primary" },
    ];

    return (
        <div className="min-h-screen bg-background text-foreground font-['Inter',sans-serif]">
            {/* Header */}
            <header className="bg-background/80 backdrop-blur-lg border-b border-border/50 sticky top-0 z-50">
                <div className="container-custom px-4 h-16 md:h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" onClick={() => navigate("/")} title="Back to Home" className="text-muted-foreground hover:text-primary transition-colors">
                            <ArrowLeft className="h-5 w-5" />
                        </Button>
                        <div className="flex items-center space-x-3">
                            <img src={logo} alt="Quantum Draft Logo" className="w-8 h-8 md:w-10 md:h-10 object-contain" />
                            <span className="text-xl md:text-2xl font-bold font-['Space_Grotesk',sans-serif]">Quantum Admin</span>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className={`px-3 py-1 rounded-full text-xs font-medium border ${stats.status === 'Connected'
                                ? 'bg-primary/10 text-primary border-primary/20'
                                : 'bg-destructive/10 text-destructive border-destructive/20'
                            }`}>
                            {stats.status}
                        </div>
                        <Button variant="gradient" size="sm" onClick={() => navigate("/")} className="hidden md:flex">
                            Main Site
                        </Button>
                    </div>
                </div>
            </header>

            <main className="container-custom px-4 py-8 md:py-12">
                {/* Welcome Section */}
                <div className="mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <LayoutDashboard className="h-5 w-5 text-primary" />
                            <span className="text-xs font-semibold tracking-widest text-primary uppercase">Administration</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold font-['Space_Grotesk',sans-serif] mb-2">Dashboard Overview</h1>
                        <p className="text-muted-foreground max-w-2xl">Welcome back, Administrator. Manage your application's core data and system settings from this central hub.</p>
                    </div>
                    <div className="text-sm text-muted-foreground bg-card/50 px-4 py-2 rounded-lg border border-border/50">
                        Session: <span className="text-foreground font-medium">Quantum_001</span>
                    </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    <Card className="glass-card border-none shadow-card hover:border-primary/30 transition-all duration-300">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Total Users</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold font-['Space_Grotesk',sans-serif]">{stats.users}</div>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-xs text-primary font-medium">↑ 12%</span>
                                <span className="text-[10px] text-muted-foreground">growth this week</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="glass-card border-none shadow-card hover:border-primary/30 transition-all duration-300">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Active Sessions</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold font-['Space_Grotesk',sans-serif]">24</div>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-xs text-primary font-medium">Stability: Normal</span>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="glass-card border-none shadow-card hover:border-primary/30 transition-all duration-300">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">System Load</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="text-4xl font-bold font-['Space_Grotesk',sans-serif]">42%</div>
                            <div className="flex items-center gap-2 mt-2">
                                <div className="w-full bg-border rounded-full h-1.5 overflow-hidden">
                                    <div className="bg-primary h-full" style={{ width: '42%' }}></div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Admin Modules */}
                <div>
                    <h3 className="text-2xl font-bold font-['Space_Grotesk',sans-serif] mb-8 relative inline-block">
                        Management Hub
                        <span className="absolute -bottom-2 left-0 w-12 h-1 bg-primary rounded-full"></span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {adminModules.map((module, idx) => (
                            <Card key={idx} className="glass-card group hover:glow-soft transition-all duration-300 border border-border/50 hover:border-primary/40 cursor-pointer overflow-hidden">
                                <CardHeader className="flex flex-row items-center gap-5 space-y-0 p-6">
                                    <div className={`p-4 rounded-xl bg-background border border-border/50 transition-all duration-300 group-hover:bg-primary group-hover:text-background`}>
                                        <module.icon className={`h-6 w-6 transition-colors`} />
                                    </div>
                                    <div>
                                        <CardTitle className="text-xl font-['Space_Grotesk',sans-serif] mb-1">{module.title}</CardTitle>
                                        <CardDescription className="text-xs text-muted-foreground">{module.description}</CardDescription>
                                    </div>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="mt-24 py-10 border-t border-border/50 bg-background/50">
                <div className="container-custom px-4 text-center">
                    <p className="text-sm text-muted-foreground font-medium">
                        &copy; 2024 Quantumdraft Control Panel. <span className="text-primary/70">Secure Nexus Access Required.</span>
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Admin;
