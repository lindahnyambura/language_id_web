import React, { useState } from 'react';
import { AlertCircle, ChevronRight, Languages } from 'lucide-react';

function Predict({ API_BASE_URL }) {
  // State variables
  const [inputText, setInputText] = useState('');
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Function to handle language prediction
  const handlePredict = async () => {
    // Input validation
    if (!inputText.trim()) {
      setError('Please enter text to predict');
      return;
    }

    // Set loading state and clear previous errors
    setIsLoading(true);
    setError(null);

    try {
      // Make API request
      const response = await fetch(`${API_BASE_URL}/prediction`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: inputText }),
      });

      // Check for successful response
      if (!response.ok) {
        throw new Error('Prediction failed');
      }

      // Parse JSON response
      const data = await response.json();
      setPrediction(data);
    } catch (err) {
      // Handle errors
      setError('An error occurred during prediction. Please try again.');
      console.error(err);
    } finally {
      // Reset loading state
      setIsLoading(false);
    }
  };

  // Render prediction results
  const renderPredictionResults = () => {
    if (!prediction) return null;

    return (
      <div className="result-card">
        <h3 className="result-title">Prediction Results</h3>

        <div className="main-result">
          <div className="language-result">
            <span className="result-label">Detected Language:</span>
            <span className="language-name">{prediction.predicted_language}</span>
          </div>

          <div className="progress-container">
            <div
              className="progress-bar"
              style={{ width: `${prediction.confidence.toFixed(2)}%` }}
            ></div>
          </div>

          <div className="confidence-value">
            Confidence: {prediction.confidence.toFixed(2)}%
          </div>
        </div>

        {renderAlternativePredictions()}
      </div>
    );
  };

  // Render alternative predictions
  const renderAlternativePredictions = () => {
    if (!prediction || !prediction.top_predictions || prediction.top_predictions.length <= 1) return null;

    const alternatives = prediction.top_predictions.slice(1);

    return (
      <div className="alternatives">
        <h4 className="alternatives-title">Alternative Predictions:</h4>
        <div className="alternative-list">
          {alternatives.map((alt, index) => (
            <div key={index} className="alternative-item">
              <span>{alt.language}</span>
              <div className="alternative-score">
                <div className="alternative-progress-container">
                  <div
                    className="alternative-progress-bar"
                    style={{ width: `${alt.confidence.toFixed(2)}%` }}
                  ></div>
                </div>
                <span className="alternative-percentage">{alt.confidence.toFixed(2)}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Render error alert
  const renderErrorAlert = () => {
    if (!error) return null;

    return (
      <div className="alert error">
        <AlertCircle className="alert-icon" />
        <span>{error}</span>
      </div>
    );
  };

  // Render loading indicator
  const renderLoadingIndicator = () => {
    if (!isLoading) return (
      <span className="button-content">
        Identify Language <ChevronRight className="button-icon" />
      </span>
    );

    return (
      <span className="loading-indicator">
        <svg className="spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="spinner-track" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="spinner-path" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        Processing...
      </span>
    );
  };

  return (
    <div className="predict-section"> {/* Added the predict-section wrapper */}
      <div className="content-section">
        <h2 className="section-title">
          <Languages className="section-icon" />
          Language Prediction
        </h2>

        <div className="form-group">
          <label htmlFor="text-input" className="form-label">
            Enter text to identify language
          </label>
          <textarea
            id="text-input"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type or paste text here..."
            className="text-input"
          />
        </div>

        <div>
          <button
            onClick={handlePredict}
            disabled={isLoading}
            className={`action-button primary ${isLoading ? 'disabled' : ''}`}
          >
            {renderLoadingIndicator()}
          </button>
        </div>

        {renderErrorAlert()}
        {renderPredictionResults()}
      </div>
    </div>
  );
}

export default Predict;