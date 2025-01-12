document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById("task-form");
    const tasksContainer = document.getElementById("tasks-container");
    const openTaskFormBtn = document.getElementById("open-task-form-btn");
    const closeTaskFormBtn = document.getElementById("close-task-form-btn");
    const addTaskBtn = document.getElementById("add-task-btn");
  
    const titleInput = document.getElementById("title-input");
    const dateInput = document.getElementById("date-input");
    const descriptionInput = document.getElementById("description-input");
    const priorityInput = document.getElementById("priority-input");
    const completedInput = document.getElementById("completed-input");
  
    // Cargar tareas desde el almacenamiento local
    let taskData = JSON.parse(localStorage.getItem("tasks")) || [];
  
    // Función para renderizar las tareas
    const renderTasks = () => {
      tasksContainer.innerHTML = ''; // Limpiar tareas
  
      taskData.forEach(task => {
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");
        if (task.completed) {
          taskDiv.classList.add("completed");
        }
        taskDiv.innerHTML = `
          <h3>${task.title}</h3>
          <p><strong>Date:</strong> ${task.date}</p>
          <p><strong>Description:</strong> ${task.description}</p>
          <p><strong>Priority:</strong> ${task.priority}</p>
          <button onclick="toggleCompletion('${task.id}')">Edit Completion</button>
          <button onclick="deleteTask('${task.id}')">Delete</button>
        `;
        tasksContainer.appendChild(taskDiv);
      });
    };
  
    // Función para agregar una nueva tarea
    addTaskBtn.addEventListener("click", () => {
      const task = {
        id: Date.now().toString(),
        title: titleInput.value,
        date: dateInput.value,
        description: descriptionInput.value,
        priority: priorityInput.value,
        completed: completedInput.checked,
      };
  
      taskData.push(task);
      localStorage.setItem("tasks", JSON.stringify(taskData));
  
      renderTasks();
      resetForm();
    });
  
    // Función para eliminar una tarea
    window.deleteTask = (id) => {
      taskData = taskData.filter(task => task.id !== id);
      localStorage.setItem("tasks", JSON.stringify(taskData));
      renderTasks();
    };
  
    // Función para alternar la marca de tarea completada
    window.toggleCompletion = (id) => {
      const task = taskData.find(task => task.id === id);
      task.completed = !task.completed;
      localStorage.setItem("tasks", JSON.stringify(taskData));
      renderTasks();
    };
  
    // Función para resetear el formulario
    const resetForm = () => {
      titleInput.value = '';
      dateInput.value = '';
      descriptionInput.value = '';
      priorityInput.value = 'Low';
      completedInput.checked = false;
      taskForm.style.display = 'none';
    };
  
    // Mostrar el formulario
    openTaskFormBtn.addEventListener("click", () => {
      taskForm.style.display = 'block';
    });
  
    // Cerrar el formulario
    closeTaskFormBtn.addEventListener("click", resetForm);
  
    renderTasks(); // Inicializar la vista con las tareas guardadas
  });
  
