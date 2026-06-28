function toggleMenu() {
    const nav = document.querySelector('nav ul');
    if (!nav) return;
    if (nav.style.display === 'flex' || nav.style.display === 'block') {
        nav.style.display = 'none';
    } else {
        nav.style.display = 'block';
    }
}

window.addEventListener('resize', function() {
    const nav = document.querySelector('nav ul');
    if (!nav) return;
    if (window.innerWidth > 760) {
        nav.style.display = 'flex';
    }
});

function toggleEventType() {
    const reservationType = document.getElementById('reservation-type');
    const eventTypeSection = document.getElementById('event-type-section');
    const eventTypeSelect = document.getElementById('event-type');
    if (!reservationType || !eventTypeSection || !eventTypeSelect) return;

    if (reservationType.value === 'event') {
        eventTypeSection.style.display = 'block';
        eventTypeSelect.required = true;
    } else {
        eventTypeSection.style.display = 'none';
        eventTypeSelect.required = false;
        eventTypeSelect.value = '';
    }
}

const ORDER_START_HOUR = 10;
const ORDER_END_HOUR = 21;
const RESERVATION_START_HOUR = 9;
const RESERVATION_END_HOUR = 21;
const THEME_STORAGE_KEY = 'sweet-home-theme';

function isTimeAllowed(timeValue, startHour, endHour) {
    if (!timeValue) return false;
    const [hour, minute] = timeValue.split(':').map(Number);
    if (Number.isNaN(hour) || Number.isNaN(minute)) return false;
    const totalMinutes = hour * 60 + minute;
    return totalMinutes >= startHour * 60 && totalMinutes <= endHour * 60;
}

function validateOrderTime() {
    const now = new Date();
    const currentMinutes = now.getHours() * 60 + now.getMinutes();
    const startMinutes = ORDER_START_HOUR * 60;
    const endMinutes = ORDER_END_HOUR * 60;
    return currentMinutes >= startMinutes && currentMinutes <= endMinutes;
}

function setTheme(theme) {
    const body = document.body;
    const toggleButton = document.getElementById('theme-toggle');
    if (theme === 'dark') {
        body.classList.add('dark-mode');
        if (toggleButton) toggleButton.textContent = 'Light Mode';
    } else {
        body.classList.remove('dark-mode');
        if (toggleButton) toggleButton.textContent = 'Dark Mode';
    }
}

function toggleTheme() {
    const isDark = document.body.classList.contains('dark-mode');
    const nextTheme = isDark ? 'light' : 'dark';
    setTheme(nextTheme);
    localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
}

function initTheme() {
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === 'dark' || savedTheme === 'light') {
        setTheme(savedTheme);
        return;
    }
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(prefersDark ? 'dark' : 'light');
}

function createThemeToggle() {
    const headerContainer = document.querySelector('header .container-fluid');
    if (!headerContainer || document.getElementById('theme-toggle')) return;

    const toggleButton = document.createElement('button');
    toggleButton.type = 'button';
    toggleButton.id = 'theme-toggle';
    toggleButton.className = 'theme-toggle';
    toggleButton.textContent = 'Dark Mode';
    toggleButton.addEventListener('click', toggleTheme);

    headerContainer.appendChild(toggleButton);
}

function updateOrderAvailability() {
    const statusMessage = document.getElementById('order-availability-message');
    const orderSubmit = document.querySelector('#order-form input[type="submit"]');
    if (!statusMessage || !orderSubmit) return;

    if (!validateOrderTime()) {
        statusMessage.textContent = 'Online ordering is currently closed. Orders are accepted daily from 10:00 to 21:00.';
        statusMessage.classList.add('closed');
        orderSubmit.disabled = true;
    } else {
        statusMessage.textContent = 'Online ordering is currently open. You can place your order now.';
        statusMessage.classList.remove('closed');
        orderSubmit.disabled = false;
    }
}

function clearOrderForm() {
    const orderForm = document.getElementById('order-form');
    if (!orderForm) return;
    orderForm.reset();
}

function clearReservationForm() {
    const reservationForm = document.getElementById('reservation-form');
    if (!reservationForm) return;
    reservationForm.reset();
    toggleEventType();
}

function showSuccessMessage(messageId, text) {
    const messageElement = document.getElementById(messageId);
    if (!messageElement) return;
    messageElement.textContent = text;
    messageElement.style.display = 'block';
    setTimeout(() => {
        messageElement.textContent = '';
        messageElement.style.display = 'none';
    }, 8000);
}

function validateOrderForm(event) {
    const orderItems = Array.from(document.querySelectorAll('input[name="order-item[]"]'));
    if (!orderItems.some(item => item.checked)) {
        event.preventDefault();
        alert('Please select at least one menu item before placing your order.');
        return false;
    }

    if (!validateOrderTime()) {
        event.preventDefault();
        alert('Online ordering is only available between 10:00 and 21:00. Please place your order during those hours.');
        return false;
    }

    event.preventDefault();
    clearOrderForm();
    showSuccessMessage('order-success-message', 'Thank you! Your food order has been placed and will be delivered soon.');
    updateOrderAvailability();
    return true;
}

function validateReservationForm(event) {
    const reservationTime = document.getElementById('time');
    const reservationDate = document.getElementById('date');
    if (!reservationTime || !reservationDate) return;

    if (!isTimeAllowed(reservationTime.value, RESERVATION_START_HOUR, RESERVATION_END_HOUR)) {
        event.preventDefault();
        alert('Reservations are accepted only between 09:00 and 21:00. Please choose a time within these hours.');
        return false;
    }

    const selectedDate = new Date(`${reservationDate.value}T${reservationTime.value}`);
    const now = new Date();
    if (selectedDate < now) {
        event.preventDefault();
        alert('Please choose a future date and time for your reservation.');
        return false;
    }

    event.preventDefault();
    clearReservationForm();
    showSuccessMessage('reservation-success-message', 'Your reservation has been made. We look forward to seeing you!');
    return true;
}

function handleRatingSubmit(event) {
    event.preventDefault();
    const selectedRating = document.querySelector('input[name="rating"]:checked');
    if (!selectedRating) {
        alert('Please select a star rating before submitting.');
        return;
    }
    alert(`Thank you for rating us ${selectedRating.value} star${selectedRating.value === '1' ? '' : 's'}!`);
    event.target.reset();
}

document.addEventListener('DOMContentLoaded', function() {
    const nav = document.querySelector('nav ul');
    if (nav && window.innerWidth > 760) {
        nav.style.display = 'flex';
    }

    const reservationType = document.getElementById('reservation-type');
    if (reservationType) {
        reservationType.addEventListener('change', toggleEventType);
        toggleEventType();
    }

    const orderForm = document.querySelector('form[action="submit_order.php"]');
    if (orderForm) {
        orderForm.addEventListener('submit', validateOrderForm);
        updateOrderAvailability();
    }

    const reservationForm = document.querySelector('form[action="submit_reservation.php"]');
    if (reservationForm) {
        reservationForm.addEventListener('submit', validateReservationForm);
    }

    createThemeToggle();
    initTheme();

    const ratingForm = document.querySelector('.rating-form');
    if (ratingForm) {
        ratingForm.addEventListener('submit', handleRatingSubmit);
    }
});
