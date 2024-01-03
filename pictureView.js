
async function editImageName() {
    id = localStorage.getItem('imageId');
    newName = document.getElementById("name-change-container").value;

    console.log(newName);
    
    if(newName!=''){
        const endpoint = localStorage.getItem('endpoint');

        console.log(endpoint);

        const linkmake = `https://portfolio-817d5-default-rtdb.europe-west1.firebasedatabase.app/` + endpoint + `.json`;
        const response = await fetch(linkmake);
    
        console.log(response);

        if (response.ok) {
            const data = await response.json();

            console.log(data[2]);
    
            // Check if the id is within the valid range of array indices
            if (id >= 0 && id < data.length) {
                // Update the name property
                data[id].name = newName;
    
                // Create a new request to update the data
                const updateRequest = await fetch(linkmake, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                });
    
                if (updateRequest.ok) {
                    console.log(`Image name updated successfully for ID ${id}`);
                } else {
                    console.error('Failed to update image name');
                }
            } else {
                console.error(`Invalid ID: ${id}`);
            }
            

        }     
        else {
            console.error('Failed to fetch data');
        }

        document.getElementById("title").textContent = newName;
        localStorage.setItem('name', newName);
    }
    
}

async function deleteImage() {
    const id = localStorage.getItem('imageId');
    const endpoint = localStorage.getItem('endpoint');
    const linkmake = `https://portfolio-817d5-default-rtdb.europe-west1.firebasedatabase.app/` + endpoint + `.json`;

    const response = await fetch(linkmake);

    if (response.ok) {
        const data = await response.json();

        // Check if the id is within the valid range of array indices
        if (id >= 0 && id < data.length) {
            // Remove the element with the specified id
            data.splice(id, 1);

            // Create a new request to update the data
            const updateRequest = await fetch(linkmake, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (updateRequest.ok) {
                console.log(`Image deleted successfully for ID ${id}`);
            } else {
                console.error('Failed to delete image');
            }
        } else {
            console.error(`Invalid ID: ${id}`);
        }
    } else {
        console.error('Failed to fetch data');
    }

    const imageNameToDelete = localStorage.getItem("originalName");
    const token = '3ae11a53-7c26-4d1c-9beb-9c8db8fb3ee2';

    const linkToDelete = `https://firebasestorage.googleapis.com/v0/b/portfolio-817d5.appspot.com/o/img%2F${imageNameToDelete}?alt=media&token=${token}`;

    const responseImage = await fetch(linkToDelete, { method: 'DELETE' });

    if (responseImage.ok) {
    console.log(`Image '${imageNameToDelete}' deleted successfully`);
    } else {
    console.error('Error deleting image:', response.statusText);
    }

        // Redirect to gallery.php
        window.location.href = 'gallery.html';
}
