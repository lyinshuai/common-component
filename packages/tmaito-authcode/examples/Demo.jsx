/* eslint-disable no-console */
import React from 'react';
import { AuthcodeProvider, Authcode } from '../src';
import { authCodes } from './constants';
import { Button } from 'antd';
import './assets/less/index.less';

const Demo = (props) => (
  <div className="demo">
    <AuthcodeProvider authCodes={authCodes} authKey="resourceCode">
      <Test />
    </AuthcodeProvider>
  </div>
);

const Test = (props) => (
  <>
    <Authcode authcode="A00101007">
      <Button>发票关联</Button>
    </Authcode>
    <Authcode authcode="">
      <Button>发票关联111</Button>
    </Authcode>
    {/* <Authcode authcode="A01202002">
      <Button>资源码111</Button>
    </Authcode>
    <Authcode authcode="A01200009">
      <Button>资源码2222</Button>
    </Authcode> */}
  </>
);
export default Demo;
