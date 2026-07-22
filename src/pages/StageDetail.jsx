import { useParams, useNavigate, Link } from 'react-router-dom'
import { getStage, TETRADS, STAGES } from '../data/stages'

export default function StageDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const stage = getStage(id)

  if (!stage) {
    return (
      <div className="page container">
        <p>단계를 찾을 수 없습니다.</p>
        <Link to="/learn" className="btn btn--ghost">목록으로</Link>
      </div>
    )
  }

  const tetrad = TETRADS[stage.tetrad]
  const prev = STAGES.find((s) => s.id === stage.id - 1)
  const next = STAGES.find((s) => s.id === stage.id + 1)

  return (
    <div className="page">
      <div className="container container--narrow">
        <Link to="/learn" className="eyebrow" style={{ display: 'inline-block', marginBottom: '1rem' }}>
          ← 배우기 목록
        </Link>

        <div className="stage-detail__num">{stage.id}</div>
        <p className="eyebrow" style={{ marginTop: '0.5rem' }}>
          제{stage.tetrad} · {tetrad.name} ({tetrad.pali})
        </p>
        <h1 style={{ fontSize: '2rem', margin: '0.3rem 0' }}>{stage.title_ko}</h1>
        <p className="stage-detail__pali">{stage.title_pali}</p>

        <p className="stage-detail__body">{stage.description}</p>

        <div className="tip-box">
          <p className="eyebrow">수행 팁</p>
          <p>{stage.practice_tip}</p>
        </div>

        <div style={{ textAlign: 'center', margin: '2rem 0' }}>
          <button className="btn btn--primary" onClick={() => navigate(`/breathe?stage=${stage.id}`)}>
            이 단계로 호흡하기 🫧
          </button>
        </div>

        <hr className="divider" />
        <div className="stage-nav">
          {prev ? (
            <Link to={`/learn/${prev.id}`} className="btn btn--ghost">← {prev.id}. {prev.title_ko}</Link>
          ) : <span />}
          {next ? (
            <Link to={`/learn/${next.id}`} className="btn btn--ghost">{next.id}. {next.title_ko} →</Link>
          ) : <span />}
        </div>
      </div>
    </div>
  )
}
