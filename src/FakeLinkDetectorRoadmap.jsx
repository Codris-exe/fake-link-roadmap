import React, { useState } from "react";
import { motion } from "framer-motion";
import { FileText, ChevronDown, DownloadCloud, Code } from "lucide-react";

// Interactive Roadmap component for the Fake Link Detector college project.
// - Uses Tailwind utility classes (already available in the environment)
// - Click any step to expand implementation details, languages, research pointers and deliverables
// - Print button uses window.print() to export the visual roadmap to PDF/PNG (browser provided)

export default function FakeLinkDetectorRoadmap() {
  const [openId, setOpenId] = useState(1);

  const steps = [
    {
      id: 1,
      title: "Project kickoff & scope",
      duration: "3–7 days",
      languages: ["None (planning)"],
      implementation: [
        "Extract goals from your current PPT and write a one-page spec (success metrics: accuracy, FPR, latency)",
        "Decide detection mode: local (in-extension) vs backend API (cloud)",
        "Define MVP: Browser extension that flags links + backend ML inference"
      ],
      research: [
        "Read phishing detection surveys and recent papers (IEEE, arXiv)",
        "Collect acceptance criteria from professor / course rubric"
      ],
      deliverables: ["Project spec (1 page)", "MVP feature list"]
    },

    {
      id: 2,
      title: "Data collection & dataset building",
      duration: "1–2 weeks",
      languages: ["Python"],
      implementation: [
        "Collect labeled phishing URLs (PhishTank, OpenPhish) and benign URLs (Alexa/Tranco top sites)",
        "Crawl target pages (headless browser with Selenium) to collect page content when needed",
        "Store raw data in CSV / JSON and small DB (SQLite / PostgreSQL)"
      ],
      research: [
        "Which public datasets are most relevant (PhishTank, OpenPhish) and licensing terms",
        "How to safely crawl and respect robots.txt / legal constraints"
      ],
      deliverables: ["Raw URL corpus", "Labelled dataset (train / val / test)"]
    },

    {
      id: 3,
      title: "Feature engineering & heuristics",
      duration: "1 week",
      languages: ["Python"],
      implementation: [
        "Extract lexical features: length, token counts, suspicious words, presence of @, multiple subdomains",
        "Host-based features: WHOIS age, registrar, DNS record TTL, IP vs domain, TLS cert validity",
        "Content features (optional): page title, presence of login forms, suspicious JS",
        "Implement quick heuristic score to use in-extension for instant feedback"
      ],
      research: [
        "Papers describing best lexical & host-based features for phishing detection",
        "Which WHOIS APIs are reliable for student projects (whoisxmlapi, python-whois)"
      ],
      deliverables: ["Feature extraction scripts", "Heuristic rule-set"]
    },

    {
      id: 4,
      title: "Baseline models & evaluation",
      duration: "1–2 weeks",
      languages: ["Python", "scikit-learn"],
      implementation: [
        "Train interpretable models first: Logistic Regression, Decision Tree, Random Forest",
        "Evaluate using cross-validation; track precision, recall, F1, ROC-AUC, and false positive rate",
        "Create baseline notebooks demonstrating features → model → metrics"
      ],
      research: [
        "Standard evaluation methodology for imbalanced datasets (use stratified splits, up/down-sampling or class weights)",
        "How to interpret feature importance for explainability"
      ],
      deliverables: ["Baseline model notebooks", "Evaluation report (metrics + confusion matrices)"]
    },

    {
      id: 5,
      title: "Advanced ML & production model",
      duration: "1–3 weeks",
      languages: ["Python", "XGBoost / LightGBM / PyTorch / TensorFlow"],
      implementation: [
        "Try gradient-boosted trees (XGBoost/LightGBM) and optionally small neural nets for content features",
        "Tune hyperparameters (grid/random search) and keep model size reasonable for inference latency",
        "Serialize model (joblib / ONNX / TorchScript / TF SavedModel) for serving"
      ],
      research: [
        "Trade-offs: model size vs latency for real-time detection in a browser extension",
        "Techniques for handling concept drift (continuous re-training)"
      ],
      deliverables: ["Production-ready model artifact", "Model card (architecture, metrics, limitations)"]
    },

    {
      id: 6,
      title: "Extension architecture (MVP)",
      duration: "1–2 weeks",
      languages: ["TypeScript / JavaScript", "React (for popup UI)"],
      implementation: [
        "Implement a Chrome / Firefox extension: content script to catch clicks/hovers, background script to perform checks",
        "Decide where inference runs: in-extension (TensorFlow.js) for fast local checks OR call backend API for full model",
        "UI: color-coded badges (green/yellow/red) shown near links or as a tooltip/popup"
      ],
      research: [
        "Browser extension APIs and manifest v3 requirements (Chrome/Firefox differences)",
        "How to securely call an external inference API from an extension (CORS, auth, rate limiting)"
      ],
      deliverables: ["Working extension skeleton", "Popup + in-page indicator mockups"]
    },

    {
      id: 7,
      title: "Backend inference & threat DB",
      duration: "1–2 weeks",
      languages: ["Python (FastAPI) or Node.js (TypeScript)"],
      implementation: [
        "Build lightweight inference microservice (FastAPI) that loads the serialized model and exposes a /predict endpoint",
        "Build a threat DB (Postgres) with known malicious URLs, metadata, and a simple ingestion pipeline",
        "Add caching (Redis) for repeated lookups to reduce latency and costs"
      ],
      research: [
        "Model serving options: FastAPI + Gunicorn/uvicorn, TensorFlow Serving, or TorchServe",
        "Threat feeds and how often to refresh (daily/real-time)"
      ],
      deliverables: ["Deployed inference API (dev)", "Threat DB schema and ingestion script"]
    },

    {
      id: 8,
      title: "Integration & UX polish",
      duration: "1 week",
      languages: ["TypeScript / CSS / Tailwind"],
      implementation: [
        "Connect extension to backend; implement fallbacks (heuristic) on API failures",
        "Design clear alerts: do not overwhelm user (suppress repeated alerts), provide a 'Why flagged?' explanation",
        "Add settings: auto-block, show warnings, report false positives"
      ],
      research: [
        "Human factors research for security warnings to avoid habituation",
        "Best practices for in-browser notifications and UX for security tools"
      ],
      deliverables: ["Polished extension UI", "Settings page"]
    },

    {
      id: 9,
      title: "Testing & validation",
      duration: "1–2 weeks",
      languages: ["Python, JavaScript"],
      implementation: [
        "Unit tests for feature extraction + model inference (pytest, jest)",
        "Integration tests for extension + backend (Cypress for E2E)",
        "Performance / load tests on the inference endpoint and extension responsiveness"
      ],
      research: [
        "How to build adversarial tests for URL obfuscation and evasion techniques",
        "Metrics and acceptance thresholds from the kickoff spec"
      ],
      deliverables: ["Test suite", "Test report (latency, accuracy under load)"]
    },

    {
      id: 10,
      title: "Deployment & CI/CD",
      duration: "1–2 weeks",
      languages: ["Docker, GitHub Actions / GitLab CI"],
      implementation: [
        "Containerize backend + model server; create scripts for staging and production deployments",
        "Set up CI to run tests and build extension artifacts; create release process for the extension",
        "Optional: deploy on small cloud instance (DigitalOcean / Heroku / AWS)"
      ],
      research: [
        "Policies for publishing browser extensions to Chrome Web Store and Firefox Add-ons",
        "Cost estimates for hosting inference API at expected usage levels"
      ],
      deliverables: ["CI pipeline", "Deployment playbook"]
    },

    {
      id: 11,
      title: "Documentation, report & demo",
      duration: "1 week",
      languages: ["Markdown, PowerPoint"],
      implementation: [
        "Write README with setup steps, data sources, and a model card",
        "Prepare a presentation (slide deck) demonstrating architecture, dataset, and evaluation",
        "Create a short demo script and recorded demo video if required"
      ],
      research: ["How to write reproducible experiment logs and prefer open-sourcing datasets when permissible"],
      deliverables: ["Final report / slides", "Demo recording"]
    },

    {
      id: 12,
      title: "Extensions & future work",
      duration: "optional",
      languages: ["Kotlin/Swift (mobile), Serverless"],
      implementation: [
        "Mobile app wrapper or SDK for in-app link checking",
        "Partner with threat feeds or set up community reporting and feedback loop",
        "Continuous learning pipeline to re-train model from verified reports"
      ],
      research: ["Feasibility of mobile in-app checks and privacy implications"],
      deliverables: ["Roadmap for v2 (mobile + partnerships)"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100 p-8">
      <header className="max-w-5xl mx-auto flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-semibold">Fake Link Detector — Interactive Roadmap</h1>
          <p className="mt-1 text-sm text-gray-300">Step-by-step plan, languages, implementation notes and research pointers for your college project.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => window.print()} className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white rounded-md px-3 py-2"> 
            <DownloadCloud size={16} /> Export / Print
          </button>
          <a className="inline-flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md px-3 py-2" href="#top">
            <FileText size={16} /> Project PPT
          </a>
        </div>
      </header>

      <main className="max-w-5xl mx-auto mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {steps.map((s) => (
          <motion.article
            key={s.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.18 + s.id * 0.01 }}
            className={`rounded-2xl p-5 bg-gradient-to-br from-gray-850/60 to-gray-850/30 border border-gray-700`}
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-teal-400 flex items-center justify-center text-gray-900 font-bold">{s.id}</div>
                  <div>
                    <h3 className="text-lg font-semibold">{s.title}</h3>
                    <p className="text-xs text-gray-400">Duration: {s.duration} • Languages: {s.languages.join(", ")}</p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setOpenId(openId === s.id ? null : s.id)}
                aria-expanded={openId === s.id}
                className="p-2 rounded-md hover:bg-gray-700"
              >
                <ChevronDown className={`transform transition-transform ${openId === s.id ? "rotate-180" : "rotate-0"}`} />
              </button>
            </div>

            {openId === s.id && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 text-sm text-gray-200">
                <h4 className="font-medium">Implementation</h4>
                <ul className="mt-2 ml-4 list-disc space-y-1">
                  {s.implementation.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ul>

                <h4 className="font-medium mt-3">Research pointers</h4>
                <ul className="mt-2 ml-4 list-disc space-y-1">
                  {s.research.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>

                <h4 className="font-medium mt-3">Deliverables</h4>
                <ul className="mt-2 ml-4 list-disc space-y-1">
                  {s.deliverables.map((d, i) => (
                    <li key={i}>{d}</li>
                  ))}
                </ul>

                <div className="mt-4 text-xs text-gray-400">Tip: click other cards to compare timelines and dependencies. Use the Export / Print button to save this roadmap as PDF.</div>
              </motion.div>
            )}
          </motion.article>
        ))}
      </main>

      <footer className="max-w-5xl mx-auto mt-8 text-gray-400 text-sm">Designed for your course project — use the roadmap items as checklist tasks for each sprint.</footer>
    </div>
  );
}
