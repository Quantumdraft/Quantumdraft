export interface ApplicantRecord {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  trackId: string;
  trackTitle: string;
  experienceLevel: string;
  portfolioUrl?: string;
  sop?: string;
  submittedAt: string;
  status: "Pending" | "Reviewed" | "Accepted" | "Rejected";
  notes?: string;
}

export interface ContactMessage {
  id: string;
  fullName: string;
  email: string;
  subject: string;
  message: string;
  submittedAt: string;
  status: "Unread" | "Read" | "Replied";
}

const STORAGE_KEY = "qd_internship_applications";
const CONTACTS_STORAGE_KEY = "qd_contact_messages";

// Fallbacks are unique, free Key-Value storage buckets (KVdb.io).
// The user can customize this by setting hosted environment variables.
const API_URL = import.meta.env.VITE_STORAGE_API_URL || "https://kvdb.io/qd_internship_apps_6b7a9f82/applications";
const CONTACTS_API_URL = import.meta.env.VITE_CONTACTS_API_URL || "https://kvdb.io/qd_internship_apps_6b7a9f82/contacts";

// Initial sample data if no entries exist
const sampleApplications: ApplicantRecord[] = [
  {
    id: "app-101",
    fullName: "Sarah Jenkins",
    email: "sarah.jenkins@example.com",
    phone: "+1 (555) 234-5678",
    trackId: "fullstack",
    trackTitle: "Full-Stack Web Engineering",
    experienceLevel: "College Student / Recent Graduate",
    portfolioUrl: "https://github.com/sarah-jenkins-dev",
    sop: "Passionate computer science graduate looking to master Next.js, Node.js, and cloud backend microservices through live production client projects.",
    submittedAt: new Date(Date.now() - 3600000 * 24 * 2).toISOString(),
    status: "Pending"
  },
  {
    id: "app-102",
    fullName: "Rohan Sharma",
    email: "rohan.sharma@example.com",
    phone: "+91 98765 43210",
    trackId: "aiml",
    trackTitle: "AI & Machine Learning Systems",
    experienceLevel: "Beginner / Self-Taught Developer",
    portfolioUrl: "https://linkedin.com/in/rohansharma-ai",
    sop: "Building custom fine-tuned LLM pipelines and RAG vector search systems. Eager to receive senior mentorship from Quantum Draft Technologies engineers.",
    submittedAt: new Date(Date.now() - 3600000 * 24 * 5).toISOString(),
    status: "Reviewed"
  },
  {
    id: "app-103",
    fullName: "Elena Rostova",
    email: "elena.r@example.com",
    phone: "+44 20 7946 0912",
    trackId: "uiux",
    trackTitle: "UI/UX & Product Design",
    experienceLevel: "Working Professional Switching Careers",
    portfolioUrl: "https://behance.net/elenarostova",
    sop: "Focused on glassmorphic design systems, interactive prototypes, and SaaS UI/UX research. Ready to collaborate in an agile production sprint.",
    submittedAt: new Date(Date.now() - 3600000 * 24 * 7).toISOString(),
    status: "Accepted"
  }
];

const sampleContacts: ContactMessage[] = [
  {
    id: "con-1",
    fullName: "David Chen",
    email: "david.chen@enterprise.com",
    subject: "Custom AI Platform Development Inquiry",
    message: "Hello team, we are looking to build a custom fine-tuned text LLM pipeline for our corporate financial dashboard. We'd love to learn about your developer pricing and sprint timeline. Thanks!",
    submittedAt: new Date(Date.now() - 3600000 * 24 * 1).toISOString(),
    status: "Unread"
  },
  {
    id: "con-2",
    fullName: "Amanda Ross",
    email: "amanda@startupventures.io",
    subject: "Product UI/UX Design Collaboration",
    message: "Hi, I love your glassmorphic design language! We are seeking a design partner to build an interactive SaaS layout for our analytics suite. Let's schedule a call.",
    submittedAt: new Date(Date.now() - 3600000 * 12).toISOString(),
    status: "Read"
  }
];

// Helper to load local fallback data
const getLocalApplications = (): ApplicantRecord[] => {
  if (typeof window === "undefined") return sampleApplications;
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(sampleApplications));
      return sampleApplications;
    }
    return JSON.parse(stored);
  } catch (error) {
    console.error("Error reading local applications fallback:", error);
    return sampleApplications;
  }
};

// Helper to save local fallback data
const saveLocalApplications = (apps: ApplicantRecord[]) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
  } catch (error) {
    console.error("Error writing local applications fallback:", error);
  }
};

// Helper to save applications to the remote KV storage
const saveApplicationsRemote = async (apps: ApplicantRecord[]): Promise<boolean> => {
  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(apps),
    });
    return response.ok;
  } catch (error) {
    console.error("Error saving applications remotely:", error);
    return false;
  }
};

