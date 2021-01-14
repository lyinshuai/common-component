import React from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import classnames from 'classnames';

let dragingIndex;

const TableRow = (props) => {
  const {
    isOver,
    connectDragSource,
    connectDropTarget,
    moveRow,
    ...restProps
  } = props;
  const style = { ...restProps.style, cursor: 'move' };
  const { className } = restProps;
  return connectDragSource(
    connectDropTarget(
      <tr
        {...restProps}
        className={classnames(className, {
          'drop-over-downward': isOver && restProps.index > dragingIndex,
          'drop-over-upward': isOver && restProps.index < dragingIndex
        })}
        style={style}
      />
    )
  );
};

const rowSource = {
  beginDrag(props) {
    dragingIndex = props.index;
    return {
      index: props.index
    };
  }
};

const rowTarget = {
  drop(props, monitor) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Time to actually perform the action
    props.moveRow(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  }
};

const DragableRow = DropTarget('row', rowTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver()
}))(
  DragSource('row', rowSource, (connect) => ({
    connectDragSource: connect.dragSource()
  }))(TableRow)
);

export { DragableRow };
