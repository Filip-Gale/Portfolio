// games.js - Dynamic game logos (Title on top, Year on bottom)

async function loadGames() {
    try {
        const apiUrl = 'https://api.github.com/repos/Filip-Gale/Portfolio-2026/contents/games/Logos';
        
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`API error: ${response.status}`);

        const files = await response.json();

        const parentContainer = document.getElementById('gameSection');
        if (!parentContainer) return;

        parentContainer.innerHTML = '';

        const logoFiles = files.filter(file => 
            file.type === 'file' && /\.(png|jpg|jpeg|webp|gif)$/i.test(file.name)
        );

        if (logoFiles.length === 0) {
            parentContainer.innerHTML = '<p style="color:#aaa; text-align:center; padding:40px;">No game logos found yet.</p>';
            return;
        }

        // Sort by year descending (newest first)
        logoFiles.sort((a, b) => {
            const yearA = parseInt(a.name.split('_')[0]) || 0;
            const yearB = parseInt(b.name.split('_')[0]) || 0;
            return yearB - yearA;
        });

        logoFiles.forEach(file => {
            const fullName = file.name;
            const parts = fullName.split('_');
            const year = parts[0];

            const urlStartIndex = parts.findIndex(p => p.includes('https'));
            let titleParts = urlStartIndex > 1 ? parts.slice(1, urlStartIndex) : [parts[1] || 'Game'];

            let title = titleParts.join(' ')
                .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
                .replace(/([A-Z])([A-Z][a-z])/g, '$1 $2')
                .trim();

            // Rebuild the URL
            let encodedUrl = urlStartIndex !== -1 ? parts.slice(urlStartIndex).join('_') : '';
            let gameUrl = encodedUrl
                .replace('___', '://')
                .replace(/_/g, '/')
                .replace(/\.(png|jpg|jpeg|webp|gif)$/i, '');

            const article = document.createElement('article');
            const anchor = document.createElement('a');
            const titleEl = document.createElement('h4');
            const img = document.createElement('img');
            const yearEl = document.createElement('div');

            anchor.href = gameUrl || '#';
            anchor.target = "_blank";     // External links open in new tab

            titleEl.textContent = title;
            titleEl.className = "game-title";

            img.src = file.download_url;
            img.alt = title;
            img.loading = "lazy";

            yearEl.className = "game-year";
            yearEl.textContent = year;

            // New order: Title → Image → Year
            article.appendChild(titleEl);
            article.appendChild(img);
            article.appendChild(yearEl);

            anchor.appendChild(article);
            parentContainer.appendChild(anchor);
        });

        console.log(`✅ Loaded ${logoFiles.length} game logos successfully`);

    } catch (error) {
        console.error('Error loading games:', error);
    }
}

loadGames();