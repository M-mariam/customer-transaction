document.addEventListener('DOMContentLoaded', () => {
    const customerTable = document.getElementById('customerTable').getElementsByTagName('tbody')[0];
    const searchInput = document.getElementById('search');
    let customers = [];
    let transactions = [];
  
    // Fetch customers data
    fetch('http://localhost:3000/api/customers')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch customers data');
        }
        return response.json();
      })
      .then(data => {
        customers = data;
  
        // Fetch transactions data
        return fetch('http://localhost:3000/api/transactions');
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch transactions data');
        }
        return response.json();
      })
      .then(data => {
        transactions = data;
  
        // Display data after fetching both datasets
        displayData();
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  
    // Function to display data in the table
    function displayData(filter = '') {
      customerTable.innerHTML = ''; // Clear previous table content
      const filteredTransactions = transactions.filter(transaction => {
        const customer = customers.find(c => c.id === transaction.customerId);
        return customer.name.toLowerCase().includes(filter.toLowerCase()) || transaction.amount.toString().includes(filter);
      });
      filteredTransactions.forEach(transaction => {
        const customer = customers.find(c => c.id === transaction.customerId);
        const row = customerTable.insertRow(); // Create a new row
        row.insertCell(0).textContent = customer.name; // Insert customer name
        row.insertCell(1).textContent = transaction.amount; // Insert transaction amount
        row.insertCell(2).textContent = transaction.date; // Insert transaction date
      });
    }
  
    // Event listener for filtering data on search input
    searchInput.addEventListener('input', () => {
      displayData(searchInput.value); // Call displayData function with search input value
    });
  
    // Additional code for chart initialization and event handling could be placed here
  });
