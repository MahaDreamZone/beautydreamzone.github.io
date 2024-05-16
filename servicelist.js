var selectedServices = []; // Array to store selected services
document.addEventListener('DOMContentLoaded', function() {
    var sheetId = '1xkhS8pSlZYJ_R0stEzkw-CAHLSr-JnH4Emm5CeOdh8o';
    var url = 'https://docs.google.com/spreadsheets/d/' + sheetId + '/gviz/tq?tqx=out:json';
    
    fetch(url)
        .then(response => response.text())
        .then(data => {
            var json = JSON.parse(data.substr(47).slice(0, -2));
            var rows = json.table.rows;

            var servicesList = document.getElementById('services-list');
            var servicesInRow = 0;
	    var gridRow;

            rows.forEach((row, index) => {
                if (row.c && row.c.length >= 3) {
                    var service = row.c[0].v;
                    var price = row.c[1].v;
                    var image = row.c[2].v;

                    if (servicesInRow === 0 || servicesInRow % 3 === 0) {
                        gridRow = document.createElement('div');
                        gridRow.className = 'service-item position-relative';
                        servicesList.appendChild(gridRow);
                    }

                    var serviceItem = document.createElement('div');
                    serviceItem.className = 'service-item position-relative';
                    serviceItem.innerHTML = `
			
                        <img class="img-fluid" src="${image}" alt="${service}">
                        <div class="service-text text-center">
			    <h4 class="text-white font-weight-medium px-3">${service}</h4>
                            <p class="text-white px-3 mb-3">$${price}</p>
			    <div class="w-100 bg-white text-center p-4" >
                         	<a class="btn btn-primary" >
                                     <label>
                                         <input type="checkbox" name="services[]" value="${service}" onchange="toggleService(this)">
                                              Add service
                                     </label>
                                </a>
                    	    </div>
                        </div>
                    `;
                    gridRow.appendChild(serviceItem);

                    servicesInRow++;
                } else {
                    console.error('Row does not have the expected number of cells:', row);
                }
            });
        })
        .catch(error => console.error('Error:', error));

window.addAppointment = function() {
        if (selectedServices.length > 0) {
            console.log('Adding appointment with services:', selectedServices);
            // Add code here to add the appointment with the selected services
        } else {
            console.log('Please select at least one service.');
        }
    };

});
