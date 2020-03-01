const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

console.log(__dirname);

const employeeArray = [];

async function init() {
  const employeeType = await inquirer.prompt({
    type: "list",
    name: "employee",
    message: "What employee would you like to add?",
    choices: ["Engineer", "Intern", "Manager", "None"]
  });

  //   console.log(employeeType.employee);

  switch (employeeType.employee) {
    case "Engineer":
      //   console.log("e");
      let einfo = await inquirer.prompt([
        {
          type: "input",
          name: "name",
          message: "What is the engineer's name?"
        },
        {
          type: "input",
          name: "id",
          message: "What is the ID number"
        },
        {
          type: "input",
          name: "email",
          message: "What is the email?"
        },
        {
          type: "input",
          name: "gitHub",
          message: "What is the engineer's GitHub?"
        }
      ]);
      employeeArray.push(
        new Engineer(einfo.name, einfo.id, einfo.email, einfo.gitHub)
      );
      init();
      break;
    case "Intern":
      //   console.log("i");
      let iinfo = await inquirer.prompt([
        {
          type: "input",
          name: "name",
          message: "What is the intern's name?"
        },
        {
          type: "input",
          name: "id",
          message: "What is the ID number"
        },
        {
          type: "input",
          name: "email",
          message: "What is the email?"
        },
        {
          type: "input",
          name: "school",
          message: "What school does the intern attend?"
        }
      ]);
      employeeArray.push(
        new Intern(iinfo.name, iinfo.id, iinfo.email, iinfo.school)
      );
      init();
      break;
    case "Manager":
      //   console.log("m");
      let minfo = await inquirer.prompt([
        {
          type: "input",
          name: "name",
          message: "What is the manager's name?"
        },
        {
          type: "input",
          name: "id",
          message: "What is the ID number"
        },
        {
          type: "input",
          name: "email",
          message: "What is the email?"
        },
        {
          type: "input",
          name: "office",
          message: "What office is the manager in?"
        }
      ]);
      employeeArray.push(
        new Manager(minfo.name, minfo.id, minfo.email, minfo.office)
      );
      init();
      break;
    default:
      //   console.log(employeeArray);
      if (OUTPUT_DIR === false) {
        fs.mkdir(OUTPUT_DIR, err => {
          if (err) throw err;
        });
      }
      fs.writeFile(outputPath, render(employeeArray), err => {
        if (err) throw err;
      });
      break;
  }
}

init();
