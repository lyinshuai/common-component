import React from 'react';
import { Checkbox } from 'antd';
import { Draggable } from 'react-beautiful-dnd';

export default class Demo extends React.Component {
  constructor(props) {
    super(props);
  }

  onChange = (e) => {
    this.props.onCheckChange({
      ...this.props,
      hidden: !e.target.checked,
    });
  };

  render() {
    return (
      <Draggable draggableId={this.props.dataIndex} index={this.props.index}>
        {(provided, snapshot) => (
          <div
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={`xf-draggable-col__dnd${snapshot.isDragging ? ' is-dragging' : ''}`}
            ref={provided.innerRef}
          >
            <div className="inner-col">
              {this.props.checkable ? (
                <Checkbox
                  checked={!this.props.hidden}
                  onChange={this.onChange}
                >
                  {this.props.title}
                </Checkbox>
              ) : (
                this.props.title
              )}
            </div>
          </div>
        )}
      </Draggable>
    );
  }
}
