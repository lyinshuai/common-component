import React from 'react';
import AuthcodeContext from './AuthcodeContext';

const AuthcodeProvider = (props) => {
  const { authCodes = [], authKey } = props;
  const handleResource = () => authCodes.map((item) => item[authKey] || item);
  return (
    <AuthcodeContext.Provider
      value={{
        authCodes: handleResource()
      }}
    >
      {props.children}
    </AuthcodeContext.Provider>
  );
};

export default AuthcodeProvider;
