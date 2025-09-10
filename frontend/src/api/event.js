// without arrow function it works as singelton

export const connectJobStatus = (jobId)=>{

    return new EventSource(`${import.meta.env.VITE_BACKEND}/api/v1/job-status/${jobId}`); //where you import you have to call this}
}