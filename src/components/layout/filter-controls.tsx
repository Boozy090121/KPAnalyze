"use client";

import React from 'react';

export interface FilterControlsProps {}

export const FilterControls: React.FC<FilterControlsProps> = () => {
  return (
    <div className="filter-controls">
      <div className="filter-group">
        <label htmlFor="date-range">Date Range</label>
        <select id="date-range" className="filter-select">
          <option value="last-7-days">Last 7 Days</option>
          <option value="last-30-days">Last 30 Days</option>
          <option value="last-90-days">Last 90 Days</option>
          <option value="year-to-date">Year to Date</option>
          <option value="custom">Custom Range</option>
        </select>
      </div>
      
      <div className="filter-group">
        <label htmlFor="process-type">Process Type</label>
        <select id="process-type" className="filter-select">
          <option value="all">All Processes</option>
          <option value="type-a">Process Type A</option>
          <option value="type-b">Process Type B</option>
          <option value="type-c">Process Type C</option>
        </select>
      </div>
      
      <div className="filter-group">
        <label htmlFor="department">Department</label>
        <select id="department" className="filter-select">
          <option value="all">All Departments</option>
          <option value="dept-a">Department A</option>
          <option value="dept-b">Department B</option>
          <option value="dept-c">Department C</option>
        </select>
      </div>
      
      <button className="filter-apply-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 11 12 14 22 4"></polyline>
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path>
        </svg>
        Apply Filters
      </button>
      
      <button className="filter-reset-button">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12a9 9 0 0 1-9 9c-2.39 0-4.68-.94-6.4-2.6"></path>
          <path d="M3 12a9 9 0 0 1 9-9c2.39 0 4.68.94 6.4 2.6"></path>
          <path d="M17.73 15.73 21 12l-3.27-3.73"></path>
          <path d="M6.27 8.27 3 12l3.27 3.73"></path>
        </svg>
        Reset
      </button>
    </div>
  );
};
