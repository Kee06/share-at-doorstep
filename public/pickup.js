document.getElementById('pickupForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const donorName = document.getElementById('donorName').value;
  const address = document.getElementById('address').value;
  const date = document.getElementById('date').value;
  const timeSlot = document.getElementById('timeSlot').value;

  const response = await fetch('/api/pickups', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ donorName, address, date, timeSlot })
  });

  const data = await response.json();
  document.getElementById('message').innerText = 'Pickup scheduled for ' + data.donorName;
});