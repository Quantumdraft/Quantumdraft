import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ShieldCheck, 
  Search, 
  Download, 
  Trash2, 
  Eye, 
  CheckCircle, 
  Clock, 
  XCircle, 
  UserCheck, 
  Users, 
  TrendingUp, 
  LogOut, 
  Key, 
  X, 
  ExternalLink,
  RefreshCw,
  Filter,
  GraduationCap,
  MessageSquare,
  Mail,
  Mic,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  getApplications, 
  updateApplicationStatus, 
  deleteApplication, 
  exportApplicationsCSV, 
  ApplicantRecord,
  getContactMessages,
  updateContactMessageStatus,
  deleteContactMessage,
  ContactMessage
} from "@/lib/applicationStorage";
import Footer from "@/components/Footer";

const DEFAULT_PASSCODE = import.meta.env.VITE_ADMIN_PASSCODE || "admin123";
const IS_USING_DEFAULT = DEFAULT_PASSCODE === "admin123";

const AdminPage = () => {
  const { toast } = useToast();

  // Auth State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passcode, setPasscode] = useState("");
  const [authError, setAuthError] = useState(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [speechSupported, setSpeechSupported] = useState<boolean>(false);

  // Tab State
  const [activeTab, setActiveTab] = useState<"applications" | "contacts">("applications");

  // Data State - Applications
  const [applications, setApplications] = useState<ApplicantRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [selectedTrack, setSelectedTrack] = useState<string>("All");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Data State - Contact Messages
  const [contacts, setContacts] = useState<ContactMessage[]>([]);

  // Modal State
  const [viewingApp, setViewingApp] = useState<ApplicantRecord | null>(null);
  const [viewingContact, setViewingContact] = useState<ContactMessage | null>(null);

  // Check existing session auth
  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      setSpeechSupported(true);
    }

    const sessionAuth = sessionStorage.getItem("qd_admin_authenticated");
    if (sessionAuth === "true") {
      setIsAuthenticated(true);
    }
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [appsData, contactsData] = await Promise.all([
        getApplications(),
        getContactMessages()
      ]);
      setApplications(appsData);
      setContacts(contactsData);
    } catch (error) {
      console.error("Error loading application or contact data:", error);
      toast({
        title: "Load Error",
        description: "Failed to fetch candidate applications or contact messages. Offline mode active.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const startVoiceRecognition = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setAuthError(false);
      toast({
        title: "Listening...",
        description: "Please speak the admin passcode.",
      });
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event.error);
      setIsListening(false);
      toast({
        title: "Voice Login Failed",
        description: `Could not recognize speech: ${event.error}.`,
        variant: "destructive"
      });
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setPasscode(transcript);

      const cleanedTranscript = transcript.trim().toLowerCase().replace(/\s+/g, "");
      const cleanedPasscode = DEFAULT_PASSCODE.trim().toLowerCase().replace(/\s+/g, "");
      
      const wordToNumber = (str: string) => {
        return str
          .replace(/one/g, "1")
          .replace(/two/g, "2")
          .replace(/three/g, "3")
          .replace(/four/g, "4")
          .replace(/five/g, "5")
          .replace(/six/g, "6")
          .replace(/seven/g, "7")
          .replace(/eight/g, "8")
          .replace(/nine/g, "9")
          .replace(/zero/g, "0");
      };
      
      const normalizedTranscript = wordToNumber(cleanedTranscript);
      const normalizedPasscode = wordToNumber(cleanedPasscode);

      if (normalizedTranscript === normalizedPasscode || cleanedTranscript === cleanedPasscode) {
        setIsAuthenticated(true);
        sessionStorage.setItem("qd_admin_authenticated", "true");
        setAuthError(false);
        toast({
          title: "Access Granted",
          description: "Welcome to the Quantum Draft Technologies Admin Portal (Verified via Voice).",
        });
      } else {
        setAuthError(true);
        toast({
          title: "Access Denied",
          description: `Incorrect passcode spoken: "${transcript}".`,
          variant: "destructive"
        });
      }
    };

    recognition.start();
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === DEFAULT_PASSCODE) {
      setIsAuthenticated(true);
      sessionStorage.setItem("qd_admin_authenticated", "true");
      setAuthError(false);
      toast({
        title: "Access Granted",
        description: "Welcome to the Quantum Draft Technologies Admin Portal.",
      });
    } else {
      setAuthError(true);
      toast({
        title: "Access Denied",
        description: IS_USING_DEFAULT
          ? "Incorrect passcode. Default passcode is admin123."
          : "Incorrect passcode. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem("qd_admin_authenticated");
    setPasscode("");
    toast({
      title: "Logged Out",
      description: "Admin session ended successfully.",
    });
  };

  const handleStatusChange = async (id: string, status: ApplicantRecord["status"]) => {
    setIsLoading(true);
    try {
      const updated = await updateApplicationStatus(id, status);
      setApplications(updated);
      if (viewingApp && viewingApp.id === id) {
        setViewingApp({ ...viewingApp, status });
      }
      toast({
        title: "Status Updated",
        description: `Application status changed to ${status}.`,
      });
    } catch (error) {
      console.error("Error updating status:", error);
      toast({
        title: "Update Failed",
        description: "Failed to sync status update with remote storage.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete the application for ${name}?`)) {
      setIsLoading(true);
      try {
        const updated = await deleteApplication(id);
        setApplications(updated);
        if (viewingApp?.id === id) setViewingApp(null);
        toast({
          title: "Application Deleted",
          description: `Application for ${name} removed from storage.`,
        });
      } catch (error) {
        console.error("Error deleting application:", error);
        toast({
          title: "Delete Failed",
          description: "Failed to remove application from remote storage.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleContactStatusChange = async (id: string, status: ContactMessage["status"]) => {
    setIsLoading(true);
    try {
      const updated = await updateContactMessageStatus(id, status);
      setContacts(updated);
      if (viewingContact && viewingContact.id === id) {
        setViewingContact({ ...viewingContact, status });
      }
      toast({
        title: "Status Updated",
        description: `Message status changed to ${status}.`,
      });
    } catch (error) {
      console.error("Error updating contact status:", error);
      toast({
        title: "Update Failed",
        description: "Failed to sync status update with remote storage.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleContactDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete the message from ${name}?`)) {
      setIsLoading(true);
      try {
        const updated = await deleteContactMessage(id);
        setContacts(updated);
        if (viewingContact?.id === id) setViewingContact(null);
        toast({
          title: "Message Deleted",
          description: `Message from ${name} removed from storage.`,
        });
      } catch (error) {
        console.error("Error deleting contact message:", error);
        toast({
          title: "Delete Failed",
          description: "Failed to remove message from remote storage.",
          variant: "destructive"
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleExportCSV = async () => {
    setIsLoading(true);
    try {
      await exportApplicationsCSV();
      toast({
        title: "Export Success",
        description: "Applications exported successfully as CSV.",
      });
    } catch (error) {
      console.error("Error exporting CSV:", error);
      toast({
        title: "Export Failed",
        description: "Could not retrieve applications to export.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Filter Logic for Applications
  const filteredApps = applications.filter((app) => {
    const matchesSearch = 
      app.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.phone.includes(searchTerm);
    
    const matchesStatus = selectedStatus === "All" || app.status === selectedStatus;
    const matchesTrack = selectedTrack === "All" || app.trackId === selectedTrack;

    return matchesSearch && matchesStatus && matchesTrack;
  });

  // Filter Logic for Contacts
  const filteredContacts = contacts.filter((con) => {
    const matchesSearch = 
      con.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      con.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      con.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      con.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === "All" || con.status === selectedStatus;

    return matchesSearch && matchesStatus;
  });

  // Metrics Calculations - Applications
  const totalApps = applications.length;
  const pendingCount = applications.filter(a => a.status === "Pending").length;
  const acceptedCount = applications.filter(a => a.status === "Accepted").length;

  const trackCounts: Record<string, number> = {};
  applications.forEach(a => {
    trackCounts[a.trackTitle] = (trackCounts[a.trackTitle] || 0) + 1;
  });

  const topTrack = Object.entries(trackCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "None";

  // Metrics Calculations - Contacts
  const totalContacts = contacts.length;
  const unreadContacts = contacts.filter(c => c.status === "Unread").length;
  const readContacts = contacts.filter(c => c.status === "Read").length;
  const repliedContacts = contacts.filter(c => c.status === "Replied").length;

  // Login Screen Render
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#050505] text-white flex flex-col justify-between pt-28 font-sans selection:bg-blue-600/30">
        <div className="flex-1 flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-full max-w-md bg-[#090a0f] border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-xl text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600/10 blur-3xl pointer-events-none rounded-full" />
            
            <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mx-auto mb-6">
              <ShieldCheck className="w-8 h-8" />
            </div>

            <h1 className="text-2xl font-bold text-white mb-2">Admin Portal</h1>
            <p className="text-xs text-white/50 mb-6">
              Enter your administration passcode to access candidate applications.
            </p>

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div>
                <label className="text-xs font-medium text-white/70 block mb-1.5 flex items-center justify-between">
                  <span className="flex items-center gap-1"><Key size={12} /> Passcode</span>
                  {speechSupported && (
                    <span className="text-[10px] text-blue-400 font-mono flex items-center gap-1">
                      <Sparkles size={10} /> Voice Login Active
                    </span>
                  )}
                </label>
                <div className="relative flex items-center">
                  <input
                    type="password"
                    required
                    placeholder={IS_USING_DEFAULT ? "Enter passcode (Default: admin123)" : "Enter passcode"}
                    value={passcode}
                    onChange={(e) => {
                      setPasscode(e.target.value);
                      setAuthError(false);
                    }}
                    className={`w-full bg-white/5 border ${authError ? "border-red-500/80" : "border-white/10"} rounded-xl pl-4 pr-12 py-3 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors placeholder:text-white/20`}
                  />
                  {speechSupported && (
                    <button
                      type="button"
                      onClick={startVoiceRecognition}
                      disabled={isListening}
                      className={`absolute right-3 p-2 rounded-lg transition-all ${
                        isListening 
                          ? "bg-blue-600 text-white animate-pulse" 
                          : "text-white/40 hover:text-white hover:bg-white/5"
                      }`}
                      title="Login with Voice Command"
                    >
                      {isListening ? (
                        <div className="flex items-center gap-0.5 animate-pulse">
                          <span className="w-1 h-3.5 bg-white rounded-full animate-[bounce_1.2s_infinite_100ms]" />
                          <span className="w-1 h-4 bg-white rounded-full animate-[bounce_1.2s_infinite_300ms]" />
                          <span className="w-1 h-3.5 bg-white rounded-full animate-[bounce_1.2s_infinite_500ms]" />
                        </div>
                      ) : (
                        <Mic size={16} />
                      )}
                    </button>
                  )}
                </div>
                {authError && (
                  <span className="text-[11px] text-red-400 mt-1 block">
                    Incorrect passcode. {IS_USING_DEFAULT && "Try admin123"}
                  </span>
                )}
              </div>

              <Button
                type="submit"
                className="w-full rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold h-11 transition-all shadow-[0_0_20px_rgba(59,130,246,0.4)]"
              >
                Unlock Dashboard
              </Button>
            </form>

            <p className="text-[11px] text-white/30 font-mono mt-6">
              Quantum Draft Technologies Portal
            </p>
          </motion.div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-600/30 selection:text-white pt-28 font-sans">
      
      {/* Top Admin Bar */}
      <div className="bg-[#08090d] border-b border-white/[0.06] py-6 px-6">
        <div className="container-custom flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono mb-2">
              <GraduationCap size={14} className="inline mr-1" /> Quantum Draft Technologies Admissions
            </div>
            <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
              Admissions & Communications Portal
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <Button
              onClick={loadData}
              variant="outline"
              size="sm"
              disabled={isLoading}
              className="rounded-xl border-white/10 text-white/70 hover:text-white hover:bg-white/5 text-xs h-10 px-4"
            >
              <RefreshCw className={`w-3.5 h-3.5 mr-1.5 ${isLoading ? "animate-spin" : ""}`} /> Refresh
            </Button>
            {activeTab === "applications" && (
              <Button
                onClick={handleExportCSV}
                disabled={isLoading}
                size="sm"
                className="rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-xs h-10 px-4 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
              >
                <Download className="w-3.5 h-3.5 mr-1.5" /> Export CSV
              </Button>
            )}
            <Button
              onClick={handleLogout}
              variant="destructive"
              size="sm"
              className="rounded-xl text-xs h-10 px-4"
            >
              <LogOut className="w-3.5 h-3.5 mr-1.5" /> Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="container-custom py-10 px-6">
        
        {/* Navigation Tabs */}
        <div className="flex border-b border-white/[0.06] mb-8 gap-6 text-sm font-semibold">
          <button
            onClick={() => {
              setActiveTab("applications");
              setSelectedStatus("All");
              setSelectedTrack("All");
            }}
            className={`pb-4 relative transition-colors ${
              activeTab === "applications" ? "text-blue-400 font-bold" : "text-white/50 hover:text-white"
            }`}
          >
            <span className="flex items-center gap-1.5"><GraduationCap size={16} /> Internship Applications ({applications.length})</span>
            {activeTab === "applications" && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500"
              />
            )}
          </button>
          <button
            onClick={() => {
              setActiveTab("contacts");
              setSelectedStatus("All");
            }}
            className={`pb-4 relative transition-colors ${
              activeTab === "contacts" ? "text-blue-400 font-bold" : "text-white/50 hover:text-white"
            }`}
          >
            <span className="flex items-center gap-1.5"><MessageSquare size={16} /> Contact Transmissions ({contacts.length})</span>
            {activeTab === "contacts" && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-blue-500"
              />
            )}
          </button>
        </div>

        {/* Stat Metrics Grid */}
        {activeTab === "applications" ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-white/40 block mb-1">Total Applicants</span>
                <span className="text-3xl font-extrabold text-white font-mono">{totalApps}</span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Users size={22} />
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-amber-400/80 block mb-1">Pending Review</span>
                <span className="text-3xl font-extrabold text-amber-400 font-mono">{pendingCount}</span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Clock size={22} />
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-400/80 block mb-1">Accepted</span>
                <span className="text-3xl font-extrabold text-emerald-400 font-mono">{acceptedCount}</span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <CheckCircle size={22} />
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-purple-400/80 block mb-1">Top Demand Track</span>
                <span className="text-sm font-bold text-purple-300 truncate max-w-[140px] block" title={topTrack}>
                  {topTrack}
                </span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400">
                <TrendingUp size={22} />
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-white/40 block mb-1">Total Transmissions</span>
                <span className="text-3xl font-extrabold text-white font-mono">{totalContacts}</span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                <Mail size={22} />
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-red-400/80 block mb-1">Unread Message Nodes</span>
                <span className="text-3xl font-extrabold text-red-400 font-mono">{unreadContacts}</span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
                <Clock size={22} />
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-amber-400/80 block mb-1">Read / Reviewed</span>
                <span className="text-3xl font-extrabold text-amber-400 font-mono">{readContacts}</span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                <Eye size={22} />
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/[0.06] backdrop-blur-xl flex items-center justify-between">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-400/80 block mb-1">Processed Node</span>
                <span className="text-3xl font-extrabold text-emerald-400 font-mono">{repliedContacts}</span>
              </div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                <CheckCircle size={22} />
              </div>
            </div>
          </div>
        )}

        {/* Filter Controls Bar */}
        <div className="p-6 rounded-2xl bg-white/[0.015] border border-white/[0.06] backdrop-blur-xl mb-8 flex flex-col lg:flex-row items-center justify-between gap-4">
          
          {/* Search Box */}
          <div className="relative w-full lg:w-96">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder={activeTab === "applications" ? "Search candidate name, email, or phone..." : "Search sender name, email, subject, or message..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-xs text-white focus:outline-none focus:border-blue-500 transition-colors placeholder:text-white/30"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            {activeTab === "applications" && (
              <>
                <div className="flex items-center gap-2 text-xs text-white/50 font-mono">
                  <Filter size={14} /> Filter Track:
                </div>
                <select
                  value={selectedTrack}
                  onChange={(e) => setSelectedTrack(e.target.value)}
                  className="bg-[#121319] border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-blue-500 transition-colors"
                >
                  <option value="All">All Specializations</option>
                  <option value="fullstack">Full-Stack Web</option>
                  <option value="aiml">AI & Machine Learning</option>
                  <option value="devops">Cloud & DevOps</option>
                  <option value="uiux">UI/UX Product Design</option>
                  <option value="mobile">Mobile App Engineering</option>
                  <option value="cyber">Cyber Security</option>
                </select>
              </>
            )}

            {/* Status Tabs */}
            <div className="flex p-1 rounded-xl bg-white/5 border border-white/10 text-xs">
              {(activeTab === "applications" 
                ? ["All", "Pending", "Reviewed", "Accepted", "Rejected"] 
                : ["All", "Unread", "Read", "Replied"]
              ).map((st) => (
                <button
                  key={st}
                  onClick={() => setSelectedStatus(st)}
                  className={`px-3 py-1 rounded-lg font-medium transition-colors ${
                    selectedStatus === st ? "bg-blue-600 text-white" : "text-white/60 hover:text-white"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        {activeTab === "applications" ? (
          /* Internship Applications Table */
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.01] backdrop-blur-xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-white/80 border-collapse">
                <thead>
                  <tr className="bg-white/[0.03] border-b border-white/[0.06] text-white/50 uppercase tracking-widest font-mono text-[10px]">
                    <th className="py-4 px-6 font-semibold">Candidate</th>
                    <th className="py-4 px-6 font-semibold">Track & Level</th>
                    <th className="py-4 px-6 font-semibold">Submitted Date</th>
                    <th className="py-4 px-6 font-semibold">Status</th>
                    <th className="py-4 px-6 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {filteredApps.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-white/40 font-mono">
                        No internship applications match your filter criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredApps.map((app) => (
                      <tr key={app.id} className="hover:bg-white/[0.02] transition-colors">
                        
                        {/* Candidate Name & Contact */}
                        <td className="py-4 px-6">
                          <div className="font-bold text-white text-sm">{app.fullName}</div>
                          <div className="text-white/50 text-[11px]">{app.email}</div>
                          <div className="text-white/40 text-[10px] font-mono">{app.phone}</div>
                        </td>

                        {/* Track & Level */}
                        <td className="py-4 px-6">
                          <div className="font-medium text-blue-300">{app.trackTitle}</div>
                          <div className="text-white/40 text-[11px]">{app.experienceLevel}</div>
                        </td>

                        {/* Date */}
                        <td className="py-4 px-6 text-white/50 font-mono text-[11px]">
                          {new Date(app.submittedAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric"
                          })}
                        </td>

                        {/* Status */}
                        <td className="py-4 px-6">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase font-mono tracking-wider border ${
                            app.status === "Pending" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                            app.status === "Accepted" ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" :
                            app.status === "Reviewed" ? "bg-blue-500/10 text-blue-400 border-blue-500/20" :
                            "bg-red-500/10 text-red-400 border-red-500/20"
                          }`}>
                            {app.status === "Pending" && <Clock size={10} />}
                            {app.status === "Accepted" && <CheckCircle size={10} />}
                            {app.status === "Reviewed" && <UserCheck size={10} />}
                            {app.status === "Rejected" && <XCircle size={10} />}
                            {app.status}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-6 text-right space-x-2">
                          <Button
                            onClick={() => setViewingApp(app)}
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 text-white/70 hover:text-white hover:bg-white/10 rounded-lg"
                            title="View Application Details"
                          >
                            <Eye size={15} />
                          </Button>
                          <select
                            value={app.status}
                            onChange={(e) => handleStatusChange(app.id, e.target.value as ApplicantRecord["status"])}
                            className="bg-[#151722] border border-white/10 rounded-lg px-2 py-1 text-[11px] text-white focus:outline-none focus:border-blue-500"
                          >
                            <option value="Pending">Pending</option>
                            <option value="Reviewed">Reviewed</option>
                            <option value="Accepted">Accepted</option>
                            <option value="Rejected">Rejected</option>
                          </select>
                          <Button
                            onClick={() => handleDelete(app.id, app.fullName)}
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 text-red-400/70 hover:text-red-400 hover:bg-red-500/10 rounded-lg"
                            title="Delete Application"
                          >
                            <Trash2 size={15} />
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Contact Transmissions Table */
          <div className="rounded-2xl border border-white/[0.06] bg-white/[0.01] backdrop-blur-xl overflow-hidden shadow-2xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-white/80 border-collapse">
                <thead>
                  <tr className="bg-white/[0.03] border-b border-white/[0.06] text-white/50 uppercase tracking-widest font-mono text-[10px]">
                    <th className="py-4 px-6 font-semibold">Sender Details</th>
                    <th className="py-4 px-6 font-semibold">Subject & Message Node</th>
                    <th className="py-4 px-6 font-semibold">Transmission Date</th>
                    <th className="py-4 px-6 font-semibold">Status</th>
                    <th className="py-4 px-6 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/[0.04]">
                  {filteredContacts.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-white/40 font-mono">
                        No contact transmissions match your filter criteria.
                      </td>
                    </tr>
                  ) : (
                    filteredContacts.map((con) => (
                      <tr key={con.id} className="hover:bg-white/[0.02] transition-colors">
                        
                        {/* Sender details */}
                        <td className="py-4 px-6">
                          <div className="font-bold text-white text-sm">{con.fullName}</div>
                          <div className="text-white/50 text-[11px]">{con.email}</div>
                        </td>

                        {/* Subject and content summary */}
                        <td className="py-4 px-6 max-w-xs md:max-w-md">
                          <div className="font-medium text-blue-300 truncate">{con.subject}</div>
                          <div className="text-white/40 text-[11px] truncate mt-0.5">{con.message}</div>
                        </td>

                        {/* Date */}
                        <td className="py-4 px-6 text-white/50 font-mono text-[11px]">
                          {new Date(con.submittedAt).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric"
                          })}
                        </td>

                        {/* Status */}
                        <td className="py-4 px-6">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase font-mono tracking-wider border ${
                            con.status === "Unread" ? "bg-red-500/10 text-red-400 border-red-500/20" :
                            con.status === "Read" ? "bg-amber-500/10 text-amber-400 border-amber-500/20" :
                            "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          }`}>
                            {con.status === "Unread" && <Clock size={10} />}
                            {con.status === "Read" && <Eye size={10} />}
                            {con.status === "Replied" && <CheckCircle size={10} />}
                            {con.status}
                          </span>
                        </td>

                        {/* Actions */}
                        <td className="py-4 px-6 text-right space-x-2 whitespace-nowrap">
                          <Button
                            onClick={() => {
                              setViewingContact(con);
                              if (con.status === "Unread") {
                                handleContactStatusChange(con.id, "Read");
                              }
                            }}
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 text-white/70 hover:text-white hover:bg-white/10 rounded-lg"
                            title="Open Message Details"
                          >
                            <Eye size={15} />
                          </Button>
                          <select
                            value={con.status}
                            onChange={(e) => handleContactStatusChange(con.id, e.target.value as ContactMessage["status"])}
                            className="bg-[#151722] border border-white/10 rounded-lg px-2 py-1 text-[11px] text-white focus:outline-none focus:border-blue-500"
                          >
                            <option value="Unread">Unread</option>
                            <option value="Read">Read</option>
                            <option value="Replied">Replied</option>
                          </select>
                          <Button
                            onClick={() => handleContactDelete(con.id, con.fullName)}
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 text-red-400/70 hover:text-red-400 hover:bg-red-500/10 rounded-lg"
                            title="Delete Message"
                          >
                            <Trash2 size={15} />
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Detail Candidate Modal */}
      <AnimatePresence>
        {viewingApp && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setViewingApp(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#0b0c10] border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl z-50 text-left overflow-hidden font-sans my-8"
            >
              <button
                onClick={() => setViewingApp(null)}
                className="absolute top-6 right-6 p-2 text-white/50 hover:text-white rounded-full bg-white/5 border border-white/5 transition-colors"
              >
                <X size={18} />
              </button>

              <div className="mb-6">
                <span className="text-xs font-mono text-blue-400 uppercase tracking-widest block mb-1">
                  Candidate Profile Details
                </span>
                <h3 className="text-2xl font-bold text-white">{viewingApp.fullName}</h3>
                <p className="text-xs text-white/50 mt-1">Submitted on {new Date(viewingApp.submittedAt).toLocaleString()}</p>
              </div>

              <div className="space-y-6 text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div>
                    <span className="text-xs text-white/40 block font-mono">Email Address</span>
                    <a href={`mailto:${viewingApp.email}`} className="text-blue-400 font-medium hover:underline">
                      {viewingApp.email}
                    </a>
                  </div>
                  <div>
                    <span className="text-xs text-white/40 block font-mono">Phone Number</span>
                    <span className="text-white font-medium">{viewingApp.phone}</span>
                  </div>
                  <div>
                    <span className="text-xs text-white/40 block font-mono">Selected Track</span>
                    <span className="text-white font-semibold">{viewingApp.trackTitle}</span>
                  </div>
                  <div>
                    <span className="text-xs text-white/40 block font-mono">Experience Level</span>
                    <span className="text-white">{viewingApp.experienceLevel}</span>
                  </div>
                </div>

                {viewingApp.portfolioUrl && (
                  <div>
                    <span className="text-xs text-white/40 block font-mono mb-1">Portfolio / LinkedIn / GitHub</span>
                    <a 
                      href={viewingApp.portfolioUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-blue-400 font-medium hover:underline text-xs"
                    >
                      {viewingApp.portfolioUrl} <ExternalLink size={12} />
                    </a>
                  </div>
                )}

                {viewingApp.sop && (
                  <div>
                    <span className="text-xs text-white/40 block font-mono mb-1">Statement of Purpose / Pitch</span>
                    <p className="text-xs text-white/80 bg-white/5 border border-white/10 p-4 rounded-xl leading-relaxed whitespace-pre-line">
                      {viewingApp.sop}
                    </p>
                  </div>
                )}

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-white/50">Change Status:</span>
                    <select
                      value={viewingApp.status}
                      onChange={(e) => handleStatusChange(viewingApp.id, e.target.value as ApplicantRecord["status"])}
                      className="bg-[#151722] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500 font-medium"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Reviewed">Reviewed</option>
                      <option value="Accepted">Accepted</option>
                      <option value="Rejected">Rejected</option>
                    </select>
                  </div>

                  <Button
                    onClick={() => setViewingApp(null)}
                    className="rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs px-6 h-9"
                  >
                    Done
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Detail Contact Message Modal */}
      <AnimatePresence>
        {viewingContact && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setViewingContact(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-[#0b0c10] border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl z-50 text-left overflow-hidden font-sans my-8"
            >
              <button
                onClick={() => setViewingContact(null)}
                className="absolute top-6 right-6 p-2 text-white/50 hover:text-white rounded-full bg-white/5 border border-white/5 transition-colors"
              >
                <X size={18} />
              </button>

              <div className="mb-6">
                <span className="text-xs font-mono text-blue-400 uppercase tracking-widest block mb-1">
                  Digital Transmission Details
                </span>
                <h3 className="text-2xl font-bold text-white">{viewingContact.fullName}</h3>
                <p className="text-xs text-white/50 mt-1">Received on {new Date(viewingContact.submittedAt).toLocaleString()}</p>
              </div>

              <div className="space-y-6 text-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.06]">
                  <div>
                    <span className="text-xs text-white/40 block font-mono">Sender Email</span>
                    <a href={`mailto:${viewingContact.email}`} className="text-blue-400 font-medium hover:underline">
                      {viewingContact.email}
                    </a>
                  </div>
                  <div>
                    <span className="text-xs text-white/40 block font-mono">Subject Key</span>
                    <span className="text-white font-semibold">{viewingContact.subject}</span>
                  </div>
                </div>

                <div>
                  <span className="text-xs text-white/40 block font-mono mb-1">Transmission Message</span>
                  <p className="text-xs text-white/80 bg-white/5 border border-white/10 p-4 rounded-xl leading-relaxed whitespace-pre-line">
                    {viewingContact.message}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-white/50">Change Status:</span>
                    <select
                      value={viewingContact.status}
                      onChange={(e) => handleContactStatusChange(viewingContact.id, e.target.value as ContactMessage["status"])}
                      className="bg-[#151722] border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white focus:outline-none focus:border-blue-500 font-medium"
                    >
                      <option value="Unread">Unread</option>
                      <option value="Read">Read</option>
                      <option value="Replied">Replied</option>
                    </select>
                  </div>

                  <Button
                    onClick={() => setViewingContact(null)}
                    className="rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs px-6 h-9"
                  >
                    Done
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
};

export default AdminPage;
