document.addEventListener('DOMContentLoaded', () => {
    const nameInput = document.getElementById('nameInput');
    const timezoneSelect = document.getElementById('timezoneSelect');
    const saveSettingsButton = document.getElementById('saveSettings');

    const savedName = sessionStorage.getItem('userName') || '';
    const savedTimezone = localStorage.getItem('userTimezone') || 'UTC';

    nameInput.value = savedName;
    timezoneSelect.value = savedTimezone;

    saveSettingsButton.addEventListener('click', () => {
        const userName = nameInput.value;
        const selectedTimezone = timezoneSelect.value;

        sessionStorage.setItem('userName', userName);
        localStorage.setItem('userTimezone', selectedTimezone);

        window.location.href = 'app.html';
    });
});

