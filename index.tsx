import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { 
  ChevronRight, 
  ChevronDown,
  Menu, 
  X, 
  Globe, 
  ShieldCheck, 
  TrendingUp,
  Smartphone, 
  BookOpen, 
  Users,
  ArrowRight,
  FileText,
  CreditCard,
  Lock,
  Building2
} from "lucide-react";

// --- Data Structure ---

const MENU_STRUCTURE = [
  {
    title: "Tentang Kami",
    items: [
      { name: "Sekilas ASPI", href: "#about" },
      { name: "Peran & Komitmen", href: "#peran" },
      { name: "Badan Pengawas", href: "#pengawas" },
      { name: "Badan Pengurus", href: "#pengurus" },
      { name: "Direktur Eksekutif", href: "#direktur" }
    ]
  },
  {
    title: "Peraturan",
    items: [
      { name: "Buletin ASPI", href: "#buletin" },
      { name: "Ketentuan ASPI", href: "#ketentuan" },
      { name: "Pedoman ASPI", href: "#pedoman" },
      { name: "Peraturan BI", href: "#bi" }
    ]
  },
  {
    title: "Standar & Layanan",
    items: [
      { name: "NSICCS", href: "#nsiccs" },
      { name: "QRIS", href: "#qris" },
      { name: "SNAP", href: "#snap" },
      { name: "Certificate Authority", href: "#ca" },
      { name: "Kartu Logo GPN", href: "#gpn" },
      { name: "Sertifikasi ATM", href: "#atm" },
      { name: "Audit TI", href: "#audit" },
      { name: "Sistem Layanan ASPI (SILA)", href: "#sila" }
    ]
  },
  {
    title: "Berita & Info",
    items: [
      { name: "Berita", href: "#berita" },
      { name: "Laporan Tahunan", href: "#laporan" },
      { name: "Statistik QRIS", href: "#stat-qris" },
      { name: "Statistik Uang Elektronik", href: "#stat-ue" },
      { name: "Statistik APMK", href: "#stat-apmk" }
    ]
  }
];

// --- Logo Component ---

const AspiLogo = ({ className = "h-10", dark = false }) => (
  <svg viewBox="0 0 320 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Circles */}
    <circle cx="30" cy="65" r="28" fill="#003B71" /> {/* Dark Blue - Bottom Left */}
    <circle cx="55" cy="30" r="28" fill="#0077C8" /> {/* Medium Blue - Top Left */}
    <circle cx="85" cy="60" r="28" fill="#00A3E0" /> {/* Cyan - Right */}
    
    {/* Text */}
    <text x="125" y="70" fontFamily="sans-serif" fontWeight="700" fontSize="60" fill="#CE1126">ASPI</text>
    <text x="128" y="92" fontFamily="sans-serif" fontWeight="500" fontSize="11" fill={dark ? "#FFFFFF" : "#003B71"} letterSpacing="0.5">Asosiasi Sistem Pembayaran Indonesia</text>
  </svg>
);

// --- Digital Map Component ---

