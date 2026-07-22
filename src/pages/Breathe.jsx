import { useState, useEffect, useRef } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { getStage } from '../data/stages'
import { strikeSingingBowl, stopAllSingingBowls } from '../lib/singingBowl'

// 호흡 패턴: [들숨, 멈춤, 날숨, 멈춤] (초)
const PATTERNS = [
  { key: '4-4-6-2', label: '기본 (4-4-6-2)', phases: [4, 4, 6, 2] },
  { key: '4-7-8-0', label: '이완 (4-7-8)', phases: [4, 7, 8, 0] },
  { key: '4-4-4-4', label: '사각 (4-4-4-4)', phases: [4, 4, 4, 4] },
  { key: '6-0-6-0', label: '고요 (6-6)', phases: [6, 0, 6, 0] },
]
const PHASE_NAMES = ['들이쉬기', '멈추기', '내쉬기', '멈추기']
const DURATIONS = [3, 5, 10] // 분

export default function Breathe() {
  const navigate = useNavigate()
  const [params] = useSearchParams()
  const stageId = Number(params.get('stage')) || 1
  const stage = getStage(stageId)

  const [pattern, setPattern] = useState(PATTERNS[0])
  const [minutes, setMinutes] = useState(3)
  const [running, setRunning] = useState(false)
  const [phaseIdx, setPhaseIdx] = useState(0)
  const [phaseRemain, setPhaseRemain] = useState(0)
  const [elapsed, setElapsed] = useState(0) // 초

  const tickRef = useRef(null)
  const startRef = useRef(null)
  const prevGroupRef = useRef(null)

  // 유효 페이즈만 (0초 페이즈는 건너뜀)
  const activePhases = pattern.phases
    .map((sec, i) => ({ sec, name: PHASE_NAMES[i], idx: i }))
    .filter((p) => p.sec > 0)

  useEffect(() => {
    if (!running) return

    stopAllSingingBowls()

    let curr = 0
    setPhaseIdx(activePhases[0].idx)
    setPhaseRemain(activePhases[0].sec)
    let remain = activePhases[0].sec

    strikeSingingBowl('inhale')
    prevGroupRef.current = 'inhale'

    tickRef.current = setInterval(() => {
      remain -= 1
      setElapsed((e) => e + 1)

      if (remain <= 0) {
        curr = (curr + 1) % activePhases.length
        const newIdx = activePhases[curr].idx
        remain = activePhases[curr].sec
        setPhaseIdx(newIdx)

        const newGroup = newIdx <= 1 ? 'inhale' : 'exhale'
        if (prevGroupRef.current !== newGroup) {
          strikeSingingBowl(newGroup)
          prevGroupRef.current = newGroup
        }
      }
      setPhaseRemain(remain)
    }, 1000)

    return () => {
      clearInterval(tickRef.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running])

  // 목표 시간 도달 시 자동 종료
  useEffect(() => {
    if (running && elapsed >= minutes * 60) {
      finish()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elapsed, running])

  const start = () => {
    setElapsed(0)
    startRef.current = Date.now()
    setRunning(true)
  }

  const stop = () => {
    setRunning(false)
    clearInterval(tickRef.current)
  }

  const finish = () => {
    stop()
    // 세션 데이터를 완료 화면으로 전달
    navigate('/complete', {
      state: {
        duration_sec: elapsed,
        stage: stageId,
        breath_pattern: pattern.key,
      },
    })
  }

  const isInhale = phaseIdx === 0
  const isExhale = phaseIdx === 2
  const orbScale = isInhale ? 1.35 : isExhale ? 0.7 : phaseIdx === 1 ? 1.35 : 0.7
  const currentPhaseSec = pattern.phases[phaseIdx] || 1

  return (
    <div className="page">
      <div className="container container--narrow breathe-wrap">
        <header className="page-head text-center">
          <p className="eyebrow">Breathe · {stageId}단계</p>
          <h1>{stage?.title_ko || '호흡하기'}</h1>
        </header>

        {!running ? (
          <>
            <p className="muted" style={{ marginBottom: '1.5rem' }}>
              호흡 패턴과 시간을 고르고, 편안히 앉아 시작하세요.
            </p>

            <p className="eyebrow">호흡 패턴</p>
            <div className="pattern-picker">
              {PATTERNS.map((p) => (
                <button
                  key={p.key}
                  className={`pattern-chip ${pattern.key === p.key ? 'active' : ''}`}
                  onClick={() => setPattern(p)}
                >
                  {p.label}
                </button>
              ))}
            </div>

            <p className="eyebrow" style={{ marginTop: '1.5rem' }}>수행 시간</p>
            <div className="pattern-picker">
              {DURATIONS.map((m) => (
                <button
                  key={m}
                  className={`pattern-chip ${minutes === m ? 'active' : ''}`}
                  onClick={() => setMinutes(m)}
                >
                  {m}분
                </button>
              ))}
            </div>

            <div className="breathe-controls">
              <button className="btn btn--primary" onClick={start}>호흡 시작하기</button>
            </div>
          </>
        ) : (
          <>
            <div className="breathe-stage">
              <div
                className="breath-orb"
                style={{
                  transform: `scale(${orbScale})`,
                  transitionDuration: `${currentPhaseSec}s`,
                }}
              >
                {phaseRemain}
              </div>
              <div className="breath-phase-label">{PHASE_NAMES[phaseIdx]}</div>
              <div className="breath-timer">
                {Math.floor(elapsed / 60)}분 {elapsed % 60}초 / {minutes}분
              </div>
            </div>

            <div className="breathe-controls">
              <button className="btn btn--ghost" onClick={stop}>일시정지</button>
              <button className="btn btn--primary" onClick={finish}>마치고 기록하기</button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
