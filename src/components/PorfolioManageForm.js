import React, { useState } from 'react';
import moment from 'moment';
import instance from '../API';


export function  PortfolioManageForm({ data,  setShowPortfolioCapForm }){
  const [salesCap, setSalesCap] = useState('');
  const [dateRange, setDateRange] = useState('');


  const handleSubmit = async () => {

    const formData = {
        "ResourceID" : data, // Include portfolioID in the form data
        "SalesCap" : salesCap,
        "DateRange" : dateRange,
        "InitDate" : "",
        "portfolioCapped" : 0
    };

    console.log('Form Data:', formData);
    try {
        await instance.post('/savePortfolioCapData', formData);
        window.alert('Data has been submitted');
        setShowPortfolioCapForm(false);
      } catch (error) {
        window.alert('Data not submitted');
        console.error(error);
      }
  };

  return (
    <div>
      <label>
        Sales Cap ($) :
        <input
          type="text"
          value={salesCap}
          onChange={(e) => setSalesCap(e.target.value)}
        />
      </label>
      <br />
      <label>
        Set Date Range (Days) :
        <input
          type="text"
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
        />
      </label>
      <br />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

// export default SIDayPartForm;