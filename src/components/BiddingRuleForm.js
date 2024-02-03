import React, { useState, useEffect } from 'react';
import instance from '../API';

export function BiddingRuleForm({ data, setShowBiddingRuleForm }) {
  const [selectedOption, setSelectedOption] = useState('Target ACOS');
  const [optimizedBidding, setOptimizedBidding] = useState(false);
  const [maxBidIncrease, setMaxBidIncrease] = useState('');
  const [maxBidDecrease, setMaxBidDecrease] = useState('');
  const [targetValue, setTargetValue] = useState('');
  const [keyWordData, setKeyWordData] = useState([]);
  const [selectedBidSource, setSelectedBidSource] = useState('');
  const [fetchKeywordsData, setfetchKeywordsData] = useState(0);


  useEffect(() => {
    console.log(fetchKeywordsData)
    // Function to fetch data from the API endpoint
    const fetchDataofKeyWords = async () => {
      try {
          console.log("Inside Try");
          const response = await instance.get('/getData:KeywordList_'+data);
          console.log(response)
          if (response.status !== 200) {
            throw new Error('Network response was not ok');
          }
          const theData = response.data.data;

          // setKeyWordRawData(theData); // Set the fetched data to the state 
          // console.log(KeyWordRawData);
          const firstOption = {"type":"Keyword","label": "Create New","id":""}
          const KeywordsOp = JSON.parse(theData).map((item) => {
            return {"type":"Keyword","label": item.keywordText,"bid":item.bid, 
            "State": item.state, "MatchType":item.matchType,  
            "id": item.keywordId }
          })
          const KeywordsFull = [firstOption,...KeywordsOp]
          console.log(KeywordsFull);
          setKeyWordData(KeywordsFull);
          // addSelect(KeywordsFull)
      } catch (error) {
          console.log(error);
          // setError(error.message); // Handle any error that occurs during fetching
      } finally {
      }
      
    };

    if(fetchKeywordsData > 0)
    {
      setfetchKeywordsData(0);
      fetchDataofKeyWords();
    }
  
  }, [fetchKeywordsData]);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    if(e.target.value === "Target TOSI%"){
      setfetchKeywordsData(fetchKeywordsData+1);
    }
    setOptimizedBidding(false); // Reset optimizedBidding when the option changes
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

  const handleBidSourceChange = (e) => {
    setSelectedBidSource(e.target.value);
  };

  const handleSubmit = async () => {
    // Prepare data object to send to the API
    const formData = {
      "ResourceID" : data,
      "Bid Adjustment" : selectedOption,
      "Target Value": targetValue,
      "Bid Optimization": optimizedBidding,
      "MaxIncrease" : maxBidIncrease,
      "MaxDecrease" : maxBidDecrease,
      "Bid Source" : selectedBidSource,
    };

    console.log(formData);

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

      {selectedOption === 'Target TOSI%' ? (
        <label>
          Select Keyword:
          <select value={selectedBidSource} onChange={handleBidSourceChange}>
            {keyWordData.map((source) => (
              <option id={source.id} value={source.id}>
                {source.label}
              </option>
            ))}
          </select>
        </label>
      ) : null}

      <br />

      <label>
        {selectedOption === 'Target ACOS' ? (
          <>
            <input
              type="checkbox"
              checked={optimizedBidding}
              onChange={handleCheckboxChange}
            />
            Optimized Bidding
          </>
        ) : null}
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
}
