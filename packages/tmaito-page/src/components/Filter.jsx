import React, {
  forwardRef, useState, useEffect, useContext
} from 'react';
import {
  Form,
  Row,
  Col,
  Input,
  Cascader,
  InputNumber,
  Select,
  Checkbox,
  DatePicker,
  Radio,
  Button,
  Badge
} from 'antd';
import classnames from 'classnames';
import moment from 'moment';
import { sum } from 'tmaito-utils';
import { AuthcodeContext } from 'tmaito-authcode';
import ExtraAction from './ExtraAction';

const { Item } = Form;
const { TextArea } = Input;
const { Option } = Select;
const { MonthPicker, RangePicker } = DatePicker;
const formItemLayout = {
  labelCol: {
    span: 8
  },
  wrapperCol: {
    span: 16
  }
};
const COL_SPAN = 5;

const TmaitoFilter = (props) => {
  const {
    form,
    limit,
    fields,
    gutter,
    onSearch,
    onChange,
    extraAction,
    extraActionProps,
    resetButtonsProps,
    searchButtonsProps,
    ...otherProps
  } = props;
  const { validateFields, getFieldDecorator, resetFields } = form;
  const [isMore, setMore] = useState(false);
  const { authCodes } = useContext(AuthcodeContext);
  const [isMoreFilter, setMoreFilter] = useState(false);
  const [moreFields, setMoreField] = useState([]);
  const [normalFields, setNormalField] = useState([]);
  useEffect(() => {
    const list = fields.filter((item) => (item.authcode ? authCodes.includes(item.authcode) : true));
    setNormalField(list.slice(0, limit));
    setMoreField(list.slice(limit));
  }, [limit, fields, authCodes]);

  const disabledDate = (current) => current && current > moment().endOf('day');

  const handleMore = () => {
    setMore(!isMore);
  };

  const resetValues = (values) => {
    const params = {};
    for (const key in values) {
      if (['boolean', 'number', 'string', 'object'].includes(typeof values[key])) {
        const { type = '', vformat = '' } = fields.find((item) => item.code === key) || {};
        if (['datePicker', 'rangePicker', 'monthPicker'].includes(type)) {
          if (type === 'rangePicker') {
            const value = values[key];
            params[key] = vformat
              ? value.map((time) => time.format(vformat))
              : [
                new Date(value[0]).setHours(0, 0, 0, 1),
                new Date(value[1]).setHours(23, 59, 59, 999)
              ];
          } else {
            params[key] = vformat ? values[key].format(vformat) : +values[key];
          }
        } else {
          params[key] = values[key];
        }
      }
    }
    return params;
  };

  const handleSearch = () => {
    validateFields((err, values) => {
      if (err) return;
      setMoreFilter(moreFields.some((field) => !!values[field.code]));
      setMore(false);
      onSearch && onSearch(resetValues(values));
    });
  };

  const handleReset = () => {
    resetFields();
    validateFields((err, values) => {
      if (err) return;
      setMoreFilter(false);
      setMore(false);
      onSearch && onSearch(resetValues(values));
    });
  };

  const handleFilterChange = async (key, value) => {
    validateFields((err, values) => {
      if (err) return;
      values[key] = value;
      onChange && onChange(key, resetValues(values));
    });
  };

  const renderItem = (field) => {
    const {
      code,
      label,
      value = undefined,
      colSpan = COL_SPAN,
      options = [],
      type = 'input',
      itemLayout = {},
      ...otherProps
    } = field;
    let node = null;

    if (type === 'datePicker') {
      const { format = 'YYYY-MM-DD' } = otherProps;
      node = getFieldDecorator(code, {
        initialValue: value && moment(value, format)
      })(
        <DatePicker
          allowClear={false}
          onChange={(value) => handleFilterChange(code, value)}
          disabledDate={disabledDate}
          {...otherProps}
        />
      );
    }

    if (type === 'rangePicker') {
      const { format = 'YYYY-MM-DD' } = otherProps;
      node = getFieldDecorator(code, {
        initialValue: value && value.length && [moment(value[0], format), moment(value[1], format)]
      })(
        <RangePicker
          allowClear={false}
          onChange={(value) => handleFilterChange(code, value)}
          disabledDate={disabledDate}
          {...otherProps}
        />
      );
    }

    if (type === 'monthPicker') {
      const { format = 'YYYY-MM' } = otherProps;
      node = getFieldDecorator(code, {
        initialValue: value && moment(value, format)
      })(
        <MonthPicker
          allowClear={false}
          onChange={(value) => handleFilterChange(code, value)}
          disabledDate={disabledDate}
          {...otherProps}
        />
      );
    }

    if (type === 'range' || type === 'rangeInput') {
      node = getFieldDecorator(code, {
        initialValue: value
      })(
        <RangeInput
          type={type === 'range'}
          onChange={(value) => handleFilterChange(code, value)}
        />
      );
    }

    if (type === 'select') {
      node = getFieldDecorator(code, {
        initialValue: value
      })(
        <Select
          {...otherProps}
          onChange={(value) => handleFilterChange(code, value)}
        >
          {options.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      );
    }

    if (type === 'selectSearch') {
      node = getFieldDecorator(code, {
        initialValue: value
      })(
        <Select
          {...otherProps}
          onSearch
          onChange={(value) => handleFilterChange(code, value)}
        >
          {options.map((option) => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      );
    }

    if (type === 'checkbox') {
      node = getFieldDecorator(code, {
        initialValue: value
      })(
        <Checkbox.Group
          {...otherProps}
          onChange={(value) => handleFilterChange(code, value)}
        >
          {options.map((option) => (
            <Checkbox key={option.value} value={option.value}>
              {option.label}
            </Checkbox>
          ))}
        </Checkbox.Group>
      );
    }

    if (type === 'radio') {
      node = getFieldDecorator(code, {
        initialValue: value
      })(
        <Radio.Group
          {...otherProps}
          onChange={(e) => handleFilterChange(code, e.target.value)}
        >
          {options.map((option) => (
            <Radio key={option.value} value={option.value}>
              {option.label}
            </Radio>
          ))}
        </Radio.Group>
      );
    }

    if (type === 'cascader') {
      node = getFieldDecorator(code, {
        initialValue: value
      })(
        <Cascader
          onChange={(value) => handleFilterChange(code, value)}
          {...otherProps}
        />
      );
    }

    if (type === 'input') {
      node = getFieldDecorator(code, {
        initialValue: value
      })(
        <Input
          onChange={(e) => handleFilterChange(code, e.target.value)}
          {...otherProps}
        />
      );
    }

    if (type === 'textArea') {
      node = getFieldDecorator(code, {
        initialValue: value
      })(
        <TextArea
          onChange={(e) => handleFilterChange(code, e.target.value)}
          {...otherProps}
        />
      );
    }

    return (
      <Col className="field-item" span={colSpan} key={field.code}>
        <Item label={label} {...formItemLayout} {...itemLayout}>
          {node}
        </Item>
      </Col>
    );
  };

  const handleExtration = (item) => {
    const { onClick } = item;
    validateFields((err, values) => {
      if (err) return;
      onClick && onClick(resetValues(values), item);
    });
  };

  return (
    <Form className="tmaito-filter" {...otherProps}>
      <Row gutter={gutter}>
        {normalFields.map((field) => renderItem(field))}
        <Col
          span={24 - sum(normalFields, 'colSpan', COL_SPAN)}
          className="tmaito-filter__action"
        >
          <Item>
            {!!moreFields.length && (
              <Button
                className="tmaito-filter__action-more"
                type="link"
                onClick={handleMore}
              >
                更多
                <Badge dot={isMoreFilter}>
                  <i
                    className={classnames('arrow-icon arrow-icon--primary', {
                      'is-dropdown': isMore
                    })}
                  />
                </Badge>
              </Button>
            )}
            {!!fields.length && (
              <>
                <Button onClick={handleReset} {...resetButtonsProps}>
                  重置
                </Button>
                <Button type="primary" onClick={handleSearch} {...searchButtonsProps}>
                  查询
                </Button>
              </>
            )}
            {extraAction.length > 0 && (
            <ExtraAction
              limit={1}
              {...extraActionProps}
              data={extraAction}
              onExtraAction={handleExtration}
            />
            )}
          </Item>
        </Col>
      </Row>
      <div
        className={classnames('tmaito-filter__more-fields', {
          'is-hidden': !isMore
        })}
      >
        <Row gutter={gutter}>{moreFields.map((field) => renderItem(field))}</Row>
      </div>
    </Form>
  );
};

const RangeInput = forwardRef(({
  type = true, value = [], onChange
}, ref) => {
  const handleChange = (v, index) => {
    if (onChange) {
      value[index] = v;
      onChange([...value]);
    }
  };
  return (
    <div className="tmaito-filter-ranger">
      <InputNode
        index={0}
        type={type}
        value={value[0]}
        placeholder="请输入"
        onChange={handleChange}
      />
      <span className="tmaito-filter-ranger__space">~</span>
      <InputNode
        index={1}
        type={type}
        value={value[1]}
        placeholder="请输入"
        onChange={handleChange}
      />
    </div>
  );
});

const InputNode = ({
  type = true, value, index, onChange
}) => (type ? (
  <InputNumber
    value={value}
    placeholder="请输入"
    onChange={(e) => onChange(e, index)}
  />
) : (
  <Input
    onChange={(e) => onChange(e.target.value, index)}
    value={value}
    placeholder="请输入"
  />
));

TmaitoFilter.defaultProps = {
  limit: 3,
  gutter: 16,
  fields: [],
  extraAction: [],
  onSearch: () => { },
  onChange: () => { }
};

export default Form.create()(TmaitoFilter);
