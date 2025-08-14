// feedback.js - Functionality for the feedback page with localStorage persistence

document.addEventListener('DOMContentLoaded', function() {
    // Tab functionality
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Add active class to clicked button and corresponding content
            button.classList.add('active');
            const tabId = button.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });

    // Feedback form submission
    const feedbackForm = document.getElementById('feedbackForm');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');
    const feedbackList = document.querySelector('.feedback-list');

    // Load stored feedback when the page loads
    loadFeedbackFromStorage();

    feedbackForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(feedbackForm);
        const formDataObj = {};
        
        // Process form data properly, handling checkboxes
        formData.forEach((value, key) => {
            if (key === 'aspectsToImprove') {
                if (!formDataObj[key]) {
                    formDataObj[key] = [];
                }
                formDataObj[key].push(value);
            } else {
                formDataObj[key] = value;
            }
        });
        
        // Validate form (basic validation)
        if (!formDataObj.feedbackMessage) {
            errorMessage.textContent = "Please provide feedback before submitting.";
            errorMessage.style.display = 'block';
            return;
        }
        
        // Add the new feedback to the feedback list
        addFeedbackToList(formDataObj, true);
        
        // Show success message
        errorMessage.style.display = 'none';
        successMessage.style.display = 'block';
        
        // Reset form
        feedbackForm.reset();
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Hide success message after 3 seconds
        setTimeout(() => {
            successMessage.style.display = 'none';
        }, 3000);
    });

    // Function to load feedback from localStorage
    function loadFeedbackFromStorage() {
        // Get stored feedback
        const storedFeedback = localStorage.getItem('personaQuestFeedback');
        
        if (storedFeedback) {
            try {
                // Parse the JSON data
                const feedbackArray = JSON.parse(storedFeedback);
                
                // Clear existing feedback before loading saved ones
                feedbackList.innerHTML = '';
                
                // Add each feedback item to the list
                feedbackArray.forEach(feedback => {
                    // Create feedback card
                    const feedbackCard = createFeedbackCard(feedback);
                    
                    // Add to the list
                    feedbackList.appendChild(feedbackCard);
                });
                
                // Apply initial filters
                filterFeedback();
            } catch (error) {
                console.error("Error loading feedback from localStorage:", error);
                localStorage.removeItem('personaQuestFeedback'); // Clear corrupted data
            }
        }
    }
    
    // Function to save feedback to localStorage
    function saveFeedbackToStorage(newFeedback) {
        try {
            // Get existing feedback or initialize empty array
            let feedbackArray = [];
            const storedFeedback = localStorage.getItem('personaQuestFeedback');
            
            if (storedFeedback) {
                feedbackArray = JSON.parse(storedFeedback);
            }
            
            // Add new feedback to the beginning of the array
            feedbackArray.unshift(newFeedback);
            
            // Save back to localStorage
            localStorage.setItem('personaQuestFeedback', JSON.stringify(feedbackArray));
            
            // Verify the data was saved
            const verifyData = localStorage.getItem('personaQuestFeedback');
            if (!verifyData) {
                throw new Error("Failed to save data to localStorage");
            }
        } catch (error) {
            console.error("Error saving feedback to localStorage:", error);
            // Display an error to the user
            errorMessage.textContent = "There was an error saving your feedback. Your browser may have storage restrictions enabled.";
            errorMessage.style.display = 'block';
        }
    }

    // Function to create a feedback card element
    function createFeedbackCard(feedback) {
        // Create new feedback card
        const feedbackCard = document.createElement('div');
        feedbackCard.className = 'feedback-card';
        
        // Add data attributes for filtering
        feedbackCard.setAttribute('data-type', feedback.feedbackType || 'general');
        feedbackCard.setAttribute('data-rating', parseInt(feedback.rating) || 5);
        
        // Create stars string
        const rating = parseInt(feedback.rating) || 5;
        const stars = '★'.repeat(rating) + '☆'.repeat(5 - rating);
        
        // Create feedback card HTML
        feedbackCard.innerHTML = `
            <div class="feedback-card-header">
                <span class="feedback-name">${feedback.name || "Anonymous"}</span>
                <span class="feedback-date">${feedback.date}</span>
            </div>
            <span class="feedback-type">${feedback.feedbackType || "General Feedback"}</span>
            <div class="feedback-stars">${stars}</div>
            <p class="feedback-content">${feedback.feedbackMessage}</p>
        `;
        
        return feedbackCard;
    }

    // Function to add new feedback to the feedback list
    function addFeedbackToList(formData, shouldSave = false) {
        // Get current date
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // Create feedback data object
        const feedbackData = {
            name: formData.name || "Anonymous",
            date: formattedDate,
            feedbackType: formData.feedbackType || "General Feedback",
            rating: formData.rating || 5,
            feedbackMessage: formData.feedbackMessage,
            aspectsToImprove: formData.aspectsToImprove || []
        };
        
        // Create feedback card
        const feedbackCard = createFeedbackCard(feedbackData);
        
        // Add animation class for new feedback
        feedbackCard.classList.add('new-feedback');
        
        // Add to the top of the list
        if (feedbackList.firstChild) {
            feedbackList.insertBefore(feedbackCard, feedbackList.firstChild);
        } else {
            feedbackList.appendChild(feedbackCard);
        }
        
        // Save to localStorage if needed
        if (shouldSave) {
            saveFeedbackToStorage(feedbackData);
        }
        
        // Switch to the view feedback tab
        setTimeout(() => {
            document.querySelector('[data-tab="view-feedback"]').click();
            
            // Apply filters to make sure the new feedback is visible
            filterFeedback();
            
            // Highlight the new feedback
            feedbackCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            // Add highlight animation
            setTimeout(() => {
                feedbackCard.classList.add('highlight');
                
                // Remove highlight after animation completes
                setTimeout(() => {
                    feedbackCard.classList.remove('highlight');
                }, 2000);
            }, 300);
        }, 1000);
    }

    // Filter functionality
    const filterSelects = document.querySelectorAll('.filter-select');
    filterSelects.forEach(select => {
        select.addEventListener('change', () => {
            filterFeedback();
        });
    });

    // Function to filter feedback
    function filterFeedback() {
        const typeFilter = document.getElementById('typeFilter').value.toLowerCase();
        const ratingFilter = document.getElementById('ratingFilter').value;
        const sortFilter = document.getElementById('sortFilter').value;
        
        const feedbackCards = document.querySelectorAll('.feedback-card');
        
        // Apply filters to each card
        feedbackCards.forEach(card => {
            let showCard = true;
            
            // Type filter
            if (typeFilter !== 'all') {
                const cardType = card.querySelector('.feedback-type').textContent.toLowerCase();
                showCard = cardType.toLowerCase().includes(typeFilter);
            }
            
            // Rating filter
            if (showCard && ratingFilter !== 'all') {
                const stars = card.querySelector('.feedback-stars').textContent;
                const starCount = (stars.match(/★/g) || []).length;
                showCard = starCount.toString() === ratingFilter;
            }
            
            // Apply visibility
            card.style.display = showCard ? 'block' : 'none';
        });
        
        // Apply sorting
        sortFeedbackCards(sortFilter);
    }
    
    // Function to sort feedback cards
    function sortFeedbackCards(sortOption) {
        const cards = Array.from(feedbackList.querySelectorAll('.feedback-card'));
        
        // Sort based on selected option
        cards.sort((a, b) => {
            if (sortOption === 'newest' || sortOption === 'oldest') {
                const dateA = new Date(a.querySelector('.feedback-date').textContent);
                const dateB = new Date(b.querySelector('.feedback-date').textContent);
                
                return sortOption === 'newest' ? dateB - dateA : dateA - dateB;
            } else if (sortOption === 'highest' || sortOption === 'lowest') {
                const starsA = (a.querySelector('.feedback-stars').textContent.match(/★/g) || []).length;
                const starsB = (b.querySelector('.feedback-stars').textContent.match(/★/g) || []).length;
                
                return sortOption === 'highest' ? starsB - starsA : starsA - starsB;
            }
            
            return 0;
        });
        
        // Remove all cards and re-append in sorted order
        feedbackList.innerHTML = '';
        cards.forEach(card => {
            feedbackList.appendChild(card);
            
            // Re-apply visibility filters after sorting
            if (card.style.display === 'none') {
                card.style.display = 'none';
            }
        });
    }

    // Load more button
    const loadMoreButton = document.querySelector('.load-more');
    if (loadMoreButton) {
        loadMoreButton.addEventListener('click', () => {
            // In a real implementation, you would load more feedback from the server
            loadMoreButton.textContent = 'Loading...';
            
            // Simulate loading more data
            setTimeout(() => {
                // Add 3 more sample feedback items
                const sampleFeedback = [
                    {
                        name: "Jason Park",
                        date: "February 15, 2025",
                        feedbackType: "Feature Request",
                        rating: 4,
                        feedbackMessage: "The personality analysis is fantastic, but I would love to see more information about how different personality types interact with each other in workplace settings."
                    },
                    {
                        name: "Amanda Lewis",
                        date: "February 10, 2025",
                        feedbackType: "General Feedback",
                        rating: 5,
                        feedbackMessage: "This tool has been incredibly helpful for our team building activities. The insights into personality differences have helped us communicate more effectively!"
                    },
                    {
                        name: "Robert Chen",
                        date: "February 5, 2025",
                        feedbackType: "Content Improvement",
                        rating: 3,
                        feedbackMessage: "Good content overall, but some of the descriptions of negative traits felt a bit harsh. Perhaps a more constructive framing would be helpful."
                    }
                ];
                
                // Add sample feedback to the list
                sampleFeedback.forEach(item => {
                    // If we already have this feedback in local storage, skip it
                    // (This is a simple way to avoid duplicates when clicking load more multiple times)
                    const isExisting = Array.from(feedbackList.querySelectorAll('.feedback-card')).some(card => {
                        return card.querySelector('.feedback-name').textContent === item.name &&
                               card.querySelector('.feedback-date').textContent === item.date;
                    });
                    
                    if (!isExisting) {
                        addFeedbackToList(item, true);
                    }
                });
                
                // Apply filters to new feedback
                filterFeedback();
                
                // Update load more button
                loadMoreButton.textContent = 'No more feedback to load';
                loadMoreButton.disabled = true;
            }, 1500);
        });
    }
    
    // Initial filter application
    filterFeedback();
});