import { loadWishes, saveWish } from "./rsvp";
import { wedding as w, events, story, cover, cover2, album, gifts, music, bia, nen } from "./config";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

function Photo({ src, alt, className = "", zoom = false }) {
  const [ok, setOk] = useState(true);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [open]);
  const canZoom = zoom && ok;
  const zoomProps = canZoom ? {
    role: "button", tabIndex: 0, "aria-label": `Xem ảnh lớn: ${alt}`,
    onClick: () => setOpen(true),
    onKeyDown: (e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen(true); } },
  } : {};
  const close = (e) => { e.stopPropagation(); setOpen(false); };
  return (
    <div className={`overflow-hidden bg-vang/25 ${canZoom ? "cursor-zoom-in" : ""} ${className}`} {...zoomProps}>
      {ok && <img src={src} alt={alt} loading="lazy" onError={() => setOk(false)} className="h-full w-full object-cover" />}
      {open && createPortal(
        <div role="dialog" aria-modal="true" aria-label={alt} onClick={close}
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/85 p-4">
          <img src={src} alt={alt} className="max-h-[90vh] max-w-full rounded-lg object-contain shadow-2xl" />
          <button autoFocus onClick={close} aria-label="Đóng ảnh"
            className="absolute right-4 top-4 grid size-10 place-items-center rounded-full bg-white/15 text-2xl leading-none text-white hover:bg-white/25">×</button>
        </div>,
        document.body
      )}
    </div>
  );
}

function Floaters({ glyph = "hy", count = 8, min = 14, max = 30, peak = 0.8, colors = ["text-vang"], className = "fixed inset-0 z-20" }) {
  const [items] = useState(() =>
    Array.from({ length: count }, (_, i) => ({
      left: Math.random() * 100,
      size: min + Math.random() * (max - min),
      dur: 8 + Math.random() * 8,
      delay: -Math.random() * 12,
      drift: (Math.random() - 0.5) * 70,
      spin: (Math.random() - 0.5) * 60,
      color: colors[i % colors.length],
    }))
  );
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return null;
  return (
    <div aria-hidden="true" className={`pointer-events-none overflow-hidden ${className}`}>
      {items.map((it, i) => (
        <span key={i} className={`absolute bottom-0 leading-none ${glyph === "hy" ? "font-hy font-bold" : ""} ${it.color}`}
          style={{ left: `${it.left}%`, fontSize: it.size,
            animation: `floatup ${it.dur}s linear ${it.delay}s infinite`,
            "--drift": `${it.drift}px`, "--spin": `${it.spin}deg`, "--peak": peak }}>
          {glyph === "hy" ? "囍" : (
            <svg viewBox="0 0 24 24" width="1em" height="1em" fill="currentColor">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          )}
        </span>
      ))}
    </div>
  );
}

function HyBurst({ run, count = 100 }) {
  const [items] = useState(() =>
    Array.from({ length: count }, (_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const dist = 25 + Math.random() * 45;
      return {
        dx: Math.cos(angle) * dist, dy: Math.sin(angle) * dist,
        size: 14 + Math.random() * 28,
        delay: Math.random() * 0.2,
        spin: (Math.random() - 0.5) * 540,
        color: i % 3 === 0 ? "text-[#e6c98a]" : "text-giay",
      };
    })
  );
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return null;
  const state = run ? "running" : "paused";
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      <span className="font-hy absolute left-1/2 top-1/2 text-[30rem] font-bold leading-none text-[#e6c98a] opacity-0"
        style={{ animation: "zoomhy 1.1s ease-out both", animationPlayState: state }}>囍</span>
      {items.map((it, i) => (
        <span key={i} className={`font-hy absolute left-1/2 top-1/2 font-bold leading-none opacity-0 ${it.color}`}
          style={{ fontSize: it.size, animation: `burst 1.2s ease-out ${it.delay}s both`, animationPlayState: state,
            "--dx": `${it.dx}vw`, "--dy": `${it.dy}vh`, "--spin": `${it.spin}deg` }}>
          囍
        </span>
      ))}
    </div>
  );
}

function Heart({ className = "" }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`fill-current ${className}`}>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
    </svg>
  );
}

