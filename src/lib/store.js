// ============================================================
// 목업 백엔드 (localStorage 기반)
// Supabase 연동 전까지 이 모듈이 DB + API 역할을 대신한다.
// 모든 함수는 async — 나중에 Supabase 호출로 교체해도
// 화면 코드는 그대로 유지되도록 인터페이스를 맞춰 둠.
// ============================================================

const DB_KEY = 'anapanasati.sessions'
const AUTH_KEY = 'anapanasati.auth'

const delay = (ms = 250) => new Promise((r) => setTimeout(r, ms))
const uid = () => Math.random().toString(36).slice(2) + Date.now().toString(36)

function readAll() {
  try {
    return JSON.parse(localStorage.getItem(DB_KEY)) || []
  } catch {
    return []
  }
}
function writeAll(rows) {
  localStorage.setItem(DB_KEY, JSON.stringify(rows))
}

// ---------- Auth (목업) ----------
export const auth = {
  async getUser() {
    await delay(100)
    try {
      return JSON.parse(localStorage.getItem(AUTH_KEY)) || null
    } catch {
      return null
    }
  },
  async signIn(email) {
    await delay()
    const user = { id: 'local-' + email, email, display_name: email.split('@')[0] }
    localStorage.setItem(AUTH_KEY, JSON.stringify(user))
    return user
  },
  async signOut() {
    await delay(100)
    localStorage.removeItem(AUTH_KEY)
  },
}

// ---------- Sessions CRUD (목업) ----------
export const sessionsApi = {
  // R — 목록 조회 (최신순)
  async list(userId) {
    await delay()
    return readAll()
      .filter((s) => s.user_id === userId)
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
  },

  // R — 단건 조회
  async get(id) {
    await delay(150)
    return readAll().find((s) => s.id === id) || null
  },

  // C — 생성
  async create(userId, data) {
    await delay()
    const row = {
      id: uid(),
      user_id: userId,
      duration_sec: data.duration_sec ?? 0,
      stage: data.stage ?? 1,
      breath_pattern: data.breath_pattern ?? '',
      focus_score: data.focus_score ?? 3,
      note: data.note ?? '',
      ai_feedback: data.ai_feedback ?? null,
      created_at: new Date().toISOString(),
    }
    const rows = readAll()
    rows.push(row)
    writeAll(rows)
    return row
  },

  // U — 수정
  async update(id, patch) {
    await delay()
    const rows = readAll()
    const i = rows.findIndex((s) => s.id === id)
    if (i === -1) throw new Error('세션을 찾을 수 없습니다.')
    rows[i] = { ...rows[i], ...patch }
    writeAll(rows)
    return rows[i]
  },

  // D — 삭제
  async remove(id) {
    await delay()
    writeAll(readAll().filter((s) => s.id !== id))
    return true
  },
}

// ---------- 통계 헬퍼 ----------
export function computeStats(sessions) {
  const totalSec = sessions.reduce((sum, s) => sum + (s.duration_sec || 0), 0)
  const count = sessions.length
  const avgFocus = count
    ? (sessions.reduce((sum, s) => sum + (s.focus_score || 0), 0) / count).toFixed(1)
    : '0.0'

  // 연속 수행일수 (오늘 기준 streak)
  const days = new Set(
    sessions.map((s) => new Date(s.created_at).toISOString().slice(0, 10)),
  )
  let streak = 0
  const d = new Date()
  // 오늘 기록이 없으면 어제부터 검사
  if (!days.has(d.toISOString().slice(0, 10))) d.setDate(d.getDate() - 1)
  while (days.has(d.toISOString().slice(0, 10))) {
    streak++
    d.setDate(d.getDate() - 1)
  }

  return { totalSec, count, avgFocus, streak }
}
