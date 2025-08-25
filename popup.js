document.addEventListener('DOMContentLoaded', () => {
    // Matrix rain effect
    function createMatrixRain(containerId, charCount = 15, interval = 300) {
        const matrixContainer = document.getElementById(containerId);
        if (!matrixContainer) return;
        
        const characters = '&%+!?_QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890@#$^*()[]{}|;:,.<>/';
        
        function createChar() {
            const char = document.createElement('div');
            char.className = 'matrix-char';
            char.textContent = characters[Math.floor(Math.random() * characters.length)];
            char.style.left = Math.random() * 100 + '%';
            char.style.animationDuration = (Math.random() * 3 + 2) + 's';
            char.style.animationDelay = Math.random() * 2 + 's';
            
            matrixContainer.appendChild(char);
            
            // Remove character after animation
            setTimeout(() => {
                if (char.parentNode) {
                    char.parentNode.removeChild(char);
                }
            }, 5000);
        }
        
        // Create initial characters
        for (let i = 0; i < charCount; i++) {
            setTimeout(createChar, i * 200);
        }
        
        // Continue creating characters
        setInterval(createChar, interval);
    }
    
    // Start matrix effects
    createMatrixRain('matrix-rain', 15, 300); // Background effect
    createMatrixRain('matrix-rain-container', 8, 500); // Container effect (less dense)
    const passwordInput = document.getElementById('password');
    const generateBtn = document.getElementById('generate');
    const lengthSlider = document.getElementById('length');
    const lengthValue = document.getElementById('length-value');
    const easyToSay = document.getElementById('easy-to-say');
    const easyToRead = document.getElementById('easy-to-read');
    const allCharacters = document.getElementById('all-characters');
    const uppercase = document.getElementById('uppercase');
    const lowercase = document.getElementById('lowercase');
    const numbers = document.getElementById('numbers');
    const symbols = document.getElementById('symbols');

    lengthSlider.addEventListener('input', () => {
        lengthValue.textContent = lengthSlider.value;
    });

    generateBtn.addEventListener('click', () => {
        const length = parseInt(lengthSlider.value);
        let charset = '';

        if (easyToSay.checked) {
            charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        } else if (easyToRead.checked) {
            charset = 'abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        } else if (allCharacters.checked) {
            if (uppercase.checked) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            if (lowercase.checked) charset += 'abcdefghijklmnopqrstuvwxyz';
            if (numbers.checked) charset += '0123456789';
            if (symbols.checked) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
        } else {
            // Default to all if none selected
            charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
        }

        if (charset === '') {
            passwordInput.value = 'Select at least one option';
            return;
        }

        let password = '';
        for (let i = 0; i < length; i++) {
            password += charset.charAt(Math.floor(Math.random() * charset.length));
        }

        passwordInput.value = password;
    });

    const regenerateBtn = document.getElementById('regenerate-btn');
    regenerateBtn.addEventListener('click', () => {
        const length = parseInt(lengthSlider.value);
        let charset = '';

        if (easyToSay.checked) {
            charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        } else if (easyToRead.checked) {
            charset = 'abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ23456789';
        } else if (allCharacters.checked) {
            if (uppercase.checked) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            if (lowercase.checked) charset += 'abcdefghijklmnopqrstuvwxyz';
            if (numbers.checked) charset += '0123456789';
            if (symbols.checked) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
        } else {
            // Default to all if none selected
            charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
        }

        if (charset === '') {
            passwordInput.value = 'Select at least one option';
            return;
        }

        let password = '';
        for (let i = 0; i < length; i++) {
            password += charset.charAt(Math.floor(Math.random() * charset.length));
        }

        passwordInput.value = password;
    });

    const copyBtn = document.getElementById('copy-btn');
    copyBtn.addEventListener('click', async () => {
        if (passwordInput.value) {
            try {
                await navigator.clipboard.writeText(passwordInput.value);
                copyBtn.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
                }, 2000);
            } catch (err) {
                // Fallback for older browsers
                passwordInput.select();
                document.execCommand('copy');
                copyBtn.innerHTML = '<i class="fas fa-check"></i>';
                setTimeout(() => {
                    copyBtn.innerHTML = '<i class="fas fa-copy"></i>';
                }, 2000);
            }
        }
    });
});