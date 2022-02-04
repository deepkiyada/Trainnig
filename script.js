showtask();

const inputBox = document.getElementById("inputBox");
const addButton = document.getElementById("addButton");

/*
IF INPUT IS EMPTY, PREVENTING BUTTON TO WORK.

inputBox.onkeyup(keyupCheck());

function keyupCheck(){
    let inputboxValue = inputBox.value;

    if(inputboxValue == ""){
        addButton.style.opacity = "0.6";
        addButton.style.pointerEvents = "none"
    }else{
        addButton.style.opacity = "initial";
        addButton.style.pointerEvents = "initial";
    }
}

(function blankCheck() {
    let inputboxValue = inputBox.value;

    if(inputboxValue == ""){
        addButton.style.opacity = "0.6";
        addButton.style.pointerEvents = "none"
    }else{
        addButton.style.opacity = "initial";
        addButton.style.pointerEvents = "initial";
    }
}) ();  

inputBox.addEventListener("input", blankCheck);
*/

addButton.addEventListener("click", function(){
    let inputboxValue = inputBox.value;

    if(inputboxValue.trim() != 0){
        let storedValues = localStorage.getItem("localtask");

        if(storedValues == null){
            taskObj = [];
        }else{
            taskObj = JSON.parse(storedValues);
        }

        taskObj.push(inputboxValue);
        localStorage.setItem("localtask", JSON.stringify(taskObj));

        inputBox.value = "";
        showtask();
    }
})

function showtask(){
    let storedValues = localStorage.getItem("localtask");
    if(storedValues == null){
        taskObj = [];
    }else{
        taskObj = JSON.parse(storedValues);
    }

    let showTaskHtml = "";
    let showTaskUl = document.getElementById('showTaskUl');
    
    taskObj.forEach((item,index) => {
        showTaskHtml += `<li>
        <div class="taskcontent">
            <input type="checkbox" id="checkbox${index}" onclick="checkingCheckBox(${index})">
            <span id="toggleIcon${index}" class="toggle">
                -
            </span>
            <span id="toggleIcon-active${index}" class="toggle-active">
                &#10003;
            </span>
            <label id="inputLabel${index}" class="taskLabel" for="task1">${item}</label>
            
        </div>
        <div class="taskdelete">
            <button onclick="deleteTask(${index})">
                <i class="fa fa-trash-o" style="font-size:15px; color:red"></i>
            </button>
        </div>
    </li>`;
    
    showTaskUl.innerHTML = showTaskHtml;
    });
}

function deleteTask(index){
    let storedValues = localStorage.getItem("localtask");
    let taskObj = JSON.parse(storedValues);

    taskObj.splice(index, 1);
    localStorage.setItem("localtask", JSON.stringify(taskObj));

    showtask();
}

inputBox.addEventListener("input", function(){
    let searchInputValue = inputBox.value.toLowerCase();

    let labels = document.getElementsByTagName("li");
    
    Array.from(labels).forEach(function(task){
        let taskText = task.getElementsByTagName("label")[0].innerHTML;
        let counter = 0;
        let noResult = document.getElementById("noResult");

        if(taskText.toLowerCase().includes(searchInputValue)){
            task.style.display = "flex";
        }else{
            task.style.display = "none";
            // noResult.style.display = "block"
            counter =+ 1;
        }
        
        if(counter == 1){
            console.log(counter);
            document.getElementById("noResult").innerHTML = "No Results Found.";
        }


    })
})

function checkingCheckBox(index) {

    let inputLabelIndex = `inputLabel${index}`
    let checkboxIndex = `checkbox${index}`;
    let toggleIconIndex = `toggleIcon${index}`;
    let toggleIconActiveIndex = `toggleIcon-active${index}`;

    let tasklabel = document.getElementById(inputLabelIndex);
    let checkboxClick = document.getElementById(checkboxIndex);
    let toggleIcon = document.getElementById(toggleIconIndex);
    let toggleIconActive = document.getElementById(toggleIconActiveIndex);

    if(checkboxClick.checked == true){
        tasklabel.style.textDecoration = "line-through";
        toggleIcon.style.display = "none";
        toggleIconActive.style.display = "initial";

    }else{
        tasklabel.style.textDecoration = "none";
        toggleIcon.style.display = "initial";
        toggleIconActive.style.display = "none";
    }
}
