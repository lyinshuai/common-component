import React from 'react';
import { Table } from 'antd';
import { sum } from 'tmaito-utils';

const TableAntd = (props) => {
  const {
    height, columns, loading, ...otherProps
  } = props;
  const getLoading = () => {
    if (typeof loading === 'boolean') {
      return {
        size: 'large',
        spinning: loading,
        tip: 'Loading...'
      };
    }
    return loading;
  };
  return (
    <Table
      {...otherProps}
      loading={getLoading()}
      size="small"
      columns={columns}
      style={{ height }}
      pagination={false}
      scroll={{
        x: sum(columns, 'width', 120),
        y: height - 43,
        scrollToFirstRowOnChange: true
      }}
    />
  );
};

export default TableAntd;
