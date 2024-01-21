import React, { useState } from 'react';
import instance from '../API';

export function BiddingRuleForm({ data ,  setShowBiddingRuleForm}){
  const [selectedOption, setSelectedOption] = useState('Target ACOS');
  const [optimizedBidding, setOptimizedBidding] = useState(false);
  const [maxBidIncrease, setMaxBidIncrease] = useState('');
  const [maxBidDecrease, setMaxBidDecrease] = useState('');
  const [targetValue, setTargetValue] = useState('');

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleCheckboxChange = () => {
    setOptimizedBidding(!optimizedBidding);
  };

  const handleMaxBidIncreaseChange = (e) => {
    setMaxBidIncrease(e.target.value);
  };

  const handleMaxBidDecreaseChange = (e) => {
    setMaxBidDecrease(e.target.value);
  };

  const handleTargetValueChange = (e) => {
    setTargetValue(e.target.value);
  };

  const handleSubmit = async () => {
    // Prepare data object to send to the API
    const formData = {
        "AdGroupID" : data,
        "Bid Adjustment" :selectedOption,
        "Target Value" :targetValue,
        "Bid Optimization" :optimizedBidding,
        "MaxIncrease" :maxBidIncrease,
        "MaxDecrease" :maxBidDecrease
    };
    console.log(formData)

    try {
        await instance.post('/BiddingRule', formData);
        window.alert('Data has been submitted');
        setShowBiddingRuleForm(false);
      } catch (error) {
        window.alert('Data not submitted');
        console.error(error);
      }

  };

  return (
    <div>
      <label>
        Select Option:
        <select value={selectedOption} onChange={handleOptionChange}>
          <option value="Target ACOS">Target ACOS</option>
          <option value="Target TOSI%">Target TOSI%</option>
        </select>
      </label>

      <br />

      {selectedOption === 'Target ACOS' || selectedOption === 'Target TOSI%' ? (
        <label>
          {selectedOption === 'Target ACOS' ? 'Target ACOS' : 'Target TOSI%'}:
          <input
            type="number"
            value={targetValue}
            onChange={handleTargetValueChange}
          />
        </label>
      ) : null}

      <br />

      <label>
        <input
          type="checkbox"
          checked={optimizedBidding}
          onChange={handleCheckboxChange}
        />
        Optimized Bidding
      </label>

      <br />

        <label>
            Max Bid Increase %:
            <input
              type="number"
              value={maxBidIncrease}
              onChange={handleMaxBidIncreaseChange}
            />
          </label>

          <br />

          <label>
            Max Bid Decrease %:
            <input
              type="number"
              value={maxBidDecrease}
              onChange={handleMaxBidDecreaseChange}
            />
          </label>

          <br />


      <br />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};