async function fetchAndPopulateGames() {
  try {
    const link = `https://portfolio-817d5-default-rtdb.europe-west1.firebasedatabase.app/games.json`;
    const response = await fetch(link);

    if (response.ok) {
      const data = await response.json();
      const gamesData = Object.values(data); // Convert object to array of game objects

      const parentContainer = document.getElementById('gameSection');

      // Loop through the array of game objects
      gamesData.forEach((game) => {
        const { img, name, url } = game;

        // Create the elements
        const article = document.createElement('article');
        const anchor = document.createElement('a');
        const div = document.createElement('div');
        const gameImg = document.createElement('img'); // New img element
        const heading = document.createElement('h4');

        // Set attributes and content
        anchor.href = url;
        anchor.target = '_blank'; // Open link in new tab/window
        gameImg.src = img; // Set the img src attribute
        div.classList.add('gameTitle');
        heading.textContent = name;

        // Assemble the elements
        div.appendChild(heading);
        article.appendChild(gameImg); // Append the img before the div
        article.appendChild(div);
        anchor.appendChild(article);

        // Add the elements to the parent container
        parentContainer.appendChild(anchor);
      });
    } else {
      console.error('Request failed with status:', response.status);
    }
  } catch (error) {
    console.error('There has been a problem:', error);
  }
}

fetchAndPopulateGames();
