import React, { useContext } from 'react'
import RightPartCard from './RightPartCard'
import { FaRegSmile } from 'react-icons/fa';
import { MdVideoLibrary } from "react-icons/md";
import { ContextDef } from '../contextDef';

import StatusViewer from './SubRight/StatusViewer';

function RStatus() {


  const {selectedUserStatus} = useContext(ContextDef);


  if(selectedUserStatus===null){

      return (
        <RightPartCard
          Icon={MdVideoLibrary}
          heading="Check your status"
          subheading="Stay updated with real-time system messages and notifications."
        />
      )

  }

  return (
    <StatusViewer/>
  )

}

export default RStatus
