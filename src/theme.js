// theme.js
function applyTheme(themeName) {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;

    if (themeName === 'dark') {
        document.body.classList.remove('light-background');
        document.body.classList.add('dark-background');
    } else {
        document.body.classList.add('light-background');
        document.body.classList.remove('dark-background');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    const themeSwitch = document.getElementById('themeSwitch');
    if (themeSwitch) {
        themeSwitch.checked = savedTheme === 'dark'; // Correctly set checkbox state

        themeSwitch.addEventListener('change', (event) => {
            const theme = event.target.checked ? 'dark' : 'light';
            applyTheme(theme);
        });
    }
});