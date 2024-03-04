import React, { useCallback, useState, useEffect } from 'react';
import Select from 'react-select'
import axios from 'axios';
import instance from "../API";
import { BiddingRuleForm } from '../components/BiddingRuleForm';
import { SIDayPartForm } from '../components/SIDayPartForm';
import { PortfolioManageForm } from '../components/PorfolioManageForm';
let columnNum = 0;
let rowID = '';
let RulesInfo = [
                {"id" : 1, "name" : "Select Rule"},
                {"id" : 2, "name" : "Portfolio Budget Manage Rule"},
                {"id" : 3, "name" : "Bidding Rule"},
                {"id" : 4, "name" : "DayParting Rule"},
                {"id" : 5, "name" : "Import Rule"},
                {"id" : 6, "name" : "Negative Rule"},
                {"id" : 7, "name" : "Negative Word Rule"},
                {"id" : 8, "name" : "Blacklist/Whitelist Rule"},
                {"id" : 9, "name" : "Revive Rule"},
                {"id" : 10, "name" : "Default Bid Rule"},
                {"id" : 11, "name" : "Status Rule"},
                {"id" : 12, "name" : "Daily Budget Rule"},
                {"id" : 13, "name" : "Placement Rule"}
              ] 
let BiddingRuleInfo = {"id" : 1, "name" : "Bidding Rule"}
const App = () => {
  const [data0, setData0] = useState([]);
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState(RulesInfo);
  const [tableData, setTableData] = useState([]);
  const [columnHeaders, setColumnHeaders] = useState(['Portfolio','Campaign', 'Adgroup']);
  const [portfolioId, setPortfolioId] = useState(0);
  const [campaignId, setCampaignId] = useState(0);
  const [adGroupId, setAdGroupId] = useState(0);
  const [campaignRawData, setcampaignRawData] = useState([]);
  const [adGroupRawData, setadGroupRawData] = useState([]);
  const [fetchPortfolioData, setfetchPortfolioData] = useState(0);
  const [fetchCampaignData, setfetchCampaignData] = useState(0);
  const [fetchAdGroupData, setfetchAdGroupData] = useState(0);
  const [showBiddingRuleForm, setShowBiddingRuleForm] = useState(false);  
  const [showDayPartRuleForm, setShowDayPartRuleForm] = useState(false);
  const [showPortfolioCapForm, setShowPortfolioCapForm] = useState(false);


  useEffect(() => {
    console.log(fetchPortfolioData)
    // Function to fetch data from the API endpoint
    const fetchDataofPortfolio = async () => {
      try {
          console.log("Inside Try");
          const response = await instance.get('/getData:PortfolioList_0');
          console.log(response)
          if (response.status !== 200) {
            throw new Error('Network response was not ok');
          }
          const thePortfolioData = (response.data.data);
          // console.log(theCampaignData)
          // campaignData = newData
          // setcampaignRawData(thePortfolioData); // Set the fetched data to the state 
          // console.log(campaignRawData)

          const firstOption = {"nodeId":rowID,"type":"Portfolio","label": "Create New", "state": "", "id": ""}
          const portfolioOp = JSON.parse(thePortfolioData).map((item) => {
            return {"nodeId":rowID,"type":"Portfolio","label": item.name, "state": item.state, "id": item.portfolioId}
          })
          const portofioFull = [firstOption,...portfolioOp];
          console.log(portofioFull);
          setData0(portofioFull);
        //   addSelect(campaignFull)
      } catch (error) {
          console.log(error);
      } finally {
      }
      
    };

    if(fetchPortfolioData > 0)
    {
      setfetchPortfolioData(0);
      fetchDataofPortfolio();
    }
  
  }, [fetchPortfolioData])

  useEffect(() => {
    console.log(fetchCampaignData)
    // Function to fetch data from the API endpoint
    const fetchDataofCampaign = async () => {
      try {
          console.log("Inside Try");
          const response = await instance.get('/getData:CampaignList_'+portfolioId);
          console.log(response)
          if (response.status !== 200) {
            throw new Error('Network response was not ok');
          }
          const theCampaignData = response.data.data;
          // console.log(theCampaignData)
          // campaignData = newData
          setcampaignRawData(theCampaignData); // Set the fetched data to the state 
          // console.log(campaignRawData);

          const firstOption = {"nodeId":rowID,"type":"Campaign","label": "Create New", "budget": "", "state": "", "id": ""}
          const campaignOp = JSON.parse(theCampaignData).map((item) => {
            return {"nodeId":rowID,"type":"Campaign","label": item.name, "budget": item.budget.budget, "state": item.state, "id": item.campaignId}
          })
          const campaignFull = [firstOption,...campaignOp];
          console.log(campaignFull);
          setData1(campaignFull);
        //   addSelect(campaignFull)
      } catch (error) {
          console.log(error);
      } finally {
      }
      
    };

    if(fetchCampaignData > 0)
    {
      setfetchCampaignData(0);
      fetchDataofCampaign();
    }
  
  }, [fetchCampaignData]);

  useEffect(() => {
    console.log(fetchAdGroupData)
    // Function to fetch data from the API endpoint
    const fetchDataofAdgroup = async () => {
      try {
          console.log("Inside Try");
          const response = await instance.get('/getData:adGroupList_'+campaignId);
          setCampaignId(0);
          console.log(response)
          if (response.status !== 200) {
            throw new Error('Network response was not ok');
          }
          const theData = response.data.data;

          setadGroupRawData(theData); // Set the fetched data to the state 
          // console.log(adGroupRawData);
          const firstOption = {"nodeId":rowID,"type":"AdGroup","label": "Create New", "state": "", "DefaulBid": "", "id": ""}
          const adGroupOp = JSON.parse(theData).adGroups.map((item) => {
            return {"nodeId":rowID,"type":"AdGroup","label": item.name, "state":item.state, "DefaulBid": item.defaultBid, "id":item.adGroupId }
          })
          const adGroupFull = [firstOption,...adGroupOp]
          console.log(adGroupFull);
          setData2(adGroupFull);
        //   addSelect(adGroupFull)
      } catch (error) {
          console.log(error);
      } finally {
      }
      
    };

    if(fetchAdGroupData > 0)
    {
      setfetchAdGroupData(0);
      fetchDataofAdgroup();
    }
  
  }, [fetchAdGroupData]);


  const addRow = () => {

    setfetchPortfolioData(fetchPortfolioData+1);

    setTableData((prevTableData) => [
      ...prevTableData,
      Object.fromEntries(columnHeaders.map((header) => [header, ''])),
    ]);
  };

  const addColumn = () => {
    columnNum = columnNum + 1;
    const newColumn = "Rule " + columnNum.toString();
    setColumnHeaders((prevHeaders) => [...prevHeaders, newColumn]);

    setTableData((prevTableData) =>
      prevTableData.map((row) => ({ ...row, [newColumn]: '' }))
    );
  };

  const handleSelectChange = (value,id, rowIndex, columnName) => {
    // console.log(e)
    console.log(id)
    console.log(value)
    if(columnName === "Portfolio"){
      setPortfolioId(value);
      setfetchCampaignData(fetchCampaignData + 1);
    }    
    if(columnName === "Campaign"){
      setCampaignId(value);
      setfetchAdGroupData(fetchAdGroupData + 1);
    }
    if(columnName === "Adgroup"){
      setAdGroupId(value)
    }

    if(value === "Portfolio Budget Manage Rule"){
      setShowPortfolioCapForm(true);
    }else{
      setShowPortfolioCapForm(false);
    }
    if(value === "Bidding Rule"){
      setShowBiddingRuleForm(true);
    }else{
      setShowBiddingRuleForm(false);
    }
    if(value === "DayParting Rule"){
      setShowDayPartRuleForm(true);
    }else{
      setShowDayPartRuleForm(false);
    }
    rowID = rowIndex;
    // console.log(rowIndex)
    // console.log(columnName)
    setTableData((prevTableData) => {
      const updatedTableData = [...prevTableData];
      updatedTableData[rowIndex][columnName] = value;
      return updatedTableData;
    });
  };

  return (
    <div>
      <button onClick={addRow}>Add Row</button>
      <button onClick={addColumn}>Add Column</button>
      {showBiddingRuleForm && adGroupId && (
        <BiddingRuleForm data={adGroupId} setShowBiddingRuleForm={setShowBiddingRuleForm} />
      )}
      {showDayPartRuleForm && adGroupId && (
        <SIDayPartForm data={adGroupId} setShowDayPartRuleForm={setShowDayPartRuleForm} />
      )}
      {showPortfolioCapForm && portfolioId && (
        <PortfolioManageForm data={portfolioId} setShowPortfolioCapForm={setShowPortfolioCapForm} />
      )}
      <table>
        <thead>
          <tr>
            {columnHeaders.map((header) => (
              <th key={header}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columnHeaders.map((header) => (
                <td key={header}>
                  <select
                    value={row[header]}
                    onChange={(e) => handleSelectChange(e.target.value,e.target.id, rowIndex, header)}
                  >
                    {header === 'Portfolio'
                      ? data0.map((option) => (
                          <option id={option.id} value={option.id}>
                            {option.label}
                          </option>
                        ))
                    : header === 'Campaign'
                      ? data1.map((option) => (
                          <option id={option.id} value={option.id}>
                            {option.label}
                          </option>
                        ))
                      : header === 'Adgroup'
                      ? data2.map((option) => (
                          <option id={option.id} value={option.id}>
                            {option.label}
                          </option>
                        ))
                      : header.substring(0,4) === "Rule" 
                      ? data3.map((option) => (
                        <option id={option.id} value={option.name}>
                          {option.name}
                        </option>
                      ))
                      :
                      /* Add more conditions for other columns as needed */
                        null}
                  </select>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
