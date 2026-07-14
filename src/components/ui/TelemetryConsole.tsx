'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Play, RotateCw, AlertTriangle, Cpu, Terminal, Sliders, Activity } from 'lucide-react';
import { Card } from './Card';

export const TelemetryConsole: React.FC = () => {
  const [mcuState, setMcuState] = useState<'RUNNING' | 'CALIBRATING' | 'IDLE' | 'ERROR'>('RUNNING');
  const [voltage, setVoltage] = useState(5.00);
  const [mcuTemp, setMcuTemp] = useState(37.5);
  const [blinkSpeed, setBlinkSpeed] = useState(2); // Hz
  const [isRadarSweeping, setIsRadarSweeping] = useState(true);
  const [logs, setLogs] = useState<string[]>([
    '[BOOT] FreeRTOS v10.4.3 started successfully.',
    '[SYSTEM] Mounting ultrasonic pathfinder on pin A0...',
    '[SYSTEM] MPU6050 complementary filter initialized.',
    '[TELEMETRY] Serial UART interface opened at 115200 baud.'
  ]);
  const [radarAngle, setRadarAngle] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logContainerRef = useRef<HTMLDivElement>(null);
  const waveOffset = useRef(0);
  const noiseSpike = useRef(0);

  // Auto-scroll logs
  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [logs]);

  // Telemetry loop
  useEffect(() => {
    const interval = setInterval(() => {
      if (mcuState !== 'RUNNING') return;

      // Simulate slight voltage and temp fluctuations
      const vJitter = (Math.random() - 0.5) * 0.04;
      const tJitter = (Math.random() - 0.5) * 0.2;
      setVoltage(prev => Number((5.00 + vJitter + noiseSpike.current).toFixed(2)));
      setMcuTemp(prev => Number((37.5 + tJitter).toFixed(1)));

      if (noiseSpike.current > 0) {
        noiseSpike.current -= 0.15; // Cool down noise spike
        if (noiseSpike.current < 0) noiseSpike.current = 0;
      }

      // Simulate radar sweeps
      if (isRadarSweeping) {
        setRadarAngle(prev => {
          const next = (prev + 15) % 360;
          if (next % 90 === 0) {
            const mockDist = Math.floor(Math.random() * 80) + 15;
            setLogs(prevLogs => [
              ...prevLogs.slice(-15),
              `[RADAR] Scan at ${next}°: Obstacle detected at ${mockDist} cm.`
            ]);
          }
          return next;
        });
      }
    }, 200);

    return () => clearInterval(interval);
  }, [mcuState, isRadarSweeping]);

  // Live Oscilloscope drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;

    const render = () => {
      ctx.fillStyle = '#09090b';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw grid lines
      ctx.strokeStyle = 'rgba(24, 24, 27, 0.6)';
      ctx.lineWidth = 1;
      const gridSpacing = 20;
      for (let x = 0; x < canvas.width; x += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSpacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw wave path
      ctx.strokeStyle = mcuState === 'ERROR' ? '#ef4444' : '#10b981';
      ctx.shadowColor = mcuState === 'ERROR' ? 'rgba(239, 68, 68, 0.4)' : 'rgba(16, 185, 129, 0.4)';
      ctx.shadowBlur = 6;
      ctx.lineWidth = 2;
      ctx.beginPath();

      const centerY = canvas.height / 2;
      for (let x = 0; x < canvas.width; x++) {
        const angle = (x / canvas.width) * Math.PI * 4 + waveOffset.current;
        // Base sine wave + random high frequency noise + custom injection spike
        const base = Math.sin(angle) * 15;
        const noise = (Math.random() - 0.5) * 2;
        const spike = Math.sin(angle * 3) * noiseSpike.current * 20;
        
        const y = centerY + base + noise + spike;
        
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.shadowBlur = 0; // Reset shadow

      waveOffset.current += 0.08;
      animationId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animationId);
  }, [mcuState]);

  // Action: Reset MCU
  const triggerReset = () => {
    setMcuState('CALIBRATING');
    setLogs(prev => [
      ...prev.slice(-15),
      '[SYSTEM] MCU Reset Command Received.',
      '[SYSTEM] Halting task scheduler...',
      '[BOOT] Performing self-diagnostic check...',
      '[BOOT] Internal flash memory validation: OK.',
      '[BOOT] Restoring system context... done.'
    ]);

    setTimeout(() => {
      setMcuState('RUNNING');
      setLogs(prev => [
        ...prev.slice(-15),
        '[BOOT] FreeRTOS reboot cycles completed successfully.',
        '[SYSTEM] Calibration complete. Resuming task execution.'
      ]);
    }, 1500);
  };

  // Action: Inject Noise
  const injectNoise = () => {
    noiseSpike.current = 2.0;
    setLogs(prev => [
      ...prev.slice(-15),
      '[WARN] ADC Input Noise Injection triggered on Pin A0!',
      `[WARN] High Jitter detected on A0: ${voltage}V threshold exceeded.`
    ]);
  };

  return (
    <div className="relative group w-full max-w-4xl mx-auto py-12 px-6">
      
      {/* CAD Schematic corner crosshairs */}
      <span className="absolute top-8 left-2 text-zinc-800 font-mono text-xs select-none pointer-events-none">+</span>
      <span className="absolute top-8 right-2 text-zinc-800 font-mono text-xs select-none pointer-events-none">+</span>
      <span className="absolute bottom-8 left-2 text-zinc-800 font-mono text-xs select-none pointer-events-none">+</span>
      <span className="absolute bottom-8 right-2 text-zinc-800 font-mono text-xs select-none pointer-events-none">+</span>

      <div className="text-center flex flex-col gap-2 mb-8">
        <span className="text-xs font-mono tracking-widest text-emerald-400 uppercase">HIL Diagnostics Console</span>
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mt-1">Interactive Telemetry Hub</h2>
        <p className="text-zinc-400 text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed">
          Simulate diagnostic checks, inject ADC sensor noise, and watch the visual oscilloscope feed adjust in real-time.
        </p>
      </div>

      <Card className="border border-zinc-900 bg-zinc-950/20 p-6 md:p-8 flex flex-col gap-6 relative overflow-hidden">
        
        {/* Dynamic header row with simulated LED status */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-zinc-900 pb-4">
          <div className="flex items-center gap-3">
            <Cpu className="w-5 h-5 text-emerald-400" />
            <div className="flex flex-col">
              <span className="text-xs font-mono text-zinc-500">MCU-01 STATUS</span>
              <span className={`text-sm font-mono font-bold ${
                mcuState === 'RUNNING' ? 'text-emerald-400' :
                mcuState === 'CALIBRATING' ? 'text-amber-400 animate-pulse' :
                'text-red-500'
              }`}>
                {mcuState}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-mono text-zinc-500">ADC VOLTAGE</span>
              <span className="text-sm font-mono font-bold text-white">{voltage} V</span>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-mono text-zinc-500">CORE TEMP</span>
              <span className="text-sm font-mono font-bold text-white">{mcuTemp} °C</span>
            </div>
            {/* Blinking physical-LED widget */}
            <div className="flex items-center gap-2">
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-mono text-zinc-500">SYS_LED</span>
                <span className="text-[10px] font-mono text-zinc-400">{blinkSpeed} Hz</span>
              </div>
              <div 
                className={`w-3.5 h-3.5 rounded-full bg-emerald-500 transition-opacity`}
                style={{
                  animation: mcuState === 'RUNNING' ? `pulse ${1 / blinkSpeed}s infinite alternate` : 'none',
                  opacity: mcuState === 'CALIBRATING' ? 0.3 : 1,
                  boxShadow: mcuState === 'RUNNING' ? '0 0 10px rgba(16,185,129,0.8)' : 'none'
                }}
              />
            </div>
          </div>
        </div>

        {/* Dashboard Panels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Column 1: Live Oscilloscope (Canvas) */}
          <div className="md:col-span-8 flex flex-col gap-2">
            <div className="flex items-center justify-between text-xs font-mono text-zinc-500">
              <span className="flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-emerald-400" />
                Live Channel A (Obstacle Signal)
              </span>
              <span>TIME DIV: 50ms</span>
            </div>
            <div className="relative rounded-xl border border-zinc-900 overflow-hidden bg-zinc-950/80">
              <canvas 
                ref={canvasRef} 
                width={500} 
                height={180} 
                className="w-full h-[180px] block"
              />
            </div>
          </div>

          {/* Column 2: Dashboard controls */}
          <div className="md:col-span-4 flex flex-col gap-4 justify-between border-t md:border-t-0 md:border-l border-zinc-900/60 pt-4 md:pt-0 md:pl-6">
            <div className="flex flex-col gap-4">
              <span className="text-xs font-mono font-bold tracking-wider text-emerald-400 uppercase flex items-center gap-1.5">
                <Sliders className="w-4 h-4" />
                Controls
              </span>

              {/* Blink Speed slider */}
              <div className="flex flex-col gap-1.5">
                <div className="flex justify-between text-[11px] font-mono">
                  <span className="text-zinc-500">LED PWM SPEED</span>
                  <span className="text-white">{blinkSpeed} Hz</span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="10" 
                  value={blinkSpeed}
                  onChange={(e) => setBlinkSpeed(Number(e.target.value))}
                  disabled={mcuState !== 'RUNNING'}
                  className="w-full accent-emerald-500 h-1 bg-zinc-900 rounded-lg cursor-pointer"
                />
              </div>

              {/* Radar sweep toggle */}
              <div className="flex items-center justify-between pt-2">
                <div className="flex flex-col">
                  <span className="text-xs font-mono text-white">Radar Sweep</span>
                  <span className="text-[10px] font-mono text-zinc-500">Angle: {radarAngle}°</span>
                </div>
                <button
                  onClick={() => setIsRadarSweeping(!isRadarSweeping)}
                  disabled={mcuState !== 'RUNNING'}
                  className={`w-10 h-6 rounded-full p-1 transition-colors duration-300 ${
                    isRadarSweeping ? 'bg-emerald-500' : 'bg-zinc-800'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-zinc-950 transition-transform duration-300 ${
                    isRadarSweeping ? 'translate-x-4' : 'translate-x-0'
                  }`} />
                </button>
              </div>
            </div>

            {/* Micro Dashboard action triggers */}
            <div className="flex flex-col gap-2 pt-4 border-t border-zinc-900/60">
              <button
                onClick={injectNoise}
                disabled={mcuState !== 'RUNNING'}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-300 font-bold hover:text-white hover:border-zinc-700 transition-colors font-mono text-[10px] uppercase"
              >
                <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
                Inject ADC Noise
              </button>
              <button
                onClick={triggerReset}
                disabled={mcuState === 'CALIBRATING'}
                className="w-full flex items-center justify-center gap-2 py-2 rounded-lg bg-emerald-500 text-zinc-950 font-bold hover:bg-emerald-400 transition-colors font-mono text-[10px] uppercase"
              >
                <RotateCw className="w-3.5 h-3.5" />
                Reset MCU
              </button>
            </div>

          </div>
        </div>

        {/* Micro-Terminal Diagnostics logs footer */}
        <div className="flex flex-col gap-2 border-t border-zinc-900/60 pt-4">
          <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-500">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            UART Serial Monitor
          </div>
          <div 
            ref={logContainerRef}
            className="w-full h-24 bg-zinc-950 rounded-xl border border-zinc-900 p-3 overflow-y-auto font-mono text-[10px] text-emerald-500/90 flex flex-col gap-1 select-text scrollbar-thin scrollbar-thumb-zinc-800"
          >
            {logs.map((log, idx) => (
              <div key={idx} className="leading-relaxed whitespace-pre-wrap">
                {log}
              </div>
            ))}
          </div>
        </div>

      </Card>
      
      {/* Styles for flashing indicator */}
      <style jsx>{`
        @keyframes pulse {
          0% { opacity: 0.2; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};
