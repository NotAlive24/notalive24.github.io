document.addEventListener("DOMContentLoaded", () => {
    
    // --- 1. COPY BUTTON LOGIC ---
    document.querySelectorAll('pre').forEach((preBlock) => {
        const button = document.createElement('button');
        button.className = 'copy-btn';
        button.innerText = 'Copy';
        preBlock.appendChild(button);

        button.addEventListener('click', () => {
            const code = preBlock.querySelector('code');
            if (code) {
                navigator.clipboard.writeText(code.innerText).then(() => {
                    const originalText = button.innerText;
                    button.innerText = 'Copied!';
                    setTimeout(() => { button.innerText = originalText; }, 2000);
                }).catch(err => { console.error('Failed to copy: ', err); });
            }
        });
    });

    // --- 2. SEARCH BAR LOGIC ---
    const searchInput = document.getElementById('search-input');
    const cards = document.querySelectorAll('.post-card');

    if (searchInput) {
        searchInput.addEventListener('keyup', (e) => {
            const term = e.target.value.toLowerCase();
            cards.forEach((card) => {
                const title = card.getAttribute('data-title').toLowerCase();
                const category = card.getAttribute('data-category').toLowerCase();
                if (title.includes(term) || category.includes(term)) {
                    card.style.display = "block";
                } else {
                    card.style.display = "none";
                }
            });
        });
    }

    // --- 3. BACK TO TOP BUTTON LOGIC ---
    const scrollBtn = document.getElementById("scrollTopBtn");

    if (scrollBtn) {
        window.onscroll = function() {
            if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
                scrollBtn.style.display = "block";
            } else {
                scrollBtn.style.display = "none";
            }
        };

        scrollBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});

// --- 0. FORCE SCROLL TO TOP ON REFRESH ---
// This tells the browser: "Don't remember my scroll position, start from 0."
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

document.addEventListener("DOMContentLoaded", () => {
    
    // ... (Your existing code for Copy Button, Search, Back-to-Top goes here) ...

});


// --- GLOBAL FUNCTION FOR TOAST NOTIFICATIONS ---
function copyText(textToCopy, message) {
    // 1. Copy to clipboard
    navigator.clipboard.writeText(textToCopy).then(() => {
        
        // 2. Get the toast element
        const toast = document.getElementById("toast-notification");
        
        // 3. Set the text
        toast.innerText = message || "Copied to clipboard!";
        
        // 4. Add the "show" class to trigger animation
        toast.className = "show";
        
        // 5. Remove the class after 3 seconds (so it disappears)
        setTimeout(function(){ 
            toast.className = toast.className.replace("show", ""); 
        }, 3000);
        
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}