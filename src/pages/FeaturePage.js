import React, { useState } from 'react';
import { Link  } from 'react-router-dom';


export default function FeaturePage()
{
    return(
        <div>
            <h2>Select Feature</h2>
            <div className="buttons">
            <Link to='/CampaignList'>
                <button >Day Parting</button>
            </Link>
            <Link to='/CampaignStrat'>
                <button >Custom Campaign Strategy</button>
            </Link>
            <Link to='/SmartBiddingCampaign'>
                <button >Smart Bidding</button>
            </Link>
            <Link to='/SIFeaturePage'>
                <button >SI Rules</button>
            </Link>
            </div>
        </div>
    );
}