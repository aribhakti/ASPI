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
  HelpCircle
} from "lucide-react";

// --- Helper for Simulation ---
const simulateAction = (message: string) => {
    alert(message);
};

// --- Tooltip Component ---
const Tooltip = ({ text, children }: { text: string; children: React.ReactNode }) => {
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative inline-block" onMouseEnter={() => setVisible(true)} onMouseLeave={() => setVisible(false)}>
      {children}
      {visible && (
        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 p-2 bg-aspi-dark text-white text-[10px] rounded shadow-xl z-50 animate-in fade-in zoom-in duration-200">
          {text}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-aspi-dark"></div>
        </div>
      )}
    </div>
  );
};

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
  }
];

// GPN Logo Component
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
            <h3 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6 tracking-tight">Peran ASPI dalam industri sistem pembayaran</h3>
            <p className="text-base md:text-lg leading-relaxed text-slate-700 font-normal">
                ASPI memiliki peran, tugas dan fungsi membuat ketentuan dalam industri sistem pembayaran yang bersifat teknis dan mikro guna mendukung fungsi Bank Indonesia sebagai regulator agar terciptanya sistem pembayaran yang efisien, aman dan andal.
            </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="p-6 bg-slate-900 text-white rounded-2xl text-center shadow-lg transform hover:-translate-y-1 transition-all">
                <div className="text-3xl md:text-4xl font-black text-aspi-blue-light mb-2">2010</div>
                <div className="text-[10px] uppercase tracking-[0.2em] font-bold opacity-80">Didirikan tahun</div>
            </div>
            <div className="p-6 bg-white border border-slate-100 rounded-2xl text-center shadow-sm hover:shadow-xl transition-all">
                <div className="text-3xl md:text-4xl font-black text-aspi-blue-dark mb-2">250+</div>
                <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-400">Anggota aktif</div>
            </div>
            <div className="p-6 bg-white border border-slate-100 rounded-2xl text-center shadow-sm hover:shadow-xl transition-all">
                <div className="text-3xl md:text-4xl font-black text-aspi-blue-mid mb-2">120+</div>
                <div className="text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500">Anggota Bank</div>
            </div>
            <div className="p-6 bg-white border border-slate-100 rounded-2xl text-center shadow-sm hover:shadow-xl transition-all">
                <div className="text-3xl md:text-4xl font-black text-aspi-red mb-2">120+</div>
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
                
                <div className="bg-white p-8 rounded-2xl shadow-xl border-l-[6px] border-aspi-blue-dark hover:shadow-2xl transition-all">
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
  "#qris": {
    category: "Standar & Layanan",
    title: "QRIS",
    subtitle: "Quick Response Code Indonesian Standard",
    content: (
      <div className="space-y-10 text-slate-600 font-sans">
        <div className="relative h-64 md:h-96 w-full rounded-3xl overflow-hidden shadow-2xl mb-8 group">
             <img src="https://images.unsplash.com/photo-1595079676339-1534801fafde?q=80&w=1200&auto=format&fit=crop" alt="QRIS Usage" loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 group-hover:saturate-150" />
             <div className="absolute inset-0 bg-gradient-to-r from-aspi-blue-dark/80 via-aspi-blue-dark/20 to-transparent flex items-center px-8 md:px-12">
                 <h3 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-[1.1] tracking-tighter animate-in slide-in-from-left duration-700">Satu QR <br/>Untuk Semua <br/>Aplikasi.</h3>
             </div>
        </div>
        <div className="max-w-3xl">
            <p className="text-lg leading-relaxed mb-6">
                <strong className="font-bold text-slate-900">QRIS (Dibaca KRIS)</strong> adalah penyatuan berbagai macam QR dari berbagai Penyelenggara Jasa Sistem Pembayaran (PJSP) menggunakan QR Code.
            </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:-translate-y-2 transition-transform hover:shadow-2xl">
                <h4 className="text-xl font-extrabold text-slate-900 mb-6 tracking-tight">Manfaat Bagi Merchant</h4>
                <ul className="space-y-3">
                    {["Cukup satu QR Code untuk semua aplikasi.", "Mengurangi biaya pengelolaan uang tunai.", "Transaksi tercatat otomatis and real-time."].map((item, i) => (
                        <li key={i} className="flex gap-3 text-sm font-medium leading-relaxed">
                            <CheckCircle2 className="w-5 h-5 text-aspi-red shrink-0"/> {item}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:-translate-y-2 transition-transform hover:shadow-2xl">
                <h4 className="text-xl font-extrabold text-slate-900 mb-6 tracking-tight">Manfaat Bagi Pengguna</h4>
                <ul className="space-y-3">
                    {["Cepat dan praktis, tinggal scan.", "Tidak perlu repot membawa uang tunai.", "Aman karena diawasi Bank Indonesia."].map((item, i) => (
                        <li key={i} className="flex gap-3 text-sm font-medium leading-relaxed">
                            <CheckCircle2 className="w-5 h-5 text-aspi-blue-light shrink-0"/> {item}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
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
                      <h3 className="text-2xl font-extrabold text-slate-900 mb-6 tracking-tight">Komposisi Anggota</h3>
                      <p className="text-slate-600 mb-10 leading-relaxed text-base">
                          ASPI beranggotakan berbagai institusi yang memegang peran kunci dalam sistem pembayaran Indonesia.
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
                                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                                      <div className={`h-full rounded-full ${item.color} transition-all duration-1000`} style={{width: `${item.pct}%`}}></div>
                                  </div>
                              </li>
                          ))}
                      </ul>
                  </div>
                  <div className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-2xl">
                      <h4 className="font-extrabold text-slate-900 mb-8 flex items-center gap-3 text-xl tracking-tight">
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
                              <div key={i} className="flex items-center justify-between p-4 bg-slate-50 rounded-xl group hover:bg-slate-100 transition-colors">
                                  <div className="flex items-center gap-3">
                                      <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0" />
                                      <span className="text-sm font-bold text-slate-700 tracking-tight">{req.label}</span>
                                  </div>
                                  <Tooltip text={req.tooltip}>
                                    <HelpCircle className="w-4 h-4 text-slate-400 cursor-help hover:text-aspi-blue-mid transition-colors" />
                                  </Tooltip>
                              </div>
                          ))}
                      </div>
                      <button onClick={() => simulateAction("Mengunduh Formulir...")} className="w-full mt-10 py-5 bg-aspi-blue-dark text-white font-black uppercase tracking-[0.2em] text-[11px] rounded-xl hover:bg-aspi-blue-mid transition-all shadow-xl shadow-aspi-blue-dark/20 active:scale-95">
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
                      <div key={i} className="p-6 bg-slate-50 rounded-2xl hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-slate-100 group">
                          <div className="flex items-center gap-3 mb-3">
                              <div className="text-aspi-red group-hover:scale-110 transition-transform">{item.icon}</div>
                              <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">{item.label}</h4>
                          </div>
                          <p className="text-slate-800 font-extrabold leading-snug pl-8 text-lg">{item.val}</p>
                      </div>
                  ))}
              </div>
              
              <div className="bg-white p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-slate-100">
                  <h3 className="text-2xl font-black text-slate-900 mb-8 tracking-tight italic">Kirim Pesan Cepat</h3>
                  <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); simulateAction("Pesan terkirim!"); }}>
                      <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Nama Lengkap</label>
                          <input type="text" required className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-aspi-blue-mid/10 focus:border-aspi-blue-mid outline-none transition-all placeholder:text-slate-400 text-sm font-bold" placeholder="Budi Santoso" />
                      </div>
                      <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Email Institusi</label>
                          <input type="email" required className="w-full px-5 py-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-4 focus:ring-aspi-blue-mid/10 focus:border-aspi-blue-mid outline-none transition-all placeholder:text-slate-400 text-sm font-bold" placeholder="email@perusahaan.co.id" />
                      </div>
                      <div className="space-y-2">
                          <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Isi Pesan</label>
                          <textarea rows={4} required className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-xl focus:ring-4 focus:ring-aspi-blue-mid/10 focus:border-aspi-blue-mid outline-none transition-all placeholder:text-slate-400 text-sm font-bold" placeholder="Tuliskan pesan Anda..."></textarea>
                      </div>
                      <button type="submit" className="w-full py-5 bg-aspi-red text-white font-black uppercase tracking-[0.2em] text-[11px] rounded-xl hover:bg-red-700 transition-all shadow-xl shadow-aspi-red/20 active:scale-95">
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

