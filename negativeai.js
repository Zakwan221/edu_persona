// Enhanced Negative AI JavaScript with Progress Analytics Bar Chart
// Fixed critical errors and improved error handling

// Ensure utils is defined
if (typeof window.utils === 'undefined') {
    window.utils = {
        storage: {
            get: function(key) {
                try {
                    const item = localStorage.getItem(key);
                    return item ? JSON.parse(item) : null;
                } catch (e) {
                    console.error('Error parsing localStorage item:', key, e);
                    return null;
                }
            },
            set: function(key, value) {
                try {
                    if (typeof value === 'object') {
                        localStorage.setItem(key, JSON.stringify(value));
                    } else {
                        localStorage.setItem(key, value);
                    }
                } catch (e) {
                    console.error('Error setting localStorage item:', key, e);
                }
            },
            remove: function(key) {
                try {
                    localStorage.removeItem(key);
                } catch (e) {
                    console.error('Error removing localStorage item:', key, e);
                }
            }
        }
    };
}

// Global variables
let currentNegativeUser = null;
let refreshInterval = null;
let achievementData = [];
let habitStreaks = {};

// Enhanced negative trait data with all 9 traits
const negativeTraitData = {
    paranoid: {
        name: "Paranoid",
        title: "Excessive Distrust & Suspicion",
        description: "Persistent patterns of distrust and suspicion of others, interpreting motives as malevolent even without evidence.",
        severity: "High Impact",
        color: "#8b0000",
        intensity: 8.5,
        category: "Trust Issues",
        impacts: [
            "Damages close relationships through constant suspicion",
            "Creates isolation and loneliness",
            "Leads to stress and anxiety in social situations",
            "Prevents career advancement due to lack of collaboration",
            "Causes missed opportunities due to fear of deception"
        ],
        strategies: [
            {
                title: "Reality Testing Practice",
                description: "Learn to distinguish between facts and assumptions",
                steps: [
                    "Before reacting to suspicions, write down the actual facts",
                    "List evidence for and against your suspicious thoughts",
                    "Ask trusted friends for their perspective on situations",
                    "Practice the 24-hour rule before confronting someone",
                    "Keep a journal of situations where your suspicions were wrong"
                ]
            },
            {
                title: "Trust Building Exercises",
                description: "Gradually build trust through small, low-risk interactions",
                steps: [
                    "Start with small acts of trust with safe people",
                    "Share minor personal information and observe responses",
                    "Practice giving others the benefit of the doubt",
                    "Set specific trust goals for each week",
                    "Celebrate successful trust experiences"
                ]
            }
        ],
        dailyPractices: [
            {
                title: "Morning Intention Setting",
                description: "Start each day by setting an intention to approach others with openness rather than suspicion.",
                frequency: "Every morning (5 minutes)"
            },
            {
                title: "Evidence Checking",
                description: "When feeling suspicious, immediately ask yourself: 'What concrete evidence do I have for this belief?'",
                frequency: "As needed throughout the day"
            },
            {
                title: "Gratitude for Trust",
                description: "Each evening, identify one person who showed trustworthiness that day.",
                frequency: "Every evening (3 minutes)"
            }
        ],
        milestones: [
            {
                title: "Week 1-2: Awareness Building",
                description: "Recognize and document paranoid thoughts without judgment",
                duration: "2 weeks"
            },
            {
                title: "Week 3-6: Fact vs. Fiction",
                description: "Practice distinguishing between evidence-based concerns and unfounded suspicions",
                duration: "4 weeks"
            },
            {
                title: "Week 7-12: Trust Experiments",
                description: "Gradually increase trust behaviors with low-risk individuals",
                duration: "6 weeks"
            },
            {
                title: "Month 4-6: Relationship Repair",
                description: "Work on rebuilding damaged relationships and forming new, healthier connections",
                duration: "3 months"
            }
        ]
    },
    toxic: {
        name: "Toxic",
        title: "Manipulative & Destructive Behavior",
        description: "Engaging in harmful behaviors that damage relationships and create negative environments for others.",
        severity: "Severe Impact",
        color: "#4a0e4e",
        intensity: 9.2,
        category: "Behavioral Issues",
        impacts: [
            "Destroys relationships and pushes people away",
            "Creates hostile work and social environments",
            "Damages reputation and professional opportunities",
            "Causes guilt, shame, and internal conflict",
            "Perpetuates cycles of negativity and drama"
        ],
        strategies: [
            {
                title: "Behavior Awareness Training",
                description: "Develop awareness of toxic patterns and their impact on others",
                steps: [
                    "Keep a daily log of interactions that caused harm",
                    "Ask trusted friends for honest feedback about your behavior",
                    "Study the immediate and long-term effects of your actions",
                    "Practice apologizing sincerely when you cause harm",
                    "Set boundaries for yourself around gossip and manipulation"
                ]
            },
            {
                title: "Positive Communication Skills",
                description: "Replace toxic communication with healthy, constructive alternatives",
                steps: [
                    "Learn and practice 'I' statements instead of blame",
                    "Develop active listening skills",
                    "Practice giving genuine compliments daily",
                    "Learn conflict resolution techniques",
                    "Focus on solutions rather than problems"
                ]
            }
        ],
        dailyPractices: [
            {
                title: "Harm Prevention Check",
                description: "Before speaking or acting, ask: 'Will this help or harm the other person and our relationship?'",
                frequency: "Before all interactions"
            },
            {
                title: "Daily Kindness Act",
                description: "Perform one genuine act of kindness without expecting anything in return.",
                frequency: "Once daily"
            },
            {
                title: "Evening Accountability",
                description: "Review the day and identify any toxic behaviors, then plan specific improvements for tomorrow.",
                frequency: "Every evening (10 minutes)"
            }
        ],
        milestones: [
            {
                title: "Week 1-3: Recognition Phase",
                description: "Identify and acknowledge toxic behavior patterns",
                duration: "3 weeks"
            },
            {
                title: "Week 4-8: Behavior Interruption",
                description: "Learn to catch and stop toxic behaviors in the moment",
                duration: "5 weeks"
            },
            {
                title: "Week 9-16: Replacement Skills",
                description: "Consistently practice healthy communication and relationship skills",
                duration: "8 weeks"
            },
            {
                title: "Month 5-12: Relationship Restoration",
                description: "Work to repair damaged relationships and build a positive reputation",
                duration: "8 months"
            }
        ]
    },
    aggressive: {
        name: "Aggressive",
        title: "Hostile & Confrontational Behavior",
        description: "Displaying excessive anger, hostility, and confrontational behavior that harms relationships and creates conflict.",
        severity: "High Impact",
        color: "#b22222",
        intensity: 8.8,
        category: "Emotional Regulation",
        impacts: [
            "Frightens and intimidates others",
            "Damages family and romantic relationships",
            "Creates workplace conflicts and disciplinary issues",
            "Leads to legal troubles and violence",
            "Causes chronic stress and health problems"
        ],
        strategies: [
            {
                title: "Anger Management Techniques",
                description: "Learn to recognize anger triggers and manage responses effectively",
                steps: [
                    "Identify your personal anger warning signs",
                    "Practice deep breathing and countdown techniques",
                    "Use the timeout strategy when feeling overwhelmed",
                    "Learn progressive muscle relaxation",
                    "Develop a personal anger management plan"
                ]
            },
            {
                title: "Conflict Resolution Skills",
                description: "Replace aggressive responses with assertive, constructive communication",
                steps: [
                    "Learn the difference between aggressive and assertive behavior",
                    "Practice 'I feel' statements to express needs",
                    "Develop active listening skills",
                    "Learn compromise and negotiation techniques",
                    "Practice de-escalation strategies"
                ]
            }
        ],
        dailyPractices: [
            {
                title: "Morning Calm Intention",
                description: "Set an intention each morning to respond to challenges with calmness rather than aggression.",
                frequency: "Every morning (3 minutes)"
            },
            {
                title: "Anger Thermometer Check",
                description: "Rate your anger level 1-10 throughout the day; take action when it reaches 6 or higher.",
                frequency: "Every 2 hours"
            },
            {
                title: "Peaceful Resolution Practice",
                description: "Practice resolving one small conflict or frustration peacefully each day.",
                frequency: "Once daily"
            }
        ],
        milestones: [
            {
                title: "Week 1-2: Trigger Identification",
                description: "Identify personal anger triggers and warning signs",
                duration: "2 weeks"
            },
            {
                title: "Week 3-6: Response Control",
                description: "Practice interrupting aggressive responses and using calming techniques",
                duration: "4 weeks"
            },
            {
                title: "Week 7-12: Assertive Communication",
                description: "Develop and practice healthy ways to express needs and resolve conflicts",
                duration: "6 weeks"
            },
            {
                title: "Month 4-9: Relationship Healing",
                description: "Focus on repairing relationships damaged by past aggressive behavior",
                duration: "6 months"
            }
        ]
    },
    narcissistic: {
        name: "Narcissistic",
        title: "Excessive Self-Focus & Lack of Empathy",
        description: "Grandiose sense of self-importance, need for admiration, and lack of empathy for others.",
        severity: "Severe Impact",
        color: "#ff6347",
        intensity: 8.7,
        category: "Empathy Deficit",
        impacts: [
            "Destroys intimate relationships through lack of empathy",
            "Creates workplace conflicts due to superiority complex",
            "Prevents personal growth and self-awareness",
            "Leads to exploitation of others for personal gain",
            "Causes isolation when others tire of self-centered behavior"
        ],
        strategies: [
            {
                title: "Empathy Development",
                description: "Learn to understand and share the feelings of others",
                steps: [
                    "Practice active listening without planning your response",
                    "Ask others about their feelings and truly listen to answers",
                    "Try to understand situations from others' perspectives",
                    "Volunteer to help others less fortunate",
                    "Read books or watch movies focusing on others' experiences"
                ]
            },
            {
                title: "Humility Practice",
                description: "Develop genuine humility and appreciation for others' contributions",
                steps: [
                    "Make a daily list of things others do that you appreciate",
                    "Practice saying 'I don't know' when you truly don't",
                    "Ask others for advice and genuinely consider their input",
                    "Acknowledge your mistakes publicly when appropriate",
                    "Celebrate others' successes without making it about you"
                ]
            }
        ],
        dailyPractices: [
            {
                title: "Other-Focus Exercise",
                description: "Spend 10 minutes each day focusing entirely on someone else's needs or feelings.",
                frequency: "Daily (10 minutes)"
            },
            {
                title: "Gratitude for Others",
                description: "Write down three specific things others did that benefited you or others.",
                frequency: "Every evening"
            },
            {
                title: "Compliment Without Agenda",
                description: "Give one genuine compliment daily without expecting anything in return.",
                frequency: "Once daily"
            }
        ],
        milestones: [
            {
                title: "Week 1-4: Empathy Awareness",
                description: "Begin recognizing and acknowledging others' feelings and perspectives",
                duration: "4 weeks"
            },
            {
                title: "Week 5-10: Self-Reflection",
                description: "Develop honest self-assessment skills and acknowledge personal flaws",
                duration: "6 weeks"
            },
            {
                title: "Week 11-20: Service to Others",
                description: "Engage in activities that benefit others without personal gain",
                duration: "10 weeks"
            },
            {
                title: "Month 6-12: Relationship Rebuilding",
                description: "Work to repair relationships and build genuine, mutual connections",
                duration: "7 months"
            }
        ]
    },
    antisocial: {
        name: "Antisocial",
        title: "Social Withdrawal & Poor Communication",
        description: "Difficulty with social interactions, poor communication skills, and tendency to avoid social situations.",
        severity: "Moderate Impact",
        color: "#696969",
        intensity: 6.5,
        category: "Social Skills",
        impacts: [
            "Limits career advancement opportunities",
            "Prevents formation of meaningful relationships",
            "Leads to loneliness and isolation",
            "Causes misunderstandings and conflicts",
            "Results in missed social and professional networking"
        ],
        strategies: [
            {
                title: "Social Skills Development",
                description: "Build confidence and competence in social interactions",
                steps: [
                    "Practice small talk in low-pressure situations",
                    "Join clubs or groups based on personal interests",
                    "Take a public speaking or communication class",
                    "Practice making eye contact during conversations",
                    "Learn to ask open-ended questions about others"
                ]
            },
            {
                title: "Gradual Exposure Therapy",
                description: "Gradually increase social exposure to build comfort and confidence",
                steps: [
                    "Start with one-on-one interactions",
                    "Gradually join small group activities",
                    "Practice social skills with supportive friends first",
                    "Set small, achievable social goals each week",
                    "Reward yourself for social successes"
                ]
            }
        ],
        dailyPractices: [
            {
                title: "Daily Social Interaction",
                description: "Have at least one meaningful conversation with someone each day.",
                frequency: "Once daily"
            },
            {
                title: "Communication Skill Practice",
                description: "Practice one specific communication skill (eye contact, active listening, etc.) during interactions.",
                frequency: "Throughout the day"
            },
            {
                title: "Social Comfort Expansion",
                description: "Step slightly outside your comfort zone socially each day, even in small ways.",
                frequency: "Once daily"
            }
        ],
        milestones: [
            {
                title: "Week 1-3: Comfort Zone Mapping",
                description: "Identify current social comfort level and set realistic goals",
                duration: "3 weeks"
            },
            {
                title: "Week 4-8: Basic Social Skills",
                description: "Master fundamental communication skills in safe environments",
                duration: "5 weeks"
            },
            {
                title: "Week 9-16: Group Participation",
                description: "Begin participating in small group activities and discussions",
                duration: "8 weeks"
            },
            {
                title: "Month 5-9: Relationship Building",
                description: "Focus on developing deeper, more meaningful relationships",
                duration: "5 months"
            }
        ]
    },
    dramatic: {
        name: "Dramatic",
        title: "Attention-Seeking & Emotional Excess",
        description: "Constantly seeking attention through exaggerated emotions and behaviors, making everything about oneself.",
        severity: "Moderate Impact",
        color: "#da70d6",
        intensity: 7.2,
        category: "Attention-Seeking",
        impacts: [
            "Exhausts friends and family with constant drama",
            "Makes it difficult for others to share their problems",
            "Creates unstable work and social environments",
            "Prevents genuine emotional connections",
            "Leads to being perceived as shallow or self-centered"
        ],
        strategies: [
            {
                title: "Emotional Regulation Skills",
                description: "Learn to manage and express emotions in healthy, proportionate ways",
                steps: [
                    "Practice identifying emotions before they escalate",
                    "Learn breathing techniques for emotional control",
                    "Develop a scale for rating emotional intensity (1-10)",
                    "Practice expressing emotions calmly and clearly",
                    "Learn to sit with uncomfortable emotions without acting out"
                ]
            },
            {
                title: "Attention Balance Training",
                description: "Learn to give and receive attention in healthy, balanced ways",
                steps: [
                    "Practice listening to others without interrupting",
                    "Ask questions about others' experiences and feelings",
                    "Share positive attention by complimenting others",
                    "Learn to be comfortable not being the center of attention",
                    "Find healthy ways to meet attention needs (hobbies, achievements)"
                ]
            }
        ],
        dailyPractices: [
            {
                title: "Emotion Check-In",
                description: "Rate your emotional intensity throughout the day and practice moderation when levels are high.",
                frequency: "Every 3 hours"
            },
            {
                title: "Others-First Listening",
                description: "In each conversation, focus entirely on the other person for the first 5 minutes before sharing about yourself.",
                frequency: "Every conversation"
            },
            {
                title: "Quiet Reflection Time",
                description: "Spend time alone without seeking attention, practicing being comfortable with yourself.",
                frequency: "15 minutes daily"
            }
        ],
        milestones: [
            {
                title: "Week 1-2: Emotional Awareness",
                description: "Learn to recognize and name emotions before they escalate",
                duration: "2 weeks"
            },
            {
                title: "Week 3-6: Response Moderation",
                description: "Practice responding to situations with appropriate emotional intensity",
                duration: "4 weeks"
            },
            {
                title: "Week 7-12: Attention Balance",
                description: "Learn to give and receive attention in healthy, balanced ways",
                duration: "6 weeks"
            },
            {
                title: "Month 4-8: Genuine Connection",
                description: "Focus on building deeper, more authentic relationships",
                duration: "5 months"
            }
        ]
    },
    lazy: {
        name: "Lazy & Unreliable",
        title: "Procrastination & Lack of Follow-Through",
        description: "Chronic avoidance of responsibilities, procrastination, and failure to follow through on commitments.",
        severity: "High Impact",
        color: "#8b4513",
        intensity: 8.0,
        category: "Motivation Issues",
        impacts: [
            "Damages professional reputation and career prospects",
            "Strains relationships through unmet commitments",
            "Creates financial instability and missed opportunities",
            "Leads to guilt, shame, and low self-esteem",
            "Prevents personal growth and achievement"
        ],
        strategies: [
            {
                title: "Task Management System",
                description: "Develop effective systems for managing responsibilities and commitments",
                steps: [
                    "Use a calendar or planner to track all commitments",
                    "Break large tasks into smaller, manageable steps",
                    "Set specific deadlines with built-in buffer time",
                    "Create accountability systems with others",
                    "Establish rewards for completing tasks on time"
                ]
            },
            {
                title: "Motivation Building",
                description: "Develop intrinsic motivation and discipline for following through",
                steps: [
                    "Identify personal values and connect tasks to them",
                    "Visualize the positive outcomes of completing tasks",
                    "Start with very small commitments and build up",
                    "Find an accountability partner or mentor",
                    "Create consequences for not following through"
                ]
            }
        ],
        dailyPractices: [
            {
                title: "Daily Priority Setting",
                description: "Each morning, identify and commit to completing three specific tasks that day.",
                frequency: "Every morning (10 minutes)"
            },
            {
                title: "Commitment Tracking",
                description: "Keep a log of promises made and whether they were kept, reviewing weekly.",
                frequency: "Daily logging, weekly review"
            },
            {
                title: "Energy Management",
                description: "Identify your peak energy times and schedule important tasks during those periods.",
                frequency: "Ongoing awareness"
            }
        ],
        milestones: [
            {
                title: "Week 1-2: System Setup",
                description: "Establish task management and tracking systems",
                duration: "2 weeks"
            },
            {
                title: "Week 3-6: Small Wins",
                description: "Focus on completing small commitments consistently",
                duration: "4 weeks"
            },
            {
                title: "Week 7-12: Larger Projects",
                description: "Take on and complete progressively larger responsibilities",
                duration: "6 weeks"
            },
            {
                title: "Month 4-9: Reputation Rebuilding",
                description: "Work to rebuild trust and reliability in relationships and work",
                duration: "6 months"
            }
        ]
    },
    impulsive: {
        name: "Impulsive",
        title: "Poor Decision-Making & Lack of Self-Control",
        description: "Acting without thinking, making rash decisions, and struggling with self-control and delayed gratification.",
        severity: "High Impact",
        color: "#ff4500",
        intensity: 8.3,
        category: "Impulse Control",
        impacts: [
            "Leads to financial problems through poor spending decisions",
            "Damages relationships through thoughtless words and actions",
            "Creates safety risks through reckless behavior",
            "Prevents achievement of long-term goals",
            "Results in regret and consequences from hasty decisions"
        ],
        strategies: [
            {
                title: "Impulse Control Techniques",
                description: "Develop strategies to pause and think before acting",
                steps: [
                    "Practice the 10-second rule before responding or acting",
                    "Use the STOP technique (Stop, Take a breath, Observe, Proceed mindfully)",
                    "Remove temptations from your environment when possible",
                    "Practice delayed gratification with small rewards",
                    "Develop personal scripts for common impulsive situations"
                ]
            },
            {
                title: "Decision-Making Framework",
                description: "Create structured approaches to making better decisions",
                steps: [
                    "List pros and cons before making important decisions",
                    "Consider long-term consequences, not just immediate results",
                    "Consult trusted friends or mentors for major decisions",
                    "Sleep on important decisions when possible",
                    "Create personal rules for common decision scenarios"
                ]
            }
        ],
        dailyPractices: [
            {
                title: "Pause Practice",
                description: "Before responding to any request or situation, take three deep breaths and count to ten.",
                frequency: "Before all decisions"
            },
            {
                title: "Consequence Visualization",
                description: "Before acting, visualize the potential positive and negative outcomes of your action.",
                frequency: "Before significant actions"
            },
            {
                title: "Impulse Tracking",
                description: "Keep a log of impulses you felt and whether you acted on them, noting outcomes.",
                frequency: "Daily review (5 minutes)"
            }
        ],
        milestones: [
            {
                title: "Week 1-2: Impulse Recognition",
                description: "Learn to recognize impulses before acting on them",
                duration: "2 weeks"
            },
            {
                title: "Week 3-6: Pause Development",
                description: "Master creating space between impulse and action",
                duration: "4 weeks"
            },
            {
                title: "Week 7-12: Decision Skills",
                description: "Develop and practice structured decision-making approaches",
                duration: "6 weeks"
            },
            {
                title: "Month 4-10: Long-term Thinking",
                description: "Focus on achieving long-term goals through consistent, thoughtful choices",
                duration: "7 months"
            }
        ]
    },
    avoidant: {
        name: "Avoidant",
        title: "Fear of Rejection & Social Withdrawal",
        description: "Extreme sensitivity to criticism, fear of rejection, and avoidance of social situations despite wanting connection.",
        severity: "Moderate Impact",
        color: "#708090",
        intensity: 7.5,
        category: "Avoidance Behaviors",
        impacts: [
            "Prevents career advancement due to avoidance of visibility",
            "Limits romantic and friendship opportunities",
            "Leads to chronic loneliness and isolation",
            "Creates missed opportunities for growth and experience",
            "Results in low self-esteem and self-worth issues"
        ],
        strategies: [
            {
                title: "Gradual Exposure Therapy",
                description: "Gradually face feared social situations to build confidence",
                steps: [
                    "Create a hierarchy of feared social situations from least to most scary",
                    "Start with the least threatening situations first",
                    "Practice relaxation techniques before social encounters",
                    "Gradually work up to more challenging social situations",
                    "Celebrate small victories and progress made"
                ]
            },
            {
                title: "Self-Esteem Building",
                description: "Develop a stronger, more positive sense of self-worth",
                steps: [
                    "Keep a daily log of personal accomplishments and strengths",
                    "Challenge negative self-talk with evidence-based responses",
                    "Develop skills and hobbies that build competence",
                    "Practice self-compassion when facing setbacks",
                    "Seek feedback from trusted friends about your positive qualities"
                ]
            }
        ],
        dailyPractices: [
            {
                title: "Social Challenge",
                description: "Take one small social risk each day, such as making eye contact or asking a question.",
                frequency: "Once daily"
            },
            {
                title: "Positive Self-Talk",
                description: "Replace one negative self-judgment with a kind, realistic assessment.",
                frequency: "As needed throughout day"
            },
            {
                title: "Strength Recognition",
                description: "Identify and acknowledge one personal strength or accomplishment each day.",
                frequency: "Every evening"
            }
        ],
        milestones: [
            {
                title: "Week 1-3: Self-Assessment",
                description: "Identify specific fears and avoidance patterns",
                duration: "3 weeks"
            },
            {
                title: "Week 4-8: Comfort Zone Expansion",
                description: "Begin taking small social risks in safe environments",
                duration: "5 weeks"
            },
            {
                title: "Week 9-16: Confidence Building",
                description: "Engage in progressively more challenging social situations",
                duration: "8 weeks"
            },
            {
                title: "Month 5-10: Relationship Development",
                description: "Focus on building meaningful connections and relationships",
                duration: "6 months"
            }
        ]
    }
};

