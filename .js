const form = document.getElementById('expense-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const expenseList = document.getElementById('expense-list');
const totalDisplay = document.getElementById('total');

let expenses = [];

// Carrega despesas salvas no localStorage ao iniciar
if (localStorage.getItem('expenses')) {
  expenses = JSON.parse(localStorage.getItem('expenses'));
  renderExpenses();
}

// Adiciona nova despesa
form.addEventListener('submit', function(e) {
  e.preventDefault();

  const description = descriptionInput.value.trim();
  const amount = parseFloat(amountInput.value.replace(',', '.'));

  if (!description || isNaN(amount) || amount <= 0) return;

  const expense = { description, amount };
  expenses.push(expense);

  // Salva no localStorage
  localStorage.setItem('expenses', JSON.stringify(expenses));

  // Atualiza interface
  renderExpenses();

  // Limpa campos
  descriptionInput.value = '';
  amountInput.value = '';
});

// Renderiza a lista e o total
function renderExpenses() {
  expenseList.innerHTML = '';
  let total = 0;

  expenses.forEach(expense => {
    const li = document.createElement('li');
    li.textContent = `${expense.description} - R$ ${expense.amount.toFixed(2)}`;
    expenseList.appendChild(li);
    total += expense.amount;
  });

  totalDisplay.textContent = total.toFixed(2);
}
