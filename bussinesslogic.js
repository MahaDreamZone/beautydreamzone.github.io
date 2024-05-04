
function submitForm(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    const form = document.getElementById('appointmentForm');
    const formData = new FormData(form);
    const url = 'https://docs.google.com/forms/d/e/1FAIpQLSc99H9vi6mjtPWGR51U4gWPebc6huHJKkL5XW28LCvR7HMZvg/formResponse'; // Replace 'https://example.com/submit' with your form submission URL


    fetch(url, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            alert('Appointment booked successfully!');
            form.reset(); // Reset the form after successful submission
        } else {
            alert('Failed to book appointment. Please try again.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
    alert('Appointment booked successfully!');
    form.reset(); // Reset the form after successful submission
}

// Attach the submitForm function to the form's submit event
document.getElementById('appointmentForm').addEventListener('submit', submitForm);

