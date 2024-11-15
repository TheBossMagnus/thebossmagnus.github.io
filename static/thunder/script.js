document.addEventListener("DOMContentLoaded", function () {
    const tableContainer = document.getElementById("table-container");

    const statusCodes = {
        "exp": "🧪 Experimental",
        "rec": "✅ Recommended",
        "sup": "🟢 Actively supported",
        "lts": "⏳ Long-term support",
        "out": "🔴 Out of support",
        "na": "N/A"
    };

    fetch('https://raw.githubusercontent.com/TheBossMagnus/Thunder/refs/heads/main/versions.json')
        .then(response => response.json())
        .then(fetchedData => {
            fetchedData.forEach(row => {
                Object.keys(row).forEach(key => {
                    if (statusCodes[row[key]]) {
                        row[key] = statusCodes[row[key]];
                    }
                });
            });

            createTableFromJson(fetchedData);

            if (getUrlParameter('embed')) {
                captureTableAsImage();
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            createTableFromJson([{ "Error": "Error fetching data, sorry ):", "Details": error.message }]);
        });

    function createTableFromJson(data) {
        const table = document.createElement("table");
        table.classList.add("table-style");

        const header = table.createTHead();
        const headerRow = header.insertRow();
        Object.keys(data[0]).forEach(key => {
            const th = document.createElement("th");
            th.textContent = key;
            headerRow.appendChild(th);
        });

        const tbody = table.createTBody();
        data.forEach(rowData => {
            const row = tbody.insertRow();
            Object.values(rowData).forEach(cellData => {
                const cell = row.insertCell();
                cell.textContent = cellData;
            });
        });

        tableContainer.appendChild(table);
    }

    function captureTableAsImage() {
        const originalBackgroundColor = tableContainer.style.backgroundColor;
        tableContainer.style.backgroundColor = '#26292f';
    
        html2canvas(document.querySelector("#table-container")).then(canvas => {
            tableContainer.innerHTML = '';
            tableContainer.appendChild(canvas);
            tableContainer.style.backgroundColor = originalBackgroundColor;
    
            // Convert canvas to data URL
            const dataURL = canvas.toDataURL("image/png");
    
            // Create a link element to download the image
            const link = document.createElement('a');
            link.href = dataURL;
            link.download = 'table.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }).catch(error => {
            console.error('Error capturing table as image:', error);
            tableContainer.style.backgroundColor = originalBackgroundColor;
        });
    }

    function getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        const regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
        const results = regex.exec(location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    }
});