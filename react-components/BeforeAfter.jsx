import { useState, useEffect } from 'react'
import VirtualDesktop from './VirtualDesktop.jsx'

export default function BeforeAfter() {
  const [step, setStep] = useState(0)
  const [dots, setDots] = useState(0)
  const [oldAgentStep, setOldAgentStep] = useState(0)

  // Old Agent animation - runs faster during planner thinking phase
  useEffect(() => {
    if (step === 0) {
      const oldAgentInterval = setInterval(() => {
        setOldAgentStep((s) => Math.min(s + 1, 8))
      }, 500) // Add a section every 0.5 seconds
      return () => clearInterval(oldAgentInterval)
    } else {
      // Reset old agent when new cycle starts
      setOldAgentStep(0)
    }
  }, [step])

  useEffect(() => {
    // First step (planner thinking) takes 5 seconds
    if (step === 0) {
      const timeout = setTimeout(() => {
        setStep(1)
      }, 5000)
      return () => clearTimeout(timeout)
    }
    
    // Subsequent steps use faster interval for executor
    const interval = setInterval(() => {
      setStep((s) => (s + 1) % 11)
    }, 500)
    return () => clearInterval(interval)
  }, [step])

  // Animated dots for loading state
  useEffect(() => {
    if (step === 0) {
      const dotsInterval = setInterval(() => {
        setDots((d) => (d + 1) % 4)
      }, 400)
      return () => clearInterval(dotsInterval)
    }
  }, [step])

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
              <strong>User:</strong> "Create email with blue background"
            </div>

            <div style={{ height: '90px' }}>
              <div style={{ fontWeight: 'bold', marginBottom: '0.2rem', fontSize: '0.7rem' }}>Old Agent:</div>
              <div style={{ 
                height: '90px',
                position: 'relative',
                overflow: 'hidden',
              }}>
              <div style={{
                display: 'flex', 
                flexDirection: 'column', 
                gap: '0.2rem',
                transform: `translateY(-${oldAgentStep * 26}px)`,
                transition: 'transform 0.5s ease-out',
              }}>
                {(() => {
                  const instructions = [
                    'Add section: #0000ff',
                    'Add section: #87CEEB',
                    'Add section: #0000ff',
                    'Add section: #4169E1',
                    'Add section: #0000ff',
                    'Add section: #87CEEB',
                    'Add section: #0000ff',
                    'Add section: #4682B4',
                  ]
                  
                  // Each step advances by one instruction
                  const currentIndex = oldAgentStep > 0 ? oldAgentStep - 1 : -1
                  
                  return instructions.map((instruction, i) => {
                    const isCurrent = i === currentIndex
                    const isPast = i < currentIndex
                    const isFuture = i > currentIndex
                    
                    return (
                      <div key={i} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        opacity: isCurrent ? 1 : isPast ? 0.5 : 0.3,
                        transition: 'opacity 0.3s',
                        minHeight: '24px',
                      }}>
                        <span style={{ 
                          fontSize: '0.8rem', 
                          color: isCurrent ? '#ff4444' : '#ccc',
                          fontWeight: 'bold',
                          transition: 'color 0.3s',
                        }}>
                          {isCurrent ? '→' : isPast ? '✓' : '○'}
                        </span>
                        <code style={{
                          ...codeStyle,
                          background: isCurrent ? '#ffdddd' : codeStyle.background,
                          fontWeight: isCurrent ? 'bold' : 'normal',
                        }}>{instruction}</code>
                      </div>
                    )
                  })
                })()}
              </div>
            </div>
            </div>

            <div style={{ marginTop: '2rem' }}>
              <VirtualDesktop
                maxHeight="280px"
                stagingContent={
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                    <EmailRow color="#0000ff" visible={oldAgentStep >= 1} />
                    <EmailRow color="#87CEEB" visible={oldAgentStep >= 2} />
                    <EmailRow color="#0000ff" visible={oldAgentStep >= 3} />
                    <EmailRow color="#4169E1" visible={oldAgentStep >= 4} />
                    <EmailRow color="#0000ff" visible={oldAgentStep >= 5} />
                    <EmailRow color="#87CEEB" visible={oldAgentStep >= 6} />
                    <EmailRow color="#0000ff" visible={oldAgentStep >= 7} />
                    <EmailRow color="#4682B4" visible={oldAgentStep >= 8} />
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* After panel */}
      <div>
        <h2 style={{ textAlign: 'center', color: '#22bb33', marginBottom: '0.2rem', fontSize: '0.95rem' }}>
          ✅ After: Guideline → Planner → Executor
        </h2>
        <div style={{ background: '#f0fff4', padding: '0.5rem 0.7rem', borderRadius: '12px', border: '2px solid #bbf7d0' }}>
          <div style={{ fontSize: '0.65rem' }}>
            <div style={{ background: '#e8f5e9', padding: '0.3rem 0.5rem', borderRadius: '6px', marginBottom: '0.3rem' }}>
              <strong>User:</strong> "Create email with blue background"
            </div>

            <div style={{ height: '90px', display: 'flex', flexDirection: 'row', gap: '2.5rem' }}>
              {/* Planner phase - always visible */}
              <div style={{ flex: 1, opacity: step >= 1 ? 1 : 0.4, transition: 'opacity 0.3s' }}>
                <div style={{ 
                  fontWeight: 'bold', 
                  marginBottom: '0.3rem', 
                  fontSize: '0.7rem',
                  color: '#2e7d32',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                }}>
                  <span>🧠</span> Planner Agent
                </div>
                <div style={{ 
                  background: '#c8e6c9',
                  border: '1px solid #81c784',
                  borderRadius: '6px',
                  padding: '0.4rem 0.5rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.2rem',
                }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    gap: '1rem',
                    fontSize: '0.55rem',
                  }}>
                    <span style={{ color: '#666', fontFamily: 'monospace' }}>Primary color:</span>
                    <span style={{ 
                      color: step >= 1 ? '#2e7d32' : '#ccc', 
                      fontWeight: step >= 1 ? 700 : 400,
                      fontFamily: 'monospace',
                      transition: 'all 0.3s',
                    }}>
                      {step >= 1 ? '#0000ff' : '.'.repeat(dots || 1)}
                    </span>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    gap: '1rem',
                    fontSize: '0.55rem',
                  }}>
                    <span style={{ color: '#666', fontFamily: 'monospace' }}>Sections:</span>
                    <span style={{ 
                      color: step >= 1 ? '#2e7d32' : '#ccc', 
                      fontWeight: step >= 1 ? 700 : 400,
                      fontFamily: 'monospace',
                      transition: 'all 0.3s',
                    }}>
                      {step >= 1 ? '8' : '.'.repeat(dots || 1)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Executor phase - always visible */}
              <div style={{ flex: 1, opacity: step >= 2 ? 1 : 0.4, transition: 'opacity 0.3s' }}>
                <div style={{ 
                  fontWeight: 'bold', 
                  marginBottom: '0.2rem', 
                  fontSize: '0.7rem',
                  color: '#1976D2',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem',
                }}>
                  <span>⚡</span> Executor
                </div>
                {step < 2 ? (
                  <div style={{ 
                    height: '90px',
                    fontSize: '0.6rem', 
                    color: '#666', 
                    paddingLeft: '0.5rem', 
                    marginBottom: '0.3rem',
                    display: 'flex',
                    alignItems: 'flex-start',
                  }}>
                    Waiting for plan...
                  </div>
                ) : (
                  <div style={{ 
                    height: '90px',
                    position: 'relative',
                    overflow: 'hidden',
                    marginBottom: '0.3rem',
                  }}>
                    <div style={{
                      display: 'flex', 
                      flexDirection: 'column', 
                      gap: '0.2rem',
                      transform: `translateY(-${Math.max(0, (step - 2)) * 26}px)`,
                      transition: 'transform 0.5s ease-out',
                    }}>
                      {(() => {
                        const instructions = [
                          'Add section 1: Primary color',
                          'Add section 2: Primary color',
                          'Add section 3: Primary color',
                          'Add section 4: Primary color',
                          'Add section 5: Primary color',
                          'Add section 6: Primary color',
                          'Add section 7: Primary color',
                          'Add section 8: Primary color',
                        ]
                        
                        const currentIndex = step - 2
                        
                        return instructions.map((instruction, i) => {
                          const isCurrent = i === currentIndex
                          const isPast = i < currentIndex
                          const isFuture = i > currentIndex
                          
                          return (
                            <div key={i} style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.3rem',
                              opacity: isCurrent ? 1 : isPast ? 0.5 : 0.3,
                              transition: 'opacity 0.3s',
                              minHeight: '24px',
                            }}>
                              <span style={{ 
                                fontSize: '0.8rem', 
                                color: isCurrent ? '#1976D2' : '#ccc',
                                fontWeight: 'bold',
                                transition: 'color 0.3s',
                              }}>
                                {isCurrent ? '→' : isPast ? '✓' : '○'}
                              </span>
                              <code style={{
                                ...codeStyle,
                                background: isCurrent ? '#bbdefb' : codeStyle.background,
                                fontWeight: isCurrent ? 'bold' : 'normal',
                              }}>{instruction}</code>
                            </div>
                          )
                        })
                      })()}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div style={{ marginTop: '2rem' }}>
              <VirtualDesktop
                maxHeight="280px"
                stagingContent={
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
                    <EmailRow color="#0000ff" visible={step >= 2} />
                    <EmailRow color="#0000ff" visible={step >= 3} />
                    <EmailRow color="#0000ff" visible={step >= 4} />
                    <EmailRow color="#0000ff" visible={step >= 5} />
                    <EmailRow color="#0000ff" visible={step >= 6} />
                    <EmailRow color="#0000ff" visible={step >= 7} />
                    <EmailRow color="#0000ff" visible={step >= 8} />
                    <EmailRow color="#0000ff" visible={step >= 9} />
                  </div>
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