export const getApplications = async (): Promise<ApplicantRecord[]> => {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP Error Status: ${response.status}`);
    }
    const data = await response.json();
    
    if (!data || (Array.isArray(data) && data.length === 0)) {
      await saveApplicationsRemote(sampleApplications);
      saveLocalApplications(sampleApplications);
      return sampleApplications;
    }
    
    saveLocalApplications(data);
    return data;
  } catch (error) {
    console.warn("Could not retrieve applications from remote API, falling back to local:", error);
    return getLocalApplications();
  }
};

export const saveApplication = async (
  data: Omit<ApplicantRecord, "id" | "submittedAt" | "status">
): Promise<ApplicantRecord> => {
  const newRecord: ApplicantRecord = {
    ...data,
    id: `app-${Date.now()}`,
    submittedAt: new Date().toISOString(),
    status: "Pending"
  };

  const current = await getApplications();
  const updated = [newRecord, ...current];
  
  const success = await saveApplicationsRemote(updated);
  if (success) {
    saveLocalApplications(updated);
  } else {
    console.warn("Remote save failed, application will be saved locally.");
    const localCurrent = getLocalApplications();
    saveLocalApplications([newRecord, ...localCurrent]);
  }

  return newRecord;
};

export const updateApplicationStatus = async (
  id: string, 
  status: ApplicantRecord["status"], 
  notes?: string
): Promise<ApplicantRecord[]> => {
  const current = await getApplications();
  const updated = current.map((app) => 
    app.id === id ? { ...app, status, notes: notes !== undefined ? notes : app.notes } : app
  );
  
  const success = await saveApplicationsRemote(updated);
  if (success) {
    saveLocalApplications(updated);
  } else {
    console.warn("Remote status update failed, local copy updated.");
    saveLocalApplications(updated);
  }
  
  return updated;
};

export const deleteApplication = async (id: string): Promise<ApplicantRecord[]> => {
  const current = await getApplications();
  const updated = current.filter((app) => app.id !== id);
  
  const success = await saveApplicationsRemote(updated);
  if (success) {
    saveLocalApplications(updated);
  } else {
    console.warn("Remote delete failed, local copy deleted.");
    saveLocalApplications(updated);
  }
  
  return updated;
};

export const exportApplicationsCSV = async () => {
  const apps = await getApplications();
  if (apps.length === 0) return;

  const headers = ["ID", "Full Name", "Email", "Phone", "Track", "Experience Level", "Status", "Submitted Date", "Portfolio URL", "SOP"];
  
  const csvRows = [
    headers.join(","),
    ...apps.map((a) => {
      const escape = (str: string = "") => `"${str.replace(/"/g, '""')}"`;
      return [
        escape(a.id),
        escape(a.fullName),
        escape(a.email),
        escape(a.phone),
        escape(a.trackTitle),
        escape(a.experienceLevel),
        escape(a.status),
        escape(new Date(a.submittedAt).toLocaleString()),
        escape(a.portfolioUrl || ""),
        escape(a.sop || "")
      ].join(",");
    })
  ];

  const blob = new Blob([csvRows.join("\n")], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `quantum_draft_internship_applications_${new Date().toISOString().slice(0, 10)}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

// --- Contact Form Storage Nodes ---

const getLocalContacts = (): ContactMessage[] => {
  if (typeof window === "undefined") return sampleContacts;
  try {
    const stored = localStorage.getItem(CONTACTS_STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(CONTACTS_STORAGE_KEY, JSON.stringify(sampleContacts));
      return sampleContacts;
    }
    return JSON.parse(stored);
  } catch (error) {
    console.error("Error reading local contacts fallback:", error);
    return sampleContacts;
  }
};

const saveLocalContacts = (messages: ContactMessage[]) => {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(CONTACTS_STORAGE_KEY, JSON.stringify(messages));
  } catch (error) {
    console.error("Error writing local contacts fallback:", error);
  }
};

const saveContactsRemote = async (messages: ContactMessage[]): Promise<boolean> => {
  try {
    const response = await fetch(CONTACTS_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(messages),
    });
    return response.ok;
  } catch (error) {
    console.error("Error saving contacts remotely:", error);
    return false;
  }
};

export const getContactMessages = async (): Promise<ContactMessage[]> => {
  try {
    const response = await fetch(CONTACTS_API_URL);
    if (!response.ok) {
      throw new Error(`HTTP Error Status: ${response.status}`);
    }
    const data = await response.json();
    
    if (!data || (Array.isArray(data) && data.length === 0)) {
      await saveContactsRemote(sampleContacts);
      saveLocalContacts(sampleContacts);
      return sampleContacts;
    }
    
    saveLocalContacts(data);
    return data;
  } catch (error) {
    console.warn("Could not retrieve contacts from remote API, falling back to local:", error);
    return getLocalContacts();
  }
};

export const saveContactMessage = async (
  data: Omit<ContactMessage, "id" | "submittedAt" | "status">
): Promise<ContactMessage> => {
  const newRecord: ContactMessage = {
    ...data,
    id: `con-${Date.now()}`,
    submittedAt: new Date().toISOString(),
    status: "Unread"
  };

  const current = await getContactMessages();
  const updated = [newRecord, ...current];
  
  const success = await saveContactsRemote(updated);
  if (success) {
    saveLocalContacts(updated);
  } else {
    console.warn("Remote contacts save failed, message will be saved locally.");
    const localCurrent = getLocalContacts();
    saveLocalContacts([newRecord, ...localCurrent]);
  }

  return newRecord;
};

export const updateContactMessageStatus = async (
  id: string,
  status: ContactMessage["status"]
): Promise<ContactMessage[]> => {
  const current = await getContactMessages();
  const updated = current.map((msg) =>
    msg.id === id ? { ...msg, status } : msg
  );
  
  const success = await saveContactsRemote(updated);
  if (success) {
    saveLocalContacts(updated);
  } else {
    console.warn("Remote contacts status update failed, local copy updated.");
    saveLocalContacts(updated);
  }
  
  return updated;
};

export const deleteContactMessage = async (id: string): Promise<ContactMessage[]> => {
  const current = await getContactMessages();
  const updated = current.filter((msg) => msg.id !== id);
  
  const success = await saveContactsRemote(updated);
  if (success) {
    saveLocalContacts(updated);
  } else {
    console.warn("Remote contact delete failed, local copy deleted.");
    saveLocalContacts(updated);
  }
  
  return updated;
};
