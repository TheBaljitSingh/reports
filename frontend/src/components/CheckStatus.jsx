import React, { useEffect, useMemo, useState } from 'react'
import api from '../api/api';
import { useJobStatus } from '../context/JobStatusContext';

export default function CheckStatus() {
  const { 
    currentJobId, 
    status, 
    isFetching, 
    buttonState, 
    buttonText, 
    checkJobStatus, 
    stopFetching, 
    setCurrentJobId,
    message, setMessage
  } = useJobStatus();

  
  const [savedJobs] = useState(JSON.parse(localStorage.getItem('reportJobIds' || [])));


  const handleCheckStatus = () => {
    if (!currentJobId) return;
    checkJobStatus(currentJobId);
  };




  const percent = status?.progress?.total
    ? Math.min(100, Math.round((status.progress.processed / status.progress.total) * 100))
    : 0;

  return (
    <div>
      <div className='mb-4 space-y-6'>
        <label className='block text-sm font-medium text-gray-700 mb-1'>Select a saved JobId</label>
        <div className='flex gap-2'>
          <select
            className='border rounded-md px-2 py-2 text-sm'
            value={currentJobId}
            onChange={(e)=>setCurrentJobId(e.target.value)}
          >
            <option value=''>Job Id </option>
            {savedJobs.map((j)=> (
              <option key={j.id} value={j.id}>{j.id}</option>
            ))}
          </select>
          <input
            type='text'
            placeholder='Or enter JobId...'
            className='border rounded-md px-2 py-2 text-sm flex-1'
            value={currentJobId}
            onChange={(e)=>{
              setMessage(null)
              setCurrentJobId(e.target.value)
            }}
          />
        </div>
          <button  
            onClick={handleCheckStatus}  
            type="button" 
            className={`${buttonState} inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white shadow-sm disabled:opacity-50 ${
               'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700'
            }`}
      
            disabled={!currentJobId}
          >  
            {buttonText}
          </button>
          
      </div>

      {status && (
        <div className='mt-6'>
          <div className='flex items-center justify-between mb-2'>
            <h3 className='text-sm font-medium text-gray-700'>Processing Progress</h3>
            <span className='text-xs text-gray-500'>
              {isFetching ? 'Fetching...' : (status?.status === 'completed' ? 'Completed' : status?.status === 'failed' ? 'Failed' : 'Stopped')}
            </span>
          </div>
          <div className='mt-1 h-2 w-full rounded-full bg-gray-100 overflow-hidden'>
            <div 
              className={`h-2 transition-all bg-blue-600`} 
              style={{ width: `${percent}%` }} 
            />
          </div>
          <p className='text-xs text-gray-500 mt-2'>
            {status?.progress?.processed || 0} of {status?.progress?.total || 0} rows completed
            {status?.progress?.failed > 0 && ` (${status?.progress?.failed} failed)`}
          </p>
          <p className='text-xs text-gray-400'>Progress: {status?.progress?.current || 0}/{status?.progress?.total || 0}</p>
          <p className='text-xs mt-2'>
            Status: <span className={`font-medium ${
              status?.status === 'completed' ? 'text-green-600' : 
              status?.status === 'failed' ? 'text-red-600' : 
              'text-blue-600'
            }`}>{status?.status}</span>
          </p>
        </div>
      )}
         {message && (
        <div className={`mt-4 text-sm rounded-md px-3 py-2 ${message.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'}`}>
          {message.text}
        </div>
      )}
    </div>
  )
}
