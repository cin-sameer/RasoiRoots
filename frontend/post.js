const form = document.querySelector("#recipeForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData();

  formData.append("title", document.getElementById("title").value);
  formData.append("ingredients", document.getElementById("ingredients").value);
  formData.append("description", document.getElementById("description").value);
  formData.append("category", document.getElementById("category").value);

  const imageFile = document.getElementById("image").files[0]; 
  if (imageFile) {
    formData.append("image", imageFile);
  }

  fetch("http://localhost:5000/api/recipes", {
    method: "POST",
    body: formData
  })
    .then(async (response) => {
      if (!response.ok) {
        throw new Error("Failed to save recipe.");
      }
      return response.json();
    })
    .then((data) => {
      alert("Data saved successfully!");
      window.location.href = "index.html";
    })
    .catch((err) => {
      console.error("Error:", err);
      alert("Failed to save recipe.");
    });
});
