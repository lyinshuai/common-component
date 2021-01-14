import React, {
  forwardRef, useState, useCallback, useRef, useEffect, useImperativeHandle
} from 'react';
import classnames from 'classnames';
import Filter from './Filter';
import Tab from './Tab';
import Container from './Container';
import Pagination from './Pagination';
import Footer from './Footer';
// import { operationArrayRepeat } from '../utils';

const TmaitoPage = (props, ref) => {
  const {
    tab,
    width,
    table,
    style,
    layout,
    filter,
    footer,
    height,
    className,
    pagination,
    renderContent,
    loading = false,
    animated = false,
    multipleable = false,
    allSelectable = false,
    filterBeforeTab = true,
    ...otherProps
  } = props;
  const pageRef = useRef(null);
  const headerRef = useRef(null);
  const footerRef = useRef(null);

  // 计算页面高度
  const [containerHeight, setContainerHeight] = useState(0);

  // Filter 相关
  const [filterParams, setFilterParams] = useState(null);

  const getTableScrollY = useCallback(() => {
    const { clientHeight: pageHeight } = pageRef.current || {};
    const { clientHeight: headerHeight } = headerRef.current || {};
    const { clientHeight: footerHeight } = footerRef.current || {};
    const tableContainerHeight = pageHeight - headerHeight - footerHeight;
    setContainerHeight(tableContainerHeight);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, filter, footer]);

  useEffect(() => {
    getTableScrollY();
    window.addEventListener('resize', getTableScrollY);
    return () => window.removeEventListener('resize', getTableScrollY);
  }, [getTableScrollY]);

  useImperativeHandle(ref, () => ({
    onresize: getTableScrollY
  }));

  const getFilterParams = () => {
    const { fields } = filter || {};
    if (filterParams) return filterParams;
    const params = {};
    fields.forEach((item) => {
      if (item.value) params[item.code] = item.value;
    });
    return params;
  };

  // 筛选操作
  const handleFilterSearch = (values) => {
    const { onSearch } = filter || {};
    setFilterParams({ ...values });
    if (onSearch) {
      onSearch({ ...values });
    }
  };

  // tab 切换
  const handleTabChange = (activeKey, values) => {
    const { onChange } = tab || {};
    let params = {
      ...values
    };
    if (filter) {
      params = {
        ...getFilterParams(),
        ...params
      };
    }
    if (onChange) {
      onChange(activeKey, params);
    }
  };

  // 翻页操作
  const handlePageChange = (pageNo, pageSize) => {
    const { onPageChange } = pagination;
    if (!multipleable) {
      const { rowSelection } = table || {};
      if (rowSelection) {
        const { onChange } = rowSelection;
        onChange && onChange([]);
      // } else {
        // throw new Error('rowSelection is required!');
      }
    }
    onPageChange(pageNo, pageSize);
  };

  return (
    <div
      className={classnames('tmaito-page', className, {
        'tmaito-page-normal': layout === 'normal',
        'is-animate': animated
      })}
      style={{
        width,
        height,
        ...style
      }}
      {...otherProps}
      ref={pageRef}
    >
      <div
        className={classnames('tmaito-page__header', {
          'is-empty': !filter && !tab,
          'is-filter-after': !filterBeforeTab
        })} ref={headerRef}
      >
        {filter && filterBeforeTab && (
          <Filter {...filter} onSearch={handleFilterSearch} />
        )}
        {tab && <Tab {...tab} onChange={handleTabChange} />}
        {filter && !filterBeforeTab && (
          <Filter {...filter} onSearch={handleFilterSearch} />
        )}
      </div>
      {(renderContent || table) && (
        <div
          className={classnames('tmaito-page__container', {
            'has-radius': !pagination && layout !== 'normal'
          })}
          style={{ height: containerHeight }}
        >
          {renderContent || (
          <Container
            {...table}
            loading={loading}
            height={containerHeight - 8}
          />
          )}
        </div>
      )}
      <div
        className={classnames('tmaito-page__footer', {
          'pb-8': pagination && !footer && layout !== 'normal',
          'pt-8': !pagination && footer && layout !== 'normal'
        })} ref={footerRef}
      >
        {pagination && (
          <Pagination {...pagination} checkable={allSelectable} onPageChange={handlePageChange} />
        )}
        {footer && <Footer {...footer} />}
      </div>
    </div>
  );
};

export default forwardRef(TmaitoPage);
