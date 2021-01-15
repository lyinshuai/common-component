/* eslint-disable no-console */
import React, { useState } from 'react';
import SortableFilter from '../src/index';
import { Form, Input, Button } from 'antd';
import './assets/less/index.less';

const Demo = (props) => {
  const [cols, setCols] = useState([
    { dataIndex: 'col1', title: '测试1', hidden: true },
    { dataIndex: 'col2', title: '测试2', hidden: true },
    { dataIndex: 'col3', title: '测试3', hidden: false },
    { dataIndex: 'col4', title: '测试4', hidden: false },
    { dataIndex: 'col5', title: '测试5', hidden: false },
    { dataIndex: 'col6', title: '测试6', hidden: false },
    { dataIndex: 'col7', title: '测试7', hidden: false },
    { dataIndex: 'col8', title: '测试8', hidden: false },
    { dataIndex: 'col9', title: '测试9', hidden: false }
  ]);

  const handleCheck = (col) => {
    console.log(col);
    setCols((cols) => cols.map((prevCol) => (prevCol.dataIndex !== col.dataIndex ? { ...prevCol } : col)));
  };

  const handleSort = (cols) => {
    console.log(cols);
    setCols(cols);
  };

  return (
    <SortableFilter
      checkable
      cols={cols}
      onCheckChange={handleCheck}
      onSortChange={handleSort}
    />
  );
};
export default Demo;
