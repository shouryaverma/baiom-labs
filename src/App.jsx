import React from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';

const C = {
  bg:          '#efeee7',
  surface:     '#f8f7f2',
  border:      '#dedad2',
  borderHover: '#bfbcb5',
  text:        '#111113',
  textSub:     '#64646e',
  textFaint:   '#a8a8b0',
  red:         '#c04832',
  amber:       '#a87428',
  teal:        '#2a8ca4',
  purple:      '#6e4ea8',
};

const F = {
  body: '"Urbanist", sans-serif',
  mono: '"IBM Plex Mono", monospace',
};

// ── SystemDiagram ─────────────────────────────────────────────────────────────

const Heatmap = ({ x, y, ops, color }) => (
  <g fill={color}>
    {ops.map((o, i) => (
      <rect key={i} x={x + (i % 3) * 9} y={y + (i < 3 ? 0 : 9)} width="7" height="7" opacity={o} />
    ))}
  </g>
);

const SystemDiagram = () => (
  <svg viewBox="55 75 1010 260" width="100%" style={{ display: 'block', height: 'auto', overflow: 'visible' }}>
    <defs>
      <marker id="ah" markerWidth="10" markerHeight="10" refX="7" refY="4" orient="auto" markerUnits="userSpaceOnUse">
        <path d="M1.5,1 L7.5,4 L1.5,7" fill="none" stroke={C.red} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </marker>
    </defs>
 
    <text x="140"  y="50"  fontFamily={F.mono} fontSize="18" letterSpacing="2" fill={C.textFaint}>INPUTS</text>
    <text x="560" y="136" textAnchor="middle" fontFamily={F.mono} fontSize="18" letterSpacing="2" fill={C.textFaint}>MODEL</text>
    <text x="895" y="50"  fontFamily={F.mono} fontSize="18" letterSpacing="2" fill={C.textFaint}>OUTPUTS</text>
 
    {/* Connector trunk — two inputs only */}
    <g fill="none" stroke={C.red} strokeWidth="1.4">
      <path d="M330,144 L380,144" />
      <path d="M330,316 L380,316" />
      <path d="M380,144 L380,316" />
    </g>
    <circle cx="380" cy="144" r="3" fill={C.red} />
    <circle cx="380" cy="316" r="3" fill={C.red} />
    <circle cx="728" cy="144" r="3" fill={C.red} />
    <circle cx="728" cy="316" r="3" fill={C.red} />
 
    <g fill="none" stroke={C.red} strokeWidth="1.6">
      <path d="M380,230 L446,230" markerEnd="url(#ah)" />
      <path d="M668,230 L728,230" />
      <path d="M728,144 L728,316" />
      <path d="M728,144 L784,144" markerEnd="url(#ah)" />
      <path d="M728,316 L784,316" markerEnd="url(#ah)" />
    </g>
    <circle cx="380" cy="230" r="3" fill={C.red} />
    <circle cx="728" cy="230" r="3" fill={C.red} />
 
    <text x="392" y="222" fontFamily={F.mono} fontSize="10" letterSpacing="1.5" fill={C.red}>ENCODE</text>
    <text x="734" y="135" fontFamily={F.mono} fontSize="10"   letterSpacing="1.5" fill={C.red}>PREDICT</text>
    <text x="734" y="330" fontFamily={F.mono} fontSize="10"   letterSpacing="1.5" fill={C.red}>DESIGN</text>
 
    {/* Input boxes — INITIAL CELL STATE (3 modalities) + PERTURBATION */}
    <rect x="30"  y="64"  width="300" height="174" rx="14" fill="#ffffff" stroke={C.border} filter="url(#cardsh)" />
    <rect x="30"  y="264" width="300" height="90" rx="14" fill="#ffffff" stroke={C.border} filter="url(#cardsh)" />
    <rect x="452" y="150" width="216" height="160" rx="18" fill="#ffffff" stroke="#cfccc2" strokeWidth="1.5" filter="url(#cardsh)" />
    <rect x="790" y="64"  width="300" height="174" rx="14" fill="#ffffff" stroke={C.border} filter="url(#cardsh)" />
    <rect x="790" y="264" width="300" height="90" rx="14" fill="#ffffff" stroke={C.border} filter="url(#cardsh)" />
 
    {/* INITIAL CELL STATE content */}
    <text x="46" y="88" fontFamily={F.mono} fontSize="10" letterSpacing="1.5" fill={C.textFaint}>INITIAL CELL STATE</text>
 
    {/* Modality 1: cell images */}
    <circle cx="57" cy="120" r="12" fill="none" stroke={C.text} strokeWidth="1.3" />
    <circle cx="57" cy="120" r="4"  fill={C.textSub} />
    <text x="84" y="116"  fontFamily={F.body} fontSize="14" fontWeight="500" fill={C.text}>cell images</text>
    <text x="84" y="130" fontFamily={F.mono} fontSize="9"  fill={C.textFaint}>cell morphology</text>
 
    {/* Modality 2: gene expression */}
    <Heatmap x={44} y={158} ops={[0.8, 0.32, 0.6, 0.42, 0.72, 0.28]} color={C.text} />
    <text x="84" y="164" fontFamily={F.body} fontSize="14" fontWeight="500" fill={C.text}>gene expression</text>
    <text x="84" y="178" fontFamily={F.mono} fontSize="9"  fill={C.textFaint}>expression profile</text>
 
    {/* Modality 3: spatial transcriptomics — 3×3 spot grid */}
    <g fill={C.text}>
      <circle cx="48" cy="200" r="2.5" opacity="0.85" />
      <circle cx="57" cy="200" r="2.5" opacity="0.35" />
      <circle cx="66" cy="200" r="2.5" opacity="0.65" />
      <circle cx="48" cy="209" r="2.5" opacity="0.50" />
      <circle cx="57" cy="209" r="2.5" opacity="0.90" />
      <circle cx="66" cy="209" r="2.5" opacity="0.25" />
      <circle cx="48" cy="218" r="2.5" opacity="0.60" />
      <circle cx="57" cy="218" r="2.5" opacity="0.80" />
      <circle cx="66" cy="218" r="2.5" opacity="0.45" />
    </g>
    <text x="84" y="208" fontFamily={F.body} fontSize="14" fontWeight="500" fill={C.text}>spatial transcriptomics</text>
    <text x="84" y="222" fontFamily={F.mono} fontSize="9"  fill={C.textFaint}>expression map</text>
 
    {/* PERTURBATION content — shifted +50px from original */}
    <text x="46" y="288" fontFamily={F.mono} fontSize="10" letterSpacing="1.5" fill={C.textFaint}>PERTURBATION TYPE</text>
    <rect x="46"  y="302" width="52" height="30" rx="8" fill={C.bg} stroke={C.border} />
    <text x="72"  y="321" textAnchor="middle" fontFamily={F.body} fontSize="13" fill={C.text}>Drug</text>
    <rect x="106" y="302" width="74" height="30" rx="8" fill={C.bg} stroke={C.border} />
    <text x="143" y="321" textAnchor="middle" fontFamily={F.body} fontSize="13" fill={C.text}>Genetic</text>
    <rect x="188" y="302" width="74" height="30" rx="8" fill={C.bg} stroke={C.border} />
    <text x="225" y="321" textAnchor="middle" fontFamily={F.body} fontSize="13" fill={C.text}>Cytokine</text>

    <text x="560" y="178" textAnchor="middle" fontFamily={F.body} fontSize="16" fontWeight="500" fill={C.red}>VirSCell-1</text>
    <text x="560" y="196" textAnchor="middle" fontFamily={F.mono} fontSize="12" letterSpacing="1" fill={C.textFaint}>Perturbation Model</text>
    <g stroke={C.red} strokeWidth="1.3" opacity="0.32">
      <path d="M506,222 L614,222" />
      <path d="M506,244 L614,244" />
      <path d="M506,266 L614,266" />
      <path d="M506,288 L614,288" />
    </g>
    <g stroke={C.textFaint} strokeWidth="1" opacity="0.55">
      <path d="M506,222 L614,288" />
      <path d="M506,288 L614,222" />
    </g>
    <g fill={C.text}>
      {[222, 244, 266, 288].map((y) => <circle key={'l' + y} cx="506" cy={y} r="3" />)}
      {[222, 244, 266, 288].map((y) => <circle key={'r' + y} cx="614" cy={y} r="3" />)}
    </g>

    {/* PERTURBED CELL STATE content */}
    <text x="806" y="90" fontFamily={F.mono} fontSize="10" letterSpacing="1.5" fill={C.red}>PERTURBED CELL STATE</text>
 
    {/* Modality 1: cell images */}
    <circle cx="818" cy="120" r="12" fill="none" stroke={C.text} strokeWidth="1.3" />
    <circle cx="821" cy="122" r="4"  fill={C.red} />
    <text x="844" y="116"  fontFamily={F.body} fontSize="14" fontWeight="500" fill={C.text}>cell images</text>
    <text x="844" y="130" fontFamily={F.mono} fontSize="9"  fill={C.textFaint}>cell morphology</text>
 
    {/* Modality 2: gene expression */}
    <Heatmap x={806} y={158} ops={[0.8, 0.32, 0.6, 0.42, 0.72, 0.28]} color={C.red} />
    <text x="844" y="164" fontFamily={F.body} fontSize="14" fontWeight="500" fill={C.text}>gene expression</text>
    <text x="844" y="178" fontFamily={F.mono} fontSize="9"  fill={C.textFaint}>expression profile</text>
 
    {/* Modality 3: spatial transcriptomics — 3×3 spot grid */}
    <g fill={C.red}>
      <circle cx="810" cy="200" r="2.5" opacity="0.85" />
      <circle cx="819" cy="200" r="2.5" opacity="0.35" />
      <circle cx="828" cy="200" r="2.5" opacity="0.65" />
      <circle cx="810" cy="209" r="2.5" opacity="0.50" />
      <circle cx="819" cy="209" r="2.5" opacity="0.90" />
      <circle cx="828" cy="209" r="2.5" opacity="0.25" />
      <circle cx="810" cy="218" r="2.5" opacity="0.60" />
      <circle cx="819" cy="218" r="2.5" opacity="0.80" />
      <circle cx="828" cy="218" r="2.5" opacity="0.45" />
    </g>
    <text x="844" y="208" fontFamily={F.body} fontSize="14" fontWeight="500" fill={C.text}>spatial transcriptomics</text>
    <text x="844" y="222" fontFamily={F.mono} fontSize="9"  fill={C.textFaint}>expression map</text>

    <text x="806" y="288" fontFamily={F.mono} fontSize="10" letterSpacing="1.5" fill={C.red}>INVERSE DRUG DESIGN</text>
    
    {/* Modality 4: Pill Icon for Candidate Drug */}
    <g transform="translate(820, 316) rotate(-45)">
      <rect x="-12" y="-6" width="24" height="12" rx="6" fill="none" stroke={C.red} strokeWidth="1.5" />
      <path d="M 0,-6 L -6,-6 A 6,6 0 0,0 -6,6 L 0,6 Z" fill={C.red} />
    </g>

    <text x="844" y="314" fontFamily={F.body} fontSize="14" fontWeight="500" fill={C.text}>candidate drug</text>
    <text x="844" y="328" fontFamily={F.mono} fontSize="9"  fill={C.textFaint}>perturbation toward target</text>
  </svg>
);

