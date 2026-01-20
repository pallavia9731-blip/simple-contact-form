const contactForm = document.getElementById('contactForm');
const tableBody = document.getElementById('tableBody');

// 1. Listen for Form Submission
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const newEntry = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value
    };

    const entries = JSON.parse(localStorage.getItem('myEntries')) || [];
    entries.push(newEntry);
    localStorage.setItem('myEntries', JSON.stringify(entries));
    
    this.reset();
    renderTable(); // Redraw the table
});

// 2. Function to draw the table
function renderTable() {
    tableBody.innerHTML = ''; // Clear current table
    const entries = JSON.parse(localStorage.getItem('myEntries')) || [];

    entries.forEach((entry, index) => {
        const row = tableBody.insertRow();
        row.innerHTML = `
            <td>${entry.name}</td>
            <td>${entry.email}</td>
            <td>${entry.message}</td>
            <td><button class="delete-btn" onclick="deleteEntry(${index})">Delete</button></td>
        `;
    });
}

// 3. Function to delete an entry
function deleteEntry(index) {
    let entries = JSON.parse(localStorage.getItem('myEntries')) || [];
    entries.splice(index, 1); // Remove the item at the clicked index
    localStorage.setItem('myEntries', JSON.stringify(entries)); // Save back to storage
    renderTable(); // Redraw the table
}

// 4. Initial load
window.onload = renderTable;