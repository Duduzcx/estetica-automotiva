import { useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// 50 frames do vídeo real da Mercedes CLA 45 AMG no estúdio
const FRAME_COUNT = 50;
const framePath = (i: number) => `/videos/gallery-seq/frame_${String(i + 1).padStart(3, '0')}.jpg`;

export function GalleryShowcase() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useGSAP(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
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
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      draw();
    };
    resize();
    window.addEventListener('resize', resize);

    for (let i = 0; i < FRAME_COUNT; i++) {
      const img = new Image();
      img.src = framePath(i);
      if (i === 0) img.onload = draw;
      images.push(img);
    }

    // A cena: chega pequeno → expande pra tela cheia → arrasta os frames → solta
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: wrapRef.current,
        start: 'top top',
        end: '+=160%',
        pin: true,
        scrub: 1,
        anticipatePin: 1,
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

    // Zoom interno lento (dá vida mesmo antes do vídeo real chegar)
    tl.fromTo(canvas, { scale: 1.18 }, { scale: 1, ease: 'none', duration: 1 }, 0);

    return () => window.removeEventListener('resize', resize);
  }, { scope: wrapRef });

  return (
    <div>
    <div ref={wrapRef} className="relative h-screen my-8 md:my-14">
      <div
        ref={frameRef}
        className="w-full h-full overflow-hidden will-change-transform relative"
        style={{ borderRadius: 28 }}
      >
        <canvas ref={canvasRef} className="w-full h-full block will-change-transform" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none"></div>
        <div className="absolute bottom-8 left-6 md:bottom-12 md:left-12 z-10">
          <p className="text-neve-blue font-bold tracking-[0.25em] uppercase text-[10px] md:text-xs mb-2 font-heading">Em ação</p>
          <p className="text-white text-2xl md:text-4xl font-bold max-w-md leading-tight">Brilho de showroom, feito em Jaguari.</p>
        </div>
      </div>
    </div>
    </div>
  );
}
