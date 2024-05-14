
function submitForm(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    const form = document.getElementById('appointmentForm');
    
   
    const selectedServicesInput = document.createElement('input');

    selectedServicesInput.setAttribute('type', 'text');
    selectedServicesInput.setAttribute('name', 'entry.581152475');
    selectedServicesInput.setAttribute('value', selectedServices.join(','));

// Append the new input element to the form
    form.appendChild(selectedServicesInput);
    const formData = new FormData(form);
    const url = 'https://docs.google.com/forms/d/e/1FAIpQLSc99H9vi6mjtPWGR51U4gWPebc6huHJKkL5XW28LCvR7HMZvg/formResponse'; // Replace 'https://example.com/submit' with your form submission URL
    formData.forEach((value, key) => {
    console.log(key, value);
});

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


// Array to store selected services
var selectedServices = [];

// Function to toggle service selection
window.toggleService = function(checkbox) {
    var service = checkbox.value;
    if (checkbox.checked) {
        selectedServices.push(service);
        console.log('Service selected:', service);
    } else {
        var index = selectedServices.indexOf(service);
        if (index !== -1) {
            selectedServices.splice(index, 1);
        }
        console.log('Service deselected:', service);
    }
    updateSelectionBox(); // Update the selection box
};

// Function to update the selection box with selected services

//function updateSelectionBox() {
  //  const checkboxContainer = document.getElementById('checkboxContainer');
    //checkboxContainer.innerHTML = '';

    // Add options for each service in selectedServices array
    //selectedServices.forEach(service => {
      //  const option = document.createElement('option');
       // option.text = service;
       // option.value = service;
       // checkboxContainer.add(option);

//    });
//}
function updateSelectionBox() {
    const selectBox = document.getElementById('checkboxContainer');
    selectBox.innerHTML = ''; // Clear existing options

    // Add options for each service in selectedServices array
    selectedServices.forEach(service => {
        const option = document.createElement('option');
        option.text = service;
        option.value = service;
	option.selected = true;
        option.disabled = true;
        selectBox.add(option);
    });
}