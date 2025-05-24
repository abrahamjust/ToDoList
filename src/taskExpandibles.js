export {Task}

const Task = document.querySelectorAll('.Task');

Task.forEach(Task => {
    Task.addEventListener('click', () => {
        Task.classList.toggle('active');
    });
});