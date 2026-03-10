import { useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useDossierStore } from "@/stores/useDossierStore";
import LoginOverlay from "@/components/LoginOverlay";
import DossierHUD from "@/components/DossierHUD";
import CompletionModal from "@/components/CompletionModal";
import ProloguePage from "@/pages/ProloguePage";
import BriefingPage from "@/pages/BriefingPage";
import EvidenceBoardPage from "@/pages/EvidenceBoardPage";
import CaseBriefPage from "@/pages/CaseBriefPage";
import EvidenceIntakePage from "@/pages/EvidenceIntakePage";
import ForensicsLabPage from "@/pages/ForensicsLabPage";
import SegmentationPage from "@/pages/SegmentationPage";
import RiskEnginePage from "@/pages/RiskEnginePage";
import PublicVoicePage from "@/pages/PublicVoicePage";
import CrossViewPage from "@/pages/CrossViewPage";
import DeploymentPage from "@/pages/DeploymentPage";
import VerdictPage from "@/pages/VerdictPage";
import ValidationPage from "@/pages/ValidationPage";
import DiagnosticsPage from "@/pages/DiagnosticsPage";
import ShareEntryPage from "@/pages/ShareEntryPage";
import ShareQrPage from "@/pages/ShareQrPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

function AuthGate({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, viewMode, enterShareMode } = useDossierStore();
  const [checkedShare, setCheckedShare] = useState(false);

  useEffect(() => {
    const shareEnabled = window.localStorage.getItem("silent-whale-share") === "1";
    if (shareEnabled && (!isAuthenticated || viewMode !== "client")) {
      enterShareMode();
    }
    setCheckedShare(true);
  }, [isAuthenticated, viewMode, enterShareMode]);

  if (!checkedShare) return null;
  if (!isAuthenticated || !viewMode) return <LoginOverlay />;
  return <>{children}</>;
}

function DossierRoutes() {
  const { isShareMode, viewMode } = useDossierStore();

  return (
    <Routes>
      <Route path="/" element={<ProloguePage />} />
      <Route path="/briefing" element={<BriefingPage />} />
      <Route path="/evidence" element={<EvidenceBoardPage />} />
      <Route path="/case-brief" element={<CaseBriefPage />} />
      <Route path="/evidence-intake" element={<EvidenceIntakePage />} />
      <Route path="/forensics" element={<ForensicsLabPage />} />
      <Route path="/segmentation" element={<SegmentationPage />} />
      <Route path="/risk" element={<RiskEnginePage />} />
      <Route path="/public-voice" element={<PublicVoicePage />} />
      <Route path="/synthesis" element={<CrossViewPage />} />
      <Route path="/deployment" element={<DeploymentPage />} />
      <Route path="/verdict" element={<VerdictPage />} />
      <Route
        path="/internal/validation"
        element={!isShareMode && viewMode === "internal" ? <ValidationPage /> : <NotFound />}
      />
      <Route
        path="/internal/diagnostics"
        element={!isShareMode && viewMode === "internal" ? <DiagnosticsPage /> : <NotFound />}
      />
      <Route path="/share-qr" element={<ShareQrPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/share" element={<ShareEntryPage />} />
          <Route
            path="/*"
            element={
              <AuthGate>
                <DossierHUD />
                <CompletionModal />
                <DossierRoutes />
              </AuthGate>
            }
          />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;