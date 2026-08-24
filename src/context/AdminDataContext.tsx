import React, { createContext, useContext, useState, useEffect } from "react";
import {
  NewsTickerItem,
  PostItem,
  VideoItem,
  GalleryItem,
  SiteSettings,
  InquiryLead,
  LeadFormData,
  University,
} from "../types";
import {
  DEFAULT_SITE_SETTINGS,
  DEFAULT_NEWS_TICKER,
  DEFAULT_POSTS,
  DEFAULT_VIDEOS,
  DEFAULT_GALLERY,
  DEFAULT_LEADS,
} from "../data/adminDefaults";
import { KOREA_UNIVERSITIES } from "../data/koreaUniversities";

export interface PageContent {
  heroTitle: string;
  heroSubtitle: string;
  heroText: string;
  heroBannerImage: string;
  aboutText: string;
  servicesTitle: string;
  directorName: string;
  directorRole: string;
  directorImage: string;
  directorBio: string;
  directorExperience: string;
  directorPhone: string;
  directorEmail: string;
}

export const DEFAULT_PAGE_CONTENT: PageContent = {
  heroTitle: "Study Abroad With Confidence",
  heroSubtitle: "YOUR GATEWAY TO GLOBAL EDUCATION",
  heroText: "Expert guidance for South Korea top universities, GKS scholarships, and D-2 / D-4 student visas with high visa success rate.",
  heroBannerImage: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80",
  aboutText: "With over 15+ years of experience, GBS senior counselors deliver personalized guidance, university admissions, and visa success.",
  servicesTitle: "Our Comprehensive Student Services",
  directorName: "Er. Dipendra Sharma",
  directorRole: "Founder & Senior Korea Education Director",
  directorImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80",
  directorBio: "Welcome to GBS Educational Consultancy. We are committed to empowering Nepali students with transparent guidance, university partnerships, and scholarship processing.",
  directorExperience: "15+ Years Korea & Global Visa Expertise",
  directorPhone: "9744427779",
  directorEmail: "info@gbsnepal.com",
};

interface AdminDataContextType {
  settings: SiteSettings;
  pageContent: PageContent;
  tickerItems: NewsTickerItem[];
  posts: PostItem[];
  videos: VideoItem[];
  gallery: GalleryItem[];
  universities: University[];
  leads: InquiryLead[];
  
  // Content operations
  updatePageContent: (content: Partial<PageContent>) => void;

  // University operations
  addUniversity: (uni: Omit<University, "id">) => void;
  updateUniversity: (id: string, uni: Partial<University>) => void;
  deleteUniversity: (id: string) => void;

  // Ticker operations
  addTickerItem: (item: Omit<NewsTickerItem, "id">) => void;
  updateTickerItem: (id: string, item: Partial<NewsTickerItem>) => void;
  deleteTickerItem: (id: string) => void;
  toggleTickerItem: (id: string) => void;

  // Post operations
  addPost: (post: Omit<PostItem, "id">) => void;
  updatePost: (id: string, post: Partial<PostItem>) => void;
  deletePost: (id: string) => void;

  // Video operations
  addVideo: (video: Omit<VideoItem, "id">) => void;
  updateVideo: (id: string, video: Partial<VideoItem>) => void;
  deleteVideo: (id: string) => void;

  // Gallery operations
  addGalleryItem: (item: Omit<GalleryItem, "id">) => void;
  updateGalleryItem: (id: string, item: Partial<GalleryItem>) => void;
  deleteGalleryItem: (id: string) => void;

  // Site settings
  updateSettings: (newSettings: Partial<SiteSettings>) => void;

  // Lead / Inquiry operations
  submitNewLead: (formData: LeadFormData, uniName?: string) => void;
  updateLeadStatus: (id: string, status: InquiryLead["status"]) => void;
  updateLeadNotes: (id: string, notes: string) => void;
  deleteLead: (id: string) => void;

  // Reset & Backup
  resetToDefaults: () => void;
  exportDataJSON: () => string;
  importDataJSON: (jsonStr: string) => boolean;
}

const STORAGE_KEY = "gbs_international_data_store_v6";

const AdminDataContext = createContext<AdminDataContextType | undefined>(undefined);

