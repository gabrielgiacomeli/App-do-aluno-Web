document.addEventListener('DOMContentLoaded', function() {
    // Elementos do DOM
    const minutesDisplay = document.getElementById('minutes');
    const secondsDisplay = document.getElementById('seconds');
    const startPauseBtn = document.getElementById('startPauseBtn');
    const resetBtn = document.getElementById('resetBtn');
    const workTimeInput = document.getElementById('workTime');
    const breakTimeInput = document.getElementById('breakTime');
    const pomodoroCountDisplay = document.getElementById('pomodoroCount');
    const statusDisplay = document.getElementById('status');
    const taskInput = document.getElementById('taskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const tasksList = document.getElementById('tasks');
    const alarmSound = document.getElementById('alarmSound');
    const container = document.querySelector('.container');

    // Variáveis de estado
    let timer;
    let isRunning = false;
    let isWorkTime = true;
    let timeLeft = 25 * 60; // 25 minutos em segundos
    let pomodoroCount = 0;
    let workDuration = 25;
    let breakDuration = 5;

    // Inicialização
    updateDisplay();
    loadSettings();

    // Event Listeners
    startPauseBtn.addEventListener('click', toggleTimer);
    resetBtn.addEventListener('click', resetTimer);
    workTimeInput.addEventListener('change', updateWorkTime);
    breakTimeInput.addEventListener('change', updateBreakTime);
    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') addTask();
    });

    // Funções
    function toggleTimer() {
        if (isRunning) {
            pauseTimer();
        } else {
            startTimer();
        }
    }

    function startTimer() {
        isRunning = true;
        startPauseBtn.textContent = 'Pausar';
        
        timer = setInterval(() => {
            timeLeft--;
            updateDisplay();
            
            if (timeLeft <= 0) {
                clearInterval(timer);
                alarmSound.play();
                if (isWorkTime) {
                    pomodoroCount++;
                    pomodoroCountDisplay.textContent = pomodoroCount;
                    if (pomodoroCount % 4 === 0) {
                        statusDisplay.textContent = 'Hora de uma pausa longa!';
                    } else {
                        statusDisplay.textContent = 'Hora de uma pausa!';
                    }
                    startBreak();
                } else {
                    statusDisplay.textContent = 'Volte ao trabalho!';
                    startWork();
                }
            }
        }, 1000);
    }

    function pauseTimer() {
        isRunning = false;
        clearInterval(timer);
        startPauseBtn.textContent = 'Continuar';
        statusDisplay.textContent = 'Pausado';
    }

    function resetTimer() {
        clearInterval(timer);
        isRunning = false;
        isWorkTime = true;
        timeLeft = workDuration * 60;
        updateDisplay();
        startPauseBtn.textContent = 'Iniciar';
        statusDisplay.textContent = 'Pronto para começar';
        container.classList.remove('working', 'breaking');
    }

    function startWork() {
        isWorkTime = true;
        timeLeft = workDuration * 60;
        updateDisplay();
        container.classList.remove('breaking');
        container.classList.add('working');
        statusDisplay.textContent = 'Trabalhando';
        startTimer();
    }

    function startBreak() {
        isWorkTime = false;
        timeLeft = breakDuration * 60;
        updateDisplay();
        container.classList.remove('working');
        container.classList.add('breaking');
        startTimer();
    }

    function updateDisplay() {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        
        minutesDisplay.textContent = minutes.toString().padStart(2, '0');
        secondsDisplay.textContent = seconds.toString().padStart(2, '0');
    }

    function updateWorkTime() {
        workDuration = parseInt(workTimeInput.value);
        if (isWorkTime && !isRunning) {
            timeLeft = workDuration * 60;
            updateDisplay();
        }
    }

    function updateBreakTime() {
        breakDuration = parseInt(breakTimeInput.value);
    }

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText) {
            const taskItem = document.createElement('li');
            
            const taskTextSpan = document.createElement('span');
            taskTextSpan.textContent = taskText;
            
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'X';
            deleteBtn.className = 'delete-task';
            deleteBtn.addEventListener('click', function() {
                tasksList.removeChild(taskItem);
            });
            
            taskItem.addEventListener('click', function() {
                taskItem.classList.toggle('completed');
            });
            
            taskItem.appendChild(taskTextSpan);
            taskItem.appendChild(deleteBtn);
            tasksList.appendChild(taskItem);
            
            taskInput.value = '';
        }
    }

    function loadSettings() {
        const savedSettings = JSON.parse(localStorage.getItem('pomodoroSettings'));
        if (savedSettings) {
            workDuration = savedSettings.workDuration || 25;
            breakDuration = savedSettings.breakDuration || 5;
            pomodoroCount = savedSettings.pomodoroCount || 0;
            
            workTimeInput.value = workDuration;
            breakTimeInput.value = breakDuration;
            pomodoroCountDisplay.textContent = pomodoroCount;
            
            if (savedSettings.isWorkTime !== undefined) {
                isWorkTime = savedSettings.isWorkTime;
            }
            
            if (savedSettings.timeLeft) {
                timeLeft = savedSettings.timeLeft;
            }
            
            updateDisplay();
        }
    }

    function saveSettings() {
        const settings = {
            workDuration,
            breakDuration,
            pomodoroCount,
            isWorkTime,
            timeLeft
        };
        localStorage.setItem('pomodoroSettings', JSON.stringify(settings));
    }

    // Salvar configurações quando a página for fechada
    window.addEventListener('beforeunload', saveSettings);
});