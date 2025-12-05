import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cloud Audit | Panel de Cumplimiento Multi-Nube",
  description: "Plataforma de auditoría de cumplimiento multi-nube de nivel empresarial con trazabilidad de datos en tiempo real, monitoreo de cumplimiento GDPR/AI Act y visualización de arquitectura de nube soberana.",
  keywords: ["auditoría nube", "multi-nube", "cumplimiento", "GDPR", "AI Act", "soberanía de datos", "trazabilidad"],
  authors: [{ name: "Equipo Cloud Audit" }],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#020617",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <head>
        {/* Preload critical resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Modo Presentación: activar por query (?presentacion=1) o preferencia guardada */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                function enablePresentation(on){
                  try {
                    var body = document.body;
                    if(!body) return;
                    if(on){
                      body.classList.add('presentation');
                      body.setAttribute('data-presentation','true');
                      localStorage.setItem('presentation','1');
                    } else {
                      body.classList.remove('presentation');
                      body.removeAttribute('data-presentation');
                      localStorage.removeItem('presentation');
                    }
                    window.dispatchEvent(new CustomEvent('presentation-mode-changed',{ detail: { enabled: on }}));
                  } catch(e){}
                }
                function init(){
                  try {
                    var params = new URLSearchParams(window.location.search);
                    var q = params.get('presentacion');
                    var saved = localStorage.getItem('presentation');
                    var shouldOn = (q === '1' || q === 'true') || (!!saved);
                    enablePresentation(shouldOn);
                  } catch(e){}
                }
                if(document.readyState === 'loading'){
                  document.addEventListener('DOMContentLoaded', init);
                } else { init(); }
                window.__togglePresentation = function(){
                  var on = !document.body.classList.contains('presentation');
                  enablePresentation(on);
                }
              })();
            `,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-slate-100`}
      >
        {children}
      </body>
    </html>
  );
}
