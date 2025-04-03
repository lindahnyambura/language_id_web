import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

function RetrainModel({ API_BASE_URL }) {
  const [trainingStatus, setTrainingStatus] = useState('idle');
  const [trainingError, setTrainingError] = useState(null);
  const [retrainingTriggered, setRetrainingTriggered] = useState(false); // New state to track if retraining was triggered

  const triggerRetraining = async () => {
    try {
      setTrainingStatus('starting');
      setTrainingError(null);
      setRetrainingTriggered(true); // Retraining has been triggered

      const response = await fetch(`${API_BASE_URL}/trigger_retrain`, {
        method: 'POST',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to trigger retraining');
      }

      setTrainingStatus('training');
      pollTrainingStatus(); // Start polling for status updates
    } catch (err) {
      setTrainingStatus('failed');
      setTrainingError(err.message || 'An error occurred during retraining.');
      console.error(err);
    }
  };

  const pollTrainingStatus = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/retrain_status`);
      if (!response.ok) {
        throw new Error('Failed to fetch training status');
      }
      const data = await response.json();
      setTrainingStatus(data.status);
      setTrainingError(data.error || null);

      if (data.status === 'training') {
        setTimeout(pollTrainingStatus, 5000); // Poll every 5 seconds
      }
    } catch (err) {
      setTrainingStatus('failed');
      setTrainingError(err.message || 'An error occurred while polling training status.');
      console.error(err);
    }
  };

  useEffect(() => {
    if (retrainingTriggered) {
      pollTrainingStatus(); // Start polling if retraining was triggered
    }
  }, [retrainingTriggered]);

  return (
    <div className="content-section">
      <h2 className="section-title">
        <RefreshCw className="section-icon" />
        Model Retraining
      </h2>

      <div className="status-card">
        <h3 className="card-title">Current Model Status</h3>

        <div className="status-indicator">
          <div className={`status-dot ${
            trainingStatus === 'idle' ? 'status-green' :
            trainingStatus === 'starting' ? 'status-yellow' :
            trainingStatus === 'training' ? 'status-blue pulsing' :
            trainingStatus === 'completed' ? 'status-green' :
            'status-red'
          }`}></div>
          <span className="status-text">
            {trainingStatus === 'idle' ? 'Model Active' :
              trainingStatus === 'starting' ? 'Preparing for Training' :
              trainingStatus === 'training' ? 'Training in Progress' :
              trainingStatus === 'completed' ? 'Training Completed' :
              'Training Failed'}
          </span>
        </div>

        {trainingError && (
          <div className="alert error">
            {trainingError}
          </div>
        )}

        <button
          onClick={triggerRetraining}
          disabled={trainingStatus === 'starting' || trainingStatus === 'training'}
          className={`action-button primary ${trainingStatus === 'starting' || trainingStatus === 'training' ? 'disabled' : ''}`}
        >
          {trainingStatus === 'starting' || trainingStatus === 'training' ? (
            <span className="loading-indicator">
              <svg className="spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="spinner-track" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="spinner-path" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Training in Progress...
            </span>
          ) : (
            <span className="button-content">
              <RefreshCw className="button-icon-left" /> Trigger Retraining
            </span>
          )}
        </button>
      </div>

      <div className="info-card">
        <h3 className="card-title">Training Information</h3>
        <p className="info-text">
          Retraining the model will use all available data, including any recently uploaded datasets. The process typically takes 5-10 minutes depending on the dataset size.
        </p>

        <div className="info-stats">
          <div className="stat-item">
            <span className="stat-label">Dataset Size:</span>
            <span className="stat-value">10,737 samples</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Languages Supported:</span>
            <span className="stat-value">Amharic, Swahili, French, Shona, Yoruba, Nigerian Pidgin</span>
          </div> 
          <div className="stat-item">
            <span className="stat-label">Last Trained:</span>
            <span className="stat-value">1 day ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RetrainModel;