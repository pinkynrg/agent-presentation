import { useState, useEffect } from 'react'
import VirtualDesktop from './VirtualDesktop.jsx'

export default function AgentVsToolsAnimated() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => (s + 1) % 4)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const toolCard = (name, desc) => (
    <div style={{
      background: '#f8f6ff',
      padding: '0.5rem',
      borderRadius: '6px',
      marginBottom: '0.5rem',
      borderLeft: '3px solid #7747ff',
    }}>
      <span style={{ color: '#7747ff', fontWeight: 'bold', fontSize: '0.7rem' }}>{name}</span><br />
      <span style={{ color: '#666', fontSize: '0.65rem' }}>{desc}</span>
    </div>
  )

  const stepRow = (label, minStep) => (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      opacity: step >= minStep ? 1 : 0.3,
      transition: 'opacity 0.3s',
    }}>
      <span style={{ color: '#7747ff', fontSize: '1rem' }}>→</span>
      <code style={{
        background: '#f8f6ff',
        padding: '0.3rem 0.5rem',
        borderRadius: '4px',
        fontSize: '0.7rem',
      }}>{label}</code>
    </div>
  )

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: '2rem',
      marginTop: '1.5rem',
    }}>
      {/* MCP Tools column */}
      <div>
        <div style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '1rem' }}>🧰</div>
        <h3 style={{ textAlign: 'center', color: '#7747ff', marginBottom: '1rem', fontSize: '1.1rem' }}>MCP Tools</h3>
        <div style={{ fontSize: '0.75rem', lineHeight: 1.4 }}>
          {toolCard('beefree_add_section', 'Creates email rows')}
          {toolCard('beefree_add_image', 'Adds images')}
          {toolCard('beefree_add_button', 'Creates buttons')}
          <div style={{ textAlign: 'center', color: '#999', fontSize: '0.7rem', fontStyle: 'italic', marginTop: '0.3rem' }}>
            ...and 50+ more
          </div>
        </div>
      </div>

      {/* Agent column */}
      <div>
        <div style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '1rem' }}>🤖</div>
        <h3 style={{ textAlign: 'center', color: '#7747ff', marginBottom: '1rem', fontSize: '1.1rem' }}>Agent</h3>
        <div style={{ fontSize: '0.8rem' }}>
          <div style={{
            background: '#e8f5e9',
            padding: '0.8rem',
            borderRadius: '8px',
            marginBottom: '1rem',
            borderLeft: '3px solid #00838F',
          }}>
            <strong style={{ fontSize: '0.75rem' }}>User:</strong><br />
            <span style={{ fontStyle: 'italic', fontSize: '0.75rem' }}>"Create a product hero"</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            {stepRow('add_section([12])', 1)}
            {stepRow('add_image(0, 0, "hero.jpg")', 2)}
            {stepRow('add_button(0, 0, "Shop Now")', 3)}
          </div>
        </div>
      </div>

      {/* Result column - SDK editor */}
      <div>
        <div style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '1rem' }}>📧</div>
        <h3 style={{ textAlign: 'center', color: '#7747ff', marginBottom: '1rem', fontSize: '1.1rem' }}>Result</h3>
        <VirtualDesktop
          stagingContent={
            step >= 1 && (
              <div style={{
                border: '2px dashed rgba(119, 71, 255, 0.6)',
                borderRadius: '4px',
                padding: '0.4rem',
                background: 'rgba(255,255,255,0.85)',
                opacity: step >= 1 ? 1 : 0,
                transition: 'opacity 0.5s ease',
              }}>
                <div style={{ fontSize: '0.5rem', color: '#7747ff', fontWeight: 'bold', marginBottom: '0.25rem' }}>
                  Section (1 col)
                </div>
                {step >= 2 && (
                  <div style={{
                    background: '#e0e0e0',
                    borderRadius: '3px',
                    height: '45px',
                    marginBottom: '0.25rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#999',
                    fontSize: '0.5rem',
                    opacity: step >= 2 ? 1 : 0,
                    transition: 'opacity 0.5s ease',
                  }}>🖼️ hero.jpg</div>
                )}
                {step >= 3 && (
                  <div style={{
                    background: '#7747ff',
                    color: 'white',
                    borderRadius: '3px',
                    padding: '0.25rem 0.5rem',
                    textAlign: 'center',
                    fontSize: '0.55rem',
                    fontWeight: 'bold',
                    opacity: step >= 3 ? 1 : 0,
                    transition: 'opacity 0.5s ease',
                  }}>Shop Now</div>
                )}
              </div>
            )
          }
          textAreaContent={
            step >= 1 ? (
              <div style={{
                fontSize: '0.4rem',
                color: '#666',
                lineHeight: 1.4,
              }}>
                {'✓ Added section'}
                {step >= 2 && <><br />{'✓ Added hero image'}</>}
                {step >= 3 && <><br />{'✓ Added CTA button'}</>}
              </div>
            ) : null
          }
        />
      </div>
    </div>
  )
}
