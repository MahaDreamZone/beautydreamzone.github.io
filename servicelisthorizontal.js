// Declare selectedServices in the global scope
var selectedServices = [];

document.addEventListener('DOMContentLoaded', function() {
    var sheetId = '1xkhS8pSlZYJ_R0stEzkw-CAHLSr-JnH4Emm5CeOdh8o';
    var url = 'https://docs.google.com/spreadsheets/d/' + sheetId + '/gviz/tq?tqx=out:json';
	
    var gridRow = document.createElement('services-list');

    fetch(url)
        .then(response => response.text())
        .then(data => {
            var json = JSON.parse(data.substr(47).slice(0, -2));
            var rows = json.table.rows;

            rows.forEach((row, index) => {
                if (row.c && row.c.length >= 3) {
                    var service = row.c[0].v;
                    var price = row.c[1].v;
                    var image = row.c[2].v;
                    var about = row.c[3].v;

                    var serviceItem = document.createElement('div');
                    serviceItem.className = 'service-item position-relative';
                    serviceItem.innerHTML = `
                        <img class="img-fluid" src="${image}" alt="${service}">
                        <div class="service-text text-center service-grid-overlay">
                            <h4 class="text-white font-weight-medium px-3">${service}</h4>
                            <p class="text-white px-3 mb-3">${about}</p>
                            <label>
                                <input type="checkbox" name="services[]" value="${service}" onchange="toggleService(this)">
                                Add service
                            </label>
                        </div>
                    `;
                    gridRow.appendChild(serviceItem);

                } else {
                    console.error('Row does not have the expected number of cells:', row);
                }
            });
            document.getElementById('services-list').appendChild(gridRow);
        })
        .catch(error => console.error('Error:', error));

    window.toggleService = function(checkbox) {
        var service = checkbox.value;
        if (checkbox.checked) {
            selectedServices.push(service);
            console.log('Selected Services:', selectedServices);

        } else {
            var index = selectedServices.indexOf(service);
            if (index !== -1) {
                selectedServices.splice(index, 1);
            }
        }
        console.log('Selected Services:', selectedServices);
        
        // Update the content of the 'selected-services' div
        var selectedServicesDiv = document.getElementById('selected-services');
        selectedServicesDiv.innerHTML = '<strong>Selected Services:</strong> ' + selectedServices.join(', ');
    };
});

function onTouchStart(event) {
    if (event.target) {
        event.target.style.transition = 'transform 0.2s';
        event.target.style.transform = 'scale(0.95)';
    }
}

function onTouchEnd(event) {
    if (event.target) {
        event.target.style.transition = 'transform 0.2s';
        event.target.style.transform = 'scale(1)';
    }
}

document.addEventListener('touchstart', onTouchStart, { passive: true });
document.addEventListener('touchend', onTouchEnd, { passive: true });
