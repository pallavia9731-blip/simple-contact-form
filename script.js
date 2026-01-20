const contactForm = document.getElementById('contactForm');
const tableBody = document.getElementById('tableBody');

// 1. Listen for Form Submission
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    // --- UPDATED VALIDATION ---
    // This checks if the email ends exactly with @gmail.com
    if (!email.toLowerCase().endsWith('@gmail.com')) {
        alert("Only @gmail.com email addresses are allowed.");
        return; // Stops the function here
    }

    const newEntry = { name, email, message };

    const entries = JSON.parse(localStorage.getItem('myEntries')) || [];
    entries.push(newEntry);
    localStorage.setItem('myEntries', JSON.stringify(entries));
    
    this.reset();
    renderTable();
});

// 2. Function to draw the table
function renderTable() {
    tableBody.innerHTML = ''; 
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
    entries.splice(index, 1);
    localStorage.setItem('myEntries', JSON.stringify(entries));
    renderTable();
}

window.onload = renderTable;
