import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const BulkUpload = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [jobId, setJobId] = useState(null);
  const [progress, setProgress] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setMessage('');
    setJobId(null);
    setProgress(null);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please select a CSV file")
      return;
    }

    setUploading(true);
    setMessage('');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND}/api/v1/reports/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if(response.status===200){ 
        setJobId(response.data.jobId);
        setMessage({type:'success', text:`Processing this JobId: ${response.data.jobId}`})
        toast.success("File uploaded successfully! Processing...")
      }
    } catch (error) {
      console.log(error);
      toast.error("Error while uploading file")
      
    } finally {
      setUploading(false);
    }
  };

  // Poll for job status
  useEffect(() => {
    if (!jobId) return;

    const pollInterval = setInterval(async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND}/api/v1/job-status/${jobId}`);
        const jobData = response.data;
        
        setProgress(jobData.progress);
        
        if (jobData.status === 'completed') {
          setMessage({ 
            type: 'success', 
            text: `JobId: ${jobId} | Processing completed! ${jobData.progress?.processed || 0} rows processed successfully.` 
          });
          clearInterval(pollInterval);
        } else if (jobData.status === 'failed') {
          setMessage({ 
            type: 'error', 
            text: 'Processing failed. Please try again.' 
          });
          clearInterval(pollInterval);
        }
      } catch (error) {
        console.error('Error polling job status:', error);
      }
    }, 2000);

    return () => clearInterval(pollInterval);
  }, [jobId]);

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-800">Bulk Upload CSV Reports</h2>
      <p className="text-sm text-gray-500 mt-1">Upload a CSV file containing multiple monthly reports.</p>

      <form onSubmit={handleUpload} className="mt-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700">CSV File</label>
          <div className="mt-2 flex items-center gap-3">
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              required
              className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
          </div>
          {file && (
            <p className="text-xs text-gray-500 mt-1">Selected: {file.name}</p>
          )}
        </div>

        <button type="submit" disabled={uploading || !file} className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-purple-600 to-indigo-600  px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 disabled:opacity-50">
          {uploading ? 'Uploading...' : 'Upload CSV'}
        </button>
      </form>

      {message && (
        <div className={`mt-4 text-sm rounded-md px-3 py-2 ${message.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
          {message.text}
        </div>
      )}

      {progress && (
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-700">Processing Progress</h3>
          <div className="mt-2 h-2 w-full rounded-full bg-gray-100 overflow-hidden">
            <div 
              className="h-2 bg-blue-600 transition-all"
              style={{ width: `${Math.min(100, Math.round((progress.processed / progress.total) * 100))}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-2">
            {progress.processed} of {progress.total} rows completed
            {progress.failed > 0 && ` (${progress.failed} failed)`}
          </p>
          <p className="text-xs text-gray-400">Status: {progress.current}/{progress.total}</p>
        </div>
      )}
    </div>
  );
};

export default BulkUpload;
