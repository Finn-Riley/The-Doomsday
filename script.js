function updateDateTime() {
    const dateTimeElement = document.getElementById('dateTime');
    const now = new Date();
    const dayOfWeek = now.toLocaleDateString('en-US', { weekday: 'long' });
    const dateString = now.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    dateTimeElement.textContent = `${dayOfWeek}, ${dateString}`;
}

document.addEventListener('DOMContentLoaded', (event) => {
    updateDateTime(); // Call the function once when the DOM is loaded

    // Optionally, you can update the date every second (if needed)
    setInterval(updateDateTime, 1000);
});

document.addEventListener('DOMContentLoaded', (event) => {
    const countdownElement = document.getElementById('countdown');

    // Set the date we're counting down to
    const endDate = new Date("Dec 30, 2024 00:00:00").getTime();

    // Update the countdown every 1 second
    const countdownFunction = setInterval(() => {
        // Get today's date and time
        const now = new Date().getTime();

        // Find the distance between now and the end date
        const distance = endDate - now;

        // Time calculations for days, hours, minutes and seconds
        let days = Math.floor(distance / (1000 * 60 * 60 * 24));
        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Ensure each time unit is always displayed with two digits
        days = formatTime(days);
        hours = formatTime(hours);
        minutes = formatTime(minutes);
        seconds = formatTime(seconds);

        // Display the result in the element
        countdownElement.textContent = `${days}:${hours}:${minutes}:${seconds}`;

        // If the countdown is finished, write some text
        if (distance < 0) {
            clearInterval(countdownFunction);
            countdownElement.textContent = "EXPIRED";
        }
    }, 1000);
});

// Function to format time units to always display two digits
function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

// Function to detect if the user is on a mobile device
function detectMobileDevice() {
    var userAgent = navigator.userAgent.toLowerCase();
    return /iphone|ipad|android/.test(userAgent);
}

// Function to display a notification if user is on a mobile device
function notifyMobileUser() {
    if (detectMobileDevice()) {
        alert("You are viewing this page on a mobile device. For the best experience, please consider using a desktop or turning on desktop site. - Drew :>");
    }
}

// Call notifyMobileUser function when the window loads
window.onload = function() {
    notifyMobileUser();
};

