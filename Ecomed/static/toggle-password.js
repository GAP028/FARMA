document.addEventListener('DOMContentLoaded', function () {
    const togglePasswordIcons = document.querySelectorAll('.toggle-password');

    togglePasswordIcons.forEach(function(icon) {
        icon.addEventListener('click', function() {
            const targetInput = document.querySelector(`#${this.getAttribute('data-target')}`);
            const inputType = targetInput.getAttribute('type');

            // Toggle the password visibility
            if (inputType === 'password') {
                targetInput.setAttribute('type', 'text');
                this.classList.remove('fa-eye');
                this.classList.add('fa-eye-slash');
            } else {
                targetInput.setAttribute('type', 'password');
                this.classList.remove('fa-eye-slash');
                this.classList.add('fa-eye');
            }
        });
    });
});
