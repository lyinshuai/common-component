import React from 'react';
import classnames from 'classnames';
import { Empty } from 'antd';

const Timeline = (props) => {
  const { mode = '', dataSource = [] } = props;
  if (dataSource.length === 0) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  }
  return (
    <div className={classnames('tmaito-timeline', {
      'is-alternate': mode === 'alternate'
    })}
    >
      <div className="tmaito-timeline-item tmaito-timeline-item-begin">
        <div className="tmaito-timeline-item__tail" />
        <div className="tmaito-timeline-item__head" />
      </div>
      {dataSource.map((item, index) => (
        <div
          className={classnames('tmaito-timeline-item', {
            'tmaito-timeline-item-end': index === dataSource.length - 1
          })} key={index}
        >
          <div className="tmaito-timeline-item__tail" />
          <div className="tmaito-timeline-item__head" />
          <div className="tmaito-timeline-item__content">
            <div className="content-time">{item.time}</div>
            <div className="content-label">
              <label>操作人</label>
              <span>{item.label}</span>
            </div>
            <div className="content-inner">
              <label>操作内容</label>
              <span>{item.content}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Timeline;