function Timeline() {
  return (
    <div className="relative">
      <span aria-hidden="true" className="absolute bottom-0 left-5 top-2 w-px bg-gradient-to-b from-vang via-vang/60 to-transparent md:left-1/2" />
      <ol>
        {story.map((s, i) => {
          const flip = i % 2 === 1;
          return (
            <li key={s.year} className="relative grid gap-4 pb-14 pl-14 md:grid-cols-[1fr_auto_1fr] md:items-center md:gap-10 md:pl-0">
              <span className="absolute left-5 top-3 z-10 grid size-10 -translate-x-1/2 place-items-center rounded-full bg-son text-giay ring-4 ring-giay/25 animate-ring motion-reduce:animate-none md:relative md:left-0 md:top-0 md:order-2 md:translate-x-0">
                <Heart className="size-5" />
              </span>
              <div className={`rounded-2xl border border-vang/50 bg-white/[0.06] p-6 text-left ${flip ? "md:order-3" : "md:order-1"}`}>
                <p className="text-sm tracking-[0.2em] text-[#e6c98a]">{s.year}</p>
                <h3 className="font-script mt-1 text-4xl text-giay">{s.title}</h3>
                <p className="mt-3 leading-relaxed text-giay/90">{s.text}</p>
              </div>
              <figure className={`rounded-2xl border border-vang/50 bg-white/[0.06] p-2 ${flip ? "md:order-1" : "md:order-3"}`}>
                <Photo zoom src={s.photo} alt={s.caption} className="aspect-[4/5] rounded-xl" />
                <figcaption className="px-2 pb-1 pt-3 text-center text-sm italic text-giay/80">{s.caption}</figcaption>
              </figure>
            </li>
          );
        })}
      </ol>
      <div className="relative pl-14 text-left md:pl-0 md:text-center">
        <span className="font-hy absolute left-5 top-0 z-10 grid size-12 -translate-x-1/2 place-items-center rounded-full bg-giay text-2xl font-bold text-son ring-4 ring-vang/40 md:relative md:left-0 md:mx-auto md:translate-x-0">囍</span>
        <p className="font-script mt-3 text-3xl text-[#e6c98a] md:mt-4">16.12.2026</p>
        <p className="mt-1 text-giay/90">Và câu chuyện vẫn đang được viết tiếp, cùng bạn.</p>
      </div>
    </div>
  );
}

const FLOW_X = [0, 62, 98];
const FLOW_ROT = [0, 50, 62];
const FLOW_SCALE = [1, 0.88, 0.76];
const FLOW_OPACITY = [1, 1, 1];

function flowStyle(d) {
  const a = Math.abs(d);
  const sign = d < 0 ? -1 : 1;
  if (a > 2) return { transform: `translateX(-50%) translateX(${sign * 125}%) rotateY(${sign * 70}deg) scale(0.65)`, opacity: 0, zIndex: 0, pointerEvents: "none" };
  return { transform: `translateX(-50%) translateX(${sign * FLOW_X[a]}%) rotateY(${sign * FLOW_ROT[a]}deg) scale(${FLOW_SCALE[a]})`, opacity: FLOW_OPACITY[a], zIndex: 10 - a };
}

