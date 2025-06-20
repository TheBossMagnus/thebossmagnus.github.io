const STATUS_CODES = {
    "exp": "🧪 Experimental",
    "rec": "✅ Recommended", 
    "sup": "🟢 Actively supported",
    "leg": "⏳ Legacy",
    "out": "⚠️ Out of support",
    "na":  "🔴 Not Available"
};

const urlParams = new URLSearchParams(window.location.search);
const isEmbed = urlParams.has('embed');
let showAllVersions = false;

function filterDataForReducedMode(data) {
    return data.filter(row => {
        return !Object.values(row).every((value, index) => {
            if (index === 0) return true;
            return value === STATUS_CODES.na || value === STATUS_CODES.out;
        });
    });
}

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
        Object.entries(rowData).forEach(([key, cellData]) => {
            const cell = row.insertCell();
            if (!isEmbed && cellData !== STATUS_CODES.exp && cellData !== STATUS_CODES.na && key !== 'Minecraft Version') {
                const minecraftVersion = rowData['Minecraft Version'];
                const url = `https://modrinth.com/modpack/thunder/versions?g=${encodeURIComponent(minecraftVersion)}&l=${encodeURIComponent(key).toLowerCase()}`;
                const link = document.createElement('a');
                link.href = url;
                link.textContent = cellData;
                cell.appendChild(link);
                // Add 'link-cell' class to cells with links
                cell.classList.add('link-cell');
            } else {
                cell.textContent = cellData;
            }
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
        
        const fetchedData = processedData;
        let filteredData = showAllVersions ? fetchedData : filterDataForReducedMode(fetchedData);

        const table = createTable(filteredData);
        container.appendChild(table);

        if (!isEmbed) {
            // Show explanation when not embedded
            document.getElementById('version-explanation').style.display = 'block';
            document.body.classList.add('centered');
            const switchModeButton = document.createElement('button');
            switchModeButton.textContent = 'Hide unsupported versions';
            switchModeButton.addEventListener('click', () => {
                showAllVersions = !showAllVersions;
                switchModeButton.textContent = showAllVersions ? 'Hide unsupported versions' : 'Show unsupported versions';
                container.innerHTML = '';
                const newData = showAllVersions ? fetchedData : filterDataForReducedMode(fetchedData);
                const newTable = createTable(newData);
                container.appendChild(newTable);
            });
            container.parentNode.insertBefore(switchModeButton, container.nextSibling);
        } else {
            // Hide explanation when embedded
            document.getElementById('version-explanation').style.display = 'none';
        }
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