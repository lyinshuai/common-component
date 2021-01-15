/* eslint-disable no-console */
import React from 'react';
import Print from '../src';
import { Form, Input, Button } from 'antd';
import './assets/less/index.less';


const print = new Print();
class Pages extends React.Component {
  constructor(props) {
    super(props);
  }

  onClick = () => {
    print.output({
      printNode: document.querySelector('#printContent'), // 打印区域（Element）
      rootNode: document.querySelector('.invoice-print') // 打印根节点（Element）无参数根节点为body
    });
  };

  render() {
    return (
      <div id="printContent">
        <div id="print-test">
          <div className="invoice-print">
            <div onClick={this.onClick} id="print">
              <p>Some contents...</p>
              <p>Some contents...结束</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Pages;