document.addEventListener('DOMContentLoaded', () => {
    console.log('=== Enhanced Negative AI JS loaded ===');
    
    try {
        // Initialize the enhanced negative AI
        initializeNegativeAI();
        
        // Set up auto-refresh mechanism to detect changes
        setupAutoRefresh();
        
        // Initialize achievement system
        initializeAchievementSystem();
        
        // Listen for storage changes
        window.addEventListener('storage', handleStorageChange);
        
        // Listen for custom events
        window.addEventListener('negativeTraitsUpdated', handleNegativeTraitsUpdate);
    } catch (error) {
        console.error('Error during initialization:', error);
        showNotification('Error loading the page. Please refresh and try again.', 'error');
    }
});

function initializeNegativeAI() {
    console.log('🚀 Initializing Enhanced Negative AI...');
    
    try {
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
        console.log('🎯 User negative traits data:', currentUser.badPersonality);
        
        // Enhanced negative traits validation
        const negativeTraitsValidation = validateNegativeTraitsData(currentUser.badPersonality);
        console.log('🔬 Negative traits validation:', negativeTraitsValidation);
        
        if (!negativeTraitsValidation.isValid) {
            console.log('❌ Invalid negative traits data:', negativeTraitsValidation.reason);
            
            if (negativeTraitsValidation.reason === 'No negative traits found') {
                document.getElementById('positive-results').style.display = 'flex';
            } else {
                document.getElementById('no-test-results').style.display = 'flex';
            }
            return;
        }
        
        console.log('✅ Valid negative traits data found - Building Enhanced Negative AI');
        
        // Store current user for auto-refresh
        currentNegativeUser = currentUser;
        
        // Hide other containers and show negative AI
        document.getElementById('login-required').style.display = 'none';
        document.getElementById('no-test-results').style.display = 'none';
        document.getElementById('positive-results').style.display = 'none';
        document.getElementById('negativeai-container').style.display = 'block';
        
        // Build the enhanced negative AI interface
        buildEnhancedNegativeAI(currentUser);
    } catch (error) {
        console.error('Error in initializeNegativeAI:', error);
        showNotification('Error initializing the analysis. Please refresh and try again.', 'error');
    }
}

