import React from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';

const C = {
  bg:          '#f8f8f6',
  surface:     '#ffffff',
  border:      '#e4e4e9',
  borderHover: '#c8c8d2',
  text:        '#111113',
  textSub:     '#64646e',
  textFaint:   '#b0b0bc',
  red:         '#c04832',
  amber:       '#a87428',
  teal:        '#2a8ca4',
  purple:      '#6e4ea8',
};

const F = { body: '"Urbanist", sans-serif' };

function TechCard({ tech, onClick }) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: C.surface,
        border:          `1px solid ${hovered ? C.red : C.border}`,
        borderRadius:    '14px',
        padding:         '28px 32px',
        cursor:          'pointer',
        transition:      'all 0.2s ease',
        transform:       hovered ? 'translateY(-3px)' : 'translateY(0)',
        boxShadow:       hovered ? '0 12px 40px rgba(0,0,0,0.07)' : '0 1px 4px rgba(0,0,0,0.03)',
        position:        'relative',
      }}
    >
      <span style={{
        position:   'absolute',
        top:        '24px',
        right:      '28px',
        fontFamily: F.body,
        fontSize:   '1rem',
        color:      C.textFaint,
        opacity:    hovered ? 1 : 0,
        transform:  hovered ? 'translate(0,0)' : 'translate(-4px, 4px)',
        transition: 'all 0.2s ease',
      }}>
        →
      </span>
      <h3 style={{ fontFamily: F.body, fontWeight: 500, fontSize: '0.92rem', color: C.text, marginBottom: '8px', letterSpacing: '0.01em' }}>
        {tech.title}
      </h3>
      <p style={{ fontFamily: F.body, fontWeight: 300, fontSize: '0.83rem', color: C.textSub, lineHeight: 1.65 }}>
        {tech.description}
      </p>
    </div>
  );
}

function PublicationItem({ pub, index }) {
  const [hovered, setHovered] = React.useState(false);
  return (
    <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-start' }}>
      <span style={{ fontFamily: F.body, fontWeight: 300, fontSize: '0.68rem', color: C.textFaint, paddingTop: '3px', minWidth: '20px', textAlign: 'right', letterSpacing: '0.04em' }}>
        {String(index).padStart(2, '0')}
      </span>
      <div style={{ borderLeft: `1px solid ${C.border}`, paddingLeft: '24px', flex: 1 }}>
        {pub.url ? (
          <a
            href={pub.url}
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
              fontFamily:     F.body,
              fontWeight:     400,
              fontSize:       '0.92rem',
              color:          hovered ? C.red : C.textSub,
              textDecoration: 'none',
              display:        'block',
              marginBottom:   '7px',
              lineHeight:     1.6,
              transition:     'color 0.18s',
            }}
          >
            {pub.title}
          </a>
        ) : (
          <p style={{ fontFamily: F.body, fontWeight: 400, fontSize: '0.92rem', color: C.textSub, marginBottom: '7px', lineHeight: 1.6 }}>
            {pub.title}
          </p>
        )}
        <p style={{ fontFamily: F.body, fontSize: '0.75rem', color: C.textFaint, marginBottom: '3px' }}>
          {pub.authors}
        </p>
        <p style={{ fontFamily: F.body, fontSize: '0.75rem', color: C.textFaint }}>
          {pub.venue} · {pub.year}
        </p>
      </div>
    </div>
  );
}

