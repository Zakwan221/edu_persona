// Detailed personality data for each color
const colorPersonalities = {
    black: {
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
        friendMatch: ["Blue", "Purple", "Grey"],
        loveMatch: ["Yellow", "Pink", "Red"]
    },
    white: {
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
        friendMatch: ["Pink", "Green", "Blue"],
        loveMatch: ["Red", "Chocolate", "Purple"]
    },
    red: {
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
        friendMatch: ["Yellow", "Blue", "Purple"],
        loveMatch: ["White", "Pink", "Black"]
    },
    blue: {
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
        friendMatch: ["Green", "Black", "Grey"],
        loveMatch: ["Red", "Yellow", "Purple"]
    },
    yellow: {
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
        friendMatch: ["Pink", "Red", "Purple"],
        loveMatch: ["Blue", "Black", "Green"]
    },
    green: {
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
        friendMatch: ["Chocolate", "White", "Blue"],
        loveMatch: ["Purple", "Yellow", "Pink"]
    },
    purple: {
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
        friendMatch: ["Black", "Red", "Yellow"],
        loveMatch: ["Blue", "Green", "White"]
    },
    chocolate: {
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
        friendMatch: ["Green", "Grey", "White"],
        loveMatch: ["Pink", "Yellow", "Red"]
    },
    pink: {
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
        friendMatch: ["Yellow", "White", "Red"],
        loveMatch: ["Chocolate", "Blue", "Black"]
    },
    grey: {
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
        friendMatch: ["Blue", "Black", "Chocolate"],
        loveMatch: ["Yellow", "Red", "Purple"]
    }
};
