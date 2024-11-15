const STATUS_CODES = {
    "exp": "🧪 Experimental",
    "rec": "✅ Recommended", 
    "sup": "🟢 Actively supported",
    "lts": "⏳ Long-term support",
    "out": "🔴 Out of support",
    "na": "N/A"
};


function processStatusCodes(data) {
    return data.map(row => {
        const processedRow = {...row};
        Object.keys(processedRow).forEach(key => {
            if (STATUS_CODES[processedRow[key]]) {
                processedRow[key] = STATUS_CODES[processedRow[key]];
            }
        });
        return processedRow;
    });
}


function createTableHeader(data) {
    const header = document.createElement('thead');
    const headerRow = header.insertRow();
    
    Object.keys(data).forEach(key => {
        const th = document.createElement('th');
        th.textContent = key;
        headerRow.appendChild(th);
    });
    
    return header;
}

function createTableBody(data) {
    const tbody = document.createElement('tbody');
    
    data.forEach(rowData => {
        const row = tbody.insertRow();
        Object.values(rowData).forEach(cellData => {
            const cell = row.insertCell();
            cell.textContent = cellData;
        });
    });
    
    return tbody;
}


function createTable(data) {
    const table = document.createElement('table');
    table.classList.add('table-style');
    
    table.appendChild(createTableHeader(data[0]));
    table.appendChild(createTableBody(data));
    
    return table;
}


async function initializeVersionTable(container) {
    try {
        const response = await fetch('https://raw.githubusercontent.com/TheBossMagnus/Thunder/refs/heads/main/versions.json');
        const data = await response.json();
        const processedData = processStatusCodes(data);
        
        const table = createTable(processedData);
        container.appendChild(table);
    } catch (error) {
        console.error('Error fetching data:', error);
        const errorTable = createTable([{
            "Error": "Error fetching data",
            "Details": error.message
        }]);
        container.appendChild(errorTable);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const tableContainer = document.getElementById('table-container');
    initializeVersionTable(tableContainer);
});