function Coverflow() {
  const n = album.length;
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const startX = useRef(null);
  const swiped = useRef(false);
  const go = (step) => setIndex((i) => (i + step + n) % n);

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => go(1), 3500);
    return () => clearInterval(t);
  }, [paused, n]);

  const arrow = "absolute top-1/2 z-20 grid size-10 -translate-y-1/2 place-items-center rounded-full bg-black/30 text-2xl leading-none text-white backdrop-blur hover:bg-black/50";
  return (
    <div>
      <div
        className="relative mx-auto h-[22rem] touch-pan-y overflow-hidden [perspective:1200px] sm:h-[30rem]"
        tabIndex={0}
        aria-roledescription="carousel"
        aria-label="Album ảnh cưới"
        onKeyDown={(e) => { if (e.key === "ArrowLeft") go(-1); if (e.key === "ArrowRight") go(1); }}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        onPointerDown={(e) => { startX.current = e.clientX; swiped.current = false; }}
        onPointerUp={(e) => {
          if (startX.current == null) return;
          const dx = e.clientX - startX.current;
          startX.current = null;
          if (Math.abs(dx) > 40) { swiped.current = true; go(dx < 0 ? 1 : -1); }
        }}
        onClickCapture={(e) => { if (swiped.current) { e.stopPropagation(); swiped.current = false; } }}
      >
        {album.map((src, i) => {
          let d = (((i - index) % n) + n) % n;
          if (d > n / 2) d -= n;
          return (
            <div key={src}
              onClick={d !== 0 ? () => go(d) : undefined}
              className={`absolute left-1/2 top-0 aspect-[3/4] h-full transition-[transform,opacity] duration-500 ease-out motion-reduce:transition-none ${d !== 0 ? "cursor-pointer" : ""}`}
              style={flowStyle(d)}>
              <Photo zoom={d === 0} src={src} alt={`Ảnh cưới ${i + 1}`} className="h-full w-full rounded-2xl shadow-2xl shadow-black/30" />
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-2xl bg-black transition-opacity duration-500"
              style={{ opacity: [0, 0.25, 0.45][Math.min(Math.abs(d), 2)] }} />
            </div>
          );
        })}
        <button onClick={() => go(-1)} aria-label="Ảnh trước" className={`${arrow} left-2 sm:left-[6%]`}>‹</button>
        <button onClick={() => go(1)} aria-label="Ảnh sau" className={`${arrow} right-2 sm:right-[6%]`}>›</button>
      </div>
      <div className="mt-4 flex justify-center gap-2">
        {album.map((_, i) => (
          <button key={i} onClick={() => setIndex(i)} aria-label={`Xem ảnh ${i + 1}`}
            className={`size-2.5 rounded-full ${i === index ? "bg-vang" : "bg-vang/30"}`} />
        ))}
      </div>
    </div>
  );
}

const MINI = {
  sage: ["#b5c9a3", "#9db58a", "#7f9a6c"],
  peach: ["#f0d6b0", "#dcb887", "#c39a68"],
  navy: ["#3a5c98", "#2b4a82", "#1f3868"],
  red: ["#cf4540", "#b3332f", "#8f2522"],
  cream: ["#f6f1e2", "#e4dcc4", "#cfc4a6"],
};

function MiniBox({ x, y, s, c, delay = 0 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className="animate-bob motion-reduce:animate-none" style={{ animationDelay: `${delay}s` }}>
        <polygon points="12,0 24,6 12,12 0,6" fill={c[0]} />
        <polygon points="0,6 12,12 12,26 0,20" fill={c[1]} />
        <polygon points="12,12 24,6 24,20 12,26" fill={c[2]} />
        <polygon points="5,8.5 8,10 8,24 5,22.5" fill="#e6c98a" />
        <polygon points="16,10 19,8.5 19,22.5 16,24" fill="#e6c98a" />
      </g>
    </g>
  );
}

function Spark({ x, y, s, c, delay = 0 }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path className="animate-blink motion-reduce:animate-none" style={{ animationDelay: `${delay}s` }} fill={c}
        d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5Z" />
    </g>
  );
}

