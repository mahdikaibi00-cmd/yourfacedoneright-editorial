"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import {
  ShieldCheck,
  Award,
  Sparkles,
  Phone,
  MessageCircle,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Star,
  CheckCircle2,
  Calendar,
  Clock,
  MapPin,
  ExternalLink,
  Menu,
  X,
  Heart,
  Droplet,
  Compass,
  ArrowRight,
  ArrowLeft,
  Check,
  Stethoscope,
  Plane,
  Search
} from "lucide-react";

// ============================================================================
// BRAND CONSTANTS & LINKS
// ============================================================================
const VAGARO_BOOKING_URL = "https://yourfacedoneright.com/appointments";
const GOOGLE_REVIEWS_URL = "https://www.google.com/maps/place/Arizona+Studio+of+Electrolysis+%26+Permanent+Makeup/@33.4830441,-112.0885094,12z/data=!4m10!1m2!2m1!1sMicroblading+in+Scottsdale,+AZ!3m6!1s0x872b7556c2a03c1d:0x8116d18f0cca7f50!8m2!3d33.5834107!4d-111.9730874";
const INSTAGRAM_URL = "https://www.instagram.com/yourfacedoneright/";
const FACEBOOK_URL = "https://www.facebook.com/YourFaceDoneRight";
const STUDIO_PHONE = "(480) 577-1558";
const STUDIO_PHONE_RAW = "4805771558";
const STUDIO_ADDRESS = "5010 E Shea Blvd #200, Scottsdale, AZ 85254";
const STUDIO_EMAIL = "karyn@yourfacedoneright.com";

function InstagramIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  );
}

function FacebookIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  );
}

function GoogleIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
    </svg>
  );
}

interface RandomAuraProps {
  sectionKey: string;
  size?: "compact" | "normal" | "large";
  intensity?: number;
  corner?: "top-right" | "top-left" | "random";
}

function ArtisticRandomGoldAura({
  sectionKey,
  size = "normal",
  intensity = 1.0,
  corner = "top-right",
}: RandomAuraProps) {
  // SSR-safe state so client-hydration is completely clean and mismatch-free
  const [aura, setAura] = useState<{
    outerRadius: string;
    innerRadius: string;
    outerGradient: string;
    innerGradient: string;
    width: number;
    height: number;
    top: number;
    right?: number;
    left?: number;
    rotate: number;
    blurAmount: string;
    duration: number;
  } | null>(null);

  useEffect(() => {
    // Generate organic random values on every page mount / refresh
    const rand = (min: number, max: number) => Math.round(min + Math.random() * (max - min));
    const randFloat = (min: number, max: number) => +(min + Math.random() * (max - min)).toFixed(2);

    // 8-point asymmetric organic blob border-radius
    const r1 = rand(35, 75);
    const r2 = rand(25, 65);
    const r3 = rand(40, 75);
    const r4 = rand(25, 60);
    const r5 = rand(35, 65);
    const r6 = rand(30, 70);
    const r7 = rand(30, 60);
    const r8 = rand(35, 65);
    const outerRadius = `${r1}% ${r2}% ${r3}% ${r4}% / ${r5}% ${r6}% ${r7}% ${r8}%`;

    const ir1 = rand(40, 60);
    const ir2 = rand(35, 65);
    const ir3 = rand(45, 65);
    const ir4 = rand(35, 55);
    const innerRadius = `${ir1}% ${ir2}% ${ir3}% ${ir4}% / ${ir2}% ${ir1}% ${ir4}% ${ir3}%`;

    // Size variations based on section
    const baseW = size === "compact" ? rand(220, 300) : size === "large" ? rand(480, 620) : rand(380, 520);
    const baseH = size === "compact" ? rand(200, 260) : size === "large" ? rand(440, 560) : rand(340, 480);

    // Corner alignment
    const chosenCorner = corner === "random" ? (Math.random() > 0.4 ? "top-right" : "top-left") : corner;
    const top = size === "compact" ? rand(-40, -10) : rand(-110, -40);
    const offset = size === "compact" ? rand(-40, -10) : rand(-110, -30);

    const rotate = rand(-35, 45);

    // Organic gradient focal points & luxury champagne gold opacities
    const focalX = rand(30, 70);
    const focalY = rand(20, 60);
    const oAlpha1 = randFloat(0.24, 0.32) * intensity;
    const oAlpha2 = randFloat(0.12, 0.17) * intensity;
    const oAlpha3 = randFloat(0.04, 0.08) * intensity;

    const outerGradient = `radial-gradient(ellipse at ${focalX}% ${focalY}%, rgba(229,195,88,${oAlpha1}) 0%, rgba(202,161,71,${oAlpha2}) 38%, rgba(184,134,11,${oAlpha3}) 65%, transparent 85%)`;

    const iAlpha1 = randFloat(0.18, 0.28) * intensity;
    const iAlpha2 = randFloat(0.06, 0.12) * intensity;
    const innerGradient = `radial-gradient(ellipse at center, rgba(250,225,130,${iAlpha1}) 0%, rgba(229,195,88,${iAlpha2}) 45%, transparent 75%)`;

    setAura({
      outerRadius,
      innerRadius,
      outerGradient,
      innerGradient,
      width: baseW,
      height: baseH,
      top,
      right: chosenCorner === "top-right" ? offset : undefined,
      left: chosenCorner === "top-left" ? offset : undefined,
      rotate,
      blurAmount: size === "compact" ? "blur-xl" : "blur-2xl sm:blur-3xl",
      duration: rand(12, 18),
    });
  }, [sectionKey, size, intensity, corner]);

  return (
    <>
      {/* Top Hairline Metallic Gold Shimmer */}
      <div className="absolute top-0 inset-x-0 h-[1.5px] bg-gradient-to-r from-transparent via-[#E5C358]/70 to-transparent pointer-events-none z-20" />

      {/* Render SSR fallback if aura not yet generated on client */}
      {!aura ? (
        <>
          <div className="absolute -top-24 -right-24 w-96 sm:w-[500px] h-96 sm:h-[500px] rounded-full bg-[radial-gradient(circle_at_top_right,rgba(229,195,88,0.28)_0%,rgba(184,134,11,0.16)_38%,rgba(11,16,23,0)_70%)] pointer-events-none blur-2xl z-0" />
          <div className="absolute top-0 right-0 w-80 sm:w-[380px] h-80 sm:h-[380px] bg-[radial-gradient(ellipse_at_top_right,rgba(245,215,110,0.22)_0%,rgba(212,175,55,0.08)_42%,transparent_70%)] pointer-events-none z-0" />
        </>
      ) : (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          {/* Main Organic Fluid Ambient Aura with Slow Living Breathing Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{
              opacity: 1,
              scale: [1, 1.04, 0.97, 1],
              rotate: [aura.rotate, aura.rotate + 3, aura.rotate - 3, aura.rotate],
            }}
            transition={{
              opacity: { duration: 0.8 },
              scale: { duration: aura.duration, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: aura.duration * 1.2, repeat: Infinity, ease: "easeInOut" },
            }}
            style={{
              position: "absolute",
              top: `${aura.top}px`,
              right: aura.right !== undefined ? `${aura.right}px` : undefined,
              left: aura.left !== undefined ? `${aura.left}px` : undefined,
              width: `${aura.width}px`,
              height: `${aura.height}px`,
              borderRadius: aura.outerRadius,
              background: aura.outerGradient,
              transformOrigin: "center center",
            }}
            className={aura.blurAmount}
          />

          {/* Secondary Specular Core Glow for High-End Depth */}
          <motion.div
            animate={{
              scale: [1, 1.08, 0.95, 1],
            }}
            transition={{
              duration: aura.duration * 0.85,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              position: "absolute",
              top: `${Math.round(aura.top * 0.6)}px`,
              right: aura.right !== undefined ? `${Math.round(aura.right * 0.6)}px` : undefined,
              left: aura.left !== undefined ? `${Math.round(aura.left * 0.6)}px` : undefined,
              width: `${Math.round(aura.width * 0.65)}px`,
              height: `${Math.round(aura.height * 0.65)}px`,
              borderRadius: aura.innerRadius,
              background: aura.innerGradient,
              transformOrigin: "center center",
            }}
            className="blur-xl pointer-events-none"
          />
        </div>
      )}
    </>
  );
}

