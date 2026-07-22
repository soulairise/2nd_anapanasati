// 싱잉볼 사운드 합성기 (Web Audio API)
// 실제 티베트 싱잉볼의 불협배음 구조 + 타격 후 자연감쇠 모델 기반
//
// 참고:
//   - FranzisWorkshop/SingingBowl (오픈소스 구현)
//     github.com/FranzisWorkshop/SingingBowl
//   - Still You meditation timer (stillyou.app/tools/meditation-timer)
//     불협배음 비율: 1.0, 2.71, 4.98, 7.51
//   - Masterarbeit Johanna Stever (UOL)
//     uol.de/fileadmin/studg/hua/download/Masterarbeit_Johanna_Stever.pdf
// ============================================================

let audioCtx = null

function ctx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)()
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume()
  }
  return audioCtx
}

// --- 두 개의 싱잉볼 음색 파라미터 ---
//
// Bowl A (inhale — 깊고 접지된 86Hz)
// Bowl B (exhale — 완전5도 위 129Hz)
//
// 각 그룹은 근접 주파수 쌍/삼중으로 구성돼 0.5~4Hz 맥놀이 생성.
// 그룹마다 서로 다른 감쇠 시간: 저음 오래 감, 고음 빨리 감.

const BOWLS = {
  inhale: {
    masterGain: 0.32,
    // [주파수 배열, 상대 게인(0~1), 감쇠 시간(초)]
    groups: [
      { freqs: [86.3, 87.0],     gains: [0.65, 0.50], decay: 10.0 },
      { freqs: [258.4, 259.4],   gains: [0.45, 0.45], decay: 8.0 },
      { freqs: [502.7, 505.7, 516.8], gains: [0.20, 0.18, 0.60], decay: 6.5 },
      { freqs: [809.3, 812.5, 815.7], gains: [0.05, 0.70, 0.05], decay: 5.0 },
    ],
  },
  exhale: {
    masterGain: 0.30,
    groups: [
      { freqs: [129.5, 130.5],     gains: [0.65, 0.50], decay: 10.0 },
      { freqs: [387.6, 389.1],     gains: [0.45, 0.45], decay: 8.0 },
      { freqs: [754.1, 758.5, 775.2], gains: [0.20, 0.18, 0.60], decay: 6.5 },
      { freqs: [1214, 1218.8, 1223.6], gains: [0.05, 0.70, 0.05], decay: 5.0 },
    ],
  },
}

// 현재 재생 중인 모든 사운드 추적 (세션 전환 시 정리용)
const activePlayers = new Set()

/**
 * 싱잉볼을 한 번 칩니다. 타격 후 자연 감쇠합니다.
 * @param {'inhale'|'exhale'} type
 * @returns {{ stop: () => void }}
 */
export function strikeSingingBowl(type = 'inhale') {
  const ac = ctx()
  const now = ac.currentTime
  const bowl = BOWLS[type]

  const allOscs = []

  const masterGain = ac.createGain()
  masterGain.gain.setValueAtTime(1e-5, now)
  masterGain.gain.linearRampToValueAtTime(bowl.masterGain, now + 0.015)
  masterGain.gain.exponentialRampToValueAtTime(1e-5, now + 12.0)
  masterGain.connect(ac.destination)

  bowl.groups.forEach((group) => {
    const groupGain = ac.createGain()
    const maxDecay = Math.max(...group.freqs.map((_, i) => group.gains[i] || 0.5))
    const startGain = Math.min(1.0, maxDecay * 1.2)
    groupGain.gain.setValueAtTime(1e-5, now)
    groupGain.gain.linearRampToValueAtTime(startGain, now + 0.015)
    groupGain.gain.exponentialRampToValueAtTime(1e-5, now + group.decay + 0.5)
    groupGain.connect(masterGain)

    group.freqs.forEach((freq, i) => {
      const osc = ac.createOscillator()
      osc.type = 'sine'
      // 미세한 무작위 디튠 → 매 타격마다 미묘하게 다른 음색
      const detune = (Math.random() - 0.5) * 0.08
      osc.frequency.value = freq + detune

      const gain = ac.createGain()
      gain.gain.value = group.gains[i] || 0.5
      osc.connect(gain)
      gain.connect(groupGain)
      osc.start(now)
      osc.stop(now + group.decay + 1.0)
      allOscs.push(osc)
    })
  })

  const player = {
    stop() {
      allOscs.forEach((osc) => {
        try {
          osc.stop()
        } catch (e) {
          // 이미 정지됨
        }
      })
    },
  }

  activePlayers.add(player)
  const cleanup = () => activePlayers.delete(player)
  setTimeout(cleanup, 15000)

  return player
}

/** 현재 재생 중인 모든 싱잉볼 사운드를 정지합니다 */
export function stopAllSingingBowls() {
  activePlayers.forEach((p) => {
    try {
      p.stop()
    } catch (e) {
      // 무시
    }
  })
  activePlayers.clear()
}
