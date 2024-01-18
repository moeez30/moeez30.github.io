import { useState, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import Select from 'react-select'
import instance from "../API";
import { NewCampaignForm } from '../components/NewCampaignForm';

const options1 = [
  { id:"1", value: '1', label: 'Campaign' },
  { id:"1", value: '2', label: 'AdGroup' }
]



const initSelects = {options: options1};

function CustomNode({ isConnectable, sendBackData }) {
  
  const [selectedOption, setSelectedOption] = useState([]);
  const [allSelectedOption, setAllSelectedOption] = useState([]);
  const [selects, setSelects] = useState([]);
  const [campaignRawData, setcampaignRawData] = useState([]);
  const [adGroupRawData, setadGroupRawData] = useState([]);
  const [KeyWordRawData, setKeyWordRawData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fetchCampaignData, setfetchCampaignData] = useState(0)
  const [fetchAdGroupData, setfetchAdGroupData] = useState(0)
  const [fetchKeywordsData, setfetchKeywordsData] = useState(0)
  const [campaignId, setCampaignId] = useState(0)
  const [adGroupId, setAdGroupId] = useState(0)
  const [newCampaignForm, setnewCampaignForm] = useState(false)
  const [showCampaignForm, setShowCampaignForm] = useState(false);

  selects[0] = initSelects;  

  useEffect(() => {
    console.log(fetchCampaignData)
    // Function to fetch data from the API endpoint
    const fetchDataofCampaign = async () => {
      try {
          console.log("Inside Try");
          setIsLoading(true); // Indicate that data fetching is done
          const response = await instance.get('https://moeapp-30.herokuapp.com/getData:CampaignList_0');
          console.log(response)
          if (response.status !== 200) {
            throw new Error('Network response was not ok');
          }
          const theCampaignData = response.data.data;
          // console.log(theCampaignData)
          // campaignData = newData
          setcampaignRawData(theCampaignData); // Set the fetched data to the state 
          console.log(campaignRawData);
          const firstOption = {"type":"Campaign","label": "Create New", "budget": "", "state": "", "id": ""}
          const campaignOp = JSON.parse(theCampaignData).map((item) => {
            return {"type":"Campaign","label": item.name, "budget": item.budget.budget, "state": item.state, "id": item.campaignId}
          })
          const campaignFull = [firstOption,...campaignOp]
          console.log(campaignFull)
          addSelect(campaignFull)
      } catch (error) {
          console.log(error);
          setError(error.message); // Handle any error that occurs during fetching
          setIsLoading(false); // Indicate that data fetching is done (with or without error)
      } finally {
        setIsLoading(false); // Indicate that data fetching is done (with or without error)
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
          setIsLoading(true); // Indicate that data fetching is done
          const response = await instance.get('https://moeapp-30.herokuapp.com/getData:adGroupList_'+campaignId);
          setCampaignId(0);
          console.log(response)
          if (response.status !== 200) {
            throw new Error('Network response was not ok');
          }
          const theData = response.data.data;

          setadGroupRawData(theData); // Set the fetched data to the state 
          console.log(adGroupRawData);
          const firstOption = {"type":"AdGroup","label": "Create New", "state": "", "DefaulBid": "", "id": ""}
          const adGroupOp = JSON.parse(theData).adGroups.map((item) => {
            return {"type":"AdGroup","label": item.name, "state":item.state, "DefaulBid": item.defaultBid, "id":item.adGroupId }
          })
          const adGroupFull = [firstOption,...adGroupOp]
          console.log(adGroupFull);
          addSelect(adGroupFull)
      } catch (error) {
          console.log(error);
          setError(error.message); // Handle any error that occurs during fetching
          setIsLoading(false); // Indicate that data fetching is done (with or without error)
      } finally {
          setIsLoading(false); // Indicate that data fetching is done (with or without error)
      }
      
    };

    if(fetchAdGroupData > 0)
    {
      setfetchAdGroupData(0);
      fetchDataofAdgroup();
    }
  
  }, [fetchAdGroupData]);
  
  useEffect(() => {
    console.log(fetchKeywordsData)
    // Function to fetch data from the API endpoint
    const fetchDataofKeyWords = async () => {
      try {
          console.log("Inside Try");
          setIsLoading(true); // Indicate that data fetching is done
          const response = await instance.get('https://moeapp-30.herokuapp.com/getData:KeywordList_'+adGroupId);
          setAdGroupId(0);
          console.log(response)
          if (response.status !== 200) {
            throw new Error('Network response was not ok');
          }
          const theData = response.data.data;

          setKeyWordRawData(theData); // Set the fetched data to the state 
          console.log(KeyWordRawData);
          const firstOption = {"type":"Keyword","label": "Create New"}
          const KeywordsOp = JSON.parse(theData).map((item) => {
            return {"type":"Keyword","label": item.keywordText,"bid":item.bid, 
            "State": item.state, "MatchType":item.matchType,  
            "keywordId": item.keywordId }
          })
          const KeywordsFull = [firstOption,...KeywordsOp]
          console.log(KeywordsFull);
          addSelect(KeywordsFull)
      } catch (error) {
          console.log(error);
          setError(error.message); // Handle any error that occurs during fetching
          setIsLoading(false); // Indicate that data fetching is done (with or without error)
      } finally {
          setIsLoading(false); // Indicate that data fetching is done (with or without error)
      }
      
    };

    if(fetchKeywordsData > 0)
    {
      setfetchKeywordsData(0);
      fetchDataofKeyWords();
    }
  
  }, [fetchKeywordsData]);
  

  const handleChange = (selectedOption) => {
    const newSelectedOption = selectedOption;
    setSelectedOption(selectedOption[parseInt(selectedOption.id)-1]);
    console.log(selectedOption);
    if(selectedOption.label === "Campaign")
    {
      setfetchCampaignData(fetchCampaignData+1);
      console.log("ShowCampaign");
    }

    if(selectedOption.type === "Campaign" && selectedOption.label === "Create New") 
    {
      setnewCampaignForm(true);
      console.log("CreateCampaign");
      setShowCampaignForm(true)
    }
    
    if((selectedOption.type === "Campaign" || selectedOption.label === "AdGroup" )&& selectedOption.label !== "Create New")
    {
      setCampaignId(selectedOption.id)
      setfetchAdGroupData(fetchAdGroupData+1);
      console.log("Show Adgroups");
    }

    if(selectedOption.type === "AdGroup")
    {
      setAdGroupId(selectedOption.id)
      setfetchKeywordsData(fetchKeywordsData+1);
      console.log("Show KeyWords");
    }

    setAllSelectedOption([...allSelectedOption,newSelectedOption])

    console.log(allSelectedOption)
  
  };

  //console.log(sendBackData)

  // const sendBackData = (myData) => {
  //   setDataFromChild(myData);
  // };


  const addSelect = (theOptions) => {
    const selectId = selects.length + 1;
    // console.log(theOptions)
    const newSelect = {
        options: theOptions
    }
    // console.log(selects)
    setSelects([...selects,newSelect])
  }


  return (
    <div className="custom-node">
      <Handle type="target" position={Position.Top} isConnectable={isConnectable} />
      <div>

        {selects.map((slcts)=>{
          return(<Select  id={slcts.id} 
                          options={slcts.options}  
                          value={selectedOption} 
                          onChange={handleChange} 
                          className="nodrag"/> 
                          );
                          
          })
        }
      </div>
      <Handle
        type="source" position={Position.Bottom} isConnectable={isConnectable}
      />
      <>{showCampaignForm &&<NewCampaignForm />}</>

    </div>
  );
}

export default CustomNode;