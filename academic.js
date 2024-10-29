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

document.addEventListener('DOMContentLoaded', () => {
    updateDateTime(); // Call the function once when the DOM is loaded
    setInterval(updateDateTime, 1000); // Update the date every second

    // Countdown setup
    const endDate = new Date("Dec 6, 2024 17:00:00").getTime();

    // Update the countdown every 1 second
    const countdownFunction = setInterval(() => {
        const now = new Date().getTime();
        const distance = endDate - now;

        if (distance >= 0) {
            // Calculate time components
            const months = Math.floor(distance / (1000 * 60 * 60 * 24 * 30.44));
            const weeks = Math.floor((distance % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24 * 7));
            const days = Math.floor((distance % (1000 * 60 * 60 * 24 * 7)) / (1000 * 60 * 60 * 24));
            const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Update each time unit in its respective element
            document.getElementById('countMonths').textContent = formatTime(months);
            document.getElementById('countWeeks').textContent = formatTime(weeks);
            document.getElementById('countDays').textContent = formatTime(days);
            document.getElementById('countHours').textContent = formatTime(hours);
            document.getElementById('countMinutes').textContent = formatTime(minutes);
            document.getElementById('countSeconds').textContent = formatTime(seconds);
        } else {
            // If the countdown is finished, display an expiration message
            clearInterval(countdownFunction);
            document.getElementById('remcount').textContent = "EXPIRED";
        }
    }, 1000);

    // Initial call to set weekday counts
    const startDate = new Date();
    countWeekdays(startDate, endDate);

    // Call countWeekdays function every day at 5 PM
    setInterval(() => {
        const now = new Date();
        const currentHour = now.getHours();
        const currentMinute = now.getMinutes();

        // Check if the current time is 5 PM (17:00)
        if (currentHour === 17 && currentMinute === 0) {
            countWeekdays(now, endDate);
        }
    }, 1000 * 60); // Check every minute
});

// Function to count remaining weekdays from the current date to the endDate
function countWeekdays(startDate, endDate) {
    let mondayCount = 0;
    let tuesdayCount = 0;
    let thursdayCount = 0;
    let fridayCount = 0;

    // Loop through the days from startDate to endDate
    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
        const day = date.getDay(); // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
        switch (day) {
            case 1: // Monday
                mondayCount++;
                break;
            case 2: // Tuesday
                tuesdayCount++;
                break;
            case 4: // Thursday
                thursdayCount++;
                break;
            case 5: // Friday
                fridayCount++;
                break;
        }
    }

    // Display the results in their respective elements using formatTime
    document.getElementById('mondayCount').textContent = formatTime(mondayCount);
    document.getElementById('tuesdayCount').textContent = formatTime(tuesdayCount);
    document.getElementById('thursdayCount').textContent = formatTime(thursdayCount);
    document.getElementById('fridayCount').textContent = formatTime(fridayCount);
}

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

function addCustomCursor() {
    document.body.classList.add('custom-cursor');
}

// Function to remove custom cursor class
function removeCustomCursor() {
    document.body.classList.remove('custom-cursor');
}

// Add event listeners
document.addEventListener('mousedown', addCustomCursor); // Apply custom cursor on mousedown
document.addEventListener('mouseup', removeCustomCursor); // Revert cursor on mouseup
