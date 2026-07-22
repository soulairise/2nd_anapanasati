import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="page">
      <div className="container">
        <section className="hero">
          <p className="eyebrow">부처가 전한 호흡 알아차림</p>
          <h1 className="hero__title">
            들숨과 날숨,<br />그 사이에 머무르다
          </h1>
          <p className="hero__sub">
            아나빠나사띠 16단계를 배우고, 호흡 가이드로 수행하고,
            오늘의 마음을 기록하는 고요한 공간입니다.
          </p>
          <div className="hero__cta">
            <Link to="/breathe" className="btn btn--primary">지금 호흡하기</Link>
            <Link to="/learn" className="btn btn--ghost">16단계 배우기</Link>
          </div>
        </section>

        <section className="flow-grid">
          <Link to="/learn" className="card flow-card">
            <div className="flow-card__icon">📖</div>
            <h3>배우기</h3>
            <p>몸·느낌·마음·법 네 갈래, 16단계 호흡 명상을 차근차근 익힙니다.</p>
          </Link>
          <Link to="/breathe" className="card flow-card">
            <div className="flow-card__icon">🫧</div>
            <h3>호흡하기</h3>
            <p>부드러운 원의 확장과 수축을 따라 들숨과 날숨을 이어갑니다.</p>
          </Link>
          <Link to="/journal" className="card flow-card">
            <div className="flow-card__icon">🕯️</div>
            <h3>기록하기</h3>
            <p>수행을 마친 뒤 소감과 집중도를 남기고, 성장을 되돌아봅니다.</p>
          </Link>
        </section>
      </div>
    </div>
  )
}
