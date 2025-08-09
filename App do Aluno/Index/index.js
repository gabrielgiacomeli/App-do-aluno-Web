// Função para adicionar uma nova categoria
function addCategory() {
    const categoryName = prompt("Digite o nome da categoria:");
    if (categoryName) {
        const categoriesDiv = document.getElementById('categories');

        // Cria um novo elemento de categoria
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'category';

        const categoryTitle = document.createElement('h2');
        categoryTitle.innerHTML = `
            ${categoryName}
            <button class="delete-category-btn">Excluir</button>
        `;

        const taskList = document.createElement('div');
        taskList.className = 'task-list';

        const addTaskBtn = document.createElement('button');
        addTaskBtn.className = 'add-task-btn';
        addTaskBtn.textContent = '+ Adicionar Tarefa';

        // Adiciona o evento de clique ao botão de adicionar tarefa
        addTaskBtn.addEventListener('click', () => addTask(taskList));

        // Adiciona o evento de clique ao botão de excluir categoria
        const deleteBtn = categoryTitle.querySelector('.delete-category-btn');
        deleteBtn.addEventListener('click', () => {
            categoriesDiv.removeChild(categoryDiv);
        });

        // Adiciona os elementos à div da categoria
        categoryDiv.appendChild(categoryTitle);
        categoryDiv.appendChild(taskList);
        categoryDiv.appendChild(addTaskBtn);

        // Adiciona a nova categoria à lista de categorias
        categoriesDiv.appendChild(categoryDiv);
    }
}

// Função para adicionar uma nova tarefa dentro de uma categoria
function addTask(taskList) {
    const taskText = prompt("Digite o nome da tarefa:");
    if (taskText) {
        // Cria um novo elemento de tarefa
        const taskDiv = document.createElement('div');
        taskDiv.className = 'task';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'task-checkbox';

        const label = document.createElement('label');
        label.className = 'task-title';
        label.textContent = taskText;

        // Adiciona o evento para esconder a tarefa quando a checkbox é marcada
        checkbox.addEventListener('change', function () {
            if (this.checked) {
                setTimeout(() => {
                    taskDiv.style.display = 'none';
                }, 500);
            }
        });

        // Adiciona os elementos à div da tarefa
        taskDiv.appendChild(checkbox);
        taskDiv.appendChild(label);

        // Adiciona a nova tarefa à lista de tarefas da categoria
        taskList.appendChild(taskDiv);
    }
}

// Adiciona um evento de clique ao botão "Adicionar Categoria"
document.getElementById('add-category-btn').addEventListener('click', addCategory);