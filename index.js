const fs = require('fs');
const path = require('path')
const inquirer = require("inquirer");

const Manager = require("./lib/Manager.js")
const Engineer = require("./lib/Engineer.js")
const Intern = require("./lib/Intern.js")
const generateMarkdown = require("./utils/generateMarkdown")
// const newEmployee = new Manager ('jshajha', 452, 'lissette@gmail.com', 321871625885)
// console.log(newEmployee.getName());

// function beginQuestions(){
//   questionManager();
// }
const allMembers = [];

// starts questions with the manager
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

// function to add a team member
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
      profileGenerator();
    }
  })
}

// function for inputting a engineer
function engineerMember () {
  inquirer.prompt([{
    type:"input",
    name: "name",
    message: "What is the name of your Engineer?",

  },
  {
    type:"input",
    name:"id",
    message: `what is your engineer's id?`
  },
  {
    type: 'input',
    name: 'email',
    message: `What is the engineer's email?`,
  },
  {
    type: 'input',
    name: 'github',
    message: `What is the engineer's GitHub username?`
  }

])
  .then(answers => {
    const engineerInput = new Engineer (answers.name, answers.id, answers.email, answers.github)
    allMembers.push(engineerInput);
    nextMember();
})
};

// function for inputting an intern
function internMember () {
  inquirer.prompt([{
    type:"input",
    name: "name",
    message: "What is the name of your Intern?",

  },
  {
    type:"input",
    name:"id",
    message: `what is your intern's id?`
  },
  {
    type: 'input',
    name: 'email',
    message: `What is the intern's email?`,
  },
  {
    type: 'input',
    name: 'school',
    message: `What is your inter's school?`
  }

])
  .then(answers => {
    const internInput = new Intern (answers.name, answers.id, answers.email, answers.school)
    allMembers.push(internInput);
    nextMember();
})
};

function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, err => {
      // if there's an error, reject the Promise and send the error to the Promise's `.catch()` method
      if (err) {
        console.log(err);
        // return out of the function here to make sure the Promise doesn't accidentally execute the resolve() function as well
        return;
      }

      // if everything went well, resolve the Promise and send the successful data to the `.then()` method
    });
}

function profileGenerator() {
  inquirer.prompt(questionManager)
  .then(answers => {
      writeToFile('write.txt', generateMarkdown(answers));
      console.log(answers)
  })
}


// function init() {
//     inquirer.prompt(questionManager)
//     .then(answers => {
//         writeToFile('write.txt', generateMarkdown(answers));
//         console.log(answers)
//     })
// }



// init();
// beginQuestions();
questionManager();
