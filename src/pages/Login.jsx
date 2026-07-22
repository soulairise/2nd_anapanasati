import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const { state } = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!email.includes('@')) {
      setError('올바른 이메일 형식을 입력해 주세요.')
      return
    }
    setBusy(true)
    setError('')
    try {
      await signIn(email)
      // 호흡 완료 후 저장하려던 경우 → 완료 화면으로 세션 데이터와 함께 복귀
      if (state?.redirectTo === '/complete' && state.session) {
        navigate('/complete', { state: state.session })
      } else {
        navigate('/journal')
      }
    } catch (err) {
      setError(err.message || '로그인에 실패했습니다.')
      setBusy(false)
    }
  }

  return (
    <div className="page">
      <div className="container">
        <div className="card auth-card">
          <div className="text-center" style={{ marginBottom: '1.5rem' }}>
            <div style={{ fontSize: '2rem' }}>🌬️</div>
            <h1 style={{ fontSize: '1.5rem', margin: '0.5rem 0' }}>숨결의 길에 들어가기</h1>
            <p className="muted" style={{ fontSize: '0.9rem' }}>
              이메일로 로그인하여 수행일지를 기록하세요.
            </p>
          </div>

          <div className="banner">
            💡 지금은 목업(데모) 로그인입니다. 어떤 이메일이든 입력하면 바로 들어갈 수 있어요.
            <br />추후 Supabase 이메일 인증으로 연결됩니다.
          </div>

          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>이메일</label>
              <input
                className="input"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoFocus
              />
            </div>
            <div className="field">
              <label>비밀번호</label>
              <input
                className="input"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && <p style={{ color: '#c0674f', marginBottom: '1rem' }}>{error}</p>}

            <button className="btn btn--primary btn--block" type="submit" disabled={busy}>
              {busy ? '들어가는 중…' : '로그인 / 시작하기'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
