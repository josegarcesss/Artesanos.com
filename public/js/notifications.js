document.addEventListener('DOMContentLoaded', () => {
  const userId = document.body.getAttribute('data-user-id');
  if (!userId) return;
  
  const socket = io();
  socket.emit('registerUser', userId);
  
  socket.on('newNotification', (message) => {
    updateNotificationCount();
    showToast(message);
  });
});

function updateNotificationCount() {
  const notificationCount = document.getElementById('notification-count');
  if (notificationCount) {
    let currentCount = parseInt(notificationCount.textContent) || 0;
    notificationCount.textContent = currentCount + 1;
  }
}

function showToast(message) {
  let toastContainer = document.getElementById('toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.id = 'toast-container';
    document.body.appendChild(toastContainer);
  }
  
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  
  toastContainer.appendChild(toast);
  
  setTimeout(() => {
    toast.style.opacity = '0';
  }, 3000);
  
  setTimeout(() => {
    toast.remove();
  }, 4000);
}
