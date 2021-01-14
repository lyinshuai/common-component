/* eslint-disable no-console */
import React from 'react';
import Editor from '../src';
import { Form, Input, Button } from 'antd';
import './assets/less/index.less';


const { Item } = Form;
const Demo = (props) => {
  const { form } = props;
  const { getFieldDecorator, validateFields } = form;

  const handleSubmit = () => {
    validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log(values);
    });
  };

  return (
    <div className="demo">
      <Form>
        <Item label="标题">
          {getFieldDecorator('title', {
            rules: [{
              required: true,
              message: '请输入标题'
            }]
          })(
            <Input placeholder="请输入标题" />
          )}
        </Item>
        <Item label="正文">
          {getFieldDecorator('content', {
            rules: [{
              required: true,
              message: '请输入正文内容'
            }]
          })(
            <Editor placeholder="请输入正文内容" />
          )}
        </Item>
      </Form>
      <Button onClick={handleSubmit}>提交</Button>
    </div>
  );
};
export default Form.create()(Demo);
