import React, { useState, useEffect, useCallback } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import update from 'immutability-helper';
import { sum } from 'tmaito-utils';
import classnames from 'classnames';
import { DragableRow } from './DragableRow';
import { ResizeableTitle } from './ResizeableTitle';
import { SortColumn } from './SortColumn';
import ExtraAction from './ExtraAction';
import TableAntd from './TableAntd';
import { Popover, Icon } from 'antd';


const TmaitoContainer = (props) => {
  const {
    mode,
    rowKey,
    columns,
    dragable,
    sortable,
    onChange,
    resizable,
    expandRow,
    dataSource,
    onDragable,
    onResizable,
    onSortChange,
    rowSelection,
    hideExpandIcon = true,
    ...otherProps
  } = props;

  // 展开子表格 key
  const [expandedRowKeys, setExpandedRowKeys] = useState('');
  // 展开子表格 hang 属性
  const [expandedRowRecord, setExpandedRowRecord] = useState(null);

  // 子表格选中项 rowKey 数组
  const [isAllSelectedExpandRow, setIsAllSelectedExpandRow] = useState(false);
  const [selectedExpandRowKeys, setSelectedExpandRowKeys] = useState([]);
  const [startWidth, setStartWidth] = useState(0);

  // 表头排序 - columns 顺序集合
  const [sortColumns, setSortColumns] = useState([]);
  // 表头排序 - 展示 dataIndex 集合
  const [sortShowColumnKeys, setSortShowColumnKeys] = useState([]);

  useEffect(() => {
    const list = columns.filter((item) => !item.fixed);
    setSortColumns([...list]);
    setSortShowColumnKeys([...list.map((item) => item.dataIndex)]);
  }, [columns, setSortShowColumnKeys, setSortColumns]);

  const resetExpandSelectKeys = useCallback(() => {
    if (rowSelection) {
      const { selectedRowKeys } = rowSelection;
      const { selectionable = false } = expandRow || {};
      const expandRowItem = selectedRowKeys.find((item) => item.id === expandedRowKeys);
      if (selectionable && expandRowItem) {
        const { selectedRowKeys: keys = [] } = expandRowItem;
        const isAllChecked = !keys.length;
        setIsAllSelectedExpandRow(isAllChecked);
        setSelectedExpandRowKeys(isAllChecked ? [] : [...keys]);
      } else {
        setIsAllSelectedExpandRow(false);
        setSelectedExpandRowKeys([]);
      }
    }
  }, [rowSelection, expandRow, expandedRowKeys]);

  useEffect(() => {
    resetExpandSelectKeys();
  }, [resetExpandSelectKeys]);
  // 重置 拖拽 or 列宽调整
  const resetDragableOrResizable = () => {
    let options = {};
    let components = {};
    if (dragable) {
      options = {
        ...options,
        onRow: (record, index) => ({
          index,
          moveRow: handleDragableRowMove
        })
      };
      components = {
        ...components,
        body: {
          row: DragableRow
        }
      };
    }
    if (resizable) {
      components = {
        ...components,
        header: {
          cell: ResizeableTitle
        }
      };
    }
    return {
      ...options,
      components
    };
  };

  // 重置 主table 筛选属性
  const resetSelection = () => {
    if (rowSelection) {
      const {
        onChange, selectedRowKeys, getCheckboxProps, ...otherProps
      } = rowSelection;
      const keys = selectedRowKeys.map((item) => item.id);
      if (otherProps.fixed) {
        otherProps.fixed = expandRow ? false : otherProps.fixed;
      }
      return {
        rowSelection: {
          ...otherProps,
          columnWidth: 40,
          onSelect: handleSelectRow,
          selectedRowKeys: [...keys],
          onSelectAll: handleSelectAllRow,
          getCheckboxProps: getRowCheckboxProps
        }
      };
    }
    return null;
  };

  // 行属性扩展
  const getRowCheckboxProps = (record) => {
    if (rowSelection) {
      const { selectedRowKeys, getCheckboxProps } = rowSelection;
      const { selectionable = false } = expandRow || {};
      const props = getCheckboxProps ? getCheckboxProps(record) : {};
      if (selectionable) {
        const item = selectedRowKeys.find((item) => item.id === record[rowKey]);
        if (item) props.indeterminate = item.selectedRowKeys ? !!item.selectedRowKeys.length : false;
      }
      return props;
    }
  };

  // 单行勾选操作
  const handleSelectRow = (record, selected, selectedRows) => {
    // console.log('onSelect', record, selected, selectedRows);
    const { selectedRowKeys, onChange } = rowSelection;
    const { selectionable = false } = expandRow || {};
    // const hasExpandSelectionable = expandRow?.selectionable || false;
    if (onChange) {
      if (selectionable) {
        let selectedKeys = [];
        const { rowKey: key, getCheckboxProps, dataSource } = expandRow || {};
        const hasKey = selectedRowKeys.some((item) => item.id === record[rowKey]);
        if (selected) {
          if (hasKey) {
            selectedKeys = selectedRowKeys.map((item) => {
              if (item.id === record[rowKey]) {
                return {
                  ...item,
                  selectedRowKeys: [],
                  unselectedRowKeys: []
                };
              }
              return item;
            });
          } else {
            selectedKeys = [
              ...selectedRowKeys,
              {
                record,
                id: record[rowKey],
                selectedRowKeys: [],
                unselectedRowKeys: []
              }
            ];
          }
          if (expandedRowKeys && record[rowKey] === expandedRowKeys) {
            const expandSelectedKeys = dataSource.filter((item) => {
              const { disabled = false } = getCheckboxProps ? getCheckboxProps(item) : {};
              return !disabled;
            }).map((item) => item[key]);
            setSelectedExpandRowKeys([...expandSelectedKeys]);
          }
        } else {
          selectedKeys = selectedRowKeys.filter((item) => item.id !== record[rowKey]);
          setSelectedExpandRowKeys([]);
        }
        onChange(selectedKeys);
      } else {
        onChange(selectedRows.map((item) => ({
          id: item[rowKey],
          record: item
        })));
      }
    }
  };

  // 全选勾选操作
  const handleSelectAllRow = (selected, selectedRows) => {
    // console.log('onSelectAll', selected, selectedRows);
    const { onChange } = rowSelection;
    if (onChange) {
      const { selectionable = false } = expandRow || {};
      if (selectionable) {
        onChange(selectedRows.map((item) => ({
          id: item[rowKey],
          selectedRowKeys: [],
          unselectedRowKeys: []
        })));
        if (expandedRowKeys && selected) {
          const { rowKey: key, getCheckboxProps, dataSource } = expandRow;
          const expandSelectedKeys = dataSource.filter((item) => {
            const { disabled = false } = getCheckboxProps ? getCheckboxProps(item) : {};
            return !disabled;
          }).map((item) => item[key]);
          setSelectedExpandRowKeys([...expandSelectedKeys]);
        } else {
          setSelectedExpandRowKeys([]);
        }
      } else {
        onChange(selectedRows.map((item) => ({
          id: item[rowKey],
          record: item
        })));
      }
    }
  };

  // 拖拽行移动
  const handleDragableRowMove = (from, to) => {
    if (onDragable) {
      onDragable(
        update(dataSource, {
          $splice: [
            [from, 1],
            [to, 0, dataSource[from]]
          ]
        })
      );
    }
  };

  // 重置扩展子表格属性
  const resetExpand = () => {
    if (expandRow) {
      const {
        onClick,
        onExpand,
        expandIcon,
        onDoubleClick,
        expandRowByClick,
        expandIconColumnIndex,
        ...otherProps
      } = expandRow;
      return {
        expandIcon,
        expandedRowKeys,
        expandRowByClick,
        expandIconColumnIndex,
        onExpand: (expanded, record) => handleClickExpand(null, record, onExpand),
        onRow: (record) => ({
          onClick: (event) => handleClickExpand(event, record, onClick),
          onDoubleClick: (event) => handleClickExpand(event, record, onDoubleClick)
        }),
        expandedRowRender: () => (
          <ExpandTableAntd
            {...otherProps}
            width={sum(columns, 'width', 120)}
            isAllSelected={isAllSelectedExpandRow}
            selectedRowKeys={selectedExpandRowKeys}
            onChange={handleExpandCheckbox}
          />
        )
      };
    }
    return null;
  };

  // 展开行操作
  const handleClickExpand = async (e, record, onClick) => {
    if (expandedRowKeys === record[rowKey]) {
      setExpandedRowKeys('');
      setExpandedRowRecord(null);
    } else {
      if (rowSelection) {
        const { selectedRowKeys } = rowSelection;
        const { selectionable = false } = expandRow || {};
        if (selectionable) {
          const expandRowItem = selectedRowKeys.find((item) => item.id === record[rowKey]);
          if (expandRowItem) {
            const { selectedRowKeys = [] } = expandRowItem;
            const isAllChecked = !selectedRowKeys.length;
            setIsAllSelectedExpandRow(isAllChecked);
            setSelectedExpandRowKeys(isAllChecked ? [] : [...selectedRowKeys]);
          } else {
            setSelectedExpandRowKeys([]);
            setIsAllSelectedExpandRow(false);
          }
        }
      }

      await onClick && onClick(record);
      setExpandedRowRecord(record);
      setExpandedRowKeys(record[rowKey]);
    }
  };

  // 展开行勾选操作
  const handleExpandCheckbox = (isAllChecked, checkedKeys, uncheckedKeys, checkedList, unCheckedList) => {
    const { onChange, selectedRowKeys } = rowSelection;
    setSelectedExpandRowKeys(isAllChecked ? [] : [...checkedKeys]);
    setIsAllSelectedExpandRow(isAllChecked);
    const hasExpandRowKey = selectedRowKeys.some((item) => item.id === expandedRowKeys);
    let selectedRows = [];
    if (hasExpandRowKey) {
      if (checkedKeys.length) {
        selectedRows = selectedRowKeys.map((item) => {
          if (item.id === expandedRowKeys) {
            return {
              ...item,
              selectedList: [...checkedList],
              unselectedList: [...unCheckedList],
              unselectedRowKeys: [...uncheckedKeys],
              selectedRowKeys: isAllChecked ? [] : [...checkedKeys]
            };
          }
          return item;
        });
      } else {
        selectedRows = selectedRowKeys.filter((item) => item.id !== expandedRowKeys);
      }
    } else {
      selectedRows = [
        ...selectedRowKeys,
        {
          id: expandedRowKeys,
          record: expandedRowRecord,
          selectedRowKeys: isAllChecked ? [] : [...checkedKeys],
          unselectedRowKeys: [...uncheckedKeys]
        }
      ];
    }
    onChange && onChange(selectedRows);
  };

  const stopPropagation = (e) => e.stopPropagation();

  // 表格头伸缩 - start
  const handleResizeStart = (e, { node, size }) => {
    node.classList.add('resizing');
    setStartWidth(size.width);
    // 在handle上添加stopPropagation方式其他事件触发，如排序。
    // 每次都先移除事件再添加，避免注册过多事件
    node.removeEventListener('click', stopPropagation);
    node.addEventListener('click', stopPropagation);
  };

  // 表格头伸缩 - move
  const handleResize = (e, { node, size }) => {
    const marginRight = startWidth - size.width;
    node.style.marginRight = `${marginRight}px`;
  };

  // 表格头伸缩 - end
  const handleResizeStop = (col) => (e, { node, size }) => {
    node.classList.remove('resizing');
    node.style.marginRight = null;
    const newColumnes = sortColumns.map((item) => {
      if (item.dataIndex === col.dataIndex) {
        return {
          ...item,
          width: size.width
        };
      }
      return item;
    });
    setSortColumns([...newColumnes]);
    onResizable && onResizable(newColumnes);
  };

  // action
  const handleExtration = () => {};

  // 重置 columns
  const initColumns = () => {
    const hasFixedLeft = columns.some((item) => item.fixed === 'left');
    const fixed = (hasFixedLeft || rowSelection?.fixed) ? 'left' : false;
    const sortColumn = {
      dataIndex: 'sortColumn',
      width: 40,
      align: 'center',
      fixed: expandRow ? false : fixed,
      title: (
        <SortColumn
          data={sortColumns}
          values={sortShowColumnKeys}
          onSortChange={handleSortChange}
          onCheckChange={handleSortCheckChange}
        />
      )
    };

    let fixedLefts = columns.filter((item) => [true, 'left'].includes(item.fixed)).map((item) => ({
      ...item,
      fixed: expandRow ? false : item.fixed
    }));

    const fixedRights = columns.filter((item) => ['right'].includes(item.fixed)).map((item) => ({
      ...item,
      fixed: expandRow ? false : item.fixed
    }));

    const sortedColumns = sortColumns.filter((item) => sortShowColumnKeys.includes(item.dataIndex));
    if (sortable) {
      fixedLefts = [sortColumn, ...fixedLefts];
    }

    const newColumns = [...fixedLefts, ...sortedColumns, ...fixedRights].map(
      (item) => {
        if (item.extraAction) {
          return {
            ...item,
            render: (text, record) => (
              <ExtraAction
                limit={4}
                type="link"
                data={item.extraAction}
                onExtraAction={(values) => {
                  handleExtration(values, record);
                }}
              />
            )
          };
        }
        return item;
      }
    );

    return newColumns.map((item, index) => {
      if (resizable) {
        return {
          ...item,
          onHeaderCell: (col) => ({
            width: col.width,
            fixed: col.fixed,
            dataIndex: col.dataIndex,
            onResize: handleResize,
            onResizeStart: handleResizeStart,
            onResizeStop: handleResizeStop(item)
          })
        };
      }
      return item;
    });
  };

  // 表头排序 - 顺序调整
  const handleSortChange = (values) => {
    setSortColumns(values);
    onSortChange && onSortChange(values);
  };

  // 表头排序 - 展示项
  const handleSortCheckChange = (values) => {
    setSortShowColumnKeys(values);
  };

  // 筛选 or 排序
  const handleFilterOrSortChange = (pagination, filters, sorter) => {
    onChange && onChange({
      sorter,
      filters
    });
  };

  const initTableProps = () => {
    const params = {
      rowKey,
      dataSource,
      className: classnames('tmaito-ant-table', {
        'is-hide-expand-icon': hideExpandIcon
      }),
      columns: [...initColumns()],
      ...otherProps,
      onChange: handleFilterOrSortChange,
      ...resetExpand(),
      ...resetSelection(),
      ...resetDragableOrResizable()
    };
    return params;
  };

  if (mode !== 'virtual') {
    if (dragable) {
      return (
        <DndProvider backend={HTML5Backend}>
          <TableAntd {...initTableProps()} />
        </DndProvider>
      );
    }
    return <TableAntd {...initTableProps()} />;
  }
  return null;
};

