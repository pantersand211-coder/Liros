"use client";
import { useEffect, useRef, useState } from "react";
import { demo, type Scenario } from "@/content/da";
import { track } from "@/lib/analytics";

const LAST = 4;

function Thread({ s, step }: { s: Scenario; step: number }) {
  const cls = (n: number) => `dstep ${step >= n ? "on" : "off"}`;
  return (
    <ol className="dsteps">
      <li className={cls(1)} aria-label={`Trin 1: ${demo.steps[0]}`}>
        <span className="dlabel">1 · {demo.steps[0]} <span className="muted">({s.channel})</span></span>
        <div className="bubble"><strong>{s.customer}</strong><p>{s.customerMessage}</p></div>
      </li>
      <li className={cls(2)} aria-label={`Trin 2: ${demo.steps[1]}`}>
        <span className="dlabel">2 · {demo.steps[1]}</span>
        <ul className="sources">
          {s.sources.map((x, i) => <li key={i}><span className="src">{x.system}</span>{x.text}</li>)}
        </ul>
      </li>
      <li className={cls(3)} aria-label={`Trin 3: ${demo.steps[2]}`}>
        <span className="dlabel">3 · {s.outcome.kind === "approval" ? "Forslag" : "Svar"}</span>
        <div className="bubble reply"><p>{s.answer}</p></div>
      </li>
      <li className={cls(4)} aria-label={`Trin 4: ${demo.steps[3]}`}>
        <span className="dlabel">4 · {demo.steps[3]}</span>
        <div className={`outcome ${s.outcome.kind}`}>
          <strong><span className="dot" aria-hidden="true" />{s.outcome.title}</strong>
          <p>{s.outcome.detail}</p>
        </div>
      </li>
    </ol>
  );
}

export function Demo() {
  const [idx, setIdx] = useState(0);
  const [step, setStep] = useState(LAST); // server-render viser hele kæden (virker uden JS/animation)
  const [playing, setPlaying] = useState(false);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);
  const s = demo.scenarios[idx];

  const stop = () => { if (timer.current) clearInterval(timer.current); timer.current = null; setPlaying(false); };
  useEffect(() => stop, []);

  const pick = (i: number) => { stop(); setIdx(i); setStep(LAST); track("product_demo_interaction", { scenario: demo.scenarios[i].id, action: "select" }); };
  const play = () => {
    stop(); setStep(1); setPlaying(true);
    track("product_demo_interaction", { scenario: s.id, action: "play" });
    let n = 1;
    timer.current = setInterval(() => {
      n += 1; setStep(n);
      if (n >= LAST) stop();
    }, 1300);
  };
  const next = () => { stop(); setStep((v) => Math.min(LAST, v + 1)); track("product_demo_interaction", { scenario: s.id, action: "next" }); };
  const restart = () => { stop(); setStep(1); track("product_demo_interaction", { scenario: s.id, action: "restart" }); };

  return (
    <div className="demo">
      <div className="demo-tabs" role="group" aria-label="Vælg eksempel">
        {demo.scenarios.map((sc, i) => (
          <button key={sc.id} className="chip" aria-pressed={i === idx} onClick={() => pick(i)}>{sc.label}</button>
        ))}
      </div>
      <div className="window" role="region" aria-label={`Eksempel: ${s.label}`}>
        <div className="window-bar">
          <span>{demo.shop} · indbakke</span>
          <span className="badge">{demo.badge}</span>
        </div>
        <Thread s={s} step={step} />
        <p className="sr-only" aria-live="polite">Trin {step} af {LAST}: {demo.steps[step - 1]}</p>
      </div>
      <div className="demo-controls">
        <button className="btn btn-secondary btn-sm" onClick={play} disabled={playing}>{playing ? demo.controls.playing : demo.controls.play}</button>
        <button className="btn btn-secondary btn-sm" onClick={next} disabled={step >= LAST}>{demo.controls.next}</button>
        <button className="btn btn-secondary btn-sm" onClick={restart}>{demo.controls.restart}</button>
        <span className="muted small" aria-hidden="true">Trin {step} af {LAST}</span>
      </div>
    </div>
  );
}
