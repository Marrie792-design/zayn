import React, { useState, useEffect, useRef,  useMemo} from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';

// Lucide React Icons Import
import {
  Play, Pause, Volume2, VolumeX, ArrowUpRight, Film, Video, Sliders,
  Sparkles, Layers, Tv, CheckCircle2, ArrowRight, Share2, Globe,
  Mail, Menu, X, ChevronUp, ExternalLink, Send,
  BarChart3, Music, Infinity as MetaIcon
} from 'lucide-react';


import './Portfolio.css';

// --- OFFICIAL BRAND LOGO IMAGE URLS ---
const LOGOS = {
  premiere: 'https://th.bing.com/th/id/OIP.D9jOSjwvZ4WXTFlIV7bPnQHaHa?w=185&h=185&c=7&r=0&o=7&dpr=1.1&pid=1.7&rm=3',
  photoshop: 'data:image/webp;base64,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',
  illustrator: 'data:image/webp;base64,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',
  aftereffects: 'data:image/webp;base64,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',
  capcut: 'https://th.bing.com/th?q=Cap+Cut+Full+HD+Icon&w=120&h=120&c=1&rs=1&qlt=70&r=0&o=7&cb=1&dpr=1.1&pid=InlineBlock&rm=3&mkt=en-WW&cc=PK&setlang=en&adlt=moderate&t=1&mw=247',
  canva: 'data:image/webp;base64,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',
  meta: 'https://th.bing.com/th/id/OIP.zMUV7B749XG0H15ZaBO_LwHaHa?w=183&h=183&c=7&r=0&o=7&dpr=1.1&pid=1.7&rm=3',
  instagram: 'https://th.bing.com/th/id/OIP.JCI8klaaA1w4LCtljpeJoAHaHa?w=194&h=194&c=7&r=0&o=7&dpr=1.1&pid=1.7&rm=3',
  youtube: 'https://th.bing.com/th/id/OIP.qpbbotZNeZ8NHGoC5KzeuwHaHa?w=180&h=180&c=7&r=0&o=7&dpr=1.1&pid=1.7&rm=3',
  analytics: 'data:image/webp;base64,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',
  music: 'https://th.bing.com/th/id/OIP.JJTaOAGFwgfp9g6Md6AqOAHaHa?w=174&h=180&c=7&r=0&o=7&dpr=1.1&pid=1.7&rm=3',
};


const YoutubeIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
    <path d="m10 15 5-3-5-3z" />
  </svg>
);

const LinkedinIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);


// Reusable Image Component for Icons
const BrandIcon = ({ src, alt }) => (
  <img
    src={src}
    alt={alt}
    style={{ width: '28px', height: '28px', objectFit: 'contain' }}
  />
);


// Pure Image Wrapper Component
const BrandTile = ({ src, alt }) => (
  <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '10px' }} />
);

// Updated Arrays
const LEFT_TOOLS = [
  { name: 'Adobe Premiere Pro', icon: <BrandTile src={LOGOS.premiere} alt="Pr" />, isDark: true },
  { name: 'Analytics', icon: <BrandTile src={LOGOS.analytics} alt="Analytics" />, isDark: true },
  { name: 'Adobe Photoshop', icon: <BrandTile src={LOGOS.photoshop} alt="Ps" />, isDark: true },
  { name: 'CapCut', icon: <BrandTile src={LOGOS.capcut} alt="CapCut" />, isDark: true },
  { name: 'Music', icon: <BrandTile src={LOGOS.music} alt="Music" />, isDark: true },
  { name: 'Adobe Illustrator', icon: <BrandTile src={LOGOS.illustrator} alt="Ai" />, isDark: true },
];

const RIGHT_TOOLS = [
  { name: 'Meta', icon: <BrandTile src={LOGOS.meta} alt="Meta" />, isDark: true },
  { name: 'Canva', icon: <BrandTile src={LOGOS.canva} alt="Canva" />, isDark: true },
  { name: 'Adobe After Effects', icon: <BrandTile src={LOGOS.aftereffects} alt="Ae" />, isDark: true },
  { name: 'Instagram', icon: <BrandTile src={LOGOS.instagram} alt="Instagram" />, isDark: true },
  { name: 'YouTube', icon: <BrandTile src={LOGOS.youtube} alt="YouTube" />, isDark: true },
];


// --- VIDEO EDITOR PROJECTS DATA ---
// --- FILTER TABS ---
const TABS = ['LONG FORM', 'SHORT FORM', 'GRAPHICS', 'DOCUMENTARY', 'PODCAST', 'THUMBNAIL DESIGN'];