const ExpandTableAntd = (props) => {
  const {
    width, onChange, columns, rowKey, isAllSelected, selectionable, selectedRowKeys, getCheckboxProps, dataSource, ...otherProps
  } = props;

  const [selectedKeys, setSelectedKeys] = useState([]);
  const [expandColumns, setExpandColumns] = useState([]);

  const getAvailableDataSource = useCallback(() => dataSource.filter((item) => {
    const { disabled = false } = getCheckboxProps ? getCheckboxProps(item) : {};
    return !disabled;
  }), [dataSource, getCheckboxProps]);

  const initSelectedRowKeys = useCallback(() => {
    if (selectionable) {
      if (isAllSelected) {
        const availableList = getAvailableDataSource();
        const keys = availableList.map((item) => item[rowKey]);
        setSelectedKeys([...keys]);
      } else {
        setSelectedKeys([...selectedRowKeys]);
      }
    }
  }, [selectionable, isAllSelected, selectedRowKeys, getAvailableDataSource, rowKey]);

  const renderPopover = (record, list) => (
    <div>
      {list.map((item, index) => (
        <div key={index} style={{ display: 'inline-block', margin: '0 10px' }}>
          {item.title}
          ：
          {item.render ? item.render(record[item.dataIndex], record) : record[item.dataIndex]}
        </div>
      ))}
    </div>
  );

  const initColumns = useCallback(() => {
    let expandWidth = 0;
    const showColums = [];
    const hideColums = [];
    columns.forEach((column) => {
      expandWidth += column.width;
      if (expandWidth + 120 <= width) {
        showColums.push(column);
      } else {
        hideColums.push(column);
      }
    });
    if (hideColums.length) {
      showColums.push({
        title: '',
        width: 60,
        align: 'right',
        dataIndex: 'extension',
        render: (text, record) => (
          <Popover placement="topRight" content={renderPopover(record, hideColums)}>
            <Icon type="ellipsis" style={{ fontSize: '18px' }} className="link" />
          </Popover>
        )
      });
    }

    setExpandColumns(showColums);
  }, [columns, width]);

  useEffect(() => {
    initSelectedRowKeys();
  }, [dataSource, initSelectedRowKeys]);

  useEffect(() => {
    initColumns();
  }, [columns, initColumns]);

  const handleCheckboxCheck = (values) => {
    const availableDataSource = getAvailableDataSource();
    const isAllChecked = values.length === availableDataSource.length;
    const checkedList = availableDataSource.filter((item) => values.includes(item[rowKey]));
    const unCheckedList = availableDataSource.filter((item) => !values.includes(item[rowKey]));
    const unCheckedIds = unCheckedList.map((item) => item[rowKey]);
    onChange(isAllChecked, values, unCheckedIds, checkedList, unCheckedList);
  };

  const resetSelection = () => {
    if (selectionable) {
      return {
        rowSelection: {
          onChange: handleCheckboxCheck,
          selectedRowKeys: selectedKeys,
          getCheckboxProps,
          columnWidth: 40
        }
      };
    }
    return null;
  };

  const tableProps = {
    rowKey, dataSource, ...otherProps, ...resetSelection()
  };

  return (
    <div>
      <TableAntd
        className="tmaito-ant-table-expand"
        {...tableProps}
        columns={expandColumns}
        pagination={false}
      />
    </div>
  );
};

TmaitoContainer.defaultProps = {
  mode: '',
  rowKey: 'key',
  dragable: false,
  sortable: false,
  resizable: false
};

export default TmaitoContainer;
