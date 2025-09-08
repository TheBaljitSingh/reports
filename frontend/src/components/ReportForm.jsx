import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ReportForm = () => {
  const [formData, setFormData] = useState({
    ngoId: '68bb2151998ad3d67e1d8d71',
    month: '',
    peopleHelped: '',
    eventsConducted: '',
    fundsUtilized: ''
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND}/api/v1/report`, formData);
      console.log(response);
      if(response.status===201){
        setMessage({ type: 'success', text: 'Report submitted successfully!' });
        toast.success("submitted successfully");
      }
        setFormData({
          ngoId: '',
          month: '',
          peopleHelped: '',
          eventsConducted: '',
          fundsUtilized: ''
        });
    } catch (error) {
      toast.error("Error while submitting, try again later");
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-800">Submit Single Report</h2>
      <p className="text-sm text-gray-500 mt-1">Provide monthly metrics for an NGO.</p>

      <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label htmlFor="ngoId" className="block text-sm font-medium text-gray-700">NGO ID</label>
          <input
            type="text"
            id="ngoId"
            name="ngoId"
            value={formData.ngoId}
            onChange={handleChange}
            required
            placeholder="Enter NGO ID"
            className="mt-2 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
          />
        </div>

        <div>
          <label htmlFor="month" className="block text-sm font-medium text-gray-700">Month</label>
          <input
            type="month"
            id="month"
            name="month"
            value={formData.month}
            onChange={handleChange}
            required
            className="mt-2 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
          />
        </div>

        <div>
          <label htmlFor="peopleHelped" className="block text-sm font-medium text-gray-700">People Helped</label>
          <input
            type="number"
            id="peopleHelped"
            name="peopleHelped"
            value={formData.peopleHelped}
            onChange={handleChange}
            required
            min="0"
            placeholder="Number of people helped"
            className="mt-2 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
          />
        </div>

        <div>
          <label htmlFor="eventsConducted" className="block text-sm font-medium text-gray-700">Events Conducted</label>
          <input
            type="number"
            id="eventsConducted"
            name="eventsConducted"
            value={formData.eventsConducted}
            onChange={handleChange}
            required
            min="0"
            placeholder="Number of events conducted"
            className="mt-2 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
          />
        </div>

        <div>
          <label htmlFor="fundsUtilized" className="block text-sm font-medium text-gray-700">Funds Utilized</label>
          <input
            type="number"
            id="fundsUtilized"
            name="fundsUtilized"
            value={formData.fundsUtilized}
            onChange={handleChange}
            required
            min="0"
            placeholder="Amount of funds utilized"
            className="mt-2 p-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-sm"
          />
        </div>

        <div className="md:col-span-2">
          <button type="submit" className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-purple-600 to-indigo-600  px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 disabled:opacity-50" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Report'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ReportForm;
