import React from 'react'
 import { FaCog } from 'react-icons/fa';
import RightPartCard from './RightPartCard';

function RSettings() {
  return (
   

    <RightPartCard
    Icon={FaCog}
    heading="Settings"
    subheading="Customize your preferences and manage your account settings."
    />

  )
}

export default RSettings
