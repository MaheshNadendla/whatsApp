import React, { use, useContext } from 'react'
import { FaHashtag } from 'react-icons/fa';
import RightPartCard from './RightPartCard';

import { ImFeed } from "react-icons/im";
import { ContextDef } from '../contextDef';
import CmtyChnl from './SubRight/CmtyChnl';

function RChannels() {

const {homeRightPageChannel}= useContext(ContextDef);

if (homeRightPageChannel === null) {
  return (
        <RightPartCard
        Icon={ImFeed}
        heading="Join channels"
        subheading="Participate in topic-based discussions with your community."
        />
  )
}


   return (
    <CmtyChnl
      logo={homeRightPageChannel.image || "https://via.placeholder.com/100"}
      name={homeRightPageChannel.name || "Default Name"}
      bio={homeRightPageChannel.bio || "No description available."}
      followers={homeRightPageChannel.followers || "0 followers"}
      followed={homeRightPageChannel.followed || false}
    />
  );

}



export default RChannels
