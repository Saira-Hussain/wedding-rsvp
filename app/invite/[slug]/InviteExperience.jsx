{/* 1. INITIAL ENVELOPE IMAGE & VIDEO LAYER */}
      {!videoEnded && (
        <div
          onClick={handleStartVideo}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 0,
            backgroundColor: '#000000',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100vw',
            height: '100dvh',
            overflow: 'hidden',
            cursor: 'pointer',
          }}
        >
          {!videoStarted ? (
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
              <img
                src="/envelope.jpeg"
                alt="Invitation Envelope"
                style={{
                  width: '100%',
                  maxWidth: '400px',
                  height: 'auto',
                  objectFit: 'contain',
                  borderRadius: '12px',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.8)',
                }}
              />
              <button
                style={{
                  backgroundColor: 'rgba(20, 20, 20, 0.9)',
                  color: '#FFFFFF',
                  padding: '12px 28px',
                  fontSize: '0.95rem',
                  border: '1px solid #C2A052',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  letterSpacing: '1px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.8)',
                  textTransform: 'uppercase',
                }}
              >
                Press to Open Invitation ✨
              </button>
            </div>
          ) : (
            <video
              ref={videoRef}
              src="/envelope.mp4"
              playsInline
              webkit-playsinline="true"
              preload="auto"
              onEnded={() => setVideoEnded(true)}
              onError={(e) => {
                console.error("Video error:", e);
                setVideoEnded(true);
              }}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                maxWidth: '500px',
              }}
            />
          )}
        </div>
      )}
