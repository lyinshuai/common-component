/* eslint-disable no-console */
import React, { useEffect, useState, useRef } from 'react';
import { Modal, Spin } from 'antd';
import Page, {
  Divider, Progress, Typography, Timeline
} from '../src';
import { AuthcodeProvider } from 'tmaito-authcode';
// import Page, { Divider, Typography } from '../dist';
import { fields, tabSource, authCodes } from './constants';
import {
  columns, total, fetchData, getDataSource, expandColumns
} from './data';
import './assets/less/index.less';

const { Item } = Typography;
const Demo = (props) => {
  const nodeRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [fieldSource, setFieldSource] = useState([]);
  const [filterParams, setFilterParams] = useState({
    business_bill_type: ''
  });
  const [visible, setVisible] = useState(false);
  const [logVisible, setLogVisible] = useState(false);
  const [sortedInfo, setSortedInfo] = useState(null);
  const [demoVisible, setDemoVisible] = useState(false);
  const [activeKey, setActiveKey] = useState('1');
  const [pageSize, setPageSize] = useState(20);
  const [pageNo, setPageNo] = useState(1);
  const [dataSource, setDataSource] = useState([]);
  const [nColumns, setColumns] = useState([]);
  const [expandDataSource, setExpandDataSource] = useState([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const logSource = [
    {
      label: 'zhu',
      content: '时刻劳动模范个十六开本时刻劳动模范个十六开本时刻劳动模范个十六开本',
      time: '2018.09.23'
    },
    {
      label: 'zhu',
      content: '时刻劳动模范个十六开本时刻劳动模范个十六开本时刻劳动模范个十六开本',
      time: '2018.09.23'
    }
  ];
  useEffect(() => {
    setLoading(true);
    setColumns([...columns.map((item) => {
      const keys = ['salesbill_no', 'amount_with_tax'];
      if (keys.includes(item.dataIndex)) {
        return {
          ...item,
          sorter: true,
          sortOrder: sortedInfo && keys.includes(sortedInfo.columnKey) && sortedInfo.order
        };
      }
      return item;
    })]);
    setTimeout(() => {
      setLoading(false);
      setDataSource([...getDataSource()]);
    }, 600);
  }, [sortedInfo]);

  const handleAdd = () => {
    setVisible(true);
  };
  useEffect(() => {
    const res = fields.map((field) => (filterParams.hasOwnProperty(field.code)
      ? {
        ...field,
        value: filterParams[field.code]
      }
      : field));
    setFieldSource(res);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleExport = () => {};

  const handleAddManual = (values) => {
    console.log(values);
    setLogVisible(true);
  };

  const onSearch = (values) => {
    console.log(values);
    setFilterParams(values);
    // setLoading(true);
    // setTimeout(() => {
    //   setLoading(false);
    // }, 1 * 1000);
    nodeRef.current.onresize();
  };

  const handleTabChange = (activeKey, filtrParams) => {
    setActiveKey(activeKey);
    console.log(filtrParams);
  };

  const handlePageChange = (pageNo, pageSize, filterParams) => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setPageNo(pageNo);
      setPageSize(pageSize);
      setDataSource([...getDataSource(pageNo, pageSize)]);
    }, 1000);
  };

  // const handleSubmit = (values) => {
  //   console.log('handleSubmit', values);
  // };

  const handleDownload = (values) => {
    console.log('handleDownload', values);
  };

  const handleCheckboxChange = (values) => {
    console.log(values);
    setSelectedRowKeys([...values]);
  };

  const onDragable = (values) => {
    setDataSource([...values]);
  };

  const onResizable = (values) => {
    console.log(values);
  };

  const onSortChange = (values) => {
    console.log(values);
  };

  const handleChange = ({ sorter }) => {
    console.log(sorter);
    setSortedInfo(sorter);
  };

  const handleExpand = (record) => {
    // console.log(record);
    // console.log(fetchData(10, record.id));
    setExpandDataSource([...fetchData(10, record.id)]);
  };

  const handleSelectAll = () => {
    setSelectedRowKeys([...dataSource.map((item) => ({
      id: item.id
    }))]);
  };
  const handleUnSelectAll = () => {
    setSelectedRowKeys([]);
  };

  const handleSearchChange = (value) => {
    console.log(value);
  };

  return (
    <div className="demo">
      <AuthcodeProvider authCodes={authCodes} authKey="resourceCode">
        <Page
          id="page"
          ref={nodeRef}
          loading={loading}
          // multipleable
          // allSelectable
          filterBeforeTab={false}
          filter={{
            // fields,
            fields: fieldSource,
            limit: 3,
            onSearch,
            onChange: handleSearchChange,
            id: 'filter',
            searchButtonsProps: {
              'ubt-data': JSON.stringify({
                bizType: 'search',
                bizData: 'xxxx'
              })
            },
            resetButtonsProps: {

            },
            extraAction: [
              {
                authcode: 'A01202001',
                label: '导出',
                loading: false,
                onClick: () => { setDemoVisible(true); }
              },
              {
                label: '新增',
                onClick: handleAdd
              },
              {
                authcode: 'A01202001',
                type: 'primary',
                label: '手工添加',
                loading: false,
                onClick: handleAddManual,
                'ubt-data': JSON.stringify({
                  bizType: 'insertOrder',
                  bizData: 'xxxx'
                })
              }
            ]
          }}
          tab={{
            activeKey,
            tabSource,
            id: 'tab',
            code: 'status',
            showCount: false,
            onChange: handleTabChange,
            extraAction: [
              {
                authcode: 'A01202009',
                label: '导出',
                onClick: handleExport
              },
              {
                label: '批量操作',
                onClick: handleExport
              },
              {
                value: 'AR',
                authcode: 'A01202001',
                type: 'primary',
                label: '手工添加',
                key: 'business_bill_type',
                onClick: handleAddManual
              }
            ]
          }}
          // renderContent={(<div className="">renderContent</div>)}
          table={{
            id: 'table',
            rowKey: 'id',
            dataSource: [],
            columns: nColumns,
            hideExpandIcon: true,
            expandRow: {
              rowKey: 'id',
              selectionable: false,
              expandRowByClick: false,
              // expandIcon: () => null,
              // onClick: handleExpand,
              onExpand: handleExpand,
              columns: expandColumns,
              getCheckboxProps: (record) => ({
                disabled: +record.id % 2 === 0
              }),
              dataSource: expandDataSource
            },
            dragable: false,
            onDragable,
            resizable: false,
            sortable: false,
            onChange: handleChange,
            onResizable,
            onSortChange,
            rowSelection: {
              fixed: 'left',
              // type: 'radio',
              selectedRowKeys,
              onChange: handleCheckboxChange
            }
          }}
          pagination={{
            // pagination: false,
            total,
            pageNo,
            pageSize: 1,
            id: 'pagination',
            showSizeChanger: false,
            extraContent: <div>extraContent</div>,
            onPageChange: handlePageChange
          }}
          footer={{
            id: 'footer',
            extraContent: (
              <>
                <Divider content="基本信息" />
                <Divider type="primary" content="基本信息" style={{ marginLeft: '10px' }} />
              </>
            ),
            extraAction: [
              {
                loading: false,
                authcode: '',
                label: '全选',
                onClick: handleSelectAll
              },
              {
                loading: false,
                authcode: '',
                label: '返选',
                onClick: handleUnSelectAll
              },
              {
                authcode: '',
                label: '下载',
                loading: true,
                type: 'primary',
                onClick: handleDownload
              }
            ]
          }}
        />
      </AuthcodeProvider>
      <Modal
        visible={visible}
        title="详情"
        width="80%"
        destroyOnClose
        footer={null}
        onCancel={() => {
          setVisible(false);
        }}
      >
        {/* <div style={{ height: '400px' }}> */}
        <Page
          height={400}
          layout="normal"
          loading={loading}
          filter={{
            fields,
            limit: 3,
            onSearch,
            searchButtonsProps: {
              'ubt-data': JSON.stringify({
                bizType: 'search',
                bizData: 'xxxx'
              })
            },
            resetButtonsProps: {

            }
            // extraAction: [
            //   {
            //     authcode: 'A01202001',
            //     label: '导出',
            //     loading: false,
            //     onClick: () => { setDemoVisible(true); }
            //   },
            //   {
            //     label: '新增',
            //     onClick: handleAdd
            //   },
            //   {
            //     authcode: 'A01202001',
            //     type: 'primary',
            //     label: '手工添加',
            //     loading: false,
            //     onClick: handleAddManual,
            //     'ubt-data': JSON.stringify({
            //       bizType: 'insertOrder',
            //       bizData: 'xxxx'
            //     })
            //   }
            // ]
          }}
            // multipleChecked
            // tab={{
            //   activeKey,
            //   tabSource,
            //   code: 'status',
            //   showCount: false,
            //   onChange: handleTabChange,
            //   extraAction: [
            //     {
            //       authcode: 'A01202009',
            //       label: '导出',
            //       onClick: handleExport
            //     },
            //     {
            //       label: '批量操作',
            //       onClick: handleExport
            //     },
            //     {
            //       value: 'AR',
            //       authcode: 'A01202001',
            //       type: 'primary',
            //       label: '手工添加',
            //       key: 'business_bill_type',
            //       onClick: handleAddManual
            //     }
            //   ]
            // }}
          table={{
            rowKey: 'id',
            dataSource,
            columns
          }}
            // pagination={{
            //   total,
            //   pageNo,
            //   pageSize,
            //   onPageChange: handlePageChange
            // }}
          footer={{
            extraContent: (
              <div>
                <Divider content="基本信息" />
                <Divider type="primary" content="基本信息" />
              </div>
            ),
            renderAction: (<>dfsf</>)
            // extraAction: [
            //   {
            //     loading: false,
            //     authcode: '',
            //     label: '提交',
            //     onClick: handleSubmit
            //   },
            //   {
            //     authcode: '',
            //     label: '下载',
            //     loading: true,
            //     type: 'primary',
            //     onClick: handleDownload
            //   }
            // ]
          }}
        />
        {/* </div> */}

      </Modal>
      <Modal
        visible={demoVisible}
        title="详情"
        width="80%"
        destroyOnClose
        footer={null}
        onCancel={() => {
          setDemoVisible(false);
        }}
      >
        <Spin size="large" indicator={<Progress />} spinning={false}>
          <Typography>
            <Item label="公司名称">上海云砺信息科技有限公司</Item>
            <Item label="公司编号">00001</Item>
            <Item label="公司性质"><div>csnfsnn</div></Item>
            <Item label="公司地址">上海市宝山区沪太路2999弄上海国际研发总部基地15号3层</Item>
            <Item label="邮编">200044</Item>
            <Item label="联系电话">021-12345678</Item>
            <Item label="公司地址">
              <p>
                上海市宝山区沪太路2999弄上海国际研发总部基地15号3层
                上海市宝山区沪太路2999弄上海国际研发总部基地15号3层
              </p>
            </Item>
          </Typography>
        </Spin>
      </Modal>
      <Modal
        visible={logVisible}
        title="日志"
        width="480px"
        destroyOnClose
        footer={null}
        onCancel={() => {
          setLogVisible(false);
        }}
      >
        <Timeline dataSource={logSource} mode="alternate" />
        <Timeline dataSource={logSource} />
      </Modal>
    </div>
  );
};
export default Demo;