function GiftModal({ onClose }) {
  const [tab, setTab] = useState(0);
  const [copied, setCopied] = useState(false);
  const g = gifts[tab];

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [onClose]);

  const copy = async () => {
    try { await navigator.clipboard.writeText(g.number); }
    catch {
      const t = document.createElement("textarea");
      t.value = g.number; document.body.appendChild(t); t.select();
      try { document.execCommand("copy"); } catch {}
      t.remove();
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return createPortal(
    <div onClick={onClose} className="fixed inset-0 z-[60] grid place-items-center overflow-y-auto bg-black/60 p-4">
      <div role="dialog" aria-modal="true" aria-label="Hộp mừng cưới" onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-sm animate-pop rounded-3xl bg-white p-6 text-center text-muc shadow-2xl motion-reduce:animate-none">
        <button autoFocus onClick={onClose} aria-label="Đóng"
          className="absolute right-4 top-4 grid size-9 place-items-center rounded-full text-2xl leading-none text-muc/50 hover:bg-muc/5">×</button>
        <h3 className="font-script text-4xl text-vang">Hộp mừng cưới</h3>
        <p className="text-sm opacity-60">Cảm ơn tình cảm của mọi người</p>

        <div role="tablist" className="mt-5 grid grid-cols-2 gap-1 rounded-2xl bg-muc/5 p-1">
          {gifts.map((x, i) => (
            <button key={x.who} role="tab" aria-selected={tab === i} onClick={() => { setTab(i); setCopied(false); }}
              className={`rounded-xl py-2.5 text-sm font-semibold transition ${tab === i ? "bg-white text-son shadow" : "text-muc/60"}`}>
              {x.who}
            </button>
          ))}
        </div>

        <Photo src={g.qr} alt={`Mã QR ${g.who}`} className="mx-auto mt-5 aspect-square w-full max-w-[16rem] rounded-2xl border border-vang/40 bg-white" />
        <p className="mt-4 text-xs font-semibold uppercase tracking-widest opacity-50">{g.bank}</p>
        <p className="text-lg font-semibold">{g.owner}</p>

        <div className="mt-3 flex items-center justify-between gap-3 rounded-2xl bg-son/5 px-4 py-3">
          <span className="font-semibold tracking-wider text-son">{g.number}</span>
          <button onClick={copy} className="rounded-lg bg-white px-3 py-1 text-xs font-bold text-son shadow-sm">
            {copied ? "ĐÃ CHÉP" : "COPY"}
          </button>
        </div>

        <a href={g.qr} download={`QR-${g.who}.png`}
          className="mt-4 block rounded-2xl bg-xanh-sau py-3 font-semibold text-giay hover:bg-xanh">
          Tải ảnh QR về máy
        </a>
        <p className="mt-2 text-xs opacity-50">Tải ảnh về, mở app ngân hàng, quét ảnh từ thư viện</p>
      </div>
    </div>,
    document.body
  );
}

function GiftBox() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button onClick={() => setOpen(true)} aria-label="Mở hộp quà mừng cưới" className="group mx-auto block w-full max-w-xs">
        <svg viewBox="0 0 240 230" aria-hidden="true" className="w-full overflow-visible transition-transform duration-300 group-hover:scale-105">
          <defs>
            <linearGradient id="gb-gold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#f4e2b0" />
              <stop offset="1" stopColor="#c79a4b" />
            </linearGradient>
          </defs>
          <MiniBox x={8} y={34} s={1.2} c={MINI.sage} delay={0.2} />
          <MiniBox x={196} y={30} s={1.1} c={MINI.peach} delay={0.9} />
          <MiniBox x={4} y={128} s={0.9} c={MINI.navy} delay={0.5} />
          <MiniBox x={204} y={120} s={0.85} c={MINI.red} delay={1.3} />
          <ellipse cx="120" cy="200" rx="72" ry="8" fill="#000" opacity="0.12" />
          <g className="animate-bob motion-reduce:animate-none" style={{ animationDuration: "4s" }}>
            <polygon points="55,82 120,114 120,194 55,162" fill="#1b3d28" />
            <polygon points="120,114 185,82 185,162 120,194" fill="#143120" />
            <polygon points="120,50 185,82 120,114 55,82" fill="#2c5e3d" />
            <polyline points="55,98 120,130 185,98" fill="none" stroke="#e6c98a" strokeOpacity="0.35" />
            <polygon points="80,94.3 95,101.7 95,181.7 80,174.3" fill="url(#gb-gold)" />
            <polygon points="80,94.3 95,101.7 160,69.7 145,62.3" fill="url(#gb-gold)" opacity="0.95" />
            <text transform="translate(152 152) skewY(-26)" fontSize="38" fontWeight="700" textAnchor="middle" fill="url(#gb-gold)"
              style={{ fontFamily: "var(--font-hy)" }}>囍</text>
            <path d="M118 80L104 102L112 100L121 84Z" fill="#d4ad63" />
            <path d="M124 80L138 100L130 99L121 84Z" fill="#c79a4b" />
            <ellipse cx="98" cy="66" rx="24" ry="11" transform="rotate(-24 98 66)" fill="url(#gb-gold)" />
            <ellipse cx="98" cy="66" rx="13" ry="4.5" transform="rotate(-24 98 66)" fill="#b3893f" opacity="0.55" />
            <ellipse cx="142" cy="66" rx="24" ry="11" transform="rotate(24 142 66)" fill="url(#gb-gold)" />
            <ellipse cx="142" cy="66" rx="13" ry="4.5" transform="rotate(24 142 66)" fill="#b3893f" opacity="0.55" />
            <ellipse cx="120" cy="77" rx="8" ry="6" fill="#d9b66f" />
          </g>
          <MiniBox x={30} y={168} s={1.15} c={MINI.cream} delay={0.7} />
          <MiniBox x={170} y={162} s={1.2} c={MINI.navy} delay={1.1} />
          <Spark x={60} y={28} s={0.7} c="#7fb08a" />
          <Spark x={205} y={70} s={0.5} c="#7fb08a" delay={0.8} />
          <Spark x={22} y={100} s={0.35} c="#e6c98a" delay={1.4} />
        </svg>
        <span className="mt-1 block text-sm font-semibold opacity-70">Nhấn để mở</span>
      </button>
      {open && <GiftModal onClose={() => setOpen(false)} />}
    </>
  );
}

