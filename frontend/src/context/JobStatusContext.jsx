import React, { createContext, useContext, useRef, useState } from 'react';
import { connectJobStatus } from '../api/event';

const JobStatusContext = createContext();

export function JobStatusProvider({ children }) {
  const [currentJobId, setCurrentJobId] = useState('');
  const [status, setStatus] = useState(null);
  const [isFetching, setisFetching] = useState(false);
  const [buttonState, setButtonState] = useState('check'); // 'check', 'checking', 'stop'
  const eventSourceRef = useRef(null);

  const startFetching = (jobId) => {
    // Stop any existing Fetching
    stopFetching();
    
    if (!jobId) return;

    setCurrentJobId(jobId);
    setStatus(null);
    setisFetching(true);
    setButtonState('checking');

    const eventSource = connectJobStatus(jobId);
    eventSourceRef.current = eventSource;

    eventSource.onopen = () => {
      console.log("SSE connection opened for job:", jobId);
    };

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setStatus(data);
      console.log("Job status update:", data);

      if (data.status === "completed" || data.status === "failed") {
        eventSource.close();
        setisFetching(false);
        setButtonState('check');
      }
    };

    eventSource.onerror = (err) => {
      console.error("SSE error for job:", jobId, err);
      eventSource.close();
      setisFetching(false);
      setButtonState('check');
    };
  };

  const stopFetching = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
    }
    setisFetching(false);
    setButtonState('check');
  };

  const checkJobStatus = (jobId) => {
    if (isFetching && currentJobId === jobId) {
      // If already Fetching the same job, stop it
      stopFetching();
    } else {
      // Start Fetching the new job
      startFetching(jobId);
    }
  };

  const getButtonText = () => {
    if (isFetching) {
      return buttonState === 'checking' ? 'Checking...' : 'Stop';
    }
    return 'Check';
  };

  const getButtonState = () => {
    if (isFetching) {
      return buttonState === 'checking' ? 'checking' : 'stop';
    }
    return 'check';
  };

  const value = {
    currentJobId,
    status,
    isFetching,
    buttonState: getButtonState(),
    buttonText: getButtonText(),
    checkJobStatus,
    stopFetching,
    setCurrentJobId
  };

  return (
    <JobStatusContext.Provider value={value}>
      {children}
    </JobStatusContext.Provider>
  );
}

export function useJobStatus() {
  const context = useContext(JobStatusContext);
  if (!context) {
    throw new Error('useJobStatus must be used within a JobStatusProvider');
  }
  return context;
}
