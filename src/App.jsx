import React, { useState, useEffect, useRef } from 'react';

const STYLES = `
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500&family=Urbanist:wght@200;300;400;500&display=swap');

:root {
  --paper: #f4f3ed;
  --card: #fbfaf6;
  --line: #e2ded5;
  --ink: #111113;
  --muted: #64646e;
  --faint: #a3a29b;
  --accent: #c04832;
  --accent-soft: rgba(192, 72, 50, 0.14);
  --night: #0e0e10;
  --night-line: rgba(248, 247, 242, 0.1);
  --night-text: #f8f7f2;
  --night-muted: #9a9aa3;
  --mono: 'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace;
  --sans: Urbanist, system-ui, -apple-system, 'Segoe UI', sans-serif;
  --ease: cubic-bezier(0.16, 1, 0.3, 1);
}

html { scroll-behavior: smooth; scroll-padding-top: 96px; }
body { margin: 0; background: var(--paper); }

:where(.site) a { color: inherit; text-decoration: none; }
:where(.site) button { font: inherit; color: inherit; }
:where(.site) :is(p, h1, h2, figure) { margin: 0; }
.site *, .site *::before, .site *::after { box-sizing: border-box; }
.site :focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
.site {
  min-height: 100vh;
  background: var(--paper);
  color: var(--ink);
  font-family: var(--sans);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  overflow-x: clip;
}
.wrap { max-width: 1240px; margin: 0 auto; padding-left: 40px; padding-right: 40px; }

/* reveal */
.reveal { opacity: 0; transform: translateY(18px); transition: opacity 0.9s var(--ease), transform 0.9s var(--ease); }
.reveal.in { opacity: 1; transform: none; }

/* buttons */
.pill {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  white-space: nowrap;
  transition: background 0.2s, color 0.2s, transform 0.25s var(--ease);
}
.pill:active { transform: scale(0.97); }
.pill-dark { background: var(--ink); color: #faf9f5; padding: 10px 20px; }
.pill-dark:hover { background: var(--accent); }
.pill-light { background: var(--night-text); color: var(--ink); padding: 16px 32px; letter-spacing: 0.14em; }
.pill-light:hover { background: var(--accent); color: #fff; }

/* nav */
.nav { position: sticky; top: 0; z-index: 40; padding: 14px 24px; }
.nav-inner {
  position: relative;
  isolation: isolate;
  max-width: 1180px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 8px 8px 8px 22px;
  border-radius: 999px;
  box-shadow: 0 1px 2px rgba(17, 17, 19, 0.06), 0 14px 34px -14px rgba(17, 17, 19, 0.3);
}
.nav-inner::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 1;
  padding: 1px;
  border-radius: inherit;
  pointer-events: none;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.95), rgba(255, 255, 255, 0) 35%, rgba(255, 255, 255, 0) 65%, rgba(255, 255, 255, 0.7));
  -webkit-mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite: xor;
  mask: linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  mask-composite: exclude;
}
.nav-inner::after {
  content: '';
  position: absolute;
  inset: 0;
  z-index: 1;
  border-radius: inherit;
  pointer-events: none;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.18));
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.9),
    inset 0 -1px 0 rgba(17, 17, 19, 0.06),
    inset 0 0 18px 2px rgba(255, 255, 255, 0.3);
}
.brand, .nav-links { position: relative; z-index: 2; }
.lens {
  position: absolute;
  inset: 0;
  z-index: 0;
  border-radius: inherit;
  pointer-events: none;
  background: rgba(244, 243, 237, 0.72);
  -webkit-backdrop-filter: blur(16px) saturate(1.6);
  backdrop-filter: blur(16px) saturate(1.6);
}
.lens[data-refract='true'] {
  background: none;
  backdrop-filter: blur(6px) url(#refraction-filter) saturate(1.6);
}
.lens-defs { position: absolute; width: 0; height: 0; overflow: hidden; }
.brand { display: inline-flex; align-items: center; font-size: 17px; font-weight: 500; letter-spacing: -0.01em; transition: color 0.3s; }
.brand::before {
  content: '';
  width: 10px;
  height: 10px;
  margin-right: 10px;
  border-radius: 50%;
  background: conic-gradient(from 200deg, var(--accent), #e08a5c, var(--ink), var(--accent));
}
.nav-links { display: flex; align-items: center; gap: 4px; }
.nav-link {
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
  padding: 9px 14px;
  border-radius: 999px;
  transition: color 0.2s, background 0.2s;
}
.nav-link:hover { color: var(--ink); background: rgba(255, 255, 255, 0.55); box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.9), 0 1px 3px rgba(17, 17, 19, 0.08); }
.nav-inner[data-tone='dark']::after {
  background: linear-gradient(180deg, rgba(14, 14, 16, 0.5), rgba(14, 14, 16, 0.34));
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.22),
    inset 0 -1px 0 rgba(0, 0, 0, 0.3),
    inset 0 0 18px 2px rgba(255, 255, 255, 0.05);
}
.nav-inner[data-tone='dark'] .brand { color: var(--night-text); }
.nav-inner[data-tone='dark'] .nav-link { color: var(--night-muted); }
.nav-inner[data-tone='dark'] .nav-link:hover { color: var(--night-text); background: rgba(255, 255, 255, 0.12); box-shadow: none; }
.nav-inner[data-tone='dark'] .pill-dark { background: var(--night-text); color: var(--ink); }
.nav-inner[data-tone='dark'] .pill-dark:hover { background: var(--accent); color: #fff; }
/* hero */
.hero { position: relative; isolation: isolate; overflow: hidden; }
.hero::before {
  content: '';
  position: absolute;
  inset: 0;
  z-index: -1;
  background-image: radial-gradient(rgba(17, 17, 19, 0.14) 1px, transparent 1.2px);
  background-size: 26px 26px;
  -webkit-mask-image: radial-gradient(70% 70% at 25% 30%, #000 0%, transparent 75%);
  mask-image: radial-gradient(70% 70% at 25% 30%, #000 0%, transparent 75%);
}
.hero-grid {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
  gap: 64px;
  align-items: stretch;
  padding-top: 72px;
  padding-bottom: 88px;
}
.hero-left { display: flex; flex-direction: column; }
.eyebrow {
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  gap: 12px;
  font-family: var(--mono);
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 24px;
}
.eyebrow::before {
  content: '';
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--accent);
}
.hero h1 {
  font-size: clamp(2.4rem, 5.2vw, 4.4rem);
  font-weight: 200;
  letter-spacing: -0.045em;
  line-height: 1.04;
  text-wrap: balance;
  margin-bottom: 48px;
}
.hero h1 em {
  font-style: normal;
  font-weight: 300;
  color: var(--accent);
}
.latest { margin-top: auto; max-width: 500px; }
.latest-title {
  font-family: var(--mono);
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 12px;
}
.latest-list { display: flex; flex-direction: column; gap: 8px; }
.latest-link {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  padding: 14px 18px;
  font-size: 0.98rem;
  font-weight: 300;
  background: rgba(251, 250, 246, 0.7);
  border: 1px solid var(--line);
  border-radius: 14px;
  transition: transform 0.35s var(--ease), border-color 0.2s, background 0.2s;
}
.latest-link:hover { transform: translateX(6px); border-color: var(--accent); background: #fff; }
.latest-arrow { color: var(--faint); transition: color 0.2s, transform 0.35s var(--ease); }
.latest-link:hover .latest-arrow { color: var(--accent); transform: translate(2px, -2px); }
.hero-right { display: flex; flex-direction: column; gap: 32px; }
.video-frame {
  border-radius: 22px;
  overflow: hidden;
  background: var(--ink);
  border: 1px solid var(--line);
  box-shadow: 0 30px 60px -22px rgba(17, 17, 19, 0.3), 0 10px 24px -12px rgba(17, 17, 19, 0.18);
}
.video-frame video { display: block; width: 100%; height: auto; object-fit: cover; }
.hero-copy { margin-top: auto; font-size: 1.2rem; font-weight: 300; line-height: 1.7; color: var(--muted); }

/* model */
.model { position: relative; isolation: isolate; overflow: hidden; background: var(--night); color: var(--night-text); }
.model-head { display: flex; align-items: baseline; justify-content: space-between; gap: 24px; padding-top: 72px; margin-bottom: 48px; }
.model-title, .model-name {
  font-family: var(--mono);
  font-size: 18px;
  font-weight: 500;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}
.model-title { color: var(--night-text); }
.model-name { color: var(--accent); }

.diagram {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 96px minmax(0, 0.8fr) 96px minmax(0, 1fr);
  grid-template-rows: auto 1fr;
  row-gap: 14px;
  align-items: center;
  padding-bottom: 80px;
}
.col-title {
  font-family: var(--mono);
  font-size: 14px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--night-text);
}
.col-body { display: flex; flex-direction: column; gap: 14px; align-self: stretch; }
.col-body > .glass:last-child { flex: 1; }
.glass {
  background: linear-gradient(180deg, rgba(248, 247, 242, 0.06), rgba(248, 247, 242, 0.025));
  border: 1px solid var(--night-line);
  border-radius: 18px;
  padding: 22px 24px;
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
}
.glass-label {
  font-family: var(--mono);
  font-size: 12px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--night-muted);
  margin-bottom: 18px;
}
.glass-label.accent { color: var(--accent); }
.modalities { display: flex; flex-direction: column; gap: 16px; }
.modality { display: flex; align-items: center; gap: 14px; }
.modality svg { flex: none; }
.modality-name { font-size: 0.9rem; font-weight: 500; color: var(--night-text); }
.modality-note { font-family: var(--mono); font-size: 10px; color: var(--night-muted); margin-top: 2px; }
.chips { display: flex; flex-wrap: wrap; gap: 8px; }
.chip {
  font-size: 0.84rem;
  padding: 7px 15px;
  border: 1px solid rgba(248, 247, 242, 0.28);
  border-radius: 999px;
  color: var(--night-text);
  background: rgba(248, 247, 242, 0.04);
}
.link { display: flex; flex-direction: column; align-items: center; justify-content: space-around; align-self: stretch; padding: 0 8px; }
.link-item { display: flex; flex-direction: column; align-items: center; gap: 8px; }
.link-label { font-family: var(--mono); font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--accent); }
.arrow-v { display: none; }
.flow { stroke: #c04832; stroke-width: 1.3; }
.core {
  align-self: center;
  background: linear-gradient(180deg, rgba(248, 247, 242, 0.08), rgba(248, 247, 242, 0.03));
  border: 1px solid var(--night-line);
  border-radius: 22px;
  padding: 28px 24px;
}
.core-name { font-size: 1.02rem; font-weight: 500; color: var(--accent); text-align: center; }
.core-note {
  font-family: var(--mono);
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--night-text);
  text-align: center;
  margin: 6px 0 22px;
}
.core svg { display: block; width: 100%; height: auto; max-width: 300px; margin: 0 auto; }
.net-rows path { fill: none; stroke: #c04832; stroke-width: 1.1; opacity: 0.35; }
.net-cross path { fill: none; stroke: #9a9aa3; stroke-width: 0.9; opacity: 0.6; }
.node { transform-box: fill-box; transform-origin: center; animation: pulse 3s ease-in-out infinite; }
.node-in { fill: #f8f7f2; }
.node-out { fill: #c04832; }

/* sections */
.section { padding: 96px 0; border-top: 1px solid var(--line); }
.section-title { font-size: clamp(1.7rem, 3vw, 2.5rem); font-weight: 200; letter-spacing: -0.03em; line-height: 1.1; margin-bottom: 40px; }

/* products */
.tiles { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 14px; }
.tiles > .reveal { display: flex; }
.tiles > .reveal > .tile { flex: 1; }
.tile {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 10px;
  min-height: 200px;
  padding: 26px 26px 24px;
  text-align: left;
  font-family: var(--sans);
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 20px;
}
.tile > * { position: relative; }
.tile-live {
  cursor: pointer;
  transition: transform 0.4s var(--ease), border-color 0.25s, box-shadow 0.4s var(--ease);
}
.tile-live::before {
  content: '';
  position: absolute;
  inset: 0;
  opacity: 0;
  transition: opacity 0.3s;
  background: radial-gradient(340px circle at var(--mx, 50%) var(--my, 50%), rgba(192, 72, 50, 0.12), transparent 60%);
}
.tile-live:hover { transform: translateY(-4px); border-color: rgba(192, 72, 50, 0.45); box-shadow: 0 24px 48px -24px rgba(17, 17, 19, 0.28); }
.tile-live:hover::before { opacity: 1; }
.tile-index { font-family: var(--mono); font-size: 12px; font-weight: 500; letter-spacing: 0.12em; color: var(--accent); }
.tile-title { font-size: 1.15rem; font-weight: 500; letter-spacing: -0.01em; color: var(--ink); }
.tile-summary { font-size: 0.86rem; font-weight: 300; line-height: 1.7; color: var(--muted); }
.tile-arrow { margin-top: auto; font-size: 1rem; color: var(--accent); transition: transform 0.35s var(--ease); }
.tile-live:hover .tile-arrow { transform: translateX(6px); }
.tile-idle { background: transparent; border-style: dashed; }
.tile-idle .tile-index { color: var(--faint); }
.tile-idle .tile-title { color: var(--muted); }
.tile-idle .tile-summary { color: var(--faint); }

/* papers */
.paper-list { border-top: 1px solid var(--line); }
.paper {
  display: grid;
  grid-template-columns: 110px minmax(0, 1fr) 24px;
  gap: 24px;
  align-items: start;
  padding: 24px 16px;
  border-bottom: 1px solid var(--line);
  transition: background 0.25s;
}
.paper:hover { background: var(--card); }
.paper-venue { font-family: var(--mono); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: var(--accent); padding-top: 3px; }
.paper-title { display: block; font-size: 0.98rem; font-weight: 400; line-height: 1.5; color: var(--ink); }
.paper-authors { display: block; font-size: 0.78rem; font-weight: 300; color: var(--faint); margin-top: 5px; }
.paper-arrow { color: var(--accent); text-align: right; padding-top: 3px; transition: transform 0.35s var(--ease); }
.paper:hover .paper-arrow { transform: translate(3px, -3px); }

/* cta and footer */
.cta { position: relative; isolation: isolate; overflow: hidden; background: var(--night); border-top: 1px solid var(--night-line); }
.cta-grid { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 48px; align-items: end; padding-top: 88px; padding-bottom: 88px; }
.cta-kicker { font-family: var(--mono); font-size: 14px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; color: var(--accent); margin-bottom: 16px; }
.cta h2 { font-size: clamp(1.7rem, 3vw, 2.6rem); font-weight: 200; letter-spacing: -0.03em; line-height: 1.12; color: var(--night-text); max-width: 26ch; }
.footer { background: var(--night); border-top: 1px solid #26262a; }
.footer-row { display: flex; justify-content: space-between; align-items: center; gap: 20px; padding-top: 24px; padding-bottom: 24px; }
.footer-row span { font-family: var(--mono); font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: #64646e; }

/* dialogs */
.overlay {
  position: fixed;
  inset: 0;
  z-index: 80;
  background: rgba(14, 14, 16, 0.42);
  -webkit-backdrop-filter: blur(8px);
  backdrop-filter: blur(8px);
  animation: fade 0.25s ease both;
}
.overlay-sheet { display: flex; justify-content: flex-end; }
.overlay-modal { z-index: 90; display: flex; align-items: center; justify-content: center; padding: 20px; }
.icon-button {
  width: 36px;
  height: 36px;
  display: grid;
  place-items: center;
  border: none;
  border-radius: 50%;
  background: transparent;
  cursor: pointer;
  font-size: 1.3rem;
  line-height: 1;
  color: var(--muted);
  transition: background 0.2s, color 0.2s;
}
.icon-button:hover { background: rgba(17, 17, 19, 0.07); color: var(--ink); }
.sheet {
  width: min(880px, 100%);
  height: 100%;
  overflow-y: auto;
  overscroll-behavior: contain;
  background: var(--paper);
  border-left: 1px solid var(--line);
  animation: slide 0.4s var(--ease) both;
}
.sheet-head {
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 30px 14px 34px;
  background: rgba(244, 243, 237, 0.86);
  -webkit-backdrop-filter: blur(12px);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--line);
}
.sheet-head span { font-family: var(--mono); font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color: var(--faint); }
.sheet-body { padding: 40px 34px 64px; }
.sheet-product { font-family: var(--mono); font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--accent); margin-bottom: 12px; }
.sheet-title { font-size: 2.2rem; font-weight: 200; letter-spacing: -0.03em; line-height: 1.14; margin-bottom: 14px; }
.sheet-desc { font-size: 0.96rem; font-weight: 300; line-height: 1.8; color: var(--muted); margin-bottom: 16px; }
.sheet-link {
  display: inline-flex;
  gap: 8px;
  align-items: center;
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent);
  padding-bottom: 2px;
  margin-bottom: 36px;
  border-bottom: 1px solid transparent;
  transition: border-color 0.2s;
}
.sheet-link:hover { border-color: var(--accent); }
.figures { display: flex; flex-direction: column; gap: 36px; }
.figure-frame { border: 1px solid var(--line); border-radius: 14px; background: #fdfdfa; overflow: hidden; }
.figure-frame img { display: block; width: 100%; height: auto; }
.figure figcaption { font-size: 0.84rem; font-weight: 300; line-height: 1.75; color: var(--muted); margin-top: 12px; }

.modal {
  position: relative;
  width: 100%;
  max-width: 560px;
  max-height: calc(100vh - 40px);
  overflow-y: auto;
  padding: 40px 40px 36px;
  background: var(--paper);
  border: 1px solid var(--line);
  border-radius: 22px;
  box-shadow: 0 40px 100px -20px rgba(14, 14, 16, 0.38);
  animation: pop 0.32s var(--ease) both;
}
.modal .icon-button { position: absolute; top: 14px; right: 14px; }
.modal h2 { font-size: 1.8rem; font-weight: 200; letter-spacing: -0.025em; margin-bottom: 4px; }
.modal-sub { font-family: var(--mono); font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--faint); margin-bottom: 30px; }
.form { display: flex; flex-direction: column; gap: 16px; }
.form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.field { display: flex; flex-direction: column; gap: 7px; }
.field span { font-family: var(--mono); font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: var(--muted); }
.field input, .field textarea {
  width: 100%;
  padding: 12px 14px;
  font-family: var(--sans);
  font-weight: 300;
  font-size: 0.95rem;
  color: var(--ink);
  background: var(--card);
  border: 1px solid var(--line);
  border-radius: 10px;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.field input:focus, .field textarea:focus { outline: none; border-color: var(--accent); box-shadow: 0 0 0 4px var(--accent-soft); }
.field textarea { resize: vertical; min-height: 110px; }
.submit {
  margin-top: 6px;
  padding: 15px;
  font-family: var(--mono);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--night-text);
  background: var(--ink);
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background 0.2s;
}
.submit:hover:not(:disabled) { background: var(--accent); }
.submit:disabled { opacity: 0.7; cursor: progress; }
.form-error { font-size: 0.84rem; font-weight: 300; color: var(--accent); text-align: center; }
.trap { position: absolute; left: -9999px; width: 1px; height: 1px; opacity: 0; }

/* keyframes */
@keyframes fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes slide { from { transform: translateX(32px); opacity: 0; } to { transform: none; opacity: 1; } }
@keyframes pop { from { transform: translateY(14px) scale(0.98); opacity: 0; } to { transform: none; opacity: 1; } }

@keyframes pulse { 0%, 100% { transform: scale(1); opacity: 0.85; } 50% { transform: scale(1.4); opacity: 1; } }

/* diagram placement, desktop */
@media (min-width: 1001px) {
  .c-in-title { grid-column: 1; grid-row: 1; }
  .c-in { grid-column: 1; grid-row: 2; }
  .c-link-a { grid-column: 2; grid-row: 2; }
  .c-core { grid-column: 3; grid-row: 2; }
  .c-link-b { grid-column: 4; grid-row: 2; }
  .c-out-title { grid-column: 5; grid-row: 1; text-align: right; }
  .c-out { grid-column: 5; grid-row: 2; }
}

@media (max-width: 1000px) {
  .hero-grid { grid-template-columns: 1fr; gap: 40px; }
  .latest { margin-top: 8px; }
  .tiles { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .diagram { grid-template-columns: minmax(0, 1fr); grid-template-rows: none; row-gap: 20px; }
  .link { flex-direction: row; justify-content: center; gap: 56px; padding: 0; }
  .arrow-h { display: none; }
  .arrow-v { display: block; }
  .core { max-width: 420px; width: 100%; justify-self: center; }
}

@media (max-width: 640px) {
  .wrap { padding-left: 20px; padding-right: 20px; }
  .nav { padding: 10px 12px; }
  .nav-inner { padding-left: 16px; gap: 8px; }
  .nav-link { padding: 8px 8px; font-size: 10px; }
  .tiles { grid-template-columns: 1fr; }
  .paper { grid-template-columns: minmax(0, 1fr) 20px; gap: 8px 16px; }
  .paper-venue { grid-column: 1 / -1; }
  .cta-grid { grid-template-columns: 1fr; align-items: start; gap: 32px; }
  .form-row { grid-template-columns: 1fr; }
  .modal { padding: 34px 22px 26px; }
  .sheet-head { padding: 12px 18px 12px 20px; }
  .sheet-body { padding: 28px 20px 48px; }
  .footer-row { flex-direction: column; align-items: flex-start; }
  .model-head { flex-direction: column; gap: 8px; }
}

@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .reveal { opacity: 1; transform: none; transition: none; }
  .site *, .site *::before, .site *::after { animation: none !important; transition-duration: 0.01ms !important; }
}
`;

