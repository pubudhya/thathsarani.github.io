document.addEventListener('DOMContentLoaded', function() {
  // Connect your form elements and set event listeners
  const ticketForm = document.getElementById('ticketForm');
  const userDetailsForm = document.getElementById('userDetailsForm');
  const summaryTable = document.getElementById('summaryTable');

  // Event listeners
  ticketForm.addEventListener('change', updateSummaryTable);
  userDetailsForm.addEventListener('change', updateSummaryTable);
  paymentForm.addEventListener('change', updateSummaryTable);

  // Calculate charges and update summary table initially
  calculateCharges();
  updateSummaryTable();
});

function calculateCharges() {
  // Implement your charge calculation logic here
}

function updateSummaryTable() {
  // Update summary table based on user inputs
  const summaryTable = document.getElementById('summaryTable');
  summaryTable.innerHTML = ''; // Clear previous content

  // Add rows to the summary table
  const rows = [
    ['SL Adult', '$12', '2'],
   ['SL Child','$4','4'],
  ];

  for (const row of rows) {
    const newRow = summaryTable.insertRow();
    for (const cellValue of row) {
      const newCell = newRow.insertCell();
      newCell.textContent = cellValue;
    }
  }
}
