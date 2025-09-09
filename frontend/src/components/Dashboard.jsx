import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import api from '../api/api';

const Dashboard = () => {
  const [selectedMonth, setSelectedMonth] = useState('');
  const [dashboardData, setDashboardData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

 
  // Generate month options for last 12 months
  const generateMonthOptions = () => {
    const options = [];
    const currentDate = new Date();
    for (let i = 0; i < 12; i++) {
      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() - i, 1);
      const monthValue = date.toISOString().slice(0, 7);
      const monthLabel = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
      });
      options.push({ value: monthValue, label: monthLabel });
    }
    return options;
  };

  const fetchDashboardData = async (month = '', pageParam = 1, limitParam = 10) => {

    setLoading(true);
    setMessage('');

    try {
      const params = new URLSearchParams();
      if (month) params.set('month', month);
      params.set('page', String(pageParam));
      params.set('limit', String(limitParam));
      const response = await api.get(`/api/v1/dashboard`);
      setDashboardData(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData(selectedMonth, page, limit);
  }, [selectedMonth, page, limit]);

  // Reset to first page when month filter changes
  useEffect(() => {
    setPage(1);
  }, [selectedMonth]);

  const formatNumber = (num) => new Intl.NumberFormat('en-IN').format(num);

  return (
    <div className="p-6 px-12 md:px-36 h-auto ">
      <h2 className="text-2xl font-semibold mb-6">Admin Dashboard</h2>

      {/* Filters */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]"></div>

      <div className="bg-white shadow rounded-lg p-4 mb-6">
        <h3 className="text-lg font-medium mb-4">Filters</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Month</label>
            <select
              className="w-full border rounded-md p-2"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
            >
              <option value="">All Months</option>
              {generateMonthOptions().map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Rows per page</label>
            <select
              className="w-full border rounded-md p-2"
              value={limit}
              onChange={(e) => {
                const newLimit = Number(e.target.value) || 10;
                setLimit(newLimit);
                setPage(1);
              }}
            >
              {[10, 20, 50, 100].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          {/* More filters can be added like NGO Region, NGO Name, etc. */}
        </div>
      </div>

      {/* Stats */}
      {dashboardData && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-sm text-gray-500">Total NGOs Reporting</h3>
            <p className="text-xl font-bold">{formatNumber(dashboardData.totalNGOs)}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-sm text-gray-500">Total People Helped</h3>
            <p className="text-xl font-bold">{formatNumber(dashboardData.totalPeopleHelped)}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-sm text-gray-500">Total Events Conducted</h3>
            <p className="text-xl font-bold">{formatNumber(dashboardData.totalEventsConducted)}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-4">
            <h3 className="text-sm text-gray-500">Total Funds Utilized</h3>
            <p className="text-xl font-bold">₹{formatNumber(dashboardData.totalFundsUtilized)}</p>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="shadow rounded-lg overflow-hidden">
        {loading ? (
          <p className="p-4">Loading dashboard data...</p>
        ) : dashboardData?.reportData?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="px-4 py-2 border">NGO</th>
                  <th className="px-4 py-2 border">Region</th>
                  <th className="px-4 py-2 border">Month</th>
                  <th className="px-4 py-2 border">People Helped</th>
                  <th className="px-4 py-2 border">Events</th>
                  <th className="px-4 py-2 border">Funds (₹)</th>
                </tr>
              </thead>
              <tbody>
                {dashboardData.reportData.map((report, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-4 py-2 border">{report.ngo?.name || report.ngoId}</td>
                    <td className="px-4 py-2 border">{report.ngo?.region || '-'}</td>
                    <td className="px-4 py-2 border">{report.month}</td>
                    <td className="px-4 py-2 border">{formatNumber(report.peopleHelped)}</td>
                    <td className="px-4 py-2 border">{formatNumber(report.eventsConducted)}</td>
                    <td className="px-4 py-2 border">{formatNumber(report.fundsUtilized)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="p-4 text-gray-500">No data available</p>
        )}
      </div>


      <div className='mt-4 mb-12 flex flex-col sm:flex-row items-center justify-between gap-3'>
        <div className='text-sm text-gray-600'>
          Page <span className='font-medium'>{page}</span>
          {dashboardData?.totalPages ? (
            <span> of <span className='font-medium'>{dashboardData.totalPages}</span></span>
          ) : null}
        </div>
        <div className='flex items-center gap-2'>
          <button
            type="button"
            className='px-3 py-1.5 rounded border text-sm disabled:opacity-50'
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1 || loading}
          >
            Prev
          </button>
          <button
            type="button"
            className='px-3 py-1.5 rounded border text-sm disabled:opacity-50'
            onClick={() => setPage((p) => p + 1)}
            disabled={loading || (!!dashboardData && !!dashboardData.totalPages && page >= dashboardData.totalPages) || (!!dashboardData && !dashboardData.totalPages && Array.isArray(dashboardData.reportData) && dashboardData.reportData.length < limit)}
          >
            Next
          </button>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
