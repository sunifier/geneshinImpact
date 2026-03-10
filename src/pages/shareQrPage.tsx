import { useMemo } from "react";
import { QRCodeSVG } from "qrcode.react";
import { toast } from "sonner";

export default function ShareQrPage() {
  const shareUrl = useMemo(() => `${window.location.origin}/share`, []);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareUrl);
    toast.success("Share link copied");
  };

  return (
    <div className="min-h-screen bg-background text-foreground px-6 py-24">
      <div className="max-w-3xl mx-auto">
        <div className="glass-panel p-8 md:p-10">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-3">
            Public dossier access
          </p>

          <h1 className="chapter-title text-3xl md:text-4xl mb-4">
            Scan to open the dossier
          </h1>

          <p className="text-muted-foreground mb-8 max-w-2xl">
            This QR opens the dossier directly in client view, without the access-code screen.
          </p>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="bg-white rounded-2xl p-4">
              <QRCodeSVG value={shareUrl} size={280} />
            </div>

            <div className="flex-1 space-y-4">
              <div className="glass-panel p-4 break-all text-sm">
                {shareUrl}
              </div>

              <button
                onClick={handleCopy}
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-4 py-3 text-sm font-medium tracking-wider uppercase transition-all"
              >
                Copy link
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}