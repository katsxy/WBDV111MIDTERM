document.addEventListener('DOMContentLoaded', () => {

  const rows = document.querySelectorAll('[data-ticket-row]');
  const totalEl = document.querySelector('[data-total]');

  // UPDATE TOTAL
  function updateTotal() {
    let total = 0;

    rows.forEach(row => {
      const price = Number(row.dataset.price);
      const qty = Number(row.querySelector('[data-qty]').value);
      total += price * qty;
    });

    totalEl.textContent = total.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD'
    });
  }

  // BUTTON CONTROLS
  rows.forEach(row => {
    const minus = row.querySelector('[data-qty-minus]');
    const plus = row.querySelector('[data-qty-plus]');
    const input = row.querySelector('[data-qty]');

    function clamp() {
      let value = Number(input.value);
      value = Math.max(0, Math.min(10, value));
      input.value = value;
    }

    minus.addEventListener('click', () => {
      input.value = Number(input.value) - 1;
      clamp();
      updateTotal();
    });

    plus.addEventListener('click', () => {
      input.value = Number(input.value) + 1;
      clamp();
      updateTotal();
    });

    input.addEventListener('input', () => {
      clamp();
      updateTotal();
    });
  });

  // INITIAL TOTAL
  updateTotal();

});