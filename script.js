
const btn = document.getElementById('closeButton');
const minbtn = document.getElementById('minimizeButton');

btn.addEventListener('click', () => {
    window.electronAPI.closeApp(); // Call the bridge function
});

minbtn.addEventListener('click', () => {
    window.electronAPI.minimizeApp(); // Call the bridge function
});