import { useState } from 'react';
import instance from '../API';

export function SmartDayPartForm({ data ,  setKeywordId}) {
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [biddingStyle, setBiddingStyle] = useState('')
  const [newInput, setNewInput] = useState([])
  const [manualBid,setManualBid] = useState('')
  const [optimization,setOptimization] = useState('')

  console.log(data)

  const handleSubmit = async (e) => {
    e.preventDefault();
    let data1 = {}
    if(biddingStyle === "ManualFixedBid"){
      data1 = { keywordID:data.id, startTime, endTime, biddingStyle, oldBid:data.bid, manualBid };
    }else{
      data1 = { keywordID:data.id, startTime, endTime, biddingStyle, oldBid:data.bid, optimization};
    }
    console.log(data1)
    try {
      await instance.post('/SmartBidAdgroup', data1);
      window.alert('Data has been submitted');
      setKeywordId(null)
    } catch (error) {
      window.alert('Data not submitted');
      console.error(error);
    }
  };



  const handleOptiChange = (event) => {
    console.log(event);
    const { name, value } = event.target;
    setBiddingStyle(value);
    console.log(value)

    if(value === "ManualFixedBid")
    {
      console.log(value)
      // setNewInput([]);
      setNewInput([<label>Manual Fixed Bid<input  key='1' type="text" onChange={handleManualBidChange}/></label>]);
    }
    if(value === "Optimised" || value === "Aggressive")
    {
      // setNewInput([]);
      setNewInput([<label>Desired TOSI%<input  key='1' type="text" onChange={handleOptimizationChange} readOnly={false}/></label>]);
    }

  };

const handleManualBidChange = (e) =>{
  setManualBid(e.target.value);
}

const handleOptimizationChange = (e) =>{
  setOptimization(e.target.value);
}

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

      <label htmlFor="start-time">    Start time:</label>
      <input type='time' id="start-time" value={startTime} onChange={handleStartTimeChange}/>

      <label htmlFor="end-time">      End time:</label>
      <input type='time' id="end-time" value={endTime} onChange={handleEndTimeChange}/>
    
      <label>
          Biding Style: 
          <select name="biddingStyle" value={biddingStyle} onChange={handleOptiChange} required>
          <option value=""></option>  
          <option value="ManualFixedBid">Manual Fixed Bid</option>  
          <option value="Optimised">Optimised</option>
          <option value="Aggressive">Aggressive</option>
          </select>
      </label>

      <div>
        {newInput}
      </div>

      <br />
      <button onClick={()=>{setKeywordId(null)}}> Close</button>
      <button type="submit"> Submit</button>

      

    </form>
);
}