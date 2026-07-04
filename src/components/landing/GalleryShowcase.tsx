import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// 50 frames do vídeo real da Mercedes CLA 45 AMG no estúdio
const FRAME_COUNT = 30;
const framePath = (i: number) => `/videos/gallery-seq/frame_${String(i + 1).padStart(3, '0')}.jpg`;

export function GalleryShowcase() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useGSAP(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const images: HTMLImageElement[] = [];
    const proxy = { frame: 0 };

    const draw = () => {
      const img = images[Math.round(proxy.frame)];
      if (!img || !img.complete || img.naturalWidth === 0) return;
      const cw = canvas.width;
      const ch = canvas.height;
      const scale = Math.max(cw / img.naturalWidth, ch / img.naturalHeight);
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      ctx.drawImage(img, (cw - w) / 2, (ch - h) / 2, w, h);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      draw();
    };
    resize();
    window.addEventListener('resize', resize);

    // Economia de dados: os 50 frames só baixam quando a cena se aproxima
    let carregado = false;
    const carregarFrames = () => {
      if (carregado) return;
      carregado = true;
      for (let i = 0; i < FRAME_COUNT; i++) {
        const img = new Image();
        img.src = framePath(i);
        if (i === 0) img.onload = draw;
        img.decode?.().catch(() => {});
        images.push(img);
      }
    };
    const observer = new IntersectionObserver(
      (entries) => { if (entries[0].isIntersecting) { carregarFrames(); observer.disconnect(); } },
      { rootMargin: '150% 0px' }
    );
    if (wrapRef.current) observer.observe(wrapRef.current);

    // A cena: chega pequeno → expande pra tela cheia → arrasta os frames → solta
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapRef.current,
        start: 'top top',
        end: '+=100%',
        pin: true,
        scrub: 0.6,
        anticipatePin: 1,
        // Esconde o botão do WhatsApp enquanto o vídeo está em cena
        // (ele cobria a legenda) e traz de volta ao soltar
        onToggle: (self) => document.body.classList.toggle('fab-oculto', self.isActive),
      },
    });

    // Expansão: de card arredondado para tela cheia
    tl.fromTo(
      frameRef.current,
      { scale: 0.86, borderRadius: 28 },
      { scale: 1, borderRadius: 0, ease: 'power2.out', duration: 0.35 },
      0
    );

    // Frames passam durante quase todo o percurso
    if (FRAME_COUNT > 1) {
      tl.to(
        proxy,
        { frame: FRAME_COUNT - 1, ease: 'none', duration: 0.9, onUpdate: draw },
        0.08
      );
    }

    return () => { window.removeEventListener('resize', resize); observer.disconnect(); };
  }, { scope: wrapRef });

  return (
    <div>
    <div ref={wrapRef} className="relative h-[100svh] my-8 md:my-14">
      <div
        ref={frameRef}
        className="w-full h-full overflow-hidden will-change-transform relative"
        style={{ borderRadius: 28 }}
      >
        <canvas ref={canvasRef} className="w-full h-full block will-change-transform" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
        <div className="showcase-caption absolute bottom-20 left-6 md:bottom-14 md:left-12 z-10">
          <p className="text-neve-blue font-bold tracking-[0.25em] uppercase text-[10px] md:text-xs mb-2 font-heading">Em ação</p>
          <p className="text-white text-2xl md:text-4xl font-bold max-w-md leading-tight">Brilho de showroom, feito em Jaguari.</p>
        </div>
      </div>
    </div>
    </div>
  );
}
