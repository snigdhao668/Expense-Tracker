const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");
const list = document.getElementById("list");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function updateValues() {
    const amounts = transactions.map(t => t.amount);

    const total = amounts.reduce((acc, item) => acc + item, 0);
    const incomeTotal = amounts
        .filter(item => item > 0)
        .reduce((acc, item) => acc + item, 0);
    const expenseTotal = amounts
        .filter(item => item < 0)
        .reduce((acc, item) => acc + item, 0);

    balance.innerText = total.toFixed(2);
    income.innerText = incomeTotal.toFixed(2);
    expense.innerText = Math.abs(expenseTotal).toFixed(2);
}

function addTransaction() {
    const text = document.getElementById("text").value;
    const amount = parseFloat(document.getElementById("amount").value);

    if (text === "" || isNaN(amount)) {
        alert("Please enter valid details");
        return;
    }

    const transaction = {
        id: Date.now(),
        text,
        amount
    };

    transactions.push(transaction);
    localStorage.setItem("transactions", JSON.stringify(transactions));

    addToDOM(transaction);
    updateValues();

    document.getElementById("text").value = "";
    document.getElementById("amount").value = "";
}

function addToDOM(transaction) {
    const li = document.createElement("li");
    li.classList.add(transaction.amount > 0 ? "income" : "expense");

    li.innerHTML = `
        ${transaction.text} 
        <span>₹ ${transaction.amount}</span>
        <button onclick="removeTransaction(${transaction.id})">X</button>
    `;

    list.appendChild(li);
}

function removeTransaction(id) {
    transactions = transactions.filter(t => t.id !== id);
    localStorage.setItem("transactions", JSON.stringify(transactions));
    list.innerHTML = "";
    transactions.forEach(addToDOM);
    updateValues();
}

transactions.forEach(addToDOM);
updateValues();