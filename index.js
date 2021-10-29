// const fs = require('fs');

const inquirer = require("inquirer");

const Manager = require("./lib/Manager.js")
const newEmployee = new Manager ('jshajha', 452, 'lissette@gmail.com', 321871625885)
console.log(newEmployee.getName());

const questions = [
    {
        type: 'input',
        name: 'title',
        message: 'What is the title of your project?',
        validate: titleInput => {
          if (titleInput) {
            return true;
          } else {
            console.log('Please enter your project name!');
            return false;
          }
        }
      },
      {
        type: 'input',
        name: 'desc',
        message: 'Please give a description of your project.',
        validate: descInput => {
          if (descInput) {
            return true;
          } else {
            console.log('Please enter your description!');
            return false;
          }
        }
      },
      
];

function init() {
    inquirer.prompt(questions)
    .then(answers => {
        writeToFile('write.txt', generateMarkdown(answers));
        console.log(answers)
    })
}



init();
