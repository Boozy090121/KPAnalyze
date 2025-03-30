"use client";

import React, { useState, useEffect } from 'react';
import { DashboardProvider } from '@/context/dashboard-context';
import { DashboardLayout } from '@/components/layout/dashboard-layout';
import { DashboardTabs } from '@/components/layout/dashboard-tabs';
import { FileUpload } from '@/components/dashboard/file-upload';
import { DashboardOverview } from '@/components/dashboard/dashboard-overview';
import { ProcessAnalysis } from '@/components/dashboard/process-analysis';
import { PatternAnalysis } from '@/components/dashboard/pattern-analysis';
import { PredictiveAnalytics } from '@/components/dashboard/predictive-analytics';
import { FilterControls } from '@/components/layout/filter-controls';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading dashboard data
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'dashboard' },
    { id: 'process', label: 'Process Analysis', icon: 'bar-chart' },
    { id: 'patterns', label: 'Pattern Analysis', icon: 'trending-up' },
    { id: 'predictive', label: 'Predictive Analytics', icon: 'activity' }
  ];

  const renderTabContent = () => {
    if (isLoading) {
      return (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading dashboard data...</p>
        </div>
      );
    }

    switch (activeTab) {
      case 'overview':
        return <DashboardOverview />;
      case 'process':
        return <ProcessAnalysis />;
      case 'patterns':
        return <PatternAnalysis />;
      case 'predictive':
        return <PredictiveAnalytics />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <DashboardProvider>
      <DashboardLayout>
        <div className="dashboard-header-actions">
          <FileUpload />
          <FilterControls />
        </div>
        <DashboardTabs 
          tabs={tabs} 
          activeTab={activeTab} 
          onTabChange={setActiveTab} 
        />
        <div className="dashboard-content-container">
          {renderTabContent()}
        </div>
      </DashboardLayout>
    </DashboardProvider>
  );
}
