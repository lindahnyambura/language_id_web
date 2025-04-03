import React, { useState, useEffect } from 'react';
import TabButton from './components/TabButton';
import Predict from './pages/Predict';
import Visualizations from './pages/Visualizations';
import UploadData from './pages/UploadData';
import RetrainModel from './pages/RetrainModel';
import { Languages, BarChart3, Upload, RefreshCw } from 'lucide-react';
import './styles/App.css'; // Import global styles

// API base URL
const API_BASE_URL = "https://language-id-e78f.onrender.com";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [activeTab, setActiveTab] = useState('predict');

  useEffect(() => {
    // Apply dark mode to the document body
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`app ${darkMode ? 'dark-mode' : 'light-mode'}`}>
      {/* Header and Navigation */}
      <header className="header">
        <div className="container">
          <div className="logo">
            <Languages className="icon" />
            <h1>Language ID</h1>
          </div>
          <div className="header-actions">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="mode-toggle"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container main-content">
        {/* Tabs */}
        <div className="tabs">
          <TabButton
            icon={<Languages className="tab-icon" />}
            label="Predict"
            active={activeTab === 'predict'}
            onClick={() => setActiveTab('predict')}
            darkMode={darkMode}
          />
          <TabButton
            icon={<BarChart3 className="tab-icon" />}
            label="Visualizations"
            active={activeTab === 'visualizations'}
            onClick={() => setActiveTab('visualizations')}
            darkMode={darkMode}
          />
          <TabButton
            icon={<Upload className="tab-icon" />}
            label="Upload Data"
            active={activeTab === 'upload'}
            onClick={() => setActiveTab('upload')}
            darkMode={darkMode}
          />
          <TabButton
            icon={<RefreshCw className="tab-icon" />}
            label="Retrain Model"
            active={activeTab === 'retrain'}
            onClick={() => setActiveTab('retrain')}
            darkMode={darkMode}
          />
        </div>

        {/* Tab Content */}
        <div className="content-card">
          {activeTab === 'predict' && <Predict API_BASE_URL={API_BASE_URL} />}
          {activeTab === 'visualizations' && <Visualizations />}
          {activeTab === 'upload' && <UploadData API_BASE_URL={API_BASE_URL} />}
          {activeTab === 'retrain' && <RetrainModel API_BASE_URL={API_BASE_URL} />}
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-text">Language Identification App © 2025</div>
        </div>
      </footer>
    </div>
  );
}

export default App;