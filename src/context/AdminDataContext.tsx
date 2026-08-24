import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
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
import {
  fetchGlobalCmsData,
  pushGlobalCmsDataToGitHub,
  GlobalCmsPayload,
} from "../utils/cloudSync";

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
  
  // Global Cloud Sync State
  isCloudSyncing: boolean;
  cloudSyncMessage: string;
  lastCloudSyncTime: string | null;
  syncAllToGlobalCloud: (customToken?: string) => Promise<{ success: boolean; message: string }>;

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

  // Cloud Sync Status State
  const [isCloudSyncing, setIsCloudSyncing] = useState<boolean>(false);
  const [cloudSyncMessage, setCloudSyncMessage] = useState<string>("");
  const [lastCloudSyncTime, setLastCloudSyncTime] = useState<string | null>(() => {
    return localStorage.getItem(`${STORAGE_KEY}_last_cloud_sync`) || null;
  });

  // =========================================================================
  // GLOBAL REAL-TIME HYDRATION (Fetches live cloud data on startup & interval)
  // =========================================================================
  useEffect(() => {
    let isMounted = true;

    const loadGlobalCloudData = async () => {
      try {
        const cloudData = await fetchGlobalCmsData();
        if (!isMounted || !cloudData) return;

        if (cloudData.pageContent) setPageContent(cloudData.pageContent);
        if (cloudData.tickerItems && Array.isArray(cloudData.tickerItems) && cloudData.tickerItems.length > 0) {
          setTickerItems(cloudData.tickerItems);
        }
        if (cloudData.posts && Array.isArray(cloudData.posts) && cloudData.posts.length > 0) {
          setPosts(cloudData.posts);
        }
        if (cloudData.videos && Array.isArray(cloudData.videos) && cloudData.videos.length > 0) {
          setVideos(cloudData.videos);
        }
        if (cloudData.gallery && Array.isArray(cloudData.gallery) && cloudData.gallery.length > 0) {
          setGallery(cloudData.gallery);
        }
        if (cloudData.universities && Array.isArray(cloudData.universities) && cloudData.universities.length > 0) {
          setUniversities(cloudData.universities);
        }
        if (cloudData.settings) setSettings(cloudData.settings);

        const syncTime = cloudData.lastUpdated || new Date().toISOString();
        setLastCloudSyncTime(syncTime);
        localStorage.setItem(`${STORAGE_KEY}_last_cloud_sync`, syncTime);
      } catch (e) {
        console.warn("Global Cloud hydration error (using cached local data):", e);
      }
    };

    loadGlobalCloudData();

    // Auto-refresh every 45s for open browser tabs worldwide
    const interval = setInterval(loadGlobalCloudData, 45000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

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

  // =========================================================================
  // GLOBAL CLOUD PUSH ACTION (Broadcasts live changes to all visitors worldwide)
  // =========================================================================
  const syncAllToGlobalCloud = useCallback(
    async (customToken?: string): Promise<{ success: boolean; message: string }> => {
      setIsCloudSyncing(true);
      setCloudSyncMessage("Syncing changes to Global Cloud and all visitors worldwide...");

      const payload: GlobalCmsPayload = {
        version: "1.0",
        lastUpdated: new Date().toISOString(),
        updatedBy: "GBS Admin Bagbazar",
        pageContent,
        tickerItems,
        posts,
        videos,
        gallery,
        universities,
        settings,
      };

      const result = await pushGlobalCmsDataToGitHub(payload, customToken);

      setIsCloudSyncing(false);
      setCloudSyncMessage(result.message);
      if (result.success) {
        const time = new Date().toISOString();
        setLastCloudSyncTime(time);
        localStorage.setItem(`${STORAGE_KEY}_last_cloud_sync`, time);
      }

      return result;
    },
    [pageContent, tickerItems, posts, videos, gallery, universities, settings]
  );

  // Content operations
  const updatePageContent = (newContent: Partial<PageContent>) => {
    setPageContent((prev) => ({ ...prev, ...newContent }));
  };

  // University operations
  const addUniversity = (uni: Omit<University, "id">) => {
    const newUni: University = {
      ...uni,
      id: `uni-${Date.now()}`,
    };
    setUniversities((prev) => [newUni, ...prev]);
  };

  const updateUniversity = (id: string, updated: Partial<University>) => {
    setUniversities((prev) => prev.map((u) => (u.id === id ? { ...u, ...updated } : u)));
  };

  const deleteUniversity = (id: string) => {
    setUniversities((prev) => prev.filter((u) => u.id !== id));
  };

  // Ticker operations
  const addTickerItem = (item: Omit<NewsTickerItem, "id">) => {
    const newItem: NewsTickerItem = {
      ...item,
      id: `ticker-${Date.now()}`,
    };
    setTickerItems((prev) => [newItem, ...prev]);
  };

  const updateTickerItem = (id: string, item: Partial<NewsTickerItem>) => {
    setTickerItems((prev) => prev.map((t) => (t.id === id ? { ...t, ...item } : t)));
  };

  const deleteTickerItem = (id: string) => {
    setTickerItems((prev) => prev.filter((t) => t.id !== id));
  };

  const toggleTickerItem = (id: string) => {
    setTickerItems((prev) => prev.map((t) => (t.id === id ? { ...t, isActive: !t.isActive } : t)));
  };

  // Post operations
  const addPost = (post: Omit<PostItem, "id">) => {
    const newPost: PostItem = {
      ...post,
      id: `post-${Date.now()}`,
      date: post.date || new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    };
    setPosts((prev) => [newPost, ...prev]);
  };

  const updatePost = (id: string, updated: Partial<PostItem>) => {
    setPosts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updated } : p)));
  };

  const deletePost = (id: string) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  // Video operations
  const addVideo = (video: Omit<VideoItem, "id">) => {
    const newVideo: VideoItem = {
      ...video,
      id: `vid-${Date.now()}`,
    };
    setVideos((prev) => [newVideo, ...prev]);
  };

  const updateVideo = (id: string, updated: Partial<VideoItem>) => {
    setVideos((prev) => prev.map((v) => (v.id === id ? { ...v, ...updated } : v)));
  };

  const deleteVideo = (id: string) => {
    setVideos((prev) => prev.filter((v) => v.id !== id));
  };

  // Gallery operations
  const addGalleryItem = (item: Omit<GalleryItem, "id">) => {
    const newItem: GalleryItem = {
      ...item,
      id: `gal-${Date.now()}`,
    };
    setGallery((prev) => [newItem, ...prev]);
  };

  const updateGalleryItem = (id: string, updated: Partial<GalleryItem>) => {
    setGallery((prev) => prev.map((g) => (g.id === id ? { ...g, ...updated } : g)));
  };

  const deleteGalleryItem = (id: string) => {
    setGallery((prev) => prev.filter((g) => g.id !== id));
  };

  // Site settings
  const updateSettings = (newSettings: Partial<SiteSettings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  // Lead operations
  const submitNewLead = (formData: LeadFormData, uniName?: string) => {
    const newLead: InquiryLead = {
      id: `lead-${Date.now()}`,
      createdAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "New",
      ...formData,
      intendedMajor: uniName ? `${formData.intendedMajor} (${uniName})` : formData.intendedMajor,
    };
    setLeads((prev) => [newLead, ...prev]);
  };

  const updateLeadStatus = (id: string, status: InquiryLead["status"]) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
  };

  const updateLeadNotes = (id: string, notes: string) => {
    setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, counselorNotes: notes } : l)));
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
    localStorage.clear();
  };

  const exportDataJSON = (): string => {
    const fullBackup = {
      settings,
      pageContent,
      tickerItems,
      posts,
      videos,
      gallery,
      universities,
      leads,
      exportedAt: new Date().toISOString(),
    };
    return JSON.stringify(fullBackup, null, 2);
  };

  const importDataJSON = (jsonStr: string): boolean => {
    try {
      const data = JSON.parse(jsonStr);
      if (data.settings) setSettings(data.settings);
      if (data.pageContent) setPageContent(data.pageContent);
      if (data.tickerItems && Array.isArray(data.tickerItems)) setTickerItems(data.tickerItems);
      if (data.posts && Array.isArray(data.posts)) setPosts(data.posts);
      if (data.videos && Array.isArray(data.videos)) setVideos(data.videos);
      if (data.gallery && Array.isArray(data.gallery)) setGallery(data.gallery);
      if (data.universities && Array.isArray(data.universities)) setUniversities(data.universities);
      if (data.leads && Array.isArray(data.leads)) setLeads(data.leads);
      return true;
    } catch {
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
        isCloudSyncing,
        cloudSyncMessage,
        lastCloudSyncTime,
        syncAllToGlobalCloud,
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
