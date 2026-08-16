import Link from 'next/link';

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
      <Link
        href="/invite/hussain-family"
        style={{
          padding: '16px 36px',
          fontSize: '18px',
          fontWeight: '600',
          color: '#1a1a1a',
          backgroundColor: '#d4af37',
          border: 'none',
          borderRadius: '30px',
          cursor: 'pointer',
          textDecoration: 'none',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.4)',
          transition: 'transform 0.2s ease',
        }}
      >
        View Your Invitation
      </Link>
    </main>
  );
}