const PRODUCTS = {
  pertflow: {
    product: 'PertFlow',
    title: 'Multi-Modal Perturbation',
    summary: 'Predicting multi-modal molecular perturbations.',
    description: 'A framework for predicting joint perturbed transcriptome and morphology states from an initial cell state and a drug.',
    url: 'https://www.biorxiv.org/content/10.64898/2026.02.02.703193v1',
    figures: [
      { slot: 'pertflow_main.png', caption: 'Mapping from control RNA-seq and image to treatment RNA-seq and image with drug conditioning. Generated treatment images are compared against real treatment images with drug name and concentration.' },
      { slot: 'pertflow_arch.png', caption: 'RNA-seq and image pass through their respective encoders, then a shared encoder conditioned by the drug encoder; output heads decode perturbed transcriptome and morphology.' },
      { slot: 'pertflow_results.png', caption: 'Generated vs. real treatment for Aortic Smooth Muscle, A549, and Dermal Fibroblast cells.' }
    ]
  },
  pert2mol: {
    product: 'Pert2Mol',
    title: 'Inverse Drug Design',
    summary: 'Multi-modal generative modeling of molecules.',
    description: 'A framework for multi-modal phenotype-to-structure generation — from an observed cellular response back to the molecule that caused it.',
    url: 'https://www.biorxiv.org/content/10.64898/2026.02.02.703189v2',
    figures: [
      { slot: 'pert2mol_main.png', caption: 'Transcriptomic and morphological features are extracted by their respective encoders; a transformer generates the SMILES string of the drug that caused the perturbation.' },
      { slot: 'pert2mol_mols.png', caption: 'Accurate SMILES generation across drugs with different mechanisms of action, benchmarked against a diffusion baseline and RNA-only / image-only variants.' }
    ]
  },
  annotate: {
    product: 'AnnotateAnyCell',
    title: 'Digital Pathology',
    summary: 'Cell-level annotation and analysis framework.',
    description: 'An open-source framework for cell-level annotation and analysis in digital pathology.',
    url: 'https://www.biorxiv.org/content/10.1101/2025.11.02.686114v3',
    figures: [
      { slot: 'annotate_arch.png', caption: 'The complete pipeline, from image pre-processing to the output interface.' },
      { slot: 'annotate_main.png', caption: 'Visualizing and interacting with histopathology samples at cellular resolution; navigate image and embedding space to explore regions of interest and label cells.' },
      { slot: 'annotate_output.png', caption: 'Annotated outputs give labeled cell-level classes and analysis for direct download, surfacing tissue composition and cellular relationships.' }
    ]
  },
  geneflow: {
    product: 'GeneFlow',
    title: 'Cellular Translation',
    summary: 'Translating modalities for cross-domain insights.',
    description: 'A framework mapping transcriptomics onto paired cellular H&E images via rectified flow.',
    url: 'https://arxiv.org/abs/2511.00119',
    figures: [
      { slot: 'geneflow_main.png', caption: 'Generating realistic cellular morphology features from transcriptomic data, visualizing spatially resolved intercellular interactions from expression profiles.' },
      { slot: 'geneflow_arch.png', caption: 'Architecture for mapping transcriptomes to histology images; rectified flow dynamics consistently outperform alternatives.' },
      { slot: 'geneflow_diagnosis.png', caption: 'Diagnostic features — pleomorphic nuclei, keratinizing squamous epithelium, collagenous stroma — enabling consistent interpretation relative to ground truth.' }
    ]
  }
};