// --- PORTFOLIO DATA ---
const PROJECTS_DATA = [
  {
    id: '1',
    category: 'LONG FORM',
    title: 'Who killed Nouman Qaiser? | Documentary',
    videoUrl: 'https://youtu.be/aSeOHZv8xFM?si=OQZkR8GUcpp41weL',
    thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: '2',
    category: 'LONG FORM',
    title: 'Cloning Dropshipping store',
    videoUrl: 'https://youtu.be/_YSssrE0460?si=9hCE3HH70mZf9SQb',
    thumbnail: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: '3',
    category: 'LONG FORM',
    title: 'Cloning Dropshipping store',
    videoUrl: 'https://youtu.be/y8c-S0rdriw?si=5Zq562LRgzq_1KVl',
    thumbnail: 'https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=1200&auto=format&fit=crop'
  },

  {
    id: '4',
    category: 'SHORT FORM',
    title: 'Instagram Reel 01',
    videoUrl: 'https://www.instagram.com/reel/DbCx5wsMnRb/',
    thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: '5',
    category: 'SHORT FORM',
    title: 'Instagram Reel 02',
    videoUrl: 'https://www.instagram.com/reel/DbI2MBmhJB_/',
    thumbnail: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: '6',
    category: 'SHORT FORM',
    title: 'Instagram Reel 03',
    videoUrl: 'https://www.instagram.com/reel/DcOT9ucsfHA/',
    thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: '7',
    category: 'SHORT FORM',
    title: 'Instagram Reel 04',
    videoUrl: 'https://www.instagram.com/reel/Dbx8O4SIkBO/',
    thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: '8',
    category: 'SHORT FORM',
    title: 'Instagram Reel 05',
    videoUrl: 'https://www.instagram.com/reel/DbgA4l7sQmH/',
    thumbnail: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: '9',
    category: 'SHORT FORM',
    title: 'Instagram Reel 06',
    videoUrl: 'https://www.instagram.com/reel/Dbajd3Mu-Az/',
    thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: '10',
    category: 'SHORT FORM',
    title: 'YouTube Short 01',
    videoUrl: 'https://youtube.com/shorts/KBGsh0vGcD8',
    thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: '11',
    category: 'SHORT FORM',
    title: 'YouTube Short 02',
    videoUrl: 'https://youtube.com/shorts/kmQZgl5nP60',
    thumbnail: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: '12',
    category: 'SHORT FORM',
    title: 'YouTube Short 03',
    videoUrl: 'https://youtube.com/shorts/9Waoq-_HMGA',
    thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: '13',
    category: 'SHORT FORM',
    title: 'YouTube Short 04',
    videoUrl: 'https://youtube.com/shorts/jfp6CDoY0DI',
    thumbnail: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: '14',
    category: 'SHORT FORM',
    title: 'Instagram Reel 07',
    videoUrl: 'https://www.instagram.com/reel/DaK3k-ORjQ4/',
    thumbnail: 'https://images.unsplash.com/photo-1617788138017-80ad40651399?q=80&w=1200&auto=format&fit=crop'
  },
  {
    id: '15',
    category: 'SHORT FORM',
    title: 'Instagram Reel 08',
    videoUrl: 'https://www.instagram.com/reel/DaiajR0Nnh6/',
    thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop'
  },

  // 1. Graphics Item (Image & Thumbnail ke sath)
  {
    id: '16',
    category: 'GRAPHICS',
    title: 'Motion Graphics Showreel',
    thumbnail: '/images/graphics/wallet.png',
  },
  {
    id: '17',
    category: 'GRAPHICS',
    title: 'Motion Graphics Showreel',
    thumbnail: '/images/graphics/wallet1.png',
  },
  {
    id: '18',
    category: 'GRAPHICS',
    title: 'Motion Graphics Showreel',
    thumbnail: '/images/graphics/wallet2.png',
  },
  {
    id: '19',
    category: 'GRAPHICS',
    title: 'Motion Graphics Showree4',
    thumbnail: '/images/graphics/wallet3.png',
  },


  // 1. Documentary Video Item
  {
    id: '20',
    category: 'DOCUMENTARY',
    title: 'Documentary Video 1',
    imgUrl: 'https://img.youtube.com/vi/tAI9vSOA8Ec/maxresdefault.jpg',
    thumbnailUrl: 'https://img.youtube.com/vi/tAI9vSOA8Ec/hqdefault.jpg',
    videoUrl: 'https://youtu.be/tAI9vSOA8Ec?si=0I5Do5C_TAXaPtEs',
    isExternalVideo: true
  },

  // 2. Documentary Video Item
  {
    id: '21',
    category: 'DOCUMENTARY',
    title: 'Documentary Video 2',
    imgUrl: 'https://img.youtube.com/vi/QE1ezv24vwc/maxresdefault.jpg',
    thumbnailUrl: 'https://img.youtube.com/vi/QE1ezv24vwc/hqdefault.jpg',
    videoUrl: 'https://youtu.be/QE1ezv24vwc?si=DUvW4Oehnhe-JZHR',
    isExternalVideo: true
  },

  // 1. Podcast Video Item
  {
    id: '22',
    category: 'PODCAST',
    title: '$30-Million Founder Systems: Startup Scaling Podcast',
    thumbnail: 'https://img.youtube.com/vi/yvZT1sNpOlo/maxresdefault.jpg',
    videoUrl: 'https://youtu.be/yvZT1sNpOlo?si=ShBTIuG9O83w8_o6',
    isExternalVideo: true
  },

  // 2. Podcast Video Item
  {
    id: '23',
    category: 'PODCAST',
    title: 'Building Pakistan’s Biggest AI Ecosystem | Hustle Stories',
    thumbnail: 'https://img.youtube.com/vi/ChH8hMgcu3Q/maxresdefault.jpg',
    videoUrl: 'https://youtu.be/ChH8hMgcu3Q?si=1VU3wA4dvOd0YLmg',
    isExternalVideo: true
  },
  {
    id: '24',
    category: 'THUMBNAIL DESIGN',
    title: 'Cyberpunk YouTube Thumbnails',
    imgUrl: 'https://th.bing.com/th/id/OIP.5Vqs-m5JyIWwBnDktBjvRAHaEN?w=279&h=180&c=7&r=0&o=7&dpr=1.1&pid=1.7&rm=3',
    thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop'
  }
];


