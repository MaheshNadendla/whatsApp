import React from 'react';
import { FaUsers } from 'react-icons/fa';

const RightPartCard = ({ Icon = FaUsers, heading, subheading }) => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    width: '100%',
    textAlign: 'center',
    color: '#4a4a4a', // Gray text
    // backgroundColor: 'red'
  };

  const iconStyle = {
    fontSize: '65px',
    color: '#c0c0c0', // Light gray icon
    marginBottom: '28px',
  };

  const headingStyle = {
    fontSize: '24px',
    fontWeight: '1',
    marginBottom: '12px',
  };

  const subheadingStyle = {
    fontSize: '14px',
    maxWidth: '400px',
  };

  return (
    <div style={containerStyle}>
      <Icon style={iconStyle} />
      <h2 style={headingStyle}>{heading}</h2>
      <p style={subheadingStyle}>{subheading}</p>
    </div>
  );
};

export default RightPartCard;
