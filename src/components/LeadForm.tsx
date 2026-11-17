"use client";
import { useRef, useState } from "react";
import { leadSchema, fieldErrors } from "@/lib/validate";
import { track } from "@/lib/analytics";

type State = "idle" | "sending" | "done" | "error";

export function LeadForm({ source = "book-demo" }: { source?: string }) {
  const [state, setState] = useState<State>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [serverError, setServerError] = useState("");
  const key = useRef<string>("");
  const inflight = useRef(false);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (inflight.current) return; // beskyt mod dobbeltklik
    const fd = new FormData(e.currentTarget);
    if (!key.current) key.current = crypto.randomUUID();
    const raw = {
      name: String(fd.get("name") ?? ""), email: String(fd.get("email") ?? ""), shopUrl: String(fd.get("shopUrl") ?? ""),
      message: String(fd.get("message") ?? ""), website: String(fd.get("website") ?? ""), idempotencyKey: key.current, source,
    };
    const parsed = leadSchema.safeParse(raw);
    if (!parsed.success) { setErrors(fieldErrors(parsed.error)); setState("idle"); return; }
    setErrors({}); setServerError(""); setState("sending"); inflight.current = true;
    try {
      const res = await fetch("/api/lead", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(raw) });
      const data = await res.json().catch(() => ({}));
      if (res.ok && data.ok) {
        setState("done");
        track("lead_form_submit_success", { source }, `lead:${key.current}`);
      } else if (res.status === 422 && data.fields) {
        setErrors(data.fields); setState("idle");
      } else {
        setServerError(data.error || "Noget gik galt. Prøv igen, eller skriv til hello@liros.ai."); setState("error");
      }
    } catch {
      setServerError("Vi kunne ikke nå serveren. Tjek din forbindelse og prøv igen."); setState("error");
    } finally { inflight.current = false; }
  }

  if (state === "done") {
    return (
      <div className="notice ok" role="status">
        <strong>Forespørgsel modtaget.</strong>
        <p>Vi vender tilbage på den e-mail, du skrev. Der er ikke booket et mødetidspunkt endnu.</p>
      </div>
    );
  }
  const err = (k: string) => errors[k];
  return (
    <form onSubmit={onSubmit} noValidate className="form">
      <Field id="name" label="Navn" autoComplete="name" error={err("name")} />
      <Field id="email" label="E-mail" type="email" autoComplete="email" inputMode="email" error={err("email")} />
      <Field id="shopUrl" label="Webshop-adresse" placeholder="minshop.dk" autoComplete="url" inputMode="url" error={err("shopUrl")} />
      <div className="field">
        <label htmlFor="message">Besked <span className="muted">(valgfri)</span></label>
        <textarea id="message" name="message" rows={3} maxLength={1000} aria-invalid={!!err("message")} aria-describedby={err("message") ? "message-err" : undefined} />
        {err("message") && <p id="message-err" className="field-err">{err("message")}</p>}
      </div>
      <div className="hp" aria-hidden="true"><label>Lad feltet være tomt<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
      {state === "error" && <p className="field-err" role="alert">{serverError}</p>}
      <button type="submit" className="btn btn-primary" disabled={state === "sending"}>{state === "sending" ? "Sender…" : "Send forespørgsel"}</button>
    </form>
  );
}

function Field({ id, label, type = "text", error, ...rest }: { id: string; label: string; type?: string; error?: string; autoComplete?: string; inputMode?: "email" | "url"; placeholder?: string }) {
  return (
    <div className="field">
      <label htmlFor={id}>{label}</label>
      <input id={id} name={id} type={type} aria-invalid={!!error} aria-describedby={error ? `${id}-err` : undefined} {...rest} />
      {error && <p id={`${id}-err`} className="field-err">{error}</p>}
    </div>
  );
}
