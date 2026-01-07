import React, { useContext } from 'react';
import { FaUsers } from 'react-icons/fa';
import RightPartCard from './RightPartCard';
import CmtyChnl from './SubRight/CmtyChnl';
import { ContextDef } from '../contextDef';

function RCommunity() {
  const { homeRightPage, setHomeRightPage } = useContext(ContextDef);

  if (homeRightPage === null) {
    return (
      <RightPartCard
        Icon={FaUsers}
        heading="Create communities"
        subheading="Bring members together in topic-based groups and easily send them admin announcements."
      />
    );
  }

  return (
    <CmtyChnl
      logo={homeRightPage.image || "https://via.placeholder.com/100"}
      name={homeRightPage.name || "Default Name"}
      bio={homeRightPage.bio || "No description available."}
      followers={homeRightPage.followers || "0 followers"}
      followed={homeRightPage.followed || false}
    />
  );
}

export default RCommunity;
