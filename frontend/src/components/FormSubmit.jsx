import React, {useState} from 'react'

export default function FormSubmit({ onBack }) {
  const [formData, setFormData] = useState({});

  const handleChange= ()=>{
    
    const {name, value} = e.target;

    setFormData((prev)=>({...prev, [name]:value}))

  }

  const handleSubmit = (e)=>{
    e.preventDefault();
        console.log("Form submitted:", formData)

  }

  return (
    <div className="w-full max-w-4xl h-full">
      <button
        onClick={onBack}
        className="mt-4 px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
      >
        Back
      </button>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* NGO ID */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            NGO ID
          </label>
          <input
            type="text"
            name="ngoId"
            value={formData.ngoId}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Month */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Month
          </label>
          <input
            type="month"
            name="month"
            value={formData.month}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* People Helped */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            People Helped
          </label>
          <input
            type="number"
            name="peopleHelped"
            value={formData.peopleHelped}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Events Conducted */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Events Conducted
          </label>
          <input
            type="number"
            name="eventsConducted"
            value={formData.eventsConducted}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Funds Utilized */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Funds Utilized
          </label>
          <input
            type="number"
            name="fundsUtilized"
            value={formData.fundsUtilized}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Submit Report
        </button>
      </form>


    </div>

  )
}
