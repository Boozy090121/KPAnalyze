"use client";

import React, { useState } from 'react';

export interface FileUploadProps {
  multiple?: boolean;
}

export const FileUpload: React.FC<FileUploadProps> = ({ multiple = true }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  
  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  };
  
  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };
  
  const processFiles = (files: FileList) => {
    const newFiles = Array.from(files).filter(file => 
      file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
      file.type === 'application/vnd.ms-excel'
    );
    
    if (newFiles.length === 0) {
      alert('Please upload Excel files only (.xlsx or .xls)');
      return;
    }
    
    if (multiple) {
      setUploadedFiles(prev => [...prev, ...newFiles]);
    } else {
      setUploadedFiles(newFiles);
    }
    
    // Simulate processing
    simulateProcessing(newFiles);
  };
  
  const simulateProcessing = (files: File[]) => {
    setIsProcessing(true);
    setProcessingProgress(0);
    
    const totalSteps = 10;
    let currentStep = 0;
    
    const interval = setInterval(() => {
      currentStep++;
      setProcessingProgress(Math.round((currentStep / totalSteps) * 100));
      
      if (currentStep >= totalSteps) {
        clearInterval(interval);
        setIsProcessing(false);
        
        // In a real implementation, this would process the file and update the dashboard context
        alert(`Successfully processed ${files.length} file(s)`);
      }
    }, 300);
  };
  
  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFiles(e.dataTransfer.files);
    }
  };
  
  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processFiles(e.target.files);
    }
  };
  
  const removeFile = (index: number) => {
    setUploadedFiles(prev => prev.filter((_, i) => i !== index));
  };
  
  return (
    <div className="file-upload-container">
      <div 
        className={`file-upload-area ${dragActive ? 'drag-active' : ''}`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <input 
          type="file" 
          id="file-input" 
          className="file-input" 
          onChange={onFileInputChange}
          accept=".xlsx,.xls"
          multiple={multiple}
        />
        
        <div className="upload-prompt">
          <div className="upload-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
              <polyline points="17 8 12 3 7 8"></polyline>
              <line x1="12" y1="3" x2="12" y2="15"></line>
            </svg>
          </div>
          <h3>Upload Excel Files</h3>
          <p>Drag and drop your Excel files here or click to browse</p>
          <p className="file-types">Supported formats: .xlsx, .xls</p>
          <button className="browse-button" onClick={() => document.getElementById('file-input')?.click()}>
            Browse Files
          </button>
        </div>
      </div>
      
      {isProcessing && (
        <div className="processing-indicator">
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${processingProgress}%` }}></div>
          </div>
          <p>Processing files... {processingProgress}%</p>
        </div>
      )}
      
      {uploadedFiles.length > 0 && (
        <div className="uploaded-files">
          <h4>Uploaded Files ({uploadedFiles.length})</h4>
          <ul className="file-list">
            {uploadedFiles.map((file, index) => (
              <li key={index} className="file-item">
                <span className="file-name">{file.name}</span>
                <span className="file-size">({(file.size / 1024).toFixed(1)} KB)</span>
                <button className="remove-file" onClick={() => removeFile(index)}>×</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
