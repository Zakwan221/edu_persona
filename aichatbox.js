class AIAssistant {
    constructor() {
        this.chatMessages = document.getElementById('chatMessages');
        this.messageInput = document.getElementById('messageInput');
        this.micButton = document.getElementById('micButton');
        this.sendButton = document.getElementById('sendButton');
        this.muteButton = document.getElementById('muteButton');
        this.typingIndicator = document.getElementById('typingIndicator');
        
        this.recognition = null;
        this.isRecording = false;
        this.isTyping = false;
        this.isMuted = false;
        
        this.initializeEventListeners();
        this.initializeSpeechRecognition();
        this.setWelcomeTime();
    }

    initializeEventListeners() {
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.messageInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                this.sendMessage();
            }
        });
        
        this.micButton.addEventListener('click', () => this.toggleRecording());
        this.muteButton.addEventListener('click', () => this.toggleMute());
        
        // Enable/disable send button based on input
        this.messageInput.addEventListener('input', () => {
            this.sendButton.disabled = !this.messageInput.value.trim();
        });
    }

    initializeSpeechRecognition() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.lang = 'en-US';

            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                this.messageInput.value = transcript;
                this.sendMessage();
            };

            this.recognition.onend = () => {
                this.isRecording = false;
                this.micButton.classList.remove('recording');
            };

            this.recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                this.isRecording = false;
                this.micButton.classList.remove('recording');
            };
        } else {
            console.warn('Speech recognition not supported');
            this.micButton.style.display = 'none';
        }
    }

    toggleRecording() {
        if (!this.recognition) return;

        if (this.isRecording) {
            this.recognition.stop();
        } else {
            this.recognition.start();
            this.isRecording = true;
            this.micButton.classList.add('recording');
        }
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        
        if (this.isMuted) {
            this.muteButton.textContent = '🔇';
            this.muteButton.classList.add('muted');
            this.muteButton.title = 'Voice responses muted - Click to unmute';
            
            // Stop any current speech
            if ('speechSynthesis' in window) {
                speechSynthesis.cancel();
            }
        } else {
            this.muteButton.textContent = '🔊';
            this.muteButton.classList.remove('muted');
            this.muteButton.title = 'Voice responses enabled - Click to mute';
        }
    }

    formatResponseForDisplay(text) {
        // Remove markdown formatting and create clean HTML
        let formatted = text
            // Remove ** bold markers
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            // Convert bullet points
            .replace(/^• (.+)$/gm, '<div class="bullet-point">• $1</div>')
            // Convert newlines to proper breaks, but preserve structure
            .replace(/\n\n/g, '</div><div class="response-section">')
            .replace(/\n/g, '<br>');
        
        // Wrap in sections
        formatted = '<div class="response-section">' + formatted + '</div>';
        
        // Clean up empty sections
        formatted = formatted.replace(/<div class="response-section"><\/div>/g, '');
        
        return formatted;
    }

    sendMessage() {
        const message = this.messageInput.value.trim();
        if (!message || this.isTyping) return;

        this.addMessage(message, 'user');
        this.messageInput.value = '';
        this.sendButton.disabled = true;
        
        this.showTypingIndicator();
        
        // Simulate AI response delay
        setTimeout(() => {
            this.hideTypingIndicator();
            this.generateAIResponse(message);
        }, 1000 + Math.random() * 2000);
    }

    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}`;
        
        const time = this.getCurrentTime();
        
        // Format the text for better display if it's from AI
        const displayText = sender === 'ai' ? this.formatResponseForDisplay(text) : text;
        
        if (sender === 'ai') {
            messageDiv.innerHTML = `
                <div class="message-avatar"><img src="robot.png" alt="AI" class="robot-image"></div>
                <div class="message-wrapper">
                    <div class="message-content">${displayText}</div>
                    <div class="message-time">${time}</div>
                </div>
            `;
        } else {
            messageDiv.innerHTML = `
                <div class="message-wrapper">
                    <div class="message-content">${displayText}</div>
                    <div class="message-time">${time}</div>
                </div>
                <div class="message-avatar">👤</div>
            `;
        }
        
        this.chatMessages.insertBefore(messageDiv, this.typingIndicator);
        this.scrollToBottom();
    }

    showTypingIndicator() {
        this.isTyping = true;
        this.typingIndicator.style.display = 'flex';
        this.scrollToBottom();
    }

    hideTypingIndicator() {
        this.isTyping = false;
        this.typingIndicator.style.display = 'none';
    }

    generateAIResponse(userMessage) {
        let response = this.getContextualResponse(userMessage);
        this.addMessage(response, 'ai');
        
        // Optional: Add text-to-speech
        this.speakResponse(response);
    }

    getContextualResponse(message) {
        const lowerMessage = message.toLowerCase();
        
        // Check for general questions
        const generalResponse = this.checkGeneralQuestions(lowerMessage);
        if (generalResponse) {
            return generalResponse;
        }
        
        // Check for negative trait questions
        const negativeTraitResponse = this.checkNegativeTraitQuestions(lowerMessage);
        if (negativeTraitResponse) {
            return negativeTraitResponse;
        }
        
        // Check for the 3 new personality questions
        const personalityResponse = this.checkPersonalityQuestions(lowerMessage);
        if (personalityResponse) {
            return personalityResponse;
        }
        
        // Check for color personality compatibility questions
        const colorResponse = this.checkColorCompatibility(lowerMessage);
        if (colorResponse) {
            return colorResponse;
        }
        
        // Business-related responses (keeping your existing business logic)
        if (lowerMessage.includes('rental') || lowerMessage.includes('property')) {
            return `🏢 **Property Rental Information**\n\n**Available Properties:**\n• Lot 74-A, Gebeng\n• Lot 3/129, Gebeng\n• Rental Land, Gebeng\n• Bangi Location\n• Jalan Kuching - Blok 3\n• Jalan Kuching - Blok 3А\n\n**Services:**\n• Short Term Rental\n• Equipment Rental\n• Flexible lease terms\n\nWould you like more details about any specific property?`;
        }
        
        if (lowerMessage.includes('financial') || lowerMessage.includes('report') || lowerMessage.includes('finance')) {
            return `📊 **Financial Reporting System**\n\n**Available Reports:**\n• Profit & Loss Statement\n• Balance Sheet\n• Revenue Summary\n• Cost of Sales Analysis\n• Expense Details\n• Asset Management\n\n**Key Features:**\n• Real-time financial tracking\n• Automated report generation\n• Comprehensive expense categorization\n\nWhich financial report would you like to know more about?`;
        }
        
        if (lowerMessage.includes('asset') || lowerMessage.includes('equipment')) {
            return `🚗 **Asset Management**\n\n**Asset Categories:**\n• Building Assets (19 listed items)\n• Vehicle Fleet Management\n• Equipment Inventory\n\n**Vehicle Services:**\n• Maintenance & Servicing\n• Road Tax & Insurance\n• Fleet for Asturi Resources\n• Asturi Truck & Crane\n• Personal Vehicles\n\nNeed specific information about any asset category?`;
        }
        
        if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
            return "Hello! I can help you with **Color Personality Compatibility Analysis!** Try asking: 'What is my relationship combination between red and blue?' I also assist with business information. For a comprehensive analysis of your personality, check out your **AI Personality Analysis** by clicking the brain icon above! What would you like to know?";
        }
        
        if (lowerMessage.includes('help')) {
            return `🤝 **How I Can Help You**\n\n**Color Personality Analysis:**\n• Ask about any two color combinations\n• 10 personality colors available\n• 55 total compatibility combinations\n• Example: "What is my combination between red and blue?"\n\n**Available Colors:**\n🔴 Red • 🔵 Blue • 🟢 Green • 🟡 Yellow • 🟣 Purple\n⚫ Black • ⚪ White • 🩶 Grey • 🩷 Pink • 🤎 Chocolate\n\n**AI Personality Analysis:**\n• Click the "🧠 AI Analysis" button above for comprehensive personality insights\n• Detailed analysis of your primary, secondary, and tertiary colors\n• Career guidance and personal growth recommendations\n\n**Business Information:**\n• Property rental details • Financial reporting • Asset management\n\nJust ask me about color compatibility or business operations!`;
        }
        
        if (lowerMessage.includes('thank')) {
            return "You're very welcome! Feel free to ask about any color personality combinations or business information anytime!";
        }
        
        // Check if asking about personal personality results
        if (lowerMessage.includes('my personality') || lowerMessage.includes('my results') || 
            lowerMessage.includes('my test') || lowerMessage.includes('what am i')) {
            return `🎯 **Your Personal Personality Analysis**\n\nTo see your complete personality profile, click the **"🧠 AI Analysis"** button at the top of this chat!\n\n**Your comprehensive analysis includes:**\n• Primary, secondary, and tertiary personality breakdown\n• Detailed strengths and growth areas\n• Personalized career recommendations\n• Relationship compatibility insights\n• Personal development roadmap\n\n**Quick Chat Option:** I can also answer specific questions about color combinations right here! Try asking "What is the combination between [color1] and [color2]?"`;
        }
        
        // Check if asking about AI analysis or personality profile
        if (lowerMessage.includes('ai analysis') || lowerMessage.includes('personality profile') || 
            lowerMessage.includes('detailed analysis') || lowerMessage.includes('comprehensive analysis')) {
            return `🧠 **AI Personality Analysis**\n\nFor a comprehensive analysis of your personality profile, click the **"🧠 AI Analysis"** button at the top of this chat!\n\n**What you'll get:**\n• Detailed breakdown of your primary, secondary, and tertiary personality colors\n• Comprehensive strengths and growth areas\n• Relationship compatibility insights\n• Personalized career guidance\n• Personal growth recommendations\n• Downloadable personality report\n\n**Note:** You need to be logged in and have completed the personality test to access your AI analysis.\n\nWould you like me to help with anything else about color compatibility?`;
        }
        
        // Check if asking about colors in general
        if (lowerMessage.includes('color') || lowerMessage.includes('personality')) {
            return `🎨 **Color Personality System**\n\n**Available Colors:**\n🔴 Red • 🔵 Blue • 🟢 Green • 🟡 Yellow • 🟣 Purple\n⚫ Black • ⚪ White • 🩶 Grey • 🩷 Pink • 🤎 Chocolate\n\n**How to Ask:**\n• "What is my combination between [color1] and [color2]?"\n• "Red and blue compatibility"\n• "Relationship between yellow with green"\n\n**Total Combinations Available:** 55\n\nTry asking about any two colors!`;
        }
        
        // Default response - show available questions
        return `❓ **I didn't understand that question. Here's what you can ask me:**\n\n**🎨 Color Personality Questions:**\n• "What is [color] personality?" (red, blue, green, yellow, purple, black, white, grey, pink, chocolate)\n• "[Color] hobby" or "I'm [color] what are my hobbies?"\n• "I'm [color] feeling sad what should I do?"\n• "I'm [color] how to overcome [negative trait]?"\n\n**🤝 Color Compatibility Questions:**\n• "What is my relationship between [color1] and [color2]?"\n• "What is rating best match between [color1] and [color2]?"\n• "What is my friendship status between [color1] and [color2]?"\n\n**⚠️ Negative Trait Questions:**\n• "What is [trait]?" (toxic, narcissistic, antisocial, dramatic, lazy, unreliable, impulsive, avoidant, paranoid, aggressive)\n\n**🌟 General Questions:**\n• "Why is personality important for us?"\n• "What is eduPersona?"\n• "What is benefit of edu Persona?"\n• "How does this website help users?"\n• "How to get started using this website?"\n• "What questions can I ask?"\n\n**🏢 Business Questions:**\n• Ask about "rental", "property", "financial", "reports", "assets"\n\n**🎤 Voice Commands:** All questions work with voice input too!\n\n💡 **Tip:** You can also try asking about color combinations like "Red blue compatibility" or simple questions like "Blue hobby"!`;
    }

    checkPersonalityQuestions(message) {
        const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'black', 'white', 'grey', 'gray', 'pink', 'chocolate'];
        
        // Check if message contains any color
        let foundColor = null;
        for (let color of colors) {
            if (message.toLowerCase().includes(color)) {
                foundColor = color === 'gray' ? 'grey' : color;
                break;
            }
        }
        
        if (!foundColor) return null;
        
        console.log('Found color:', foundColor, 'in message:', message); // Debug log
        
        // Pattern 4: Overcoming negative traits - "I'm [color] how to overcome [trait]"
        if ((message.toLowerCase().includes('i\'m') || message.toLowerCase().includes('i am')) &&
            (message.toLowerCase().includes('how to overcome') || message.toLowerCase().includes('overcome'))) {
            const negativeTraits = ['toxic', 'narcissistic', 'antisocial', 'dramatic', 'lazy', 'unreliable', 'impulsive', 'avoidant', 'paranoid', 'aggressive'];
            
            for (let trait of negativeTraits) {
                if (message.toLowerCase().includes(trait)) {
                    console.log('Matched overcome pattern for trait:', trait); // Debug log
                    return this.getPersonalizedOvercomingAdvice(foundColor, trait);
                }
            }
        }
        
        // Pattern 1: Description questions - must include "personality" to avoid conflict with compatibility questions
        if ((message.toLowerCase().includes('what is') || message.toLowerCase().includes('what\'s')) && 
            message.toLowerCase().includes('personality') &&
            !message.toLowerCase().includes('relationship') &&
            !message.toLowerCase().includes('combination') &&
            !message.toLowerCase().includes('compatibility')) {
            console.log('Matched personality description pattern'); // Debug log
            return this.getPersonalityDescription(foundColor);
        }
        
        // Pattern 2: Hobby questions - simple check
        if ((message.toLowerCase().includes('hobby') || message.toLowerCase().includes('hobbies'))) {
            console.log('Matched hobby pattern'); // Debug log
            return this.getPersonalityHobbies(foundColor);
        }
        
        // Pattern 3: Sadness advice - simple check
        if ((message.toLowerCase().includes('sad') || message.toLowerCase().includes('feeling sad')) &&
            (message.toLowerCase().includes('what should') || message.toLowerCase().includes('what do') || message.toLowerCase().includes('help'))) {
            console.log('Matched sadness pattern'); // Debug log
            return this.getPersonalitySadnessAdvice(foundColor);
        }
        
        console.log('No personality pattern matched'); // Debug log
        return null;
    }

    getPersonalityDescription(color) {
        const descriptions = {
            'red': {
                title: 'Red Personality - The Passionate & Bold',
                traits: ['Thrives on challenges and competition', 'Highly ambitious—always aims to be the best', 'Has a strong personality and doesn\'t back down easily', 'Sometimes acts before thinking, leading to conflicts', 'Loves adventure, fast-paced environments, and taking risks'],
                strengths: ['Strong competitive drive', 'Natural leadership abilities', 'Ambitious goal-setting', 'Risk-taking courage', 'High energy and motivation'],
                overview: 'Red personalities are passionate and bold individuals who thrive on challenges and competition. They are highly ambitious, always aiming to be the best, with strong personalities that don\'t back down easily.'
            },
            'blue': {
                title: 'Blue Personality - The Loyal & Intelligent',
                traits: ['Prefers logic over emotions when making decisions', 'Very loyal and trustworthy—keeps promises', 'Avoids emotional drama and foolish risks', 'Enjoys learning, researching, and deep conversations', 'Values intellectual depth and meaningful discussions'],
                strengths: ['Logical decision-making', 'Exceptional loyalty and trustworthiness', 'Research and analytical skills', 'Intellectual curiosity', 'Reliable and consistent behavior'],
                overview: 'Blue personalities are loyal and intelligent individuals who prefer logic over emotions when making decisions. They are very trustworthy, keep their promises, and enjoy learning and deep conversations.'
            },
            'green': {
                title: 'Green Personality - The Balanced & Practical',
                traits: ['Prefers stability over excitement', 'Careful decision-maker—avoids impulsive choices', 'Values hard work and consistency', 'Enjoys nature and peaceful environments', 'Strong sense of duty and responsibility', 'Acts as a peacemaker in groups'],
                strengths: ['Stability and consistency', 'Careful decision-making', 'Strong work ethic', 'Natural peacemaking abilities', 'Practical problem-solving'],
                overview: 'Green personalities are balanced and practical individuals who prefer stability over excitement. They are careful decision-makers who value hard work, consistency, and act as natural peacemakers.'
            },
            'yellow': {
                title: 'Yellow Personality - The Optimistic & Cheerful',
                traits: ['Always looks at the bright side of life', 'Highly social—loves making people laugh', 'Enjoys spontaneity and dislikes strict routines', 'Easily distracted—jumps from one interest to another', 'Tends to be playful, sometimes making it hard to take things seriously', 'Has a childlike curiosity—loves adventure and exploring new things'],
                strengths: ['Positive outlook on life', 'Social charm and humor', 'Spontaneous creativity', 'Childlike curiosity', 'Adventurous spirit'],
                overview: 'Yellow personalities are optimistic and cheerful individuals who always look at the bright side of life. They are highly social, love making people laugh, and have a childlike curiosity for adventure.'
            },
            'purple': {
                title: 'Purple Personality - The Creative & Unique',
                traits: ['Highly imaginative and artistic', 'Thinks outside the box—loves creativity', 'Can be moody or lost in deep thoughts', 'Values emotional depth and intellectual conversations', 'May seem mysterious or unpredictable', 'Often drawn to philosophy, psychology, and the arts'],
                strengths: ['Creative imagination', 'Artistic abilities', 'Independent thinking', 'Emotional depth', 'Philosophical mindset'],
                overview: 'Purple personalities are creative and unique individuals who are highly imaginative and artistic. They think outside the box, value emotional depth, and are often drawn to philosophy and the arts.'
            },
            'black': {
                title: 'Black Personality - The Independent & Mysterious',
                traits: ['Values privacy and personal space', 'Often an observer rather than a participant in social settings', 'Prefers deep intellectual conversations over small talk', 'May come across as cold, but actually values deep, meaningful relationships', 'Often enjoys dark humor, philosophy, and mystery stories'],
                strengths: ['Strong independence', 'Observational skills', 'Intellectual depth', 'Meaningful relationship building', 'Privacy management'],
                overview: 'Black personalities are independent and mysterious individuals who value privacy and personal space. They prefer deep intellectual conversations and meaningful relationships over superficial interactions.'
            },
            'white': {
                title: 'White Personality - The Peaceful & Pure',
                traits: ['Seeks peace and harmony in all aspects of life', 'Avoids drama and dislikes conflict', 'Strong moral compass—values honesty and fairness', 'Often a mediator in conflicts', 'Enjoys spirituality, nature, and quiet activities'],
                strengths: ['Natural peacemaking abilities', 'Strong moral compass', 'Conflict mediation skills', 'Spiritual awareness', 'Harmonious nature'],
                overview: 'White personalities are peaceful and pure individuals who seek peace and harmony in all aspects of life. They have a strong moral compass, avoid drama, and often serve as mediators in conflicts.'
            },
            'grey': {
                title: 'Grey Personality - The Calm & Logical',
                traits: ['Prefers neutrality and avoids drama', 'Thinks logically and doesn\'t let emotions control decisions', 'Doesn\'t get easily excited—stays calm under pressure', 'Can seem detached or unemotional to others', 'Values privacy and independence', 'Enjoys alone time more than socializing'],
                strengths: ['Logical thinking', 'Emotional stability', 'Pressure management', 'Independent nature', 'Neutral perspective'],
                overview: 'Grey personalities are calm and logical individuals who prefer neutrality and avoid drama. They think logically, stay calm under pressure, and value privacy and independence over socializing.'
            },
            'pink': {
                title: 'Pink Personality - The Kind & Loving',
                traits: ['Very nurturing and enjoys caring for others', 'Loves romance, beauty, and sentimental moments', 'Prefers harmony and dislikes arguments', 'Tends to be gentle and soft-spoken', 'Can be overly trusting or sensitive', 'Values love and friendship above material success'],
                strengths: ['Nurturing abilities', 'Romantic sensitivity', 'Gentle communication', 'Strong empathy', 'Relationship prioritization'],
                overview: 'Pink personalities are kind and loving individuals who are very nurturing and enjoy caring for others. They love romance and beauty, prefer harmony, and value love and friendship above material success.'
            },
            'chocolate': {
                title: 'Chocolate Personality - The Grounded & Practical',
                traits: ['Extremely loyal and responsible', 'Prefers tradition and structure over unpredictability', 'Hardworking and puts family first', 'Values comfort, security, and stability', 'Sometimes too serious and dislikes unnecessary risks', 'Prefers long-term goals over short-term excitement'],
                strengths: ['Exceptional loyalty', 'Strong responsibility', 'Traditional values', 'Family dedication', 'Long-term planning'],
                overview: 'Chocolate personalities are grounded and practical individuals who are extremely loyal and responsible. They prefer tradition and structure, work hard, put family first, and value comfort and stability.'
            }
        };
        
        const personality = descriptions[color];
        if (!personality) return "I don't recognize that color personality. Available colors are: Red, Blue, Green, Yellow, Purple, Black, White, Grey, Pink, and Chocolate.";
        
        const traitsFormatted = personality.traits.map(t => `• ${t}`).join('\n');
        const strengthsFormatted = personality.strengths.map(s => `• ${s}`).join('\n');
        
        return `🎨 **${personality.title}**\n\n**Overview:**\n${personality.overview}\n\n**Behavior & Mindset:**\n${traitsFormatted}\n\n**Key Strengths:**\n${strengthsFormatted}\n\n💡 Want to explore compatibility with other colors? Just ask about any two color combinations!`;
    }

    getPersonalityHobbies(color) {
        const hobbies = {
            'red': {
                primary: ['Competitive sports (basketball, tennis, racing)', 'Leadership roles and team management', 'Entrepreneurship and business ventures', 'High-intensity workouts and fitness challenges'],
                secondary: ['Public speaking and debates', 'Goal-setting and achievement tracking', 'Strategic board games', 'Adventure sports and extreme activities']
            },
            'blue': {
                primary: ['Research and data analysis', 'Reading and studying complex topics', 'Puzzle solving and strategy games', 'Detailed planning and organization'],
                secondary: ['Writing and documentation', 'Quality control and improvement projects', 'Learning new technical skills', 'Systematic collecting (books, data, etc.)']
            },
            'green': {
                primary: ['Volunteering and community service', 'Gardening and nature activities', 'Team sports and group activities', 'Cooking and hosting gatherings'],
                secondary: ['Counseling and mentoring others', 'Pet care and animal welfare', 'Family activities and traditions', 'Collaborative projects and teamwork']
            },
            'yellow': {
                primary: ['Social events and party planning', 'Creative arts (painting, music, dance)', 'Travel and exploring new places', 'Entertainment and performing'],
                secondary: ['Photography and videography', 'Social media and content creation', 'Improvisation and spontaneous activities', 'Networking and meeting new people']
            },
            'purple': {
                primary: ['Artistic creation (painting, sculpting, design)', 'Writing poetry or creative stories', 'Innovation and invention projects', 'Spiritual and philosophical exploration'],
                secondary: ['Unique fashion and self-expression', 'Alternative and experimental activities', 'Vision boarding and future planning', 'Creative problem-solving challenges']
            },
            'black': {
                primary: ['Solo adventures and independent travel', 'Personal development and self-improvement', 'Authentic self-expression activities', 'Individual sports and challenges'],
                secondary: ['Meditation and introspection', 'Unique skill development', 'Personal projects and goals', 'Breaking conventional boundaries']
            },
            'white': {
                primary: ['Meditation and mindfulness practices', 'Peaceful nature walks', 'Diplomatic activities and mediation', 'Calm, relaxing hobbies (yoga, tai chi)'],
                secondary: ['Creating harmonious environments', 'Listening to music and peaceful activities', 'Conflict resolution and peacemaking', 'Gentle, non-competitive activities']
            },
            'grey': {
                primary: ['Practical DIY projects and repairs', 'Efficient organization systems', 'Research and fact-finding', 'Balanced fitness routines'],
                secondary: ['Neutral observation activities (bird watching)', 'Systematic learning and skill building', 'Problem-solving puzzles', 'Practical cooking and meal planning']
            },
            'pink': {
                primary: ['Caring for others (babysitting, elder care)', 'Nurturing activities (gardening, pet care)', 'Emotional support and counseling', 'Creating comfort for others'],
                secondary: ['Romantic activities and relationship building', 'Gentle arts and crafts', 'Community care projects', 'Healing and wellness activities']
            },
            'chocolate': {
                primary: ['Family traditions and gatherings', 'Home improvement and maintenance', 'Reliable routine activities', 'Traditional crafts and skills'],
                secondary: ['Genealogy and family history', 'Classic hobbies (woodworking, knitting)', 'Community involvement and stability', 'Long-term projects and commitments']
            }
        };
        
        const colorHobbies = hobbies[color];
        if (!colorHobbies) return "I don't recognize that color personality. Available colors are: Red, Blue, Green, Yellow, Purple, Black, White, Grey, Pink, and Chocolate.";
        
        const primaryFormatted = colorHobbies.primary.map(h => `• ${h}`).join('\n');
        const secondaryFormatted = colorHobbies.secondary.map(h => `• ${h}`).join('\n');
        
        return `🎯 **Hobbies for ${color.charAt(0).toUpperCase() + color.slice(1)} Personality**\n\n**Primary Hobbies (Perfect Match):**\n${primaryFormatted}\n\n**Secondary Hobbies (Great Options):**\n${secondaryFormatted}\n\n💡 These activities align with your personality traits and can bring you joy and fulfillment!`;
    }

    getPersonalitySadnessAdvice(color) {
        const advice = {
            'red': {
                immediate: ['Channel your energy into physical exercise', 'Set a small, achievable goal for today', 'Take charge of something you can control', 'Talk to someone directly about your feelings'],
                longterm: ['Focus on your strengths as a leader', 'Remember past achievements and victories', 'Plan concrete steps toward your goals', 'Use your competitive spirit to overcome challenges']
            },
            'blue': {
                immediate: ['Take time to analyze and understand your feelings', 'Create a structured plan to address the issue', 'Engage in detailed, focused activities', 'Seek factual information about your situation'],
                longterm: ['Apply logical problem-solving to your challenges', 'Focus on quality solutions rather than quick fixes', 'Use your analytical skills to prevent future issues', 'Remember your value lies in your thoughtful approach']
            },
            'green': {
                immediate: ['Reach out to supportive friends or family', 'Engage in nurturing activities (gardening, caring)', 'Focus on helping others or volunteering', 'Create a peaceful, harmonious environment'],
                longterm: ['Strengthen your support network', 'Practice patience with yourself during healing', 'Focus on building stronger relationships', 'Remember your worth through caring for others']
            },
            'yellow': {
                immediate: ['Engage in fun, creative activities', 'Spend time with positive, energetic people', 'Try something new and exciting', 'Express yourself through art or music'],
                longterm: ['Focus on the bright side and future possibilities', 'Surround yourself with optimistic influences', 'Use your natural enthusiasm to inspire yourself', 'Remember that your energy brings joy to others']
            },
            'purple': {
                immediate: ['Express your feelings through creative outlets', 'Spend time in inspiring, beautiful environments', 'Explore new perspectives and ideas', 'Engage in meaningful, unique activities'],
                longterm: ['Focus on your unique strengths and vision', 'Create something beautiful or meaningful', 'Connect with your spiritual or philosophical side', 'Remember your value lies in your originality']
            },
            'black': {
                immediate: ['Take time for honest self-reflection', 'Engage in independent activities you enjoy', 'Be authentic about your feelings', 'Take control of your personal space'],
                longterm: ['Focus on your strength and independence', 'Set boundaries that protect your wellbeing', 'Pursue goals that align with your authentic self', 'Remember your power comes from being true to yourself']
            },
            'white': {
                immediate: ['Find peaceful, quiet spaces to relax', 'Practice meditation or calming activities', 'Avoid conflict and seek harmony', 'Listen to soothing music or nature sounds'],
                longterm: ['Focus on creating balance in your life', 'Seek peaceful resolutions to problems', 'Surround yourself with calm, supportive people', 'Remember your gift for bringing peace to others']
            },
            'grey': {
                immediate: ['Approach your feelings objectively', 'Focus on practical steps you can take', 'Engage in organized, systematic activities', 'Seek balanced perspectives on your situation'],
                longterm: ['Use logical thinking to solve underlying issues', 'Focus on practical improvements in your life', 'Apply efficient solutions to your challenges', 'Remember your strength lies in balanced thinking']
            },
            'pink': {
                immediate: ['Practice self-compassion and gentle care', 'Engage in nurturing activities for yourself', 'Connect with loved ones for emotional support', 'Create a comforting, cozy environment'],
                longterm: ['Focus on healing and emotional growth', 'Strengthen your capacity for self-love', 'Nurture relationships that support your wellbeing', 'Remember your gift for bringing comfort to others']
            },
            'chocolate': {
                immediate: ['Return to familiar, comforting routines', 'Connect with family and traditional support', 'Engage in reliable, stable activities', 'Focus on practical, concrete tasks'],
                longterm: ['Build stronger foundations in your life', 'Focus on long-term stability and security', 'Lean on traditional wisdom and values', 'Remember your strength lies in dependability']
            }
        };
        
        const colorAdvice = advice[color];
        if (!colorAdvice) return "I don't recognize that color personality. Available colors are: Red, Blue, Green, Yellow, Purple, Black, White, Grey, Pink, and Chocolate.";
        
        const immediateFormatted = colorAdvice.immediate.map(a => `• ${a}`).join('\n');
        const longtermFormatted = colorAdvice.longterm.map(a => `• ${a}`).join('\n');
        
        return `💜 **Feeling Sad - Advice for ${color.charAt(0).toUpperCase() + color.slice(1)} Personality**\n\n**Immediate Actions (Do Today):**\n${immediateFormatted}\n\n**Long-term Strategies:**\n${longtermFormatted}\n\n🤗 Remember: It's okay to feel sad. Your ${color} personality has unique strengths that will help you through this. Take it one step at a time, and be kind to yourself.\n\n💡 If sadness persists, consider reaching out to a mental health professional for additional support.`;
    }

    getPersonalizedOvercomingAdvice(color, trait) {
        const normalizedTrait = trait === 'unreliable' ? 'lazy' : trait; // Handle lazy/unreliable as same
        
        const advice = {
            'red': {
                'toxic': {
                    description: 'Channel your natural leadership into positive influence instead of control.',
                    steps: ['Use your assertiveness to lift others up, not tear them down', 'Set competitive goals for being supportive instead of destructive', 'Practice direct but kind communication', 'Focus your intensity on solving problems, not creating them']
                },
                'narcissistic': {
                    description: 'Transform your confidence into genuine leadership that serves others.',
                    steps: ['Use your natural charisma to inspire others, not just impress them', 'Set goals to help your team succeed, not just yourself', 'Practice asking others about their achievements and feelings', 'Channel your ambition into group success']
                },
                'antisocial': {
                    description: 'Redirect your independence toward positive leadership and community building.',
                    steps: ['Use your natural authority to protect and guide others', 'Set rules for yourself about respecting others\' rights', 'Practice team sports or group activities you can lead', 'Focus your energy on positive competition, not harmful behavior']
                },
                'dramatic': {
                    description: 'Channel your intensity into productive passion rather than unnecessary drama.',
                    steps: ['Use your natural intensity for important causes, not minor issues', 'Practice pausing before reacting to evaluate if it\'s worth your energy', 'Focus on solving problems quickly rather than dwelling on them', 'Channel drama into competitive activities or leadership roles']
                },
                'lazy': {
                    description: 'Leverage your goal-oriented nature to create motivation systems.',
                    steps: ['Set specific, competitive deadlines for yourself', 'Create rewards for completing tasks on time', 'Break big tasks into smaller victories you can win', 'Find accountability partners who will challenge you']
                },
                'impulsive': {
                    description: 'Use your action-oriented nature more strategically.',
                    steps: ['Create a "10-second rule" before making big decisions', 'Channel impulsivity into quick problem-solving, not rash choices', 'Set up systems that require brief planning before acting', 'Use your energy for immediate action on well-thought plans']
                },
                'avoidant': {
                    description: 'Transform avoidance into strategic courage using your natural boldness.',
                    steps: ['Reframe challenges as competitions you can win', 'Use your leadership skills to face problems head-on', 'Set small courage goals and celebrate victories', 'Remember that avoiding problems is giving up, which goes against your nature']
                },
                'paranoid': {
                    description: 'Channel your protective instincts into positive vigilance.',
                    steps: ['Use your natural alertness to protect others, not attack them', 'Practice giving people one chance to prove themselves', 'Focus your suspicion on real threats, not imagined ones', 'Lead by example in trusting worthy team members']
                },
                'aggressive': {
                    description: 'Redirect your powerful energy into constructive competition and leadership.',
                    steps: ['Channel aggression into sports, exercise, or competitive games', 'Use your intensity to defend others, not attack them', 'Practice controlled, direct communication instead of hostile outbursts', 'Set goals to be the strongest protector, not the biggest threat']
                }
            },
            'blue': {
                'toxic': {
                    description: 'Use your analytical skills to recognize and systematically change harmful patterns.',
                    steps: ['Study your behavior patterns and their effects on others', 'Create logical systems for treating others with respect', 'Use your intelligence to understand others\' perspectives', 'Develop structured plans for healthier communication']
                },
                'narcissistic': {
                    description: 'Apply your logical thinking to develop genuine empathy and realistic self-perception.',
                    steps: ['Analyze your achievements objectively, including others\' contributions', 'Study and practice empathy as a skill to master', 'Keep a journal tracking others\' needs and feelings', 'Use your intelligence to understand that true success includes lifting others']
                },
                'antisocial': {
                    description: 'Use your logical nature to understand the importance of social rules and others\' rights.',
                    steps: ['Study the logical reasons behind social norms and laws', 'Create systems for yourself that respect others\' boundaries', 'Practice empathy through careful observation and analysis', 'Use your intelligence to build genuine, beneficial relationships']
                },
                'dramatic': {
                    description: 'Apply your rational thinking to manage emotions more logically.',
                    steps: ['Analyze situations before reacting emotionally', 'Create a scale (1-10) to rate the actual importance of problems', 'Practice calm, logical communication instead of emotional outbursts', 'Use your analytical skills to solve problems rather than create drama']
                },
                'lazy': {
                    description: 'Use your systematic approach to create detailed plans and structures.',
                    steps: ['Break tasks into detailed, logical steps', 'Create comprehensive schedules and stick to them systematically', 'Use your analytical skills to track progress and productivity', 'Apply project management techniques to personal responsibilities']
                },
                'impulsive': {
                    description: 'Strengthen your natural tendency to think before acting.',
                    steps: ['Create detailed decision-making processes and follow them', 'Use your analytical skills to weigh pros and cons before acting', 'Build waiting periods into your decision-making routine', 'Practice thorough research before making any significant choices']
                },
                'avoidant': {
                    description: 'Use your planning skills to gradually and systematically face challenges.',
                    steps: ['Create detailed, step-by-step plans for approaching avoided situations', 'Use your analytical skills to break down fears logically', 'Research and prepare thoroughly before facing challenges', 'Track your progress scientifically to build confidence']
                },
                'paranoid': {
                    description: 'Apply your analytical skills to test and verify your suspicions rationally.',
                    steps: ['Use fact-checking and evidence-gathering instead of assumptions', 'Create logical criteria for trusting others', 'Practice objective analysis of others\' motives', 'Study communication skills to test your interpretations']
                },
                'aggressive': {
                    description: 'Use your logical nature to find more effective, respectful ways to achieve goals.',
                    steps: ['Analyze why aggression often backfires and creates more problems', 'Study conflict resolution and negotiation techniques', 'Practice logical, calm communication strategies', 'Use your intelligence to find win-win solutions instead of confrontation']
                }
            },
            'green': {
                'toxic': {
                    description: 'Use your natural caring nature to heal relationships and create positive environments.',
                    steps: ['Focus on nurturing others instead of controlling them', 'Practice patient, supportive communication', 'Use your empathy to understand how your actions affect others', 'Create peaceful, harmonious environments wherever you go']
                },
                'narcissistic': {
                    description: 'Redirect your focus from self to others using your natural caring instincts.',
                    steps: ['Practice genuinely listening to others without thinking about yourself', 'Use your nurturing nature to celebrate others\' achievements', 'Focus on how you can support and help others grow', 'Remember that your worth comes from the love and care you give']
                },
                'antisocial': {
                    description: 'Reconnect with your natural desire for harmony and positive relationships.',
                    steps: ['Focus on small acts of kindness and community building', 'Practice patience and understanding with others', 'Use your peaceful nature to bring people together', 'Remember that helping others brings deeper satisfaction than hurting them']
                },
                'dramatic': {
                    description: 'Channel your emotions into constructive support and peaceful solutions.',
                    steps: ['Practice calm, gentle responses instead of emotional reactions', 'Use your sensitivity to understand others, not to create drama', 'Focus on solving problems peacefully rather than escalating them', 'Channel emotional energy into helping and supporting others']
                },
                'lazy': {
                    description: 'Use your steady, patient nature to build consistent, sustainable habits.',
                    steps: ['Create gentle, realistic routines you can maintain long-term', 'Focus on helping others as motivation to stay active', 'Use your natural persistence to build slow but steady progress', 'Find accountability through supportive relationships']
                },
                'impulsive': {
                    description: 'Strengthen your natural tendency toward patience and careful consideration.',
                    steps: ['Practice your natural inclination to think about others before acting', 'Use your caring nature to consider how decisions affect people you love', 'Create peaceful environments that encourage thoughtful reflection', 'Take time to nurture yourself before making important decisions']
                },
                'avoidant': {
                    description: 'Use your supportive nature to gradually build confidence through helping others.',
                    steps: ['Start by supporting others facing similar challenges', 'Use your natural patience to take small steps toward goals', 'Build confidence through acts of kindness and service', 'Remember that your gentle approach is actually a strength, not a weakness']
                },
                'paranoid': {
                    description: 'Use your natural trust and harmony-seeking to build healthy relationships.',
                    steps: ['Practice giving others the benefit of the doubt', 'Focus on the good intentions of people around you', 'Use your empathy to understand others\' perspectives', 'Create safe, supportive relationships where trust can grow naturally']
                },
                'aggressive': {
                    description: 'Return to your natural peaceful, supportive approach to conflicts.',
                    steps: ['Practice gentle, patient communication instead of aggressive responses', 'Use your natural peacemaking skills to resolve conflicts', 'Focus on understanding and supporting others rather than fighting them', 'Remember that your strength lies in bringing harmony, not creating conflict']
                }
            },
            'yellow': {
                'toxic': {
                    description: 'Channel your natural positivity into genuinely uplifting others instead of tearing them down.',
                    steps: ['Use your humor to make others laugh WITH you, not AT others', 'Focus your energy on spreading joy and positivity', 'Practice encouraging others instead of criticizing them', 'Remember that your superpower is making people feel good, not bad']
                },
                'narcissistic': {
                    description: 'Use your natural social charm to celebrate others and build them up.',
                    steps: ['Make conversations about others\' interests and achievements', 'Use your charisma to help others shine, not just yourself', 'Practice asking genuine questions about others\' lives', 'Remember that the best entertainers make their audience feel like stars']
                },
                'antisocial': {
                    description: 'Reconnect with your natural love of people and social connection.',
                    steps: ['Start with small, positive social interactions', 'Use your humor and charm to bring joy to others', 'Practice random acts of kindness that make people smile', 'Remember that your happiness multiplies when shared with others']
                },
                'dramatic': {
                    description: 'Channel your expressive nature into positive entertainment rather than negative drama.',
                    steps: ['Use your natural storytelling for fun entertainment, not crisis creation', 'Practice turning problems into funny stories instead of major dramas', 'Focus your expressiveness on spreading joy and laughter', 'Remember that people love your energy when it\'s positive, not chaotic']
                },
                'lazy': {
                    description: 'Use your natural enthusiasm to make tasks fun and engaging.',
                    steps: ['Turn boring tasks into games or competitions', 'Work with others to make responsibilities more social and fun', 'Use your creativity to find enjoyable ways to complete tasks', 'Reward yourself with fun activities after completing responsibilities']
                },
                'impulsive': {
                    description: 'Channel your spontaneity into positive adventures rather than reckless decisions.',
                    steps: ['Practice the "fun pause" - ask "Will this create good fun or bad problems?"', 'Use your spontaneity for harmless adventures and creative projects', 'Create structured time for both planned activities and spontaneous fun', 'Channel impulsive energy into helping others or learning new things']
                },
                'avoidant': {
                    description: 'Use your natural optimism to approach challenges as exciting adventures.',
                    steps: ['Reframe scary situations as fun challenges or new adventures', 'Use your social nature to face difficulties with friends\' support', 'Focus on the positive possibilities rather than potential problems', 'Remember that your adaptability helps you handle whatever comes']
                },
                'paranoid': {
                    description: 'Return to your natural trust and positive outlook on people.',
                    steps: ['Practice assuming good intentions from others', 'Use your social skills to build genuine, trusting relationships', 'Focus on the fun and positive aspects of interactions', 'Remember that most people respond well to your natural warmth and enthusiasm']
                },
                'aggressive': {
                    description: 'Channel your high energy into fun competition rather than harmful aggression.',
                    steps: ['Use competitive games and sports to release aggressive energy positively', 'Practice using humor to defuse conflicts instead of escalating them', 'Focus your passion on defending others and spreading joy', 'Remember that your energy is most powerful when it builds people up']
                }
            },
            'purple': {
                'toxic': {
                    description: 'Use your creative and intuitive nature to build beautiful, meaningful relationships.',
                    steps: ['Channel your creativity into uplifting and inspiring others', 'Use your depth to understand and heal others\' pain', 'Practice expressing your uniqueness in ways that don\'t harm others', 'Focus on creating beauty and meaning in relationships']
                },
                'narcissistic': {
                    description: 'Transform your desire for uniqueness into genuine artistic and spiritual contribution.',
                    steps: ['Use your creativity to celebrate others\' unique qualities', 'Focus on creating art or experiences that inspire others', 'Practice deep listening to understand others\' inner worlds', 'Remember that true artists lift the human spirit, not just their own ego']
                },
                'antisocial': {
                    description: 'Reconnect with your natural empathy and desire for meaningful human connection.',
                    steps: ['Use your artistic abilities to express care and connection with others', 'Practice small acts of creative kindness', 'Focus on finding deep, authentic relationships rather than avoiding all people', 'Remember that your sensitivity is meant to help you connect, not isolate']
                },
                'dramatic': {
                    description: 'Channel your emotional depth into artistic expression rather than interpersonal drama.',
                    steps: ['Use art, writing, or music to express intense emotions healthily', 'Practice processing feelings privately before sharing them with others', 'Focus on creating beauty from your emotional experiences', 'Remember that your depth is a gift when expressed constructively']
                },
                'lazy': {
                    description: 'Use your creative inspiration to find meaningful motivation for tasks.',
                    steps: ['Connect daily tasks to your larger creative or spiritual goals', 'Use your imagination to visualize the beautiful outcomes of completed work', 'Create artistic or aesthetic approaches to mundane responsibilities', 'Find the deeper meaning or creative potential in every task']
                },
                'impulsive': {
                    description: 'Channel your intuitive insights into thoughtful creative expression.',
                    steps: ['Use your intuition for artistic inspiration, but think before acting on major decisions', 'Practice expressing impulses through art, writing, or creative projects first', 'Create rituals that honor your insights while building in reflection time', 'Trust your intuition but verify with practical consideration']
                },
                'avoidant': {
                    description: 'Use your creative courage to gradually face challenges through artistic expression.',
                    steps: ['Express your fears and hopes through creative mediums first', 'Use your imagination to visualize successful outcomes', 'Approach challenges as creative problems to solve', 'Remember that your unique perspective is valuable and needed']
                },
                'paranoid': {
                    description: 'Use your intuitive abilities to discern real threats from imagined ones.',
                    steps: ['Trust your intuition but verify with practical reality checks', 'Use your creativity to imagine positive motives in others', 'Practice expressing concerns through art before confronting others', 'Focus on creating safe, beautiful spaces where trust can grow']
                },
                'aggressive': {
                    description: 'Transform aggressive energy into passionate creative and spiritual expression.',
                    steps: ['Channel anger and intensity into powerful artistic expression', 'Use your depth to understand and heal the pain behind aggression', 'Practice expressing strong feelings through creative mediums first', 'Focus your passion on defending beauty, truth, and creative expression']
                }
            },
            'black': {
                'toxic': {
                    description: 'Use your authenticity and independence to model healthy boundaries and honest communication.',
                    steps: ['Practice direct but respectful communication', 'Use your independence to avoid manipulative behaviors', 'Model authentic relationships based on mutual respect', 'Focus on being genuinely helpful rather than controlling']
                },
                'narcissistic': {
                    description: 'Channel your self-reliance into genuine confidence that doesn\'t need constant validation.',
                    steps: ['Practice being truly independent rather than dependent on others\' admiration', 'Use your authenticity to appreciate others genuinely', 'Focus on your own growth without needing to feel superior', 'Remember that real strength doesn\'t need to diminish others']
                },
                'antisocial': {
                    description: 'Use your natural honesty and independence to build respectful, authentic relationships.',
                    steps: ['Practice honest communication that respects others\' rights', 'Use your independence to choose relationships that are mutually beneficial', 'Focus on building a few deep, authentic connections', 'Remember that true independence includes respecting others\' autonomy']
                },
                'dramatic': {
                    description: 'Channel your intensity into authentic expression without unnecessary drama.',
                    steps: ['Practice direct, honest communication instead of dramatic outbursts', 'Use your natural depth for meaningful conversations, not crisis creation', 'Focus on solving problems efficiently rather than creating unnecessary complexity', 'Remember that authentic emotion is powerful without being theatrical']
                },
                'lazy': {
                    description: 'Use your independence and self-reliance to create personal accountability systems.',
                    steps: ['Create personal standards and stick to them independently', 'Use your authenticity to be honest about what needs to be done', 'Focus on intrinsic motivation rather than external pressure', 'Remember that true independence requires self-discipline']
                },
                'impulsive': {
                    description: 'Strengthen your natural tendency toward independent, thoughtful decision-making.',
                    steps: ['Use your independence to take time for solo reflection before deciding', 'Practice making decisions based on your authentic values, not impulses', 'Create personal rules and boundaries to guide your choices', 'Remember that true freedom comes from self-control, not impulsiveness']
                },
                'avoidant': {
                    description: 'Use your independence to face challenges on your own terms.',
                    steps: ['Approach challenges as opportunities to prove your independence', 'Use your authenticity to be honest about fears and work through them', 'Practice facing difficulties without needing others\' approval or support', 'Remember that true independence means not letting fear control your choices']
                },
                'paranoid': {
                    description: 'Use your natural skepticism wisely while remaining open to authentic connections.',
                    steps: ['Practice healthy skepticism without assuming the worst', 'Use your independence to verify information objectively', 'Focus on building trust slowly with people who earn it', 'Remember that being selective about relationships is different from being suspicious of everyone']
                },
                'aggressive': {
                    description: 'Channel your intensity into assertive independence rather than hostile aggression.',
                    steps: ['Use your directness for honest communication, not attack', 'Practice standing up for yourself and others without being hostile', 'Focus your intensity on protecting your values and boundaries', 'Remember that true strength protects rather than destroys']
                }
            },
            'white': {
                'toxic': {
                    description: 'Return to your natural peaceful, harmonious approach to relationships.',
                    steps: ['Use your gift for creating peace to heal rather than harm', 'Practice gentle, kind communication', 'Focus on bringing calm and harmony to tense situations', 'Remember that your superpower is making others feel at peace']
                },
                'narcissistic': {
                    description: 'Use your natural humility and peace-making to focus on others\' wellbeing.',
                    steps: ['Practice your natural tendency to put others\' needs first', 'Use your gift for harmony to celebrate others\' achievements', 'Focus on creating peaceful, supportive environments for everyone', 'Remember that true peace comes from lifting others up']
                },
                'antisocial': {
                    description: 'Reconnect with your natural desire for harmony and peaceful coexistence.',
                    steps: ['Practice small acts of kindness and peacemaking', 'Use your natural gentleness to build bridges with others', 'Focus on creating harmony rather than avoiding all social contact', 'Remember that your peaceful nature is needed in the world']
                },
                'dramatic': {
                    description: 'Return to your natural calm, peaceful approach to handling situations.',
                    steps: ['Practice responding with calmness instead of emotional intensity', 'Use your natural peacemaking skills to resolve conflicts quietly', 'Focus on creating harmony rather than stirring up drama', 'Remember that your strength is in bringing peace, not chaos']
                },
                'lazy': {
                    description: 'Use your peaceful nature to create gentle, sustainable routines.',
                    steps: ['Create calm, organized environments that make tasks easier', 'Use your natural patience to build slow but steady habits', 'Focus on helping others as motivation to stay active', 'Practice gentle self-discipline that doesn\'t create inner conflict']
                },
                'impulsive': {
                    description: 'Strengthen your natural tendency toward thoughtful, peaceful decision-making.',
                    steps: ['Practice your natural inclination to pause and consider others\' feelings', 'Use your peacemaking skills to think about consequences before acting', 'Create calm, quiet spaces for reflection before making decisions', 'Remember that your measured approach usually leads to better outcomes']
                },
                'avoidant': {
                    description: 'Use your desire for harmony to gently face challenges that matter.',
                    steps: ['Approach difficulties with your natural gentleness and patience', 'Focus on challenges that help create peace and harmony for others', 'Practice facing conflicts that threaten the harmony you value', 'Remember that sometimes facing problems is necessary to maintain peace']
                },
                'paranoid': {
                    description: 'Return to your natural trust and positive outlook on others.',
                    steps: ['Practice assuming good intentions from others', 'Use your peacemaking skills to build trusting relationships', 'Focus on creating safe, harmonious environments where trust can flourish', 'Remember that your natural tendency is to see the good in people']
                },
                'aggressive': {
                    description: 'Return to your natural peaceful, gentle approach to conflicts.',
                    steps: ['Practice responding to conflicts with calmness and gentleness', 'Use your natural diplomatic skills instead of aggressive confrontation', 'Focus on creating peace and understanding rather than winning fights', 'Remember that your true strength lies in making peace, not war']
                }
            },
            'grey': {
                'toxic': {
                    description: 'Use your logical, balanced approach to create fair and respectful relationships.',
                    steps: ['Apply your objectivity to treat others fairly and respectfully', 'Use your logical thinking to understand the consequences of toxic behavior', 'Practice neutral, respectful communication', 'Focus on creating balanced, mutually beneficial relationships']
                },
                'narcissistic': {
                    description: 'Use your natural objectivity to develop realistic self-perception and genuine consideration for others.',
                    steps: ['Apply your logical thinking to assess your achievements realistically', 'Practice objective evaluation of others\' contributions and needs', 'Use your balanced nature to give equal consideration to others\' perspectives', 'Focus on practical cooperation rather than seeking admiration']
                },
                'antisocial': {
                    description: 'Use your logical understanding to recognize the practical value of social cooperation.',
                    steps: ['Apply logical thinking to understand why social rules benefit everyone', 'Practice respectful, fair treatment of others as a practical approach', 'Use your objectivity to see the mutual benefits of positive relationships', 'Focus on practical cooperation and reciprocal respect']
                },
                'dramatic': {
                    description: 'Use your naturally calm, logical approach to handle situations rationally.',
                    steps: ['Practice responding to problems with logical analysis rather than emotional intensity', 'Use your natural objectivity to keep situations in proper perspective', 'Focus on practical solutions rather than emotional reactions', 'Remember that your calm approach is more effective than drama']
                },
                'lazy': {
                    description: 'Use your logical, efficient nature to create practical systems for productivity.',
                    steps: ['Apply systematic thinking to organize tasks efficiently', 'Use your balanced approach to create realistic, manageable schedules', 'Focus on practical benefits of completing responsibilities', 'Create logical reward systems for maintaining productivity']
                },
                'impulsive': {
                    description: 'Strengthen your natural tendency toward logical, measured decision-making.',
                    steps: ['Use your analytical skills to weigh options before acting', 'Practice your natural objectivity when making decisions', 'Create logical decision-making processes and follow them consistently', 'Remember that your measured approach usually leads to better outcomes']
                },
                'avoidant': {
                    description: 'Use your logical thinking to objectively assess and approach challenges.',
                    steps: ['Apply rational analysis to break down fears and challenges logically', 'Use your balanced approach to take measured steps toward goals', 'Practice objective evaluation of risks versus benefits', 'Focus on practical strategies for overcoming obstacles']
                },
                'paranoid': {
                    description: 'Use your logical, objective thinking to test suspicions against reality.',
                    steps: ['Apply critical thinking to evaluate whether concerns are based on facts', 'Use your balanced perspective to consider multiple explanations for others\' behavior', 'Practice objective observation rather than emotional interpretation', 'Focus on gathering real evidence rather than assuming motives']
                },
                'aggressive': {
                    description: 'Use your naturally calm, logical approach to handle conflicts rationally.',
                    steps: ['Apply logical problem-solving to conflicts instead of aggressive responses', 'Use your objectivity to find fair solutions that work for everyone', 'Practice calm, measured communication even when frustrated', 'Focus on practical resolution rather than winning through aggression']
                }
            },
            'pink': {
                'toxic': {
                    description: 'Return to your natural loving, nurturing approach to relationships.',
                    steps: ['Use your gift for caring to heal and support others', 'Practice gentle, loving communication', 'Focus on creating safe, nurturing environments for everyone', 'Remember that your superpower is making others feel loved and valued']
                },
                'narcissistic': {
                    description: 'Channel your desire for love into genuinely caring for and celebrating others.',
                    steps: ['Practice giving the love and attention you want to receive', 'Use your nurturing nature to help others feel special and valued', 'Focus on others\' emotional needs and wellbeing', 'Remember that the most lovable people are those who make others feel loved']
                },
                'antisocial': {
                    description: 'Reconnect with your natural love for people and desire to care for others.',
                    steps: ['Start with small acts of kindness and emotional support', 'Use your natural empathy to understand and help others', 'Practice gentle, caring interactions that build trust', 'Remember that your caring nature is meant to connect with and heal others']
                },
                'dramatic': {
                    description: 'Channel your emotional sensitivity into constructive caring rather than drama creation.',
                    steps: ['Use your emotional awareness to support others, not create chaos', 'Practice gentle, loving responses instead of dramatic reactions', 'Focus on healing and nurturing rather than stirring up emotions', 'Remember that your sensitivity is a gift when used to care for others']
                },
                'lazy': {
                    description: 'Use your caring nature to find motivation through helping and nurturing others.',
                    steps: ['Focus on tasks that help care for people you love', 'Use your nurturing instincts to create beautiful, comfortable environments', 'Find motivation through seeing how your efforts make others happy', 'Practice gentle self-care that gives you energy to care for others']
                },
                'impulsive': {
                    description: 'Use your caring nature to consider how decisions affect people you love.',
                    steps: ['Practice pausing to think about how your actions might hurt those you care about', 'Use your empathy to consider others\' feelings before acting', 'Create loving rituals that encourage thoughtful reflection', 'Remember that true caring requires thinking about consequences']
                },
                'avoidant': {
                    description: 'Use your desire to care for others as motivation to face challenges courageously.',
                    steps: ['Approach difficulties as opportunities to protect and help those you love', 'Use your caring relationships as support systems for facing fears', 'Practice gentle courage in small steps to build confidence', 'Remember that those you love need you to be brave for them']
                },
                'paranoid': {
                    description: 'Return to your natural trust and loving outlook on others.',
                    steps: ['Practice assuming loving intentions from others', 'Use your empathy to understand others\' perspectives with compassion', 'Focus on creating loving, safe relationships where trust can grow', 'Remember that your natural tendency is to see the love and goodness in people']
                },
                'aggressive': {
                    description: 'Return to your natural gentle, loving approach to all interactions.',
                    steps: ['Practice responding with gentleness and care instead of aggression', 'Use your loving nature to heal conflicts rather than escalate them', 'Focus on protecting and nurturing rather than attacking', 'Remember that your true strength lies in your ability to love and heal']
                }
            },
            'chocolate': {
                'toxic': {
                    description: 'Use your natural loyalty and traditional values to build healthy, respectful relationships.',
                    steps: ['Practice treating others with the respect and loyalty you value', 'Use your traditional values to guide ethical behavior', 'Focus on building stable, trustworthy relationships', 'Remember that true strength comes from being dependable and honorable']
                },
                'narcissistic': {
                    description: 'Use your grounded nature and focus on family/community to consider others\' wellbeing.',
                    steps: ['Practice your natural focus on family and community rather than just yourself', 'Use your traditional values to appreciate others\' contributions', 'Focus on being a reliable source of support for others', 'Remember that true leadership serves others, not just self']
                },
                'antisocial': {
                    description: 'Reconnect with your natural values of community, family, and traditional cooperation.',
                    steps: ['Focus on small acts of service to your community or family', 'Practice the traditional values of respect and cooperation', 'Use your natural loyalty to build positive relationships', 'Remember that your strength comes from being part of something bigger than yourself']
                },
                'dramatic': {
                    description: 'Return to your naturally steady, calm approach to handling situations.',
                    steps: ['Practice responding with your natural stability and calm', 'Use your grounded nature to keep situations in perspective', 'Focus on practical solutions rather than emotional drama', 'Remember that your strength is in being the steady, reliable person others can count on']
                },
                'lazy': {
                    description: 'Use your strong work ethic and sense of responsibility to motivate consistent action.',
                    steps: ['Connect tasks to your values of responsibility and dependability', 'Use your natural work ethic to build consistent daily routines', 'Focus on how your efforts contribute to family or community wellbeing', 'Remember that being reliable is one of your core strengths']
                },
                'impulsive': {
                    description: 'Strengthen your natural tendency toward careful, responsible decision-making.',
                    steps: ['Use your traditional values to guide decisions carefully', 'Practice your natural inclination to consider long-term consequences', 'Create structured decision-making processes based on your values', 'Remember that your strength lies in being thoughtful and dependable']
                },
                'avoidant': {
                    description: 'Use your sense of duty and responsibility to face challenges that matter.',
                    steps: ['Approach challenges as duties you need to fulfill for others', 'Use your natural persistence to work through difficulties step by step', 'Focus on how facing problems helps protect and serve those you care about', 'Remember that being dependable sometimes means doing difficult things']
                },
                'paranoid': {
                    description: 'Use your traditional values of trust and community to build healthy relationships.',
                    steps: ['Practice the traditional values of giving others the benefit of the doubt', 'Use your loyalty to build trusting relationships with worthy people', 'Focus on your community and family connections that are naturally trustworthy', 'Remember that healthy communities are built on mutual trust and respect']
                },
                'aggressive': {
                    description: 'Return to your naturally steady, protective approach to conflicts.',
                    steps: ['Use your strength to protect others, not to attack them', 'Practice the traditional values of respect and honor in all interactions', 'Focus on being a calm, reliable presence that others can depend on', 'Remember that true strength protects and serves, it doesn\'t destroy']
                }
            }
        };

        const colorAdvice = advice[color];
        if (!colorAdvice || !colorAdvice[normalizedTrait]) {
            return `I don't have specific advice for ${color} personality overcoming ${trait}. Please make sure you're using valid color personalities and negative traits.`;
        }

        const traitAdvice = colorAdvice[normalizedTrait];
        const stepsFormatted = traitAdvice.steps.map(s => `• ${s}`).join('\n');

        return `🌟 **${color.charAt(0).toUpperCase() + color.slice(1)} Personality: Overcoming ${trait.charAt(0).toUpperCase() + trait.slice(1)} Behavior**\n\n**Your Personalized Approach:**\n${traitAdvice.description}\n\n**Action Steps for ${color.charAt(0).toUpperCase() + color.slice(1)} Personalities:**\n${stepsFormatted}\n\n💪 Remember: Your ${color} personality has unique strengths that can help you overcome this challenge. Use your natural gifts to create positive change!`;
    }

    checkGeneralQuestions(message) {
        // Question 1: Why is personality important for us
        if ((message.includes('why') && message.includes('personality') && message.includes('important')) ||
            (message.includes('why is personality important'))) {
            return `🌟 **Why Is Personality Important For Us?**\n\nPersonality is important because it shapes how we think, feel, and behave, helping us build relationships, make decisions, and express who we are.\n\n**Key Reasons:**\n• **Relationships** - Understanding personality helps us connect better with others\n• **Decision Making** - Our personality influences how we approach choices\n• **Self-Expression** - Personality is how we show our unique identity\n• **Understanding Others** - Helps us empathize and communicate effectively\n• **Personal Growth** - Knowing our personality helps us improve ourselves\n\n💡 Understanding personality is the foundation for better relationships and personal development!`;
        }
        
        // Question 2: What is eduPersona
        if ((message.includes('what is edupersona') || message.includes('what is edu persona')) ||
            (message.includes('what') && message.includes('edupersona')) ||
            (message.includes('what') && message.includes('edu persona'))) {
            return `🎓 **What Is EduPersona?**\n\nEdu Persona is a website that helps people learn about their personality and traits for self-improvement.\n\n**About EduPersona:**\n• **Educational Platform** - Focuses on personality learning and development\n• **Self-Discovery Tool** - Helps users understand their unique traits\n• **Improvement Focused** - Designed to help people grow and develop\n• **User-Friendly** - Easy to use personality assessment and guidance\n• **Comprehensive** - Covers personality types, traits, and behaviors\n\n🚀 EduPersona makes personality learning accessible and practical for everyone!`;
        }
        
        // Question 3: What is benefit of edu Persona
        if ((message.includes('benefit') && (message.includes('edupersona') || message.includes('edu persona'))) ||
            (message.includes('what is benefit') || message.includes('benefits'))) {
            return `🎯 **Benefits of Edu Persona**\n\n**Self-Awareness** – Users understand their personality type and traits\n\n**Identify Strengths** – Helps users recognize what they are good at\n\n**Spot Weaknesses** – Shows areas where they can improve\n\n**Friendship & Relationship Guidance** – Suggests compatibility with others\n\n**Negative Trait Improvement** – Gives tips to overcome bad habits or behaviors\n\n**AI Summaries** – Provides clear, personalized explanations of results\n\n**Visual Insights** – Uses graphs for easy understanding of personality and traits\n\n**Comparison Feature** – Lets users compare results with others\n\n**Educational Value** – Teaches about different personality types and behaviors\n\n**Personal Growth** – Encourages better decision-making and self-development\n\n✨ All these benefits work together to help you become the best version of yourself!`;
        }
        
        // Question 4: How these website help a user
        if ((message.includes('how') && message.includes('website') && message.includes('help')) ||
            (message.includes('how') && message.includes('help') && message.includes('user')) ||
            (message.includes('how does') && (message.includes('edupersona') || message.includes('edu persona')))) {
            return `🤝 **How This Website Helps Users**\n\nEdu Persona helps users understand their personality, strengths, weaknesses, and negative traits, offering guidance, AI insights, and tips for personal growth and better relationships.\n\n**Ways We Help:**\n• **Personality Understanding** - Clear insights into who you are\n• **Strength Recognition** - Discover what you excel at\n• **Weakness Identification** - Find areas for improvement\n• **Negative Trait Guidance** - Learn to overcome challenging behaviors\n• **Relationship Advice** - Improve connections with others\n• **AI-Powered Insights** - Get personalized, intelligent feedback\n• **Growth Tips** - Practical advice for self-development\n• **Educational Content** - Learn about personality psychology\n\n🌱 We're here to support your journey of self-discovery and personal growth!`;
        }
        
        // Question 5: How to get started using this website
        if ((message.includes('how to get started') || message.includes('how do i start')) ||
            (message.includes('get started') && message.includes('website')) ||
            (message.includes('how to') && (message.includes('started') || message.includes('edu persona')))) {
            return `🚀 **How To Get Started Using This Website**\n\nYou can start by taking tests to discover your personality!\n\n**Step 1: Take The Tests**\n• **Color Personality Test** - Visit <a href="test.html">test.html</a>\n• **Negative Trait Test** - Visit <a href="badtest.html">badtest.html</a>\n\n**Step 2: Get Full Features (Optional)**\n• **Register an account** - Visit <a href="login.html">login.html</a>\n• **Access AI Summary** - Get detailed personality insights\n• **Negative Trait Profile AI** - Personalized improvement plans\n\n**Step 3: After Registration**\n• **Take both tests again** and save results to your profile\n• **Add friends** based on their color personality\n• **Share your results** with friends and family\n\n**Quick Start:** Just click on <a href="test.html">test.html</a> or <a href="badtest.html">badtest.html</a> to begin your personality journey!\n\n✨ No registration required to take tests, but registering unlocks advanced AI features!`;
            
        }
        
        // Question 6: Help / what questions can I ask / help question
        if ((message.includes('help question') || message.includes('what question can i ask')) ||
            (message.includes('help') && message.includes('chatbox')) ||
            (message.includes('what can i ask') || message.includes('available questions'))) {
            return `❓ **What Questions Can You Ask This Chatbox?**\n\n**🎨 Color Personality Questions:**\n• "What is [color] personality?" (red, blue, green, yellow, purple, black, white, grey, pink, chocolate)\n• "[Color] hobby" or "I'm [color] what are my hobbies?"\n• "I'm [color] feeling sad what should I do?"\n• "I'm [color] how to overcome [negative trait]?"\n\n**🤝 Color Compatibility Questions:**\n• "What is my relationship between [color1] and [color2]?"\n• "What is rating best match between [color1] and [color2]?"\n• "What is my friendship status between [color1] and [color2]?"\n\n**⚠️ Negative Trait Questions:**\n• "What is [trait]?" (toxic, narcissistic, antisocial, dramatic, lazy, unreliable, impulsive, avoidant, paranoid, aggressive)\n\n**🌟 General Questions:**\n• "Why is personality important for us?"\n• "What is eduPersona?"\n• "What is benefit of edu Persona?"\n• "How does this website help users?"\n• "How to get started using this website?"\n\n**🏢 Business Questions:**\n• Ask about "rental", "property", "financial", "reports", "assets"\n\n**🎤 Voice Commands:** All questions work with voice input too!\n\n💡 **Tip:** You can mix and match - try "Red blue compatibility" or "Blue hobby" for quick answers!`;
        }
        
        return null;
    }

    checkNegativeTraitQuestions(message) {
        const negativeTraits = ['toxic', 'narcissistic', 'antisocial', 'dramatic', 'lazy', 'unreliable', 'impulsive', 'avoidant', 'paranoid', 'aggressive'];
        
        // Check if message contains "what is" and any negative trait
        if (message.toLowerCase().includes('what is') || message.toLowerCase().includes('what\'s')) {
            for (let trait of negativeTraits) {
                if (message.toLowerCase().includes(trait)) {
                    console.log('Found negative trait:', trait, 'in message:', message); // Debug log
                    return this.getNegativeTraitDescription(trait);
                }
            }
        }
        
        return null;
    }

    getNegativeTraitDescription(trait) {
        const descriptions = {
            'toxic': {
                title: 'Toxic Behavior',
                definition: 'Toxic behavior refers to actions, attitudes, or patterns that harm others emotionally, mentally, or sometimes physically.',
                characteristics: ['Manipulative and controlling behavior', 'Constant criticism and put-downs', 'Emotional manipulation and guilt-tripping', 'Lack of respect for boundaries', 'Creates drama and conflict intentionally', 'Refuses to take responsibility for actions'],
                impact: ['Damages self-esteem of others', 'Creates hostile environments', 'Destroys relationships and trust', 'Causes emotional distress and anxiety'],
                advice: 'If you recognize toxic patterns in yourself, seek professional help to develop healthier communication and relationship skills. If dealing with toxic people, set firm boundaries and prioritize your mental health.'
            },
            'narcissistic': {
                title: 'Narcissistic Behavior',
                definition: 'Narcissistic behavior involves an excessive need for admiration, lack of empathy, and an inflated sense of self-importance.',
                characteristics: ['Grandiose sense of self-importance', 'Preoccupied with fantasies of success and power', 'Believes they are special and unique', 'Requires constant admiration and attention', 'Lacks empathy for others', 'Exploits relationships for personal gain'],
                impact: ['Damages personal relationships', 'Creates one-sided interactions', 'Hurts others through lack of empathy', 'Prevents genuine connections'],
                advice: 'Self-reflection and therapy can help develop empathy and realistic self-perception. Focus on genuinely listening to others and considering their feelings and needs.'
            },
            'antisocial': {
                title: 'Antisocial Behavior',
                definition: 'Antisocial behavior involves a disregard for social norms and the rights of others, often accompanied by deceitful or aggressive actions.',
                characteristics: ['Disregards social rules and norms', 'Lacks remorse or guilt for harmful actions', 'Deceitful and manipulative behavior', 'Impulsive and irresponsible actions', 'Aggressive or violent tendencies', 'Difficulty maintaining relationships'],
                impact: ['Harms individuals and communities', 'Breaks down social trust', 'Can lead to legal consequences', 'Isolates the person from healthy relationships'],
                advice: 'Professional mental health intervention is often necessary. Learning empathy, social skills, and impulse control through therapy can help develop healthier patterns.'
            },
            'dramatic': {
                title: 'Dramatic Behavior',
                definition: 'Dramatic behavior involves excessive emotional reactions, attention-seeking, and creating unnecessary drama in situations.',
                characteristics: ['Exaggerated emotional responses', 'Constantly seeks attention and spotlight', 'Turns minor issues into major crises', 'Thrives on conflict and chaos', 'Emotionally volatile and unpredictable', 'Makes everything about themselves'],
                impact: ['Exhausts friends and family', 'Creates unnecessary stress and conflict', 'Prevents problem-solving', 'Damages professional relationships'],
                advice: 'Practice emotional regulation techniques, mindfulness, and self-awareness. Learn to pause before reacting and consider if your response matches the situation\'s actual importance.'
            },
            'lazy': {
                title: 'Lazy & Unreliable Behavior',
                definition: 'Lazy and unreliable behavior involves avoiding responsibilities, lacking motivation, and failing to follow through on commitments.',
                characteristics: ['Avoids work and responsibilities', 'Procrastinates consistently', 'Makes excuses for not completing tasks', 'Unreliable with commitments and promises', 'Lacks motivation and initiative', 'Depends on others to do their work'],
                impact: ['Disappoints and burdens others', 'Damages trust and credibility', 'Limits personal and professional growth', 'Creates stress for team members'],
                advice: 'Start with small, manageable goals and build momentum. Address underlying issues like depression or ADHD if present. Develop time management skills and accountability systems.'
            },
            'unreliable': {
                title: 'Lazy & Unreliable Behavior',
                definition: 'Lazy and unreliable behavior involves avoiding responsibilities, lacking motivation, and failing to follow through on commitments.',
                characteristics: ['Avoids work and responsibilities', 'Procrastinates consistently', 'Makes excuses for not completing tasks', 'Unreliable with commitments and promises', 'Lacks motivation and initiative', 'Depends on others to do their work'],
                impact: ['Disappoints and burdens others', 'Damages trust and credibility', 'Limits personal and professional growth', 'Creates stress for team members'],
                advice: 'Start with small, manageable goals and build momentum. Address underlying issues like depression or ADHD if present. Develop time management skills and accountability systems.'
            },
            'impulsive': {
                title: 'Impulsive Behavior',
                definition: 'Impulsive behavior involves acting without thinking, making hasty decisions, and struggling with self-control.',
                characteristics: ['Acts without considering consequences', 'Makes hasty decisions without planning', 'Struggles with delayed gratification', 'Interrupts others frequently', 'Difficulty controlling emotions and reactions', 'Takes unnecessary risks'],
                impact: ['Leads to poor decision-making', 'Damages relationships through thoughtless actions', 'Creates financial or personal problems', 'Prevents goal achievement'],
                advice: 'Practice the "pause and think" technique before acting. Develop mindfulness skills, use planning tools, and consider seeking help if impulsivity significantly impacts your life.'
            },
            'avoidant': {
                title: 'Avoidant Behavior',
                definition: 'Avoidant behavior involves withdrawing from challenges, relationships, or responsibilities to avoid discomfort or potential failure.',
                characteristics: ['Avoids challenging situations or conflicts', 'Withdraws from social interactions', 'Procrastinates on important tasks', 'Fears criticism or rejection', 'Struggles with commitment in relationships', 'Gives up easily when faced with obstacles'],
                impact: ['Limits personal growth and opportunities', 'Prevents deep relationships from forming', 'Increases anxiety over time', 'Leads to missed life experiences'],
                advice: 'Gradually expose yourself to avoided situations in small steps. Practice self-compassion and challenge negative self-talk. Consider therapy to address underlying fears and build confidence.'
            },
            'paranoid': {
                title: 'Paranoid Behavior',
                definition: 'Paranoid behavior involves excessive distrust, suspicion of others\' motives, and believing others are trying to harm or deceive you.',
                characteristics: ['Excessive suspicion of others\' motives', 'Believes others are plotting against them', 'Difficulty trusting friends and family', 'Interprets neutral actions as threatening', 'Holds grudges for perceived slights', 'Secretive and guarded behavior'],
                impact: ['Isolates the person from supportive relationships', 'Creates constant stress and anxiety', 'Prevents collaboration and teamwork', 'Can lead to aggressive defensive behaviors'],
                advice: 'Reality-testing with trusted friends can help. Professional therapy is often beneficial to address underlying fears and develop healthier thinking patterns. Practice giving others the benefit of the doubt.'
            },
            'aggressive': {
                title: 'Aggressive Behavior',
                definition: 'Aggressive behavior involves hostile, forceful actions or attitudes intended to dominate or harm others physically or emotionally.',
                characteristics: ['Uses intimidation and threats', 'Quick to anger and hostility', 'Verbally or physically attacks others', 'Bullying and dominating behavior', 'Shows little empathy for victims', 'Uses aggression to get their way'],
                impact: ['Causes fear and trauma in others', 'Damages all types of relationships', 'Can lead to legal consequences', 'Creates hostile environments'],
                advice: 'Anger management training and therapy are essential. Learn healthy ways to express frustration, practice empathy, and develop conflict resolution skills. Professional help is crucial for changing aggressive patterns.'
            }
        };
        
        const traitInfo = descriptions[trait];
        if (!traitInfo) return "I don't recognize that negative trait. Available traits are: Toxic, Narcissistic, Antisocial, Dramatic, Lazy & Unreliable, Impulsive, Avoidant, Paranoid, and Aggressive.";
        
        const characteristicsFormatted = traitInfo.characteristics.map(c => `• ${c}`).join('\n');
        const impactFormatted = traitInfo.impact.map(i => `• ${i}`).join('\n');
        
        return `⚠️ **${traitInfo.title}**\n\n**Definition:**\n${traitInfo.definition}\n\n**Key Characteristics:**\n${characteristicsFormatted}\n\n**Negative Impact:**\n${impactFormatted}\n\n**💡 Advice for Change:**\n${traitInfo.advice}\n\n🌟 Remember: Everyone can change and grow with self-awareness, effort, and often professional support. Recognizing negative patterns is the first step toward positive change!`;
    }

    checkColorCompatibility(message) {
        const colors = ['red', 'blue', 'green', 'yellow', 'purple', 'black', 'white', 'grey', 'gray', 'pink', 'chocolate'];
        const foundColors = [];
        
        // Extract colors from the message - improved to handle same colors
        colors.forEach(color => {
            const regex = new RegExp(`\\b${color}\\b`, 'gi');
            const matches = message.match(regex);
            if (matches) {
                // Normalize gray/grey to grey and add each occurrence
                const normalizedColor = color === 'gray' ? 'grey' : color;
                for (let i = 0; i < matches.length; i++) {
                    foundColors.push(normalizedColor);
                }
            }
        });
        
        // If we found exactly 2 colors (can be the same), check question type
        if (foundColors.length >= 2) {
            // Check for rating/best match questions
            if (message.toLowerCase().includes('rating') && 
                (message.toLowerCase().includes('best match') || message.toLowerCase().includes('bestmatch'))) {
                return this.getBestMatchRating(foundColors[0], foundColors[1]);
            }
            
            // Check for friendship status questions
            if (message.toLowerCase().includes('friendship') && 
                message.toLowerCase().includes('status')) {
                return this.getFriendshipStatus(foundColors[0], foundColors[1]);
            }
            
            // Default compatibility check
            return this.getColorCompatibility(foundColors[0], foundColors[1]);
        }
        
        // If asking about specific question types but found only one color
        if (foundColors.length === 1) {
            if ((message.toLowerCase().includes('rating') && message.toLowerCase().includes('best match')) ||
                (message.toLowerCase().includes('friendship') && message.toLowerCase().includes('status')) ||
                message.includes('combination') || message.includes('compatibility') || 
                message.includes('relationship')) {
                return `I found the color "${foundColors[0]}" in your question. Please specify a second color. For example: "What is rating best match between ${foundColors[0]} and blue?" or "What is my friendship status between ${foundColors[0]} and red?"`;
            }
        }
        
        return null;
    }

    getColorCompatibility(color1, color2) {
        // Normalize the color names and create the combination key
        const normalizeColor = (color) => {
            return color.charAt(0).toUpperCase() + color.slice(1).toLowerCase();
        };
        
        const c1 = normalizeColor(color1);
        const c2 = normalizeColor(color2);
        
        // Complete color combinations data
        const combinations = {
            'Red+Red': { rating: '3/5', dynamics: 'A powerful, high-energy relationship where both partners share an intense drive for achievement and leadership.', strengths: ['Mutual understanding of competitive nature', 'Shared ambitious goals', 'Direct and honest communication', 'High motivation and energy'], challenges: ['Potential power struggles', 'Difficulty in compromising', 'Risk of constant competition', 'Emotional connection may be overlooked'] },
            'Red+Blue': { rating: '4/5', dynamics: 'A balanced partnership combining Red\'s action-oriented approach with Blue\'s analytical thinking.', strengths: ['Complementary problem-solving skills', 'Balanced decision-making', 'Mutual respect for different strengths', 'Efficient goal achievement'], challenges: ['Different emotional processing styles', 'Red\'s impatience vs Blue\'s thoroughness', 'Potential communication friction', 'Balancing action and analysis'] },
            'Red+Green': { rating: '3/5', dynamics: 'A relationship where leadership meets nurturing, creating a dynamic of protection and support.', strengths: ['Balanced approach to goals and relationships', 'Red provides direction, Green offers stability', 'Complementary decision-making styles', 'Mutual growth opportunities'], challenges: ['Red\'s directness may hurt Green\'s sensitivity', 'Potential power imbalance', 'Different emotional processing speeds', 'Conflicting approaches to conflict'] },
            'Red+Yellow': { rating: '4/5', dynamics: 'A vibrant, energetic relationship filled with enthusiasm and forward momentum.', strengths: ['High energy and shared excitement', 'Complementary approach to life\'s challenges', 'Yellow lightens Red\'s intensity', 'Mutual appreciation for action'], challenges: ['Risk of spreading energy too thin', 'Potential lack of follow-through', 'Differing commitment levels', 'Balancing seriousness and spontaneity'] },
            'Red+Purple': { rating: '4/5', dynamics: 'A dynamic fusion of action and creativity, blending practical execution with innovative vision.', strengths: ['Transforming creative ideas into concrete actions', 'Mutual appreciation for ambition and depth', 'Balanced approach to challenges', 'Inspiring and challenging each other\'s perspectives'], challenges: ['Potential clash between Red\'s directness and Purple\'s introspection', 'Different processing speeds', 'Balancing practical needs with creative exploration', 'Risk of misunderstanding each other\'s motivations'] },
            'Red+Black': { rating: '5/5', dynamics: 'An intense, authentic relationship marked by strong individual identities and mutual respect for independence.', strengths: ['Deep respect for personal authenticity', 'Honest and direct communication', 'Shared commitment to personal growth', 'Mutual appreciation for strength and independence'], challenges: ['Potential emotional distance', 'Risk of becoming too individualistic', 'Difficulty in showing vulnerability', 'Balancing personal space with relationship intimacy'] },
            'Red+White': { rating: '5/5', dynamics: 'A balancing act between assertive leadership and peaceful harmony, creating a relationship of complementary energies.', strengths: ['Complementary approach to conflict resolution', 'White softens Red\'s intensity', 'Mutual respect for different perspectives', 'Balanced approach to relationship challenges'], challenges: ['Potential friction between directness and diplomacy', 'Different communication styles', 'Balancing individual needs with relationship peace', 'Risk of White feeling overwhelmed'] },
            'Red+Grey': { rating: '3/5', dynamics: 'A pragmatic relationship characterized by logical approach and balanced emotional expression.', strengths: ['Rational problem-solving approach', 'Mutual respect for independence', 'Balanced emotional management', 'Complementary decision-making process'], challenges: ['Potential emotional disconnect', 'Different levels of social engagement', 'Risk of feeling emotionally distant', 'Balancing passion with neutrality'] },
            'Red+Pink': { rating: '5/5', dynamics: 'A relationship that blends passionate drive with nurturing care, creating a dynamic of support and motivation.', strengths: ['Complementary emotional approaches', 'Pink softens Red\'s intensity', 'Mutual care and support', 'Balanced approach to relationship needs'], challenges: ['Potential friction between directness and sensitivity', 'Different emotional processing styles', 'Risk of Pink feeling overwhelmed', 'Balancing assertiveness with gentleness'] },
            'Red+Chocolate': { rating: '4/5', dynamics: 'A stable and goal-oriented relationship combining drive with traditional values and commitment.', strengths: ['Shared focus on achievement', 'Complementary approach to responsibility', 'Mutual respect for hard work', 'Strong foundation for family and future'], challenges: ['Potential conflict between spontaneity and tradition', 'Different approaches to risk-taking', 'Balancing ambition with stability', 'Risk of becoming too serious'] },
            
            'Blue+Blue': { rating: '5/5', dynamics: 'A deeply analytical and intellectually harmonious relationship built on mutual understanding and logical connection.', strengths: ['Shared love for deep, meaningful conversations', 'Logical and systematic approach to relationship', 'Mutual respect for privacy and personal space', 'Consistent and reliable partnership'], challenges: ['Potential lack of emotional expressiveness', 'Risk of overthinking', 'Difficulty with spontaneity', 'May struggle with emotional intimacy'] },
            'Blue+Green': { rating: '4/5', dynamics: 'A balanced partnership combining analytical thinking with practical stability and emotional intelligence.', strengths: ['Complementary approach to problem-solving', 'Mutual respect for detailed and systematic processes', 'Balanced emotional and logical decision-making', 'Strong foundation of trust and reliability'], challenges: ['Potential risk of becoming too routine-oriented', 'Different levels of emotional expression', 'Balancing analytical thinking with practical action', 'Risk of overthinking minor issues'] },
            'Blue+Yellow': { rating: '5/5', dynamics: 'A dynamic relationship where analytical depth meets spontaneous enthusiasm, creating an intriguing balance.', strengths: ['Yellow brings excitement to Blue\'s structured world', 'Blue provides depth to Yellow\'s spontaneity', 'Complementary approach to life\'s challenges', 'Mutual learning and personal growth'], challenges: ['Significant differences in processing information', 'Potential friction between caution and spontaneity', 'Balancing serious analysis with playful approach', 'Risk of misunderstanding each other\'s communication styles'] },
            'Blue+Purple': { rating: '5/5', dynamics: 'A deeply intellectual and creative partnership that combines analytical thinking with innovative vision.', strengths: ['Shared appreciation for depth and complexity', 'Strong intellectual connection', 'Complementary problem-solving approaches', 'Mutual respect for thoughtful processing'], challenges: ['Potential for analysis paralysis', 'Risk of getting lost in theoretical discussions', 'May need to focus more on practical action', 'Balancing logic with emotion'] },
            'Blue+Black': { rating: '4/5', dynamics: 'A relationship characterized by deep thinking, independence, and authentic communication.', strengths: ['Shared value for truth and authenticity', 'Respect for personal space and independence', 'Intellectually stimulating conversations', 'Straightforward communication'], challenges: ['Potential for emotional detachment', 'Risk of becoming too focused on individual pursuits', 'May struggle with expressing vulnerability', 'Need to actively work on emotional connection'] },
            'Blue+White': { rating: '3/5', dynamics: 'A balanced relationship where analytical thinking meets peaceful harmony and diplomacy.', strengths: ['White provides emotional balance to Blue\'s logic', 'Complementary communication styles', 'Mutual respect for different perspectives', 'Balanced approach to conflict resolution'], challenges: ['Blue may perceive White as indecisive', 'White may find Blue too critical or detached', 'Different priorities in relationship dynamics', 'Navigating between analysis and acceptance'] },
            'Blue+Grey': { rating: '4/5', dynamics: 'A pragmatic and logical partnership built on mutual understanding and respect for objectivity.', strengths: ['Shared logical approach to life', 'Mutual respect for facts and objectivity', 'Complementary analytical skills', 'Calm and reasoned conflict resolution'], challenges: ['Potential lack of emotional depth', 'Risk of becoming too detached from feelings', 'May need to work on expressing affection', 'Finding balance between analysis and emotion'] },
            'Blue+Pink': { rating: '5/5', dynamics: 'A complementary relationship where logical analysis meets emotional nurturing and compassion.', strengths: ['Pink brings emotional warmth to Blue\'s logical world', 'Blue provides stability and rational thinking', 'Complementary approach to relationship challenges', 'Balanced perspective on life\'s issues'], challenges: ['Different communication priorities', 'Blue may seem too detached for Pink', 'Pink may seem too emotional for Blue', 'Finding common ground between logic and feeling'] },
            'Blue+Chocolate': { rating: '4/5', dynamics: 'A stable and thoughtful relationship combining analytical depth with practical tradition and reliability.', strengths: ['Shared appreciation for structure and order', 'Complementary approach to planning and goals', 'Mutual respect for thoroughness', 'Strong foundation of reliability and consistency'], challenges: ['Potential resistance to change and new ideas', 'Risk of becoming too routine-oriented', 'May need to work on spontaneity', 'Finding balance between tradition and innovation'] },
            
            'Green+Green': { rating: '5/5', dynamics: 'A deeply nurturing and harmonious relationship built on mutual care, stability, and emotional understanding.', strengths: ['Strong emotional connection and understanding', 'Mutual support and nurturing', 'Shared values on relationships and family', 'Calm and peaceful conflict resolution'], challenges: ['May avoid necessary confrontation', 'Risk of becoming too comfortable or stagnant', 'Potential for mutual enabling', 'May need more excitement or variety'] },
            'Green+Yellow': { rating: '5/5', dynamics: 'A warm and vibrant relationship where stability meets spontaneity, creating a balanced and joyful partnership.', strengths: ['Yellow brings fun and energy to Green\'s stability', 'Green provides grounding for Yellow\'s spontaneity', 'Complementary approaches to life', 'Balance of excitement and security'], challenges: ['Different approaches to planning and structure', 'Green may find Yellow too scattered', 'Yellow may find Green too cautious', 'Balancing responsibility with spontaneity'] },
            'Green+Purple': { rating: '5/5', dynamics: 'A creative and nurturing relationship that combines emotional intelligence with innovative vision.', strengths: ['Green provides emotional stability for Purple\'s creativity', 'Purple inspires Green with new perspectives', 'Mutual appreciation for depth and meaning', 'Complementary approach to growth and development'], challenges: ['Purple may feel restricted by Green\'s practicality', 'Green may find Purple too abstract or unrealistic', 'Different priorities in daily life', 'Balancing imagination with practicality'] },
            'Green+Black': { rating: '3/5', dynamics: 'A relationship that balances nurturing support with independence and authenticity.', strengths: ['Green provides emotional support for Black\'s independence', 'Black encourages Green\'s personal growth', 'Complementary perspectives on life', 'Balance between connection and autonomy'], challenges: ['Black may perceive Green as too dependent', 'Green may find Black too detached', 'Different needs for closeness and space', 'Navigating between emotional connection and independence'] },
            'Green+White': { rating: '5/5', dynamics: 'A deeply harmonious and peaceful relationship built on mutual care, empathy, and conflict avoidance.', strengths: ['Shared value for harmony and peace', 'Strong emotional understanding', 'Gentle and supportive communication', 'Mutual respect and consideration'], challenges: ['May avoid necessary conflict', 'Risk of unaddressed issues', 'Potential for passive communication', 'May need more assertiveness'] },
            'Green+Grey': { rating: '3/5', dynamics: 'A balanced relationship where emotional nurturing meets logical objectivity and practicality.', strengths: ['Green brings emotional warmth to Grey\'s objectivity', 'Grey provides rational perspective to Green\'s feelings', 'Complementary approach to challenges', 'Balance between heart and mind'], challenges: ['Different emotional processing styles', 'Green may find Grey too detached', 'Grey may find Green too emotionally focused', 'Finding middle ground in communication'] },
            'Green+Pink': { rating: '5/5', dynamics: 'A deeply nurturing and compassionate relationship built on mutual care, emotional understanding, and support.', strengths: ['Strong emotional connection and understanding', 'Shared values on care and nurturing', 'Supportive and empathetic communication', 'Mutual appreciation for relationships'], challenges: ['May become too focused on others\' needs', 'Risk of neglecting personal boundaries', 'Potential for enabling unhealthy patterns', 'May need more independence and assertiveness'] },
            'Green+Chocolate': { rating: '4/5', dynamics: 'A stable and nurturing relationship built on shared values, tradition, and emotional security.', strengths: ['Shared focus on stability and security', 'Mutual appreciation for tradition and family', 'Complementary nurturing styles', 'Strong foundation for long-term commitment'], challenges: ['May become too routine-oriented', 'Risk of resistance to change', 'Potential for overprotectiveness', 'Finding balance between tradition and growth'] },
            
            'Yellow+Yellow': { rating: '4/5', dynamics: 'An energetic, playful relationship filled with spontaneity, fun, and constant excitement.', strengths: ['Abundant joy and enthusiasm', 'Shared love for adventure and novelty', 'Spontaneous and flexible approach to life', 'Mutual support for creativity and expression'], challenges: ['May lack direction or focus', 'Risk of avoiding serious conversations', 'Potential for underdeveloped planning', 'May struggle with long-term commitments'] },
            'Yellow+Purple': { rating: '5/5', dynamics: 'A highly creative and dynamic relationship combining playful energy with innovative vision.', strengths: ['Strong creative synergy', 'Mutual inspiration and excitement', 'Shared appreciation for novelty and exploration', 'Complementary expressive styles'], challenges: ['May lack practicality or groundedness', 'Risk of unfinished projects or ideas', 'Different focus in creative pursuits', 'Balancing fun with depth'] },
            'Yellow+Black': { rating: '5/5', dynamics: 'A relationship of contrasts where playful spontaneity meets authentic independence.', strengths: ['Yellow brings lightness to Black\'s intensity', 'Black adds depth to Yellow\'s approach', 'Complementary perspectives on life', 'Balance between fun and authenticity'], challenges: ['Significant differences in energy levels', 'Yellow may find Black too serious', 'Black may find Yellow too unfocused', 'Finding common ground in communication styles'] },
            'Yellow+White': { rating: '4/5', dynamics: 'A balanced relationship where playful energy meets peaceful harmony, creating a positive and adaptable partnership.', strengths: ['Yellow brings excitement to White\'s calm', 'White provides stability for Yellow\'s energy', 'Shared positive outlook on life', 'Complementary approaches to challenges'], challenges: ['Different comfort levels with change', 'Yellow may overwhelm White at times', 'White may restrict Yellow\'s spontaneity', 'Balancing fun with peace'] },
            'Yellow+Grey': { rating: '2/5', dynamics: 'A relationship of opposites where spontaneous enthusiasm meets logical objectivity.', strengths: ['Yellow brings energy to Grey\'s practicality', 'Grey provides structure for Yellow\'s ideas', 'Complementary problem-solving approaches', 'Balance between creativity and logic'], challenges: ['Fundamentally different approaches to life', 'Yellow may find Grey too rigid or boring', 'Grey may find Yellow too chaotic or unfocused', 'Significant communication style differences'] },
            'Yellow+Pink': { rating: '4/5', dynamics: 'A warm and vibrant relationship combining playful energy with compassionate nurturing.', strengths: ['Yellow brings fun to Pink\'s nurturing nature', 'Pink adds emotional depth to Yellow\'s approach', 'Shared positive and optimistic outlook', 'Complementary caretaking styles'], challenges: ['Different priorities in relationships', 'Yellow may seem insensitive to Pink at times', 'Pink may seem too serious for Yellow', 'Balancing fun with emotional needs'] },
            'Yellow+Chocolate': { rating: '3/5', dynamics: 'A relationship that balances spontaneous energy with traditional stability.', strengths: ['Yellow brings freshness to Chocolate\'s tradition', 'Chocolate provides structure for Yellow\'s spontaneity', 'Complementary approaches to life', 'Balance between fun and responsibility'], challenges: ['Different comfort levels with change', 'Yellow may find Chocolate too rigid', 'Chocolate may find Yellow too unpredictable', 'Negotiating between tradition and novelty'] },
            
            'Purple+Purple': { rating: '4/5', dynamics: 'A deeply creative and visionary relationship built on shared imagination, depth, and innovative thinking.', strengths: ['Strong intellectual and creative connection', 'Mutual understanding of complex thoughts', 'Shared appreciation for depth and meaning', 'Support for individual creative expression'], challenges: ['May lack practicality or groundedness', 'Risk of getting lost in abstract discussions', 'Potential for overthinking', 'May need to focus more on daily realities'] },
            'Purple+Black': { rating: '4/5', dynamics: 'A deep and authentic relationship combining creative vision with independent thinking.', strengths: ['Shared appreciation for depth and authenticity', 'Mutual respect for uniqueness', 'Intellectually stimulating connection', 'Support for individual growth and expression'], challenges: ['Potential for emotional distance', 'May become too focused on individual pursuits', 'Different approaches to social connection', 'Balancing togetherness with independence'] },
            'Purple+White': { rating: '5/5', dynamics: 'A relationship that balances creative depth with peaceful harmony.', strengths: ['White brings calm to Purple\'s intensity', 'Purple adds depth to White\'s perspective', 'Complementary approaches to challenges', 'Balance between vision and peace'], challenges: ['Purple may find White too passive', 'White may find Purple too complex', 'Different communication priorities', 'Navigating between depth and simplicity'] },
            'Purple+Grey': { rating: '3/5', dynamics: 'A relationship where creative vision meets logical objectivity.', strengths: ['Grey brings practicality to Purple\'s ideas', 'Purple adds imagination to Grey\'s logic', 'Complementary problem-solving approaches', 'Balance between innovation and feasibility'], challenges: ['Fundamentally different approaches to decisions', 'Purple may find Grey too detached', 'Grey may find Purple too abstract', 'Balancing creativity with practicality'] },
            'Purple+Pink': { rating: '4/5', dynamics: 'A compassionate and creative relationship combining emotional depth with innovative vision.', strengths: ['Shared appreciation for depth and meaning', 'Pink adds emotional warmth to Purple\'s ideas', 'Purple brings creative perspective to Pink\'s nurturing', 'Mutual understanding of complex emotions'], challenges: ['Different priorities in relationship focus', 'Purple may seem too detached at times', 'Pink may seem too focused on others\' needs', 'Balancing self-expression with connection'] },
            'Purple+Chocolate': { rating: '3/5', dynamics: 'A relationship balancing innovative thinking with traditional stability.', strengths: ['Purple brings new perspectives to Chocolate\'s tradition', 'Chocolate provides grounding for Purple\'s ideas', 'Complementary approaches to life challenges', 'Balance between innovation and reliability'], challenges: ['Different comfort levels with change', 'Purple may find Chocolate too conventional', 'Chocolate may find Purple too unrealistic', 'Negotiating between tradition and innovation'] },
            
            'Black+Black': { rating: '3/5', dynamics: 'An authentic and independent relationship built on mutual respect for autonomy and straight communication.', strengths: ['Deep respect for personal authenticity', 'Honest and direct communication', 'Shared value for independence', 'Mutual understanding of personal boundaries'], challenges: ['Potential for emotional distance', 'Risk of becoming too independent', 'May struggle with vulnerability', 'Finding balance between autonomy and connection'] },
            'Black+White': { rating: '2/5', dynamics: 'A relationship of contrasts where direct authenticity meets peaceful harmony.', strengths: ['White brings calm to Black\'s intensity', 'Black adds directness to White\'s diplomacy', 'Complementary approaches to challenges', 'Balance between honesty and harmony'], challenges: ['Fundamentally different approaches to conflict', 'Black may find White too passive', 'White may find Black too harsh', 'Significant communication style differences'] },
            'Black+Grey': { rating: '4/5', dynamics: 'A pragmatic and authentic relationship built on mutual respect for objectivity and independence.', strengths: ['Shared value for logical thinking', 'Mutual respect for personal space', 'Direct and straightforward communication', 'Complementary approach to challenges'], challenges: ['Potential for emotional detachment', 'Risk of becoming too individualistic', 'May need to work on emotional connection', 'Finding balance between logic and feeling'] },
            'Black+Pink': { rating: '5/5', dynamics: 'A relationship that balances authentic independence with compassionate nurturing.', strengths: ['Pink brings emotional warmth to Black\'s independence', 'Black encourages Pink\'s personal boundaries', 'Complementary perspectives on relationships', 'Balance between autonomy and connection'], challenges: ['Different approaches to emotional expression', 'Black may find Pink too emotionally focused', 'Pink may find Black too detached', 'Navigating between independence and togetherness'] },
            'Black+Chocolate': { rating: '3/5', dynamics: 'A relationship balancing authentic individuality with traditional stability.', strengths: ['Black brings authenticity to Chocolate\'s tradition', 'Chocolate provides structure for Black\'s independence', 'Mutual respect for personal values', 'Complementary approaches to challenges'], challenges: ['Different comfort levels with social norms', 'Black may find Chocolate too conventional', 'Chocolate may find Black too unconventional', 'Balancing individuality with shared traditions'] },
            
            'White+White': { rating: '4/5', dynamics: 'A peaceful and harmonious relationship built on mutual understanding, diplomacy, and conflict avoidance.', strengths: ['Strong sense of peace and harmony', 'Gentle and considerate communication', 'Mutual understanding and patience', 'Shared value for tranquility'], challenges: ['May avoid necessary conflict', 'Risk of unaddressed issues', 'Potential for passive communication', 'Finding balance between peace and growth'] },
            'White+Grey': { rating: '3/5', dynamics: 'A calm and balanced relationship combining peaceful harmony with logical objectivity.', strengths: ['Shared appreciation for calm approach', 'Complementary communication styles', 'Mutual respect for different perspectives', 'Balance between acceptance and analysis'], challenges: ['White may find Grey too detached', 'Grey may find White too passive', 'Different approaches to decision-making', 'Finding middle ground between feeling and logic'] },
            'White+Pink': { rating: '5/5', dynamics: 'A gentle and nurturing relationship built on mutual care, empathy, and emotional understanding.', strengths: ['Shared focus on harmonious relationships', 'Strong emotional understanding', 'Gentle and supportive communication', 'Mutual appreciation for peace and care'], challenges: ['May avoid necessary confrontation', 'Risk of prioritizing others\' needs too much', 'Potential for unaddressed issues', 'Finding balance between peace and assertiveness'] },
            'White+Chocolate': { rating: '5/5', dynamics: 'A stable and peaceful relationship built on mutual respect for tradition and harmony.', strengths: ['Shared appreciation for stability', 'Complementary approach to family life', 'Mutual respect for values and traditions', 'Strong foundation for long-term harmony'], challenges: ['May become too comfortable or stagnant', 'Risk of avoiding necessary change', 'Potential for passive approach to challenges', 'Finding balance between peace and growth'] },
            
            'Grey+Grey': { rating: '4/5', dynamics: 'A logical and pragmatic relationship built on mutual objectivity, clarity, and rational decision-making.', strengths: ['Strong logical connection', 'Clear and direct communication', 'Shared value for objectivity', 'Efficient problem-solving approach'], challenges: ['Potential lack of emotional depth', 'Risk of becoming too detached', 'May struggle with emotional expression', 'Finding balance between logic and feeling'] },
            'Grey+Pink': { rating: '3/5', dynamics: 'A relationship that balances logical objectivity with emotional nurturing.', strengths: ['Pink brings emotional warmth to Grey\'s logic', 'Grey adds rational perspective to Pink\'s feelings', 'Complementary decision-making styles', 'Balance between heart and mind'], challenges: ['Different emotional processing styles', 'Grey may find Pink too emotionally driven', 'Pink may find Grey too detached', 'Finding common ground in communication'] },
            'Grey+Chocolate': { rating: '4/5', dynamics: 'A practical and stable relationship built on shared logic, reliability, and traditional values.', strengths: ['Mutual appreciation for order and structure', 'Shared practical approach to life', 'Complementary decision-making process', 'Strong foundation of reliability'], challenges: ['May become too routine-oriented', 'Risk of emotional detachment', 'Potential resistance to change', 'Finding balance between tradition and flexibility'] },
            
            'Pink+Pink': { rating: '4/5', dynamics: 'A deeply nurturing and empathetic relationship built on mutual care, emotional understanding, and compassion.', strengths: ['Strong emotional connection and understanding', 'Mutual support and validation', 'Shared focus on relationship needs', 'Gentle and supportive communication'], challenges: ['May prioritize others\' needs over their own', 'Risk of emotional exhaustion', 'Potential for boundary issues', 'May need more assertiveness'] },
            'Pink+Chocolate': { rating: '5/5', dynamics: 'A nurturing and stable relationship combining emotional warmth with traditional values and security.', strengths: ['Shared focus on care and support', 'Complementary nurturing styles', 'Mutual appreciation for family and relationships', 'Strong foundation for long-term commitment'], challenges: ['May become too focused on others\' needs', 'Risk of neglecting personal growth', 'Potential for overprotectiveness', 'Finding balance between tradition and flexibility'] },
            
            'Chocolate+Chocolate': { rating: '5/5', dynamics: 'A deeply stable and traditional relationship built on shared values, reliability, and long-term commitment.', strengths: ['Strong foundation of shared values', 'Mutual respect for tradition and structure', 'Reliable and consistent partnership', 'Clear and established relationship expectations'], challenges: ['May resist necessary change', 'Risk of becoming too routine-oriented', 'Potential for rigid thinking', 'Finding balance between tradition and growth'] }
        };
        
        // Try both color orders
        const key1 = `${c1}+${c2}`;
        const key2 = `${c2}+${c1}`;
        
        const combo = combinations[key1] || combinations[key2];
        
        if (combo) {
            const formatStrengths = combo.strengths.map(s => `• ${s}`).join('\n');
            const formatChallenges = combo.challenges.map(c => `• ${c}`).join('\n');
            
            return `🎨 **${c1} + ${c2} Compatibility**\n\n**Compatibility Rating:** ${combo.rating}\n\n**Relationship Dynamics:**\n${combo.dynamics}\n\n**Strengths:**\n${formatStrengths}\n\n**Challenges:**\n${formatChallenges}\n\n💡 Understanding these dynamics can help build stronger relationships!`;
        } else {
            return `I couldn't find the compatibility information for ${c1} and ${c2}. Please make sure you're using one of these colors: Red, Blue, Green, Yellow, Purple, Black, White, Grey, Pink, or Chocolate.`;
        }
    }

    getBestMatchRating(color1, color2) {
        // Normalize the color names and create the combination key
        const normalizeColor = (color) => {
            return color.charAt(0).toUpperCase() + color.slice(1).toLowerCase();
        };
        
        const c1 = normalizeColor(color1);
        const c2 = normalizeColor(color2);
        
        // Use the same combinations data
        const combinations = {
            'Red+Red': { rating: '3/5', description: 'High energy but competitive - good match for ambitious goals' },
            'Red+Blue': { rating: '4/5', description: 'Excellent balance of action and analysis - very strong match' },
            'Red+Green': { rating: '3/5', description: 'Leadership meets nurturing - moderate compatibility' },
            'Red+Yellow': { rating: '4/5', description: 'Dynamic energy combination - great enthusiasm match' },
            'Red+Purple': { rating: '4/5', description: 'Action meets creativity - inspiring partnership' },
            'Red+Black': { rating: '5/5', description: 'Authentic and intense - perfect independence match' },
            'Red+White': { rating: '5/5', description: 'Balanced energy - excellent complementary match' },
            'Red+Grey': { rating: '3/5', description: 'Passion meets logic - moderate balance' },
            'Red+Pink': { rating: '5/5', description: 'Drive with care - beautiful supportive match' },
            'Red+Chocolate': { rating: '4/5', description: 'Ambition with stability - solid traditional match' },
            
            'Blue+Blue': { rating: '5/5', description: 'Perfect intellectual harmony - ideal analytical match' },
            'Blue+Green': { rating: '4/5', description: 'Logic meets emotion - well-balanced partnership' },
            'Blue+Yellow': { rating: '5/5', description: 'Structure meets spontaneity - exciting growth match' },
            'Blue+Purple': { rating: '5/5', description: 'Intelligence meets creativity - brilliant combination' },
            'Blue+Black': { rating: '4/5', description: 'Deep thinking partnership - authentic connection' },
            'Blue+White': { rating: '3/5', description: 'Analysis meets peace - gentle compatibility' },
            'Blue+Grey': { rating: '4/5', description: 'Double logic power - efficient partnership' },
            'Blue+Pink': { rating: '5/5', description: 'Logic meets love - perfectly balanced match' },
            'Blue+Chocolate': { rating: '4/5', description: 'Thoughtful tradition - stable reliable match' },
            
            'Green+Green': { rating: '5/5', description: 'Ultimate harmony - perfect peaceful match' },
            'Green+Yellow': { rating: '5/5', description: 'Stability meets joy - wonderful balanced match' },
            'Green+Purple': { rating: '5/5', description: 'Nurturing creativity - inspiring supportive match' },
            'Green+Black': { rating: '3/5', description: 'Care meets independence - challenging but growth-oriented' },
            'Green+White': { rating: '5/5', description: 'Double peace - supremely harmonious match' },
            'Green+Grey': { rating: '3/5', description: 'Heart meets mind - moderate emotional balance' },
            'Green+Pink': { rating: '5/5', description: 'Pure nurturing energy - ideal caring match' },
            'Green+Chocolate': { rating: '4/5', description: 'Stable foundation - excellent family-oriented match' },
            
            'Yellow+Yellow': { rating: '4/5', description: 'Double fun energy - exciting adventurous match' },
            'Yellow+Purple': { rating: '5/5', description: 'Joy meets art - incredibly creative match' },
            'Yellow+Black': { rating: '5/5', description: 'Light meets depth - fascinating contrasting match' },
            'Yellow+White': { rating: '4/5', description: 'Fun meets peace - positive uplifting match' },
            'Yellow+Grey': { rating: '2/5', description: 'Energy meets logic - challenging opposite match' },
            'Yellow+Pink': { rating: '4/5', description: 'Joy meets love - sweet caring match' },
            'Yellow+Chocolate': { rating: '3/5', description: 'Spontaneity meets tradition - moderate balancing match' },
            
            'Purple+Purple': { rating: '4/5', description: 'Creative soul connection - deeply artistic match' },
            'Purple+Black': { rating: '4/5', description: 'Creative independence - unique authentic match' },
            'Purple+White': { rating: '5/5', description: 'Art meets peace - beautifully harmonious match' },
            'Purple+Grey': { rating: '3/5', description: 'Creativity meets logic - moderate balancing match' },
            'Purple+Pink': { rating: '4/5', description: 'Art meets love - emotionally rich match' },
            'Purple+Chocolate': { rating: '3/5', description: 'Innovation meets tradition - challenging growth match' },
            
            'Black+Black': { rating: '3/5', description: 'Double independence - strong but distant match' },
            'Black+White': { rating: '2/5', description: 'Intensity meets peace - very challenging opposite match' },
            'Black+Grey': { rating: '4/5', description: 'Authentic logic - straightforward honest match' },
            'Black+Pink': { rating: '5/5', description: 'Independence meets love - beautifully balanced match' },
            'Black+Chocolate': { rating: '3/5', description: 'Authentic tradition - moderate value-based match' },
            
            'White+White': { rating: '4/5', description: 'Pure harmony - peaceful serene match' },
            'White+Grey': { rating: '3/5', description: 'Peace meets logic - calm rational match' },
            'White+Pink': { rating: '5/5', description: 'Peace meets love - perfectly gentle match' },
            'White+Chocolate': { rating: '5/5', description: 'Harmony meets tradition - ideal stable match' },
            
            'Grey+Grey': { rating: '4/5', description: 'Double efficiency - perfectly logical match' },
            'Grey+Pink': { rating: '3/5', description: 'Logic meets emotion - moderate balancing match' },
            'Grey+Chocolate': { rating: '4/5', description: 'Practical partnership - reliable steady match' },
            
            'Pink+Pink': { rating: '4/5', description: 'Pure love energy - deeply caring match' },
            'Pink+Chocolate': { rating: '5/5', description: 'Love meets loyalty - perfect family match' },
            
            'Chocolate+Chocolate': { rating: '5/5', description: 'Ultimate stability - perfectly traditional match' }
        };
        
        // Try both color orders
        const key1 = `${c1}+${c2}`;
        const key2 = `${c2}+${c1}`;
        
        const combo = combinations[key1] || combinations[key2];
        
        if (combo) {
            const stars = '★'.repeat(parseInt(combo.rating[0])) + '☆'.repeat(5 - parseInt(combo.rating[0]));
            return `⭐ **Best Match Rating: ${c1} + ${c2}**\n\n**Rating:** ${combo.rating} ${stars}\n\n**Match Quality:** ${combo.description}\n\n💡 This rating represents overall compatibility potential in relationships, friendships, and partnerships!`;
        } else {
            return `I couldn't find the rating information for ${c1} and ${c2}. Please make sure you're using one of these colors: Red, Blue, Green, Yellow, Purple, Black, White, Grey, Pink, or Chocolate.`;
        }
    }

    getFriendshipStatus(color1, color2) {
        // Normalize the color names and create the combination key
        const normalizeColor = (color) => {
            return color.charAt(0).toUpperCase() + color.slice(1).toLowerCase();
        };
        
        const c1 = normalizeColor(color1);
        const c2 = normalizeColor(color2);
        
        // Friendship-specific interpretations
        const friendshipStatus = {
            'Red+Red': { status: 'Competitive Friends', description: 'You both love challenges and push each other to achieve more. Great workout buddies and adventure partners!' },
            'Red+Blue': { status: 'Balanced Friends', description: 'Perfect balance - Red brings excitement, Blue brings wisdom. You complement each other beautifully!' },
            'Red+Green': { status: 'Supportive Friends', description: 'Red leads the adventures, Green provides emotional support. A protective and caring friendship!' },
            'Red+Yellow': { status: 'Dynamic Friends', description: 'Non-stop energy and fun! You two are the life of every party and never have a dull moment together!' },
            'Red+Purple': { status: 'Creative Friends', description: 'Red helps bring Purple\'s ideas to life. You inspire each other to think big and act boldly!' },
            'Red+Black': { status: 'Authentic Friends', description: 'No pretenses here - completely honest and real with each other. A rare and valuable friendship!' },
            'Red+White': { status: 'Harmonious Friends', description: 'Red brings excitement, White brings peace. You balance each other perfectly!' },
            'Red+Grey': { status: 'Practical Friends', description: 'Red provides energy, Grey provides logic. You help each other stay grounded while pursuing goals!' },
            'Red+Pink': { status: 'Caring Friends', description: 'Red protects, Pink nurtures. A beautiful friendship built on mutual care and support!' },
            'Red+Chocolate': { status: 'Loyal Friends', description: 'Solid, dependable friendship. You both value commitment and have each other\'s backs!' },
            
            'Blue+Blue': { status: 'Intellectual Friends', description: 'Deep conversations and shared interests. You understand each other\'s need for meaningful discussions!' },
            'Blue+Green': { status: 'Reliable Friends', description: 'Steady, trustworthy friendship. You both value loyalty and create a stable, supportive bond!' },
            'Blue+Yellow': { status: 'Growth Friends', description: 'Blue provides depth, Yellow brings lightness. You help each other learn and grow in amazing ways!' },
            'Blue+Purple': { status: 'Brilliant Friends', description: 'Intellectual and creative powerhouse! Your conversations are fascinating and inspiring!' },
            'Blue+Black': { status: 'Deep Friends', description: 'You appreciate each other\'s authenticity and independence. A mature, respectful friendship!' },
            'Blue+White': { status: 'Peaceful Friends', description: 'Calm, understanding friendship. You both value harmony and thoughtful communication!' },
            'Blue+Grey': { status: 'Logical Friends', description: 'Rational and efficient friendship. You solve problems together and appreciate each other\'s clarity!' },
            'Blue+Pink': { status: 'Tender Friends', description: 'Blue provides stability, Pink provides warmth. A beautifully balanced emotional friendship!' },
            'Blue+Chocolate': { status: 'Traditional Friends', description: 'Strong, reliable friendship built on shared values and mutual respect!' },
            
            'Green+Green': { status: 'Harmonious Friends', description: 'Perfect understanding and mutual support. You create a peaceful, nurturing friendship!' },
            'Green+Yellow': { status: 'Joyful Friends', description: 'Green provides stability, Yellow brings fun. A wonderful balance of security and excitement!' },
            'Green+Purple': { status: 'Inspiring Friends', description: 'Green supports Purple\'s creativity. You encourage each other\'s growth and artistic expression!' },
            'Green+Black': { status: 'Understanding Friends', description: 'Green accepts Black\'s independence. You respect each other\'s boundaries and offer support!' },
            'Green+White': { status: 'Serene Friends', description: 'Ultimate peace and harmony. You both avoid conflict and create a calm, loving friendship!' },
            'Green+Grey': { status: 'Balanced Friends', description: 'Green brings emotion, Grey brings logic. You help each other see different perspectives!' },
            'Green+Pink': { status: 'Nurturing Friends', description: 'Double caring energy! You both love taking care of others and create a supportive friendship!' },
            'Green+Chocolate': { status: 'Family Friends', description: 'Like family! You both value stability and create a lasting, traditional friendship!' },
            
            'Yellow+Yellow': { status: 'Fun Friends', description: 'Non-stop entertainment and laughter! You bring out each other\'s playful side constantly!' },
            'Yellow+Purple': { status: 'Creative Friends', description: 'Artistic adventures and creative projects! You inspire each other\'s imagination!' },
            'Yellow+Black': { status: 'Contrasting Friends', description: 'Yellow brightens Black\'s day, Black adds depth to Yellow. Fascinating friendship of opposites!' },
            'Yellow+White': { status: 'Positive Friends', description: 'Optimistic and peaceful! You both focus on the good in life and spread positivity!' },
            'Yellow+Grey': { status: 'Challenging Friends', description: 'Very different approaches to life, but you can learn from each other\'s perspectives!' },
            'Yellow+Pink': { status: 'Sweet Friends', description: 'Pure joy and love! You both have big hearts and create a warm, affectionate friendship!' },
            'Yellow+Chocolate': { status: 'Balancing Friends', description: 'Yellow brings spontaneity, Chocolate brings stability. You balance each other out!' },
            
            'Purple+Purple': { status: 'Artistic Friends', description: 'Creative soul connection! You understand each other\'s artistic vision and mysterious nature!' },
            'Purple+Black': { status: 'Unique Friends', description: 'Two independent spirits who appreciate each other\'s authenticity and depth!' },
            'Purple+White': { status: 'Peaceful Friends', description: 'Purple creates, White provides calm. A beautiful friendship of art and harmony!' },
            'Purple+Grey': { status: 'Thoughtful Friends', description: 'Purple dreams, Grey analyzes. You help each other balance creativity with practicality!' },
            'Purple+Pink': { status: 'Emotional Friends', description: 'Deep feelings and artistic expression! You understand each other\'s emotional complexity!' },
            'Purple+Chocolate': { status: 'Traditional Friends', description: 'Purple brings new ideas, Chocolate provides grounding. You challenge and support each other!' },
            
            'Black+Black': { status: 'Independent Friends', description: 'Mutual respect for space and authenticity. You understand each other\'s need for independence!' },
            'Black+White': { status: 'Opposite Friends', description: 'Very different but can learn from each other. Requires effort but can be rewarding!' },
            'Black+Grey': { status: 'Honest Friends', description: 'Straightforward and real. No games, just authentic communication and mutual respect!' },
            'Black+Pink': { status: 'Balancing Friends', description: 'Black provides strength, Pink provides warmth. You soften and strengthen each other!' },
            'Black+Chocolate': { status: 'Respectful Friends', description: 'You both value authenticity and loyalty. A friendship built on genuine respect!' },
            
            'White+White': { status: 'Peaceful Friends', description: 'Pure harmony and understanding. You both love peace and create a serene friendship!' },
            'White+Grey': { status: 'Calm Friends', description: 'Quiet understanding and rational communication. A peaceful, thoughtful friendship!' },
            'White+Pink': { status: 'Gentle Friends', description: 'Soft, caring, and understanding. You both prioritize kindness and emotional connection!' },
            'White+Chocolate': { status: 'Stable Friends', description: 'Traditional values and peaceful harmony. A lasting, reliable friendship!' },
            
            'Grey+Grey': { status: 'Logical Friends', description: 'Rational and efficient! You both appreciate clear communication and practical solutions!' },
            'Grey+Pink': { status: 'Balancing Friends', description: 'Grey provides logic, Pink provides emotion. You help each other see different sides!' },
            'Grey+Chocolate': { status: 'Practical Friends', description: 'Steady, reliable, and practical. You both value consistency and dependability!' },
            
            'Pink+Pink': { status: 'Loving Friends', description: 'Pure love and emotional support! You both have big hearts and care deeply for each other!' },
            'Pink+Chocolate': { status: 'Family Friends', description: 'Like chosen family! You both value love, loyalty, and long-term commitment!' },
            
            'Chocolate+Chocolate': { status: 'Loyal Friends', description: 'Unbreakable loyalty and traditional values. A friendship that lasts a lifetime!' }
        };
        
        // Try both color orders
        const key1 = `${c1}+${c2}`;
        const key2 = `${c2}+${c1}`;
        
        const friendship = friendshipStatus[key1] || friendshipStatus[key2];
        
        if (friendship) {
            return `🤝 **Friendship Status: ${c1} + ${c2}**\n\n**Status:** ${friendship.status}\n\n**Friendship Dynamic:**\n${friendship.description}\n\n💙 Remember: Great friendships come in all forms - embrace your unique connection!`;
        } else {
            return `I couldn't find the friendship status for ${c1} and ${c2}. Please make sure you're using one of these colors: Red, Blue, Green, Yellow, Purple, Black, White, Grey, Pink, or Chocolate.`;
        }
    }

    speakResponse(text) {
        // Check if user has muted the voice
        if (this.isMuted) return;
        
        if ('speechSynthesis' in window) {
            // Remove markdown formatting and HTML for speech
            const cleanText = text
                .replace(/[*#•]/g, '')
                .replace(/<[^>]*>/g, '')
                .replace(/\n/g, ' ')
                .replace(/\s+/g, ' ')
                .trim();
            
            const utterance = new SpeechSynthesisUtterance(cleanText);
            utterance.rate = 0.7;
            utterance.pitch = 0.3;
            utterance.volume = 0.8;
            speechSynthesis.speak(utterance);
        }
    }

    getCurrentTime() {
        const now = new Date();
        return now.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    }

    setWelcomeTime() {
        document.getElementById('welcomeTime').textContent = this.getCurrentTime();
    }

    scrollToBottom() {
        setTimeout(() => {
            this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        }, 100);
    }
}

// Initialize the AI Assistant when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new AIAssistant();
});