const DigitalIndonesiaMap = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
        {/* Glow Effect Behind Map */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-aspi-blue-dark/40 blur-[80px] rounded-full"></div>
        
        <svg viewBox="0 0 600 250" className="w-full h-auto drop-shadow-[0_0_15px_rgba(0,163,224,0.5)] z-10" fill="none">
            {/* Connection Lines from Jakarta */}
            <g className="animate-pulse opacity-40">
                <path d="M190 185 L240 70" stroke="#00A3E0" strokeWidth="0.5" strokeDasharray="4 4" /> {/* To Kalimantan */}
                <path d="M190 185 L350 120" stroke="#00A3E0" strokeWidth="0.5" strokeDasharray="4 4" /> {/* To Sulawesi */}
                <path d="M190 185 L540 125" stroke="#00A3E0" strokeWidth="0.5" strokeDasharray="4 4" /> {/* To Papua */}
                <path d="M190 185 L100 95" stroke="#00A3E0" strokeWidth="0.5" strokeDasharray="4 4" />  {/* To Sumatra */}
            </g>

            {/* Sumatra */}
            <g>
                <circle cx="80" cy="80" r="3" fill="#0077C8" className="animate-ping" style={{animationDuration: '3s'}} />
                <circle cx="80" cy="80" r="3" fill="#0077C8" />
                <circle cx="100" cy="95" r="4" fill="#003B71" />
                <circle cx="110" cy="115" r="3" fill="#0077C8" />
                <circle cx="120" cy="135" r="3" fill="#00A3E0" />
                <circle cx="130" cy="155" r="2" fill="#003B71" />
            </g>
            
            {/* Kalimantan */}
            <g>
                <circle cx="220" cy="90" r="3" fill="#003B71" />
                <circle cx="240" cy="70" r="4" fill="#0077C8" />
                <circle cx="260" cy="90" r="4" fill="#00A3E0" />
                <circle cx="250" cy="110" r="3" fill="#003B71" />
                <circle cx="280" cy="100" r="3" fill="#0077C8" />
            </g>

            {/* Java */}
            <g>
                <circle cx="160" cy="180" r="3" fill="#0077C8" />
                {/* Jakarta Hub */}
                <circle cx="190" cy="185" r="8" fill="#CE1126" fillOpacity="0.3" className="animate-ping" />
                <circle cx="190" cy="185" r="4" fill="#CE1126" /> 
                
                <circle cx="220" cy="190" r="3" fill="#003B71" />
                <circle cx="250" cy="188" r="4" fill="#0077C8" />
                <circle cx="280" cy="192" r="3" fill="#00A3E0" />
                <circle cx="310" cy="195" r="2" fill="#003B71" />
            </g>

            {/* Sulawesi */}
            <g>
                <circle cx="340" cy="100" r="2" fill="#0077C8" />
                <circle cx="350" cy="120" r="3" fill="#00A3E0" />
                <circle cx="360" cy="140" r="2" fill="#003B71" />
                <circle cx="370" cy="110" r="3" fill="#0077C8" />
            </g>

            {/* Bali/Nusa */}
            <g>
                <circle cx="340" cy="200" r="2" fill="#00A3E0" />
                <circle cx="360" cy="205" r="2" fill="#003B71" />
                <circle cx="380" cy="200" r="2" fill="#0077C8" />
            </g>

            {/* Papua */}
            <g>
                <circle cx="500" cy="120" r="3" fill="#0077C8" />
                <circle cx="520" cy="130" r="4" fill="#003B71" />
                <circle cx="540" cy="125" r="4" fill="#00A3E0" className="animate-ping" style={{animationDuration: '4s'}} />
                <circle cx="540" cy="125" r="4" fill="#00A3E0" />
                <circle cx="560" cy="140" r="3" fill="#0077C8" />
            </g>
        </svg>

        {/* Floating Info Card */}
        <div className="absolute bottom-10 right-10 p-4 glass-panel rounded-xl shadow-2xl animate-float backdrop-blur-md hidden lg:block" style={{animationDuration: '6s'}}>
            <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-aspi-red animate-pulse"></div>
                <div>
                    <div className="text-[10px] text-gray-400 uppercase tracking-wider">Jangkauan Nasional</div>
                    <div className="text-sm font-bold text-white">38 Provinsi Terhubung</div>
                </div>
            </div>
        </div>
    </div>
  )
}

