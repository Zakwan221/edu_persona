// Profile AI JavaScript with Dynamic Backgrounds and Enhanced Features
// Enhanced with Character References, Maturity Paths, Fashion Styles, and Pressure Responses

// Ensure utils is defined
if (typeof window.utils === 'undefined') {
    window.utils = {
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
            }
        }
    };
}

// Global variable to track current user for auto-refresh
let currentProfileUser = null;
let refreshInterval = null;

// Dynamic background themes for each personality
const personalityThemes = {
    BLACK: {
        background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 25%, #1a1a1a 50%, #0d0d0d 75%, #1a1a1a 100%)',
        pattern: 'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.02) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.02) 0%, transparent 50%)',
        overlay: 'linear-gradient(45deg, rgba(0,0,0,0.1) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.1) 75%), linear-gradient(45deg, rgba(0,0,0,0.1) 25%, transparent 25%, transparent 75%, rgba(0,0,0,0.1) 75%)',
        textColor: '#ffffff',
        accentColor: '#4a5568'
    },
    WHITE: {
        background: 'linear-gradient(135deg, #ffffff 0%, #f7fafc 25%, #edf2f7 50%, #e2e8f0 75%, #ffffff 100%)',
        pattern: 'radial-gradient(circle at 20% 20%, rgba(0,0,0,0.02) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(0,0,0,0.02) 0%, transparent 50%)',
        overlay: 'repeating-linear-gradient(45deg, transparent, transparent 50px, rgba(255,255,255,0.03) 50px, rgba(255,255,255,0.03) 100px)',
        textColor: '#2d3748',
        accentColor: '#a0aec0'
    },
    RED: {
        background: 'linear-gradient(135deg, #e53e3e 0%, #c53030 25%, #9c1c1c 50%, #742a2a 75%, #e53e3e 100%)',
        pattern: 'radial-gradient(circle at 30% 70%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(255,255,255,0.08) 0%, transparent 50%)',
        overlay: 'linear-gradient(45deg, rgba(255,255,255,0.05) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.05) 75%), linear-gradient(-45deg, rgba(255,255,255,0.05) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.05) 75%)',
        textColor: '#ffffff',
        accentColor: '#fed7d7'
    },
    BLUE: {
        background: 'linear-gradient(135deg, #3182ce 0%, #2c5282 25%, #2a4365 50%, #1a365d 75%, #3182ce 100%)',
        pattern: 'radial-gradient(circle at 40% 60%, rgba(255,255,255,0.08) 0%, transparent 50%), radial-gradient(circle at 60% 40%, rgba(255,255,255,0.06) 0%, transparent 50%)',
        overlay: 'repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.03) 40px, rgba(255,255,255,0.03) 80px)',
        textColor: '#ffffff',
        accentColor: '#bee3f8'
    },
    YELLOW: {
        background: 'linear-gradient(135deg, #ecc94b 0%, #d69e2e 25%, #b7791f 50%, #975a16 75%, #ecc94b 100%)',
        pattern: 'radial-gradient(circle at 25% 75%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 75% 25%, rgba(255,255,255,0.08) 0%, transparent 50%)',
        overlay: 'linear-gradient(30deg, rgba(255,255,255,0.05) 12%, transparent 12%, transparent 87%, rgba(255,255,255,0.05) 87%), linear-gradient(150deg, rgba(255,255,255,0.05) 12%, transparent 12%, transparent 87%, rgba(255,255,255,0.05) 87%)',
        textColor: '#2d3748',
        accentColor: '#faf089'
    },
    GREEN: {
        background: 'linear-gradient(135deg, #38a169 0%, #2f855a 25%, #276749 50%, #22543d 75%, #38a169 100%)',
        pattern: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.06) 0%, transparent 50%), radial-gradient(circle at 30% 80%, rgba(255,255,255,0.04) 0%, transparent 50%)',
        overlay: 'repeating-linear-gradient(60deg, transparent, transparent 30px, rgba(255,255,255,0.02) 30px, rgba(255,255,255,0.02) 60px)',
        textColor: '#ffffff',
        accentColor: '#c6f6d5'
    },
    PURPLE: {
        background: 'linear-gradient(135deg, #805ad5 0%, #6b46c1 25%, #553c9a 50%, #44337a 75%, #805ad5 100%)',
        pattern: 'radial-gradient(circle at 35% 65%, rgba(255,255,255,0.08) 0%, transparent 50%), radial-gradient(circle at 65% 35%, rgba(255,255,255,0.06) 0%, transparent 50%)',
        overlay: 'linear-gradient(60deg, rgba(255,255,255,0.04) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.04) 75%), linear-gradient(120deg, rgba(255,255,255,0.04) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.04) 75%)',
        textColor: '#ffffff',
        accentColor: '#e9d8fd'
    },
    CHOCOLATE: {
        background: 'linear-gradient(135deg, #8b4513 0%, #654321 25%, #4a2c17 50%, #3e2723 75%, #8b4513 100%)',
        pattern: 'radial-gradient(circle at 45% 55%, rgba(255,255,255,0.05) 0%, transparent 50%), radial-gradient(circle at 55% 45%, rgba(255,255,255,0.03) 0%, transparent 50%)',
        overlay: 'repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,0.02) 35px, rgba(255,255,255,0.02) 70px)',
        textColor: '#ffffff',
        accentColor: '#d69e2e'
    },
    PINK: {
        background: 'linear-gradient(135deg, #ed64a6 0%, #d53f8c 25%, #b83280 50%, #97266d 75%, #ed64a6 100%)',
        pattern: 'radial-gradient(circle at 30% 70%, rgba(255,255,255,0.1) 0%, transparent 50%), radial-gradient(circle at 70% 30%, rgba(255,255,255,0.08) 0%, transparent 50%)',
        overlay: 'linear-gradient(120deg, rgba(255,255,255,0.05) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.05) 75%), linear-gradient(240deg, rgba(255,255,255,0.05) 25%, transparent 25%, transparent 75%, rgba(255,255,255,0.05) 75%)',
        textColor: '#ffffff',
        accentColor: '#fbb6ce'
    },
    GREY: {
        background: 'linear-gradient(135deg, #718096 0%, #4a5568 25%, #2d3748 50%, #1a202c 75%, #718096 100%)',
        pattern: 'radial-gradient(circle at 40% 40%, rgba(255,255,255,0.04) 0%, transparent 50%), radial-gradient(circle at 60% 60%, rgba(255,255,255,0.03) 0%, transparent 50%)',
        overlay: 'repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(255,255,255,0.02) 50px, rgba(255,255,255,0.02) 100px)',
        textColor: '#ffffff',
        accentColor: '#cbd5e0'
    }
};

