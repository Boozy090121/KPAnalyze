"use client";

import React, { createContext, useContext, useState } from 'react';

// Define context types
interface DashboardContextType {
  // Data state
  rawData: Record<string, any>[] | null;
  setRawData: (data: Record<string, any>[] | null) => void;
  
  // File processing state
  isProcessing: boolean;
  processingProgress: number;
  processingStage: 'idle' | 'parsing' | 'analyzing' | 'complete' | 'error';
  processingError: string | null;
  
  // Filter state
  filters: {
    dateRange: { startDate: Date | null; endDate: Date | null };
    processTypes: string[];
    departments: string[];
  };
  setFilters: (filters: any) => void;
  
  // File handling
  handleFileUpload: (files: File[]) => void;
  resetData: () => void;
}

// Create context with default values
const DashboardContext = createContext<DashboardContextType>({
  rawData: null,
  setRawData: () => {},
  isProcessing: false,
  processingProgress: 0,
  processingStage: 'idle',
  processingError: null,
  filters: {
    dateRange: { startDate: null, endDate: null },
    processTypes: [],
    departments: []
  },
  setFilters: () => {},
  handleFileUpload: () => {},
  resetData: () => {}
});

// Custom hook to use the dashboard context
export const useDashboard = () => useContext(DashboardContext);

// Provider component
export const DashboardProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Data state
  const [rawData, setRawData] = useState<Record<string, any>[] | null>(null);
  
  // File processing state
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [processingStage, setProcessingStage] = useState<'idle' | 'parsing' | 'analyzing' | 'complete' | 'error'>('idle');
  const [processingError, setProcessingError] = useState<string | null>(null);
  
  // Filter state
  const [filters, setFilters] = useState({
    dateRange: { startDate: null as Date | null, endDate: null as Date | null },
    processTypes: [] as string[],
    departments: [] as string[]
  });
  
  // Handle file upload - supports multiple files
  const handleFileUpload = async (files: File[]) => {
    try {
      setIsProcessing(true);
      setProcessingStage('parsing');
      setProcessingProgress(0);
      setProcessingError(null);
      
      // Simulate file processing with progress updates
      let currentProgress = 0;
      const progressInterval = setInterval(() => {
        currentProgress += 5;
        if (currentProgress <= 40) {
          setProcessingProgress(currentProgress);
        } else if (currentProgress === 45) {
          setProcessingStage('analyzing');
        } else if (currentProgress < 100) {
          setProcessingProgress(currentProgress);
        } else {
          clearInterval(progressInterval);
          setProcessingProgress(100);
          setProcessingStage('complete');
          setIsProcessing(false);
          
          // Generate mock data based on number of files
          const mockData = generateMockData(files.length * 50);
          setRawData(mockData);
        }
      }, 200);
      
    } catch (error: any) {
      setProcessingError(error.message);
      setProcessingStage('error');
      setIsProcessing(false);
    }
  };
  
  // Generate mock data for demonstration
  const generateMockData = (count: number) => {
    const processTypes = ['Type A', 'Type B', 'Type C', 'Type D'];
    const departments = ['Dept 1', 'Dept 2', 'Dept 3'];
    const statuses = [true, false];
    
    return Array.from({ length: count }, (_, i) => {
      const processType = processTypes[Math.floor(Math.random() * processTypes.length)];
      const department = departments[Math.floor(Math.random() * departments.length)];
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const duration = Math.round((2 + Math.random() * 8) * 10) / 10;
      
      return {
        id: `BATCH-${1000 + i}`,
        timestamp: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000),
        processType,
        department,
        status,
        duration,
        operator: `Operator ${Math.floor(Math.random() * 10) + 1}`,
        temperature: Math.round((36 + Math.random() * 4) * 10) / 10,
        pressure: Math.round((100 + Math.random() * 20) * 10) / 10
      };
    });
  };
  
  // Reset all data
  const resetData = () => {
    setRawData(null);
    setProcessingStage('idle');
    setProcessingProgress(0);
    setProcessingError(null);
    setFilters({
      dateRange: { startDate: null, endDate: null },
      processTypes: [],
      departments: []
    });
  };
  
  // Create context value
  const contextValue = {
    rawData,
    setRawData,
    isProcessing,
    processingProgress,
    processingStage,
    processingError,
    filters,
    setFilters,
    handleFileUpload,
    resetData
  };
  
  return (
    <DashboardContext.Provider value={contextValue}>
      {children}
    </DashboardContext.Provider>
  );
};
