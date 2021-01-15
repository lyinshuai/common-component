import styled from 'styled-components';

export default styled.div.attrs({ className: 'sorted-cols-filter' })`
&.layout-inline {
  .xf-draggable-col__hoc {
    display: inline-block;
  }
  .disabled-col{
    display: inline-block;
    padding: 4px 6px;
    font-size: 12px;
    background-color: #fff;
    margin: 3px 1px;
  }
}
`;
