import { createContext, useEffect, useState } from 'react';
import instance from '../API';

export const DataContext = createContext();

function DataContextProvider({ children }) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
useEffect(() => {

    const fetchData = async () => {
      try {
        const response = await instance.get('/getData:CampaignList_0');
        const FilteredData = JSON.parse(response.data.data).map((item) => {
          return {"name": item.name, "budget": item.budget.budget , "startDate": item.startDate , 
          "targetingType": item.targetingType,"budgetType": item.budget.budgetType ,
          "state": item.state, "id":item.campaignId }
        })
        setData(FilteredData);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  
  }, []);
return (
    <DataContext.Provider value={{ data, isLoading }}>
      {isLoading ? <div className='loader'></div> : children}
    </DataContext.Provider>
  );
}

export default DataContextProvider;