const createDefaultPage = (title: string): PageContent => ({
    category: "Halaman",
    title: title,
    subtitle: "Infrastruktur Pembayaran Indonesia",
    content: (
        <div className="flex flex-col items-center justify-center py-24 text-slate-300 bg-slate-50 rounded-[3rem] border-2 border-dashed border-slate-200">
            <Building2 className="w-16 h-16 mb-6 opacity-20" />
            <h3 className="text-2xl font-black text-slate-400 mb-2 tracking-tight">Konten Sedang Diperbarui</h3>
            <p className="text-sm max-w-md text-center font-medium text-slate-400">Kami sedang melakukan sinkronisasi data terbaru untuk halaman ini.</p>
            <button onClick={() => window.location.hash = ""} className="mt-10 px-8 py-4 bg-aspi-dark text-white rounded-full font-black uppercase tracking-[0.3em] text-[10px] hover:bg-aspi-blue-mid transition-all shadow-xl">Kembali ke Beranda</button>
        </div>
    )
});

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
    mapRef.current.style.transform = `perspective(1000px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) scale(${hovered ? 1.05 : 1})`;
  };

  const svgContent = `
    <svg viewBox="0 0 600 250" xmlns="http://www.w3.org/2000/svg" fill="none">
        <style>
            @keyframes ping { 75%, 100% { transform: scale(2.5); opacity: 0; } }
            @keyframes pulse { 50% { opacity: .5; } }
            .ping { animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite; transform-origin: center; transform-box: fill-box; }
            .pulse { animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        </style>
        <g class="pulse" opacity="0.3">
            <path d="M190 185 L240 70" stroke="#00A3E0" stroke-width="0.7" stroke-dasharray="4 6" />
            <path d="M190 185 L350 120" stroke="#00A3E0" stroke-width="0.7" stroke-dasharray="4 6" />
            <path d="M190 185 L540 125" stroke="#00A3E0" stroke-width="0.7" stroke-dasharray="4 6" />
            <path d="M190 185 L100 95" stroke="#00A3E0" stroke-width="0.7" stroke-dasharray="4 6" />
        </g>
        <g>
            <circle cx="190" cy="185" r="10" fill="#CE1126" fill-opacity="0.3" class="ping" />
            <circle cx="190" cy="185" r="5" fill="#CE1126" />
            <circle cx="80" cy="80" r="4" fill="#0077C8" />
            <circle cx="540" cy="125" r="4" fill="#00A3E0" />
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
        className="relative w-full h-full flex items-center justify-center transition-all duration-700 ease-out cursor-crosshair"
    >
        <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] bg-aspi-blue-dark/30 blur-[120px] rounded-full transition-all duration-1000 ${hovered ? 'scale-125 opacity-70' : 'scale-100 opacity-40'}`}></div>
        
        <img 
            src={dataUri} 
            alt="Digital Connectivity Map" 
            className={`w-full h-auto z-10 transition-all duration-1000 ${hovered ? 'drop-shadow-[0_0_40px_rgba(206,17,38,0.5)]' : 'drop-shadow-none'}`}
        />

        <div className={`absolute bottom-6 right-6 p-4 glass-panel rounded-2xl shadow-2xl transition-all duration-700 ${hovered ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'} hidden lg:block`}>
            <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-aspi-cyan animate-pulse"></div>
                <div className="text-[10px] text-white uppercase tracking-widest font-black">Interkoneksi GPN Nasional</div>
            </div>
        </div>
    </div>
  )
}

