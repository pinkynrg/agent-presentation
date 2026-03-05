export default function Capabilities() {
  const shimmerKeyframes = `
    @keyframes shimmer {
      0% { background-position: -200% center; }
      100% { background-position: 200% center; }
    }
    @keyframes pulse-dot {
      0%, 100% { opacity: 0.3; transform: scale(0.8); }
      50% { opacity: 1; transform: scale(1.2); }
    }
  `
  const cardBase = {
    padding: '1.2rem',
    borderRadius: '12px',
    minHeight: '220px',
  }

  const cardDefault = {
    ...cardBase,
    background: 'linear-gradient(135deg, #f8f6ff 0%, #ffffff 100%)',
    boxShadow: '0 4px 12px rgba(119, 71, 255, 0.15)',
    border: '1px solid #e8deff',
  }

  const cardBeta = {
    ...cardBase,
    background: 'linear-gradient(135deg, #fff5f5 0%, #ffe8f0 100%)',
    boxShadow: '0 8px 24px rgba(255, 68, 68, 0.25)',
    border: '1px solid #ff4444',
    position: 'relative',
  }

  const titleStyle = {
    textAlign: 'center',
    color: '#7747ff',
    margin: '0 0 0 0',
    fontSize: '1.1rem',
  }

  const dateStyle = {
    textAlign: 'center',
    color: '#999',
    fontSize: '0.75rem',
    marginBottom: '1rem',
  }

  const listStyle = {
    margin: 0,
    paddingLeft: '1.2rem',
  }

  const itemStyle = {
    margin: '0.3rem 0',
  }

  const cycles = [
    {
      title: 'Cycle 1',
      date: 'Sep - Oct',
      items: ['Tech stack setup', 'Basic agent', 'Attachments', 'Chat engine', 'Traceability setup'],
    },
    {
      title: 'Cycle 2',
      date: 'Nov - Dec',
      items: ['Email creation ↑', 'User feedbacks', 'User reports', 'Stop requests', 'Bug hunt'],
    },
    {
      title: 'Cycle 3',
      date: 'Jan - Feb',
      items: ['Email creation ↑↑', 'Email editing', 'Workspace styles', 'Create with AI', 'Bug hunt'],
      isBeta: true,
    },
  ]

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr 1fr 1fr',
      gap: '2rem',
      marginTop: '2rem',
      fontSize: '0.9rem',
    }}>
      {cycles.map((cycle, idx) => (
        <div key={idx} style={cycle.isBeta ? cardBeta : cardDefault}>
          {cycle.isBeta && (
            <div style={{
              position: 'absolute',
              top: '-12px',
              right: '12px',
              background: '#ff4444',
              color: 'white',
              padding: '0.3rem 0.8rem',
              borderRadius: '12px',
              fontSize: '0.7rem',
              fontWeight: 'bold',
              boxShadow: '0 2px 8px rgba(255, 68, 68, 0.4)',
            }}>BETA</div>
          )}
          <h3 style={titleStyle}>{cycle.title}</h3>
          <div style={dateStyle}>{cycle.date}</div>
          <ul style={listStyle}>
            {cycle.items.map((item, i) => (
              <li key={i} style={itemStyle}><strong>{item}</strong></li>
            ))}
          </ul>
        </div>
      ))}

      {/* "More cycles" placeholder */}
      <div style={{
        ...cardBase,
        background: 'linear-gradient(135deg, #ffffff 0%, #f8f6ff 100%)',
        boxShadow: '0 4px 12px rgba(119, 71, 255, 0.08)',
        border: '2px dashed #e8deff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}>
        <style dangerouslySetInnerHTML={{ __html: shimmerKeyframes }} />
        {/* Rainbow loader dots */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
          {['#7747ff', '#ff6b6b', '#ffa726', '#66bb6a', '#42a5f5'].map((color, i) => (
            <div
              key={i}
              style={{
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: color,
                animation: `pulse-dot 1.4s ease-in-out ${i * 0.2}s infinite`,
              }}
            />
          ))}
        </div>
        {/* Shimmer text */}
        <div style={{
          fontStyle: 'italic',
          textAlign: 'center',
          fontSize: '0.85rem',
          fontWeight: 600,
          background: 'linear-gradient(90deg, #7747ff, #ff6b6b, #ffa726, #66bb6a, #42a5f5, #7747ff)',
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          animation: 'shimmer 3s linear infinite',
        }}>
          More cycles<br />to come
        </div>
      </div>
    </div>
  )
}
