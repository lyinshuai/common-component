/* eslint-disable no-console */
import React from 'react';
import { render } from 'react-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/lib/locale-provider/zh_CN';
import Demo from './Demo';

const App = (props) => (
  <ConfigProvider locale={zhCN}>
    <Demo />
  </ConfigProvider>
);

render(<App />, document.querySelector('#app'));
