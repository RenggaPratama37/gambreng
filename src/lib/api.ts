
import type { Player, TimeMode } from '../types/game';

const env = (import.meta as unknown as {
  env: Record<string, string | undefined>;
}).env;

const API_URL = env.VITE_API_URL ?? '';
const TOKEN = env.VITE_API_TOKEN ?? '';

const QUEUE_KEY = 'game_antrian';
const DEVICE_KEY = 'game_perangkat';

interface ApiResponse {
  ok: boolean;
  duplicate?: boolean;
  error?: string;
}

interface ApiPayload {
  type: 'visit' | 'session';
  [key: string]: unknown;
}

interface SessionInput {
  classCode: string;
  subject: string;
  timeMode: TimeMode;
  elapsedSeconds: number;
  players: Player[];
}

function siap(): boolean {
  return Boolean(API_URL && TOKEN);
}

function uid(): string {
  return typeof crypto !== 'undefined' &&
    typeof crypto.randomUUID === 'function'
    ? crypto.randomUUID()
    : `${Date.now().toString(36)}${Math.random()
        .toString(36)
        .slice(2, 10)}`;
}

function getDeviceId(): string {
  try {
    let id = localStorage.getItem(DEVICE_KEY);

    if (!id) {
      id = uid();
      localStorage.setItem(DEVICE_KEY, id);
    }

    return id;
  } catch {
    return uid();
  }
}

function baca(): ApiPayload[] {
  try {
    const value: unknown = JSON.parse(
      localStorage.getItem(QUEUE_KEY) || '[]'
    );

    return Array.isArray(value) ? value as ApiPayload[] : [];
  } catch {
    return [];
  }
}

function tulis(queue: ApiPayload[]): void {
  try {
    localStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
  } catch (error) {
    console.error('Gagal menyimpan antrean lokal:', error);
  }
}

function antrekan(payload: ApiPayload): void {
  const queue = baca();
  queue.push(payload);
  tulis(queue);
}

async function kirim(
  payload: ApiPayload
): Promise<ApiResponse> {
  if (!siap()) {
    throw new Error('VITE_API_URL atau VITE_API_TOKEN belum diatur.');
  }

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain;charset=utf-8',
    },
    body: JSON.stringify({
      token: TOKEN,
      ...payload,
    }),
  });

  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`);
  }

  const result = await response.json() as ApiResponse;

  if (!result.ok) {
    throw new Error(result.error || 'Request API gagal.');
  }

  return result;
}

/**
 * Mencatat kunjungan perangkat.
 * Jika gagal, request disimpan dalam antrean lokal.
 */
export async function kirimKunjungan(): Promise<void> {
  const payload: ApiPayload = {
    type: 'visit',
    deviceId: getDeviceId(),
  };

  try {
    await kirim(payload);
  } catch (error) {
    antrekan(payload);
    console.warn(
      'Kunjungan disimpan dalam antrean lokal:',
      error
    );
  }
}

/**
 * Mengirim ulang request yang sebelumnya gagal.
 * Request yang gagal tetap disimpan untuk dicoba lagi.
 */
export async function kirimAntrian(): Promise<void> {
  if (!siap()) return;

  const queue = baca();
  if (queue.length === 0) return;

  const gagal: ApiPayload[] = [];

  for (let i = 0; i < queue.length; i++) {
    try {
      await kirim(queue[i]);
    } catch (error) {
      console.warn('Pengiriman antrean gagal:', error);

      // Pertahankan request yang gagal dan seluruh request
      // sesudahnya agar urutannya tidak berubah.
      gagal.push(...queue.slice(i));
      break;
    }
  }

  tulis(gagal);
}

/**
 * Menyimpan sesi permainan beserta data para pemain.
 */
export async function simpanSesi(
  input: SessionInput
): Promise<void> {
  const endedAt = new Date();
  const startedAt = new Date(
    endedAt.getTime() -
      Math.max(0, input.elapsedSeconds) * 1000
  );

  const payload: ApiPayload = {
    type: 'session',
    sessionId: uid(),
    classCode: input.classCode,
    subject: input.subject,
    timeMode: input.timeMode,
    durationSeconds: Math.max(0, input.elapsedSeconds),
    startedAt: startedAt.toISOString(),
    endedAt: endedAt.toISOString(),

    players: input.players.map((player, index) => {
      const p = player as unknown as Record<string, unknown>;

      return {
        nickname:
          p.nickname ?? p.name ?? p.nama ?? `Pemain ${index + 1}`,
        avatar:
          p.avatar ?? p.character ?? p.tokoh ?? '',
        score: p.score ?? 0,
        finishRank:
          p.finishRank ?? p.rank ?? p.peringkat ?? index + 1,
        tileReached:
          p.tileReached ?? p.farthestTile ?? p.petakterjauh ?? 0,
      };
    }),
  };

  try {
    await kirim(payload);
  } catch (error) {
    antrekan(payload);
    console.warn(
      'Sesi disimpan dalam antrean lokal:',
      error
    );
  }
}
