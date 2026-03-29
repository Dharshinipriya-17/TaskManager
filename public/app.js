const API_URL = '/api/tasks';

const taskForm = document.getElementById('task-form');
const taskTitle = document.getElementById('task-title');
const taskDesc = document.getElementById('task-desc');
const tasksGrid = document.getElementById('tasks-grid');
const totalTasksElem = document.getElementById('total-tasks');
const submitBtn = document.getElementById('submit-btn');

document.addEventListener('DOMContentLoaded', fetchTasks);

async function fetchTasks() {
    try {
        const res = await fetch(API_URL);
        const tasks = await res.json();
        renderTasks(tasks);
    } catch (error) {
        tasksGrid.innerHTML = `<div class="loading" style="color:#ef4444">Failed to load tasks! Make sure the server is running.</div>`;
        console.error('Error fetching tasks:', error);
    }
}

function renderTasks(tasks) {
    tasksGrid.innerHTML = '';
    totalTasksElem.textContent = tasks.length;

    if (tasks.length === 0) {
        tasksGrid.innerHTML = `<div style="text-align:center; padding: 2rem; color: var(--text-muted)">You have no tasks yet. Add one above!</div>`;
        return;
    }

    tasks.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));

    tasks.forEach((task, index) => {
        const isCompleted = task.status === 'completed';
        const date = new Date(task.created_at).toLocaleDateString('en-US', {
            month: 'short', day: 'numeric', year: 'numeric'
        });

        const delay = index * 0.1;

        const card = document.createElement('div');
        card.className = `task-card ${isCompleted ? 'is-completed' : ''}`;
        card.style.animationDelay = `${delay}s`;

        card.innerHTML = `
            <div class="status-badge ${task.status}">${task.status.replace('-', ' ')}</div>
            <h3>${task.title}</h3>
            <p>${task.description}</p>
            <div class="date-created"><i class="ri-calendar-line"></i> Added on ${date}</div>
            
            <div class="card-actions">
                <select class="status-dropdown" onchange="updateStatus('${task._id}', this.value)">
                    <option value="pending" ${task.status === 'pending' ? 'selected' : ''}>Pending</option>
                    <option value="in-progress" ${task.status === 'in-progress' ? 'selected' : ''}>In Progress</option>
                    <option value="completed" ${task.status === 'completed' ? 'selected' : ''}>Completed</option>
                </select>
                
                <button class="btn-icon" onclick="deleteTask('${task._id}')" title="Delete Task">
                    <i class="ri-delete-bin-line"></i>
                </button>
            </div>
        `;

        tasksGrid.appendChild(card);
    });
}

taskForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = `<span>Adding...</span> <i class="ri-loader-4-line ri-spin"></i>`;
    submitBtn.disabled = true;

    const newTask = {
        title: taskTitle.value,
        description: taskDesc.value
    };

    try {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newTask)
        });

        if (res.ok) {
            taskTitle.value = '';
            taskDesc.value = '';
            await fetchTasks();
        }
    } catch (error) {
        console.error('Error creating task:', error);
    } finally {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }
});

window.updateStatus = async (id, newStatus) => {
    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus })
        });

        if (res.ok) {
            fetchTasks();
        }
    } catch (error) {
        console.error('Error updating status:', error);
    }
};

window.deleteTask = async (id) => {
    if (!confirm('Are you sure you want to delete this task?')) return;

    try {
        const res = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE'
        });

        if (res.ok) {
            fetchTasks();
        }
    } catch (error) {
        console.error('Error deleting task:', error);
    }
};
