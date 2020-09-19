const fs = require('fs')
// const path = require('path')
// const shell = require('shelljs')
// const chalk = require('chalk')


function sendWelcome(){
    console.log(`Hello World`)
}



// function createProject(projectPath) {
//     if (fs.existsSync(projectPath)) {
//         console.log(chalk.red(`Folder ${projectPath} exists. Delete or use another name.`));
//         return false;
//     }
//
//     fs.mkdirSync(projectPath);
//     return true;
// }
//
// function postProcess(options) {
//     if (isNode(options)) {
//         return postProcessNode(options);
//     }
//     return true;
// }
//
// function isNode(options) {
//     return fs.existsSync(path.join(options.templatePath, 'package.json'));
// }
//
// function postProcessNode(options) {
//     shell.cd(options.tartgetPath);
//
//     let cmd = '';
//
//     if (shell.which('yarn')) {
//         cmd = 'yarn';
//     } else if (shell.which('npm')) {
//         cmd = 'npm install';
//     }
//
//     if (cmd) {
//         const result = shell.exec(cmd);
//
//         if (result.code !== 0) {
//             return false;
//         }
//     } else {
//         console.log(chalk.red('No yarn or npm found. Cannot run installation.'));
//     }
//
//     return true;
// }
//
module.exports = {
    sendWelcome
    // postProcess, createProject
}