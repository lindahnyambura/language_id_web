import React, { useState } from 'react';
import { AlertCircle, Check, Upload, FileText, ChevronRight } from 'lucide-react';

function UploadData({ API_BASE_URL }) {
  const [file, setFile] = useState(null);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setUploadError(null);
      setUploadSuccess(false);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadError('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      setUploadSuccess(true);
      setFile(null);
      // Reset file input
      document.getElementById('file-upload').value = '';
    } catch (err) {
      setUploadError('An error occurred during upload. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="content-section">
      <h2 className="section-title">
        <Upload className="section-icon" />
        Upload Training Data
      </h2>

      <div className="upload-area">
        <FileText className="upload-icon" />
        <h3 className="upload-title">Upload Dataset File</h3>
        <p className="upload-description">
          Upload CSV or JSON file with labeled text samples for retraining
        </p>

        <input
          id="file-upload"
          type="file"
          accept=".csv, .json"
          onChange={handleFileChange}
          className="file-input"
        />

        <label
          htmlFor="file-upload"
          className="file-button"
        >
          <Upload className="file-button-icon" />
          Browse Files
        </label>

        {file && (
          <div className="selected-file">
            Selected file: <span className="file-name">{file.name}</span>
          </div>
        )}
      </div>

      {file && (
        <div className="upload-actions">
          <button
            onClick={handleUpload}
            disabled={isLoading}
            className={`action-button primary ${isLoading ? 'disabled' : ''}`}
          >
            {isLoading ? (
              <span className="loading-indicator">
                <svg className="spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="spinner-track" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="spinner-path" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Uploading...
              </span>
            ) : (
              <span className="button-content">
                Upload File <ChevronRight className="button-icon" />
              </span>
            )}
          </button>
        </div>
      )}

      {uploadError && (
        <div className="alert error">
          <AlertCircle className="alert-icon" />
          <span>{uploadError}</span>
        </div>
      )}

      {uploadSuccess && (
        <div className="alert success">
          <Check className="alert-icon" />
          <span>File uploaded successfully! You can now trigger retraining.</span>
        </div>
      )}
    </div>
  );
}

export default UploadData;