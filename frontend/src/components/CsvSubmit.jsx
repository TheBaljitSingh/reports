import React from 'react'

export default function CsvSubmit({onBack}) {
  return (
    <div className="w-full max-w-md">
              <button
                onClick={onBack}
                className="mt-4 px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
              >
                Back
              </button>
    </div>
  )
}
