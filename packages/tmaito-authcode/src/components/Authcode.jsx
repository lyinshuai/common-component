import React from 'react';
import { getParams } from 'tmaito-utils';
import AuthcodeContext from './AuthcodeContext';

const isDisabled = () => {
  const { search } = location;
  const { ignore_auth: ignore } = getParams(search);
  return ignore === 'true';
};

const AuthCodeConsumer = (props) => {
  const { authcode, children } = props;

  const getCode = (data) => {
    if (isDisabled() || !data.length) return true;
    return authcode ? data.includes(authcode) : true;
  };

  return (
    <AuthcodeContext.Consumer>
      {({ authCodes }) => (getCode(authCodes) ? children : null)}
    </AuthcodeContext.Consumer>
  );
};

export default AuthCodeConsumer;