// ── TechCard ──────────────────────────────────────────────────────────────────

function TechCard({ tech, index, onClick }) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: C.surface,
        border:          `1px solid ${hovered ? C.borderHover : C.border}`,
        borderRadius:    '10px',
        padding:         '24px 28px 28px',
        cursor:          'pointer',
        transition:      'border-color 0.2s ease, box-shadow 0.2s ease',
        boxShadow:       hovered ? '0 8px 32px rgba(0,0,0,0.05)' : 'none',
        position:        'relative',
        minHeight:       '200px',
        display:         'flex',
        flexDirection:   'column',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '18px' }}>
        <p style={{ fontFamily: F.body, fontWeight: 300, fontSize: '0.62rem', color: C.textFaint, letterSpacing: '0.04em', margin: 0 }}>
          {String(index).padStart(2, '0')}
        </p>
        <span style={{
          fontFamily: F.body,
          fontSize:   '0.9rem',
          color:      hovered ? C.red : C.textFaint,
          opacity:    hovered ? 1 : 0,
          transform:  hovered ? 'translate(0,0)' : 'translate(4px,-4px)',
          transition: 'all 0.2s ease',
        }}>
          →
        </span>
      </div>
      <h3 style={{ fontFamily: F.body, fontWeight: 400, fontSize: '0.92rem', color: C.text, margin: '0 0 8px', letterSpacing: '-0.01em' }}>
        {tech.title}
      </h3>
      <p style={{ fontFamily: F.body, fontWeight: 300, fontSize: '0.8rem', color: C.textSub, lineHeight: 1.65, margin: 0 }}>
        {tech.description}
      </p>
    </div>
  );
}

