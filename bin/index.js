#!/~/.npm-global/bin/ node
"use strict";
exports.__esModule = true;
var cliSelect = require('cli-select-2');
var readline = require('readline');
var exec = require('child_process').exec;
var main = function () {
    var options = [
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
        valueRenderer: function (value, selected) {
            return value;
        }
    }).then(function (args) {
        var id = args.id;
        var value = args.value.substring(0, args.value.indexOf(':'));
        var readInterface = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        readInterface.question('commit message: ', function (inputMessage) {
            var commitMessage = "".concat(value, ": ").concat(inputMessage);
            readInterface.close();
            exec("git commit -m \"".concat(commitMessage, "\""), function (err, stdout, stderr) {
                return;
            });
        });
    });
};
main();
