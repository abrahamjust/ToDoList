export {Task}

const Task = document.querySelectorAll('.Task');

// adds class 'active' if it doesnt have it. If it has it, it removes the class 'active'
Task.forEach(Task => {
    Task.addEventListener('click', () => {
        Task.classList.toggle('active');
    });
});