import React, { useState } from 'react';


export default function FeaturePage()
{
    const DayParting = () => {
        window.location.href = '/CampaignList'
    }

    const campaignStrat = () => {
        window.location.href = '/CampaignStrat'
    }

    const SmartBidding = () => {
        window.location.href = '/SmartBiddingCampaign'
    }

    const SIFeatures = () => {
        window.location.href = '/SIFeaturePage'
    }
    return(
        <div>
            <h2>Select Feature</h2>
            <div className="buttons">
            <button onClick={DayParting}>Day Parting</button>
            <button onClick={campaignStrat}>Custom Campaign Strategy</button>
            <button onClick={SmartBidding}>Smart Bidding</button>
            <button onClick={SIFeatures}>SI Rules</button>
            </div>
        </div>
    );
}