function ContactModal({ isOpen, onClose }) {
  const [formData, setFormData] = React.useState({ name: '', affiliation: '', email: '', message: '' });
  const [status, setStatus] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
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
      style={{ backgroundColor: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(6px)', position: 'fixed', inset: 0, zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}
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
        backgroundColor: scrolled ? 'rgba(248,248,246,0.9)' : 'transparent',
        borderBottom:    `1px solid ${scrolled ? C.border : 'transparent'}`,
        backdropFilter:  scrolled ? 'blur(12px)' : 'none',
        transition:      'all 0.25s ease',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '18px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link
            to="/"
            style={{ fontFamily: F.body, fontWeight: 300, fontSize: '1.05rem', color: C.text, textDecoration: 'none', letterSpacing: '0.04em' }}
          >
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

function SectionLabel({ children }) {
  return (
    <p style={{ fontFamily: F.body, fontWeight: 500, fontSize: '0.68rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: C.red, marginBottom: '12px', textAlign: 'center' }}>
      {children}
    </p>
  );
}

function Home() {
  const navigate = useNavigate();

  const publications = [
    {
      title:   "Joint Modeling of Transcriptomic and Morphological Phenotypes for Generative Molecular Design",
      authors: "M Wang, S Verma et al.",
      venue:   "ISMB GenCompBio Workshop",
      year:    "2026",
      url:     "https://www.biorxiv.org/content/10.64898/2026.02.02.703193v1",
    },
    {
      title:   "Generating Joint Transcriptomic and Morphological Responses to Drug Perturbations via Rectified Flow",
      authors: "S Verma, M Wang et al.",
      venue:   "ISMB GenCompBio Workshop",
      year:    "2026",
      url:     "https://www.biorxiv.org/content/10.64898/2026.02.02.703189v1",
    },
    {
      title:   "AnnotateAnyCell: Open-Source AI Framework for Efficient Annotation in Digital Pathology",
      authors: "S Verma, A Malusare et al.",
      venue:   "bioRxiv",
      year:    "2025",
      url:     "https://www.biorxiv.org/content/10.1101/2025.11.02.686114v1",
    },
    {
      title:   "GeneFlow: Translation of Single-cell Gene Expression to Histopathological Images via Rectified Flow",
      authors: "M Wang, S Verma et al.",
      venue:   "Neural Information Processing Systems (NeurIPS)",
      year:    "2025",
      url:     "https://arxiv.org/abs/2511.00119",
    },
  ];

  const technologies = [
    { title: "Multi-Modal Perturbation", description: "Predicting Multi-Modal Molecular Perturbations",   route: "/mulit-modal-pert" },
    { title: "Drug Design",              description: "Multi-modal Generative Modeling of Molecules.",    route: "/drug-design"           },
    { title: "Digital Pathology",        description: "Cell-level Annotation and Analysis Framework",     route: "/digital-pathology"     },
    { title: "Cellular Translation",     description: "Translating Modalities for Cross-Domain Insights", route: "/cellular-translation"    },
    { title: "Single-Cell Perturbation", description: "Single-Cell Functional Response to Perturbations", route: "/single-cell-pert" },
    { title: "3D Medical Imaging",       description: "Aligning Tomographic Medical Volumes",             route: "/medical-imaging"       },
  ];

  return (
    <div style={{ backgroundColor: C.bg, minHeight: '100vh' }}>
      <Header />

      {/* Hero */}
      <section style={{ paddingTop: '130px', paddingBottom: '56px', paddingLeft: '40px', paddingRight: '40px' }}>
        <div className="fade-up" style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '20px' }}>
          <h1 style={{
            fontFamily:    F.body,
            fontWeight:    200,
            fontSize:      'clamp(3rem, 8vw, 6rem)',
            color:         C.text,
            letterSpacing: '-0.03em',
            lineHeight:    1.05,
            margin:        0,
          }}>
            baiom labs
          </h1>
          <p className="fade-up-1" style={{ fontFamily: F.body, fontWeight: 300, fontSize: '1rem', color: C.red, letterSpacing: '0.06em', margin: 0 }}>
            Modeling Biology. Solving Problems.
          </p>
        </div>
      </section>

      {/* Technologies */}
      <section style={{ padding: '40px 40px 80px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <SectionLabel>Core Technologies</SectionLabel>
          <h2 style={{ fontFamily: F.body, fontWeight: 200, fontSize: '1.75rem', color: C.text, textAlign: 'center', letterSpacing: '-0.02em', marginBottom: '40px' }}>
            Research & Applications
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '14px', maxWidth: '950px', margin: '0 auto' }}>
            {technologies.map((tech, i) => (
              <TechCard key={i} tech={tech} onClick={() => navigate(tech.route)} />
            ))}
          </div>
        </div>
      </section>

      {/* Publications */}
      <section style={{ padding: '64px 40px 96px', borderTop: `1px solid ${C.border}` }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <SectionLabel>Selected Work</SectionLabel>
          <h2 style={{ fontFamily: F.body, fontWeight: 200, fontSize: '1.75rem', color: C.text, textAlign: 'center', letterSpacing: '-0.02em', marginBottom: '48px' }}>
            Publications
          </h2>
          <div style={{ maxWidth: '740px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '36px' }}>
            {publications.map((pub, i) => (
              <PublicationItem key={i} pub={pub} index={i + 1} />
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

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
                  style={{
                    width:        '100%',
                    borderRadius: section.rounded ? '14px' : '8px',
                    border:       `1px solid ${C.border}`,
                    marginBottom: '16px',
                    boxShadow:    '0 4px 24px rgba(0,0,0,0.06)',
                    padding:       '10px',
                    backgroundColor: C.surface,
                  }}
                />
                <p style={{ fontFamily: F.body, fontWeight: 300, fontSize: '0.86rem', color: C.textSub, lineHeight: 1.75 }}>
                  {section.captions.map((line, j) => (
                    <React.Fragment key={j}>
                      {j > 0 && <><br /></>}
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

function PerturbationModeling() {
  return (
    <DetailPage
      title="Perturbation Modeling"
      productName="PertFlow"
      productAccent={C.red}
      description="a framework for predicting joint perturbed transcriptome and morphology states."
      sections={[
        { image: '/pertflow_main.png',    alt: 'PertFlow Main',     captions: ['Mapping from control RNA-seq and image to treatment RNA-seq and image with drug conditioning.', 'Comparison of generated treatment vs real treatment images with drug name and concentration.'] },
        { image: '/pertflow_arch.png',    alt: 'PertFlow Arch',     captions: ['Input RNA-seq and image going through their respective encoders.', 'Pass through shared encoder along with conditioning from drug encoder.', 'Output heads decode perturbed transcriptome and morphology respectively.'] },
        { image: '/pertflow_results.png', alt: 'PertFlow Results',  captions: ['Generated vs real treatment for Aortic Smooth Muscle, A549, and Dermal Fibroblast Cells.'] },
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
        { image: '/annotate_arch.png',   alt: 'AnnotateAnyCell Arch',   captions: ["AnnotateAnyCell framework's complete pipeline from image pre-processing to output interface."] },
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

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"                      element={<Home />}                 />
        <Route path="/mulit-modal-pert"      element={<PerturbationModeling />} />
        <Route path="/drug-design"           element={<DrugDesign />}           />
        <Route path="/digital-pathology"     element={<DigitalPathology />}     />
        <Route path="/cellular-translation"  element={<TranslationModels />}    />
        <Route path="/single-cell-pert"      element={<div style={{ padding: '120px', textAlign: 'center' }}><h2 style={{ fontFamily: F.body, fontWeight: 300, fontSize: '4.5rem', color: C.text }}>Coming Soon</h2></div>} />
        <Route path="/medical-imaging"       element={<div style={{ padding: '120px', textAlign: 'center' }}><h2 style={{ fontFamily: F.body, fontWeight: 300, fontSize: '4.5rem', color: C.text }}>Coming Soon</h2></div>} />
      </Routes>
    </BrowserRouter>
  );
}