const card = document.querySelector(".cards");

fetch("http://localhost:5000/api/recipes")
  .then((res) => res.json())
  .then((recipes) => {
    if (!recipes || recipes.length === 0) {
      card.innerHTML = "<p>No recipes found.</p>";
      return;
    }

    recipes.forEach((recipe) => {
      if (recipe.category === "sindhi") {
        const cardElement = document.createElement("div");
        cardElement.classList.add("card");

        cardElement.innerHTML = `
          <img src="${recipe.image}" alt="${recipe.title}">
          <h3>${recipe.title}</h3>
          <p>${recipe.description ? recipe.description.substring(0, 100) + "..." : "No description available."}</p>
          <a href="recipieDetails.html?id=${recipe._id}" class="exploreBtn">Explore</a>
        `;

        card.appendChild(cardElement);
      }
    });
  })
  .catch((err) => {
    card.innerHTML = `<p>Error loading recipes.</p>`;
    console.error(err);
  });
