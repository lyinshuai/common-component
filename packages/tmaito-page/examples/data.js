/* eslint-disable no-console */
import React from 'react';
import Mock from 'mockjs';
import {
  Tooltip,
  Button,
  Popover
} from 'antd';
import {
  formatTime,
  toThousands
} from 'tmaito-utils';
import {
  ExtraAction
} from '../src';

const {
  Random
} = Mock;
const total = 100;

const handleExport = (items) => {
  console.log(items);
};

const columns = [{
  title: '结算单号',
  width: 180,
  align: 'center',
  // fixed: 'left',
  dataIndex: 'salesbill_no'
},
{
  title: '含税总金额',
  width: 120,
  align: 'right',
  dataIndex: 'amount_with_tax',
  render: (text) => toThousands(text)
},
{
  title: '不含税总金额',
  width: 120,
  align: 'right',
  dataIndex: 'amount_without_tax',
  render: (text) => toThousands(text)
},
{
  title: '总税额',
  width: 120,
  align: 'right',
  dataIndex: 'tax_amount',
  render: (text) => toThousands(text)
},
{
  title: '购方名称',
  width: 240,
  dataIndex: 'purchaser_name'
},
{
  title: '销方名称',
  width: 240,
  dataIndex: 'seller_name'
},
{
  title: '创建日期',
  width: 120,
  align: 'center',
  dataIndex: 'create_time',
  render: (text) => formatTime(text, 'YYYY-MM-DD')
},
{
  title: '结算单类型',
  width: 120,
  align: 'center',
  dataIndex: 'salesbill_type',
  render: (text) => `${text}结算单`
},
{
  title: '操作',
  width: 200,
  // fixed: 'right',
  dataIndex: 'action',
  render: (text, record) => (
    <ExtraAction
      type="link"
      data={
        [{
          authcode: 'A01202001',
          label: '手工添加',
          // type: 'danger',
          onClick: handleExport
        },
        // {
        //   authcode: 'A01202001',
        //   render: () => (
        //     <Popover
        //       title="Popover"
        //       content="PopoverPopoverPopoverPopover"
        //     >
        //       <Button type="link">
        //         获取激活码
        //       </Button>
        //     </Popover>
        //   )
        // },
        // {
        //   authcode: 'A01202001',
        //   render: () => (
        //     <Tooltip title="启用中的终端不允许修改">
        //       <span>
        //         修x改
        //       </span>
        //     </Tooltip>
        //   )
        // }
        {
          authcode: 'A01202001',
          label: '删除',
          onClick: handleExport
        },
        {
          authcode: 'A01202001',
          label: '删除',
          onClick: handleExport
        },
        {
          authcode: 'A01202001',
          label: '删除',
          onClick: handleExport
        }
          // {
          //   authcode: 'A01202001',
          //   label: '删除',
          //   loading: true,
          //   onClick: handleExport
          // }
        ]
      }
    />
  )
}
];

export const expandColumns = [{
  title: '结算单号',
  width: 260,
  align: 'center',
  dataIndex: 'salesbill_no'
},
{
  title: '含税总金额',
  width: 160,
  align: 'right',
  dataIndex: 'amount_with_tax',
  render: (text) => toThousands(text)
},
{
  title: '不含税总金额',
  width: 160,
  align: 'right',
  dataIndex: 'amount_without_tax',
  render: (text) => toThousands(text)
},
{
  title: '总税额',
  width: 160,
  align: 'right',
  dataIndex: 'tax_amount',
  render: (text) => toThousands(text)
},
{
  title: '购方名称',
  width: 300,
  dataIndex: 'purchaser_name'
},
{
  title: '销方名称',
  width: 300,
  dataIndex: 'seller_name'
},
{
  title: '创建日期',
  width: 120,
  align: 'center',
  dataIndex: 'create_time',
  render: (text) => formatTime(text, 'YYYY-MM-DD')
},
{
  title: '结算单类型',
  width: 160,
  align: 'center',
  dataIndex: 'salesbill_type',
  render: (text) => `${text}结算单`
}
];

export const fetchData = (total, id = 100) => {
  const dataSource = [];
  for (let i = 0; i < total; i++) {
    const row = columns.reduce((data, col) => {
      switch (col.dataIndex) {
        case 'salesbill_no':
          data[col.dataIndex] = Random.id();
          break;
        case 'tax_amount':
        case 'amount_with_tax':
        case 'amount_without_tax':
          data[col.dataIndex] = Random.integer(0, 10000);
          break;
        case 'purchaser_name':
        case 'seller_name':
          data[col.dataIndex] = Random.title();
          break;
        case 'create_time':
          data[col.dataIndex] = Random.datetime('yyyyMMddHHmmss');
          break;
        case 'salesbill_type':
          data[col.dataIndex] = Random.pick(['AP', 'AR']);
          break;
        case 'action':
          break;
        default:
          data[col.dataIndex] = Random.title();
          break;
      }
      return {
        // id: Random.id(),
        id: `${id + i}`,
        ...data
      };
    }, {});
    dataSource.push(row);
  }
  return dataSource;
};

const dataSource = fetchData(total);
// export const expandDataSource = fetchData(10);
const getDataSource = (pageNo = 1, pageSize = 20) => dataSource.slice((pageNo - 1) * pageSize, pageNo * pageSize);

export {
  columns,
  total,
  getDataSource
};
