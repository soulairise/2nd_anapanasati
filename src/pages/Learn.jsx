import { useNavigate } from 'react-router-dom'
import { STAGES, TETRADS, getStagesByTetrad } from '../data/stages'

export default function Learn() {
  const navigate = useNavigate()

  return (
    <div className="page">
      <div className="container">
        <header className="page-head">
          <p className="eyebrow">Learn · 16단계</p>
          <h1>아나빠나사띠 열여섯 걸음</h1>
          <p>
            호흡 명상은 네 갈래(몸·느낌·마음·법)의 알아차림으로 이루어집니다.
            각 단계를 눌러 자세한 수행법을 확인하세요.
          </p>
        </header>

        {[1, 2, 3, 4].map((t) => {
          const tetrad = TETRADS[t]
          return (
            <section key={t} className="tetrad-block">
              <div className="tetrad-head">
                <h2>제{t} · {tetrad.name}</h2>
                <span className="pali">{tetrad.pali}</span>
                <span className="hint">{tetrad.hint}</span>
              </div>
              <div className="stage-grid">
                {getStagesByTetrad(t).map((s) => (
                  <div
                    key={s.id}
                    className="card stage-card"
                    onClick={() => navigate(`/learn/${s.id}`)}
                  >
                    <div className="stage-card__num">{s.id}</div>
                    <div className="stage-card__body">
                      <h3>{s.title_ko}</h3>
                      <p>{s.title_pali}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )
        })}

        <p className="faint text-center" style={{ marginTop: '2rem' }}>
          전체 {STAGES.length}단계 · 아나빠나사띠 숫따(MN 118)에 기초함
        </p>
      </div>
    </div>
  )
}
