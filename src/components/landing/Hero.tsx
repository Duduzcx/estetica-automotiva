import { useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// Sequência de frames (técnica de canvas: funciona em QUALQUER aparelho,
// diferente do seek de <video> que falha no Chrome mobile)
const FRAME_COUNT = 48;
// Versão do vídeo: os nomes dos arquivos de frame não mudam quando troco o
// vídeo, e como eles ficam em cache no navegador por 7 dias (bom pra
// velocidade), sem isso o celular do cliente continuaria mostrando o vídeo
// antigo mesmo depois do site atualizado. Bumped a cada troca de vídeo.
const FRAME_VERSION = 'v2';
const framePath = (i: number) => `/videos/seq/frame_${String(i + 1).padStart(3, '0')}.jpg?${FRAME_VERSION}`;

export function Hero() {
  const containerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useGSAP(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    // alpha:false = compositing mais barato (o fundo é sempre opaco)
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    const images: HTMLImageElement[] = [];
    const proxy = { frame: 0 };

    // Desenha cobrindo a tela toda (equivalente ao object-cover)
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
      // Os frames agora são 720x1280 (bem mais nítidos que antes), então
      // vale a pena desenhar em até 2x sem desperdiçar — só não vamos
      // além disso pra não pesar demais em celulares mais fracos
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      if (w === 0 || h === 0) return; // ainda não tem layout, espera o próximo evento
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      draw();
    };
    resize();
    // ResizeObserver em vez de 'resize' da window: o resize da window não
    // dispara em vários celulares quando só a barra de endereço some/aparece
    // durante o scroll, deixando o canvas com o buffer no tamanho errado
    // e a imagem esticada ("gorda") até o próximo evento. O ResizeObserver
    // pega qualquer mudança real de tamanho do próprio elemento.
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    // Pré-carrega os frames: o 1º entra na hora (é o que pinta a tela),
    // o resto espera o navegador ficar ocioso pra não brigar com o
    // carregamento inicial (CSS/JS/fontes) e deixar o site abrir mais rápido
    const frame0 = new Image();
    frame0.src = framePath(0);
    frame0.onload = draw;
    frame0.decode?.().catch(() => {});
    images.push(frame0);

    const carregarResto = () => {
      for (let i = 1; i < FRAME_COUNT; i++) {
        const img = new Image();
        img.src = framePath(i);
        img.decode?.().catch(() => {});
        images.push(img);
      }
    };
    if ('requestIdleCallback' in window) {
      (window as any).requestIdleCallback(carregarResto, { timeout: 2000 });
    } else {
      setTimeout(carregarResto, 300);
    }

    // Trava curta: prende meia tela enquanto os frames passam.
    // quickTo: UM tween reciclado pra vida toda, em vez de criar e
    // destruir um tween novo a cada pixel de scroll (era o desperdício)
    const irParaFrame = gsap.quickTo(proxy, 'frame', {
      duration: 0.4,
      ease: 'power1.out',
      onUpdate: draw,
    });

    ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: '+=50%',
      pin: true,
      anticipatePin: 1,
      onUpdate: (self) => irParaFrame(self.progress * (FRAME_COUNT - 1)),
    });

    return () => ro.disconnect();
  }, { scope: containerRef });

  const revealVariants: any = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
    },
  };
  const containerVariants: any = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
  };

  return (
    // Invólucro estável: o pin do GSAP reparenta a section AQUI DENTRO,
    // sem mexer nos vizinhos que o React usa como referência (fix do insertBefore)
    <div>
    <section id="inicio" ref={containerRef} className="relative h-[100svh] bg-black">
      <div className="sticky top-0 h-[100svh] overflow-hidden">

        {/* Frames do detalhamento desenhados em canvas */}
        <div className="absolute inset-0 z-0 w-full h-full">
          <canvas ref={canvasRef} className="w-full h-full" />
          <div className="absolute inset-0 bg-black/60"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/40"></div>
        </div>

        {/* Content Layer */}
        <div className="relative z-10 h-full">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center max-w-5xl mx-auto px-6 h-full flex flex-col justify-center items-center"
          >
            <motion.p variants={revealVariants} className="text-neve-blue font-bold tracking-[0.3em] uppercase text-xs md:text-sm font-heading mb-6">
              A excelência em cada milímetro
            </motion.p>

            <motion.h1 variants={revealVariants} className="text-5xl md:text-7xl lg:text-[6.5rem] font-bold text-white leading-[1.05] tracking-tight mb-8">
              Sua nave <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neve-blue to-white">impecável.</span>
            </motion.h1>

            <motion.p variants={revealVariants} className="text-lg md:text-xl text-gray-300 font-light leading-relaxed max-w-2xl mx-auto mb-12">
              Estética automotiva premium. Proteção, limpeza profunda e vitrificação. Brilho extremo e cuidado em cada detalhe.
            </motion.p>

            <motion.div variants={revealVariants}>
              <a href="#agendamento" className="inline-flex items-center justify-center bg-white text-black hover:bg-neve-blue hover:text-white px-10 py-5 rounded-full font-bold text-sm uppercase tracking-widest transition-all duration-500 hover:-translate-y-1">
                Agendar Avaliação
              </a>
            </motion.div>
          </motion.div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-white/30 animate-pulse z-20 pointer-events-none">
          <p className="text-xs uppercase tracking-[0.3em] mb-3 text-center">Deslize</p>
          <div className="w-[1px] h-16 bg-gradient-to-b from-white/50 to-transparent mx-auto"></div>
        </div>
      </div>
    </section>
    </div>
  );
}