export const AdminDataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_settings`);
      return saved ? JSON.parse(saved) : DEFAULT_SITE_SETTINGS;
    } catch {
      return DEFAULT_SITE_SETTINGS;
    }
  });

  const [tickerItems, setTickerItems] = useState<NewsTickerItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_ticker`);
      if (saved) {
        const parsed: NewsTickerItem[] = JSON.parse(saved);
        const hasAnjana = parsed.some((t) => t.id === "ticker-anjana-visa");
        if (!hasAnjana && DEFAULT_NEWS_TICKER[0]) {
          return [DEFAULT_NEWS_TICKER[0], ...parsed];
        }
        return parsed;
      }
      return DEFAULT_NEWS_TICKER;
    } catch {
      return DEFAULT_NEWS_TICKER;
    }
  });

  const [posts, setPosts] = useState<PostItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_posts`);
      if (saved) {
        const parsed: PostItem[] = JSON.parse(saved);
        const hasAnjana = parsed.some((p) => p.id === "post-anjana-tamang-grant");
        if (!hasAnjana && DEFAULT_POSTS[0]) {
          return [DEFAULT_POSTS[0], ...parsed];
        }
        return parsed;
      }
      return DEFAULT_POSTS;
    } catch {
      return DEFAULT_POSTS;
    }
  });

  const [videos, setVideos] = useState<VideoItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_videos`);
      return saved ? JSON.parse(saved) : DEFAULT_VIDEOS;
    } catch {
      return DEFAULT_VIDEOS;
    }
  });

  const [gallery, setGallery] = useState<GalleryItem[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_gallery`);
      if (saved) {
        const parsed: GalleryItem[] = JSON.parse(saved);
        const hasAnjana = parsed.some((g) => g.id === "gal-anjana-tamang");
        if (!hasAnjana && DEFAULT_GALLERY[0]) {
          return [DEFAULT_GALLERY[0], ...parsed];
        }
        return parsed;
      }
      return DEFAULT_GALLERY;
    } catch {
      return DEFAULT_GALLERY;
    }
  });

  const [universities, setUniversities] = useState<University[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_universities`);
      return saved ? JSON.parse(saved) : KOREA_UNIVERSITIES;
    } catch {
      return KOREA_UNIVERSITIES;
    }
  });

  const [leads, setLeads] = useState<InquiryLead[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_leads`);
      return saved ? JSON.parse(saved) : DEFAULT_LEADS;
    } catch {
      return DEFAULT_LEADS;
    }
  });

  const [pageContent, setPageContent] = useState<PageContent>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_pageContent`);
      return saved ? JSON.parse(saved) : DEFAULT_PAGE_CONTENT;
    } catch {
      return DEFAULT_PAGE_CONTENT;
    }
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_settings`, JSON.stringify(settings));
    } catch (e) {
      console.error(e);
    }
  }, [settings]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_pageContent`, JSON.stringify(pageContent));
    } catch (e) {
      console.error(e);
    }
  }, [pageContent]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_ticker`, JSON.stringify(tickerItems));
    } catch (e) {
      console.error(e);
    }
  }, [tickerItems]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_posts`, JSON.stringify(posts));
    } catch (e) {
      console.error(e);
    }
  }, [posts]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_videos`, JSON.stringify(videos));
    } catch (e) {
      console.error(e);
    }
  }, [videos]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_gallery`, JSON.stringify(gallery));
    } catch (e) {
      console.error(e);
    }
  }, [gallery]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_universities`, JSON.stringify(universities));
    } catch (e) {
      console.error(e);
    }
  }, [universities]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_leads`, JSON.stringify(leads));
    } catch (e) {
      console.error(e);
    }
  }, [leads]);

  // Content Methods
  const updatePageContent = (updated: Partial<PageContent>) => {
    setPageContent((prev) => ({ ...prev, ...updated }));
  };

  // University Methods
  const addUniversity = (uni: Omit<University, "id">) => {
    const newUni: University = {
      ...uni,
      id: `uni-${Date.now()}`,
    };
    setUniversities((prev) => [newUni, ...prev]);
  };

  const updateUniversity = (id: string, updated: Partial<University>) => {
    setUniversities((prev) =>
      prev.map((u) => (u.id === id ? { ...u, ...updated } : u))
    );
  };

  const deleteUniversity = (id: string) => {
    setUniversities((prev) => prev.filter((u) => u.id !== id));
  };

  // Ticker Methods
  const addTickerItem = (item: Omit<NewsTickerItem, "id">) => {
    const newItem: NewsTickerItem = {
      ...item,
      id: `ticker-${Date.now()}`,
    };
    setTickerItems((prev) => [newItem, ...prev]);
  };

  const updateTickerItem = (id: string, item: Partial<NewsTickerItem>) => {
    setTickerItems((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...item } : t))
    );
  };

  const deleteTickerItem = (id: string) => {
    setTickerItems((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleTickerItem = (id: string) => {
    setTickerItems((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isActive: !t.isActive } : t))
    );
  };

  // Post Methods
  const addPost = (post: Omit<PostItem, "id">) => {
    const newPost: PostItem = {
      ...post,
      id: `post-${Date.now()}`,
      views: 0,
    };
    setPosts((prev) => [newPost, ...prev]);
  };

  const updatePost = (id: string, updated: Partial<PostItem>) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...updated } : p))
    );
  };

  const deletePost = (id: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  // Video Methods
  const addVideo = (video: Omit<VideoItem, "id">) => {
    const newVideo: VideoItem = {
      ...video,
      id: `vid-${Date.now()}`,
    };
    setVideos((prev) => [newVideo, ...prev]);
  };

  const updateVideo = (id: string, updated: Partial<VideoItem>) => {
    setVideos((prev) =>
      prev.map((v) => (v.id === id ? { ...v, ...updated } : v))
    );
  };

  const deleteVideo = (id: string) => {
    setVideos((prev) => prev.filter((v) => v.id !== id));
  };

  // Gallery Methods
  const addGalleryItem = (item: Omit<GalleryItem, "id">) => {
    const newGal: GalleryItem = {
      ...item,
      id: `gal-${Date.now()}`,
    };
    setGallery((prev) => [newGal, ...prev]);
  };

  const updateGalleryItem = (id: string, updated: Partial<GalleryItem>) => {
    setGallery((prev) =>
      prev.map((g) => (g.id === id ? { ...g, ...updated } : g))
    );
  };

  const deleteGalleryItem = (id: string) => {
    setGallery((prev) => prev.filter((g) => g.id !== id));
  };

  // Settings
  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  // Leads
  const submitNewLead = (formData: LeadFormData, uniName?: string) => {
    const newLead: InquiryLead = {
      id: `lead-${Date.now()}`,
      createdAt: new Date().toISOString(),
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      educationLevel: formData.educationLevel,
      intendedMajor: formData.intendedMajor,
      preferredIntake: formData.preferredIntake,
      consultationType: formData.consultationType,
      preferredDate: formData.preferredDate,
      preferredTime: formData.preferredTime,
      message: formData.message,
      status: "New",
      universityInterest: uniName || "",
      counselorNotes: "Submitted via website form",
    };
    setLeads((prev) => [newLead, ...prev]);
  };

  const updateLeadStatus = (id: string, status: InquiryLead["status"]) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status } : l))
    );
  };

  const updateLeadNotes = (id: string, counselorNotes: string) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === id ? { ...l, counselorNotes } : l))
    );
  };

  const deleteLead = (id: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== id));
  };

  // Reset & Backup
  const resetToDefaults = () => {
    setSettings(DEFAULT_SITE_SETTINGS);
    setTickerItems(DEFAULT_NEWS_TICKER);
    setPosts(DEFAULT_POSTS);
    setVideos(DEFAULT_VIDEOS);
    setGallery(DEFAULT_GALLERY);
    setUniversities(KOREA_UNIVERSITIES);
    setPageContent(DEFAULT_PAGE_CONTENT);
    setLeads(DEFAULT_LEADS);
    localStorage.removeItem(`${STORAGE_KEY}_settings`);
    localStorage.removeItem(`${STORAGE_KEY}_ticker`);
    localStorage.removeItem(`${STORAGE_KEY}_posts`);
    localStorage.removeItem(`${STORAGE_KEY}_videos`);
    localStorage.removeItem(`${STORAGE_KEY}_gallery`);
    localStorage.removeItem(`${STORAGE_KEY}_universities`);
    localStorage.removeItem(`${STORAGE_KEY}_pageContent`);
    localStorage.removeItem(`${STORAGE_KEY}_leads`);
  };

  const exportDataJSON = () => {
    return JSON.stringify(
      {
        settings,
        pageContent,
        tickerItems,
        posts,
        videos,
        gallery,
        universities,
        leads,
        exportedAt: new Date().toISOString(),
      },
      null,
      2
    );
  };

  const importDataJSON = (jsonStr: string): boolean => {
    try {
      const parsed = JSON.parse(jsonStr);
      if (parsed.settings) setSettings(parsed.settings);
      if (parsed.pageContent) setPageContent(parsed.pageContent);
      if (parsed.tickerItems) setTickerItems(parsed.tickerItems);
      if (parsed.posts) setPosts(parsed.posts);
      if (parsed.videos) setVideos(parsed.videos);
      if (parsed.gallery) setGallery(parsed.gallery);
      if (parsed.universities) setUniversities(parsed.universities);
      if (parsed.leads) setLeads(parsed.leads);
      return true;
    } catch (e) {
      console.error("Failed to import data:", e);
      return false;
    }
  };

  return (
    <AdminDataContext.Provider
      value={{
        settings,
        pageContent,
        tickerItems,
        posts,
        videos,
        gallery,
        universities,
        leads,
        updatePageContent,
        addUniversity,
        updateUniversity,
        deleteUniversity,
        addTickerItem,
        updateTickerItem,
        deleteTickerItem,
        toggleTickerItem,
        addPost,
        updatePost,
        deletePost,
        addVideo,
        updateVideo,
        deleteVideo,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        updateSettings,
        submitNewLead,
        updateLeadStatus,
        updateLeadNotes,
        deleteLead,
        resetToDefaults,
        exportDataJSON,
        importDataJSON,
      }}
    >
      {children}
    </AdminDataContext.Provider>
  );
};

export const useAdminData = () => {
  const context = useContext(AdminDataContext);
  if (!context) {
    throw new Error("useAdminData must be used within an AdminDataProvider");
  }
  return context;
};
