import React from 'react';
import Column from './Column.jsx';
import './style/index.scss';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

export class SortedColsFilterDnd extends React.Component {
  constructor(props) {
    super(props);
  }

  onDragEnd = ({ destination, source }) => {
    if (!destination) {
      return;
    }
    if (
      destination.droppableId === source.droppableId
      && destination.index === source.index
    ) {
      return;
    }
    const newCols = [...this.props.cols];
    newCols.splice(source.index, 1);
    newCols.splice(destination.index, 0, this.props.cols[source.index]);
    this.props.onSortChange(newCols);
  };

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId={this.props.droppableId}>
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              className={`sorted-cols-filter${
                snapshot.isDraggingOver ? ' is-dragging-over' : ''
              }${this.props.className ? ` ${this.props.className}` : ''}`}
              ref={provided.innerRef}
            >
              {this.props.cols.map((col, index) => (
                <Column key={col.dataIndex} {...col} {...this.props} index={index} />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    );
  }
}

SortedColsFilterDnd.defaultProps = {
  droppableId: '0',
};
