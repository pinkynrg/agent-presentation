import { useState, useEffect } from 'react'

export default function AgentVsToolsStatic() {
  const [step, setStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((s) => (s < 5 ? s + 1 : 0))
    }, 1500)
    return () => clearInterval(interval)
  }, [])

  const colStyle = {
    textAlign: 'center',
    fontSize: '0.8rem',
    lineHeight: 1.4,
  }

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr',
      gap: '2rem',
      marginTop: '2rem',
    }}>
      {/* Tools */}
      <div style={{ position: 'relative' }}>
        <div style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '1rem' }}>🔧</div>
        <h3 style={{ textAlign: 'center', color: '#7747ff', marginBottom: '1rem' }}>Tools</h3>
        
        {/* Single speech bubble containing all tools */}
        <div style={{ 
          position: 'relative',
          background: step === 1 ? '#fff' : 'transparent',
          padding: '0.8rem',
          borderRadius: '12px',
          border: step === 1 ? '2px solid #FFE4CC' : '2px solid transparent',
          boxShadow: step === 1 ? '0 2px 8px rgba(255, 159, 90, 0.15)' : 'none',
          transition: 'all 0.4s ease',
        }}>
          {/* Speech bubble pointer at top right */}
          {step === 1 && (
            <>
              <div style={{
                position: 'absolute',
                right: '-10px',
                top: '15px',
                width: 0,
                height: 0,
                borderTop: '10px solid transparent',
                borderBottom: '10px solid transparent',
                borderLeft: '10px solid #FFE4CC',
              }}></div>
              <div style={{
                position: 'absolute',
                right: '-8px',
                top: '15px',
                width: 0,
                height: 0,
                borderTop: '9px solid transparent',
                borderBottom: '9px solid transparent',
                borderLeft: '9px solid #fff',
              }}></div>
            </>
          )}
          
          <div style={colStyle}>
            <div style={{ 
              marginBottom: '0.5rem',
              padding: '0.3rem',
              borderRadius: '6px',
              background: step === 4 ? '#E8DEFF' : 'transparent',
              transition: 'background 0.4s ease',
            }}>
              🔫 <strong>Drill</strong><br />makes holes
            </div>
            <div style={{ 
              marginBottom: '0.5rem',
              padding: '0.3rem',
              borderRadius: '6px',
              background: step === 3 ? '#E8DEFF' : 'transparent',
              transition: 'background 0.4s ease',
            }}>
              📏 <strong>Ruler</strong><br />measures length
            </div>
            <div style={{ 
              marginBottom: '0.5rem',
              padding: '0.3rem',
              borderRadius: '6px',
              background: step === 5 ? '#E8DEFF' : 'transparent',
              transition: 'background 0.4s ease',
            }}>
              🪛 <strong>Screwdriver</strong><br />turns screws
            </div>
            <div style={{ 
              marginBottom: '0',
              padding: '0.3rem',
              borderRadius: '6px',
              background: step === 2 ? '#E8DEFF' : 'transparent',
              transition: 'background 0.4s ease',
            }}>
              🌐 <strong>Manual</strong><br />reads manual on ikea.com
            </div>
          </div>
        </div>
      </div>

      {/* MCP Server */}
      <div>
        <div style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '1rem' }}>🧰</div>
        <h3 style={{ textAlign: 'center', color: '#7747ff', marginBottom: '1rem' }}>MCP Server</h3>
        <div style={{ 
          textAlign: 'center', 
          fontSize: '0.9rem', 
          lineHeight: 1.8, 
          padding: '0 1rem',
        }}>
          A collection of tools with labels describing what each tool should be used for
        </div>
      </div>

      {/* Agent */}
      <div>
        <div style={{ textAlign: 'center', fontSize: '3rem', marginBottom: '1rem' }}>🤖</div>
        <h3 style={{ textAlign: 'center', color: '#7747ff', marginBottom: '1rem' }}>Agent</h3>
        <div style={{ textAlign: 'center', fontSize: '0.9rem', lineHeight: 1.8 }}>
          <div style={{
            background: '#f5f0ff',
            padding: '0.6rem',
            borderRadius: '8px',
            marginBottom: '0.8rem',
          }}>
            <strong>You:</strong> "Assemble this IKEA bookshelf"
          </div>
          <div style={{ fontSize: '0.85rem', color: '#666', textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ 
              opacity: step >= 1 ? 1 : 0.3,
              transition: 'opacity 0.4s ease',
              fontWeight: step === 1 ? 'bold' : 'normal',
            }}>
              <strong>Step 1:</strong> Requests MCP tool descriptions
            </div>
            <div style={{ 
              opacity: step >= 2 ? 1 : 0.3,
              transition: 'opacity 0.4s ease',
              fontWeight: step === 2 ? 'bold' : 'normal',
            }}>
              <strong>Step 2:</strong> Reads manual on ikea.com
            </div>
            <div style={{ 
              opacity: step >= 3 ? 1 : 0.3,
              transition: 'opacity 0.4s ease',
              fontWeight: step === 3 ? 'bold' : 'normal',
            }}>
              <strong>Step 3:</strong> Measures with ruler
            </div>
            <div style={{ 
              opacity: step >= 4 ? 1 : 0.3,
              transition: 'opacity 0.4s ease',
              fontWeight: step === 4 ? 'bold' : 'normal',
            }}>
              <strong>Step 4:</strong> Drills holes with drill
            </div>
            <div style={{ 
              opacity: step >= 5 ? 1 : 0.3,
              transition: 'opacity 0.4s ease',
              fontWeight: step === 5 ? 'bold' : 'normal',
            }}>
              <strong>Step 5:</strong> Screws with screwdriver
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
