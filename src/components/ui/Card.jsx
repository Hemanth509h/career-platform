import React from 'react';

const Card = ({ children, className = '', glass = false, ...props }) => {
  const baseClass = glass ? 'glass-panel' : 'card';
  return (
    <div className={`${baseClass} ${className}`} {...props}>
      {children}
    </div>
  );
};

export default Card;
