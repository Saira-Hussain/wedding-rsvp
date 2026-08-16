import { redirect } from 'next/navigation';

export default function Home() {
  // Option A: Redirect visitors straight to an invite or info page
  // redirect('/invite/hussain-family');

  // Option B: Show a clean welcome page
  return (
    <main style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', padding: '20px' }}>
      <h1>Welcome to the Wedding RSVP Portal</h1>
      <p style={{ color: '#666' }}>Please use the personalized link provided in your invitation.</p>
    </main>
  );
}
