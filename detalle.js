const apiKey = '6d6628b7'; // tu misma key
const params = new URLSearchParams(window.location.search);
const movieId = params.get('id');

console.log('ID recibido:', movieId); // 👉 Acá vemos si llega bien el ID

fetch(`https://www.omdbapi.com/?i=${movieId}&apikey=${apiKey}`)
  .then(res => res.json())
  .then(data => {
    console.log('Respuesta de la API:', data); // 👉 Acá vemos qué devuelve la API
    mostrarDetalle(data);
  })
  .catch(err => console.error('Error al obtener detalles:', err));

  function mostrarDetalle(peli) {
    const container = document.getElementById('movie-detail');
    container.innerHTML = `
      <div class="detalle-card">
        <img src="${peli.Poster !== 'N/A' ? peli.Poster : 'https://via.placeholder.com/300'}" alt="${peli.Title}" />
        <div class="detalle-info">
          <h2>${peli.Title} (${peli.Year})</h2>
          <p><strong>Género:</strong> ${peli.Genre}</p>
          <p><strong>Director:</strong> ${peli.Director}</p>
          <p><strong>Actores:</strong> ${peli.Actors}</p>
          <p><strong>Duración:</strong> ${peli.Runtime}</p>
          <p><strong>Sinopsis:</strong> ${peli.Plot}</p>
          <a href="index.html" class="btn-volver">🔙 Volver</a>
        </div>
      </div>
    `;
  }
  
    function generarEstrellas(rating) {
        if (isNaN(rating)) return ''; // por si viene mal
      
        const estrellasTotales = 5;
        const ratingNormalizado = rating / 2; // porque IMDb va de 0 a 10, y usamos 5 estrellas
      
        const estrellasLlenas = Math.floor(ratingNormalizado);
        const mediaEstrella = ratingNormalizado % 1 >= 0.5;
        const estrellasVacias = estrellasTotales - estrellasLlenas - (mediaEstrella ? 1 : 0);
      
        return (
          '⭐'.repeat(estrellasLlenas) +
          (mediaEstrella ? '⭐️' : '') +
          '☆'.repeat(estrellasVacias)
        );
    }