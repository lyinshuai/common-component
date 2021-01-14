import React from 'react';
import { Resizable } from 'react-resizable';

const ResizeableTitle = (props) => {
  const {
    onResize,
    onResizeStop,
    onResizeStart,
    width,
    fixed,
    dataIndex,
    ...restProps
  } = props;

  if (!width || fixed || dataIndex === 'sortColumn') {
    return <th {...restProps} />;
  }

  return (
    <Resizable
      width={width}
      height={0}
      onResize={onResize}
      onResizeStop={onResizeStop}
      onResizeStart={onResizeStart}
    >
      <th {...restProps} />
    </Resizable>
  );
};

export { ResizeableTitle };
