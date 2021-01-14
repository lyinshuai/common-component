/* eslint-disable no-console */
const path = require('path');
const chalk = require('chalk');
const notifier = require('node-notifier');

const handleError = (error, exitCode = 1) => {
  const message = error.message.trim().replace(/\n +/g, '\n');
  const stack = error.stack.replace(error.message, '');

  console.log(chalk.redBright(`{ error ${message}}\n\n{ path ${stack}} `));
  process.exit(exitCode);
};

const getWebpackConfig = () => {
  try {
    return require(path.resolve('tmaito.conf.js'));
  } catch (e) {
    console.log('tmaito.conf.js is required!');
  }
};

// 获取字段类型
const type = (params) => Object.prototype.toString.call(params).slice(8, -1);

const createNotifierCallback = () => (severity, errors) => {
  if (severity !== 'error') return;

  const error = errors[0];
  const filename = error.file && error.file.split('!').pop();

  notifier.notify({
    title: packageConfig.name,
    message: `${severity}: ${error.name}`,
    subtitle: filename || '',
    icon: path.join(__dirname, 'logo.png')
  });
};

module.exports = {
  type,
  handleError,
  getWebpackConfig,
  createNotifierCallback
};
