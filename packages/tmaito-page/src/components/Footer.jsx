import React from 'react';
import { Row, Col } from 'antd';
import ExtraAction from './ExtraAction';

const colSpan = {
  span: 12
};
const TmaitoFooter = (props) => {
  const {
    extraContent, extraAction, extraActionProps, renderAction, labelCol = colSpan, wrapperCol = colSpan, ...otherProps
  } = props;

  return (
    <div className="tmaito-footer" {...otherProps}>
      <Row>
        <Col className="tmaito-footer__item" {...labelCol}>
          {extraContent}
        </Col>
        <Col className="tmaito-footer__item" {...wrapperCol}>
          {renderAction || <ExtraAction limit={5} {...extraActionProps} data={extraAction} />}
        </Col>
      </Row>
    </div>
  );
};

export default TmaitoFooter;
