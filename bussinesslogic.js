
function submitFormAndShowPopup() {
    // Set the values of the form fields
    document.getElementById('entry.Name').value = document.getElementById('name').value;
    document.getElementById('entry.Phone_Number').value = document.getElementById('phone').value;
    document.getElementById('entry.Date').value = document.getElementById('date').value;
    document.getElementById('entry.Time').value = document.getElementById('time').value;

    // Submit the form to Google Form
    document.getElementById('1FAIpQLSdrmeNCfAmtyScsmh_mW9fWYP0twNGXYf4OstMQUAaMQ9G3SA').action = 'https://docs.google.com/forms/d/e/1FAIpQLSdrmeNCfAmtyScsmh_mW9fWYP0twNGXYf4OstMQUAaMQ9G3SA/formResponse';
    document.getElementById('1FAIpQLSdrmeNCfAmtyScsmh_mW9fWYP0twNGXYf4OstMQUAaMQ9G3SA').submit();
    
    // Show a popup message
    alert('Appointment booked!');
}
