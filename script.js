const inputbox = document.getElementById("input-box");
const listcontainer = document.getElementById("list-container");

function addTask() {
    if (inputbox.value === '') {
        alert("You have to write something");
    } else {
        if (listcontainer.childElementCount >= 10) {  // Limit to 10 tasks
            alert("The to-do list is full!");
            listcontainer.style.overflowY = "scroll";  // Add scroll when full
            return;
        }

        let li = document.createElement("li");
        li.innerHTML = inputbox.value;
        listcontainer.appendChild(li);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7";  // Add a close button (x)
        li.appendChild(span);
    }

    inputbox.value = "";
    saveData();
}

// Allow adding tasks by pressing Enter
inputbox.addEventListener("keypress", function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

listcontainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }
}, false);

function saveData() {
    localStorage.setItem("data", listcontainer.innerHTML);
}

function showTask() {
    listcontainer.innerHTML = localStorage.getItem("data");
}

showTask();