const DEVELOPMENT = [
  { title: 'Single-Cell Perturbation', summary: 'Single-cell functional response to perturbations.' },
  { title: '3D Medical Imaging', summary: 'Aligning tomographic medical volumes.' }
];

const LATEST = [
  { label: "GeneFlow — NeurIPS '25", url: 'https://arxiv.org/abs/2511.00119' },
  { label: "PertFlow — ISMB '26", url: 'https://www.biorxiv.org/content/10.64898/2026.02.02.703193v1' },
  { label: "Pert2Mol — ISMB '26", url: 'https://www.biorxiv.org/content/10.64898/2026.02.02.703189v1' }
];

const PAPERS = [
  {
    venue: 'ISMB 2026',
    title: 'Joint Modeling of Transcriptomic and Morphological Phenotypes for Generative Molecular Design',
    authors: 'M Wang, S Verma et al.',
    url: 'https://www.biorxiv.org/content/10.64898/2026.02.02.703193v1'
  },
  {
    venue: 'ISMB 2026',
    title: 'Generating Joint Transcriptomic and Morphological Responses to Drug Perturbations via Rectified Flow',
    authors: 'S Verma, M Wang et al.',
    url: 'https://www.biorxiv.org/content/10.64898/2026.02.02.703189v3'
  },
  {
    venue: 'bioRxiv 2025',
    title: 'AnnotateAnyCell: Open-Source AI Framework for Efficient Annotation in Digital Pathology',
    authors: 'S Verma, A Malusare et al.',
    url: 'https://www.biorxiv.org/content/10.1101/2025.11.02.686114v3'
  },
  {
    venue: 'NeurIPS 2025',
    title: 'GeneFlow: Translation of Single-cell Gene Expression to Histopathological Images via Rectified Flow',
    authors: 'M Wang, S Verma et al.',
    url: 'https://arxiv.org/abs/2511.00119'
  }
];

