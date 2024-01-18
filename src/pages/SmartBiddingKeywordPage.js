import { useParams } from 'react-router-dom';
import Table from '../components/SmartBidTable';
import useAxios from '../CustomHooks/Get';
import { useEffect, useState } from 'react';
import { SmartDayPartForm } from '../components/SmartDayPartForm';

function SmartKeywordList() {
    const {id}=useParams()
    const [loading,data] = useAxios("/getData:KeywordList_"+id)
    const [FilteredData , setFilteredData] = useState([])
    const [keywordId, setKeywordId] = useState(null)
    useEffect(()=>{
            if(data){
                console.log(data)
                const theFilteredData = JSON.parse(data).map((item) => {
                    return {"name": item.keywordText, "bid":item.bid, 
                    "State": item.state, "MatchType":item.matchType,  
                    "keywordId": item.keywordId}
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
        {keywordId && <SmartDayPartForm data = {keywordId} setKeywordId={setKeywordId}/>}
        <Table data ={FilteredData} setKeywordId={setKeywordId} columns={["Name", "Bid", "State", "Match Type", "Action"]}/>
        </>
      )}
    </div>
  );
}

export default SmartKeywordList;