#!/~/.npm-global/bin/ node

import {execSync} from "child_process";

const cliSelect = require('cli-select-2');
const readline = require('readline');
const exec = require('child_process').exec;

const main = (): void => {
  const options: Array<string> = [
    'feat:        A new feature',
    'fix:         A bug fix',
    'improvement: An improvement to a current feature',
    'docs:        Documentation only changes',
    'style:       Changes that do not affect the meaning of the code',
    'refactor:    A code change that neither fixes abug nor adds a feature',
    'perf:        A code change that improves performance'
  ];


  cliSelect({
    values: options,
    selected: '(x)',
    unselected: '( )',
    valueRenderer: (value: any, selected: any) => {
      return value;
    },
  }).then((args: any) => {
    const {id} = args;
    const value = args.value.substring(0, args.value.indexOf(':'));
    const readInterface = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
     readInterface.question('commit message: ',
      (inputMessage: string) => {
        const commitMessage = `${value}: ${inputMessage}`;
        readInterface.close();
        exec(`git commit -m \"${commitMessage}\"`, (err: any, stdout: any, stderr: any) => {
          console.log('commited.');
          return;
        });
      }
    );
  });
}

main()
