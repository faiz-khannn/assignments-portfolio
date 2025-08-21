// Initialize animations on scroll
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS (Animate on Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-out',
            once: true,
            offset: 100
        });
    }

    // Check for saved theme preference or set default
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Load assignments dynamically
    loadAssignments();
    
    // Add scroll effect for header
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Add focus styles for keyboard navigation
    document.querySelectorAll('a, button').forEach(element => {
        element.addEventListener('focus', () => {
            element.classList.add('keyboard-focus');
        });
        element.addEventListener('blur', () => {
            element.classList.remove('keyboard-focus');
        });
    });
});

// Theme toggle functionality with animation
document.getElementById('theme-toggle-btn').addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    // Add transition class for smooth theme change
    document.body.classList.add('theme-transition');
    
    // Set new theme
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Remove transition class after animation completes
    setTimeout(() => {
        document.body.classList.remove('theme-transition');
    }, 500);
    
    // Add a subtle animation to the toggle button
    const toggleBtn = document.getElementById('theme-toggle-btn');
    toggleBtn.classList.add('theme-toggled');
    setTimeout(() => {
        toggleBtn.classList.remove('theme-toggled');
    }, 500);
});

// Dynamically load assignments from JSON file
async function loadAssignments() {
    try {
        const container = document.getElementById('assignments-container');
        container.innerHTML = '<div class="loading">Loading assignments...</div>';
        
        const response = await fetch('assignments.json');
        if (!response.ok) {
            throw new Error('Failed to fetch assignments');
        }
        
        const data = await response.json();
        const assignments = data.assignments;
        
        if (!assignments || assignments.length === 0) {
            container.innerHTML = '<div class="no-assignments">No assignments found. Add assignments to the assignments.json file.</div>';
            return;
        }
        
        // Clear container and generate cards
        container.innerHTML = '';
        
        assignments.forEach((assignment, index) => {
            const card = document.createElement('div');
            card.className = 'assignment-card';
            
            // Determine file type icon and description
            let fileTypeIcon = '';
            let fileTypeDesc = '';
            
            switch (assignment.fileType.toLowerCase()) {
                case 'html':
                    fileTypeIcon = `
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24" height="24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 7.5l3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0021 18V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v12a2.25 2.25 0 002.25 2.25z" />
                        </svg>
                    `;
                    fileTypeDesc = 'HTML Solution';
                    break;
                case 'js':
                    fileTypeIcon = `
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24" height="24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                        </svg>
                    `;
                    fileTypeDesc = 'JavaScript Solution';
                    break;
                default:
                    fileTypeIcon = `
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="24" height="24">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                        </svg>
                    `;
                    fileTypeDesc = 'Solution';
            }
            
            card.innerHTML = `
                <div class="card-header">
                    <h3>${assignment.title}</h3>
                    ${assignment.description ? `<p>${assignment.description}</p>` : ''}
                </div>
                <div class="card-body">
                    <div class="file-type">
                        ${fileTypeIcon}
                        <span>${fileTypeDesc}</span>
                    </div>
                    <div class="card-buttons">
                        <a href="assignment-details.html?id=${encodeURIComponent(assignment.id)}" class="btn btn-primary">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" width="18" height="18">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            View Assignment
                        </a>
                    </div>
                </div>
            `;
            
            container.appendChild(card);
        });
        
        // Add hover effect listeners for cards
        document.querySelectorAll('.assignment-card').forEach(card => {
            card.addEventListener('mousemove', handleCardHover);
            card.addEventListener('mouseleave', resetCardTilt);
        });
        
    } catch (error) {
        console.error('Error loading assignments:', error);
        document.getElementById('assignments-container').innerHTML = `
            <div class="error-message">
                <p>Error loading assignments: ${error.message}</p>
                <p>Make sure assignments.json is properly formatted and accessible.</p>
            </div>
        `;
    }
}

// Handle card hover 3D effect
function handleCardHover(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left; 
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const angleY = (x - centerX) / 20;
    const angleX = (centerY - y) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg) scale3d(1.02, 1.02, 1.02)`;
}

// Reset card tilt on mouse leave
function resetCardTilt(e) {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    setTimeout(() => {
        card.style.transform = '';
    }, 300);
}

// Helper function to escape HTML
function escapeHtml(unsafe) {
    return unsafe
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}