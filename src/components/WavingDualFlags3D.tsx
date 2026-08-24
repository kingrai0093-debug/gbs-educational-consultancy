import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, Sparkles, Wind } from "lucide-react";

interface WavingDualFlags3DProps {
  className?: string;
  intensity?: number;
  speed?: number;
  showControls?: boolean;
  showOverlayLighting?: boolean;
  showBadge?: boolean;
}

/**
 * High-performance 3D Cloth Simulation of South Korea & Nepal Flags
 * Features multi-harmonic wave physics, normal map bump-lighting computation,
 * satin sheen, and realistic cloth fold shadows running smoothly at 60fps.
 */
export const WavingDualFlags3D: React.FC<WavingDualFlags3DProps> = ({
  className = "w-full h-full",
  intensity = 1.0,
  speed = 1.0,
  showControls = false,
  showOverlayLighting = true,
  showBadge = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [waveMode, setWaveMode] = useState<"gentle" | "breeze" | "cinematic">("cinematic");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    // Offscreen Canvas to pre-render the dual flag texture (South Korea Left/Half + Nepal Right/Half seamlessly joined)
    const texW = 1000;
    const texH = 600;
    const texCanvas = document.createElement("canvas");
    texCanvas.width = texW;
    texCanvas.height = texH;
    const tctx = texCanvas.getContext("2d");

    if (tctx) {
      // 1. Base Background Split (Left Korea White/Silver satin, Right Nepal Deep Blue/Crimson satin)
      const gradBg = tctx.createLinearGradient(0, 0, texW, 0);
      gradBg.addColorStop(0, "#ffffff");
      gradBg.addColorStop(0.49, "#f8fafc");
      gradBg.addColorStop(0.50, "#003893");
      gradBg.addColorStop(1, "#002060");
      tctx.fillStyle = gradBg;
      tctx.fillRect(0, 0, texW, texH);

      // Fine woven silk cloth grain lines across full surface
      tctx.strokeStyle = "rgba(0,0,0,0.035)";
      tctx.lineWidth = 1;
      for (let i = 0; i < texW; i += 3) {
        tctx.beginPath();
        tctx.moveTo(i, 0);
        tctx.lineTo(i, texH);
        tctx.stroke();
      }

      // ==========================================
      // LEFT HALF (0 to texW/2): SOUTH KOREA (TAEGEUKGI) - FULL BLEED, NO SPACE
      // ==========================================
      tctx.save();
      const kw = texW / 2;
      const kh = texH;
      const kx = 0;
      const ky = 0;

      // Full Left Half Pure Satin White
      tctx.fillStyle = "#ffffff";
      tctx.fillRect(kx, ky, kw, kh);

      // Center of Taegeuk (Centered on left half)
      const tCenterX = kw / 2;
      const tCenterY = kh / 2;
      const tRadius = kh * 0.28; // ~168px

      tctx.save();
      tctx.translate(tCenterX, tCenterY);
      tctx.rotate(-Math.PI / 5.5); // South Korea standard Taegeuk tilt angle

      // Top Red Semi-circle and curves (Yang)
      tctx.beginPath();
      tctx.fillStyle = "#cd2e3a"; // South Korea Standard Flag Red
      tctx.arc(0, 0, tRadius, Math.PI, 0, false);
      tctx.arc(tRadius / 2, 0, tRadius / 2, 0, Math.PI, false);
      tctx.arc(-tRadius / 2, 0, tRadius / 2, 0, Math.PI, true);
      tctx.closePath();
      tctx.fill();

      // Bottom Blue Semi-circle and curves (Eum)
      tctx.beginPath();
      tctx.fillStyle = "#0047a0"; // South Korea Standard Flag Blue
      tctx.arc(0, 0, tRadius, 0, Math.PI, false);
      tctx.arc(tRadius / 2, 0, tRadius / 2, 0, Math.PI, false);
      tctx.arc(-tRadius / 2, 0, tRadius / 2, 0, Math.PI, true);
      tctx.closePath();
      tctx.fill();
      tctx.restore();

      // Draw 4 Black Trigrams (Geon, Gon, Gam, Ri)
      const drawBar = (bx: number, by: number, barW: number, barH: number, isSplit = false) => {
        tctx.fillStyle = "#0a0a0a";
        if (!isSplit) {
          tctx.fillRect(bx - barW / 2, by - barH / 2, barW, barH);
        } else {
          const half = (barW - 8) / 2;
          tctx.fillRect(bx - barW / 2, by - barH / 2, half, barH);
          tctx.fillRect(bx + barW / 2 - half, by - barH / 2, half, barH);
        }
      };

      const drawTrigram = (angle: number, splitPattern: boolean[]) => {
        tctx.save();
        tctx.translate(tCenterX, tCenterY);
        tctx.rotate(angle);
        const dist = tRadius * 1.52;
        const bW = 68;
        const bH = 10;
        const gap = 7;

        for (let b = 0; b < 3; b++) {
          const yOff = (b - 1) * (bH + gap);
          drawBar(0, -dist + yOff, bW, bH, splitPattern[b]);
        }
        tctx.restore();
      };

      // 1. Top-Left: Geon (Heaven ☰ - 3 solid)
      drawTrigram(-Math.PI * 0.68, [false, false, false]);
      // 2. Bottom-Right: Gon (Earth ☷ - 3 split)
      drawTrigram(Math.PI * 0.32, [true, true, true]);
      // 3. Top-Right: Gam (Water ☵ - split, solid, split)
      drawTrigram(-Math.PI * 0.32, [true, false, true]);
      // 4. Bottom-Left: Ri (Fire ☲ - solid, split, solid)
      drawTrigram(Math.PI * 0.68, [false, true, false]);

      tctx.restore();

      // ==========================================
      // RIGHT HALF (texW/2 to texW): NEPAL FLAG - FULL BLEED, ZERO EMPTY SPACE
      // ==========================================
      tctx.save();
      const nLeft = texW / 2;
      const nTop = 0;
      const nWidth = texW / 2;
      const nHeight = texH;

      // Full deep blue satin background for the right half to ensure ZERO empty space
      tctx.fillStyle = "#002b70";
      tctx.fillRect(nLeft, nTop, nWidth, nHeight);

      // Outer Deep Blue Border Polygon (Spanning full height)
      tctx.beginPath();
      tctx.fillStyle = "#003893"; // Official Nepal Blue Border
      tctx.moveTo(nLeft, 0);
      tctx.lineTo(nLeft + nWidth * 0.98, nHeight * 0.48);
      tctx.lineTo(nLeft + nWidth * 0.42, nHeight * 0.48);
      tctx.lineTo(nLeft + nWidth * 0.99, nHeight);
      tctx.lineTo(nLeft, nHeight);
      tctx.closePath();
      tctx.fill();

      // Inner Crimson Red Field Polygon (Spanning full triangles)
      const borderPad = 16;
      tctx.beginPath();
      tctx.fillStyle = "#dc143c"; // Official Nepal Crimson Red
      tctx.moveTo(nLeft + borderPad, borderPad * 1.4);
      tctx.lineTo(nLeft + nWidth * 0.90, nHeight * 0.46);
      tctx.lineTo(nLeft + nWidth * 0.36, nHeight * 0.46);
      tctx.lineTo(nLeft + nWidth * 0.91, nHeight - borderPad);
      tctx.lineTo(nLeft + borderPad, nHeight - borderPad);
      tctx.closePath();
      tctx.fill();

      // 1. Top Pennant: Moon Crescent & Sun Emblem
      const moonX = nLeft + nWidth * 0.28;
      const moonY = nHeight * 0.26;
      tctx.save();
      tctx.translate(moonX, moonY);
      tctx.fillStyle = "#ffffff";

      // Crescent Moon
      tctx.beginPath();
      tctx.arc(0, 0, 32, 0.15 * Math.PI, 0.85 * Math.PI, false);
      tctx.arc(0, -8, 26, 0.88 * Math.PI, 0.12 * Math.PI, true);
      tctx.closePath();
      tctx.fill();

      // Moon Central Sun with 8 rays
      tctx.beginPath();
      tctx.arc(0, 6, 10, 0, Math.PI * 2);
      tctx.fill();
      for (let r = 0; r < 8; r++) {
        const ang = (r * Math.PI) / 4;
        tctx.beginPath();
        tctx.moveTo(Math.cos(ang) * 12, 6 + Math.sin(ang) * 12);
        tctx.lineTo(Math.cos(ang) * 22, 6 + Math.sin(ang) * 22);
        tctx.strokeStyle = "#ffffff";
        tctx.lineWidth = 3;
        tctx.stroke();
      }
      tctx.restore();

      // 2. Bottom Pennant: 12-Rayed Sun Emblem
      const sunX = nLeft + nWidth * 0.30;
      const sunY = nHeight * 0.72;
      tctx.save();
      tctx.translate(sunX, sunY);
      tctx.fillStyle = "#ffffff";

      // Center Disc
      tctx.beginPath();
      tctx.arc(0, 0, 24, 0, Math.PI * 2);
      tctx.fill();

      // 12 Sharp Triangular Sun Rays
      for (let s = 0; s < 12; s++) {
        const ang = (s * Math.PI * 2) / 12;
        const outerR = 48;
        const innerR = 24;
        const tipX = Math.cos(ang) * outerR;
        const tipY = Math.sin(ang) * outerR;
        const baseAng1 = ang - Math.PI / 14;
        const baseAng2 = ang + Math.PI / 14;
        const b1x = Math.cos(baseAng1) * innerR;
        const b1y = Math.sin(baseAng1) * innerR;
        const b2x = Math.cos(baseAng2) * innerR;
        const b2y = Math.sin(baseAng2) * innerR;

        tctx.beginPath();
        tctx.moveTo(tipX, tipY);
        tctx.lineTo(b1x, b1y);
        tctx.lineTo(b2x, b2y);
        tctx.closePath();
        tctx.fill();
      }
      tctx.restore();

      tctx.restore();

      // Seamless Golden Seam / Friendship Meridian in the Middle
      const seamGrad = tctx.createLinearGradient(texW / 2 - 8, 0, texW / 2 + 8, 0);
      seamGrad.addColorStop(0, "rgba(245, 158, 11, 0)");
      seamGrad.addColorStop(0.5, "rgba(245, 158, 11, 0.8)");
      seamGrad.addColorStop(1, "rgba(245, 158, 11, 0)");
      tctx.fillStyle = seamGrad;
      tctx.fillRect(texW / 2 - 8, 0, 16, texH);
    }

    // Cloth mesh resolution (Columns x Rows)
    const cols = 55;
    const rows = 35;

    // Resize Handler
    const handleResize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    // Main 3D Wave Simulation Render Loop
    const render = () => {
      if (!canvas || !ctx) return;

      const cw = canvas.width;
      const ch = canvas.height;

      ctx.clearRect(0, 0, cw, ch);

      // Multi-harmonic 3D wave calculation parameters
      const speedMult = waveMode === "gentle" ? 0.7 : waveMode === "breeze" ? 1.1 : 1.4;
      const currentSpeed = speed * speedMult;
      const ampMult = (waveMode === "gentle" ? 0.6 : waveMode === "breeze" ? 1.0 : 1.3) * intensity;

      if (isPlaying) {
        time += 0.028 * currentSpeed;
      }

      // Compute mesh vertices with sinusoidal harmonics & depth Z displacement
      const cellW = cw / cols;
      const cellH = ch / rows;

      // Render each quad tile in the waving mesh
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const u0 = c / cols;
          const u1 = (c + 1) / cols;
          const v0 = r / rows;
          const v1 = (r + 1) / rows;

          // 3D displacement function Z(u, v, time)
          const getDisplacement = (u: number, v: number) => {
            // Main diagonal traveling wave (wind blowing left-to-right & top-to-bottom)
            const w1 = Math.sin(u * 9.0 - time * 2.8 + v * 3.2) * 18 * ampMult;
            // Secondary ripple harmonic for realistic silk wrinkles
            const w2 = Math.sin(u * 18.0 - time * 4.2 - v * 6.5) * 8 * ampMult;
            // Micro flutter near right flying edge
            const flutter = Math.sin(u * 32.0 - time * 6.0) * (u * 10) * ampMult;
            // Deep diagonal swell
            const swell = Math.cos(u * 4.0 + v * 5.0 - time * 1.5) * 14 * ampMult;

            return w1 + w2 + flutter + swell;
          };

          // Positions of the quad corners
          const z00 = getDisplacement(u0, v0);
          const z10 = getDisplacement(u1, v0);
          const z01 = getDisplacement(u0, v1);
          const z11 = getDisplacement(u1, v1);

          // Projected 2D screen positions with perspective scale
          const x00 = u0 * cw;
          const y00 = v0 * ch + z00;
          const x10 = u1 * cw;
          const y10 = v0 * ch + z10;
          const x01 = u0 * cw;
          const y01 = v1 * ch + z01;
          const x11 = u1 * cw;
          const y11 = v1 * ch + z11;

          // Source texture coordinates
          const sx = u0 * texW;
          const sy = v0 * texH;
          const sw = (1 / cols) * texW;
          const sh = (1 / rows) * texH;

          // Draw slice from pre-rendered dual flag texture
          ctx.drawImage(texCanvas, sx, sy, sw, sh, x00, y00, cellW + 0.8, cellH + (z01 - z00) + 0.8);

          // ==========================================
          // 3D BUMP LIGHTING & SATIN SHADING PASS
          // ==========================================
          // Calculate surface slope (normal derivative approximation)
          const slopeX = (z10 - z00) / cellW;
          const slopeY = (z01 - z00) / cellH;

          // Directional Sunlight coming from top-left ([-0.6, -0.8, 1.0])
          const lightIntensity = (slopeX * -0.7 + slopeY * -0.9) * 0.45;

          if (lightIntensity > 0.02) {
            // Specular Sheen & Highlight
            const alpha = Math.min(lightIntensity * 1.4, 0.45);
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.fillRect(x00, y00, cellW + 0.8, cellH + (z01 - z00) + 0.8);
          } else if (lightIntensity < -0.02) {
            // Cloth Fold Shadowing
            const alpha = Math.min(Math.abs(lightIntensity) * 1.6, 0.55);
            ctx.fillStyle = `rgba(0, 0, 15, ${alpha})`;
            ctx.fillRect(x00, y00, cellW + 0.8, cellH + (z01 - z00) + 0.8);
          }
        }
      }

      // Vignette and Studio Rim Lighting (Cinematic Glow)
      if (showOverlayLighting) {
        const rim = ctx.createRadialGradient(cw / 2, ch / 2, ch * 0.3, cw / 2, ch / 2, cw * 0.7);
        rim.addColorStop(0, "rgba(0,0,0,0)");
        rim.addColorStop(0.75, "rgba(5, 10, 25, 0.35)");
        rim.addColorStop(1, "rgba(3, 7, 18, 0.75)");
        ctx.fillStyle = rim;
        ctx.fillRect(0, 0, cw, ch);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying, waveMode, intensity, speed, showOverlayLighting]);

  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full block object-cover filter contrast-[1.08] saturate-[1.12]"
      />

      {/* Floating Badge Indicator */}
      {showBadge && (
        <div className="absolute top-3 left-3 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-slate-700/60 text-white text-xs font-bold shadow-lg pointer-events-none">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
          </span>
          <span className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-200">
            <span>🇳🇵 Nepal</span>
            <span className="text-amber-400 font-bold">✕</span>
            <span>South Korea 🇰🇷</span>
          </span>
        </div>
      )}

      {/* Interactive Controls Overlay */}
      {showControls && (
        <div className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5 bg-slate-950/90 backdrop-blur-md p-1.5 rounded-xl border border-slate-800 text-xs shadow-xl">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white transition-colors"
            title={isPlaying ? "Pause waving" : "Play waving"}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 text-emerald-400" />}
          </button>

          <div className="h-4 w-px bg-slate-700 mx-0.5" />

          {(["gentle", "breeze", "cinematic"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setWaveMode(mode)}
              className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase transition-all capitalize ${
                waveMode === mode
                  ? "bg-red-600 text-white shadow-xs"
                  : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/80"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
