## Quick Start

Install

```sh
npm i tmaito-page
// or
yarn add tmaito-page
```

Use

```
import Page, { Divider, AuthCode, AuthCodeProvider, ExtraAction, Typography } form 'tmaito-page';

// style
@import 'tmaito-page/dist/index.css'
```

## API

#### Page

| 参数            | 说明                                      | 类型    | 默认值                |
| --------------- | ----------------------------------------- | ------- | --------------------- |
| mode            | 页面展示样式 ｜ string，可选值有 `normal` | ''      |
| loading         | 页面是否加载中 ｜ boolean                 | false   |
| className       | 类名 ｜ string                            | ''      |
| multipleChecked | 是否跨页勾选                              | boolean | false                 |
| filter          | 筛选区域                                  | boolean | [object](#filter)     | false |
| tab             | tab切换区域                               | boolean | [object](#tab)        | false |
| table           | 表格区域                                  | boolean | [object](#table)      | false |
| pagination      | 翻页&&全选区域                            | boolean | [object](#pagination) | false |
| footer          | 底部操作栏                                | boolean | [object](#footer)     | false |

### Divider
### AuthCodeProvider
### AuthCode
### ExtraAction
### Typography

#### filter

| 参数   | 说明       | 类型                  | 默认值 |
| ------ | ---------- | --------------------- | ------ |
| fields | 筛选项数组 | [object\[\]](#fields) | []     |
