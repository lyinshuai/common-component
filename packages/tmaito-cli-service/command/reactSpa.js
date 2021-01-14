/* eslint-disable no-console */
const path = require('path');
const spawn = require('cross-spawn');
const commander = require('commander');

const webpackConfigPath = path.join(__dirname, '../config/react-spa');

commander
  .command('react-spa <name>')
  .description('react 单页应用')
  .action(async (name, ops) => {
    const scripts = {
      prod: `node ${webpackConfigPath}/build.js`,
      build: `node ${webpackConfigPath}/build.js`,
      analyzer: `node ${webpackConfigPath}/analyzer.js`,
      dev: `webpack-dev-server --progress --config ${webpackConfigPath}/webpack.dev.conf.js`
    };
    const cmdStr = scripts[name];
    if (cmdStr) {
      const args = cmdStr.split(' ');
      const result = spawn.sync(args.slice(0, 1).toString(), args.slice(1), {
        stdio: 'inherit'
      });
      if (result.signal) {
        if (result.signal === 'SIGKILL') {
          console.log('The build failed because the process exited too early.');
          console.log('This probably means the system ran out of memory or someone called');
          console.log('`kill -9` on the process.');
        } else if (result.signal === 'SIGTERM') {
          console.log('The build failed because the process exited too early. ');
          console.log('Someone might have called `kill` or `killall`, or the system could be shutting down.');
        }
        process.exit(1);
      }
      process.exit(result.status);
    } else {
      console.log(`Unknown script "${name}".`);
    }
  });
