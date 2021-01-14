import React, { useState, useEffect, useRef } from 'react';
import classnames from 'classnames';
import { Button } from 'antd';

const Collapse = (props) => {
  const {
    children, onChange, height, className, ...other
  } = props;
  const contentRef = useRef(null);

  const [isExtend, setExtend] = useState(false);
  const [clientHeight, setClientHeight] = useState(0);

  const handleExtendToggle = () => {
    setExtend(!isExtend);
    const curheight = !isExtend ? clientHeight : height;
    onChange(curheight + 32);
  };

  useEffect(() => {
    setTimeout(() => {
      const { clientHeight = 0 } = contentRef.current || {};
      setClientHeight(clientHeight);
    }, 0);
  }, [children]);

  return (
    <div className={classnames('tmaito-collapse', className)} {...other}>
      <div
        className="tmaito-collapse__content"
        style={{ height: isExtend ? clientHeight : height }}
      >
        <div ref={contentRef}>{children}</div>
      </div>
      <div
        className={classnames('tmaito-collapse__action align-center', {
          'is-extend': isExtend
        })}
        onClick={handleExtendToggle}
      >
        <Button icon="double-right" type="link">
          {isExtend ? '收起' : '展开'}
        </Button>
      </div>
    </div>
  );
};

export default Collapse;
