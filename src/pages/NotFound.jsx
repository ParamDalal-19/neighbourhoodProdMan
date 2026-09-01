import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'
import EmptyState from '../components/EmptyState.jsx'

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-ink-50 px-4">
      <EmptyState
        icon={Compass}
        title="Page not found"
        description="The page you're looking for doesn't exist."
        action={
          <Link to="/" className="btn-primary">
            Back to Neighbourhood
          </Link>
        }
      />
    </div>
  )
}
