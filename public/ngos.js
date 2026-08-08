async function loadNGOs() {
  const response = await fetch('/api/ngos');
  const ngos = await response.json();

  const container = document.getElementById('ngoList');
  container.innerHTML = ngos.map(ngo => `
    <div class="ngo-card">
      <h3>${ngo.name}</h3>
      <p>Area: ${ngo.area}</p>
      <p>Contact: ${ngo.contact}</p>
    </div>
  `).join('');
}

loadNGOs();