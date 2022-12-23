
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
function startApp(name){
  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', onDataReceived);
  console.log(`Welcome to ${name}'s application!`)
  console.log("--------------------")
}


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
  if (text === 'quit\n' || text === 'exit\n') {
    quit();
  }
  else if(text === 'hello\n' || text.split(" ")[0] === "hello" ){
    hello(text);
  }
  else if(text === 'list\n'){
    list();
  }
  else if(text === 'help\n'){
    help();
  }
  else if (text.startsWith('add')){
    add(text);
  }
  else if (text.startsWith('remove')){
    removeTask(text);
  }
  else{
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
function unknownCommand(c){
  console.log('unknown command: "'+c.trim()+'"')
}


/**
 * Says hello
 *
 * @returns {void}
 */
function hello(text){
  if (text === "hello\n"){
    console.log("hello!");
    return
  }
  text = text.replace('\n', '').trim();
  const typed = text.split(" ");
  if (typed[0] === "hello"){
    const txt = typed.slice(1).join(" ");
    console.log(`hello ${txt}!`);
    }
}





function add(obj){
  obj=obj.trim().split(" ")[1]
  if (obj==undefined){
    console.log("please insert an object")
  }
  else{
    tasks.push(obj)
  }
}

function removeTask(obj) {
  obj = obj.replace('\n', '').trim();
  if (obj === "remove\n") {
    tasks.pop();
    return
  }
  
  const words = obj.split(' ');
  if (words[0] === 'remove') {
    const b = words.slice(1).join(' ');
    if (b > tasks.length) {
      console.log("You enter a number does not exist");
    } else {
      tasks.splice(`${b[0] - 1}`, 1);
    }
  }
}
/**
 * The help command gives you the commands used to help you
 *
 * @returns {void}
 */
function help(){
  let helpp='hello for saying hello \n quit or exit to quit the application \n help to get the commands '
  console.log(helpp)
}

let tasks = ["task" , "task1"]
function list(){
  tasks.forEach((objects , i) => {
    console.log(`${i +1} - [ ] ${objects}`)
  
  })

}
/**
 * Exits the application
 *
 * @returns {void}
 */
function quit(){
  console.log('Quitting now, goodbye!')
  process.exit();
}

// The following line starts the application
startApp("Mouhamad Al Assaad")
