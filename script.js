// Function to handle form submission
document.getElementById('expense-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const amount = document.getElementById('amount').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;

    const expense = { amount, description, category };
    
    addExpenseToList(expense);
    saveExpenseToLocalStorage(expense);

    // Clear the form
    document.getElementById('expense-form').reset();
});

// Function to add expense to the list
function addExpenseToList(expense) {
    const li = document.createElement('li');
    li.className = 'list-group-item';
    li.innerHTML = `
        ${expense.amount} - ${expense.description} (${expense.category})
        <button class="btn btn-danger btn-sm float-right delete">Delete</button>
        <button class="btn btn-warning btn-sm float-right edit">Edit</button>
    `;
    document.getElementById('expense-list').appendChild(li);
}

// Function to save expense to local storage
function saveExpenseToLocalStorage(expense) {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.push(expense);
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Function to load expenses from local storage
function loadExpenses() {
    const expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses.forEach(expense => addExpenseToList(expense));
}

// Function to delete expense
document.getElementById('expense-list').addEventListener('click', function(e) {
    if (e.target.classList.contains('delete')) {
        const li = e.target.parentElement;
        li.remove();

        deleteExpenseFromLocalStorage(li.textContent);
    }
});

// Function to delete expense from local storage
function deleteExpenseFromLocalStorage(expenseText) {
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
    expenses = expenses.filter(expense => {
        return `${expense.amount} - ${expense.description} (${expense.category})` !== expenseText.trim();
    });
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Function to edit expense
document.getElementById('expense-list').addEventListener('click', function(e) {
    if (e.target.classList.contains('edit')) {
        const li = e.target.parentElement;
        const expenseText = li.firstChild.textContent.split(' - ');
        const [amount, descriptionCategory] = expenseText;
        const [description, category] = descriptionCategory.split(' (').map(str => str.replace(')', ''));

        document.getElementById('amount').value = amount.trim();
        document.getElementById('description').value = description.trim();
        document.getElementById('category').value = category.trim();

        deleteExpenseFromLocalStorage(li.textContent);
        li.remove();
    }
});

// Load expenses on page load
document.addEventListener('DOMContentLoaded', loadExpenses);
