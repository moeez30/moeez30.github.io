import React, { useCallback, useState, useEffect } from 'react';
import Select from 'react-select'
import ReactFlow, {
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
import axios from 'axios';
import 'reactflow/dist/style.css';
import CustomNode from '../components/CustomNodes.js';
import instance from "../API";
import { NewCampaignForm } from '../components/NewCampaignForm';
import '../custom_node.css';

const options1 = [
    { id : "1", value: '1', label: 'Sales' },
    { id : "1", value: '2', label: 'Clicks' }
]




// const selectsArr = [<Select name='Moeez' options={options1} className='nodrag' />];
let theNodeId = '';
let theEdgeId = '';
// const initSelects1 = {options: options1};
const nodeTypes = { customNode: CustomNode};//(props) => <CustomNode sendBackData={getBackData()}/> };

export default function CampaignStrat() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [steps]   = useState([]);
  const [error, setError] = useState(null);
  const [rules, setRules] = useState([]);


  const [selectedOption, setSelectedOption] = useState([]);
  const [allSelectedOption, setAllSelectedOption] = useState([]);
  const [selects, setSelects] = useState([[],[],[],[],[],[],[],[],[]]);
  const [nodeSelects, setNodeSelects] = useState([[],[],[],[],[],[],[],[],[]]);
  const [rulesOptions, setRulesOptions] = useState([]);


  const [campaignRawData, setcampaignRawData] = useState([]);
  const [adGroupRawData, setadGroupRawData] = useState([]);
  const [KeyWordRawData, setKeyWordRawData] = useState([]);


  const [fetchCampaignData, setfetchCampaignData] = useState(0)
  const [fetchAdGroupData, setfetchAdGroupData] = useState(0);
  const [fetchKeywordsData, setfetchKeywordsData] = useState(0)
  const [fetchRulesData, setfetchRulesData] = useState(0)

  const [campaignId, setCampaignId] = useState(0)
  const [adGroupId, setAdGroupId] = useState(0)
  const [newCampaignForm, setnewCampaignForm] = useState(false)
  const [showCampaignForm, setShowCampaignForm] = useState(false);
  const [showRulesForm, setShowRulesForm] = useState(false);
  const [edgeRules,setEdgeRules] = useState([[],[],[],[],[],[],[],[],[]])
  const [selectedRule, setSelectedRule] = useState([]);
  const [numericValue, setNumericValue] = useState('');
  const [salesRule, setSalesRule] = useState('');
  const [clicksRule, setClicksRule] = useState('');
  const [impressionRule, setImpressionRule] = useState('');
  const [promoteRule, setPromoteRule] = useState('');
  const [demoteRule, setDemoteRule] = useState('');

  const [selectedRuleType, setSelectedRuleType] = useState('');

  // const [initSelects,setInitSelects] = useState([])
  // initSelects[0] = initSelects1
  // selects[0] = initSelects1;  
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [isCreatingInput, setIsCreatingInput] = useState(false);
  const [dataFromChild, setDataFromChild] = useState('');



  useEffect(() => {
    console.log(fetchCampaignData)
    // Function to fetch data from the API endpoint
    const fetchDataofCampaign = async () => {
      try {
          console.log("Inside Try");
          const response = await instance.get('/getData:CampaignList_0');
          console.log(response)
          if (response.status !== 200) {
            throw new Error('Network response was not ok');
          }
          const theCampaignData = response.data.data;
          // console.log(theCampaignData)
          // campaignData = newData
          setcampaignRawData(theCampaignData); // Set the fetched data to the state 
          // console.log(campaignRawData);

          const firstOption = {"nodeId":theNodeId,"type":"Campaign","label": "Create New", "budget": "", "state": "", "id": ""}
          const campaignOp = JSON.parse(theCampaignData).map((item) => {
            return {"nodeId":theNodeId,"type":"Campaign","label": item.name, "budget": item.budget.budget, "state": item.state, "id": item.campaignId}
          })
          const campaignFull = [firstOption,...campaignOp]
          console.log(campaignFull)
          addSelect(campaignFull)
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
          const firstOption = {"nodeId":theNodeId,"type":"AdGroup","label": "Create New", "state": "", "DefaulBid": "", "id": ""}
          const adGroupOp = JSON.parse(theData).adGroups.map((item) => {
            return {"nodeId":theNodeId,"type":"AdGroup","label": item.name, "state":item.state, "DefaulBid": item.defaultBid, "id":item.adGroupId }
          })
          const adGroupFull = [firstOption,...adGroupOp]
          console.log(adGroupFull);
          addSelect(adGroupFull)
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


  useEffect(() => {
    console.log(fetchKeywordsData)
    // Function to fetch data from the API endpoint
    const fetchDataofKeyWords = async () => {
      try {
          console.log("Inside Try");
          const response = await instance.get('/getData:KeywordList_'+adGroupId);
          setAdGroupId(0);
          console.log(response)
          if (response.status !== 200) {
            throw new Error('Network response was not ok');
          }
          const theData = response.data.data;

          setKeyWordRawData(theData); // Set the fetched data to the state 
          // console.log(KeyWordRawData);
          const firstOption = {"nodeId":theNodeId,"type":"Keyword","label": "Create New"}
          const KeywordsOp = JSON.parse(theData).map((item) => {
            return {"nodeId":theNodeId,"type":"Keyword","label": item.keywordText,"bid":item.bid, 
            "State": item.state, "MatchType":item.matchType,  
            "keywordId": item.keywordId }
          })
          const KeywordsFull = [firstOption,...KeywordsOp]
          console.log(KeywordsFull);
          addSelect(KeywordsFull)
      } catch (error) {
          console.log(error);
          setError(error.message); // Handle any error that occurs during fetching
      } finally {
      }
      
    };

    if(fetchKeywordsData > 0)
    {
      setfetchKeywordsData(0);
      fetchDataofKeyWords();
    }
  
  }, [fetchKeywordsData]);

  useEffect(() => {
    // Function to fetch data from the API
    const getRules = async () => {
      setIsLoading(true);
      try {
        let myType = ''

        if(selectedRuleType == "Keyword")
          {myType = "Targeting";}
        else if(selectedRuleType == "Adgroup")
          {myType = "SearchTerm"}
        else if(selectedRuleType == "Campaign")
          {myType = "CampaignPlacement"}
        const data1 = {
          type: myType, 
          demand:"Rules", 
          user:"firstDB"
        }
        console.log(data1)
        const response = await axios.post("http://localhost:3001/getDatafromDB",data1); // Replace with your API endpoint
        console.log(response)
        setRulesOptions(JSON.parse(response.data.data))
        console.log((JSON.parse(response.data.data)))
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    if(fetchRulesData > 0)
    {
      setfetchRulesData(0);
      getRules();
    }
    // Call the fetchData function to get data when the component mounts
  }, [fetchRulesData]); // The empty array means this effect runs only once, like componentDidMount



  const addNode = () => {
    const nodeId = nodes.length + 1;
    // initSelects.options[0].id = nodeId.toString()
    // initSelects.options[1].id = nodeId.toString()

    const newOptions = [
      { id : nodeId.toString(), value: '1', label: 'Campaign' }
    ]

    const firstSelect = {
      options : newOptions
    }

    // setSelects([]);
    
    selects[nodeId-1][0] = firstSelect;
    
    const theslctdOp = ''
    const newNode = {
        id : nodeId.toString(),
        // type : 'customNode',
        position : {x:10 , y:10},
        className : 'custom-node',
        data : {label : /*<Select id={nodeId.toString()} options={newOptions} value={selectedOption} onChange={handleChange} className='nodrag'></Select>*/
          selects[nodeId-1].map((slcts)=>{
          return(<Select 
            id={nodeId.toString()} 
            options={slcts.options}  
            value={selectedOption} 
            onChange={handleChange} 
            className="nodrag"
            />);
        })
      },
    }
    // selectedOption = theslctdOp

    // setSelectedOption([...selectedOption,theslctdOp]);
    setSelects([...selects])
    console.log(selects.length)
    if(nodes.length === 0){
      nodes[0] = newNode;
      setNodes([...nodes]);
    }else{
      setNodes([...nodes,newNode]);
    }

    console.log(nodes)
  }

  const createStrat = async (e) => {
    
    //steps = [];

    let indx = 0;
    edges.map((theEdge) => {
      const from = nodeSelects[parseInt(theEdge.source)-1];
      const to = nodeSelects[parseInt(theEdge.target)-1];
      const rules = edgeRules[parseInt(theEdge.id)-1];
      console.log(from)
      console.log(to)
      console.log(rules)
      const theStep = {
        "from" : from,
        "to" : to,
        "rule" : rules
      }
      
      //console.log(nodes[parseInt(theEdge.source)].data.label.toString())
      steps[indx] = theStep;
      indx = indx + 1;
      // setSteps([...steps,theStep])
      console.log(steps)

    })

    const strat = { steps };
    const data = JSON.stringify(strat);
    console.log(data)
    // const blob = new Blob([data], { type: 'application/json' });
    // const url = URL.createObjectURL(blob);
    // const a = document.createElement('a');
    // a.href = url;
    // a.download = 'Strategy.json';
    // a.click();
    // URL.revokeObjectURL(url);
    try {
      const response = await instance.post('/AutomateStrategy', strat);
      console.log(response);
      window.alert('Data has been submitted');
    } catch (error) {
      window.alert('Data not submitted');
      console.error(error);
    }
  };

  // const getBackData = (myData) => {
  //   setDataFromChild(myData);
  // };

  const onNodeDoubleClick = (event, node) => {
    console.log(node.data)
    console.log(nodeSelects[node.id])
    
  };

  const onEdgeDoubleClick = (event, edge) => {
    console.log(edge)
    theEdgeId = edge.id;
    setShowRulesForm(true);
    console.log("Show Rules");

    edges[parseInt(edge.id)-1].label = theEdgeId;
    
    const updatedEdges = [...edges];
    setEdges(updatedEdges);
    // setRules([]);
  };

  const addSelect = (theOptions) => {
    const selectId = selects.length + 1;

    let indx=0;
    nodes[parseInt(theNodeId)-1].data["label"].map(()=>{
      indx=indx+1;
    })


    const newSelect = {
        options: theOptions
    }
    // console.log(selects)
    selects[parseInt(theNodeId)-1][indx]=newSelect
    indx=indx+1;

    setSelects([...selects])

    console.log(selects)
    console.log(theNodeId)
    updateTheNode(theNodeId)
  }
  const deleteAll = ()=> {
    setNodes([]);
    setEdges([]);
    setSelects([[],[],[],[],[],[],[],[],[]]);
    setNodeSelects([[],[],[],[],[],[],[],[],[]]);
    setEdgeRules([[],[],[],[],[],[],[],[],[]]);
    setRules([]);
    setSalesRule('');
    setClicksRule('');
    setImpressionRule('');
    setPromoteRule(null);
    setDemoteRule(null);
    setShowRulesForm(false);
    
  }

  const updateTheNode = (id)=>{

    nodes[parseInt(id)-1].data = {label : 
      selects[parseInt(theNodeId)-1].map((slcts)=>{
      return(<Select  id={theNodeId} 
        options={slcts.options}  
        value={selectedOption} 
        onChange={handleChange} 
        className="nodrag"/>);
    })}
    setNodes([...nodes])
    // setSelects([])
  }


  const handleChange = (selectedOption) => {
    const newSelectedOption = selectedOption;
    setSelectedOption(selectedOption[parseInt(selectedOption.id)-1]);
    console.log(selectedOption);
    if(selectedOption.label === "Campaign")
    {
      theNodeId = selectedOption.id;
      nodeSelects[parseInt(theNodeId)-1][0] = selectedOption.label;
      console.log(theNodeId)
      setfetchCampaignData(fetchCampaignData+1);
      console.log("ShowCampaign");
    }
    

    // if(selectedOption.type === "Campaign" && selectedOption.label === "Create New") 
    // {
    //   setnewCampaignForm(true);
    //   console.log("CreateCampaign");
    //   setShowCampaignForm(true)
    // }
    
    if((selectedOption.type === "Campaign" || selectedOption.label === "AdGroup" )&& selectedOption.label !== "Create New")
    {
      theNodeId = selectedOption.nodeId;
      // nodeSelects[parseInt(theNodeId)-1][1] = selectedOption.label + " ID-> " + selectedOption.id;
      nodeSelects[parseInt(theNodeId)-1][1] = {"CampaignID" : selectedOption.id};
      setCampaignId(selectedOption.id)
      setfetchAdGroupData(fetchAdGroupData+1);
      console.log("Show Adgroups");
    }

    if(selectedOption.type === "AdGroup")
    {
      theNodeId = selectedOption.nodeId;
      // nodeSelects[parseInt(theNodeId)-1][2] = selectedOption.label + " ID-> " + selectedOption.id;
      nodeSelects[parseInt(theNodeId)-1][2] = {"AdGroupID" : selectedOption.id};
      setAdGroupId(selectedOption.id)
      setfetchKeywordsData(fetchKeywordsData+1);
      console.log("Show KeyWords");
    }


    //setAllSelectedOption([...allSelectedOption,newSelectedOption])

    console.log(nodeSelects)
  
  };

  const handleSales = (event)=>{
    setSalesRule(event.target.value)
  }
  const handleClicks = (event)=>{
    setClicksRule(event.target.value)
  }
  const handleImpressions = (event)=>{
    setImpressionRule(event.target.value)
  }

  const handleButtonClick = () => {
    setfetchRulesData(fetchRulesData+1);
  };

  const handleSelectChange = (event) => {
    setSelectedOption(event.target.value);
    setInputValue('');
    setIsCreatingInput(true);
  };

  const handleSelectedRuleType = (event) => {
    setSelectedRuleType(event.target.value);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };


  const handlePromoRadio = (event)=>{
    if(promoteRule === event.target.value)
    {
      
      setPromoteRule(null);
    }else{
      setPromoteRule(event.target.value)
    }

  }

  const handleAddRule = () =>{
    const newRule = {
      ruleType: selectedRuleType,
      option: selectedOption,
      value: inputValue,
    };

    // Update the state with the new rule
    setRules([...rules, newRule]);
  }

  const handleDemoteRadio = (event)=>{

    console.log(demoteRule)
    if(demoteRule === event.target.value)
    {
      setDemoteRule(null);
    }else{
      setDemoteRule(event.target.value)
    }
    
  }

  const handleSave = () => {
    let ruleIndex = 0;
    rules.map((theRule)=>{
      console.log(theRule)
      edgeRules[parseInt(theEdgeId)-1][ruleIndex] = theRule;
      // { RuleType : theRule.ruleType, 
      //                                                 RuleOption : theRule.option, 
      //                                                 RuleValue : theRule.value};
      ruleIndex++;
    })
    if(promoteRule == "Promote" && demoteRule == ""){
      edgeRules[parseInt(theEdgeId)-1][ruleIndex] = promoteRule;
    }
    else if(promoteRule == "Promote" && demoteRule == ""){
      edgeRules[parseInt(theEdgeId)-1][ruleIndex] = demoteRule;
    }
    console.log(ruleIndex)
    console.log(edgeRules)
    // edgeRules[parseInt(theEdgeId)-1][0] = salesRule;
    // edgeRules[parseInt(theEdgeId)-1][1] = clicksRule;
    // edgeRules[parseInt(theEdgeId)-1][2] = impressionRule;
    // edgeRules[parseInt(theEdgeId)-1][3] = promoteRule;
    // edgeRules[parseInt(theEdgeId)-1][4] = demoteRule;
    let promo,demote;
    promo = promoteRule;
    demote = demoteRule;
    (promo===null)?promo="":promo=promo;
    (demote===null)?demote="":demote=demote;
    edges[parseInt(theEdgeId)-1].label = promo+demote+ " Sales : " + salesRule + " Clicks :" + clicksRule + " Impressions : " + impressionRule;
    const updatedEdges = [...edges];
    setEdges(updatedEdges);
    //setEdgeRules(...edgeRules);
    setShowRulesForm(false);
    setEdgeRules([...edgeRules]);
    

    console.log(edgeRules)

  }


  const onConnect = useCallback(
    (params) => {
      params.label = "";
      params.id = edges.length+1;
      console.log(params);
      setEdges((eds) => addEdge(params, eds))
    }
    );

  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <div className="buttons">
      <button onClick={addNode}>Add Node</button>
      <button onClick={deleteAll}>Clear All</button>
      <button onClick={createStrat}>Create Strategy</button>

      </div>

      <div>
        {showRulesForm ? (
          <div>
            <label>
            <input
              type="radio"
              value="Promote"
              checked={promoteRule === 'Promote'}
              onClick={handlePromoRadio}
              onChange={handlePromoRadio}
            />
            Promote
            </label>

            <label>
            <input
              type="radio"
              value="Demote"
              checked={demoteRule === 'Demote'}
              onClick={handleDemoteRadio}
              onChange={handleDemoteRadio}
            />
            Demote
            </label>

            <div>
            {rules.map((rule, index) => (
              <div key={index}>
                <p>{`Rule ${index + 1}: ${rule.ruleType} - ${rule.option} - ${rule.value}`}</p>
              </div>
            ))}
            <div>
              <label>Rule Type:</label>
              <select value={selectedRuleType} onChange={handleSelectedRuleType}>
                <option value="">Select an option</option>
                <option value="Keyword">Keyword</option>
                <option value="Adgroup">Adgroup</option>
                <option value="Campaign">Campaign</option>
              </select>

              <button onClick={handleButtonClick} disabled={isLoading}>
                {isLoading ? 'Loading...' : 'Fetch Data'}
              </button>

              <select value={selectedOption} onChange={handleSelectChange}>
                <option value="">Select an option</option>
                {rulesOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              {isCreatingInput && (
                <input
                  type="text"
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder={`Enter value for ${selectedOption}`}
                />
              )}
              {isCreatingInput && <button onClick={handleAddRule}>Add Rule</button>}
            </div>
          </div>

            {/* <tr>
            <label>  Rule Type:</label>
            <select value={selectedRuleType} onChange={handleSelectedRuleType}>
              <option value="">Select an option</option>
              <option value="Keyword">Keyword</option>
              <option value="Adgroup">Adgroup</option>
              <option value="Campaign">Campaign</option>
            </select>
            
            <button onClick={handleButtonClick} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Fetch Data'}
            </button>
            <select value={selectedOption} onChange={handleSelectChange}>
              <option value="">Select an option</option>
              {rulesOptions.map((option, index) => (
                <option key={index} value={option}>
                  {option}
                </option>                
                ))}
            </select>
            {isCreatingInput && (
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder={`Enter value for ${selectedOption}`}
              />              
            )}
            {isCreatingInput && (
              (<button onClick={handleAddRule}> Add Rule </button>)
            )}
            </tr> */}

            {/* <input
            type="text"
            placeholder="Sales"
            value={salesRule}
            onChange={handleSales}
           /> 
            <input
            type="text"
            placeholder="Clicks"
            value={clicksRule}
            onChange={handleClicks}
           />
            <input
            type="text"
            placeholder="Impressions"
            value={impressionRule}
            onChange={handleImpressions}
           />    */}
            {/* <select value={selectedRule} onChange={handleOptionChange}>
            <option value="">Select an option</option>
            <option value="Clicks">Clicks</option>
            <option value="Impression">Impression</option>
            <option value="Sales">Sales</option>
            <option value="Rule 4">Rule 4</option>
            <option value="Rule 5">Rule 5</option>
            </select> */}
            <button onClick={handleSave}>Set Rules</button>
        </div>
         ) : (<div></div>)
        }
      </div>

      <ReactFlow
        nodes={nodes}
        edges={edges}
  
        onNodeDoubleClick={onNodeDoubleClick}
        onNodesChange={onNodesChange}
        onEdgeDoubleClick={onEdgeDoubleClick}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        // nodeTypes = {nodeTypes}
        // fitView

      >
        <Controls />
        <MiniMap />
        <Background variant="dots" gap={12} size={1} />

      </ReactFlow>
      <div

      />
    </div>
    
  );
}