const MODALITIES = [
  { kind: 'cell', name: 'cell images', note: 'cell morphology' },
  { kind: 'expression', name: 'gene expression', note: 'expression profile' },
  { kind: 'spatial', name: 'spatial transcriptomics', note: 'expression map' }
];

const PERTURBATION_TYPES = ['Drug', 'Genetic', 'Cytokine'];

const ICON_OPACITY = {
  input: {
    expression: [0.8, 0.32, 0.6, 0.42, 0.72, 0.28],
    spatial: [0.85, 0.35, 0.65, 0.5, 0.9, 0.25, 0.6, 0.8, 0.45]
  },
  output: {
    expression: [0.35, 0.8, 0.28, 0.72, 0.4, 0.62],
    spatial: [0.5, 0.85, 0.3, 0.9, 0.45, 0.7, 0.35, 0.6, 0.8]
  }
};

const GRID_ORIGINS = [[1, 6], [9.5, 6], [18, 6], [1, 14.5], [9.5, 14.5], [18, 14.5]];
const DOT_ORIGINS = [[4, 4], [13, 4], [22, 4], [4, 13], [13, 13], [22, 13], [4, 22], [13, 22], [22, 22]];
const NET_ROWS = [12, 36, 60, 84];

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([tabindex="-1"]):not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

