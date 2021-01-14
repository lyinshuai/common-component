import React, { useState, useEffect } from 'react';
import { Select, Icon } from 'antd';
import { local } from 'tmaito-utils';

const { Option } = Select;
const sellerList = local.get('seller_companys') || [];
const purchaserList = local.get('purchaser_companys') || [];

const Switch = (props) => {
  const { onChange, rightSwitchabled = true, ...otherProps } = props;
  const [values, setValues] = useState({
    sellerTaxNo: '',
    purchaserTenantId: ''
  });
  const { sellerTaxNo, purchaserTenantId } = values;
  useEffect(() => {
    const sellerTaxNo = local.get('sellerTaxNo');
    const purchaserTenantId = local.get('purchaserTenantId');
    setValues({
      sellerTaxNo,
      purchaserTenantId
    });
  }, []);

  const handleChange = (value, key) => {
    const params = {
      ...values,
      [key]: value
    };
    setValues({
      ...params
    });
    local.set(key, value);
    onChange && onChange(params, key);
  };

  return (
    <div className="tmaito-switch" {...otherProps}>
      <Select
        dropdownMatchSelectWidth={false}
        value={sellerTaxNo}
        style={{ width: 'auto', minWidth: 200 }}
        onChange={(value) => handleChange(value, 'sellerTaxNo')}
      >
        {sellerList.map((item, index) => (
          <Option value={item.taxNum} key={index}>
            {item.companyName}
          </Option>
        ))}
      </Select>
      <div className="align-center" style={{ width: '42px', display: 'inline-block' }}>
        <Icon type="arrow-right" />
      </div>
      {rightSwitchabled ? (
        <Select
          dropdownMatchSelectWidth={false}
          value={purchaserTenantId}
          style={{ width: 'auto', minWidth: 200 }}
          onChange={(value) => handleChange(value, 'purchaserTenantId')}
        >
          {purchaserList.map((item, index) => (
            <Option value={item.tenantId} key={index}>
              {item.tenantName}
            </Option>
          ))}
        </Select>
      ) : (
        <Select disabled value="" style={{ width: 'auto', minWidth: 120 }}>
          <Option value="">全部</Option>
        </Select>
      )}
    </div>
  );
};

export default Switch;
