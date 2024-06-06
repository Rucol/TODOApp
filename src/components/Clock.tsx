import React, { useState, useEffect } from 'react';

const Clock: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="clock" style={{ fontSize: '26px', fontWeight: 'bold' }}>
      <span>Current Time: {currentTime.toLocaleTimeString()}</span>
    </div>
  );
};

export default Clock;
