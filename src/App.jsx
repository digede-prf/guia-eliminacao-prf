import { useState, useEffect } from "react";
import { setRegional, getRegional, trackEvent } from "./utils/analytics";
import { loadPrefs, savePrefs } from "./utils/storage";

import Header from "./components/Header";
import Home from "./components/Home";
import FAQScreen from "./components/FAQ";
import DecisionTree from "./components/DecisionTree";
import Calculator from "./components/Calculator";
import StepsScreen from "./components/Steps";
import ChecklistScreen from "./components/Checklist";
import Deadlines from "./components/Deadlines";
import Glossary from "./components/Glossary";
import Admin from "./components/Admin";
import Sorteio from "./components/Sorteio";
import Classificacao from "./components/Classificacao";
import FontControls from "./components/FontControls";

const SECTION_LABELS = {
  faq: "Perguntas Frequentes",
  decide: "Posso Eliminar",
  calc: "Calculadora",
  steps: "Passo a Passo",
  checklist: "Checklist",
  prazos: "Prazos",
  glossario: "Glossário",
  sorteio: "Sorteio de Amostra",
  classificacao: "Assistente de Classificação",
  admin: "Painel de Uso",
};

export default function App() {
  const [screen, setScreen] = useState("home");
  const [regional, setRegionalState] = useState(() => getRegional());

  // Accessibility
  const [fontScale, setFontScale] = useState(() => loadPrefs().fontScale);
  const [highContrast, setHighContrast] = useState(() => loadPrefs().highContrast);

  // Apply font scale
  useEffect(() => {
    document.documentElement.style.setProperty("--font-scale", fontScale);
    savePrefs({ fontScale, highContrast });
  }, [fontScale, highContrast]);

  // Apply high contrast
  useEffect(() => {
    if (highContrast) {
      document.documentElement.classList.add("high-contrast");
    } else {
      document.documentElement.classList.remove("high-contrast");
    }
  }, [highContrast]);

  const handleSetRegional = (r) => {
    setRegionalState(r);
    setRegional(r);
    if (r) trackEvent("regional_select", r);
  };

  const navigate = (sc) => {
    setScreen(sc);
    window.scrollTo(0, 0);
    if (sc !== "home") {
      trackEvent("section_view", SECTION_LABELS[sc] || sc);
    }
  };

  const goHome = () => navigate("home");

  // Keyboard shortcut for admin (Ctrl+Shift+A)
  useEffect(() => {
    const handler = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === "A") {
        navigate("admin");
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <>
      {screen === "home" && (
        <div className="min-h-screen bg-prf-50">
          <Header title="Guia da IN — Eliminação de Documentos" sub="Polícia Rodoviária Federal" />
          <Home
            regional={regional}
            setRegional={handleSetRegional}
            onNavigate={navigate}
          />
          {/* Discreet admin link */}
          <div className="text-center pb-4">
            <button
              onClick={() => navigate("admin")}
              className="text-xs text-gray-300 hover:text-gray-500 cursor-pointer underline"
              aria-label="Painel administrativo"
            >
              painel de uso
            </button>
          </div>
        </div>
      )}

      {screen === "faq" && <FAQScreen onBack={goHome} />}
      {screen === "decide" && <DecisionTree onBack={goHome} />}
      {screen === "calc" && <Calculator onBack={goHome} />}
      {screen === "steps" && <StepsScreen onBack={goHome} />}
      {screen === "checklist" && <ChecklistScreen onBack={goHome} />}
      {screen === "prazos" && <Deadlines onBack={goHome} />}
      {screen === "glossario" && <Glossary onBack={goHome} />}
      {screen === "sorteio" && <Sorteio onBack={goHome} />}
      {screen === "classificacao" && <Classificacao onBack={goHome} />}
      {screen === "admin" && <Admin onBack={goHome} />}

      <FontControls
        fontScale={fontScale}
        setFontScale={setFontScale}
        highContrast={highContrast}
        setHighContrast={setHighContrast}
      />
    </>
  );
}
