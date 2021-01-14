import React from 'react';
import { Pagination } from 'antd';
import classnames from 'classnames';

const TmaitoPage = (props) => {
  const {
    pageNo, extraContent, pagination = true, onPageChange, pageSizeOption, id, ...otherProps
  } = props;

  const handleShowSizeChange = (pageNo, pageSize) => {
    onPageChange && onPageChange(1, pageSize);
  };

  const handlePaginationChange = (pageNo, pageSize) => {
    onPageChange && onPageChange(pageNo, pageSize);
  };

  return (
    <div
      id={id} className={classnames('tmaito-pagination', {
        'is-extra': extraContent
      })}
    >
      {extraContent && <div className="tmaito-pagination-extra">{extraContent}</div>}
      {pagination && (
      <Pagination
        showSizeChanger
        showQuickJumper
        {...otherProps}
        size="small"
        current={pageNo}
        onChange={handlePaginationChange}
        onShowSizeChange={handleShowSizeChange}
      />
      )}
    </div>
  );
};

TmaitoPage.defaultProps = {
  total: 0,
  pageNo: 1,
  pageSize: 20,
  onPageChange: () => {},
  showTotal: (total, range) => `第 ${range[0]} - ${range[1]} 条，共 ${total} 条记录`,
  pageSizeOptions: ['20', '50', '100', '200']
};

export default TmaitoPage;
