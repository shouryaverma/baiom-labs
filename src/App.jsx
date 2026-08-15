import React, { useState } from 'react';
import './index.css';

// Parse a CSS text string into a React style object.
const styleCache = {};
const s = (css) => {
  if (styleCache[css]) return styleCache[css];
  const o = {};
  css.split(';').forEach((rule) => {
    const i = rule.indexOf(':');
    if (i < 0) return;
    const k = rule.slice(0, i).trim().replace(/-([a-z])/g, (m, c) => c.toUpperCase());
    if (k) o[k] = rule.slice(i + 1).trim();
  });
  styleCache[css] = o;
  return o;
};

const PRODUCTS = {
  pertflow: {
    product: 'PertFlow',
    title: 'Multi-Modal Perturbation',
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
    description: 'A framework mapping transcriptomics onto paired cellular H&E images via rectified flow.',
    url: 'https://arxiv.org/abs/2511.00119',
    figures: [
      { slot: 'geneflow_main.png', caption: 'Generating realistic cellular morphology features from transcriptomic data, visualizing spatially resolved intercellular interactions from expression profiles.' },
      { slot: 'geneflow_arch.png', caption: 'Architecture for mapping transcriptomes to histology images; rectified flow dynamics consistently outperform alternatives.' },
      { slot: 'geneflow_diagnosis.png', caption: 'Diagnostic features — pleomorphic nuclei, keratinizing squamous epithelium, collagenous stroma — enabling consistent interpretation relative to ground truth.' }
    ]
  }
};

