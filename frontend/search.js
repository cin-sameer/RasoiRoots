const content = document.querySelector(".content");

const urlParams = new URLSearchParams(window.location.search);
const query = urlParams.get("q");

if (query) {
  searchDishes(query);
}

async function searchDishes(query) {
  try {
    content.innerHTML = `<p>Loading recipes for "<strong>${query}</strong>"...</p>`;

    const res = await fetch(`http://localhost:5000/api/recipes/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();

    content.innerHTML = ""; // Clear loading

    if (!Array.isArray(data) || data.length === 0) {
      content.innerHTML = `<p>No recipes found for "<strong>${query}</strong>".</p>`;
      return;
    }

    const grid = document.createElement("div");
    grid.classList.add("card-grid");

    data.forEach((recipe) => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <img src="${recipe.image || 'images/placeholder.jpg'}" alt="${recipe.title}" class="card-img" />
        <div class="card-body">
          <h3>${recipe.title}</h3>
          <p>${recipe.description ? recipe.description.substring(0, 100) + '...' : "No description available."}</p>
          <button class="explore-btn" data-id="${recipe._id}">Explore</button>
        </div>
      `;

      grid.appendChild(card);
    });

    content.appendChild(grid);

    document.querySelectorAll('.explore-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const id = e.target.dataset.id;
        window.location.href = `recipieDetails.html?id=${id}`;
      });
    });
  } catch (err) {
    console.error("Fetch error:", err.message);
    content.innerHTML = `<p>Something went wrong. Please try again later.</p>`;
  }
}
