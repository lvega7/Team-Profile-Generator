const fs = require('fs');
const path = require('path')
const inquirer = require("inquirer");

const Manager = require("./lib/Manager.js")
// const newEmployee = new Manager ('jshajha', 452, 'lissette@gmail.com', 321871625885)
// console.log(newEmployee.getName());

function beginQuestions(){
  questionManager();
}
const allMembers = [];

function questionManager () {
   inquirer.prompt ([
    {
        type: 'input',
        name: 'name',
        message: `What is the manager's name?`
      },
      {
        type: 'input',
        name: 'id',
        message: `What is the manager's id?`,
      },
      {
        type: 'input',
        name: 'email',
        message: `What is the manager's email?`,
      },
])
.then(answers => {
  const managerInput = new Manager(answers.name, answers.id, answers.email, answers.role)
  allMembers.push(managerInput);
  nextMember();
  
})
};

function nextMember() {
  inquirer.prompt([{
    type:"list",
    name:"engineerOrIntern",
    message:"Which team member would you like to add?",
    choices:["Engineer", "Intern","I do not want to add anymore team members"]
  }])
  .then(answers => {
    if(answers.engineerOrIntern === "Engineer"){
      engineerMember();
    } else if (answers.engineerOrIntern === "Intern"){
      internMember();
    }else {
      profileGnerator();
    }
  })
}

function engineerMember () {
  inquirer.prompt([{
    type:"input",
    name: "Enginner info",
    message: "What is the name of your Engineer?",

  }])
  .then(answers => {
    const managerInput = new Engineer (answers.name, answers.id, answers.email, answers.role)
    allMembers.push(managerInput);
    nextMember();
}

// function init() {
//     inquirer.prompt(questionManager)
//     .then(answers => {
//         writeToFile('write.txt', generateMarkdown(answers));
//         console.log(answers)
//     })
// }



// init();
beginQuestions();
