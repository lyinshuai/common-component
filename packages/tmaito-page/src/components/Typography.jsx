import React, {
  useContext, useState, useRef, useEffect
  , useCallback
} from 'react';
import classnames from 'classnames';
import { Row, Col, Tooltip } from 'antd';


const Context = React.createContext({
  span: 6,
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
});

const Typography = (props) => {
  const {
    children, span = 6, labelCol = { span: 8 }, wrapperCol = { span: 16 }, className, ...other
  } = props;

  return (
    <Context.Provider value={{
      span,
      labelCol,
      wrapperCol
    }}
    >
      <Row
        className={classnames(
          'tmaito-typography',
          className
        )}
        {...other}
      >
        {children}
      </Row>
    </Context.Provider>
  );
};

const Item = (props) => {
  const {
    span, className, labelCol, label, wrapperCol, children
  } = props;
  const [visible, setVisible] = useState(false);
  const contextProps = useContext(Context);
  const [hasToolTip, setHasToolTip] = useState(false);
  const showTextRef = useRef(null);
  const hiddenTextRef = useRef(null);

  const init = useCallback(() => {
    setTimeout(() => {
      if (typeof children === 'string') {
        const showTextWidth = showTextRef.current.clientWidth;
        const hidenTextWidth = hiddenTextRef.current.clientWidth;
        setHasToolTip(hidenTextWidth >= showTextWidth);
      }
    }, 0);
  }, [children]);

  useEffect(() => {
    init();
    window.addEventListener('resize', init);
    return () => window.removeEventListener('resize', init);
  }, [init]);

  const handleVisibleChange = (visible) => {
    if (hasToolTip) {
      setVisible(visible);
    }
  };
  return (
    <Col span={span || contextProps.span}>
      <Row className={classnames('tmaito-typography-item', className)}>
        <Col
          span={8} {...contextProps.labelCol}
          {...labelCol} className={classnames('tmaito-typography-item__label', {
            'is-colon': label
          })}
        >
          {label}
        </Col>
        <Col
          span={16}
          {...contextProps.wrapperCol}
          {...wrapperCol}
          className="tmaito-typography-item__content"
        >
          <Tooltip arrowPointAtCenter title={children} visible={visible} onVisibleChange={handleVisibleChange}>
            <div
              ref={showTextRef} className={classnames({
                'is-ellipsis': hasToolTip
              })}
            >
              {children}
            </div>
          </Tooltip>
        </Col>
      </Row>
      <div className="tmaito-typography-item__hidden">
        <div className="tmaito-typography-item__hidden-inner" ref={hiddenTextRef}>{children}</div>
      </div>
    </Col>
  );
};

Typography.Item = Item;
export default Typography;
