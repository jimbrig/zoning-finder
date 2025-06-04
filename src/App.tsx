import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Map, HelpCircle, History, Home } from 'lucide-react';
import SearchPage from './pages/SearchPage';
import HelpPage from './pages/HelpPage';
import HistoryList from './components/history/HistoryList';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Map className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">ArcGIS URL Finder</span>
            </div>
            <nav className="flex space-x-4">
              <Link
                to="/"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
              >
                <div className="flex items-center">
                  <Home className="h-4 w-4 mr-1" />
                  <span>Search</span>
                </div>
              </Link>
              <Link
                to="/history"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
              >
                <div className="flex items-center">
                  <History className="h-4 w-4 mr-1" />
                  <span>History</span>
                </div>
              </Link>
              <Link
                to="/help"
                className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600 hover:bg-gray-50"
              >
                <div className="flex items-center">
                  <HelpCircle className="h-4 w-4 mr-1" />
                  <span>Help</span>
                </div>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="py-10 px-4 sm:px-6 lg:px-8">
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/history" element={<div className="max-w-3xl mx-auto"><HistoryList /></div>} />
          <Route path="/help" element={<HelpPage />} />
        </Routes>
      </main>

      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            © {new Date().getFullYear()} ArcGIS URL Finder. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;