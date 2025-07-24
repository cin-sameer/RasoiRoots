const params = new URLSearchParams(window.location.search);
const recipeId = params.get('id');
const container = document.getElementById('recipeDetail');

fetch(`http://localhost:5000/api/recipes/${recipeId}`)
  .then(res => res.json())
  .then(recipe => {
    container.innerHTML = `
      <img src="${recipe.image}" alt="${recipe.title}" />
      <h1>${recipe.title}</h1>

      <h3>Ingredients:</h3>
      <p>${recipe.ingredients.replace(/\n/g, ' &nbsp; ')}</p>

      <h3>Description:</h3>
      <p>${recipe.description}</p>
    `;
  })
  .catch(err => {
    container.innerHTML = `<p>Recipe not found.</p>`;
    console.error(err);
  });