// Enhanced negative traits data validation function
function validateNegativeTraitsData(badPersonality) {
    console.log('🔍 Validating negative traits data:', badPersonality);
    
    if (!badPersonality) {
        return { isValid: false, reason: 'No negative traits data found' };
    }
    
    if (!Array.isArray(badPersonality)) {
        return { isValid: false, reason: 'Negative traits data is not an array' };
    }
    
    if (badPersonality.length === 0) {
        return { isValid: false, reason: 'No negative traits data found' };
    }
    
    if (!badPersonality[0]) {
        return { isValid: false, reason: 'First negative traits item is null or undefined' };
    }
    
    // Check if it's a "no negative traits" result
    if (badPersonality[0].noNegativeTraits) {
        return { isValid: false, reason: 'No negative traits found' };
    }
    
    // Check if there are actual traits
    if (!badPersonality[0].traits || badPersonality[0].traits.length === 0) {
        return { isValid: false, reason: 'No negative traits found' };
    }
    
    // Validate that we have data for the traits
    const hasValidTraits = badPersonality[0].traits.some(trait => {
        return negativeTraitData[trait.id] !== undefined;
    });
    
    if (!hasValidTraits) {
        return { isValid: false, reason: 'No valid negative trait data found for user traits' };
    }
    
    return { isValid: true, reason: 'Valid negative traits data' };
}

function buildEnhancedNegativeAI(user) {
    console.log('🏗️ Building Enhanced Negative AI for user:', user.name);
    
    try {
        // Show improvement notice if applicable
        showImprovementNotice(user);
        
        // Build user overview
        buildUserOverview(user);
        console.log('✅ User overview built');

        buildSummaryNegativeTraitsGraph(user);
        console.log('✅ Summary negative traits graph built');
        
        // Build progress analytics chart
        buildProgressAnalytics(user);
        console.log('✅ Progress analytics built');
        
        // Build complete traits analysis
        buildAllTraitsAnalysis(user);
        console.log('✅ Complete traits analysis built');
        
        // Build improvement strategies
        buildImprovementStrategies(user);
        console.log('✅ Improvement strategies built');
        
        // Build achievement system
        buildAchievementSystem(user);
        console.log('✅ Achievement system built');
        
        // Build progress tracking - FIXED FUNCTION NAME
        buildProgressTracking(user);
        setupProgressTrackingEvents(user);
        console.log('✅ Progress tracking built');
        
        // Build habit tracker
        buildHabitTracker(user);
        console.log('✅ Habit tracker built');
        
        // Set up all interactive features
        setupInteractiveFeatures(user);
        console.log('✅ Interactive features setup complete');
        
        console.log('🎉 Enhanced Negative AI build completed successfully!');
        
        // Add smooth scroll animation to top
        const headerElement = document.querySelector('.negativeai-header');
        if (headerElement) {
            headerElement.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        }
        
    } catch (error) {
        console.error('❌ Error building Enhanced Negative AI:', error);
        
        // Show error message to user
        const container = document.getElementById('negativeai-container');
        if (container) {
            container.innerHTML = `
                <div class="error-message" style="text-align: center; padding: 2rem; background: rgba(255, 255, 255, 0.95); border-radius: 10px; margin: 2rem 0; backdrop-filter: blur(10px);">
                    <h2 style="color: #e74c3c;">Error Loading Enhanced Analysis</h2>
                    <p>There was an error loading your negative traits analysis. Please try refreshing the page or retaking the assessment.</p>
                    <a href="badtest.html" class="button button-primary">Retake Assessment</a>
                </div>
            `;
        }
    }
}

function buildUserOverview(user) {
    console.log('🏗️ Building enhanced user overview...');
    const container = document.getElementById('user-overview');
    
    if (!container || !user || !user.badPersonality || !user.badPersonality[0] || !user.badPersonality[0].traits) {
        console.error('Invalid user data or container not found');
        return;
    }
    
    try {
        const joinDate = new Date(user.joinDate).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
        
        // Get ALL negative traits data
        const negativeTraits = user.badPersonality[0].traits;
        
        // Create overview with ALL traits shown using actual test scores
        const traitOverviewHTML = negativeTraits.map((trait) => {
            const traitData = negativeTraitData[trait.id];
            
            if (!traitData) {
                console.warn(`⚠️ No trait data found for: ${trait.id}`);
                return '';
            }
            
            // Use actual test score instead of predefined intensity
            const actualScore = trait.score || 0;
            
            return `
                <div class="trait-summary" style="background: linear-gradient(135deg, ${traitData.color}, ${adjustColorBrightness(traitData.color, -20)}); position: relative; overflow: hidden;">
                    <div class="trait-intensity-overlay" style="position: absolute; top: 0; left: 0; width: ${(actualScore / 100) * 100}%; height: 100%; background: rgba(255,255,255,0.2); z-index: 1;"></div>
                    <div style="position: relative; z-index: 2;">
                        <div class="trait-name" style="color: white; font-weight: 600; text-shadow: 0 1px 2px rgba(0,0,0,0.3);">${traitData.name}</div>
                    </div>
                </div>
            `;
        }).join('');
        
        container.innerHTML = `
            <div class="overview-header">
                <img src="${user.avatar || 'default-avatar.png'}" alt="${user.name}" class="user-avatar">
                <div class="user-info">
                    <h2>${user.name}</h2>
                    <p><strong>Username:</strong> @${user.nickname}</p>
                    <p><strong>Member since:</strong> ${joinDate}</p>
                    <p><strong>Assessment completed:</strong> ${new Date(user.badPersonality[0].date).toLocaleDateString()}</p>
                </div>
                <div class="overview-stats">
                    <div class="stat-item">
                        <div class="stat-value">${negativeTraits.length}</div>
                        <div class="stat-label">Total Traits</div>
                    </div>
                </div>
            </div>
            
            <div class="all-traits-overview">
                ${traitOverviewHTML}
            </div>
            
            <div style="background: rgba(255, 243, 205, 0.9); padding: 1.5rem; border-radius: 10px; margin-top: 1.5rem; border-left: 4px solid #f39c12; backdrop-filter: blur(10px);">
                <h3 style="color: #e67e22; margin-bottom: 1rem;"><i class="fas fa-lightbulb"></i> Your Complete Analysis</h3>
                <p style="color: #d35400; line-height: 1.6;">
                    We've identified <strong>${negativeTraits.length} negative traits</strong> in your personality profile. 
                    This comprehensive analysis shows ALL your traits based on your actual test responses. Each trait has personalized strategies, 
                    daily practices, and a step-by-step roadmap to help you overcome these challenges. Remember, awareness is the first step toward positive change!
                </p>
            </div>
        `;
        
        console.log('✅ Enhanced user overview HTML generated');
    } catch (error) {
        console.error('Error building user overview:', error);
        if (container) {
            container.innerHTML = '<div class="error-message">Error loading user overview</div>';
        }
    }
}

