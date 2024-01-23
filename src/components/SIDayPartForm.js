import React, { useState } from 'react';
import instance from '../API';


export function  SIDayPartForm ({ data,  setShowDayPartRuleForm }){
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [enableManualBid, setEnableManualBid] = useState(false);
  const [manualDayPartBid, setManualDayPartBid] = useState('');
  const [lowTimeBid, setLowTimeBid] = useState('');

  const handleSubmit = async () => {
    const formData = {
        "adgroupID" : data, // Include adgroupID in the form data
        "startTime" : startTime,
        "endTime" : endTime,
        "enableManualBid" : enableManualBid.toString(),
        "manualDayPartBid" : manualDayPartBid,
        "DayPartLowBid" : lowTimeBid
    };

    console.log('Form Data:', formData);
    try {
        await instance.post('/saveSIDayPartData', formData);
        window.alert('Data has been submitted');
        setShowDayPartRuleForm(false);
      } catch (error) {
        window.alert('Data not submitted');
        console.error(error);
      }
  };

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };

  return (
    <div>
      {/* <label>
        Start Time:
        <input
          type="text"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
        />
      </label>
      <br />

      <label>
        End Time:
        <input
          type="text"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
        />
      </label>
      <br /> */}

      <label htmlFor="start-time">    Start time:</label>
      <input type='time' id="start-time" value={startTime} onChange={handleStartTimeChange}/>

      <label htmlFor="end-time">      End time:</label>
      <input type='time' id="end-time" value={endTime} onChange={handleEndTimeChange}/>

      <label>
        DayPart Low Bid:
        <input
          type="text"
          value={lowTimeBid}
          onChange={(e) => setLowTimeBid(e.target.value)}
        />
      </label>
      <br />

      <label>
        Enable Manual DayPart Bid:
        <input
          type="checkbox"
          checked={enableManualBid}
          onChange={(e) => setEnableManualBid(e.target.checked)}
        />
      </label>
      <br />
      

      {enableManualBid && (
        <label>
          Manual DayPart Bid:
          <input
            type="text"
            value={manualDayPartBid}
            onChange={(e) => setManualDayPartBid(e.target.value)}
          />
        </label>
      )}
      <br />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

// export default SIDayPartForm;