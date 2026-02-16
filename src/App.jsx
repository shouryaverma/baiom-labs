import React from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';

function ContactModal({ isOpen, onClose }) {
  const [formData, setFormData] = React.useState({
    name: '',
    affiliation: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = React.useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');

    try {
      const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          service_id: 'service_j3yowha',
          template_id: 'template_04fa5oe',
          user_id: 'svCaDQSXgOe7BSIrP',
          template_params: {
            to_email: 'verma198@purdue.edu',
            from_name: formData.name,
            from_email: formData.email,
            affiliation: formData.affiliation,
            message: formData.message,
          }
        })
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', affiliation: '', email: '', message: '' });
        setTimeout(() => {
          onClose();
          setStatus('');
        }, 2000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full p-8 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl"
        >
          ×
        </button>
        
        <h2 className="text-4xl font-light text-gray-900 mb-6">Contact Us For</h2>
        <h2 className="text-3xl font-light text-gray-900 mb-6">Demo. Collaboration. Chat.</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Affiliation</label>
            <input
              type="text"
              required
              value={formData.affiliation}
              onChange={(e) => setFormData({...formData, affiliation: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
            <textarea
              required
              rows="4"
              value={formData.message}
              onChange={(e) => setFormData({...formData, message: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:bg-gray-400"
          >
            {status === 'sending' ? 'Sending...' : status === 'success' ? 'Sent!' : 'Send Message'}
          </button>
          
          {status === 'error' && (
            <p className="text-red-600 text-center">Failed to send. Please try again.</p>
          )}
        </form>
      </div>
    </div>
  );
}

function Header() {
  const [contactOpen, setContactOpen] = React.useState(false);

  return (
    <>
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="flex space-x-8 text-xl">
            <span className="text-gray-600 hover:text-gray-900 transition">baiom labs</span>
          </Link>
          <div className="flex space-x-8 text-xl">
            <a href="#publications" className="text-gray-600 hover:text-gray-900 transition">publications</a>
            <button
              onClick={() => setContactOpen(true)}
              className="text-gray-600 hover:text-gray-900 transition"
            >
              contact
            </button>
          </div>
        </div>
      </nav>
      <ContactModal isOpen={contactOpen} onClose={() => setContactOpen(false)} />
    </>
  );
}

function Footer() {
  return (
    <footer className="border-t border-gray-200 py-8 px-6">
      <div className="max-w-7xl mx-auto text-center text-sm text-gray-500">
        <p>&copy; 2026 baiom labs</p>
      </div>
    </footer>
  );
}

function Home() {
  const navigate = useNavigate();
  
  const publications = [
    {
      title: "Joint Modeling of Transcriptomic and Morphological Phenotypes for Generative Molecular Design",
      authors: "M Wang, S Verma et al.",
      venue: "bioRxiv",
      year: "2026",
      doi: "2026.02.02.703193",
      url: "https://www.biorxiv.org/content/10.64898/2026.02.02.703193v1"
    },
    {
      title: "Generating Joint Transcriptomic and Morphological Responses to Drug Perturbations via Rectified Flow",
      authors: "S Verma, M Wang et al.",
      venue: "bioRxiv",
      year: "2026",
      doi: "2026.02.02.703189",
      url: "https://www.biorxiv.org/content/10.64898/2026.02.02.703189v1"
    },
    {
      title: "AnnotateAnyCell: Open-Source AI Framework for Efficient Annotation in Digital Pathology",
      authors: "S Verma, A Malusare et al.",
      venue: "bioRxiv",
      year: "2025",
      doi: "2025.11.02.686114",
      url: "https://www.biorxiv.org/content/10.1101/2025.11.02.686114v1"
    },
    {
      title: "GeneFlow: Translation of Single-cell Gene Expression to Histopathological Images via Rectified Flow",
      authors: "M Wang, S Verma et al.",
      venue: "Neural Information Processing Systems (NeurIPS)",
      year: "2025",
      url: "https://arxiv.org/abs/2511.00119"
    }
  ];

  const technologies = [
    {
      title: "Perturbation Modeling",
      description: "Predicting Functional Response of Cells to Perturbations",
      route: "/perturbation-modeling"
    },
    {
      title: "Drug Design",
      description: "Multi-modal Generative Modeling of Molecules.",
      route: "/drug-design"
    },
    {
      title: "Digital Pathology",
      description: "Frameworks for Cell-level Annotation and Analysis.",
      route: "/digital-pathology"
    },
    {
      title: "Translation Models",
      description: "Translating Modalities for Cross-Domain Understanding.",
      route: "/translation-models"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center space-y-8">
            <h1 className="text-7xl md:text-7xl font-light text-red-200 max-w-4xl leading-tight">
              baiom labs
            </h1>
            <img 
              src="/logo.png" 
              alt="baiom labs" 
              className="w-64 h-auto"
            />
            <h1 className="text-6xl md:text-5xl font-light text-gray-900 max-w-4xl leading-tight">
              Modeling Biology. Solving Problems.
            </h1>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-gradient-to-b from-white to-red-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-light text-gray-900 mb-12 text-center">Core Technologies & Research</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {technologies.map((tech, index) => (
              <div 
                key={index}
                onClick={() => navigate(tech.route)}
                className="border border-gray-200 p-8 rounded-lg cursor-pointer hover:border-gray-400 hover:bg-red-50 hover:shadow-lg transition"
              >
                <h3 className="text-lg font-medium text-gray-900 mb-3">{tech.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {tech.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="publications" className="py-20 px-6 bg-gradient-to-b from-red-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-light text-gray-900 mb-16 text-center">Publications</h2>
          <div className="space-y-8 max-w-4xl mx-auto">
            {publications.map((pub, index) => (
              <div key={index} className="border-l-2 border-amber-900 pl-6 py-2">
                {pub.url ? (
                  <a 
                    href={pub.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-lg font-medium text-gray-900 hover:text-blue-600 transition mb-2 block"
                  >
                    {pub.title}
                  </a>
                ) : (
                  <h3 className="text-lg font-medium text-gray-900 mb-2">{pub.title}</h3>
                )}
                <p className="text-sm text-gray-600 mb-1">{pub.authors}</p>
                <p className="text-sm text-gray-500">
                  {pub.venue} {pub.year}
                  {pub.doi && ` • ${pub.doi}`}
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
    <div className="min-h-screen bg-white">
      <Header />
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-light text-gray-900 mb-8">Perturbation Modeling</h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-12">
            We introduce <span className="font-bold text-red-400">PertFlow</span>, a framework for predicting joint perturbed transcriptome and morphology states.
          </p>
          <div className="space-y-12">
            <div>
              <img 
                src="/pertflow_main.png"
                alt="PertFlow Main Interface" 
                className="w-full mb-4"
              />
              <p className="text-xl text-gray-600 leading-relaxed">
                Cross-modal mapping from control RNA-seq and image to treatment RNA-seq and image with drug conditioning.
                <br />
                Visualize comparison of generated treatment vs real treatment images with drug name and concentration.
              </p>
            </div>
            <div className="pt-8">
              <img 
                src="/pertflow_arch.png" 
                alt="PertFlow Architecture" 
                className="w-full mb-4"
              />
              <p className="text-xl text-gray-600 leading-relaxed">
                Input RNA-seq and image going through their respective encoders.
                <br />
                Pass through shared encoder along with conditioning from drug encoder.
                <br />
                Output heads decode perturbed transcriptome and morphology respectively.
              </p>
            </div>
            <div className="pt-8">
              <img 
                src="/pertflow_results.png" 
                alt="PertFlow Results" 
                className="w-full mb-4"
              />
              <p className="text-xl text-gray-600 leading-relaxed">
              Generated vs real treatment for Aortic Smooth Muscle, A549, and Dermal Fibroblast Cells.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

function DrugDesign() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-light text-gray-900 mb-8">Drug Design</h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-12">
            We introduce <span className="font-bold text-yellow-500">Pert2Mol</span>, a framework for multi-modal phenotype-to-structure generation.
          </p>
          <div className="space-y-12">
            <div>
              <img 
                src="/pert2mol_main.png"
                alt="Pert2Mol Main Interface" 
                className="w-full mb-4"
              />
              <p className="text-xl text-gray-600 leading-relaxed">
                Transcritome and Morphological features are extracted from their respective encoders.
                <br />
                A transformer learns to generate SMILES string of the drug that caused the perturbation.
              </p>
            </div>
            <div className="pt-8">
              <img 
                src="/pert2mol_mols.png"
                alt="Pert2Mol Output" 
                className="w-full mb-4"
              />
              <p className="text-xl text-gray-600 leading-relaxed">
                Results show accurate SMILES generation for a variety of drugs with different mechanisms of action.
                <br />
                Our Pert2Mol is compared against diffusion baseline along with RNA & image only models variants.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

function DigitalPathology() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-light text-gray-900 mb-8">Digital Pathology</h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-12">
            We introduce <span className="font-bold text-purple-500">AnnotateAnyCell</span>, a framework for cell-level annotation and analysis in digital pathology.
          </p>
          <div className="space-y-12">
            <div>
              <img 
                src="/annotate_main.png"
                alt="Digital Pathology Main Interface" 
                className="w-full border border-gray-200 rounded-2xl shadow-lg mb-4"
              />
              <p className="text-xl text-gray-600 leading-relaxed">
                Intuitive platform for visualizing and interacting with histopathology samples at cellular resolution.
                <br />
                Users can navigate through image & embedding space to explore regions of interest, and label cells.
              </p>
            </div>
            <div className="pt-8">
              <img 
                src="/annotate_output.png" 
                alt="Digital Pathology Output" 
                className="w-full border border-gray-200 rounded-2xl shadow-lg mb-4"
              />
              <p className="text-xl text-gray-600 leading-relaxed">
                Annotated outputs demonstrate labeled cell-level classes and analysis for direct download.
                <br />
                Users can understand tissue composition and cellular relationships to visualize their labels.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

function TranslationModels() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-light text-gray-900 mb-8">Translation Models</h1>
          <p className="text-xl text-gray-600 leading-relaxed mb-12">
            We introduce <span className="font-bold text-blue-500">GeneFlow</span>, a framework to map transcriptomics onto paired cellular H&E images.
          </p>
          <div className="space-y-12">
            <div>
              <img
                src="/geneflow_main.png" 
                alt="GeneFlow Workflow" 
                className="w-full mb-4"
              />
              <p className="text-xl text-gray-600 leading-relaxed">
                Enables generation of realistic cellular morphology features from transcriptomic data.
                <br />
                Visualizing spatially resolved intercellular interactions from gene expression profiles.
              </p>
            </div>
            <div className="pt-8">
              <img 
                src="/geneflow_arch.png" 
                alt="GeneFlow Architecture" 
                className="w-full mb-4"
              />
              <p className="text-xl text-gray-600 leading-relaxed">
                Architecture of the GeneFlow model for mapping transcriptomes to histology images.
                <br />
                Leveraging rectified flow dynamics, our method consistently outperforms alternatives.
              </p>
            </div>
            <div className="pt-8">
              <img 
                src="/geneflow_diagnosis.png" 
                alt="GeneFlow Diagnosis" 
                className="w-full mb-4"
              />
              <p className="text-xl text-gray-600 leading-relaxed">
                Generate diagnostic features like pleomorphic nuclei, keratinizing squamous epithelium, collagenous stroma.
                <br />
                Enabling pathologist to reach consistent interpretations with high confidence relative to ground truth.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/perturbation-modeling" element={<PerturbationModeling />} />
        <Route path="/drug-design" element={<DrugDesign />} />
        <Route path="/digital-pathology" element={<DigitalPathology />} />
        <Route path="/translation-models" element={<TranslationModels />} />
      </Routes>
    </BrowserRouter>
  );
}