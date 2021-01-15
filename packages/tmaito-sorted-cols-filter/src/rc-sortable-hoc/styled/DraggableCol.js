import styled from 'styled-components';

export default styled.div.attrs({ className: 'xf-draggable-col__hoc' })`
background-color: #fff;
margin: 3px 1px;
z-index: 10000;
&.is-dragging .inner-col {
  background: #e6f7ff;
  border: 1px solid #ccdde4;
}

&.xf-draggable-col__hoc--small {
  .inner-col {
    padding: 4px 6px;
    font-size: 12px;
    position: relative;
    .ant-checkbox {
      font-size: 12px;
    }
    .ant-checkbox-inner {
      width: 14px;
      height: 14px;
      &:after {
        border-width: 1px;
        left: 3.8px;
        top: 0.2px;
      }
    }
    .ant-checkbox-wrapper {
      font-size: 12px;
    }
    &.removeable {
      padding-right: 24px;
    }
    .inner-col__close{
      right: 3px
    }
  }
}

.inner-col {
  cursor: move;
  user-select: none;
  padding: 4px 10px 4px 4px;
  border-radius: 4px;
  border: 1px solid #e6f7ff;
  max-width: 200px;
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  
  .inner-col__section{
    overflow: hidden;
  }
  .ant-checkbox-wrapper{
    cursor: move;
  }
  &.removeable {
    padding-right: 30px;
  }
  .inner-col__close{
    right: 5px
  }
}

.inner-col__no {
  display: inline-block;
  padding-right: 4px;
  width: 24px;
  text-align: right;
}

.inner-col__close{
  opacity: 0;
  padding: 0;
  border: 0;
  padding: 0 3px;
  background-color: transparent;
  cursor: pointer;
  position: absolute;
  > .anticon-close{
    pointer-events: none;
  }
}
.inner-col:hover .inner-col__close{
  opacity: 1;
  &:hover {
    opacity: 0.8;
  }
}
`;
