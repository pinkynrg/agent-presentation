import { useState, useEffect } from 'react'
import VirtualDesktop from './VirtualDesktop.jsx'

export default function BeforeAfter() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => (s + 1) % 4)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  const fadeStyle = (visible) => ({
    opacity: visible ? 1 : 0.3,
    transition: 'opacity 0.4s',
  })

  const EmailRow = ({ color, visible }) => (
    <div style={{
      background: color,
      height: '20px',
      borderRadius: '0',
      opacity: visible ? 1 : 0,
      transition: 'opacity 0.5s',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'stretch',
    }}>
      <div style={{ background: 'white', width: '65%' }} />
    </div>
  )

  const codeStyle = {
    background: '#f8f6ff',
    padding: '0.2rem 0.4rem',
    borderRadius: '4px',
    fontSize: '0.6rem',
    display: 'block',
    fontFamily: 'monospace',
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '0rem' }}>
      {/* Before panel */}
      <div>
        <h2 style={{ textAlign: 'center', color: '#ff4444', marginBottom: '0.2rem', fontSize: '0.95rem' }}>
          ❌ Before: Direct Tool Calls
        </h2>
        <div style={{ background: '#fff5f5', padding: '0.5rem 0.7rem', borderRadius: '12px', border: '2px solid #ffcccc' }}>
          <div style={{ fontSize: '0.65rem' }}>
            <div style={{ background: '#e8f5e9', padding: '0.3rem 0.5rem', borderRadius: '6px', marginBottom: '0.3rem' }}>
              <strong>User:</strong> "Create 3-section email with blue background"
            </div>

            <div style={{ fontWeight: 'bold', marginBottom: '0.2rem', fontSize: '0.7rem' }}>Agent tool calls:</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', marginBottom: '0.3rem' }}>
              <div style={fadeStyle(step >= 1)}>
                <code style={codeStyle}>Add section: #0000ff</code>
              </div>
              <div style={fadeStyle(step >= 2)}>
                <code style={codeStyle}>Add section: #87CEEB</code>
              </div>
              <div style={fadeStyle(step >= 3)}>
                <code style={codeStyle}>Add section: #0000ff</code>
              </div>
            </div>

            <div style={{ marginTop: '2rem' }}>
              <VirtualDesktop
                maxHeight="280px"
                stagingContent={
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                    {step >= 1 && <EmailRow color="#0000ff" visible={step >= 1} />}
                    {step >= 2 && <EmailRow color="#87CEEB" visible={step >= 2} />}
                    {step >= 3 && <EmailRow color="#0000ff" visible={step >= 3} />}
                  </div>
                }
              />
            </div>

            {step >= 3 && (
              <div style={{ marginTop: '0.2rem', color: '#ff4444', fontWeight: 'bold', fontSize: '0.7rem', textAlign: 'center' }}>
                ⚠️ Inconsistent!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* After panel */}
      <div>
        <h2 style={{ textAlign: 'center', color: '#22bb33', marginBottom: '0.2rem', fontSize: '0.95rem' }}>
          ✅ After: Plan → Execute
        </h2>
        <div style={{ background: '#f0fff4', padding: '0.5rem 0.7rem', borderRadius: '12px', border: '2px solid #bbf7d0' }}>
          <div style={{ fontSize: '0.65rem' }}>
            <div style={{ background: '#e8f5e9', padding: '0.3rem 0.5rem', borderRadius: '6px', marginBottom: '0.3rem' }}>
              <strong>User:</strong> "Create 3-section email with blue background"
            </div>

            <div style={{ fontWeight: 'bold', marginBottom: '0.2rem', fontSize: '0.7rem' }}>Planner generates plan and Executor runs it:</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', marginBottom: '0.3rem' }}>
              <div style={fadeStyle(step >= 1)}>
                <code style={codeStyle}>Set primary color: #0000ff</code>
              </div>
              <div style={fadeStyle(step >= 1)}>
                <code style={codeStyle}>Add 3 sections with primary color</code>
              </div>
            </div>

            <div style={{ marginTop: '3.5rem' }}>
              <VirtualDesktop
                maxHeight="280px"
                stagingContent={
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                    {step >= 1 && <EmailRow color="#0000ff" visible={step >= 1} />}
                    {step >= 2 && <EmailRow color="#0000ff" visible={step >= 2} />}
                    {step >= 3 && <EmailRow color="#0000ff" visible={step >= 3} />}
                  </div>
                }
              />
            </div>

            {step === 3 && (
              <div style={{ marginTop: '0.2rem', color: '#22bb33', fontWeight: 'bold', fontSize: '0.7rem', textAlign: 'center' }}>
                ✅ Consistent by design!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
