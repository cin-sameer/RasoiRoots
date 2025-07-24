const post = document.querySelector("#post");
const sindhi = document.querySelector("#sindhi");
const exploreBtn = document.querySelectorAll(".exploreBtn");
const form = document.querySelector("#searchForm");
const input = document.querySelector("#searchinput");
const signup=document.querySelector(".signUp")
// Submit form
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const query = input.value.trim();
  if (!query) return;

  // Redirect to new page with query
  window.location.href = `searchedDishes.html?q=${encodeURIComponent(query)}`;
});

// Post button redirects to post.html
post.addEventListener("click", () => {
  window.location.href = "post.html";
});

// Explore buttons redirect to individual tradition pages
exploreBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    const id = btn.id;
    if (id) {
      window.location.href = `${id}.html`;
    }
    
  });
});
signup.addEventListener("click", () => {
  window.location.href = "signup.html";
});