const SERVICES_DATA = [
  {
    number: '01',
    icon: Film,
    title: 'Cinematic Video Editing',
    description: 'Paced storytelling, rhythmic cuts, multi-cam assembly, and seamless scene transitions tailored for commercials and films.'
  },
  {
    number: '02',
    icon: Sliders,
    title: 'DaVinci Color Grading',
    description: 'Professional color correction, skin-tone matching, custom LUT creation, and stylized cinematic film looks.'
  },
  {
    number: '03',
    icon: Sparkles,
    title: 'Motion Graphics & VFX',
    description: '2D/3D kinetic typography, green screen compositing, rotoscoping, object removal, and glowing visual effects.'
  },
  {
    number: '04',
    icon: Volume2,
    title: 'Sound Design & Mixing',
    description: 'Custom Foley integration, impact sound effects, audio cleanup, noise reduction, and multi-track spatial balancing.'
  },
  {
    number: '05',
    icon: Video,
    title: 'Social Media Reels / Shorts',
    description: 'High-retention vertical video editing with hook-first framing, fast cuts, custom captions, and trending audio sync.'
  },
  {
    number: '06',
    icon: Tv,
    title: 'Commercial Finishing',
    description: 'Final mastering, frame-rate conversion, broadcast delivery compliance, and multi-platform export optimization.'
  }
];



const EXPERIENCE_DATA = [
  {
    year: '2024 — Present',
    position: 'Senior Post-Production Editor',
    company: 'Cine-Graphix Studio',
    description: 'Head editor for high-budget commercial campaigns, brand films, and music videos. Overseeing color pipelines and final delivery.',
    tools: ['DaVinci Resolve', 'After Effects', 'Premiere Pro']
  },
  {
    year: '2023 — 2024',
    position: 'Motion Graphics & Color Lead',
    company: 'Vanguard Creative Media',
    description: 'Specialized in 3D title design, rotoscoping, sound design integration, and multi-platform commercial promos.',
    tools: ['After Effects', 'Audition', 'Cinema 4D']
  },
  {
    year: '2022 — 2023',
    position: 'Junior Video Editor',
    company: 'Apex Digital Agency',
    description: 'Edited short-form marketing videos, social media reels, and YouTube documentary B-roll sequences.',
    tools: ['Premiere Pro', 'Photoshop']
  }
];

const TESTIMONIALS_DATA = [
  {
    name: 'Hamza Malik',
    position: 'Commercial Director, Cine-Graphix',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
    testimonial: 'His sense of pacing, audio timing, and color grading elevated our commercial campaign to international broadcast standards.'
  },
  {
    name: 'Ayesha Khan',
    position: 'Creative Producer, Mimi Atelier',
    image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=300&auto=format&fit=crop',
    testimonial: 'The fashion film edit was pure perfection. The smooth speed ramping and luxurious grading matched our brand vision flawlessly.'
  },
  {
    name: 'Daniyal Ahmed',
    position: 'Independent Filmmaker',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop',
    testimonial: 'Working with him on our short film was an incredible experience. His sound design work added so much emotional depth.'
  }
];

const SUB_CATEGORIES = ['All', 'Thumbnails', 'Banners', 'Posters'];

