const fs = require('fs')
const path = require('path')

const CURR_DIR = process.cwd()
const TPL_DIR = path.resolve(__dirname, 'templates')

// const TEMPLATES = fs.readdirSync(path.join(__dirname, 'templates'));
// https://medium.com/@nicoespeon/plop-a-micro-generator-to-ease-your-daily-life-7767f0a34db

module.exports = (plop, config) => {
    console.log(plop.getDefaultInclude())
    plop.setGenerator('package', {
        description: `Create Package`,
        prompts: [
            {
                type: 'input',
                name: 'name',
                message: 'Name',
                default: 'my-package',
                // validate: (input) => {
                //     if(input) return true
                //     return `Required name`
                // }
            },
            {
                type: 'input',
                name: 'version',
                default: '1.0.0',
                skip: true,
            },
        ],
        actions: ( data ) => {
            // data.message = `Hello world`

            const getData = () => {
                return {
                    packageName: `@ttungbmt/${data.name}`,
                    version: '0.0.1',
                    description: '',
                    license: 'MIT',
                    github: `ttungbmt/${data.name}`,
                    author: 'Truong Thanh Tung'
                }
            }

            let actions = [
                {
                    type: 'add',
                    path: path.join(CURR_DIR, `/{{name}}/`, `package.json`),
                    templateFile: path.join(TPL_DIR, `/library/`, `package.json.hbs`),
                    data: getData
                },
                {
                    type: 'add',
                    path: path.join(CURR_DIR, `{{name}}/src/`, `index.js`),
                    templateFile: path.join(TPL_DIR, `/library/`, `index.js.hbs`)
                },
            ];


            return actions;
        }

    })

    // plop.setGenerator('react', {
    //     description: `Create React App`,
    //     prompts: [
    //         {
    //             type: 'input',
    //             name: 'name',
    //             message: 'Name',
    //         },
    //     ],
    //     actions: function(data) {
    //         let actions = [];
    //
    //         return actions;
    //     }
    // })

    // TEMPLATES.map(name => {
    //     plop.setGenerator(name, {
    //         description: `Create template ${name}`,
    //         prompts: [
    //             {
    //                 type: 'input',
    //                 name: 'name',
    //                 message: 'New project name?',
    //             },
    //         ],
    //         actions: function(data) {
    //             let actions = [];
    //
    //             actions.push({
    //                 type: 'add',
    //                 path: 'folder/{{dashCase name}}.txt',
    //                 templateFile: 'templates/tacos.txt'
    //             });
    //
    //             return actions;
    //         }
    //     })
    // })

    // plop.setHelper('upperCase', (txt) => txt.toUpperCase()); // used in template as {{upperCase name}}
    // plop.setPartial('message', '<h1>Hello world: {{upperCase name}}</h1>\n'); // used in template as {{> message }}
    // plop.setActionType('doTheThing', function (answers, config, plop) {
    //     // do something
    //     console.log('FUCK')
    //     // // if something went wrong
    //     // throw 'error message';
    //     // otherwise
    //     return 'success status message';
    // });
    //
    // plop.setWelcomeMessage(
    //     "Welcome to plop! What type of file would you like to generate?"
    // )
    //
    // plop.setGenerator('create-library', {
    //     description: 'Create a reusable component',

    //     actions: [
    //         {
    //             type: 'doTheThing',
    //         },
    //     ],
    // })


    // plop.setGenerator('component', {
    //     description: 'Create a reusable component',
    //     prompts: [
    //         {
    //             type: 'input',
    //             name: 'name',
    //             message: 'What is your component name?',
    //         },
    //
    //     ],
    //     actions: [
    //         {
    //             type: 'doTheThing',
    //         },
    //         // {
    //         //     type: 'add',
    //         //     path: 'src/components/{{pascalCase name}}/{{pascalCase name}}.js',
    //         //     templateFile:
    //         //         'templates/Component/Component.js.hbs',
    //         // },
    //         // {
    //         //     type: 'add',
    //         //     path:
    //         //         'src/components/{{pascalCase name}}/{{pascalCase name}}.module.css',
    //         //     templateFile:
    //         //         'templates/Component/Component.module.css.hbs',
    //         // },
    //         // {
    //         //     type: 'add',
    //         //     path: 'src/components/{{pascalCase name}}/index.js',
    //         //     templateFile: 'templates/Component/index.js.hbs',
    //         // },
    //         // {
    //         //     type: 'add',
    //         //     path: 'src/components/index.js',
    //         //     templateFile: 'templates/injectable-index.js.hbs',
    //         //     skipIfExists: true,
    //         // },
    //         // {
    //         //     type: 'append',
    //         //     path: 'src/components/index.js',
    //         //     pattern: `/* PLOP_INJECT_IMPORT */`,
    //         //     template: `import {{pascalCase name}} from './{{pascalCase name}}';`,
    //         // },
    //         // {
    //         //     type: 'append',
    //         //     path: 'src/components/index.js',
    //         //     pattern: `/* PLOP_INJECT_EXPORT */`,
    //         //     template: `\t{{pascalCase name}},`,
    //         // },
    //     ],
    // })

    // plop.setGenerator('page', {
    //     description: 'Create a page',
    //     prompts: [
    //         {
    //             type: 'input',
    //             name: 'name',
    //             message: 'What is your page name?',
    //         },
    //     ],
    //     actions: [
    //         {
    //             type: 'add',
    //             path: 'src/pages/{{pascalCase name}}/{{pascalCase name}}.js',
    //             templateFile:
    //                 'templates/Page/Page.js.hbs',
    //         },
    //         {
    //             type: 'add',
    //             path: 'src/pages/{{pascalCase name}}/{{pascalCase name}}.test.js',
    //             templateFile:
    //                 'templates/Page/Page.test.js.hbs',
    //         },
    //         {
    //             type: 'add',
    //             path:
    //                 'src/pages/{{pascalCase name}}/{{pascalCase name}}.module.css',
    //             templateFile:
    //                 'templates/Page/Page.module.css.hbs',
    //         },
    //         {
    //             type: 'add',
    //             path: 'src/pages/{{pascalCase name}}/index.js',
    //             templateFile: 'templates/Page/index.js.hbs',
    //         },
    //         {
    //             type: 'add',
    //             path: 'src/pages/index.js',
    //             templateFile: 'templates/injectable-index.js.hbs',
    //             skipIfExists: true,
    //         },
    //         {
    //             type: 'append',
    //             path: 'src/pages/index.js',
    //             pattern: `/* PLOP_INJECT_IMPORT */`,
    //             template: `import {{pascalCase name}} from './{{pascalCase name}}';`,
    //         },
    //         {
    //             type: 'append',
    //             path: 'src/pages/index.js',
    //             pattern: `/* PLOP_INJECT_EXPORT */`,
    //             template: `\t{{pascalCase name}},`,
    //         },
    //     ],
    // })
    //
    // plop.setGenerator('service', {
    //     description: 'Create service',
    //     prompts: [
    //         {
    //             type: 'input',
    //             name: 'name',
    //             message: 'What is your service name?',
    //         },
    //     ],
    //     actions: [
    //         {
    //             type: 'add',
    //             path: 'src/services/{{camelCase name}}.js',
    //             templateFile: 'templates/service.js.hbs',
    //         },
    //         {
    //             type: 'add',
    //             path: 'src/services/index.js',
    //             templateFile: 'templates/injectable-index.js.hbs',
    //             skipIfExists: true,
    //         },
    //         {
    //             type: 'append',
    //             path: 'src/services/index.js',
    //             pattern: `/* PLOP_INJECT_IMPORT */`,
    //             template: `import {{camelCase name}} from './{{camelCase name}}';`,
    //         },
    //         {
    //             type: 'append',
    //             path: 'src/services/index.js',
    //             pattern: `/* PLOP_INJECT_EXPORT */`,
    //             template: `\t{{camelCase name}},`,
    //         }
    //     ],
    // })
    //
    // plop.setGenerator('hook', {
    //     description: 'Create a custom react hook',
    //     prompts: [
    //         {
    //             type: 'input',
    //             name: 'name',
    //             message: 'What is your hook name?',
    //         },
    //     ],
    //     actions: [
    //         {
    //             type: 'add',
    //             path: 'src/hooks/{{camelCase name}}.js',
    //             templateFile: 'templates/hook.js.hbs',
    //         },
    //         {
    //             type: 'add',
    //             path: 'src/hooks/index.js',
    //             templateFile: 'templates/injectable-index.js.hbs',
    //             skipIfExists: true,
    //         },
    //         {
    //             type: 'append',
    //             path: 'src/hooks/index.js',
    //             pattern: `/* PLOP_INJECT_IMPORT */`,
    //             template: `import {{camelCase name}} from './{{camelCase name}}';`,
    //         },
    //         {
    //             type: 'append',
    //             path: 'src/hooks/index.js',
    //             pattern: `/* PLOP_INJECT_EXPORT */`,
    //             template: `\t{{camelCase name}},`,
    //         }
    //     ],
    // })
};