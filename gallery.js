// gallery.js - Dynamic from GitHub (img/art folder)
async function loadGalleryImages() {
    try {
        // Correct path: images are inside img/art
        const apiUrl = 'https://api.github.com/repos/Filip-Gale/Portfolio/contents/img/art';
        
        const response = await fetch(apiUrl);

        if (!response.ok) {
            throw new Error(`GitHub API failed: ${response.status} - Check if folder 'img/art' exists on GitHub`);
        }

        const files = await response.json();

        const parentContainer = document.getElementById('mainImageSection');
        if (!parentContainer) {
            console.error('mainImageSection not found');
            return;
        }

        // Clear the 3 columns
        for (let i = 0; i < parentContainer.children.length; i++) {
            parentContainer.children[i].innerHTML = '';
        }

        // Filter only image files
        const imageFiles = files.filter(file => 
            file.type === 'file' && 
            /\.(jpg|jpeg|png|gif|webp)$/i.test(file.name)
        );

        // Sort alphabetically
        imageFiles.sort((a, b) => b.name.localeCompare(a.name));

        imageFiles.forEach((file, index) => {
            const img = document.createElement('img');
            
            img.src = file.download_url;        // direct raw link
            img.alt = file.name;
            img.loading = 'lazy';               // lazy loading
            img.classList.add('image-container');

            // Disable right-click save
            img.addEventListener('contextmenu', e => e.preventDefault());

            // Open picture view
            img.addEventListener('click', function () {
                const cleanName = file.name.replace(/\.[^/.]+$/, "");
                localStorage.setItem('imageId', index);
                localStorage.setItem('name', cleanName);
                localStorage.setItem('originalName', file.name);
                localStorage.setItem('url', file.download_url);
                window.location.href = 'pictureView.html';
            });

            // Distribute into 3 columns
            const columnIndex = index % 3;
            const column = parentContainer.querySelector(`.imageColumn:nth-child(${columnIndex + 1})`);
            if (column) column.appendChild(img);
        });

        console.log(`✅ Loaded ${imageFiles.length} images dynamically from img/art`);

    } catch (error) {
        console.error('Error loading gallery:', error);
        // You can optionally show a user-friendly message here later
    }
}

// Run automatically when page loads
loadGalleryImages();