// --- Components ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 font-sans ${
        scrolled 
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100 py-3" 
          : "bg-white/5 backdrop-blur-sm py-5 border-b border-white/10"
      }`}
      onMouseLeave={() => setActiveDropdown(null)}
    >
      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <div className="cursor-pointer relative z-50" onClick={() => window.scrollTo(0,0)}>
           <AspiLogo className="h-12 w-auto" dark={!scrolled} />
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {MENU_STRUCTURE.map((menu) => (
            <div 
                key={menu.title} 
                className="relative group px-3 py-2"
                onMouseEnter={() => setActiveDropdown(menu.title)}
            >
              <button 
                className={`text-sm font-medium flex items-center gap-1 transition-colors tracking-wide ${
                    scrolled 
                    ? (activeDropdown === menu.title ? "text-aspi-red" : "text-slate-700 hover:text-aspi-red")
                    : (activeDropdown === menu.title ? "text-aspi-blue-light" : "text-gray-200 hover:text-white")
                }`}
              >
                {menu.title}
                <ChevronDown className={`w-3 h-3 transition-transform ${activeDropdown === menu.title ? "rotate-180" : ""}`} />
              </button>
              
              {/* Dropdown Menu */}
              {activeDropdown === menu.title && (
                  <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden py-2 animate-in fade-in slide-in-from-top-2 duration-200 ring-1 ring-black/5">
                      {menu.items.map((item, idx) => (
                          <a 
                            key={idx} 
                            href={item.href}
                            className="block px-6 py-3 text-sm text-slate-600 hover:bg-slate-50 hover:text-aspi-blue-dark transition-colors border-l-4 border-transparent hover:border-aspi-blue-dark"
                          >
                              {item.name}
                          </a>
                      ))}
                  </div>
              )}
            </div>
          ))}
          <a 
            href="#keanggotaan" 
            className={`text-sm font-medium px-3 py-2 transition-colors tracking-wide ${scrolled ? "text-slate-700 hover:text-aspi-red" : "text-gray-200 hover:text-white"}`}
          >
            Keanggotaan
          </a>
          <a 
            href="#kontak" 
            className={`text-sm font-medium px-3 py-2 transition-colors tracking-wide ${scrolled ? "text-slate-700 hover:text-aspi-red" : "text-gray-200 hover:text-white"}`}
          >
            Hubungi Kami
          </a>
        </div>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <button className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded border transition-colors ${scrolled ? "border-slate-300 text-slate-700 hover:border-aspi-red hover:text-aspi-red" : "border-white/20 text-white hover:border-white"}`}>
             ID
          </button>
          <button className={`px-6 py-2.5 text-sm font-semibold rounded-full transition-all text-white shadow-lg hover:shadow-aspi-blue-dark/30 ${
            scrolled ? "bg-aspi-red hover:bg-red-700" : "bg-gradient-to-r from-aspi-red to-red-700 border border-white/10"
          }`}>
            Member Login
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="lg:hidden text-2xl p-2 relative z-50 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen 
            ? <X className={scrolled ? "text-slate-900" : "text-white"} /> 
            : <Menu className={scrolled ? "text-slate-900" : "text-white"} />
          }
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 pt-24 px-6 overflow-y-auto animate-in slide-in-from-right duration-300">
          <div className="flex flex-col gap-2 pb-10">
            {MENU_STRUCTURE.map((menu) => (
                <div key={menu.title} className="border-b border-gray-100">
                    <button 
                        onClick={() => setMobileExpanded(mobileExpanded === menu.title ? null : menu.title)}
                        className="w-full flex justify-between items-center py-4 text-lg font-medium text-slate-900"
                    >
                        {menu.title}
                        <ChevronDown className={`w-5 h-5 transition-transform ${mobileExpanded === menu.title ? "rotate-180 text-aspi-red" : "text-slate-400"}`} />
                    </button>
                    {mobileExpanded === menu.title && (
                        <div className="flex flex-col gap-2 pb-4 pl-4 bg-gray-50 rounded-lg mb-4">
                            {menu.items.map((item, idx) => (
                                <a key={idx} href={item.href} className="py-2 text-slate-600 text-sm hover:text-aspi-red" onClick={() => setMobileMenuOpen(false)}>
                                    {item.name}
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            ))}
            <a href="#keanggotaan" className="py-4 text-lg font-medium text-slate-900 border-b border-gray-100">Keanggotaan</a>
            <a href="#kontak" className="py-4 text-lg font-medium text-slate-900 border-b border-gray-100">Hubungi Kami</a>
            
            <div className="mt-8 flex gap-4">
                <button className="flex-1 py-3 bg-aspi-red text-white rounded-lg font-bold">Login Anggota</button>
                <button className="px-4 py-3 border border-slate-200 rounded-lg font-bold text-slate-600">EN</button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-[110vh] flex items-center bg-aspi-dark overflow-hidden pt-20">
      {/* Sophisticated Background */}
      <div className="absolute inset-0 z-0 bg-[#0B1221]">
        {/* Modern Digital Network Background (More abstract and map-like) */}
        <img 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop" 
            alt="Digital Global Network" 
            className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-screen"
        />

        {/* Gradients derived from Logo */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-aspi-blue-dark/50 rounded-full blur-[120px] -translate-y-1/3 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-aspi-blue-mid/30 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4"></div>
        <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-aspi-cyan/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
        
        {/* Mesh Pattern */}
        <div className="absolute inset-0 hero-pattern opacity-30"></div>
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full glass-panel text-white/90 text-xs font-semibold mb-8 uppercase tracking-widest hover:bg-white/10 transition-colors cursor-default">
            <span className="w-2 h-2 rounded-full bg-aspi-cyan animate-pulse"></span>
            Badan Regulasi Mandiri (SRO)
          </div>
          <h1 className="text-5xl lg:text-7xl font-serif font-bold text-white leading-[1.1] mb-8 drop-shadow-2xl">
            Membangun <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-aspi-cyan via-white to-gray-300">Infrastruktur</span><br/>
            Kepercayaan Digital.
          </h1>
          <p className="text-lg text-gray-400 mb-10 leading-relaxed max-w-xl font-light">
            ASPI memperkuat ekosistem pembayaran Indonesia melalui <span className="text-white font-medium">regulasi yang kokoh</span>, standardisasi inovatif, dan kolaborasi strategis untuk masa depan ekonomi digital.
          </p>
          <div className="flex flex-col sm:flex-row gap-5">
            <button className="px-8 py-4 bg-gradient-to-r from-aspi-red to-[#A00F1E] text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-aspi-red/25 transition-all flex items-center justify-center gap-2 group">
              Lihat Standar <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-transparent border border-white/20 text-white rounded-lg font-semibold hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
              Tentang ASPI
            </button>
          </div>
        </div>

        {/* Hero Visual - Digital Indonesia Map */}
        <div className="hidden lg:block relative h-[500px] w-full perspective-1000">
             <DigitalIndonesiaMap />
        </div>
      </div>
    </section>
  );
};

const StatsBar = () => {
  return (
    <div className="bg-aspi-blue-dark text-white py-16 relative z-20 -mt-20 mx-4 lg:mx-12 rounded-2xl shadow-2xl border-t border-white/10">
      <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {[
          { label: "Anggota Aktif", value: "230+" },
          { label: "Peraturan & Standar", value: "50+" },
          { label: "Transaksi Harian", value: "25Jt+" },
          { label: "Tahun Dedikasi", value: "15+" },
        ].map((stat, idx) => (
          <div key={idx} className="text-center md:text-left md:border-l border-white/10 md:pl-8 first:border-l-0">
            <div className="text-4xl lg:text-5xl font-serif font-bold mb-2 text-aspi-cyan">{stat.value}</div>
            <div className="text-sm text-gray-300 uppercase tracking-widest font-semibold">{stat.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SectionHeading = ({ subtitle, title, dark = false }: { subtitle: string, title: string, dark?: boolean }) => (
  <div className="mb-12">
    <div className="flex items-center gap-3 mb-4">
        <div className="h-px w-8 bg-aspi-red"></div>
        <span className="text-sm font-bold uppercase tracking-widest text-aspi-red">
        {subtitle}
        </span>
    </div>
    <h2 className={`text-3xl lg:text-4xl font-serif font-bold ${dark ? 'text-white' : 'text-slate-900'}`}>
      {title}
    </h2>
  </div>
);

const Features = () => {
  const features = [
    {
      icon: <Smartphone className="w-7 h-7" />,
      title: "Standardisasi",
      desc: "Mengembangkan standar terpadu seperti QRIS dan SNAP untuk memastikan interoperabilitas di seluruh nusantara."
    },
    {
      icon: <Building2 className="w-7 h-7" />,
      title: "Kolaborasi",
      desc: "Menjembatani regulator (Bank Indonesia) dan pelaku industri untuk mendorong dialog yang sehat dan produktif."
    },
    {
      icon: <BookOpen className="w-7 h-7" />,
      title: "Edukasi",
      desc: "Menyediakan sertifikasi dan pelatihan untuk meningkatkan kompetensi profesional sistem pembayaran."
    },
    {
      icon: <ShieldCheck className="w-7 h-7" />,
      title: "Tata Kelola",
      desc: "Menetapkan aturan perilaku yang adil dan pedoman etika untuk ekosistem keuangan yang berkelanjutan."
    }
  ];

  return (
    <section id="about" className="py-32 bg-white scroll-mt-20">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-4">
            <SectionHeading subtitle="Sekilas ASPI" title="Penggerak Utama Keuangan Digital" />
            <p className="text-slate-600 leading-relaxed mb-8 text-lg">
              Sebagai <span className="text-aspi-blue-dark font-semibold">Self-Regulatory Organization (SRO)</span>, ASPI memainkan peran penting dalam membentuk lanskap pembayaran digital Indonesia. 
            </p>
            <p className="text-slate-500 leading-relaxed mb-8">
               Kami memastikan inovasi bertemu dengan keamanan, menciptakan lingkungan di mana bisnis berkembang dan konsumen terlindungi.
            </p>
            <a href="#" className="text-aspi-red font-bold hover:text-red-800 inline-flex items-center gap-2 border-b-2 border-aspi-red/20 hover:border-aspi-red pb-1 transition-all">
              Baca Visi & Misi Kami <ArrowRight className="w-4 h-4"/>
            </a>
          </div>
          <div className="lg:col-span-8 grid md:grid-cols-2 gap-8">
            {features.map((f, i) => (
              <div key={i} className="bg-slate-50 p-10 rounded-2xl hover:bg-white hover:shadow-xl transition-all duration-300 group border border-slate-100">
                <div className="w-14 h-14 bg-white shadow-sm text-aspi-blue-mid rounded-xl flex items-center justify-center mb-6 group-hover:bg-aspi-blue-mid group-hover:text-white transition-colors duration-300">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{f.title}</h3>
                <p className="text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const KeyInitiatives = () => {
  return (
    <section id="initiatives" className="py-32 bg-aspi-dark relative overflow-hidden scroll-mt-20">
      {/* Background decoration */}
      <img 
        src="https://images.unsplash.com/photo-1639322537228-f710d846310a?q=80&w=2032&auto=format&fit=crop" 
        alt="Digital Network"
        className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-color-dodge pointer-events-none"
      />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-aspi-blue-dark/50 blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div className="max-w-2xl">
                <SectionHeading dark subtitle="Standar & Layanan" title="Inisiatif Pembayaran Nasional" />
                <p className="text-gray-400 text-lg">Kami mempelopori implementasi infrastruktur pembayaran inti Indonesia.</p>
            </div>
            <button className="hidden md:flex px-6 py-3 border border-white/20 rounded-full text-white hover:bg-white/10 transition-colors mb-4">
                Lihat Semua Inisiatif
            </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="group relative overflow-hidden rounded-2xl bg-[#131B2E]/80 backdrop-blur-sm border border-white/5 hover:border-aspi-red/50 transition-all duration-500 cursor-pointer hover:-translate-y-2">
                <div className="p-10 h-full flex flex-col">
                    <div className="mb-8 flex justify-between items-start">
                        <div className="p-4 bg-aspi-red/10 rounded-2xl text-aspi-red"><Smartphone className="w-8 h-8"/></div>
                        <h3 className="text-5xl font-serif font-bold text-white/5 group-hover:text-aspi-red/10 transition-colors">01</h3>
                    </div>
                    <h4 className="text-2xl font-bold mb-4 text-white">QRIS</h4>
                    <p className="text-gray-400 mb-8 flex-grow leading-relaxed">
                        Quick Response Code Indonesian Standard. Menyatukan pembayaran non-tunai untuk jutaan pedagang dan konsumen.
                    </p>
                    <div className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white/60 group-hover:text-aspi-red transition-colors">
                        Pelajari Lebih Lanjut <ArrowRight className="w-4 h-4" />
                    </div>
                </div>
            </div>

            {/* Card 2 */}
            <div className="group relative overflow-hidden rounded-2xl bg-[#131B2E]/80 backdrop-blur-sm border border-white/5 hover:border-aspi-blue-light/50 transition-all duration-500 cursor-pointer hover:-translate-y-2">
                <div className="p-10 h-full flex flex-col">
                    <div className="mb-8 flex justify-between items-start">
                         <div className="p-4 bg-aspi-blue-light/10 rounded-2xl text-aspi-blue-light"><Lock className="w-8 h-8"/></div>
                        <h3 className="text-5xl font-serif font-bold text-white/5 group-hover:text-aspi-blue-light/10 transition-colors">02</h3>
                    </div>
                    <h4 className="text-2xl font-bold mb-4 text-white">SNAP</h4>
                    <p className="text-gray-400 mb-8 flex-grow leading-relaxed">
                        Standar Nasional Open API Pembayaran. Memungkinkan integrasi mulus antara bank dan fintech.
                    </p>
                    <div className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white/60 group-hover:text-aspi-blue-light transition-colors">
                        Lihat Dokumen <ArrowRight className="w-4 h-4" />
                    </div>
                </div>
            </div>

             {/* Card 3 */}
             <div className="group relative overflow-hidden rounded-2xl bg-[#131B2E]/80 backdrop-blur-sm border border-white/5 hover:border-aspi-blue-mid/50 transition-all duration-500 cursor-pointer hover:-translate-y-2">
                <div className="p-10 h-full flex flex-col">
                    <div className="mb-8 flex justify-between items-start">
                         <div className="p-4 bg-aspi-blue-mid/10 rounded-2xl text-aspi-blue-mid"><CreditCard className="w-8 h-8"/></div>
                        <h3 className="text-5xl font-serif font-bold text-white/5 group-hover:text-aspi-blue-mid/10 transition-colors">03</h3>
                    </div>
                    <h4 className="text-2xl font-bold mb-4 text-white">GPN</h4>
                    <p className="text-gray-400 mb-8 flex-grow leading-relaxed">
                        Gerbang Pembayaran Nasional. Menciptakan gerbang pembayaran nasional yang berdaulat dan saling terhubung.
                    </p>
                    <div className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white/60 group-hover:text-aspi-blue-mid transition-colors">
                        Selengkapnya <ArrowRight className="w-4 h-4" />
                    </div>
                </div>
            </div>
        </div>
      </div>
    </section>
  );
};

const NewsSection = () => {
    const news = [
        { 
            category: "Peraturan", 
            date: "24 Okt 2023", 
            title: "Pedoman Baru Pembayaran QR Lintas Batas Dirilis", 
            image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=800"
        },
        { 
            category: "Acara", 
            date: "12 Nov 2023", 
            title: "Rapat Umum Tahunan ASPI: Membentuk Strategi 2024", 
            image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=800"
        },
        { 
            category: "Siaran Pers", 
            date: "01 Des 2023", 
            title: "Adopsi BI-FAST Melampaui 1 Miliar Transaksi", 
            image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=800"
        },
    ];

    return (
        <section id="news" className="py-32 bg-gray-50 scroll-mt-20">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="flex justify-between items-end mb-16">
                    <SectionHeading subtitle="Berita & Info" title="Wawasan Terkini" />
                    <a href="#" className="hidden md:inline-flex items-center gap-2 text-aspi-blue-dark font-bold hover:underline mb-8">
                        Lihat Semua Berita <ArrowRight className="w-4 h-4"/>
                    </a>
                </div>

                <div className="grid md:grid-cols-3 gap-10">
                    {news.map((item, idx) => (
                        <div key={idx} className="group cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                            <div className="aspect-[4/3] bg-gray-200 overflow-hidden relative">
                                <img 
                                    src={item.image} 
                                    alt={item.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur px-3 py-1 rounded text-xs font-bold uppercase tracking-wide text-aspi-blue-dark shadow-sm">
                                    {item.category}
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="text-xs font-semibold text-gray-400 mb-3 uppercase tracking-wider">{item.date}</div>
                                <h3 className="text-xl font-bold text-slate-900 group-hover:text-aspi-blue-dark transition-colors leading-tight mb-4">
                                    {item.title}
                                </h3>
                                <div className="flex items-center text-aspi-red font-semibold text-sm group-hover:translate-x-1 transition-transform">
                                    Baca Artikel <ArrowRight className="w-3 h-3 ml-1" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

const Footer = () => {
    return (
        <footer className="bg-[#0B1221] text-white pt-24 pb-12 border-t border-white/5 font-sans">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="grid md:grid-cols-4 gap-16 mb-20">
                    <div className="col-span-1 md:col-span-2">
                         <div className="mb-8">
                            <AspiLogo className="h-10 w-auto" dark={true} />
                        </div>
                        <p className="text-gray-400 max-w-sm mb-8 leading-relaxed text-lg">
                            Mewujudkan sistem pembayaran yang efisien, aman, dan andal untuk mendorong pertumbuhan ekonomi digital Indonesia.
                        </p>
                        <div className="flex gap-4">
                            {/* Social Placeholders */}
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="w-10 h-10 rounded-full bg-white/5 hover:bg-aspi-blue-mid flex items-center justify-center transition-colors cursor-pointer text-white/60 hover:text-white border border-white/5">
                                    <Globe className="w-5 h-5"/>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest mb-8 text-white">Tautan Cepat</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li><a href="#about" className="hover:text-aspi-cyan transition-colors">Tentang Kami</a></li>
                            <li><a href="#regulations" className="hover:text-aspi-cyan transition-colors">Peraturan</a></li>
                            <li><a href="#standards" className="hover:text-aspi-cyan transition-colors">Standar & Layanan</a></li>
                            <li><a href="#keanggotaan" className="hover:text-aspi-cyan transition-colors">Keanggotaan</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest mb-8 text-white">Hubungi Kami</h4>
                        <address className="text-gray-400 not-italic leading-loose">
                            Gedung Tifa Arum Realty,<br/>
                            Jl. Kuningan Barat 1 No.26,<br/>
                            Jakarta Selatan 12710<br/>
                            <a href="mailto:info@aspi.or.id" className="text-white hover:text-aspi-cyan transition-colors">info@aspi.or.id</a>
                        </address>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} ASPI Indonesia. Hak Cipta Dilindungi.</p>
                    <div className="flex gap-8 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white transition-colors">Kebijakan Privasi</a>
                        <a href="#" className="hover:text-white transition-colors">Syarat Layanan</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

const App = () => {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <Hero />
      <StatsBar />
      <Features />
      <KeyInitiatives />
      <NewsSection />
      <Footer />
    </div>
  );
};

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}