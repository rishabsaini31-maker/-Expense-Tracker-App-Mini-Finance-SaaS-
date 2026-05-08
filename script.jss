let transactions =
  JSON.parse(localStorage.getItem("transactions")) || [];

function saveTransactions() {
  localStorage.setItem(
    "transactions",
    JSON.stringify(transactions)
  );
}

function updateBalance() {
  const balance = transactions.reduce((total, item) => {
    return item.type === "income"
      ? total + item.amount
      : total - item.amount;
  }, 0);

  document.getElementById("balance").innerText =
    "₹" + balance;
}

function renderTransactions() {
  const list = document.getElementById("transactionList");

  list.innerHTML = "";

  transactions.forEach((item, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span>
        ${item.text} (${item.type})
      </span>

      <span>
        ₹${item.amount}
        <button onclick="deleteTransaction(${index})">
          ❌
        </button>
      </span>
    `;

    list.appendChild(li);
  });

  updateBalance();
}

function addTransaction() {
  const text = document.getElementById("text").value;
  const amount = document.getElementById("amount").value;
  const type = document.getElementById("type").value;

  if (!text || !amount) return;

  transactions.push({
    text,
    amount: Number(amount),
    type,
  });

  saveTransactions();
  renderTransactions();

  document.getElementById("text").value = "";
  document.getElementById("amount").value = "";
}

function deleteTransaction(index) {
  transactions.splice(index, 1);

  saveTransactions();
  renderTransactions();
}

renderTransactions();