export default function Portfolio() {
  const [playingProjectId, setPlayingProjectId] = useState(null);
  const [activeSection, setActiveSection] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [isPlayingModalVideo, setIsPlayingModalVideo] = useState(true);
  const [isMutedModalVideo, setIsMutedModalVideo] = useState(false);

  // Custom Cursor
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorText, setCursorText] = useState('');
  const [cursorExpanded, setCursorExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Form
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Scroll Progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const videoRef = useRef(null);

  useEffect(() => {
    const handleCheckMobile = () => setIsMobile(window.innerWidth < 768);
    handleCheckMobile();
    window.addEventListener('resize', handleCheckMobile);

    const handleMouseMove = (e) => {
      if (window.innerWidth >= 768) setCursorPos({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ['home', 'about', 'portfolio', 'services', 'skills', 'experience', 'contact'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('resize', handleCheckMobile);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleCursorEnter = (text = '') => {
    if (isMobile) return;
    setCursorText(text);
    setCursorExpanded(true);
  };

  const handleCursorLeave = () => {
    if (isMobile) return;
    setCursorText('');
    setCursorExpanded(false);
  };

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  const toggleModalVideoPlay = () => {
    if (videoRef.current) {
      if (isPlayingModalVideo) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlayingModalVideo(!isPlayingModalVideo);
    }
  };

  const toggleModalVideoMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMutedModalVideo;
      setIsMutedModalVideo(!isMutedModalVideo);
    }
  };



const [activeTab, setActiveTab] = useState('Long Form');
  const [activeSubTab, setActiveSubTab] = useState('All');

  // Handle main tab changes & reset sub-tab when leaving Graphics
  const handleTabChange = (category) => {
    setActiveTab(category);
    setActiveSubTab('All'); // Reset sub-category filter on main tab switch
  };

  // Memoized Filter Logic for Performance
  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter((project) => {
      // 1. Check if the project matches the active main category (case-insensitive)
      const matchesCategory =
        project.category.toLowerCase() === activeTab.toLowerCase();

      if (!matchesCategory) return false;

      // 2. If viewing 'Graphics' and a specific sub-category is selected
      const isGraphicsTab = activeTab.toLowerCase().includes('graphic');
      if (isGraphicsTab && activeSubTab !== 'All') {
        return project.subCategory === activeSubTab;
      }

      return true;
    });
  }, [activeTab, activeSubTab]);




  const getEmbedInfo = (url) => {
    if (!url) return { type: 'none', embedUrl: '' };

    // 1. YouTube Video / Shorts Detection
    const ytMatch = url.match(/(?:youtube\.com\/(?:shorts\/|watch\?v=)|youtu\.be\/)([a-zA-Z0-9_-]+)/);
    if (ytMatch && ytMatch[1]) {
      return {
        type: 'youtube',
        embedUrl: `https://www.youtube.com/embed/${ytMatch[1]}`
      };
    }

    // 2. Instagram Reels Detection
    const igMatch = url.match(/instagram\.com\/reel\/([a-zA-Z0-9_-]+)/);
    if (igMatch && igMatch[1]) {
      return {
        type: 'instagram',
        embedUrl: `https://www.instagram.com/reel/${igMatch[1]}/embed/`
      };
    }

    // 3. Direct MP4 Video File
    return {
      type: 'video',
      embedUrl: url
    };
  };


  {
    filteredProjects.map((project) => {
      // 1. Pehle variables define karein (return se pehle)
      const { type, embedUrl } = getEmbedInfo(project.videoUrl);
      const isVideo = Boolean(project.videoUrl);
    })
  };

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? TESTIMONIALS_DATA.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === TESTIMONIALS_DATA.length - 1 ? 0 : prev + 1));
  };

  const current = TESTIMONIALS_DATA[currentIndex];


  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');

    try {
      const response = await fetch('https://zayn-backend-eight.vercel.app/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (data.success) {
        setFormSubmitted(true);
        setFormState({ name: '', email: '', message: '' });
      } else {
        setErrorMessage(data.error || 'Failed to send message.');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setErrorMessage('Server error. Please check if backend is running.');
    } finally {
      setIsSubmitting(false);
    }
  };



  return (
    <div className="portfolio-wrapper">
      <motion.div className="scroll-progress-bar" style={{ scaleX }} />

      {!isMobile && (
        <motion.div
          className={`custom-cursor ${cursorExpanded ? 'expanded' : ''}`}
          animate={{
            x: cursorPos.x - (cursorExpanded ? 40 : 8),
            y: cursorPos.y - (cursorExpanded ? 40 : 8)
          }}
          transition={{ type: 'spring', damping: 25, stiffness: 350, mass: 0.1 }}
        >
          {cursorText && <span className="cursor-text">{cursorText}</span>}
        </motion.div>
      )}

      {/* HEADER */}
      <header className={`portfolio-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-container">
          <a href="#home" className="brand-logo" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>
            CINE GRAPHIX<span className="dot">.</span>
          </a>

          <nav className="desktop-nav">
            {['home', 'about', 'portfolio', 'services', 'contact'].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className={`nav-link ${activeSection === item ? 'active' : ''}`}
                onClick={(e) => { e.preventDefault(); scrollToSection(item); }}
                onMouseEnter={() => handleCursorEnter('GO')}
                onMouseLeave={handleCursorLeave}
              >
                {item.toUpperCase()}
              </a>
            ))}
          </nav>

          <button className="mobile-menu-btn" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              className="mobile-nav-overlay"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              {['home', 'about', 'portfolio', 'services', 'contact'].map((item) => (
                <a
                  key={item}
                  href={`#${item}`}
                  className={`mobile-nav-link ${activeSection === item ? 'active' : ''}`}
                  onClick={(e) => { e.preventDefault(); scrollToSection(item); }}
                >
                  {item.toUpperCase()}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* HERO SECTION WITH BACKGROUND VIDEO */}
      <section id="home" className="hero-section">
        <div className="hero-video-bg">
          {/* <video autoPlay loop muted playsInline className="hero-bg-video">
            <source src="https://www.pexels.com/download/video/33717248/" type="video/mp4" />
          </video> */}
          <video autoPlay loop muted playsInline className="hero-bg-video">
            <source src="/images/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="hero-video-overlay" />
        </div>

        <div className="hero-content">
          <motion.div
            className="hero-badge"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="badge-dot" /> CINEMATIC POST-PRODUCTION STUDIO
          </motion.div>

          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            CRAFTING HIGH-IMPACT <span className="text-highlight">VISUAL STORIES.</span>
          </motion.h1>

          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Senior Video Editor, Colorist, & Motion Designer specializing in commercial films, music videos, 3D graphics, and immersive sound design.
          </motion.p>

          <motion.div
            className="hero-cta-group"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button
              className="cta-btn primary"
              onClick={() => scrollToSection('projects')}
              onMouseEnter={() => handleCursorEnter('REEL')}
              onMouseLeave={handleCursorLeave}
            >
              WATCH SHOWREEL <Play size={16} fill="currentColor" />
            </button>
            <button
              className="cta-btn secondary"
              onClick={() => scrollToSection('contact')}
              onMouseEnter={() => handleCursorEnter('BOOK')}
              onMouseLeave={handleCursorLeave}
            >
              BOOK A PROJECT
            </button>
          </motion.div>
        </div>

      </section>

      {/* MARQUEE SECTION */}
      <div className="marquee-wrapper">
        <div className="marquee-track">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="marquee-content">
              <span>CINEMATIC VIDEO EDITING</span>
              <span className="divider">•</span>
              <span>DAVINCI COLOR GRADING</span>
              <span className="divider">•</span>
              <span>MOTION GRAPHICS</span>
              <span className="divider">•</span>
              <span>SOUND DESIGN</span>
              <span className="divider">•</span>
              <span>3D VISUAL EFFECTS</span>
              <span className="divider">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* ABOUT SECTION */}
      <section id="about" className="about-section">
        <div className="about-container">
          <div className="about-grid">

            {/* LEFT COLUMN: SHOWREEL VIDEO FRAME */}
            <motion.div
              className="about-media-column"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="video-frame-wrapper">
                {/* YOUTUBE EMBED IFRAME */}
                <iframe
                  src="https://www.youtube.com/embed/9Waoq-_HMGA?autoplay=1&mute=1&loop=1&playlist=9Waoq-_HMGA&controls=0&modestbranding=1&rel=0"
                  title="Showreel"
                  className="about-showreel-video"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />

                {/* FLOATING STATUS BADGE */}
                <div className="media-floating-badge">
                  <span className="live-dot" /> 4K COLORIST SUITE
                </div>
                <div className="frame-glow-effect" />
              </div>
            </motion.div>

            {/* RIGHT COLUMN: TEXT & STATS */}
            <motion.div
              className="about-text-column"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="about-section-tag">// ABOUT THE STUDIO</span>
              <h2 className="about-main-heading">
                THE ART OF RHYTHM, <span className="heading-accent">COLOR & ATMOSPHERE.</span>
              </h2>

              <p className="about-description">
                At <strong>Cine-Graphix</strong>, raw footage is transformed into high-impact visual stories. We focus on precision-cut pacing, advanced DaVinci Resolve color grading, and heavy soundscapes that hook viewers from the very first frame.
              </p>

              {/* SOFTWARE TOOL PILLS */}
              <div className="tools-pills-group">
                <span className="tool-pill">DaVinci Resolve</span>
                <span className="tool-pill">Premiere Pro</span>
                <span className="tool-pill">After Effects</span>
                <span className="tool-pill">Blender 3D</span>
              </div>

              {/* STATS GRID */}
              <div className="about-stats-grid">
                <div className="about-stat-card">
                  <h3 className="stat-value">150+</h3>
                  <p className="stat-title">Projects Completed</p>
                </div>
                <div className="about-stat-card">
                  <h3 className="stat-value">03+</h3>
                  <p className="stat-title">Years Experience</p>
                </div>
                <div className="about-stat-card">
                  <h3 className="stat-value">10M+</h3>
                  <p className="stat-title">Client Impressions</p>
                </div>
                <div className="about-stat-card">
                  <h3 className="stat-value">100%</h3>
                  <p className="stat-title">Client Satisfaction</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* SELECTED PROJECTS SECTION */}
     {/* SELECTED PROJECTS SECTION */}
