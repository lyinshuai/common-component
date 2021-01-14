import React from 'react';

export const fields = [{
  type: 'select',
  label: '结算单类型',
  code: 'business_bill_type',
  placeholder: '请选择结算单类型',
  options: [{
    label: '全部',
    value: ''
  },
  {
    label: 'AR结算单',
    value: 'AR'
  },
  {
    label: 'AP结算单',
    value: 'AP'
  }
  ]
},
// {
//   type: 'checkbox',
//   label: '打印状态',
//   code: 'printStatus',
//   options: [
//     {
//       label: '已打印',
//       value: '1'
//     },
//     {
//       label: '部分打印',
//       value: '2'
//     },
//     {
//       label: '未打印',
//       value: '0'
//     }
//   ]
// },
// {
//   type: 'radio',
//   label: '来源',
//   code: 'origin',
//   options: [
//     {
//       label: 'AR结算单',
//       value: 'AR'
//     },
//     {
//       label: 'AP结算单',
//       value: 'AP'
//     }
//   ]
// },
// {
//   type: 'input',
//   label: '结算单号',
//   code: 'salesbill_no',
//   placeholder: '请输入结算单号'
// },
// {
//   type: 'input',
//   label: '单据类型',
//   code: 'salesbill_type',
//   placeholder: '请输入单据类型'
// },
// {
//   type: 'input',
//   label: '发票号码',
//   code: 'invoiceNo',
//   placeholder: '请输入发票号码'
// },
// {
//   type: 'range',
//   label: '含税金额',
//   code: 'amountWithTax'
//   // colSpan: 6,
//   // itemLayout: {
//   //   labelCol: {
//   //     span: 6
//   //   },
//   //   wrapperCol: {
//   //     span: 18
//   //   }
//   // }
// },
{
  type: 'datePicker',
  label: '导入日期',
  code: 'create_time',
  showTime: true,
  vformat: 'YYYY-MM-DD HH:mm:ss',
  colSpan: 6
},
{
  type: 'rangePicker',
  label: '导入日期',
  code: 'create_time1',
  vformat: 'YYYY-MM-DD HH:mm:ss',
  colSpan: 6
}
];

export const tabSource = [{
  label: '待对账',
  key: '1'
},
{
  label: '对账中',
  key: '2'
},
{
  label: '已对账',
  key: '3',
  render: (record) => (
    <span className="error">
      {' '}
      {
      record.label
    }
      {' '}

    </span>
  )
}
];

export const authCodes = [{
  resourceCode: 'A01202001',
  resouceApiUrls: []
},
{
  resourceCode: 'A01202002',
  resouceApiUrls: []
},
{
  resourceCode: 'A01200000',
  resouceApiUrls: []
},
{
  resourceCode: 'A01200001',
  resouceApiUrls: []
}
];
