/**
 * Starts the application
 * This is the function that is run when the app starts
 *
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name) {
  process.stdin.resume();
  process.stdin.setEncoding("utf8");
  process.stdin.on("data", onDataReceived);
  console.log(`Welcome to ${name}'s application!`);
  console.log("--------------------");
}

const fs = require("fs");
/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 *
 * For example, if the user entered
 * ```
 * node tasks.js batata
 * ```
 *
 * The text received would be "batata"
 * This function  then directs to other functions
 *
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {
  if (text === "quit\n" || text === "exit\n") {
    quit();
  } else if (text === "hello\n" || text.split(" ")[0] === "hello") {
    hello(text);
  } else if (text === "list\n") {
    list();
  } else if (text === "help\n") {
    help();
  } else if (text.startsWith("add")) {
    add(text);
  } else if (text.startsWith("remove")) {
    removeTask(text);
  } else if (text.startsWith("edit")) {
    edit(text);
  } else if (text.startsWith("check")) {
    check(text);
  } else if (text.startsWith("uncheck")) {
    uncheck(text);
  } else {
    unknownCommand(text);
  }
}

/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c) {
  console.log('unknown command: "' + c.trim() + '"');
}

/**
 * Says hello
 *
 * @returns {void}
 */
function hello(text) {
  if (text === "hello\n") {
    console.log("hello!");
    return;
  }
  text = text.replace("\n", "").trim();
  const typed = text.split(" ");
  if (typed[0] === "hello") {
    const txt = typed.slice(1).join(" ");
    console.log(`hello ${txt}!`);
  }
}

function add(obj) {
  obj = obj.trim().split(" ")[1];
  if (obj == undefined) {
    console.log("please insert an object");
  } else {
    tasks.push(`[ ] ${obj}`);
  }
}

function removeTask(obj) {
  obj = obj.replace("\n", "").trim();
  if (obj === "remove\n") {
    tasks.pop();
    return;
  }

  const words = obj.split(" ");
  if (words[0] === "remove") {
    const b = words.slice(1).join(" ");
    if (b > tasks.length) {
      console.log("You enter a number does not exist");
    } else {
      tasks.splice(`${b[0] - 1}`, 1);
    }
  }
}

function edit(text) {
  if (text === "edit\n") {
    console.log("error!");
    return;
  }
  text = text.replace("\n", " ").trim();
  const objects = text.split(" ");
  if (objects[0] === "edit") {
    const b = objects.slice(1).join(" ");
    if (b[0] > tasks.length) {
      console.log("Doesn't exist");
    } else if (typeof Number(b[0]) === "number" && b[1] === " ") {
      tasks.splice(`${b[0] - 1}`, 1, b.slice(2));
    } else if (typeof b[0] === "string") {
      tasks.splice(-1, 1, b);
    }
  }
}

function check(text) {
  if (text === "check\n") {
    console.log("error!");
    return;
  }
  text = text.replace("\n", "").trim();
  const objects = text.split(" ");
  if (objects[0] === "check") {
    const b = objects.slice(1).join(" ");
    if (b[0] > tasks.length) {
      console.log("Doesn't exist");
    } else if (tasks[b[0] - 1][1] === "✓") {
      console.log("This is already checked!");
    } else {
      tasks.splice(`${b[0] - 1}`, 1, `[✓]${tasks[b - 1].slice(3)}`);
    }
  }
}

// let taskss = ["[ ] buy ships","[✓]  get batata ","[✓] task1"]
// let fs = require("fs");
// let data = fs.readFileSync("database.json");
// let objList = JSON.parse(data);
// let taskss = objList["tasks"];

function uncheck(text) {
  if (text === "uncheck\n") {
    console.log("Error!");
    return;
  }
  text = text.replace("\n", "").trim();
  const objects = text.split(" ");
  if (objects[0] === "uncheck") {
    const b = objects.slice(1).join(" ");
    if (b[0] > tasks.length) {
      console.log("Doesn't exist");
    } else if (tasks[b[0] - 1][1] === " ") {
      console.log("Thiss is already unchecked!");
    } else {
      tasks.splice(`${b[0] - 1}`, 1, `[ ]${tasks[b - 1].slice(3)}`);
    }
  }
}

/**
 * The help command gives you the commands used to help you in your code
 *
 * @returns {void}
 */
function help() {
  let helpp =
    "hello for saying hello \n quit or exit to quit the application \n help to get the commands \n add to add new elements \n  remove and but the number of the items to remove items ";
  console.log(helpp);
}

let tasks = ["task", "task1"];
function list() {
  tasks.forEach((objects, i) => {
    console.log(`${i + 1} - ${objects}`);
  });
}
/**
 * Exits the application
 *
 * @returns {void}
 */
// function quit(){
//   console.log('Quitting now, goodbye!')
//   process.exit();
// }

try {
  let data = fs.readFileSync(sfile);
  var listOb = JSON.parse(data);
} catch (e) {
  console.log(`Hello from JSON!`);
}
if (listOb !== undefined) {
  tasks = listObject.list;
} else {
  listOb = { list: [] };
  tasks = listOb.list;
}

function quit() {
  let fs = require("fs");
  let data = JSON.stringify(objList);
  try {
    fs.writeFileSync("./database.json", data);
    console.log(`Saving changes...`);
  } catch (error) {
    console.error(error);
  }

  console.log("Quitting now, goodbye!");
  process.exit();
}




let sfile;
if (process.argv[2] == null) {
  sfile = "database.json";
} else {
  sfile = process.argv[2];
}

try {
  let data = fs.readFileSync(sfile);
  var listOb = JSON.parse(data);
}
catch (nono) {
  console.log(`Hello from JSON!`)
}
if (listOb !== undefined) {
  list = listOb.list;
} else {
  listOb = { "list": [] }
  list = listOb.list;
}









// The following line starts the application
startApp("Mouhamad Al Assaad");
