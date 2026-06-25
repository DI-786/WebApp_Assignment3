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