function buildSummaryNegativeTraitsGraph(user) {
    console.log('🏗️ Building clean horizontal summary graph...');
    const container = document.getElementById('summary-negative-traits');
    
    if (!container || !user || !user.badPersonality) {
        console.error('Invalid container or user data for summary graph');
        return;
    }
    
    try {
        const badPersonalityHistory = user.badPersonality || [];
        
        // Check if we have any assessment data
        if (badPersonalityHistory.length === 0) {
            container.innerHTML = `
                <div class="clean-analysis-section">
                    <div class="clean-header">
                        <h2><i class="fas fa-chart-simple"></i> Your Progress Summary</h2>
                        <p>Track your negative traits over time</p>
                    </div>
                    <div class="no-data-card">
                        <i class="fas fa-clipboard-list"></i>
                        <h3>No assessments yet</h3>
                        <p>Take your first assessment to start tracking progress</p>
                        <a href="badtest.html" class="clean-button">Take Assessment</a>
                    </div>
                </div>
            `;
            return;
        }
        
        // Get up to 4 most recent assessments
        const maxAssessments = Math.min(4, badPersonalityHistory.length);
        const assessments = badPersonalityHistory.slice(0, maxAssessments);
        
        // Calculate total traits for each assessment
        const summaryData = assessments.map((assessment, index) => {
            let totalTraits = 0;
            
            if (assessment.noNegativeTraits) {
                totalTraits = 0;
            } else if (assessment.traits && assessment.traits.length > 0) {
                totalTraits = assessment.traits.length;
            }
            
            return {
                date: assessment.date,
                totalTraits: totalTraits,
                isNewest: index === 0,
                assessment: assessment
            };
        });
        
        // Calculate simple trend
        let trendInfo = { direction: 'first', text: 'First assessment', icon: 'fas fa-star', class: 'first' };
        if (summaryData.length > 1) {
            const current = summaryData[0].totalTraits;
            const previous = summaryData[1].totalTraits;
            const change = previous - current;
            
            if (change > 0) {
                trendInfo = {
                    direction: 'better',
                    text: `${change} fewer trait${change > 1 ? 's' : ''}`,
                    icon: 'fas fa-arrow-down',
                    class: 'better'
                };
            } else if (change < 0) {
                trendInfo = {
                    direction: 'more',
                    text: `${Math.abs(change)} more trait${Math.abs(change) > 1 ? 's' : ''}`,
                    icon: 'fas fa-arrow-up',
                    class: 'more'
                };
            } else {
                trendInfo = {
                    direction: 'same',
                    text: 'Same as before',
                    icon: 'fas fa-equals',
                    class: 'same'
                };
            }
        }
        
        // Create horizontal bars
        // Create horizontal bars with exact x-axis alignment
const chartWidth = 400; // Fixed chart width for consistent alignment
const pixelsPerUnit = chartWidth / 9; // 9 is max score

const barsHTML = summaryData.map((data, index) => {
    // Calculate exact bar width based on x-axis scale
    const exactBarWidth = data.totalTraits * pixelsPerUnit;
    const barWidth = Math.max(exactBarWidth, data.totalTraits > 0 ? 8 : 4);
    
    const assessmentDate = new Date(data.date).toLocaleDateString('en-US', { 
        month: 'short', day: 'numeric'
    });
    
    // Simple color scheme
    let barColor = '#22c55e'; // Green for good (0-2)
    let levelText = 'Great';
    if (data.totalTraits >= 6) {
        barColor = '#ef4444'; // Red for high (6+)
        levelText = 'High';
    } else if (data.totalTraits >= 3) {
        barColor = '#f97316'; // Orange for medium (3-5)
        levelText = 'Medium';
    } else if (data.totalTraits >= 1) {
        barColor = '#eab308'; // Yellow for low (1-2)
        levelText = 'Low';
    }
    
    const isNewest = index === 0;
    
    return `
        <div class="horizontal-bar-container">
            <div class="assessment-label">
                <div class="assessment-date">${assessmentDate}</div>
                <div class="assessment-score">${data.totalTraits}</div>
                <div class="assessment-level">${levelText}</div>
            </div>
            <div class="bar-chart-area" style="width: ${chartWidth}px;">
                <div class="horizontal-bar ${isNewest ? 'current' : ''}" 
                     style="width: ${barWidth}px; background: ${barColor};"
                     title="${data.totalTraits} negative traits">
                </div>
            </div>
        </div>
    `;
}).join('');
        
        // Get simple status
        const currentTraits = summaryData[0].totalTraits;
        let statusMessage = '';
        let statusClass = '';
        
        if (currentTraits === 0) {
            statusMessage = '🎉 Excellent! No negative traits detected.';
            statusClass = 'excellent';
        } else if (currentTraits <= 2) {
            statusMessage = '👍 Good! Very few negative traits.';
            statusClass = 'good';
        } else if (currentTraits <= 5) {
            statusMessage = '⚡ Room for improvement.';
            statusClass = 'medium';
        } else {
            statusMessage = '💪 Focus on improvement strategies.';
            statusClass = 'needs-work';
        }
        
        container.innerHTML = `
            <div class="clean-analysis-section">
                <div class="clean-header">
                    <h2><i class="fas fa-chart-simple"></i> Your Progress Summary</h2>
                    <p>Your negative traits over ${summaryData.length} assessment${summaryData.length > 1 ? 's' : ''}</p>
                </div>
                
                <div class="clean-status-card ${statusClass}">
                    <div class="current-score">
                        <span class="big-number">${currentTraits}</span>
                        <span class="score-label">Current Traits</span>
                    </div>
                    <div class="status-info">
                        <div class="status-message">${statusMessage}</div>
                        <div class="trend-info ${trendInfo.class}">
                            <i class="${trendInfo.icon}"></i>
                            <span>${trendInfo.text}</span>
                        </div>
                    </div>
                </div>
                
                <div class="clean-chart-container">
                    <div class="clean-chart-container">
    <div class="horizontal-chart">
        <div class="horizontal-bars">
            ${barsHTML}
        </div>
        <div class="x-axis-container">
            <div class="x-axis-spacer"></div>
            <div class="clean-x-labels">
                <span class="x-label">0</span>
                <span class="x-label">3</span>
                <span class="x-label">6</span>
                <span class="x-label">9</span>
            </div>
        </div>
    </div>
                    
                    <div class="clean-legend">
                        <div class="legend-item">
                            <div class="legend-dot excellent"></div>
                            <span>0-2 Great</span>
                        </div>
                        <div class="legend-item">
                            <div class="legend-dot medium"></div>
                            <span>3-5 Medium</span>
                        </div>
                        <div class="legend-item">
                            <div class="legend-dot high"></div>
                            <span>6+ High</span>
                        </div>
                    </div>
                </div>
                
                <div class="clean-tip">
                    <i class="fas fa-lightbulb"></i>
                    <span><strong>Remember:</strong> ${getSimpleAdvice(currentTraits, trendInfo)}</span>
                </div>
            </div>
        `;
        
        console.log('✅ Clean horizontal summary graph HTML generated');
    } catch (error) {
        console.error('Error building clean summary graph:', error);
        if (container) {
            container.innerHTML = '<div class="error-message">Error loading summary</div>';
        }
    }
}

function getSimpleAdvice(currentTraits, trendInfo) {
    if (currentTraits === 0) {
        return "You're doing great! Keep up the positive habits.";
    } else if (trendInfo.direction === 'better') {
        return "You're improving! Keep working on your strategies.";
    } else if (trendInfo.direction === 'more') {
        return "Focus on your top 2-3 traits first. Small steps count!";
    } else {
        return "Consistency is key. Use the improvement strategies daily.";
    }
}



function getSummaryInsights(summaryData, trendInfo) {
    const current = summaryData[0];
    const hasHistory = summaryData.length > 1;
    
    let insights = `You currently have <strong>${current.totalTraits} negative trait${current.totalTraits !== 1 ? 's' : ''}</strong>. `;
    
    if (current.totalTraits === 0) {
        insights += "Congratulations! You're showing no significant negative personality traits, which indicates excellent emotional and social well-being.";
    } else if (current.totalTraits <= 2) {
        insights += "This is a relatively low count, suggesting good overall personality health with just minor areas for improvement.";
    } else if (current.totalTraits <= 4) {
        insights += "This is a moderate level that's quite manageable with focused improvement strategies.";
    } else if (current.totalTraits <= 6) {
        insights += "This indicates several areas for improvement. Consider focusing on your top 2-3 traits first.";
    } else {
        insights += "This suggests significant areas for development. Take it step by step - even small improvements make a big difference.";
    }
    
    if (hasHistory) {
        if (trendInfo.direction === 'improving') {
            insights += ` <strong>Great news!</strong> Your trend shows improvement over time. ${trendInfo.text} since your previous assessment.`;
        } else if (trendInfo.direction === 'worsening') {
            insights += ` Your recent assessment shows ${trendInfo.text}. This might indicate increased stress or life changes - consider focusing on self-care.`;
        } else {
            insights += ` Your trait count has remained stable, which shows consistency in your personality patterns.`;
        }
    }
    
    return insights;
}

// Replace the buildProgressAnalytics function in negativeai.js with this enhanced version

