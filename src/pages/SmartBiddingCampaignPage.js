import Table from '../components/Table';
import useAxios from '../CustomHooks/Get';
import { useEffect, useState } from 'react';


function SmartBidCampaignList() {
  // const { data, isLoading } = useContext(DataContext);
  const [loading,data] = useAxios("/getData:CampaignList_0")
    const [theFilteredData , setFilteredData] = useState([])
    console.log(data)
    useEffect(()=>{
            if(data){
              const theFilteredData = JSON.parse(data).map((item) => {
                return {"name": item.name, "budget": item.budget.budget , "startDate": item.startDate , 
                "targetingType": item.targetingType,"budgetType": item.budget.budgetType ,
                "state": item.state, "id":item.campaignId }
              })
            setFilteredData(theFilteredData)
        }
    },[data])
  return (
    <div>
      {loading ? (
        <div className='loader'></div>
      ) : (
        <>
        <Table url={"/SmartBiddingAdGroup"} data ={theFilteredData} columns={["Name", "Budget", "Budget Type", "Start Date", "State", "Targeting Type", "Action"]}>
        </Table>
        </>
      )}
    </div>
  );
}

export default SmartBidCampaignList;