function useDialog(onClose) {
  const panelRef = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    const panel = panelRef.current;
    if (!panel) return undefined;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const initial = panel.querySelector('[data-autofocus]') || panel.querySelector(FOCUSABLE);
    if (initial) initial.focus();

    const onKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeRef.current();
        return;
      }
      if (e.key !== 'Tab') return;
      const items = panel.querySelectorAll(FOCUSABLE);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement) previousFocus.focus();
    };
  }, []);

  return panelRef;
}

function Reveal({ as: Tag = 'div', delay = 0, className = '', children }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (!('IntersectionObserver' in window)) {
      setShown(true);
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShown(true);
        observer.disconnect();
      }
    }, { threshold: 0.12 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`reveal ${shown ? 'in' : ''} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </Tag>
  );
}

const trackPointer = (e) => {
  const box = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - box.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - box.top}px`);
};

function ModalityIcon({ kind, side }) {
  const color = side === 'input' ? '#f8f7f2' : '#c04832';

  if (kind === 'cell') {
    const shifted = side === 'output';
    return (
      <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
        <circle cx="13" cy="13" r="10.5" fill="none" stroke="rgba(248,247,242,0.85)" strokeWidth="1.2" />
        <circle cx={shifted ? 15 : 13} cy={shifted ? 14.6 : 13} r="3.4" fill={shifted ? '#c04832' : '#9a9aa3'} />
      </svg>
    );
  }

  const opacities = ICON_OPACITY[side][kind];

  if (kind === 'expression') {
    return (
      <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
        <g fill={color}>
          {GRID_ORIGINS.map(([x, y], i) => (
            <rect key={i} x={x} y={y} width="7" height="7" opacity={opacities[i]} />
          ))}
        </g>
      </svg>
    );
  }

  return (
    <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
      <g fill={color}>
        {DOT_ORIGINS.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="2.6" opacity={opacities[i]} />
        ))}
      </g>
    </svg>
  );
}

