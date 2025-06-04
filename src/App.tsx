import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Map, History, HelpCircle, GitHub } from 'lucide-react';
import SearchPage from './pages/SearchPage';
import HelpPage from './pages/HelpPage';
import HistoryPage from './pages/HistoryPage';
import { AppProvider } from './context/AppContext';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <header className="bg-white shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between h-16">
                <div className="flex items-center">
                  <Map className="h-8 w-8 text-primary-600" />
                  <h1 className="ml-2 text-xl font-bold text-gray-900">ArcGIS URL Finder</h1>
                </div>
                <nav className="flex items-center space-x-4">
                  <Link to="/" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                    <Map className="h-4 w-4 mr-1" />
                    Search
                  </Link>
                  <Link to="/history" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                    <History className="h-4 w-4 mr-1" />
                    History
                  </Link>
                  <Link to="/help" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium flex items-center">
                    <HelpCircle className="h-4 w-4 mr-1" />
                    Help
                  </Link>
                  <a 
                    href="https://github.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                  >
                    <GitHub className="h-4 w-4 mr-1" />
                    GitHub
                  </a>
                </nav>
              </div>
            </div>
          </header>

          <main className="py-8 px-4 sm:px-6 lg:px-8">
            <Routes>
              <Route path="/" element={<SearchPage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/help" element={<HelpPage />} />
            </Routes>
          </main>

          <footer className="bg-white py-4 border-t">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <p className="text-center text-sm text-gray-500">
                &copy; {new Date().getFullYear()} ArcGIS URL Finder. All rights reserved.
              </p>
            </div>
          </footer>
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;