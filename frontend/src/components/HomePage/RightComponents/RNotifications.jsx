import React, { useContext } from 'react'
import { FaBell } from 'react-icons/fa';
import RightPartCard from './RightPartCard';
import { ContextDef } from '../contextDef';
import NotificationProfile from './SubRight/NotificationProfile';

function RNotifications() {


  const { notificationsProfile, setNotificationsProfile } = useContext(ContextDef); 
  if(notificationsProfile===null)
  {
     return (
      <RightPartCard
      Icon={FaBell}
      heading="Notifications"
      subheading="Receive instant alerts about updates and interactions."
      />
    )
  }

  return(<NotificationProfile/>);

 
}

export default RNotifications
