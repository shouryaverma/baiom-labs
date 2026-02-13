import React from 'react';

export default function App() {
  const publications = [
    {
      title: "Joint Modeling of Transcriptomic and Morphological Phenotypes for Generative Molecular Design",
      authors: "S Verma, M Wang et al.",
      venue: "bioRxiv",
      year: "2026",
      doi: "2026.02.02.703193"
    },
    {
      title: "Generating Joint Transcriptomic and Morphological Responses to Drug Perturbations via Rectified Flow",
      authors: "S Verma, M Wang et al.",
      venue: "bioRxiv",
      year: "2026",
      doi: "2026.02.02.703189"
    },
    {
      title: "AnnotateAnyCell: Open-Source AI Framework for Efficient Annotation in Digital Pathology",
      authors: "S Verma, A Malusare et al.",
      venue: "bioRxiv",
      year: "2025",
      doi: "2025.11.02.686114"
    },
    {
      title: "GeneFlow: Translation of Single-cell Gene Expression to Histopathological Images via Rectified Flow",
      authors: "M Wang, S Verma et al.",
      venue: "Neural Information Processing Systems (NeurIPS)",
      year: "2025"
    }
  ];

  const researchAreas = [
    {
      title: "Perturbation Modeling",
      description: "Predicting cellular responses to perturbations."
    },
    {
      title: "Virtual Cell",
      description: "Simulating cellular behavior through generative AI."
    },
    {
      title: "Multi-Modal Integration",
      description: "Integrating transcriptomic and histopathological data."
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <span className="text-2xl font-light text-gray-900">baiom labs</span>
          </div>
          <div className="flex space-x-8 text-2xl">
            <a href="#publications" className="text-gray-600 hover:text-gray-900 transition">Publications</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center text-center space-y-8">
            <img 
              src="/logo.png" 
              alt="baiom labs" 
              className="w-64 h-auto"
            />
            <h1 className="text-5xl md:text-6xl font-light text-gray-900 max-w-4xl leading-tight">
              Modeling biology
            </h1>
          </div>
        </div>
      </section>

      {/* Research Areas */}
      <section id="research" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-light text-gray-900 mb-16 text-center">Research Areas</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {researchAreas.map((area, index) => (
              <div key={index} className="space-y-4">
                <h3 className="text-xl font-medium text-gray-900">{area.title}</h3>
                <p className="text-gray-600 leading-relaxed">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-light text-gray-900 mb-12 text-center">Core Technologies</h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="border border-gray-200 p-8 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Virtual Cell</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Predicting Functional Response of Cells to Perturbations
              </p>
            </div>
            <div className="border border-gray-200 p-8 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Multi-Modal Integration</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Joint Modeling of Transcriptomic and Morphological Phenotypes.
              </p>
            </div>
            <div className="border border-gray-200 p-8 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Digital Pathology AI</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Open-source Frameworks for Cell-level Annotation and Analysis.
              </p>
            </div>
            <div className="border border-gray-200 p-8 rounded-lg">
              <h3 className="text-lg font-medium text-gray-900 mb-3">Translation Models</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Translating Multi-modal Data to Predict Cellular Behavior and Drug Responses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Publications */}
      <section id="publications" className="py-20 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-light text-gray-900 mb-16 text-center">Publications</h2>
          <div className="space-y-8 max-w-4xl mx-auto">
            {publications.map((pub, index) => (
              <div key={index} className="border-l-2 border-amber-900 pl-6 py-2">
                <h3 className="text-lg font-medium text-gray-900 mb-2">{pub.title}</h3>
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

      {/* Footer */}
      <footer className="border-t border-gray-200 py-8 px-6">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-500">
          <p>&copy; 2026 baiom labs</p>
        </div>
      </footer>
    </div>
  );
}
