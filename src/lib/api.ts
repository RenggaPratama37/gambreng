// Simpan sebagai: src/lib/api.ts

// Nilai diambil dari environment saat build (GitHub Secrets / file .env lokal).
// Untuk tes lokal, buat file .env berisi VITE_API_URL dan VITE_API_TOKEN (jangan di-commit).
const env = (import.meta as unknown as { env: Record<string, string | undefined> }).env;
const API_URL: string = env.VITE_API_URL ?? '';
const TOKEN: string = env.VITE_API_TOKEN ?? '';
const QUEUE_KEY = 'game_antrian';
const DEVICE_KEY = 'game_perangkat';

const siap = () => Boolean(API_URL && TOKEN);

function uid(): string {
  return typeof crypto !== 'undefined' && 'randomUUID' in crypto
    ? crypto.randomUUID()
    : Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
}

async function kirim(payload: Record<string, unknown>) {
  const res = await fetch(API_URL, {
    method: 'POST',
    // text/plain agar tidak kena preflight CORS
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify({ token: TOKEN, ...payload }),
  });
  return (await res.json()) as { ok: boolean; duplicate?: boolean; error?: string };
}

function baca(): Record<string, unknown>[] {
  try { return JSON.parse(localStorage.getItem(QUEUE_KEY) || '[]'); } catch { return []; }
}
function tulis(q: Record<string, unknown>[]) {
  try { localStorage.setItem(QUEUE_KEY, JSON.stringify(q)); } catch { /* abaikan */ }
}
