const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, 'data.json');

function loadData() {
    if (fs.existsSync(dataPath)) {
        return JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    } else {
        return { panel1: [], panel2: [], panel3: [], panel4: [] };
    }
}

function saveData(data) {
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

let tasks = loadData();

function renderTasks(panelId) {
    const ul = document.getElementById(`tasks${panelId}`);
    ul.innerHTML = '';
    tasks[`panel${panelId}`].forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `<input type="checkbox" ${task.done ? 'checked' : ''}> ${task.name}`;
        li.querySelector('input').addEventListener('change', (e) => {
            tasks[`panel${panelId}`][index].done = e.target.checked;
            saveData(tasks);
        });
        ul.appendChild(li);
    });
}

for (let i = 1; i <= 4; i++) {
    renderTasks(i);
}
