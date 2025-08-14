// Ensure utils is defined
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
    console.log('Profile JS loaded'); // For debugging
    
    // Add CSS for history tab
    const historyStyle = document.createElement('style');
    historyStyle.textContent = `
        .history-list {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }
        
        .history-entry {
            background-color: #f8f9fa;
            border-radius: 8px;
            padding: 1rem;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }
        
        .history-date {
            color: var(--text-secondary);
            font-size: 0.9rem;
            margin-bottom: 0.5rem;
        }
        
        .history-colors {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            margin-bottom: 0.5rem;
        }
        
        .history-color-badge {
            padding: 0.3rem 0.6rem;
            border-radius: 6px;
            font-size: 0.8rem;
            font-weight: 600;
            color: white;
        }
        
        .empty-history {
            text-align: center;
            padding: 2rem;
            background-color: #f5f5f5;
            border-radius: 8px;
            color: var(--text-secondary);
        }

        /* Bad personality styles */
        .bad-personality-badge {
            background-color: #555;
            color: white;
            padding: 0.3rem 0.6rem;
            border-radius: 6px;
            font-size: 0.8rem;
            font-weight: 600;
            margin-right: 0.5rem;
            margin-bottom: 0.5rem;
            display: inline-block;
        }
        
        .history-type-label {
            display: inline-block;
            padding: 0.2rem 0.5rem;
            border-radius: 4px;
            font-size: 0.75rem;
            font-weight: 600;
            margin-left: 0.5rem;
        }
        
        .color-type {
            background-color: #e3f2fd;
            color: #1565c0;
        }
        
        .bad-type {
            background-color: #fce4ec;
            color: #c2185b;
        }
    `;
    document.head.appendChild(historyStyle);
    
    // Check if user is logged in
    const currentUser = window.utils.storage.get('currentUser');
    
    if (currentUser) {
        console.log('User logged in:', currentUser.name); // For debugging
        
        // Hide login required message
        document.getElementById('login-required').style.display = 'none';
        
        // Show profile container
        const profileContainer = document.getElementById('profile-container');
        profileContainer.style.display = 'block';
        
        // Build profile UI
        buildProfileUI(profileContainer, currentUser);
    } else {
        console.log('No user logged in'); // For debugging
    }
    
    // Build the profile UI
    function buildProfileUI(container, user) {
        // Profile header
        const profileHeader = document.createElement('div');
        profileHeader.className = 'profile-header';
        
        // Initialize personality history if it doesn't exist
        if (!user.personalityHistory) {
            user.personalityHistory = [];
            
            // If user has a personality but no history, add current personality to history
            if (user.personality && user.personality.length > 0) {
                user.personalityHistory.push({
                    date: new Date().toISOString(),
                    colors: user.personality,
                    type: 'color' // Add type to distinguish color personality tests
                });
                
                // Save updated user
                window.utils.storage.set('currentUser', user);
                
                // Update user in users array
                const users = window.utils.storage.get('users') || [];
                const userIndex = users.findIndex(u => u.id === user.id);
                if (userIndex !== -1) {
                    users[userIndex] = user;
                    window.utils.storage.set('users', users);
                }
            }
        }

        // Initialize badPersonality if it doesn't exist
        if (!user.badPersonality) {
            user.badPersonality = [];
        }

        // Calculate test stat count from combined history
        const testCount = (user.personalityHistory ? user.personalityHistory.length : 0) + 
                          (user.badPersonality ? user.badPersonality.length : 0);
        
        profileHeader.innerHTML = `
            <img src="${user.avatar}" alt="${user.name}" class="profile-avatar">
            <div class="profile-info">
                <h2 class="profile-name">${user.name}</h2>
                <p class="profile-username">@${user.nickname}</p>
                <div class="profile-stats">
                    <div class="stat-item">
                        <div class="stat-value">${user.personality ? user.personality.length : 0}</div>
                        <div class="stat-label">Personality Colors</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${user.friends ? user.friends.length : 0}</div>
                        <div class="stat-label">Friends</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-value">${testCount}</div>
                        <div class="stat-label">Test Results</div>
                    </div>
                </div>
            </div>
            <div class="profile-actions">
                <button class="button button-primary edit-profile">Edit Profile</button>
                <button class="button button-secondary logout">Logout</button>
            </div>
        `;
        
        // Profile tabs
        const profileTabs = document.createElement('div');
        profileTabs.className = 'profile-tabs';
        
        profileTabs.innerHTML = `
            <div class="profile-tab active" data-tab="personality">My Personality</div>
            <div class="profile-tab" data-tab="friends">Friends</div>
            <div class="profile-tab" data-tab="requests">Friend Requests</div>
            <div class="profile-tab" data-tab="history">View History</div>
            <div class="profile-tab" data-tab="chat">Chat</div>
        `;
        
        // Profile content
        const profileContent = document.createElement('div');
        profileContent.className = 'profile-content';
        
        // Create tab content
        const personalityContent = createPersonalityTab(user);
        const friendsContent = createFriendsTab(user);
        const requestsContent = createRequestsTab(user);
        const historyContent = createHistoryTab(user);
        const chatContent = createChatTab(user);
        
        profileContent.appendChild(personalityContent);
        profileContent.appendChild(friendsContent);
        profileContent.appendChild(requestsContent);
        profileContent.appendChild(historyContent);
        profileContent.appendChild(chatContent);
        
        // Add everything to container
        container.appendChild(profileHeader);
        container.appendChild(profileTabs);
        container.appendChild(profileContent);
        
        // Add event listeners
        addProfileEventListeners(container, user);
    }

    // Create personality tab content
    function createPersonalityTab(user) {
        const tabContent = document.createElement('div');
        tabContent.className = 'tab-content active';
        tabContent.id = 'personality-tab';
        
        // Check if user has completed the personality test
        if (!user.personality || user.personality.length === 0) {
            // User hasn't taken the test yet
            const noTestContent = document.createElement('div');
            noTestContent.className = 'card text-center';
            noTestContent.innerHTML = `
                <h3>No Personality Data Yet</h3>
                <p>You haven't taken the personality test yet. Discover your color personality!</p>
                <a href="test.html" class="button button-primary mt-2">Take the Test</a>
            `;
            tabContent.appendChild(noTestContent);
            return tabContent;
        }
        
        // Personality colors section
        const colorsSection = document.createElement('div');
        colorsSection.className = 'personality-colors';
        
        // Add color cards with primary/secondary/tertiary labels
        user.personality.forEach((color, index) => {
            const colorCard = document.createElement('div');
            colorCard.className = 'color-card';
            
            // Add label based on index
            const labels = ["Primary", "Secondary", "Tertiary"];
            const label = index < 3 ? labels[index] : "";
            
            colorCard.innerHTML = `
                <div class="color-header" style="background-color: ${color.color}; ${color.name === 'WHITE' ? 'color: #333;' : ''}">
                    ${color.name} ${label ? `<span class="color-label">( ${label} )</span>` : ''}
                </div>
                <div class="color-body">
                    <h3 class="color-title">${color.title}</h3>
                    <p class="color-description">${color.description}</p>
                </div>
            `;
            
            colorsSection.appendChild(colorCard);
        });
        
        // Add description
        const description = document.createElement('div');
        description.className = 'card mt-2';
        description.innerHTML = `
            <h3 class="mb-1">Your Personality Profile</h3>
            <p>Your color palette reveals your unique blend of traits. Your dominant colors shape your behavior, mindset, and how you interact with others. This profile is based on the PersonaQuest assessment and may help you better understand yourself and your relationships.</p>
            <p class="mt-1"><a href="test.html" class="text-primary">Take the test again</a> to get an updated analysis.</p>
            <div class="ai-analysis-box">
    <h4><i class="fas fa-brain"></i> AI Personality Analysis</h4>
    <p>Get deeper insights into your personality traits and track your progress over time with our advanced AI analysis.</p>
    <a href="profileai.html" class="button button-primary">Analyze My Personality</a>
</div>
        `;
        
        // Check if user has bad personality results
        // Check if user has bad personality results
if (user.badPersonality && user.badPersonality.length > 0) {
    // Get the first (most recent) bad personality entry
    const firstBadEntry = user.badPersonality[0];
    
    // Add bad personality section
    const badPersonalitySection = document.createElement('div');
    badPersonalitySection.className = 'card mt-2';
    
    // Check if it's a "no negative traits" entry
    if (firstBadEntry.noNegativeTraits) {
        badPersonalitySection.innerHTML = `
            <h3 class="mb-1">Your Negative Traits Assessment</h3>
            <div class="positive-result">
                <h3><i class="fas fa-medal personality-icon"></i> Congratulations!</h3>
                <p>Based on your responses to the Negative Trait Test, you don't show significant tendencies toward any negative personality traits. This suggests you have a well-balanced personality with healthy interpersonal patterns.</p>
            </div>
            <p class="mt-1"><em>Note: These results are only visible to you and not shared with other users.</em></p>
        `;
        
        // Create separate AI analysis box
        const aiAnalysisBox = document.createElement('div');
        aiAnalysisBox.innerHTML = `
            <div class="ai-analysis-box mt-1">
                <h4><i class="fas fa-chart-line"></i> AI Progress Tracking</h4>
                <p>Discover how to maintain your positive traits and continue your personal growth journey with AI-powered insights.</p>
                <a href="negativeai.html" class="button button-primary">Track My Progress</a>
            </div>
        `;
        badPersonalitySection.appendChild(aiAnalysisBox);
        
    } else {
        // Handle case with traits or any other negative personality result
        let badTraitsList = '';
        if (firstBadEntry.traits && firstBadEntry.traits.length > 0) {
            firstBadEntry.traits.forEach(trait => {
                badTraitsList += `
                    <div class="bad-personality-badge" style="background-color: #${trait.color || '555555'}">
                        ${trait.name}
                    </div>
                `;
            });
        }
        
        badPersonalitySection.innerHTML = `
            <h3 class="mb-1">Your Negative Traits</h3>
            <p>According to the Negative Trait Test, you have tendencies toward the following traits. Remember, awareness is the first step toward improvement.</p>
            <div class="bad-personality-traits mt-1">
                ${badTraitsList}
            </div>
            <p class="mt-1"><em>Note: These results are only visible to you and not shared with other users.</em></p>
        `;
        
        // Create separate AI analysis box
        const aiAnalysisBox = document.createElement('div');
        aiAnalysisBox.innerHTML = `
            <div class="ai-analysis-box mt-1">
                <h4><i class="fas fa-target"></i> AI Improvement Analysis</h4>
                <p>Get personalized strategies and track your improvement progress with AI-powered analysis of your negative traits.</p>
                <a href="negativeai.html" class="button button-primary">Analyze & Improve</a>
            </div>
        `;
        badPersonalitySection.appendChild(aiAnalysisBox);
    }
    
    tabContent.appendChild(colorsSection);
    tabContent.appendChild(description);
    tabContent.appendChild(badPersonalitySection);
} else {
    // User hasn't taken the negative trait test yet
    const negativeTestPrompt = document.createElement('div');
    negativeTestPrompt.className = 'card mt-2';
    negativeTestPrompt.innerHTML = `
        <h3 class="mb-1">Discover Your Negative Traits</h3>
        <p>Want to get a complete picture of your personality? Take our Negative Trait Assessment to understand areas for potential growth and self-improvement.</p>
        <a href="badtest.html" class="button button-primary mt-1">Take Negative Trait Test</a>
    `;
    
    tabContent.appendChild(colorsSection);
    tabContent.appendChild(description);
    tabContent.appendChild(negativeTestPrompt);
}
        
        return tabContent;
    }

    // Create friends tab content with color personality filtering
    function createFriendsTab(user) {
        const tabContent = document.createElement('div');
        tabContent.className = 'tab-content';
        tabContent.id = 'friends-tab';
        
        // Initialize friends array if it doesn't exist
        if (!user.friends) {
            user.friends = [];
        }
        
        // Get all users
        const users = window.utils.storage.get('users') || [];
        
        // Get user's friends
        const friends = user.friends || [];
        
        if (friends.length === 0) {
            tabContent.innerHTML = `
                <div class="card text-center">
                    <h3>No Friends Yet</h3>
                    <p>You haven't added any friends yet. Find other users to connect with!</p>
                </div>
            `;
        } else {
            const friendsList = document.createElement('div');
            friendsList.className = 'friends-list';
            
            // Add friend cards
            friends.forEach(friendId => {
                const friend = users.find(u => u.id === friendId);
                if (friend) {
                    const friendCard = document.createElement('div');
                    friendCard.className = 'friend-card';
                    
                    // Check if friend has personality data
                    const personalityInfo = friend.personality && friend.personality.length > 0 
                        ? `${friend.personality[0].name} Personality` 
                        : 'No personality data yet';
                    
                    // If there's personality data, show color badges
                    let colorBadges = '';
                    if (friend.personality && friend.personality.length > 0) {
                        colorBadges = `
                            <div class="personality-badges">
                                ${friend.personality.map(p => 
                                    `<span class="personality-badge" style="background-color: ${p.color}; color: ${p.name === 'WHITE' || p.name === 'YELLOW' ? '#333' : '#fff'};">${p.name}</span>`
                                ).join('')}
                            </div>
                        `;
                    }
                    
                    friendCard.innerHTML = `
                        <img src="${friend.avatar}" alt="${friend.name}" class="friend-avatar">
                        <div class="friend-info">
                            <div class="friend-name">${friend.name}</div>
                            <div class="friend-status">${personalityInfo}</div>
                            ${colorBadges}
                        </div>
                        <div class="friend-actions">
                            <div class="friend-action chat-with-friend" data-id="${friend.id}" title="Chat">💬</div>
                            <div class="friend-action view-friend" data-id="${friend.id}" title="View Profile">👤</div>
                        </div>
                    `;
                    
                    friendsList.appendChild(friendCard);
                }
            });
            
            tabContent.appendChild(friendsList);
        }
        
        // Updated list of personality colors for the filter - now with 10 colors
const personalityColors = [
    { name: 'RED', color: '#E53935' },
    { name: 'BLUE', color: '#1976D2' },
    { name: 'GREEN', color: '#43A047' },
    { name: 'YELLOW', color: '#FDD835' },
    { name: 'PURPLE', color: '#8E24AA' },
    { name: 'WHITE', color: '#FFFFFF' },
    { name: 'BLACK', color: '#000000' },
    { name: 'GREY', color: '#9E9E9E' },
    { name: 'PINK', color: '#EC407A' },
    { name: 'CHOCOLATE', color: '#795548' }
];


        // Create color filter buttons HTML - removed the ALL button
const colorButtonsHTML = personalityColors.map(color => 
    `<button class="color-filter-btn" data-color="${color.name}" style="background-color: ${color.color}; color: ${color.name === 'WHITE' || color.name === 'YELLOW' ? '#333' : '#fff'};">${color.name}</button>`
).join('');

// Add search users section with color filter
const searchSection = document.createElement('div');
searchSection.className = 'card mt-2';
searchSection.innerHTML = `
    <h3 class="mb-1">Find New Friends</h3>
    <div class="form-group">
        <input type="text" class="form-input" id="search-users" placeholder="Search by name or email">
    </div>
    <div class="filter-section mb-1">
        <label class="form-label">Filter by Personality Color:</label>
        <div class="color-filters">
            ${colorButtonsHTML}
        </div>
    </div>
    <div class="search-results"></div>
`;

        tabContent.appendChild(searchSection);

        return tabContent;
    }

    // Create requests tab content
    function createRequestsTab(user) {
        const tabContent = document.createElement('div');
        tabContent.className = 'tab-content';
        tabContent.id = 'requests-tab';
        
        // Get friend requests
        const friendRequests = user.friendRequests || [];
        
        if (friendRequests.length === 0) {
            tabContent.innerHTML = `
                <div class="card text-center">
                    <h3>No Friend Requests</h3>
                    <p>You don't have any pending friend requests.</p>
                </div>
            `;
        } else {
            const requestsList = document.createElement('div');
            requestsList.className = 'friends-list';
            
            // Get all users
            const users = window.utils.storage.get('users') || [];
            
            // Add request cards
            friendRequests.forEach(request => {
                const requester = users.find(u => u.id === request.from);
                if (requester) {
                    const requestCard = document.createElement('div');
                    requestCard.className = 'friend-card';
                    
                    // Format date
                    const requestDate = new Date(request.date);
                    const formattedDate = requestDate.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                    });
                    
                    requestCard.innerHTML = `
                        <img src="${requester.avatar}" alt="${requester.name}" class="friend-avatar">
                        <div class="friend-info">
                            <div class="friend-name">${requester.name}</div>
                            <div class="friend-status">Request sent on ${formattedDate}</div>
                        </div>
                        <div class="request-actions">
                            <button class="button button-primary request-accept" data-id="${requester.id}">Accept</button>
                            <button class="button button-secondary request-decline" data-id="${requester.id}">Decline</button>
                        </div>
                    `;
                    
                    requestsList.appendChild(requestCard);
                }
            });
            
            tabContent.appendChild(requestsList);
        }
        
        return tabContent;
    }

    // Create history tab content
    function createHistoryTab(user) {
        const tabContent = document.createElement('div');
        tabContent.className = 'tab-content';
        tabContent.id = 'history-tab';
        
        // Check if user has any test history (either color or bad personality tests)
        const hasColorHistory = user.personalityHistory && user.personalityHistory.length > 0;
        const hasBadHistory = user.badPersonality && user.badPersonality.length > 0;
        
        if (!hasColorHistory && !hasBadHistory) {
            tabContent.innerHTML = `
                <div class="empty-history">
                    <h3>No Test History</h3>
                    <p>You haven't taken any personality tests yet.</p>
                    <a href="test.html" class="button button-primary mt-2">Take the Test</a>
                </div>
            `;
            return tabContent;
        }
        
        // Create history card
        const historyCard = document.createElement('div');
        historyCard.className = 'card';
        
        historyCard.innerHTML = `
            <h3 class="mb-1">Your Test History</h3>
            <p>See how your personality has evolved over time. View your past test results below.</p>
        `;
        
        // Create history list
        const historyList = document.createElement('div');
        historyList.className = 'history-list mt-2';
        
        // Create combined history array
        let combinedHistory = [];
        
        // Add color personality tests to combined history
        if (hasColorHistory) {
            user.personalityHistory.forEach(entry => {
                combinedHistory.push({
                    ...entry,
                    type: 'color'
                });
            });
        }
        
        // Add bad personality tests to combined history
        // Add bad personality tests to combined history
if (hasBadHistory) {
    user.badPersonality.forEach(entry => {
        // Check if it's a "no negative traits" entry
        if (entry.noNegativeTraits) {
            combinedHistory.push({
                date: entry.date,
                noNegativeTraits: true,
                type: 'bad'
            });
        } else if (entry.traits) {
            combinedHistory.push({
                date: entry.date,
                traits: entry.traits,
                type: 'bad'
            });
        }
    });
}
        
        // Sort all history by date (newest first)
        const sortedHistory = [...combinedHistory].sort((a, b) => {
            return new Date(b.date) - new Date(a.date);
        });
        
        // Add history entries
        sortedHistory.forEach((entry, index) => {
            const historyEntry = document.createElement('div');
            historyEntry.className = 'history-entry';
            
            // Format date
            const testDate = new Date(entry.date);
            const formattedDate = testDate.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
            
            // Create content based on test type
            if (entry.type === 'color') {
                // Color personality test
                const colorBadges = entry.colors.map((color, index) => {
                    const labels = ["Primary", "Secondary", "Tertiary"];
                    const label = index < 3 ? labels[index] : "";
                    return `
                        <span class="history-color-badge" style="background-color: ${color.color}; ${color.name === 'WHITE' ? 'color: #333;' : ''}">
                            ${color.name} ${label ? `( ${label} )` : ''}
                        </span>
                    `;
                }).join('');
                
                historyEntry.innerHTML = `
    <div class="history-date">
        Test #${sortedHistory.length - index} (${formattedDate})
        <span class="history-type-label color-type">Color Test</span>
    </div>
    <div class="history-colors">
        ${colorBadges}
    </div>
    <div>
        <strong>Primary:</strong> ${entry.colors[0].title} - ${entry.colors[0].description}
    </div>
`;

                
                // Add "Set as Current" button if not the current personality
                const isCurrentPersonality = user.personality === entry.colors;
                if (!isCurrentPersonality) {
                    const setCurrentBtn = document.createElement('button');
                    setCurrentBtn.className = 'button button-primary mt-1';
                    setCurrentBtn.textContent = 'Set as Current Personality';
                    setCurrentBtn.addEventListener('click', () => {
                        setCurrentPersonality(user, entry);
                    });       
                    historyEntry.appendChild(setCurrentBtn);

                    // Add "Share to Chat" button
const shareToChatBtn = document.createElement('button');
shareToChatBtn.className = 'button button-secondary mt-1 ml-1';
shareToChatBtn.innerHTML = '<i class="fas fa-share-alt"></i> Share to Chat';
shareToChatBtn.addEventListener('click', () => {
    showShareToChatModal(user, entry);
});
historyEntry.appendChild(shareToChatBtn);
                } else {
                    const currentLabel = document.createElement('div');
                    currentLabel.className = 'mt-1';
                    currentLabel.innerHTML = '<em>Current personality profile</em>';
                    historyEntry.appendChild(currentLabel);
                }
            } else if (entry.type === 'bad') {
                // Bad personality test
                if (entry.noNegativeTraits) {
                    // Special handling for "no negative traits" result
                    historyEntry.innerHTML = `
                        <div class="history-date">
                            Test #${sortedHistory.length - index} (${formattedDate})
                            <span class="history-type-label bad-type">Negative Trait Test</span>
                        </div>
                        <div class="positive-result">
                            <h3><i class="fas fa-medal personality-icon"></i> Congratulations!</h3>
                            <p>Based on your responses, you don't show significant tendencies toward any negative personality traits. This suggests you have a well-balanced personality with healthy interpersonal patterns.</p>
                        </div>
                    `;
                    
                    // Add "Set as Current" button if not the current bad personality
                    const isCurrentBadPersonality = user.badPersonality[0] && 
                        user.badPersonality[0].date === entry.date;
                        
                    if (!isCurrentBadPersonality) {
                        const setCurrentBtn = document.createElement('button');
                        setCurrentBtn.className = 'button button-primary mt-1';
                        setCurrentBtn.textContent = 'Set as Current Result';
                        setCurrentBtn.addEventListener('click', () => {
                            setCurrentBadPersonality(user, entry);
                        });
                        
                        historyEntry.appendChild(setCurrentBtn);
                    } else {
                        const currentLabel = document.createElement('div');
                        currentLabel.className = 'mt-1';
                        currentLabel.innerHTML = '<em>Current negative traits profile</em>';
                        historyEntry.appendChild(currentLabel);
                    }
                } else if (entry.traits && entry.traits.length > 0) {
                    // Regular bad personality test with traits
                    const traitBadges = entry.traits.map(trait => `
                        <span class="bad-personality-badge" style="background-color: #${trait.color || '555555'}">
                            ${trait.name}
                        </span>
                    `).join('');
                    
                    historyEntry.innerHTML = `
                        <div class="history-date">
                            Test #${sortedHistory.length - index} (${formattedDate})
                            <span class="history-type-label bad-type">Negative Trait Test</span>
                        </div>
                        <div class="history-colors">
                            ${traitBadges}
                        </div>
                        <div>
                            <strong>Primary Traits:</strong> These negative personality traits were identified in your assessment.
                        </div>
                    `;
                    
                    // Add "Set as Current" button for bad personality
                    const isCurrentBadPersonality = user.badPersonality[0] && 
                        user.badPersonality[0].date === entry.date;
                        
                    if (!isCurrentBadPersonality) {
                        const setCurrentBtn = document.createElement('button');
                        setCurrentBtn.className = 'button button-primary mt-1';
                        setCurrentBtn.textContent = 'Set as Current Negative Traits';
                        setCurrentBtn.addEventListener('click', () => {
                            setCurrentBadPersonality(user, entry);
                        });
                        
                        historyEntry.appendChild(setCurrentBtn);
                    } else {
                        const currentLabel = document.createElement('div');
                        currentLabel.className = 'mt-1';
                        currentLabel.innerHTML = '<em>Current negative traits profile</em>';
                        historyEntry.appendChild(currentLabel);
                    }
                }
            }
            
            historyList.appendChild(historyEntry);
        });
        
        tabContent.appendChild(historyCard);
        tabContent.appendChild(historyList);
        
        return tabContent;
    }

    // Create chat tab content
    function createChatTab(user) {
        const tabContent = document.createElement('div');
        tabContent.className = 'tab-content';
        tabContent.id = 'chat-tab';
        
        // Create chat container
        const chatContainer = document.createElement('div');
        chatContainer.className = 'chat-container';
        
        // Create chat sidebar with conversations
        const chatSidebar = document.createElement('div');
        chatSidebar.className = 'chat-sidebar';
        
        chatSidebar.innerHTML = `
            <div class="chat-sidebar-header">
                <h3>Conversations</h3>
            </div>
            <div class="chat-conversations"></div>
        `;
        
        // Create chat main area
        const chatMain = document.createElement('div');
        chatMain.className = 'chat-main';
        
        chatMain.innerHTML = `
            <div class="chat-header">
                <div class="chat-start-message">
                    <h3>Select a conversation to start chatting</h3>
                    <p>Or add new friends to begin a conversation.</p>
                </div>
            </div>
            <div class="chat-messages"></div>
            <div class="chat-input">
                <textarea class="chat-input-field" placeholder="Type a message..." disabled></textarea>
                <button class="chat-input-send" disabled>Send</button>
            </div>
        `;
        
        // Add to chat container
        chatContainer.appendChild(chatSidebar);
        chatContainer.appendChild(chatMain);
        
        // Add to tab content
        tabContent.appendChild(chatContainer);
        
        // Populate conversations sidebar
        populateConversations(chatSidebar, user);
        
        return tabContent;
    }

    // Function to set a history entry as current personality
    function setCurrentPersonality(user, historyEntry) {
        // Update user's current personality
        user.personality = historyEntry.colors;
        
        // Update user in storage
        window.utils.storage.set('currentUser', user);
        
        // Update user in users array
        const users = window.utils.storage.get('users') || [];
        const userIndex = users.findIndex(u => u.id === user.id);
        if (userIndex !== -1) {
            users[userIndex].personality = historyEntry.colors;
            window.utils.storage.set('users', users);
        }
        
        // Show notification
        showNotification('Profile updated with selected personality!');
        
        // Refresh profile
        const profileContainer = document.getElementById('profile-container');
        profileContainer.innerHTML = '';
        buildProfileUI(profileContainer, user);
    }

    // Function to set a bad personality history entry as current bad personality
    function setCurrentBadPersonality(user, historyEntry) {
        // First make sure we have the bad personality array
        if (!user.badPersonality) {
            user.badPersonality = [];
        }
        
        // Find this entry in the bad personality array
        const entryIndex = user.badPersonality.findIndex(entry => entry.date === historyEntry.date);
        
        if (entryIndex !== -1) {
            // Move this entry to the front of the array
            const entry = user.badPersonality.splice(entryIndex, 1)[0];
            user.badPersonality.unshift(entry);
            
            // Update user in storage
            window.utils.storage.set('currentUser', user);
            
            // Update user in users array
            const users = window.utils.storage.get('users') || [];
            const userIndex = users.findIndex(u => u.id === user.id);
            if (userIndex !== -1) {
                users[userIndex].badPersonality = user.badPersonality;
                window.utils.storage.set('users', users);
            }
            
            // Show notification
            showNotification('Profile updated with selected bad personality traits!');
            
            // Refresh profile
            const profileContainer = document.getElementById('profile-container');
            profileContainer.innerHTML = '';
            buildProfileUI(profileContainer, user);
        }
    }

    // Function to show notification
    function showNotification(message) {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = 'chat-notification';
        
        notification.innerHTML = `
            <div class="notification-content">${message}</div>
            <div class="notification-close">×</div>
        `;
        
        // Add to body
        document.body.appendChild(notification);
        
        // Add close button listener
        const closeButton = notification.querySelector('.notification-close');
        closeButton.addEventListener('click', () => {
            document.body.removeChild(notification);
        });
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 5000);
    }

    // Show edit profile modal with enhanced avatar options
    function showEditProfileModal(user) {
        // Create modal overlay
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';

        // Create modal
        const modal = document.createElement('div');
        modal.className = 'modal';

        // Set up animal avatar options with cute animals
        // Set up avatar options
const animalAvatars = [
    { src: 'puppy.png', alt: 'Profile Image 1' },
    { src: 'bunny.png', alt: 'Profile Image 2' },
    { src: 'bear.png', alt: 'Profile Image 3' },
    { src: 'kitten.png', alt: 'Profile Image 4' },
    { src: 'fox.png', alt: 'Profile Image 5' }
];

        // Create avatar options HTML
        const avatarOptionsHTML = animalAvatars.map(avatar => 
            `<img src="${avatar.src}" alt="${avatar.alt}" class="avatar-option" style="width: 60px; height: 60px; border-radius: 50%; cursor: pointer; border: 2px solid transparent;">`
        ).join('');

        modal.innerHTML = `
            <h2 class="mb-2">Edit Profile</h2>
            
            <div class="form-group">
                <label for="edit-name" class="form-label">Full Name</label>
                <input type="text" id="edit-name" class="form-input" value="${user.name}">
            </div>
            
            <div class="form-group">
                <label for="edit-nickname" class="form-label">Nickname</label>
                <input type="text" id="edit-nickname" class="form-input" value="${user.nickname}">
            </div>
            
            <div class="form-group">
                <label class="form-label">Profile Picture</label>
                <div style="display: flex; gap: 1rem; overflow-x: auto; padding: 0.5rem 0; margin-bottom: 10px;">
                    ${avatarOptionsHTML}
                </div>
                
                <div class="upload-container">
                    <label for="avatar-upload" class="upload-button">Upload Your Own Image</label>
                    <input type="file" id="avatar-upload" accept="image/*" style="display: none;">
                    <div id="upload-preview" style="display: none; margin-top: 10px;">
                        <img id="preview-image" style="max-width: 100px; max-height: 100px; border-radius: 50%;">
                        <button id="remove-upload" class="button button-small">Remove</button>
                    </div>
                </div>
            </div>
            
            <div style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 2rem;">
                <button class="button button-secondary cancel-edit">Cancel</button>
                <button class="button button-primary save-profile">Save Changes</button>
            </div>
        `;

        modalOverlay.appendChild(modal);
        document.body.appendChild(modalOverlay);

        // Set up file upload functionality
        const avatarUpload = modal.querySelector('#avatar-upload');
        const uploadPreview = modal.querySelector('#upload-preview');
        const previewImage = modal.querySelector('#preview-image');
        const removeUploadBtn = modal.querySelector('#remove-upload');

        avatarUpload.addEventListener('change', function(e) {
            if (this.files && this.files[0]) {
                const file = this.files[0];
                const reader = new FileReader();
                
                reader.onload = function(e) {
                    previewImage.src = e.target.result;
                    uploadPreview.style.display = 'flex';
                    
                    // When a custom image is uploaded, deselect all animal avatars
                    avatarOptions.forEach(avatar => {
                        avatar.style.border = '2px solid transparent';
                    });
                    
                    // Set the selected avatar to the uploaded image
                    selectedAvatar = e.target.result;
                };
                
                reader.readAsDataURL(file);
            }
        });

        removeUploadBtn.addEventListener('click', function() {
            avatarUpload.value = '';
            uploadPreview.style.display = 'none';
            selectedAvatar = user.avatar; // Reset to current avatar
        });

        // Avatar selection
        const avatarOptions = modal.querySelectorAll('.avatar-option');
        let selectedAvatar = user.avatar;

        avatarOptions.forEach(avatar => {
            if (avatar.src === user.avatar) {
                avatar.style.border = '2px solid var(--primary-color)';
            }
            
            avatar.addEventListener('click', () => {
                // Clear custom upload preview
                uploadPreview.style.display = 'none';
                avatarUpload.value = '';
                
                // Update animal avatar selection
                avatarOptions.forEach(a => a.style.border = '2px solid transparent');
                avatar.style.border = '2px solid var(--primary-color)';
                selectedAvatar = avatar.src;
            });
        });

        // Cancel button
        const cancelButton = modal.querySelector('.cancel-edit');
        cancelButton.addEventListener('click', () => {
            document.body.removeChild(modalOverlay);
        });

        // Save button
        const saveButton = modal.querySelector('.save-profile');
        saveButton.addEventListener('click', () => {
            const name = modal.querySelector('#edit-name').value;
            const nickname = modal.querySelector('#edit-nickname').value;
            
            // Validate input
            if (!name || !nickname) {
                alert('Please fill in all fields');
                return;
            }
            
            // Update user
            user.name = name;
            user.nickname = nickname;
            user.avatar = selectedAvatar;
            
            // Update in storage
            window.utils.storage.set('currentUser', user);
            
            // Update users list
            const users = window.utils.storage.get('users') || [];
            const userIndex = users.findIndex(u => u.id === user.id);
            if (userIndex !== -1) {
                users[userIndex] = user;
                window.utils.storage.set('users', users);
            }
            
            // Close modal
            document.body.removeChild(modalOverlay);
            
            // Refresh profile
            const profileContainer = document.getElementById('profile-container');
            profileContainer.innerHTML = '';
            buildProfileUI(profileContainer, user);
            
            // Show success notification
            showNotification('Profile updated successfully!');
        });
    }

    // Friend request functions
    function sendFriendRequest(user, friendId) {
        // Get all users
        const users = window.utils.storage.get('users') || [];

        // Find friend user
        const friendIndex = users.findIndex(u => u.id === friendId);
        if (friendIndex === -1) return;

        // Add request to friend's requests
        const friendUser = users[friendIndex];

        // Initialize friendRequests array if it doesn't exist
        if (!friendUser.friendRequests) {
            friendUser.friendRequests = [];
        }

        // Check if request already exists
        if (friendUser.friendRequests.some(r => r.from === user.id)) return;

        // Add request
        friendUser.friendRequests.push({
            from: user.id,
            date: new Date().toISOString()
        });

        // Update friend in users list
        users[friendIndex] = friendUser;
        window.utils.storage.set('users', users);

        // Show notification
        showNotification(`Friend request sent to ${friendUser.name}!`);
    }

    function acceptFriendRequest(user, requesterId) {
        // Get all users
        const users = window.utils.storage.get('users') || [];

        // Find requester user
        const requesterIndex = users.findIndex(u => u.id === requesterId);
        if (requesterIndex === -1) return;

        // Find current user
        const userIndex = users.findIndex(u => u.id === user.id);
        if (userIndex === -1) return;

        // Get users
        const requester = users[requesterIndex];
        const currentUser = users[userIndex];

        // Add each other to friends lists
        if (!currentUser.friends) {
            currentUser.friends = [];
        }

        if (!requester.friends) {
            requester.friends = [];
        }

        currentUser.friends.push(requesterId);
        requester.friends.push(user.id);

        // Remove request from current user's requests
        currentUser.friendRequests = (currentUser.friendRequests || []).filter(r => r.from !== requesterId);

        // Update users in list
        users[userIndex] = currentUser;
        users[requesterIndex] = requester;

        // Update storage
        window.utils.storage.set('users', users);
        window.utils.storage.set('currentUser', currentUser);

        // Create a conversation between users
        createConversation(currentUser, requester);

        // Show notification
        showNotification(`You are now friends with ${requester.name}!`);
    }

    function declineFriendRequest(user, requesterId) {
        // Get all users
        const users = window.utils.storage.get('users') || [];

        // Find current user
        const userIndex = users.findIndex(u => u.id === user.id);
        if (userIndex === -1) return;

        // Get current user
        const currentUser = users[userIndex];

        // Find requester name
        const requester = users.find(u => u.id === requesterId);
        const requesterName = requester ? requester.name : 'User';

        // Remove request from current user's requests
        currentUser.friendRequests = (currentUser.friendRequests || []).filter(r => r.from !== requesterId);

        // Update user in list
        users[userIndex] = currentUser;

        // Update storage
        window.utils.storage.set('users', users);
        window.utils.storage.set('currentUser', currentUser);

        // Show notification
        showNotification(`Friend request from ${requesterName} declined.`);
    }

    // Chat functions
    function createConversation(user1, user2) {
        // Create conversation ID
        const conversationId = [user1.id, user2.id].sort().join('-');

        // Get conversations from storage
        const conversations = window.utils.storage.get('conversations') || {};

        // Check if conversation already exists
        if (conversations[conversationId]) return;

        // Create new conversation
        conversations[conversationId] = {
            id: conversationId,
            participants: [user1.id, user2.id],
            messages: [],
            createdAt: new Date().toISOString()
        };

        // Save to storage
        window.utils.storage.set('conversations', conversations);
    }

    // View user profile
    function viewUserProfile(user) {
        // Create modal overlay
        const modalOverlay = document.createElement('div');
        modalOverlay.className = 'modal-overlay';

        // Create modal
        const modal = document.createElement('div');
        modal.className = 'modal';

        // Create user profile card
        const profileCard = document.createElement('div');
        profileCard.className = 'view-profile-card';

        // Basic profile info that's always shown
        let profileContent = `
            <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1.5rem;">
                <img src="${user.avatar}" alt="${user.name}" style="width: 80px; height: 80px; border-radius: 50%;">
                <div>
                    <h2 style="margin-bottom: 0.3rem;">${user.name}</h2>
                    <p style="color: var(--text-secondary);">@${user.nickname}</p>
                </div>
                <button class="button button-primary" style="margin-left: auto;"><i class="fas fa-arrow-left"></i> Back</button>
            </div>
        `;

        // Show personality data only if the user has taken the test
        // Show personality data only if the user has taken the test
        if (user.personality && user.personality.length > 0) {
            profileContent += `
                <div style="margin-bottom: 1.5rem;">
                    <h3 style="margin-bottom: 1rem;">Personality Colors</h3>
                    <div class="personality-colors">
                        ${user.personality.map((color, index) => {
                            // Add label based on index
                            const labels = ["Primary", "Secondary", "Tertiary"];
                            const label = index < 3 ? labels[index] : "";
                            
                            return `
                                <div class="color-card">
                                    <div class="color-header" style="background-color: ${color.color}; ${color.name === 'WHITE' ? 'color: #333;' : ''}">
                                        ${color.name} ${label ? `<span class="color-label">( ${label} )</span>` : ''}
                                    </div>
                                    <div class="color-body">
                                        <h3 class="color-title">${color.title}</h3>
                                        <p class="color-description">${color.description}</p>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>
            `;
        } else {
            // Show message that user hasn't taken the test yet
            profileContent += `
                <div style="margin-bottom: 1.5rem; text-align: center;">
                    <p style="padding: 2rem; background-color: #f5f5f5; border-radius: 10px;">
                        ${user.name} hasn't taken the personality test yet.
                    </p>
                </div>
            `;
        }

        profileCard.innerHTML = profileContent;

        modal.appendChild(profileCard);
        modalOverlay.appendChild(modal);
        document.body.appendChild(modalOverlay);

       
        // Add close button listener
const closeButton = modal.querySelector('.button-primary');
closeButton.addEventListener('click', () => {
    document.body.removeChild(modalOverlay);
});
    }

    // Set up color filter listeners after DOM is populated
    function setupColorFilterListeners(container, user) {
        const searchInput = container.querySelector('#search-users');
        const searchResults = container.querySelector('.search-results');
        const colorFilterButtons = container.querySelectorAll('.color-filter-btn');

        // Track active color filter
        // Track active color filter - default to first color (RED) instead of ALL
let activeColorFilter = 'RED';

        // Set up color filter buttons
        colorFilterButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active state visually
                colorFilterButtons.forEach(btn => {
                    btn.classList.remove('active');
                    btn.style.opacity = '0.7';
                    btn.style.boxShadow = 'none';
                });
                button.classList.add('active');
                button.style.opacity = '1';
                button.style.boxShadow = '0 0 5px rgba(0,0,0,0.3)';
                
                // Update active filter
                activeColorFilter = button.dataset.color;
                
                // Re-run search with current filter
                performSearch(searchInput.value.trim(), activeColorFilter);
            });
        });

       // Highlight the first filter (RED) by default
const firstFilterBtn = colorFilterButtons[0];
if (firstFilterBtn) {
    firstFilterBtn.classList.add('active');
    firstFilterBtn.style.opacity = '1';
    firstFilterBtn.style.boxShadow = '0 0 5px rgba(0,0,0,0.3)';
} 

        // Update the search function to use color filter
        if (searchInput) {
            searchInput.addEventListener('input', window.utils.debounce(() => {
                const query = searchInput.value.trim().toLowerCase();
                performSearch(query, activeColorFilter);
            }, 300));
        }

        function performSearch(query, colorFilter) {
            
            // Get all users
            const users = window.utils.storage.get('users') || [];
            
            // Filter users by query and color
            const filteredUsers = users.filter(u => {
                // Skip current user
                if (u.id === user.id) return false;
                
                // Skip already friends
                if (user.friends && user.friends.includes(u.id)) return false;
                
                // Check name/email match if query exists
                const matchesQuery = query.length < 2 || 
                    u.name.toLowerCase().includes(query) || 
                    u.email.toLowerCase().includes(query);
                
                // Check color match if filter is active
                // Check color match - always filter by color now
const matchesColor = u.personality && 
u.personality.some(p => p.name === colorFilter);
                
                return matchesQuery && matchesColor;
            });
            
            // Show results
            if (filteredUsers.length === 0) {
                searchResults.innerHTML = '<p>No users found with that color personality</p>';
            } else {
                searchResults.innerHTML = '';
                
                filteredUsers.forEach(u => {
                    const userCard = document.createElement('div');
                    userCard.className = 'friend-card';
                    
                    // Check if user has personality data
                    const personalityInfo = u.personality && u.personality.length > 0 
                        ? `${u.personality[0].name} Personality` 
                        : 'No personality data yet';
                    
                    // If there's personality data, show color badges
                    let colorBadges = '';
                    if (u.personality && u.personality.length > 0) {
                        colorBadges = `
                            <div class="personality-badges">
                                ${u.personality.map(p => 
                                    `<span class="personality-badge" style="background-color: ${p.color}; color: ${p.name === 'WHITE' || p.name === 'YELLOW' ? '#333' : '#fff'};">${p.name}</span>`
                                ).join('')}
                            </div>
                        `;
                    }
                    
                    userCard.innerHTML = `
                        <img src="${u.avatar}" alt="${u.name}" class="friend-avatar">
                        <div class="friend-info">
                            <div class="friend-name">${u.name}</div>
                            <div class="friend-status">${personalityInfo}</div>
                            ${colorBadges}
                        </div>
                        <button class="button button-primary add-friend" data-id="${u.id}">Add Friend</button>
                    `;
                    
                    searchResults.appendChild(userCard);
                });
                
                // Add friend request button listeners
                const addFriendButtons = searchResults.querySelectorAll('.add-friend');
                addFriendButtons.forEach(button => {
                    button.addEventListener('click', () => {
                        const friendId = button.dataset.id;
                        sendFriendRequest(user, friendId);
                        button.textContent = 'Request Sent';
                        button.disabled = true;
                    });
                });
            }
        }
    }

    // Load conversation into chat main area
    function loadConversation(conversation, otherUser) {
        // Get current user
        const currentUser = window.utils.storage.get('currentUser');

        // Get chat main components
        const chatHeader = document.querySelector('.chat-header');
        const chatMessages = document.querySelector('.chat-messages');
        const chatInputField = document.querySelector('.chat-input-field');
        const chatSendButton = document.querySelector('.chat-input-send');

        // Get personality info for header
        const personalityInfo = otherUser.personality && otherUser.personality.length > 0 
        ? `${otherUser.personality[0].name} Personality` 
        : 'No personality data yet';

        // Update chat header
        chatHeader.innerHTML = `
        <img src="${otherUser.avatar}" alt="${otherUser.name}" class="chat-header-avatar">
        <div class="chat-header-info">
            <div class="chat-header-name">${otherUser.name}</div>
            <div class="chat-header-status">${personalityInfo}</div>
        </div>
        <div class="chat-header-actions">
            <div class="chat-header-action view-profile" data-id="${otherUser.id}" title="View Profile">👤</div>
        </div>
        `;

        // Clear chat messages
        chatMessages.innerHTML = '';

        // Load messages
        if (!conversation.messages || conversation.messages.length === 0) {
        chatMessages.innerHTML = `
            <div style="text-align: center; color: var(--text-secondary); margin: 2rem 0;">
                No messages yet. Send a message to start the conversation!
            </div>
        `;
        } else {
            conversation.messages.forEach(message => {
                const messageElement = document.createElement('div');
                messageElement.className = `message ${message.senderId === currentUser.id ?
                    'message-sent' : 'message-received'}`;
                
                // Check if this is a shared result message
                if (message.isSharedResult) {
                    messageElement.innerHTML = `
                        <div class="message-text">${message.text}</div>
                        <div class="message-time">${formatMessageTime(new Date(message.timestamp))}</div>
                    `;
                } else {
                    messageElement.innerHTML = `
                        <div class="message-text">${message.text}</div>
                        <div class="message-time">${formatMessageTime(new Date(message.timestamp))}</div>
                    `;
                }
                
                chatMessages.appendChild(messageElement);
            });
            
            // Scroll to bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        // Add view profile button listener
        const viewProfileButton = chatHeader.querySelector('.view-profile');
        if (viewProfileButton) {
            viewProfileButton.addEventListener('click', () => {
                viewUserProfile(otherUser);
            });
        }

        // Enable chat input
        chatInputField.disabled = false;
        chatSendButton.disabled = false;

        // Add event listener to send button
        chatSendButton.onclick = () => {
            sendMessage(conversation, otherUser);
        };

        // Add event listener to input field (send on Enter)
        chatInputField.onkeypress = (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage(conversation, otherUser);
            }
        };
    }

    // Send a message
    function sendMessage(conversation, recipient) {
        // Get current user
        const currentUser = window.utils.storage.get('currentUser');

        // Get message text
        const inputField = document.querySelector('.chat-input-field');
        const messageText = inputField.value.trim();

        if (!messageText) return;

        // Create message
        const message = {
            id: Date.now().toString(),
            senderId: currentUser.id,
            recipientId: recipient.id,
            text: messageText,
            timestamp: new Date().toISOString(),
            read: false
        };

        // Initialize messages array if it doesn't exist
        if (!conversation.messages) {
            conversation.messages = [];
        }

        // Add message to conversation
        conversation.messages.push(message);

        // Update conversation in storage
        const conversations = window.utils.storage.get('conversations') || {};
        conversations[conversation.id] = conversation;
        window.utils.storage.set('conversations', conversations);

        // Clear input field
        inputField.value = '';

        // Add message to chat
        const chatMessages = document.querySelector('.chat-messages');

        // Remove empty message placeholder if it exists
        const emptyPlaceholder = chatMessages.querySelector('div[style*="text-align: center"]');
        if (emptyPlaceholder) {
            chatMessages.removeChild(emptyPlaceholder);
        }

        // Create message element
        const messageElement = document.createElement('div');
        messageElement.className = 'message message-sent';

        messageElement.innerHTML = `
            <div class="message-text">${message.text}</div>
            <div class="message-time">${formatMessageTime(new Date(message.timestamp))}</div>
        `;

        chatMessages.appendChild(messageElement);

        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }

    // Format message time
    function formatMessageTime(date) {
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (date >= today) {
            // Today: show time only
            return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
        } else if (date >= yesterday) {
            // Yesterday: show "Yesterday"
            return 'Yesterday';
        } else {
            // Older: show date
            return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        }
    }

    // Populate conversations sidebar
    function populateConversations(sidebar, user) {
        // Get all users
        const users = window.utils.storage.get('users') || [];

        // Get conversations from storage
        const conversations = window.utils.storage.get('conversations') || {};

        // Get conversation container
        const conversationsContainer = sidebar.querySelector('.chat-conversations');

        // Check if user has any conversations
        const userConversations = Object.values(conversations).filter(conv => 
        conv.participants && conv.participants.includes(user.id)
        );

        if (userConversations.length === 0) {
        conversationsContainer.innerHTML = `
            <div style="padding: 1rem; text-align: center; color: var(--text-secondary);">
                No conversations yet. Add friends to start chatting!
            </div>
        `;
        return;
        }

        // Sort conversations by last message date (or creation date if no messages)
        userConversations.sort((a, b) => {
        const aDate = a.messages && a.messages.length > 0 
            ? new Date(a.messages[a.messages.length - 1].timestamp) 
            : new Date(a.createdAt);
        const bDate = b.messages && b.messages.length > 0 
            ? new Date(b.messages[b.messages.length - 1].timestamp) 
            : new Date(b.createdAt);
        return bDate - aDate;
        });

        // Add conversations to sidebar
        userConversations.forEach(conv => {
        // Get other participant
        const otherParticipantId = conv.participants.find(id => id !== user.id);
        const otherUser = users.find(u => u.id === otherParticipantId);

        if (!otherUser) return;

        // Create conversation element
        const conversationElement = document.createElement('div');
        conversationElement.className = 'chat-conversation';
        conversationElement.dataset.id = conv.id;

        // Get last message (if any)
        const lastMessage = conv.messages && conv.messages.length > 0 
            ? conv.messages[conv.messages.length - 1] 
            : null;

        const messagePreview = lastMessage 
            ? lastMessage.text.length > 25 
                ? lastMessage.text.substring(0, 25) + '...' 
                : lastMessage.text 
            : 'Start a conversation';

        const messageTime = lastMessage 
            ? formatMessageTime(new Date(lastMessage.timestamp)) 
            : '';

        conversationElement.innerHTML = `
            <img src="${otherUser.avatar}" alt="${otherUser.name}" class="conversation-avatar">
            <div class="conversation-info">
                <div class="conversation-name">${otherUser.name}</div>
                <div class="conversation-message">${messagePreview}</div>
            </div>
            <div class="conversation-time">${messageTime}</div>
        `;

        // Add click handler to load conversation
        conversationElement.addEventListener('click', () => {
            // Remove active class from all conversations
            const allConversations = conversationsContainer.querySelectorAll('.chat-conversation');
            allConversations.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked conversation
            conversationElement.classList.add('active');
            
            // Load conversation
            loadConversation(conv, otherUser);
        });

        conversationsContainer.appendChild(conversationElement);
        });
    }

    // Add event listeners to profile UI
    function addProfileEventListeners(container, user) {
        // Tab switching
        const profileTabs = container.querySelectorAll('.profile-tab');
        const tabContents = container.querySelectorAll('.tab-content');

        profileTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                // Remove active class from all tabs and contents
                profileTabs.forEach(t => t.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));
                
                // Add active class to clicked tab and corresponding content
                tab.classList.add('active');
                const tabId = `${tab.dataset.tab}-tab`;
                document.getElementById(tabId).classList.add('active');
                
                // Set up color filter listeners if this is the friends tab
                if (tab.dataset.tab === 'friends') {
                    setupColorFilterListeners(container, user);
                }
            });
        });

        // Logout button
        const logoutButton = container.querySelector('.logout');
        if (logoutButton) {
            logoutButton.addEventListener('click', () => {
                // Remove current user from storage
                window.utils.storage.remove('currentUser');
                
                // Redirect to login page
                window.location.href = 'login.html';
            });
        }

        // Edit profile button
        const editButton = container.querySelector('.edit-profile');
        if (editButton) {
            editButton.addEventListener('click', () => {
                // Show edit profile modal
                showEditProfileModal(user);
            });
        }

        // Friend request actions
        const acceptButtons = container.querySelectorAll('.request-accept');
        const declineButtons = container.querySelectorAll('.request-decline');

        acceptButtons.forEach(button => {
            button.addEventListener('click', () => {
                const requesterId = button.dataset.id;
                acceptFriendRequest(user, requesterId);
                
                // Refresh requests tab
                const requestsTab = container.querySelector('#requests-tab');
                requestsTab.innerHTML = '';
                const newRequestsTab = createRequestsTab(window.utils.storage.get('currentUser'));
                requestsTab.innerHTML = newRequestsTab.innerHTML;
                
                // Refresh friends tab
                const friendsTab = container.querySelector('#friends-tab');
                friendsTab.innerHTML = '';
                const newFriendsTab = createFriendsTab(window.utils.storage.get('currentUser'));
                friendsTab.innerHTML = newFriendsTab.innerHTML;
                
                // Re-add event listeners
                addProfileEventListeners(container, window.utils.storage.get('currentUser'));
            });
        });

        declineButtons.forEach(button => {
            button.addEventListener('click', () => {
                const requesterId = button.dataset.id;
                declineFriendRequest(user, requesterId);
                
                // Refresh requests tab
                const requestsTab = container.querySelector('#requests-tab');
                requestsTab.innerHTML = '';
                const newRequestsTab = createRequestsTab(window.utils.storage.get('currentUser'));
                requestsTab.innerHTML = newRequestsTab.innerHTML;
                
                // Re-add event listeners
                addProfileEventListeners(container, window.utils.storage.get('currentUser'));
            });
        });

        // User search
        const searchInput = container.querySelector('#search-users');
        const searchResults = container.querySelector('.search-results');

        if (searchInput) {
            searchInput.addEventListener('input', window.utils.debounce(() => {
                const query = searchInput.value.trim().toLowerCase();
                
                if (query.length < 2) {
                    searchResults.innerHTML = '';
                    return;
                }
                
                // Get all users
                const users = window.utils.storage.get('users') || [];
                
                // Filter users by query
                const filteredUsers = users.filter(u => 
                    (u.name.toLowerCase().includes(query) || 
                    u.email.toLowerCase().includes(query)) && 
                    u.id !== user.id &&
                    !(user.friends && user.friends.includes(u.id))
                );
                
                // Show results
                if (filteredUsers.length === 0) {
                    searchResults.innerHTML = '<p>No users found</p>';
                } else {
                    searchResults.innerHTML = '';
                    
                    filteredUsers.forEach(u => {
                        const userCard = document.createElement('div');
                        userCard.className = 'friend-card';
                        
                        // Check if user has personality data
                        const personalityInfo = u.personality && u.personality.length > 0 
                            ? `${u.personality[0].name} Personality` 
                            : 'No personality data yet';
                        
                        userCard.innerHTML = `
                            <img src="${u.avatar}" alt="${u.name}" class="friend-avatar">
                            <div class="friend-info">
                                <div class="friend-name">${u.name}</div>
                                <div class="friend-status">${personalityInfo}</div>
                            </div>
                            <button class="button button-primary add-friend" data-id="${u.id}">Add Friend</button>
                        `;
                        
                        searchResults.appendChild(userCard);
                    });
                    
                    // Add friend request button listeners
                    const addFriendButtons = searchResults.querySelectorAll('.add-friend');
                    addFriendButtons.forEach(button => {
                        button.addEventListener('click', () => {
                            const friendId = button.dataset.id;
                            sendFriendRequest(user, friendId);
                            button.textContent = 'Request Sent';
                            button.disabled = true;
                        });
                    });
                }
            }, 300));
        }

        // Chat with friend buttons
        const chatButtons = container.querySelectorAll('.chat-with-friend');

        chatButtons.forEach(button => {
            button.addEventListener('click', () => {
                const friendId = button.dataset.id;
                
                // Switch to chat tab
                const chatTab = container.querySelector('.profile-tab[data-tab="chat"]');
                chatTab.click();
                
                // Get all users
                const users = window.utils.storage.get('users') || [];
                
                // Get friend
                const friend = users.find(u => u.id === friendId);
                
                if (!friend) return;
                
                // Get conversations
                const conversations = window.utils.storage.get('conversations') || {};
                
                // Find conversation with friend
                const conversationId = [user.id, friendId].sort().join('-');
                const conversation = conversations[conversationId];
                
                if (!conversation) {
                    // Create new conversation
                    const newConversation = {
                        id: conversationId,
                        participants: [user.id, friendId],
                        messages: [],
                        createdAt: new Date().toISOString()
                    };
                    
                    conversations[conversationId] = newConversation;
                    window.utils.storage.set('conversations', conversations);
                    
                    // Refresh chat tab
                    const chatTab = container.querySelector('#chat-tab');
                    chatTab.innerHTML = '';
                    const newChatTab = createChatTab(user);
                    chatTab.appendChild(newChatTab);
                    
                    // Re-add event listeners
                    addProfileEventListeners(container, user);
                    
                    // Find and click the new conversation
                    setTimeout(() => {
                        const convElement = document.querySelector(`.chat-conversation[data-id="${conversationId}"]`);
                        if (convElement) {
                            convElement.click();
                        }
                    }, 100);
                } else {
                    // Find and click existing conversation
                    const convElement = document.querySelector(`.chat-conversation[data-id="${conversationId}"]`);
                    if (convElement) {
                        convElement.click();
                    }
                }
            });
        });

        // View friend profile buttons
        const viewProfileButtons = container.querySelectorAll('.view-friend');

        viewProfileButtons.forEach(button => {
            button.addEventListener('click', () => {
                const friendId = button.dataset.id;
                
                // Get all users
                const users = window.utils.storage.get('users') || [];
                
                // Get friend
                const friend = users.find(u => u.id === friendId);
                
                if (friend) {
                    viewUserProfile(friend);
                }
            });
        });

        // "Set as Current" buttons in history tab
        const setCurrentButtons = container.querySelectorAll('#history-tab .button-primary');
        setCurrentButtons.forEach(button => {
            if (button.textContent === 'Set as Current Personality') {
                button.addEventListener('click', function() {
                    // Find the history entry this button belongs to
                    const historyEntry = this.closest('.history-entry');
                    const historyIndex = Array.from(historyEntry.parentNode.children).indexOf(historyEntry);
                    
                    // Get the history data
                    if (user.personalityHistory && user.personalityHistory.length > historyIndex) {
                        const entryToSet = user.personalityHistory[historyIndex];
                        setCurrentPersonality(user, entryToSet);
                    }
                });
            } else if (button.textContent === 'Set as Current Bad Personality') {
                button.addEventListener('click', function() {
                    // Find the history entry this button belongs to
                    const historyEntry = this.closest('.history-entry');
                    
                    // Get data-id from the history entry if available
                    const date = historyEntry.dataset.date;
                    
                    // Find the matching bad personality entry
                    const badEntry = user.badPersonality.find(entry => entry.date === date);
                    if (badEntry) {
                        setCurrentBadPersonality(user, badEntry);
                    }
                });
            }
        });
    }

    // Function to show the share to chat modal
function showShareToChatModal(user, historyEntry) {
    // Create modal overlay
    const modalOverlay = document.createElement('div');
    modalOverlay.className = 'modal-overlay';

    // Create modal
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    // Get user's friends
    const users = window.utils.storage.get('users') || [];
    const friends = (user.friends || []).map(friendId => {
        return users.find(u => u.id === friendId);
    }).filter(friend => friend !== undefined);
    
    // Create friends list HTML
    let friendsListHTML = '';
    if (friends.length === 0) {
        friendsListHTML = '<p>You don\'t have any friends yet. Add friends to share your results.</p>';
    } else {
        friendsListHTML = friends.map(friend => `
            <div class="friend-card share-friend-card">
                <img src="${friend.avatar}" alt="${friend.name}" class="friend-avatar">
                <div class="friend-info">
                    <div class="friend-name">${friend.name}</div>
                </div>
                <button class="button button-primary share-with-friend" data-id="${friend.id}">
                    <i class="fas fa-share-alt"></i> Share
                </button>
            </div>
        `).join('');
    }
    
    // Format date for display
    const testDate = new Date(historyEntry.date);
    const formattedDate = testDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Create content based on test type
    let testContent = '';
    if (historyEntry.type === 'color') {
        // Color personality test
        const colorBadges = historyEntry.colors.map((color, index) => {
            const labels = ["Primary", "Secondary", "Tertiary"];
            const label = index < 3 ? labels[index] : "";
            
            return `
                <span class="history-color-badge" style="background-color: ${color.color}; ${color.name === 'WHITE' ? 'color: #333;' : ''}">
                    ${color.name} ${label ? `(${label})` : ''}
                </span>
            `;
        }).join('');
        
        testContent = `
            <div>
                <div class="history-colors">
                    ${colorBadges}
                </div>
                <div>
                    <strong>Result from:</strong> ${formattedDate}
                </div>
            </div>
        `;
    } else if (historyEntry.type === 'bad') {
        // Check if it's a "no negative traits" result
        if (historyEntry.noNegativeTraits) {
            testContent = `
                <div>
                    <div class="positive-result">
                        <h3><i class="fas fa-medal personality-icon"></i> No Negative Traits</h3>
                        <p>Great news! You don't show significant tendencies toward any negative personality traits.</p>
                    </div>
                    <div>
                        <strong>Result from:</strong> ${formattedDate}
                    </div>
                </div>
            `;
        } else if (historyEntry.traits && historyEntry.traits.length > 0) {
            // Bad personality test with traits
            const traitBadges = historyEntry.traits.map(trait => `
                <span class="bad-personality-badge" style="background-color: #${trait.color || '555555'}">
                    ${trait.name}
                </span>
            `).join('');
            
            testContent = `
                <div>
                    <div class="history-colors">
                        ${traitBadges}
                    </div>
                    <div>
                        <strong>Negative Trait Test Result from:</strong> ${formattedDate}
                    </div>
                </div>
            `;
        }
    }
    
    modal.innerHTML = `
        <h2>Share Test Results</h2>
        <div class="share-preview">
            <h3>Preview:</h3>
            ${testContent}
        </div>
        <h3>Choose a friend to share with:</h3>
        <div class="friends-list">
            ${friendsListHTML}
        </div>
        <div style="display: flex; gap: 1rem; justify-content: flex-end; margin-top: 2rem;">
            <button class="button button-secondary cancel-share">Cancel</button>
        </div>
    `;

    modalOverlay.appendChild(modal);
    document.body.appendChild(modalOverlay);
    
    // Add cancel button event listener
    const cancelButton = modal.querySelector('.cancel-share');
    cancelButton.addEventListener('click', () => {
        document.body.removeChild(modalOverlay);
    });
    
    // Add share button event listeners
    const shareButtons = modal.querySelectorAll('.share-with-friend');
    shareButtons.forEach(button => {
        button.addEventListener('click', () => {
            const friendId = button.dataset.id;
            shareResultWithFriend(user, friendId, historyEntry);
            
            // Update button to show shared
            button.innerHTML = '<i class="fas fa-check"></i> Shared';
            button.disabled = true;
            
            // Close modal after a short delay
            setTimeout(() => {
                document.body.removeChild(modalOverlay);
            }, 1500);
        });
    });
}

// Function to share result with a friend
function shareResultWithFriend(user, friendId, historyEntry) {
    // Create conversation if it doesn't exist
    const conversationId = [user.id, friendId].sort().join('-');
    const conversations = window.utils.storage.get('conversations') || {};
    
    if (!conversations[conversationId]) {
        // Create new conversation
        conversations[conversationId] = {
            id: conversationId,
            participants: [user.id, friendId],
            messages: [],
            createdAt: new Date().toISOString()
        };
    }
    
    // Create message content based on test type
    
    // Create message content based on test type
let messageContent = '';
if (historyEntry.type === 'color') {
    // Create a styled HTML content for color personality test
    const colorBadges = historyEntry.colors.map((color, index) => {
        const labels = ["Primary", "Secondary", "Tertiary"];
        const label = index < 3 ? labels[index] : "";
        
        return `
            <span class="history-color-badge" style="background-color: ${color.color}; ${color.name === 'WHITE' ? 'color: #333;' : ''}">
                ${color.name} ${label ? `( ${label} )` : ''}
            </span>
        `;
    }).join('');
    
    const testDate = new Date(historyEntry.date);
    const formattedDate = testDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    messageContent = `
        <div class="shared-result">
            <div><strong>My Color Personality Test Results (${formattedDate})</strong></div>
            <div class="history-colors" style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 0.5rem 0;">
                ${colorBadges}
            </div>
            <div>
                <strong>Primary:</strong> ${historyEntry.colors[0].title} - ${historyEntry.colors[0].description}
            </div>
        </div>
    `;
} else if (historyEntry.type === 'bad') {
    const testDate = new Date(historyEntry.date);
    const formattedDate = testDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Check if it's a "no negative traits" result
    if (historyEntry.noNegativeTraits) {
        messageContent = `
            <div class="shared-result">
                <div><strong>Negative Trait Test Results (${formattedDate})</strong></div>
                <div style="background-color: #e8f5e9; padding: 10px; border-radius: 5px; margin: 5px 0;">
                    <strong>Great News!</strong> According to my test results, I don't show significant tendencies toward any negative personality traits.
                </div>
            </div>
        `;
    } else if (historyEntry.traits && historyEntry.traits.length > 0) {
        // Format message for bad personality test with traits
        const traitBadges = historyEntry.traits.map(trait => `
            <span class="bad-personality-badge" style="background-color: #${trait.color || '555555'}">
                ${trait.name}
            </span>
        `).join('');
        
        messageContent = `
            <div class="shared-result">
                <div><strong>Negative Trait Test Results (${formattedDate})</strong></div>
                <div class="history-colors" style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 0.5rem 0;">
                    ${traitBadges}
                </div>
                <div>
                    <strong>Primary Traits:</strong> These negative traits were identified in my assessment.
                </div>
            </div>
        `;
    }
}
    
    // Add message to conversation
    const message = {
        id: Date.now().toString(),
        senderId: user.id,
        recipientId: friendId,
        text: messageContent,
        timestamp: new Date().toISOString(),
        read: false,
        isSharedResult: true,
        resultData: historyEntry
    };
    
    conversations[conversationId].messages.push(message);
    
    // Save updated conversations
    window.utils.storage.set('conversations', conversations);
    
    // Show notification
    showNotification(`Test results shared successfully!`);
}

    // Initialize when the DOM is loaded
    document.addEventListener('DOMContentLoaded', () => {
        // Add custom styles for new features
        const customStyle = document.createElement('style');
        customStyle.textContent = `
        /* Profile Picture Upload Styles */

        /* Add these to customStyle.textContent */

/* Positive Result Styles */
.positive-result {
    background-color: #e8f5e9;
    border-radius: 8px;
    padding: 15px;
    margin: 10px 0;
    border-left: 4px solid #4caf50;
}


.positive-result h3 {
    color: #2e7d32;
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
}

.positive-result p {
    color: #1b5e20;
}

.positive-result .personality-icon {
    color: #ffc107;
}

.color-label {
    font-size: 0.7rem;
    background-color: rgba(255, 255, 255, 0.3);
    padding: 2px 6px;
    border-radius: 10px;
    margin-left: 5px;
    font-weight: normal;
}

.share-preview {
    background-color: #f5f5f5;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 20px;
}

.share-friend-card {
    margin-bottom: 8px;
}

.ml-1 {
    margin-left: 0.5rem;
}

/* Style for shared test results in chat */
.message .shared-result {
    background-color: #f0f0f0;
    border-radius: 8px;
    padding: 10px;
    margin-top: 5px;
}
        .upload-container {
            margin-top: 15px;
            padding: 10px;
            background-color: #f9f9f9;
            border-radius: 8px;
        }

        .upload-button {
            display: inline-block;
            padding: 8px 16px;
            background-color: var(--primary-color);
            color: white;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.3s;
            font-size: 0.9rem;
        }

        .upload-button:hover {
            background-color: var(--primary-dark);
        }

        #upload-preview {
            display: flex;
            align-items: center;
            background-color: #f5f5f5;
            padding: 10px;
            border-radius: 5px;
            margin-top: 10px;
            gap: 10px;
        }

        #preview-image {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            border: 2px solid var(--primary-color);
            box-shadow: 0 0 5px rgba(0,0,0,0.2);
            object-fit: cover;
        }

        .avatar-option {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            cursor: pointer;
            border: 2px solid transparent;
            transition: transform 0.2s, box-shadow 0.2s;
            object-fit: cover;
        }

        .avatar-option:hover {
            transform: scale(1.05);
            box-shadow: 0 0 10px rgba(0,0,0,0.2);
        }

        /* Color Filter Styles */
        .filter-section {
            margin: 15px 0;
        }

        .color-filters {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            margin-top: 8px;
        }

        .color-filter-btn {
            border: 1px solid #ccc;
            border-radius: 4px;
            padding: 5px 10px;
            cursor: pointer;
            transition: all 0.3s;
            opacity: 0.7;
            font-size: 0.8rem;
            font-weight: 600;
        }

        .color-filter-btn:hover {
            opacity: 1;
            transform: translateY(-2px);
            box-shadow: 0 0 5px rgba(0,0,0,0.3);
        }

        .color-filter-btn.active {
            opacity: 1;
            transform: translateY(-2px);
            box-shadow: 0 0 5px rgba(0,0,0,0.3);
        }

        /* Personality Badge Styles */
        .personality-badges {
            display: flex;
            flex-wrap: wrap;
            margin-top: 5px;
            gap: 5px;
        }

        .personality-badge {
            padding: 2px 5px;
            border-radius: 3px;
            font-size: 0.7rem;
            font-weight: 600;
            display: inline-block;
        }

        /* Modal styles */
        .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
        }

        .modal {
            background-color: white;
            border-radius: 8px;
            padding: 20px;
            width: 90%;
            max-width: 500px;
            max-height: 90vh;
            overflow-y: auto;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }

        /* Button styles */
        .button-small {
            padding: 4px 8px;
            font-size: 0.8rem;
            background-color: #f0f0f0;
            border: 1px solid #ccc;
            border-radius: 4px;
            cursor: pointer;
        }

        /* Notification styles */
        .chat-notification {
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: white;
            border-radius: 8px;
            padding: 15px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
            display: flex;
            align-items: center;
            justify-content: space-between;
            z-index: 1000;
            max-width: 300px;
            animation: slideIn 0.3s ease;
        }

        .notification-content {
            flex-grow: 1;
            margin-right: 10px;
        }

        .notification-close {
            cursor: pointer;
            font-size: 1.2rem;
            font-weight: bold;
            padding: 0 5px;
        }

        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }

        /* Improved Friend Card */
        .friend-card {
            display: flex;
            align-items: center;
            padding: 12px;
            background-color: #fff;
            border-radius: 8px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
            margin-bottom: 10px;
            transition: transform 0.2s, box-shadow 0.2s;
        }

        .friend-card:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }

        .friend-avatar {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin-right: 12px;
            object-fit: cover;
        }

        .friend-info {
            flex-grow: 1;
        }

        .friend-name {
            font-weight: 600;
            margin-bottom: 3px;
        }

        .friend-status {
            font-size: 0.8rem;
            color: var(--text-secondary);
            margin-bottom: 3px;
        }

        .friend-actions {
            display: flex;
            gap: 8px;
        }

        .friend-action {
            cursor: pointer;
            padding: 5px;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: background-color 0.2s;
        }

        .friend-action:hover {
            background-color: #f0f0f0;
        }

        /* Search results */
        .search-results {
            margin-top: 15px;
            max-height: 300px;
            overflow-y: auto;
        }
        `;
        document.head.appendChild(customStyle);
    });
});