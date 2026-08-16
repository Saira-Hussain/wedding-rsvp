export default function Home() {
  return (
    <main
      style={{
        minHeight: '100vh',
        width: '100%',
        backgroundImage: 'url("/hero.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: '80px',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          padding: '16px 28px',
          borderRadius: '25px',
          color: '#ffffff',
          fontSize: '16px',
          letterSpacing: '1px',
          backdropFilter: 'blur(4px)',
        }}
      >
        Please open the personalized link provided in your invitation.
      </div>
    </main>
  );
}
