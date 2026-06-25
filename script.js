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

function validateOrderForm(event) {
    const orderItems = Array.from(document.querySelectorAll('input[name="order-item[]"]'));
    if (!orderItems.some(item => item.checked)) {
        event.preventDefault();
        alert('Please select at least one menu item before placing your order.');
        return false;
    }
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
    }

    const ratingForm = document.querySelector('.rating-form');
    if (ratingForm) {
        ratingForm.addEventListener('submit', handleRatingSubmit);
    }
});
