document.addEventListener("DOMContentLoaded", () => {
  // Select all necessary elements
  const callButtons = document.querySelectorAll("#call-btn");
  const coinNumberDisplay = document.querySelectorAll("#coin-number");
  const heartNumberDisplay = document.querySelectorAll("#heart-number");
  const copyNumberDisplay = document.querySelectorAll("#copy-number");
  const historySection = document.querySelector(".lg\\:col-span-3.p-4");
  const clearButton = document.querySelector("#clear-btn");
  const heartButtons = document.querySelectorAll("#heart-btn");
  const copyButtons = document.querySelectorAll("#copy-btn");

  // Initial values
  let coins = 100;
  let hearts = 0;
  let copies = 0;

  // Function to update displays
  function updateDisplays() {
    coinNumberDisplay.forEach((el) => (el.textContent = coins));
    heartNumberDisplay.forEach((el) => (el.textContent = hearts));
    copyNumberDisplay.forEach((el) => (el.textContent = copies));
  }

  // Create the call history container
  const callHistoryList = document.createElement("div");
  callHistoryList.className = "mt-4 space-y-2 roboto";
  historySection.appendChild(callHistoryList);

  // Function to add a new item to call history
  function addToHistory(service, number) {
    // Get the current time
    const now = new Date();
    const timeString = now.toLocaleTimeString();

    const historyItem = document.createElement("div");
    historyItem.className = "p-3 bg-gray-100 rounded-lg shadow-sm";
    historyItem.innerHTML = `
            <div class = "flex justify-between items-center hover:translate-x-2 transition-all duration-150 ease-in-out">
            <div>
              <h4 class="font-semibold text-sm ">${service}</h4>
            <p class="text-xs text-gray-600">${number}</p>
            </div>
            <div>
            <p class="text-xs text-gray-500 mt-1">${timeString}</p>
            </div>
            </div>
        `;
    callHistoryList.appendChild(historyItem);
  }

  // Add click event listeners to all 'Call' buttons
  callButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (coins >= 20) {
        const card = button.closest(".cart-content");
        const serviceName = card.querySelector("#card-title").textContent;
        const contactNumber = card.querySelector("#contact-number").textContent;

        coins -= 20;
        updateDisplays();

        addToHistory(serviceName, contactNumber);

        alert(`Calling ${serviceName} at ${contactNumber}..`);
      } else {
        alert("You don't have enough coins (minimum 20) to make this call.");
      }
    });
  });

  // Add click event listeners to all 'Copy' buttons
  copyButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest(".cart-content");
      const contactNumber = card.querySelector("#contact-number").textContent;

      navigator.clipboard
        .writeText(contactNumber)
        .then(() => {
          copies += 1;
          updateDisplays();
          alert(`Contact number ${contactNumber} has been copied.`);
        })
        .catch((err) => {
          console.error("Failed to copy text: ", err);
          alert("Failed to copy the number. Please try again.");
        });
    });
  });

  // Add click event listeners to all 'Heart' buttons
  heartButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (button.classList.contains("fa-regular")) {
        button.classList.remove("fa-regular");
        button.classList.add("fa-solid");
        button.classList.add("text-red-500");
        hearts++;
      } else {
        button.classList.remove("fa-solid");
        button.classList.remove("text-red-500");
        button.classList.add("fa-regular");
        hearts--;
      }
      updateDisplays();
    });
  });

  // Handle the 'Clear' history button
  if (clearButton) {
    clearButton.addEventListener("click", () => {
      callHistoryList.innerHTML = "";
      alert("Call history cleared!");
    });
  }

  // Initial display update
  updateDisplays();
});
