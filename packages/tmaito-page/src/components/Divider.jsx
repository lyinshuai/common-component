import React from 'react';
import classnames from 'classnames';

const Divider = (props) => {
  // type => 'default', 'primary', 'danger', 'warning', 'success'
  const { content, type = 'default', ...otherProps } = props;
  return (
    <div
      className={classnames('tmaito-divider', {
        [`tmaito-divider-${type}`]: type && type !== 'default'
      })} {...otherProps}
    >
      {content}
    </div>
  );
};

export default Divider;
