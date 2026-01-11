import React, { useState, useEffect, useRef } from "react";
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
  Building2,
  Download,
  ExternalLink,
  User,
  CheckCircle2,
  MapPin,
  Phone,
  Mail,
  Calendar,
  Server,
  ArrowLeftRight,
  Image as ImageIcon,
  PlayCircle,
  Info,
  Sparkles,
  HelpCircle,
  FileBadge2,
  BarChart3,
  Search,
  Settings,
  Cpu,
  Video,
  Eye,
  ArrowUp,
  Loader2,
  Bell,
  CheckCircle,
  XCircle,
  Home
} from "lucide-react";

// --- Toast System ---
type ToastType = 'success' | 'info' | 'error';
interface ToastMessage {
  id: number;
  message: string;
  type: ToastType;
}

// Simple event bus for Toasts to avoid prop drilling
const dispatchToast = (message: string, type: ToastType = 'info') => {
  const event = new CustomEvent('add-toast', { detail: { message, type } });
  window.dispatchEvent(event);
};

// Replacement for simulateAction
const simulateAction = (message: string) => {
    dispatchToast(message, 'success');
};

const ToastContainer = () => {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    const handleToast = (e: any) => {
      const newToast = { 
        id: Date.now(), 
        message: e.detail.message, 
        type: e.detail.type 
      };
      setToasts((prev) => [...prev, newToast]);
      
      // Auto dismiss
      setTimeout(() => {
        setToasts((prev) => prev.filter(t => t.id !== newToast.id));
      }, 3000);
    };

    window.addEventListener('add-toast', handleToast);
    return () => window.removeEventListener('add-toast', handleToast);
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => (
        <div 
          key={toast.id} 
          className="bg-white/90 backdrop-blur-md border border-slate-200 shadow-2xl p-4 rounded-2xl flex items-center gap-4 min-w-[300px] animate-in slide-in-from-right-full duration-300 pointer-events-auto"
        >
          <div className={`p-2 rounded-full ${
            toast.type === 'success' ? 'bg-green-100 text-green-600' : 
            toast.type === 'error' ? 'bg-red-100 text-red-600' : 
            'bg-blue-100 text-blue-600'
          }`}>
            {toast.type === 'success' ? <CheckCircle className="w-5 h-5" /> : 
             toast.type === 'error' ? <XCircle className="w-5 h-5" /> : 
             <Info className="w-5 h-5" />}
          </div>
          <div>
            <h4 className="text-sm font-bold text-slate-900 capitalize">{toast.type}</h4>
            <p className="text-xs text-slate-500 font-medium">{toast.message}</p>
          </div>
          <button 
            onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
            className="ml-auto text-slate-400 hover:text-slate-600"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

// --- Tooltip Component ---
const Tooltip = ({ text, children }: { text: string; children?: React.ReactNode }) => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative inline-block" onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
      {children}
      {visible && (
        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 p-2 bg-aspi-dark text-white text-[10px] rounded shadow-xl z-50 animate-in fade-in zoom-in duration-200 backdrop-blur-md border border-white/10 pointer-events-none">
          {text}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-aspi-dark"></div>
        </div>
      )}
    </div>
  );
};

// --- CountUp Component ---
const CountUp = ({ end, duration = 2000, suffix = "" }: { end: string, duration?: number, suffix?: string }) => {
    const [count, setCount] = useState(0);
    
    // Improved Parsing: Retain dots for decimals, remove other non-numeric chars
    const numericEnd = parseFloat(end.replace(/[^0-9.]/g, '')) || 0;
    const isFloating = end.includes('.');

    useEffect(() => {
        let start = 0;
        const steps = duration / 16; // 60fps assumption
        const increment = numericEnd / steps;
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= numericEnd) {
                setCount(numericEnd);
                clearInterval(timer);
            } else {
                setCount(start);
            }
        }, 16);
        return () => clearInterval(timer);
    }, [numericEnd, duration]);

    const display = isFloating ? count.toFixed(1) : Math.floor(count).toString();

    return <span>{display}{suffix}</span>;
};