<section id="portfolio" className="portfolio-section-dark">
  <div className="portfolio-container">

    {/* HEADER SECTION */}
    <div className="portfolio-section-header">
      <h1 className="portfolio-heading">
        <span className="word-wrapper">
          <span className="hover-letter">O</span>
          <span className="hover-letter">U</span>
          <span className="hover-letter">R</span>
        </span>
        {' '}
        <span className="word-wrapper">
          <span className="hover-letter">P</span>
          <span className="hover-letter">O</span>
          <span className="hover-letter">R</span>
          <span className="hover-letter">T</span>
          <span className="hover-letter">F</span>
          <span className="hover-letter">O</span>
          <span className="hover-letter">L</span>
          <span className="hover-letter">I</span>
          <span className="hover-letter">O</span>
        </span>
      </h1>
      <p className="portfolio-subtitle">
        Take a look at some of our favorite projects we've worked on recently.
      </p>

      {/* CATEGORY FILTER TABS */}
      <div className="portfolio-tabs-wrapper">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`portfolio-tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => {
              setActiveTab(tab);
              setActiveSubTab('All'); // Reset sub-tab
              setPlayingProjectId(null);
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* DYNAMIC SUB-CATEGORIES FOR GRAPHICS */}
      {activeTab.toLowerCase().includes('graphic') && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="graphics-sub-tabs-wrapper"
        >
          {['All', 'Product Ads', 'Real Estate', 'Islamic'].map((sub) => (
            <button
              key={sub}
              className={`graphics-sub-btn ${activeSubTab === sub ? 'active' : ''}`}
              onClick={() => setActiveSubTab(sub)}
            >
              {sub}
            </button>
          ))}
        </motion.div>
      )}
    </div>

    {/* PROJECTS & GRAPHICS GRID */}
    <motion.div
      layout
      className={`portfolio-video-grid grid-${activeTab.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <AnimatePresence>
        {filteredProjects.map((project) => {
          const { type, embedUrl } = getEmbedInfo(project.videoUrl || '');
          const isVideo = Boolean(project.videoUrl);
          const isPlaying = playingProjectId === project.id;
          const activeEmbedUrl = isPlaying
            ? `${embedUrl}${embedUrl.includes('?') ? '&' : '?'}autoplay=1`
            : embedUrl;

          return (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className={`video-card-container ${!isVideo ? 'graphics-card' : ''}`}
              onMouseEnter={() => {
                if (isVideo && !isPlaying) handleCursorEnter('PLAY');
                if (!isVideo) handleCursorEnter('VIEW');
              }}
              onMouseLeave={() => {
                handleCursorLeave();
              }}
              onClick={() => {
                if (isVideo && !isPlaying) {
                  handleCursorLeave();
                  setPlayingProjectId(project.id);
                } else if (!isVideo) {
                  handleCursorLeave();
                  setSelectedProject(project); // Opens full preview modal for image items
                }
              }}
            >
              {isVideo ? (
                <div className="video-iframe-wrapper">
                  {!isPlaying && <div className="iframe-mouse-fix" />}
                  {type === 'youtube' || type === 'instagram' ? (
                    <iframe
                      src={activeEmbedUrl}
                      title={project.title}
                      className="portfolio-video-player"
                      frameBorder="0"
                      scrolling="no"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <video
                      controls
                      autoPlay={isPlaying}
                      controlsList="nodownload"
                      poster={project.thumbnail}
                      src={project.videoUrl}
                      className="portfolio-video-player"
                    />
                  )}
                </div>
              ) : (
                /* GRAPHICS POSTER DISPLAY */
                <div className="graphics-image-box">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="portfolio-image-preview"
                    loading="lazy"
                  />
                  <div className="graphics-card-overlay">
                    <span className="graphics-category-tag">{project.subCategory || 'Graphics'}</span>
                    <h3 className="graphics-card-title">{project.title}</h3>
                  </div>
                </div>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
    </motion.div>
  </div>
</section>

{/* FULLSCREEN IMAGE & VIDEO PREVIEW MODAL */}
<AnimatePresence>
  {selectedProject && (
    <motion.div
      className="project-modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setSelectedProject(null)}
    >
      <motion.div
        className="project-modal-content"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {selectedProject.videoUrl ? (
          (() => {
            const { type, embedUrl } = getEmbedInfo(selectedProject.videoUrl);
            return type === 'youtube' || type === 'instagram' ? (
              <iframe
                src={embedUrl}
                title={selectedProject.title}
                className="modal-video-player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                controls
                autoPlay
                src={selectedProject.videoUrl}
                className="modal-video-player"
              />
            );
          })()
        ) : (
          <div className="modal-image-wrapper">
            <img
              src={selectedProject.thumbnail}
              alt={selectedProject.title}
              className="modal-image-preview"
            />
            <button 
              className="modal-close-btn"
              onClick={() => setSelectedProject(null)}
            >
              ✕
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>


      {/* SERVICES SECTION */}
      <section id="services" className="section-container services-section">
        <div className="section-header">
          <div>
            <span className="section-label">// WHAT I DO</span>
            <h2 className="section-title">EDITING & POST SERVICES</h2>
          </div>
        </div>

        <div className="services-grid">
          {SERVICES_DATA.map((service, idx) => {
            const IconComp = service.icon;
            return (
              <motion.div
                key={service.number}
                className="service-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <div className="service-card-header">
                  <span className="service-number">{service.number}</span>
                  <IconComp size={28} className="service-icon" />
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* SOFTWARE STACK */}
      <section id="skills" className="tools-section-light">
        <div className="tools-container">

          {/* LEFT FLOATING ICONS */}
          <div className="tools-floating-side left-side">
            {LEFT_TOOLS.map((tool, index) => (
              <motion.div
                key={index}
                className={`floating-card card-left-${index + 1} ${tool.isDark ? 'dark-card' : ''}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                animate={{ y: [0, -8, 0] }}
                transition={{
                  y: { duration: 3 + (index % 3), repeat: Infinity, ease: 'easeInOut' },
                  duration: 0.5
                }}
                whileHover={{ scale: 1.1, rotate: 2 }}
              >
                {tool.icon ? tool.icon : <span className="card-badge">{tool.badge}</span>}
              </motion.div>
            ))}
          </div>

          {/* CENTER TEXT */}
          <div className="tools-center-content">
            <h2 className="tools-main-title">TOOLS WE USE</h2>
            <p className="tools-main-desc">
              The same pro-grade apps studios trust — powering our edits, designs, and social campaigns from first cut to final post.
            </p>
          </div>

          {/* RIGHT FLOATING ICONS */}
          <div className="tools-floating-side right-side">
            {RIGHT_TOOLS.map((tool, index) => (
              <motion.div
                key={index}
                className={`floating-card card-right-${index + 1}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                animate={{ y: [0, 8, 0] }}
                transition={{
                  y: { duration: 3.5 + (index % 2), repeat: Infinity, ease: 'easeInOut' },
                  duration: 0.5
                }}
                whileHover={{ scale: 1.1, rotate: -2 }}
              >
                {tool.icon ? tool.icon : <span className="card-badge">{tool.badge}</span>}
              </motion.div>
            ))}
          </div>

        </div>
      </section>



      {/* EXPERIENCE SECTION */}
      <section id="experience" className="experience-section">
        <div className="experience-container">

          {/* SECTION HEADER */}
          <div className="experience-header">
            <span className="experience-tag">// CAREER TIMELINE</span>
            <h2 className="experience-title">
              STUDIO <span className="title-accent">EXPERIENCE</span>
            </h2>
          </div>

          {/* TIMELINE WRAPPER */}
          <div className="timeline-wrapper">
            {/* VERTICAL GLOWING CONNECTOR LINE */}
            <div className="timeline-vertical-line" />

            {EXPERIENCE_DATA.map((exp, idx) => (
              <motion.div
                key={idx}
                className="timeline-item"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
              >
                {/* TIMELINE MARKER / NODE */}
                <div className="timeline-marker-container">
                  <div className="timeline-marker-glow" />
                  <div className="timeline-marker-dot" />
                </div>

                {/* TIMELINE CARD CONTENT */}
                <div className="timeline-card">
                  <div className="timeline-card-header">
                    <span className="timeline-year-badge">{exp.year}</span>
                    <span className="timeline-company">{exp.company}</span>
                  </div>

                  <h3 className="timeline-position">{exp.position}</h3>
                  <p className="timeline-description">{exp.description}</p>

                  {/* AMBIENT CARD GLOW */}
                  <div className="card-ambient-light" />
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>


      <section className="reviews-section">
        {/* CENTERED HEADER */}
        <div className="reviews-header">
          <h2 className="reviews-main-title">REVIEWS</h2>
          <p className="reviews-sub-title">our client reviews.</p>
        </div>

        {/* SLIDER CONTAINER */}
        <div className="reviews-container">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              className="reviews-card-grid"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              {/* LEFT SIDE: STACKED PHOTO EFFECT */}
              <div className="reviews-image-wrapper">
                <div className="stacked-bg-card" />
                <div className="main-image-container">
                  <img
                    src={current.image}
                    alt={current.name}
                    className="client-photo"
                  />
                </div>
              </div>

              {/* RIGHT SIDE: TEXT & DETAILS */}
              <div className="reviews-content">
                <h3 className="client-name">{current.name}</h3>
                <span className="client-role">{current.position}</span>
                <p className="client-quote">{current.testimonial}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* BOTTOM CAROUSEL ARROWS */}
          <div className="reviews-nav-buttons">
            <button onClick={handlePrev} className="nav-btn" aria-label="Previous review">
              &#8249;
            </button>
            <button onClick={handleNext} className="nav-btn" aria-label="Next review">
              &#8250;
            </button>
          </div>
        </div>
      </section>


      {/* Contact Section */}
      <section id="contact" className="contact-section">
        {/* BACKGROUND AMBIENT GLOWS */}
        <div className="ambient-glow top-glow" />
        <div className="ambient-glow bottom-glow" />

        <div className="contact-container">
          {/* SECTION HEADER */}
          <motion.div
            className="contact-header-content"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="section-label">// START A PROJECT</span>
            <h2 className="contact-huge-title">
              LET'S CREATE SOMETHING <span className="title-accent">CINEMATIC.</span>
            </h2>
          </motion.div>

          {/* MAIN GRID */}
          <div className="contact-grid">
            {/* FORM CONTAINER */}
            <motion.div
              className="contact-form-wrapper"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <AnimatePresence mode="wait">
                {formSubmitted ? (
                  <motion.div
                    key="success"
                    className="form-success-msg"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.4 }}
                  >
                    <div className="success-icon-wrapper">
                      <CheckCircle2 size={48} className="success-icon" />
                    </div>
                    <h3>Booking Request Sent!</h3>
                    <p>I will review your project footage details and respond within 24 hours.</p>
                  </motion.div>
                ) : (
                  <form className="contact-form" onSubmit={handleFormSubmit}>
                    {errorMessage && (
                      <div style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '10px' }}>
                        {errorMessage}
                      </div>
                    )}

                    <div className="form-group">
                      <label>Your Name</label>
                      <input
                        type="text"
                        placeholder="e.g. Director Hamza"
                        value={formState.name}
                        onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Email Address</label>
                      <input
                        type="email"
                        placeholder="e.g. hamza@studio.com"
                        value={formState.email}
                        onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Project Scope & Requirements</label>
                      <textarea
                        rows={5}
                        placeholder="Tell me about the video type, raw footage duration, timeline, and reference style..."
                        value={formState.message}
                        onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                        required
                      />
                    </div>

                    <motion.button
                      type="submit"
                      className="submit-btn"
                      disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                    >
                      <span>{isSubmitting ? 'SENDING...' : 'SEND MESSAGE'}</span>
                      <ArrowRight size={18} className="btn-arrow" />
                    </motion.button>
                  </form>
                )}
              </AnimatePresence>
            </motion.div>

            {/* RIGHT INFO COLUMN */}
            <motion.div
              className="contact-info-col"
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <div className="contact-info-block">
                <span className="info-label">DIRECT EMAIL</span>
                <a href="mailto:cinegraphix@example.com" className="info-value email-link">
                  zaynjuttjutt10@gmail.com
                </a>
              </div>

              <div className="contact-info-block">
                <span className="info-label">MESSAGE</span>
                <a
                  href="https://wa.me/923019065108?text=Hi%20CineGraphix,%20I%20want%20to%20discuss%20a%20project!"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="info-value email-link"
                >
                  0301 9065108
                </a>
              </div>

              <div className="contact-info-block">
                <span className="info-label">STUDIO LOCATION</span>
                <span className="info-value">Lahore, Pakistan (Worldwide Remote Edit)</span>
              </div>

              <div className="contact-info-block">
                <span className="info-label">SOCIAL CONNECT</span>
                <div className="social-links-row">
                  <motion.a
                    whileHover={{ y: -4, scale: 1.08 }}
                    href="https://instagram.com"
                    target="_blank"
                    rel="noreferrer"
                    className="social-link-btn"
                  >
                    <Share2 size={20} />
                  </motion.a>
                  <motion.a
                    whileHover={{ y: -4, scale: 1.08 }}
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noreferrer"
                    className="social-link-btn"
                  >
                    <Globe size={20} />
                  </motion.a>
                  <motion.a
                    whileHover={{ y: -4, scale: 1.08 }}
                    href="mailto:cinegraphix@example.com"
                    className="social-link-btn"
                  >
                    <Mail size={20} />
                  </motion.a>
                </div>
              </div>

              {/* STATUS BADGE */}
              <div className="availability-card">
                <span className="live-dot" />
                <span>CURRENTLY ACCEPTING Q3/Q4 PROJECTS</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="cine-footer">
        <div className="cine-footer-container">
          {/* TOP INFORMATION GRID */}
          <div className="cine-footer-grid">
            {/* COLUMN 1: OFFICE & CONTACT */}
            <div className="footer-col">
              <div className="info-group">
                <span className="col-label">(Our office)</span>
                <p className="col-text">Samanabad</p>
                <p className="col-text">Lahore, Pakistan</p>
              </div>

              <div className="info-group margin-top">
                <span className="col-label">(Contact us)</span>
                <a href="tel:+923307185888" className="col-text link-text">
                  +92 330 7185888
                </a>
              </div>
            </div>

            {/* COLUMN 2: NAVIGATION LINKS */}
            <div className="footer-col">
              <span className="col-label">(Navigation)</span>
              <ul className="footer-nav-list">
                <li>
                  <a href="#home" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>
                    Home
                  </a>
                </li>
                <li>
                  <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#portfolio" onClick={(e) => { e.preventDefault(); scrollToSection('portfolio'); }}>
                    Portfolio
                  </a>
                </li>
                <li>
                  <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            {/* COLUMN 3: EMAIL & SOCIAL MEDIA */}
            <div className="footer-col right-aligned">
              <span className="col-label">— let's get in touch</span>
              <a href="mailto:cinegraphixstudio@gmail.com" className="footer-huge-email">
                cinegraphixstudio@gmail.com
              </a>

              <div className="social-group">
                <span className="col-label">(Social media)</span>
                <div className="circular-social-links">
                  <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube">
                    <YoutubeIcon size={18} />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
                    <InstagramIcon size={18} />
                  </a>
                  <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                    <LinkedinIcon size={18} />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* GIANT BRAND BANNER TEXT */}
          {/* GIANT BRAND BANNER TEXT WITH HOVER INTERACTION */}
          <div className="giant-typography-wrapper">
            <h1 className="giant-footer-title">
              {"CINE GRAPHIX".split("").map((char, index) => (
                <span key={index} className={char === " " ? "space-char" : "hover-letter"}>
                  {char}
                </span>
              ))}
            </h1>
          </div>

          {/* SUB FOOTER */}
          <div className="cine-sub-footer">
            <a href="#privacy" className="sub-link">Privacy Policy</a>
            <p className="copyright-text">Copyright © Cine Graphix 2026</p>
            <a href="#terms" className="sub-link">Terms and Conditions</a>
          </div>
        </div>
      </footer>
    </div>
  );
}