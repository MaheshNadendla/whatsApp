import React, { useContext } from 'react';
import { ContextDef } from './contextDef';
import MessagePart from './RightComponents/MessagePart';
import RStatus from './RightComponents/RStatus';
import RCommunity from './RightComponents/RCommunity';
import RChannels from './RightComponents/RChannels';
import RSettings from './RightComponents/RSettings';
import RAddFriends from './RightComponents/RAddFriends';
import RNotifications from './RightComponents/RNotifications';
import AIChatCard from './RightComponents/RAiChat';
import RProfilePart from './RightComponents/RProfilePart';

function Right() {
  const { middlePage } = useContext(ContextDef);

  return (
    <div className="h-full bg-[#f0f2f5] overflow-y-auto">
      {middlePage === 'chats' && <MessagePart />}
      {middlePage === 'status' && <RStatus />}
      {middlePage === 'channels' && <RChannels />}
      {middlePage === 'community' && <RCommunity />}
      {middlePage === 'ai' && <AIChatCard />}
      {middlePage === 'settings' && <RSettings />}
      {middlePage === 'profile' && <RProfilePart />}
      {middlePage === 'addfriends' && <RAddFriends />}
      {middlePage === 'notifications' && <RNotifications />}
    </div>
  );
}

export default Right;
