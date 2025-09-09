import React, { useState } from 'react'
import ReportForm from './ReportForm'
import BulkUpload from './BulkUpload'
import CheckStatus from "./CheckStatus"

export default function Upload() {
  const [activeTab, setActiveTab] = useState('single')

  return (
    <div className="min-h-[calc(100vh-8rem)] bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-gray-800">Upload Reports</h1>
          <p className="text-sm text-gray-500 mt-1">Submit a single monthly report or upload a CSV for bulk processing.</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="flex items-center border-b border-gray-100 overflow-x-auto">
            <button
              type="button"
              onClick={() => setActiveTab('single')}
              className={`px-5 py-3 text-sm font-medium transition-colors ${activeTab === 'single' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Single Report
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('bulk')}
              className={`px-5 py-3 text-sm font-medium transition-colors ${activeTab === 'bulk' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              CSV Bulk Upload
            </button>
                <button
              type="button"
              onClick={() => setActiveTab('status')}
              className={`px-5 py-3 text-sm font-medium transition-colors ${activeTab === 'status' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            >
              Check Status
            </button>
          </div>

          <div className="p-6 md:p-8">
            <div className="max-h-[65vh] overflow-auto">
              {activeTab === 'single' ? (
                <ReportForm />
              ) : activeTab==='bulk'?(
                <BulkUpload />
              ):(<CheckStatus/>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
