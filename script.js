document.addEventListener('DOMContentLoaded', () => {
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

      const card = document.createElement('div');
      card.style.border = '1px solid #ccc';
      card.style.padding = '10px';
      card.style.textAlign = 'center';
      card.style.width = '200px';
      card.style.backgroundColor = '#fff';
      card.style.borderRadius = '10px';
      card.style.boxShadow = '0 2px 5px rgba(0,0,0,0.1)';

      // ANIMACIÓN
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = 'all 0.5s ease';
      requestAnimationFrame(() => {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      });

      const img = document.createElement('img');
      img.src = peli.Poster !== 'N/A' ? peli.Poster : 'https://via.placeholder.com/150';
      img.alt = peli.Title;
      img.style.width = '100%';
      img.style.borderRadius = '6px';

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

    // HACER SCROLL AUTOMÁTICO AL RESULTADO
    results.scrollIntoView({ behavior: 'smooth' });
  }
});
document.addEventListener('DOMContentLoaded', () => {
  const themeBtn = document.getElementById('toggle-theme');
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'dark') {
    document.body.classList.add('dark');
  }

  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    const isDark = document.body.classList.contains('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });
});
