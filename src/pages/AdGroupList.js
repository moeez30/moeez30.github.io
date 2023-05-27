import { useParams } from 'react-router-dom';
import Table from '../components/Table';
import useAxios from '../CustomHooks/Get';
import { useEffect, useState } from 'react';


function AdGroupList() {
    const {id}=useParams()
    const [loading,data] = useAxios("/getData:adGroupList_"+id)
    const [FilteredData , setFilteredData] = useState([])
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
        <Table url={"/KeywordList"} data ={FilteredData} columns={["Name", "Default Bid", "State", "Action"]}>
        </Table>
        </>
      )}
    </div>
  );
}

export default AdGroupList;