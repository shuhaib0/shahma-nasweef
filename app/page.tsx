"use client";

import { useEffect, useRef, useState } from "react";

const A = "/assets/";
const weddingDate = new Date("2026-08-10T16:00:00");

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
  const [rsvp, setRsvp] = useState(false);
  const [guestName, setGuestName] = useState("");
  const [guestCount, setGuestCount] = useState("1");
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
      <button className="seal-button" onClick={open} aria-label="Open invitation">
        <img className="wax-seal bismillah-seal realistic-seal" src={`${A}bismillah-real-gold-seal.png`} alt="Bismillah" />
        <span>Click to open</span>
      </button>
      <div className="opening-flap opening-left" /><div className="opening-flap opening-right" />
    </div>

    <main>
      <section className="palace-hero">
        <div className="hero-copy reveal">
          <p className="eyebrow">Together with their families</p>
          <h1>Mufeed<br /><em>&</em><br />Fahiza</h1>
          <Ornament />
          <p className="hero-date">10 August 2026<br /><small>Reception at 4 o&apos;clock in the afternoon</small></p>
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
          <h2>Mufeed & Fahiza</h2>
          <p className="event-details">Monday, 10 August 2026<br />Reception at four o&apos;clock in the afternoon</p>
          <Ornament />
          <h3>Orlando City Convention Centre</h3>
          <p>Komarappady</p>
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
          <h2>Orlando City<br />Convention Centre</h2>
          <p>Komarappady</p>
          <a href="https://share.google/LTTzfqQvZbkdqCUeQ" target="_blank" rel="noreferrer">Open in Google Maps</a>
        </div>
      </section>

      <section className="map-section reveal">
        <iframe
          title="Orlando City Convention Centre map"
          src="https://www.google.com/maps?q=Orlando%20City%20Convention%20Centre%20Komarappady&output=embed"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>

      <section className="programme reception-only section-pad reveal">
        <h2>Reception</h2>
        <Ornament />
        <strong className="reception-time">4 PM</strong>
        <p>Monday, 10 August 2026</p>
      </section>

      <section className="family section-pad reveal">
        <p className="eyebrow">With the blessings of</p>
        <h2>Our Family</h2>
        <Ornament />
        <h3>Musthafa</h3>
        <p className="family-role">Father</p>
        <p className="family-names">Navaf <i>•</i> Fahad <i>•</i> Jameela<br />Ramna <i>•</i> Sheheera</p>
      </section>

      <section className="rsvp section-pad reveal">
        <p className="arabic-bismillah small">وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا</p>
        <h2>Kindly Reply</h2>
        <Ornament />
        <p>Your presence will make our celebration complete.<br />Please join us on 10 August 2026.</p>
        <form className="rsvp-form" onSubmit={event => { event.preventDefault(); setRsvp(true); }}>
          <label>Guest name<input required value={guestName} onChange={event => setGuestName(event.target.value)} placeholder="Your full name" /></label>
          <label>Number of guests<select value={guestCount} onChange={event => setGuestCount(event.target.value)}>{[1,2,3,4,5,6,7,8,9,10].map(count => <option key={count} value={count}>{count}</option>)}</select></label>
          <button type="submit">Confirm Attendance</button>
        </form>
        <div className={`rsvp-message ${rsvp ? "show" : ""}`}>Thank you, {guestName}. Your RSVP for {guestCount} {guestCount === "1" ? "guest" : "guests"} is confirmed.</div>
      </section>

      <section className="closing reveal">
        <div><h2>With Love</h2><p>Mufeed & Fahiza</p><Ornament /></div>
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