// --- Background Components ---

const AnimatedWave = () => (
    <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-0 pointer-events-none">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-[60px] lg:h-[120px]">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C58.47,75.11,127.91,73.1,192.81,80,250.28,86.07,294.57,63.51,321.39,56.44Z" className="fill-[#0B1221]"></path>
        </svg>
    </div>
);

// --- Main App Components ---

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isInternal = window.location.hash && !["", "#", "#home"].includes(window.location.hash);

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-500 font-sans ${
        scrolled || isInternal
          ? "bg-white/95 backdrop-blur-xl shadow-lg py-4 border-b border-slate-100" 
          : "bg-white/5 backdrop-blur-md py-6"
      }`}
      onMouseLeave={() => setActiveDropdown(null)}
    >
      <div className="container mx-auto px-6 lg:px-12 flex items-center justify-between">
        <a href="#home" className="cursor-pointer relative z-50 transition-transform active:scale-95" onClick={() => { window.location.hash = ""; window.scrollTo(0,0); }}>
           <AspiLogo className="h-10 lg:h-11 w-auto" dark={!(scrolled || isInternal)} />
        </a>

        <div className="hidden lg:flex items-center gap-2">
          {MENU_STRUCTURE.map((menu) => (
            <div 
                key={menu.title} 
                className="relative group px-2 py-2"
                onMouseEnter={() => setActiveDropdown(menu.title)}
            >
              <button 
                className={`text-[11px] font-black uppercase tracking-[0.25em] flex items-center gap-1.5 transition-all px-4 py-2.5 rounded-full ${
                    scrolled || isInternal
                    ? (activeDropdown === menu.title ? "text-aspi-red bg-aspi-red/5" : "text-slate-700 hover:text-aspi-red hover:bg-slate-50")
                    : (activeDropdown === menu.title ? "text-white bg-white/10" : "text-gray-200 hover:text-white hover:bg-white/5")
                }`}
              >
                {menu.title}
                <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${activeDropdown === menu.title ? "rotate-180" : ""}`} />
              </button>
              
              {activeDropdown === menu.title && (
                  <div className="absolute top-full left-0 mt-3 w-72 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden py-3 animate-in fade-in slide-in-from-top-4 duration-300 ring-1 ring-black/5">
                      {menu.items.map((item, idx) => (
                          <a 
                            key={idx} 
                            href={item.href}
                            className="block px-7 py-3.5 text-[11px] font-bold text-slate-600 hover:bg-slate-50 hover:text-aspi-blue-dark transition-all border-l-4 border-transparent hover:border-aspi-blue-dark uppercase tracking-wider"
                            onClick={() => setActiveDropdown(null)}
                          >
                              {item.name}
                          </a>
                      ))}
                  </div>
              )}
            </div>
          ))}
          <a href="#keanggotaan" className={`text-[11px] font-black uppercase tracking-[0.25em] px-5 py-2.5 rounded-full transition-all ${scrolled || isInternal ? "text-slate-700 hover:text-aspi-red hover:bg-slate-50" : "text-gray-200 hover:text-white hover:bg-white/5"}`}>Keanggotaan</a>
        </div>

        <div className="hidden lg:flex items-center gap-4">
          <button 
            onClick={() => simulateAction("Mengalihkan ke Portal Member...")}
            className={`px-10 py-3.5 text-[10px] font-black uppercase tracking-[0.3em] rounded-full transition-all shadow-xl hover:scale-105 active:scale-95 ${
            scrolled || isInternal ? "bg-aspi-red text-white hover:bg-red-700 shadow-aspi-red/20" : "bg-white text-aspi-blue-dark hover:bg-gray-100 shadow-white/10"
          }`}>
            Member Area
          </button>
        </div>

        <button 
          className="lg:hidden p-2 relative z-50 transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen 
            ? <X className="text-slate-900" /> 
            : <Menu className={scrolled || isInternal ? "text-slate-900" : "text-white"} />
          }
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 pt-24 px-8 overflow-y-auto animate-in slide-in-from-right duration-500 font-sans">
          <div className="flex flex-col gap-2 pb-12">
            {MENU_STRUCTURE.map((menu) => (
                <div key={menu.title} className="border-b border-slate-100">
                    <button 
                        onClick={() => setMobileExpanded(mobileExpanded === menu.title ? null : menu.title)}
                        className="w-full flex justify-between items-center py-6 text-base font-black text-slate-900 uppercase tracking-widest"
                    >
                        {menu.title}
                        <ChevronDown className={`w-5 h-5 transition-transform ${mobileExpanded === menu.title ? "rotate-180 text-aspi-red" : "text-slate-300"}`} />
                    </button>
                    {mobileExpanded === menu.title && (
                        <div className="flex flex-col gap-2 pb-6 pl-4 animate-in slide-in-from-top duration-300">
                            {menu.items.map((item, idx) => (
                                <a key={idx} href={item.href} className="py-3 text-[11px] font-bold text-slate-500 hover:text-aspi-red uppercase tracking-widest" onClick={() => setMobileMenuOpen(false)}>
                                    {item.name}
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            ))}
            <a href="#keanggotaan" className="py-6 text-base font-black text-slate-900 border-b border-slate-100 uppercase tracking-widest" onClick={() => setMobileMenuOpen(false)}>Keanggotaan</a>
            
            <button onClick={() => { setMobileMenuOpen(false); simulateAction("Portal Login..."); }} className="mt-10 py-5 bg-aspi-red text-white rounded-2xl font-black uppercase tracking-[0.3em] text-[12px] shadow-xl shadow-aspi-red/30">Member Login</button>
          </div>
        </div>
      )}
    </nav>
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
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-aspi-blue-dark/50 rounded-full blur-[180px] -translate-y-1/3 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-aspi-red/10 rounded-full blur-[180px] translate-y-1/3 -translate-x-1/4"></div>
        <div className="absolute inset-0 hero-pattern opacity-40"></div>
        <AnimatedWave />
      </div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full glass-panel text-white text-[10px] font-black uppercase tracking-[0.4em] mb-12 border border-white/10 shadow-2xl">
            <Sparkles className="w-4 h-4 text-aspi-cyan animate-pulse" />
            Badan Regulasi Mandiri (SRO)
          </div>
          
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-white leading-[1.1] mb-12 drop-shadow-2xl tracking-tighter italic">
            Standardisasi.<br/>
            Keamanan.<br/>
            Kedaulatan.
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 mb-14 leading-relaxed max-w-2xl font-light animate-in fade-in duration-1000 delay-700">
            ASPI memperkuat ekosistem pembayaran Indonesia melalui <span className="text-white font-bold border-b-2 border-aspi-red pb-1">protokol modern</span>, regulasi kokoh, and kolaborasi strategis lintas sektor.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 animate-in fade-in slide-in-from-left duration-1000 delay-1000">
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

const StatsBar = () => {
  return (
    <div className="bg-aspi-blue-dark text-white py-16 relative z-20 -mt-24 mx-4 lg:mx-20 rounded-[3rem] shadow-[0_40px_100px_rgba(11,18,33,0.5)] border border-white/5 overflow-hidden">
      <div className="container mx-auto px-10 grid grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
        {[
          { label: "Anggota Aktif", value: "266+", icon: <Users className="w-5 h-5" /> },
          { label: "Standar Teknis", value: "12+", icon: <ShieldCheck className="w-5 h-5" /> },
          { label: "Statistik QRIS", value: "200Jt+", icon: <Smartphone className="w-5 h-5" /> },
          { label: "Tahun Berdiri", value: "2010", icon: <Calendar className="w-5 h-5" /> },
        ].map((stat, idx) => (
          <div key={idx} className="group cursor-default">
            <div className="flex items-center gap-3 text-aspi-blue-light mb-4 transition-transform group-hover:translate-x-2">
                {stat.icon}
                <span className="h-px w-8 bg-aspi-blue-light/30"></span>
            </div>
            <div className="text-3xl md:text-4xl font-black mb-3 text-white tracking-tighter transition-colors group-hover:text-aspi-cyan italic">{stat.value}</div>
            <div className="text-[10px] text-gray-400 uppercase tracking-[0.3em] font-black">{stat.label}</div>
          </div>
        ))}
      </div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
    </div>
  );
};

const SectionHeading = ({ subtitle, title, dark = false }: { subtitle: string, title: string, dark?: boolean }) => (
  <div className="mb-14">
    <div className="flex items-center gap-4 mb-6">
        <div className="h-1.5 w-12 bg-aspi-red rounded-full"></div>
        <span className="text-[10px] font-black uppercase tracking-[0.4em] text-aspi-red">
        {subtitle}
        </span>
    </div>
    <h2 className={`text-3xl md:text-4xl font-black leading-[1.1] tracking-tighter italic ${dark ? 'text-white' : 'text-slate-900'}`}>
      {title}
    </h2>
  </div>
);

const Features = () => {
  const features = [
    {
      icon: <Smartphone className="w-7 h-7" />,
      title: "Standardisasi",
      desc: "Mengembangkan protokol terpadu seperti QRIS and SNAP untuk interoperabilitas sistem pembayaran nasional."
    },
    {
      icon: <Building2 className="w-7 h-7" />,
      title: "Kolaborasi",
      desc: "Sinergi antara regulator and industri untuk dialog kebijakan yang sehat and adaptif terhadap inovasi."
    },
    {
      icon: <BookOpen className="w-7 h-7" />,
      title: "Edukasi",
      desc: "Sertifikasi and pelatihan berkelanjutan untuk meningkatkan kompetensi standar praktisi keuangan digital."
    },
    {
      icon: <ShieldCheck className="w-7 h-7" />,
      title: "Tata Kelola",
      desc: "Menjamin integritas ekosistem melalui aturan perilaku (Code of Conduct) yang wajib dipatuhi seluruh anggota."
    }
  ];

  return (
    <section id="about-section" className="py-24 md:py-32 bg-white scroll-mt-20 overflow-hidden font-sans">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-12 gap-16 md:gap-24 items-center">
          <div className="lg:col-span-5">
            <SectionHeading subtitle="Filosofi ASPI" title="Arsitek Ekosistem Pembayaran Digital" />
            <p className="text-slate-600 leading-relaxed mb-12 text-base md:text-lg font-light">
              Sebagai <span className="text-aspi-blue-dark font-extrabold underline decoration-aspi-red decoration-4 underline-offset-8">SRO Utama</span>, ASPI adalah pusat gravitasi bagi inovasi and kepatuhan dalam industri pembayaran.
            </p>
            <div className="space-y-6 mb-12">
                {[
                  "Mendorong Inklusi Keuangan Nasional",
                  "Menjaga Keamanan Transaksi Konsumen"
                ].map((item, i) => (
                  <div key={i} className="flex gap-5 p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:shadow-xl transition-all group hover:border-aspi-blue-light">
                      <CheckCircle2 className="w-6 h-6 text-green-500 shrink-0 group-hover:scale-125 transition-transform" />
                      <p className="text-slate-700 font-bold text-base tracking-tight">{item}</p>
                  </div>
                ))}
            </div>
            <a href="#about" className="px-10 py-5 bg-aspi-blue-dark text-white rounded-2xl font-black uppercase tracking-[0.2em] text-[11px] hover:bg-aspi-blue-mid transition-all inline-flex items-center gap-4 group shadow-2xl shadow-aspi-blue-dark/20">
              Pelajari Visi Kami <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </a>
          </div>
          <div className="lg:col-span-7 grid md:grid-cols-2 gap-8">
            {features.map((f, i) => (
              <div key={i} className="bg-slate-50 p-10 md:p-12 rounded-[2.5rem] hover:bg-white hover:shadow-2xl transition-all duration-500 group border border-slate-100 hover:-translate-y-3">
                <div className="w-16 h-16 bg-white shadow-lg text-aspi-blue-mid rounded-2xl flex items-center justify-center mb-10 group-hover:bg-aspi-blue-mid group-hover:text-white transition-all duration-500 transform group-hover:rotate-6">
                  {f.icon}
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mb-4 tracking-tight">{f.title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium text-sm md:text-base">{f.desc}</p>
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
    <section id="initiatives" className="py-24 md:py-40 bg-aspi-dark relative overflow-hidden scroll-mt-20 font-sans">
      <img 
        src="https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=2032" 
        alt=""
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-color-dodge pointer-events-none"
      />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-24">
            <div className="max-w-2xl">
                <SectionHeading dark subtitle="Layanan & Standar" title="Inisiatif Strategis Nasional" />
                <p className="text-slate-400 text-base md:text-lg font-light leading-relaxed">Kami membangun pondasi bagi sistem pembayaran yang berdaulat, terintegrasi, and aman.</p>
            </div>
            <a href="#nsiccs" className="hidden md:flex px-10 py-4 border-2 border-white/20 rounded-full text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white/10 transition-all hover:border-white mb-6 active:scale-95">
                Semua Layanan
            </a>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
            {[
                { id: "01", title: "QRIS", icon: <Smartphone />, color: "text-aspi-red", bg: "bg-aspi-red/10", href: "#qris", desc: "Standardisasi QR code untuk pembayaran digital yang cepat, mudah, and aman di seluruh merchant Indonesia." },
                { id: "02", title: "SNAP", icon: <Lock />, color: "text-aspi-blue-light", bg: "bg-aspi-blue-light/10", href: "#snap", desc: "Standar Nasional Open API Pembayaran untuk interkoneksi ekosistem keuangan yang terbuka and aman." },
                { id: "03", title: "GPN", icon: <CreditCard />, color: "text-aspi-blue-mid", bg: "bg-aspi-blue-mid/10", href: "#gpn", desc: "Gerbang Pembayaran Nasional yang menghubungkan seluruh kanal transaksi domestik secara efisien." }
            ].map((item, idx) => (
                <a key={idx} href={item.href} className="group relative overflow-hidden rounded-[3rem] bg-white/5 backdrop-blur-md border border-white/10 hover:border-white/30 transition-all duration-700 hover:-translate-y-4 hover:shadow-[0_40px_80px_-20px_rgba(0,163,224,0.3)]">
                    <div className="p-10 md:p-14 h-full flex flex-col">
                        <div className="mb-12 flex justify-between items-start">
                            <div className={`p-5 ${item.bg} rounded-3xl ${item.color} group-hover:scale-110 transition-transform duration-500`}>
                                {item.icon}
                            </div>
                            <h3 className={`text-5xl font-black ${item.color} opacity-5 group-hover:opacity-20 transition-opacity italic`}>{item.id}</h3>
                        </div>
                        <h4 className="text-2xl font-black mb-6 text-white group-hover:text-aspi-cyan transition-colors italic tracking-tight">{item.title}</h4>
                        <p className="text-slate-400 mb-12 flex-grow leading-relaxed text-base font-light">
                            {item.desc}
                        </p>
                        <div className="inline-flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] text-white/40 group-hover:text-white transition-all">
                            Eksplorasi Standar <ArrowRight className="w-5 h-5 group-hover:translate-x-3 transition-transform" />
                        </div>
                    </div>
                </a>
            ))}
        </div>
      </div>
    </section>
  );
};

const NewsSection = () => {
    const news = [
        { 
            category: "Peraturan", 
            date: "15 Nov 2024", 
            title: "Revisi Standar SNAP: Fokus Keamanan Multi-Faktor", 
            image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop"
        },
        { 
            category: "Acara", 
            date: "12 Nov 2024", 
            title: "Rapat Umum Anggota: Strategi Digitalisasi 2025", 
            image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?ixlib=rb-4.0.3&auto=format&fit=crop"
        },
        { 
            category: "Update", 
            date: "05 Nov 2024", 
            title: "Pertumbuhan QRIS Antarnegara Capai Rekor Baru", 
            image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop"
        },
    ];

    return (
        <section id="news" className="py-24 md:py-32 bg-slate-50 scroll-mt-20 relative font-sans">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="flex flex-col md:flex-row justify-between items-end mb-24">
                    <SectionHeading subtitle="Berita & Wawasan" title="Kabar Terkini Industri" />
                    <a href="#berita" className="px-10 py-4 text-aspi-blue-dark font-black text-[11px] uppercase tracking-[0.3em] hover:text-aspi-red transition-colors mb-6 border-b-2 border-aspi-blue-dark/10 hover:border-aspi-red flex items-center gap-3 group">
                        Arsip Berita <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                    </a>
                </div>

                <div className="grid lg:grid-cols-3 gap-10">
                    {news.map((item, idx) => (
                        <div key={idx} onClick={() => window.location.hash = "#berita"} className="group cursor-pointer bg-white rounded-[3rem] shadow-sm hover:shadow-2xl transition-all duration-700 overflow-hidden border border-slate-100 hover:-translate-y-4">
                            <div className="aspect-[16/10] bg-slate-200 overflow-hidden relative">
                                <img 
                                    src={item.image} 
                                    alt={item.title}
                                    loading="lazy"
                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
                                />
                                <div className="absolute top-8 left-8 bg-aspi-red text-white px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-[0.3em] shadow-2xl">
                                    {item.category}
                                </div>
                            </div>
                            <div className="p-10 md:p-12">
                                <div className="text-[10px] font-black text-slate-400 mb-6 uppercase tracking-[0.3em]">{item.date}</div>
                                <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-aspi-blue-dark transition-colors leading-[1.2] mb-10 tracking-tight italic">
                                    {item.title}
                                </h3>
                                <div className="flex items-center text-aspi-red font-black text-[11px] uppercase tracking-[0.2em] group-hover:gap-6 transition-all gap-3">
                                    Baca Detail <ArrowRight className="w-5 h-5" />
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
        <footer className="bg-[#0B1221] text-white pt-24 md:pt-40 pb-16 font-sans relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-aspi-blue-dark/20 rounded-full blur-[120px] -translate-y-1/2"></div>
            
            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <div className="grid lg:grid-cols-12 gap-16 mb-24">
                    <div className="lg:col-span-6">
                         <div className="mb-14">
                            <AspiLogo className="h-10 md:h-12 w-auto" dark={true} />
                        </div>
                        <p className="text-gray-400 max-w-xl mb-14 leading-relaxed text-lg md:text-xl font-light italic">
                            Mewujudkan sistem pembayaran yang efisien, aman, and berdaulat untuk masa depan ekonomi digital Indonesia.
                        </p>
                        <div className="flex gap-6">
                            {["Twitter", "LinkedIn", "Instagram"].map((social, i) => (
                                <div 
                                    key={i} 
                                    role="button" 
                                    aria-label={`Follow us on ${social}`} 
                                    className="w-14 h-14 rounded-[1.25rem] bg-white/5 hover:bg-aspi-red flex items-center justify-center transition-all duration-500 cursor-pointer text-white/50 hover:text-white border border-white/10 group hover:-translate-y-2 hover:shadow-2xl hover:shadow-aspi-red/40"
                                >
                                    <Globe className="w-6 h-6 group-hover:rotate-12 transition-transform" />
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div className="lg:col-span-3">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.4em] mb-12 text-aspi-cyan">Navigasi Utama</h4>
                        <ul className="space-y-8 text-gray-400 font-bold uppercase tracking-widest text-[11px]">
                            <li><a href="#about" className="hover:text-white transition-colors flex items-center gap-3 group"><div className="w-1.5 h-1.5 bg-aspi-red rounded-full scale-0 group-hover:scale-100 transition-transform"></div>Tentang ASPI</a></li>
                            <li><a href="#bi" className="hover:text-white transition-colors flex items-center gap-3 group"><div className="w-1.5 h-1.5 bg-aspi-red rounded-full scale-0 group-hover:scale-100 transition-transform"></div>Regulasi</a></li>
                            <li><a href="#qris" className="hover:text-white transition-colors flex items-center gap-3 group"><div className="w-1.5 h-1.5 bg-aspi-red rounded-full scale-0 group-hover:scale-100 transition-transform"></div>Layanan & Standar</a></li>
                            <li><a href="#keanggotaan" className="hover:text-white transition-colors flex items-center gap-3 group"><div className="w-1.5 h-1.5 bg-aspi-red rounded-full scale-0 group-hover:scale-100 transition-transform"></div>Keanggotaan</a></li>
                        </ul>
                    </div>

                    <div className="lg:col-span-3">
                        <h4 className="text-[11px] font-black uppercase tracking-[0.4em] mb-12 text-aspi-cyan">Kantor Pusat</h4>
                        <address className="text-gray-400 not-italic leading-loose text-base md:text-lg font-light">
                            Gedung Tifa Arum Realty,<br/>
                            Jl. Kuningan Barat 1 No.26,<br/>
                            Jakarta Selatan 12710<br/>
                            <div className="mt-10">
                                <a href="mailto:info@aspi.or.id" className="text-white hover:text-aspi-red transition-all font-black text-xl border-b-2 border-white/10 hover:border-aspi-red pb-2">info@aspi.or.id</a>
                            </div>
                        </address>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-16 flex flex-col md:flex-row justify-between items-center text-gray-600 text-[10px] font-black tracking-[0.5em] uppercase">
                    <p>&copy; {new Date().getFullYear()} ASPI Indonesia. Digital sovereignty secured.</p>
                    <div className="flex gap-12 mt-8 md:mt-0">
                        <a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#terms" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

const InternalPageLayout = ({ data }: { data: PageContent }) => {
    return (
        <div className="pt-24 min-h-screen bg-white animate-in fade-in duration-1000 font-sans">
            <div className="bg-aspi-dark relative py-32 md:py-48 px-6 overflow-hidden">
                <div className="absolute inset-0 z-0">
                     <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-aspi-blue-dark/40 rounded-full blur-[140px] translate-x-1/4 -translate-y-1/3"></div>
                     <div className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-aspi-red/10 rounded-full blur-[140px] -translate-x-1/4 translate-y-1/3"></div>
                     <div className="absolute inset-0 hero-pattern opacity-10"></div>
                     <AnimatedWave />
                </div>
                <div className="container mx-auto relative z-10 text-center">
                    <div className="inline-block px-6 py-2 bg-white/10 rounded-full text-aspi-cyan text-[10px] font-black uppercase tracking-[0.4em] mb-12 backdrop-blur-lg border border-white/10">
                        {data.category}
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white mb-10 animate-in slide-in-from-bottom duration-700 leading-[1.1] tracking-tighter italic">{data.title}</h1>
                    <p className="text-lg md:text-2xl text-slate-400 max-w-4xl mx-auto font-light leading-relaxed animate-in fade-in duration-1000 delay-300">{data.subtitle}</p>
                </div>
            </div>

            <div className="container mx-auto px-6 lg:px-12 py-24 md:py-32">
                <div className="flex flex-col lg:flex-row gap-16 md:gap-24">
                    <div className="hidden lg:block w-72 shrink-0">
                         <div className="sticky top-36">
                             <h4 className="font-black text-slate-900 mb-10 border-b-4 border-aspi-red w-fit pb-3 uppercase text-[10px] tracking-[0.4em]">Sub Navigasi</h4>
                             <ul className="space-y-3">
                                 {MENU_STRUCTURE.find(m => m.title === data.category)?.items.map((item, idx) => (
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
                        {data.content}
                    </div>
                </div>
            </div>
        </div>
    )
}

const App = () => {
  const [currentHash, setCurrentHash] = useState(window.location.hash || "");

  useEffect(() => {
    const handleHashChange = () => {
        setCurrentHash(window.location.hash);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
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
     return null;
  };

  const activePage = getPageContent();

  return (
    <div className="min-h-screen bg-white font-sans antialiased selection:bg-aspi-red/10 selection:text-aspi-red">
      <Navbar />
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
    </div>
  );
};

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(<App />);
}
