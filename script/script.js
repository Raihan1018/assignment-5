const heartButtons = document.querySelectorAll("#heart-btn");

// Select all heart number spans (both mobile and desktop)
const heartNumbers = document.querySelectorAll("#heart-number");

heartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    heartNumbers.forEach((span) => {
      let current = parseInt(span.textContent);
      span.textContent = current + 1;
    });
  });
});
