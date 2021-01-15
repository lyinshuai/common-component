import React from 'react';
import {
  SortableContainer,
  SortableElement,
  arrayMove
} from 'react-sortable-hoc';
import { Checkbox, Icon } from 'antd';
// import themeStyleGenerator from 'tmaito-themes';
// import styleTemplate from './themes/styleTemplate';
import SortedColsFilter from './styled/SortedColsFilter';
import DraggableCol from './styled/DraggableCol';
import DragIcon from './styled/DragIcon';
import classNames from 'classnames';

// themeStyleGenerator(styleTemplate, 'sorted-cols-filter');

const MoveIcon = () => (
  <DragIcon>
    <svg width="1em" height="1em" viewBox="0 0 16 16">
      <g id="surface5">
        <path
          d="M 5 4.003906 C 5 3.449219 5.449219 3 6.003906 3 C 6.558594 3 7.007812 3.449219 7.007812 4.003906 C 7.007812 4.558594 6.558594 5.007812 6.003906 5.007812 C 5.449219 5.007812 5 4.558594 5 4.003906 Z M 5 8.25 C 5 7.695312 5.449219 7.246094 6.003906 7.246094 C 6.558594 7.246094 7.007812 7.695312 7.007812 8.25 C 7.007812 8.804688 6.558594 9.253906 6.003906 9.253906 C 5.449219 9.253906 5 8.804688 5 8.25 Z M 5 12.496094 C 5 11.941406 5.449219 11.492188 6.003906 11.492188 C 6.558594 11.492188 7.007812 11.941406 7.007812 12.496094 C 7.007812 13.050781 6.558594 13.5 6.003906 13.5 C 5.449219 13.5 5 13.050781 5 12.496094 Z M 9.554688 4.003906 C 9.554688 3.449219 10.003906 3 10.558594 3 C 11.113281 3 11.5625 3.449219 11.5625 4.003906 C 11.5625 4.558594 11.113281 5.007812 10.558594 5.007812 C 10.003906 5.007812 9.554688 4.558594 9.554688 4.003906 Z M 9.554688 8.25 C 9.554688 7.695312 10.003906 7.246094 10.558594 7.246094 C 11.113281 7.246094 11.5625 7.695312 11.5625 8.25 C 11.5625 8.804688 11.113281 9.253906 10.558594 9.253906 C 10.003906 9.253906 9.554688 8.804688 9.554688 8.25 Z M 9.554688 12.496094 C 9.554688 11.941406 10.003906 11.492188 10.558594 11.492188 C 11.113281 11.492188 11.5625 11.941406 11.5625 12.496094 C 11.5625 13.050781 11.113281 13.5 10.558594 13.5 C 10.003906 13.5 9.554688 13.050781 9.554688 12.496094 Z M 9.554688 12.496094 "
          style={{
            fill: 'rgba(0, 0, 0, 0.45)', fillOpacity: 1, fillRule: 'nonzero', stroke: 'none'
          }}
        />
      </g>
    </svg>
  </DragIcon>
);

const SortableItem = SortableElement((props) => {
  const removeBtn = props.removeable && (
    <button
      className="inner-col__close"
      onMouseDown={(e) => {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }}
      onMouseMove={(e) => e.stopPropagation()}
      onTouchStart={(e) => {
        e.preventDefault();
        e.stopPropagation();
        // eslint-disable-next-line no-console
        console.log(e.isPropagationStopped());
      }}
      onClick={() => {
        props.onRemove(props.col);
      }}
    >
      <Icon type="close" />
    </button>
  );
  return (
    <DraggableCol
      className={classNames(
        props.colClassName,
        { [`xf-draggable-col__hoc--${props.size}`]: props.size }
      )}
    >
      <div className={`inner-col${props.removeable ? ' removeable' : ''}`}>
        <div className="inner-col__section" title={props.col.title}>
          <MoveIcon />
          {props.layout === 'xy' && !props.hideIndex ? (
            <span className="inner-col__no">{`${props.layoutIndex}. `}</span>
          ) : (
            ''
          )}
          {props.checkable ? (
            <Checkbox
              checked={!props.col.hidden}
              onChange={(e) => props.onCheckChange({
                ...props.col,
                hidden: !e.target.checked
              })}
            >
              {props.col.title}
            </Checkbox>
          ) : (
            props.col.title
          )}
          {removeBtn}
        </div>
      </div>
    </DraggableCol>
  );
});

const SortableList = SortableContainer((props) => (
  <SortedColsFilter
    className={classNames(
      props.className,
      { 'layout-inline': props.layout === 'xy' }
    )}
  >
    {props.cols.map((col, index) => {
      if (props.disabled) {
        return (
          <span key={col.dataIndex} className="disabled-col">
            {props.layout === 'xy' && !props.hideIndex ? (
              <span className="inner-col__no">{`${index + 1}. `}</span>
            ) : (
              ''
            )}
            {col.title}
          </span>
        );
      } return (
        <SortableItem
          key={col.dataIndex}
          index={index}
          col={col}
          {...props}
          layoutIndex={index + 1}
        />
      );
    })}
  </SortedColsFilter>
));

export class SortedColsFilterHoc extends React.Component {
  constructor(props) {
    super(props);
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    this.props.onSortChange(arrayMove(this.props.cols, oldIndex, newIndex));
  };

  render() {
    return (
      <SortableList
        layout={this.props.axis}
        onSortEnd={this.onSortEnd}
        {...this.props}
      />
    );
  }
}

SortedColsFilterHoc.defaultProps = {
  axis: 'xy',
  hideIndex: false,
  cols: []
};