export default function App({ showDevelopment = true }) {
  const [detailKey, setDetailKey] = useState(null);
  const [contactOpen, setContactOpen] = useState(false);
  const [status, setStatus] = useState('');

  const detail = detailKey ? PRODUCTS[detailKey] : null;

  const setDetail = (key) => {
    setDetailKey(key);
    document.body.style.overflow = key ? 'hidden' : '';
  };
  const closeDetail = () => setDetail(null);
  const maybeCloseDetail = (e) => { if (e.target === e.currentTarget) closeDetail(); };
  const open = {
    pertflow: () => setDetail('pertflow'),
    pert2mol: () => setDetail('pert2mol'),
    annotate: () => setDetail('annotate'),
    geneflow: () => setDetail('geneflow'),
  };

  const openContact = () => setContactOpen(true);
  const closeContact = () => { setContactOpen(false); setStatus(''); };
  const maybeCloseContact = (e) => { if (e.target === e.currentTarget) closeContact(); };

  const submit = async (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
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
      setTimeout(closeContact, 1600);
    } catch {
      setStatus('error');
    }
  };

  const submitLabel = status === 'sending' ? 'Sending…' : status === 'success' ? 'Sent' : 'Send message';

  return (
    <>
      <div style={s("background: #efeee7; min-height: 100vh; font-family: Urbanist, sans-serif; color: #111113; -webkit-font-smoothing: antialiased;")}>
      
        <nav style={s("position: sticky; top: 0; z-index: 40; background: rgba(239,238,231,0.82); backdrop-filter: blur(14px); border-bottom: 1px solid #e2ded5;")}>
          <div style={s("max-width: 1240px; margin: 0 auto; padding: 16px 40px; display: flex; align-items: center; justify-content: space-between; gap: 24px;")}>
            <div style={s("display: flex; align-items: baseline; gap: 12px;")}>
              <span style={s("font-size: 17px; font-weight: 500; letter-spacing: -0.01em;")}>baiom labs</span>
            </div>
            <div style={s("display: flex; align-items: center; gap: 28px;")}>
              <a className="x1" href="#products" style={s("font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #64646e; text-decoration: none;")}>Products</a>
              <a className="x1" href="#publications" style={s("font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #64646e; text-decoration: none;")}>Papers</a>
              <button className="x2" onClick={openContact} style={s("font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; color: #faf9f5; background: #111113; border: none; border-radius: 999px; padding: 9px 18px; cursor: pointer; transition: background 0.18s;")}>Contact</button>
            </div>
          </div>
        </nav>
      
        <section style={s("max-width: 1240px; margin: 0 auto; padding: 64px 40px 56px; animation: fu 0.7s cubic-bezier(0.16,1,0.3,1) both;")}>
          <div style={s("display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr); gap: 56px; align-items: stretch;")}>
            
            {/* Left Column: Eyebrow + Title + Latest Work */}
              <div style={s("display: flex; flex-direction: column; height: 100%;")}>
                <p style={s("font-family: 'IBM Plex Mono', monospace; font-size: 16px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; color: #c04832; margin: 0 0 20px")}>
                  Virtual cell world models
                </p>

                <h1 style={s("font-size: clamp(1.8rem, 4vw, 3.2rem); font-weight: 200; letter-spacing: -0.035em; line-height: 1.08; margin: 0 0 36px; text-wrap: balance;")}>
                  Predicting cell response, before the experiment.
                </h1>

                <div style={s("display: flex; flex-direction: column; max-width: 480px; margin-top: auto;")}>
                <p style={s("font-family: 'IBM Plex Mono', monospace; font-size: 13px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; color: #c04832; margin: 0 0 6px")}>Latest work</p>
                <a className="x3" href="https://arxiv.org/abs/2511.00119" target="_blank" rel="noopener noreferrer" style={s("display: flex; justify-content: space-between; gap: 20px; align-items: baseline; font-size: 0.98rem; font-weight: 300; color: #111113; text-decoration: none; padding: 12px 0; border-top: 1px solid #e2ded5")}><span>GeneFlow — NeurIPS '25</span><span style={s("color: #a3a29b;")}>↗</span></a>
                <a className="x3" href="https://www.biorxiv.org/content/10.64898/2026.02.02.703193v1" target="_blank" rel="noopener noreferrer" style={s("display: flex; justify-content: space-between; gap: 20px; align-items: baseline; font-size: 0.98rem; font-weight: 300; color: #111113; text-decoration: none; padding: 12px 0; border-top: 1px solid #e2ded5")}><span>PertFlow — ISMB '26</span><span style={s("color: #a3a29b;")}>↗</span></a>
                <a className="x3" href="https://www.biorxiv.org/content/10.64898/2026.02.02.703189v1" target="_blank" rel="noopener noreferrer" style={s("display: flex; justify-content: space-between; gap: 20px; align-items: baseline; font-size: 0.98rem; font-weight: 300; color: #111113; text-decoration: none; padding: 12px 0; border-top: 1px solid #e2ded5; border-bottom: 1px solid #e2ded5")}><span>Pert2Mol — ISMB '26</span><span style={s("color: #a3a29b;")}>↗</span></a>
              </div>
            </div>

            {/* Right Column: Video + Description */}
            <div style={s("display: flex; flex-direction: column; height: 100%;")}>
              <div style={s("border: 1px solid #e2ded5; border-radius: 14px; overflow: hidden; background: #111113; box-shadow: 0 10px 30px rgba(17,17,19,0.05);")}>
                <video 
                  src={`${import.meta.env.BASE_URL}video.mp4`} 
                  autoPlay 
                  loop 
                  muted 
                  playsInline 
                  style={s("width: 100%; height: auto; display: block; object-fit: cover;")} 
                />
              </div>

              <p style={s("font-size: 1.2rem; font-weight: 300; line-height: 1.7; color: #64646e; margin: auto 0 0 0;")}>
                We develop models on cellular & molecular data to learn the patterns governing perturbation response.
              </p>
            </div>

          </div>
        </section>
      
        <section style={s("border-top: 1px solid #e2ded5; border-bottom: 1px solid #e2ded5; background: #111113;")}>
          <div style={s("max-width: 1240px; margin: 0 auto; padding: 56px 40px 64px;")}>
            <div style={s("display: flex; align-items: baseline; justify-content: space-between; gap: 24px; margin-bottom: 40px;")}>
              <p style={s("font-family: 'IBM Plex Mono', monospace; font-size: 18px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; color: #f8f7f2; margin: 0")}>The model</p>
              <p style={s("font-family: 'IBM Plex Mono', monospace; font-size: 18px; font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; color: #c04832; margin: 0")}>VirSCell-1</p>
            </div>
      
            <div style={s("display: grid; grid-template-columns: minmax(0,1fr) 96px minmax(0,0.72fr) 96px minmax(0,1fr); align-items: center; gap: 0;")}>
      
              <div style={s("display: flex; flex-direction: column; gap: 12px;")}>
                <p style={s("font-family: 'IBM Plex Mono', monospace; font-size: 14px; letter-spacing: 0.16em; text-transform: uppercase; color: #f8f7f2; margin: 0 0 2px")}>Inputs</p>
                <div style={s("background: #efeee7; border: 1px solid #e2ded5; border-radius: 14px; padding: 20px 22px;")}>
                  <p style={s("font-family: 'IBM Plex Mono', monospace; font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; color: #64646e; margin: 0 0 18px")}>Initial cell state</p>
                  <div style={s("display: flex; flex-direction: column; gap: 16px;")}>
                    <div style={s("display: flex; align-items: center; gap: 14px;")}>
                      <svg width="26" height="26" viewBox="0 0 26 26" style={s("flex: none;")}><circle cx="13" cy="13" r="10.5" fill="none" stroke="#111113" strokeWidth="1.2"></circle><circle cx="13" cy="13" r="3.4" fill="#64646e"></circle></svg>
                      <div><p style={s("font-size: 0.9rem; font-weight: 500; margin: 0;")}>cell images</p><p style={s("font-family: 'IBM Plex Mono', monospace; font-size: 10px; color: #a3a29b; margin: 2px 0 0;")}>cell morphology</p></div>
                    </div>
                    <div style={s("display: flex; align-items: center; gap: 14px;")}>
                      <svg width="26" height="26" viewBox="0 0 26 26" style={s("flex: none;")}><g fill="#111113"><rect x="1" y="6" width="7" height="7" opacity="0.8"></rect><rect x="9.5" y="6" width="7" height="7" opacity="0.32"></rect><rect x="18" y="6" width="7" height="7" opacity="0.6"></rect><rect x="1" y="14.5" width="7" height="7" opacity="0.42"></rect><rect x="9.5" y="14.5" width="7" height="7" opacity="0.72"></rect><rect x="18" y="14.5" width="7" height="7" opacity="0.28"></rect></g></svg>
                      <div><p style={s("font-size: 0.9rem; font-weight: 500; margin: 0;")}>gene expression</p><p style={s("font-family: 'IBM Plex Mono', monospace; font-size: 10px; color: #a3a29b; margin: 2px 0 0;")}>expression profile</p></div>
                    </div>
                    <div style={s("display: flex; align-items: center; gap: 14px;")}>
                      <svg width="26" height="26" viewBox="0 0 26 26" style={s("flex: none;")}><g fill="#111113"><circle cx="4" cy="4" r="2.6" opacity="0.85"></circle><circle cx="13" cy="4" r="2.6" opacity="0.35"></circle><circle cx="22" cy="4" r="2.6" opacity="0.65"></circle><circle cx="4" cy="13" r="2.6" opacity="0.5"></circle><circle cx="13" cy="13" r="2.6" opacity="0.9"></circle><circle cx="22" cy="13" r="2.6" opacity="0.25"></circle><circle cx="4" cy="22" r="2.6" opacity="0.6"></circle><circle cx="13" cy="22" r="2.6" opacity="0.8"></circle><circle cx="22" cy="22" r="2.6" opacity="0.45"></circle></g></svg>
                      <div><p style={s("font-size: 0.9rem; font-weight: 500; margin: 0;")}>spatial transcriptomics</p><p style={s("font-family: 'IBM Plex Mono', monospace; font-size: 10px; color: #a3a29b; margin: 2px 0 0;")}>expression map</p></div>
                    </div>
                  </div>
                </div>
                <div style={s("background: #efeee7; border: 1px solid #e2ded5; border-radius: 14px; padding: 20px 22px;")}>
                  <p style={s("font-family: 'IBM Plex Mono', monospace; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: #64646e; margin: 0 0 14px;")}>Perturbation type</p>
                  <div style={s("display: flex; flex-wrap: wrap; gap: 8px;")}>
                    <span style={s("font-size: 0.84rem; font-weight: 400; padding: 7px 15px; border: 1.3px solid #111113; border-radius: 999px; background: #f4f3ed;")}>Drug</span>
                    <span style={s("font-size: 0.84rem; font-weight: 400; padding: 7px 15px; border: 1.3px solid #111113; border-radius: 999px; background: #f4f3ed;")}>Genetic</span>
                    <span style={s("font-size: 0.84rem; font-weight: 400; padding: 7px 15px; border: 1.3px solid #111113; border-radius: 999px; background: #f4f3ed;")}>Cytokine</span>
                  </div>
                </div>
              </div>
      
              <div style={s("display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 120px; padding: 80px 8px 0;")}>
                <div style={s("display: flex; flex-direction: column; align-items: center; gap: 6px;")}>
                  <p style={s("font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: #c04832; margin: 0;")}>Encode</p>
                  <svg width="80" height="10" viewBox="0 0 80 10" style={s("overflow: visible;")}><path d="M0,5 L70,5" stroke="#c04832" strokeWidth="1.3"></path><path d="M68,1.6 L74,5 L68,8.4" fill="#c04832"></path><circle cx="0" cy="5" r="2.6" fill="#c04832"></circle></svg>
                </div>
                <div style={s("display: flex; flex-direction: column; align-items: center; gap: 6px;")}>
                  <p style={s("font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: #c04832; margin: 0;")}>Condition</p>
                  <svg width="80" height="10" viewBox="0 0 80 10" style={s("overflow: visible;")}><path d="M0,5 L70,5" stroke="#c04832" strokeWidth="1.3"></path><path d="M68,1.6 L74,5 L68,8.4" fill="#c04832"></path><circle cx="0" cy="5" r="2.6" fill="#c04832"></circle></svg>
                </div>
              </div>
      
              <div style={s("background: #efeee7; border: 1px solid #d4cfc3; border-radius: 18px; padding: 26px 22px; margin-top: 80px; box-shadow: 0 14px 44px rgba(17,17,19,0.06);")}>
                <p style={s("font-size: 1.02rem; font-weight: 500; color: #c04832; text-align: center; margin: 0;")}>VirSCell-1</p>
                <p style={s("font-family: 'IBM Plex Mono', monospace; font-size: 10px; letter-spacing: 0.12em; text-transform: uppercase; color: #111113; text-align: center; margin: 6px 0 22px;")}>Virtual Cell World Model</p>
                <svg viewBox="0 0 140 96" width="100%" style={s("display: block; height: auto;")}>
                  <g stroke="#c04832" strokeWidth="1.1" opacity="0.3"><path d="M22,12 L118,12"></path><path d="M22,36 L118,36"></path><path d="M22,60 L118,60"></path><path d="M22,84 L118,84"></path></g>
                  <g stroke="#a3a29b" strokeWidth="0.9" opacity="0.5"><path d="M22,12 L118,84"></path><path d="M22,84 L118,12"></path><path d="M22,36 L118,60"></path><path d="M22,60 L118,36"></path></g>
                  <g fill="#111113"><circle cx="22" cy="12" r="3"></circle><circle cx="22" cy="36" r="3"></circle><circle cx="22" cy="60" r="3"></circle><circle cx="22" cy="84" r="3"></circle><circle cx="118" cy="12" r="3"></circle><circle cx="118" cy="36" r="3"></circle><circle cx="118" cy="60" r="3"></circle><circle cx="118" cy="84" r="3"></circle></g>
                </svg>
              </div>
      
              <div style={s("display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 120px; padding: 80px 8px 0;")}>
                <div style={s("display: flex; flex-direction: column; align-items: center; gap: 6px;")}>
                  <p style={s("font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: #c04832; margin: 0;")}>Predict</p>
                  <svg width="80" height="10" viewBox="0 0 80 10" style={s("overflow: visible;")}><path d="M0,5 L70,5" stroke="#c04832" strokeWidth="1.3"></path><path d="M68,1.6 L74,5 L68,8.4" fill="#c04832"></path><circle cx="0" cy="5" r="2.6" fill="#c04832"></circle></svg>
                </div>
                <div style={s("display: flex; flex-direction: column; align-items: center; gap: 6px;")}>
                  <p style={s("font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase; color: #c04832; margin: 0;")}>Design</p>
                  <svg width="80" height="10" viewBox="0 0 80 10" style={s("overflow: visible;")}><path d="M0,5 L70,5" stroke="#c04832" strokeWidth="1.3"></path><path d="M68,1.6 L74,5 L68,8.4" fill="#c04832"></path><circle cx="0" cy="5" r="2.6" fill="#c04832"></circle></svg>
                </div>
              </div>
      
              <div style={s("display: flex; flex-direction: column; gap: 12px;")}>
                <p style={s("font-family: 'IBM Plex Mono', monospace; font-size: 14px; letter-spacing: 0.16em; text-transform: uppercase; color: #f8f7f2; margin: 0 0 2px; text-align: right")}>Outputs</p>
                <div style={s("background: #efeee7; border: 1px solid #e2ded5; border-radius: 14px; padding: 20px 22px;")}>
                  <p style={s("font-family: 'IBM Plex Mono', monospace; font-size: 12px; letter-spacing: 0.14em; text-transform: uppercase; color: #c04832; margin: 0 0 18px")}>Perturbed cell state</p>
                  <div style={s("display: flex; flex-direction: column; gap: 16px;")}>
                    <div style={s("display: flex; align-items: center; gap: 14px;")}>
                      <svg width="26" height="26" viewBox="0 0 26 26" style={s("flex: none;")}><circle cx="13" cy="13" r="10.5" fill="none" stroke="#111113" strokeWidth="1.2"></circle><circle cx="15" cy="14.6" r="3.4" fill="#c04832"></circle></svg>
                      <div><p style={s("font-size: 0.9rem; font-weight: 500; margin: 0;")}>cell images</p><p style={s("font-family: 'IBM Plex Mono', monospace; font-size: 10px; color: #a3a29b; margin: 2px 0 0;")}>cell morphology</p></div>
                    </div>
                    <div style={s("display: flex; align-items: center; gap: 14px;")}>
                      <svg width="26" height="26" viewBox="0 0 26 26" style={s("flex: none;")}><g fill="#c04832"><rect x="1" y="6" width="7" height="7" opacity="0.35"></rect><rect x="9.5" y="6" width="7" height="7" opacity="0.8"></rect><rect x="18" y="6" width="7" height="7" opacity="0.28"></rect><rect x="1" y="14.5" width="7" height="7" opacity="0.72"></rect><rect x="9.5" y="14.5" width="7" height="7" opacity="0.4"></rect><rect x="18" y="14.5" width="7" height="7" opacity="0.62"></rect></g></svg>
                      <div><p style={s("font-size: 0.9rem; font-weight: 500; margin: 0;")}>gene expression</p><p style={s("font-family: 'IBM Plex Mono', monospace; font-size: 10px; color: #a3a29b; margin: 2px 0 0;")}>expression profile</p></div>
                    </div>
                    <div style={s("display: flex; align-items: center; gap: 14px;")}>
                      <svg width="26" height="26" viewBox="0 0 26 26" style={s("flex: none;")}><g fill="#c04832"><circle cx="4" cy="4" r="2.6" opacity="0.5"></circle><circle cx="13" cy="4" r="2.6" opacity="0.85"></circle><circle cx="22" cy="4" r="2.6" opacity="0.3"></circle><circle cx="4" cy="13" r="2.6" opacity="0.9"></circle><circle cx="13" cy="13" r="2.6" opacity="0.45"></circle><circle cx="22" cy="13" r="2.6" opacity="0.7"></circle><circle cx="4" cy="22" r="2.6" opacity="0.35"></circle><circle cx="13" cy="22" r="2.6" opacity="0.6"></circle><circle cx="22" cy="22" r="2.6" opacity="0.8"></circle></g></svg>
                      <div><p style={s("font-size: 0.9rem; font-weight: 500; margin: 0;")}>spatial transcriptomics</p><p style={s("font-family: 'IBM Plex Mono', monospace; font-size: 10px; color: #a3a29b; margin: 2px 0 0;")}>expression map</p></div>
                    </div>
                  </div>
                </div>
                <div style={s("background: #efeee7; border: 1px solid #e2ded5; border-radius: 14px; padding: 20px 22px;")}>
                  <p style={s("font-family: 'IBM Plex Mono', monospace; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: #c04832; margin: 0 0 14px;")}>Inverse drug design</p>
                  <div style={s("display: flex; align-items: center; gap: 14px;")}>
                    <svg width="26" height="26" viewBox="0 0 26 26" style={s("flex: none;")}><g transform="translate(13 13) rotate(-45)"><rect x="-11" y="-5.5" width="22" height="11" rx="5.5" fill="none" stroke="#c04832" strokeWidth="1.4"></rect><path d="M0,-5.5 L-5.5,-5.5 A5.5,5.5 0 0,0 -5.5,5.5 L0,5.5 Z" fill="#c04832"></path></g></svg>
                    <div><p style={s("font-size: 0.9rem; font-weight: 500; margin: 0;")}>candidate drug</p><p style={s("font-family: 'IBM Plex Mono', monospace; font-size: 10px; color: #a3a29b; margin: 2px 0 0;")}>perturbation toward target</p></div>
                  </div>
                </div>
              </div>
      
            </div>
          </div>
        </section>
      
        <section id="products" style={s("border-top: 1px solid #e2ded5;")}>
          <div style={s("max-width: 1240px; margin: 0 auto; padding: 88px 40px;")}>
            <div>
                <h2 style={s("font-size: clamp(1.7rem, 3vw, 2.5rem); font-weight: 200; letter-spacing: -0.03em; line-height: 1.1; margin: 0 0 36px;")}>Biological applications</h2>
                <div style={s("display: grid; grid-template-columns: repeat(3, minmax(0,1fr)); gap: 1px; background: #e2ded5; border: 1px solid #e2ded5; border-radius: 14px; overflow: hidden;")}>
                  <button className="x4" onClick={open.pertflow} style={s("text-align: left; background: #faf9f5; border: none; cursor: pointer; padding: 26px 24px 28px; display: flex; flex-direction: column; gap: 8px; min-height: 148px; font-family: Urbanist, sans-serif; transition: background 0.2s;")}>
                    <span style={s("font-family: 'IBM Plex Mono', monospace; font-size: 12px; font-weight: 500; letter-spacing: 0.12em; color: #c04832;")}>01 / PertFlow</span>
                    <span style={s("font-size: 1.02rem; font-weight: 500; letter-spacing: -0.01em; color: #111113;")}>Multi-Modal Perturbation</span>
                    <span style={s("font-size: 0.82rem; font-weight: 300; line-height: 1.7; color: #64646e;")}>Predicting multi-modal molecular perturbations.</span>
                    <span style={s("margin-top: auto; font-size: 0.82rem; color: #c04832;")}>→</span>
                  </button>
                  <button className="x4" onClick={open.pert2mol} style={s("text-align: left; background: #faf9f5; border: none; cursor: pointer; padding: 26px 24px 28px; display: flex; flex-direction: column; gap: 8px; min-height: 148px; font-family: Urbanist, sans-serif; transition: background 0.2s;")}>
                    <span style={s("font-family: 'IBM Plex Mono', monospace; font-size: 12px; font-weight: 500; letter-spacing: 0.12em; color: #c04832;")}>02 / Pert2Mol</span>
                    <span style={s("font-size: 1.02rem; font-weight: 500; letter-spacing: -0.01em; color: #111113;")}>Inverse Drug Design</span>
                    <span style={s("font-size: 0.82rem; font-weight: 300; line-height: 1.7; color: #64646e;")}>Multi-modal generative modeling of molecules.</span>
                    <span style={s("margin-top: auto; font-size: 0.82rem; color: #c04832;")}>→</span>
                  </button>
                  <button className="x4" onClick={open.annotate} style={s("text-align: left; background: #faf9f5; border: none; cursor: pointer; padding: 26px 24px 28px; display: flex; flex-direction: column; gap: 8px; min-height: 148px; font-family: Urbanist, sans-serif; transition: background 0.2s;")}>
                    <span style={s("font-family: 'IBM Plex Mono', monospace; font-size: 12px; font-weight: 500; letter-spacing: 0.12em; color: #c04832;")}>03 / AnnotateAnyCell</span>
                    <span style={s("font-size: 1.02rem; font-weight: 500; letter-spacing: -0.01em; color: #111113;")}>Digital Pathology</span>
                    <span style={s("font-size: 0.82rem; font-weight: 300; line-height: 1.7; color: #64646e;")}>Cell-level annotation and analysis framework.</span>
                    <span style={s("margin-top: auto; font-size: 0.82rem; color: #c04832;")}>→</span>
                  </button>
                  <button className="x4" onClick={open.geneflow} style={s("text-align: left; background: #faf9f5; border: none; cursor: pointer; padding: 26px 24px 28px; display: flex; flex-direction: column; gap: 8px; min-height: 148px; font-family: Urbanist, sans-serif; transition: background 0.2s;")}>
                    <span style={s("font-family: 'IBM Plex Mono', monospace; font-size: 12px; font-weight: 500; letter-spacing: 0.12em; color: #c04832;")}>04 / GeneFlow</span>
                    <span style={s("font-size: 1.02rem; font-weight: 500; letter-spacing: -0.01em; color: #111113;")}>Cellular Translation</span>
                    <span style={s("font-size: 0.82rem; font-weight: 300; line-height: 1.7; color: #64646e;")}>Translating modalities for cross-domain insights.</span>
                    <span style={s("margin-top: auto; font-size: 0.82rem; color: #c04832;")}>→</span>
                  </button>
                  {showDevelopment && (<>
                    <div style={s("background: #f4f3ed; padding: 26px 24px 28px; display: flex; flex-direction: column; gap: 8px; min-height: 148px;")}>
                      <span style={s("font-family: 'IBM Plex Mono', monospace; font-size: 12px; font-weight: 500; letter-spacing: 0.12em; color: #a3a29b;")}>05 / In development</span>
                      <span style={s("font-size: 1.02rem; font-weight: 500; letter-spacing: -0.01em; color: #64646e;")}>Single-Cell Perturbation</span>
                      <span style={s("font-size: 0.82rem; font-weight: 300; line-height: 1.7; color: #a3a29b;")}>Single-cell functional response to perturbations.</span>
                    </div>
                    <div style={s("background: #f4f3ed; padding: 26px 24px 28px; display: flex; flex-direction: column; gap: 8px; min-height: 148px;")}>
                      <span style={s("font-family: 'IBM Plex Mono', monospace; font-size: 12px; font-weight: 500; letter-spacing: 0.12em; color: #a3a29b;")}>06 / In development</span>
                      <span style={s("font-size: 1.02rem; font-weight: 500; letter-spacing: -0.01em; color: #64646e;")}>3D Medical Imaging</span>
                      <span style={s("font-size: 0.82rem; font-weight: 300; line-height: 1.7; color: #a3a29b;")}>Aligning tomographic medical volumes.</span>
                    </div>
                  </>)}
                </div>
            </div>
          </div>
        </section>
      
        <section id="publications" style={s("border-top: 1px solid #e2ded5;")}>
          <div style={s("max-width: 1240px; margin: 0 auto; padding: 88px 40px;")}>
            <div>
              <h2 style={s("font-size: clamp(1.7rem, 3vw, 2.5rem); font-weight: 200; letter-spacing: -0.03em; line-height: 1.1; margin: 0 0 36px;")}>Recent papers</h2>
              <div style={s("display: flex; flex-direction: column;")}>
                <a className="x5" href="https://www.biorxiv.org/content/10.64898/2026.02.02.703193v1" target="_blank" rel="noopener noreferrer" style={s("display: grid; grid-template-columns: 96px minmax(0,1fr) 24px; gap: 24px; align-items: start; padding: 22px 0; border-top: 1px solid #e2ded5; text-decoration: none;")}>
                  <span style={s("font-family: 'IBM Plex Mono', monospace; font-size: 11px; font-weight: 400; letter-spacing: 0.1em; text-transform: uppercase; color: #c04832; padding-top: 3px;")}>ISMB 2026</span>
                  <span><span style={s("display: block; font-size: 0.94rem; font-weight: 400; line-height: 1.5; color: #111113;")}>Joint Modeling of Transcriptomic and Morphological Phenotypes for Generative Molecular Design</span><span style={s("display: block; font-size: 0.78rem; font-weight: 300; color: #a3a29b; margin-top: 5px;")}>M Wang, S Verma et al.</span></span>
                  <span style={s("color: #c04832; text-align: right; padding-top: 3px;")}>↗</span>
                </a>
                <a className="x5" href="https://www.biorxiv.org/content/10.64898/2026.02.02.703189v3" target="_blank" rel="noopener noreferrer" style={s("display: grid; grid-template-columns: 96px minmax(0,1fr) 24px; gap: 24px; align-items: start; padding: 22px 0; border-top: 1px solid #e2ded5; text-decoration: none;")}>
                  <span style={s("font-family: 'IBM Plex Mono', monospace; font-size: 11px; font-weight: 400; letter-spacing: 0.1em; text-transform: uppercase; color: #c04832; padding-top: 3px;")}>ISMB 2026</span>
                  <span><span style={s("display: block; font-size: 0.94rem; font-weight: 400; line-height: 1.5; color: #111113;")}>Generating Joint Transcriptomic and Morphological Responses to Drug Perturbations via Rectified Flow</span><span style={s("display: block; font-size: 0.78rem; font-weight: 300; color: #a3a29b; margin-top: 5px;")}>S Verma, M Wang et al.</span></span>
                  <span style={s("color: #c04832; text-align: right; padding-top: 3px;")}>↗</span>
                </a>
                <a className="x5" href="https://www.biorxiv.org/content/10.1101/2025.11.02.686114v3" target="_blank" rel="noopener noreferrer" style={s("display: grid; grid-template-columns: 96px minmax(0,1fr) 24px; gap: 24px; align-items: start; padding: 22px 0; border-top: 1px solid #e2ded5; text-decoration: none;")}>
                  <span style={s("font-family: 'IBM Plex Mono', monospace; font-size: 11px; font-weight: 400; letter-spacing: 0.1em; text-transform: uppercase; color: #c04832; padding-top: 3px;")}>bioRxiv 2025</span>
                  <span><span style={s("display: block; font-size: 0.94rem; font-weight: 400; line-height: 1.5; color: #111113;")}>AnnotateAnyCell: Open-Source AI Framework for Efficient Annotation in Digital Pathology</span><span style={s("display: block; font-size: 0.78rem; font-weight: 300; color: #a3a29b; margin-top: 5px;")}>S Verma, A Malusare et al.</span></span>
                  <span style={s("color: #c04832; text-align: right; padding-top: 3px;")}>↗</span>
                </a>
                <a className="x5" href="https://arxiv.org/abs/2511.00119" target="_blank" rel="noopener noreferrer" style={s("display: grid; grid-template-columns: 96px minmax(0,1fr) 24px; gap: 24px; align-items: start; padding: 22px 0; border-top: 1px solid #e2ded5; border-bottom: 1px solid #e2ded5; text-decoration: none;")}>
                  <span style={s("font-family: 'IBM Plex Mono', monospace; font-size: 11px; font-weight: 400; letter-spacing: 0.1em; text-transform: uppercase; color: #c04832; padding-top: 3px;")}>NeurIPS 2025</span>
                  <span><span style={s("display: block; font-size: 0.94rem; font-weight: 400; line-height: 1.5; color: #111113;")}>GeneFlow: Translation of Single-cell Gene Expression to Histopathological Images via Rectified Flow</span><span style={s("display: block; font-size: 0.78rem; font-weight: 300; color: #a3a29b; margin-top: 5px;")}>M Wang, S Verma et al.</span></span>
                  <span style={s("color: #c04832; text-align: right; padding-top: 3px;")}>↗</span>
                </a>
              </div>
            </div>
          </div>
        </section>
      
        <section style={s("border-top: 1px solid #e2ded5; background: #111113;")}>
          <div style={s("max-width: 1240px; margin: 0 auto; padding: 76px 40px; display: grid; grid-template-columns: minmax(0,1fr) auto; gap: 48px; align-items: end;")}>
            <div>
              <p style={s("font-family: 'IBM Plex Mono', monospace; font-size: 14px;  font-weight: 500; letter-spacing: 0.16em; text-transform: uppercase; color: #c04832; margin: 0 0 16px;")}>Get in touch</p>
              <h2 style={s("font-size: clamp(1.7rem, 3vw, 2.4rem); font-weight: 200; letter-spacing: -0.03em; line-height: 1.12; color: #f8f7f2; margin: 0; max-width: 26ch;")}>Demo, collaboration, or a conversation about virtual cells.</h2>
            </div>
            <button className="x6" onClick={openContact} style={s("font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: #111113; background: #f8f7f2; border: none; border-radius: 999px; padding: 15px 30px; cursor: pointer; white-space: nowrap; transition: background 0.18s;")}>Contact us</button>
          </div>
        </section>
      
        <footer style={s("background: #111113; border-top: 1px solid #26262a;")}>
          <div style={s("max-width: 1240px; margin: 0 auto; padding: 24px 40px; display: flex; justify-content: space-between; align-items: center; gap: 20px;")}>
            <span style={s("font-family: 'IBM Plex Mono', monospace; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: #64646e;")}>© 2026 baiom labs</span>
            <span style={s("font-family: 'IBM Plex Mono', monospace; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: #64646e;")}>Virtual cell world models</span>
          </div>
        </footer>
      
        {detail && (<>
          <div onClick={maybeCloseDetail} style={s("position: fixed; inset: 0; z-index: 80; background: rgba(17,17,19,0.32); backdrop-filter: blur(6px); display: flex; justify-content: flex-end;")}>
            <div style={s("width: min(880px, 100%); height: 100%; overflow-y: auto; background: #f8f7f2; border-left: 1px solid #e2ded5; animation: sheet 0.28s cubic-bezier(0.16,1,0.3,1) both;")}>
              <div style={s("position: sticky; top: 0; background: rgba(248,247,242,0.9); backdrop-filter: blur(10px); border-bottom: 1px solid #e2ded5; padding: 18px 34px; display: flex; align-items: center; justify-content: space-between;")}>
                <span style={s("font-family: 'IBM Plex Mono', monospace; font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color: #a3a29b;")}>Research</span>
                <button className="x1" onClick={closeDetail} style={s("background: none; border: none; cursor: pointer; font-size: 1.2rem; line-height: 1; color: #64646e;")}>×</button>
              </div>
              <div style={s("padding: 38px 34px 56px;")}>
                <p style={s("font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; margin: 0 0 12px; color: #c04832;")}>{detail.product}</p>
                <h2 style={s("font-size: 2rem; font-weight: 200; letter-spacing: -0.03em; line-height: 1.14; margin: 0 0 14px;")}>{detail.title}</h2>
                <p style={s("font-size: 0.94rem; font-weight: 300; line-height: 1.8; color: #64646e; margin: 0 0 14px;")}>{detail.description}</p>
                <a href={detail.url} target="_blank" rel="noopener noreferrer" style={s("display: inline-flex; gap: 8px; align-items: center; font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.12em; text-transform: uppercase; text-decoration: none; color: #c04832; margin-bottom: 34px;")}>Read the paper ↗</a>
                <div style={s("display: flex; flex-direction: column; gap: 34px;")}>
                  {detail.figures.map((fig, i) => (<React.Fragment key={i}>
                    <div>
                      <div style={s("border: 1px solid #e2ded5; border-radius: 12px; background: #fdfdfa; overflow: hidden;")}>
                        <img src={`${import.meta.env.BASE_URL}${fig.slot}`} alt={fig.caption} loading="lazy" style={s("display: block; width: 100%; height: auto;")} />
                      </div>
                      <p style={s("font-size: 0.84rem; font-weight: 300; line-height: 1.75; color: #64646e; margin: 12px 0 0;")}>{fig.caption}</p>
                    </div>
                  </React.Fragment>))}
                </div>
              </div>
            </div>
          </div>
        </>)}
      
        {contactOpen && (<>
          <div onClick={maybeCloseContact} style={s("position: fixed; inset: 0; z-index: 90; background: rgba(17,17,19,0.34); backdrop-filter: blur(6px); display: flex; align-items: center; justify-content: center; padding: 20px;")}>
            <div style={s("background: #f8f7f2; border: 1px solid #e2ded5; border-radius: 18px; width: 100%; max-width: 560px; padding: 40px 40px 36px; position: relative; box-shadow: 0 30px 90px rgba(17,17,19,0.18); animation: sheet 0.26s cubic-bezier(0.16,1,0.3,1) both;")}>
              <button className="x1" onClick={closeContact} style={s("position: absolute; top: 16px; right: 20px; background: none; border: none; cursor: pointer; font-size: 1.3rem; line-height: 1; color: #a3a29b;")}>×</button>
              <h2 style={s("font-size: 1.7rem; font-weight: 200; letter-spacing: -0.025em; margin: 0 0 4px;")}>Contact us</h2>
              <p style={s("font-family: 'IBM Plex Mono', monospace; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: #a3a29b; margin: 0 0 30px;")}>Demo · Collaboration · Chat</p>
              <form onSubmit={submit} style={s("display: flex; flex-direction: column; gap: 16px;")}>
                <div style={s("display: grid; grid-template-columns: 1fr 1fr; gap: 16px;")}>
                  <label style={s("display: flex; flex-direction: column; gap: 7px;")}>
                    <span style={s("font-family: 'IBM Plex Mono', monospace; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: #64646e;")}>Name</span>
                    <input className="x7" name="name" type="text" required style={s("width: 100%; padding: 11px 14px; background: #efeee7; border: 1px solid #e2ded5; border-radius: 9px; font-family: Urbanist, sans-serif; font-weight: 300; font-size: 0.92rem; color: #111113; outline: none;")} />
                  </label>
                  <label style={s("display: flex; flex-direction: column; gap: 7px;")}>
                    <span style={s("font-family: 'IBM Plex Mono', monospace; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: #64646e;")}>Affiliation</span>
                    <input className="x7" name="affiliation" type="text" required style={s("width: 100%; padding: 11px 14px; background: #efeee7; border: 1px solid #e2ded5; border-radius: 9px; font-family: Urbanist, sans-serif; font-weight: 300; font-size: 0.92rem; color: #111113; outline: none;")} />
                  </label>
                </div>
                <label style={s("display: flex; flex-direction: column; gap: 7px;")}>
                  <span style={s("font-family: 'IBM Plex Mono', monospace; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: #64646e;")}>Email</span>
                  <input className="x7" name="email" type="email" required style={s("width: 100%; padding: 11px 14px; background: #efeee7; border: 1px solid #e2ded5; border-radius: 9px; font-family: Urbanist, sans-serif; font-weight: 300; font-size: 0.92rem; color: #111113; outline: none;")} />
                </label>
                <label style={s("display: flex; flex-direction: column; gap: 7px;")}>
                  <span style={s("font-family: 'IBM Plex Mono', monospace; font-size: 10px; letter-spacing: 0.14em; text-transform: uppercase; color: #64646e;")}>Message</span>
                  <textarea className="x7" name="message" rows="4" required style={s("width: 100%; padding: 11px 14px; background: #efeee7; border: 1px solid #e2ded5; border-radius: 9px; font-family: Urbanist, sans-serif; font-weight: 300; font-size: 0.92rem; color: #111113; outline: none; resize: vertical;")}></textarea>
                </label>
                <button className="x2" type="submit" style={s("margin-top: 6px; font-family: 'IBM Plex Mono', monospace; font-size: 11px; letter-spacing: 0.14em; text-transform: uppercase; color: #f8f7f2; background: #111113; border: none; border-radius: 9px; padding: 14px; cursor: pointer; transition: background 0.18s;")}>{submitLabel}</button>
                {status === "error" && (<>
                  <p style={s("font-size: 0.84rem; font-weight: 300; color: #c04832; text-align: center; margin: 0;")}>Failed to send. Please try again.</p>
                </>)}
              </form>
            </div>
          </div>
        </>)}
      
      </div>
    </>
  );
}