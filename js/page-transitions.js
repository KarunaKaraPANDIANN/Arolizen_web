document.addEventListener('DOMContentLoaded', function() {
    // Create transition element
    const transitionEl = document.createElement('div');
    transitionEl.className = 'space-transition';
    
    // Create stars container
    const starsContainer = document.createElement('div');
    starsContainer.className = 'stars';
    transitionEl.appendChild(starsContainer);
    
    // Add to body
    document.body.appendChild(transitionEl);

    // Function to create random number between min and max
    function random(min, max) {
        return Math.random() * (max - min) + min;
    }

    // Function to create space elements with smooth distribution
    function createSpaceElements() {
        starsContainer.innerHTML = '';
        
        // Create stars with better distribution
        const numStars = 250;
        const sections = 5; // Divide screen into sections for better distribution
        const starsPerSection = numStars / sections;
        
        for (let section = 0; section < sections; section++) {
            for (let i = 0; i < starsPerSection; i++) {
                const star = document.createElement('div');
                star.className = 'star';
                
                // Calculate position within section for better distribution
                const sectionHeight = 100 / sections;
                const topPos = (section * sectionHeight) + random(0, sectionHeight);
                const leftPos = random(0, 100);
                
                star.style.left = `${leftPos}%`;
                star.style.top = `${topPos}%`;
                
                // Smooth delay distribution
                star.style.animationDelay = `${random(0, 0.8)}s`;
                
                // Random size variation for depth effect
                const size = random(1, 3);
                star.style.width = `${size}px`;
                star.style.height = `${size}px`;
                
                starsContainer.appendChild(star);
            }
        }
        
        // Create particles with improved movement
        const numParticles = 60;
        for (let i = 0; i < numParticles; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            
            // Improved position distribution
            const angle = (i / numParticles) * 360;
            const radius = random(20, 80);
            const leftPos = 50 + radius * Math.cos(angle * Math.PI / 180);
            const topPos = 50 + radius * Math.sin(angle * Math.PI / 180);
            
            particle.style.left = `${leftPos}%`;
            particle.style.top = `${topPos}%`;
            
            // Enhanced movement patterns
            const distance = random(300, 500);
            const angle2 = random(0, 360) * Math.PI / 180;
            const tx = distance * Math.cos(angle2);
            const ty = distance * Math.sin(angle2);
            
            particle.style.setProperty('--tx', `${tx}px`);
            particle.style.setProperty('--ty', `${ty}px`);
            
            // Smooth delay distribution
            particle.style.animationDelay = `${random(0, 0.5)}s`;
            
            // Size variation
            const size = random(2, 4);
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            starsContainer.appendChild(particle);
        }
        
        // Create meteors with improved patterns
        const numMeteors = 12;
        for (let i = 0; i < numMeteors; i++) {
            const meteor = document.createElement('div');
            meteor.className = 'meteor';
            
            // Better starting positions
            const startPos = -20 + (i * (140 / numMeteors));
            meteor.style.left = `${startPos}%`;
            meteor.style.top = `${random(-30, -10)}%`;
            
            // Staggered delays for continuous effect
            meteor.style.animationDelay = `${(i * 0.1) + random(0, 0.3)}s`;
            
            starsContainer.appendChild(meteor);
        }
    }

    // Smooth page transition handler
    document.addEventListener('click', function(e) {
        const link = e.target.closest('a');
        if (!link || !link.href || !link.href.startsWith(window.location.origin)) return;
        
        e.preventDefault();
        
        // Start transition
        transitionEl.classList.add('active');
        createSpaceElements();
        
        // Smooth page transition
        setTimeout(() => {
            window.location.href = link.href;
        }, 800); // Increased duration for smoother transition
    });

    // Handle back/forward navigation
    window.addEventListener('pageshow', function(e) {
        if (e.persisted) {
            transitionEl.classList.remove('active');
            setTimeout(createSpaceElements, 100);
        }
    });

    // Create initial elements
    createSpaceElements();
}); 