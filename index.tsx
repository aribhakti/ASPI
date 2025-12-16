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
  Info
} from "lucide-react";

// --- Helper for Simulation ---
const simulateAction = (message: string) => {
    alert(message);
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

// --- Content Data ---

type PageContent = {
  title: string;
  subtitle: string;
  content: React.ReactNode;
  category: string;
};

// GPN Logo Component to avoid external broken links
const GpnLogo = ({ className = "h-6" }) => (
    <svg viewBox="0 0 100 40" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
       <rect width="100" height="40" rx="4" fill="white"/>
       <path d="M15 10H85" stroke="#CE1126" strokeWidth="2" strokeOpacity="0.1"/>
       <text x="50" y="28" textAnchor="middle" fontFamily="sans-serif" fontWeight="900" fontSize="22" fill="#CE1126" letterSpacing="2">GPN</text>
    </svg>
);

const PAGES_DATA: Record<string, PageContent> = {
  // --- TENTANG KAMI ---
  "#about": {
    category: "Tentang Kami",
    title: "Sekilas ASPI",
    subtitle: "Meningkatkan peran pelaku sistem pembayaran di Indonesia",
    content: (
      <div className="space-y-16 text-slate-600 leading-relaxed font-sans">
        
        {/* Intro Section */}
        <div>
            <h3 className="text-3xl font-serif font-bold text-slate-900 mb-6">Peran ASPI dalam industri sistem pembayaran</h3>
            <p className="text-lg leading-relaxed text-slate-700">
                ASPI memiliki peran, tugas dan fungsi membuat ketentuan dalam industri sistem pembayaran yang bersifat teknis dan mikro guna mendukung fungsi Bank Indonesia sebagai regulator agar terciptanya sistem pembayaran yang efisien, aman dan andal, serta menjadi wadah atas perubahan dan dinamika yang terjadi pada sistem pembayaran untuk memenuhi kebutuhan anggota ASPI dalam rangka meningkatkan peran pelaku sistem pembayaran di Indonesia.
            </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-6 bg-slate-900 text-white rounded-2xl text-center shadow-lg">
                <div className="text-4xl font-bold text-aspi-cyan mb-2">2010</div>
                <div className="text-xs uppercase tracking-widest opacity-80">Didirikan tahun</div>
            </div>
            <div className="p-6 bg-white border border-slate-100 rounded-2xl text-center shadow-sm">
                <div className="text-4xl font-bold text-aspi-blue-dark mb-2">250+</div>
                <div className="text-xs uppercase tracking-widest text-slate-500">Anggota bergabung</div>
            </div>
            <div className="p-6 bg-white border border-slate-100 rounded-2xl text-center shadow-sm">
                <div className="text-4xl font-bold text-aspi-blue-mid mb-2">120+</div>
                <div className="text-xs uppercase tracking-widest text-slate-500">Anggota Bank</div>
            </div>
            <div className="p-6 bg-white border border-slate-100 rounded-2xl text-center shadow-sm">
                <div className="text-4xl font-bold text-aspi-red mb-2">120+</div>
                <div className="text-xs uppercase tracking-widest text-slate-500">Anggota Non Bank</div>
            </div>
        </div>

        {/* Visi & Misi */}
        <div className="bg-gradient-to-br from-slate-50 to-blue-50 p-10 rounded-3xl border border-blue-100 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-aspi-blue-light/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="relative z-10">
                <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                    <div className="w-10 h-1 bg-aspi-red rounded-full"></div>
                    Visi & Misi
                </h3>
                <p className="mb-8 text-lg font-medium text-slate-700">
                    ASPI diberikan kewenangan oleh Bank Indonesia dalam lingkup mikro dan teknis untuk membuat aturan main dalam industri sistem pembayaran.
                </p>
                
                <div className="bg-white p-8 rounded-2xl shadow-md border-l-4 border-aspi-blue-dark">
                    <h4 className="text-aspi-blue-dark font-bold uppercase tracking-wider text-sm mb-3">Visi Misi Utama</h4>
                    <p className="text-xl md:text-2xl font-serif font-bold text-slate-900 leading-normal">
                        "Mewujudkan Sistem Pembayaran Nasional yang lebih efisien, aman, andal, cepat, dan terintegrasi dalam menuju Less Cash Society"
                    </p>
                </div>
            </div>
        </div>

        {/* Latar Belakang */}
        <div>
            <h3 className="text-2xl font-bold text-slate-900 mb-8 border-b border-gray-100 pb-4">Latar Belakang</h3>
            
            <div className="space-y-12">
                <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/3 shrink-0">
                        <div className="bg-aspi-red/5 p-6 rounded-2xl">
                            <TrendingUp className="w-10 h-10 text-aspi-red mb-4" />
                            <h4 className="font-bold text-lg text-slate-900">Layanan jasa sistem pembayaran terus berkembang</h4>
                        </div>
                    </div>
                    <div className="md:w-2/3">
                        <p className="text-slate-600 leading-relaxed">
                            Perkembangan berbagai layanan jasa sistem pembayaran mendorong munculnya para pelaku baru dalam industri sistem pembayaran di Indonesia dari yang semula hanya dilakukan oleh bank, saat ini mulai bermunculan penyelenggara layanan sistem pembayaran yang dilakukan oleh lembaga selain bank. Untuk memberikan nilai tambah dan meningkatkan layanan kepada nasabah, masing-masing pelaku sistem pembayaran melakukan berbagai inovasi dalam teknologi, produk dan layanannya.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/3 shrink-0">
                        <div className="bg-aspi-blue-dark/5 p-6 rounded-2xl">
                            <ShieldCheck className="w-10 h-10 text-aspi-blue-dark mb-4" />
                            <h4 className="font-bold text-lg text-slate-900">Menjaga kompetensi dan kelancaran sistem pembayaran</h4>
                        </div>
                    </div>
                    <div className="md:w-2/3">
                        <p className="text-slate-600 leading-relaxed">
                            Seiring dengan perkembangan teknologi dalam industri sistem pembayaran, dibutuhkan ketentuan/peraturan yang tepat, cepat dan mampu mengakomodir perkembangan terkini dari penyelenggaraan sistem pembayaran dari berbagai sisi baik bisnis maupun teknis. Di satu sisi, Bank Indonesia selaku otoritas di bidang sistem pembayaran memiliki kewenangan untuk mengatur dan menjaga kelancaran sistem pembayaran secara menyeluruh di Indonesia, sementara disisi lain, pihak industri memiliki kompetensi terkait dengan aspek mikro dan teknis penyelenggaraan sistem pembayaran yang diantaranya teknologi informasi dan infrastruktur.
                        </p>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    <div className="md:w-1/3 shrink-0">
                        <div className="bg-aspi-blue-light/5 p-6 rounded-2xl">
                            <Users className="w-10 h-10 text-aspi-blue-light mb-4" />
                            <h4 className="font-bold text-lg text-slate-900">Peran aktif industri sistem pembayaran</h4>
                        </div>
                    </div>
                    <div className="md:w-2/3">
                        <p className="text-slate-600 leading-relaxed">
                            Untuk mendukung terciptanya sistem pembayaran yang efisien, cepat, aman dan andal, industri sistem pembayaran sebagai pihak yang lebih memahami kebutuhan dan kepentingan pasar, perlu berperan aktif. Peran aktif tersebut dapat diwujudkan dengan membentuk suatu organisasi yang merepresentasikan seluruh pelaku sistem pembayaran dan menjadi mitra Bank Indonesia dalam mewujudkan tujuan Bank Indonesia dalam melaksanakan tugas mengatur dan menjaga kelancaran sistem pembayaran secara menyeluruh di Indonesia.
                        </p>
                    </div>
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
      <div className="space-y-8 text-slate-600 leading-relaxed">
        <p className="text-lg">
          ASPI memiliki peran, tugas, dan fungsi untuk menciptakan kepastian industri sistem pembayaran yang bersifat teknis dan mikro. Hal ini mendukung fungsi Bank Indonesia sebagai regulator untuk menjamin sistem pembayaran yang efisien, aman, dan andal.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
            <div className="p-8 rounded-xl bg-white border border-slate-100 shadow-lg hover:border-aspi-blue-mid transition-all group">
                <ShieldCheck className="w-10 h-10 text-aspi-blue-mid mb-6 group-hover:scale-110 transition-transform"/>
                <h4 className="text-xl font-bold text-slate-900 mb-3">Regulasi Mandiri</h4>
                <p className="text-slate-500">Menetapkan aturan perilaku (code of conduct), standar mikro-prudensial, dan disiplin pasar yang wajib dipatuhi anggota demi kesehatan industri.</p>
            </div>
            <div className="p-8 rounded-xl bg-white border border-slate-100 shadow-lg hover:border-aspi-blue-mid transition-all group">
                <Users className="w-10 h-10 text-aspi-blue-mid mb-6 group-hover:scale-110 transition-transform"/>
                <h4 className="text-xl font-bold text-slate-900 mb-3">Advokasi Industri</h4>
                <p className="text-slate-500">Menjadi mitra strategis Bank Indonesia dalam merumuskan kebijakan, serta menyuarakan aspirasi dan tantangan yang dihadapi pelaku industri.</p>
            </div>
             <div className="p-8 rounded-xl bg-white border border-slate-100 shadow-lg hover:border-aspi-blue-mid transition-all group">
                <BookOpen className="w-10 h-10 text-aspi-blue-mid mb-6 group-hover:scale-110 transition-transform"/>
                <h4 className="text-xl font-bold text-slate-900 mb-3">Edukasi & Sertifikasi</h4>
                <p className="text-slate-500">Menyelenggarakan program pelatihan berkelanjutan dan sertifikasi profesi untuk memastikan standar kompetensi yang tinggi bagi praktisi pembayaran.</p>
            </div>
             <div className="p-8 rounded-xl bg-white border border-slate-100 shadow-lg hover:border-aspi-blue-mid transition-all group">
                <TrendingUp className="w-10 h-10 text-aspi-blue-mid mb-6 group-hover:scale-110 transition-transform"/>
                <h4 className="text-xl font-bold text-slate-900 mb-3">Inovasi Infrastruktur</h4>
                <p className="text-slate-500">Mendorong pengembangan infrastruktur pembayaran nasional yang berdaulat, seperti GPN dan interkoneksi pembayaran lintas batas.</p>
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
      <div className="space-y-8">
         <p className="text-slate-600 text-lg">Badan Pengawas bertugas melakukan pengawasan terhadap pelaksanaan tugas Badan Pengurus, pengelolaan kebijakan strategis, serta memberikan nasihat untuk memastikan ASPI tetap berjalan sesuai koridor hukum dan etika.</p>
         <div className="grid gap-4 mt-8">
            {[
                { name: "Santoso Liem", pos: "Direktur PT Bank Central Asia Tbk" },
                { name: "Handayani", pos: "Direktur Bisnis Konsumer BRI" },
                { name: "Timothy Utama", pos: "Direktur Teknologi Informasi Bank Mandiri" },
                { name: "Rico Usthavia Frans", pos: "Komisaris Utama ALTO" },
                { name: "Haryanto T. Budiman", pos: "Direktur Bank Central Asia" }
            ].map((person, i) => (
                <div key={i} className="flex items-center gap-6 p-6 bg-white shadow-sm border border-slate-100 rounded-xl hover:shadow-md transition-all">
                    <div className="w-16 h-16 bg-aspi-blue-dark/5 rounded-full flex items-center justify-center text-aspi-blue-dark shrink-0">
                        <User className="w-8 h-8"/>
                    </div>
                    <div>
                        <div className="text-xl font-bold text-slate-900">{person.name}</div>
                        <div className="text-slate-500 font-medium">{person.pos}</div>
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
      <div className="space-y-8 text-slate-600">
        <p className="text-lg">Badan Pengurus bertanggung jawab atas pengelolaan kegiatan ASPI sehari-hari, pengambilan keputusan operasional, dan pelaksanaan program kerja yang telah disetujui dalam Rapat Umum Anggota.</p>
        
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
            <h3 className="text-xl font-bold text-slate-900 mb-8 pb-4 border-b border-gray-100">Komite Eksekutif</h3>
            <div className="space-y-8">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="w-32 font-bold text-aspi-red uppercase text-sm tracking-wider">Ketua Umum</div>
                    <div>
                        <div className="text-xl font-bold text-slate-900">Santoso</div>
                        <div className="text-slate-500">PT Bank Central Asia Tbk</div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="w-32 font-bold text-aspi-blue-dark uppercase text-sm tracking-wider">Wakil Ketua I</div>
                    <div>
                        <div className="text-xl font-bold text-slate-900">Dina Artarini</div>
                        <div className="text-slate-500">PT Bank Mandiri (Persero) Tbk</div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="w-32 font-bold text-aspi-blue-dark uppercase text-sm tracking-wider">Wakil Ketua II</div>
                    <div>
                        <div className="text-xl font-bold text-slate-900">Rico Usthavia Frans</div>
                        <div className="text-slate-500">ALTO Network</div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="w-32 font-bold text-aspi-blue-dark uppercase text-sm tracking-wider">Sekjen</div>
                    <div>
                        <div className="text-xl font-bold text-slate-900">Handayani</div>
                        <div className="text-slate-500">PT Bank Rakyat Indonesia (Persero) Tbk</div>
                    </div>
                </div>
            </div>
        </div>
      </div>
    )
  },
  "#direktur": {
    category: "Tentang Kami",
    title: "Direktur Eksekutif",
    subtitle: "Pimpinan Eksekutif ASPI",
    content: (
      <div className="flex flex-col md:flex-row gap-10 items-start">
         <div className="w-full md:w-5/12 aspect-[3/4] bg-slate-200 rounded-2xl overflow-hidden relative shadow-2xl">
            <img 
                src="https://images.unsplash.com/photo-1560250097-0b9358eac341?q=80&w=800&auto=format&fit=crop" 
                alt="Executive Director" 
                loading="lazy"
                className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-aspi-blue-dark/80 to-transparent flex items-end p-8">
                <div className="text-white">
                    <div className="text-2xl font-bold">Suharto Nur</div>
                    <div className="opacity-80 text-sm uppercase tracking-widest mt-1">Direktur Eksekutif</div>
                </div>
            </div>
         </div>
         <div className="flex-1 space-y-6 text-lg text-slate-600">
            <h3 className="text-3xl font-serif font-bold text-slate-900">Profil Singkat</h3>
            <p className="leading-relaxed">
                Bapak Suharto Nur adalah seorang profesional veteran dengan pengalaman lebih dari 25 tahun di industri perbankan dan sistem pembayaran nasional. Sebelum menjabat di ASPI, beliau memegang berbagai posisi strategis di bank-bank terkemuka Indonesia.
            </p>
            <p className="leading-relaxed">
                Sebagai Direktur Eksekutif, beliau memimpin operasional harian ASPI dan memastikan eksekusi strategis dari mandat yang diberikan oleh Badan Pengurus. Di bawah kepemimpinannya, ASPI telah berhasil mengawal peluncuran berbagai inisiatif nasional yang revolusioner, termasuk implementasi QRIS yang kini telah mendunia.
            </p>
            <div className="pt-6 border-t border-slate-200">
                <div className="text-sm font-bold text-slate-900 uppercase tracking-widest mb-2">Fokus Utama</div>
                <ul className="grid grid-cols-2 gap-4">
                    <li className="flex items-center gap-2"><div className="w-2 h-2 bg-aspi-red rounded-full"></div>Akselerasi Digital</li>
                    <li className="flex items-center gap-2"><div className="w-2 h-2 bg-aspi-red rounded-full"></div>Keamanan Siber</li>
                    <li className="flex items-center gap-2"><div className="w-2 h-2 bg-aspi-red rounded-full"></div>Inklusi Keuangan</li>
                </ul>
            </div>
         </div>
      </div>
    )
  },

  // --- PERATURAN ---
  "#buletin": {
    category: "Peraturan",
    title: "Buletin ASPI",
    subtitle: "Publikasi Resmi & Update Industri",
    content: (
        <div className="space-y-6">
            <p className="text-slate-600 mb-8">Dapatkan wawasan terbaru mengenai perkembangan sistem pembayaran, kebijakan strategis, dan aktivitas ASPI melalui buletin resmi kami.</p>
            <div className="grid md:grid-cols-2 gap-6">
                {[
                    { title: "Buletin Edisi Q3 2024", date: "Oktober 2024", topic: "Masa Depan Open Banking" },
                    { title: "Buletin Edisi Q2 2024", date: "Juli 2024", topic: "Perluasan QRIS Antarnegara" },
                    { title: "Buletin Edisi Q1 2024", date: "April 2024", topic: "Keamanan Siber dalam Pembayaran Digital" },
                    { title: "Buletin Edisi Khusus", date: "Januari 2024", topic: "Outlook Sistem Pembayaran 2024" }
                ].map((item, idx) => (
                    <div key={idx} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm hover:shadow-lg transition-all group cursor-pointer" onClick={() => simulateAction(`Mengunduh ${item.title}...`)}>
                        <div className="flex justify-between items-start mb-4">
                            <div className="p-3 bg-aspi-blue-light/10 text-aspi-blue-light rounded-lg"><BookOpen className="w-6 h-6"/></div>
                            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{item.date}</span>
                        </div>
                        <h4 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-aspi-blue-dark transition-colors">{item.title}</h4>
                        <p className="text-slate-500 text-sm mb-4">Topik Utama: {item.topic}</p>
                        <button className="flex items-center text-aspi-red font-semibold text-sm hover:underline">
                            Unduh PDF <Download className="w-4 h-4 ml-2"/>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
  },
  "#ketentuan": {
    category: "Peraturan",
    title: "Ketentuan ASPI",
    subtitle: "Regulasi & Standar Operasional Anggota",
    content: (
        <div className="space-y-8">
            <div className="bg-amber-50 border border-amber-100 p-6 rounded-xl flex gap-4 items-start">
                <Info className="w-6 h-6 text-amber-600 shrink-0 mt-1"/>
                <div>
                    <h4 className="font-bold text-amber-800 mb-1">Penting</h4>
                    <p className="text-amber-700 text-sm">Seluruh anggota ASPI wajib mematuhi ketentuan yang berlaku untuk memastikan keamanan, efisiensi, dan perlindungan konsumen dalam ekosistem sistem pembayaran.</p>
                </div>
            </div>
            
            <div className="space-y-4">
                {[
                    "Ketentuan Penyelenggaraan QRIS (Revisi 2024)",
                    "Ketentuan Biaya Layanan Sistem Pembayaran",
                    "Ketentuan Teknis Keamanan Data Transaksi",
                    "Ketentuan Standar Pelaporan Insiden Siber",
                    "Ketentuan Mekanisme Penyelesaian Sengketa"
                ].map((rule, i) => (
                    <div key={i} className="flex items-center justify-between p-5 bg-white rounded-xl shadow-sm border border-slate-100 hover:border-aspi-blue-dark transition-all cursor-pointer group" onClick={() => simulateAction(`Membuka dokumen: ${rule}`)}>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-500 group-hover:bg-aspi-blue-dark group-hover:text-white transition-colors font-serif font-bold">
                                {i+1}
                            </div>
                            <div className="font-medium text-slate-700 group-hover:text-aspi-blue-dark text-lg">{rule}</div>
                        </div>
                        <Download className="w-5 h-5 text-slate-400 group-hover:text-aspi-blue-mid"/>
                    </div>
                ))}
            </div>
        </div>
    )
  },
  "#bi": {
    category: "Peraturan",
    title: "Peraturan Bank Indonesia",
    subtitle: "Regulasi Utama Sistem Pembayaran",
    content: (
       <div className="space-y-4">
           <p className="text-slate-600 mb-6">Berikut adalah daftar peraturan utama dari Bank Indonesia yang menjadi landasan operasional sistem pembayaran di Indonesia.</p>
           {[
               { title: "PBI No. 23/6/PBI/2021", desc: "Tentang Penyedia Jasa Pembayaran (PJP)" },
               { title: "PBI No. 23/7/PBI/2021", desc: "Tentang Infrastruktur Pasar Keuangan (IPK)" },
               { title: "PBI No. 22/23/PBI/2020", desc: "Tentang Sistem Pembayaran" },
               { title: "PADG No. 24/7/PADG/2022", desc: "Tentang Penyelenggaraan Sistem Pembayaran oleh PJP" },
               { title: "PBI No. 19/8/PBI/2017", desc: "Tentang Gerbang Pembayaran Nasional (National Payment Gateway)" }
           ].map((rule, i) => (
               <div key={i} className="flex items-center justify-between p-5 bg-white rounded-xl shadow-sm border border-slate-100 hover:border-aspi-blue-dark hover:shadow-md transition-all cursor-pointer group" onClick={() => simulateAction(`Mengakses PBI: ${rule.title}`)}>
                   <div className="flex items-start gap-4">
                       <div className="bg-aspi-red/10 p-2 rounded text-aspi-red mt-1"><FileText className="w-6 h-6"/></div>
                       <div>
                           <div className="font-bold text-slate-900 group-hover:text-aspi-blue-dark transition-colors">{rule.title}</div>
                           <div className="text-slate-500 text-sm">{rule.desc}</div>
                       </div>
                   </div>
                   <button className="flex items-center gap-2 text-sm font-bold text-aspi-blue-mid bg-aspi-blue-mid/5 px-4 py-2 rounded-lg group-hover:bg-aspi-blue-mid group-hover:text-white transition-all">
                       <Download className="w-4 h-4"/> PDF
                   </button>
               </div>
           ))}
       </div>
    )
  },
  "#pedoman": {
    category: "Peraturan",
    title: "Pedoman ASPI",
    subtitle: "Panduan Teknis & Operasional Anggota",
    content: (
       <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-100 p-6 rounded-xl text-blue-900 text-sm mb-6 flex gap-4">
                <BookOpen className="w-6 h-6 shrink-0"/>
                <p>Pedoman ini disusun oleh ASPI sebagai standar operasional yang wajib dipatuhi oleh anggota untuk memastikan interoperabilitas dan keamanan.</p>
            </div>
           {[
               "Pedoman Tata Kelola QRIS untuk Penyelenggara Jasa Sistem Pembayaran",
               "Pedoman Teknis Standar Nasional Open API Pembayaran (SNAP)",
               "Pedoman Keamanan Siber dan Ketahanan Cyber untuk PJP",
               "Pedoman Perlindungan Konsumen dan Penanganan Pengaduan",
               "Pedoman Teknis Kartu Kredit Pemerintah Domestik"
           ].map((rule, i) => (
               <div key={i} className="flex items-center justify-between p-4 bg-white rounded-lg border border-slate-200 hover:border-aspi-blue-light transition-all cursor-pointer group" onClick={() => simulateAction(`Membuka Pedoman: ${rule}`)}>
                   <div className="flex items-center gap-3">
                       <div className="w-2 h-2 rounded-full bg-aspi-blue-mid group-hover:scale-150 transition-transform"></div>
                       <span className="font-medium text-slate-700 group-hover:text-aspi-blue-dark">{rule}</span>
                   </div>
                   <Download className="w-4 h-4 text-slate-400 group-hover:text-aspi-blue-mid"/>
               </div>
           ))}
       </div>
    )
  },

  // --- STANDAR & LAYANAN ---
  "#nsiccs": {
    category: "Standar & Layanan",
    title: "NSICCS",
    subtitle: "National Standard Indonesian Chip Card Specification",
    content: (
        <div className="space-y-8">
            <p className="text-lg text-slate-600">
                NSICCS adalah standar nasional untuk teknologi kartu chip di Indonesia. Standar ini memastikan keamanan transaksi kartu debit dan ATM serta interoperabilitas antar penerbit kartu di seluruh jaringan domestik.
            </p>
            
            <div className="bg-slate-50 p-8 rounded-2xl border border-slate-100">
                <h3 className="text-xl font-bold text-slate-900 mb-6">Peta Jalan Implementasi</h3>
                <div className="relative border-l-2 border-aspi-blue-mid ml-3 space-y-10 py-2">
                    {[
                        { year: "Tahap 1", title: "Migrasi Kartu ATM/Debit", desc: "Penerbitan kartu baru wajib menggunakan chip NSICCS." },
                        { year: "Tahap 2", title: "Upgrade Infrastruktur", desc: "Penyesuaian mesin ATM dan EDC untuk menerima kartu chip NSICCS." },
                        { year: "Tahap 3", title: "Kewajiban Penuh", desc: "Seluruh transaksi domestik wajib diproses menggunakan standar NSICCS." }
                    ].map((step, idx) => (
                        <div key={idx} className="relative pl-8">
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-white border-4 border-aspi-blue-mid"></div>
                            <div className="text-sm font-bold text-aspi-blue-mid uppercase tracking-widest mb-1">{step.year}</div>
                            <h4 className="text-lg font-bold text-slate-900">{step.title}</h4>
                            <p className="text-slate-500">{step.desc}</p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
                <button 
                    onClick={() => simulateAction("Mengunduh Spesifikasi Teknis NSICCS...")}
                    className="flex items-center justify-center gap-2 p-4 border border-aspi-blue-dark text-aspi-blue-dark rounded-lg font-bold hover:bg-aspi-blue-dark hover:text-white transition-colors"
                >
                    <Download className="w-4 h-4"/> Spesifikasi Teknis NSICCS
                </button>
                <button 
                    onClick={() => simulateAction("Mengarahkan ke Portal Sertifikasi...")}
                    className="flex items-center justify-center gap-2 p-4 border border-aspi-blue-dark text-aspi-blue-dark rounded-lg font-bold hover:bg-aspi-blue-dark hover:text-white transition-colors"
                >
                    <ExternalLink className="w-4 h-4"/> Portal Sertifikasi
                </button>
            </div>
        </div>
    )
  },
  "#qris": {
    category: "Standar & Layanan",
    title: "QRIS",
    subtitle: "Quick Response Code Indonesian Standard",
    content: (
      <div className="space-y-8 text-slate-600 text-lg">
        <div className="relative h-80 w-full rounded-2xl overflow-hidden shadow-2xl mb-8 group">
             <img src="https://images.unsplash.com/photo-1595079676339-1534801fafde?q=80&w=1200&auto=format&fit=crop" alt="QRIS Usage" loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
             <div className="absolute inset-0 bg-gradient-to-r from-aspi-blue-dark/80 to-transparent flex items-center px-10">
                 <h3 className="text-4xl font-bold text-white drop-shadow-lg">Satu QR <br/>Untuk Semua.</h3>
             </div>
        </div>
        <p>
            <strong>QRIS (Dibaca KRIS)</strong> adalah penyatuan berbagai macam QR dari berbagai Penyelenggara Jasa Sistem Pembayaran (PJSP) menggunakan QR Code. QRIS dikembangkan oleh industri sistem pembayaran bersama dengan Bank Indonesia agar proses transaksi dengan QR Code dapat lebih mudah, cepat, dan terjaga keamanannya.
        </p>
        
        <h3 className="text-2xl font-bold text-slate-900 mt-8">Jenis Pembayaran QRIS</h3>
        <div className="grid md:grid-cols-2 gap-6">
             <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                 <h4 className="font-bold text-aspi-blue-dark text-lg mb-2">QRIS Statis</h4>
                 <p className="text-sm text-slate-500">Biasanya dipajang melalui stiker atau tent card. Pengguna melakukan scan, lalu memasukkan nominal transaksi secara manual.</p>
             </div>
             <div className="p-6 bg-slate-50 rounded-xl border border-slate-100">
                 <h4 className="font-bold text-aspi-blue-dark text-lg mb-2">QRIS Dinamis</h4>
                 <p className="text-sm text-slate-500">Dihasilkan secara real-time melalui mesin EDC atau smartphone merchant. Nominal transaksi sudah terisi otomatis.</p>
             </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-aspi-red">
                <h4 className="text-xl font-bold text-slate-900 mb-4">Manfaat Bagi Merchant</h4>
                <ul className="space-y-2 text-sm">
                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-aspi-red"/>Cukup satu QR Code untuk semua aplikasi.</li>
                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-aspi-red"/>Mengurangi biaya pengelolaan uang tunai.</li>
                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-aspi-red"/>Transaksi tercatat otomatis dan real-time.</li>
                </ul>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md border-t-4 border-aspi-blue-light">
                <h4 className="text-xl font-bold text-slate-900 mb-4">Manfaat Bagi Pengguna</h4>
                <ul className="space-y-2 text-sm">
                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-aspi-blue-light"/>Cepat dan praktis, tinggal scan.</li>
                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-aspi-blue-light"/>Tidak perlu repot membawa uang tunai.</li>
                    <li className="flex gap-2"><CheckCircle2 className="w-4 h-4 text-aspi-blue-light"/>Aman karena diawasi Bank Indonesia.</li>
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
        <div className="space-y-8 text-slate-600">
             <div className="bg-[#0f172a] text-white p-10 rounded-2xl mb-8 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
                <div className="relative z-10 max-w-lg">
                    <div className="inline-block px-3 py-1 bg-aspi-blue-light/20 text-aspi-blue-light rounded text-xs font-bold mb-4">OPEN BANKING</div>
                    <h3 className="text-3xl font-bold mb-4">Terhubung Tanpa Batas</h3>
                    <p className="opacity-80 leading-relaxed">SNAP menetapkan protokol komunikasi standar untuk API pembayaran, memungkinkan integrasi sistem yang mulus antara Bank dan Fintech.</p>
                </div>
                <div className="relative z-10 flex gap-4">
                     <div className="w-16 h-16 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/10 font-mono text-2xl font-bold">{`{ }`}</div>
                     <div className="w-16 h-16 bg-aspi-blue-light rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(0,163,224,0.5)]"><ExternalLink className="w-8 h-8 text-white"/></div>
                </div>
                {/* Abstract bg */}
                <div className="absolute right-0 top-0 w-64 h-64 bg-aspi-blue-mid blur-[80px] opacity-30"></div>
                <div className="absolute left-0 bottom-0 w-64 h-64 bg-aspi-red blur-[80px] opacity-20"></div>
             </div>

             <div className="prose prose-lg text-slate-600 max-w-none">
                 <p>
                     <strong>SNAP (Standar Nasional Open API Pembayaran)</strong> merupakan standar nasional yang ditetapkan Bank Indonesia atas seperangkat protokol dan instruksi yang memfasilitasi interkoneksi antar aplikasi secara terbuka dalam pemrosesan transaksi pembayaran.
                 </p>
                 <p>
                     Tujuannya adalah untuk menciptakan efisiensi sistem pembayaran, mengurangi fragmentasi industri, dan mendorong inovasi layanan keuangan digital. Dengan SNAP, hambatan teknis integrasi dapat diminimalisir, sehingga waktu <em className="text-slate-800">time-to-market</em> produk baru menjadi lebih cepat.
                 </p>
             </div>
             
             <div className="mt-8">
                 <h4 className="text-xl font-bold text-slate-900 mb-6">Dokumentasi Teknis</h4>
                 <div className="space-y-3">
                     {["Spesifikasi Teknis API Transfer Kredit", "Spesifikasi Teknis API Informasi Saldo", "Spesifikasi Teknis API Informasi Rekening", "Standar Keamanan API (Oauth 2.0)"].map((doc, i) => (
                         <div key={i} className="flex items-center gap-3 p-3 border-b border-gray-100 hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => simulateAction(`Mengunduh ${doc}...`)}>
                             <FileText className="w-4 h-4 text-slate-400"/>
                             <span className="text-slate-700 flex-1">{doc}</span>
                             <span className="text-xs font-mono bg-slate-100 px-2 py-1 rounded text-slate-500">v1.0.2</span>
                         </div>
                     ))}
                 </div>
             </div>
        </div>
    )
  },
  "#ca": {
    category: "Standar & Layanan",
    title: "Certificate Authority",
    subtitle: "Layanan Sertifikat Digital ASPI",
    content: (
        <div className="space-y-8 text-slate-600">
             <p className="text-lg">
                 ASPI menyediakan layanan Certificate Authority (CA) untuk mendukung keamanan komunikasi data dalam ekosistem sistem pembayaran. Sertifikat digital ini menjamin otentikasi, integritas, dan non-repudiasi transaksi.
             </p>
             <div className="grid md:grid-cols-3 gap-6">
                 <div className="p-6 border border-slate-100 rounded-xl shadow-sm text-center">
                     <Lock className="w-10 h-10 text-aspi-blue-dark mx-auto mb-4"/>
                     <h4 className="font-bold text-slate-900">Penerbitan</h4>
                     <p className="text-sm text-slate-500 mt-2">Layanan penerbitan sertifikat digital untuk entitas anggota.</p>
                 </div>
                 <div className="p-6 border border-slate-100 rounded-xl shadow-sm text-center">
                     <ShieldCheck className="w-10 h-10 text-aspi-blue-dark mx-auto mb-4"/>
                     <h4 className="font-bold text-slate-900">Validasi</h4>
                     <p className="text-sm text-slate-500 mt-2">Verifikasi identitas pemegang sertifikat secara ketat.</p>
                 </div>
                 <div className="p-6 border border-slate-100 rounded-xl shadow-sm text-center">
                     <CheckCircle2 className="w-10 h-10 text-aspi-blue-dark mx-auto mb-4"/>
                     <h4 className="font-bold text-slate-900">Manajemen</h4>
                     <p className="text-sm text-slate-500 mt-2">Pembaruan dan pencabutan sertifikat (CRL Management).</p>
                 </div>
             </div>
             <div className="bg-slate-900 text-white p-6 rounded-xl flex items-center justify-between">
                 <div>
                     <h4 className="font-bold text-lg">Kebijakan CA (Certificate Policy)</h4>
                     <p className="text-slate-400 text-sm">Dokumen lengkap mengenai kerangka kerja kepercayaan.</p>
                 </div>
                 <button onClick={() => simulateAction("Mengunduh Kebijakan CA...")} className="px-4 py-2 bg-aspi-cyan text-white rounded font-bold hover:bg-cyan-600">Unduh PDF</button>
             </div>
        </div>
    )
  },
   "#gpn": {
    category: "Standar & Layanan",
    title: "Kartu Logo GPN",
    subtitle: "Gerbang Pembayaran Nasional",
    content: (
        <div className="space-y-8 text-slate-600">
             <div className="flex flex-col md:flex-row gap-8 items-center mb-10 bg-gradient-to-br from-slate-50 to-white p-8 rounded-2xl border border-slate-100">
                 <div className="h-48 w-80 bg-gradient-to-br from-red-600 to-[#800] rounded-xl shadow-2xl relative p-6 text-white flex flex-col justify-between shrink-0 transform rotate-1 hover:rotate-0 transition-transform duration-500">
                    <div className="flex justify-between items-start">
                        <div className="w-12 h-8 bg-yellow-400/80 rounded"></div>
                        <div className="text-xs font-mono opacity-70">DEBIT</div>
                    </div>
                    <div className="font-mono text-xl tracking-widest text-shadow">0000 0000 0000 0000</div>
                    <div className="flex justify-between items-end">
                        <div className="text-xs opacity-70">MEMBER NAME</div>
                        {/* Replaced external Wikimedia logo with inline SVG */}
                        <div className="bg-white px-2 py-1 rounded"><GpnLogo className="h-6" /></div>
                    </div>
                 </div>
                 <div>
                     <h3 className="text-2xl font-bold text-slate-900 mb-4">Kedaulatan Pembayaran Nasional</h3>
                     <p className="leading-relaxed">GPN (Gerbang Pembayaran Nasional) adalah sistem yang mengintegrasikan berbagai instrumen dan kanal pembayaran secara nasional. Kartu berlogo GPN dapat digunakan di seluruh mesin EDC dan ATM di Indonesia, tanpa memandang bank penerbitnya.</p>
                 </div>
             </div>
             
             <div className="grid md:grid-cols-3 gap-6">
                 <div className="p-6 bg-white border border-slate-100 rounded-lg text-center">
                     <div className="text-4xl font-bold text-aspi-red mb-2">100%</div>
                     <div className="text-sm font-bold text-slate-900 uppercase">Domestik</div>
                     <p className="text-xs text-slate-500 mt-2">Pemrosesan transaksi dilakukan di dalam negeri.</p>
                 </div>
                  <div className="p-6 bg-white border border-slate-100 rounded-lg text-center">
                     <div className="text-4xl font-bold text-aspi-blue-mid mb-2">Low Cost</div>
                     <div className="text-sm font-bold text-slate-900 uppercase">MDR Rendah</div>
                     <p className="text-xs text-slate-500 mt-2">Biaya merchant (MDR) yang lebih kompetitif (1%).</p>
                 </div>
                  <div className="p-6 bg-white border border-slate-100 rounded-lg text-center">
                     <div className="text-4xl font-bold text-aspi-blue-dark mb-2">Aman</div>
                     <div className="text-sm font-bold text-slate-900 uppercase">Chip Tech</div>
                     <p className="text-xs text-slate-500 mt-2">Menggunakan teknologi chip standar nasional (NSICCS).</p>
                 </div>
             </div>
        </div>
    )
  },
  "#atm": {
    category: "Standar & Layanan",
    title: "Sertifikasi ATM",
    subtitle: "Daftar Vendor & Model ATM Tersertifikasi",
    content: (
        <div className="space-y-8">
            <p className="text-slate-600">
                Untuk menjamin keamanan dan kompatibilitas, seluruh perangkat ATM yang beroperasi dalam jaringan nasional wajib melalui proses sertifikasi yang ditetapkan oleh ASPI. Berikut adalah daftar perangkat yang telah lulus uji.
            </p>
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-slate-50 text-slate-900 uppercase font-bold border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4">Vendor</th>
                            <th className="px-6 py-4">Model</th>
                            <th className="px-6 py-4">Jenis</th>
                            <th className="px-6 py-4">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {[
                            { vendor: "Diebold Nixdorf", model: "CS 2020", type: "Cash Dispenser", status: "Valid" },
                            { vendor: "NCR", model: "SelfServ 23", type: "Cash Dispenser", status: "Valid" },
                            { vendor: "Hyosung", model: "Monimax 5600", type: "CRM (Recycler)", status: "Valid" },
                            { vendor: "Hitachi", model: "SR7500", type: "CRM (Recycler)", status: "Valid" },
                            { vendor: "OKI", model: "RG8", type: "CRM (Recycler)", status: "Valid" },
                        ].map((row, i) => (
                            <tr key={i} className="hover:bg-slate-50 cursor-pointer" onClick={() => simulateAction(`Melihat detail sertifikat untuk ${row.vendor} ${row.model}`)}>
                                <td className="px-6 py-4 font-medium text-slate-900">{row.vendor}</td>
                                <td className="px-6 py-4">{row.model}</td>
                                <td className="px-6 py-4">{row.type}</td>
                                <td className="px-6 py-4"><span className="px-2 py-1 bg-green-100 text-green-700 rounded text-xs font-bold">{row.status}</span></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
  },
  "#audit": {
    category: "Standar & Layanan",
    title: "Audit TI",
    subtitle: "Daftar Penyedia Jasa Audit TI Terdaftar",
    content: (
        <div className="space-y-8">
             <p className="text-slate-600">
                 Anggota ASPI wajib melakukan audit TI secara berkala oleh auditor independen yang terdaftar. Berikut adalah daftar firma audit yang memenuhi kualifikasi ASPI.
             </p>
             <div className="grid md:grid-cols-2 gap-4">
                 {[
                     "PT Ernst & Young Indonesia",
                     "PT Deloitte Konsultan Indonesia",
                     "PT KPMG Siddharta Advisory",
                     "PT PricewaterhouseCoopers Consulting",
                     "PT BDO Konsultan Indonesia",
                     "PT RSM Indonesia Konsultan"
                 ].map((firm, i) => (
                     <div key={i} className="flex items-center gap-3 p-4 border border-slate-100 rounded-lg bg-white shadow-sm hover:border-aspi-blue-mid cursor-pointer transition-colors" onClick={() => simulateAction(`Membuka profil: ${firm}`)}>
                         <ShieldCheck className="w-5 h-5 text-aspi-blue-mid"/>
                         <span className="font-bold text-slate-700">{firm}</span>
                     </div>
                 ))}
             </div>
        </div>
    )
  },
   "#sila": {
    category: "Standar & Layanan",
    title: "SILA",
    subtitle: "Sistem Layanan ASPI",
    content: (
        <div className="space-y-8 text-slate-600 text-center py-10">
             <div className="inline-flex p-6 bg-aspi-blue-dark/5 rounded-full mb-6">
                <Building2 className="w-16 h-16 text-aspi-blue-dark"/>
             </div>
             <h3 className="text-2xl font-bold text-slate-900">Portal Layanan Terpadu</h3>
             <p className="max-w-2xl mx-auto text-lg">
                 SILA adalah platform digital satu pintu bagi anggota ASPI dan calon anggota untuk mengakses berbagai layanan administrasi, pendaftaran sertifikasi, pelaporan rutin, dan pembaruan data keanggotaan.
             </p>
             
             <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto text-left mt-8">
                 <div className="p-4 bg-slate-50 rounded-lg flex gap-3 items-center">
                     <CheckCircle2 className="text-green-500 w-5 h-5"/>
                     <span>Registrasi Anggota Baru</span>
                 </div>
                 <div className="p-4 bg-slate-50 rounded-lg flex gap-3 items-center">
                     <CheckCircle2 className="text-green-500 w-5 h-5"/>
                     <span>Pendaftaran Sertifikasi QRIS</span>
                 </div>
                 <div className="p-4 bg-slate-50 rounded-lg flex gap-3 items-center">
                     <CheckCircle2 className="text-green-500 w-5 h-5"/>
                     <span>Laporan Berkala</span>
                 </div>
                 <div className="p-4 bg-slate-50 rounded-lg flex gap-3 items-center">
                     <CheckCircle2 className="text-green-500 w-5 h-5"/>
                     <span>Update Data Perusahaan</span>
                 </div>
             </div>

             <div className="flex justify-center mt-10">
                 <button onClick={() => simulateAction("Mengarahkan ke Portal SILA...")} className="px-10 py-4 bg-aspi-blue-dark text-white rounded-xl hover:bg-aspi-blue-mid transition-all shadow-xl hover:shadow-2xl flex items-center gap-3 font-bold text-lg group">
                     Masuk ke Portal SILA <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform"/>
                 </button>
             </div>
             <p className="text-sm text-slate-400 mt-4">Hanya untuk anggota terdaftar. Butuh bantuan? <a href="#kontak" className="text-aspi-blue-mid underline">Hubungi Helpdesk</a>.</p>
        </div>
    )
  },

  // --- BERITA & INFO ---
  "#berita": {
    category: "Berita & Info",
    title: "Berita & Artikel",
    subtitle: "Kabar Terkini dari Industri Pembayaran",
    content: (
        <div className="grid gap-8">
            {[
                { title: "ASPI Gelar Workshop Cyber Resilience untuk Perbankan", date: "15 Nov 2024", excerpt: "Meningkatkan kesiapan industri menghadapi ancaman siber yang semakin kompleks.", imgId: "1563986768609-322da13575f3" },
                { title: "Volume Transaksi QRIS Tembus Rekor Baru di Q3 2024", date: "01 Nov 2024", excerpt: "Adopsi pembayaran digital di sektor UMKM menjadi pendorong utama pertumbuhan.", imgId: "1556761175-5973dc0f32e7" },
                { title: "Kolaborasi ASPI dan Bank Sentral Asia Tenggara", date: "20 Okt 2024", excerpt: "Membahas interkoneksi pembayaran lintas batas untuk mendukung pariwisata regional.", imgId: "1551288049-bebda4e38f71" },
                { title: "Peluncuran Standar Baru API Pembayaran", date: "05 Okt 2024", excerpt: "SNAP versi terbaru menghadirkan fitur keamanan yang lebih canggih.", imgId: "1516321318423-f06f85e504b3" }
            ].map((news, i) => (
                <div key={i} onClick={() => simulateAction(`Membaca artikel: ${news.title}`)} className="flex flex-col md:flex-row gap-6 bg-white p-6 rounded-xl border border-slate-100 hover:shadow-md transition-all cursor-pointer group">
                     <div className="w-full md:w-48 h-32 bg-gray-200 rounded-lg shrink-0 overflow-hidden">
                         <img 
                            src={`https://images.unsplash.com/photo-${news.imgId}?q=80&w=400&auto=format&fit=crop`} 
                            alt={news.title}
                            loading="lazy"
                            width="400"
                            height="300"
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                     </div>
                     <div>
                         <div className="text-xs font-bold text-aspi-red uppercase mb-2">{news.date}</div>
                         <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-aspi-blue-dark transition-colors">{news.title}</h3>
                         <p className="text-slate-500">{news.excerpt}</p>
                     </div>
                </div>
            ))}
        </div>
    )
  },
  "#laporan": {
    category: "Berita & Info",
    title: "Laporan Tahunan",
    subtitle: "Transparansi & Akuntabilitas Kinerja",
    content: (
        <div className="space-y-8">
            <p className="text-slate-600">Arsip laporan tahunan ASPI yang menyajikan kinerja operasional, pencapaian strategis, dan laporan keuangan asosiasi.</p>
            <div className="grid md:grid-cols-3 gap-6">
                {["2023", "2022", "2021", "2020", "2019", "2018"].map((year) => (
                    <div key={year} className="bg-white p-6 rounded-xl border border-slate-200 text-center hover:border-aspi-blue-mid transition-all group">
                        <div className="text-4xl font-serif font-bold text-slate-900 mb-2">{year}</div>
                        <div className="text-xs uppercase text-slate-400 mb-6">Annual Report</div>
                        <button onClick={() => simulateAction(`Mengunduh Laporan Tahunan ${year}...`)} className="w-full py-2 bg-slate-50 text-slate-700 font-bold rounded hover:bg-aspi-blue-dark hover:text-white transition-colors flex items-center justify-center gap-2">
                            <Download className="w-4 h-4"/> Unduh PDF
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
  },
  "#stat-qris": {
    category: "Berita & Info",
    title: "Statistik QRIS",
    subtitle: "Data Pertumbuhan & Adopsi QRIS",
    content: (
        <div className="space-y-12">
            <div className="grid md:grid-cols-3 gap-6">
                 <div className="bg-slate-900 text-white p-6 rounded-xl">
                     <div className="text-slate-400 text-sm uppercase mb-1">Total Merchant</div>
                     <div className="text-3xl font-bold text-aspi-cyan">29.6 Juta</div>
                     <div className="text-xs text-green-400 mt-2 flex items-center gap-1"><TrendingUp className="w-3 h-3"/> +15% YoY</div>
                 </div>
                 <div className="bg-white border border-slate-100 p-6 rounded-xl">
                     <div className="text-slate-500 text-sm uppercase mb-1">Volume Transaksi (2023)</div>
                     <div className="text-3xl font-bold text-slate-900">1.5 Miliar</div>
                 </div>
                 <div className="bg-white border border-slate-100 p-6 rounded-xl">
                     <div className="text-slate-500 text-sm uppercase mb-1">Nominal Transaksi</div>
                     <div className="text-3xl font-bold text-slate-900">Rp 150 T</div>
                 </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                <h4 className="font-bold text-slate-900 mb-6">Pertumbuhan Volume Transaksi (Juta)</h4>
                <div className="flex items-end gap-4 h-64">
                    {[20, 45, 90, 180, 350, 700].map((val, i) => (
                        <div key={i} className="flex-1 flex flex-col justify-end group">
                            <div className="w-full bg-aspi-blue-light/30 rounded-t-lg group-hover:bg-aspi-blue-light transition-colors relative" style={{height: `${(val/700)*100}%`}}>
                                <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-900 opacity-0 group-hover:opacity-100 transition-opacity">{val}</div>
                            </div>
                            <div className="text-center text-xs text-slate-500 mt-2 font-bold">{2018+i}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
  },
  "#stat-ue": {
    category: "Berita & Info",
    title: "Statistik Uang Elektronik",
    subtitle: "Data Pasar Uang Elektronik (Server Based)",
    content: (
        <div className="space-y-8">
            <p className="text-slate-600">Data mencakup instrumen uang elektronik server-based yang diterbitkan oleh Bank maupun Lembaga Selain Bank (LSB).</p>
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                <h4 className="font-bold text-slate-900 mb-6">Pangsa Pasar Berdasarkan Volume</h4>
                <div className="flex flex-col gap-4">
                     <div>
                         <div className="flex justify-between text-sm font-bold mb-1">
                             <span>Lembaga Selain Bank (Fintech)</span>
                             <span>65%</span>
                         </div>
                         <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                             <div className="bg-aspi-blue-dark h-full rounded-full" style={{width: '65%'}}></div>
                         </div>
                     </div>
                     <div>
                         <div className="flex justify-between text-sm font-bold mb-1">
                             <span>Perbankan</span>
                             <span>35%</span>
                         </div>
                         <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                             <div className="bg-aspi-blue-mid h-full rounded-full" style={{width: '35%'}}></div>
                         </div>
                     </div>
                </div>
            </div>
        </div>
    )
  },
  "#stat-apmk": {
    category: "Berita & Info",
    title: "Statistik APMK",
    subtitle: "Alat Pembayaran Menggunakan Kartu",
    content: (
        <div className="grid md:grid-cols-2 gap-8">
             <div className="bg-white p-6 rounded-xl border border-slate-100">
                 <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><CreditCard className="w-5 h-5 text-aspi-red"/> Kartu Kredit</h4>
                 <div className="space-y-4">
                     <div className="flex justify-between border-b border-gray-50 pb-2">
                         <span className="text-slate-500">Jumlah Kartu Beredar</span>
                         <span className="font-bold">17.5 Juta</span>
                     </div>
                     <div className="flex justify-between border-b border-gray-50 pb-2">
                         <span className="text-slate-500">Volume Transaksi (YTD)</span>
                         <span className="font-bold">340 Juta</span>
                     </div>
                     <div className="flex justify-between">
                         <span className="text-slate-500">Nilai Transaksi (YTD)</span>
                         <span className="font-bold">Rp 310 T</span>
                     </div>
                 </div>
             </div>
             <div className="bg-white p-6 rounded-xl border border-slate-100">
                 <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><CreditCard className="w-5 h-5 text-aspi-blue-mid"/> Kartu ATM/Debit</h4>
                 <div className="space-y-4">
                     <div className="flex justify-between border-b border-gray-50 pb-2">
                         <span className="text-slate-500">Jumlah Kartu Beredar</span>
                         <span className="font-bold">256 Juta</span>
                     </div>
                     <div className="flex justify-between border-b border-gray-50 pb-2">
                         <span className="text-slate-500">Volume Transaksi (YTD)</span>
                         <span className="font-bold">6.8 Miliar</span>
                     </div>
                     <div className="flex justify-between">
                         <span className="text-slate-500">Nilai Transaksi (YTD)</span>
                         <span className="font-bold">Rp 7,500 T</span>
                     </div>
                 </div>
             </div>
        </div>
    )
  },
  
  // --- NEW PAGES ADDED ---
  "#stat-dcip": {
    category: "Berita & Info",
    title: "Statistik DC & IP",
    subtitle: "Delivery Channels & Instrument Payment Data",
    content: (
        <div className="space-y-12">
            <p className="text-slate-600">Data mengenai infrastruktur kanal pembayaran (Delivery Channels) dan instrumen pembayaran yang digunakan di Indonesia.</p>
            
            <div className="grid md:grid-cols-2 gap-8">
                {/* ATM Network */}
                <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="bg-aspi-blue-dark/10 p-3 rounded-xl text-aspi-blue-dark"><Server className="w-6 h-6"/></div>
                        <div>
                            <h4 className="font-bold text-slate-900">Jaringan ATM</h4>
                            <p className="text-xs text-slate-500">Automated Teller Machine</p>
                        </div>
                    </div>
                    <div className="text-4xl font-bold text-slate-900 mb-2">98,500+</div>
                    <div className="text-sm text-green-500 font-bold mb-6">+2.1% YoY</div>
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm border-b border-gray-100 pb-2">
                            <span className="text-slate-500">Bank BUMN</span>
                            <span className="font-bold">45,000</span>
                        </div>
                        <div className="flex justify-between text-sm border-b border-gray-100 pb-2">
                            <span className="text-slate-500">Bank Swasta</span>
                            <span className="font-bold">42,500</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-slate-500">BPD & Lainnya</span>
                            <span className="font-bold">11,000</span>
                        </div>
                    </div>
                </div>

                {/* EDC Network */}
                <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="bg-aspi-blue-mid/10 p-3 rounded-xl text-aspi-blue-mid"><CreditCard className="w-6 h-6"/></div>
                        <div>
                            <h4 className="font-bold text-slate-900">Mesin EDC</h4>
                            <p className="text-xs text-slate-500">Electronic Data Capture</p>
                        </div>
                    </div>
                    <div className="text-4xl font-bold text-slate-900 mb-2">1.8 Juta</div>
                    <div className="text-sm text-green-500 font-bold mb-6">+5.4% YoY</div>
                    <div className="space-y-3">
                        <div className="flex justify-between text-sm border-b border-gray-100 pb-2">
                            <span className="text-slate-500">EDC GPN</span>
                            <span className="font-bold">100%</span>
                        </div>
                        <div className="flex justify-between text-sm border-b border-gray-100 pb-2">
                            <span className="text-slate-500">Merchant QRIS</span>
                            <span className="font-bold">29.6 Juta</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
  },
  "#transfer": {
    category: "Berita & Info",
    title: "Statistik Transfer Dana",
    subtitle: "Data Transfer Antar Bank & Kliring",
    content: (
        <div className="space-y-8">
            <div className="bg-aspi-dark text-white p-8 rounded-2xl relative overflow-hidden">
                <div className="absolute right-0 top-0 h-full w-1/2 bg-aspi-blue-dark/50 blur-3xl"></div>
                <div className="relative z-10">
                    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3"><ArrowLeftRight className="w-6 h-6 text-aspi-cyan"/> BI-FAST & Realtime Transfer</h3>
                    <div className="grid md:grid-cols-3 gap-8">
                        <div>
                            <div className="text-slate-400 text-sm uppercase tracking-wider mb-1">Volume Harian</div>
                            <div className="text-3xl font-bold">12 Juta</div>
                            <div className="text-xs text-green-400 mt-1">Transaksi/Hari</div>
                        </div>
                        <div>
                            <div className="text-slate-400 text-sm uppercase tracking-wider mb-1">Nominal Harian</div>
                            <div className="text-3xl font-bold">Rp 45 T</div>
                            <div className="text-xs text-green-400 mt-1">Rupiah/Hari</div>
                        </div>
                        <div>
                            <div className="text-slate-400 text-sm uppercase tracking-wider mb-1">Partisipan</div>
                            <div className="text-3xl font-bold">106</div>
                            <div className="text-xs text-green-400 mt-1">Bank & Non-Bank</div>
                        </div>
                    </div>
                </div>
            </div>

            <h4 className="font-bold text-slate-900 text-xl mt-8 mb-4">Tren Sistem Kliring Nasional (SKNBI)</h4>
            <div className="bg-white p-6 border border-slate-100 rounded-xl">
                <div className="h-64 flex items-end gap-2">
                    {[65, 62, 58, 55, 50, 45].map((val, i) => (
                        <div key={i} className="flex-1 flex flex-col justify-end group">
                            <div className="w-full bg-slate-200 rounded-t-sm group-hover:bg-aspi-blue-mid transition-colors relative" style={{height: `${val}%`}}></div>
                            <div className="text-center text-xs text-slate-500 mt-2">{2019+i}</div>
                        </div>
                    ))}
                </div>
                <p className="text-center text-xs text-slate-400 mt-4">Volume SKNBI cenderung menurun seiring peningkatan adopsi BI-FAST</p>
            </div>
        </div>
    )
  },
  "#galeri-foto": {
    category: "Berita & Info",
    title: "Galeri Foto",
    subtitle: "Dokumentasi Kegiatan ASPI",
    content: (
        <div className="grid md:grid-cols-2 gap-6">
            {[
                { title: "Rapat Umum Anggota Tahunan 2024", date: "12 Nov 2024", count: 12, imgId: "1544531586-fde5298cdd40" },
                { title: "Peluncuran Fitur Baru QRIS Tuntas", date: "17 Aug 2024", count: 24, imgId: "1573164713711-27ed8d97c293" },
                { title: "Workshop Cyber Security Awareness", date: "05 Jun 2024", count: 8, imgId: "1556761175-5973dc0f32e7" },
                { title: "Kunjungan Delegasi Pembayaran ASEAN", date: "22 May 2024", count: 15, imgId: "1522071820081-009f0129c71c" },
                { title: "Sosialisasi Standar SNAP Open API", date: "10 Feb 2024", count: 30, imgId: "1517048696772-828923c67d54" },
                { title: "ASPI Gathering & Networking Night", date: "15 Dec 2023", count: 45, imgId: "1531482615713-2afd69097998" }
            ].map((album, i) => (
                <div key={i} className="group cursor-pointer" onClick={() => simulateAction(`Membuka galeri: ${album.title}`)}>
                    <div className="relative aspect-[4/3] bg-gray-200 rounded-xl overflow-hidden mb-3">
                        <img 
                            src={`https://images.unsplash.com/photo-${album.imgId}?q=80&w=600&auto=format&fit=crop`} 
                            alt={album.title}
                            loading="lazy"
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                            <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-4 group-hover:translate-y-0">
                                <ImageIcon className="w-6 h-6"/>
                            </div>
                        </div>
                        <div className="absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2 py-1 rounded backdrop-blur-sm flex items-center gap-1">
                            <ImageIcon className="w-3 h-3"/> {album.count}
                        </div>
                    </div>
                    <h4 className="font-bold text-slate-900 group-hover:text-aspi-blue-mid transition-colors">{album.title}</h4>
                    <p className="text-sm text-slate-500">{album.date}</p>
                </div>
            ))}
        </div>
    )
  },
  "#galeri-video": {
    category: "Berita & Info",
    title: "Galeri Video",
    subtitle: "Webinar, Edukasi & Highlight Acara",
    content: (
        <div className="grid md:grid-cols-2 gap-8">
            {[
                { title: "Webinar: Masa Depan Pembayaran Digital Indonesia", duration: "1:20:15" },
                { title: "Tutorial: Implementasi Teknis SNAP untuk BPR", duration: "45:30" },
                { title: "Highlight: Festival Ekonomi Keuangan Digital 2024", duration: "05:12" },
                { title: "Edukasi: Tips Aman Bertransaksi Menggunakan QRIS", duration: "02:45" }
            ].map((video, i) => (
                <div key={i} className="group cursor-pointer" onClick={() => simulateAction(`Memutar video: ${video.title}`)}>
                    <div className="relative aspect-video bg-slate-900 rounded-xl overflow-hidden mb-3 shadow-lg">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-16 h-16 bg-aspi-red rounded-full flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform">
                                <PlayCircle className="w-8 h-8 fill-current"/>
                            </div>
                        </div>
                        <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs font-bold px-2 py-1 rounded">
                            {video.duration}
                        </div>
                    </div>
                    <h4 className="font-bold text-lg text-slate-900 group-hover:text-aspi-red transition-colors leading-tight">{video.title}</h4>
                </div>
            ))}
        </div>
    )
  },

  // --- KEANGGOTAAN ---
  "#keanggotaan": {
      category: "Tentang Kami",
      title: "Keanggotaan",
      subtitle: "Bergabung dalam Ekosistem Pembayaran Nasional",
      content: (
          <div className="space-y-12">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                      <h3 className="text-2xl font-bold text-slate-900 mb-4">Komposisi Anggota</h3>
                      <p className="text-slate-600 mb-8">
                          ASPI beranggotakan berbagai institusi yang memegang peran kunci dalam sistem pembayaran Indonesia. Per November 2024, total anggota mencapai 266 institusi.
                      </p>
                      <ul className="space-y-4">
                          {[
                              { label: "Bank Umum", pct: 52, color: "bg-aspi-blue-dark" },
                              { label: "Penyedia Jasa Pembayaran (Non-Bank)", pct: 20, color: "bg-aspi-red" },
                              { label: "Unit Usaha Syariah", pct: 19, color: "bg-aspi-blue-mid" },
                              { label: "Bank Perekonomian Rakyat (BPR)", pct: 9, color: "bg-aspi-cyan" }
                          ].map((item, i) => (
                              <li key={i}>
                                  <div className="flex justify-between text-sm font-bold text-slate-700 mb-1">
                                      <span>{item.label}</span>
                                      <span>{item.pct}%</span>
                                  </div>
                                  <div className="w-full bg-slate-100 rounded-full h-2">
                                      <div className={`h-full rounded-full ${item.color}`} style={{width: `${item.pct}%`}}></div>
                                  </div>
                              </li>
                          ))}
                      </ul>
                  </div>
                  <div className="bg-slate-50 p-8 rounded-2xl border border-slate-200">
                      <h4 className="font-bold text-slate-900 mb-4">Manfaat Keanggotaan</h4>
                      <ul className="space-y-3">
                          <li className="flex gap-3 text-sm text-slate-600"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0"/> Akses ke rancangan standar industri terbaru.</li>
                          <li className="flex gap-3 text-sm text-slate-600"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0"/> Hak suara dalam rapat umum anggota.</li>
                          <li className="flex gap-3 text-sm text-slate-600"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0"/> Program peningkatan kapasitas SDM eksklusif.</li>
                          <li className="flex gap-3 text-sm text-slate-600"><CheckCircle2 className="w-5 h-5 text-green-500 shrink-0"/> Networking dengan regulator dan pemimpin industri.</li>
                      </ul>
                      <button onClick={() => simulateAction("Mengunduh Formulir...")} className="w-full mt-8 py-3 bg-aspi-blue-dark text-white font-bold rounded-lg hover:bg-aspi-blue-mid transition-colors">
                          Unduh Formulir Pendaftaran
                      </button>
                  </div>
              </div>
          </div>
      )
  },

  // --- KONTAK ---
  "#kontak": {
      category: "Hubungi Kami",
      title: "Hubungi Kami",
      subtitle: "Kami Siap Membantu Anda",
      content: (
          <div className="grid md:grid-cols-2 gap-12">
              <div className="space-y-8">
                  <div>
                      <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><MapPin className="w-5 h-5 text-aspi-red"/> Alamat Kantor</h4>
                      <address className="not-italic text-slate-600 pl-7">
                          Gedung Tifa Arum Realty, Lt. 3<br/>
                          Jl. Kuningan Barat 1 No.26<br/>
                          Mampang Prapatan, Jakarta Selatan 12710
                      </address>
                  </div>
                  <div>
                      <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><Phone className="w-5 h-5 text-aspi-red"/> Telepon</h4>
                      <p className="text-slate-600 pl-7">(021) 5290-0000</p>
                  </div>
                  <div>
                      <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><Mail className="w-5 h-5 text-aspi-red"/> Email</h4>
                      <p className="text-slate-600 pl-7">
                          Umum: <a href="mailto:info@aspi.or.id" className="text-aspi-blue-mid hover:underline">info@aspi.or.id</a><br/>
                          Keanggotaan: <a href="mailto:member@aspi.or.id" className="text-aspi-blue-mid hover:underline">member@aspi.or.id</a>
                      </p>
                  </div>
                  <div>
                      <h4 className="font-bold text-slate-900 mb-4 flex items-center gap-2"><Calendar className="w-5 h-5 text-aspi-red"/> Jam Operasional</h4>
                      <p className="text-slate-600 pl-7">
                          Senin - Jumat: 08.00 - 17.00 WIB<br/>
                          Sabtu - Minggu: Tutup
                      </p>
                  </div>
              </div>
              
              <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
                  <h3 className="text-xl font-bold text-slate-900 mb-6">Kirim Pesan</h3>
                  <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); simulateAction("Pesan terkirim! Tim kami akan segera menghubungi Anda."); }}>
                      <div>
                          <label className="block text-sm font-bold text-slate-700 mb-1">Nama Lengkap</label>
                          <input type="text" required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-aspi-blue-mid outline-none"/>
                      </div>
                      <div>
                          <label className="block text-sm font-bold text-slate-700 mb-1">Email Institusi</label>
                          <input type="email" required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-aspi-blue-mid outline-none"/>
                      </div>
                      <div>
                          <label className="block text-sm font-bold text-slate-700 mb-1">Pesan</label>
                          <textarea rows={4} required className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-aspi-blue-mid outline-none"></textarea>
                      </div>
                      <button type="submit" className="w-full py-3 bg-aspi-red text-white font-bold rounded-lg hover:bg-red-700 transition-colors">
                          Kirim Pesan
                      </button>
                  </form>
              </div>
          </div>
      )
  },
  "#privacy": {
      category: "Legal",
      title: "Kebijakan Privasi",
      subtitle: "Komitmen Kami Melindungi Data Anda",
      content: (
          <div className="space-y-6 text-slate-600">
              <p>ASPI berkomitmen untuk melindungi privasi dan keamanan data pribadi Anda. Kebijakan ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi informasi Anda.</p>
              <h4 className="text-lg font-bold text-slate-900">Pengumpulan Data</h4>
              <p>Kami mengumpulkan data yang Anda berikan saat mendaftar keanggotaan atau menghubungi kami.</p>
          </div>
      )
  },
  "#terms": {
      category: "Legal",
      title: "Syarat Layanan",
      subtitle: "Ketentuan Penggunaan Website ASPI",
      content: (
          <div className="space-y-6 text-slate-600">
              <p>Dengan mengakses website ini, Anda menyetujui untuk terikat oleh syarat dan ketentuan berikut.</p>
              <h4 className="text-lg font-bold text-slate-900">Hak Kekayaan Intelektual</h4>
              <p>Seluruh konten dalam website ini adalah milik ASPI dan dilindungi undang-undang hak cipta.</p>
          </div>
      )
  }
};

// Fallback for pages not yet detailed
const createDefaultPage = (title: string): PageContent => ({
    category: "Halaman",
    title: title,
    subtitle: "Informasi Detail",
    content: (
        <div className="flex flex-col items-center justify-center py-20 text-slate-400 bg-slate-50 rounded-xl border-2 border-dashed border-slate-200">
            <Building2 className="w-16 h-16 mb-4 opacity-20" />
            <h3 className="text-lg font-bold text-slate-500 mb-2">Konten Sedang Disiapkan</h3>
            <p className="text-sm max-w-md text-center">Halaman ini sedang dalam proses pembaruan data. Silakan kembali lagi nanti untuk informasi lengkap mengenai {title}.</p>
            <button onClick={() => window.location.hash = ""} className="mt-6 text-aspi-blue-mid font-semibold hover:underline">Kembali ke Beranda</button>
        </div>
    )
});

// --- Logo Component ---

const AspiLogo = ({ className = "h-10", dark = false }) => (
  <svg viewBox="0 0 320 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="ASPI Logo">
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
  // Encoded SVG with embedded CSS animations to replace inline SVG for LCP optimization
  const svgContent = `
    <svg viewBox="0 0 600 250" xmlns="http://www.w3.org/2000/svg" fill="none">
        <style>
            @keyframes ping { 75%, 100% { transform: scale(2); opacity: 0; } }
            @keyframes pulse { 50% { opacity: .5; } }
            .ping { animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite; transform-origin: center; transform-box: fill-box; }
            .pulse { animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        </style>
        <g class="pulse" opacity="0.4">
            <path d="M190 185 L240 70" stroke="#00A3E0" stroke-width="0.5" stroke-dasharray="4 4" />
            <path d="M190 185 L350 120" stroke="#00A3E0" stroke-width="0.5" stroke-dasharray="4 4" />
            <path d="M190 185 L540 125" stroke="#00A3E0" stroke-width="0.5" stroke-dasharray="4 4" />
            <path d="M190 185 L100 95" stroke="#00A3E0" stroke-width="0.5" stroke-dasharray="4 4" />
        </g>
        <g>
            <circle cx="80" cy="80" r="3" fill="#0077C8" class="ping" style="animation-duration: 3s" />
            <circle cx="80" cy="80" r="3" fill="#0077C8" />
            <circle cx="100" cy="95" r="4" fill="#003B71" />
            <circle cx="110" cy="115" r="3" fill="#0077C8" />
            <circle cx="120" cy="135" r="3" fill="#00A3E0" />
            <circle cx="130" cy="155" r="2" fill="#003B71" />
        </g>
        <g>
            <circle cx="220" cy="90" r="3" fill="#003B71" />
            <circle cx="240" cy="70" r="4" fill="#0077C8" />
            <circle cx="260" cy="90" r="4" fill="#00A3E0" />
            <circle cx="250" cy="110" r="3" fill="#003B71" />
            <circle cx="280" cy="100" r="3" fill="#0077C8" />
        </g>
        <g>
            <circle cx="160" cy="180" r="3" fill="#0077C8" />
            <circle cx="190" cy="185" r="8" fill="#CE1126" fill-opacity="0.3" class="ping" />
            <circle cx="190" cy="185" r="4" fill="#CE1126" />
            <circle cx="220" cy="190" r="3" fill="#003B71" />
            <circle cx="250" cy="188" r="4" fill="#0077C8" />
            <circle cx="280" cy="192" r="3" fill="#00A3E0" />
            <circle cx="310" cy="195" r="2" fill="#003B71" />
        </g>
        <g>
            <circle cx="340" cy="100" r="2" fill="#0077C8" />
            <circle cx="350" cy="120" r="3" fill="#00A3E0" />
            <circle cx="360" cy="140" r="2" fill="#003B71" />
            <circle cx="370" cy="110" r="3" fill="#0077C8" />
        </g>
        <g>
            <circle cx="340" cy="200" r="2" fill="#00A3E0" />
            <circle cx="360" cy="205" r="2" fill="#003B71" />
            <circle cx="380" cy="200" r="2" fill="#0077C8" />
        </g>
        <g>
            <circle cx="500" cy="120" r="3" fill="#0077C8" />
            <circle cx="520" cy="130" r="4" fill="#003B71" />
            <circle cx="540" cy="125" r="4" fill="#00A3E0" class="ping" style="animation-duration: 4s" />
            <circle cx="540" cy="125" r="4" fill="#00A3E0" />
            <circle cx="560" cy="140" r="3" fill="#0077C8" />
        </g>
    </svg>
  `.replace(/\s+/g, ' ').trim();

  const dataUri = `data:image/svg+xml;utf8,${encodeURIComponent(svgContent)}`;

  return (
    <div className="relative w-full h-full flex items-center justify-center">
        {/* Glow Effect Behind Map */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-aspi-blue-dark/40 blur-[80px] rounded-full"></div>
        
        {/* Picture Tag for LCP Optimization */}
        <picture className="w-full h-auto z-10 drop-shadow-[0_0_15px_rgba(0,163,224,0.5)]">
            <img 
                src={dataUri} 
                alt="Digital Map of Indonesia" 
                width="600" 
                height="250" 
                fetchPriority="high"
                className="w-full h-auto"
            />
        </picture>

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
  const [lang, setLang] = useState<"ID"|"EN">("ID");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Update scrolled state if we are on an internal page (always scrolled style)
  const isInternal = window.location.hash && window.location.hash !== "#" && window.location.hash !== "#home";

  const handleLogin = () => {
      simulateAction("Mengalihkan ke Portal Member Area...");
  };

  return (
    <nav 
      className={`fixed w-full z-50 transition-all duration-300 font-sans ${
        scrolled || isInternal
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100 py-3" 
          : "bg-white/5 backdrop-blur-sm py-5 border-b border-white/10"
      }`}
      onMouseLeave={() => setActiveDropdown(null)}
    >
      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="cursor-pointer relative z-50" onClick={() => { window.location.hash = ""; window.scrollTo(0,0); }} aria-label="Go to Homepage">
           <AspiLogo className="h-12 w-auto" dark={!(scrolled || isInternal)} />
        </a>

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
                    scrolled || isInternal
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
                            onClick={() => setActiveDropdown(null)}
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
            className={`text-sm font-medium px-3 py-2 transition-colors tracking-wide ${scrolled || isInternal ? "text-slate-700 hover:text-aspi-red" : "text-gray-200 hover:text-white"}`}
          >
            Keanggotaan
          </a>
          <a 
            href="#kontak" 
            className={`text-sm font-medium px-3 py-2 transition-colors tracking-wide ${scrolled || isInternal ? "text-slate-700 hover:text-aspi-red" : "text-gray-200 hover:text-white"}`}
          >
            Hubungi Kami
          </a>
        </div>

        {/* Actions */}
        <div className="hidden lg:flex items-center gap-4">
          <button 
            onClick={() => setLang(lang === "ID" ? "EN" : "ID")}
            className={`flex items-center gap-1 text-xs font-bold px-2 py-1 rounded border transition-colors ${scrolled || isInternal ? "border-slate-300 text-slate-700 hover:border-aspi-red hover:text-aspi-red" : "border-white/20 text-white hover:border-white"}`}
            aria-label="Toggle Language"
          >
             {lang}
          </button>
          <button 
            onClick={handleLogin}
            className={`px-6 py-2.5 text-sm font-semibold rounded-full transition-all text-white shadow-lg hover:shadow-aspi-blue-dark/30 ${
            scrolled || isInternal ? "bg-aspi-red hover:bg-red-700" : "bg-gradient-to-r from-aspi-red to-red-700 border border-white/10"
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
            ? <X className={scrolled || isInternal ? "text-slate-900" : "text-white"} /> 
            : <Menu className={scrolled || isInternal ? "text-slate-900" : "text-white"} />
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
            <a href="#keanggotaan" className="py-4 text-lg font-medium text-slate-900 border-b border-gray-100" onClick={() => setMobileMenuOpen(false)}>Keanggotaan</a>
            <a href="#kontak" className="py-4 text-lg font-medium text-slate-900 border-b border-gray-100" onClick={() => setMobileMenuOpen(false)}>Hubungi Kami</a>
            
            <div className="mt-8 flex gap-4">
                <button onClick={handleLogin} className="flex-1 py-3 bg-aspi-red text-white rounded-lg font-bold">Login Anggota</button>
                <button onClick={() => setLang(lang === "ID" ? "EN" : "ID")} className="px-4 py-3 border border-slate-200 rounded-lg font-bold text-slate-600">{lang}</button>
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
        {/* LCP Optimization: fetchPriority='high' */}
        <img 
            src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=2072" 
            alt="" 
            fetchPriority="high"
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
          {/* Contrast: Using gray-300 for better contrast on dark bg */}
          <p className="text-lg text-gray-300 mb-10 leading-relaxed max-w-xl font-light">
            ASPI memperkuat ekosistem pembayaran Indonesia melalui <span className="text-white font-medium">regulasi yang kokoh</span>, standardisasi inovatif, dan kolaborasi strategis untuk masa depan ekonomi digital.
          </p>
          <div className="flex flex-col sm:flex-row gap-5">
            <a href="#qris" className="px-8 py-4 bg-gradient-to-r from-aspi-red to-[#A00F1E] text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-aspi-red/25 transition-all flex items-center justify-center gap-2 group">
              Lihat Standar <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a href="#about" className="px-8 py-4 bg-transparent border border-white/20 text-white rounded-lg font-semibold hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
              Tentang ASPI
            </a>
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
    <section id="about-section" className="py-32 bg-white scroll-mt-20">
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
            <a href="#about" className="text-aspi-red font-bold hover:text-red-800 inline-flex items-center gap-2 border-b-2 border-aspi-red/20 hover:border-aspi-red pb-1 transition-all">
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
        src="https://images.unsplash.com/photo-1639322537228-f710d846310a?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=2032" 
        alt=""
        loading="lazy"
        className="absolute inset-0 w-full h-full object-cover opacity-10 mix-blend-color-dodge pointer-events-none"
      />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-aspi-blue-dark/50 blur-[100px] pointer-events-none"></div>

      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div className="max-w-2xl">
                <SectionHeading dark subtitle="Standar & Layanan" title="Inisiatif Pembayaran Nasional" />
                <p className="text-gray-400 text-lg">Kami mempelopori implementasi infrastruktur pembayaran inti Indonesia.</p>
            </div>
            <a href="#nsiccs" className="hidden md:flex px-6 py-3 border border-white/20 rounded-full text-white hover:bg-white/10 transition-colors mb-4">
                Lihat Semua Inisiatif
            </a>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <a href="#qris" className="group relative overflow-hidden rounded-2xl bg-[#131B2E]/80 backdrop-blur-sm border border-white/5 hover:border-aspi-red/50 transition-all duration-500 cursor-pointer hover:-translate-y-2">
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
            </a>

            {/* Card 2 */}
            <a href="#snap" className="group relative overflow-hidden rounded-2xl bg-[#131B2E]/80 backdrop-blur-sm border border-white/5 hover:border-aspi-blue-light/50 transition-all duration-500 cursor-pointer hover:-translate-y-2">
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
            </a>

             {/* Card 3 */}
             <a href="#gpn" className="group relative overflow-hidden rounded-2xl bg-[#131B2E]/80 backdrop-blur-sm border border-white/5 hover:border-aspi-blue-mid/50 transition-all duration-500 cursor-pointer hover:-translate-y-2">
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
            </a>
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
            image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=800"
        },
        { 
            category: "Acara", 
            date: "12 Nov 2023", 
            title: "Rapat Umum Tahunan ASPI: Membentuk Strategi 2024", 
            image: "https://images.unsplash.com/photo-1544531586-fde5298cdd40?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=800"
        },
        { 
            category: "Siaran Pers", 
            date: "01 Des 2023", 
            title: "Adopsi BI-FAST Melampaui 1 Miliar Transaksi", 
            image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=800"
        },
    ];

    return (
        <section id="news" className="py-32 bg-gray-50 scroll-mt-20">
            <div className="container mx-auto px-6 lg:px-12">
                <div className="flex justify-between items-end mb-16">
                    <SectionHeading subtitle="Berita & Info" title="Wawasan Terkini" />
                    <a href="#berita" className="hidden md:inline-flex items-center gap-2 text-aspi-blue-dark font-bold hover:underline mb-8">
                        Lihat Semua Berita <ArrowRight className="w-4 h-4"/>
                    </a>
                </div>

                <div className="grid md:grid-cols-3 gap-10">
                    {news.map((item, idx) => (
                        <div key={idx} onClick={() => window.location.hash = "#berita"} className="group cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
                            <div className="aspect-[4/3] bg-gray-200 overflow-hidden relative">
                                <img 
                                    src={item.image} 
                                    alt={item.title}
                                    loading="lazy"
                                    width="400"
                                    height="300"
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
                            {/* Social Placeholders with Accessibility Labels */}
                            {[1, 2, 3].map((i) => (
                                <div 
                                    key={i} 
                                    role="button" 
                                    aria-label={`Social Media Link ${i}`} 
                                    className="w-10 h-10 rounded-full bg-white/5 hover:bg-aspi-blue-mid flex items-center justify-center transition-colors cursor-pointer text-white/60 hover:text-white border border-white/5"
                                >
                                    <Globe className="w-5 h-5"/>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    <div>
                        <h4 className="text-sm font-bold uppercase tracking-widest mb-8 text-white">Tautan Cepat</h4>
                        <ul className="space-y-4 text-gray-400">
                            <li><a href="#about" className="hover:text-aspi-cyan transition-colors">Tentang Kami</a></li>
                            <li><a href="#bi" className="hover:text-aspi-cyan transition-colors">Peraturan</a></li>
                            <li><a href="#qris" className="hover:text-aspi-cyan transition-colors">Standar & Layanan</a></li>
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
                        <a href="#privacy" className="hover:text-white transition-colors">Kebijakan Privasi</a>
                        <a href="#terms" className="hover:text-white transition-colors">Syarat Layanan</a>
                    </div>
                </div>
            </div>
        </footer>
    )
}

const InternalPageLayout = ({ data }: { data: PageContent }) => {
    return (
        <div className="pt-24 min-h-screen bg-white animate-in fade-in duration-500">
            {/* Header Banner */}
            <div className="bg-aspi-dark relative py-20 px-6 overflow-hidden">
                <div className="absolute inset-0 z-0">
                     <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-aspi-blue-dark/50 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/2"></div>
                     <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-aspi-blue-mid/20 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/2"></div>
                     <div className="absolute inset-0 hero-pattern opacity-10"></div>
                </div>
                <div className="container mx-auto relative z-10 text-center">
                    <div className="inline-block px-3 py-1 bg-white/10 rounded-full text-aspi-cyan text-xs font-bold uppercase tracking-widest mb-4 backdrop-blur-sm">
                        {data.category}
                    </div>
                    <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-4">{data.title}</h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto font-light">{data.subtitle}</p>
                </div>
            </div>

            {/* Content Area */}
            <div className="container mx-auto px-6 lg:px-12 py-16">
                <div className="flex flex-col lg:flex-row gap-12">
                    {/* Sidebar Navigation */}
                    <div className="hidden lg:block w-64 shrink-0">
                         <div className="sticky top-32">
                             <h4 className="font-bold text-slate-900 mb-4 border-b border-gray-100 pb-2 uppercase text-xs tracking-wider">Dalam Kategori Ini</h4>
                             <ul className="space-y-1">
                                 {MENU_STRUCTURE.find(m => m.title === data.category)?.items.map((item, idx) => (
                                     <li key={idx}>
                                         <a 
                                            href={item.href} 
                                            className={`block text-sm py-2 px-3 rounded-lg transition-all ${
                                                window.location.hash === item.href 
                                                ? "bg-aspi-blue-dark text-white font-medium shadow-md" 
                                                : "text-slate-600 hover:bg-slate-50 hover:text-aspi-blue-dark hover:translate-x-1"
                                            }`}
                                         >
                                             {item.name}
                                         </a>
                                     </li>
                                 ))}
                                 {/* Fallback if category not found in structure (e.g. Legal) */}
                                 {["Legal", "Hubungi Kami"].includes(data.category) && (
                                     <li>
                                         <a href="#home" className="block text-sm py-2 px-3 text-slate-600 hover:text-aspi-blue-dark">Kembali ke Beranda</a>
                                     </li>
                                 )}
                             </ul>
                         </div>
                    </div>

                    {/* Main Text */}
                    <div className="flex-1 max-w-4xl">
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
        window.scrollTo(0,0);
    };
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const getPageContent = () => {
     if (!currentHash || currentHash === "#" || currentHash === "#home") return null; // Show Home
     
     if (PAGES_DATA[currentHash]) return PAGES_DATA[currentHash];
     
     // Try to find the title from MENU_STRUCTURE to create a default page if not explicitly defined above
     for (const menu of MENU_STRUCTURE) {
         const item = menu.items.find(i => i.href === currentHash);
         if (item) return createDefaultPage(item.name);
     }
     
     // Special Standalone Pages
     if (currentHash === "#keanggotaan") return PAGES_DATA["#keanggotaan"];
     if (currentHash === "#kontak") return PAGES_DATA["#kontak"];
     if (currentHash === "#privacy") return PAGES_DATA["#privacy"];
     if (currentHash === "#terms") return PAGES_DATA["#terms"];

     return null; // Default to home if not found
  };

  const activePage = getPageContent();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {activePage ? (
          <InternalPageLayout data={activePage} />
      ) : (
          <>
            <Hero />
            <StatsBar />
            <Features />
            <KeyInitiatives />
            <NewsSection />
          </>
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