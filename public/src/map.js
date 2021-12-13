var mymap = L.map('map').setView([51.05, -114.11], 13);
    
L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
        maxZoom: 20,
        subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    }).addTo(mymap);

const m1 = L.marker([51.05, -114.11]).addTo(mymap).
                bindPopup("<b>Supplier 1</b><br />Hours: 24hrs");
m1._icon.classList.add("huechange");
m1.on('mouseover', function (e) { this.openPopup(); });
m1.on('mouseout', function (e) { this.closePopup(); });


const m2 = L.marker([51.053, -114.13]).addTo(mymap).
                bindPopup("<b>Supplier 2</b><br />Hours: 9am - 11pm");
m2.on('mouseover', function (e) { this.openPopup(); });
m2.on('mouseout', function (e) { this.closePopup(); });
m2._icon.classList.add("huechange");

const m3 = L.marker([51.055, -114.09]).addTo(mymap).
                bindPopup("<b>Supplier 3</b><br />Hours: 2pm - 4am");
m3.on('mouseover', function (e) { this.openPopup(); });
m3.on('mouseout', function (e) { this.closePopup(); });
m3._icon.classList.add("huechange");


