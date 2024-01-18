import { useParams } from 'react-router-dom';
import Table from '../components/SmartBidTable';
import useAxios from '../CustomHooks/Get';
import { useEffect, useState } from 'react';
import { SmartDayPartForm } from '../components/SmartDayPartForm';



function SmartBidAdGroupList() {
    const {id}=useParams()
    console.log(id)
    const [loading,data] = useAxios("/getData:adGroupList_"+id)
    const [FilteredData , setFilteredData] = useState([])
    const [adGroupId, setadGroupId] = useState(null)

    console.log(FilteredData)
    useEffect(()=>{
            if(data){
                const theFilteredData = JSON.parse(data).adGroups.map((item) => {
                    return {"name": item.name, "state":item.state, 
                    "DefaulBid": item.defaultBid, "id":item.adGroupId }
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
        {/* {adGroupId && <SmartDayPartForm data = {adGroupId} setadGroupId={setadGroupId}/>} */}
        <Table url={"/SmartBiddingKeyword"}  data ={FilteredData} columns={["Name", "Default Bid", "State", "Action"]}>
        </Table>
        </>
      )}
    </div>
  );
}

export default SmartBidAdGroupList;