// Login and Registration Javascript

// Create utils object with reusable functions if not already defined
if (typeof window.utils === 'undefined') {
    window.utils = {
        // Local storage utilities
        storage: {
            get: function(key) {
                const item = localStorage.getItem(key);
                try {
                    return JSON.parse(item);
                } catch (e) {
                    return item;
                }
            },
            set: function(key, value) {
                if (typeof value === 'object') {
                    localStorage.setItem(key, JSON.stringify(value));
                } else {
                    localStorage.setItem(key, value);
                }
            },
            remove: function(key) {
                localStorage.removeItem(key);
            },
            clear: function() {
                localStorage.clear();
            }
        },
        
        // Show error message
        showError: function(message, container) {
            const errorElement = document.createElement('div');
            errorElement.className = 'alert alert-error';
            errorElement.textContent = message;
            
            // Insert at the top of form
            container.insertBefore(errorElement, container.firstChild);
            
            // Remove after 3 seconds
            setTimeout(() => {
                errorElement.remove();
            }, 3000);
        },
        
        // Show success message
        showSuccess: function(message, container) {
            const successElement = document.createElement('div');
            successElement.className = 'alert alert-success';
            successElement.textContent = message;
            
            // Insert at the top of form
            container.insertBefore(successElement, container.firstChild);
            
            // Remove after 3 seconds
            setTimeout(() => {
                successElement.remove();
            }, 3000);
        },
        
        // Debounce function for search inputs etc.
        debounce: function(func, wait = 300) {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        }
    };
    
    // Add CSS for alerts if not already in stylesheet
    if (!document.querySelector('#utils-styles')) {
        const style = document.createElement('style');
        style.id = 'utils-styles';
        style.textContent = `
            .alert {
                padding: 0.75rem 1.25rem;
                margin-bottom: 1rem;
                border-radius: 8px;
                font-size: 0.9rem;
                animation: fadeIn 0.3s ease;
            }
            
            .alert-error {
                background-color: #ffebee;
                color: #c62828;
                border: 1px solid #ef9a9a;
            }
            
            .alert-success {
                background-color: #e8f5e9;
                color: #2e7d32;
                border: 1px solid #a5d6a7;
            }
            
            .spinner {
                width: 20px;
                height: 20px;
                border: 3px solid rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                border-top-color: #fff;
                animation: spin 1s ease-in-out infinite;
            }
            
            @keyframes spin {
                to { transform: rotate(360deg); }
            }

            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
        `;
        document.head.appendChild(style);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('Login JS loaded'); // For debugging
    
    // Create demo users if none exist
    const users = window.utils.storage.get('users');
    if (!users || users.length === 0) {
        // Create demo users
        const demoUsers = [
            {
                id: '1',
                name: 'John Doe',
                email: 'john@example.com',
                password: 'password123',
                nickname: 'John',
                avatar: '/api/placeholder/120/120?text=JD',
                joinDate: '2023-01-15T00:00:00.000Z',
                personality: [
                    { 
                        name: 'RED', 
                        color: '#E53935',
                        title: 'The Passionate & Bold',
                        percentage: 85,
                        description: 'Thrives on challenges and competition. Highly ambitious and bold.'
                    },
                    { 
                        name: 'BLUE', 
                        color: '#1976D2',
                        title: 'The Loyal & Intelligent',
                        percentage: 75,
                        description: 'Prefers logic over emotions. Very loyal and trustworthy.'
                    },
                    { 
                        name: 'GREEN', 
                        color: '#43A047',
                        title: 'The Balanced & Practical',
                        percentage: 65,
                        description: 'Prefers stability over excitement. Careful decision-maker.'
                    }
                ],
                hasCompletedTest: true,
                friends: ['2'],
                friendRequests: []
            },
            {
                id: '2',
                name: 'Jane Smith',
                email: 'jane@example.com',
                password: 'password123',
                nickname: 'Jane',
                avatar: '/api/placeholder/120/120?text=JS',
                joinDate: '2023-02-20T00:00:00.000Z',
                personality: [
                    { 
                        name: 'PURPLE', 
                        color: '#8E24AA',
                        title: 'The Creative & Unique',
                        percentage: 90,
                        description: 'Highly imaginative and artistic. Thinks outside the box.'
                    },
                    { 
                        name: 'YELLOW', 
                        color: '#FDD835',
                        title: 'The Optimistic & Cheerful',
                        percentage: 80,
                        description: 'Always looks at the bright side of life. Highly social and enjoys making people laugh.'
                    },
                    { 
                        name: 'BLACK', 
                        color: '#000000',
                        title: 'The Independent & Mysterious',
                        percentage: 70,
                        description: 'Values privacy and personal space. Prefers deep conversations over small talk.'
                    }
                ],
                hasCompletedTest: true,
                friends: ['1'],
                friendRequests: []
            }
        ];
        
        // Save demo users
        window.utils.storage.set('users', demoUsers);
        
        // Create demo conversation
        const demoConversation = {
            id: '1-2',
            participants: ['1', '2'],
            messages: [
                {
                    id: '1',
                    senderId: '1',
                    recipientId: '2',
                    text: 'Hi Jane! How are you doing today?',
                    timestamp: '2023-03-10T09:30:00.000Z',
                    read: true
                },
                {
                    id: '2',
                    senderId: '2',
                    recipientId: '1',
                    text: 'Hey John! I\'m doing great, thanks for asking. How about you?',
                    timestamp: '2023-03-10T09:35:00.000Z',
                    read: true
                },
                {
                    id: '3',
                    senderId: '1',
                    recipientId: '2',
                    text: 'I\'m good too! Just wanted to check in and see how your personality test results were.',
                    timestamp: '2023-03-10T09:40:00.000Z',
                    read: true
                },
                {
                    id: '4',
                    senderId: '2',
                    recipientId: '1',
                    text: 'They were interesting! Apparently I\'m mostly Purple, Yellow, and Black. What about you?',
                    timestamp: '2023-03-10T09:45:00.000Z',
                    read: true
                }
            ],
            createdAt: '2023-03-10T09:30:00.000Z'
        };
        
        // Save demo conversation
        const conversations = {};
        conversations[demoConversation.id] = demoConversation;
        window.utils.storage.set('conversations', conversations);
    }

    // Tab Switching
    const authTabs = document.querySelectorAll('.auth-tab');
    const authForms = document.querySelectorAll('.auth-form');
    
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and forms
            authTabs.forEach(t => t.classList.remove('active'));
            authForms.forEach(f => f.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding form
            tab.classList.add('active');
            const formId = `${tab.dataset.tab}-form`;
            document.getElementById(formId).classList.add('active');
        });
    });

    // Password Strength Meter
    const passwordInput = document.getElementById('register-password');
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.strength-text');
    
    if (passwordInput) {
        passwordInput.addEventListener('input', () => {
            const password = passwordInput.value;
            let strength = 0;
            
            // Calculate password strength
            if (password.length >= 8) strength += 25;
            if (password.match(/[A-Z]/)) strength += 25;
            if (password.match(/[0-9]/)) strength += 25;
            if (password.match(/[^A-Za-z0-9]/)) strength += 25;
            
            // Update strength meter
            strengthBar.style.width = `${strength}%`;
            
            // Update strength color
            if (strength < 25) {
                strengthBar.style.backgroundColor = '#FF5252';
                strengthText.textContent = 'Weak';
            } else if (strength < 50) {
                strengthBar.style.backgroundColor = '#FFC107';
                strengthText.textContent = 'Fair';
            } else if (strength < 75) {
                strengthBar.style.backgroundColor = '#4CAF50';
                strengthText.textContent = 'Good';
            } else {
                strengthBar.style.backgroundColor = '#388E3C';
                strengthText.textContent = 'Strong';
            }
        });
    }

    // Form Validation
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    
    if (loginForm) {
        console.log('Login form found'); // For debugging
        
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('Login form submitted'); // For debugging
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            
            // Validate input
            if (!email || !password) {
                window.utils.showError('Please fill in all fields', loginForm);
                return;
            }
            
            // Show loading
            const submitButton = loginForm.querySelector('.auth-button');
            submitButton.disabled = true;
            submitButton.innerHTML = '<div class="spinner"></div>';
            
            // Login logic
            const users = window.utils.storage.get('users') || [];
            console.log('Users found:', users.length); // For debugging
            
            const user = users.find(u => u.email === email && u.password === password);
            
            if (user) {
                // Login successful
                window.utils.storage.set('currentUser', user);
                console.log('Login successful for user:', user.name); // For debugging
                
                // Redirect to profile page
                window.location.href = 'profile.html';
            } else {
                // Login failed
                console.log('Login failed: User not found or password incorrect'); // For debugging
                window.utils.showError('Invalid email or password', loginForm);
                submitButton.disabled = false;
                submitButton.textContent = 'Login';
            }
        });
    } else {
        console.log('Login form not found'); // For debugging
    }
    
    if (registerForm) {
        console.log('Register form found'); // For debugging
        
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            console.log('Register form submitted'); // For debugging
            
            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-confirm').value;
            const acceptTerms = document.getElementById('accept-terms').checked;
            
            // Validate input
            if (!name || !email || !password || !confirmPassword) {
                window.utils.showError('Please fill in all fields', registerForm);
                return;
            }
            
            if (password !== confirmPassword) {
                window.utils.showError('Passwords do not match', registerForm);
                return;
            }
            
            if (!acceptTerms) {
                window.utils.showError('Please accept the terms and conditions', registerForm);
                return;
            }
            
            // Show loading
            const submitButton = registerForm.querySelector('.auth-button');
            submitButton.disabled = true;
            submitButton.innerHTML = '<div class="spinner"></div>';
            
            // Registration logic
            const users = window.utils.storage.get('users') || [];
            
            // Check if email already exists
            if (users.some(u => u.email === email)) {
                window.utils.showError('Email already registered', registerForm);
                submitButton.disabled = false;
                submitButton.textContent = 'Create Account';
                return;
            }
            
            // Create new user with empty personality
            const newUser = {
                id: Date.now().toString(),
                name,
                email,
                password,
                nickname: name.split(' ')[0],
                avatar: '/api/placeholder/120/120?text=' + name.substring(0, 2).toUpperCase(),
                joinDate: new Date().toISOString(),
                personality: [], // Empty array instead of random generation
                hasCompletedTest: false, // Flag to indicate test not taken
                friends: [],
                friendRequests: []
            };
            
            console.log('Created new user:', newUser); // For debugging
            
            // Save user
            users.push(newUser);
            window.utils.storage.set('users', users);
            window.utils.storage.set('currentUser', newUser);
            
            // Show success message
            window.utils.showSuccess('Account created successfully!', registerForm);
            
            // Redirect to profile page
            setTimeout(() => {
                window.location.href = 'profile.html';
            }, 1000);
        });
    } else {
        console.log('Register form not found'); // For debugging
    }

    // Check if user is already logged in
    const currentUser = window.utils.storage.get('currentUser');
    if (currentUser && window.location.pathname.includes('login.html')) {
        console.log('User already logged in, redirecting to profile'); // For debugging
        // Redirect to profile page if already logged in
        window.location.href = 'profile.html';
    }
});