// ── PublicationItem ───────────────────────────────────────────────────────────

function PublicationItem({ pub }) {
  const [hovered, setHovered] = React.useState(false);

  const inner = (
      <div className="pub-grid" style={{
        display:             'grid',
        gridTemplateColumns: '110px 1fr 28px',
        gap:                 '24px',
        alignItems:          'flex-start',
        padding:             '22px 0',
        borderTop:           `1px solid ${C.border}`,
      }}>
      <p style={{ fontFamily: F.body, fontWeight: 500, fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: hovered ? C.red : C.textFaint, margin: 0, paddingTop: '2px', transition: 'color 0.18s' }}>
        {pub.shortVenue || pub.venue} {pub.year}
      </p>
      <div>
        <p style={{ fontFamily: F.body, fontWeight: 400, fontSize: '0.88rem', color: hovered ? C.red : C.text, lineHeight: 1.55, margin: '0 0 6px', transition: 'color 0.18s' }}>
          {pub.title}
        </p>
        <p style={{ fontFamily: F.body, fontWeight: 300, fontSize: '0.75rem', color: C.textFaint, margin: 0 }}>
          {pub.authors}
        </p>
      </div>
      <span style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '2px', color: hovered ? C.red : C.textFaint, fontSize: '0.9rem', transition: 'color 0.18s' }}>
        ↗
      </span>
    </div>
  );

  if (pub.url) {
    return (
      <a
        href={pub.url}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{ textDecoration: 'none', display: 'block' }}
      >
        {inner}
      </a>
    );
  }

  return inner;
}

