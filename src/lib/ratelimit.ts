// Simpel rate limiter i hukommelsen. I produktion med flere instanser: brug delt store (fx Redis/edge).
const hits = new Map<string, number[]>();

export function rateLimit(key: string, max = 5, windowMs = 10 * 60_000, now = Date.now()): boolean {
  const recent = (hits.get(key) ?? []).filter((t) => now - t < windowMs);
  if (recent.length >= max) { hits.set(key, recent); return false; }
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 5000) for (const [k, v] of hits) if (!v.some((t) => now - t < windowMs)) hits.delete(k);
  return true;
}
export function _resetRateLimit() { hits.clear(); }
