/* eslint-disable no-console */
const commander = require('commander');
const { exec } = require('child-process-promise');
const { handleError } = require('../utils');

commander.command('monorepo <name>')
  .option('-s, --scope <value>', 'scope of workspace')
  .parse(process.argv)
  .description('monorepo script 脚本')
  .action(async (name, ops) => {
    let modules;
    const {
      rawArgs
    } = ops || {};
    if (rawArgs) {
      if (rawArgs.includes('-s')) {
        modules = rawArgs[rawArgs.indexOf('-s') + 1];
      }
      if (rawArgs.includes('--scope')) {
        modules = rawArgs[rawArgs.indexOf('--scope') + 1];
      }
    }
    try {
      if (name !== 'dev') {
        const cmdStr = `lerna run ${name} --concurrency 3 --stream`;
        if (modules) {
          const scopes = modules.split(',').reduce((acc, cur) => `${acc} --scope ${cur}`, '');
          const { stdout, stderr } = await exec(cmdStr + scopes);
          console.log('stdout, stderr:', stdout, stderr);
        } else {
          const { stdout, stderr } = await exec(cmdStr);
          console.log('stdout, stderr:', stdout, stderr);
        }
      } else if (modules) {
        console.log('modules: ', modules);
        modules.split(',').forEach(async (module) => {
          await exec(`yarn workspace ${module} run dev`);
        });
      } else {
        await exec('yarn workspaces run dev');
      }
    } catch (error) {
      handleError(error);
    }
  });
