var targetSpan = document.getElementById('targetElement');

if (targetSpan) {
    targetSpan.textContent = "Digital";
} else {
    console.log('targetSpan element not found.');
}

async function digitalneSlike(endpoint) {
  if (targetSpan) {
    targetSpan.textContent = endpoint;
  }

  try {
    const linkmake = `https://portfolio-817d5-default-rtdb.europe-west1.firebasedatabase.app/${endpoint}.json`;
    const response = await fetch(linkmake);

    if (response.ok) {
      const data = await response.json();
      const parentContainer = document.getElementById('mainImageSection');
      const children = parentContainer.children;

      // Loop through the children and clear the content inside each child element
      for (let i = 0; i < children.length; i++) {
        children[i].innerHTML = '';
      }

      // Loop through the object keys and create img elements for each object
      for (const key in data) {
        const item = data[key];
        const img = document.createElement('img');
        img.src = item.url;
        img.alt = item.name;
        img.addEventListener('contextmenu', (e) => {
          e.preventDefault();
        });
        img.classList.add('image-container'); // Adding the class for styling

        // Add a click event listener to each image
        img.addEventListener('click', function() {
          // Extract the ID of the clicked image container
          const clickedImageId = key;

          // Redirect to another site with the specific image ID as a query parameter
          const redirectTo = 'pictureView.html';
          const urlWithId = `${redirectTo}`;
          localStorage.setItem('imageId', clickedImageId);
          localStorage.setItem('name', item.name);
          localStorage.setItem('originalName', item.originalName);
          localStorage.setItem('url', item.url);
          localStorage.setItem('endpoint', endpoint);
          window.location.href = urlWithId;
        });

        // Append the image to the appropriate section
        const sectionNumber = key % 3;
        const section = parentContainer.querySelector(`.imageColumn:nth-child(${sectionNumber + 1})`);
        section.appendChild(img);
      }
    } else {
      console.error('Request failed with status:', response.status);
    }
  } catch (error) {
    console.error('There has been a problem with your fetch operation:', error);
  }
}



async function uploadImage(endpoint) {
  var imageName = '';
  var fileInput = document.getElementById('uploadImage');
  var file = fileInput.files[0];

  if (file) {
    var formData = new FormData();
    formData.append('image', file);

    // Generate a unique name for the uploaded image (for example, using a timestamp)
    imageName = new Date().getTime() + '_' + file.name;

    try {
      const uploadResponse = await fetch(`https://firebasestorage.googleapis.com/v0/b/portfolio-817d5.appspot.com/o/img%2F${imageName}?alt=media&token=3ae11a53-7c26-4d1c-9beb-9c8db8fb3ee2`, {
        method: 'POST',
        body: formData
      });

      if (uploadResponse.ok) {
        // Fetch the existing data from the provided endpoint
        const fetchDataResponse = await fetch(`https://portfolio-817d5-default-rtdb.europe-west1.firebasedatabase.app/${endpoint}.json`);
        const existingData = await fetchDataResponse.json();

        // Create a new object with the uploaded image URL and name
        const newImageObject = {
          name: imageName,
          originalName: imageName,
          url: `https://firebasestorage.googleapis.com/v0/b/portfolio-817d5.appspot.com/o/img%2F${imageName}?alt=media&token=3ae11a53-7c26-4d1c-9beb-9c8db8fb3ee2`
        };

        // Append the new image object to the existing data
        existingData.push(newImageObject);

        // Update the data in the Firebase Realtime Database using PUT method
        const putResponse = await fetch(`https://portfolio-817d5-default-rtdb.europe-west1.firebasedatabase.app/${endpoint}.json`, {
          method: 'PUT',
          body: JSON.stringify(existingData),
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (putResponse.ok) {
          console.log('Image data updated successfully.');
        } else {
          console.error('Failed to update image data.');
        }
      } else {
        console.error('Error uploading image:', uploadResponse.status);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  } else {
    console.error('No image selected.');
  }
  fileInput.value = '';
  digitalneSlike(endpoint);
}

digitalneSlike('digital');