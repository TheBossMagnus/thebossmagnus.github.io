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
});