function ModalityList({ side }) {
  return (
    <div className="modalities">
      {MODALITIES.map((item) => (
        <div key={item.kind} className="modality">
          <ModalityIcon kind={item.kind} side={side} />
          <div>
            <p className="modality-name">{item.name}</p>
            <p className="modality-note">{item.note}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

function Arrow() {
  return (
    <>
      <svg className="arrow-h" width="72" height="10" viewBox="0 0 72 10" aria-hidden="true">
        <circle cx="2.6" cy="5" r="2.6" fill="#c04832" />
        <line className="flow" x1="6" y1="5" x2="62" y2="5" />
        <path d="M60,1.6 L67,5 L60,8.4" fill="#c04832" />
      </svg>
      <svg className="arrow-v" width="10" height="44" viewBox="0 0 10 44" aria-hidden="true">
        <circle cx="5" cy="2.6" r="2.6" fill="#c04832" />
        <line className="flow" x1="5" y1="6" x2="5" y2="34" />
        <path d="M1.6,32 L5,39 L8.4,32" fill="#c04832" />
      </svg>
    </>
  );
}

function StageLink({ className, labels }) {
  return (
    <div className={`link ${className}`}>
      {labels.map((label) => (
        <div key={label} className="link-item">
          <p className="link-label">{label}</p>
          <Arrow />
        </div>
      ))}
    </div>
  );
}

function CoreCard() {
  return (
    <div className="core c-core">
      <p className="core-name">VirSCell-1</p>
      <p className="core-note">Virtual Cell World Model</p>
      <svg viewBox="0 0 140 96" aria-hidden="true">
        <g className="net-rows">
          {NET_ROWS.map((y) => (
            <path key={y} d={`M22,${y} L118,${y}`} />
          ))}
        </g>
        <g className="net-cross">
          <path d="M22,12 L118,84" />
          <path d="M22,84 L118,12" />
          <path d="M22,36 L118,60" />
          <path d="M22,60 L118,36" />
        </g>
        {NET_ROWS.map((y, i) => (
          <circle key={`in-${y}`} className="node node-in" cx="22" cy={y} r="3" style={{ animationDelay: `${i * 0.35}s` }} />
        ))}
        {NET_ROWS.map((y, i) => (
          <circle key={`out-${y}`} className="node node-out" cx="118" cy={y} r="3" style={{ animationDelay: `${1.1 + i * 0.35}s` }} />
        ))}
      </svg>
    </div>
  );
}

function ModelDiagram() {
  return (
    <Reveal className="diagram">
      <p className="col-title c-in-title">Inputs</p>
      <div className="col-body c-in">
        <div className="glass">
          <p className="glass-label">Initial cell state</p>
          <ModalityList side="input" />
        </div>
        <div className="glass">
          <p className="glass-label">Perturbation type</p>
          <div className="chips">
            {PERTURBATION_TYPES.map((type) => (
              <span key={type} className="chip">{type}</span>
            ))}
          </div>
        </div>
      </div>

      <StageLink className="c-link-a" labels={['Encode', 'Condition']} />
      <CoreCard />
      <StageLink className="c-link-b" labels={['Predict', 'Design']} />

      <p className="col-title c-out-title">Outputs</p>
      <div className="col-body c-out">
        <div className="glass">
          <p className="glass-label accent">Perturbed cell state</p>
          <ModalityList side="output" />
        </div>
        <div className="glass">
          <p className="glass-label accent">Inverse drug design</p>
          <div className="modality">
            <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
              <g transform="translate(13 13) rotate(-45)">
                <rect x="-11" y="-5.5" width="22" height="11" rx="5.5" fill="none" stroke="#c04832" strokeWidth="1.4" />
                <path d="M0,-5.5 L-5.5,-5.5 A5.5,5.5 0 0,0 -5.5,5.5 L0,5.5 Z" fill="#c04832" />
              </g>
            </svg>
            <div>
              <p className="modality-name">candidate drug</p>
              <p className="modality-note">perturbation toward target</p>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function DetailSheet({ detail, onClose }) {
  const panelRef = useDialog(onClose);

  return (
    <div
      className="overlay overlay-sheet"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="sheet" ref={panelRef} role="dialog" aria-modal="true" aria-label={detail.product}>
        <div className="sheet-head">
          <span>Research</span>
          <button type="button" className="icon-button" onClick={onClose} aria-label="Close">×</button>
        </div>
        <div className="sheet-body">
          <p className="sheet-product">{detail.product}</p>
          <h2 className="sheet-title">{detail.title}</h2>
          <p className="sheet-desc">{detail.description}</p>
          <a className="sheet-link" href={detail.url} target="_blank" rel="noopener noreferrer">Read the paper ↗</a>
          <div className="figures">
            {detail.figures.map((fig) => (
              <figure key={fig.slot} className="figure">
                <div className="figure-frame">
                  <img src={`${import.meta.env.BASE_URL}${fig.slot}`} alt={`${detail.product} figure`} loading="lazy" />
                </div>
                <figcaption>{fig.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ContactModal({ onClose }) {
  const [status, setStatus] = useState('');
  const panelRef = useDialog(onClose);
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  const submit = async (e) => {
    e.preventDefault();
    if (status === 'sending' || status === 'success') return;
    const f = new FormData(e.currentTarget);
    if (f.get('website')) {
      onClose();
      return;
    }
    setStatus('sending');
    try {
      const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: 'service_j3yowha',
          template_id: 'template_04fa5oe',
          user_id: 'svCaDQSXgOe7BSIrP',
          template_params: {
            to_email: 'verma198@purdue.edu',
            from_name: f.get('name'),
            from_email: f.get('email'),
            affiliation: f.get('affiliation'),
            message: f.get('message'),
          },
        }),
      });
      if (!res.ok) throw new Error('send failed');
      setStatus('success');
      timer.current = setTimeout(onClose, 1600);
    } catch {
      setStatus('error');
    }
  };

  const submitLabel = status === 'sending' ? 'Sending…' : status === 'success' ? 'Sent' : 'Send message';

  return (
    <div
      className="overlay overlay-modal"
      onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      <div className="modal" ref={panelRef} role="dialog" aria-modal="true" aria-label="Contact us">
        <button type="button" className="icon-button" onClick={onClose} aria-label="Close">×</button>
        <h2>Contact us</h2>
        <p className="modal-sub">Demo · Collaboration · Chat</p>
        <form className="form" onSubmit={submit}>
          <div className="form-row">
            <label className="field">
              <span>Name</span>
              <input name="name" type="text" required data-autofocus />
            </label>
            <label className="field">
              <span>Affiliation</span>
              <input name="affiliation" type="text" required />
            </label>
          </div>
          <label className="field">
            <span>Email</span>
            <input name="email" type="email" required />
          </label>
          <label className="field">
            <span>Message</span>
            <textarea name="message" rows="4" required></textarea>
          </label>
          <input className="trap" name="website" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <button className="submit" type="submit" disabled={status === 'sending' || status === 'success'}>{submitLabel}</button>
          {status === 'error' && (
            <p className="form-error" role="alert">Failed to send. Please try again.</p>
          )}
        </form>
      </div>
    </div>
  );
}

const LENS = { bezel: 24, maxDisplacement: 11 };
const XLINK = 'http://www.w3.org/1999/xlink';
const DARK_SECTIONS = '.model, .cta, .footer';

function buildDisplacementMap(width, height) {
  const { bezel, maxDisplacement } = LENS;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  const image = context.createImageData(width, height);
  const data = image.data;
  const halfWidth = width / 2;
  const radius = height / 2;

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const dx = x + 0.5 - halfWidth;
      const dy = y + 0.5 - radius;
      const qx = Math.abs(dx) - (halfWidth - radius);
      const qy = Math.abs(dy);
      const outside = Math.hypot(Math.max(qx, 0), qy);
      const depth = radius - outside;

      let vx = 0;
      let vy = 0;
      if (depth > 0 && depth < bezel) {
        const falloff = 1 - depth / bezel;
        const magnitude = maxDisplacement * falloff * falloff;
        if (qx > 0) {
          vx = -((Math.sign(dx) * qx) / outside) * magnitude;
          vy = -(dy / outside) * magnitude;
        } else {
          vy = -Math.sign(dy) * magnitude;
        }
      }

      const i = (y * width + x) * 4;
      data[i] = Math.round(127.5 * (1 + vx / maxDisplacement));
      data[i + 1] = Math.round(127.5 * (1 + vy / maxDisplacement));
      data[i + 2] = 128;
      data[i + 3] = 255;
    }
  }

  context.putImageData(image, 0, 0);
  return canvas.toDataURL('image/png');
}

function Navbar({ onContact }) {
  const innerRef = useRef(null);
  const lensRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const inner = innerRef.current;
    const lens = lensRef.current;
    const image = imageRef.current;
    const site = inner.closest('.site');
    if (!site) return undefined;

    const dark = new Set();
    const sections = Array.from(site.querySelectorAll(DARK_SECTIONS));
    let toneObserver = null;

    const observeTone = () => {
      if (toneObserver) toneObserver.disconnect();
      dark.clear();
      const probe = Math.round(inner.getBoundingClientRect().top + inner.offsetHeight / 2);
      const bottom = Math.max(window.innerHeight - probe - 1, 0);
      toneObserver = new IntersectionObserver((entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (isIntersecting) dark.add(target);
          else dark.delete(target);
        });
        inner.dataset.tone = dark.size ? 'dark' : 'light';
      }, { rootMargin: `${-probe}px 0px ${-bottom}px 0px` });
      sections.forEach((node) => toneObserver.observe(node));
    };

    observeTone();
    window.addEventListener('resize', observeTone, { passive: true });

    const refracts =
      /\bChrome\/\d+/.test(navigator.userAgent) &&
      typeof CSS !== 'undefined' &&
      CSS.supports('backdrop-filter', 'url(#refraction-filter)');

    let frame = 0;
    let sizeObserver = null;

    if (refracts && typeof ResizeObserver !== 'undefined') {
      const rebuild = () => {
        frame = 0;
        const width = inner.offsetWidth;
        const height = inner.offsetHeight;
        if (!width || !height) return;
        const map = buildDisplacementMap(width, height);
        image.setAttribute('href', map);
        image.setAttributeNS(XLINK, 'xlink:href', map);
        lens.dataset.refract = 'true';
      };
      sizeObserver = new ResizeObserver(() => {
        if (!frame) frame = requestAnimationFrame(rebuild);
      });
      sizeObserver.observe(inner);
    }

    return () => {
      window.removeEventListener('resize', observeTone);
      if (toneObserver) toneObserver.disconnect();
      if (sizeObserver) sizeObserver.disconnect();
      cancelAnimationFrame(frame);
      delete lens.dataset.refract;
      delete inner.dataset.tone;
    };
  }, []);

  return (
    <header className="nav">
      <svg className="lens-defs" width="0" height="0" aria-hidden="true" focusable="false">
        <filter id="refraction-filter" x="0" y="0" width="1" height="1" colorInterpolationFilters="sRGB">
          <feImage ref={imageRef} preserveAspectRatio="none" result="map" />
          <feDisplacementMap in="SourceGraphic" in2="map" scale={LENS.maxDisplacement * 2} xChannelSelector="R" yChannelSelector="G" />
        </filter>
      </svg>
      <div className="nav-inner" ref={innerRef}>
        <div className="lens" ref={lensRef} aria-hidden="true" />
        <a className="brand" href="#top">baiom labs</a>
        <nav className="nav-links">
          <a className="nav-link" href="#products">Products</a>
          <a className="nav-link" href="#publications">Papers</a>
          <button type="button" className="pill pill-dark" onClick={onContact}>Contact</button>
        </nav>
      </div>
    </header>
  );
}

export default function App({ showDevelopment = true }) {
  const [detailKey, setDetailKey] = useState(null);
  const [contactOpen, setContactOpen] = useState(false);

  const detail = detailKey ? PRODUCTS[detailKey] : null;
  const productEntries = Object.entries(PRODUCTS);

  return (
    <>
      <style>{STYLES}</style>
      <div className="site" id="top">

        <Navbar onContact={() => setContactOpen(true)} />

        <section className="hero">
          <div className="wrap hero-grid">
            <div className="hero-left">
              <Reveal as="p" className="eyebrow">Virtual cell world models</Reveal>
              <Reveal as="h1" delay={80}>
                Predicting cell response, <em>before the experiment.</em>
              </Reveal>
              <Reveal className="latest" delay={200}>
                <p className="latest-title">Latest work</p>
                <div className="latest-list">
                  {LATEST.map((item) => (
                    <a key={item.label} className="latest-link" href={item.url} target="_blank" rel="noopener noreferrer">
                      <span>{item.label}</span>
                      <span className="latest-arrow">↗</span>
                    </a>
                  ))}
                </div>
              </Reveal>
            </div>

            <Reveal className="hero-right" delay={140}>
              <div className="video-frame">
                <video src={`${import.meta.env.BASE_URL}video.mp4`} autoPlay loop muted playsInline />
              </div>
              <p className="hero-copy">
                We develop models on cellular & molecular data to learn the patterns governing perturbation response.
              </p>
            </Reveal>
          </div>
        </section>

        <section className="model">
          <div className="wrap">
            <div className="model-head">
              <p className="model-title">The model</p>
              <p className="model-name">VirSCell-1</p>
            </div>
            <ModelDiagram />
          </div>
        </section>

        <section id="products" className="section">
          <div className="wrap">
            <Reveal as="h2" className="section-title">Biological applications</Reveal>
            <div className="tiles">
              {productEntries.map(([key, item], i) => (
                <Reveal key={key} delay={i * 70}>
                  <button
                    type="button"
                    className="tile tile-live"
                    onClick={() => setDetailKey(key)}
                    onMouseMove={trackPointer}
                  >
                    <span className="tile-index">{String(i + 1).padStart(2, '0')} / {item.product}</span>
                    <span className="tile-title">{item.title}</span>
                    <span className="tile-summary">{item.summary}</span>
                    <span className="tile-arrow">→</span>
                  </button>
                </Reveal>
              ))}
              {showDevelopment && DEVELOPMENT.map((item, i) => (
                <Reveal key={item.title} delay={(productEntries.length + i) * 70}>
                  <div className="tile tile-idle">
                    <span className="tile-index">{String(productEntries.length + i + 1).padStart(2, '0')} / In development</span>
                    <span className="tile-title">{item.title}</span>
                    <span className="tile-summary">{item.summary}</span>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="publications" className="section">
          <div className="wrap">
            <Reveal as="h2" className="section-title">Recent papers</Reveal>
            <div className="paper-list">
              {PAPERS.map((paper, i) => (
                <Reveal key={paper.url} delay={i * 60}>
                  <a className="paper" href={paper.url} target="_blank" rel="noopener noreferrer">
                    <span className="paper-venue">{paper.venue}</span>
                    <span>
                      <span className="paper-title">{paper.title}</span>
                      <span className="paper-authors">{paper.authors}</span>
                    </span>
                    <span className="paper-arrow">↗</span>
                  </a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="cta">
          <div className="wrap cta-grid">
            <Reveal>
              <p className="cta-kicker">Get in touch</p>
              <h2>Demo, collaboration, or a conversation about virtual cells.</h2>
            </Reveal>
            <Reveal delay={120}>
              <button type="button" className="pill pill-light" onClick={() => setContactOpen(true)}>Contact us</button>
            </Reveal>
          </div>
        </section>

        <footer className="footer">
          <div className="wrap footer-row">
            <span>© 2026 baiom labs</span>
            <span>Virtual cell world models</span>
          </div>
        </footer>

        {detail && <DetailSheet key={detailKey} detail={detail} onClose={() => setDetailKey(null)} />}
        {contactOpen && <ContactModal onClose={() => setContactOpen(false)} />}
      </div>
    </>
  );
}