function buildProgressAnalytics(user) {
    console.log('🏗️ Building enhanced progress analytics for up to 5 assessments...');
    const container = document.getElementById('progress-analytics');
    
    if (!container || !user || !user.badPersonality) {
        console.error('Invalid container or user data');
        return;
    }
    
    try {
        const badPersonalityHistory = user.badPersonality || [];
        
        // Check if we have historical data (at least 1 assessment)
        const hasHistory = badPersonalityHistory.length > 0;
        
        // Get all 9 negative traits
        const allNegativeTraits = Object.keys(negativeTraitData);
        
        // Get up to 5 most recent assessments
        const maxAssessments = Math.min(5, badPersonalityHistory.length);
        const assessments = badPersonalityHistory.slice(0, maxAssessments);
        
        // Create individual trait graphs for ALL 9 traits
        const traitGraphsHTML = allNegativeTraits.map((traitId, index) => {
            const traitData = negativeTraitData[traitId];
            if (!traitData) return '';
            
            // Get historical scores for this trait across all assessments
            const historicalScores = assessments.map(assessment => {
                const trait = assessment.traits ? assessment.traits.find(t => t.id === traitId) : null;
                return {
                    score: trait ? (trait.score || 0) : 0,
                    date: assessment.date
                };
            });
            
            // Current score is the most recent (first in array)
            const currentScore = historicalScores.length > 0 ? historicalScores[0].score : 0;
            
            // Calculate trend (compare current with previous if available)
            let trend = 'neutral';
            let trendIcon = 'fas fa-info-circle';
            let trendText = 'No previous data';
            let trendClass = 'neutral';
            
            if (historicalScores.length > 1) {
                const previousScore = historicalScores[1].score;
                const change = previousScore - currentScore;
                
                if (change > 0) {
                    trend = 'improving';
                    trendIcon = 'fas fa-arrow-down';
                    trendText = `Improved by ${change} points`;
                    trendClass = 'improving';
                } else if (change < 0) {
                    trend = 'worsening';
                    trendIcon = 'fas fa-arrow-up';
                    trendText = `Increased by ${Math.abs(change)} points`;
                    trendClass = 'worsening';
                } else {
                    trend = 'stable';
                    trendIcon = 'fas fa-minus';
                    trendText = 'No change';
                    trendClass = 'stable';
                }
            }
            
            // Create bars for up to 5 assessments
            const barsHTML = historicalScores.map((scoreData, scoreIndex) => {
    // Calculate height based on 5-point scale with proper Y-axis alignment
    const barHeight = (scoreData.score / 5) * 160; // 160px = full height for score 5
    const minHeight = 8; // Minimum visible height
    const finalHeight = Math.max(barHeight, scoreData.score > 0 ? minHeight : 4);
    
    const assessmentDate = new Date(scoreData.date).toLocaleDateString('en-US', { 
        month: 'short', day: 'numeric'
    });
    
    // Color gradient from oldest (lighter) to newest (darker)
    const opacity = 0.6 + (scoreIndex * 0.1); // Newest is most opaque
    const isNewest = scoreIndex === 0;
    
    return `
        <div class="assessment-bar-container">
            <div class="assessment-bar ${isNewest ? 'current-assessment' : 'previous-assessment'}" 
                 style="height: ${finalHeight}px; 
                        background: linear-gradient(to top, 
                            ${adjustColorBrightness(traitData.color, -20)}, 
                            ${traitData.color}); 
                        opacity: ${opacity};
                        ${isNewest ? 'border: 2px solid rgba(255,255,255,0.8);' : ''}"
                 title="Assessment ${scoreIndex + 1}: ${scoreData.score}/5 points">
                <span class="bar-score-multi">${scoreData.score}</span>
            </div>
            <div class="assessment-date-label">${assessmentDate}</div>
        </div>
    `;
}).join('');
            
            // Create legend for multiple assessments
            // Create legend for multiple assessments
const legendHTML = historicalScores.length > 1 ? `
    <div class="graph-legend-multi">
        <div class="legend-header">Assessment History (${historicalScores.length} tests)</div>
        <div class="legend-items-multi">
            ${historicalScores.map((scoreData, scoreIndex) => {
                const assessmentDate = new Date(scoreData.date).toLocaleDateString('en-US', { 
                    month: 'short', day: 'numeric', year: 'numeric'
                });
                const isNewest = scoreIndex === 0;
                
                return `
                    <div class="legend-item-multi ${isNewest ? 'newest' : ''}">
                        <div class="legend-color-multi" style="background: ${traitData.color}; opacity: ${0.6 + (scoreIndex * 0.1)};"></div>
                        <span>${isNewest ? 'Latest' : `#${scoreIndex + 1}`}: ${scoreData.score}/5 (${assessmentDate})</span>
                    </div>
                `;
            }).join('')}
        </div>
    </div>
` : `
    <div class="graph-legend-multi">
        <div class="legend-header">Single Assessment</div>
        <div class="legend-items-multi">
            <div class="legend-item-multi newest">
                <div class="legend-color-multi" style="background: ${traitData.color};"></div>
                <span>Current: ${currentScore}/5</span>
            </div>
        </div>
    </div>
`;
            
            return `
                <div class="trait-graph-card-multi ${trendClass}" style="animation-delay: ${index * 0.1}s;">
                    <div class="trait-card-header" style="background: linear-gradient(135deg, ${traitData.color}, ${adjustColorBrightness(traitData.color, -20)});">
                        <h3 class="trait-card-title">${traitData.name}</h3>
                    </div>
                    
                    <div class="trait-card-body">
                        <div class="trait-description">
                            <p>${traitData.description}</p>
                        </div>
                        
                        <div class="trait-graph-section">
                            <div class="graph-container-multi">
                                ${legendHTML}
                                
                                <div class="multi-assessment-chart">
    <div class="y-axis-multi">
        <div class="y-tick-multi">5</div>
        <div class="y-tick-multi">4</div>
        <div class="y-tick-multi">3</div>
        <div class="y-tick-multi">2</div>
        <div class="y-tick-multi">1</div>
    </div>
    <div class="bars-container-multi">
        ${barsHTML}
    </div>
</div>
                            </div>
                        </div>
                        
                        <div class="trait-trend">
                            <div class="trend-indicator ${trend}">
                                <i class="${trendIcon}"></i>
                                <span class="trend-text">${trendText}</span>
                            </div>
                        </div>
                        
                        <div class="trait-level-info">
                            <span class="current-level">Current Level: <strong>${getScoreLevel(currentScore)}</strong></span>
                            ${currentScore === 0 ? '<span class="no-trait-indicator">Not detected in your assessment</span>' : ''}
                        </div>
                        
                        <div class="trait-actions">
                            <button class="trait-action-btn view-strategies" data-trait="${traitId}">
                                <i class="fas fa-lightbulb"></i>
                                View Strategies
                            </button>
                            <button class="trait-action-btn track-progress" data-trait="${traitId}">
                                <i class="fas fa-chart-line"></i>
                                Track Progress
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');
        
        // Calculate overall progress summary for multiple assessments
        let overallStatsHTML = '';
        if (assessments.length > 1) {
            const currentAssessment = assessments[0];
            const previousAssessment = assessments[1];
            
            const currentAverage = currentAssessment.traits && currentAssessment.traits.length > 0 ? 
                Math.round(currentAssessment.traits.reduce((sum, trait) => sum + (trait.score || 0), 0) / currentAssessment.traits.length) : 0;
            const previousAverage = previousAssessment.traits && previousAssessment.traits.length > 0 ? 
                Math.round(previousAssessment.traits.reduce((sum, trait) => sum + (trait.score || 0), 0) / previousAssessment.traits.length) : 0;
            const overallImprovement = previousAverage - currentAverage;
            
            const currentDate = new Date(currentAssessment.date).toLocaleDateString('en-US', { 
                month: 'long', day: 'numeric', year: 'numeric'
            });
            const previousDate = new Date(previousAssessment.date).toLocaleDateString('en-US', { 
                month: 'long', day: 'numeric', year: 'numeric'
            });
            
            overallStatsHTML = `
                <div class="overall-progress-summary-multi">
                    <div class="summary-card-multi ${overallImprovement > 0 ? 'improvement' : overallImprovement < 0 ? 'decline' : 'stable'}">
                        <div class="summary-icon">
                            <i class="fas ${overallImprovement > 0 ? 'fa-trending-down' : overallImprovement < 0 ? 'fa-trending-up' : 'fa-minus'}"></i>
                        </div>
                        <div class="summary-content">
                            <h4>Overall ${overallImprovement > 0 ? 'Improvement' : overallImprovement < 0 ? 'Change' : 'Stability'}</h4>
                            <p>Average score ${overallImprovement > 0 ? 'decreased' : overallImprovement < 0 ? 'increased' : 'remained'} by ${Math.abs(overallImprovement)} points</p>
                            <div class="comparison-dates">
                                <span class="date-comparison">${previousDate} → ${currentDate}</span>
                            </div>
                            <div class="assessment-count">Based on ${assessments.length} assessments</div>
                        </div>
                        <div class="summary-change ${overallImprovement > 0 ? 'positive' : overallImprovement < 0 ? 'negative' : 'neutral'}">
                            ${overallImprovement > 0 ? '-' : overallImprovement < 0 ? '+' : ''}${Math.abs(overallImprovement)}
                        </div>
                    </div>
                </div>
            `;
        }
        
        container.innerHTML = `
            <div class="analysis-section">
                <div class="section-header">
                    <div class="section-icon">
                        <i class="fas fa-chart-bar"></i>
                    </div>
                    <h2 class="section-title">Enhanced Progress Analytics (Up to 5 Assessments)</h2>
                </div>
                
                <div class="analytics-overview">
                    <div class="overview-card">
                        <div class="overview-icon">
                            <i class="fas fa-chart-column"></i>
                        </div>
                        <div class="overview-content">
                            <h4>Comprehensive Multi-Assessment Analysis</h4>
                            <p>Track your progress across up to 5 assessments. View trends for all 9 negative personality traits with detailed historical comparison. Each bar represents a different assessment date.</p>
                        </div>
                    </div>
                </div>
                
                ${overallStatsHTML}
                
                <div class="trait-graphs-grid-multi">
                    ${traitGraphsHTML}
                </div>
                
                <div class="analytics-insights">
                    <h4><i class="fas fa-lightbulb"></i> Understanding Your Multi-Assessment Analysis</h4>
                    <div class="insights-grid">
                        <div class="insight-card">
                            <div class="insight-icon improving">
                                <i class="fas fa-chart-line"></i>
                            </div>
                            <div class="insight-content">
                                <h5>Track Long-term Progress</h5>
                                <p>Compare up to 5 assessments to see meaningful trends and patterns in your personality development over time.</p>
                            </div>
                        </div>
                        <div class="insight-card">
                            <div class="insight-icon worsening">
                                <i class="fas fa-calendar-alt"></i>
                            </div>
                            <div class="insight-content">
                                <h5>Date-based Comparison</h5>
                                <p>Each bar shows the assessment date, allowing you to correlate changes with life events or improvement efforts.</p>
                            </div>
                        </div>
                        <div class="insight-card">
                            <div class="insight-icon neutral">
                                <i class="fas fa-trophy"></i>
                            </div>
                            <div class="insight-content">
                                <h5>Celebrate Improvements</h5>
                                <p>Lower scores over time indicate successful progress in reducing negative traits - celebrate your growth!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add event listeners for interactive buttons
        setupTraitAnalyticsInteractions(user);
        
        console.log('✅ Enhanced multi-assessment analytics generated');
    } catch (error) {
        console.error('Error building enhanced progress analytics:', error);
        if (container) {
            container.innerHTML = '<div class="error-message">Error loading progress analytics</div>';
        }
    }
}

// Add this new function after buildProgressAnalytics
function setupTraitAnalyticsInteractions(user) {
    try {
        // View strategies buttons
        document.querySelectorAll('.view-strategies').forEach(button => {
            button.addEventListener('click', (e) => {
                const traitId = e.target.closest('button').dataset.trait;
                scrollToStrategies(traitId);
            });
        });
        
        // Track progress buttons
        document.querySelectorAll('.track-progress').forEach(button => {
            button.addEventListener('click', (e) => {
                const traitId = e.target.closest('button').dataset.trait;
                scrollToProgressTracking(traitId);
            });
        });
    } catch (error) {
        console.error('Error setting up trait analytics interactions:', error);
    }
}

function scrollToStrategies(traitId) {
    try {
        const strategiesSection = document.getElementById('improvement-strategies');
        if (strategiesSection) {
            strategiesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            // Highlight the relevant strategy cards
            setTimeout(() => {
                const strategyCards = strategiesSection.querySelectorAll('.strategy-card');
                strategyCards.forEach(card => {
                    const badge = card.querySelector('.strategy-trait-badge');
                    if (badge && badge.textContent.includes(negativeTraitData[traitId]?.name)) {
                        card.style.border = '3px solid #27ae60';
                        card.style.transform = 'scale(1.02)';
                        setTimeout(() => {
                            card.style.border = '';
                            card.style.transform = '';
                        }, 3000);
                    }
                });
            }, 500);
        }
    } catch (error) {
        console.error('Error scrolling to strategies:', error);
    }
}

function scrollToProgressTracking(traitId) {
    try {
        const progressSection = document.getElementById('progress-tracking');
        if (progressSection) {
            progressSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            
            // Highlight the relevant progress section
            setTimeout(() => {
                const progressSections = progressSection.querySelectorAll('.trait-progress-section');
                progressSections.forEach(section => {
                    const header = section.querySelector('.trait-progress-header h4');
                    if (header && header.textContent.includes(negativeTraitData[traitId]?.name)) {
                        section.style.border = '3px solid #3498db';
                        section.style.transform = 'scale(1.02)';
                        setTimeout(() => {
                            section.style.border = '';
                            section.style.transform = '';
                        }, 3000);
                    }
                });
            }, 500);
        }
    } catch (error) {
        console.error('Error scrolling to progress tracking:', error);
    }
}

// Show ALL traits instead of just 3
function buildAllTraitsAnalysis(user) {
    console.log('🏗️ Building complete traits analysis...');
    const container = document.getElementById('all-traits-analysis');
    
    if (!container || !user || !user.badPersonality || !user.badPersonality[0] || !user.badPersonality[0].traits) {
        console.error('Invalid container or user data for traits analysis');
        return;
    }
    
    try {
        // Build cards for ALL user's negative traits
        const traitCards = user.badPersonality[0].traits.map((trait, index) => {
            const data = negativeTraitData[trait.id];
            
            console.log(`🔍 Processing trait card ${index + 1} for ${trait.id}:`, data);
            
            // Handle case where trait data might not exist
            if (!data) {
                console.warn(`⚠️ No trait data found for: ${trait.id}`);
                return `
                    <div class="trait-card">
                        <div class="card-header" style="background: linear-gradient(135deg, #e74c3c, #c0392b);">
                            <div class="card-title">
                                <span class="trait-name-header">${trait.name || 'Unknown Trait'}</span>
                                <span class="severity-badge">Unknown</span>
                            </div>
                            <div class="trait-description">Trait data not available</div>
                        </div>
                        <div class="card-body">
                            <p>Analysis data not available for this trait.</p>
                        </div>
                    </div>
                `;
            }
            
            // Use actual test score
            const actualScore = trait.score || 0;
            
            return `
                <div class="trait-card complete-analysis" style="animation-delay: ${index * 0.1}s;">
                    <div class="card-header" style="background: linear-gradient(135deg, ${data.color}, ${adjustColorBrightness(data.color, -20)}); position: relative;">
                        <div class="card-title">
                            <span class="trait-name-header">${data.name}</span>
                            <span class="severity-badge">${getScoreLevel(actualScore)}</span>
                        </div>
                        <div class="trait-description">${data.title}</div>
                        <div class="trait-category-badge">${data.category}</div>
                    </div>
                    
                    <div class="card-body">
                        <p style="color: #4a5568; line-height: 1.6; margin-bottom: 1.5rem;">${data.description}</p>
                        
                        <div class="impact-analysis">
                            <h4><i class="fas fa-exclamation-triangle"></i> Life Impact Analysis</h4>
                            <ul class="impact-list">
                                ${data.impacts.map(impact => `<li>${impact}</li>`).join('')}
                            </ul>
                        </div>
                        
                        <div class="quick-stats">
    <div class="quick-stat">
        <div class="stat-icon"><i class="fas fa-chart-line"></i></div>
        <div class="stat-info">
            <div class="stat-label">Test Score</div>
            <div class="stat-value">${actualScore}/5</div>
        </div>
    </div>
    <div class="quick-stat">
        <div class="stat-icon"><i class="fas fa-calendar-alt"></i></div>
        <div class="stat-info">
            <div class="stat-label">Est. Timeline</div>
            <div class="stat-value">${getEstimatedTimelineByScore(actualScore)}</div>
        </div>
    </div>
</div>
                        
                        <div style="background: rgba(230, 255, 250, 0.9); padding: 1rem; border-radius: 8px; margin-top: 1.5rem; border-left: 4px solid #38b2ac; backdrop-filter: blur(5px);">
                            <h4 style="color: #2c7a7b; margin-bottom: 0.5rem;">
                                <i class="fas fa-heart" style="color: #38b2ac;"></i> 
                                Encouragement Note
                            </h4>
                            <p style="color: #285e61; font-size: 0.9rem; line-height: 1.5; margin: 0;">
                                ${getEncouragementMessage(trait.id)}
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
                        <i class="fas fa-search-plus"></i>
                    </div>
                    <h2 class="section-title">Complete Trait Analysis (All ${user.badPersonality[0].traits.length} Traits)</h2>
                </div>
                
                <div style="background: rgba(247, 250, 252, 0.9); padding: 1.5rem; border-radius: 10px; margin-bottom: 2rem; backdrop-filter: blur(10px);">
                    <p style="color: #4a5568; line-height: 1.6;">
                        Here's your complete analysis showing <strong>all ${user.badPersonality[0].traits.length} negative traits</strong> identified in your assessment. 
                        Each trait includes detailed impact analysis, actual test scores, and personalized improvement strategies. 
                        We show every trait because even lower scoring tendencies can benefit from awareness and targeted improvement.
                    </p>
                </div>
                
                <div class="trait-cards-complete">
                    ${traitCards}
                </div>
            </div>
        `;
        
        console.log('✅ Complete traits analysis HTML generated');
    } catch (error) {
        console.error('Error building all traits analysis:', error);
        if (container) {
            container.innerHTML = '<div class="error-message">Error loading trait analysis</div>';
        }
    }
}

// Show improvement notice if user has fewer traits than before
function showImprovementNotice(user) {
    console.log('🔍 Checking for improvement...');
    
    try {
        const badPersonalityHistory = user.badPersonality || [];
        
        if (badPersonalityHistory.length < 2) {
            console.log('📝 Not enough data for improvement comparison');
            return;
        }
        
        // Get current (latest) and previous assessment
        const currentAssessment = badPersonalityHistory[0];
        const previousAssessment = badPersonalityHistory[1];
        
        // Skip if current assessment doesn't have traits
        if (!currentAssessment.traits || currentAssessment.traits.length === 0) {
            return;
        }
        
        // Skip if previous assessment doesn't have traits
        if (!previousAssessment.traits || previousAssessment.traits.length === 0) {
            return;
        }
        
        const currentTraitCount = currentAssessment.traits.length;
        const previousTraitCount = previousAssessment.traits.length;
        
        console.log(`📊 Current traits: ${currentTraitCount}, Previous traits: ${previousTraitCount}`);
        
        if (currentTraitCount < previousTraitCount) {
            const improvement = previousTraitCount - currentTraitCount;
            console.log(`🎉 User improved! Reduced ${improvement} negative trait(s)`);
            
            // Show improvement notification
            setTimeout(() => {
                showImprovementMessage(improvement, previousTraitCount, currentTraitCount);
            }, 1000);
        }
    } catch (error) {
        console.error('Error checking for improvement:', error);
    }
}

function showImprovementMessage(improvement, previousCount, currentCount) {
    try {
        const improvementNotification = document.createElement('div');
        improvementNotification.className = 'improvement-notification';
        improvementNotification.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: linear-gradient(135deg, #27ae60, #2ecc71);
            color: white;
            padding: 2rem 3rem;
            border-radius: 20px;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            text-align: center;
            max-width: 90%;
            max-width: 500px;
            animation: celebrationPulse 0.6s ease-out;
        `;
        
        improvementNotification.innerHTML = `
            <div style="font-size: 3rem; margin-bottom: 1rem;">🎉</div>
            <h2 style="margin-bottom: 1rem; font-size: 2rem;">Congratulations!</h2>
            <p style="font-size: 1.2rem; margin-bottom: 1rem; line-height: 1.5;">
                <strong>You've made incredible progress!</strong><br>
                You previously had <strong>${previousCount} negative traits</strong> and now you have <strong>${currentCount} traits</strong>.
                <br><br>
                That's an improvement of <strong>${improvement} trait${improvement > 1 ? 's' : ''}</strong>! 
                Keep up the amazing work! 💪
            </p>
            <button class="celebration-close-btn" style="
                background: rgba(255, 255, 255, 0.2);
                color: white;
                border: none;
                padding: 0.75rem 2rem;
                border-radius: 25px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s ease;
                backdrop-filter: blur(10px);
            ">
                Continue to Analysis
            </button>
        `;
        
        document.body.appendChild(improvementNotification);
        
        // Add celebration animation styles
        const celebrationStyle = document.createElement('style');
        celebrationStyle.textContent = `
            @keyframes celebrationPulse {
                0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0; }
                50% { transform: translate(-50%, -50%) scale(1.1); }
                100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
            }
        `;
        document.head.appendChild(celebrationStyle);
        
        // Add event listener to close button
        const closeBtn = improvementNotification.querySelector('.celebration-close-btn');
        closeBtn.addEventListener('click', () => {
            improvementNotification.style.animation = 'celebrationPulse 0.3s ease-in reverse';
            setTimeout(() => {
                if (document.body.contains(improvementNotification)) {
                    document.body.removeChild(improvementNotification);
                }
                if (document.head.contains(celebrationStyle)) {
                    document.head.removeChild(celebrationStyle);
                }
            }, 300);
        });
        
        closeBtn.addEventListener('mouseover', () => {
            closeBtn.style.background = 'rgba(255, 255, 255, 0.3)';
            closeBtn.style.transform = 'translateY(-2px)';
        });
        
        closeBtn.addEventListener('mouseout', () => {
            closeBtn.style.background = 'rgba(255, 255, 255, 0.2)';
            closeBtn.style.transform = 'translateY(0)';
        });
        
        // Auto close after 10 seconds
        setTimeout(() => {
            if (document.body.contains(improvementNotification)) {
                closeBtn.click();
            }
        }, 10000);
    } catch (error) {
        console.error('Error showing improvement message:', error);
    }
}

// Achievement System
function buildAchievementSystem(user) {
    console.log('🏗️ Building achievement system...');
    const container = document.getElementById('achievement-system');
    
    if (!container || !user) {
        console.error('Invalid container or user data for achievement system');
        return;
    }
    
    try {
        // Get user achievements from storage or initialize
        const userAchievements = window.utils.storage.get(`achievements_${user.id}`) || [];
        
        const availableAchievements = [
            {
                id: 'first_assessment',
                title: 'Self-Awareness Pioneer',
                description: 'Completed your first negative trait assessment',
                icon: 'fas fa-medal',
                color: '#f39c12',
                unlocked: true
            },
            {
                id: 'habit_streak_7',
                title: 'Week Warrior',
                description: 'Maintain a habit streak for 7 days',
                icon: 'fas fa-calendar-check',
                color: '#3498db',
                unlocked: userAchievements.includes('habit_streak_7')
            },
            {
                id: 'habit_streak_30',
                title: 'Habit Master',
                description: 'Maintain a habit streak for 30 days',
                icon: 'fas fa-calendar-check',
                color: '#8e44ad',
                unlocked: userAchievements.includes('habit_streak_30')
            },
        ];
        
        const achievementCards = availableAchievements.map(achievement => `
            <div class="achievement-card ${achievement.unlocked ? 'unlocked' : 'locked'}">
                <div class="achievement-icon" style="background: ${achievement.color};">
                    <i class="${achievement.icon}"></i>
                </div>
                <div class="achievement-info">
                    <h4 class="achievement-title">${achievement.title}</h4>
                    <p class="achievement-description">${achievement.description}</p>
                </div>
                <div class="achievement-status">
                    ${achievement.unlocked ? 
                        '<i class="fas fa-check-circle unlocked-icon"></i>' : 
                        '<i class="fas fa-lock locked-icon"></i>'
                    }
                </div>
            </div>
        `).join('');
        
        const unlockedCount = availableAchievements.filter(a => a.unlocked).length;
        const completionPercentage = (unlockedCount / availableAchievements.length) * 100;
        
        container.innerHTML = `
            <div class="analysis-section">
                <div class="section-header">
                    <div class="section-icon">
                        <i class="fas fa-medal"></i>
                    </div>
                    <h2 class="section-title">Achievement System</h2>
                </div>
                
                <div class="achievement-progress">
                    <h4>Your Progress: ${unlockedCount}/${availableAchievements.length} Achievements</h4>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${completionPercentage}%;"></div>
                    </div>
                </div>
                
                <div class="achievements-grid">
                    ${achievementCards}
                </div>
            </div>
        `;
        
        console.log('✅ Achievement system HTML generated');
    } catch (error) {
        console.error('Error building achievement system:', error);
        if (container) {
            container.innerHTML = '<div class="error-message">Error loading achievement system</div>';
        }
    }
}

// FIXED FUNCTION NAME - was missing "function bu" at the beginning
function buildProgressTracking(user) {
    console.log('🏗️ Building enhanced progress tracking...');
    const container = document.getElementById('progress-tracking');
    
    if (!container || !user || !user.badPersonality || !user.badPersonality[0] || !user.badPersonality[0].traits) {
        console.error('Invalid container or user data for progress tracking');
        return;
    }
    
    try {
        // Get the primary traits (top 3) for detailed milestone tracking
        const primaryTraits = user.badPersonality[0].traits.slice(0, 3);
        const progressData = window.utils.storage.get(`progress_${user.id}`) || {};
        
        const milestoneTracking = primaryTraits.map(trait => {
    const data = negativeTraitData[trait.id];
    if (!data) return '';
    
    const traitProgress = progressData[trait.id] || { currentMilestone: 0, completedMilestones: [] };
    
    const milestoneItems = data.milestones.map((milestone, index) => {
        const isCompleted = traitProgress.completedMilestones.includes(index);
        const isCurrent = traitProgress.currentMilestone === index;
        
        return `
            <div class="milestone-item ${isCompleted ? 'completed' : ''} ${isCurrent ? 'current' : ''}" 
                 style="animation-delay: ${index * 0.2}s;">
                <div class="milestone-marker">
                    ${isCompleted ? '<i class="fas fa-check-circle"></i>' : 
                      isCurrent ? '<i class="fas fa-play-circle"></i>' : 
                      '<i class="far fa-circle"></i>'}
                </div>
                <div class="milestone-content">
                    <div class="milestone-title">${milestone.title}</div>
                    <div class="milestone-description">${milestone.description}</div>
                    <div class="milestone-duration">Duration: ${milestone.duration}</div>
                    ${isCurrent ? '<div class="milestone-current-badge">Current Focus</div>' : ''}
                </div>
                <div class="milestone-actions">
                    ${!isCompleted ? `
                        <button class="milestone-tick-btn" 
                                data-trait="${trait.id}" 
                                data-milestone="${index}"
                                title="Mark as completed">
                            <i class="fas fa-check"></i>
                            Complete
                        </button>
                    ` : `
                        <button class="milestone-undo-btn" 
                                data-trait="${trait.id}" 
                                data-milestone="${index}"
                                title="Mark as incomplete">
                            <i class="fas fa-undo"></i>
                            Undo
                        </button>
                    `}
                </div>
            </div>
        `;
    }).join('');
    
    return `
        <div class="trait-progress-section">
            <div class="trait-progress-header" style="background: linear-gradient(135deg, ${data.color}, ${adjustColorBrightness(data.color, -20)});">
                <h4 style="color: white;">${data.name} Progress</h4>
                <div class="progress-percentage">
                    ${(traitProgress.completedMilestones.length * 25)}% Complete
                </div>
            </div>
            <div class="milestone-timeline">
                ${milestoneItems}
            </div>
        </div>
    `;
}).join('');
        
        container.innerHTML = `
            <div class="analysis-section">
                <div class="section-header">
                    <div class="section-icon">
                        <i class="fas fa-chart-line"></i>
                    </div>
                    <h2 class="section-title">Progress Tracking Dashboard</h2>
                </div>
                
                <div style="background: rgba(247, 250, 252, 0.9); padding: 1.5rem; border-radius: 10px; margin-bottom: 2rem; backdrop-filter: blur(10px);">
                    <h4 style="color: #2d3748; margin-bottom: 1rem;"><i class="fas fa-flag-checkered"></i> Your Improvement Journey</h4>
                    <p style="color: #4a5568; line-height: 1.6;">
                        Track your progress through structured improvement milestones for your top 3 traits. Each milestone 
                        represents a significant step forward in overcoming negative patterns and building positive habits.
                    </p>
                </div>
                
                <div class="progress-tracking-dashboard">
                    ${milestoneTracking}
                </div>
                
                <div style="background: rgba(255, 243, 205, 0.9); padding: 1.5rem; border-radius: 10px; margin-top: 2rem; border-left: 4px solid #f39c12; backdrop-filter: blur(10px);">
                    <h4 style="color: #e67e22; margin-bottom: 1rem;"><i class="fas fa-lightbulb"></i> Progress Tips</h4>
                    <ul style="color: #d35400; margin: 0; padding-left: 1.5rem;">
                        <li>Focus on one milestone at a time to avoid overwhelm</li>
                        <li>Celebrate each completed milestone as a significant achievement</li>
                        <li>Don't be discouraged by setbacks—they're part of the process</li>
                        <li>Consider working with a therapist or coach for additional support</li>
                        <li>Share your progress with trusted friends for accountability</li>
                    </ul>
                </div>
            </div>
        `;
        
        console.log('✅ Enhanced progress tracking HTML generated');
    } catch (error) {
        console.error('Error building progress tracking:', error);
        if (container) {
            container.innerHTML = '<div class="error-message">Error loading progress tracking</div>';
        }
    }
}

function buildHabitTracker(user) {
    console.log('🏗️ Building enhanced habit tracker...');
    const container = document.getElementById('habit-tracker');
    
    if (!container || !user || !user.badPersonality || !user.badPersonality[0] || !user.badPersonality[0].traits) {
        console.error('Invalid container or user data for habit tracker');
        return;
    }
    
    try {
        const negativeTraits = user.badPersonality[0].traits;
        const habitData = window.utils.storage.get(`habits_${user.id}`) || {};
        
        // Generate habits for all traits, not just top 3
        const allHabits = negativeTraits.map(trait => {
            const data = negativeTraitData[trait.id];
            if (!data) return null;
            
            return data.dailyPractices.map(practice => ({
                id: `${trait.id}_${practice.title.replace(/\s+/g, '_').toLowerCase()}`,
                title: practice.title,
                description: practice.description,
                frequency: practice.frequency,
                traitName: data.name,
                traitColor: data.color,
                streak: habitData[`${trait.id}_${practice.title.replace(/\s+/g, '_').toLowerCase()}`]?.streak || 0,
                lastCompleted: habitData[`${trait.id}_${practice.title.replace(/\s+/g, '_').toLowerCase()}`]?.lastCompleted || null
            }));
        }).filter(Boolean).flat();
        
        const habitCards = allHabits.map(habit => {
            const today = new Date().toDateString();
            const completedToday = habit.lastCompleted === today;
            
            // Generate last 7 days for mini streak display
            const last7Days = Array.from({ length: 7 }, (_, i) => {
                const date = new Date();
                date.setDate(date.getDate() - i);
                return date.toDateString();
            }).reverse();
            
            const streakDisplay = last7Days.map(day => {
                const completed = habitData[habit.id]?.completedDays?.includes(day);
                return `<div class="streak-day ${completed ? 'completed' : ''} ${day === today ? 'today' : ''}"></div>`;
            }).join('');
            
            return `
                <div class="habit-card ${completedToday ? 'completed-today' : ''}">
                    <div class="habit-header">
                        <div class="habit-icon" style="background: ${habit.traitColor};">
                            <i class="fas fa-calendar-check"></i>
                        </div>
                        <div class="habit-info">
                            <h4 class="habit-title">${habit.title}</h4>
                            <p class="habit-trait">For: ${habit.traitName}</p>
                        </div>
                        <div class="habit-streak">
                            <div class="streak-number">${habit.streak}</div>
                            <div class="streak-label">day streak</div>
                        </div>
                    </div>
                    
                    <div class="habit-description">${habit.description}</div>
                    <div class="habit-frequency">${habit.frequency}</div>
                    
                    <div class="habit-streak-visual">
                        <div class="streak-days">
                            ${streakDisplay}
                        </div>
                    </div>
                    
                    <div class="habit-actions">
                        ${completedToday ? 
                            '<button class="button button-secondary habit-uncomplete" data-habit="' + habit.id + '">Undo</button>' :
                            '<button class="button button-primary habit-complete" data-habit="' + habit.id + '">Mark Complete</button>'
                        }
                    </div>
                </div>
            `;
        }).join('');
        
        container.innerHTML = `
            <div class="analysis-section">
                <div class="section-header">
                    <div class="section-icon">
                        <i class="fas fa-calendar-alt"></i>
                    </div>
                    <h2 class="section-title">Comprehensive Habit Tracker</h2>
                </div>
                
                <div style="background: rgba(230, 255, 250, 0.9); padding: 1.5rem; border-radius: 10px; margin-bottom: 2rem; border-left: 4px solid #38b2ac; backdrop-filter: blur(10px);">
                    <h4 style="color: #2c7a7b; margin-bottom: 1rem;"><i class="fas fa-seedling"></i> All Your Improvement Habits</h4>
                    <p style="color: #285e61; line-height: 1.6;">
                        Track daily practices for ALL your negative traits. This comprehensive tracker helps you build positive 
                        habits to counter each identified trait. Consistency is key—small daily actions lead to big transformations over time.
                    </p>
                </div>
                
                <div class="comprehensive-habit-grid">
                    ${habitCards}
                </div>
            </div>
        `;
        
        // Add event listeners for habit tracking
        setupHabitTrackerEvents(user);
        
        console.log('✅ Comprehensive habit tracker HTML generated');
    } catch (error) {
        console.error('Error building habit tracker:', error);
        if (container) {
            container.innerHTML = '<div class="error-message">Error loading habit tracker</div>';
        }
    }
}

// Enhanced improvement strategies function
function buildImprovementStrategies(user) {
    console.log('🏗️ Building comprehensive improvement strategies...');
    const container = document.getElementById('improvement-strategies');
    
    if (!container || !user || !user.badPersonality || !user.badPersonality[0] || !user.badPersonality[0].traits) {
        console.error('Invalid container or user data for improvement strategies');
        return;
    }
    
    try {
        // Build strategy cards for ALL user's negative traits
        const strategyCards = user.badPersonality[0].traits.map((trait, index) => {
            const data = negativeTraitData[trait.id];
            
            if (!data || !data.strategies) {
                console.warn(`⚠️ No strategy data found for: ${trait.id}`);
                return '';
            }
            
            return data.strategies.map((strategy, strategyIndex) => {
                return `
                    <div class="strategy-card comprehensive" style="animation-delay: ${(index * 2 + strategyIndex) * 0.1}s;">
                        <div class="strategy-header">
                            <div class="strategy-title">
                                <i class="fas fa-lightbulb"></i>
                                ${strategy.title}
                            </div>
                            <div class="strategy-trait-badge" style="background: ${data.color};">
                                For: ${data.name}
                            </div>
                        </div>
                        
                        <div class="strategy-description">
                            <p style="color: #4a5568; line-height: 1.6; margin-bottom: 1rem;">${strategy.description}</p>
                        </div>
                        
                        <div class="strategy-content">
                            <h5 style="color: #27ae60; margin-bottom: 0.75rem; display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-tasks"></i> Action Steps:
                            </h5>
                            <ul class="strategy-steps enhanced">
                                ${strategy.steps.map((step, stepIndex) => `
                                    <li style="animation-delay: ${(stepIndex) * 0.1}s;">
                                        <span class="step-number">${stepIndex + 1}</span>
                                        <span class="step-content">${step}</span>
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                        
                        <div class="strategy-metrics">
                            <div class="metric">
                                <i class="fas fa-clock"></i>
                                <span>Est. Time: ${getStrategyTimeEstimateByScore(trait.score)} mins/day</span>
                            </div>
                            <div class="metric">
                                <i class="fas fa-chart-line"></i>
                                <span>Difficulty: ${getStrategyDifficultyByScore(trait.score)}</span>
                            </div>
                            <div class="metric">
                                <i class="fas fa-calendar-alt"></i>
                                <span>Timeline: ${getEstimatedTimelineByScore(trait.score)}</span>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');
        }).join('');
        
        container.innerHTML = `
            <div class="analysis-section">
                <div class="section-header">
                    <div class="section-icon">
                        <i class="fas fa-rocket"></i>
                    </div>
                    <h2 class="section-title">Comprehensive Improvement Strategies</h2>
                </div>
                
                <div style="background: rgba(230, 255, 250, 0.9); padding: 1.5rem; border-radius: 10px; margin-bottom: 2rem; border-left: 4px solid #27ae60; backdrop-filter: blur(10px);">
                    <h4 style="color: #2c7a7b; margin-bottom: 1rem;"><i class="fas fa-map"></i> Your Complete Roadmap</h4>
                    <p style="color: #285e61; line-height: 1.6;">
                        These evidence-based strategies are specifically tailored to help you overcome <strong>ALL ${user.badPersonality[0].traits.length} of your identified negative traits</strong>. 
                        Each strategy includes practical action steps, time estimates based on your test scores, and difficulty ratings. Work through these systematically for best results.
                    </p>
                </div>
                
                <div class="comprehensive-improvement-strategies">
                    ${strategyCards}
                </div>
                
                <div class="strategy-implementation-guide">
                    <h4><i class="fas fa-info-circle"></i> Implementation Guidelines</h4>
                    <div class="implementation-tips">
                        <div class="tip-card">
                            <h5>🎯 Start Small</h5>
                            <p>Begin with 1-2 strategies for your top traits. Mastery is better than overwhelm.</p>
                        </div>
                        <div class="tip-card">
                            <h5>📅 Be Consistent</h5>
                            <p>Daily practice for 15-30 minutes is more effective than sporadic intensive sessions.</p>
                        </div>
                        <div class="tip-card">
                            <h5>📊 Track Progress</h5>
                            <p>Use the habit tracker and progress analytics to monitor your improvement journey.</p>
                        </div>
                        <div class="tip-card">
                            <h5>🤝 Get Support</h5>
                            <p>Share your goals with trusted friends or consider working with a therapist.</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        console.log('✅ Comprehensive improvement strategies HTML generated');
    } catch (error) {
        console.error('Error building improvement strategies:', error);
        if (container) {
            container.innerHTML = '<div class="error-message">Error loading improvement strategies</div>';
        }
    }
}

// Setup all interactive features
function setupInteractiveFeatures(user) {
    console.log('🔧 Setting up interactive features...');
    
    try {
        // Modal close buttons
        document.querySelectorAll('.modal-close').forEach(button => {
            button.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal-overlay');
                if (modal) {
                    modal.style.display = 'none';
                }
            });
        });
        
        console.log('✅ Interactive features setup complete');
    } catch (error) {
        console.error('Error setting up interactive features:', error);
    }
}

// Helper functions for new features

function getScoreColor(score) {
    if (score >= 5) return '#8b0000'; // Dark red for very high
    if (score >= 4) return '#e74c3c'; // Red for high
    if (score >= 3) return '#f39c12'; // Orange for moderate
    if (score >= 2) return '#f1c40f'; // Yellow for mild
    return '#27ae60'; // Green for low
}

function getScoreLevel(score) {
    if (score >= 5) return 'Very High';
    if (score >= 4) return 'High';
    if (score >= 3) return 'Moderate';
    if (score >= 2) return 'Mild';
    return 'Low';
}

function getEstimatedTimelineByScore(score) {
    if (score >= 5) return '12-18 months';
    if (score >= 4) return '6-12 months';
    if (score >= 3) return '3-6 months';
    if (score >= 2) return '1-3 months';
    return '2-8 weeks';
}

function setupHabitTrackerEvents(user) {
    try {
        // Complete habit buttons
        document.querySelectorAll('.habit-complete').forEach(button => {
            button.addEventListener('click', (e) => {
                const habitId = e.target.dataset.habit;
                completeHabit(user, habitId);
            });
        });
        
        // Uncomplete habit buttons
        document.querySelectorAll('.habit-uncomplete').forEach(button => {
            button.addEventListener('click', (e) => {
                const habitId = e.target.dataset.habit;
                uncompleteHabit(user, habitId);
            });
        });
    } catch (error) {
        console.error('Error setting up habit tracker events:', error);
    }
}

// Utility functions for habits

function completeHabit(user, habitId) {
    try {
        let habitData = window.utils.storage.get(`habits_${user.id}`) || {};
        const today = new Date().toDateString();
        
        if (!habitData[habitId]) {
            habitData[habitId] = {
                streak: 0,
                completedDays: [],
                lastCompleted: null
            };
        }
        
        // If not already completed today
        if (habitData[habitId].lastCompleted !== today) {
            habitData[habitId].lastCompleted = today;
            habitData[habitId].completedDays = habitData[habitId].completedDays || [];
            habitData[habitId].completedDays.push(today);
            
            // Update streak
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            
            if (habitData[habitId].completedDays.includes(yesterday.toDateString())) {
                habitData[habitId].streak += 1;
            } else {
                habitData[habitId].streak = 1;
            }
            
            window.utils.storage.set(`habits_${user.id}`, habitData);
            showNotification(`Habit completed! ${habitData[habitId].streak} day streak! 🔥`, 'success');
            
            // Check for achievements
            checkHabitAchievements(user, habitData[habitId].streak);
            
            // Refresh habit tracker
            buildHabitTracker(user);
        }
    } catch (error) {
        console.error('Error completing habit:', error);
        showNotification('Error completing habit. Please try again.', 'error');
    }
}

function uncompleteHabit(user, habitId) {
    try {
        let habitData = window.utils.storage.get(`habits_${user.id}`) || {};
        const today = new Date().toDateString();
        
        if (habitData[habitId] && habitData[habitId].lastCompleted === today) {
            habitData[habitId].lastCompleted = null;
            habitData[habitId].completedDays = habitData[habitId].completedDays.filter(day => day !== today);
            habitData[habitId].streak = Math.max(0, habitData[habitId].streak - 1);
            
            window.utils.storage.set(`habits_${user.id}`, habitData);
            showNotification('Habit marked as incomplete.', 'info');
            
            // Refresh habit tracker
            buildHabitTracker(user);
        }
    } catch (error) {
        console.error('Error uncompleting habit:', error);
        showNotification('Error updating habit. Please try again.', 'error');
    }
}

function checkHabitAchievements(user, streak) {
    try {
        let achievements = window.utils.storage.get(`achievements_${user.id}`) || [];
        
        if (streak >= 7 && !achievements.includes('habit_streak_7')) {
            achievements.push('habit_streak_7');
            window.utils.storage.set(`achievements_${user.id}`, achievements);
            showNotification('🏆 Achievement Unlocked: Week Warrior! 7-day streak!', 'success');
            
            // Refresh achievement system
            buildAchievementSystem(user);
        }
        
        if (streak >= 30 && !achievements.includes('habit_streak_30')) {
            achievements.push('habit_streak_30');
            window.utils.storage.set(`achievements_${user.id}`, achievements);
            showNotification('🏆 Achievement Unlocked: Habit Master! 30-day streak!', 'success');
            
            // Refresh achievement system
            buildAchievementSystem(user);
        }
    } catch (error) {
        console.error('Error checking habit achievements:', error);
    }
}

function checkImprovementAchievement(user) {
    try {
        const badPersonalityHistory = user.badPersonality || [];
        
        if (badPersonalityHistory.length < 2) return false;
        
        const currentCount = badPersonalityHistory[0].traits ? badPersonalityHistory[0].traits.length : 0;
        const previousCount = badPersonalityHistory[1].traits ? badPersonalityHistory[1].traits.length : 0;
        
        return currentCount < previousCount;
    } catch (error) {
        console.error('Error checking improvement achievement:', error);
        return false;
    }
}

// Initialize achievement system
function initializeAchievementSystem() {
    try {
        achievementData = window.utils.storage.get('globalAchievements') || [];
    } catch (error) {
        console.error('Error initializing achievement system:', error);
        achievementData = [];
    }
}

// Auto-refresh and utility functions (keeping existing functionality)
function setupAutoRefresh() {
    try {
        refreshInterval = setInterval(() => {
            if (currentNegativeUser) {
                checkForNegativeTraitsUpdates();
            }
        }, 2000);
    } catch (error) {
        console.error('Error setting up auto refresh:', error);
    }
}

function checkForNegativeTraitsUpdates() {
    try {
        const users = window.utils.storage.get('users') || [];
        const currentUser = window.utils.storage.get('currentUser');
        
        if (!currentUser || !currentNegativeUser) return;
        
        const latestUser = users.find(u => u.id === currentUser.id) || currentUser;
        
        const currentTraitsString = JSON.stringify(currentNegativeUser.badPersonality);
        const latestTraitsString = JSON.stringify(latestUser.badPersonality);
        
        if (currentTraitsString !== latestTraitsString) {
            console.log('🔄 Negative traits change detected! Refreshing Enhanced Negative AI...');
            
            currentNegativeUser = latestUser;
            window.utils.storage.set('currentUser', latestUser);
            
            showUpdateNotification('Negative traits updated! Refreshing complete analysis...');
            
            setTimeout(() => {
                initializeNegativeAI();
            }, 500);
        }
    } catch (error) {
        console.error('Error checking for negative traits updates:', error);
    }
}

function handleStorageChange(event) {
    try {
        if (event.key === 'currentUser' || event.key === 'users') {
            setTimeout(() => {
                checkForNegativeTraitsUpdates();
            }, 100);
        }
    } catch (error) {
        console.error('Error handling storage change:', error);
    }
}

function handleNegativeTraitsUpdate(event) {
    try {
        setTimeout(() => {
            initializeNegativeAI();
        }, 100);
    } catch (error) {
        console.error('Error handling negative traits update:', error);
    }
}

function getStrategyTimeEstimateByScore(score) {
    if (score >= 5) return '30-45';
    if (score >= 4) return '20-30';
    if (score >= 3) return '15-20';
    return '10-15';
}

function getStrategyDifficultyByScore(score) {
    if (score >= 5) return 'Very High';
    if (score >= 4) return 'High';
    if (score >= 3) return 'Moderate';
    return 'Low';
}

// Helper functions (keeping existing ones and adding new ones)
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

function getEncouragementMessage(traitId) {
    const encouragements = {
        paranoid: "This trait often comes from past experiences of being hurt. With practice, you can learn to trust appropriately while still protecting yourself. Many people have successfully overcome excessive suspicion.",
        toxic: "Recognizing toxic patterns is a huge first step that many people never take. Your awareness shows you're ready for positive change. You can learn healthier ways to get your needs met.",
        aggressive: "Aggression often stems from feeling powerless or unheard. Learning assertive communication can help you feel more powerful while treating others with respect.",
        narcissistic: "Many successful people struggle with narcissistic traits. Learning empathy and humility can actually enhance your success by improving your relationships and leadership skills.",
        antisocial: "Your sensitivity to others' feelings is actually a strength. Learning to face social situations gradually helps you use this empathy while building confidence and meaningful connections.",
        dramatic: "Your emotional intensity can be a strength when channeled properly. Learning emotional regulation helps you use this sensitivity in positive, productive ways.",
        lazy: "Often labeled as 'laziness' is actually perfectionism, fear of failure, or lack of motivation. Identifying the root cause helps you develop effective strategies for follow-through.",
        impulsive: "Impulsivity can bring spontaneity and quick decision-making abilities. Learning to pause before acting helps you keep the benefits while avoiding negative consequences.",
        avoidant: "Your sensitivity to others' feelings is actually a strength. Learning to face rejection gradually helps you use this empathy while building resilience and self-confidence."
    };
    
    return encouragements[traitId] || "Every negative trait has positive aspects that can be developed. You have the strength to make positive changes in your life.";
}

function showNotification(message, type = 'success') {
    console.log('📢 Showing notification:', message);
    
    try {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#27ae60' : type === 'error' ? '#e74c3c' : '#3498db'};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 1000;
            animation: slideIn 0.3s ease;
            backdrop-filter: blur(10px);
            max-width: 300px;
        `;
        notification.textContent = message;
        
        document.body.appendChild(notification);
        
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
    } catch (error) {
        console.error('Error showing notification:', error);
    }
}

function showUpdateNotification(message) {
    console.log('🔄 Showing update notification:', message);
    
    try {
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: linear-gradient(135deg, #e74c3c, #c0392b);
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
        
        document.body.appendChild(notification);
        
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
    } catch (error) {
        console.error('Error showing update notification:', error);
    }
}

function setupProgressTrackingEvents(user) {
    try {
        // Complete milestone buttons
        document.querySelectorAll('.milestone-tick-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const traitId = e.target.closest('button').dataset.trait;
                const milestoneIndex = parseInt(e.target.closest('button').dataset.milestone);
                completeMilestone(user, traitId, milestoneIndex);
            });
        });
        
        // Undo milestone buttons
        document.querySelectorAll('.milestone-undo-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const traitId = e.target.closest('button').dataset.trait;
                const milestoneIndex = parseInt(e.target.closest('button').dataset.milestone);
                undoMilestone(user, traitId, milestoneIndex);
            });
        });
    } catch (error) {
        console.error('Error setting up progress tracking events:', error);
    }
}

function completeMilestone(user, traitId, milestoneIndex) {
    try {
        let progressData = window.utils.storage.get(`progress_${user.id}`) || {};
        
        if (!progressData[traitId]) {
            progressData[traitId] = { currentMilestone: 0, completedMilestones: [] };
        }
        
        // Add milestone to completed list if not already there
        if (!progressData[traitId].completedMilestones.includes(milestoneIndex)) {
            progressData[traitId].completedMilestones.push(milestoneIndex);
            progressData[traitId].completedMilestones.sort((a, b) => a - b);
            
            // Update current milestone to next uncompleted one
            const nextMilestone = findNextUncompletedMilestone(progressData[traitId].completedMilestones, 4); // 4 total milestones
            progressData[traitId].currentMilestone = nextMilestone;
            
            window.utils.storage.set(`progress_${user.id}`, progressData);
            
            // Calculate new progress percentage (25% per milestone)
            const progressPercentage = progressData[traitId].completedMilestones.length * 25;
            
            showNotification(`Milestone completed! Progress: ${progressPercentage}% 🎯`, 'success');
            
            // Refresh progress tracking display
            buildProgressTracking(user);
            setupProgressTrackingEvents(user);
        }
    } catch (error) {
        console.error('Error completing milestone:', error);
        showNotification('Error updating progress. Please try again.', 'error');
    }
}

function undoMilestone(user, traitId, milestoneIndex) {
    try {
        let progressData = window.utils.storage.get(`progress_${user.id}`) || {};
        
        if (progressData[traitId] && progressData[traitId].completedMilestones.includes(milestoneIndex)) {
            // Remove milestone from completed list
            progressData[traitId].completedMilestones = progressData[traitId].completedMilestones.filter(m => m !== milestoneIndex);
            
            // Update current milestone
            const nextMilestone = findNextUncompletedMilestone(progressData[traitId].completedMilestones, 4);
            progressData[traitId].currentMilestone = nextMilestone;
            
            window.utils.storage.set(`progress_${user.id}`, progressData);
            
            // Calculate new progress percentage
            const progressPercentage = progressData[traitId].completedMilestones.length * 25;
            
            showNotification(`Milestone undone. Progress: ${progressPercentage}%`, 'info');
            
            // Refresh progress tracking display
            buildProgressTracking(user);
            setupProgressTrackingEvents(user);
        }
    } catch (error) {
        console.error('Error undoing milestone:', error);
        showNotification('Error updating progress. Please try again.', 'error');
    }
}

function findNextUncompletedMilestone(completedMilestones, totalMilestones) {
    for (let i = 0; i < totalMilestones; i++) {
        if (!completedMilestones.includes(i)) {
            return i;
        }
    }
    return totalMilestones; // All completed
}

// Cleanup function to clear intervals when page unloads
window.addEventListener('beforeunload', () => {
    try {
        if (refreshInterval) {
            clearInterval(refreshInterval);
            console.log('🧹 Cleanup: Auto-refresh interval cleared');
        }
    } catch (error) {
        console.error('Error during cleanup:', error);
    }
});

// Expose function for manual refresh (for debugging)
window.refreshEnhancedNegativeAI = () => {
    console.log('🔄 Manual refresh triggered');
    try {
        initializeNegativeAI();
    } catch (error) {
        console.error('Error during manual refresh:', error);
    }
};