import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import CampaignList from './pages/CampaignList';
import AdGroupList from './pages/AdGroupList';
import KeywordList from './pages/KeywordList';
import Login from './pages/Login';
// import UpdateKeyword from './pages/UpdateKeyword';
import Header from './components/Header';
import DataContextProvider from './context/DataContextProvider';

function App() {
  return (
    <>
      <Router>
      <Header/>
      {/* <Login/> */}
        {/* <DataContextProvider> */}
          <Routes> 
            {/* Regular route */}
            <Route exact path="/" element={<Login />} />
            <Route path="/CampaignList" element={<CampaignList />} />
            <Route path="/adGroupList/:id?" element={<AdGroupList />} />
            <Route path="/KeywordList/:id?" element={<KeywordList />} />
            {/* <Route path="/UpdateKeyword/:id?" element={UpdateKeyword} /> */}
          </Routes>
        {/* </DataContextProvider> */}
        
      </Router>
    </>
  );
}

export default App;