// Comprehensive personality data with interests, struggles, solutions, character references, maturity paths, fashion, and pressure responses
const personalityData = {
    BLACK: {
        name: "BLACK",
        title: "The Independent & Mysterious",
        description: "Values privacy and personal space. Often an observer rather than a participant in social settings. Prefers deep intellectual conversations over small talk.",
        strengths: [
            "Deep analytical thinking",
            "Independent and self-reliant",
            "Comfortable with solitude",
            "Strong observation skills",
            "Profound and insightful"
        ],
        weaknesses: [
            "May come across as distant or aloof",
            "Sometimes overly private",
            "Can be cynical or pessimistic",
            "Might struggle with emotional expression"
        ],
        cartoonReferences: [
            "Batman/Bruce Wayne - Dark, brooding, works alone but fights for justice",
            "Raven from Teen Titans - Mysterious, powerful, prefers solitude",
            "Shadow the Hedgehog - Independent, serious, complex backstory",
            "Marceline from Adventure Time - Cool, independent, has depth beneath surface",
            "Sasuke Uchiha from Naruto - Loner, analytical, seeks power through solitude"
        ],
        maturityPath: {
            stages: [
                "Recognition Stage: Acknowledging that isolation isn't always strength",
                "Connection Stage: Learning to trust select individuals with vulnerability",
                "Integration Stage: Balancing independence with meaningful relationships",
                "Mastery Stage: Using analytical skills to help others while maintaining authenticity"
            ],
            environmentalAdaptation: "Matures by gradually opening up to trusted individuals, learning that vulnerability can coexist with strength. Adapts to environments by finding their niche as the 'wise advisor' or 'strategic thinker.' Develops emotional intelligence while maintaining their analytical edge.",
            maturityMarkers: [
                "Shares personal insights more frequently",
                "Offers support to close friends during difficult times",
                "Engages in small talk when it serves a purpose",
                "Uses their observational skills to mentor others"
            ]
        },
        fashionStyle: {
            primaryStyle: "Minimalist Gothic",
            keyElements: [
                "Monochromatic color schemes (black, white, grey)",
                "Clean, structured lines",
                "High-quality, durable fabrics",
                "Minimal accessories with symbolic meaning",
                "Dark academia aesthetic"
            ],
            occasions: {
                casual: "Black jeans, dark turtleneck, leather jacket, minimalist watch",
                formal: "Sharp black suit, crisp white shirt, simple silver cufflinks",
                creative: "Black skinny jeans, band t-shirt, dark blazer, combat boots"
            },
            avoids: [
                "Bright, attention-grabbing colors",
                "Overly trendy or flashy items",
                "Logos or branding that draws unnecessary attention",
                "Uncomfortable or impractical clothing"
            ]
        },
        underPressure: {
            colorShift: "Becomes GREY - withdraws into analytical mode",
            behaviorChanges: [
                "Increased isolation and withdrawal from social interactions",
                "Over-analysis leading to decision paralysis",
                "Heightened cynicism and pessimistic outlook",
                "Tendency to dismiss emotional considerations entirely"
            ],
            warningSign: "When they stop sharing any personal thoughts and become purely transactional in communication",
            recoveryNeeds: [
                "Alone time to process and recharge",
                "Engaging with intellectual pursuits (reading, research)",
                "Physical activities that don't require social interaction",
                "Gradual re-engagement with trusted individuals"
            ],
            supportStrategies: [
                "Respect their need for space without taking it personally",
                "Offer intellectual discussions rather than emotional support",
                "Provide practical help without expecting gratitude",
                "Give them time to process before expecting responses"
            ]
        },
        struggles: {
            main: "Social Isolation & Emotional Barriers",
            details: "Black personalities often struggle with building deep connections due to their natural tendency to retreat into solitude. They may feel misunderstood and have difficulty expressing vulnerability.",
            symptoms: [
                "Feeling disconnected from others even in groups",
                "Difficulty sharing personal thoughts and feelings",
                "Tendency to overthink social interactions",
                "Fear of being judged or misunderstood"
            ]
        },
        solutions: {
            title: "Breaking Through the Walls",
            strategies: [
                "Start with small steps - share one personal thought daily with someone you trust",
                "Practice active listening to understand others' perspectives",
                "Join communities around your intellectual interests",
                "Set weekly goals for social interaction",
                "Consider journaling to process emotions before sharing them"
            ],
            dailyPractice: "Spend 10 minutes each day writing about your feelings, then choose one insight to share with someone close to you."
        },
        interests: {
            favoriteMovies: ["Blade Runner 2049", "The Matrix", "Interstellar", "Memento", "Her"],
            favoriteMusic: [
                { genre: "Dark ambient", spotify: "37i9dQZF1DX0XUsuxWHRQd", youtube: "4LZv3ta13Ws" },
                { genre: "Classical", spotify: "37i9dQZF1DWWEJlAGA9gs0", youtube: "jgpJVI3tDbY" }
            ],
            hobbies: [
                { name: "Reading philosophy", image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400" },
                { name: "Chess", image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=400" },
                { name: "Programming", image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400" },
                { name: "Astronomy", image: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400" },
                { name: "Writing", image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400" },
                { name: "Solo hiking", image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400" }
            ]
        },
        friendMatch: ["Blue", "Purple", "Grey"],
        loveMatch: ["Yellow", "Pink", "Red"],
        futureCareer: [
            "Research Scientist",
            "Cybersecurity Specialist",
            "Data Analyst",
            "Detective",
            "Philosopher",
            "Strategic Consultant",
            "Independent Journalist",
            "Software Architect",
            "Intelligence Analyst",
            "Academic Researcher"
        ],
        growthAreas: [
            "Practice expressing emotions more openly",
            "Engage in more social activities",
            "Develop trust in close relationships",
            "Share insights and knowledge with others"
        ]
    },
    WHITE: {
        name: "WHITE",
        title: "The Peaceful & Pure",
        description: "Seeks peace and harmony in all aspects of life. Avoids drama and dislikes conflict. Strong moral compass—values honesty and fairness.",
        strengths: [
            "Excellent mediator",
            "Highly ethical and honest",
            "Calm and balanced perspective",
            "Strong sense of fairness",
            "Naturally diplomatic"
        ],
        weaknesses: [
            "May avoid necessary conflict",
            "Can struggle with assertiveness",
            "Sometimes too idealistic",
            "Might be indecisive to maintain peace"
        ],
        cartoonReferences: [
            "Aang from Avatar - Peaceful, seeks balance, avoids violence when possible",
            "Steven Universe - Wants everyone to get along, empathetic, healing powers",
            "Belle from Beauty and the Beast - Kind, sees goodness in others, peacemaker",
            "Uncle Iroh from Avatar - Wise, peaceful, seeks harmony and balance",
            "Tohru Honda from Fruits Basket - Gentle, kind, brings peace to chaotic situations"
        ],
        maturityPath: {
            stages: [
                "Naive Peace Stage: Avoiding all conflict, even necessary ones",
                "Awakening Stage: Realizing that some conflicts are necessary for growth",
                "Balanced Assertiveness Stage: Learning to stand firm while maintaining kindness",
                "Wise Mediator Stage: Skillfully navigating conflict to create genuine harmony"
            ],
            environmentalAdaptation: "Matures by learning that true peace sometimes requires facing difficult truths. Adapts by becoming a skilled mediator who can address conflict constructively. Develops the courage to speak up for what's right while maintaining their natural diplomacy.",
            maturityMarkers: [
                "Addresses issues directly but kindly",
                "Sets healthy boundaries without guilt",
                "Stands up for others who can't defend themselves",
                "Facilitates difficult conversations between conflicting parties"
            ]
        },
        fashionStyle: {
            primaryStyle: "Clean Minimalism",
            keyElements: [
                "Neutral color palette (white, cream, beige, soft pastels)",
                "Clean, flowing lines",
                "Natural, breathable fabrics",
                "Simple, elegant accessories",
                "Timeless, classic pieces"
            ],
            occasions: {
                casual: "White cotton shirt, beige chinos, white sneakers, simple gold necklace",
                formal: "Cream blazer, white dress shirt, neutral trousers, minimal jewelry",
                creative: "Flowing white dress, light cardigan, natural fiber accessories"
            },
            avoids: [
                "Harsh, aggressive patterns",
                "Overly bold or conflicting colors",
                "Clothing that restricts movement",
                "Heavy, dark accessories"
            ]
        },
        underPressure: {
            colorShift: "Becomes GREY - emotional shutdown and over-accommodation",
            behaviorChanges: [
                "Extreme people-pleasing to avoid any confrontation",
                "Emotional shutdown when overwhelmed by others' problems",
                "Indecisiveness escalates to complete paralysis",
                "May become passive-aggressive when needs aren't met"
            ],
            warningSign: "When they start agreeing to everything while clearly becoming more withdrawn",
            recoveryNeeds: [
                "Quiet, peaceful environment to decompress",
                "Time in nature or serene settings",
                "Gentle encouragement to express their own needs",
                "Meditation or mindfulness practices"
            ],
            supportStrategies: [
                "Make decisions for them when they're overwhelmed",
                "Create calm, stress-free environments",
                "Acknowledge their efforts to maintain peace",
                "Help them practice saying 'no' in low-stakes situations"
            ]
        },
        struggles: {
            main: "Conflict Avoidance & Decision Paralysis",
            details: "White personalities often struggle with being too accommodating, leading to burnout and resentment. They may sacrifice their own needs to maintain harmony and struggle with making tough decisions.",
            symptoms: [
                "Feeling overwhelmed by others' problems",
                "Difficulty saying 'no' to requests",
                "Avoiding necessary confrontations",
                "Feeling taken advantage of by others"
            ]
        },
        solutions: {
            title: "Finding Your Voice",
            strategies: [
                "Practice saying 'no' in small, low-stakes situations first",
                "Set specific times for helping others vs. self-care",
                "Learn to distinguish between healthy and unhealthy conflict",
                "Develop decision-making frameworks based on your values",
                "Create boundaries around your time and energy"
            ],
            dailyPractice: "Each morning, identify one thing you'll prioritize for yourself that day, regardless of others' requests."
        },
        interests: {
            favoriteMovies: ["The Pursuit of Happyness", "Forrest Gump", "Life is Beautiful", "The Secret Garden", "Dead Poets Society"],
            favoriteMusic: [
                { genre: "Folk", spotify: "37i9dQZF1DWWMOmoXKqHTD", youtube: "fJ9rUzIMcZQ" },
            ],
            hobbies: [
                { name: "Meditation", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400" },
                { name: "Gardening", image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400" },
                { name: "Volunteering", image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400" },
                { name: "Yoga", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400" },
                { name: "Nature photography", image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400" },
                { name: "Community service", image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400" }
            ]
        },
        friendMatch: ["Pink", "Green", "Blue"],
        loveMatch: ["Red", "Chocolate", "Purple"],
        futureCareer: [
            "Mediator",
            "Human Rights Lawyer",
            "Counselor",
            "Non-Profit Director",
            "Social Worker",
            "Peace Negotiator",
            "Healthcare Administrator",
            "Diplomat",
            "Ethics Consultant",
            "Educational Coordinator"
        ],
        growthAreas: [
            "Practice healthy assertiveness",
            "Learn to engage in constructive conflict",
            "Set boundaries when needed",
            "Develop decision-making confidence"
        ]
    },
    RED: {
        name: "RED",
        title: "The Passionate & Bold",
        description: "Thrives on challenges and competition. Highly ambitious—always aims to be the best. Has a strong personality and doesn't back down easily.",
        strengths: [
            "Strong leadership abilities",
            "Quick decision-making",
            "High energy and motivation",
            "Goal-oriented mindset",
            "Excellent problem-solving skills"
        ],
        weaknesses: [
            "Can be impatient",
            "May appear overwhelming to others",
            "Might overlook details",
            "Could be too competitive"
        ],
        cartoonReferences: [
            "Vegeta from Dragon Ball Z - Proud, competitive, constantly pushing limits",
            "Lightning McQueen from Cars - Confident, fast-paced, learns about teamwork",
            "Bakugo from My Hero Academia - Explosive personality, driven to be the best",
            "Mulan - Brave, determined, breaks barriers to achieve goals",
            "Tony Stark/Iron Man - Confident, innovative, natural leader with ego"
        ],
        maturityPath: {
            stages: [
                "Dominance Stage: Believing winning is everything, bulldozing through obstacles",
                "Awareness Stage: Recognizing that others have valuable perspectives too",
                "Collaboration Stage: Learning to channel competitive energy into team success",
                "Leadership Mastery Stage: Inspiring others while achieving personal goals"
            ],
            environmentalAdaptation: "Matures by learning that true leadership means lifting others up, not just getting ahead. Adapts to environments by becoming the motivational force that drives teams forward. Develops patience and emotional intelligence while maintaining their natural drive.",
            maturityMarkers: [
                "Celebrates team victories as much as personal ones",
                "Listens to feedback without becoming defensive",
                "Mentors others instead of just competing with them",
                "Uses their energy to solve problems rather than create them"
            ]
        },
        fashionStyle: {
            primaryStyle: "Power Professional",
            keyElements: [
                "Bold, confident colors (red, navy, black)",
                "Sharp, tailored silhouettes",
                "High-quality, statement pieces",
                "Accessories that convey success",
                "Modern, cutting-edge styles"
            ],
            occasions: {
                casual: "Red polo shirt, dark jeans, leather jacket, designer sneakers",
                formal: "Sharp navy suit, crisp white shirt, red power tie, quality watch",
                creative: "Bold blazer, dark jeans, statement shirt, confident accessories"
            },
            avoids: [
                "Overly casual or sloppy clothing",
                "Muted, boring colors",
                "Anything that makes them blend into the background",
                "Uncomfortable or restrictive formal wear"
            ]
        },
        underPressure: {
            colorShift: "Becomes BLACK - withdraws to strategize and may become ruthless",
            behaviorChanges: [
                "Increased aggression and impatience with others",
                "Tendency to steamroll over other people's feelings",
                "May become controlling and micromanaging",
                "Stress-related physical symptoms (headaches, tension)"
            ],
            warningSign: "When they start making unilateral decisions without consulting anyone",
            recoveryNeeds: [
                "Physical exercise to burn off excess energy",
                "Competitive activities that provide healthy outlets",
                "Time to reassess goals and priorities",
                "Achievement of a meaningful victory or accomplishment"
            ],
            supportStrategies: [
                "Give them challenges they can win",
                "Acknowledge their achievements and hard work",
                "Provide clear, direct feedback without sugar-coating",
                "Help them see the bigger picture beyond immediate goals"
            ]
        },
        struggles: {
            main: "Burnout & Relationship Strain",
            details: "Red personalities often struggle with maintaining work-life balance and can damage relationships through their intense drive. They may experience burnout from constantly pushing themselves and others.",
            symptoms: [
                "Feeling constantly stressed and rushed",
                "Difficulty relaxing or enjoying downtime",
                "Conflicts with team members or loved ones",
                "Impatience when others don't match their pace"
            ]
        },
        solutions: {
            title: "Channeling Your Fire",
            strategies: [
                "Schedule mandatory downtime in your calendar",
                "Practice active listening before responding in conversations",
                "Set 'collaboration goals' alongside achievement goals",
                "Learn to delegate effectively to prevent micromanaging",
                "Develop patience through mindfulness exercises"
            ],
            dailyPractice: "Take three deep breaths before responding to any situation that triggers your impatience."
        },
        interests: {
            favoriteMovies: ["Gladiator", "The Wolf of Wall Street", "Rocky", "Top Gun", "The Dark Knight"],
            favoriteMusic: [
                { genre: "Rock", spotify: "37i9dQZF1DWXRqgorJj26U", youtube: "fJ9rUzIMcZQ" },
                { genre: "Hip-hop", spotify: "37i9dQZF1DX0XUsuxWHRQd", youtube: "hqIsc8ooXug" },
                { genre: "Electronic dance", spotify: "37i9dQZF1DX4dyzvuaRJ0n", youtube: "StKVS0eI85I" }
            ],
            hobbies: [
                { name: "Competitive sports", image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400" },
                { name: "Martial arts", image: "https://images.unsplash.com/photo-1555597673-b21d5c935865?w=400" },
                { name: "Rock climbing", image: "https://images.unsplash.com/photo-1522163182402-834f871fd851?w=400" },
                { name: "Entrepreneurship", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400" },
                { name: "Public speaking", image: "https://images.unsplash.com/photo-1505664194779-8beaceb93744?w=400" },
                { name: "Racing", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400" }
            ]
        },
        friendMatch: ["Yellow", "Blue", "Purple"],
        loveMatch: ["White", "Pink", "Black"],
        futureCareer: [
            "Entrepreneur",
            "Sales Executive",
            "Sports Coach",
            "Military Strategic Planner",
            "Political Leader",
            "Emergency Services Manager",
            "Investment Banker",
            "Professional Athlete",
            "Business Consultant",
            "Competition Strategist"
        ],
        growthAreas: [
            "Practice patience with others",
            "Listen more actively",
            "Consider others' perspectives",
            "Balance ambition with relationships"
        ]
    },
    BLUE: {
        name: "BLUE",
        title: "The Loyal & Intelligent",
        description: "Prefers logic over emotions when making decisions. Very loyal and trustworthy—keeps promises. Avoids emotional drama and foolish risks.",
        strengths: [
            "Strong analytical skills",
            "Highly reliable and trustworthy",
            "Excellent planner and strategist",
            "Detail-oriented and thorough",
            "Makes decisions based on logic"
        ],
        weaknesses: [
            "May overthink situations",
            "Could seem emotionally detached",
            "Might be perfectionistic",
            "Sometimes inflexible with plans"
        ],
        cartoonReferences: [
            "Hermione Granger - Logical, studious, loyal, values knowledge and preparation",
            "Leonardo from TMNT - Leader, strategic thinker, disciplined, loyal to team",
            "Beast from Beauty and the Beast - Intelligent, well-read, initially reserved",
            "Twilight Sparkle from MLP - Studies hard, plans everything, loyal friend",
            "Spock from Star Trek - Logical, analytical, struggles with emotions"
        ],
        maturityPath: {
            stages: [
                "Analysis Paralysis Stage: Over-thinking every decision to avoid mistakes",
                "Logic-Only Stage: Dismissing emotions as irrelevant or illogical",
                "Integration Stage: Learning to value both logic and emotional intelligence",
                "Wise Advisor Stage: Balancing analytical thinking with human understanding"
            ],
            environmentalAdaptation: "Matures by learning that emotions provide valuable data for decision-making. Adapts to environments by becoming the trusted advisor who combines analytical thinking with emotional wisdom. Develops flexibility while maintaining their systematic approach.",
            maturityMarkers: [
                "Considers emotional factors in major decisions",
                "Expresses feelings more readily to close friends",
                "Adapts plans when circumstances change",
                "Uses their analytical skills to help others process emotions"
            ]
        },
        fashionStyle: {
            primaryStyle: "Classic Professional",
            keyElements: [
                "Navy, grey, and white color scheme",
                "Well-tailored, traditional cuts",
                "Quality fabrics that last",
                "Functional accessories (quality watch, leather goods)",
                "Timeless, conservative styles"
            ],
            occasions: {
                casual: "Navy chinos, white button-down, navy blazer, leather loafers",
                formal: "Classic navy or grey suit, white dress shirt, conservative tie",
                creative: "Smart casual blazer, dark jeans, quality button-down, minimal accessories"
            },
            avoids: [
                "Trendy or flashy clothing",
                "Overly casual or sloppy attire",
                "Bright, attention-grabbing colors",
                "Anything impractical or uncomfortable"
            ]
        },
        underPressure: {
            colorShift: "Becomes WHITE - seeks harmony and may compromise logic for peace",
            behaviorChanges: [
                "Analysis paralysis becomes even more pronounced",
                "May become rigid and inflexible with routines",
                "Increased criticism of others' 'illogical' behavior",
                "Emotional withdrawal and difficulty expressing feelings"
            ],
            warningSign: "When they start creating overly complex systems for simple tasks",
            recoveryNeeds: [
                "Time to organize and plan in quiet environment",
                "Engaging with intellectual puzzles or challenges",
                "Discussing problems with logical, trusted friends",
                "Breaking large problems into smaller, manageable pieces"
            ],
            supportStrategies: [
                "Provide structure and clear expectations",
                "Ask for their analytical perspective on problems",
                "Respect their need for processing time",
                "Help them see the emotional logic in situations"
            ]
        },
        struggles: {
            main: "Analysis Paralysis & Emotional Disconnect",
            details: "Blue personalities often struggle with overthinking decisions and may miss out on opportunities due to excessive planning. They can also struggle to connect emotionally with others.",
            symptoms: [
                "Spending too much time analyzing instead of acting",
                "Feeling disconnected from emotional conversations",
                "Difficulty making decisions without complete information",
                "Others perceiving them as cold or distant"
            ]
        },
        solutions: {
            title: "Balancing Logic with Heart",
            strategies: [
                "Set time limits for decision-making to prevent overthinking",
                "Practice expressing one emotion daily, even if it feels awkward",
                "Ask trusted friends about their emotional perspectives",
                "Create 'good enough' standards instead of perfect ones",
                "Schedule regular check-ins with your emotional well-being"
            ],
            dailyPractice: "When making any decision, consider both the logical outcome AND how you feel about it."
        },
        interests: {
            favoriteMovies: ["The Martian", "A Beautiful Mind", "The Imitation Game", "Inception", "2001: A Space Odyssey"],
            favoriteMusic: [
                { genre: "Instrumental", spotify: "37i9dQZF1DX4sWSpwq3LiO", youtube: "1ZYbU82GVz4" },
                { genre: "Classical", spotify: "37i9dQZF1DWWEJlAGA9gs0", youtube: "jgpJVI3tDbY" }
            ],
            hobbies: [
                { name: "Strategy games", image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400" },
                { name: "Reading non-fiction", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400" },
                { name: "Puzzles", image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400" },
                { name: "Computer programming", image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400" },
                { name: "Data analysis", image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400" },
                { name: "Board games", image: "https://images.unsplash.com/photo-1571741924307-3ff7e1b1ecfe?w=400" }
            ]
        },
        friendMatch: ["Red", "Black", "White"],
        loveMatch: ["Pink", "Yellow", "Purple"],
        futureCareer: [
            "Data Scientist",
            "Financial Analyst",
            "Software Engineer",
            "Systems Architect",
            "Quality Assurance Specialist",
            "Accountant",
            "Technical Project Manager",
            "Mathematician",
            "Research Analyst",
            "Engineering Consultant"
        ],
        growthAreas: [
            "Express emotions more freely",
            "Be more flexible with plans",
            "Consider emotional factors in decisions",
            "Practice spontaneity occasionally"
        ]
    },
    YELLOW: {
        name: "YELLOW",
        title: "The Optimistic & Cheerful",
        description: "Always looks at the bright side of life. Highly social—loves making people laugh. Enjoys spontaneity and dislikes strict routines.",
        strengths: [
            "Natural optimism and positivity",
            "Excellent social skills",
            "Creative problem-solver",
            "Adaptable to change",
            "Brings energy to any situation"
        ],
        weaknesses: [
            "May lack focus or consistency",
            "Could overlook serious issues",
            "Might be impulsive",
            "Sometimes avoids deeper emotions"
        ],
        cartoonReferences: [
            "SpongeBob SquarePants - Eternally optimistic, spreads joy, sometimes naive",
            "Pinkie Pie from MLP - Party-loving, energetic, lifts everyone's spirits",
            "Olaf from Frozen - Cheerful, optimistic, sees good in everything",
            "The Genie from Aladdin - Fun-loving, entertaining, brings magic to life",
            "Timon from The Lion King - Carefree, funny, helps others forget their troubles"
        ],
        maturityPath: {
            stages: [
                "Surface Joy Stage: Using humor and fun to avoid dealing with serious issues",
                "Reality Check Stage: Learning that not everything can be solved with positivity",
                "Balanced Optimism Stage: Maintaining joy while acknowledging life's challenges",
                "Inspirational Leader Stage: Using authentic positivity to help others through difficulties"
            ],
            environmentalAdaptation: "Matures by learning that true happiness includes processing difficult emotions. Adapts to environments by becoming the person who can find light in dark situations while still acknowledging pain. Develops depth while maintaining their natural joy.",
            maturityMarkers: [
                "Stays present during serious conversations",
                "Offers support during others' difficult times without trying to cheer them up",
                "Follows through on commitments despite changing moods",
                "Uses humor appropriately - uplifting rather than deflecting"
            ]
        },
        fashionStyle: {
            primaryStyle: "Vibrant Casual",
            keyElements: [
                "Bright, cheerful colors (yellow, orange, bright blue)",
                "Comfortable, easy-to-move-in clothing",
                "Fun patterns and playful designs",
                "Colorful accessories and fun details",
                "Trendy, social media-worthy pieces"
            ],
            occasions: {
                casual: "Bright yellow top, colorful jeans, fun sneakers, cheerful accessories",
                formal: "Colorful blazer, bright shirt, fun tie or scarf, comfortable dress shoes",
                creative: "Mix of patterns, bright cardigan, colorful pants, statement jewelry"
            },
            avoids: [
                "All-black or overly serious outfits",
                "Restrictive or uncomfortable clothing",
                "Boring, monochromatic looks",
                "Anything that dampens their natural enthusiasm"
            ]
        },
        underPressure: {
            colorShift: "Becomes RED - aggressive positivity and manic energy",
            behaviorChanges: [
                "Forced cheerfulness that feels inauthentic",
                "Increased impulsivity and scattered attention",
                "May become overwhelming to others with manic energy",
                "Avoidance of serious issues becomes more pronounced"
            ],
            warningSign: "When their usual natural joy becomes forced and they can't sit still",
            recoveryNeeds: [
                "Fun, low-pressure social activities",
                "Creative outlets that don't require perfection",
                "Physical activities that release happy endorphins",
                "Time with people who appreciate their authentic joy"
            ],
            supportStrategies: [
                "Engage them in light, fun activities",
                "Don't force them to deal with heavy topics immediately",
                "Appreciate their efforts to maintain positivity",
                "Help them find healthy ways to process difficult emotions"
            ]
        },
        struggles: {
            main: "Superficiality & Commitment Issues",
            details: "Yellow personalities often struggle with maintaining focus on long-term goals and may avoid dealing with serious or negative situations. They can have difficulty with commitment and may appear shallow to others.",
            symptoms: [
                "Starting many projects but finishing few",
                "Avoiding serious conversations or situations",
                "Feeling restless with routine or commitment",
                "Others questioning their reliability or depth"
            ]
        },
        solutions: {
            title: "Grounding Your Sunshine",
            strategies: [
                "Use your social skills to find accountability partners for goals",
                "Break big commitments into smaller, fun milestones",
                "Schedule 'serious time' for important conversations and decisions",
                "Practice mindfulness to stay present in difficult moments",
                "Create systems that make routine tasks more engaging"
            ],
            dailyPractice: "Spend 15 minutes each day on one consistent long-term project, celebrating small progress."
        },
        interests: {
            favoriteMovies: ["The Greatest Showman", "Mamma Mia!", "La La Land", "The Princess Bride", "Finding Nemo"],
            favoriteMusic: [
                { genre: "Pop", spotify: "37i9dQZF1DXcBWIGoYBM5M", youtube: "YQHsXMglC9A" },
                { genre: "Reggae", spotify: "37i9dQZF1DXbSbnqxMTGx9", youtube: "zaGUr6wzyT8" },
                { genre: "Musical theater", spotify: "37i9dQZF1DWTkxQvqMy4WW", youtube: "OvW_L8sTu5E" }
            ],
            hobbies: [
                { name: "Dancing", image: "https://images.unsplash.com/photo-1547153760-18fc86324498?w=400" },
                { name: "Party planning", image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400" },
                { name: "Travel", image: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400" },
                { name: "Comedy shows", image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400" },
                { name: "Social media", image: "https://images.unsplash.com/photo-1611262588024-d12430b98920?w=400" },
                { name: "Karaoke", image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400" }
            ]
        },
        friendMatch: ["Pink", "Red", "Purple"],
        loveMatch: ["Blue", "Black", "Green"],
        futureCareer: [
            "Motivational Speaker",
            "Event Planner",
            "Entertainment Producer",
            "Creative Director",
            "Marketing Specialist",
            "Stand-up Comedian",
            "Travel Blogger",
            "Public Relations Manager",
            "Social Media Influencer",
            "Innovation Consultant"
        ],
        growthAreas: [
            "Develop better focus and consistency",
            "Address serious matters when needed",
            "Create sustainable routines",
            "Practice deeper emotional awareness"
        ]
    },
    GREEN: {
        name: "GREEN",
        title: "The Balanced & Practical",
        description: "Prefers stability over excitement. Careful decision-maker—avoids impulsive choices. Values hard work and consistency.",
        strengths: [
            "Highly practical and grounded",
            "Reliable and consistent",
            "Good at managing resources",
            "Balanced decision-maker",
            "Creates stability in chaos"
        ],
        weaknesses: [
            "May resist necessary change",
            "Could be overly cautious",
            "Might seem boring to more spontaneous types",
            "Sometimes too focused on security"
        ],
        cartoonReferences: [
            "Toph from Avatar - Grounded, practical, stable, no-nonsense attitude",
            "Kristoff from Frozen - Practical, hardworking, reliable, down-to-earth",
            "Shrek - Initially resistant to change, values simple life, ultimately loyal",
            "Eeyore from Winnie the Pooh - Realistic, sometimes pessimistic, but dependable",
            "Nick Wilde from Zootopia - Practical, street-smart, adapts when necessary"
        ],
        maturityPath: {
            stages: [
                "Safety First Stage: Avoiding all risks and changes to maintain security",
                "Comfort Zone Challenge Stage: Recognizing that growth requires some discomfort",
                "Calculated Risk Stage: Learning to take thoughtful chances for better outcomes",
                "Adaptive Stability Stage: Maintaining core values while embracing beneficial change"
            ],
            environmentalAdaptation: "Matures by learning that some changes lead to greater stability. Adapts to environments by becoming the steady force that helps others navigate transitions. Develops confidence in their ability to handle change while maintaining their practical wisdom.",
            maturityMarkers: [
                "Embraces changes that align with long-term goals",
                "Takes calculated risks for family or career advancement",
                "Helps others adapt to new situations",
                "Balances stability with necessary growth"
            ]
        },
        fashionStyle: {
            primaryStyle: "Practical Classic",
            keyElements: [
                "Earth tones and natural colors (green, brown, navy, khaki)",
                "Durable, high-quality fabrics",
                "Comfortable, practical cuts",
                "Timeless pieces that don't go out of style",
                "Functional accessories"
            ],
            occasions: {
                casual: "Khaki pants, green button-down, comfortable walking shoes, practical watch",
                formal: "Navy or brown suit, earth-toned shirt, conservative tie, quality leather shoes",
                creative: "Casual blazer, comfortable jeans, practical shirt, minimal accessories"
            },
            avoids: [
                "Trendy, fast-fashion pieces",
                "Overly flashy or attention-grabbing items",
                "Uncomfortable or impractical clothing",
                "Anything too experimental or avant-garde"
            ]
        },
        underPressure: {
            colorShift: "Becomes CHOCOLATE - becomes more rigid and traditional",
            behaviorChanges: [
                "Increased resistance to any change or new ideas",
                "May become overly critical of others' 'risky' decisions",
                "Tendency to hoard resources or become miserly",
                "Anxiety about the future and potential loss of security"
            ],
            warningSign: "When they start refusing to consider any alternatives to current systems",
            recoveryNeeds: [
                "Reassurance about their financial and personal security",
                "Time in natural settings to restore balance",
                "Gradual, small changes rather than big disruptions",
                "Focus on long-term planning and goal-setting"
            ],
            supportStrategies: [
                "Provide detailed plans for any proposed changes",
                "Emphasize the security benefits of new approaches",
                "Give them time to process and adapt to new ideas",
                "Acknowledge their valuable contributions to stability"
            ]
        },
        struggles: {
            main: "Fear of Change & Missed Opportunities",
            details: "Green personalities often struggle with adapting to change and may miss out on growth opportunities due to their preference for safety and routine. They can become stuck in comfort zones.",
            symptoms: [
                "Feeling anxious about new situations or changes",
                "Staying in unsatisfying situations because they're familiar",
                "Missing opportunities due to over-caution",
                "Others perceiving them as resistant or inflexible"
            ]
        },
        solutions: {
            title: "Growing Beyond Comfort",
            strategies: [
                "Start with small, low-risk changes to build confidence",
                "Research opportunities thoroughly to feel more secure about them",
                "Find ways to maintain some stability while embracing change",
                "Connect with more adventurous friends who can encourage growth",
                "Focus on the long-term benefits of taking calculated risks"
            ],
            dailyPractice: "Try one small new thing each day - a different route to work, a new food, or a brief conversation with someone new."
        },
        interests: {
            favoriteMovies: ["The Pursuit of Happyness", "Field of Dreams", "The Secret Garden", "Julie & Julia", "About Time"],
            favoriteMusic: [
                { genre: "Folk", spotify: "37i9dQZF1DWWMOmoXKqHTD", youtube: "fhNrqc6yvTU" },
                { genre: "Country", spotify: "37i9dQZF1DX1lVhptIYRda", youtube: "Md_3iOOSKkI" },
                { genre: "Indie folk", spotify: "37i9dQZF1DWXmlLSKkfdAk", youtube: "rId6PKlDXeU" }
            ],
            hobbies: [
                { name: "Gardening", image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400" },
                { name: "Hiking", image: "https://images.unsplash.com/photo-1551632811-561732d1e306?w=400" },
                { name: "Cooking", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400" },
                { name: "Reading", image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400" },
                { name: "DIY projects", image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=400" },
                { name: "Sustainable living", image: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400" }
            ]
        },
        friendMatch: ["Chocolate", "White"],
        loveMatch: ["Purple", "Yellow", "Grey"],
        futureCareer: [
            "Financial Planner",
            "Operations Manager",
            "Supply Chain Specialist",
            "Agricultural Economist",
            "Environmental Sustainability Consultant",
            "Risk Management Analyst",
            "Healthcare Administrator",
            "Urban Planner",
            "Investment Portfolio Manager",
            "Resource Management Specialist"
        ],
        growthAreas: [
            "Embrace positive changes",
            "Take calculated risks",
            "Try new experiences",
            "Balance security with growth"
        ]
    },
    PURPLE: {
        name: "PURPLE",
        title: "The Creative & Unique",
        description: "Highly imaginative and artistic. Thinks outside the box—loves creativity. Values emotional depth and intellectual conversations.",
        strengths: [
            "Highly creative and innovative",
            "Deep thinker with imagination",
            "Sensitive to subtleties and nuances",
            "Drawn to unique perspectives",
            "Combines logic with intuition"
        ],
        weaknesses: [
            "May be moody or temperamental",
            "Could seem impractical at times",
            "Might be too idealistic",
            "Sometimes struggles with routine"
        ],
        cartoonReferences: [
            "Rarity from MLP - Creative, artistic, dramatic, appreciates beauty and uniqueness",
            "Elsa from Frozen - Unique powers, struggles with being different, creative with magic",
            "Violet from The Incredibles - Unique abilities, introverted, creative with powers",
            "Rapunzel from Tangled - Artistic, creative, sees beauty in everything",
            "Amethyst from Steven Universe - Creative, unconventional, artistic expression"
        ],
        maturityPath: {
            stages: [
                "Misunderstood Artist Stage: Feeling isolated because others don't understand creativity",
                "Expression Stage: Finding healthy outlets for creative and emotional energy",
                "Integration Stage: Learning to balance artistic vision with practical needs",
                "Inspirational Creator Stage: Using creativity to inspire and help others"
            ],
            environmentalAdaptation: "Matures by learning to translate creative visions into practical applications. Adapts to environments by becoming the innovative problem-solver who sees possibilities others miss. Develops emotional regulation while maintaining their creative sensitivity.",
            maturityMarkers: [
                "Completes creative projects instead of just starting them",
                "Manages emotions without losing artistic sensitivity",
                "Collaborates effectively with more practical personalities",
                "Uses creativity to solve real-world problems"
            ]
        },
        fashionStyle: {
            primaryStyle: "Artistic Bohemian",
            keyElements: [
                "Rich, jewel tones (purple, deep blue, emerald, burgundy)",
                "Unique, artistic pieces with interesting details",
                "Mix of textures and fabrics",
                "Statement accessories with personal meaning",
                "Vintage or handmade items"
            ],
            occasions: {
                casual: "Flowy purple top, artfully distressed jeans, unique jewelry, creative accessories",
                formal: "Deep purple blazer, artistic blouse, interesting textures, statement jewelry",
                creative: "Layered artistic pieces, mixed patterns, creative accessories, unique combinations"
            },
            avoids: [
                "Mass-produced, generic clothing",
                "Overly conservative or boring styles",
                "Anything that makes them look ordinary",
                "Fast fashion with no personality"
            ]
        },
        underPressure: {
            colorShift: "Becomes PINK - seeks emotional comfort and may become overly sensitive",
            behaviorChanges: [
                "Emotional volatility and mood swings become more intense",
                "May retreat into fantasy world to avoid harsh realities",
                "Increased sensitivity to criticism or perceived rejection",
                "Creative blocks and inability to express themselves artistically"
            ],
            warningSign: "When their creative output stops completely and they become overly emotional",
            recoveryNeeds: [
                "Safe creative spaces to express themselves freely",
                "Understanding friends who appreciate their sensitivity",
                "Artistic activities that don't require perfection",
                "Time to process emotions through creative expression"
            ],
            supportStrategies: [
                "Encourage their creative expression without judgment",
                "Provide emotional support without trying to 'fix' them",
                "Appreciate their unique perspective and insights",
                "Help them break big projects into smaller, manageable pieces"
            ]
        },
        struggles: {
            main: "Emotional Volatility & Practical Challenges",
            details: "Purple personalities often struggle with mood swings and may find it difficult to translate their creative ideas into practical reality. They can feel misunderstood and may struggle with conventional expectations.",
            symptoms: [
                "Experiencing intense emotional highs and lows",
                "Feeling frustrated when creativity doesn't translate to success",
                "Struggling with mundane, practical tasks",
                "Feeling like an outsider or misunderstood by others"
            ]
        },
        solutions: {
            title: "Channeling Creative Energy",
            strategies: [
                "Create structured time blocks for both creative and practical tasks",
                "Find a creative community or mentor who understands your perspective",
                "Develop emotional regulation techniques like art therapy or journaling",
                "Break big creative projects into smaller, manageable steps",
                "Partner with more practical people who can help implement your ideas"
            ],
            dailyPractice: "Spend 20 minutes creating something purely for joy, followed by 10 minutes on a practical task."
        },
        interests: {
            favoriteMovies: ["Amélie", "Eternal Sunshine of the Spotless Mind", "Life of Pi", "The Shape of Water", "Her"],
            favoriteMusic: [
                { genre: "Indie", spotify: "37i9dQZF1DX26DKvjp0s9M", youtube: "RG6EOci0suI" },
                { genre: "Alternative", spotify: "37i9dQZF1DX873GaRGUmPl", youtube: "FklUAoZ6KxY" },
                { genre: "Art rock", spotify: "37i9dQZF1DX1spT6G94GFC", youtube: "4N3N1MlvVc4" }
            ],
            hobbies: [
                { name: "Painting", image: "https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=400" },
                { name: "Creative writing", image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400" },
                { name: "Photography", image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400" },
                { name: "Theater", image: "https://images.unsplash.com/photo-1503095396549-807759245b35?w=400" },
                { name: "Fashion design", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400" },
                { name: "Philosophy", image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400" }
            ]
        },
        friendMatch: ["Black", "Red", "Yellow"],
        loveMatch: ["Green", "Blue", "White"],
        futureCareer: [
            "Graphic Designer",
            "Art Director",
            "Film Maker",
            "Creative Writer",
            "UX/UI Designer",
            "Video Game Designer",
            "Architect",
            "Fashion Designer",
            "Innovation Strategist",
            "Performance Artist"
        ],
        growthAreas: [
            "Develop practical skills",
            "Create structured routines",
            "Balance idealism with realism",
            "Manage emotional fluctuations"
        ]
    },
    CHOCOLATE: {
        name: "CHOCOLATE",
        title: "The Grounded & Practical",
        description: "Extremely loyal and responsible. Prefers tradition and structure over unpredictability. Hardworking and puts family first.",
        strengths: [
            "Extremely reliable and responsible",
            "Strong work ethic",
            "Practical problem-solver",
            "Committed to family and community",
            "Values tradition and stability"
        ],
        weaknesses: [
            "May be resistant to change",
            "Could be overly serious",
            "Might be stubborn about traditions",
            "Sometimes too focused on duty"
        ],
        cartoonReferences: [
            "Mufasa from The Lion King - Wise, traditional, responsible father figure",
            "Mr. Incredible from The Incredibles - Family-focused, responsible, traditional values",
            "Hank Hill from King of the Hill - Traditional, hardworking, values family and community",
            "Ned Flanders from The Simpsons - Religious, traditional, family-oriented, responsible",
            "Chef from South Park - Caring, traditional wisdom, looks out for community"
        ],
        maturityPath: {
            stages: [
                "Rigid Tradition Stage: Following traditions without questioning their relevance",
                "Questioning Stage: Wondering if all traditions serve current needs",
                "Adaptive Tradition Stage: Keeping valuable traditions while updating outdated ones",
                "Wise Elder Stage: Passing on timeless wisdom while embracing beneficial change"
            ],
            environmentalAdaptation: "Matures by learning that traditions can evolve while keeping their essential meaning. Adapts to environments by becoming the wise counselor who helps others navigate change while maintaining important values. Develops flexibility while maintaining their core principles.",
            maturityMarkers: [
                "Updates family traditions to include new members or circumstances",
                "Mentors younger people with patience and understanding",
                "Balances work responsibilities with personal relationships",
                "Advocates for beneficial changes within traditional frameworks"
            ]
        },
        fashionStyle: {
            primaryStyle: "Traditional Conservative",
            keyElements: [
                "Earth tones and warm colors (brown, tan, burgundy, forest green)",
                "Classic, well-made pieces that last for years",
                "Traditional cuts and conservative styling",
                "Quality leather goods and accessories",
                "Timeless, never-goes-out-of-style pieces"
            ],
            occasions: {
                casual: "Brown chinos, plaid shirt, leather belt, comfortable loafers",
                formal: "Traditional brown or navy suit, conservative tie, quality leather shoes",
                creative: "Tweed blazer, button-down shirt, khakis, classic accessories"
            },
            avoids: [
                "Trendy or fashionable items",
                "Bright, flashy colors",
                "Anything too modern or experimental",
                "Cheap, disposable fashion"
            ]
        },
        underPressure: {
            colorShift: "Becomes BLACK - withdraws into rigid thinking and becomes judgmental",
            behaviorChanges: [
                "Becomes inflexible and resistant to any change",
                "May become judgmental of others' choices or lifestyles",
                "Increased focus on duty at expense of personal relationships",
                "May become overly controlling of family or work situations"
            ],
            warningSign: "When they start criticizing others for not following traditional ways",
            recoveryNeeds: [
                "Reconnection with family and traditional support systems",
                "Engaging in familiar, comforting routines",
                "Focus on long-term legacy and values",
                "Recognition and appreciation for their contributions"
            ],
            supportStrategies: [
                "Acknowledge their hard work and dedication",
                "Emphasize how their values provide stability for others",
                "Give them time to process changes gradually",
                "Help them see how traditions can adapt without losing meaning"
            ]
        },
        struggles: {
            main: "Rigidity & Work-Life Imbalance",
            details: "Chocolate personalities often struggle with being too rigid in their thinking and may sacrifice personal happiness for duty. They can become overwhelmed by responsibilities and resist necessary changes.",
            symptoms: [
                "Feeling burdened by constant responsibilities",
                "Difficulty adapting to new methods or ideas",
                "Neglecting personal needs for others' expectations",
                "Feeling stressed when traditions or routines are disrupted"
            ]
        },
        solutions: {
            title: "Honoring Tradition While Growing",
            strategies: [
                "Schedule regular personal time as a non-negotiable responsibility",
                "Gradually introduce small changes to build flexibility",
                "Find mentors who balance tradition with innovation",
                "Practice saying 'no' to additional responsibilities",
                "Explore how traditions can evolve while keeping their essence"
            ],
            dailyPractice: "Dedicate 30 minutes each day to something that brings you personal joy, treating it as importantly as any other responsibility."
        },
        interests: {
            favoriteMovies: ["The Godfather", "Little Women", "It's a Wonderful Life", "Forrest Gump", "The Shawshank Redemption"],
            favoriteMusic: [
                { genre: "Classic rock", spotify: "37i9dQZF1DWXRqgorJj26U", youtube: "fJ9rUzIMcZQ" },
                { genre: "Traditional folk", spotify: "37i9dQZF1DWWMOmoXKqHTD", youtube: "fhNrqc6yvTU" },
                { genre: "Gospel", spotify: "37i9dQZF1DXcb6CQIjdqKy", youtube: "0-EF60neguk" }
            ],
            hobbies: [
                { name: "Family genealogy", image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400" },
                { name: "Traditional crafts", image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=400" },
                { name: "Cooking family recipes", image: "https://images.unsplash.com/photo-1556909114-6a87214663b5?w=400" },
                { name: "Community volunteering", image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=400" },
                { name: "Home improvement", image: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?w=400" },
                { name: "Mentoring", image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=400" }
            ]
        },
        friendMatch: ["Green", "Grey"],
        loveMatch: ["White", "Grey"],
        futureCareer: [
            "Family Lawyer",
            "Traditional Craft Artisan",
            "School Principal",
            "Family Business Manager",
            "Insurance Underwriter",
            "Estate Planner",
            "Genealogist",
            "Heritage Conservation Specialist",
            "Traditional Banking Professional",
            "Community Development Officer"
        ],
        growthAreas: [
            "Be open to new ideas",
            "Balance tradition with innovation",
            "Allow for more flexibility",
            "Embrace healthy changes"
        ]
    },
    PINK: {
        name: "PINK",
        title: "The Kind & Loving",
        description: "Very nurturing and enjoys caring for others. Loves romance, beauty, and sentimental moments. Prefers harmony and dislikes arguments.",
        strengths: [
            "Highly empathetic and caring",
            "Nurturing and supportive",
            "Great listener",
            "Creates harmonious environments",
            "Thoughtful and considerate"
        ],
        weaknesses: [
            "May be overly sensitive",
            "Could be too trusting",
            "Might struggle with setting boundaries",
            "Sometimes avoids difficult truths"
        ],
        cartoonReferences: [
            "Fluttershy from MLP - Gentle, caring, shy, loves helping animals and friends",
            "Baymax from Big Hero 6 - Caring, nurturing, focuses on healing and helping",
            "Cinderella - Kind, gentle, caring toward others despite personal hardships",
            "Rose Quartz from Steven Universe - Loving, nurturing, puts others before herself",
            "Molly Weasley from Harry Potter - Motherly, protective, caring, nurturing"
        ],
        maturityPath: {
            stages: [
                "People-Pleasing Stage: Saying yes to everything to avoid disappointing others",
                "Boundary Awakening Stage: Realizing that helping everyone means helping no one well",
                "Selective Caring Stage: Learning to choose where to invest emotional energy",
                "Empowered Nurturer Stage: Caring for others from a place of strength, not obligation"
            ],
            environmentalAdaptation: "Matures by learning that self-care isn't selfish - it's necessary for sustainable caring. Adapts to environments by becoming the emotionally intelligent support system who helps others while maintaining healthy boundaries. Develops assertiveness while maintaining their natural compassion.",
            maturityMarkers: [
                "Sets boundaries without feeling guilty",
                "Says 'no' to requests when at capacity",
                "Takes care of own needs before helping others",
                "Offers support without taking on others' emotions as their own"
            ]
        },
        fashionStyle: {
            primaryStyle: "Romantic Feminine",
            keyElements: [
                "Soft colors (pink, lavender, cream, soft pastels)",
                "Flowing, feminine silhouettes",
                "Soft, comfortable fabrics",
                "Romantic details (lace, florals, ruffles)",
                "Delicate, meaningful jewelry"
            ],
            occasions: {
                casual: "Soft pink sweater, flowing skirt, comfortable flats, delicate jewelry",
                formal: "Pink or pastel dress, soft blazer, feminine accessories, comfortable heels",
                creative: "Flowy blouse, soft cardigan, comfortable jeans, romantic accessories"
            },
            avoids: [
                "Harsh, aggressive colors or patterns",
                "Overly structured or rigid clothing",
                "Anything uncomfortable or restrictive",
                "Dark, heavy, or intimidating styles"
            ]
        },
        underPressure: {
            colorShift: "Becomes WHITE - extreme people-pleasing and emotional shutdown",
            behaviorChanges: [
                "Overwhelming empathy that absorbs others' emotions completely",
                "Inability to say 'no' leading to complete emotional exhaustion",
                "May become passive-aggressive when boundaries are violated",
                "Physical symptoms from emotional stress (headaches, fatigue)"
            ],
            warningSign: "When they start crying frequently and can't explain why",
            recoveryNeeds: [
                "Complete emotional rest away from others' problems",
                "Gentle, nurturing activities (warm baths, soft music, comfort food)",
                "Reassurance that they're loved for who they are, not what they do",
                "Help setting boundaries without feeling guilty"
            ],
            supportStrategies: [
                "Take care of practical things so they can rest emotionally",
                "Don't bring them more problems to solve",
                "Appreciate their caring nature without taking advantage",
                "Help them practice self-care without guilt"
            ]
        },
        struggles: {
            main: "Emotional Overwhelm & Boundary Issues",
            details: "Pink personalities often struggle with taking on others' emotions and problems, leading to emotional exhaustion. They may have difficulty setting boundaries and can be taken advantage of due to their trusting nature.",
            symptoms: [
                "Feeling emotionally drained after social interactions",
                "Taking on others' problems as your own",
                "Difficulty saying no to requests for help",
                "Feeling hurt when others don't reciprocate your care"
            ]
        },
        solutions: {
            title: "Protecting Your Tender Heart",
            strategies: [
                "Practice emotional boundaries by limiting how much you absorb from others",
                "Learn to distinguish between empathy and emotional absorption",
                "Schedule regular self-care time as a non-negotiable",
                "Develop scripts for saying no kindly but firmly",
                "Surround yourself with people who appreciate and reciprocate your care"
            ],
            dailyPractice: "Before helping others, ask yourself: 'Do I have the emotional energy for this right now?' Honor your answer."
        },
        interests: {
            favoriteMovies: ["The Notebook", "Pride and Prejudice", "When Harry Met Sally", "The Princess Bride", "Love Actually"],
            favoriteMusic: [
                { genre: "Romance ballads", spotify: "37i9dQZF1DX0XUsuxWHRQd", youtube: "3JWTaaS7LdU" },
                { genre: "Acoustic singer-songwriter", spotify: "37i9dQZF1DX1s9knjP51Oa", youtube: "9Cyokaj3BJU" }
            ],
            hobbies: [
                { name: "Romance novels", image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400" },
                { name: "Flower arranging", image: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400" },
                { name: "Spa days", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=400" },
                { name: "Relationship counseling", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400" },
                { name: "Wedding planning", image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400" },
                { name: "Interior decorating", image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400" }
            ]
        },
        friendMatch: ["Yellow", "White"],
        loveMatch: ["Red", "Blue", "Black"],
        futureCareer: [
            "Child Psychologist",
            "Early Childhood Educator",
            "Marriage Counselor",
            "Life Coach",
            "Non-Profit Humanitarian Worker",
            "Nurse",
            "Social Worker",
            "Wedding Planner",
            "Art Therapist",
            "Community Support Coordinator"
        ],
        growthAreas: [
            "Set healthy boundaries",
            "Practice self-advocacy",
            "Address conflicts constructively",
            "Build resilience to criticism"
        ]
    },
    GREY: {
        name: "GREY",
        title: "The Calm & Logical",
        description: "Prefers neutrality and avoids drama. Thinks logically and doesn't let emotions control decisions. Values privacy and independence.",
        strengths: [
            "Excellent at staying calm under pressure",
            "Objective and fair-minded",
            "Good at seeing all perspectives",
            "Reliable in crisis situations",
            "Efficient and practical"
        ],
        weaknesses: [
            "May seem emotionally detached",
            "Could be perceived as boring or cold",
            "Might avoid taking sides when needed",
            "Sometimes too reserved with feelings"
        ],
        cartoonReferences: [
            "Nick Fury from Marvel - Calm under pressure, strategic, objective decision-maker",
            "Professor X from X-Men - Calm, rational, sees all perspectives, wise counselor",
            "Gandalf from Lord of the Rings - Wise, neutral advisor, sees the bigger picture",
            "Dumbledore from Harry Potter - Calm wisdom, objective judgment, strategic thinking",
            "Master Yoda from Star Wars - Calm, wise, objective, above emotional drama"
        ],
        maturityPath: {
            stages: [
                "Emotional Avoidance Stage: Using logic to avoid dealing with feelings entirely",
                "Recognition Stage: Realizing that emotions provide valuable information",
                "Integration Stage: Learning to factor emotions into logical decision-making",
                "Wise Counselor Stage: Helping others balance logic and emotion effectively"
            ],
            environmentalAdaptation: "Matures by learning that emotions aren't the enemy of logic - they're additional data. Adapts to environments by becoming the calm voice of reason who can also understand and validate emotional perspectives. Develops emotional intelligence while maintaining their natural objectivity.",
            maturityMarkers: [
                "Expresses opinions when they matter, even if controversial",
                "Shows emotional support to friends and family",
                "Takes stands on important issues instead of remaining neutral",
                "Uses their calm nature to help others process emotions"
            ]
        },
        fashionStyle: {
            primaryStyle: "Neutral Minimalism",
            keyElements: [
                "Neutral color palette (grey, black, white, navy)",
                "Clean, simple lines",
                "Quality basics that mix and match",
                "Minimal, functional accessories",
                "Classic, timeless pieces"
            ],
            occasions: {
                casual: "Grey sweater, dark jeans, simple sneakers, minimal watch",
                formal: "Charcoal suit, white shirt, simple tie, quality leather shoes",
                creative: "Grey blazer, neutral shirt, dark pants, understated accessories"
            },
            avoids: [
                "Bright, attention-grabbing colors",
                "Overly trendy or flashy items",
                "Anything that draws unnecessary attention",
                "Complicated patterns or designs"
            ]
        },
        underPressure: {
            colorShift: "Becomes BLUE - over-analysis and rigid logical thinking",
            behaviorChanges: [
                "Complete emotional shutdown and withdrawal from others",
                "Over-analysis of every situation leading to decision paralysis",
                "May become critical of others' 'illogical' emotional responses",
                "Increased isolation and reluctance to engage with others"
            ],
            warningSign: "When they stop participating in group discussions and become completely withdrawn",
            recoveryNeeds: [
                "Quiet, structured environment to process thoughts",
                "Intellectual activities that engage their analytical mind",
                "Gradually increasing social interaction at their own pace",
                "Respect for their need to process emotions logically"
            ],
            supportStrategies: [
                "Don't force emotional conversations or decisions",
                "Provide logical frameworks for understanding emotional situations",
                "Give them time and space to process",
                "Appreciate their objective perspective without demanding emotional input"
            ]
        },
        struggles: {
            main: "Emotional Detachment & Social Isolation",
            details: "Grey personalities often struggle with connecting emotionally with others and may be perceived as indifferent or cold. They can miss out on meaningful relationships due to their neutral stance on everything.",
            symptoms: [
                "Feeling like an outsider in emotional situations",
                "Others describing you as 'hard to read' or distant",
                "Avoiding situations that require emotional investment",
                "Difficulty forming deep, meaningful relationships"
            ]
        },
        solutions: {
            title: "Adding Color to Your Grey World",
            strategies: [
                "Practice expressing opinions on low-stakes topics to build comfort",
                "Set reminders to check in emotionally with friends and family",
                "Find one cause or interest you can be passionate about",
                "Ask trusted friends to help you understand emotional nuances",
                "Challenge yourself to take a stance on issues that matter to you"
            ],
            dailyPractice: "Share one personal opinion or feeling with someone each day, even if it feels uncomfortable."
        },
        interests: {
            favoriteMovies: ["The Shawshank Redemption", "12 Angry Men", "The Prestige", "Arrival", "Zodiac"],
            favoriteMusic: [
                { genre: "Instrumental", spotify: "37i9dQZF1DX4sWSpwq3LiO", youtube: "1ZYbU82GVz4" },
                { genre: "Ambient", spotify: "37i9dQZF1DX3Ogo9pFvBkY", youtube: "M5QGkOGZubQ" },
                { genre: "Lo-fi", spotify: "37i9dQZF1DWWQRwui0ExPn", youtube: "jfKfPfyJRdk" }
            ],
            hobbies: [
                { name: "Documentaries", image: "https://images.unsplash.com/photo-1489599032931-25c03d30f1c7?w=400" },
                { name: "True crime", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400" },
                { name: "Meditation", image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400" },
                { name: "Chess", image: "https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=400" },
                { name: "Crossword puzzles", image: "https://images.unsplash.com/photo-1606092195730-5d7b9af1efc5?w=400" },
                { name: "Neutral arbitration", image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400" }
            ]
        },
        friendMatch: ["Black", "Chocolate"],
        loveMatch: ["Chocolate", "Green"],
        futureCareer: [
            "Arbitrator",
            "Management Consultant",
            "Policy Analyst",
            "Legal Mediator",
            "Compliance Officer",
            "Business Strategist",
            "Technical Writer",
            "Crisis Management Specialist",
            "Systems Auditor",
            "Neutral Third-Party Investigator"
        ],
        growthAreas: [
            "Express emotions more openly",
            "Take positions when appropriate",
            "Show more personal warmth",
            "Engage in social activities"
        ]
    }
};

// Career icons mapping
const careerIcons = {
    "Research Scientist": "fas fa-microscope",
    "Cybersecurity Specialist": "fas fa-shield-alt",
    "Data Analyst": "fas fa-chart-bar",
    "Detective": "fas fa-search",
    "Philosopher": "fas fa-brain",
    "Strategic Consultant": "fas fa-chess",
    "Independent Journalist": "fas fa-newspaper",
    "Software Architect": "fas fa-code",
    "Intelligence Analyst": "fas fa-eye",
    "Academic Researcher": "fas fa-graduation-cap",
    "Mediator": "fas fa-handshake",
    "Human Rights Lawyer": "fas fa-balance-scale",
    "Counselor": "fas fa-comments",
    "Non-Profit Director": "fas fa-heart",
    "Social Worker": "fas fa-users",
    "Peace Negotiator": "fas fa-dove",
    "Healthcare Administrator": "fas fa-hospital",
    "Diplomat": "fas fa-globe",
    "Ethics Consultant": "fas fa-compass",
    "Educational Coordinator": "fas fa-chalkboard-teacher",
    "Entrepreneur": "fas fa-rocket",
    "Sales Executive": "fas fa-handshake",
    "Sports Coach": "fas fa-trophy",
    "Military Strategic Planner": "fas fa-medal",
    "Political Leader": "fas fa-landmark",
    "Emergency Services Manager": "fas fa-ambulance",
    "Investment Banker": "fas fa-chart-line",
    "Professional Athlete": "fas fa-running",
    "Business Consultant": "fas fa-briefcase",
    "Competition Strategist": "fas fa-chess-knight",
    "Financial Analyst": "fas fa-calculator",
    "Software Engineer": "fas fa-laptop-code",
    "Systems Architect": "fas fa-sitemap",
    "Quality Assurance Specialist": "fas fa-check-circle",
    "Accountant": "fas fa-coins",
    "Technical Project Manager": "fas fa-tasks",
    "Mathematician": "fas fa-square-root-alt",
    "Engineering Consultant": "fas fa-cogs",
    "Motivational Speaker": "fas fa-microphone",
    "Event Planner": "fas fa-calendar-alt",
    "Entertainment Producer": "fas fa-film",
    "Creative Director": "fas fa-palette",
    "Marketing Specialist": "fas fa-bullhorn",
    "Stand-up Comedian": "fas fa-laugh",
    "Travel Blogger": "fas fa-plane",
    "Public Relations Manager": "fas fa-megaphone",
    "Social Media Influencer": "fas fa-hashtag",
    "Innovation Consultant": "fas fa-lightbulb",
    "Financial Planner": "fas fa-piggy-bank",
    "Operations Manager": "fas fa-clipboard-list",
    "Supply Chain Specialist": "fas fa-truck",
    "Agricultural Economist": "fas fa-seedling",
    "Environmental Sustainability Consultant": "fas fa-leaf",
    "Risk Management Analyst": "fas fa-exclamation-triangle",
    "Urban Planner": "fas fa-city",
    "Investment Portfolio Manager": "fas fa-chart-pie",
    "Resource Management Specialist": "fas fa-boxes",
    "Graphic Designer": "fas fa-paint-brush",
    "Art Director": "fas fa-images",
    "Film Maker": "fas fa-video",
    "Creative Writer": "fas fa-pen-fancy",
    "UX/UI Designer": "fas fa-mobile-alt",
    "Video Game Designer": "fas fa-gamepad",
    "Architect": "fas fa-drafting-compass",
    "Fashion Designer": "fas fa-tshirt",
    "Innovation Strategist": "fas fa-rocket",
    "Performance Artist": "fas fa-theater-masks"
};

document.addEventListener('DOMContentLoaded', () => {
    console.log('=== Profile AI JS loaded ===');
    
    // Initialize the profile AI
    initializeProfileAI();
    
    // Set up auto-refresh mechanism to detect personality changes
    setupAutoRefresh();
    
    // Listen for storage changes (when personality is updated from profile page)
    window.addEventListener('storage', handleStorageChange);
    
    // Listen for custom events (for same-tab updates)
    window.addEventListener('personalityUpdated', handlePersonalityUpdate);
});

function initializeProfileAI() {
    console.log('🚀 Initializing Profile AI...');
    
    // Get fresh user data from storage
    let currentUser = window.utils.storage.get('currentUser');
    
    console.log('🔍 Initial currentUser check:', currentUser);
    
    if (!currentUser) {
        console.log('❌ No user logged in');
        document.getElementById('login-required').style.display = 'flex';
        return;
    }
    
    // Try to get the most up-to-date user data from users array
    const users = window.utils.storage.get('users') || [];
    const updatedUser = users.find(u => u.id === currentUser.id);
    
    if (updatedUser) {
        console.log('✅ Found updated user data in users array');
        currentUser = updatedUser;
        // Update currentUser in storage to sync
        window.utils.storage.set('currentUser', currentUser);
    }
    
    console.log('📊 Final currentUser data:', currentUser);
    console.log('🎨 User personality data:', currentUser.personality);
    
    // Enhanced personality validation
    const personalityValidation = validatePersonalityData(currentUser.personality);
    console.log('🔬 Personality validation:', personalityValidation);
    
    if (!personalityValidation.isValid) {
        console.log('❌ Invalid personality data:', personalityValidation.reason);
        document.getElementById('no-test-results').style.display = 'flex';
        return;
    }
    
    console.log('✅ Valid personality data found - Building Profile AI');
    console.log('🎯 Primary personality:', currentUser.personality[0].name);
    
    // Store current user for auto-refresh
    currentProfileUser = currentUser;
    
    // Hide other containers and show profile AI
    document.getElementById('login-required').style.display = 'none';
    document.getElementById('no-test-results').style.display = 'none';
    document.getElementById('profileai-container').style.display = 'block';
    
    // Apply personality theme
    applyPersonalityTheme(currentUser.personality[0].name);
    
    // Build the profile AI interface
    buildProfileAI(currentUser);
}

// Apply dynamic background theme based on personality
function applyPersonalityTheme(primaryPersonality) {
    console.log('🎨 Applying personality theme for:', primaryPersonality);
    
    const theme = personalityThemes[primaryPersonality];
    if (!theme) {
        console.warn('⚠️ No theme found for personality:', primaryPersonality);
        return;
    }
    
    // Remove existing theme classes
    document.body.classList.remove(...Object.keys(personalityThemes).map(p => `theme-${p.toLowerCase()}`));
    
    // Add new theme class
    document.body.classList.add(`theme-${primaryPersonality.toLowerCase()}`);
    
    // Create or update dynamic styles
    let themeStyle = document.getElementById('personality-theme-style');
    if (!themeStyle) {
        themeStyle = document.createElement('style');
        themeStyle.id = 'personality-theme-style';
        document.head.appendChild(themeStyle);
    }
    
    themeStyle.textContent = `
        /* Dynamic Personality Theme for ${primaryPersonality} */
        body.theme-${primaryPersonality.toLowerCase()} {
            background: ${theme.background};
            background-size: 400% 400%;
            animation: gradientShift 15s ease infinite;
            position: relative;
            min-height: 100vh;
        }
        
        body.theme-${primaryPersonality.toLowerCase()}::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: ${theme.pattern};
            z-index: -2;
            pointer-events: none;
        }
        
        body.theme-${primaryPersonality.toLowerCase()}::after {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: ${theme.overlay};
            background-size: 100px 100px;
            z-index: -1;
            pointer-events: none;
            opacity: 0.3;
        }
        
        .theme-${primaryPersonality.toLowerCase()} .profileai-container {
            position: relative;
            z-index: 1;
        }
        
        .theme-${primaryPersonality.toLowerCase()} .user-overview,
        .theme-${primaryPersonality.toLowerCase()} .analysis-section,
        .theme-${primaryPersonality.toLowerCase()} .personality-card,
        .theme-${primaryPersonality.toLowerCase()} .compatibility-card,
        .theme-${primaryPersonality.toLowerCase()} .career-item,
        .theme-${primaryPersonality.toLowerCase()} .growth-item {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.2);
            box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }
        
        .theme-${primaryPersonality.toLowerCase()} .interests-section {
            background: rgba(255, 255, 255, 0.9);
            backdrop-filter: blur(15px);
            border: 1px solid rgba(255, 255, 255, 0.3);
        }
        
        .theme-${primaryPersonality.toLowerCase()} .interest-category,
        .theme-${primaryPersonality.toLowerCase()} .hobby-item,
        .theme-${primaryPersonality.toLowerCase()} .movie-item {
            background: rgba(255, 255, 255, 0.8);
            backdrop-filter: blur(5px);
        }
        
        .theme-${primaryPersonality.toLowerCase()} .profileai-header {
            background: ${theme.background};
            position: relative;
            overflow: hidden;
        }
        
        .theme-${primaryPersonality.toLowerCase()} .profileai-header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: ${theme.pattern};
            opacity: 0.5;
        }
        
        .theme-${primaryPersonality.toLowerCase()} .navbar {
            backdrop-filter: blur(20px);
            background: rgba(255, 255, 255, 0.95);
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        
        /* Floating elements for enhanced theme */
        .theme-${primaryPersonality.toLowerCase()} .floating-elements {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
        }
        
        .theme-${primaryPersonality.toLowerCase()} .floating-elements::before,
        .theme-${primaryPersonality.toLowerCase()} .floating-elements::after {
            content: '';
            position: absolute;
            width: 200px;
            height: 200px;
            border-radius: 50%;
            background: radial-gradient(circle, ${theme.accentColor}20 0%, transparent 70%);
            animation: float 20s infinite linear;
        }
        
        .theme-${primaryPersonality.toLowerCase()} .floating-elements::before {
            top: 20%;
            left: 10%;
            animation-delay: 0s;
        }
        
        .theme-${primaryPersonality.toLowerCase()} .floating-elements::after {
            bottom: 20%;
            right: 10%;
            animation-delay: 10s;
        }
        
        @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); }
            33% { transform: translateY(-20px) rotate(120deg); }
            66% { transform: translateY(20px) rotate(240deg); }
            100% { transform: translateY(0px) rotate(360deg); }
        }
    `;
    
    // Add floating elements
    let floatingElements = document.querySelector('.floating-elements');
    if (!floatingElements) {
        floatingElements = document.createElement('div');
        floatingElements.className = 'floating-elements';
        document.body.appendChild(floatingElements);
    }
    
    console.log('✅ Personality theme applied successfully');
}

// Auto-refresh mechanism to detect personality changes
function setupAutoRefresh() {
    console.log('🔄 Setting up auto-refresh mechanism...');
    
    // Check for personality changes every 2 seconds
    refreshInterval = setInterval(() => {
        if (currentProfileUser) {
            checkForPersonalityUpdates();
        }
    }, 2000);
    
    console.log('✅ Auto-refresh setup complete');
}

function checkForPersonalityUpdates() {
    const users = window.utils.storage.get('users') || [];
    const currentUser = window.utils.storage.get('currentUser');
    
    if (!currentUser || !currentProfileUser) return;
    
    // Find the latest user data
    const latestUser = users.find(u => u.id === currentUser.id) || currentUser;
    
    // Check if personality has changed
    const currentPersonalityString = JSON.stringify(currentProfileUser.personality);
    const latestPersonalityString = JSON.stringify(latestUser.personality);
    
    if (currentPersonalityString !== latestPersonalityString) {
        console.log('🔄 Personality change detected! Refreshing Profile AI...');
        console.log('Previous:', currentProfileUser.personality);
        console.log('Latest:', latestUser.personality);
        
        // Update current user and rebuild
        currentProfileUser = latestUser;
        window.utils.storage.set('currentUser', latestUser);
        
        // Show update notification
        showUpdateNotification('Personality profile updated! Refreshing analysis...');
        
        // Apply new theme
        applyPersonalityTheme(latestUser.personality[0].name);
        
        // Rebuild the profile AI with new data
        setTimeout(() => {
            buildProfileAI(latestUser);
        }, 500);
    }
}

function handleStorageChange(event) {
    if (event.key === 'currentUser' || event.key === 'users') {
        console.log('🔄 Storage change detected:', event.key);
        setTimeout(() => {
            checkForPersonalityUpdates();
        }, 100);
    }
}

function handlePersonalityUpdate(event) {
    console.log('🔄 Personality update event received:', event.detail);
    setTimeout(() => {
        initializeProfileAI();
    }, 100);
}

// Enhanced personality data validation function
function validatePersonalityData(personality) {
    console.log('🔍 Validating personality data:', personality);
    
    if (!personality) {
        return { isValid: false, reason: 'Personality is null or undefined' };
    }
    
    if (!Array.isArray(personality)) {
        return { isValid: false, reason: 'Personality is not an array' };
    }
    
    if (personality.length === 0) {
        return { isValid: false, reason: 'Personality array is empty' };
    }
    
    if (!personality[0]) {
        return { isValid: false, reason: 'First personality item is null or undefined' };
    }
    
    if (!personality[0].name) {
        return { isValid: false, reason: 'First personality item has no name property' };
    }
    
    if (!personalityData[personality[0].name]) {
        return { isValid: false, reason: `No personality data found for color: ${personality[0].name}` };
    }
    
    return { isValid: true, reason: 'Valid personality data' };
}

function buildProfileAI(user) {
    console.log('🏗️ Building Profile AI for user:', user.name);
    
    try {
        // Build user overview
        buildUserOverview(user);
        console.log('✅ User overview built');
        
        // Build personality analysis (now shows all three personalities with enhanced data)
        buildPersonalityAnalysis(user);
        console.log('✅ Personality analysis built');
        
        // Build compatibility analysis
        buildCompatibilityAnalysis(user);
        console.log('✅ Compatibility analysis built');
        
        // Build career guidance
        buildCareerGuidance(user);
        console.log('✅ Career guidance built');
        
        // Build personal growth recommendations
        buildPersonalGrowth(user);
        console.log('✅ Personal growth built');
        
        // Set up download report functionality
        setupDownloadReport(user);
        console.log('✅ Download report setup complete');
        
        console.log('🎉 Profile AI build completed successfully!');
        
        // Add smooth scroll animation to top
        document.querySelector('.profileai-header').scrollIntoView({ 
            behavior: 'smooth',
            block: 'start'
        });
        
    } catch (error) {
        console.error('❌ Error building Profile AI:', error);
        
        // Show error message to user
        const container = document.getElementById('profileai-container');
        container.innerHTML = `
            <div class="error-message" style="text-align: center; padding: 2rem; background: rgba(255, 255, 255, 0.95); border-radius: 10px; margin: 2rem 0; backdrop-filter: blur(10px);">
                <h2 style="color: #e53e3e;">Error Loading Profile</h2>
                <p>There was an error loading your personality analysis. Please try refreshing the page or retaking the test.</p>
                <a href="test.html" class="button button-primary">Retake Test</a>
            </div>
        `;
    }
}

function buildUserOverview(user) {
    console.log('🏗️ Building user overview...');
    const container = document.getElementById('user-overview');
    
    const joinDate = new Date(user.joinDate).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Ensure we have personality data
    if (!user.personality || user.personality.length === 0) {
        console.error('❌ No personality data available for user overview');
        return;
    }
    
    // Get primary personality data for interests
    const primaryPersonality = personalityData[user.personality[0].name];
    
    container.innerHTML = `
        <div class="overview-header">
            <img src="${user.avatar}" alt="${user.name}" class="user-avatar">
            <div class="user-info">
                <h2>${user.name}</h2>
                <p><strong>Username:</strong> @${user.nickname}</p>
                <p><strong>Member since:</strong> ${joinDate}</p>
                <p><strong>Tests completed:</strong> ${user.personalityHistory ? user.personalityHistory.length : 1}</p>
            </div>
        </div>
        
        <div class="personality-overview">
            ${user.personality.slice(0, 3).map((color, index) => {
                const labels = ['primary', 'secondary', 'tertiary'];
                const labelNames = ['Primary', 'Secondary', 'Tertiary'];
                
                // Ensure color has required properties
                const colorName = color.name || 'UNKNOWN';
                const colorHex = color.color || '#CCCCCC';
                
                console.log(`🎨 Processing color ${index + 1}:`, { colorName, colorHex });
                
                return `
                    <div class="personality-summary ${labels[index]}" style="background: linear-gradient(135deg, ${colorHex}, ${adjustColorBrightness(colorHex, -20)});">
                        <div class="personality-name">${colorName}</div>
                        <div class="personality-label">${labelNames[index]}</div>
                    </div>
                `;
            }).join('')}
        </div>
        
        ${primaryPersonality ? `
        <div class="interests-section">
            <h3><i class="fas fa-heart"></i> Personal Interests & Media</h3>
            <p style="color: #4a5568; margin-bottom: 1.5rem;">Based on your ${user.personality[0].name} personality, here are some interests that typically resonate with people like you:</p>
            
            <div class="interests-grid">
                <div class="interest-category">
                    <h4><i class="fas fa-film"></i> Favorite Movies</h4>
                    <div class="movie-list">
                        ${primaryPersonality.interests.favoriteMovies.slice(0, 3).map(movie => 
                            `<div class="movie-item">
                                <span class="movie-title">${movie}</span>
                            </div>`
                        ).join('')}
                    </div>
                </div>
                
                <div class="interest-category music-category">
                    <h4><i class="fas fa-music"></i> Music Preferences</h4>
                    <div class="music-grid">
                        ${primaryPersonality.interests.favoriteMusic.slice(0, 2).map(music => `
                            <div class="music-item">
                                <h5>${music.genre}</h5>
                                <div class="media-embeds">
                                    <div class="spotify-embed">
                                        <iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/${music.spotify}?utm_source=generator&theme=0" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                                    </div>
                                    <div class="youtube-embed">
                                        <iframe width="100%" height="152" src="https://www.youtube.com/embed/${music.youtube}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                                    </div>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="interest-category hobbies-category">
                    <h4><i class="fas fa-palette"></i> Hobbies & Activities</h4>
                    <div class="hobbies-grid">
                        ${primaryPersonality.interests.hobbies.slice(0, 6).map(hobby => `
                            <div class="hobby-item">
                                <div class="hobby-image">
                                    <img src="${hobby.image}" alt="${hobby.name}" loading="lazy" onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgdmlld0JveD0iMCAwIDQwMCAzMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMzAwIiBmaWxsPSIjRjdGQUZDIi8+CjxwYXRoIGQ9Ik0yMDAgMTUwTDE3NSAxMjVIMjI1TDIwMCAxNTBaIiBmaWxsPSIjOUNBM0FGIi8+CjwvU3ZnPgo='">
                                </div>
                                <div class="hobby-name">${hobby.name}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            
            <div style="background: rgba(247, 250, 252, 0.8); padding: 1rem; border-radius: 8px; margin-top: 1.5rem; backdrop-filter: blur(5px);">
                <p style="color: #4a5568; font-size: 0.9rem; font-style: italic;">
                    <i class="fas fa-lightbulb" style="color: #667eea;"></i>
                    These suggestions are based on common patterns among ${user.personality[0].name} personalities. Click play on the music to discover new sounds, and explore the hobby images for inspiration!
                </p>
            </div>
        </div>
        ` : ''}
    `;
    
    console.log('✅ User overview HTML generated');
}

function buildPersonalityAnalysis(user) {
    console.log('🏗️ Building personality analysis...');
    const container = document.getElementById('personality-analysis');
    
    // Build cards for all three personalities (Primary, Secondary, Tertiary) with enhanced information
    const personalityCards = user.personality.slice(0, 3).map((color, index) => {
        const data = personalityData[color.name];
        const labels = ['Primary', 'Secondary', 'Tertiary'];
        const priorities = ['Most Dominant', 'Secondary Influence', 'Supporting Trait'];
        
        console.log(`🔍 Processing personality card ${index + 1} for ${color.name}:`, data);
        
        // Handle case where personality data might not exist
        if (!data) {
            console.warn(`⚠️ No personality data found for color: ${color.name}`);
            return `
                <div class="personality-card">
                    <div class="card-header" style="background: linear-gradient(135deg, ${color.color}, ${adjustColorBrightness(color.color, -20)});">
                        <div class="card-title">
                            <span class="color-name">${color.name}</span>
                            <span class="color-badge">${labels[index]}</span>
                        </div>
                        <div class="color-title">Unknown Personality Type</div>
                        <div class="color-priority">${priorities[index]}</div>
                    </div>
                    <div class="card-body">
                        <p class="description">Personality data not available for this color.</p>
                    </div>
                </div>
            `;
        }
        
        // Only show detailed information for primary personality
        const isDetailedView = index === 0;
        
        return `
            <div class="personality-card" style="animation-delay: ${index * 0.2}s;">
                <div class="card-header" style="background: linear-gradient(135deg, ${color.color}, ${adjustColorBrightness(color.color, -20)});">
                    <div class="card-title">
                        <span class="color-name">${color.name}</span>
                        <span class="color-badge">${labels[index]}</span>
                    </div>
                    <div class="color-title">${data.title}</div>
                    <div class="color-priority">${priorities[index]}</div>
                </div>
                
                <div class="card-body">
                    <div class="personality-percentage" style="margin-bottom: 1rem;">
                        <div class="percentage-label">Influence Level: <strong>${color.percentage || 'N/A'}%</strong></div>
                    </div>
                    
                    <p class="description">${data.description}</p>
                    
                    ${isDetailedView && data.cartoonReferences ? `
                    <div class="cartoon-references-section" style="margin: 1.5rem 0; padding: 1rem; background: rgba(240, 248, 255, 0.9); border-radius: 8px; border-left: 4px solid #4299e1; backdrop-filter: blur(5px);">
                        <h4 style="color: #2a69ac; margin-bottom: 0.75rem;">
                            <i class="fas fa-tv" style="color: #4299e1;"></i> 
                            Character References - You're Like These Characters:
                        </h4>
                        <ul style="color: #2a69ac; font-size: 0.85rem; margin: 0; padding-left: 1.2rem; line-height: 1.4;">
                            ${data.cartoonReferences.map(ref => `<li style="margin-bottom: 0.5rem;">${ref}</li>`).join('')}
                        </ul>
                        <p style="color: #2a69ac; font-size: 0.8rem; margin-top: 0.75rem; font-style: italic;">
                            These characters share similar personality traits, decision-making patterns, and life approaches as your ${color.name} personality type.
                        </p>
                    </div>
                    ` : ''}
                    
                    ${isDetailedView && data.maturityPath ? `
                    <div class="maturity-path-section" style="margin: 1.5rem 0; padding: 1rem; background: rgba(250, 245, 255, 0.9); border-radius: 8px; border-left: 4px solid #805ad5; backdrop-filter: blur(5px);">
                        <h4 style="color: #553c9a; margin-bottom: 0.75rem;">
                            <i class="fas fa-seedling" style="color: #805ad5;"></i> 
                            Your Maturity & Growth Path:
                        </h4>
                        <div style="margin-bottom: 0.75rem;">
                            <strong style="color: #553c9a; font-size: 0.85rem;">Maturity Stages:</strong>
                        </div>
                        <ol style="color: #553c9a; font-size: 0.8rem; margin-bottom: 0.75rem; padding-left: 1.2rem; line-height: 1.4;">
                            ${data.maturityPath.stages.map(stage => `<li style="margin-bottom: 0.4rem;">${stage}</li>`).join('')}
                        </ol>
                        <div style="background: rgba(237, 235, 254, 0.8); padding: 0.75rem; border-radius: 6px; margin-bottom: 0.75rem; backdrop-filter: blur(3px);">
                            <strong style="color: #553c9a; font-size: 0.8rem;">🌱 Environmental Adaptation:</strong>
                            <p style="color: #553c9a; font-size: 0.8rem; margin: 0.25rem 0 0 0; line-height: 1.4;">
                                ${data.maturityPath.environmentalAdaptation}
                            </p>
                        </div>
                        <div style="margin-bottom: 0.5rem;">
                            <strong style="color: #553c9a; font-size: 0.8rem;">✨ Signs of Maturity:</strong>
                        </div>
                        <ul style="color: #553c9a; font-size: 0.75rem; margin: 0; padding-left: 1.2rem; line-height: 1.3;">
                            ${data.maturityPath.maturityMarkers.map(marker => `<li style="margin-bottom: 0.3rem;">${marker}</li>`).join('')}
                        </ul>
                    </div>
                    ` : ''}
                    
                    ${isDetailedView && data.fashionStyle ? `
                    <div class="fashion-style-section" style="margin: 1.5rem 0; padding: 1rem; background: rgba(255, 247, 237, 0.9); border-radius: 8px; border-left: 4px solid #f6ad55; backdrop-filter: blur(5px);">
                        <h4 style="color: #c05621; margin-bottom: 0.75rem;">
                            <i class="fas fa-tshirt" style="color: #f6ad55;"></i> 
                            Your Fashion Style: ${data.fashionStyle.primaryStyle}
                        </h4>
                        <div style="margin-bottom: 0.75rem;">
                            <strong style="color: #c05621; font-size: 0.85rem;">Key Style Elements:</strong>
                        </div>
                        <ul style="color: #c05621; font-size: 0.8rem; margin-bottom: 0.75rem; padding-left: 1.2rem; line-height: 1.4;">
                            ${data.fashionStyle.keyElements.map(element => `<li style="margin-bottom: 0.3rem;">${element}</li>`).join('')}
                        </ul>
                        <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0.75rem; margin-bottom: 0.75rem;">
                            <div style="background: rgba(254, 215, 170, 0.6); padding: 0.5rem; border-radius: 4px; backdrop-filter: blur(2px);">
                                <strong style="color: #c05621; font-size: 0.75rem;">Casual:</strong>
                                <p style="color: #c05621; font-size: 0.7rem; margin: 0.25rem 0 0 0; line-height: 1.3;">${data.fashionStyle.occasions.casual}</p>
                            </div>
                            <div style="background: rgba(254, 215, 170, 0.6); padding: 0.5rem; border-radius: 4px; backdrop-filter: blur(2px);">
                                <strong style="color: #c05621; font-size: 0.75rem;">Formal:</strong>
                                <p style="color: #c05621; font-size: 0.7rem; margin: 0.25rem 0 0 0; line-height: 1.3;">${data.fashionStyle.occasions.formal}</p>
                            </div>
                            <div style="background: rgba(254, 215, 170, 0.6); padding: 0.5rem; border-radius: 4px; backdrop-filter: blur(2px);">
                                <strong style="color: #c05621; font-size: 0.75rem;">Creative:</strong>
                                <p style="color: #c05621; font-size: 0.7rem; margin: 0.25rem 0 0 0; line-height: 1.3;">${data.fashionStyle.occasions.creative}</p>
                            </div>
                        </div>
                        <div style="margin-bottom: 0.5rem;">
                            <strong style="color: #c05621; font-size: 0.8rem;">Style to Avoid:</strong>
                        </div>
                        <ul style="color: #c05621; font-size: 0.75rem; margin: 0; padding-left: 1.2rem; line-height: 1.3;">
                            ${data.fashionStyle.avoids.map(avoid => `<li style="margin-bottom: 0.3rem;">${avoid}</li>`).join('')}
                        </ul>
                    </div>
                    ` : ''}
                    
                    ${isDetailedView && data.underPressure ? `
                    <div class="under-pressure-section" style="margin: 1.5rem 0; padding: 1rem; background: rgba(254, 242, 242, 0.9); border-radius: 8px; border-left: 4px solid #f56565; backdrop-filter: blur(5px);">
                        <h4 style="color: #c53030; margin-bottom: 0.75rem;">
                            <i class="fas fa-exclamation-triangle" style="color: #f56565;"></i> 
                            How You Change Under Pressure:
                        </h4>
                        <div style="background: rgba(255, 235, 235, 0.8); padding: 0.75rem; border-radius: 6px; margin-bottom: 0.75rem; backdrop-filter: blur(3px);">
                            <strong style="color: #c53030; font-size: 0.8rem;">🎭 Color Shift:</strong>
                            <p style="color: #c53030; font-size: 0.8rem; margin: 0.25rem 0 0 0; font-weight: 600;">
                                ${data.underPressure.colorShift}
                            </p>
                        </div>
                        <div style="margin-bottom: 0.75rem;">
                            <strong style="color: #c53030; font-size: 0.85rem;">Behavior Changes:</strong>
                        </div>
                        <ul style="color: #c53030; font-size: 0.8rem; margin-bottom: 0.75rem; padding-left: 1.2rem; line-height: 1.4;">
                            ${data.underPressure.behaviorChanges.map(change => `<li style="margin-bottom: 0.3rem;">${change}</li>`).join('')}
                        </ul>
                        <div style="background: rgba(255, 235, 235, 0.8); padding: 0.75rem; border-radius: 6px; margin-bottom: 0.75rem; backdrop-filter: blur(3px);">
                            <strong style="color: #c53030; font-size: 0.8rem;">⚠️ Warning Sign:</strong>
                            <p style="color: #c53030; font-size: 0.8rem; margin: 0.25rem 0 0 0; line-height: 1.4;">
                                ${data.underPressure.warningSign}
                            </p>
                        </div>
                        <div style="margin-bottom: 0.75rem;">
                            <strong style="color: #c53030; font-size: 0.85rem;">Recovery Needs:</strong>
                        </div>
                        <ul style="color: #c53030; font-size: 0.8rem; margin-bottom: 0.75rem; padding-left: 1.2rem; line-height: 1.4;">
                            ${data.underPressure.recoveryNeeds.map(need => `<li style="margin-bottom: 0.3rem;">${need}</li>`).join('')}
                        </ul>
                        <div style="margin-bottom: 0.5rem;">
                            <strong style="color: #c53030; font-size: 0.85rem;">Support Strategies:</strong>
                        </div>
                        <ul style="color: #c53030; font-size: 0.8rem; margin: 0; padding-left: 1.2rem; line-height: 1.4;">
                            ${data.underPressure.supportStrategies.map(strategy => `<li style="margin-bottom: 0.3rem;">${strategy}</li>`).join('')}
                        </ul>
                    </div>
                    ` : ''}
                    
                    <div class="traits-grid">
                        <div class="trait-section">
                            <h4><i class="fas fa-star" style="color: #48bb78;"></i> Strengths</h4>
                            <ul class="trait-list">
                                ${data.strengths.map(strength => `<li>${strength}</li>`).join('')}
                            </ul>
                        </div>
                        
                        <div class="trait-section">
                            <h4><i class="fas fa-exclamation-circle" style="color: #ed8936;"></i> Areas to Watch</h4>
                            <ul class="trait-list">
                                ${data.weaknesses.map(weakness => `<li>${weakness}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                    
                    ${data.struggles ? `
                    <div class="struggles-section" style="margin-top: 1.5rem; padding: 1rem; background: rgba(254, 245, 231, 0.9); border-radius: 8px; border-left: 4px solid #f6ad55; backdrop-filter: blur(5px);">
                        <h4 style="color: #c05621; margin-bottom: 0.5rem;">
                            <i class="fas fa-exclamation-triangle" style="color: #f6ad55;"></i> 
                            Common Struggle: ${data.struggles.main}
                        </h4>
                        <p style="color: #744210; font-size: 0.9rem; line-height: 1.5; margin-bottom: 0.75rem;">
                            ${data.struggles.details}
                        </p>
                        <div style="margin-bottom: 0.5rem;">
                            <strong style="color: #c05621; font-size: 0.85rem;">Warning Signs:</strong>
                        </div>
                        <ul style="color: #744210; font-size: 0.8rem; margin: 0; padding-left: 1.2rem;">
                            ${data.struggles.symptoms.map(symptom => `<li>${symptom}</li>`).join('')}
                        </ul>
                    </div>
                    ` : ''}
                    
                    ${data.solutions ? `
                    <div class="solutions-section" style="margin-top: 1rem; padding: 1rem; background: rgba(230, 255, 250, 0.9); border-radius: 8px; border-left: 4px solid #38b2ac; backdrop-filter: blur(5px);">
                        <h4 style="color: #234e52; margin-bottom: 0.5rem;">
                            <i class="fas fa-lightbulb" style="color: #38b2ac;"></i> 
                            ${data.solutions.title}
                        </h4>
                        <div style="margin-bottom: 0.75rem;">
                            <strong style="color: #234e52; font-size: 0.85rem;">Practical Strategies:</strong>
                        </div>
                        <ul style="color: #285e61; font-size: 0.8rem; margin-bottom: 0.75rem; padding-left: 1.2rem;">
                            ${data.solutions.strategies.map(strategy => `<li>${strategy}</li>`).join('')}
                        </ul>
                        <div style="background: rgba(178, 245, 234, 0.8); padding: 0.75rem; border-radius: 6px; border-left: 3px solid #319795; backdrop-filter: blur(3px);">
                            <strong style="color: #234e52; font-size: 0.8rem;">💡 Daily Practice:</strong>
                            <p style="color: #285e61; font-size: 0.8rem; margin: 0.25rem 0 0 0; font-style: italic;">
                                ${data.solutions.dailyPractice}
                            </p>
                        </div>
                    </div>
                    ` : ''}
                    
                    <div class="personality-influence" style="margin-top: 1.5rem; padding: 1rem; background: rgba(247, 250, 252, 0.8); border-radius: 8px; backdrop-filter: blur(5px);">
                        <h4 style="color: #2d3748; margin-bottom: 0.5rem;">
                            <i class="fas fa-lightbulb" style="color: #667eea;"></i> 
                            How This ${labels[index]} Color Influences You:
                        </h4>
                        <p style="color: #4a5568; font-size: 0.9rem; line-height: 1.5;">
                            ${getPersonalityInfluenceText(color.name, index)}
                        </p>
                    </div>
                </div>
            </div>
        `;
    }).join('');
    
    container.innerHTML = `
        <div class="analysis-section">
            <div class="section-header">
                <div class="section-icon">
                    <i class="fas fa-palette"></i>
                </div>
                <h2 class="section-title">Complete Personality Analysis</h2>
            </div>
            
            <div class="personality-blend-overview" style="background: rgba(247, 250, 252, 0.9); padding: 1.5rem; border-radius: 10px; margin-bottom: 2rem; backdrop-filter: blur(10px);">
                <h3 style="color: #2d3748; margin-bottom: 1rem;"><i class="fas fa-paint-brush"></i> Your Unique Personality Blend</h3>
                <p style="color: #4a5568; line-height: 1.6;">
                    Your personality is a unique combination of <strong>${user.personality[0].name}</strong> (primary), 
                    <strong>${user.personality[1]?.name || 'N/A'}</strong> (secondary), and 
                    <strong>${user.personality[2]?.name || 'N/A'}</strong> (tertiary) traits. 
                    This blend creates your distinctive approach to life, relationships, and decision-making. The detailed analysis below focuses primarily on your dominant ${user.personality[0].name} personality, including character references, maturity path, fashion style, and how you change under pressure.
                </p>
            </div>
            
            <div class="personality-cards">
                ${personalityCards}
            </div>
        </div>
    `;
    
    console.log('✅ Personality analysis HTML generated');
}

function getPersonalityInfluenceText(colorName, index) {
    const influences = {
        0: { // Primary
            BLACK: "As your dominant trait, this makes you naturally introspective and independent. You approach challenges with deep analysis and prefer to work through problems methodically.",
            WHITE: "This primary influence makes you a natural peacemaker who seeks harmony in all situations. You tend to consider everyone's perspective before making decisions.",
            RED: "Your primary red energy drives you to take charge and pursue ambitious goals. You're naturally competitive and thrive in high-energy environments.",
            BLUE: "This dominant trait makes you highly logical and systematic. You prefer to analyze situations thoroughly and make decisions based on facts and data.",
            YELLOW: "As your primary color, this fills you with optimism and social energy. You naturally lift others' spirits and prefer collaborative, dynamic environments.",
            GREEN: "This primary influence makes you naturally practical and steady. You prefer stability and approach changes with careful consideration.",
            PURPLE: "Your dominant purple energy fuels your creativity and unique perspective. You naturally think outside the box and value artistic expression.",
            CHOCOLATE: "This primary trait makes you naturally responsible and traditional. You value stability, loyalty, and prefer time-tested approaches.",
            PINK: "As your dominant color, this makes you naturally nurturing and empathetic. You're drawn to helping others and creating harmonious relationships.",
            GREY: "This primary influence makes you naturally calm and objective. You excel at seeing situations from multiple angles without emotional bias."
        },
        1: { // Secondary
            BLACK: "Your secondary black adds depth to your thinking and gives you moments of introspection that balance your primary traits.",
            WHITE: "This secondary influence brings a desire for peace and fairness that moderates your more intense primary characteristics.",
            RED: "Your secondary red provides bursts of energy and ambition that complement your primary personality style.",
            BLUE: "This secondary trait adds logical thinking and reliability to your personality mix, helping you make more balanced decisions.",
            YELLOW: "Your secondary yellow brings optimism and social warmth that lightens and balances your primary traits.",
            GREEN: "This secondary influence adds practical stability and helps ground your more dynamic primary characteristics.",
            PURPLE: "Your secondary purple adds creativity and unique thinking that enhances your primary personality expression.",
            CHOCOLATE: "This secondary trait brings responsibility and traditional values that provide structure to your personality.",
            PINK: "Your secondary pink adds empathy and nurturing qualities that soften and warm your primary traits.",
            GREY: "This secondary influence brings calm objectivity that helps balance any emotional extremes in your primary color."
        },
        2: { // Tertiary
            BLACK: "Your tertiary black provides occasional depth and independence that emerges in specific situations requiring analysis.",
            WHITE: "This tertiary influence appears as a subtle desire for harmony that surfaces when you need to mediate or find balance.",
            RED: "Your tertiary red gives you occasional bursts of assertiveness and energy when you need to take charge.",
            BLUE: "This tertiary trait provides logical backup thinking that emerges when you need to analyze complex situations.",
            YELLOW: "Your tertiary yellow surfaces as spontaneous optimism and social energy in the right circumstances.",
            GREEN: "This tertiary influence appears as practical wisdom and stability when you need to make grounded decisions.",
            PURPLE: "Your tertiary purple emerges as creative insights and unique solutions when conventional approaches aren't working.",
            CHOCOLATE: "This tertiary trait surfaces as traditional wisdom and responsible thinking in situations requiring stability.",
            PINK: "Your tertiary pink appears as gentle empathy and nurturing when others need emotional support.",
            GREY: "This tertiary influence emerges as objective thinking and calm analysis when emotions run high."
        }
    };
    
    return influences[index][colorName] || "This color adds unique qualities to your personality blend.";
}

function buildCompatibilityAnalysis(user) {
    console.log('🏗️ Building compatibility analysis...');
    const container = document.getElementById('compatibility-analysis');
    const primaryColor = personalityData[user.personality[0].name];
    
    // Handle case where personality data might not exist
    if (!primaryColor) {
        console.error(`❌ No personality data found for primary color: ${user.personality[0].name}`);
        container.innerHTML = `
            <div class="analysis-section">
                <div class="section-header">
                    <div class="section-icon">
                        <i class="fas fa-heart"></i>
                    </div>
                    <h2 class="section-title">Relationship Compatibility</h2>
                </div>
                <p>Unable to load compatibility data. Please try retaking the test.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = `
        <div class="analysis-section">
            <div class="section-header">
                <div class="section-icon">
                    <i class="fas fa-heart"></i>
                </div>
                <h2 class="section-title">Relationship Compatibility</h2>
            </div>
            
            <div class="compatibility-grid">
                <div class="compatibility-card">
                    <div class="compatibility-type">
                        <i class="fas fa-user-friends"></i>
                        Best Friend Matches
                    </div>
                    <div class="match-badges">
                        ${primaryColor.friendMatch.map(match => `<span class="match-badge">${match}</span>`).join('')}
                    </div>
                    <p style="margin-top: 1rem; color: #4a5568;">These personalities complement your social style and share similar values, making for strong, lasting friendships.</p>
                </div>
                
                <div class="compatibility-card">
                    <div class="compatibility-type">
                        <i class="fas fa-heart"></i>
                        Best Love Matches
                    </div>
                    <div class="match-badges">
                        ${primaryColor.loveMatch.map(match => `<span class="match-badge">${match}</span>`).join('')}
                    </div>
                    <p style="margin-top: 1rem; color: #4a5568;">These personalities create balanced romantic relationships with complementary strengths and mutual growth opportunities.</p>
                </div>
            </div>
            
            <div style="background: rgba(247, 250, 252, 0.9); padding: 1.5rem; border-radius: 10px; margin-top: 1.5rem; backdrop-filter: blur(10px);">
                <h4 style="color: #2d3748; margin-bottom: 1rem;"><i class="fas fa-lightbulb"></i> Compatibility Insights</h4>
                <p style="color: #4a5568; line-height: 1.6;">
                    As a <strong>${user.personality[0].name}</strong> personality, you bring unique qualities to relationships. 
                    Your secondary <strong>${user.personality[1]?.name || 'N/A'}</strong> traits add balance, while your tertiary 
                    <strong>${user.personality[2]?.name || 'N/A'}</strong> characteristics provide additional depth. 
                    Understanding compatibility can help you build stronger connections and navigate relationship challenges more effectively.
                </p>
            </div>
        </div>
    `;
    
    console.log('✅ Compatibility analysis HTML generated');
}

function buildCareerGuidance(user) {
    console.log('🏗️ Building career guidance...');
    const container = document.getElementById('career-guidance');
    const primaryColor = personalityData[user.personality[0].name];
    
    // Handle case where personality data might not exist
    if (!primaryColor) {
        console.error(`❌ No personality data found for primary color: ${user.personality[0].name}`);
        container.innerHTML = `
            <div class="analysis-section">
                <div class="section-header">
                    <div class="section-icon">
                        <i class="fas fa-briefcase"></i>
                    </div>
                    <h2 class="section-title">Career Guidance</h2>
                </div>
                <p>Unable to load career guidance data. Please try retaking the test.</p>
            </div>
        `;
        return;
    }
    
    container.innerHTML = `
        <div class="analysis-section">
            <div class="section-header">
                <div class="section-icon">
                    <i class="fas fa-briefcase"></i>
                </div>
                <h2 class="section-title">Career Guidance</h2>
            </div>
            
            <p style="color: #4a5568; margin-bottom: 2rem; line-height: 1.6;">
                Based on your <strong>${user.personality[0].name}</strong> primary personality with 
                <strong>${user.personality[1]?.name || 'N/A'}</strong> and <strong>${user.personality[2]?.name || 'N/A'}</strong> influences, 
                here are career paths that align with your natural strengths and preferences:
            </p>
            
            <div class="career-grid">
                ${primaryColor.futureCareer.map(career => `
                    <div class="career-item">
                        <div class="career-icon">
                            <i class="${careerIcons[career] || 'fas fa-briefcase'}"></i>
                        </div>
                        <div class="career-name">${career}</div>
                    </div>
                `).join('')}
            </div>
            
            <div style="background: rgba(247, 250, 252, 0.9); padding: 1.5rem; border-radius: 10px; margin-top: 2rem; border-left: 4px solid #667eea; backdrop-filter: blur(10px);">
                <h4 style="color: #2d3748; margin-bottom: 1rem;"><i class="fas fa-compass"></i> Career Development Tips</h4>
                <ul style="color: #4a5568; line-height: 1.6; margin: 0; padding-left: 1.5rem;">
                    <li>Focus on roles that leverage your natural ${user.personality[0].name.toLowerCase()} personality strengths</li>
                    <li>Consider work environments that match your preferred communication style</li>
                    <li>Look for opportunities to develop your secondary personality traits (${user.personality[1]?.name || 'N/A'})</li>
                    <li>Use your tertiary ${user.personality[2]?.name || 'N/A'} qualities as a unique differentiator</li>
                    <li>Seek mentors who complement your personality type for balanced guidance</li>
                </ul>
            </div>
        </div>
    `;
    
    console.log('✅ Career guidance HTML generated');
}

function buildPersonalGrowth(user) {
    console.log('🏗️ Building personal growth...');
    const container = document.getElementById('personal-growth');
    
    // Get growth recommendations for all personality colors
    const growthRecommendations = user.personality.slice(0, 3).map((color, index) => {
        const data = personalityData[color.name];
        const labels = ['Primary', 'Secondary', 'Tertiary'];
        
        // Handle case where personality data might not exist
        if (!data) {
            console.warn(`⚠️ No personality data found for color: ${color.name}`);
            return null;
        }
        
        return {
            color: color.name,
            label: labels[index],
            areas: data.growthAreas
        };
    }).filter(item => item !== null); // Remove null entries
    
    container.innerHTML = `
        <div class="analysis-section">
            <div class="section-header">
                <div class="section-icon">
                    <i class="fas fa-seedling"></i>
                </div>
                <h2 class="section-title">Personal Growth Recommendations</h2>
            </div>
            
            <p style="color: #4a5568; margin-bottom: 2rem; line-height: 1.6;">
                Personal growth involves developing all aspects of your personality. Here are targeted recommendations based on your complete color profile:
            </p>
            
            <div class="growth-recommendations">
                ${growthRecommendations.map((recommendation, index) => `
                    <div class="growth-item" style="animation-delay: ${index * 0.1}s;">
                        <div class="growth-title">
                            <i class="fas fa-arrow-up"></i>
                            ${recommendation.label} Color (${recommendation.color}) Growth Areas
                        </div>
                        <ul style="margin: 0.5rem 0 0 1.5rem; color: #4a5568;">
                            ${recommendation.areas.map(area => `<li>${area}</li>`).join('')}
                        </ul>
                    </div>
                `).join('')}
                
                <div class="growth-item" style="border-left-color: #8b5cf6; animation-delay: 0.3s;">
                    <div class="growth-title">
                        <i class="fas fa-balance-scale"></i>
                        Personality Balance Tips
                    </div>
                    <div class="growth-description">
                        Work on developing the traits from your secondary and tertiary colors to create a more well-rounded personality. 
                        This balance can help you adapt better to different situations and relationships.
                    </div>
                </div>
                
                <div class="growth-item" style="border-left-color: #f59e0b; animation-delay: 0.4s;">
                    <div class="growth-title">
                        <i class="fas fa-target"></i>
                        Daily Practice
                    </div>
                    <div class="growth-description">
                        Choose one growth area to focus on each week. Small, consistent actions lead to significant personal development over time. 
                        Track your progress and celebrate small wins along the way.
                    </div>
                </div>
                
                <div class="growth-item" style="border-left-color: #48bb78; animation-delay: 0.5s;">
                    <div class="growth-title">
                        <i class="fas fa-sync-alt"></i>
                        Update Your Profile
                    </div>
                    <div class="growth-description">
                        Remember that you can update your current personality selection from your profile page. 
                        This analysis will automatically refresh to reflect your chosen personality combination!
                    </div>
                </div>
            </div>
        </div>
    `;
    
    console.log('✅ Personal growth HTML generated');
}

function setupDownloadReport(user) {
    console.log('🏗️ Setting up download report...');
    const downloadButton = document.getElementById('download-report');
    
    if (downloadButton) {
        downloadButton.addEventListener('click', () => {
            generatePDFReport(user);
        });
        console.log('✅ Download report button configured');
    } else {
        console.warn('⚠️ Download report button not found');
    }
}

function generatePDFReport(user) {
    console.log('📄 Generating PDF report...');
    // Create a comprehensive text report
    const reportContent = generateReportContent(user);
    
    // Create a blob with the report content
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // Create download link
    const a = document.createElement('a');
    a.href = url;
    a.download = `${user.name}_Complete_Personality_Report.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    // Clean up
    URL.revokeObjectURL(url);
    
    // Show notification
    showNotification('Complete personality report downloaded successfully!');
    console.log('✅ Report downloaded');
}

function generateReportContent(user) {
    const date = new Date().toLocaleDateString();
    const primaryColor = personalityData[user.personality[0].name];
    const secondaryColor = personalityData[user.personality[1]?.name];
    const tertiaryColor = personalityData[user.personality[2]?.name];
    
    if (!primaryColor) {
        return `
COMPLETE PERSONALITY ANALYSIS REPORT
Generated by PersonaQuest AI
Date: ${date}
User: ${user.name} (@${user.nickname})

═══════════════════════════════════════════════════════════════════

ERROR: Unable to generate report due to missing personality data.
Please retake the personality test to generate a complete report.

© ${new Date().getFullYear()} PersonaQuest. All rights reserved.
`;
    }
    
    return `
COMPLETE PERSONALITY ANALYSIS REPORT
Generated by PersonaQuest AI
Date: ${date}
User: ${user.name} (@${user.nickname})

═══════════════════════════════════════════════════════════════════

EXECUTIVE SUMMARY
Your personality is a unique blend of three colors that work together to create your distinctive approach to life.

PRIMARY PERSONALITY: ${user.personality[0].name} - ${primaryColor.title}
${primaryColor.description}

SECONDARY INFLUENCE: ${user.personality[1]?.name || 'N/A'} - ${user.personality[1]?.title || 'N/A'}
${secondaryColor?.description || 'No secondary personality data available.'}

TERTIARY SUPPORT: ${user.personality[2]?.name || 'N/A'} - ${user.personality[2]?.title || 'N/A'}
${tertiaryColor?.description || 'No tertiary personality data available.'}

═══════════════════════════════════════════════════════════════════

CHARACTER REFERENCES
You share personality traits with these popular characters:

${primaryColor.cartoonReferences?.map((ref, index) => `${index + 1}. ${ref}`).join('\n') || 'No character references available'}

═══════════════════════════════════════════════════════════════════

MATURITY & GROWTH PATH

STAGES OF MATURITY:
${primaryColor.maturityPath?.stages?.map((stage, index) => `${index + 1}. ${stage}`).join('\n') || 'No maturity path data available'}

ENVIRONMENTAL ADAPTATION:
${primaryColor.maturityPath?.environmentalAdaptation || 'No adaptation information available'}

MATURITY MARKERS:
${primaryColor.maturityPath?.maturityMarkers?.map((marker, index) => `${index + 1}. ${marker}`).join('\n') || 'No maturity markers available'}

═══════════════════════════════════════════════════════════════════

FASHION STYLE: ${primaryColor.fashionStyle?.primaryStyle || 'No style information available'}

KEY STYLE ELEMENTS:
${primaryColor.fashionStyle?.keyElements?.map((element, index) => `${index + 1}. ${element}`).join('\n') || 'No style elements available'}

OUTFIT SUGGESTIONS:

CASUAL LOOK:
${primaryColor.fashionStyle?.occasions?.casual || 'No casual suggestions available'}

FORMAL LOOK:
${primaryColor.fashionStyle?.occasions?.formal || 'No formal suggestions available'}

CREATIVE LOOK:
${primaryColor.fashionStyle?.occasions?.creative || 'No creative suggestions available'}

STYLES TO AVOID:
${primaryColor.fashionStyle?.avoids?.map((avoid, index) => `${index + 1}. ${avoid}`).join('\n') || 'No avoidance suggestions available'}

═══════════════════════════════════════════════════════════════════

UNDER PRESSURE ANALYSIS

COLOR SHIFT: ${primaryColor.underPressure?.colorShift || 'No pressure response data available'}

BEHAVIOR CHANGES:
${primaryColor.underPressure?.behaviorChanges?.map((change, index) => `${index + 1}. ${change}`).join('\n') || 'No behavior change data available'}

WARNING SIGN:
${primaryColor.underPressure?.warningSign || 'No warning sign data available'}

RECOVERY NEEDS:
${primaryColor.underPressure?.recoveryNeeds?.map((need, index) => `${index + 1}. ${need}`).join('\n') || 'No recovery needs data available'}

SUPPORT STRATEGIES:
${primaryColor.underPressure?.supportStrategies?.map((strategy, index) => `${index + 1}. ${strategy}`).join('\n') || 'No support strategies available'}

═══════════════════════════════════════════════════════════════════

DETAILED ANALYSIS

PRIMARY STRENGTHS (${user.personality[0].name}):
${primaryColor.strengths.map((strength, index) => `${index + 1}. ${strength}`).join('\n')}

PRIMARY AREAS FOR DEVELOPMENT:
${primaryColor.weaknesses.map((weakness, index) => `${index + 1}. ${weakness}`).join('\n')}

MAIN STRUGGLE: ${primaryColor.struggles?.main || 'No struggle data available'}
${primaryColor.struggles?.details || ''}

WARNING SIGNS TO WATCH FOR:
${primaryColor.struggles?.symptoms?.map((symptom, index) => `${index + 1}. ${symptom}`).join('\n') || 'No symptom data available'}

GROWTH STRATEGIES:
${primaryColor.solutions?.strategies?.map((strategy, index) => `${index + 1}. ${strategy}`).join('\n') || 'No strategy data available'}

DAILY PRACTICE RECOMMENDATION:
${primaryColor.solutions?.dailyPractice || 'No daily practice recommendation available'}

${secondaryColor ? `
SECONDARY STRENGTHS (${user.personality[1].name}):
${secondaryColor.strengths.map((strength, index) => `${index + 1}. ${strength}`).join('\n')}

SECONDARY AREAS FOR DEVELOPMENT:
${secondaryColor.weaknesses.map((weakness, index) => `${index + 1}. ${weakness}`).join('\n')}
` : ''}

${tertiaryColor ? `
TERTIARY STRENGTHS (${user.personality[2].name}):
${tertiaryColor.strengths.map((strength, index) => `${index + 1}. ${strength}`).join('\n')}

TERTIARY AREAS FOR DEVELOPMENT:
${tertiaryColor.weaknesses.map((weakness, index) => `${index + 1}. ${weakness}`).join('\n')}
` : ''}

PERSONAL INTERESTS (Based on Primary ${user.personality[0].name}):

FAVORITE MOVIES:
${primaryColor.interests?.favoriteMovies?.map((movie, index) => `${index + 1}. ${movie}`).join('\n') || 'No movie data available'}

MUSIC PREFERENCES:
${primaryColor.interests?.favoriteMusic?.map((music, index) => `${index + 1}. ${music.genre || music}`).join('\n') || 'No music data available'}

HOBBIES & ACTIVITIES:
${primaryColor.interests?.hobbies?.map((hobby, index) => `${index + 1}. ${hobby.name || hobby}`).join('\n') || 'No hobby data available'}

RELATIONSHIP COMPATIBILITY:
Best Friend Matches: ${primaryColor.friendMatch.join(', ')}
Best Love Matches: ${primaryColor.loveMatch.join(', ')}

CAREER GUIDANCE:
Recommended Career Paths (Based on Primary ${user.personality[0].name}):
${primaryColor.futureCareer.map((career, index) => `${index + 1}. ${career}`).join('\n')}

PERSONAL GROWTH RECOMMENDATIONS:

Primary Color Growth Areas (${user.personality[0].name}):
${primaryColor.growthAreas.map((area, index) => `${index + 1}. ${area}`).join('\n')}

${secondaryColor ? `
Secondary Color Growth Areas (${user.personality[1].name}):
${secondaryColor.growthAreas.map((area, index) => `${index + 1}. ${area}`).join('\n')}
` : ''}

${tertiaryColor ? `
Tertiary Color Growth Areas (${user.personality[2].name}):
${tertiaryColor.growthAreas.map((area, index) => `${index + 1}. ${area}`).join('\n')}
` : ''}

═══════════════════════════════════════════════════════════════════

PERSONALITY BLEND INSIGHTS:
Your unique combination of ${user.personality[0].name}, ${user.personality[1]?.name || 'N/A'}, and ${user.personality[2]?.name || 'N/A'} 
creates a distinctive personality profile. This blend influences how you approach challenges, 
build relationships, and make decisions in your daily life.

MULTIMEDIA RECOMMENDATIONS:
Based on your ${user.personality[0].name} personality, explore these curated playlists and content:
- Spotify playlists tailored to your music preferences
- YouTube videos showcasing your preferred genres
- Visual hobby inspiration from professional photography

═══════════════════════════════════════════════════════════════════

DISCLAIMER:
This report is based on the PersonaQuest personality assessment and is intended for 
self-reflection and personal development purposes only. Results should not be used 
for professional psychological diagnosis or treatment decisions.

For more detailed analysis and personalized guidance, visit PersonaQuest.com

© ${new Date().getFullYear()} PersonaQuest. All rights reserved.
`;
}

// Helper function to adjust color brightness with error handling
function adjustColorBrightness(color, amount) {
    if (!color || !color.startsWith('#') || color.length !== 7) {
        console.warn('⚠️ Invalid color provided to adjustColorBrightness:', color);
        return '#e74c3c';
    }
    
    try {
        const r = Math.max(0, Math.min(255, parseInt(color.slice(1, 3), 16) + amount));
        const g = Math.max(0, Math.min(255, parseInt(color.slice(3, 5), 16) + amount));
        const b = Math.max(0, Math.min(255, parseInt(color.slice(5, 7), 16) + amount));
        
        const result = '#' + 
                      r.toString(16).padStart(2, '0') +
                      g.toString(16).padStart(2, '0') +
                      b.toString(16).padStart(2, '0');
        return result;
    } catch (e) {
        console.error('❌ Error adjusting color brightness:', e);
        return '#e74c3c';
    }
}

function showNotification(message) {
    console.log('📢 Showing notification:', message);
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: #48bb78;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease;
        backdrop-filter: blur(10px);
    `;
    notification.textContent = message;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 3000);
}

function showUpdateNotification(message) {
    console.log('🔄 Showing update notification:', message);
    // Create update notification element with different styling
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #667eea, #764ba2);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1000;
        animation: slideIn 0.3s ease;
        border: 2px solid rgba(255,255,255,0.3);
        backdrop-filter: blur(10px);
    `;
    notification.innerHTML = `<i class="fas fa-sync-alt" style="margin-right: 0.5rem; animation: spin 1s linear infinite;"></i>${message}`;
    
    // Add to body
    document.body.appendChild(notification);
    
    // Remove after 2 seconds
    setTimeout(() => {
        if (document.body.contains(notification)) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }
    }, 2000);
}

// Add CSS for animations and new styles
const style = document.createElement('style');
style.textContent = `
@keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
}

@keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
}

@keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
}

@keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

.personality-card {
    animation: fadeIn 0.6s ease forwards;
}

.growth-item {
    animation: fadeIn 0.6s ease forwards;
}

.color-priority {
    font-size: 0.9rem;
    opacity: 0.8;
    margin-top: 0.5rem;
    font-style: italic;
}

.personality-percentage {
    background: rgba(255, 255, 255, 0.1);
    padding: 0.5rem;
    border-radius: 6px;
    text-align: center;
}

.percentage-label {
    color: #2d3748;
    font-size: 0.9rem;
}

.personality-blend-overview {
    border-left: 4px solid #667eea;
}

.personality-influence {
    transition: all 0.3s ease;
}

.personality-influence:hover {
    background: rgba(237, 242, 247, 0.9) !important;
    transform: translateY(-2px);
}

/* Enhanced section styles for new features */
.cartoon-references-section {
    transition: all 0.3s ease;
}

.cartoon-references-section:hover {
    background: rgba(237, 248, 255, 0.95) !important;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.maturity-path-section {
    transition: all 0.3s ease;
}

.maturity-path-section:hover {
    background: rgba(248, 245, 255, 0.95) !important;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.fashion-style-section {
    transition: all 0.3s ease;
}

.fashion-style-section:hover {
    background: rgba(255, 248, 240, 0.95) !important;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.under-pressure-section {
    transition: all 0.3s ease;
}

.under-pressure-section:hover {
    background: rgba(254, 245, 245, 0.95) !important;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

/* Interests Section */
.interests-section {
    margin-top: 2rem;
    padding: 1.5rem;
    background: linear-gradient(135deg, rgba(232, 244, 253, 0.9), rgba(240, 248, 255, 0.8));
    border-radius: 12px;
    border-left: 4px solid #3182ce;
    backdrop-filter: blur(15px);
}

.interests-section h3 {
    color: #2d3748;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.interests-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1rem;
    margin-bottom: 1rem;
}

.interest-category {
    background: rgba(255, 255, 255, 0.8);
    padding: 1rem;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    backdrop-filter: blur(5px);
}

.interest-category h4 {
    color: #2d3748;
    margin-bottom: 0.75rem;
    font-size: 0.9rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.interest-items {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
}

.interest-tag {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    padding: 0.25rem 0.75rem;
    border-radius: 15px;
    font-size: 0.8rem;
    font-weight: 500;
    transition: transform 0.2s ease;
}

.interest-tag:hover {
    transform: translateY(-2px);
}

/* Enhanced Interests Section */
.music-category {
    grid-column: span 2;
}

.hobbies-category {
    grid-column: span 3;
}

.movie-list {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
}

.movie-item {
    background: rgba(255, 255, 255, 0.8);
    padding: 0.75rem;
    border-radius: 6px;
    border-left: 3px solid #667eea;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s ease;
    backdrop-filter: blur(3px);
}

.movie-item:hover {
    transform: translateX(5px);
}

.movie-title {
    font-weight: 500;
    color: #2d3748;
}

.music-grid {
    display: grid;
    gap: 1rem;
}

.music-item h5 {
    margin: 0 0 0.75rem 0;
    color: #2d3748;
    font-size: 0.9rem;
    font-weight: 600;
}

.media-embeds {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
}

.spotify-embed,
.youtube-embed {
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease;
}

.spotify-embed:hover,
.youtube-embed:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.hobbies-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 1rem;
}

.hobby-item {
    background: rgba(255, 255, 255, 0.8);
    border-radius: 8px;
    overflow: hidden;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    transition: all 0.3s ease;
    cursor: pointer;
    backdrop-filter: blur(5px);
}

.hobby-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.hobby-image {
    width: 100%;
    height: 100px;
    overflow: hidden;
}

.hobby-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.hobby-item:hover .hobby-image img {
    transform: scale(1.1);
}

.hobby-name {
    padding: 0.75rem;
    font-size: 0.8rem;
    font-weight: 500;
    color: #2d3748;
    text-align: center;
    line-height: 1.2;
}

/* Struggles and Solutions Sections */
.struggles-section {
    transition: all 0.3s ease;
}

.struggles-section:hover {
    background: rgba(254, 240, 231, 0.95) !important;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.solutions-section {
    transition: all 0.3s ease;
}

.solutions-section:hover {
    background: rgba(224, 255, 250, 0.95) !important;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.struggles-section ul,
.solutions-section ul {
    line-height: 1.4;
}

.struggles-section li,
.solutions-section li {
    margin-bottom: 0.25rem;
}

/* Enhanced Personality Cards */
.personality-card {
    position: relative;
    overflow: hidden;
}

.personality-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transition: left 0.6s;
    z-index: 1;
    pointer-events: none;
}

.personality-card:hover::before {
    left: 100%;
}

/* Responsive adjustments for media */
@media (max-width: 768px) {
    .interests-grid {
        grid-template-columns: 1fr;
    }
    
    .music-category,
    .hobbies-category {
        grid-column: span 1;
    }
    
    .media-embeds {
        grid-template-columns: 1fr;
    }
    
    .hobbies-grid {
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    }
    
    .hobby-image {
        height: 80px;
    }
}
`;
document.head.appendChild(style);

// Cleanup function to clear intervals when page unloads
window.addEventListener('beforeunload', () => {
    if (refreshInterval) {
        clearInterval(refreshInterval);
        console.log('🧹 Cleanup: Auto-refresh interval cleared');
    }
});

// Expose function for manual refresh (for debugging)
window.refreshProfileAI = () => {
    console.log('🔄 Manual refresh triggered');
    initializeProfileAI();
};