// ── ContactModal ──────────────────────────────────────────────────────────────

function ContactModal({ isOpen, onClose }) {
  const [formData, setFormData] = React.useState({ name: '', affiliation: '', email: '', message: '' });
  const [status, setStatus]     = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({
          service_id:      'service_j3yowha',
          template_id:     'template_04fa5oe',
          user_id:         'svCaDQSXgOe7BSIrP',
          template_params: {
            to_email:    'verma198@purdue.edu',
            from_name:   formData.name,
            from_email:  formData.email,
            affiliation: formData.affiliation,
            message:     formData.message,
          },
        }),
      });
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', affiliation: '', email: '', message: '' });
        setTimeout(() => { onClose(); setStatus(''); }, 2000);
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  if (!isOpen) return null;

  const inputStyle = {
    width:           '100%',
    padding:         '10px 14px',
    backgroundColor: C.bg,
    border:          `1px solid ${C.border}`,
    borderRadius:    '8px',
    color:           C.text,
    fontFamily:      F.body,
    fontWeight:      300,
    fontSize:        '0.9rem',
    outline:         'none',
    boxSizing:       'border-box',
    transition:      'border-color 0.18s',
  };

  const labelStyle = {
    display:       'block',
    fontFamily:    F.body,
    fontWeight:    500,
    fontSize:      '0.68rem',
    letterSpacing: '0.09em',
    textTransform: 'uppercase',
    color:         C.textSub,
    marginBottom:  '7px',
  };

  return (
    <div
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{ backgroundColor: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(6px)', position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}
    >
      <div style={{ backgroundColor: C.surface, border: `1px solid ${C.border}`, borderRadius: '16px', maxWidth: '580px', width: '100%', padding: '44px', position: 'relative', boxShadow: '0 24px 80px rgba(0,0,0,0.1)' }}>
        <button
          onClick={onClose}
          onMouseEnter={e => e.currentTarget.style.color = C.text}
          onMouseLeave={e => e.currentTarget.style.color = C.textFaint}
          style={{ position: 'absolute', top: '18px', right: '22px', fontFamily: F.body, fontSize: '1.3rem', color: C.textFaint, background: 'none', border: 'none', cursor: 'pointer', lineHeight: 1, transition: 'color 0.18s' }}
        >
          ×
        </button>
        <h2 style={{ fontFamily: F.body, fontWeight: 200, fontSize: '1.8rem', color: C.text, letterSpacing: '-0.02em', marginBottom: '4px' }}>
          Contact Us
        </h2>
        <p style={{ fontFamily: F.body, fontWeight: 300, fontSize: '0.88rem', color: C.textSub, marginBottom: '32px' }}>
          Demo · Collaboration · Chat
        </p>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {[
            { key: 'name',        label: 'Name',        type: 'text'  },
            { key: 'affiliation', label: 'Affiliation', type: 'text'  },
            { key: 'email',       label: 'Email',       type: 'email' },
          ].map(({ key, label, type }) => (
            <div key={key}>
              <label style={labelStyle}>{label}</label>
              <input
                type={type}
                required
                value={formData[key]}
                onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
                style={inputStyle}
              />
            </div>
          ))}
          <div>
            <label style={labelStyle}>Message</label>
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              style={{ ...inputStyle, resize: 'vertical' }}
            />
          </div>
          <button
            type="submit"
            disabled={status === 'sending'}
            style={{
              backgroundColor: status === 'success' ? '#2a5c3a' : C.text,
              color:           '#ffffff',
              fontFamily:      F.body,
              fontWeight:      500,
              fontSize:        '0.75rem',
              letterSpacing:   '0.09em',
              textTransform:   'uppercase',
              padding:         '13px',
              borderRadius:    '8px',
              border:          'none',
              cursor:          status === 'sending' ? 'not-allowed' : 'pointer',
              transition:      'background-color 0.18s',
              opacity:         status === 'sending' ? 0.5 : 1,
            }}
          >
            {status === 'sending' ? 'Sending...' : status === 'success' ? 'Sent' : 'Send Message'}
          </button>
          {status === 'error' && (
            <p style={{ fontFamily: F.body, fontSize: '0.82rem', color: C.red, textAlign: 'center' }}>
              Failed to send. Please try again.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

// ── Header ────────────────────────────────────────────────────────────────────

function Header() {
  const [contactOpen, setContactOpen] = React.useState(false);
  const [scrolled, setScrolled]       = React.useState(false);

  React.useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <nav style={{
        position:        'fixed',
        top:             0,
        width:           '100%',
        zIndex:          50,
        backgroundColor: scrolled ? 'rgba(239,238,231,0.88)' : 'transparent',
        borderBottom:    `1px solid ${scrolled ? C.border : 'transparent'}`,
        backdropFilter:  scrolled ? 'blur(12px)' : 'none',
        transition:      'all 0.25s ease',
      }}>
        <div className="nav-inner" style={{ maxWidth: '1200px', margin: '0 auto', padding: '18px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{ fontFamily: F.body, fontWeight: 300, fontSize: '1.05rem', color: C.text, textDecoration: 'none', letterSpacing: '0.04em' }}>
            baiom labs
          </Link>
          <button
            onClick={() => setContactOpen(true)}
            onMouseEnter={e => e.currentTarget.style.color = C.text}
            onMouseLeave={e => e.currentTarget.style.color = C.textSub}
            style={{ fontFamily: F.body, fontWeight: 400, fontSize: '0.75rem', letterSpacing: '0.09em', textTransform: 'uppercase', color: C.textSub, background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.18s' }}
          >
            contact
          </button>
        </div>
      </nav>
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer style={{ borderTop: `1px solid ${C.border}`, padding: '28px 40px' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
        <p style={{ fontFamily: F.body, fontWeight: 300, fontSize: '0.72rem', color: C.textFaint }}>
          &copy; 2026 baiom labs
        </p>
      </div>
    </footer>
  );
}

// ── Home ──────────────────────────────────────────────────────────────────────

function Home() {
  const navigate                      = useNavigate();
  const [contactOpen, setContactOpen] = React.useState(false);

  const publications = [
    { title: "Joint Modeling of Transcriptomic and Morphological Phenotypes for Generative Molecular Design",          authors: "M Wang, S Verma et al.", shortVenue: "ISMB",    year: "2026", url: "https://www.biorxiv.org/content/10.64898/2026.02.02.703193v1"    },
    { title: "Generating Joint Transcriptomic and Morphological Responses to Drug Perturbations via Rectified Flow",   authors: "S Verma, M Wang et al.", shortVenue: "ISMB",    year: "2026", url: "https://www.biorxiv.org/content/10.64898/2026.02.02.703189v3"    },
    { title: "AnnotateAnyCell: Open-Source AI Framework for Efficient Annotation in Digital Pathology",                authors: "S Verma, A Malusare et al.", shortVenue: "bioRxiv", year: "2025", url: "https://www.biorxiv.org/content/10.1101/2025.11.02.686114v3" },
    { title: "GeneFlow: Translation of Single-cell Gene Expression to Histopathological Images via Rectified Flow",    authors: "M Wang, S Verma et al.", shortVenue: "NeurIPS", year: "2025", url: "https://arxiv.org/abs/2511.00119"                                  },
  ];

  const technologies = [
    { title: "Multi-Modal Perturbation", description: "Predicting Multi-Modal Molecular Perturbations",    route: "/multi-modal-pert"     },
    { title: "Drug Design",              description: "Multi-modal Generative Modeling of Molecules.",     route: "/drug-design"          },
    { title: "Digital Pathology",        description: "Cell-level Annotation and Analysis Framework",      route: "/digital-pathology"    },
    { title: "Cellular Translation",     description: "Translating Modalities for Cross-Domain Insights",  route: "/cellular-translation" },
    { title: "Single-Cell Perturbation", description: "Single-Cell Functional Response to Perturbations", route: "/single-cell-pert"     },
    { title: "3D Medical Imaging",       description: "Aligning Tomographic Medical Volumes",              route: "/medical-imaging"      },
  ];

  const platformLinks = [
    { label: 'Read the GeneFlow Paper (NeurIPS \'25)', url: 'https://arxiv.org/abs/2511.00119'                             },
    { label: 'Read the PertFlow Paper (ISMB \'26)',    url: 'https://www.biorxiv.org/content/10.64898/2026.02.02.703193v1' },
    { label: 'Read the Pert2Mol Paper (ISMB \'26)',    url: 'https://www.biorxiv.org/content/10.64898/2026.02.02.703189v1' },
  ];

  const sectionLabelStyle = { fontFamily: F.body, fontWeight: 500, fontSize: '0.9rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: C.red, margin: '0 0 14px', paddingTop: '6px' };
  const sectionHeadingStyle = { fontFamily: F.body, fontWeight: 200, fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', color: C.text, letterSpacing: '-0.025em', lineHeight: 1.1, margin: '0 0 40px' };
  const twoColSection       = { maxWidth: '1200px', margin: '0 auto', padding: '80px 40px', display: 'grid', gridTemplateColumns: '200px 1fr', gap: '60px', alignItems: 'start' };

  return (
    <div style={{ backgroundColor: C.bg, minHeight: '100vh' }}>
      <Header />
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />

      {/* ── Landing ───────────────────────────────────────────── */}
      <section style={{ paddingTop: '120px', paddingBottom: '20px' }}>
        <div className="section-inner" style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px' }}>

          {/* Name */}
          <h1 className="fade-up" style={{
            fontFamily:    F.body,
            fontWeight:    300,
            fontSize:      'clamp(2.8rem, 6vw, 5rem)',
            color:         C.text,
            letterSpacing: '-0.03em',
            lineHeight:    1.06,
            margin:        '0 0 14px',
          }}>
            baiom labs
          </h1>

          {/* Subtitle */}
          <p className="fade-up" style={{
            fontFamily:    F.body,
            fontWeight:    500,
            fontSize:      '0.9rem',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color:         C.red,
            margin:        '0 0 52px',
          }}>
            Multi-Modal Virtual Cell World Models
          </p>

          {/* Diagram */}
          <div className="fade-up-1" style={{
            background: 'transparent',
            border:          `0px solid ${C.border}`,
            borderRadius:    '12px',
            padding:         '32px 28px 26px',
            marginBottom:    '28px',
          }}>
            <SystemDiagram />
          </div>

          {/* Blurb + paper links */}
          <div className="fade-up-2 responsive-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '48px', marginBottom: '44px' }}>
            <p style={{ fontFamily: F.body, fontWeight: 300, fontSize: '0.88rem', color: C.textSub, lineHeight: 1.9, margin: 0 }}>
              We develop multi-modal models on human cellular and molecular data to learn the patterns governing drug response, toxicity, and cross-modal cellular translation
            </p>
            <div>
              {platformLinks.map(link => (
                <a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display:        'flex',
                    justifyContent: 'space-between',
                    alignItems:     'center',
                    fontFamily:     F.body,
                    fontWeight:     300,
                    fontSize:       '0.78rem',
                    color:          C.textSub,
                    textDecoration: 'none',
                    padding:        '5px 0',
                    borderBottom:   `1px solid ${C.border}`,
                  }}
                >
                  <span>{link.label}</span>
                  <span style={{ color: C.textFaint }}>↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Products ──────────────────────────────────────────── */}
      <section style={{ borderTop: `1px solid ${C.border}`, paddingBottom: '20px' }}>
        <div className="responsive-section" style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 40px' }}>
          <p style={sectionLabelStyle}>Products</p>
          <h2 style={sectionHeadingStyle}>Biological Applications</h2>
          <div className="responsive-3col" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            {technologies.map((tech, i) => (
              <TechCard key={i} tech={tech} index={i + 1} onClick={() => navigate(tech.route)} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Publications ──────────────────────────────────────── */}
      <section style={{ borderTop: `1px solid ${C.border}`, paddingBottom: '20px' }}>
        <div className="responsive-section" style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 40px' }}>
          <p style={sectionLabelStyle}>Publications</p>
          <h2 style={sectionHeadingStyle}>Peer-Reviewed &amp; Open-Source</h2>
          <div style={{ borderBottom: `1px solid ${C.border}` }}>
            {publications.map((pub, i) => (
              <PublicationItem key={i} pub={pub} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// ── DetailPage ────────────────────────────────────────────────────────────────

function DetailPage({ title, productName, productAccent, description, sections }) {
  return (
    <div style={{ backgroundColor: C.bg, minHeight: '100vh' }}>
      <Header />
      <section style={{ paddingTop: '110px', paddingBottom: '96px', paddingLeft: '40px', paddingRight: '40px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <p style={{ fontFamily: F.body, fontWeight: 500, fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: C.textFaint, marginBottom: '14px' }}>
            Research
          </p>
          <h1 style={{ fontFamily: F.body, fontWeight: 200, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: C.text, letterSpacing: '-0.025em', marginBottom: '14px', lineHeight: 1.15 }}>
            {title}
          </h1>
          <p style={{ fontFamily: F.body, fontWeight: 300, fontSize: '1rem', color: C.textSub, lineHeight: 1.75, marginBottom: '64px' }}>
            <span style={{ fontWeight: 500, color: productAccent }}>{productName}</span>
            {' — '}{description}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '64px' }}>
            {sections.map((section, i) => (
              <div key={i}>
                <img
                  src={section.image}
                  alt={section.alt}
                  style={{ width: '100%', borderRadius: section.rounded ? '14px' : '8px', border: `1px solid ${C.border}`, marginBottom: '16px', boxShadow: '0 4px 24px rgba(0,0,0,0.06)', padding: '10px', backgroundColor: C.surface }}
                />
                <p style={{ fontFamily: F.body, fontWeight: 300, fontSize: '0.86rem', color: C.textSub, lineHeight: 1.75 }}>
                  {section.captions.map((line, j) => (
                    <React.Fragment key={j}>
                      {j > 0 && <br />}
                      {line}
                    </React.Fragment>
                  ))}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

// ── Detail route components ───────────────────────────────────────────────────

function PerturbationModeling() {
  return (
    <DetailPage
      title="Perturbation Modeling"
      productName="PertFlow"
      productAccent={C.red}
      description="a framework for predicting joint perturbed transcriptome and morphology states."
      sections={[
        { image: '/pertflow_main.png',    alt: 'PertFlow Main',    captions: ['Mapping from control RNA-seq and image to treatment RNA-seq and image with drug conditioning.', 'Comparison of generated treatment vs real treatment images with drug name and concentration.'] },
        { image: '/pertflow_arch.png',    alt: 'PertFlow Arch',    captions: ['Input RNA-seq and image going through their respective encoders.', 'Pass through shared encoder along with conditioning from drug encoder.', 'Output heads decode perturbed transcriptome and morphology respectively.'] },
        { image: '/pertflow_results.png', alt: 'PertFlow Results', captions: ['Generated vs real treatment for Aortic Smooth Muscle, A549, and Dermal Fibroblast Cells.'] },
      ]}
    />
  );
}

function DrugDesign() {
  return (
    <DetailPage
      title="Drug Design"
      productName="Pert2Mol"
      productAccent={C.amber}
      description="a framework for multi-modal phenotype-to-structure generation."
      sections={[
        { image: '/pert2mol_main.png', alt: 'Pert2Mol Main', captions: ['Transcriptome and Morphological features are extracted from their respective encoders.', 'A transformer learns to generate SMILES string of the drug that caused the perturbation.'] },
        { image: '/pert2mol_mols.png', alt: 'Pert2Mol Mols', captions: ['Results show accurate SMILES generation for a variety of drugs with different mechanisms of action.', 'Pert2Mol is compared against a diffusion baseline along with RNA-only and image-only model variants.'] },
      ]}
    />
  );
}

function DigitalPathology() {
  return (
    <DetailPage
      title="Digital Pathology"
      productName="AnnotateAnyCell"
      productAccent={C.purple}
      description="a framework for cell-level annotation and analysis in digital pathology."
      sections={[
        { image: '/annotate_arch.png',   alt: 'AnnotateAnyCell Arch',                captions: ["AnnotateAnyCell framework's complete pipeline from image pre-processing to output interface."] },
        { image: '/annotate_main.png',   alt: 'AnnotateAnyCell Main',   rounded: true, captions: ['Intuitive platform for visualizing and interacting with histopathology samples at cellular resolution.', 'Users can navigate through image and embedding space to explore regions of interest and label cells.'] },
        { image: '/annotate_output.png', alt: 'AnnotateAnyCell Output', rounded: true, captions: ['Annotated outputs demonstrate labeled cell-level classes and analysis for direct download.', 'Users can understand tissue composition and cellular relationships to visualize their labels.'] },
      ]}
    />
  );
}

function TranslationModels() {
  return (
    <DetailPage
      title="Translation Models"
      productName="GeneFlow"
      productAccent={C.teal}
      description="a framework to map transcriptomics onto paired cellular H&E images."
      sections={[
        { image: '/geneflow_main.png',      alt: 'GeneFlow Main',      captions: ['Enables generation of realistic cellular morphology features from transcriptomic data.', 'Visualizing spatially resolved intercellular interactions from gene expression profiles.'] },
        { image: '/geneflow_arch.png',      alt: 'GeneFlow Arch',      captions: ['Architecture of the GeneFlow model for mapping transcriptomes to histology images.', 'Leveraging rectified flow dynamics, the method consistently outperforms alternatives.'] },
        { image: '/geneflow_diagnosis.png', alt: 'GeneFlow Diagnosis', captions: ['Generate diagnostic features: pleomorphic nuclei, keratinizing squamous epithelium, collagenous stroma.', 'Enabling pathologists to reach consistent interpretations with high confidence relative to ground truth.'] },
      ]}
    />
  );
}

const ComingSoon = () => (
  <div style={{ backgroundColor: C.bg, minHeight: '100vh' }}>
    <Header />
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h2 style={{ fontFamily: F.body, fontWeight: 200, fontSize: 'clamp(2rem, 6vw, 4.5rem)', color: C.text, letterSpacing: '-0.03em' }}>
        Coming Soon
      </h2>
    </div>
    <Footer />
  </div>
);

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"                     element={<Home />}                 />
        <Route path="/multi-modal-pert"     element={<PerturbationModeling />} />
        <Route path="/drug-design"          element={<DrugDesign />}           />
        <Route path="/digital-pathology"    element={<DigitalPathology />}     />
        <Route path="/cellular-translation" element={<TranslationModels />}    />
        <Route path="/single-cell-pert"     element={<ComingSoon />}           />
        <Route path="/medical-imaging"      element={<ComingSoon />}           />
      </Routes>
    </BrowserRouter>
  );
}