const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");


async function fetchTasks() {
    return new Promise((resolve) => {
        setTimeout(() => {
            let storedData = localStorage.getItem("data");
            if (storedData) {
                listContainer.innerHTML = storedData;
            }
            resolve();
        }, 1000);
    });
}

async function addTask() {
    if (inputBox.value.trim() === '') {
        alert("You must write something!");
        return;
    }

    let taskText = inputBox.value.trim();
    inputBox.value = "";

    console.log("Adding task...");

    await new Promise((resolve) => {
        setTimeout(() => {
            let li = document.createElement("li");
            li.innerHTML = taskText;
            listContainer.appendChild(li);

            let span = document.createElement("span");
            span.innerHTML = "\u00d7";
            li.appendChild(span);

            saveData();
            console.log(`Task "${taskText}" added!`);
            resolve();
        }, 1500);
    });
}


async function deleteTask(taskElement) {
    console.log("Deleting task...");
    
    await new Promise((resolve) => {
        setTimeout(() => {
            taskElement.remove();
            saveData();
            console.log("Task deleted!");
            resolve();
        }, 1000);
    });
}


listContainer.addEventListener("click", async function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        await deleteTask(e.target.parentElement);
    }
});


async function saveData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            localStorage.setItem("data", listContainer.innerHTML);
            resolve();
        }, 500);
    });
}


fetchTasks();
