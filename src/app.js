// app.js
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    applyTheme(savedTheme);

    // Обновление информации о времени и размере окна
    const updateTimeAndSize = () => {
        const currentTimeElement = document.getElementById('current-time');
        const windowSizeElement = document.getElementById('window-size');
        
        if (currentTimeElement) {
            const now = new Date();
            currentTimeElement.textContent = now.toLocaleTimeString();
        }
        
        if (windowSizeElement) {
            windowSizeElement.textContent = `${window.innerWidth}x${window.innerHeight}`;
        }
    };
    
    updateTimeAndSize();
    setInterval(updateTimeAndSize, 1000);
    
    window.addEventListener('resize', updateTimeAndSize);
});