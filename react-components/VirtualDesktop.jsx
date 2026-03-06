import sdkImage from '../assets/sdk.png'

export default function VirtualDesktop({ stagingContent, textAreaContent, maxHeight }) {
  return (
    <div style={{
      position: 'relative',
      overflow: 'hidden',
      border: 'none',
      aspectRatio: '1190 / 995',
      width: '100%',
      maxHeight: maxHeight || 'none',
      backgroundImage: `url(${sdkImage})`,
      backgroundSize: '100% 100%',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}>
      {/* Staging area — center of the editor canvas */}
      {stagingContent && (
        <div style={{
          position: 'absolute',
          top: '7%',
          left: '0%',
          width: '65%',
          height: '85%',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.3rem',
          padding: '0.4rem',
          boxSizing: 'border-box',
        }}>
          <div style={{ width: '100%', overflow: 'hidden' }}>
            {stagingContent}
          </div>
        </div>
      )}

      {/* Text area — bottom right */}
      {textAreaContent != null && textAreaContent !== false && (
        <div style={{
          position: 'absolute',
          top: '15%',
          right: '2%',
          width: '30%',
          background: 'rgba(255,255,255,0.9)',
          borderRadius: '6px',
          padding: '0.4rem 0.5rem',
          border: '1px solid #e0e0e0',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}>
          {textAreaContent}
        </div>
      )}
    </div>
  )
}
