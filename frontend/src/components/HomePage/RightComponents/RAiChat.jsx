import React, { useContext } from 'react';
import { FaRobot } from 'react-icons/fa';
import RightPartCard from './RightPartCard';
import { ContextDef } from '../contextDef';

function AIChatCard() {

  const {AiRightPage, setAiRightPage}=useContext(ContextDef)

  if(AiRightPage===null){

    return (
      <RightPartCard
        Icon={FaRobot}
        heading="Chat with AI"
        subheading="Get instant answers, suggestions, and creative help from your AI assistant."
      />
    );
  }
  return(<RightPartCard
        Icon={AiRightPage.Icon}
        heading={AiRightPage.name}
        subheading={AiRightPage.description}
      />
  )
}

export default AIChatCard;
