async function fetchDataAndDisplay() {
    try {
      const linkmake = `https://portfolio-817d5-default-rtdb.europe-west1.firebasedatabase.app/projects.json`;
      const response = await fetch(linkmake);
  
      if (response.ok) {
        const data = await response.json();
  
        // Get the container where the data will be displayed
        const container = document.getElementById("test");
  
        // Loop through each item in the fetched data
        for (const key in data) {
          if (Object.hasOwnProperty.call(data, key)) {
            const item = data[key];
  
            // Create a link element and set its attributes for each item
            const itemContainer = document.createElement("a");
            itemContainer.classList.add("item-container"); // Add a class for styling
            itemContainer.href = item.url;
            itemContainer.target = "_blank"; // Open link in a new tab
  
            // Create elements for title and description
            const title = document.createElement("h2");
            title.textContent = item.name;
  
            const description = document.createElement("p");
            description.textContent = "Project type: " + item.type;
  
            // Append title and description elements to the link container
            itemContainer.appendChild(title);
            itemContainer.appendChild(description);
  
            // Append the link container to the main container
            container.appendChild(itemContainer);
          }
        }
      } else {
        console.error('Failed to fetch data');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
  
  // Call the function to execute the data fetching and displaying
  fetchDataAndDisplay();
  