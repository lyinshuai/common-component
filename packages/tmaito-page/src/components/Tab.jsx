import React from 'react';
import { Tabs } from 'antd';
import ExtraAction from './ExtraAction';
import classnames from 'classnames';

const { TabPane } = Tabs;

const TmaitoTab = (props) => {
  const {
    code,
    onChange,
    activeKey,
    showCount,
    tabSource,
    className,
    extraAction,
    extraActionProps,
    ...otherProps
  } = props;

  const handleTabChange = (activeKey) => {
    onChange(activeKey, { [code]: activeKey });
  };
  return (
    <Tabs
      {...otherProps}
      activeKey={activeKey}
      onChange={handleTabChange}
      className={classnames('tmaito-tab', className)}
      tabBarExtraContent={<ExtraAction type="link" limit={2} {...extraActionProps} data={extraAction} />}
    >
      {tabSource.map((item, index) => (
        <TabPane
          key={item.key}
          tab={item.render ? item.render(item, index) : (showCount ? `${item.label}(${item.count || 0})` : item.label)}
        />
      ))}
    </Tabs>
  );
};

TmaitoTab.defaultProps = {
  code: '',
  activeKey: '',
  showCount: false,
  tabSource: [],
  extraAction: [],
  onChange: () => { }
};

export default TmaitoTab;
