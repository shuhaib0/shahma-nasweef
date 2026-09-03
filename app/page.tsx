"use client";

import { useEffect, useRef, useState } from "react";

const A = "/assets/";
const weddingDate = new Date("2026-09-27T16:00:00");

const googleCalendarUrl =
  "https://calendar.google.com/calendar/render?action=TEMPLATE" +
  "&text=" + encodeURIComponent("Wedding Reception · Shahma Sherin & Nasweef") +
  "&dates=20260927T103000Z/20260927T143000Z" +
  "&details=" + encodeURIComponent("Wedding reception celebration of Shahma Sherin and Nasweef.\n\nTime: 4:00 PM onwards\nVenue: Residence, Karupparammal Colony, Thamarassery\nGoogle Maps: https://maps.app.goo.gl/UAxrwVX167pr1A7j7") +
  "&location=" + encodeURIComponent("Residence, Karupparammal Colony, Thamarassery, Kerala 673573, India");

function downloadIcs() {
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Shahma & Nasweef Wedding//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    "UID:wedding-shahma-nasweef-20260927@wedding",
    `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, "").split(".")[0]}Z`,
    "DTSTART:20260927T103000Z",
    "DTEND:20260927T143000Z",
    "SUMMARY:Wedding Reception · Shahma Sherin & Nasweef",
    "DESCRIPTION:Wedding reception celebration of Shahma Sherin and Nasweef.\\n\\nTime: 4:00 PM onwards\\nVenue: Residence\\, Karupparammal Colony\\, Thamarassery\\nGoogle Maps: https://maps.app.goo.gl/UAxrwVX167pr1A7j7",
    "LOCATION:Residence\\, Karupparammal Colony\\, Thamarassery\\, Kerala 673573",
    "STATUS:CONFIRMED",
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "shahma-nasweef-wedding.ics");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

function handleSaveToCalendar() {
  const userAgent = typeof navigator !== "undefined" ? navigator.userAgent || "" : "";
  const platform = typeof navigator !== "undefined" ? (navigator as any).userAgentData?.platform || navigator.platform || "" : "";
  
  const isIOS = /iPad|iPhone|iPod/.test(userAgent) || (platform === "MacIntel" && typeof navigator !== "undefined" && navigator.maxTouchPoints > 1);
  const isApple = isIOS || /Macintosh|MacIntel/.test(platform);

  if (isApple) {
    downloadIcs();
  } else {
    window.open(googleCalendarUrl, "_blank", "noopener,noreferrer");
  }
}

function Ornament() {
  return <div className="ornament"><span /><b>✦</b><span /></div>;
}

function Countdown() {
  const getTime = () => {
    const distance = Math.max(0, weddingDate.getTime() - Date.now());
    return {
      days: Math.floor(distance / 86400000),
      hours: Math.floor(distance / 3600000) % 24,
      minutes: Math.floor(distance / 60000) % 60,
      seconds: Math.floor(distance / 1000) % 60,
    };
  };
  const [time, setTime] = useState(getTime);
  useEffect(() => {
    const timer = setInterval(() => setTime(getTime()), 1000);
    return () => clearInterval(timer);
  }, []);
  return <div className="countdown">
    {Object.entries(time).map(([label, value]) => <div key={label}><strong>{String(value).padStart(2, "0")}</strong><span>{label}</span></div>)}
  </div>;
}

