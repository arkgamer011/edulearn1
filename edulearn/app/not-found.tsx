import Link from 'next/link';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-indigo-600">404</h1>
        <h2 className="text-3xl font-bold text-gray-900 mt-4">Page Not Found</h2>
        <p className="text-gray-600 mt-2 mb-8 max-w-md mx-auto">
          Oops! The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors shadow-lg"
        >
          <Home className="w-5 h-5" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
