import React, { useContext } from 'react'
import { FaUserPlus } from 'react-icons/fa';
import RightPartCard from './RightPartCard';
import AddFriendComponent from './SubRight/AddFriendRight';
import { ContextDef } from '../contextDef';

function RAddFriends() {

  const { addFriendProfile,setAddFriendProfile} = useContext(ContextDef);

  if(addFriendProfile===null)
  {
  
    return (
      <RightPartCard
      Icon={FaUserPlus}
      heading="Add friends"
      subheading="Connect with others by sending friend requests and chatting directly."
      />
    )
  }
 return(<AddFriendComponent/>)
}

export default RAddFriends