// --- Animated Chart Component ---
const SimpleChart = ({ data, color = "#CE1126" }: { data: number[], color?: string }) => {
    const [mounted, setMounted] = useState(false);
    const max = Math.max(...data);

    useEffect(() => {
        const timer = setTimeout(() => setMounted(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="w-full h-full flex items-end justify-between gap-2 pt-8 px-4">
            {data.map((val, i) => (
                <div key={i} className="relative flex-1 flex flex-col justify-end group cursor-pointer">
                    <div 
                        className="w-full rounded-t-lg transition-all duration-[1500ms] ease-out hover:brightness-110 relative overflow-hidden"
                        style={{ 
                            height: mounted ? `${(val / max) * 100}%` : '0%', 
                            backgroundColor: color,
                            opacity: 0.8
                        }}
                    >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-8 left-1/2 -translate-x-1/2 text-[10px] font-bold bg-slate-800 text-white px-2 py-1 rounded transition-opacity whitespace-nowrap z-10 shadow-lg">
                        {val}%
                    </div>
                </div>
            ))}
        </div>
    )
}

// --- Search Overlay Component ---
const SearchOverlay = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [query, setQuery] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current?.focus(), 100);
        }
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!isOpen) return null;

    const allItems = MENU_STRUCTURE.flatMap(cat => cat.items.map(item => ({ ...item, category: cat.title })));
    const filtered = allItems.filter(item => 
        item.name.toLowerCase().includes(query.toLowerCase()) || 
        item.category.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-md flex justify-center items-start pt-24 px-4 animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 ring-1 ring-slate-900/5">
                <div className="flex items-center border-b border-slate-100 p-4">
                    <Search className="w-5 h-5 text-slate-400 mr-3" />
                    <input 
                        ref={inputRef}
                        type="text" 
                        placeholder="Cari layanan, regulasi, atau informasi..." 
                        className="flex-1 outline-none text-lg font-medium text-slate-700 placeholder:text-slate-400"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={(e) => e.key === 'Escape' && onClose()}
                    />
                    <button onClick={onClose} className="p-1 hover:bg-slate-100 rounded-lg transition-colors">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider border border-slate-200 px-2 py-1 rounded-md">ESC</span>
                    </button>
                </div>
                <div className="max-h-[60vh] overflow-y-auto p-2">
                    {query === "" && (
                        <div className="p-4">
                            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">Sering Dicari</h4>
                            <div className="flex flex-wrap gap-2">
                                {["QRIS", "SNAP", "Anggota", "Regulasi"].map(tag => (
                                    <button 
                                        key={tag} 
                                        onClick={() => setQuery(tag)} 
                                        className="px-3 py-1.5 bg-slate-50 hover:bg-aspi-blue-dark/5 text-slate-600 hover:text-aspi-blue-dark rounded-lg text-sm font-medium transition-colors border border-slate-100"
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                    {filtered.length > 0 ? (
                        <div className="space-y-1">
                            {filtered.map((item, i) => (
                                <a 
                                    key={i} 
                                    href={item.href} 
                                    onClick={onClose}
                                    className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl group transition-colors"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-aspi-blue-dark/5 text-aspi-blue-dark flex items-center justify-center group-hover:bg-aspi-blue-dark group-hover:text-white transition-colors">
                                            <ChevronRight className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-bold text-slate-800">{item.name}</div>
                                            <div className="text-[10px] text-slate-400 font-medium">{item.category}</div>
                                        </div>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-aspi-blue-dark -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                                </a>
                            ))}
                        </div>
                    ) : (
                        <div className="p-8 text-center text-slate-400">
                            <Search className="w-12 h-12 mx-auto mb-3 opacity-20" />
                            <p className="text-sm">Tidak ditemukan hasil untuk "{query}"</p>
                        </div>
                    )}
                </div>
                <div className="p-3 bg-slate-50 border-t border-slate-100 text-center text-[10px] text-slate-400 font-medium">
                    Tekan <strong className="text-slate-600">Enter</strong> untuk memilih • <strong className="text-slate-600">Escape</strong> untuk menutup
                </div>
            </div>
        </div>
    );
};

// --- Breadcrumbs Component ---
const Breadcrumbs = ({ category, page }: { category: string, page: string }) => (
    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/50 mb-8 animate-in fade-in slide-in-from-left-4 duration-700 delay-100">
        <a href="#home" className="hover:text-white transition-colors"><Home className="w-3 h-3" /></a>
        <ChevronRight className="w-3 h-3 text-white/30" />
        <span className="text-white/70">{category}</span>
        <ChevronRight className="w-3 h-3 text-white/30" />
        <span className="text-aspi-cyan">{page}</span>
    </div>
);

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
      { name: "Statistik APMK", href: "#stat-apmk" },
      { name: "Statistik DC & IP", href: "#stat-dcip" },
      { name: "Transfer", href: "#transfer" },
      { name: "Galeri Foto", href: "#galeri-foto" },
      { name: "Galeri Video", href: "#galeri-video" }
    ]
  },
  {
    title: "Layanan Umum",
    items: [
        { name: "Kontak", href: "#kontak" },
        { name: "Keanggotaan", href: "#keanggotaan" }
    ]
  }
];

const GpnLogo = ({ className = "h-6" }) => (
    <svg viewBox="0 0 100 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
       <rect width="100" height="40" rx="4" fill="white"/>
       <path d="M15 10H85" stroke="#CE1126" strokeWidth="2" strokeOpacity="0.1"/>
       <text x="50" y="28" textAnchor="middle" fontFamily="'Public Sans', sans-serif" fontWeight="900" fontSize="22" fill="#CE1126" letterSpacing="2">GPN</text>
    </svg>
);

const PAGES_DATA: Record<string, PageContent> = {
  "#about": {
    category: "Tentang Kami",
    title: "Sekilas ASPI",
    subtitle: "Meningkatkan peran pelaku sistem pembayaran di Indonesia",
    content: (
      <div className="space-y-12 text-slate-600 leading-relaxed font-sans">
        <div>
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6 tracking-tight italic">Peran ASPI dalam industri sistem pembayaran</h3>
            <p className="text-base md:text-lg leading-relaxed text-slate-700 font-normal">
                ASPI memiliki peran, tugas dan fungsi membuat ketentuan dalam industri sistem pembayaran yang bersifat teknis dan mikro guna mendukung fungsi Bank Indonesia sebagai regulator agar terciptanya sistem pembayaran yang efisien, aman dan andal.
            </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="p-6 bg-aspi-dark text-white rounded-2xl text-center shadow-lg transform hover:-translate-y-1 transition-all border border-white/10">
                <div className="text-3xl md:text-4xl font-black text-aspi-blue-light mb-2"><CountUp end="2010" /></div>
                <div className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-80">Didirikan tahun</div>
            </div>
            <div className="p-6 bg-white border border-slate-100 rounded-2xl text-center shadow-sm hover:shadow-xl transition-all">
                <div className="text-3xl md:text-4xl font-black text-aspi-blue-dark mb-2"><CountUp end="250" suffix="+" /></div>
                <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">Anggota aktif</div>
            </div>
            <div className="p-6 bg-white border border-slate-100 rounded-2xl text-center shadow-sm hover:shadow-xl transition-all">
                <div className="text-3xl md:text-4xl font-black text-aspi-blue-mid mb-2"><CountUp end="120" suffix="+" /></div>
                <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500">Anggota Bank</div>
            </div>
            <div className="p-6 bg-white border border-slate-100 rounded-2xl text-center shadow-sm hover:shadow-xl transition-all">
                <div className="text-3xl md:text-4xl font-black text-aspi-red mb-2"><CountUp end="120" suffix="+" /></div>
                <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500">Anggota Non Bank</div>
            </div>
        </div>

        <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-8 md:p-10 rounded-[2.5rem] border border-blue-100 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-aspi-blue-light/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000"></div>
            <div className="relative z-10">
                <h3 className="text-sm font-black text-aspi-red uppercase tracking-[0.3em] mb-8 flex items-center gap-3">
                    <div className="w-8 h-1 bg-aspi-red rounded-full"></div>
                    Visi & Misi
                </h3>
                <p className="mb-8 text-lg font-medium text-slate-700 leading-relaxed">
                    ASPI diberikan kewenangan oleh Bank Indonesia dalam lingkup mikro dan teknis untuk membuat aturan main dalam industri sistem pembayaran.
                </p>
                
                <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border-l-[6px] border-aspi-blue-dark hover:shadow-2xl transition-all">
                    <h4 className="text-aspi-blue-dark font-black uppercase tracking-[0.2em] text-[11px] mb-4">Visi Misi Utama</h4>
                    <p className="text-xl md:text-2xl font-extrabold text-slate-900 leading-snug tracking-tight italic">
                        "Mewujudkan Sistem Pembayaran Nasional yang lebih efisien, aman, andal, cepat, dan terintegrasi dalam menuju Less Cash Society"
                    </p>
                </div>
            </div>
        </div>
      </div>
    )
  },
  "#peran": {
    category: "Tentang Kami",
    title: "Peran & Komitmen",
    subtitle: "Tanggung Jawab Kami Terhadap Ekosistem",
    content: (
      <div className="space-y-10 text-slate-700 font-sans">
        <p className="text-lg leading-relaxed font-light">
          ASPI berperan sebagai Badan Regulasi Mandiri (SRO) yang mengelola standar teknis dan operasional untuk memastikan interoperabilitas dan keamanan di antara seluruh penyelenggara sistem pembayaran di Indonesia.
        </p>
        <div className="grid md:grid-cols-2 gap-8">
            <div className="p-8 bg-gradient-to-br from-white to-aspi-blue-light/5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all">
                <ShieldCheck className="w-8 h-8 text-aspi-blue-mid mb-4" />
                <h4 className="text-lg font-extrabold text-slate-900 mb-2 italic">Penetapan Standar</h4>
                <p className="text-sm leading-relaxed text-slate-500 font-medium">Menyusun dan menetapkan standar teknis (seperti QRIS dan SNAP) guna menciptakan efisiensi sistem pembayaran nasional.</p>
            </div>
            <div className="p-8 bg-gradient-to-br from-white to-aspi-red/5 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all">
                <Users className="w-8 h-8 text-aspi-red mb-4" />
                <h4 className="text-lg font-extrabold text-slate-900 mb-2 italic">Advokasi Anggota</h4>
                <p className="text-sm leading-relaxed text-slate-500 font-medium">Menjadi jembatan komunikasi antara pelaku industri dengan Bank Indonesia sebagai regulator utama.</p>
            </div>
        </div>
      </div>
    )
  },
  "#pengawas": {
    category: "Tentang Kami",
    title: "Badan Pengawas",
    subtitle: "Dewan Pengawas ASPI Periode 2021-2024",
    content: (
      <div className="space-y-8 font-sans">
         <div className="grid gap-4">
            {[
                { name: "Santoso Liem", pos: "Ketua Dewan Pengawas", institution: "PT Bank Central Asia Tbk" },
                { name: "Handayani", pos: "Anggota Dewan Pengawas", institution: "PT Bank Rakyat Indonesia (Persero) Tbk" },
                { name: "Timothy Utama", pos: "Anggota Dewan Pengawas", institution: "PT Bank Mandiri (Persero) Tbk" },
                { name: "Rico Usthavia Frans", pos: "Anggota Dewan Pengawas", institution: "ALTO Network" }
            ].map((person, i) => (
                <div key={i} className="flex items-center gap-6 p-6 bg-white shadow-sm border border-slate-100 rounded-2xl hover:shadow-md transition-all hover:bg-gradient-to-r hover:from-white hover:to-slate-50 group">
                    <div className="w-14 h-14 bg-aspi-blue-dark/5 rounded-full flex items-center justify-center text-aspi-blue-dark shrink-0 group-hover:bg-aspi-blue-dark group-hover:text-white transition-all shadow-sm">
                        <User className="w-6 h-6"/>
                    </div>
                    <div>
                        <div className="text-lg font-extrabold text-slate-900 leading-tight italic tracking-tight">{person.name}</div>
                        <div className="text-xs font-black text-aspi-red uppercase tracking-wider mt-1">{person.pos}</div>
                        <div className="text-xs font-bold text-slate-500 mt-0.5">{person.institution}</div>
                    </div>
                </div>
            ))}
         </div>
      </div>
    )
  },
  "#pengurus": {
    category: "Tentang Kami",
    title: "Badan Pengurus",
    subtitle: "Struktur Organisasi Harian",
    content: (
      <div className="space-y-10 font-sans">
        <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-aspi-blue-dark/5 blur-3xl"></div>
            <h3 className="text-xl font-black text-slate-900 mb-8 border-b border-slate-50 pb-4 italic tracking-tight">Komite Eksekutif</h3>
            <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="w-32 font-black text-aspi-red uppercase text-[10px] tracking-[0.2em]">Ketua Umum</div>
                    <div className="text-lg font-extrabold text-slate-900 italic">Santoso</div>
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="w-32 font-black text-aspi-blue-dark uppercase text-[10px] tracking-[0.2em]">Wakil Ketua</div>
                    <div className="text-lg font-extrabold text-slate-900 italic">Dina Artarini</div>
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="w-32 font-black text-aspi-blue-dark uppercase text-[10px] tracking-[0.2em]">Sekjen</div>
                    <div className="text-lg font-extrabold text-slate-900 italic">Handayani</div>
                </div>
            </div>
        </div>
      </div>
    )
  },
  "#direktur": {
    category: "Tentang Kami",
    title: "Direktur Eksekutif",
    subtitle: "Pimpinan Operasional ASPI",
    content: (
      <div className="flex flex-col md:flex-row gap-10 items-start font-sans">
         <div className="w-full md:w-5/12 aspect-[3/4] bg-slate-200 rounded-3xl overflow-hidden relative shadow-2xl group">
            <div className="absolute inset-0 bg-slate-200 animate-pulse z-0"></div>
            <img src="https://images.unsplash.com/photo-1560250097-0b9358eac341?q=80&w=800" alt="Executive Director" className="object-cover w-full h-full grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000 relative z-10" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-aspi-blue-dark/80 to-transparent flex items-end p-6 z-20">
                <div className="text-white">
                    <div className="text-xl font-black italic">Anggoro Eko Cahyo</div>
                    <div className="opacity-80 text-[10px] uppercase tracking-widest mt-1 font-bold">Direktur Eksekutif</div>
                </div>
            </div>
         </div>
         <div className="flex-1 space-y-6 text-slate-700">
            <h3 className="text-2xl font-extrabold text-slate-900 italic tracking-tight underline decoration-aspi-red decoration-2 underline-offset-8">Visi Strategis</h3>
            <p className="leading-relaxed text-base font-light">Mengarahkan ASPI sebagai motor penggerak digitalisasi keuangan nasional melalui standardisasi yang inklusif dan progresif.</p>
            <div className="pt-6 border-t border-slate-100">
                <ul className="space-y-4">
                    <li className="flex items-center gap-3 font-bold text-sm text-slate-800"><CheckCircle2 className="w-5 h-5 text-aspi-red"/>Akselerasi Open Banking (SNAP)</li>
                    <li className="flex items-center gap-3 font-bold text-sm text-slate-800"><CheckCircle2 className="w-5 h-5 text-aspi-red"/>Hilirisasi Standar Nasional (QRIS)</li>
                </ul>
            </div>
         </div>
      </div>
    )
  },
  "#buletin": {
    category: "Peraturan",
    title: "Buletin ASPI",
    subtitle: "Publikasi Resmi & Update Industri",
    content: (
      <div className="space-y-6 font-sans">
          {[
              { title: "Buletin Edisi Q3 2024", date: "Oktober 2024", tag: "Edisi Terbaru" },
              { title: "Buletin Edisi Q2 2024", date: "Juli 2024", tag: "Arsip" },
              { title: "Buletin Edisi Q1 2024", date: "April 2024", tag: "Arsip" }
          ].map((item, i) => (
              <div key={i} className="flex items-center justify-between p-6 bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:bg-gradient-to-r hover:from-white hover:to-blue-50/30 transition-all cursor-pointer group active:scale-[0.98]" onClick={() => simulateAction(`Mengunduh ${item.title}...`)}>
                  <div className="flex items-center gap-5">
                      <div className="p-3 bg-aspi-blue-dark/5 text-aspi-blue-dark rounded-xl group-hover:bg-aspi-blue-dark group-hover:text-white transition-all transform group-hover:rotate-6 shadow-sm"><FileText className="w-6 h-6"/></div>
                      <div>
                          <div className="text-base font-extrabold text-slate-900 tracking-tight italic">{item.title}</div>
                          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{item.date}</div>
                      </div>
                  </div>
                  <Download className="w-5 h-5 text-slate-300 group-hover:text-aspi-red transition-all transform group-hover:scale-110"/>
              </div>
          ))}
      </div>
    )
  },
  "#ketentuan": {
    category: "Peraturan",
    title: "Ketentuan ASPI",
    subtitle: "Regulasi Operasional Anggota",
    content: (
        <div className="space-y-4 font-sans">
            {[
                "Ketentuan Penyelenggaraan QRIS 2024",
                "Ketentuan Batas Maksimal Biaya Layanan",
                "Ketentuan Manajemen Risiko Transaksi Digital",
                "Ketentuan Pelaporan Insiden Siber Berkala"
            ].map((rule, i) => (
                <div key={i} className="flex items-center justify-between p-5 bg-gradient-to-r from-slate-50 to-white rounded-xl hover:bg-white hover:shadow-lg transition-all cursor-pointer group active:scale-[0.98]" onClick={() => simulateAction(`Melihat ${rule}`)}>
                    <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-full bg-white border border-slate-100 flex items-center justify-center text-[10px] font-black text-slate-400 group-hover:bg-aspi-red group-hover:text-white transition-colors">{i+1}</div>
                        <span className="font-bold text-slate-800 text-sm tracking-tight">{rule}</span>
                    </div>
                    <Eye className="w-5 h-5 text-slate-300 group-hover:text-aspi-blue-mid transition-all"/>
                </div>
            ))}
        </div>
    )
  },
  "#pedoman": {
    category: "Peraturan",
    title: "Pedoman ASPI",
    subtitle: "Dokumen Panduan Teknis & Implementasi",
    content: (
      <div className="grid md:grid-cols-2 gap-6 font-sans">
        {[
          { title: "Panduan Implementasi SNAP", desc: "Dokumen teknis tata kelola Open API." },
          { title: "Pedoman Keamanan Siber", desc: "Standar mitigasi risiko ancaman digital." },
          { title: "Pedoman Tata Kelola Anggota", desc: "Etika dan prosedur operasional organisasi." },
          { title: "Standardisasi Operasional ATM", desc: "Protokol keamanan fisik dan logik ATM." }
        ].map((item, i) => (
          <div key={i} className="p-8 bg-gradient-to-br from-white to-slate-50 border border-slate-100 rounded-3xl shadow-sm hover:shadow-xl transition-all cursor-pointer group active:scale-[0.98]" onClick={() => simulateAction(`Mengunduh ${item.title}`)}>
             <div className="flex justify-between items-start mb-6">
                <div className="p-4 bg-white shadow-sm border border-slate-100 text-aspi-blue-dark rounded-2xl group-hover:bg-aspi-blue-dark group-hover:text-white transition-all transform group-hover:rotate-12"><BookOpen className="w-6 h-6"/></div>
                <Download className="w-4 h-4 text-slate-300 group-hover:text-aspi-red"/>
             </div>
             <h4 className="text-lg font-extrabold text-slate-900 mb-2 tracking-tight italic">{item.title}</h4>
             <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    )
  },
  "#bi": {
    category: "Peraturan",
    title: "Peraturan Bank Indonesia",
    subtitle: "Regulasi Utama Sistem Pembayaran",
    content: (
       <div className="space-y-4 font-sans">
           {[
               { title: "PBI No. 23/6/PBI/2021", desc: "Tentang Penyedia Jasa Pembayaran" },
               { title: "PBI No. 22/23/PBI/2020", desc: "Tentang Sistem Pembayaran" },
               { title: "PADG No. 24/7/PADG/2022", desc: "Penyelenggaraan Sistem Pembayaran oleh PJP" }
           ].map((item, i) => (
               <div key={i} className="p-6 bg-white rounded-2xl border border-slate-100 flex items-center justify-between hover:border-aspi-red hover:bg-gradient-to-l hover:from-aspi-red/5 hover:to-white transition-all cursor-pointer group active:scale-[0.99]" onClick={() => simulateAction(`Mengarahkan ke situs BI untuk ${item.title}...`)}>
                   <div>
                       <div className="font-black text-aspi-blue-dark text-sm mb-1 italic tracking-widest">{item.title}</div>
                       <div className="text-slate-500 text-xs font-bold">{item.desc}</div>
                   </div>
                   <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-aspi-red transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"/>
               </div>
           ))}
       </div>
    )
  },
  "#nsiccs": {
    category: "Standar & Layanan",
    title: "NSICCS",
    subtitle: "Standar Nasional Teknologi Kartu Chip",
    content: (
        <div className="space-y-10 font-sans">
            <p className="text-lg text-slate-700 leading-relaxed font-light">National Standard Indonesian Chip Card Specification (NSICCS) adalah standar nasional teknologi chip untuk kartu ATM/Debit di Indonesia.</p>
            <div className="bg-aspi-dark text-white p-10 rounded-[2.5rem] relative overflow-hidden group shadow-2xl">
                <div className="relative z-10">
                    <h4 className="text-xl font-black mb-6 flex items-center gap-3 italic tracking-tight"><ShieldCheck className="w-6 h-6 text-aspi-cyan"/> Keamanan Transaksi</h4>
                    <ul className="space-y-4 text-sm font-medium opacity-80">
                        <li className="flex gap-4"><CheckCircle2 className="w-5 h-5 text-aspi-cyan shrink-0"/> Melindungi dari penggandaan data kartu (skimming) secara end-to-end.</li>
                        <li className="flex gap-4"><CheckCircle2 className="w-5 h-5 text-aspi-cyan shrink-0"/> Memastikan interoperabilitas penuh antar penyedia jaringan switching.</li>
                    </ul>
                </div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-aspi-blue-mid/20 blur-[100px] group-hover:bg-aspi-blue-mid/40 transition-colors"></div>
                <Cpu className="absolute -bottom-10 -right-10 w-40 h-40 text-white/5 rotate-12" />
            </div>
        </div>
    )
  },
  "#qris": {
    category: "Standar & Layanan",
    title: "QRIS",
    subtitle: "Quick Response Code Indonesian Standard",
    content: (
      <div className="space-y-10 text-slate-600 font-sans">
        <div className="relative h-64 md:h-96 w-full rounded-3xl overflow-hidden shadow-2xl mb-8 group">
             <div className="absolute inset-0 bg-slate-200 animate-pulse z-0"></div>
             <img src="https://images.unsplash.com/photo-1595079676339-1534801fafde?q=80&w=1200&auto=format&fit=crop" alt="QRIS Usage" loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 group-hover:saturate-150 relative z-10" />
             <div className="absolute inset-0 bg-gradient-to-r from-aspi-blue-dark/80 via-aspi-blue-dark/20 to-transparent flex items-center px-8 md:px-12 z-20">
                 <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-[1.1] tracking-tighter animate-in slide-in-from-left duration-700 italic">Satu QR <br/>Untuk Semua <br/>Aplikasi.</h3>
             </div>
        </div>
        <div className="max-w-3xl">
            <p className="text-lg leading-relaxed mb-6 font-light">
                <strong className="font-bold text-slate-900 italic">QRIS (Dibaca KRIS)</strong> adalah penyatuan berbagai macam QR dari berbagai Penyelenggara Jasa Sistem Pembayaran (PJSP) menggunakan QR Code standar nasional.
            </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-gradient-to-br from-white to-slate-50 p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:-translate-y-2 transition-transform hover:shadow-2xl group active:scale-[0.99]">
                <h4 className="text-xl font-extrabold text-slate-900 mb-6 tracking-tight italic">Manfaat Bagi Merchant</h4>
                <ul className="space-y-4">
                    {["Cukup satu QR Code untuk semua aplikasi.", "Mengurangi biaya pengelolaan uang tunai.", "Transaksi tercatat otomatis and real-time."].map((item, i) => (
                        <li key={i} className="flex gap-3 text-sm font-medium leading-relaxed text-slate-600">
                            <CheckCircle2 className="w-5 h-5 text-aspi-red shrink-0 group-hover:scale-110 transition-transform"/> {item}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="bg-gradient-to-br from-white to-aspi-blue-light/5 p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:-translate-y-2 transition-transform hover:shadow-2xl group active:scale-[0.99]">
                <h4 className="text-xl font-extrabold text-slate-900 mb-6 tracking-tight italic">Manfaat Bagi Pengguna</h4>
                <ul className="space-y-4">
                    {["Cepat dan praktis, tinggal scan.", "Tidak perlu repot membawa uang tunai.", "Aman karena diawasi Bank Indonesia."].map((item, i) => (
                        <li key={i} className="flex gap-3 text-sm font-medium leading-relaxed text-slate-600">
                            <CheckCircle2 className="w-5 h-5 text-aspi-blue-light shrink-0 group-hover:scale-110 transition-transform"/> {item}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
      </div>
    )
  },
  "#snap": {
    category: "Standar & Layanan",
    title: "SNAP",
    subtitle: "Standar Nasional Open API Pembayaran",
    content: (
        <div className="space-y-10 font-sans">
             <div className="bg-slate-900 text-white p-12 rounded-[2.5rem] relative overflow-hidden flex items-center justify-between gap-10 shadow-2xl">
                <div className="relative z-10 max-w-lg">
                    <div className="inline-block px-4 py-1 bg-aspi-blue-light/20 text-aspi-blue-light rounded-full text-[9px] font-black uppercase tracking-[0.3em] mb-6 border border-aspi-blue-light/30 shadow-sm">API STANDARD</div>
                    <h3 className="text-3xl font-black mb-4 italic tracking-tight">Interkoneksi Tanpa Hambatan</h3>
                    <p className="opacity-70 text-base font-light">SNAP menyeragamkan bahasa komunikasi antar aplikasi perbankan and fintech untuk efisiensi sistem nasional.</p>
                </div>
                <div className="relative z-10 hidden md:block">
                     <Lock className="w-20 h-20 text-aspi-blue-light opacity-30 animate-pulse"/>
                </div>
                <div className="absolute -left-10 -top-10 w-40 h-40 bg-aspi-blue-dark/50 rounded-full blur-3xl opacity-50"></div>
             </div>
             <p className="text-lg leading-relaxed text-slate-700 font-light">Tujuan utama SNAP adalah menciptakan ekosistem sistem pembayaran yang efisien, aman, and andal melalui standardisasi teknis, keamanan, and tata kelola API secara nasional.</p>
        </div>
    )
  },
  "#ca": {
    category: "Standar & Layanan",
    title: "Certificate Authority",
    subtitle: "Otentikasi & Keamanan Data Digital",
    content: (
        <div className="space-y-10 font-sans">
             <div className="grid md:grid-cols-3 gap-6">
                 {[
                     { title: "Keamanan", icon: <Lock />, desc: "Menjamin enkripsi data sensitif dalam jaringan transaksi." },
                     { title: "Integritas", icon: <ShieldCheck />, desc: "Memastikan data tidak dimanipulasi pihak luar saat transmisi." },
                     { title: "Otentikasi", icon: <CheckCircle2 />, desc: "Verifikasi identitas entitas pengirim data secara digital." }
                 ].map((item, i) => (
                     <div key={i} className="p-8 bg-gradient-to-br from-white to-slate-50 border border-slate-100 rounded-3xl shadow-sm text-center group hover:shadow-xl hover:-translate-y-2 transition-all active:scale-[0.98]">
                         <div className="w-12 h-12 bg-white shadow-sm border border-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-6 text-aspi-blue-dark group-hover:bg-aspi-blue-dark group-hover:text-white transition-all transform group-hover:rotate-12">{item.icon}</div>
                         <h4 className="font-extrabold text-slate-900 mb-2 uppercase text-[10px] tracking-widest italic">{item.title}</h4>
                         <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                     </div>
                 ))}
             </div>
        </div>
    )
  },
  "#gpn": {
    category: "Standar & Layanan",
    title: "Kartu Logo GPN",
    subtitle: "Kedaulatan Sistem Pembayaran Nasional",
    content: (
        <div className="space-y-12 font-sans">
             <div className="bg-gradient-to-br from-slate-50 to-white p-10 rounded-[3rem] border border-slate-100 flex flex-col md:flex-row items-center gap-10 relative overflow-hidden group shadow-sm">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-aspi-red/5 blur-3xl"></div>
                 <div className="h-44 w-72 bg-gradient-to-br from-red-600 to-red-900 rounded-2xl shadow-2xl p-6 text-white flex flex-col justify-between transform rotate-2 hover:rotate-0 transition-transform cursor-pointer group/card overflow-hidden">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.1),transparent)] opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
                    <div className="flex justify-between items-start">
                        <div className="w-12 h-10 bg-yellow-400/80 rounded shadow-inner"></div>
                        <div className="text-[10px] font-black tracking-widest">DEBIT</div>
                    </div>
                    <div className="font-mono text-xl opacity-80 tracking-widest">XXXX XXXX XXXX XXXX</div>
                    <div className="flex justify-between items-end">
                        <div className="text-[10px] font-black opacity-60">DOMESTIC USE ONLY</div>
                        <div className="bg-white p-1.5 rounded shadow-lg"><GpnLogo className="h-5" /></div>
                    </div>
                 </div>
                 <div className="flex-1">
                     <h4 className="text-2xl font-black text-slate-900 mb-4 tracking-tight italic">Kedaulatan & Efisiensi</h4>
                     <p className="text-base text-slate-600 font-light leading-relaxed">Seluruh transaksi domestik diproses di dalam negeri melalui switching lokal, menghasilkan biaya yang jauh lebih kompetitif bagi merchant dan nasabah di seluruh Indonesia.</p>
                 </div>
             </div>
        </div>
    )
  },
  "#atm": {
    category: "Standar & Layanan",
    title: "Sertifikasi ATM",
    subtitle: "Pengujian Kepatuhan Perangkat ATM Nasional",
    content: (
      <div className="space-y-10 font-sans">
        <div className="p-10 bg-white border border-slate-100 shadow-2xl rounded-[3rem] relative overflow-hidden">
           <div className="absolute -top-24 -right-24 w-64 h-64 bg-aspi-blue-mid/5 blur-3xl"></div>
           <h3 className="text-xl font-black text-slate-900 mb-8 italic tracking-tight">Prosedur Sertifikasi Perangkat</h3>
           <div className="space-y-6">
             {[
               { step: "01", title: "Registrasi", desc: "Pendaftaran entitas dan spesifikasi perangkat ATM/CRM." },
               { step: "02", title: "Lab Testing", desc: "Pengujian teknis protokol NSICCS dan standar keamanan fisik." },
               { step: "03", title: "Live Simulation", desc: "Uji coba transaksi di lingkungan sandbox ASPI terintegrasi." },
               { step: "04", title: "Final Approval", desc: "Penerbitan sertifikat kepatuhan standar sistem pembayaran nasional." }
             ].map((item, i) => (
               <div key={i} className="flex gap-6 items-start group">
                 <div className="w-12 h-12 rounded-full bg-aspi-blue-dark text-white flex items-center justify-center font-black italic shrink-0 group-hover:scale-110 group-hover:bg-aspi-red transition-all shadow-lg">{item.step}</div>
                 <div className="border-b border-slate-50 pb-4 flex-1">
                   <h4 className="font-extrabold text-slate-900 tracking-tight italic">{item.title}</h4>
                   <p className="text-sm text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                 </div>
               </div>
             ))}
           </div>
        </div>
      </div>
    )
  },
  "#audit": {
    category: "Standar & Layanan",
    title: "Audit TI",
    subtitle: "Standardisasi Keamanan Teknologi Informasi",
    content: (
      <div className="space-y-10 font-sans">
        <p className="text-lg text-slate-700 leading-relaxed font-light">ASPI menetapkan kriteria audit TI bagi seluruh anggota untuk memastikan infrastruktur pembayaran nasional tahan terhadap ancaman siber yang dinamis.</p>
        <div className="grid md:grid-cols-2 gap-8">
           <div className="p-8 bg-gradient-to-br from-slate-50 to-white rounded-3xl border border-slate-100 flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-2 transition-all group">
              <div className="p-5 bg-white shadow-sm border border-slate-100 rounded-2xl mb-6 text-aspi-blue-mid group-hover:bg-aspi-blue-mid group-hover:text-white transition-all transform group-hover:scale-110 shadow-sm"><Cpu className="w-10 h-10" /></div>
              <h4 className="font-black text-slate-900 uppercase text-[10px] tracking-widest mb-4 italic">Audit Infrastruktur</h4>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">Pengawasan berkala pada ketahanan server, integritas database, and pusat data operasional anggota.</p>
           </div>
           <div className="p-8 bg-gradient-to-br from-slate-50 to-white rounded-3xl border border-slate-100 flex flex-col items-center text-center hover:shadow-xl hover:-translate-y-2 transition-all group">
              <div className="p-5 bg-white shadow-sm border border-slate-100 rounded-2xl mb-6 text-aspi-red group-hover:bg-aspi-red group-hover:text-white transition-all transform group-hover:scale-110 shadow-sm"><ShieldCheck className="w-10 h-10" /></div>
              <h4 className="font-black text-slate-900 uppercase text-[10px] tracking-widest mb-4 italic">Audit Aplikasi</h4>
              <p className="text-sm text-slate-500 font-medium leading-relaxed">Pengujian penetrasi berkala (Pentest) and review source code aplikasi pembayaran anggota.</p>
           </div>
        </div>
      </div>
    )
  },
  "#sila": {
    category: "Standar & Layanan",
    title: "SILA",
    subtitle: "Sistem Layanan ASPI Terintegrasi",
    content: (
        <div className="space-y-12 font-sans text-center py-10">
             <div className="inline-flex p-10 bg-gradient-to-b from-aspi-blue-dark/10 to-transparent rounded-[2.5rem] mb-6 shadow-inner animate-float">
                <Building2 className="w-20 h-20 text-aspi-blue-dark"/>
             </div>
             <h3 className="text-3xl font-black text-slate-900 tracking-tight italic">Portal Layanan Anggota</h3>
             <p className="text-lg text-slate-600 font-light leading-relaxed max-w-2xl mx-auto">SILA adalah infrastruktur pendukung yang memudahkan anggota dalam pelaporan berkala, pendaftaran sertifikasi, dan manajemen profil institusi secara mandiri.</p>
             <button onClick={() => simulateAction("Mengarahkan ke Portal SILA...")} className="px-12 py-5 bg-aspi-blue-dark text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] hover:bg-aspi-blue-mid hover:shadow-aspi-blue-mid/40 transition-all shadow-2xl flex items-center gap-4 mx-auto active:scale-95 group">
                 Masuk Portal SILA <ExternalLink className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"/>
             </button>
        </div>
    )
  },
  "#berita": {
    category: "Berita & Info",
    title: "Berita",
    subtitle: "Kabar Terkini & Insight Industri",
    content: (
      <div className="space-y-8 font-sans">
        <div className="flex flex-col gap-6">
          {[
            { date: "20 Nov 2024", title: "ASPI Dukung Penuh Inisiatif Cross-Border Payment di ASEAN", image: "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=800" },
            { date: "15 Nov 2024", title: "Penerapan Standar Baru SNAP Versi 2.1 Resmi Dimulai", image: "https://images.unsplash.com/photo-1551288049-bbbda5366392?q=80&w=800" },
            { date: "10 Nov 2024", title: "Rapat Koordinasi Anggota Terkait Keamanan Transaksi Akhir Tahun", image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=800" }
          ].map((news, i) => (
            <div key={i} className="flex flex-col md:flex-row gap-8 p-6 bg-white border border-slate-100 rounded-3xl hover:shadow-2xl hover:bg-gradient-to-r hover:from-white hover:to-slate-50 transition-all group cursor-pointer active:scale-[0.99]" onClick={() => simulateAction(`Membuka berita: ${news.title}`)}>
              <div className="w-full md:w-56 h-36 bg-slate-200 rounded-2xl overflow-hidden shrink-0 shadow-lg relative">
                <div className="absolute inset-0 bg-slate-200 animate-pulse z-0"></div>
                <img src={news.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 relative z-10" alt=""/>
              </div>
              <div className="flex flex-col justify-center">
                <div className="text-[10px] font-black text-aspi-red uppercase tracking-widest mb-2 border-l-2 border-aspi-red pl-3">{news.date}</div>
                <h4 className="text-xl font-extrabold text-slate-900 mb-3 leading-tight tracking-tight group-hover:text-aspi-blue-dark transition-colors italic">{news.title}</h4>
                <div className="flex items-center gap-2 text-xs font-bold text-aspi-blue-mid group-hover:gap-4 transition-all">Baca Detail <ArrowRight className="w-4 h-4"/></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  },
  "#laporan": {
    category: "Berita & Info",
    title: "Laporan Tahunan",
    subtitle: "Akuntabilitas & Transparansi Kinerja",
    content: (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 font-sans">
        {[2023, 2022, 2021, 2020].map((year) => (
          <div key={year} className="p-8 bg-gradient-to-b from-slate-50 to-white border border-slate-100 rounded-3xl text-center group hover:bg-white hover:shadow-2xl hover:border-aspi-blue-dark transition-all cursor-pointer active:scale-95 shadow-sm" onClick={() => simulateAction(`Mengunduh Laporan Tahunan ${year}...`)}>
             <div className="relative mb-6">
                <FileBadge2 className="w-14 h-14 text-slate-200 mx-auto group-hover:text-aspi-red transition-colors" />
                <Download className="absolute bottom-0 right-1/2 translate-x-4 w-4 h-4 text-aspi-blue-dark opacity-0 group-hover:opacity-100 transition-opacity" />
             </div>
             <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Annual Report</div>
             <div className="text-2xl font-black text-slate-900 italic">{year}</div>
             <div className="mt-4 text-[9px] font-bold text-aspi-blue-dark opacity-40 group-hover:opacity-100 transition-all uppercase tracking-widest">Download PDF</div>
          </div>
        ))}
      </div>
    )
  },
  "#stat-qris": {
    category: "Berita & Info",
    title: "Statistik QRIS",
    subtitle: "Data Pertumbuhan Adopsi QRIS Nasional",
    content: (
        <div className="space-y-10 font-sans">
            <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-aspi-red/5 blur-2xl group-hover:bg-aspi-red/10 transition-all"></div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Total Merchant</div>
                    <div className="text-4xl font-black text-aspi-red italic tracking-tighter"><CountUp end="29.6" suffix=" Juta" /></div>
                    <div className="text-[10px] text-green-500 font-bold mt-2 flex items-center gap-1"><TrendingUp className="w-3 h-3"/> +15.2% YoY</div>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-aspi-blue-dark/5 blur-2xl group-hover:bg-aspi-blue-dark/10 transition-all"></div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Volume Transaksi</div>
                    <div className="text-4xl font-black text-aspi-blue-dark italic tracking-tighter"><CountUp end="1.5" suffix=" Miliar" /></div>
                    <div className="text-[10px] text-slate-400 font-bold mt-2 italic">Data: Sep 2024 YTD</div>
                </div>
                <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-aspi-blue-mid/5 blur-2xl group-hover:bg-aspi-blue-mid/10 transition-all"></div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Nominal</div>
                    <div className="text-4xl font-black text-aspi-blue-mid italic tracking-tighter">Rp <CountUp end="150" /> Triliun</div>
                    <div className="text-[10px] text-slate-400 font-bold mt-2 italic">Gross Aggregated Value</div>
                </div>
            </div>
            <div className="h-80 bg-white rounded-[3rem] border border-slate-200/60 p-6 flex flex-col relative overflow-hidden shadow-sm">
                <div className="flex justify-between items-end mb-4 px-4">
                    <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest">Pertumbuhan Transaksi Bulanan (YoY)</h4>
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-aspi-red"></div>
                        <span className="text-[10px] font-bold text-slate-400">Volume</span>
                    </div>
                </div>
                <div className="flex-1 w-full">
                    <SimpleChart data={[45, 52, 60, 58, 65, 72, 80, 85, 92, 95, 98, 100]} color="#CE1126" />
                </div>
            </div>
        </div>
    )
  },
  "#stat-ue": {
    category: "Berita & Info",
    title: "Statistik Uang Elektronik",
    subtitle: "Tren Transaksi Non-Tunai Berbasis Server",
    content: (
      <div className="space-y-10 font-sans">
         <div className="p-10 bg-aspi-blue-dark text-white rounded-[3rem] flex justify-between items-center relative overflow-hidden shadow-2xl">
            <div className="relative z-10">
               <h3 className="text-[10px] font-black uppercase tracking-[0.4em] mb-4 text-aspi-cyan">Volume Transaksi Bulanan</h3>
               <div className="text-5xl font-black text-white tracking-tighter italic">Rp <CountUp end="48.2" /> T</div>
               <p className="mt-8 text-sm opacity-60 font-light flex items-center gap-2"><Info className="w-4 h-4"/> Rata-rata pertumbuhan 12.5% per kuartal berjalan.</p>
            </div>
            <Smartphone className="w-48 h-48 absolute -right-8 -bottom-8 opacity-10 rotate-12"/>
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent"></div>
         </div>
      </div>
    )
  },
  "#stat-apmk": {
    category: "Berita & Info",
    title: "Statistik APMK",
    subtitle: "Alat Pembayaran Menggunakan Kartu",
    content: (
      <div className="space-y-10 font-sans">
         <div className="grid md:grid-cols-2 gap-6 text-center">
            <div className="p-10 bg-gradient-to-br from-white to-slate-50 border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all">
               <div className="w-12 h-12 bg-aspi-blue-dark/5 rounded-2xl flex items-center justify-center text-aspi-blue-dark mx-auto mb-6 shadow-sm"><CreditCard className="w-6 h-6"/></div>
               <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Kartu Debit Beredar</div>
               <div className="text-4xl font-black text-slate-900 italic tracking-tighter"><CountUp end="185.3" suffix=" Juta" /></div>
            </div>
            <div className="p-10 bg-gradient-to-br from-white to-slate-50 border border-slate-100 rounded-[2.5rem] shadow-sm hover:shadow-xl transition-all">
               <div className="w-12 h-12 bg-aspi-red/5 rounded-2xl flex items-center justify-center text-aspi-red mx-auto mb-6 shadow-sm"><CreditCard className="w-6 h-6"/></div>
               <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Kartu Kredit Beredar</div>
               <div className="text-4xl font-black text-slate-900 italic tracking-tighter"><CountUp end="17.2" suffix=" Juta" /></div>
            </div>
         </div>
      </div>
    )
  },
  "#stat-dcip": {
    category: "Berita & Info",
    title: "Statistik DC & IP",
    subtitle: "Direct Debit & Instant Payment",
    content: (
      <div className="space-y-10 font-sans text-center py-10">
         <div className="inline-flex p-10 bg-gradient-to-t from-slate-50 to-white rounded-full mb-8 shadow-inner border border-white/50">
            <BarChart3 className="w-16 h-16 mx-auto text-aspi-blue-mid opacity-20" />
         </div>
         <h3 className="text-3xl font-black text-slate-900 tracking-tight italic">Evolusi Real-Time Payment</h3>
         <p className="text-slate-500 max-w-xl mx-auto leading-relaxed font-light text-lg mb-12">Infrastruktur transfer dana real-time domestik menunjukkan akselerasi volume yang signifikan sejak implementasi penuh protokol BI-FAST.</p>
         
         <div className="h-64 w-full max-w-3xl mx-auto bg-white rounded-3xl p-6 border border-slate-100 shadow-xl">
            <SimpleChart data={[20, 35, 45, 50, 60, 65, 80, 85, 90, 95]} color="#0077C8" />
         </div>
      </div>
    )
  },
  "#transfer": {
    category: "Berita & Info",
    title: "Transfer",
    subtitle: "Layanan Perpindahan Dana Antar Anggota",
    content: (
      <div className="space-y-10 font-sans">
         <div className="p-12 bg-gradient-to-r from-aspi-dark to-[#151f33] text-white rounded-[3rem] border border-white/5 flex flex-col md:flex-row gap-10 items-center shadow-2xl relative overflow-hidden">
            <ArrowLeftRight className="w-24 h-24 text-aspi-cyan opacity-20 shrink-0 animate-pulse" />
            <div className="relative z-10">
               <h4 className="text-2xl font-black mb-4 tracking-tight italic">Interkoneksi Sistem Switching</h4>
               <p className="text-slate-400 leading-relaxed font-light text-lg">ASPI memastikan standar operasional transfer dana antar bank and lembaga non-bank berjalan mulus dengan tingkat ketersediaan (uptime) mencapai 99.99%.</p>
            </div>
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-aspi-blue-light/10 rounded-full blur-3xl"></div>
         </div>
      </div>
    )
  },
  "#galeri-foto": {
    category: "Berita & Info",
    title: "Galeri Foto",
    subtitle: "Dokumentasi Kegiatan & Event ASPI",
    content: (
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 font-sans">
        {[1,2,3,4,5,6].map(i => (
          <div key={i} className="aspect-[4/5] bg-slate-100 rounded-3xl overflow-hidden group cursor-pointer relative shadow-lg border border-white/10" onClick={() => simulateAction(`Membuka foto ${i}`)}>
             <div className="absolute inset-0 bg-slate-200 animate-pulse z-0"></div>
             <img src={`https://picsum.photos/seed/${i+100}/800/1000`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0 relative z-10" alt=""/>
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6 z-20">
                <span className="text-white text-[10px] font-black uppercase tracking-widest">Lihat Dokumentasi</span>
             </div>
          </div>
        ))}
      </div>
    )
  },
  "#galeri-video": {
    category: "Berita & Info",
    title: "Galeri Video",
    subtitle: "Highlight Event & Edukasi Visual",
    content: (
      <div className="space-y-10 font-sans">
        {[1,2].map(i => (
          <div key={i} className="aspect-video bg-aspi-dark rounded-[2.5rem] overflow-hidden relative group cursor-pointer shadow-2xl border border-white/10" onClick={() => simulateAction(`Memutar video ${i}`)}>
             <div className="absolute inset-0 bg-slate-800 animate-pulse z-0"></div>
             <img src={`https://picsum.photos/seed/${i+200}/1280/720`} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000 relative z-10" alt=""/>
             <div className="absolute inset-0 flex items-center justify-center z-20">
                <div className="w-24 h-24 bg-white/10 backdrop-blur-2xl rounded-full flex items-center justify-center text-white border border-white/20 group-hover:scale-110 group-hover:bg-aspi-red group-hover:border-aspi-red transition-all shadow-2xl">
                  <PlayCircle className="w-12 h-12 fill-current" />
                </div>
             </div>
             <div className="absolute bottom-10 left-10 right-10 z-20">
                <div className="text-[10px] font-black text-aspi-cyan uppercase tracking-widest mb-2 border-b border-aspi-cyan/30 w-fit pb-1">ASPI Insight Video</div>
                <h4 className="text-2xl font-black text-white italic tracking-tight leading-tight">Sosialisasi Implementasi SNAP dan Keamanan Open API Nasional 2024</h4>
             </div>
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10"></div>
          </div>
        ))}
      </div>
    )
  },
  "#keanggotaan": {
      category: "Tentang Kami",
      title: "Keanggotaan",
      subtitle: "Bergabung dalam Ekosistem Pembayaran Nasional",
      content: (
          <div className="space-y-12 font-sans">
              <div className="grid md:grid-cols-2 gap-12 items-start">
                  <div>
                      <h3 className="text-2xl font-extrabold text-slate-900 mb-6 tracking-tight italic underline decoration-aspi-red decoration-2 underline-offset-8">Komposisi Anggota</h3>
                      <p className="text-slate-600 mb-10 leading-relaxed text-base font-light">
                          ASPI beranggotakan berbagai institusi finansial and teknologi yang memegang peran kunci dalam sistem pembayaran Indonesia.
                      </p>
                      <ul className="space-y-6">
                          {[
                              { label: "Bank Umum", pct: 52, color: "bg-aspi-blue-dark" },
                              { label: "PJP (Non-Bank)", pct: 20, color: "bg-aspi-red" },
                              { label: "Unit Usaha Syariah", pct: 19, color: "bg-aspi-blue-mid" },
                              { label: "Bank Perekonomian Rakyat", pct: 9, color: "bg-aspi-blue-light" }
                          ].map((item, i) => (
                              <li key={i}>
                                  <div className="flex justify-between text-[11px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2">
                                      <span>{item.label}</span>
                                      <span className="text-slate-900">{item.pct}%</span>
                                  </div>
                                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden shadow-inner">
                                      <div className={`h-full rounded-full ${item.color} transition-all duration-1000`} style={{width: `${item.pct}%`}}></div>
                                  </div>
                              </li>
                          ))}
                      </ul>
                  </div>
                  <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-2xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-aspi-red/5 blur-3xl"></div>
                      <h4 className="font-extrabold text-slate-900 mb-8 flex items-center gap-3 text-xl tracking-tight italic">
                        <FileText className="w-6 h-6 text-aspi-red" />
                        Persyaratan Registrasi
                      </h4>
                      <div className="space-y-4">
                          {[
                              { label: "Izin Operasional PJP", tooltip: "Bukti izin resmi dari Bank Indonesia sebagai Penyelenggara Jasa Pembayaran." },
                              { label: "Profil Perusahaan & Manajemen", tooltip: "Struktur organisasi, data pengurus, and riwayat perusahaan." },
                              { label: "Sertifikasi Sistem (UAT)", tooltip: "Hasil uji coba sistem yang memastikan interoperabilitas dengan standar ASPI." },
                              { label: "Laporan Audit TI Independen", tooltip: "Laporan audit tahunan dari firma audit terdaftar di ASPI." }
                          ].map((req, i) => (
                              <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl group hover:bg-white hover:shadow-md transition-all border border-transparent hover:border-slate-100 shadow-sm">
                                  <div className="flex items-center gap-3">
                                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 group-hover:scale-110 transition-transform" />
                                      <span className="text-sm font-bold text-slate-700 tracking-tight">{req.label}</span>
                                  </div>
                                  <Tooltip text={req.tooltip}>
                                    <HelpCircle className="w-4 h-4 text-slate-400 cursor-help hover:text-aspi-blue-mid transition-colors" />
                                  </Tooltip>
                              </div>
                          ))}
                      </div>
                      <button onClick={() => simulateAction("Mengunduh Formulir...")} className="w-full mt-10 py-5 bg-aspi-blue-dark text-white font-black uppercase tracking-[0.2em] text-[11px] rounded-xl hover:bg-aspi-blue-mid hover:shadow-aspi-blue-mid/40 transition-all shadow-xl shadow-aspi-blue-dark/20 active:scale-95">
                          Unduh Paket Pendaftaran
                      </button>
                  </div>
              </div>
          </div>
      )
  },
  "#kontak": {
      category: "Hubungi Kami",
      title: "Hubungi Kami",
      subtitle: "Kami Siap Membantu Anda",
      content: (
          <div className="grid md:grid-cols-2 gap-12 font-sans">
              <div className="space-y-8">
                  {[
                      { icon: <MapPin className="w-5 h-5" />, label: "Kantor Pusat", val: "Gedung Tifa Arum Realty, Lt. 3, Jl. Kuningan Barat 1 No.26, Jakarta Selatan 12710" },
                      { icon: <Phone className="w-5 h-5" />, label: "Layanan Telepon", val: "(021) 5290-0000" },
                      { icon: <Mail className="w-5 h-5" />, label: "Email Korespondensi", val: "info@aspi.or.id" }
                  ].map((item, i) => (
                      <div key={i} className="p-6 bg-gradient-to-br from-slate-50 to-white rounded-2xl hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-slate-100 group shadow-sm">
                          <div className="flex items-center gap-3 mb-3">
                              <div className="text-aspi-red group-hover:scale-110 transition-transform">{item.icon}</div>
                              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">{item.label}</h4>
                          </div>
                          <p className="text-slate-800 font-extrabold leading-snug pl-8 text-lg italic">{item.val}</p>
                      </div>
                  ))}
              </div>
              
              <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-slate-100 relative overflow-hidden">
                  <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-aspi-blue-dark/5 blur-3xl"></div>
                  <h3 className="text-2xl font-black text-slate-900 mb-8 tracking-tight italic">Kirim Pesan Cepat</h3>
                  <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); simulateAction("Pesan Anda telah terkirim! Tim kami akan segera menghubungi."); }}>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Nama</label>
                            <input type="text" required className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-aspi-blue-mid/10 focus:border-aspi-blue-mid outline-none transition-all placeholder:text-slate-400 text-sm font-bold" placeholder="Nama..." />
                        </div>
                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Institusi</label>
                            <input type="text" required className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-aspi-blue-mid/10 focus:border-aspi-blue-mid outline-none transition-all placeholder:text-slate-400 text-sm font-bold" placeholder="Perusahaan..." />
                        </div>
                      </div>
                      <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Email Kerja</label>
                          <input type="email" required className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-aspi-blue-mid/10 focus:border-aspi-blue-mid outline-none transition-all placeholder:text-slate-400 text-sm font-bold" placeholder="email@kantor.co.id" />
                      </div>
                      <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Pesan</label>
                          <textarea rows={3} required className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-4 focus:ring-aspi-blue-mid/10 focus:border-aspi-blue-mid outline-none transition-all placeholder:text-slate-400 text-sm font-bold resize-none" placeholder="Tuliskan pesan Anda..."></textarea>
                      </div>
                      <button type="submit" className="w-full py-5 bg-aspi-red text-white font-black uppercase tracking-[0.2em] text-[11px] rounded-xl hover:bg-red-700 hover:shadow-aspi-red/40 transition-all shadow-xl shadow-aspi-red/20 active:scale-95">
                          Kirim Pesan Sekarang
                      </button>
                  </form>
              </div>
          </div>
      )
  },
};

type PageContent = {
  title: string;
  subtitle: string;
  content: React.ReactNode;
  category: string;
};

const createDefaultPage = (title: string): PageContent => {
    return {
        category: "Berita & Info",
        title: title,
        subtitle: "Informasi detail sedang dimuat",
        content: (
            <div className="flex flex-col items-center justify-center py-24 text-slate-300 bg-gradient-to-br from-slate-50 via-white to-blue-50/50 rounded-[3rem] border-2 border-dashed border-slate-200 font-sans shadow-inner">
                <Loader2 className="w-16 h-16 mb-6 opacity-20 animate-spin" />
                <h3 className="text-2xl font-black text-slate-400 mb-2 tracking-tight italic">Konten Sedang Diperbarui</h3>
                <p className="text-sm max-w-md text-center font-medium text-slate-400 mb-10 leading-relaxed">Kami sedang melakukan sinkronisasi data terbaru untuk halaman {title}. Harap kembali beberapa saat lagi.</p>
                <button onClick={() => window.location.hash = ""} className="px-10 py-4 bg-aspi-dark text-white rounded-full font-black uppercase tracking-[0.3em] text-[10px] hover:bg-aspi-blue-mid transition-all shadow-xl active:scale-95">Kembali ke Beranda</button>
            </div>
        )
    };
};

// --- Logo Component ---

const AspiLogo = ({ className = "h-10", dark = false }) => (
  <svg viewBox="0 0 320 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="ASPI Logo">
    <circle cx="30" cy="65" r="28" fill="#003B71" />
    <circle cx="55" cy="30" r="28" fill="#0077C8" />
    <circle cx="85" cy="60" r="28" fill="#00A3E0" />
    <text x="125" y="70" fontFamily="'Public Sans', sans-serif" fontWeight="900" fontSize="64" fill="#CE1126" letterSpacing="-0.03em">ASPI</text>
    <text x="128" y="92" fontFamily="'Public Sans', sans-serif" fontWeight="700" fontSize="10.5" fill={dark ? "#FFFFFF" : "#003B71"} letterSpacing="0.4em">ASOSIASI SISTEM PEMBAYARAN INDONESIA</text>
  </svg>
);

// --- Digital Map Component ---

const DigitalIndonesiaMap = () => {
  const [hovered, setHovered] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!mapRef.current) return;
    const { left, top, width, height } = mapRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width - 0.5;
    const y = (e.clientY - top) / height - 0.5;
    mapRef.current.style.transform = `perspective(1000px) rotateY(${x * 15}deg) rotateX(${-y * 15}deg) scale(${hovered ? 1.08 : 1})`;
  };

  const svgContent = `
    <svg viewBox="0 0 1000 450" xmlns="http://www.w3.org/2000/svg" fill="none">
        <style>
            @keyframes pulse { 0%, 100% { opacity: 0.2; transform: scale(1); } 50% { opacity: 1; transform: scale(1.1); } }
            @keyframes scan { 0% { opacity: 0.1; } 50% { opacity: 0.5; } 100% { opacity: 0.1; } }
            @keyframes flow { 0% { stroke-dashoffset: 30; } 100% { stroke-dashoffset: 0; } }
            .map-dot { fill: #0077C8; opacity: 0.2; transition: all 0.3s; cursor: pointer; }
            .map-dot:hover { fill: #00A3E0; opacity: 1; r: 5; }
            .line-conn { stroke: #00A3E0; stroke-width: 1; stroke-dasharray: 4 6; opacity: 0.25; animation: flow 2s linear infinite; }
            .hub-core { fill: #CE1126; filter: drop-shadow(0 0 8px #CE1126); }
            .hub-ring { stroke: #CE1126; stroke-width: 1.5; animation: pulse 2s ease-in-out infinite; transform-origin: center; transform-box: fill-box; }
        </style>
        
        <g opacity="0.05">
            <path d="M50 50 L950 400 M50 400 L950 50" stroke="#00A3E0" stroke-width="0.5" />
        </g>

        <g class="dots">
            <circle class="map-dot" cx="120" cy="150" r="2" data-name="Medan Node" />
            <circle class="map-dot" cx="140" cy="170" r="2" />
            <circle class="map-dot" cx="290" cy="285" r="2" data-name="Jakarta Hub" />
            <circle class="map-dot" cx="330" cy="150" r="2" />
            <circle class="map-dot" cx="500" cy="170" r="2" data-name="Makassar Node" />
            <circle class="map-dot" cx="710" cy="200" r="2" data-name="Jayapura Node" />
            <circle class="map-dot" cx="180" cy="210" r="2" data-name="Palembang Node" />
            <circle class="map-dot" cx="390" cy="120" r="2" data-name="Balikpapan Node" />
        </g>

        <g>
            <path class="line-conn" d="M180 210 Q 280 220, 290 285" />
            <path class="line-conn" d="M290 285 Q 400 240, 500 170" />
            <path class="line-conn" d="M500 170 Q 600 200, 710 200" />
            <path class="line-conn" d="M390 120 L290 285" />
        </g>

        <g>
            <circle class="hub-core" cx="290" cy="285" r="7" />
            <circle class="hub-ring" cx="290" cy="285" r="14" fill="none" stroke="#CE1126" stroke-width="2" />
        </g>
    </svg>
  `.replace(/\s+/g, ' ').trim();

  const dataUri = `data:image/svg+xml;utf8,${encodeURIComponent(svgContent)}`;

  return (
    <div 
        ref={mapRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => { setHovered(false); if(mapRef.current) mapRef.current.style.transform = ''; }}
        className="relative w-full h-full flex items-center justify-center transition-all duration-700 ease-out cursor-crosshair group"
    >
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-aspi-blue-dark/20 blur-[160px] rounded-full transition-all duration-1000 ${hovered ? 'scale-125 opacity-70' : 'scale-100 opacity-30'}`}></div>
        
        <img 
            src={dataUri} 
            alt="Digital Connectivity Map" 
            className={`w-full h-auto z-10 transition-all duration-1000 ${hovered ? 'drop-shadow-[0_0_50px_rgba(0,163,224,0.4)] brightness-125' : 'drop-shadow-none brightness-100'} filter`}
        />

        {/* Dynamic Map Labels based on visual position approximation for demo */}
        <div className="absolute top-[35%] left-[28%] group/pin">
             <div className="w-3 h-3 bg-aspi-red rounded-full animate-ping absolute opacity-0 group-hover/pin:opacity-100 transition-opacity"></div>
             <div className="absolute left-4 top-0 bg-slate-900/80 backdrop-blur text-white text-[10px] px-3 py-1 rounded opacity-0 group-hover/pin:opacity-100 transition-opacity whitespace-nowrap border border-white/10">Jakarta Core Hub</div>
        </div>

        <div className={`absolute top-1/3 left-0 p-4 glass-panel rounded-3xl shadow-2xl transition-all duration-700 delay-100 transform ${hovered ? 'translate-x-6 opacity-100 scale-100' : '-translate-x-8 opacity-0 scale-90'} hidden xl:block z-20`}>
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-aspi-red animate-ping"></div>
                    <span className="text-[9px] text-white uppercase tracking-widest font-black">National Switch Hub</span>
                </div>
                <div className="text-xl font-black text-white italic tracking-tighter">99.9% Uptime</div>
            </div>
        </div>

        <div className={`absolute bottom-1/3 right-0 p-4 glass-panel rounded-3xl shadow-2xl transition-all duration-700 delay-200 transform ${hovered ? '-translate-x-6 opacity-100 scale-100' : 'translate-x-8 opacity-0 scale-90'} hidden xl:block z-20`}>
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-aspi-blue-light animate-pulse"></div>
                    <span className="text-[9px] text-white uppercase tracking-widest font-black">Interconnected Nodes</span>
                </div>
                <div className="text-xl font-black text-white italic tracking-tighter"><CountUp end="266" suffix="+" /> Entities</div>
            </div>
        </div>

        <div className={`absolute inset-0 z-0 transition-opacity duration-1000 ${hovered ? 'opacity-100' : 'opacity-0'}`}>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-aspi-red/5 blur-[100px] rounded-full"></div>
        </div>
    </div>
  );
};

const AnimatedWave = () => (
    <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] transform translate-y-[1px] z-10 opacity-30 pointer-events-none">
        <svg className="relative block w-[calc(100%+1.3px)] h-[60px] md:h-[120px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z" className="fill-white"></path>
        </svg>
    </div>
);

const Navbar = ({ activeHash, openSearch }: { activeHash: string, openSearch: () => void }) => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-lg py-3' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-6 flex justify-between items-center">
                <a href="#home" className="flex items-center gap-2 group">
                    <AspiLogo className="h-10 transition-transform group-hover:scale-105" dark={!scrolled && (activeHash === "" || activeHash === "#home")} />
                </a>

                <div className="hidden lg:flex items-center gap-8">
                    {MENU_STRUCTURE.map((menu, i) => (
                        <div key={i} className="relative group/menu">
                            <button className={`text-sm font-bold uppercase tracking-wider transition-colors flex items-center gap-1 py-2 ${scrolled || (activeHash !== "" && activeHash !== "#home") ? 'text-slate-700 hover:text-aspi-red' : 'text-white hover:text-aspi-cyan'}`}>
                                {menu.title} <ChevronDown className="w-3 h-3 group-hover/menu:rotate-180 transition-transform" />
                            </button>
                            <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 invisible group-hover/menu:opacity-100 group-hover/menu:visible transition-all duration-300 transform group-hover/menu:translate-y-0 translate-y-2">
                                <div className="bg-white/95 backdrop-blur-md p-2 rounded-xl shadow-xl border border-slate-100 min-w-[200px] flex flex-col gap-1">
                                    {menu.items.map((item, j) => (
                                        <a key={j} href={item.href} className="text-xs font-bold text-slate-600 hover:text-aspi-blue-dark hover:bg-aspi-blue-dark/5 px-4 py-3 rounded-lg transition-colors block text-left whitespace-nowrap">
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                                <div className="absolute top-2 left-1/2 -translate-x-1/2 border-8 border-transparent border-b-white/95"></div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex items-center gap-4">
                    <button onClick={openSearch} className={`p-2 rounded-full transition-colors ${scrolled || (activeHash !== "" && activeHash !== "#home") ? 'text-slate-600 hover:bg-slate-100' : 'text-white hover:bg-white/10'}`}>
                        <Search className="w-5 h-5" />
                    </button>
                    <button 
                        className="lg:hidden p-2"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X className={`w-6 h-6 ${scrolled || (activeHash !== "" && activeHash !== "#home") ? 'text-slate-800' : 'text-white'}`} /> : <Menu className={`w-6 h-6 ${scrolled || (activeHash !== "" && activeHash !== "#home") ? 'text-slate-800' : 'text-white'}`} />}
                    </button>
                </div>
            </div>
            
            {mobileMenuOpen && (
                <div className="fixed inset-0 top-[70px] bg-white z-40 overflow-y-auto lg:hidden animate-in slide-in-from-right duration-300">
                    <div className="p-6 space-y-6">
                        {MENU_STRUCTURE.map((menu, i) => (
                            <div key={i}>
                                <h4 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3">{menu.title}</h4>
                                <div className="flex flex-col gap-2 pl-4 border-l-2 border-slate-100">
                                    {menu.items.map((item, j) => (
                                        <a key={j} href={item.href} onClick={() => setMobileMenuOpen(false)} className="text-sm font-bold text-slate-700 py-2 hover:text-aspi-red">
                                            {item.name}
                                        </a>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

const StatsBar = () => (
    <div className="bg-aspi-blue-dark py-12 relative z-20 -mt-10 mx-6 rounded-3xl shadow-2xl flex flex-wrap justify-around items-center gap-8 px-8 text-white border-t border-white/10">
        {[
            { label: "Transaksi Harian", value: "35jt+", icon: <TrendingUp className="w-6 h-6 text-aspi-cyan" /> },
            { label: "Volume QRIS", value: "Rp 150T", icon: <Smartphone className="w-6 h-6 text-aspi-cyan" /> },
            { label: "Partisipan", value: "250+", icon: <Building2 className="w-6 h-6 text-aspi-cyan" /> },
            { label: "Uptime Sistem", value: "99.9%", icon: <Server className="w-6 h-6 text-aspi-cyan" /> }
        ].map((stat, i) => (
            <div key={i} className="flex items-center gap-4 group">
                <div className="p-3 bg-white/10 rounded-xl group-hover:bg-white/20 transition-colors shadow-lg shadow-black/10">
                    {stat.icon}
                </div>
                <div>
                    <div className="text-2xl font-black tracking-tight">{stat.value}</div>
                    <div className="text-[10px] uppercase tracking-widest opacity-70 font-bold">{stat.label}</div>
                </div>
            </div>
        ))}
    </div>
);

const Features = () => (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-20">
                <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight italic">Ekosistem Pembayaran Masa Depan</h2>
                <p className="text-slate-500 text-lg leading-relaxed">Infrastruktur ASPI dirancang untuk mendukung pertumbuhan ekonomi digital Indonesia yang inklusif, aman, dan berkelanjutan.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {[
                    { title: "Standardisasi QRIS", desc: "Satu QR Code untuk semua pembayaran, memudahkan interkoneksi antar penyelenggara jasa sistem pembayaran.", icon: <Smartphone className="w-8 h-8" /> },
                    { title: "Keamanan NSICCS", desc: "Standar teknologi chip untuk kartu ATM/Debit guna meningkatkan keamanan transaksi dan kedaulatan data nasional.", icon: <ShieldCheck className="w-8 h-8" /> },
                    { title: "SNAP Open API", desc: "Standar Nasional Open API Pembayaran untuk mendorong inovasi dan efisiensi integrasi sistem antar lembaga.", icon: <FileText className="w-8 h-8" /> }
                ].map((feat, i) => (
                    <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 border border-slate-100 group">
                        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-aspi-blue-dark mb-8 group-hover:scale-110 transition-transform group-hover:bg-aspi-blue-dark group-hover:text-white group-hover:shadow-lg">
                            {feat.icon}
                        </div>
                        <h3 className="text-xl font-black text-slate-900 mb-4">{feat.title}</h3>
                        <p className="text-slate-500 leading-relaxed text-sm">{feat.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

const KeyInitiatives = () => (
    <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row items-center gap-20">
                <div className="lg:w-1/2">
                    <div className="inline-block px-4 py-2 bg-aspi-red/5 text-aspi-red rounded-lg text-[10px] font-black uppercase tracking-widest mb-6">Strategic Roadmap</div>
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-10 leading-tight italic">Mewujudkan Visi <span className="text-aspi-red decoration-4 underline-offset-4">Indonesia 2025</span></h2>
                    <div className="space-y-10">
                        {[
                            { title: "Blueprint Sistem Pembayaran", desc: "Arah kebijakan sistem pembayaran Indonesia di era ekonomi dan keuangan digital untuk memastikan keseimbangan antara inovasi dan stabilitas." },
                            { title: "Reformasi Regulasi", desc: "Penyederhanaan dan penguatan regulasi untuk mendukung ekosistem yang kompetitif dan adaptif terhadap perubahan teknologi." },
                            { title: "Infrastruktur Pasar", desc: "Modernisasi infrastruktur pembayaran ritel dan nilai besar untuk mendukung transaksi yang real-time, aman, dan efisien." }
                        ].map((item, i) => (
                            <div key={i} className="flex gap-6 group">
                                <div className="w-14 h-14 rounded-2xl bg-slate-50 text-aspi-red flex items-center justify-center shrink-0 font-black text-xl group-hover:bg-aspi-red group-hover:text-white transition-colors shadow-sm">{i+1}</div>
                                <div>
                                    <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-aspi-red transition-colors">{item.title}</h4>
                                    <p className="text-slate-500 leading-relaxed text-sm">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="lg:w-1/2 relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-aspi-blue-dark to-aspi-cyan rounded-[3rem] rotate-6 opacity-10 scale-95"></div>
                    <img src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=1632" alt="Meeting" className="relative rounded-[3rem] shadow-2xl rotate-[-3deg] hover:rotate-0 transition-all duration-700 grayscale hover:grayscale-0" />
                    
                    <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-2xl shadow-xl animate-bounce-slow hidden md:block">
                        <div className="flex items-center gap-3 mb-2">
                             <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                             <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Growth</span>
                        </div>
                        <div className="text-3xl font-black text-slate-900">+128%</div>
                        <div className="text-xs text-slate-500">Year over Year</div>
                    </div>
                </div>
            </div>
        </div>
    </section>
);

const NewsSection = () => (
    <section className="py-24 bg-slate-50 border-t border-slate-100">
        <div className="container mx-auto px-6">
            <div className="flex justify-between items-end mb-12">
                <div>
                    <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 tracking-tight italic">Berita & Wawasan</h2>
                    <p className="text-slate-500 font-medium">Informasi terkini seputar industri sistem pembayaran</p>
                </div>
                <button className="hidden md:flex items-center gap-2 text-aspi-red font-bold uppercase tracking-widest text-xs hover:gap-4 transition-all group">Lihat Semua <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" /></button>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
                {[
                    { date: "15 Okt 2023", title: "Implementasi QRIS TUNTAS Resmi Diluncurkan di Seluruh Indonesia", img: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=800" },
                    { date: "02 Nov 2023", title: "ASPI Gelar Workshop Cyber Resilience untuk Anggota", img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=800" },
                    { date: "20 Nov 2023", title: "Pertumbuhan Transaksi Digital Capai Rekor Baru Tahun Ini", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=800" }
                ].map((news, i) => (
                    <div key={i} className="group cursor-pointer bg-white rounded-3xl p-4 shadow-sm hover:shadow-xl transition-all border border-slate-100">
                        <div className="overflow-hidden rounded-2xl mb-6 relative">
                            <div className="absolute inset-0 bg-aspi-blue-dark/20 opacity-0 group-hover:opacity-100 transition-opacity z-10"></div>
                            <img src={news.img} alt={news.title} className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-700" />
                        </div>
                        <div className="px-2 pb-2">
                            <div className="text-[10px] font-black text-aspi-blue-dark uppercase tracking-widest mb-3 flex items-center gap-2">
                                <Calendar className="w-3 h-3" /> {news.date}
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 group-hover:text-aspi-red transition-colors leading-tight mb-4">{news.title}</h3>
                            <div className="text-xs font-bold text-slate-400 flex items-center gap-2 group-hover:translate-x-2 transition-transform">Baca Selengkapnya <ArrowRight className="w-3 h-3" /></div>
                        </div>
                    </div>
                ))}
            </div>
             <button className="mt-12 md:hidden w-full py-4 border border-aspi-red text-aspi-red font-bold uppercase tracking-widest text-xs rounded-xl hover:bg-aspi-red hover:text-white transition-colors">Lihat Semua Berita</button>
        </div>
    </section>
);

const Footer = () => (
    <footer className="bg-[#0B1221] text-white pt-24 pb-12 rounded-t-[3rem] mt-24 border-t-4 border-aspi-red relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full hero-pattern opacity-5"></div>
        <div className="container mx-auto px-6 relative z-10">
            <div className="grid md:grid-cols-4 gap-12 mb-16">
                <div className="col-span-1 md:col-span-1">
                    <AspiLogo className="h-12 mb-8" dark={true} />
                    <p className="text-slate-400 text-sm leading-relaxed mb-8">
                        Asosiasi Sistem Pembayaran Indonesia (ASPI) adalah lembaga Self Regulatory Organization (SRO) yang berdedikasi untuk memajukan sistem pembayaran nasional.
                    </p>
                    <div className="flex gap-4">
                        {[Globe, Mail, Phone].map((Icon, i) => (
                            <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-aspi-red transition-colors border border-white/10 group">
                                <Icon className="w-4 h-4 group-hover:scale-110 transition-transform" />
                            </a>
                        ))}
                    </div>
                </div>
                
                <div>
                    <h4 className="font-bold text-lg mb-6 text-white">Tautan Cepat</h4>
                    <ul className="space-y-4 text-slate-400 text-sm font-medium">
                        <li><a href="#about" className="hover:text-aspi-red transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3 text-white/20" /> Tentang Kami</a></li>
                        <li><a href="#keanggotaan" className="hover:text-aspi-red transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3 text-white/20" /> Keanggotaan</a></li>
                        <li><a href="#regulasi" className="hover:text-aspi-red transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3 text-white/20" /> Regulasi</a></li>
                        <li><a href="#karir" className="hover:text-aspi-red transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3 text-white/20" /> Karir</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold text-lg mb-6 text-white">Layanan Anggota</h4>
                    <ul className="space-y-4 text-slate-400 text-sm font-medium">
                        <li><a href="#nsiccs" className="hover:text-aspi-red transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3 text-white/20" /> NSICCS</a></li>
                        <li><a href="#qris" className="hover:text-aspi-red transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3 text-white/20" /> QRIS</a></li>
                        <li><a href="#snap" className="hover:text-aspi-red transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3 text-white/20" /> SNAP</a></li>
                        <li><a href="#sila" className="hover:text-aspi-red transition-colors flex items-center gap-2"><ChevronRight className="w-3 h-3 text-white/20" /> Portal SILA</a></li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold text-lg mb-6 text-white">Berlangganan</h4>
                    <p className="text-slate-400 text-sm mb-6 leading-relaxed">Dapatkan informasi regulasi dan berita terbaru langsung ke inbox Anda.</p>
                    <div className="flex bg-white/5 p-1.5 rounded-xl border border-white/10 focus-within:border-aspi-red/50 transition-colors">
                        <input type="email" placeholder="Email Anda..." className="bg-transparent px-4 py-2 outline-none text-sm w-full placeholder:text-slate-600 text-white" />
                        <button className="bg-aspi-red px-6 py-2 rounded-lg text-xs font-black uppercase tracking-wider hover:bg-red-700 transition-colors shadow-lg shadow-aspi-red/20">Daftar</button>
                    </div>
                </div>
            </div>
            
            <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] text-slate-500 font-bold uppercase tracking-widest">
                <div>&copy; {new Date().getFullYear()} ASPI. All rights reserved.</div>
                <div className="flex gap-8">
                    <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-white transition-colors">Sitemap</a>
                </div>
            </div>
        </div>
    </footer>
);

const ScrollToTop = () => {
    const [visible, setVisible] = useState(false);
    
    useEffect(() => {
        const toggleVisible = () => setVisible(window.scrollY > 500);
        window.addEventListener('scroll', toggleVisible);
        return () => window.removeEventListener('scroll', toggleVisible);
    }, []);

    const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    return (
        <button 
            onClick={scrollToTop} 
            className={`fixed bottom-6 right-6 z-40 bg-white text-aspi-red p-4 rounded-full shadow-2xl transition-all duration-500 hover:-translate-y-2 border border-slate-100 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}`}
        >
            <ArrowUp className="w-5 h-5" />
        </button>
    );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center bg-aspi-dark overflow-hidden pt-24 pb-16">
      <div className="absolute inset-0 z-0 bg-[#0B1221]">
        <img 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=2072" 
            alt="" 
            fetchPriority="high"
            loading="eager"
            className="absolute inset-0 w-full h-full object-cover opacity-15 mix-blend-screen"
        />
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-aspi-blue-dark/50 rounded-full blur-[180px] -translate-y-1/3 translate-x-1/4 animate-pulse-slow"></div>
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-aspi-red/10 rounded-full blur-[180px] translate-y-1/3 -translate-x-1/4"></div>
        <div className="absolute inset-0 hero-pattern opacity-40"></div>
        <AnimatedWave />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full glass-panel text-white text-[10px] font-black uppercase tracking-[0.4em] mb-12 border border-white/10 shadow-2xl animate-in slide-in-from-bottom-8 fade-in duration-1000 fill-mode-backwards">
            <Sparkles className="w-4 h-4 text-aspi-cyan animate-pulse" />
            Badan Regulasi Mandiri (SRO)
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-[1.1] mb-12 drop-shadow-2xl tracking-tighter italic animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-200 fill-mode-backwards">
            Standardisasi.<br/>
            Keamanan.<br/>
            Kedaulatan.
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 mb-14 leading-relaxed max-w-2xl font-light animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-500 fill-mode-backwards">
            ASPI memperkuat ekosistem pembayaran Indonesia melalui <span className="text-white font-bold border-b-2 border-aspi-red pb-1">protokol modern</span>, regulasi kokoh, and kolaborasi strategis lintas sektor.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 animate-in slide-in-from-bottom-8 fade-in duration-1000 delay-700 fill-mode-backwards">
            <a href="#qris" className="px-12 py-6 bg-aspi-red text-white rounded-[2rem] font-black uppercase tracking-[0.3em] text-[11px] hover:shadow-[0_40px_80px_-20px_rgba(206,17,38,0.5)] transition-all flex items-center justify-center gap-4 group active:scale-95">
              Jelajahi Standar <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </a>
            <a href="#about" className="px-12 py-6 bg-white/5 backdrop-blur-xl border border-white/20 text-white rounded-[2rem] font-black uppercase tracking-[0.3em] text-[11px] hover:bg-white/10 transition-all flex items-center justify-center gap-4 active:scale-95">
              Tentang ASPI
            </a>
          </div>
        </div>

        <div className="hidden lg:block relative h-[600px] w-full animate-in zoom-in fade-in duration-1000 delay-500">
             <DigitalIndonesiaMap />
        </div>
      </div>
    </section>
  );
};

const InternalPageLayout = ({ data }: { data: PageContent }) => {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalScroll = document.documentElement.scrollTop;
            const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scroll = `${totalScroll / windowHeight}`;
            setScrollProgress(Number(scroll));
        }
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="pt-24 min-h-screen bg-gradient-to-br from-white via-slate-50 to-blue-50/30 animate-in fade-in duration-1000 font-sans relative">
            <div className="fixed top-0 left-0 h-1 bg-aspi-red z-[60] transition-all duration-300" style={{ width: `${scrollProgress * 100}%` }}></div>
            
            <div className="bg-aspi-dark relative py-32 md:py-48 px-6 overflow-hidden shadow-2xl">
                <div className="absolute inset-0 z-0">
                     <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-aspi-blue-dark/40 rounded-full blur-[140px] translate-x-1/4 -translate-y-1/3"></div>
                     <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-aspi-red/10 rounded-full blur-[140px] -translate-x-1/4 translate-y-1/3"></div>
                     <div className="absolute inset-0 hero-pattern opacity-10"></div>
                     <AnimatedWave />
                </div>
                <div className="container mx-auto relative z-10 text-center px-4">
                    <div className="flex flex-col items-center">
                        <Breadcrumbs category={data.category} page={data.title} />
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-10 animate-in slide-in-from-bottom duration-700 leading-[1.1] tracking-tighter italic">{data.title}</h1>
                        <p className="text-lg md:text-2xl text-slate-400 max-w-4xl mx-auto font-light leading-relaxed animate-in fade-in duration-1000 delay-300">{data.subtitle}</p>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-6 lg:px-12 py-24 md:py-32 relative z-10">
                <div className="flex flex-col lg:flex-row gap-16 md:gap-24">
                    <div className="hidden lg:block w-72 shrink-0">
                         <div className="sticky top-36">
                             <h4 className="font-black text-slate-900 mb-10 border-b-4 border-aspi-red w-fit pb-3 uppercase text-[10px] tracking-[0.4em]">Sub Navigasi</h4>
                             <ul className="space-y-3">
                                 {(MENU_STRUCTURE.find(m => m.title === data.category)?.items || []).map((item, idx) => (
                                     <li key={idx}>
                                         <a 
                                            href={item.href} 
                                            className={`block text-[11px] py-4 px-6 rounded-2xl transition-all uppercase tracking-widest font-black ${
                                                window.location.hash === item.href 
                                                ? "bg-aspi-blue-dark text-white font-black shadow-2xl scale-105" 
                                                : "text-slate-500 hover:bg-slate-50 hover:text-aspi-blue-dark font-bold"
                                            }`}
                                         >
                                             {item.name}
                                         </a>
                                     </li>
                                 ))}
                                 <li className="pt-12">
                                     <a href="#home" className="flex items-center gap-3 text-[11px] font-black uppercase tracking-widest text-aspi-red hover:bg-aspi-red/5 p-4 rounded-xl transition-all group">
                                         <ArrowRight className="w-5 h-5 rotate-180 group-hover:-translate-x-2 transition-transform" /> Beranda
                                     </a>
                                 </li>
                             </ul>
                         </div>
                    </div>

                    <div className="flex-1 max-w-5xl animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
                        <div className="p-10 md:p-14 bg-white/60 backdrop-blur-md rounded-[3rem] border border-white/60 shadow-xl shadow-slate-200/50">
                            {data.content}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const App = () => {
  const [currentHash, setCurrentHash] = useState(window.location.hash || "");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
        setCurrentHash(window.location.hash);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    
    const handleKeyDown = (e: KeyboardEvent) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            setIsSearchOpen(true);
        }
    };

    window.addEventListener("hashchange", handleHashChange);
    window.addEventListener("keydown", handleKeyDown);
    return () => {
        window.removeEventListener("hashchange", handleHashChange);
        window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const getPageContent = () => {
     if (!currentHash || ["", "#", "#home"].includes(currentHash)) return null;
     if (PAGES_DATA[currentHash]) return PAGES_DATA[currentHash];
     for (const menu of MENU_STRUCTURE) {
         const item = menu.items.find(i => i.href === currentHash);
         if (item) return createDefaultPage(item.name);
     }
     if (currentHash === "#keanggotaan") return PAGES_DATA["#keanggotaan"];
     if (currentHash === "#kontak") return PAGES_DATA["#kontak"];
     return createDefaultPage(currentHash.replace("#", "").toUpperCase());
  };

  const activePage = getPageContent();

  return (
    <div className="min-h-screen bg-white font-sans antialiased selection:bg-aspi-red/10 selection:text-aspi-red">
      <Navbar activeHash={currentHash} openSearch={() => setIsSearchOpen(true)} />
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      
      {activePage ? (
          <InternalPageLayout data={activePage} />
      ) : (
          <div className="animate-in fade-in duration-1000">
            <Hero />
            <StatsBar />
            <Features />
            <KeyInitiatives />
            <NewsSection />
          </div>
      )}
      <Footer />
      <ScrollToTop />
      <ToastContainer />
    </div>
  );
};

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}