const Divider = () => (
  <div className="mx-auto my-6 flex w-48 items-center gap-3 text-xanh" aria-hidden="true">
    <span className="h-px flex-1 bg-current" />
    <span className="size-2 rotate-45 border border-current" />
    <span className="h-px flex-1 bg-current" />
  </div>
);

function useCountdown(target) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => { const t = setInterval(() => setNow(Date.now()), 1000); return () => clearInterval(t); }, []);
  const d = Math.max(0, new Date(target) - now);
  return [
    ["Ngày", Math.floor(d / 864e5)],
    ["Giờ", Math.floor(d / 36e5) % 24],
    ["Phút", Math.floor(d / 6e4) % 60],
    ["Giây", Math.floor(d / 1e3) % 60],
  ];
}

function Section({ title, children, dark = false }) {
  return (
    <section className={`px-4 py-12 ${dark ? "bg-xanh text-giay" : ""}`}>
      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-script text-5xl text-vang">{title}</h2>
        <Divider />
        {children}
      </div>
    </section>
  );
}

function MusicButton({ on, toggle }) {
  return (
    <button onClick={toggle} aria-label={on ? "Tắt nhạc" : "Bật nhạc"} aria-pressed={on}
      className="fixed bottom-5 right-5 z-10 size-12 rounded-full shadow-lg shadow-black/40">
      <svg viewBox="0 0 64 64" className="size-full">
        {/* đĩa quay khi đang phát, đứng yên khi tắt */}
        <g className={`origin-center animate-spin [animation-duration:5s] motion-reduce:animate-none ${on ? "" : "[animation-play-state:paused]"}`}>
          <circle cx="32" cy="32" r="31" fill="#14110f" stroke="#ffffff55" strokeWidth="1.5" />
          <circle cx="32" cy="32" r="25" fill="none" stroke="#ffffff1a" />
          <circle cx="32" cy="32" r="20" fill="none" stroke="#ffffff1a" />
          <circle cx="13" cy="14" r="3" fill="#1e4d4f" />
          <circle cx="32" cy="32" r="13" fill="#ffffff" />
          <rect x="25.5" y="24" width="3" height="16" rx="1.5" fill="#1e4d4f" />
          <rect x="30.5" y="24" width="3" height="16" rx="1.5" fill="#1e4d4f" />
          <rect x="35.5" y="24" width="3" height="16" rx="1.5" fill="#1e4d4f" />
        </g>
        {/* cây kim đứng yên */}
        <path d="M30 35 L18 47" stroke="#ffffff" strokeWidth="3.5" strokeLinecap="round" />
      </svg>
    </button>
  );
}

