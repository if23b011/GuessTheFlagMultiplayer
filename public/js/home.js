//toast error message
const urlParams = new URLSearchParams(window.location.search);
const error = urlParams.get('error');

if (error === 'game-not-found') {
    const toastPlacement = document.getElementById('toast-placement');
    const toastEl = document.createElement('div');
    toastEl.classList.add('toast');
    toastEl.setAttribute('role', 'alert');
    toastEl.setAttribute('aria-live', 'assertive');
    toastEl.setAttribute('aria-atomic', 'true');
    toastEl.innerHTML = `
        <div class="toast-header">
            <strong class="me-auto">Error</strong>
            <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
        </div>
        <div class="toast-body">
            Game not found! Check the Game ID and try again.
        </div>
    `;
    toastPlacement.appendChild(toastEl);
    var toast = new bootstrap.Toast(toastEl);
    toast.show();
}