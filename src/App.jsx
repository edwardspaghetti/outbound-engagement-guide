import { useState, useEffect } from 'react'
import { supabase, isAllowedEmail } from './lib/supabase'
import OutboundGuide from './OutboundGuide'
import Auth from './components/Auth'
import { Loader2, LogOut } from 'lucide-react'

function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      // Verify email domain even after login
      if (session && !isAllowedEmail(session.user?.email)) {
        supabase.auth.signOut()
        setSession(null)
      } else {
        setSession(session)
      }
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      // Verify email domain on any auth change
      if (session && !isAllowedEmail(session.user?.email)) {
        supabase.auth.signOut()
        setSession(null)
      } else {
        setSession(session)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <Loader2 className="animate-spin text-emerald-500" size={48} />
      </div>
    )
  }

  if (!session) {
    return <Auth />
  }

  return (
    <div className="relative">
      <button
        onClick={handleSignOut}
        className="fixed top-4 right-4 z-50 bg-white hover:bg-gray-100 text-gray-700 font-medium py-2 px-4 rounded-lg shadow-md transition-colors flex items-center gap-2"
      >
        <LogOut size={18} />
        Sign out
      </button>
      <OutboundGuide />
    </div>
  )
}

export default App
