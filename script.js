 // script.js
 document.addEventListener('DOMContentLoaded', function() {
    // ========== Event Handling ==========
    
    // 1. Button Click Event
    const clickBtn = document.getElementById('click-btn');
    const clickOutput = document.getElementById('click-output');
    
    clickBtn.addEventListener('click', function() {
        clickOutput.textContent = 'Button was clicked! 🎉';
        clickBtn.style.backgroundColor = '#27ae60';
    });
    
    // 2. Hover Event
    const hoverBox = document.querySelector('.hover-box');
    const hoverOutput = document.getElementById('hover-output');
    
    hoverBox.addEventListener('mouseenter', function() {
        hoverOutput.textContent = 'Mouse is hovering! ✨';
    });
    
    hoverBox.addEventListener('mouseleave', function() {
        hoverOutput.textContent = 'Hover over me again!';
    });
    
    // 3. Keypress Event
    const keypressInput = document.getElementById('keypress-input');
    const keypressOutput = document.getElementById('keypress-output');
    
    keypressInput.addEventListener('keyup', function(e) {
        keypressOutput.textContent = `You typed: ${e.target.value}`;
    });
    
    // 4. Secret Action (Double Click/Long Press)
    const secretBox = document.querySelector('.secret-box');
    const secretOutput = document.getElementById('secret-output');
    let longPressTimer;
    
    // Double Click
    secretBox.addEventListener('dblclick', function() {
        secretOutput.classList.remove('hidden');
        setTimeout(() => secretOutput.classList.add('hidden'), 2000);
    });
    
    // Long Press
    secretBox.addEventListener('mousedown', function() {
        longPressTimer = setTimeout(() => {
            secretOutput.textContent = "That was a long press! 🏆";
            secretOutput.classList.remove('hidden');
            setTimeout(() => secretOutput.classList.add('hidden'), 2000);
        }, 1000);
    });
    
    secretBox.addEventListener('mouseup', function() {
        clearTimeout(longPressTimer);
    });
    
    secretBox.addEventListener('mouseleave', function() {
        clearTimeout(longPressTimer);
    });
    
    // ========== Interactive Elements ==========
    
    // 1. Color Changing Button
    const colorChangeBtn = document.getElementById('colorChangeBtn');
    const colors = ['#3498db', '#e74c3c', '#2ecc71', '#f39c12', '#9b59b6'];
    let colorIndex = 0;
    
    colorChangeBtn.addEventListener('click', function() {
        colorIndex = (colorIndex + 1) % colors.length;
        colorChangeBtn.style.backgroundColor = colors[colorIndex];
        colorChangeBtn.textContent = `Color Changed! (${colorIndex + 1}/${colors.length})`;
        
        // Add animation effect
        colorChangeBtn.style.transform = 'scale(1.1)';
        setTimeout(() => {
            colorChangeBtn.style.transform = 'scale(1)';
        }, 200);
    });
    
    // 2. Image Gallery
    const galleryImage = document.getElementById('galleryImage');
    const prevImageBtn = document.getElementById('prevImage');
    const nextImageBtn = document.getElementById('nextImage');
    
    const images = [
        { id: 10, alt: 'Forest' },
        { id: 11, alt: 'Desert' },
        { id: 12, alt: 'Ocean' },
        { id: 13, alt: 'Mountain' },
        { id: 14, alt: 'City' }
    ];
    let currentImageIndex = 0;
    
    function updateGalleryImage() {
        const img = images[currentImageIndex];
        galleryImage.src = `https://picsum.photos/id/${img.id}/300/200`;
        galleryImage.alt = img.alt;
    }
    
    prevImageBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateGalleryImage();
    });
    
    nextImageBtn.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateGalleryImage();
    });
    
    // 3. Tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Update active tab button
            tabButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Update active tab content
            tabContents.forEach(content => content.classList.remove('active'));
            document.getElementById(`tab-${tabId}`).classList.add('active');
        });
    });
    
    // ========== Form Validation ==========
    const signupForm = document.getElementById('signupForm');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const formFeedback = document.getElementById('formFeedback');
    
    // Real-time validation
    nameInput.addEventListener('input', validateName);
    emailInput.addEventListener('input', validateEmail);
    passwordInput.addEventListener('input', validatePassword);
    
    function validateName() {
        if (nameInput.value.trim() === '') {
            return false;
        }
        return true;
    }
    
    function validateEmail() {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailInput.value.trim() === '' || emailRegex.test(emailInput.value);
    }
    
    function validatePassword() {
        return passwordInput.value.trim() === '' || passwordInput.value.length >= 8;
    }
    
    function showFeedback(message, isSuccess) {
        formFeedback.textContent = message;
        formFeedback.className = isSuccess ? 'success' : 'error';
    }
    
    // Form submission
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const isNameValid = validateName();
        const isEmailValid = validateEmail();
        const isPasswordValid = validatePassword();
        
        if (isNameValid && isEmailValid && isPasswordValid) {
            showFeedback('Form submitted successfully!', true);
            signupForm.reset();
        } else {
            showFeedback('Please fix the errors in the form', false);
        }
    });
});