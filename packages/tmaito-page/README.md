## Quick Start

Install

```sh
npm i tmaito-page
// or
yarn add tmaito-page
```

Use

```
import Page, { Switch, Divider, ExtraAction, Typography, Progress, Collapse, Timeline } form 'tmaito-page';

// style
@import 'tmaito-page/dist/index.css'
```

## API

#### Page

| 参数            | 说明                                          | 类型                                               | 默认值 |
| --------------- | --------------------------------------------- | -------------------------------------------------- | ------ |
| layout          | 页面展示样式，是否有边界间隙                  | string，可选值有 `normal`                          | -      |
| loading         | 页面是否加载中                                | boolean                                            | false  |
| width           | 宽度                                          | string\number                                      | 100%   |
| height          | 高度                                          | string\number                                      | 100%   |
| animated        | 高度变化时是否使用动画                        | boolean                                            | false  |
| className       | 类名                                          | string                                             | -      |
| allSelectable   | 是否全局选                                    | boolean                                            | false  |
| multipleable    | 是否跨页勾选                                  | boolean                                            | false  |
| filterBeforeTab | 筛选区域 and tab区域位置关系， 默认filter在前 | boolean                                            | true   |
| filter          | 筛选区域                                      | boolean                   \| [object](#filter)     | false  |
| tab             | tab切换区域                                   | boolean                   \| [object](#tab)        | false  |
| table           | 表格区域                                      | boolean                   \| [object](#table)      | false  |
| renderContent   | 自定义内容展示                                | string\|ReactNode                                  | null   |
| pagination      | 翻页&&全选区域                                | boolean                   \| [object](#pagination) | false  |
| footer          | 底部操作栏                                    | boolean                   \| [object](#footer)     | false  |

**提示**
> 供外部调用方法 `onresize` 重置Page高度计算

#### Collapse
伸缩框
| 参数     | 说明         | 类型             | 默认值 |
| -------- | ------------ | ---------------- | ------ |
| children | 展示内容     |                  | 无     |
| height   | 默认展示高度 | string \| number | 0      |
| onChange | 当前展示高度 | number           | 0      |

#### Switch
购销方租户切换

| 参数             | 说明             | 类型                     | 默认值 |
| ---------------- | ---------------- | ------------------------ | ------ |
| onChange         | 左右切换回调函数 | Function(values, key) {} | 无     |
| rightSwitchabled | 右侧是否禁止切换 | boolean                  | false  |

#### Divider

标题标注线

| 参数    | 说明                                                   | 类型              | 默认值  |
| ------- | ------------------------------------------------------ | ----------------- | ------- |
| content | 标题内容                                               | string\|ReactNode | 无      |
| type    | 样式，可选值 'primary'、'danger'、'warning'、'success' | string            | default |

### ExtraAction

扩展元素

| 参数  | 说明                           | 类型                       | 默认值 |
| ----- | ------------------------------ | -------------------------- | ------ |
| type  | Button 展示类型，可选值 `link` | string                     | -      |
| limit | 默认展示数量                   | number                     | 3      |
| data  | Button 操作集合                | [object\[\]](#extraaction) | []     |

data 数据事例如下：
```js
[{
  authcode: 'A01202001', // 资源码
  type: 'primary', // btn 类型
  label: '手工添加', // btn 文案
  loading: false, // loading
  onClick: handleAddManual, // 点击事件
  'ubt-data': JSON.stringify({ // 埋点扩展数据
    bizType: 'insertOrder',
    bizData: 'xxxx'
  }),
  render: () => {} // 复杂渲染函数
}]
```

### Typography

排版，监听页面宽度变化，动态调整单行展示列数
| 参数       | 说明                        | 类型   | 默认值     |
| ---------- | --------------------------- | ------ | ---------- |
| span       | 展示的列宽 同 antd Col 组件 | number | 6          |
| labelCol   | 同 antd Col 组件            | object | {span: 8}  |
| wrapperCol | 同 antd Col 组件            | object | {span: 16} |

> 更多参数可酌情参考 [antd Tabs](https://3x.ant.design/components/grid-cn/#Row)

> 分辨率 <= 1280 时，展示 3列
> 分辨率 <= 1680 时，展示 4列
> 分辨率 > 1680 时，展示 5 列

Typography.Item

| 参数       | 说明                                                     | 类型              | 默认值     |
| ---------- | -------------------------------------------------------- | ----------------- | ---------- |
| span       | 展示的列宽 同 antd Col 组件，未设置则默认为父组件 span值 | number            | 无         |
| label      | 标题                                                     | string\|ReactNode | 无         |
| children   | 内容                                                     | string\|ReactNode | 无         |
| labelCol   | 同 antd Col 组件                                         | object            | {span: 8}  |
| wrapperCol | 同 antd Col 组件                                         | object            | {span: 16} |

### Progress
基于 `antd Progress` 模拟进度条；
进度条规则：
> * 30 s 以内，进度条每1s + 3
> * 51 s 以内，进度条每3s + 1
> * 51 s 之后，进度条每30s + 1， 直至 100

#### Timeline
垂直展示的时间流信息。

| 参数       | 说明                                         | 类型        | 默认值 |
| ---------- | -------------------------------------------- | ----------- | ------ |
| mode       | 通过设置 mode 可以改变时间轴和内容的相对位置 | 'alternate' | -      |
| dataSource | 节点集合                                     | Array       | []     |

**说明：**
```js
  [{
    label: 'zhu',
    content: '时刻劳动模范个十六开本时刻劳动模范个十六开本时刻劳动模范个十六开本',
    time: '2018.09.23'
  }]
```


#### filter

| 参数               | 说明                                                                    | 类型                                                           | 默认值 |
| ------------------ | ----------------------------------------------------------------------- | -------------------------------------------------------------- | ------ |
| limit              | 默认展示筛选项的数量                                                    | number                                                         | 3      |
| gutter             | 同 [antd \<Row\> gutter](https://3x.ant.design/components/grid-cn/#Row) | number/object/array                                            | 16     |
| fields             | 筛选项数组                                                              | [object\[\]](#fields)                                          | []     |
| extraAction        | 右侧 btn 区域额外的元素                                                 | [object\[\]](#extraaction) data 属性                           | []     |
| onChange           | 操作筛选项时实时变化参数                                                | Function(key, values) {}                                       | 无     |
| onSearch           | 查询 or 重置时，回调筛选项参数                                          | Function(values) {}                                            | 无     |
| resetButtonsProps  | reset 按钮 props                                                        | [ButtonProps](https://3x.ant.design/components/button-cn/#API) | 无     |
| searchButtonsProps | search 按钮 props                                                       | [ButtonProps](https://3x.ant.design/components/button-cn/#API) | 无     |

### fields

| 参数        | 说明                           | 类型                       | 默认值    |
| ----------- | ------------------------------ | -------------------------- | --------- |
| type        | 筛选项类型                     | string                     | input     |
| label       | label 标签的文本               | string                     | ReactNode | 无 |
| code        | 筛选项字段                     | string                     | 无        |
| authcode    | 资源码                         | string                     | 无        |
| value       | 筛选项值                       | string\|string\[\]\|number | number[]  | 无 |
| options     | type 为 select时生效，下拉选项 | [object\[\]](#options)     | 无        |
| placeholder | 提示信息                       | string                     | 无        |
| format      | 日期格式                       | string                     | 无        |
| colSpan     | 筛选项占整行的栅格占位格数     | number                     | 5         |
| itemLayout  | 筛选项布局                     | object                     |           |

itemLayout 使用方式：
```js
  itemLayout: {
    labelCol: {
      span: 6 // 默认值
    },
    wrapperCol: {
      span: 18 // 默认值
    }
  }
```

#### options

下拉选项
| 参数     | 说明       | 类型           | 默认值 |
| -------- | ---------- | -------------- | ------ |
| label    | 标签的文本 | string         | -      |
| value    | 属性值     | string\|number | -      |
| disabled | 是否禁用   | boolean        | false  |


**type 可选值如下:**
> * input: 输入框
> * select: 下拉列表
> * checkbox: 复选框
> * radio: 单选框
> * range: 输入框范围 number 类型
> * rangeInput: 输入框范围
> * datePicker: 日期，默认 'YYYY-MM-DD'
> * rangePicker: 日期范围，默认 'YYYY-MM-DD'
> * monthPicker: 月份，默认 'YYYY-MM'

**注意：**
`datePicker`、`rangePicker`、`monthPicker` 筛选项，
> 若设置 format，则展示格式遵循 format 格式
> 若设置 vformat，则返回值格式遵循 vformat 格式， 默认返回时间戳格式

#### tab

标签页

| 参数        | 说明                       | 类型                                 | 默认值 |
| ----------- | -------------------------- | ------------------------------------ | ------ |
| code        | tab 组件对应的接口属性字段 | string                               | 无     |
| activeKey   | 当前激活 tab 面板的 key    | string                               | 无     |
| showCount   | 是否展示统计数             | boolean                              | false  |
| tabSource   | TabBar 的集合              | [object\[\]](#tabsource)             | []     |
| onChange    | 切换面板的回调             | Function(activeKey) {}               | 无     |
| extraAction | tab bar 上额外的元素       | [object\[\]](#extraaction) data 属性 | []     |

**提示**
> 除以上参数，其他参数可酌情参考 [antd Tabs](https://3x.ant.design/components/tabs-cn/#Tabs)

#### tabSource

| 参数   | 说明                                               | 类型                       | 默认值 |
| ------ | -------------------------------------------------- | -------------------------- | ------ |
| key    | 对应 activeKey                                     | string                     | 无     |
| count  | 选项卡头显示统计数量, `showCount` 为 `true` 时生效 | string\|number             | 0      |
| label  | 选项卡头显示文字                                   | string\|ReactNode          | 无     |
| render | 替换 TabBar，用于二次封装单个标签头                | Function(record, index) {} | 无     |

#### table

| 参数           | 说明                                                                                                 | 类型                 | 默认值 |
| -------------- | ---------------------------------------------------------------------------------------------------- | -------------------- | ------ |
| mode           | 两种列表展示模式，`antd-table` or `virtual-table`，列表数量大时可选择`virtual`模式，可选值 'virtual' | string               | -      |
| rowKey         | 表格行 key 的取值                                                                                    | string               | 'key'  |
| columns        | 表格列属性                                                                                           | Array                | []     |
| dataSource     | 当前页表格数据源                                                                                     | Array                | []     |
| dragable       | 列表项是否可拖拽排序                                                                                 | Boolean              | false  |
| sortable       | 表头是否可重新排序                                                                                   | Boolean              | false  |
| resizable      | 表头是否可拖拽调整列宽，需要与column.width配合使用                                                   | Boolean              | false  |
| onDragable     | 列表项拖拽事件，返回排序后的数据源                                                                   | Function(dataSource) | -      |
| onResizable    | 表头拖拽调整列宽事件，返回调整后的列表属性                                                           | Function(columns)    | -      |
| onSortChange   | 表头列表调整顺序，返回调整后的列表顺序                                                               | Function(columns)    | -      |
| rowSelection   | 表格行是否可选择， [配置项参考 antd](https://3x.ant.design/components/table-cn/#rowSelection)        | object               | null   |
| hideExpandIcon | 额外的展开行图标是否展示                                                                             | boolean              | true   |
| expandRow      | 额外的展开行相关属性                                                                                 | [object](#expandrow) | null   |

**提示：**
> 若含有额外的展开行操作，则父table内所有列属性的fixed失效
> table 中 rowSelection 属性的 selectedRowKeys 格式为:
```js
[
  {
    id: 'xxx', // 表格行 rowKey 的取值, 必须字段
    record: {...record}, // 勾选行属性
    selectedRowKeys: [], // 子表格选中字段 key 集合
    selectedList: [], // 子表格选中行集合
    unselectedList: [], // 子表格未选中行集合
    unselectedRowKeys: [] // 子表格未选中的字段 key 集合
  }
]
```

#### pagination

翻页相关属性

| 参数            | 说明                           | 类型                       | 默认值                     |
| --------------- | ------------------------------ | -------------------------- | -------------------------- |
| total           | 数据总数                       | number                     | 0 ｜                       |
| pageNo          | 当前页数                       | number                     | 1 ｜                       |
| pageSize        | 每页条数                       | number                     | 20                         |  |
| pagination      | 是否展示翻页组件               | boolean                    | true                       |  |
| showTotal       | 用于显示数据总量和当前数据顺序 | Function(total, range)     |                            |
| extraContent    | 额外的元素，居左展示           | React.ReactNode            | 无                         |
| onPageChange    | pageNo, pageSize 改变的回调    | Function(pageNo, pageSize) |                            |
| pageSizeOptions | 指定每页可以显示多少条         | string[]                   | ['20', '50', '100', '200'] |

**提示**
> 除以上参数以及 `size` 等，其他参数可酌情参考 [antd pagination](https://3x.ant.design/components/pagination-cn/#API)

#### footer

底部操作栏相关属性

| 参数         | 说明                                                                  | 类型                                 | 默认值     |
| ------------ | --------------------------------------------------------------------- | ------------------------------------ | ---------- |
| extraContent | 额外的展示元素，居左展示                                              | React.ReactNode                      | 无         |
| extraAction  | 额外的操作元素，居右展示                                              | [object\[\]](#extraaction) data 属性 | []         |
| labelCol     | 同 [antd \<Col\>](https://3x.ant.design/components/grid-cn/#Col) 组件 | object                               | {span: 12} |
| wrapperCol   | 同 [antd \<Col\>](https://3x.ant.design/components/grid-cn/#Col) 组件 | object                               | {span: 12} |


#### expandRow

额外的展开行相关属性

| 参数                  | 说明                                                                   | 类型             | 默认值 |
| --------------------- | ---------------------------------------------------------------------- | ---------------- | ------ |
| expandIcon            | 参照 [antd](https://3x.ant.design/components/table-cn/#Table) 相关属性 |                  |        |
| expandRowByClick      | 参照 [antd](https://3x.ant.design/components/table-cn/#Table) 相关属性 |                  |        |
| expandIconColumnIndex | 参照 [antd](https://3x.ant.design/components/table-cn/#Table) 相关属性 |                  |        |
| onClick               | 单击行展开事件                                                         | Function(record) | -      |
| onDoubleClick         | 双击行展开事件                                                         | Function(record) | -      |
| onDoubleClick         | 双击行展开事件                                                         | Function(record) | -      |
| loading               | 页面是否加载中                                                         | boolean          | false  |
| rowKey                | 表格行 key 的取值                                                      | string           | 'key'  |
| columns               | 表格列属性                                                             | Array            | []     |
| dataSource            | 当前页表格数据源                                                       | Array            | []     |
| selectionable         | 是否可勾选                                                             | Boolean          | false  |
| getCheckboxProps      | 选择框的默认属性配置                                                   | Function(record) | -      |
