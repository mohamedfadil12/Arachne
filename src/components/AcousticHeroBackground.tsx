import React, { useEffect, useRef } from 'react';

export const AcousticHeroBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    // Spectrogram particles
    const particleCount = 48;
    const particles = Array.from({ length: particleCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 2 + 1,
      speedX: (Math.random() - 0.5) * 0.35,
      speedY: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.4 + 0.1,
      hue: Math.random() > 0.6 ? 42 : 196, // amber or sky cyan
    }));

    let time = 0;

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const render = () => {
      time += 0.018;
      ctx.clearRect(0, 0, width, height);

      // Deep Navy Radial Background
      const bgGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.45,
        50,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.75
      );
      bgGrad.addColorStop(0, '#02243d');
      bgGrad.addColorStop(0.5, '#001a2e');
      bgGrad.addColorStop(1, '#00101d');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Subtle Spectrogram FFT Frequency Grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
      ctx.lineWidth = 1;
      const gridSpacingX = 120;
      for (let gx = 0; gx < width; gx += gridSpacingX) {
        ctx.beginPath();
        ctx.moveTo(gx, 0);
        ctx.lineTo(gx, height);
        ctx.stroke();
      }
      const gridSpacingY = 80;
      for (let gy = 0; gy < height; gy += gridSpacingY) {
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.lineTo(width, gy);
        ctx.stroke();
      }

      // Draw Floating Spectrogram Energy Particles
      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle =
          p.hue === 42
            ? `rgba(251, 191, 36, ${p.alpha * 0.6})` // amber
            : `rgba(56, 189, 248, ${p.alpha * 0.6})`; // cyan
        ctx.fill();
      });

      // Grounding Anomaly Focus Region (Representing Candidate Temporal Flaw)
      // Pulsing between 40% and 65% of screen width
      const flawStart = width * 0.42;
      const flawEnd = width * 0.62;
      const pulseOpacity = 0.08 + 0.04 * Math.sin(time * 2.5);

      // Vertical flaw interval highlight
      const flawGrad = ctx.createLinearGradient(flawStart, 0, flawEnd, 0);
      flawGrad.addColorStop(0, `rgba(245, 158, 11, 0)`);
      flawGrad.addColorStop(0.2, `rgba(245, 158, 11, ${pulseOpacity})`);
      flawGrad.addColorStop(0.8, `rgba(245, 158, 11, ${pulseOpacity})`);
      flawGrad.addColorStop(1, `rgba(245, 158, 11, 0)`);
      ctx.fillStyle = flawGrad;
      ctx.fillRect(flawStart, 0, flawEnd - flawStart, height);

      // Flaw demarcation boundary lines
      ctx.strokeStyle = `rgba(245, 158, 11, ${0.25 + 0.15 * Math.sin(time * 2.5)})`;
      ctx.setLineDash([6, 6]);
      ctx.beginPath();
      ctx.moveTo(flawStart, 0);
      ctx.lineTo(flawStart, height);
      ctx.moveTo(flawEnd, 0);
      ctx.lineTo(flawEnd, height);
      ctx.stroke();
      ctx.setLineDash([]);

      // Baseline & Participant Multi-Harmonic Waves
      const midY = height * 0.58;
      const baselinePoints: [number, number][] = [];
      const participantPoints: [number, number][] = [];

      const step = 8;
      const mouseDistThreshold = 220;

      for (let x = 0; x <= width + step; x += step) {
        const nx = x / width;

        // Base harmonic components (representing speech pitch & formant envelope)
        const harm1 = Math.sin(nx * 9 + time * 1.2) * 28;
        const harm2 = Math.sin(nx * 18 - time * 1.8) * 14;
        const harm3 = Math.cos(nx * 32 + time * 0.8) * 7;
        const baselineWaveY = midY + harm1 + harm2 + harm3;

        // Participant wave correlates with baseline, but diverges strongly in the flaw region!
        let delta = 0;
        if (x >= flawStart - 50 && x <= flawEnd + 50) {
          const flawNorm = (x - flawStart) / (flawEnd - flawStart);
          const bellCurve = Math.sin(Math.max(0, Math.min(Math.PI, flawNorm * Math.PI)));
          // Measurable divergence gap (Z-Score delta burst)
          delta = bellCurve * (42 + Math.sin(time * 4) * 16);
        }

        let participantWaveY = baselineWaveY + delta + Math.sin(nx * 14 + time * 1.6) * 8;

        // Interactive mouse disturbance
        if (mouseRef.current.active) {
          const dx = x - mouseRef.current.x;
          const dist = Math.abs(dx);
          if (dist < mouseDistThreshold) {
            const influence = (1 - dist / mouseDistThreshold) * 32;
            participantWaveY += Math.sin(dist * 0.08 - time * 4) * influence;
          }
        }

        baselinePoints.push([x, baselineWaveY]);
        participantPoints.push([x, participantWaveY]);
      }

      // Draw Gap Fill Area between Baseline and Participant in the Flaw Zone (Measurable Gap)
      ctx.beginPath();
      for (let i = 0; i < baselinePoints.length; i++) {
        const [x, y] = baselinePoints[i];
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      for (let i = participantPoints.length - 1; i >= 0; i--) {
        const [x, y] = participantPoints[i];
        ctx.lineTo(x, y);
      }
      ctx.closePath();
      const fillGrad = ctx.createLinearGradient(0, midY - 60, 0, midY + 80);
      fillGrad.addColorStop(0, 'rgba(56, 189, 248, 0.05)');
      fillGrad.addColorStop(0.5, 'rgba(245, 158, 11, 0.12)');
      fillGrad.addColorStop(1, 'rgba(244, 63, 94, 0.04)');
      ctx.fillStyle = fillGrad;
      ctx.fill();

      // Render Baseline Reference Wave (Sky Cyan with Soft Glow)
      ctx.shadowBlur = 18;
      ctx.shadowColor = 'rgba(56, 189, 248, 0.6)';
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.75)';
      ctx.lineWidth = 2.2;
      ctx.beginPath();
      baselinePoints.forEach(([x, y], idx) => {
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();

      // Render Participant / Flawed Mirror Wave (Amber Gold / Rose Glow)
      ctx.shadowBlur = 22;
      ctx.shadowColor = 'rgba(245, 158, 11, 0.8)';
      ctx.strokeStyle = 'rgba(251, 191, 36, 0.9)';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      participantPoints.forEach(([x, y], idx) => {
        if (idx === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
      ctx.stroke();
      ctx.shadowBlur = 0; // reset

      // Acoustic Delta Marker Label inside Flaw Region
      const labelX = (flawStart + flawEnd) * 0.5;
      const labelY = midY - 80;
      ctx.font = '500 11px Inter, system-ui, sans-serif';
      ctx.fillStyle = 'rgba(251, 191, 36, 0.85)';
      ctx.textAlign = 'center';
      ctx.fillText('ANOMALY INTERVAL · Δz = +3.42σ', labelX, labelY);

      // Subtle indicator bar below label
      ctx.fillStyle = 'rgba(251, 191, 36, 0.4)';
      ctx.fillRect(labelX - 45, labelY + 6, 90, 1.5);

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-auto"
      style={{ filter: 'contrast(1.05)' }}
    />
  );
};
