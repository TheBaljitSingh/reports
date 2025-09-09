import React, { useEffect, useMemo, useRef, useState } from 'react'
import api from '../api/api';

export default function CheckStatus() {
  const [currentJobId, setCurrentJobId] = useState('');
  const [status, setStatus] = useState(null);
  const [isPolling, setIsPolling] = useState(false);
  const intervalRef = useRef(null);

  // Read saved jobIds from localStorage
  const savedJobs = useMemo(() => {
    try {
      return JSON.parse(localStorage.getItem('reportJobIds') || '[]');
    } catch (_e) {
      return [];
    }
  }, [status]);

  const fetchStatus = async ()=>{
    if (!currentJobId) return;
    
    setIsPolling(true);
    console.log("interval");

    if(intervalRef.current){
      clearInterval(intervalRef.current);
    }

    const startTime = Date.now(); // max 1 min.
    intervalRef.current = setInterval(async()=>{
      try {
        const {data} = await api.get(`/api/v1/job-status/${currentJobId}`);
        setStatus(data);
  
        if(data.status==='completed' || data.status==='failed'){
          clearInterval(intervalRef.current);
          setIsPolling(false);
          intervalRef.current=null;
        }

        if(Date.now() - startTime >=60 *1000){
          clearInterval(intervalRef.current);
          setIsPolling(false);
        }
      } catch (error) {

        console.log(error);
        clearInterval(intervalRef.current);
        setIsPolling(false);
        intervalRef.current=null;
      }

    },2000)
  }

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
            onChange={(e)=>setCurrentJobId(e.target.value)}
          />
        </div>
          <button  onClick={fetchStatus} className='px-4 hover:cursor-pointer py-2 bg-gradient-to-r font-bold from-purple-600 to-indigo-600 text-white rounded-md text-sm'>Check</button>
      </div>

      { (
        <div className='mt-6'>
          <div className='flex items-center justify-between mb-2'>
            <h3 className='text-sm font-medium text-gray-700'>Processing Progress</h3>
            <span className='text-xs text-gray-500'>{isPolling ? 'Polling…' : 'Completed'}</span>
          </div>
          <div className='mt-1 h-2 w-full rounded-full bg-gray-100 overflow-hidden'>
            <div className='h-2 bg-blue-600 transition-all' style={{ width: `${percent}%` }} />
          </div>
          <p className='text-xs text-gray-500 mt-2'>
            {status?.progress?.processed || 0} of {status?.progress?.total || 0} rows completed
            {status?.progress?.failed > 0 && ` (${status?.progress?.failed} failed)`}
          </p>
          <p className='text-xs text-gray-400'>Status: {status?.progress?.current || 0}/{status?.progress?.total || 0}</p>
          <p className='text-xs mt-2'>Status: <span className='font-medium'>{status?.status}</span></p>
        </div>
      )}
    </div>
  )
}
