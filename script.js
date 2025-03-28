document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    // Check for saved theme preference or use preferred color scheme
    const savedTheme = localStorage.getItem('theme') || 
                     (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    body.classList.add(savedTheme + '-theme');
    updateThemeIcon(savedTheme);
    
    // Initialize particles with correct theme
    initParticles(savedTheme);
    
    themeToggle.addEventListener('click', function() {
        if (body.classList.contains('dark-theme')) {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
            updateThemeIcon('light');
            updateParticlesTheme('light');
        } else {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            localStorage.setItem('theme', 'dark');
            updateThemeIcon('dark');
            updateParticlesTheme('dark');
        }
    });
    
    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        } else {
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
        }
    }
    
    // Color theme customization
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
        option.addEventListener('click', function() {
            const color = this.getAttribute('data-color');
            document.documentElement.style.setProperty('--primary-color', color);
            
            // Calculate a slightly darker version for hover states
            const hoverColor = shadeColor(color, -20);
            document.documentElement.style.setProperty('--primary-hover', hoverColor);
            
            // Update particles color if in light mode
            if (!body.classList.contains('dark-theme')) {
                updateParticlesColor(color);
            }
            
            // Save the selected color
            localStorage.setItem('primaryColor', color);
            localStorage.setItem('primaryHover', hoverColor);
        });
    });
    
    // Apply saved color theme if exists
    const savedPrimaryColor = localStorage.getItem('primaryColor');
    const savedPrimaryHover = localStorage.getItem('primaryHover');
    if (savedPrimaryColor) {
        document.documentElement.style.setProperty('--primary-color', savedPrimaryColor);
        document.documentElement.style.setProperty('--primary-hover', savedPrimaryHover || shadeColor(savedPrimaryColor, -20));
        
        // Update particles if in light mode
        if (!body.classList.contains('dark-theme')) {
            updateParticlesColor(savedPrimaryColor);
        }
    }
    
    // Helper function to shade colors
    function shadeColor(color, percent) {
        let R = parseInt(color.substring(1,3), 16);
        let G = parseInt(color.substring(3,5), 16);
        let B = parseInt(color.substring(5,7), 16);

        R = parseInt(R * (100 + percent) / 100);
        G = parseInt(G * (100 + percent) / 100);
        B = parseInt(B * (100 + percent) / 100);

        R = (R<255)?R:255;  
        G = (G<255)?G:255;  
        B = (B<255)?B:255;  

        R = Math.round(R);
        G = Math.round(G);
        B = Math.round(B);

        const RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
        const GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
        const BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));

        return "#"+RR+GG+BB;
    }
    
    // Particles.js functions
    function initParticles(theme) {
        particlesJS('particles-js', getParticlesConfig(theme));
    }
    
    function updateParticlesTheme(theme) {
        if (window.pJSDom && window.pJSDom.length > 0) {
            const particles = window.pJSDom[0].pJS.particles;
            const config = getParticlesConfig(theme);
            
            particles.color.value = config.particles.color.value;
            particles.line_linked.color = config.particles.line_linked.color;
            
            // Refresh particles
            window.pJSDom[0].pJS.fn.particlesRefresh();
        }
    }
    
    function updateParticlesColor(color) {
        if (window.pJSDom && window.pJSDom.length > 0) {
            const particles = window.pJSDom[0].pJS.particles;
            
            particles.color.value = color;
            particles.line_linked.color = color;
            
            // Refresh particles
            window.pJSDom[0].pJS.fn.particlesRefresh();
        }
    }
    
    function getParticlesConfig(theme) {
        const isDark = theme === 'dark';
        const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--primary-color').trim() || '#1e90ff';
        
        return {
            "particles": {
                "number": {
                    "value": 180,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": isDark ? "#ffffff" : primaryColor
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": isDark ? 0.2 : 0.3,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 4,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 4,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 80,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": isDark ? "#ffffff" : primaryColor,
                    "opacity": isDark ? 0.2 : 0.4,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 5,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        };
    }

    // Video functionality
    function addVideoFromLink(link) {
        const videoId = extractYouTubeId(link);
        const grid = document.querySelector('#video-container');
        
        if (videoId) {
            const videoCard = document.createElement('div');
            videoCard.className = 'project-card video-card';
            videoCard.innerHTML = `
                <h3>New Video</h3>
                <div class="video-container">
                    <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
                <div class="video-features">
                    <ul>
                        <li>Feature 1</li>
                        <li>Feature 2</li>
                    </ul>
                </div>
            `;
            
            // Add error handling for the iframe
            const iframe = videoCard.querySelector('iframe');
            iframe.onerror = function() {
                iframe.style.display = 'none';
                const errorDiv = document.createElement('div');
                errorDiv.className = 'video-error';
                errorDiv.innerHTML = `
                    <p>www.youtube.com refused to connect.</p>
                `;
                videoCard.querySelector('.video-container').appendChild(errorDiv);
            };
            
            grid.appendChild(videoCard);
        } else {
            alert('Invalid YouTube URL');
        }
    }
    
    function extractYouTubeId(url) {
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? match[2] : null;
    }

    // Fetch YouTube videos
    const CHANNEL_ID = "UCWqOsB5-eX3GzQYco7Ev4iw"; // Dimoxx-cheat's YouTube Channel ID
    const YT_FEED_URL = `https://www.youtube.com/feeds/videos.xml?channel_id=${CHANNEL_ID}`;

    async function fetchLatestVideos() {
        try {
            const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(YT_FEED_URL)}`);
            const data = await response.json();

            if (data.items && data.items.length > 0) {
                const videoContainer = document.getElementById('video-container');
                data.items.slice(0, 3).forEach(video => {
                    const videoUrl = video.link;
                    const videoId = videoUrl.split('watch?v=')[1]; // Extract video ID
                    const title = video.title;

                    const videoCard = document.createElement('div');
                    videoCard.className = 'project-card video-card';
                    videoCard.innerHTML = `
                        <h3>${title}</h3>
                        <div class="video-container">
                            <iframe src="https://www.youtube.com/embed/${videoId}" frameborder="0" allowfullscreen></iframe>
                        </div>
                    `;
                    videoContainer.appendChild(videoCard);
                });
            }
        } catch (error) {
            console.error('Error fetching videos:', error);
        }
    }

    // Fetch videos on page load
    fetchLatestVideos();
});