export default function AZStudioEditorialPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [activeTestimonial, setActiveTestimonial] = useState(1);
  const [isScrolled, setIsScrolled] = useState(false);

  // Horizontal scroll carousel refs and state
  const galleryRef = useRef<HTMLDivElement>(null);
  const reviewsRef = useRef<HTMLDivElement>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(0);

  const scrollGallery = (direction: "left" | "right") => {
    if (galleryRef.current) {
      const scrollAmount = Math.min(galleryRef.current.clientWidth * 0.85, 440);
      galleryRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth"
      });
    }
  };

  const scrollReviews = (direction: "left" | "right") => {
    if (reviewsRef.current) {
      const container = reviewsRef.current;
      const cards = Array.from(container.children) as HTMLElement[];
      const nextIndex = direction === "left"
        ? Math.max(0, reviewIndex - 1)
        : Math.min(testimonials.length - 1, reviewIndex + 1);
      if (cards[nextIndex]) {
        const card = cards[nextIndex];
        const scrollTarget = card.offsetLeft - (container.clientWidth - card.clientWidth) / 2;
        container.scrollTo({
          left: scrollTarget,
          behavior: "smooth"
        });
        setReviewIndex(nextIndex);
      }
    }
  };

  useEffect(() => {
    if (reviewsRef.current) {
      const container = reviewsRef.current;
      const cards = Array.from(container.children) as HTMLElement[];
      if (window.innerWidth >= 768 && cards[1]) {
        const card = cards[1];
        const scrollTarget = card.offsetLeft - (container.clientWidth - card.clientWidth) / 2;
        container.scrollTo({
          left: scrollTarget,
          behavior: "instant" as ScrollBehavior
        });
        setReviewIndex(1);
      }
    }
  }, []);

  // Apple-style reading progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Track scroll position for dynamic Apple header morphing
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 25) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const faqs = [
    {
      q: "What makes Electrolysis superior to Laser Hair Removal?",
      a: "Electrolysis is the only method recognized by the FDA and the American Medical Association for 100% permanent hair removal. While lasers merely reduce dark hairs and cannot treat blonde, grey, red, or fine peach fuzz, electrolysis targets each individual follicle with precision—permanently destroying the germinative cells regardless of skin tone or hair pigment."
    },
    {
      q: "Does permanent makeup or microblading hurt?",
      a: "Discomfort is virtually minimal. With over 20 years of specialized clinical experience, Karyn utilizes advanced topical compounded anesthetics before and during your procedure. Most clients describe the sensation as a light scratching or gentle vibration, and many drift off to sleep during eyeliner or lip blush treatments."
    },
    {
      q: "Can Karyn correct faded grey, blue, or orange brows from another salon?",
      a: "Yes. Over 40% of Karyn's clientele seek her expertise specifically for corrective work. With two decades in the craft, she analyzes the existing pigment depth, scar tissue, and color temperature. She neutralizes cool ash or unnatural tones using warm corrective formulas before rebuilding crisp, realistic nano hairstrokes over top."
    },
    {
      q: "How long do healed Microblading, Nano Brows, and Lip Blush last?",
      a: "Our bespoke cosmetic tattoos typically maintain optimal definition and vibrancy for 2 to 3 years. Because Karyn formulates with warm, high-retention pigments and avoids deep dermal slicing, your permanent makeup will softly fade over time without discolouring into unnatural tones. We recommend an annual refinement to maintain vibrant color."
    },
    {
      q: "What is the 30-day healed recovery process like?",
      a: "During Days 1–3, the color appears crisp and slightly deeper. Days 4–8 involve subtle micro-flaking as new skin regenerates (we provide our specialized botanical aftercare balm). Days 9–14 feature the natural 'ghosting' phase where new skin temporarily softens the surface appearance. By Days 28–35, the true velvet tone fully settles into the dermis."
    },
    {
      q: "Do you offer free consultations?",
      a: "Absolutely. Karyn provides complimentary in-depth consultations in Scottsdale. We evaluate your facial anatomy, skin tone, hair growth patterns, or existing cosmetic tattoos, and design a tailored plan with zero pressure."
    }
  ];

  const transformations = [
    {
      id: 1,
      title: "Bespoke Microblading & Nano",
      subtitle: "Hyperrealistic Hair Flow Architecture",
      tag: "Master Artistry",
      image: "/gallery_1.jpg",
      description: "Individual hairstrokes mapped to natural facial bone structure with warm undertones and zero tissue scarring."
    },
    {
      id: 2,
      title: "Velvet Lip Blush & Contour",
      subtitle: "Asymmetry Correction & Youthful Flush",
      tag: "Healed 6 Weeks",
      image: "/lip_blush.jpg",
      description: "Restoring lost vermilion border definition and infusing lips with a natural, healthy rosy blush."
    },
    {
      id: 3,
      title: "Micro-Precision Powder Brows",
      subtitle: "Soft-Focus Ombré Gradient",
      tag: "Flawless Retention",
      image: "/gallery_2.jpg",
      description: "Sheer powdery front transition dissolving into crisp, defined arches tailored for active Arizona lifestyles."
    },
    {
      id: 4,
      title: "Permanent Eyeliner Enhancement",
      subtitle: "Lash Line Definition & Soft Wing",
      tag: "Smudge-Proof Luxury",
      image: "/gallery_3.jpg",
      description: "Subtle pigment contouring between natural lashes, creating an immediate eye-opening lift without daily makeup."
    },
    {
      id: 5,
      title: "Old PMU Neutralization & Repair",
      subtitle: "Grey & Orange Tone Correction",
      tag: "Scottsdale Specialist",
      image: "/gallery_4.jpg",
      description: "Neutralizing faded, discolored tattoos from prior providers and restoring natural symmetry."
    },
    {
      id: 6,
      title: "Medical Electrolysis Studio",
      subtitle: "100% FDA Permanent Hair Removal",
      tag: "Clinical Excellence",
      image: "/studio_room.jpg",
      description: "Scottsdale's premier private treatment sanctuary equipped with clinical-grade electrolysis technology."
    }
  ];

  const testimonials = [
    {
      id: 0,
      name: "Linda Henderson",
      procedure: "Microblading & Color Correction",
      rating: 5,
      date: "Google 5-Star Review",
      quote: "Karyn is a lifesaver! I had botched, uneven microblading from another salon that turned an awful grey color. Karyn patiently neutralized the color and completely reshaped my brows to look like natural hair. Her 20 years of experience show in every single stroke. Highly recommend!"
    },
    {
      id: 1,
      name: "Susan McCallister",
      procedure: "Permanent Electrolysis Hair Removal",
      rating: 5,
      date: "Google 5-Star Review",
      quote: "I tried laser hair removal for years with no luck on my light chin hairs. Karyn explained why electrolysis is the only true permanent solution. After a few sessions, the hair is completely gone! Her Scottsdale studio is spotlessly clean, peaceful, and she makes you feel so comfortable."
    },
    {
      id: 2,
      name: "Deborah Weiss",
      procedure: "Velvet Lip Blush & Eyeliner",
      rating: 5,
      date: "Google 5-Star Review",
      quote: "Karyn did my lip blushing and upper eyeliner. Her numbing technique is incredible—I felt practically nothing! I wake up every morning ready to go with zero makeup. She is truly the best permanent makeup artist in Arizona."
    },
    {
      id: 3,
      name: "Christine Gallagher",
      procedure: "Microblading & Brow Shading",
      rating: 5,
      date: "Google 5-Star Review",
      quote: "I drive all the way from Paradise Valley to see Karyn. She takes the time to measure your facial symmetry and creates the most flattering shape. It looks so natural that my closest friends didn't even realize I had permanent makeup done—they just thought I looked refreshed!"
    },
    {
      id: 4,
      name: "Marilyn Cooper",
      procedure: "Electrolysis & Lip Contour",
      rating: 5,
      date: "Google 5-Star Review",
      quote: "Karyn has over 20 years in this industry and it shows. Her professionalism, hygiene standards, and gentle touch make all the difference. If you want your face done right, this is the only place to go."
    },
    {
      id: 5,
      name: "Rebecca Vance",
      procedure: "Nano Brows & Consultation",
      rating: 5,
      date: "Google 5-Star Review",
      quote: "The free consultation gave me so much peace of mind. Karyn answered every question thoroughly and never pressured me. The healed results are perfection. Thank you Karyn!"
    }
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1E1917] font-sans antialiased selection:bg-[#EADBCE] selection:text-[#1E1917] overflow-x-hidden">
      
      {/* =====================================================================
          APPLE-STYLE TOP SCROLL PROGRESS BAR
      ===================================================================== */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-[#D4AF37] via-[#F5EBE6] to-[#C28871] origin-left z-50 pointer-events-none"
        style={{ scaleX }}
      />

      {/* =====================================================================
          APPLE-STYLE DYNAMIC FLOATING GLASS HEADER
      ===================================================================== */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isScrolled
            ? "py-3 bg-[#120E0D]/85 backdrop-blur-2xl border-b border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
            : "py-5 sm:py-6 bg-gradient-to-b from-[#120E0D]/90 via-[#120E0D]/40 to-transparent backdrop-blur-sm border-b border-white/5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between">
          
          {/* Authentic Gold Logo */}
          <a href="#" className="flex items-center group">
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className={`relative transition-all duration-500 ${
                isScrolled ? "h-9 w-32 sm:h-10 sm:w-36" : "h-11 w-36 sm:h-13 sm:w-44"
              }`}
            >
              <Image
                src="/logo.png"
                alt="AZ Studio of Electrolysis & Permanent Makeup Logo"
                fill
                priority
                className="object-contain object-left"
              />
            </motion.div>
          </a>

          {/* Top Navigation Links - Strictly single line with whitespace-nowrap */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-[11px] uppercase tracking-[0.22em] text-white/80 font-medium whitespace-nowrap shrink-0">
            {[
              { label: "About Karyn", href: "#about" },
              { label: "Services & Results", href: "#transformations" },
              { label: "The Process", href: "#process" },
              { label: "Electrolysis & PMU", href: "#mastery" },
              { label: "Accreditations", href: "#accreditations" },
              { label: "FAQ", href: "#faq" }
            ].map((link, i) => (
              <a
                key={i}
                href={link.href}
                className="whitespace-nowrap px-3 py-1.5 rounded-full hover:text-[#D4AF37] hover:bg-white/10 active:scale-95 transition-all duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Header Action Button with Apple Shimmer Effect */}
          <div className="hidden sm:flex items-center gap-3 xl:gap-4 shrink-0">

            <a
              href={`tel:${STUDIO_PHONE_RAW}`}
              className="text-xs text-white/80 hover:text-[#D4AF37] flex items-center gap-2 transition-colors font-light tracking-wider px-3 py-1.5 rounded-full hover:bg-white/5 whitespace-nowrap"
            >
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>{STUDIO_PHONE}</span>
            </a>
            
            <motion.a
              href={VAGARO_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              className="relative overflow-hidden px-5 py-2.5 rounded-full text-xs uppercase tracking-wider font-semibold bg-gradient-to-r from-[#D4AF37] to-[#E5C358] text-[#120E0D] shadow-[0_4px_20px_rgba(212,175,55,0.3)] transition-all duration-300 group whitespace-nowrap"
            >
              {/* Apple-Style Shimmer Sweep */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full duration-700 transition-transform bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              <span className="relative z-10">Book Now</span>
            </motion.a>
          </div>

          {/* Mobile Menu Trigger */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2.5 rounded-full border border-white/20 text-white hover:border-[#D4AF37] bg-white/5 backdrop-blur-md transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#D4AF37]" /> : <Menu className="w-5 h-5" />}
          </motion.button>
        </div>
      </motion.header>

      {/* =====================================================================
          APPLE-STYLE FULL-SCREEN MOBILE OVERLAY MENU
      ===================================================================== */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-30 lg:hidden bg-[#120E0D]/95 backdrop-blur-3xl pt-24 px-6 pb-8 flex flex-col justify-between"
          >
            <div className="flex flex-col gap-2 pt-2">
              {[
                { label: "The Artist", href: "#about" },
                { label: "Results & Transformations", href: "#transformations" },
                { label: "The Meticulous Process", href: "#process" },
                { label: "Facial Mastery Studies", href: "#mastery" },
                { label: "Clinical Standards & Accreditations", href: "#accreditations" },
                { label: "Frequently Asked Questions", href: "#faq" }
              ].map((link, i) => (
                <motion.a
                  key={i}
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.3 }}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="py-3 text-sm font-serif text-white/90 hover:text-[#D4AF37] border-b border-white/10 flex items-center justify-between"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-[#D4AF37]" />
                </motion.a>
              ))}
            </div>

            <div className="pt-6 border-t border-white/15 flex flex-col gap-3">
              {/* Social Channels Row */}
              <div className="grid grid-cols-2 gap-2 mb-1">
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-white/5 border border-white/10 text-white/90 hover:text-[#D4AF37] hover:border-[#D4AF37] text-xs font-medium transition-all"
                >
                  <InstagramIcon className="w-4 h-4 text-[#D4AF37]" />
                  <span>Instagram</span>
                </a>
                <a
                  href={FACEBOOK_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-3 rounded-xl bg-white/5 border border-white/10 text-white/90 hover:text-[#D4AF37] hover:border-[#D4AF37] text-xs font-medium transition-all"
                >
                  <FacebookIcon className="w-4 h-4 text-[#D4AF37]" />
                  <span>Facebook</span>
                </a>
              </div>

              <a href={`tel:${STUDIO_PHONE_RAW}`} className="flex items-center justify-center gap-2 text-xs text-[#D4AF37] font-semibold py-1">
                <Phone className="w-4 h-4" /> Call Studio: {STUDIO_PHONE}
              </a>
              <motion.a
                whileTap={{ scale: 0.96 }}
                href={VAGARO_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-4 rounded-full text-xs uppercase tracking-widest font-bold bg-[#D4AF37] text-[#120E0D] shadow-xl"
              >
                Book Online Appointment
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================================
          1. HERO SECTION (100% FULLSCREEN CINEMATIC VIDEO BACKGROUND)
          Replicating FueGenix 1:1: Fullscreen edge-to-edge video, clean dark vignette,
          Effortless Beauty / Everyday typography, Request Consultation CTA with
          Karyn Smith avatar byline, and the bottom 3-item authority ribbon.
      ===================================================================== */}
      <section className="relative h-screen min-h-[680px] flex flex-col justify-between overflow-hidden bg-[#0C0908] text-white pt-24 sm:pt-28">
        
        {/* Ambient Video Background with Clean Dark Vignette (No Muddy Brown Wash) */}
        <div className="absolute inset-0 z-0">
          <img src="/hero_bg.jpg" alt="AZ Studio Procedure" className="w-full h-full object-cover opacity-85 scale-105 transition-transform duration-1000" />
          {/* Crisp, cinematic neutral vignette gradient matching FueGenix */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/20 to-[#0C0908]" />
          {/* Subtle champagne-gold ambient light in top right */}
          <div className="absolute top-0 right-0 w-96 sm:w-[500px] h-96 sm:h-[500px] bg-[radial-gradient(ellipse_at_top_right,rgba(229,195,88,0.18)_0%,rgba(184,134,11,0.06)_40%,transparent_70%)] pointer-events-none" />
        </div>

        {/* Center Hero Copy (FueGenix 1:1 Cadence) */}
        <div className="relative z-10 max-w-5xl mx-auto px-5 sm:px-8 py-6 text-center my-auto flex flex-col items-center">
          
          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 sm:mb-10 text-center"
          >
            <span className="block font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl italic font-normal text-white tracking-tight leading-[1.15]">
              Effortless Beauty,
            </span>
            <span className="block font-sans text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-light text-white tracking-[0.1em] uppercase mt-2 sm:mt-3 leading-[1.15]">
              Everyday
            </span>
          </motion.h1>

          {/* Pill CTA Button (FueGenix Exact Match: REQUEST CONSULTATION) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center justify-center gap-5"
          >
            <motion.a
              href={VAGARO_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, boxShadow: "0 20px 40px rgba(255,255,255,0.22)" }}
              whileTap={{ scale: 0.96 }}
              className="px-10 py-4 rounded-full text-xs sm:text-[13px] uppercase tracking-[0.25em] font-bold bg-white text-[#120E0D] hover:bg-[#F2E7DC] transition-all duration-300 shadow-2xl"
            >
              Request Consultation
            </motion.a>

            {/* Practitioner Avatar + Byline (Matches Image 1 [avatar] By Dr. Munib Ahmad) */}
            <div className="flex items-center gap-2.5 text-white/90">
              <div className="relative w-7 h-7 sm:w-8 sm:h-8 rounded-full overflow-hidden border border-[#D4AF37] shadow-sm">
                <Image
                  src="/hero_portrait.jpg"
                  alt="Karyn Smith"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-serif italic text-sm sm:text-base text-white/90 font-light">
                By Karyn Smith, 20+ Years Master Specialist
              </span>
            </div>
          </motion.div>

        </div>

        {/* Bottom Hero Authority Ribbon (FueGenix 1:1 Match: 3 items with fine dividers) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative z-10 w-full border-t border-white/15 bg-black/40 backdrop-blur-md py-4 sm:py-5 px-4 sm:px-6 overflow-hidden"
        >
          {/* Dynamic Randomized Artistic Champagne Gold Aura */}
          <ArtisticRandomGoldAura sectionKey="hero-ribbon" size="compact" intensity={0.7} />
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 md:gap-0">
            
            <div className="flex-1 flex items-center justify-center gap-2.5 text-xs sm:text-[13px] uppercase tracking-[0.2em] font-medium text-white/90 whitespace-nowrap">
              <Stethoscope className="w-4 sm:w-5 h-4 sm:h-5 text-[#D4AF37] shrink-0" />
              <span>100% Nurse-Administered (BSN, RN)</span>
            </div>

            <div className="hidden md:block w-[1px] h-5 bg-white/20 mx-4" />

            <div className="flex-1 flex items-center justify-center gap-2.5 text-xs sm:text-[13px] uppercase tracking-[0.2em] font-medium text-white/90 whitespace-nowrap">
              <ShieldCheck className="w-4 sm:w-5 h-4 sm:h-5 text-[#D4AF37] shrink-0" />
              <span>Over 20 Years Specialized Mastery</span>
            </div>

            <div className="hidden md:block w-[1px] h-5 bg-white/20 mx-4" />

            <div className="flex-1 flex items-center justify-center gap-2.5 text-xs sm:text-[13px] uppercase tracking-[0.2em] font-medium text-white/90 whitespace-nowrap">
              <Sparkles className="w-4 sm:w-5 h-4 sm:h-5 text-[#D4AF37] shrink-0" />
              <span>Undetectable, Bio-Harmonized Results</span>
            </div>

          </div>
        </motion.div>

      </section>


      {/* =====================================================================
          2. MEET THE MASTER (KARYN SMITH & SCOTTSDALE ATELIER MASTERY)
          Clinical mastery: Over 20+ years of cosmetic tattooing & electrolysis excellence,
          BSN RN credentials, 3 clinical pillars, 4 executive metric cards,
          and dual distinct imagery (portrait + macro procedural nano inset).
      ===================================================================== */}
      <section id="about" className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-14 sm:py-20 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
          
          {/* Left Column: High-Authority Narrative & Clinical Pillars */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col justify-center order-2 lg:order-1"
          >
            
            {/* Top Eyebrow Badge & Italic Serif Eyebrow */}
            <div className="mb-4">
              <span className="font-serif italic text-xl sm:text-2xl text-[#8C5846] block mb-1 font-normal">
                Founder & Master PMU / Electrolysis Practitioner
              </span>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EADBCE]/50 border border-[#D4AF37]/40 text-[#8C5846] text-[10px] uppercase tracking-[0.2em] font-semibold">
                <Stethoscope className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>State Board RN #14-118676</span>
              </div>
            </div>

            {/* Authority Title with Modern Sans + Italic Subtitle */}
            <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-light text-[#1E1917] tracking-tight leading-[1.15] mb-2">
              Meet Karyn Smith
            </h2>
            <p className="font-serif italic text-xl sm:text-2xl lg:text-3xl text-[#8C5846] font-normal mb-5 leading-snug">
              Facial Architecture Under Direct Medical Oversight
            </p>

            {/* Official Medical Director & Board Licensure Strip */}
            <div className="flex flex-wrap items-center gap-3 p-3.5 rounded-2xl bg-white border border-[#EADBCE] shadow-sm mb-6 text-xs text-[#524641]">
              <span className="flex items-center gap-1.5 font-semibold text-[#1E1917]">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37] shrink-0" />
                Master Specialist: Karyn Smith
              </span>
              <span className="text-black/20 hidden sm:inline">•</span>
              <span className="flex items-center gap-1.5 font-medium text-[#73635C]">
                <CheckCircle2 className="w-4 h-4 text-[#D4AF37] shrink-0" />
                Kansas State Board Licensure #14-118676
              </span>
            </div>

            {/* Lead Narrative */}
            <p className="text-sm sm:text-base text-[#4A3E39] font-light leading-relaxed mb-6">
              Permanent cosmetic tattooing is not a standard beauty service—it is micro-surgical facial architecture. 
              While conventional salons rely on 2-day microblading certifications and manual blades that slice the skin, 
              Karyn Smith combines <strong>6+ years of acute nursing expertise</strong> with hospital-grade sterility under the 
              dedicated expertise of <strong>Karyn Smith</strong>.
            </p>

            {/* 3 Clinical Pillars */}
            <div className="space-y-3 mb-8">
              <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/70 border border-[#EADBCE]/60">
                <div className="w-8 h-8 rounded-xl bg-[#FAF5EE] border border-[#D4AF37]/40 flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-[#1E1917]">Hyperrealistic Microblading & Nano Brows</h4>
                  <p className="text-xs text-[#73635C] font-light leading-relaxed mt-0.5">
                    Motorized digital micro-dot deposition eliminates blading, scar tissue, and pigment blowout across all skin phototypes.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/70 border border-[#EADBCE]/60">
                <div className="w-8 h-8 rounded-xl bg-[#FAF5EE] border border-[#D4AF37]/40 flex items-center justify-center shrink-0 mt-0.5">
                  <Droplet className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-[#1E1917]">100% FDA Permanent Electrolysis</h4>
                  <p className="text-xs text-[#73635C] font-light leading-relaxed mt-0.5">
                    Continuous medical numbing protocol ensures complete tranquility, with clients frequently sleeping throughout treatment.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-2xl bg-white/70 border border-[#EADBCE]/60">
                <div className="w-8 h-8 rounded-xl bg-[#FAF5EE] border border-[#D4AF37]/40 flex items-center justify-center shrink-0 mt-0.5">
                  <Award className="w-4 h-4 text-[#D4AF37]" />
                </div>
                <div>
                  <h4 className="text-xs uppercase tracking-wider font-semibold text-[#1E1917]">Expert PMU Color Correction & Removal</h4>
                  <p className="text-xs text-[#73635C] font-light leading-relaxed mt-0.5">
                    Scientifically formulated warm undertones guarantee results fade naturally without shifting into unnatural blue or ashy grey.
                  </p>
                </div>
              </div>
            </div>

            {/* 4 Executive Metric Authority Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-6 border-t border-[#EADBCE]">
              {[
                { number: "1,400+", label: "Procedures Completed", sub: "100% Retentive Track Record", icon: Award },
                { number: "20+", label: "Years Experience", sub: "Clinical Skin & PMU", icon: Award },
                { number: "BSN, RN", label: "Licensed Since 2018", sub: "Bachelor of Science in Nursing", icon: ShieldCheck },
                { number: "5.0 ★", label: "Vagaro & Google", sub: "47+ Verified Client Reviews", icon: Star }
              ].map((m, idx) => {
                const IconComponent = m.icon;
                return (
                  <motion.div
                    key={idx}
                    whileHover={{ y: -4 }}
                    className="p-4 rounded-2xl bg-white border border-[#EADBCE] shadow-sm flex flex-col justify-between transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-serif text-xl sm:text-2xl font-semibold text-[#1E1917]">{m.number}</span>
                      <IconComponent className="w-4 h-4 text-[#D4AF37]" />
                    </div>
                    <div>
                      <p className="text-[11px] font-semibold text-[#1E1917] tracking-tight">{m.label}</p>
                      <p className="text-[9px] text-[#73635C] font-light mt-0.5">{m.sub}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

          </motion.div>

          {/* Right Column: Layered Multi-Image Composition (Portrait + Procedural Inset) */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 relative flex justify-center order-1 lg:order-2 pb-8 sm:pb-0"
          >
            <div className="relative w-full max-w-sm sm:max-w-md">
              
              {/* Luxury Ambient Glow Behind Photo */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#D4AF37]/20 via-transparent to-transparent rounded-[40px] blur-2xl -z-10" />

              {/* Primary Large Image: Studio Portrait of Karyn Smith */}
              <div className="relative w-full aspect-[4/5] rounded-[32px] overflow-hidden shadow-2xl border-4 border-white bg-[#EAE2DC] group">
                <Image
                  src="/hero_portrait.jpg"
                  alt="Karyn Smith"
                  fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                
                {/* Subtle bottom vignette with executive nameplate */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Top Badge: Licensed Registered Nurse */}
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#D4AF37]/40 shadow-md flex items-center gap-2">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
                  <span className="text-[10px] uppercase tracking-wider font-bold text-[#1E1917]">Registered Nurse • BSN, RN</span>
                </div>

                {/* Bottom Nameplate */}
                <div className="absolute bottom-5 left-5 text-white">
                  <p className="font-serif text-lg sm:text-xl font-normal leading-tight">Karyn Smith</p>
                  <p className="text-white/80 text-[10px] sm:text-[11px] tracking-widest uppercase mt-0.5">Founder & Master Practitioner</p>
                </div>
              </div>

              {/* Overlapping Inset: Macro Procedural Nano Work (Dual Distinct Imagery!) */}
              <motion.div
                whileHover={{ scale: 1.06 }}
                className="absolute -bottom-6 -right-2 sm:-right-6 w-36 sm:w-44 aspect-square rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-[#120E0D] animate-float z-20 group/inset"
              >
                <Image
                  src="/gallery_1.jpg"
                  alt="Clinical Nano Hairstrokes Procedural Mapping"
                  fill
                  className="object-cover group-hover/inset:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-2.5 left-2.5 right-2.5">
                  <span className="block text-[8px] sm:text-[9px] uppercase tracking-wider font-bold text-[#D4AF37] leading-tight">
                    Clinical Procedural Detail
                  </span>
                  <span className="block text-[7px] sm:text-[8px] text-white/90 font-light truncate">
                    Single-Needle Nano Deposition
                  </span>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </div>
      </section>


      {/* =====================================================================
          3. DARK "TRANSFORMATIONS" GALLERY BANNER
          Replicating FueGenix Image 2: Floating rounded container, obsidian gradient,
          top-right gold corner glow, italic serif eyebrow + modern sans heading,
          expansive edge-to-edge photo cards, side navigation arrows, pagination lines.
      ===================================================================== */}
      <section id="transformations" className="w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] xl:w-[calc(100%-3rem)] max-w-[1440px] mx-auto rounded-[24px] sm:rounded-[32px] overflow-hidden bg-gradient-to-br from-[#131B26] via-[#0B1017] to-[#05080C] text-white border border-white/15 shadow-[0_12px_45px_rgba(0,0,0,0.5)] my-2.5 sm:my-3.5 p-6 sm:p-10 lg:p-12 relative">
        
        {/* Dynamic Randomized Artistic Champagne Gold Aura */}
        <ArtisticRandomGoldAura sectionKey="transformations" size="large" />

        <div className="max-w-6xl mx-auto relative z-10">
          
          {/* Header Typography Pairing: Italic Serif Eyebrow + Clean Modern Sans Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-2xl mx-auto mb-8 sm:mb-12"
          >
            <span className="font-serif italic text-xl sm:text-2xl text-[#D4AF37] block mb-2 font-normal">
              Life Changing
            </span>
            <h2 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white mb-4">
              Transformations
            </h2>
            <div className="w-12 h-[2.5px] bg-gradient-to-r from-[#D4AF37] to-[#B8860B] rounded-full mx-auto mb-4" />
            <p className="font-sans text-xs sm:text-base text-white/70 font-light max-w-2xl mx-auto leading-relaxed">
              Every procedure is approached with meticulous precision. Our healed retention reflects an uncompromising commitment to technique and artistry.
            </p>
          </motion.div>

          {/* Horizontally Scrollable Result Cards Carousel with Floating Arrows */}
          <div className="relative group/carousel">
            
            {/* Interactive Carousel Navigation Arrow Buttons */}
            <div className="flex items-center justify-between absolute top-1/2 -translate-y-1/2 -left-3 -right-3 sm:-left-5 sm:-right-5 pointer-events-none z-30">
              <button
                onClick={() => scrollGallery("left")}
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/80 border border-white/20 backdrop-blur-md text-white flex items-center justify-center pointer-events-auto hover:bg-[#D4AF37] hover:text-[#0E1318] hover:border-[#D4AF37] active:scale-95 transition-all shadow-2xl cursor-pointer"
                aria-label="Previous Transformation"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => scrollGallery("right")}
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/80 border border-white/20 backdrop-blur-md text-white flex items-center justify-center pointer-events-auto hover:bg-[#D4AF37] hover:text-[#0E1318] hover:border-[#D4AF37] active:scale-95 transition-all shadow-2xl cursor-pointer"
                aria-label="Next Transformation"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Container with Snap Physics */}
            <div
              ref={galleryRef}
              onScroll={(e) => {
                const el = e.currentTarget;
                const progress = el.scrollLeft / Math.max(1, el.scrollWidth - el.clientWidth);
                const index = Math.min(transformations.length - 1, Math.round(progress * (transformations.length - 1)));
                setGalleryIndex(index);
              }}
              className="flex gap-5 sm:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar pb-4 pt-1 px-1 -mx-2 sm:mx-0"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {transformations.map((item) => (
                <div
                  key={item.id}
                  className="w-[85vw] sm:w-[360px] lg:w-[400px] shrink-0 snap-start rounded-3xl overflow-hidden bg-white/5 border border-white/10 hover:border-[#D4AF37]/50 transition-all duration-300 shadow-2xl relative group flex flex-col"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-black/50">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />
                    
                    {/* Frosted Status Pill */}
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold bg-black/60 backdrop-blur-md text-[#D4AF37] border border-[#D4AF37]/30">
                      {item.tag}
                    </span>

                    {/* Bottom Minimal Label */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <div>
                        <h3 className="font-sans text-base sm:text-lg font-medium text-white">{item.title}</h3>
                        <p className="text-[11px] text-white/70 font-light">{item.subtitle}</p>
                      </div>
                      <span className="text-[11px] text-[#D4AF37] font-medium group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                  <div className="p-4 sm:p-5 bg-[#0C121A]/80 border-t border-white/5 flex items-center justify-between">
                    <p className="text-xs text-white/60 font-light leading-relaxed line-clamp-2 pr-2">
                      {item.description}
                    </p>
                    <span className="text-[#D4AF37] text-sm shrink-0 group-hover:translate-x-1 transition-transform">→</span>
                  </div>
                </div>
              ))}
            </div>

          </div>

          {/* Sleek Interactive Pagination Indicators (FueGenix Signature Lines Bar from Image 2) */}
          <div className="flex items-center justify-center gap-2 mt-8 mb-8">
            {transformations.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  if (galleryRef.current) {
                    const cardWidth = (galleryRef.current.scrollWidth - galleryRef.current.clientWidth) / (transformations.length - 1);
                    galleryRef.current.scrollTo({
                      left: cardWidth * i,
                      behavior: "smooth"
                    });
                  }
                }}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  galleryIndex === i ? "w-10 sm:w-12 bg-[#D4AF37]" : "w-6 sm:w-8 bg-white/20 hover:bg-white/40"
                }`}
                aria-label={`Go to transformation ${i + 1}`}
              />
            ))}
          </div>

          {/* White Pill Button (FueGenix Exact Match: VIEW ENTIRE GALLERY) */}
          <div className="text-center">
            <motion.a
              href={VAGARO_BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-9 py-4 rounded-full text-xs uppercase tracking-[0.22em] font-bold bg-white text-[#0E1319] hover:bg-[#F2E7DC] transition-all duration-300 shadow-2xl"
            >
              <span>View Full Gallery</span>
            </motion.a>
          </div>

        </div>
      </section>


      {/* =====================================================================
          4. THE 3-STEP PROCESS CARDS ("METICULOUS PROCESS")
          Replicating FueGenix Image 3: Floating rounded white container, top-left
          gold corner glow, italic serif eyebrow + modern sans heading, 3 cards with
          frosted glass number badges (1, 2, 3), clean typography, gold links.
      ===================================================================== */}
      <section id="process" className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-14 sm:py-20 relative">
        <div className="max-w-6xl mx-auto relative z-10">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-2xl mx-auto mb-10 sm:mb-14"
          >
            <span className="font-serif italic text-xl sm:text-2xl text-[#8C5846] block mb-2 font-normal">
              The Enhanced 3-Step
            </span>
            <h2 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-[#1E1917] mb-4">
              Meticulous Process
            </h2>
            <p className="font-sans text-xs sm:text-base text-[#73635C] font-light leading-relaxed">
              Our medical-grade protocol eliminates guesswork, ensuring your aesthetic goals are realized with flawless safety and artistic balance.
            </p>
          </motion.div>

          {/* 3 Vertical White Cards with Frosted Number Badges (Image 3 Match) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Card 1: Clinical Consultation */}
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl bg-[#FAF8F5] border border-[#EADBCE] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#EADBCE]">
                  <Image
                    src="/hero_portrait.jpg"
                    alt="Karyn Smith Clinical Consultation"
                    fill
                    className="object-cover object-center"
                  />
                  {/* Frosted Glass Number Badge (FueGenix Image 3 Match) */}
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/40 flex items-center justify-center text-white font-serif text-sm font-semibold shadow-md">
                    1
                  </div>
                </div>
                <div className="p-6 sm:p-8">
                  <h3 className="font-sans text-xl sm:text-2xl font-normal text-[#1E1917] mb-2 sm:mb-3">
                    Doctor Consultation
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#73635C] font-light leading-relaxed">
                    Comprehensive bone structure evaluation, muscle symmetry analysis, and bespoke pigment formulation calibrated to your skin undertone.
                  </p>
                </div>
              </div>
              <div className="p-6 sm:p-8 pt-0">
                <a
                  href={VAGARO_BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#8C5846] hover:text-[#D4AF37] transition-colors"
                >
                  <span>Learn About Consultations</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>

            {/* Card 2: Single-Needle Nano Deposition */}
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl bg-[#FAF8F5] border border-[#EADBCE] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#EADBCE]">
                  <Image
                    src="/gallery_1.jpg"
                    alt="Artistic Design & Extraction"
                    fill
                    className="object-cover object-center"
                  />
                  {/* Frosted Glass Number Badge (FueGenix Image 3 Match) */}
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/40 flex items-center justify-center text-white font-serif text-sm font-semibold shadow-md">
                    2
                  </div>
                </div>
                <div className="p-6 sm:p-8">
                  <h3 className="font-sans text-xl sm:text-2xl font-normal text-[#1E1917] mb-2 sm:mb-3">
                    Artistic Design & Extraction
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#73635C] font-light leading-relaxed">
                    Topical pharmaceutical numbing ensures painless treatment. Using single-needle nano technology, 
                    Karyn applies every microstroke and electrolysis follicle treatment with 20+ years of gentle precision.
                  </p>
                </div>
              </div>
              <div className="p-6 sm:p-8 pt-0">
                <a
                  href={VAGARO_BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#8C5846] hover:text-[#D4AF37] transition-colors"
                >
                  <span>Learn About Nano Precision</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>

            {/* Card 3: Biological Healing */}
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.4 }}
              className="rounded-3xl bg-[#FAF8F5] border border-[#EADBCE] shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#EADBCE]">
                  <Image
                    src="/lip_blush.jpg"
                    alt="Dense Placement and Healed Result"
                    fill
                    className="object-cover object-center"
                  />
                  {/* Frosted Glass Number Badge (FueGenix Image 3 Match) */}
                  <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-md border border-white/40 flex items-center justify-center text-white font-serif text-sm font-semibold shadow-md">
                    3
                  </div>
                </div>
                <div className="p-6 sm:p-8">
                  <h3 className="font-sans text-xl sm:text-2xl font-normal text-[#1E1917] mb-2 sm:mb-3">
                    Dense Placement & Retention
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-[#73635C] font-light leading-relaxed">
                    We supply medical-grade aftercare protocols. Over 30 days, your skin regenerates, revealing a 
                    velvety natural finish. A 6-week refinement session locks in perfect long-term retention.
                  </p>
                </div>
              </div>
              <div className="p-6 sm:p-8 pt-0">
                <a
                  href={VAGARO_BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-semibold text-[#8C5846] hover:text-[#D4AF37] transition-colors"
                >
                  <span>Learn About Biological Healing</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>

          </div>

        </div>
      </section>


      {/* =====================================================================
          5. MID-PAGE SPLIT CTA BANNER WITH MACRO INSET
          Replicating FueGenix "Transform Your Hairline Today": Floating rounded dark
          container, midnight navy obsidian gradient, corner gold aura, clean typography,
          left CTA pill + direct line, right seamless macro inset.
      ===================================================================== */}
      <section className="w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] xl:w-[calc(100%-3rem)] max-w-[1440px] mx-auto rounded-[24px] sm:rounded-[32px] overflow-hidden bg-gradient-to-br from-[#131B26] via-[#0B1017] to-[#05080C] text-white border border-white/15 shadow-[0_12px_45px_rgba(0,0,0,0.5)] my-2.5 sm:my-3.5 relative">
        
        {/* Dynamic Randomized Artistic Champagne Gold Aura */}
        <ArtisticRandomGoldAura sectionKey="split-cta" size="normal" corner="random" />

        <div className="grid grid-cols-1 md:grid-cols-12 items-center relative z-10">
          
          {/* Left CTA Column */}
          <div className="md:col-span-7 p-6 sm:p-10 lg:p-14 flex flex-col items-start z-10">
            <div className="flex items-center gap-3 mb-2">
              <span className="font-serif italic text-xl sm:text-2xl text-[#D4AF37] block font-normal">
                Priority Booking Atelier
              </span>
              <div className="h-[2px] w-10 bg-gradient-to-r from-[#D4AF37] via-[#E5C358] to-transparent rounded-full" />
            </div>

            <h2 className="font-sans text-2xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight leading-tight mb-3 sm:mb-4">
              Transform Your Facial Harmony Today
            </h2>
            <p className="text-xs sm:text-sm text-white/70 font-light mb-6 sm:mb-8 max-w-lg leading-relaxed">
              Experience the confidence of waking up with perfectly symmetrical, natural arches and soft velvet lips. 
              Limited monthly appointments ensure dedicated attention for each client.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <motion.a
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                href={VAGARO_BOOKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto text-center px-8 py-4 rounded-full text-xs uppercase tracking-widest font-semibold bg-white text-[#14100E] hover:bg-[#F2E7DC] transition-all duration-300 shadow-xl"
              >
                Check Your Suitability
              </motion.a>
              <a
                href={`tel:${STUDIO_PHONE_RAW}`}
                className="w-full sm:w-auto text-center px-6 py-3.5 rounded-full text-xs uppercase tracking-widest font-medium border border-white/20 text-white hover:border-[#D4AF37] hover:text-[#D4AF37] transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Call {STUDIO_PHONE}</span>
              </a>
            </div>
          </div>

          {/* Right Macro Photographic Inset */}
          <div className="md:col-span-5 relative h-56 sm:h-72 md:h-full min-h-[260px] md:min-h-[340px] w-full overflow-hidden">
            <Image
              src="/gallery_2.jpg"
              alt="Macro Hairline and Brow Precision"
              fill
              className="object-cover object-center"
            />
            {/* Seamless fading gradient into the banner */}
            <div className="absolute inset-0 bg-gradient-to-t md:bg-gradient-to-r from-[#14100E] via-transparent to-transparent" />
          </div>

        </div>
      </section>


      {/* =====================================================================
          6. "SUCCESS STORIES" (CLIENT TESTIMONIALS SLIDER)
          Replicating FueGenix Testimonials: Floating rounded white container,
          top-left gold corner aura, Newsreader italic eyebrow + modern geometric sans title,
          3 cards side-by-side with the center card highlighted with gold border & 5 gold stars.
      ===================================================================== */}
      <section className="w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] xl:w-[calc(100%-3rem)] max-w-[1440px] mx-auto rounded-[24px] sm:rounded-[32px] overflow-hidden bg-white border border-[#EADBCE] shadow-md my-2.5 sm:my-3.5 p-6 sm:p-10 lg:p-12 relative">
        
        {/* Subtle, Non-Obvious Top-Right Corner Gradient */}
        <div className="absolute top-0 right-0 w-80 sm:w-96 h-80 sm:h-96 bg-[radial-gradient(ellipse_at_top_right,rgba(0,0,0,0.035)_0%,rgba(212,175,55,0.03)_25%,transparent_70%)] pointer-events-none" />

        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-2xl mx-auto mb-10 sm:mb-12"
          >
            <span className="font-serif italic text-base sm:text-lg text-[#73635C] block mb-1 font-normal">
              Our Clients&apos; Perspectives
            </span>
            <h2 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-normal tracking-tight text-[#1E1917]">
              Success Stories
            </h2>
          </motion.div>

          {/* Horizontally Scrollable Reviews Carousel with Side Navigation Arrows */}
          <div className="relative group/reviews mb-8">
            
            {/* Interactive Carousel Navigation Arrow Buttons */}
            <div className="flex items-center justify-between absolute top-1/2 -translate-y-1/2 -left-3 -right-3 sm:-left-5 sm:-right-5 pointer-events-none z-30">
              <button
                onClick={() => scrollReviews("left")}
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/90 backdrop-blur-sm border border-[#DDD5CC] text-[#1E1917] flex items-center justify-center pointer-events-auto hover:bg-[#1E1917] hover:text-white active:scale-95 transition-all shadow-md cursor-pointer"
                aria-label="Previous Review"
              >
                <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
              <button
                onClick={() => scrollReviews("right")}
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white/90 backdrop-blur-sm border border-[#DDD5CC] text-[#1E1917] flex items-center justify-center pointer-events-auto hover:bg-[#1E1917] hover:text-white active:scale-95 transition-all shadow-md cursor-pointer"
                aria-label="Next Review"
              >
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>
            </div>

            {/* Scrollable Container with Snap Physics */}
            <div
              ref={reviewsRef}
              onScroll={(e) => {
                const container = e.currentTarget;
                const containerCenter = container.scrollLeft + container.clientWidth / 2;
                const cards = Array.from(container.children) as HTMLElement[];
                let closestIdx = 0;
                let minDiff = Infinity;
                cards.forEach((card, idx) => {
                  const cardCenter = card.offsetLeft + card.clientWidth / 2;
                  const diff = Math.abs(containerCenter - cardCenter);
                  if (diff < minDiff) {
                    minDiff = diff;
                    closestIdx = idx;
                  }
                });
                setReviewIndex(closestIdx);
              }}
              className="flex gap-5 sm:gap-6 overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar pb-8 pt-4 px-2 -mx-2 sm:mx-0 items-center"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {testimonials.map((item, idx) => {
                const isMiddle = idx === reviewIndex;
                return (
                  <div
                    key={item.id}
                    className={`w-[85vw] sm:w-[380px] lg:w-[420px] shrink-0 snap-center rounded-[22px] p-6 sm:p-8 transition-all duration-500 flex flex-col justify-between relative overflow-hidden ${
                      isMiddle
                        ? "bg-white border-2 border-[#D4AF37] shadow-[0_18px_45px_rgba(212,175,55,0.22),0_4px_20px_rgba(0,0,0,0.06)] scale-[1.03] z-20"
                        : "bg-[#FAF8F5]/85 border border-[#E8E2DC] shadow-[0_2px_10px_rgba(0,0,0,0.02)] scale-[0.97] opacity-85 sm:opacity-90 hover:opacity-100 z-10"
                    }`}
                  >
                    {/* Top Hairline Metallic Gold Shimmer for the Middle Card */}
                    {isMiddle && (
                      <div className="absolute top-0 inset-x-0 h-[2.5px] bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent pointer-events-none" />
                    )}
                    {/* Soft Champagne Gold Corner Aura for the Middle Card */}
                    {isMiddle && (
                      <div className="absolute -top-12 -right-12 w-44 h-44 rounded-full bg-[radial-gradient(circle,rgba(229,195,88,0.18)_0%,transparent_70%)] pointer-events-none blur-xl" />
                    )}

                    <div className="relative z-10">
                      {/* Top Row: Avatar Initial, Name + Stars, Quote Icon */}
                      <div className="flex items-center justify-between mb-5">
                        <div className="flex items-center gap-3.5">
                          <div
                            className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center font-serif text-lg sm:text-xl shrink-0 transition-colors duration-300 ${
                              isMiddle
                                ? "border-2 border-[#D4AF37] bg-[#FAF6EE] text-[#B8860B] shadow-sm"
                                : "border border-[#D5CDC5] bg-white text-[#1E1917]"
                            }`}
                          >
                            {item.name.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-serif sm:font-sans text-base font-medium text-[#1E1917] leading-tight">
                              {item.name}
                            </h4>
                            <div className="flex items-center gap-0.5 mt-1">
                              {[...Array(item.rating)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3 h-3 fill-[#D4AF37] text-[#D4AF37] ${
                                    isMiddle ? "drop-shadow-[0_1px_3px_rgba(212,175,55,0.4)]" : ""
                                  }`}
                                />
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Outline Quotation Icon */}
                        <div className={isMiddle ? "text-[#D4AF37]/70" : "text-[#D8D0C7]"}>
                          <svg className="w-7 h-7" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M3 21c3 0 7-1 7-8V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v6c0 4 2 7 3 10zm11 0c3 0 7-1 7-8V5c0-1.1-.9-2-2-2h-4c-1.1 0-2 .9-2 2v6c0 4 2 7 3 10z" />
                          </svg>
                        </div>
                      </div>

                      {/* Review Quote */}
                      <p className="text-xs sm:text-[13.5px] text-[#4A3E39] font-light leading-relaxed">
                        {item.quote}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

          </div>

          {/* Interactive Line Pagination Indicators */}
          <div className="flex items-center justify-center gap-2 mb-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  if (reviewsRef.current) {
                    const container = reviewsRef.current;
                    const cards = Array.from(container.children) as HTMLElement[];
                    if (cards[i]) {
                      const card = cards[i];
                      const scrollTarget = card.offsetLeft - (container.clientWidth - card.clientWidth) / 2;
                      container.scrollTo({
                        left: scrollTarget,
                        behavior: "smooth"
                      });
                      setReviewIndex(i);
                    }
                  }
                }}
                className={`h-[2px] transition-all duration-300 cursor-pointer ${
                  reviewIndex === i ? "w-12 sm:w-14 bg-[#1E1917]" : "w-8 sm:w-10 bg-[#DDD5CC] hover:bg-[#B5ADA4]"
                }`}
                aria-label={`Go to review ${i + 1}`}
              />
            ))}
          </div>

          {/* Direct Google Maps Reviews Button (FueGenix Exact Match) */}
          <div className="text-center">
            <motion.a
              href={GOOGLE_REVIEWS_URL}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2.5 px-6 sm:px-8 py-3 rounded-lg border border-[#D0C8C1] bg-[#FAF8F5] hover:bg-white hover:border-[#1E1917] text-[#1E1917] transition-all duration-200 shadow-sm text-xs sm:text-[12.5px] tracking-[0.14em] font-medium uppercase cursor-pointer"
            >
              <GoogleIcon className="w-4 h-4 shrink-0" />
              <span>VIEW GOOGLE REVIEWS</span>
            </motion.a>
          </div>
        </div>
      </section>


      {/* =====================================================================
          7. "FACIAL MASTERY" (HAIRLINE MASTERY EQUIVALENT 2X2 GRID)
          Replicating FueGenix "Hairline Mastery": Floating rounded white container,
          top-right gold corner aura, Newsreader italic eyebrow + modern geometric sans title,
          and 4 case study cards in 2x2 grid.
      ===================================================================== */}
      <section id="mastery" className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-14 sm:py-20 relative">
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center max-w-2xl mx-auto mb-10 sm:mb-14"
          >
            <span className="font-serif italic text-xl sm:text-2xl text-[#8C5846] block mb-2 font-normal">
              Forensic Case Studies
            </span>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl tracking-tight text-[#1E1917] font-normal mb-4">
              <span className="font-sans font-light">Facial </span>
              <span className="font-serif italic font-normal">Mastery</span>
            </h2>
            <p className="font-sans text-xs sm:text-base text-[#73635C] font-light leading-relaxed">
              Meticulous technical execution across hyperrealistic brows, velvet lips, and corrective pigment neutralization.
            </p>
          </motion.div>

        {/* 2x2 Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 relative z-10">
          
          {/* Card 1: Lip Blush Vermilion Restoration */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.4 }}
            className="group rounded-3xl bg-white border border-[#EADBCE] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#EAE2DC]">
              <Image
                src="/lip_blush.jpg"
                alt="Lip Blush Vermilion Restoration"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold bg-[#120E0D]/85 backdrop-blur-md text-[#D4AF37] border border-[#D4AF37]/30">
                Lip Architecture
              </span>
            </div>
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-2 text-[#A86A55]">
                <Heart className="w-4 h-4" />
                <span className="text-[11px] sm:text-xs uppercase tracking-wider font-semibold">Asymmetry & Contour Correction</span>
              </div>
              <h3 className="font-sans text-xl sm:text-2xl font-normal text-[#1E1917] mb-2 sm:mb-3">
                Velvet Lip Flush & Border Definition
              </h3>
              <p className="text-xs sm:text-sm text-[#73635C] font-light leading-relaxed">
                Restored loss of natural vermilion border definition and neutralized cool blue undertones. 
                Healed into a translucent soft rose finish with zero harsh outline effect.
              </p>
            </div>
          </motion.div>

          {/* Card 2: Sparse Brow Reconstruction (Nano Hairstrokes) */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.4 }}
            className="group rounded-3xl bg-white border border-[#EADBCE] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#EAE2DC]">
              <Image
                src="/gallery_4.jpg"
                alt="Sparse Brow Reconstruction"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold bg-[#120E0D]/85 backdrop-blur-md text-[#D4AF37] border border-[#D4AF37]/30">
                Nano Hair-Flow
              </span>
            </div>
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-2 text-[#A86A55]">
                <Compass className="w-4 h-4" />
                <span className="text-[11px] sm:text-xs uppercase tracking-wider font-semibold">Anatomical Hair-Flow Mapping</span>
              </div>
              <h3 className="font-sans text-xl sm:text-2xl font-normal text-[#1E1917] mb-2 sm:mb-3">
                Hyperrealistic 3D Nano Strands
              </h3>
              <p className="text-xs sm:text-sm text-[#73635C] font-light leading-relaxed">
                Reconstructed sparse tail and irregular bulb with single-needle micro-dots. 
                Blends indistinguishably with native brow hairs, completely avoiding flat microblading blockiness.
              </p>
            </div>
          </motion.div>

          {/* Card 3: Color Correction & Neutralization */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.4 }}
            className="group rounded-3xl bg-white border border-[#EADBCE] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#EAE2DC]">
              <Image
                src="/gallery_2.jpg"
                alt="Old Microblading Color Correction"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold bg-[#120E0D]/85 backdrop-blur-md text-[#D4AF37] border border-[#D4AF37]/30">
                Tone Correction
              </span>
            </div>
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-2 text-[#A86A55]">
                <Droplet className="w-4 h-4" />
                <span className="text-[11px] sm:text-xs uppercase tracking-wider font-semibold">Warm Pigment Neutralization</span>
              </div>
              <h3 className="font-sans text-xl sm:text-2xl font-normal text-[#1E1917] mb-2 sm:mb-3">
                Old Ashy Microblading Rebalancing
              </h3>
              <p className="text-xs sm:text-sm text-[#73635C] font-light leading-relaxed">
                Neutralized lingering cool blue/grey residue from an outside provider using custom warm honey-tone 
                corrective pigment, followed by delicate powder shading for a revitalized, rich aesthetic.
              </p>
            </div>
          </motion.div>

          {/* Card 4: Velvet Ombré Architecture */}
          <motion.div
            whileHover={{ y: -6 }}
            transition={{ duration: 0.4 }}
            className="group rounded-3xl bg-white border border-[#EADBCE] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col"
          >
            <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#EAE2DC]">
              <Image
                src="/gallery_7.jpg"
                alt="Velvet Ombré Architecture"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-semibold bg-[#120E0D]/85 backdrop-blur-md text-[#D4AF37] border border-[#D4AF37]/30">
                Ombré Architecture
              </span>
            </div>
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-2 mb-2 text-[#A86A55]">
                <Sparkles className="w-4 h-4" />
                <span className="text-[11px] sm:text-xs uppercase tracking-wider font-semibold">Graduated Powder Shading</span>
              </div>
              <h3 className="font-sans text-xl sm:text-2xl font-normal text-[#1E1917] mb-2 sm:mb-3">
                Soft-Focus Wake-Up Perfection
              </h3>
              <p className="text-xs sm:text-sm text-[#73635C] font-light leading-relaxed">
                Airbrushed gradient with sheer translucent front transitions leading into sharp, elegant tails. 
                Eliminates the daily 20-minute morning makeup routine while retaining pristine softness.
              </p>
            </div>
          </motion.div>

        </div>
        </div>
      </section>


      {/* =====================================================================
          8. FLY-IN / ATELIER CONCIERGE BANNER
          Replicating FueGenix "Fly-In Patient Concierge": Floating rounded dark container,
          midnight navy obsidian gradient, top-left gold corner aura, Newsreader italic eyebrow +
          modern geometric sans title, VIP travel concierge copy, and luxury aesthetic.
      ===================================================================== */}
      <section className="w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] xl:w-[calc(100%-3rem)] max-w-[1440px] mx-auto rounded-[24px] sm:rounded-[32px] overflow-hidden bg-gradient-to-br from-[#131B26] via-[#0B1017] to-[#05080C] text-white border border-white/15 shadow-[0_12px_45px_rgba(0,0,0,0.5)] my-2.5 sm:my-3.5 p-6 sm:p-10 lg:p-12 relative">
        
        {/* Dynamic Randomized Artistic Champagne Gold Aura */}
        <ArtisticRandomGoldAura sectionKey="flyin-concierge" size="normal" corner="random" />

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 sm:gap-8 relative z-10 text-center md:text-left">
          <div className="max-w-2xl">
            <span className="font-serif italic text-xl sm:text-2xl text-[#D4AF37] block mb-2 font-normal">
              Regional & Out-of-State
            </span>
            <h2 className="font-sans text-2xl sm:text-4xl lg:text-5xl font-light text-white tracking-tight mb-3 sm:mb-4">
              Fly-In Client Concierge
            </h2>
            <p className="font-sans text-xs sm:text-base text-white/70 font-light leading-relaxed">
              Serving discerning clients traveling from Kansas City, Oklahoma, Dallas, and across the Midwest who seek Karyn Smith's proprietary natural finish. We provide coordinated single-day appointments and direct aftercare support.
            </p>
          </div>

          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href={VAGARO_BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-auto text-center shrink-0 px-9 py-4 rounded-full text-xs uppercase tracking-[0.22em] font-bold bg-white text-[#0E1319] hover:bg-[#F2E7DC] transition-all duration-300 shadow-2xl"
          >
            Arrange Fly-In Booking
          </motion.a>
        </div>
      </section>


      {/* =====================================================================
          9. "CRITICALLY ACCLAIMED ARTISTRY" (CREDENTIALS & ACCREDITATIONS MATRIX)
          Replicating FueGenix Accreditations Matrix: Floating rounded white container,
          top-right gold corner aura, Newsreader italic eyebrow + modern geometric sans title,
          4 asymmetric blocks (Clinical facts + Rating + Gold seal + Board licensure).
      ===================================================================== */}
      {/* =====================================================================
          9. "CRITICALLY ACCLAIMED ARTISTRY" (CREDENTIALS & ACCREDITATIONS MATRIX)
          Replicating FueGenix Screenshots 1 & 2 1:1:
          - Slight margin / distance, slightly rounded container (rounded-[28px])
          - Subtle whisper of corner gradient strictly in top-right corner
          - "Critically Acclaimed" (Sans) + "Artistry" (Italic Serif) title pairing
          - Left Card: Dark navy header + FANCY GOLD METALLIC STRIP + 3 white sub-cards
          - Right Top Card: 5 Consecutive Years + FANCY GOLD TIMELINE STRIP with checkpoints + active 2026 gold badge
          - Right Bottom Cards: Logo + 99.8% circular gold ring gauge + "Recognized By" verified badges
      ===================================================================== */}
      <section id="accreditations" className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-14 sm:py-20 relative">
        <div className="relative z-10">
          
          {/* Header Typography: Matches Screenshot 1 1:1 */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-2xl mx-auto mb-8 sm:mb-10"
          >
            <span className="font-serif italic text-base sm:text-lg text-[#73635C] block mb-1 font-normal">
              Enhanced Reputation
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl tracking-tight text-[#1E1917] font-normal leading-tight">
              <span className="font-sans font-light">Critically Acclaimed </span>
              <span className="font-serif italic font-normal">Artistry</span>
            </h2>
          </motion.div>

          {/* Asymmetric Matrix Grid: Matches Screenshot 2 1:1 */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-5 items-stretch">
            
            {/* Left Tall Card: Dark Header + FANCY GOLD STRIP + 3 Rounded Sub-Cards */}
            <div className="lg:col-span-5 rounded-[22px] border border-[#EADBCE] overflow-hidden bg-white shadow-sm flex flex-col justify-between">
              <div>
                
                <div className="bg-gradient-to-b from-[#162230] via-[#0E1622] to-[#070C12] text-white p-6 sm:p-7 text-center relative overflow-hidden">
                  {/* Dynamic Randomized Artistic Champagne Gold Aura */}
                  <ArtisticRandomGoldAura sectionKey="accreditations-header" size="compact" intensity={1.1} />
                  
                  <h3 className="relative z-10 font-sans text-base sm:text-[17px] font-medium leading-snug tracking-tight text-white max-w-xs mx-auto">
                    Member Of <span className="text-[#D4AF37]">☤</span> The Kansas State Board Of Nursing & Medical Directorate
                  </h3>
                </div>

                {/* THE FANCY GOLD STRIP (Artistic metallic divider from Screenshot 2) */}
                <div className="h-[3.5px] w-full bg-gradient-to-r from-[#B8860B] via-[#F3D77B] to-[#996515] shadow-[0_2px_8px_rgba(212,175,55,0.35)]" />

                {/* 3 Clinical Sub-Cards */}
                <div className="p-4 sm:p-5 flex flex-col gap-3 bg-[#FCFAF8]/60">
                  
                  {/* Sub-Card 1 */}
                  <div className="p-4 rounded-xl bg-white border border-[#EADBCE]/80 flex items-start gap-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                    <div className="w-9 h-9 rounded-lg border border-[#EADBCE] bg-[#FAF8F5] flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-4 h-4 text-[#8C5846]" />
                    </div>
                    <p className="text-xs text-[#524641] font-light leading-relaxed">
                      Kansas State Board Registered Nurse (BSN, RN #14-118676). 6+ years acute clinical hospital training. You cannot buy your way in.
                    </p>
                  </div>

                  {/* Sub-Card 2 */}
                  <div className="p-4 rounded-xl bg-white border border-[#EADBCE]/80 flex items-start gap-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                    <div className="w-9 h-9 rounded-lg border border-[#EADBCE] bg-[#FAF8F5] flex items-center justify-center shrink-0">
                      <Search className="w-4 h-4 text-[#8C5846]" />
                    </div>
                    <p className="text-xs text-[#524641] font-light leading-relaxed">
                      Active oversight under Medical Director Dr. Christopher Meyer, MD. Hospital sterility, single-use disposable cartridges, and pharmaceutical numbing.
                    </p>
                  </div>

                  {/* Sub-Card 3 */}
                  <div className="p-4 rounded-xl bg-white border border-[#EADBCE]/80 flex items-start gap-3.5 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
                    <div className="w-9 h-9 rounded-lg border border-[#EADBCE] bg-[#FAF8F5] flex items-center justify-center shrink-0">
                      <Stethoscope className="w-4 h-4 text-[#8C5846]" />
                    </div>
                    <p className="text-xs text-[#524641] font-light leading-relaxed">
                      Karyn Smith adheres strictly to rigorous Arizona state board sterilization, OSHA bloodborne pathogen compliance, and medical autoclave standards.
                    </p>
                  </div>

                </div>
              </div>
            </div>

            {/* Right Column: Top Card + Bottom 2 Cards */}
            <div className="lg:col-span-7 flex flex-col gap-4 sm:gap-5 justify-between">
              
              {/* Top Card: Voted Best for 5 Consecutive Years + GOLD PROGRESS TIMELINE STRIP */}
              <div className="p-6 sm:p-7 rounded-[22px] bg-white border border-[#EADBCE] shadow-sm flex flex-col justify-between relative overflow-hidden">
                
                <div>
                  <div className="flex items-center gap-3.5 mb-2.5">
                    <div className="w-10 h-10 rounded-full border border-[#D4AF37]/50 bg-[#FAF6EE] flex items-center justify-center shrink-0">
                      <Award className="w-5 h-5 text-[#D4AF37]" />
                    </div>
                    <h4 className="font-sans text-base sm:text-lg font-medium text-[#1E1917] leading-tight">
                      Voted Best PMU Facial Artist in Scottsdale For 5 Consecutive Years 👑
                    </h4>
                  </div>
                  <p className="text-xs text-[#73635C] font-light leading-relaxed mb-6">
                    The region's most cited independent ranking for permanent cosmetic artists. Karyn Smith has held top 5.0-star standing every year since 2022.
                  </p>
                </div>

                {/* FANCY GOLD TIMELINE / PROGRESS STRIP (Exact match to Screenshot 2!) */}
                <div className="pt-2">
                  <div className="relative mb-3 px-2">
                    {/* Track Line */}
                    <div className="h-[2px] w-full bg-gradient-to-r from-[#D4AF37]/40 via-[#D4AF37] to-[#D4AF37] rounded-full" />
                    
                    {/* 5 Milestone Checkpoint Circles */}
                    <div className="absolute -top-1.5 left-2 right-2 flex justify-between items-center pointer-events-none">
                      {[2022, 2023, 2024, 2025, 2026].map((yr, idx) => (
                        <div key={idx} className="w-3.5 h-3.5 rounded-full bg-white border-2 border-[#D4AF37] flex items-center justify-center shadow-sm">
                          <Check className="w-2 h-2 text-[#D4AF37] stroke-[3]" />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* 5 Year Buttons Row */}
                  <div className="grid grid-cols-5 gap-2 sm:gap-3 text-center">
                    {["2022", "2023", "2024", "2025"].map((yr, idx) => (
                      <div key={idx} className="py-2.5 rounded-xl bg-[#F2EFEA] text-[#8C827A] text-xs font-medium border border-[#E5E0D8]">
                        {yr}
                      </div>
                    ))}
                    {/* 2026 Active Card in Metallic Gold */}
                    <div className="py-2.5 rounded-xl bg-gradient-to-b from-[#E2C068] via-[#CAA147] to-[#A37B24] text-white text-xs font-bold shadow-md border border-[#D4AF37]/60">
                      2026
                    </div>
                  </div>
                </div>

              </div>

              {/* Bottom Row: 2 Cards Side-by-Side */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                
                {/* Bottom Left Card: Enhanced Logo + 99.8% Ring Gauge */}
                <div className="p-6 rounded-[22px] bg-[#FAF6EE] border border-[#EADBCE] shadow-sm flex flex-col items-center justify-between text-center relative overflow-hidden">
                  <div className="relative h-9 w-32 mb-1">
                    <Image
                      src="/logo.png"
                      alt="AZ Studio of Electrolysis & Permanent Makeup"
                      fill
                      className="object-contain"
                    />
                  </div>

                  {/* Gold Circular Ring Gauge (Matches 99.9% in Screenshot 2) */}
                  <div className="my-2.5 w-20 h-20 rounded-full border-[3px] border-[#CAA147] flex items-center justify-center bg-white shadow-inner">
                    <span className="font-sans text-xl font-light text-[#CAA147] tracking-tight">99.8%</span>
                  </div>

                  <p className="text-[11px] uppercase tracking-wider text-[#8C5846] font-semibold">
                    Healed Retention Rate
                  </p>
                </div>

                {/* Bottom Right Card: Recognized By */}
                <div className="p-6 rounded-[22px] bg-white border border-[#EADBCE] shadow-sm flex flex-col justify-between">
                  <h4 className="font-sans text-sm font-medium text-[#1E1917] mb-3 text-center sm:text-left">
                    Recognized By
                  </h4>

                  {/* Platform & Clinical Badges */}
                  <div className="flex flex-wrap items-center justify-around gap-2 my-auto py-2">
                    <div className="px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#EADBCE] text-center">
                      <span className="block text-[11px] font-bold text-[#1E1917]">Vagaro</span>
                      <span className="text-[9px] text-[#CAA147] font-semibold">5.0 ★ Top Rated</span>
                    </div>
                    <div className="px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#EADBCE] text-center">
                      <span className="block text-[11px] font-bold text-[#1E1917]">Kansas RN</span>
                      <span className="text-[9px] text-[#8C5846] font-medium">Board Licensed</span>
                    </div>
                    <div className="px-3 py-2 rounded-xl bg-[#FAF8F5] border border-[#EADBCE] text-center">
                      <span className="block text-[11px] font-bold text-[#1E1917]">Google</span>
                      <span className="text-[9px] text-[#CAA147] font-semibold">100% 5-Stars</span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#EADBCE]/80 flex items-center justify-between text-[10px] text-[#73635C]">
                    <span>Scottsdale, AZ Studio</span>
                    <span className="text-[#8C5846] font-medium">Verified Asepsis</span>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================================
          10. DIRECT CONTACT CARD (CONSULT WITH KARYN SMITH)
          Replicating FueGenix "Consult With Dr. Ahmad": Floating rounded alabaster container,
          subtle single-corner gold gradient, Newsreader italic eyebrow + modern geometric sans title,
          split card with direct line, Vagaro trigger, and warm doctor/nurse smiling portrait.
      ===================================================================== */}
      <section id="consult" className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-12 py-14 sm:py-20 relative">
        <div className="relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Direct Communication Actions */}
            <div className="md:col-span-7">
              <span className="font-serif italic text-xl sm:text-2xl text-[#8C5846] block mb-2 font-normal">
                Direct Nurse Communication
              </span>

              <h2 className="font-sans text-3xl sm:text-4xl lg:text-5xl font-light text-[#1E1917] tracking-tight mb-3 sm:mb-4">
                Consult With <span className="font-serif italic font-normal text-[#8C5846]">Karyn Smith</span>
              </h2>

              <p className="text-xs sm:text-sm text-[#73635C] font-light leading-relaxed mb-6 sm:mb-8">
                Have questions regarding your skin phototype, previous microblading correction, or scheduling? 
                Connect directly with Karyn Smith for a complimentary, in-depth evaluation in Scottsdale.
              </p>

              {/* Direct Phone / Contact Box */}
              <div className="space-y-3 mb-6 sm:mb-8">
                <a
                  href={`tel:${STUDIO_PHONE_RAW}`}
                  className="flex items-center justify-between p-4 rounded-2xl bg-white border border-[#EADBCE] hover:border-[#D4AF37] transition-all duration-300 shadow-sm group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#120E0D] text-white flex items-center justify-center">
                      <Phone className="w-4 h-4 text-[#D4AF37]" />
                    </div>
                    <div>
                      <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#73635C] font-medium">Direct Atelier Line</p>
                      <p className="text-xs sm:text-sm font-semibold text-[#1E1917]">{STUDIO_PHONE}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#A86A55] group-hover:translate-x-1 transition-transform" />
                </a>

                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 rounded-2xl bg-white border border-[#EADBCE] hover:border-[#D4AF37] transition-all duration-300 shadow-sm group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-[#120E0D] text-white flex items-center justify-center">
                      <InstagramIcon className="w-4 h-4 text-[#D4AF37]" />
                    </div>
                    <div>
                      <p className="text-[10px] sm:text-[11px] uppercase tracking-wider text-[#73635C] font-medium">Direct Nurse Message</p>
                      <p className="text-xs sm:text-sm font-semibold text-[#1E1917]">Instagram @yourfacedoneright</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#A86A55] group-hover:translate-x-1 transition-transform" />
                </a>

                <motion.a
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  href={VAGARO_BOOKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full text-center block py-4 rounded-2xl text-xs uppercase tracking-widest font-bold bg-[#14100E] text-white hover:bg-[#2A221E] transition-all duration-300 shadow-lg"
                >
                  Schedule Online Assessment via Vagaro
                </motion.a>
              </div>

              {/* Trust Subtext */}
              <p className="text-[10px] sm:text-[11px] text-[#73635C] font-light">
                * Zero sales representatives. Every consultation and procedure is personally performed by Karyn Smith.
              </p>
            </div>

            {/* Right Column: Friendly Smiling Portrait */}
            <div className="md:col-span-5 flex justify-center">
              <motion.div
                whileHover={{ scale: 1.04 }}
                className="relative w-48 sm:w-full max-w-xs aspect-square rounded-3xl overflow-hidden shadow-xl border-4 border-white bg-white"
              >
                <Image
                  src="/hero_portrait.jpg"
                  alt="Karyn Smith Scottsdale"
                  fill
                  className="object-cover"
                />
              </motion.div>
            </div>

          </div>

          {/* Bottom Trust Ticker */}
          <div className="pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-[#EADBCE] flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[11px] sm:text-xs text-[#73635C] font-light text-center">
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" /> Complete Confidentiality</span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5"><Stethoscope className="w-3.5 h-3.5 text-[#D4AF37]" /> Medical Director Oversight</span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" /> Sterile Atelier Suite</span>
          </div>
        </div>
      </section>


      {/* =====================================================================
          11. DARK FAQ ACCORDION ("YOUR QUESTIONS ANSWERED")
          Replicating FueGenix Dark FAQ: Floating rounded dark container,
          midnight navy obsidian gradient, subtle single top-right gold corner glow,
          Newsreader italic eyebrow + modern geometric sans title, expanding accordion.
      ===================================================================== */}
      <section id="faq" className="w-[calc(100%-1rem)] sm:w-[calc(100%-2rem)] xl:w-[calc(100%-3rem)] max-w-[1440px] mx-auto rounded-[24px] sm:rounded-[32px] overflow-hidden bg-gradient-to-br from-[#131B26] via-[#0B1017] to-[#05080C] text-white border border-white/15 shadow-[0_12px_45px_rgba(0,0,0,0.5)] my-2.5 sm:my-3.5 p-6 sm:p-10 lg:p-12 relative">
        
        {/* Dynamic Randomized Artistic Champagne Gold Aura */}
        <ArtisticRandomGoldAura sectionKey="faq-accordion" size="large" corner="random" />

        <div className="max-w-4xl mx-auto relative z-10">
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-10 sm:mb-12"
          >
            <span className="font-serif italic text-xl sm:text-2xl text-[#D4AF37] block mb-2 font-normal">
              Frequently Asked Questions
            </span>
            <h2 className="font-sans text-3xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white mb-4">
              Your Questions <span className="font-serif italic font-normal text-[#D4AF37]">Answered</span>
            </h2>
            <div className="w-12 h-[2.5px] bg-gradient-to-r from-[#D4AF37] to-[#B8860B] rounded-full mx-auto mb-4" />
            <p className="font-sans text-xs sm:text-base text-white/70 font-light max-w-xl mx-auto leading-relaxed">
              Everything you need to know about preparation, treatment safety, and long-term results.
            </p>
          </motion.div>

          {/* Accordion List with AnimatePresence */}
          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-white/10 overflow-hidden bg-white/5 transition-colors"
                >
                    <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 text-sm sm:text-base font-normal text-white hover:text-[#D4AF37] transition-colors"
                  >
                    <span className="font-sans text-base sm:text-lg font-normal tracking-tight pr-2 text-white/95">{faq.q}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="w-7 sm:w-8 h-7 sm:h-8 rounded-full border border-white/20 flex items-center justify-center shrink-0 text-white/70 text-sm font-light"
                    >
                      {isOpen ? "-" : "+"}
                    </motion.span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-5 sm:px-6 pb-6 pt-0 text-xs sm:text-sm text-white/75 font-light leading-relaxed border-t border-white/5 pt-4">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          {/* Ask Specific Question Button */}
          <div className="mt-10 sm:mt-12 text-center">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href={`tel:${STUDIO_PHONE_RAW}`}
              className="inline-flex items-center gap-2 px-9 py-4 rounded-full text-xs uppercase tracking-[0.22em] font-bold bg-white text-[#0E1319] hover:bg-[#F2E7DC] transition-all duration-300 shadow-2xl"
            >
              <Phone className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span>Ask a Specific Question</span>
            </motion.a>
          </div>

        </div>
      </section>


      {/* =====================================================================
          12. HIGH-END STUDIO FOOTER
          Replicating FueGenix Footer: Dark aesthetic, authentic gold logo, 4-column directory,
          embedded Google Maps pin widget of 8080 E Central Ave, and legal notice.
      ===================================================================== */}
      <footer className="bg-[#0C0908] text-white pt-16 sm:pt-20 pb-12 px-5 sm:px-8 lg:px-12 border-t border-white/10 relative overflow-hidden">
        {/* Dynamic Randomized Artistic Champagne Gold Aura */}
        <ArtisticRandomGoldAura sectionKey="footer" size="normal" intensity={0.9} corner="random" />

        <div className="max-w-7xl mx-auto relative z-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-12 pb-12 sm:pb-16 border-b border-white/10">
            
            {/* Left Brand Identity & Columns (Col-span 8) */}
            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-4 gap-8">
              
              {/* Brand Col with Authentic Gold Logo */}
              <div className="sm:col-span-1">
                <div className="relative h-12 w-40 mb-3">
                  <Image
                    src="/logo.png"
                    alt="AZ Studio of Electrolysis & Permanent Makeup"
                    fill
                    className="object-contain object-left"
                  />
                </div>
                <p className="text-xs text-white/50 font-light leading-relaxed mb-4">
                  Scottsdale premier permanent makeup and medical electrolysis atelier.
                </p>
                <div className="text-[11px] text-[#D4AF37]">
                  <p>Nurse Karyn Smith</p>
                  <p className="text-white/40">Karyn Smith · 20+ Years</p>
                </div>
                
                {/* Social Channels Icons */}
                <div className="flex items-center gap-2.5 mt-4">
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#D4AF37] hover:text-[#120E0D] text-white flex items-center justify-center transition-all duration-300 border border-white/15"
                    aria-label="Instagram @yourfacedoneright"
                    title="Instagram @yourfacedoneright"
                  >
                    <InstagramIcon className="w-4 h-4" />
                  </a>
                  <a
                    href={FACEBOOK_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#D4AF37] hover:text-[#120E0D] text-white flex items-center justify-center transition-all duration-300 border border-white/15"
                    aria-label="Facebook @YourFaceDoneRight"
                    title="Facebook @YourFaceDoneRight"
                  >
                    <FacebookIcon className="w-4 h-4" />
                  </a>
                </div>
              </div>

              {/* Col 2: Procedures */}
              <div>
                <h5 className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold mb-3 sm:mb-4">Procedures</h5>
                <ul className="space-y-2 text-xs text-white/70 font-light">
                  <li><a href="#transformations" className="hover:text-white transition-colors">Nano Hairstrokes</a></li>
                  <li><a href="#transformations" className="hover:text-white transition-colors">Velvet Lip Blush</a></li>
                  <li><a href="#transformations" className="hover:text-white transition-colors">Ombré Powder Brows</a></li>
                  <li><a href="#mastery" className="hover:text-white transition-colors">Old PMU Correction</a></li>
                </ul>
              </div>

              {/* Col 3: Studio Atelier */}
              <div>
                <h5 className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold mb-3 sm:mb-4">Atelier</h5>
                <ul className="space-y-2 text-xs text-white/70 font-light">
                  <li><a href="#about" className="hover:text-white transition-colors">About Karyn Smith</a></li>
                  <li><a href="#accreditations" className="hover:text-white transition-colors">Medical Direction</a></li>
                  <li><a href="#process" className="hover:text-white transition-colors">The 3-Step Process</a></li>
                  <li><a href="#mastery" className="hover:text-white transition-colors">Case Studies</a></li>
                </ul>
              </div>

              {/* Col 4: Contact & Schedule */}
              <div>
                <h5 className="text-xs uppercase tracking-[0.2em] text-[#D4AF37] font-semibold mb-3 sm:mb-4">Booking</h5>
                <ul className="space-y-2 text-xs text-white/70 font-light">
                  <li><a href={VAGARO_BOOKING_URL} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Vagaro Engine</a></li>
                  <li><a href={`tel:${STUDIO_PHONE_RAW}`} className="hover:text-white transition-colors">{STUDIO_PHONE}</a></li>
                  <li><a href={`mailto:${STUDIO_EMAIL}`} className="hover:text-white transition-colors">Email Studio</a></li>
                  <li><a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5"><InstagramIcon className="w-3.5 h-3.5 text-[#D4AF37]" /><span>Instagram @yourfacedoneright</span></a></li>
                  <li><a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer" className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5"><FacebookIcon className="w-3.5 h-3.5 text-[#D4AF37]" /><span>Facebook Page</span></a></li>
                </ul>
              </div>

            </div>

            {/* Right Mini Google Maps Location Widget (FueGenix Exact Match) */}
            <div className="lg:col-span-4 rounded-2xl overflow-hidden border border-white/10 bg-white/5 p-4 sm:p-5 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-2 text-[#D4AF37] text-xs font-semibold mb-1">
                  <MapPin className="w-4 h-4" />
                  <span>Scottsdale Studio Suite</span>
                </div>
                <p className="text-xs text-white/80 font-light mb-3">
                  5010 E Shea Blvd #200, Scottsdale, AZ 85254
                </p>
              </div>

              {/* Embedded Interactive Map */}
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden border border-white/10 mb-3 bg-[#1A1412]">
                <iframe
                  title="AZ Studio of Electrolysis & Permanent Makeup Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d106423.83756857187!2d-112.053128!3d33.5834107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x872b7556c2a03c1d%3A0x8116d18f0cca7f50!2sArizona%20Studio%20of%20Electrolysis%20%26%20Permanent%20Makeup!5e0!3m2!1sen!2sus!4v1710000000000!5m2!1sen!2sus"
                  className="w-full h-full border-0 opacity-80 hover:opacity-100 transition-opacity"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <a
                href="https://maps.google.com/?q=5010+E+Shea+Blvd+#200,+Scottsdale,+AZ+85254"
                target="_blank"
                rel="noopener noreferrer"
                className="text-center py-2.5 rounded-xl text-[11px] uppercase tracking-wider font-semibold bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                Get Directions on Google Maps
              </a>
            </div>

          </div>

          {/* Bottom Copyright and Agency Credits Line */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/40 gap-4 text-center sm:text-left">
            <p>© 2026 AZ Studio of Electrolysis & Permanent Makeup. All Rights Reserved</p>
            <p className="font-light">
              Designed & Built by{" "}
              <a
                href="https://www.vireva.agency"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-[#D4AF37] transition-colors font-medium tracking-wide"
              >
                VIREVA
              </a>
            </p>
          </div>

        </div>
      </footer>



    </div>
  );
}
