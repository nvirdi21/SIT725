document.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await fetch("/cards"); // fetch from the server route
        const cards = await response.json();

        const cardsContainer = document.querySelector(".row");

        cards.forEach(card => {
            const cardHTML = `
                <div class="col s12 m4">
                    <div class="card">
                        <div class="card-image">
                            <img src="${card.image}" alt="${card.name}">
                        </div>
                        <div class="card-content">
                            <span class="card-title">${card.name}</span>
                            <p>${card.description}</p>
                        </div>
                    </div>
                </div>
            `;
            cardsContainer.innerHTML += cardHTML;
        });
    } catch (error) {
        console.error("Error fetching cards:", error);
    }
});
