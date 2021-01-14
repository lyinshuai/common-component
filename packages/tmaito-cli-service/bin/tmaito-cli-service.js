#!/usr/bin/env node

const path = require('path');
const fse = require('fs-extra');
const commander = require('commander');

fse.readdir(path.resolve(__dirname, '../', './command')).then((files) => {
  files.filter((file) => /.+\.js$/.test(file))
    .forEach((file) => {
      require(`../command/${file.trim()}`);
    });
  if (process.argv.length <= 2) {
    commander.help();
    return;
  }
  commander.parse(process.argv);
}).catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e);
});
