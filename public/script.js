document.getElementById('donationForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const itemName = document.getElementById('itemName').value;
  const category = document.getElementById('category').value;

  const response = await fetch('/api/donations', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ itemName, category })
  });

  const data = await response.json();
  document.getElementById('message').innerText = 'Donation added: ' + data.itemName;
});