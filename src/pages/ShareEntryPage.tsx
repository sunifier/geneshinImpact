import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDossierStore } from "@/stores/useDossierStore";

export default function ShareEntryPage() {
  const navigate = useNavigate();
  const enterShareMode = useDossierStore((s) => s.enterShareMode);

  useEffect(() => {
    window.localStorage.setItem("silent-whale-share", "1");
    enterShareMode();
    navigate("/", { replace: true });
  }, [enterShareMode, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
      <div className="text-center">
        <h1 className="chapter-title text-3xl mb-3">Opening Dossier…</h1>
        <p className="text-muted-foreground">Client view is loading.</p>
      </div>
    </div>
  );
}