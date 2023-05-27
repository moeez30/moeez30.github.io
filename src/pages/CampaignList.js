import { useContext } from 'react';
import { DataContext } from '../context/DataContextProvider';
import Table from '../components/Table';
function CampaignList() {
  const { data, isLoading } = useContext(DataContext);
  return (
    <div>
      {isLoading ? (
        <div className='loader'></div>
      ) : (
        <>
        <Table url={"/adGroupList"} data ={data} columns={["Name", "Budget", "Budget Type", "Start Date", "State", "Targeting Type", "Action"]}>
        </Table>
        </>
      )}
    </div>
  );
}

export default CampaignList;