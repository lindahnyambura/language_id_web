import React, { useState, useEffect } from 'react';
import { RefreshCw } from 'lucide-react';

function RetrainModel({ API_BASE_URL }) {
  const [trainingStatus, setTrainingStatus] = useState('idle');
  const [trainingError, setTrainingError] = useState(null);
  const [pollingActive, setPollingActive] = useState(false);

  // Debug API URL on component mount
  useEffect(() => {
    console.log("Using API URL:", API_BASE_URL);
  }, [API_BASE_URL]);

  const triggerRetraining = async () => {
    try {
      console.log("Triggering retraining at:", `${API_BASE_URL}/trigger_retrain`);
      setTrainingStatus('starting');
      setTrainingError(null);
      setPollingActive(false);

      const response = await fetch(`${API_BASE_URL}/trigger_retrain`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log("Trigger response:", response.status, response.statusText);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `Failed to trigger retraining: ${response.status}`);
      }

      const data = await response.json().catch(() => ({ status: "unknown" }));
      console.log("Trigger data:", data);

      // Start with the status from the initial response
      setTrainingStatus(data.status === "in_progress" ? "training" : data.status || "training");
      
      // Start polling after a short delay
      setPollingActive(true);
      setTimeout(pollTrainingStatus, 2000);
    } catch (err) {
      console.error("Triggering error:", err);
      setTrainingStatus('failed');
      setTrainingError(err.message || 'An error occurred during retraining.');
      setPollingActive(false);
    }
  };

  const pollTrainingStatus = async () => {
    // If polling has been stopped, don't continue
    if (!pollingActive) return;

    try {
      console.log("Polling status from:", `${API_BASE_URL}/retrain_status`);
      const response = await fetch(`${API_BASE_URL}/retrain_status`, {
        // Adding cache control to prevent cached responses
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
      
      console.log("Poll response:", response.status, response.statusText);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch training status: ${response.status}`);
      }
      
      const data = await response.json();
      console.log("Poll data:", data);
      
      // Handle different status values that might come from the backend
      const normalizedStatus = 
        data.status === "in_progress" ? "training" :
        data.status === "completed" ? "completed" :
        data.status === "failed" ? "failed" :
        data.status || "training";
      
      setTrainingStatus(normalizedStatus);
      setTrainingError(data.error || null);

      // Continue polling only if status indicates ongoing training
      if (normalizedStatus === "training" || data.status === "in_progress") {
        setTimeout(pollTrainingStatus, 5000); // Poll every 5 seconds
      } else {
        // Training is done (completed or failed)
        setPollingActive(false);
      }
    } catch (err) {
      console.error("Polling error:", err);
      setTrainingStatus('failed');
      setTrainingError(err.message || 'An error occurred while polling training status.');
      setPollingActive(false);
    }
  };

  // Cancel polling when component unmounts
  useEffect(() => {
    return () => {
      setPollingActive(false);
    };
  }, []);

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
            <strong>Error:</strong> {trainingError}
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