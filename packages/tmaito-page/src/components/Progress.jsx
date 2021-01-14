import React, { useRef, useState, useEffect } from 'react';
import { Progress } from 'antd';

const TmaitoProgress = (props) => {
  const intervalRef = useRef();
  const [percent, setPercent] = useState(0);
  const [times, setTimes] = useState(0);


  useEffect(() => {
    let timer = null;
    let time = 1;
    const handleCountdown = () => {
      if (times < 30) {
        time = 1;
      } else if (times < 51) {
        time = 3;
      } else if (times < 111) {
        time = 30;
      }
      if (percent >= 99) {
        time = 0;
        clearTimeout(timer);
      }

      timer = setTimeout(() => {
        switch (time) {
          case 1:
            setTimes(times + time);
            setPercent(percent + 3);
            break;
          case 3:
          case 30:
            setTimes(times + time);
            setPercent(percent + 1);
            break;
          default:
            break;
        }
        if (percent < 111) {
          handleCountdown();
        } else {
          clearTimeout(timer);
        }
      }, time * 1000);
      intervalRef.current = timer;
    };
    handleCountdown();
    return () => {
      clearTimeout(timer);
      clearTimeout(intervalRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [percent]);

  return (
    <div className="tmaito-progress">
      <Progress strokeColor="#2D85F3" status="active" percent={percent} />
    </div>
  );
};

export default TmaitoProgress;
