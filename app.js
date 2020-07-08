let input = document.getElementById('input');
let submitButton = document.getElementById('submit');
let page = document.getElementById('mainpage');
let container = document.getElementById('container');
let donetasks = document.getElementById('donetasks');
let deleteallbutton = document.getElementById('deleteallbutton');


function Tasks(text, isDone){
    this.text = text
    this.isDone = isDone
}

let currentTasks = JSON.parse(localStorage.getItem('tasks') || "[]")
let otherTasks = JSON.parse(localStorage.getItem('other') || "[]")
reRender()

function createNewTask(){
    if(input.value !== ""){
    let newtask = new Tasks(input.value, false)
    currentTasks.push(newtask)
    }
    
    localStorage.setItem("tasks", JSON.stringify(currentTasks))
}

function reRender(){
    
    while(container.firstChild){
    container.removeChild(container.firstChild)
}
    
    currentTasks.forEach(element => {
       let thing = container.appendChild(document.createElement("DIV"))
       let cancelBtn = container.lastChild.appendChild(document.createElement('button'))
       cancelBtn.innerHTML = "X"
       let thingTxt = container.lastChild.appendChild(document.createElement('P'))
       let thingCheck = container.lastChild.appendChild(document.createElement('input'))
       thingCheck.setAttribute('class', 'checkboxinput')
       thingCheck.type = "checkbox"
        thingCheck.checked = element.isDone
       thingTxt.innerHTML = element.text.toUpperCase()
        
        let child = container.querySelectorAll('div');
        thingCheck.addEventListener('click', checkboxInput)
        console.log(container)
        cancelBtn.addEventListener('click', deleteTask)
     })
    
    while(donetasks.firstChild){
    donetasks.removeChild(donetasks.firstChild)
}
    
    otherTasks.forEach(element => {
       let thing = donetasks.appendChild(document.createElement("DIV"))
       let cancelBtn = donetasks.lastChild.appendChild(document.createElement('button'))
       cancelBtn.innerHTML = "X"
       let thingTxt = donetasks.lastChild.appendChild(document.createElement('P'))
       let thingCheck = donetasks.lastChild.appendChild(document.createElement('input'))
       thingCheck.setAttribute('class', 'checkboxinput')
       thingCheck.type = "checkbox"
        thingCheck.checked = element.isDone
       thingTxt.innerHTML = element.text.toUpperCase()
    
        thingCheck.addEventListener('click', checkboxInput)
        cancelBtn.addEventListener('click', deleteDoneTask)
     })
}

function checkboxInput(){
    if(event.target.checked == true){
        event.target.parentElement.style.background = 'red'
        let child = container.querySelectorAll('div')
        
        for(let i = 0; i<currentTasks.length; i++){
        if(child[i].style.background == "red"){
            currentTasks[i].isDone = true
            otherTasks.push(currentTasks[i])
            currentTasks.splice(i, 1)
            donetasks.appendChild(child[i])
        }
    } 
        
    }else{
        event.target.parentElement.style.background = 'white'
        let child = donetasks.querySelectorAll('div')
        
        for(let i = 0; i<otherTasks.length; i++){
        if(child[i].style.background == "white"){
            otherTasks[i].isDone = false
            currentTasks.push(otherTasks[i])
            otherTasks.splice(i, 1)
            container.appendChild(child[i])
        }
    }
}
    localStorage.setItem("tasks", JSON.stringify(currentTasks))
    localStorage.setItem("other", JSON.stringify(otherTasks))
    reRender()
}

function submit(){
    createNewTask();
    input.value = ""
    reRender()
    console.log(currentTasks)
}

function deleteAll(){
    currentTasks = []
    localStorage.setItem("tasks", JSON.stringify(currentTasks))
    otherTasks = []
    localStorage.setItem("other", JSON.stringify(otherTasks))
    reRender()
}

function clearDoneTasks(){
    otherTasks = []
    localStorage.setItem("other", JSON.stringify(otherTasks))
    reRender()
}

function deleteTask(){
    event.target.parentElement.style.background = 'blue'
    let children = container.querySelectorAll("div")
    for(let i = 0; i<currentTasks.length; i++){
        if(children[i].style.background == 'blue'){
            currentTasks.splice(i, 1)
            localStorage.setItem("tasks", JSON.stringify(currentTasks))
            reRender()
             console.log('ciunt')
        }
    }
    console.log('cock')
}
function deleteDoneTask(){
    event.target.parentElement.style.background = 'blue'
    let children = donetasks.querySelectorAll("div")
    for(let i = 0; i<otherTasks.length; i++){
        if(children[i].style.background == 'blue'){
            otherTasks.splice(i, 1)
            localStorage.setItem("other", JSON.stringify(otherTasks))
            reRender()
             console.log('ciunt')
        }
    }
    console.log('pusy')
}

document.getElementById('cleardone').addEventListener('click', clearDoneTasks)
deleteallbutton.addEventListener('click', deleteAll)
submitButton.addEventListener('click', submit)
document.addEventListener('keypress', function(e){
        if(e.keyCode == 13){
        submit()
}
 })