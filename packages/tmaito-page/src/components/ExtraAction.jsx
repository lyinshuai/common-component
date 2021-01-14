import React, { useState, useContext } from 'react';
import { Button, Popover } from 'antd';
import classnames from 'classnames';
import { AuthcodeContext, Authcode } from 'tmaito-authcode';

const ExtraAction = (props) => {
  const {
    data, type, limit, onExtraAction, ...otherProps
  } = props;
  const [visible, setVisible] = useState(false);
  const { authCodes } = useContext(AuthcodeContext);
  const handleExtraAction = (item) => {
    const { onClick } = item;
    setVisible(false);
    if (onExtraAction) {
      onExtraAction(item);
    } else {
      onClick && onClick(item);
    }
  };

  const handleDropdownVisibleChange = (visible) => {
    setVisible(visible);
  };

  const extraContent = (source, isMore) => source.map((item, index) => {
    const buttonProps = {
      ...item
    };
    if (item.authcode) {
      buttonProps['ubt-click'] = item.authcode;
    }
    return (
      <Authcode key={index} authcode={item.authcode || ''}>
        {(item.render && item.render()) || (
          <Button
            {...buttonProps}
            size={type ? 'small' : 'default'}
            type={type || item.type || (isMore ? '' : type)}
            onClick={() => handleExtraAction(item)}
          >
            {item.label}
          </Button>
        ) }
      </Authcode>
    );
  });

  const handlePopoverClick = (e) => {
    e && e.stopPropagation();
  };
  const initExtraAction = () => {
    const list = data.filter((item) => (item.authcode ? authCodes.includes(item.authcode) : true));
    const normalList = list.slice(0, limit);
    const moreList = list.slice(limit);
    return (
      <div
        className="tmaito-extra-action" onClick={handlePopoverClick}
        {...otherProps}
      >
        {extraContent(normalList, false)}
        {moreList.length > 0 && (
          <Popover
            trigger="click"
            placement="bottomRight"
            visible={visible}
            overlayClassName="tmaito-page__popover-extra"
            onVisibleChange={handleDropdownVisibleChange}
            content={extraContent(moreList, true)}
          >
            <Button type={type} size={type ? 'small' : 'default'}>
              更多
              {type ? '' : '操作'}
              <i
                className={classnames('arrow-icon', {
                  'is-dropdown': visible
                })}
              />
            </Button>
          </Popover>
        )}
      </div>
    );
  };
  return initExtraAction();
};

ExtraAction.defaultProps = {
  data: [],
  limit: 3,
  type: ''
};

export default ExtraAction;
