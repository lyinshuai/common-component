import React from 'react';
import { Popover, Icon } from 'antd';
import Sortable from './Sortable';

const SortColumn = (props) => (
  <Popover
    arrowPointAtCenter
    trigger="click"
    placement="bottomLeft"
    content={(
      <div className="popover-tmaito-table-sort">
        <div className="popover-tmaito-table-sort__header">
          字段选择与排序：
        </div>
        <Sortable
          className="popover-tmaito-table-sort__container"
          checkable
          {...props}
        />
      </div>
    )}
  >
    <div className="tmaito-table-sort-column">
      <Icon type="unordered-list" />
    </div>
  </Popover>
);

export { SortColumn };
