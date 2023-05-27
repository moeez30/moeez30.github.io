import { useState } from 'react';
import instance from '../API';

export function DayPartForm({ data ,  setKeywordId}) {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [modBid , setModBid] = useState(data.bid)
  const [startBid, setStartBid] = useState(0)

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data1 = { kID:data.id, startBid, modBid, startTime, endTime };

    try {
      await instance.post('/DayPartKeyword', data1);
      window.alert('Data has been submitted');
      setKeywordId(null)
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

  const minStartTime = new Date();
  minStartTime.setHours(minStartTime.getHours() - 12);
  const minStartTimeString = minStartTime.toISOString().slice(0, 16);
return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="number">Reset Bid:</label>
      <input type="text" id="number" value={modBid} onChange={(e)=>{setModBid(e.target.value)}} />

      <label htmlFor="number">Day Part Bid:</label>
      <input type="text" id="number" value={startBid} onChange={(e)=>{setStartBid(e.target.value)}} />

      <label htmlFor="start-time">Start time:</label>
      <input type="datetime-local" id="start-time" value={startTime} onChange={handleStartTimeChange} min={minStartTimeString} required />

      <label htmlFor="end-time">End time:</label>
      <input type="datetime-local" id="end-time" value={endTime} onChange={handleEndTimeChange} min={startTime} required />
    
      <button onClick={()=>{setKeywordId(null)}}>Close</button>
<button type="submit">Submit</button>

</form>
);
}