function Cover({ opened, onOpen }) {
  const guest = new URLSearchParams(window.location.search).get("khach") || bia.defaultGuest;
  return (
    <div className={`fixed inset-0 z-50 bg-xanh-sau   transition-transform   duration-[1000ms] ease-[cubic-bezier(0.22,1,0.36,1)] delay-700 will-change-transform motion-reduce:transition-none ${opened ? "pointer-events-none -translate-y-full" : ""}`}>
      <HyBurst run={opened} />
      <div className="absolute inset-0"><Photo zoom src={bia.image} alt="" className="h-full w-full" /></div>
      <div className="absolute inset-0 bg-linear-to-b from-black/85 via-transparent to-black/85" />
      <Floaters glyph="hy" className="absolute inset-0" count={12} min={12} max={28} peak={0.4} colors={["text-giay", "text-[#e6c98a]"]} />
      <div className={`relative flex h-full flex-col items-center px-6 py-10 text-center text-giay transition-opacity duration-500 motion-reduce:transition-none ${opened ? "opacity-0" : ""}`}>
        <div className="flex w-full flex-1 flex-col justify-between [text-shadow:0_2px_8px_rgba(0,0,0,.6)]">
          {!bia.hasText && (
            <>
              <div>
                <p className="font-script text-4xl">Thiệp mời</p>
                <p className="text-2xl font-semibold text-[#e6c98a]">Lễ thành hôn</p>
                <p className="font-script mt-4 text-6xl sm:text-7xl">{w.bride} &amp; {w.groom}</p>
                <p className="mt-2 text-2xl">{w.displayDate}</p>
              </div>
              <div>
                <p>Trân trọng kính mời</p>
                <p className="font-script text-4xl text-[#e6c98a]">{guest}</p>
              </div>
            </>
          )}
        </div>
        <button onClick={onOpen}
          className="mt-6 border-2 border-[#e6c98a] bg-xanh px-7 py-2 text-giay outline outline-1 outline-offset-4 cursor-pointer rounded-xl outline-[#e6c98a]/60 animate-ring motion-reduce:animate-none">
          <span className="animate-blink motion-reduce:animate-none">{bia.button}</span>
        </button>
      </div>
    </div>
  );
}

