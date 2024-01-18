import React, { useState, useEffect } from 'react';
import "../components/Modal.css"
import instance from "../API";
import Select from 'react-select'



export function NewCampaignForm(){
  const [formData, setFormData] = useState({
    portfolioId: '',
    endDate: '',
    name: '',
    targetingType: 'AUTO',
    state: 'ENABLED',
    dynamicBidding: {},
    startDate: '',
    budget: '',
    tags: {},
  });
  const [showForm,setShowForm] = useState(true)
  const [fetchProductListData, setfetchProductListData] = useState(0)
  const [productListRawData, setProductListRawData] = useState([]);
  const [productListFullData, setProductListFull] = useState([]);
  const [selects, setSelects] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);




  useEffect(() => {
    console.log(fetchProductListData)
    // Function to fetch data from the API endpoint
    const fetchDataofProducts = async () => {
      try {
          console.log("Inside Try");
          const response = await instance.get('https://moeapp-30.herokuapp.com/getData:ProductList_0');
          console.log(response)
          if (response.status !== 200) {
            throw new Error('Network response was not ok');
          }
          const theData = response.data.data;

          setProductListRawData(theData); // Set the fetched data to the state 
          console.log(productListRawData);
          const productListOp = JSON.parse(theData).map((item) => {
            return {"type":"Product","label": item.title}
          })
          const productListFull = [...productListOp]
          console.log(productListFull);
          addSelect(productListFull)
      } catch (error) {
          console.log(error);
      } finally {
      }
      
    };

    if(fetchProductListData > 0)
    {
      setfetchProductListData(0);
      fetchDataofProducts();
    }
  
  }, [fetchProductListData]);
  
  const getProductList = ()=>{
    if(fetchProductListData > 1)
    setfetchProductListData(1)
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };


  const handleCreate = () => {
    const jsonData = JSON.stringify(formData, null, 2);
    console.log(jsonData);
    setShowForm(false);
    console.log(showForm)
    // You can do further processing here, like sending the JSON data to a server or saving it in local storage.
  };
  const addSelect = (theOptions) => {
    const selectId = selects.length + 1;
    // console.log(theOptions)
    const newSelect = {
        options: theOptions
    }
    // console.log(selects)
    setSelects([newSelect])
    // setfetchProductListData(fetchProductListData-1)


  }

  return (
    <div>
    {showForm ? (
    <div>
            <label>
                Products:
                <button onClick={getProductList}>Get Product List</button>
                <br />
                {selects.map((slcts)=>{
                return(<Select  
                                options={slcts.options}  
                                value={selectedOption} 
                                // onChange={handleChange}
                                className="nodrag"/> 
                                );
                          
                })
                }
                <br/>
            </label>
            <br />
            <label>
                Portfolio ID:
                <br />
                <input type="text" name="portfolioId" value={formData.portfolioId} onChange={handleChange} />
            </label>
            <br />
            <label>
                Name:
                <br />
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
            </label>
            <br />
            <label>
                Budget:
                <br />
                <input type="text" name="budget" value={formData.budget} onChange={handleChange} />
            </label>
            <br />
            <label>
                Start Date:
                <br />
                <input type="date" name="startDate" value={formData.startDate} onChange={handleChange} />
            </label>
            <br />
            <label>
                End Date:
                <br />
                <input type="date" name="endDate" value={formData.endDate} onChange={handleChange} />
            </label>
            <br />

            <label>
                Targeting Type:
                <br />
                <select name="targetingType" value={formData.targetingType} onChange={handleChange}>
                <option value="AUTO">AUTO</option>
                <option value="MANUAL">MANUAL</option>
                </select>
            </label>
            <br />
            <label>
                State:
                <br />
                <select name="state" value={formData.state} onChange={handleChange}>
                <option value="ENABLED">ENABLED</option>
                <option value="PAUSED">PAUSED</option>
                </select>
            </label>
            <br />

            {/* Add other input fields for dynamicBidding, startDate, budget, and tags here */
            console.log("showing")}
            <button onClick={handleCreate}>Create</button>
    </div>
    ) :(<></>)
    }
    </div>
  );
};
