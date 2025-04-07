const form = document.getElementById('search-form');
const input = document.getElementById('search-input');
const results = document.getElementById('results');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const query = input.value.trim();
  if (query !== '') {
    buscarPeliculas(query);
  }
});

function buscarPeliculas(query) {
  const apiKey = '6d6628b7';
  ; // Reemplazá esto cuando la tengas
  const url = `https://www.omdbapi.com/?s=${encodeURIComponent(query)}&apikey=${apiKey}`;

  fetch(url)
    .then(res => res.json())
    .then(data => {
      mostrarResultados(data.Search);
    })
    .catch(err => console.error('Error al buscar películas:', err));
}

function mostrarResultados(peliculas) {
    results.innerHTML = '';
    if (!peliculas) {
      results.innerHTML = '<p>No se encontraron resultados.</p>';
      return;
    }
  
    peliculas.forEach(peli => {
        const link = document.createElement('a');
        link.href = `detalle.html?id=${peli.imdbID}`;
        link.style.textDecoration = 'none';
        link.style.color = 'inherit';
      
        const card = document.createElement('div'); // 👈 esta línea es CLAVE
        card.classList.add('card'); // 👈 esta va justo después
      
        const img = document.createElement('img');
        img.src = peli.Poster !== 'N/A' ? peli.Poster : 'https://via.placeholder.com/150';
        img.alt = peli.Title;
      
        const title = document.createElement('h3');
        title.textContent = peli.Title;
      
        const year = document.createElement('p');
        year.textContent = `${peli.Year} (${peli.Type})`;
      
        card.appendChild(img);
        card.appendChild(title);
        card.appendChild(year);
      
        link.appendChild(card);
        results.appendChild(link);
      });
    
    }
    const toggleBtn = document.getElementById('toggle-theme');
const body = document.body;

// Aplicar tema guardado si existe
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  body.classList.add(savedTheme);
}

// Cambiar tema al hacer clic
toggleBtn.addEventListener('click', () => {
    body.classList.toggle('dark');
  
    if (body.classList.contains('dark')) {
      toggleBtn.textContent = '☀️ Cambiar a claro';
      localStorage.setItem('theme', 'dark');
    } else {
      toggleBtn.textContent = '🌙 Cambiar a oscuro';
      localStorage.setItem('theme', '');
    }
  });
  if (savedTheme === 'dark') {
    toggleBtn.textContent = '☀️ Cambiar a claro';
  }