function Rsvp() {
  const [wishes, setWishes] = useState(loadWishes);
  const [attend, setAttend] = useState("Sẽ tham dự");
  const [sent, setSent] = useState(false);
  const going = attend === "Sẽ tham dự";

  const submit = (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    setWishes(saveWish({
      name: String(f.get("name") || "").trim(),
      guests: going ? f.get("guests") : "0",
      attend,
      msg: String(f.get("msg") || "").trim(),
    }));
    e.target.reset();
    setAttend("Sẽ tham dự");
    setSent(true);
  };

  const card = "rounded-3xl border border-white/60 bg-white/80 p-6 text-left shadow-xl shadow-black/10 backdrop-blur-sm sm:p-8";
  const label = "text-sm font-semibold text-xanh-sau";
  const field = "mt-2 w-full rounded-2xl border border-vang/40 bg-white/70 px-4 py-3 outline-none transition placeholder:text-muc/40 focus:border-vang focus:bg-white focus:ring-2 focus:ring-vang/30";
  const pill = "block cursor-pointer rounded-2xl border border-vang/40 bg-white/70 px-3 py-3 text-center text-sm transition peer-checked:border-transparent peer-checked:bg-xanh peer-checked:text-giay peer-focus-visible:ring-2 peer-focus-visible:ring-vang";

  return (
    <div>
      <p className="mb-6">Sự hiện diện của bạn là niềm hạnh phúc của chúng mình.</p>
      <div className="grid gap-6 md:grid-cols-2">
        <form onSubmit={submit} className={`${card} space-y-5`}>
          <label className="block">
            <span className={label}>Tên của bạn</span>
            <input required name="name" placeholder="Nguyễn Văn A" className={field} />
          </label>

          <fieldset>
            <legend className={label}>Bạn có tham dự không?</legend>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {[["Sẽ tham dự", "Sẽ tham dự"], ["Rất tiếc không đến được", "Rất tiếc không đến được"]].map(([v, l]) => (
                <label key={v}>
                  <input type="radio" name="attend" value={v} checked={attend === v} onChange={() => setAttend(v)} className="peer sr-only" />
                  <span className={pill}>{l}</span>
                </label>
              ))}
            </div>
          </fieldset>

          {going && (
            <fieldset>
              <legend className={label}>Đi cùng</legend>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {[["1", "Một mình"], ["2", "2 người"], ["3", "3 người"], ["4", "4 người"]].map(([v, l]) => (
                  <label key={v}>
                    <input type="radio" name="guests" value={v} defaultChecked={v === "1"} className="peer sr-only" />
                    <span className={pill}>{l}</span>
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          <label className="block">
            <span className={label}>Lời nhắn nhủ</span>
            <textarea name="msg" rows="3" placeholder="Viết vài lời thật dễ thương nhé..." className={`${field} resize-none`} />
          </label>

          <button className="w-full rounded-full bg-son px-6 py-3.5 font-semibold text-giay shadow-lg shadow-son/25 transition hover:bg-son/90 active:scale-[0.99]">
            Gửi xác nhận
          </button>
          {sent && <p role="status" className="text-center text-sm text-xanh">Đã gửi, cảm ơn bạn nhiều!</p>}
        </form>

        <div className={card}>
          <h3 className="font-script text-4xl text-vang">Sổ lưu bút</h3>
          <p className="mt-1 text-sm opacity-70">Những lời thương mến gửi đến cô dâu chú rể.</p>
          <ul className="mt-5 max-h-[26rem] space-y-3 overflow-y-auto pr-1">
            {wishes.length === 0 && (
              <li className="py-8 text-center text-sm opacity-60">Hãy là người đầu tiên gửi lời chúc nhé!</li>
            )}
            {wishes.map((x) => {
              const yes = x.attend === "Sẽ tham dự";
              return (
                <li key={x.at} className="flex gap-3 rounded-2xl bg-white/80 p-4 shadow-sm">
                  <span aria-hidden="true" className="grid size-10 shrink-0 place-items-center rounded-full bg-giay font-semibold text-son">
                    {(x.name || "?").charAt(0).toUpperCase()}
                  </span>
                  <div className="min-w-0">
                    <p className="flex flex-wrap items-center gap-2 font-semibold">
                      {x.name}
                      <span className={`rounded-full px-2 py-0.5 text-xs font-normal ${yes ? "bg-emerald-100 text-emerald-800" : "bg-stone-200 text-stone-600"}`}>
                        {yes ? "Tham dự" : "Vắng mặt"}
                      </span>
                    </p>
                    {x.msg && <p className="mt-1 break-words italic">“{x.msg}”</p>}
                    <p className="mt-1 text-xs opacity-50">{new Date(x.at).toLocaleDateString("vi-VN")}</p>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const count = useCountdown(w.date);
  const over = new Date(w.date).getTime() <= Date.now();
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [opened, setOpened] = useState(false);
  const [gone, setGone] = useState(false);
  useEffect(() => { document.body.style.overflow = gone ? "" : "hidden"; }, [gone]);
  const play = () => audioRef.current?.play().then(() => setPlaying(true)).catch(() => {});
  const toggleMusic = () => { if (playing) { audioRef.current.pause(); setPlaying(false); } else play(); };
  const open = () => { window.scrollTo(0, 0); setOpened(true); play(); setTimeout(() => setGone(true), 1800); };
  return (
    <main>
      <audio ref={audioRef} src={music} loop preload="auto" />
      {opened && <Floaters glyph="heart" count={16} min={10} max={22} peak={0.9} colors={["text-[#ff6fb0]", "text-[#ff8fc4]"]} />}
      {!gone && <Cover opened={opened} onOpen={open} />}
      <div aria-hidden="true" className="fixed inset-0 -z-10">
      <Photo zoom src={nen} alt="" className="absolute -inset-10 blur-[1px]" />
      <div className="absolute inset-0 bg-white/25" />
      </div>
      <header className="relative overflow-hidden px-4 py-10 sm:pb-1">
  {/* khung thiệp trắng */}
  <div className={`relative mx-auto max-w-4xl overflow-hidden rounded-2xl border border-vang/70 bg-white/95 p-2 motion-reduce:animate-none ${opened ? "animate-rise" : "opacity-0"}`}>
    {/* chữ hỷ hai góc dưới */}
    <span aria-hidden="true" className="font-hy pointer-events-none absolute -bottom-8 -left-6 rotate-[20deg] select-none text-[9rem] font-bold leading-none text-vang/15">囍</span>
    <span aria-hidden="true" className="font-hy pointer-events-none absolute -bottom-8 -right-6 -rotate-[20deg] select-none text-[9rem] font-bold leading-none text-vang/15">囍</span>

    <div className="relative rounded-xl border border-vang/40 px-6 py-10 pb-1 text-center text-xanh-sau">
      {/* khối xanh kiểu mẫu: lời mời, tên, chữ hỷ, chữ cong */}
        <h1 className="sr-only">{w.bride} và {w.groom}</h1>
        <p className="text-xl uppercase tracking-[0.35em] text-muc/80 pl-[0.35em] sm:text-xl">NƠI TÌNH YÊU NỞ HOA</p>
        <div className="mt-6 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3">
          <div>
            <p className="text-sm text-center">Cô dâu</p>
            <p className="font-serif text-center text-lg uppercase tracking-wide sm:text-4xl p">{w.bride}</p>
          </div>
          <span aria-hidden="true" className="font-hy text-6xl font-bold text-center leading-none text-vang sm:text-7xl">囍</span>
          <div>
            <p className="text-sm text-center">Chú rể</p>
            <p className="font-serif text-center text-lg uppercase tracking-wide sm:text-4xl">{w.groom}</p>
          </div>
        </div>
        <p className="mt-5 flex items-center justify-center gap-3 text-xl tracking-[0.2em] text-muc sm:text-2xl pb-8">
        <span className="size-2 rotate-45 border border-current" />
          {w.weekday}, {w.displayDate}
        <span className="size-2 rotate-45 border border-current" />
          </p>

      {/* hai ảnh */}
      <div className="relative mx-auto aspect-[5/8] w-full sm:aspect-[25/18]">
        <span aria-hidden="true" className="font-hy pointer-events-none absolute -right-2 top-4 rotate-[15deg] select-none text-[6rem] font-bold leading-none text-vang/25 sm:text-[10rem]">囍</span>
        <span aria-hidden="true" className="font-hy pointer-events-none absolute -left-2 bottom-8 -rotate-[15deg] select-none text-[6rem] font-bold leading-none text-vang/25 sm:text-[10rem]">囍</span>
        <Photo zoom src={cover} alt={`Ảnh cưới ${w.bride} và ${w.groom}`}
          className="absolute left-0 top-0 aspect-[3/4] w-[62%] -rotate-3 rounded-xl border-2 border-xanh shadow-xl shadow-black/25 sm:w-[48.5%]" />
        <Photo zoom src={cover2} alt={`Ảnh cưới ${w.bride} và ${w.groom}`}
          className="absolute bottom-0 right-0 aspect-[3/4] w-[62%] rotate-3 rounded-xl border-2 border-xanh shadow-xl shadow-black/25 sm:w-[48.5%]" />
      </div>

      {/* lời mời*/}
      <p className="mx-auto mt-6 max-w-xs">Trân trọng mời bạn đến dự lễ thành hôn của chúng mình</p>
      <Divider />
    </div>
  </div>
</header>

      <Section title="Đếm ngày chung đôi">
        {over ? (
          <div className="mx-auto max-w-md border border-vang/60 px-6 py-8">
            <p className="font-script text-4xl text-son">Đám cưới đã diễn ra</p>
            <p className="mt-2">Cảm ơn bạn đã dành tình cảm cho chúng mình.</p>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-2">
            {count.map(([label, n]) => (
              <div key={label} className="border border-vang/60 py-4">
                <div className="text-3xl font-semibold text-son sm:text-5xl">{String(n).padStart(2, "0")}</div>
                <div className="text-sm">{label}</div>
              </div>
            ))}
          </div>
        )}
      </Section>

      <Section title="Chuyện của chúng mình" dark>
        <Timeline />
      </Section>

      <Section title="Album ảnh cưới">
        <Coverflow />
      </Section>

      <Section title="Thời gian và địa điểm" dark>
        <div className="grid gap-6 sm:grid-cols-2">
          {events.map((e) => (
            <div key={e.title} className="border border-vang/60 p-6">
              <h3 className="text-xl font-semibold text-vang">{e.title}</h3>
              <p>{e.time}</p>
              <p className="mt-2 font-semibold">{e.place}</p>
              <p>{e.address}</p>
              <a href={e.map} target="_blank" rel="noreferrer" className="mt-4 inline-block border border-vang px-4 py-1 hover:bg-vang hover:text-xanh-sau">Xem bản đồ</a>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Xác nhận tham dự">
        <Rsvp />
      </Section>

      <Section title="Quà yêu thương">
        <GiftBox />
      </Section>

      <footer className="px-4 py-10 text-center text-son">
        <p className="font-script text-4xl">Cảm ơn bạn đã đến để yêu thương lan tỏa, giúp khoảnh khắc này trở nên ý nghĩa.</p>
      </footer>
      <MusicButton on={playing} toggle={toggleMusic} />
    </main>
  );
}
