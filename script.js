function toggleMenu() {
    const nav = document.querySelector('nav ul');
    if (nav.style.display === 'flex' || nav.style.display === 'block') {
        nav.style.display = 'none';
    } else {
        nav.style.display = 'block';
    }
}

window.addEventListener('resize', function() {
    const nav = document.querySelector('nav ul');
    if (window.innerWidth > 760) {
        nav.style.display = 'flex';
    }
});
function toggleEventType() {
            const reservationType = document.getElementById('reservation-type').value;
            const eventTypeSection = document.getElementById('event-type-section');
            const eventTypeSelect = document.getElementById('event-type');
            
            if (reservationType === 'event') {
                eventTypeSection.style.display = 'block';
                eventTypeSelect.required = true;
            } else {
                eventTypeSection.style.display = 'none';
                eventTypeSelect.required = false;
            }
        }
