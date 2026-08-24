import React, { useState, useEffect } from "react";
import { useAdminData } from "../context/AdminDataContext";
import {
  FileText,
  Play,
  Image as ImageIcon,
  Calendar,
  Eye,
  Award,
  Sparkles,
  ExternalLink,
  ChevronRight,
  ChevronLeft,
  X,
  PlusCircle,
  Tag,
  User,
  GraduationCap,
  Youtube,
  ShieldCheck,
  Radio,
  Clock,
  ArrowRight,
  Pause,
  Volume2,
  VolumeX,
} from "lucide-react";
import { PostItem, VideoItem, GalleryItem } from "../types";
import { motion, AnimatePresence } from "motion/react";
import { speakPostTitle, stopSpeaking, playChimeSound } from "../utils/soundEffects";

interface MediaAndNewsSectionProps {
  onOpenAdmin?: () => void;
  onOpenBooking: () => void;
}

export const MediaAndNewsSection: React.FC<MediaAndNewsSectionProps> = ({ onOpenBooking }) => {
  const { posts, videos, gallery } = useAdminData();
  const [activeTab, setActiveTab] = useState<"posts" | "videos" | "gallery">("posts");
  const [selectedPost, setSelectedPost] = useState<PostItem | null>(null);
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null);
  const [selectedGallery, setSelectedGallery] = useState<GalleryItem | null>(null);
  const [isSpeakingTitle, setIsSpeakingTitle] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);

  // Auto-rotating News Spotlight
  const [spotlightIndex, setSpotlightIndex] = useState(0);
  const [isSpotlightPlaying, setIsSpotlightPlaying] = useState(true);

  const featuredPosts = posts.filter((p) => p.featured).length > 0 ? posts.filter((p) => p.featured) : posts;

  const handleSelectPost = (post: PostItem) => {
    setSelectedPost(post);
    if (!isAudioMuted) {
      setIsSpeakingTitle(true);
      speakPostTitle(post.title, () => {
        setIsSpeakingTitle(false);
      });
    } else {
      playChimeSound();
    }
  };

  const handleSelectGallery = (item: GalleryItem) => {
    setSelectedGallery(item);
    const speechText = item.title + (item.studentName ? `. Congratulations to student ${item.studentName}` : "") + (item.caption ? `. ${item.caption}` : "");
    if (!isAudioMuted) {
      setIsSpeakingTitle(true);
      speakPostTitle(speechText, () => {
        setIsSpeakingTitle(false);
      });
    } else {
      playChimeSound();
    }
  };

  const handleClosePostModal = () => {
    stopSpeaking();
    setIsSpeakingTitle(false);
    setSelectedPost(null);
  };

  const handleCloseGalleryModal = () => {
    stopSpeaking();
    setIsSpeakingTitle(false);
    setSelectedGallery(null);
  };

  const handleReplayTitleAudio = (title: string) => {
    setIsSpeakingTitle(true);
    speakPostTitle(title, () => {
      setIsSpeakingTitle(false);
    });
  };

  useEffect(() => {
    if (!isSpotlightPlaying || featuredPosts.length <= 1) return;
    const interval = setInterval(() => {
      setSpotlightIndex((prev) => (prev + 1) % featuredPosts.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isSpotlightPlaying, featuredPosts.length]);

  const currentSpotlight = featuredPosts[spotlightIndex] || featuredPosts[0];

  return (
    <section id="announcements" className="py-16 sm:py-24 bg-white text-gray-900 relative overflow-hidden border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative space-y-8">
        
        {/* Header Bento Title Row */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-gray-200 pb-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-blue-50 border border-blue-100 text-[#25479D] text-xs font-bold mb-3 uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" />
              <span>GBS Official Media Hub</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-[#25479D]">
              Announcements, Video Guides & Visa Gallery
            </h2>
            <p className="mt-2 text-sm text-gray-600 max-w-2xl font-medium">
              Stay updated with authentic Embassy notices, video interview roadmaps, and celebrations from GBS Educational Consultancy.
            </p>
          </div>

          {/* Tab Switcher & Admin Trigger */}
          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
            <div className="bg-gray-50 p-1 rounded-lg border border-gray-200 flex items-center gap-1">
              <button
                type="button"
                onClick={() => setActiveTab("posts")}
                className={`px-3 py-2 rounded text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === "posts"
                    ? "bg-[#25479D] text-white shadow-sm"
                    : "text-gray-600 hover:text-[#25479D] hover:bg-white"
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Notices & Posts ({posts.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("videos")}
                className={`px-3 py-2 rounded text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === "videos"
                    ? "bg-[#ED2D2A] text-white shadow-sm"
                    : "text-gray-600 hover:text-[#ED2D2A] hover:bg-white"
                }`}
              >
                <Youtube className="w-3.5 h-3.5" />
                <span>Videos & Reels ({videos.length})</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab("gallery")}
                className={`px-3 py-2 rounded text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === "gallery"
                    ? "bg-green-600 text-white shadow-sm"
                    : "text-gray-600 hover:text-green-600 hover:bg-white"
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Visa Grants ({gallery.length})</span>
              </button>
            </div>
          </div>
        </div>

        {/* TAB 1: POSTS & ARTICLES GRID */}
        {activeTab === "posts" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                onClick={() => handleSelectPost(post)}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col group hover:border-blue-300 transition-all shadow-sm hover:shadow-md hover:-translate-y-1 cursor-pointer"
              >
                {/* Image */}
                <div className="relative h-48 w-full overflow-hidden bg-gray-100 border-b border-gray-200">
                  <img
                    src={post.imageUrl || "https://images.unsplash.com/photo-1538485399081-7191377e8241?w=800&q=80"}
                    alt={post.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded text-[10px] font-extrabold text-[#25479D] uppercase tracking-wider border border-white/50 shadow-sm">
                    {post.category}
                  </div>
                  {post.featured && (
                    <div className="absolute top-3 right-3 bg-[#ED2D2A] px-2 py-0.5 rounded text-[10px] font-black text-white uppercase tracking-wider shadow-sm">
                      Featured
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <div className="flex items-center gap-2 text-xs text-gray-500 font-bold">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{post.date}</span>
                      <span className="text-gray-300">•</span>
                      <User className="w-3.5 h-3.5" />
                      <span>{post.author}</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-extrabold text-gray-900 leading-snug group-hover:text-[#25479D] transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-sm text-gray-600 font-medium line-clamp-3 leading-relaxed">
                      {post.summary}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      {post.tags?.slice(0, 2).map((tag, idx) => (
                        <span key={idx} className="text-[10px] bg-gray-100 text-gray-600 px-2 py-0.5 rounded border border-gray-200 font-bold">
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSelectPost(post);
                      }}
                      className="text-xs font-bold text-[#ED2D2A] hover:text-red-700 flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <span>Read Article</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 2: VIDEOS & REELS GRID */}
        {activeTab === "videos" && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videos.map((vid) => (
              <div
                key={vid.id}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden flex flex-col group hover:border-red-300 transition-all shadow-sm hover:shadow-md"
              >
                {/* Video Thumbnail Box */}
                <div
                  onClick={() => setSelectedVideo(vid)}
                  className="relative h-48 w-full bg-gray-900 overflow-hidden cursor-pointer flex items-center justify-center group"
                >
                  <img
                    src={vid.youtubeId ? `https://img.youtube.com/vi/${vid.youtubeId}/hqdefault.jpg` : `https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80`}
                    alt={vid.title}
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      // Fallback to high quality stock if YouTube thumb blocked
                      (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80";
                    }}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                  {/* Play Button Overlay */}
                  <div className="absolute w-14 h-14 rounded-full bg-[#ED2D2A] text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-6 h-6 fill-current ml-1" />
                  </div>
                  <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/80 rounded text-[10px] font-mono font-bold text-white shadow-sm">
                    {vid.duration}
                  </div>
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded text-[10px] font-extrabold text-[#ED2D2A] uppercase tracking-wider shadow-sm">
                    {vid.category}
                  </div>
                </div>

                {/* Info */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <h3 className="text-sm sm:text-base font-extrabold text-gray-900 line-clamp-2 group-hover:text-[#ED2D2A] transition-colors">
                      {vid.title}
                    </h3>
                    <p className="text-sm text-gray-600 font-medium line-clamp-2">
                      {vid.description}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setSelectedVideo(vid)}
                    className="w-full py-2.5 bg-gray-50 hover:bg-[#ED2D2A] hover:text-white hover:border-[#ED2D2A] text-gray-700 border border-gray-200 rounded text-xs font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
                  >
                    <Play className="w-3.5 h-3.5" />
                    <span>Watch Full Video Guide</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* TAB 3: VISA GRANTS & CELEBRATIONS GALLERY */}
        {activeTab === "gallery" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {gallery.map((item) => (
              <div
                key={item.id}
                onClick={() => handleSelectGallery(item)}
                className="bg-white border border-gray-200 rounded-xl overflow-hidden group hover:border-green-500 transition-all cursor-pointer shadow-sm hover:shadow-md"
              >
                <div className="relative h-44 w-full bg-gray-100 overflow-hidden border-b border-gray-100">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2 left-2 bg-white/90 backdrop-blur px-2 py-0.5 rounded text-[9px] font-extrabold text-green-700 uppercase tracking-wider shadow-sm border border-white">
                    {item.category}
                  </div>
                </div>

                <div className="p-3.5 space-y-1">
                  <h4 className="text-xs font-extrabold text-gray-900 truncate">{item.title}</h4>
                  {item.studentName && (
                    <p className="text-[11px] text-[#25479D] font-bold truncate">
                      🎓 {item.studentName}
                    </p>
                  )}
                  {item.university && (
                    <p className="text-[10px] text-gray-500 font-medium truncate">
                      🏛️ {item.university}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

      </div>

      {/* MODAL: POST FULL DETAIL */}
      {selectedPost && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white border border-gray-200 text-gray-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl relative space-y-6">
            
            <button
              onClick={handleClosePostModal}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 bg-gray-50 hover:bg-gray-100 rounded transition-colors cursor-pointer border border-transparent hover:border-gray-200"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded text-xs font-extrabold bg-blue-50 border border-blue-100 text-[#25479D] uppercase tracking-wider">
                  {selectedPost.category}
                </span>
                <span className="text-xs text-gray-500 font-bold">{selectedPost.date}</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-black text-gray-900 leading-snug">
                {selectedPost.title}
              </h2>

              <div className="flex items-center gap-2 text-xs text-gray-500 font-bold">
                <User className="w-4 h-4 text-gray-400" />
                <span>Published by {selectedPost.author}</span>
              </div>
            </div>

            {selectedPost.imageUrl && (
              <div className="h-64 rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                <img
                  src={selectedPost.imageUrl}
                  alt={selectedPost.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="text-sm text-gray-700 whitespace-pre-line leading-relaxed font-medium p-5 bg-gray-50 rounded-xl border border-gray-200">
              {selectedPost.content}
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-gray-100">
              <div className="text-sm text-gray-600 font-medium">
                Have questions about this notice? <strong className="text-[#25479D] font-extrabold block sm:inline mt-1 sm:mt-0">Call GBS: 9744427779</strong>
              </div>
              <button
                type="button"
                onClick={() => {
                  handleClosePostModal();
                  onOpenBooking();
                }}
                className="w-full sm:w-auto px-6 py-3 bg-[#ED2D2A] hover:bg-red-700 text-white rounded text-sm font-bold transition-colors cursor-pointer shadow-md"
              >
                Book In-Person Counseling
              </button>
            </div>

          </div>
        </div>
      )}

      {/* MODAL: VIDEO PLAYER */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white border border-gray-200 text-gray-900 rounded-xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative space-y-4">
            
            <button
              onClick={() => setSelectedVideo(null)}
              className="absolute -top-12 right-0 p-2 text-white hover:text-red-400 transition-colors cursor-pointer"
            >
              <X className="w-8 h-8" />
            </button>

            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-red-50 text-[#ED2D2A] border border-red-100 font-extrabold uppercase tracking-wider text-[11px] rounded">
                {selectedVideo.category}
              </span>
              <span className="text-xs text-gray-500 font-bold">Duration: {selectedVideo.duration}</span>
            </div>

            <h3 className="text-lg sm:text-xl font-black text-gray-900">
              {selectedVideo.title}
            </h3>

            {/* Video Player Container */}
            <div className="relative aspect-video w-full rounded-lg overflow-hidden bg-black shadow-inner">
              <iframe
                src={`https://www.youtube.com/embed/${selectedVideo.youtubeId}?autoplay=1`}
                title={selectedVideo.title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>

            <p className="text-sm text-gray-600 font-medium leading-relaxed bg-gray-50 p-4 rounded-lg border border-gray-200">
              {selectedVideo.description}
            </p>

          </div>
        </div>
      )}

      {/* MODAL: GALLERY IMAGE FULLVIEW */}
      {selectedGallery && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white border border-gray-200 text-gray-900 rounded-xl max-w-lg w-full p-6 shadow-2xl relative space-y-4">
            
            <button
              onClick={handleCloseGalleryModal}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 rounded transition-colors cursor-pointer border border-transparent hover:border-gray-200 z-10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="rounded-lg overflow-hidden border border-gray-200 bg-gray-100 shadow-sm relative">
              <img
                src={selectedGallery.imageUrl}
                alt={selectedGallery.title}
                referrerPolicy="no-referrer"
                className="w-full max-h-[60vh] object-contain"
              />
            </div>

            <div className="pt-2 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded bg-green-50 text-green-700 border border-green-200 uppercase tracking-wider">
                  {selectedGallery.category}
                </span>

                <button
                  type="button"
                  onClick={() => {
                    const speechText = selectedGallery.title + (selectedGallery.studentName ? `. Congratulations to student ${selectedGallery.studentName}` : "") + (selectedGallery.caption ? `. ${selectedGallery.caption}` : "");
                    speakPostTitle(speechText);
                  }}
                  className="px-3 py-1 bg-red-50 hover:bg-red-100 text-[#ED2D2A] border border-red-200 rounded-lg text-xs font-bold flex items-center gap-1 cursor-pointer"
                >
                  <Volume2 className="w-3.5 h-3.5" />
                  <span>Listen Voice 🔊</span>
                </button>
              </div>

              <h3 className="text-lg font-black text-gray-900 mt-2">{selectedGallery.title}</h3>
              {selectedGallery.studentName && (
                <p className="text-sm text-[#25479D] font-extrabold mt-1">
                  Student: {selectedGallery.studentName} <span className="text-gray-500 font-medium">({selectedGallery.university})</span>
                </p>
              )}
              {selectedGallery.caption && (
                <p className="text-sm text-gray-700 font-medium mt-3 bg-gray-50 p-3.5 rounded-lg border border-gray-200 leading-relaxed whitespace-pre-line">
                  {selectedGallery.caption}
                </p>
              )}
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
