import React from 'react';
import { Helmet } from 'react-helmet';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import CampaignList from './pages/CampaignList';
import AdGroupList from './pages/AdGroupList';
import KeywordList from './pages/KeywordList';
import Login from './pages/Login';
import CampaignStrat from './pages/CustomStratPage';
import SmartBiddingCampaign from './pages/SmartBiddingCampaignPage';
import SmartBiddingAdGroup from './pages/SmartBiddingAdGroupPage';
import SmartBiddingKeyword from './pages/SmartBiddingKeywordPage';
import SIFeaturePage from './pages/SIFeaturePage';

// import UpdateKeyword from './pages/UpdateKeyword';
import FeaturePage from './pages/FeaturePage';
import Header from './components/Header';
// import DataContextProvider from './context/DataContextProvider';

function App() {
  try{
  return (
    <>
      <Router>
      <Header/>
      <Helmet>
        <meta http-equiv='cache-control' content='no-cache' />
        <meta http-equiv='expires' content='0' />
        <meta http-equiv='pragma' content='no-cache' />
      </Helmet>
      {/* <Login/> */}
        {/* <DataContextProvider> */}
          <Routes> 
            {/* Regular route */}
            <Route exact path="/" element={<Login />} />
            <Route path="/FeaturePage" element={<FeaturePage />} />
            <Route path="/SIFeaturePage" element={<SIFeaturePage />} />
            <Route path="/CampaignStrat" element={<CampaignStrat />} />
            <Route path="/CampaignList" element={<CampaignList />} />
            <Route path="/SmartBiddingCampaign" element={<SmartBiddingCampaign />} />
            <Route path="/SmartBiddingAdGroup/:id?" element={<SmartBiddingAdGroup />} />
            <Route path="/SmartBiddingKeyword/:id?" element={<SmartBiddingKeyword />} />
            <Route path="/adGroupList/:id?" element={<AdGroupList />} />
            <Route path="/KeywordList/:id?" element={<KeywordList />} />
            {/* <Route path="/UpdateKeyword/:id?" element={UpdateKeyword} /> */}
          </Routes>
        {/* </DataContextProvider> */}
        
      </Router>
    </>
  );
  }
  catch(error){
    console.log(error)
  }
}

export default App;