export default function Home() {
  const [opened, setOpened] = useState(false);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const player = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    document.body.classList.toggle("locked", !opened);
    const observer = new IntersectionObserver(entries => entries.forEach(e => e.isIntersecting && e.target.classList.add("visible")), { threshold: .14 });
    document.querySelectorAll(".reveal").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [opened]);

  const open = () => {
    setOpened(true);
    setTimeout(() => {
      player.current?.contentWindow?.postMessage(JSON.stringify({ event: "command", func: "playVideo", args: [] }), "*");
      setMusicPlaying(true);
    }, 300);
  };
  const toggleMusic = () => {
    const command = musicPlaying ? "pauseVideo" : "playVideo";
    player.current?.contentWindow?.postMessage(JSON.stringify({ event: "command", func: command, args: [] }), "*");
    setMusicPlaying(!musicPlaying);
  };

  return <>
    <div className={`opening ${opened ? "open" : ""}`}>
      <div className="paper-back" />
      <div className="opening-light" aria-hidden="true" />
      <button className="seal-button" onClick={open} aria-label="Open invitation">
        <img className="wax-seal bismillah-seal realistic-seal" src={`${A}bismillah-real-gold-seal.png`} alt="Bismillah" />
        <span>Click to open</span>
      </button>
      <div className="opening-flap opening-left" />
      <div className="opening-flap opening-right" />
      <div className="opening-flap opening-top" />
      <div className="opening-flap opening-bottom" />
    </div>

    <main>
      <section className="palace-hero">
        <div className="hero-scene" aria-hidden="true" />
        <div className="chandelier-glow" aria-hidden="true" />
        <div className="hero-copy reveal">
          <p className="eyebrow">Together with their families</p>
          <h1>Shahma Sherin<br /><em>&</em><br />Nasweef</h1>
          <Ornament />
          <p className="hero-date">27 September 2026<br /><small>Reception at 4 o&apos;clock in the afternoon</small></p>
        </div>
      </section>

      <section className="invitation-section section-pad reveal">
        <div className="arch-card">
          <div className="arabic-bismillah">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ</div>
          <Ornament />
          <p className="arabic-copy" dir="rtl">
            بفرح كبير وقلوب مليئة بالمحبة<br />
            نتشرف بدعوتكم لمشاركتنا<br />
            حفل زفافنا وبداية رحلتنا معًا
          </p>
          <p className="invite-copy">
            With joyful hearts, we invite you<br />
            to celebrate the wedding reception of
          </p>
          <h2>Shahma Sherin & Nasweef</h2>
          <p className="event-details">Sunday, 27 September 2026<br />Reception at four o&apos;clock in the afternoon</p>
          <Ornament />
          <h3>Residence</h3>
          <p>Karupparammal Colony, Thamarassery</p>
        </div>
      </section>

      <section className="countdown-section section-pad reveal">
        <h2>The Celebration Commences</h2>
        <Ornament />
        <Countdown />
        <p className="section-note">Until our forever begins</p>
      </section>

      <section className="venue-section reveal">
        <div className="venue-overlay">
          <p className="eyebrow">Lieu</p>
          <Ornament />
          <div className="map-pin">♡</div>
          <h2>Residence</h2>
          <p>Karupparammal Colony, Thamarassery</p>
          <a href="https://maps.app.goo.gl/UAxrwVX167pr1A7j7" target="_blank" rel="noreferrer">Open in Google Maps</a>
        </div>
      </section>

      <section className="map-section reveal">
        <iframe
          title="Wedding location map"
          src="https://maps.google.com/maps?q=11.410288,75.91671&z=16&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>

      <section className="programme reception-only section-pad reveal">
        <h2>Reception</h2>
        <Ornament />
        <strong className="reception-time">4 PM</strong>
        <p>Sunday, 27 September 2026</p>
      </section>

      <section className="family section-pad reveal">
        <p className="eyebrow">With the blessings of</p>
        <h2>Our Family</h2>
        <Ornament />
        <h3>Musthafa</h3>
        <p className="family-role">Father</p>
        <p className="family-names">Navaf <i>•</i> Fahad <i>•</i> Jameela<br />Ramna <i>•</i> Sheheera</p>
      </section>

      <section className="rsvp save-the-date-section section-pad reveal">
        <p className="arabic-bismillah small">وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا</p>
        <h2>Save the Date</h2>
        <Ornament />
        <p>Your presence will make our celebration complete.<br />Please join us on 27 September 2026.</p>
        <div className="calendar-actions">
          <button
            type="button"
            onClick={handleSaveToCalendar}
            className="calendar-btn"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM7 11h5v5H7z" />
            </svg>
            <span>Save to Calendar</span>
          </button>
        </div>
      </section>

      <section className="closing reveal">
        <div><h2>With Love</h2><p>Shahma & Nasweef</p><Ornament /></div>
      </section>
    </main>

    <button className="music" onClick={toggleMusic} aria-label="Toggle music">{musicPlaying ? "Ⅱ" : "▶"}</button>
    <iframe
      ref={player}
      className="youtube-player"
      title="Wedding music"
      src="https://www.youtube.com/embed/ivrumxRUz_Y?enablejsapi=1&loop=1&playlist=ivrumxRUz_Y&playsinline=1"
      allow="autoplay"
    />
  </>;
}
