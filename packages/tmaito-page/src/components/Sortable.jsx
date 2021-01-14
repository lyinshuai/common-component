import React from 'react';
import { SortableElement, SortableContainer } from 'react-sortable-hoc';
import arrayMove from 'array-move';
import { Checkbox, Icon } from 'antd';
import classnames from 'classnames';

const { Group } = Checkbox;
const Sortable = (props) => {
  const { axis = 'xy', data, onSortChange } = props;
  const handleSortEnd = ({ oldIndex, newIndex }) => {
    onSortChange && onSortChange(arrayMove(data, oldIndex, newIndex));
  };

  return (
    <SortableList
      distance={10}
      layout={axis}
      onSortEnd={handleSortEnd}
      {...props}
    />
  );
};

const SortableList = SortableContainer((props) => {
  const {
    data,
    values,
    layout,
    disabled,
    className,
    showIndex,
    onCheckChange,
    ...otherProps
  } = props;
  const handleChange = (items) => {
    const filterItems = data.filter((item) => items.includes(item.dataIndex));
    onCheckChange && onCheckChange(items, filterItems);
  };
  return (
    <div
      className={classnames('tmaito-sortable', className, {
        'tmaito-sortable__inline': layout === 'xy'
      })}
    >
      <Group value={values} onChange={handleChange}>
        {data.map((item, index) => {
          if (disabled) {
            return (
              <div
                key={item.dataIndex}
                className="tmaito-sortable__item-disabled"
              >
                {showIndex && (
                  <span className="tmaito-sortable__item-index">
                    {`${index + 1}. `}
                  </span>
                )}
                {item.title}
              </div>
            );
          }
          return (
            <SortableItem
              key={item.dataIndex}
              showIndex={showIndex}
              index={index}
              no={index + 1}
              data={item}
              {...otherProps}
            />
          );
        })}
      </Group>
    </div>
  );
});

const SortableItem = SortableElement((props) => {
  const {
    removeable, showIndex, checkable, onRemove, no, data
  } = props;

  return (
    <div className="tmaito-sortable__item">
      <div
        className={classnames('tmaito-sortable__item-inner', {
          removeable
        })}
      >
        {showIndex && (
          <span className="tmaito-sort__item-inner-index">{`${no}. `}</span>
        )}
        {checkable && <Checkbox value={data.dataIndex}>{data.title}</Checkbox>}
        {removeable && (
          <span
            className="tmaito-sortable__item-close"
            onClick={() => {
              onRemove(data);
            }}
          >
            <Icon type="close" />
          </span>
        )}
      </div>
      <div className="tmaito-sortable__item-icon">
        <Icon type="unordered-list" />
      </div>
    </div>
  );
});

Sortable.defaultProps = {
  data: [],
  axis: 'xy',
  showIndex: true
};

export default Sortable;
