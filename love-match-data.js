// Love Match Combinations Full Data
const loveMatchData = [
    // Red Combinations (10 variations)
    { 
        colors: ['Red', 'Red'], 
        compatibility: 3, 
        dynamicsSummary: 'A powerful, high-energy relationship where both partners share an intense drive for achievement and leadership.',
        strengths: [
            'Mutual understanding of competitive nature',
            'Shared ambitious goals',
            'Direct and honest communication',
            'High motivation and energy'
        ],
        challenges: [
            'Potential power struggles',
            'Difficulty in compromising',
            'Risk of constant competition',
            'Emotional connection may be overlooked'
        ]
    },
    { 
        colors: ['Red', 'Blue'], 
        compatibility: 4, 
        dynamicsSummary: 'A balanced partnership combining Red\'s action-oriented approach with Blue\'s analytical thinking.',
        strengths: [
            'Complementary problem-solving skills',
            'Balanced decision-making',
            'Mutual respect for different strengths',
            'Efficient goal achievement'
        ],
        challenges: [
            'Different emotional processing styles',
            'Red\'s impatience vs Blue\'s thoroughness',
            'Potential communication friction',
            'Balancing action and analysis'
        ]
    },
    { 
        colors: ['Red', 'Green'], 
        compatibility: 3, 
        dynamicsSummary: 'A relationship where leadership meets nurturing, creating a dynamic of protection and support.',
        strengths: [
            'Balanced approach to goals and relationships',
            'Red provides direction, Green offers stability',
            'Complementary decision-making styles',
            'Mutual growth opportunities'
        ],
        challenges: [
            'Red\'s directness may hurt Green\'s sensitivity',
            'Potential power imbalance',
            'Different emotional processing speeds',
            'Conflicting approaches to conflict'
        ]
    },
    { 
        colors: ['Red', 'Yellow'], 
        compatibility: 4, 
        dynamicsSummary: 'A vibrant, energetic relationship filled with enthusiasm and forward momentum.',
        strengths: [
            'High energy and shared excitement',
            'Complementary approach to life\'s challenges',
            'Yellow lightens Red\'s intensity',
            'Mutual appreciation for action'
        ],
        challenges: [
            'Risk of spreading energy too thin',
            'Potential lack of follow-through',
            'Differing commitment levels',
            'Balancing seriousness and spontaneity'
        ]
    },
    { 
        colors: ['Red', 'Purple'], 
        compatibility: 4, 
        dynamicsSummary: 'A dynamic fusion of action and creativity, blending practical execution with innovative vision.',
        strengths: [
            'Transforming creative ideas into concrete actions',
            'Mutual appreciation for ambition and depth',
            'Balanced approach to challenges',
            'Inspiring and challenging each other\'s perspectives'
        ],
        challenges: [
            'Potential clash between Red\'s directness and Purple\'s introspection',
            'Different processing speeds',
            'Balancing practical needs with creative exploration',
            'Risk of misunderstanding each other\'s motivations'
        ]
    },
    { 
        colors: ['Red', 'Black'], 
        compatibility: 5, 
        dynamicsSummary: 'An intense, authentic relationship marked by strong individual identities and mutual respect for independence.',
        strengths: [
            'Deep respect for personal authenticity',
            'Honest and direct communication',
            'Shared commitment to personal growth',
            'Mutual appreciation for strength and independence'
        ],
        challenges: [
            'Potential emotional distance',
            'Risk of becoming too individualistic',
            'Difficulty in showing vulnerability',
            'Balancing personal space with relationship intimacy'
        ]
    },
    { 
        colors: ['Red', 'White'], 
        compatibility: 5, 
        dynamicsSummary: 'A balancing act between assertive leadership and peaceful harmony, creating a relationship of complementary energies.',
        strengths: [
            'Complementary approach to conflict resolution',
            'White softens Red\'s intensity',
            'Mutual respect for different perspectives',
            'Balanced approach to relationship challenges'
        ],
        challenges: [
            'Potential friction between directness and diplomacy',
            'Different communication styles',
            'Balancing individual needs with relationship peace',
            'Risk of White feeling overwhelmed'
        ]
    },
    { 
        colors: ['Red', 'Grey'], 
        compatibility: 3, 
        dynamicsSummary: 'A pragmatic relationship characterized by logical approach and balanced emotional expression.',
        strengths: [
            'Rational problem-solving approach',
            'Mutual respect for independence',
            'Balanced emotional management',
            'Complementary decision-making process'
        ],
        challenges: [
            'Potential emotional disconnect',
            'Different levels of social engagement',
            'Risk of feeling emotionally distant',
            'Balancing passion with neutrality'
        ]
    },
    { 
        colors: ['Red', 'Pink'], 
        compatibility: 5, 
        dynamicsSummary: 'A relationship that blends passionate drive with nurturing care, creating a dynamic of support and motivation.',
        strengths: [
            'Complementary emotional approaches',
            'Pink softens Red\'s intensity',
            'Mutual care and support',
            'Balanced approach to relationship needs'
        ],
        challenges: [
            'Potential friction between directness and sensitivity',
            'Different emotional processing styles',
            'Risk of Pink feeling overwhelmed',
            'Balancing assertiveness with gentleness'
        ]
    },
    { 
        colors: ['Red', 'Chocolate'], 
        compatibility: 4, 
        dynamicsSummary: 'A stable and goal-oriented relationship combining drive with traditional values and commitment.',
        strengths: [
            'Shared focus on achievement',
            'Complementary approach to responsibility',
            'Mutual respect for hard work',
            'Strong foundation for family and future'
        ],
        challenges: [
            'Potential conflict between spontaneity and tradition',
            'Different approaches to risk-taking',
            'Balancing ambition with stability',
            'Risk of becoming too serious'
        ]
    },

    // Blue Combinations (9 variations - excluding Blue-Red which was covered above)
    { 
        colors: ['Blue', 'Blue'], 
        compatibility: 5, 
        dynamicsSummary: 'A deeply analytical and intellectually harmonious relationship built on mutual understanding and logical connection.',
        strengths: [
            'Shared love for deep, meaningful conversations',
            'Logical and systematic approach to relationship',
            'Mutual respect for privacy and personal space',
            'Consistent and reliable partnership'
        ],
        challenges: [
            'Potential lack of emotional expressiveness',
            'Risk of overthinking',
            'Difficulty with spontaneity',
            'May struggle with emotional intimacy'
        ]
    },
    { 
        colors: ['Blue', 'Green'], 
        compatibility: 4, 
        dynamicsSummary: 'A balanced partnership combining analytical thinking with practical stability and emotional intelligence.',
        strengths: [
            'Complementary approach to problem-solving',
            'Mutual respect for detailed and systematic processes',
            'Balanced emotional and logical decision-making',
            'Strong foundation of trust and reliability'
        ],
        challenges: [
            'Potential risk of becoming too routine-oriented',
            'Different levels of emotional expression',
            'Balancing analytical thinking with practical action',
            'Risk of overthinking minor issues'
        ]
    },
    { 
        colors: ['Blue', 'Yellow'], 
        compatibility: 5, 
        dynamicsSummary: 'A dynamic relationship where analytical depth meets spontaneous enthusiasm, creating an intriguing balance.',
        strengths: [
            'Yellow brings excitement to Blue\'s structured world',
            'Blue provides depth to Yellow\'s spontaneity',
            'Complementary approach to life\'s challenges',
            'Mutual learning and personal growth'
        ],
        challenges: [
            'Significant differences in processing information',
            'Potential friction between caution and spontaneity',
            'Balancing serious analysis with playful approach',
            'Risk of misunderstanding each other\'s communication styles'
        ]
    },
    { 
        colors: ['Blue', 'Purple'], 
        compatibility: 5, 
        dynamicsSummary: 'A deeply intellectual and creative partnership that combines analytical thinking with innovative vision.',
        strengths: [
            'Shared appreciation for depth and complexity',
            'Strong intellectual connection',
            'Complementary problem-solving approaches',
            'Mutual respect for thoughtful processing'
        ],
        challenges: [
            'Potential for analysis paralysis',
            'Risk of getting lost in theoretical discussions',
            'May need to focus more on practical action',
            'Balancing logic with emotion'
        ]
    },
    { 
        colors: ['Blue', 'Black'], 
        compatibility: 4, 
        dynamicsSummary: 'A relationship characterized by deep thinking, independence, and authentic communication.',
        strengths: [
            'Shared value for truth and authenticity',
            'Respect for personal space and independence',
            'Intellectually stimulating conversations',
            'Straightforward communication'
        ],
        challenges: [
            'Potential for emotional detachment',
            'Risk of becoming too focused on individual pursuits',
            'May struggle with expressing vulnerability',
            'Need to actively work on emotional connection'
        ]
    },
    { 
        colors: ['Blue', 'White'], 
        compatibility: 3, 
        dynamicsSummary: 'A balanced relationship where analytical thinking meets peaceful harmony and diplomacy.',
        strengths: [
            'White provides emotional balance to Blue\'s logic',
            'Complementary communication styles',
            'Mutual respect for different perspectives',
            'Balanced approach to conflict resolution'
        ],
        challenges: [
            'Blue may perceive White as indecisive',
            'White may find Blue too critical or detached',
            'Different priorities in relationship dynamics',
            'Navigating between analysis and acceptance'
        ]
    },
    { 
        colors: ['Blue', 'Grey'], 
        compatibility: 4, 
        dynamicsSummary: 'A pragmatic and logical partnership built on mutual understanding and respect for objectivity.',
        strengths: [
            'Shared logical approach to life',
            'Mutual respect for facts and objectivity',
            'Complementary analytical skills',
            'Calm and reasoned conflict resolution'
        ],
        challenges: [
            'Potential lack of emotional depth',
            'Risk of becoming too detached from feelings',
            'May need to work on expressing affection',
            'Finding balance between analysis and emotion'
        ]
    },
    { 
        colors: ['Blue', 'Pink'], 
        compatibility: 5, 
        dynamicsSummary: 'A complementary relationship where logical analysis meets emotional nurturing and compassion.',
        strengths: [
            'Pink brings emotional warmth to Blue\'s logical world',
            'Blue provides stability and rational thinking',
            'Complementary approach to relationship challenges',
            'Balanced perspective on life\'s issues'
        ],
        challenges: [
            'Different communication priorities',
            'Blue may seem too detached for Pink',
            'Pink may seem too emotional for Blue',
            'Finding common ground between logic and feeling'
        ]
    },
    { 
        colors: ['Blue', 'Chocolate'], 
        compatibility: 4, 
        dynamicsSummary: 'A stable and thoughtful relationship combining analytical depth with practical tradition and reliability.',
        strengths: [
            'Shared appreciation for structure and order',
            'Complementary approach to planning and goals',
            'Mutual respect for thoroughness',
            'Strong foundation of reliability and consistency'
        ],
        challenges: [
            'Potential resistance to change and new ideas',
            'Risk of becoming too routine-oriented',
            'May need to work on spontaneity',
            'Finding balance between tradition and innovation'
        ]
    },

    // Green Combinations (8 variations - excluding Green with Red and Blue covered above)
    { 
        colors: ['Green', 'Green'], 
        compatibility: 5, 
        dynamicsSummary: 'A deeply nurturing and harmonious relationship built on mutual care, stability, and emotional understanding.',
        strengths: [
            'Strong emotional connection and understanding',
            'Mutual support and nurturing',
            'Shared values on relationships and family',
            'Calm and peaceful conflict resolution'
        ],
        challenges: [
            'May avoid necessary confrontation',
            'Risk of becoming too comfortable or stagnant',
            'Potential for mutual enabling',
            'May need more excitement or variety'
        ]
    },
    { 
        colors: ['Green', 'Yellow'], 
        compatibility: 5, 
        dynamicsSummary: 'A warm and vibrant relationship where stability meets spontaneity, creating a balanced and joyful partnership.',
        strengths: [
            'Yellow brings fun and energy to Green\'s stability',
            'Green provides grounding for Yellow\'s spontaneity',
            'Complementary approaches to life',
            'Balance of excitement and security'
        ],
        challenges: [
            'Different approaches to planning and structure',
            'Green may find Yellow too scattered',
            'Yellow may find Green too cautious',
            'Balancing responsibility with spontaneity'
        ]
    },
    { 
        colors: ['Green', 'Purple'], 
        compatibility: 5, 
        dynamicsSummary: 'A creative and nurturing relationship that combines emotional intelligence with innovative vision.',
        strengths: [
            'Green provides emotional stability for Purple\'s creativity',
            'Purple inspires Green with new perspectives',
            'Mutual appreciation for depth and meaning',
            'Complementary approach to growth and development'
        ],
        challenges: [
            'Purple may feel restricted by Green\'s practicality',
            'Green may find Purple too abstract or unrealistic',
            'Different priorities in daily life',
            'Balancing imagination with practicality'
        ]
    },
    { 
        colors: ['Green', 'Black'], 
        compatibility: 3, 
        dynamicsSummary: 'A relationship that balances nurturing support with independence and authenticity.',
        strengths: [
            'Green provides emotional support for Black\'s independence',
            'Black encourages Green\'s personal growth',
            'Complementary perspectives on life',
            'Balance between connection and autonomy'
        ],
        challenges: [
            'Black may perceive Green as too dependent',
            'Green may find Black too detached',
            'Different needs for closeness and space',
            'Navigating between emotional connection and independence'
        ]
    },
    { 
        colors: ['Green', 'White'], 
        compatibility: 5, 
        dynamicsSummary: 'A deeply harmonious and peaceful relationship built on mutual care, empathy, and conflict avoidance.',
        strengths: [
            'Shared value for harmony and peace',
            'Strong emotional understanding',
            'Gentle and supportive communication',
            'Mutual respect and consideration'
        ],
        challenges: [
            'May avoid necessary conflict',
            'Risk of unaddressed issues',
            'Potential for passive communication',
            'May need more assertiveness'
        ]
    },
    { 
        colors: ['Green', 'Grey'], 
        compatibility: 3, 
        dynamicsSummary: 'A balanced relationship where emotional nurturing meets logical objectivity and practicality.',
        strengths: [
            'Green brings emotional warmth to Grey\'s objectivity',
            'Grey provides rational perspective to Green\'s feelings',
            'Complementary approach to challenges',
            'Balance between heart and mind'
        ],
        challenges: [
            'Different emotional processing styles',
            'Green may find Grey too detached',
            'Grey may find Green too emotionally focused',
            'Finding middle ground in communication'
        ]
    },
    { 
        colors: ['Green', 'Pink'], 
        compatibility: 5, 
        dynamicsSummary: 'A deeply nurturing and compassionate relationship built on mutual care, emotional understanding, and support.',
        strengths: [
            'Strong emotional connection and understanding',
            'Shared values on care and nurturing',
            'Supportive and empathetic communication',
            'Mutual appreciation for relationships'
        ],
        challenges: [
            'May become too focused on others\' needs',
            'Risk of neglecting personal boundaries',
            'Potential for enabling unhealthy patterns',
            'May need more independence and assertiveness'
        ]
    },
    { 
        colors: ['Green', 'Chocolate'], 
        compatibility: 4, 
        dynamicsSummary: 'A stable and nurturing relationship built on shared values, tradition, and emotional security.',
        strengths: [
            'Shared focus on stability and security',
            'Mutual appreciation for tradition and family',
            'Complementary nurturing styles',
            'Strong foundation for long-term commitment'
        ],
        challenges: [
            'May become too routine-oriented',
            'Risk of resistance to change',
            'Potential for overprotectiveness',
            'Finding balance between tradition and growth'
        ]
    },

    // Yellow Combinations (7 variations - excluding those covered above)
    { 
        colors: ['Yellow', 'Yellow'], 
        compatibility: 4, 
        dynamicsSummary: 'An energetic, playful relationship filled with spontaneity, fun, and constant excitement.',
        strengths: [
            'Abundant joy and enthusiasm',
            'Shared love for adventure and novelty',
            'Spontaneous and flexible approach to life',
            'Mutual support for creativity and expression'
        ],
        challenges: [
            'May lack direction or focus',
            'Risk of avoiding serious conversations',
            'Potential for underdeveloped planning',
            'May struggle with long-term commitments'
        ]
    },
    { 
        colors: ['Yellow', 'Purple'], 
        compatibility: 5, 
        dynamicsSummary: 'A highly creative and dynamic relationship combining playful energy with innovative vision.',
        strengths: [
            'Strong creative synergy',
            'Mutual inspiration and excitement',
            'Shared appreciation for novelty and exploration',
            'Complementary expressive styles'
        ],
        challenges: [
            'May lack practicality or groundedness',
            'Risk of unfinished projects or ideas',
            'Different focus in creative pursuits',
            'Balancing fun with depth'
        ]
    },
    { 
        colors: ['Yellow', 'Black'], 
        compatibility: 5, 
        dynamicsSummary: 'A relationship of contrasts where playful spontaneity meets authentic independence.',
        strengths: [
            'Yellow brings lightness to Black\'s intensity',
            'Black adds depth to Yellow\'s approach',
            'Complementary perspectives on life',
            'Balance between fun and authenticity'
        ],
        challenges: [
            'Significant differences in energy levels',
            'Yellow may find Black too serious',
            'Black may find Yellow too unfocused',
            'Finding common ground in communication styles'
        ]
    },
    { 
        colors: ['Yellow', 'White'], 
        compatibility: 4, 
        dynamicsSummary: 'A balanced relationship where playful energy meets peaceful harmony, creating a positive and adaptable partnership.',
        strengths: [
            'Yellow brings excitement to White\'s calm',
            'White provides stability for Yellow\'s energy',
            'Shared positive outlook on life',
            'Complementary approaches to challenges'
        ],
        challenges: [
            'Different comfort levels with change',
            'Yellow may overwhelm White at times',
            'White may restrict Yellow\'s spontaneity',
            'Balancing fun with peace'
        ]
    },
    { 
        colors: ['Yellow', 'Grey'], 
        compatibility: 2, 
        dynamicsSummary: 'A relationship of opposites where spontaneous enthusiasm meets logical objectivity.',
        strengths: [
            'Yellow brings energy to Grey\'s practicality',
            'Grey provides structure for Yellow\'s ideas',
            'Complementary problem-solving approaches',
            'Balance between creativity and logic'
        ],
        challenges: [
            'Fundamentally different approaches to life',
            'Yellow may find Grey too rigid or boring',
            'Grey may find Yellow too chaotic or unfocused',
            'Significant communication style differences'
        ]
    },
    { 
        colors: ['Yellow', 'Pink'], 
        compatibility: 4, 
        dynamicsSummary: 'A warm and vibrant relationship combining playful energy with compassionate nurturing.',
        strengths: [
            'Yellow brings fun to Pink\'s nurturing nature',
            'Pink adds emotional depth to Yellow\'s approach',
            'Shared positive and optimistic outlook',
            'Complementary caretaking styles'
        ],
        challenges: [
            'Different priorities in relationships',
            'Yellow may seem insensitive to Pink at times',
            'Pink may seem too serious for Yellow',
            'Balancing fun with emotional needs'
        ]
    },
    { 
        colors: ['Yellow', 'Chocolate'], 
        compatibility: 3, 
        dynamicsSummary: 'A relationship that balances spontaneous energy with traditional stability.',
        strengths: [
            'Yellow brings freshness to Chocolate\'s tradition',
            'Chocolate provides structure for Yellow\'s spontaneity',
            'Complementary approaches to life',
            'Balance between fun and responsibility'
        ],
        challenges: [
            'Different comfort levels with change',
            'Yellow may find Chocolate too rigid',
            'Chocolate may find Yellow too unpredictable',
            'Negotiating between tradition and novelty'
        ]
    },

    // Purple Combinations (6 variations - excluding those covered above)
    { 
        colors: ['Purple', 'Purple'], 
        compatibility: 4, 
        dynamicsSummary: 'A deeply creative and visionary relationship built on shared imagination, depth, and innovative thinking.',
        strengths: [
            'Strong intellectual and creative connection',
            'Mutual understanding of complex thoughts',
            'Shared appreciation for depth and meaning',
            'Support for individual creative expression'
        ],
        challenges: [
            'May lack practicality or groundedness',
            'Risk of getting lost in abstract discussions',
            'Potential for overthinking',
            'May need to focus more on daily realities'
        ]
    },
    { 
        colors: ['Purple', 'Black'], 
        compatibility: 4, 
        dynamicsSummary: 'A deep and authentic relationship combining creative vision with independent thinking.',
        strengths: [
            'Shared appreciation for depth and authenticity',
            'Mutual respect for uniqueness',
            'Intellectually stimulating connection',
            'Support for individual growth and expression'
        ],
        challenges: [
            'Potential for emotional distance',
            'May become too focused on individual pursuits',
            'Different approaches to social connection',
            'Balancing togetherness with independence'
        ]
    },
    { 
        colors: ['Purple', 'White'], 
        compatibility: 5, 
        dynamicsSummary: 'A relationship that balances creative depth with peaceful harmony.',
        strengths: [
            'White brings calm to Purple\'s intensity',
            'Purple adds depth to White\'s perspective',
            'Complementary approaches to challenges',
            'Balance between vision and peace'
        ],
        challenges: [
            'Purple may find White too passive',
            'White may find Purple too complex',
            'Different communication priorities',
            'Navigating between depth and simplicity'
        ]
    },
    { 
        colors: ['Purple', 'Grey'], 
        compatibility: 3, 
        dynamicsSummary: 'A relationship where creative vision meets logical objectivity.',
        strengths: [
            'Grey brings practicality to Purple\'s ideas',
            'Purple adds imagination to Grey\'s logic',
            'Complementary problem-solving approaches',
            'Balance between innovation and feasibility'
        ],
        challenges: [
            'Fundamentally different approaches to decisions',
            'Purple may find Grey too detached',
            'Grey may find Purple too abstract',
            'Balancing creativity with practicality'
        ]
    },
    { 
        colors: ['Purple', 'Pink'], 
        compatibility: 4, 
        dynamicsSummary: 'A compassionate and creative relationship combining emotional depth with innovative vision.',
        strengths: [
            'Shared appreciation for depth and meaning',
            'Pink adds emotional warmth to Purple\'s ideas',
            'Purple brings creative perspective to Pink\'s nurturing',
            'Mutual understanding of complex emotions'
        ],
        challenges: [
            'Different priorities in relationship focus',
            'Purple may seem too detached at times',
            'Pink may seem too focused on others\' needs',
            'Balancing self-expression with connection'
        ]
    },
    { 
        colors: ['Purple', 'Chocolate'], 
        compatibility: 3, 
        dynamicsSummary: 'A relationship balancing innovative thinking with traditional stability.',
        strengths: [
            'Purple brings new perspectives to Chocolate\'s tradition',
            'Chocolate provides grounding for Purple\'s ideas',
            'Complementary approaches to life challenges',
            'Balance between innovation and reliability'
        ],
        challenges: [
            'Different comfort levels with change',
            'Purple may find Chocolate too conventional',
            'Chocolate may find Purple too unrealistic',
            'Negotiating between tradition and innovation'
        ]
    },

    // Black Combinations (5 variations - excluding those covered above)
    { 
        colors: ['Black', 'Black'], 
        compatibility: 3, 
        dynamicsSummary: 'An authentic and independent relationship built on mutual respect for autonomy and straight communication.',
        strengths: [
            'Deep respect for personal authenticity',
            'Honest and direct communication',
            'Shared value for independence',
            'Mutual understanding of personal boundaries'
        ],
        challenges: [
            'Potential for emotional distance',
            'Risk of becoming too independent',
            'May struggle with vulnerability',
            'Finding balance between autonomy and connection'
        ]
    },
    { 
        colors: ['Black', 'White'], 
        compatibility: 2, 
        dynamicsSummary: 'A relationship of contrasts where direct authenticity meets peaceful harmony.',
        strengths: [
            'White brings calm to Black\'s intensity',
            'Black adds directness to White\'s diplomacy',
            'Complementary approaches to challenges',
            'Balance between honesty and harmony'
        ],
        challenges: [
            'Fundamentally different approaches to conflict',
            'Black may find White too passive',
            'White may find Black too harsh',
            'Significant communication style differences'
        ]
    },
    { 
        colors: ['Black', 'Grey'], 
        compatibility: 4, 
        dynamicsSummary: 'A pragmatic and authentic relationship built on mutual respect for objectivity and independence.',
        strengths: [
            'Shared value for logical thinking',
            'Mutual respect for personal space',
            'Direct and straightforward communication',
            'Complementary approach to challenges'
        ],
        challenges: [
            'Potential for emotional detachment',
            'Risk of becoming too individualistic',
            'May need to work on emotional connection',
            'Finding balance between logic and feeling'
        ]
    },
    { 
        colors: ['Black', 'Pink'], 
        compatibility: 5, 
        dynamicsSummary: 'A relationship that balances authentic independence with compassionate nurturing.',
        strengths: [
            'Pink brings emotional warmth to Black\'s independence',
            'Black encourages Pink\'s personal boundaries',
            'Complementary perspectives on relationships',
            'Balance between autonomy and connection'
        ],
        challenges: [
            'Different approaches to emotional expression',
            'Black may find Pink too emotionally focused',
            'Pink may find Black too detached',
            'Navigating between independence and togetherness'
        ]
    },
    { 
        colors: ['Black', 'Chocolate'], 
        compatibility: 3, 
        dynamicsSummary: 'A relationship balancing authentic individuality with traditional stability.',
        strengths: [
            'Black brings authenticity to Chocolate\'s tradition',
            'Chocolate provides structure for Black\'s independence',
            'Mutual respect for personal values',
            'Complementary approaches to challenges'
        ],
        challenges: [
            'Different comfort levels with social norms',
            'Black may find Chocolate too conventional',
            'Chocolate may find Black too unconventional',
            'Balancing individuality with shared traditions'
        ]
    },

    // White Combinations (4 variations - excluding those covered above)
    { 
        colors: ['White', 'White'], 
        compatibility: 4, 
        dynamicsSummary: 'A peaceful and harmonious relationship built on mutual understanding, diplomacy, and conflict avoidance.',
        strengths: [
            'Strong sense of peace and harmony',
            'Gentle and considerate communication',
            'Mutual understanding and patience',
            'Shared value for tranquility'
        ],
        challenges: [
            'May avoid necessary conflict',
            'Risk of unaddressed issues',
            'Potential for passive communication',
            'Finding balance between peace and growth'
        ]
    },
    { 
        colors: ['White', 'Grey'], 
        compatibility: 3, 
        dynamicsSummary: 'A calm and balanced relationship combining peaceful harmony with logical objectivity.',
        strengths: [
            'Shared appreciation for calm approach',
            'Complementary communication styles',
            'Mutual respect for different perspectives',
            'Balance between acceptance and analysis'
        ],
        challenges: [
            'White may find Grey too detached',
            'Grey may find White too passive',
            'Different approaches to decision-making',
            'Finding middle ground between feeling and logic'
        ]
    },
    { 
        colors: ['White', 'Pink'], 
        compatibility: 5, 
        dynamicsSummary: 'A gentle and nurturing relationship built on mutual care, empathy, and emotional understanding.',
        strengths: [
            'Shared focus on harmonious relationships',
            'Strong emotional understanding',
            'Gentle and supportive communication',
            'Mutual appreciation for peace and care'
        ],
        challenges: [
            'May avoid necessary confrontation',
            'Risk of prioritizing others\' needs too much',
            'Potential for unaddressed issues',
            'Finding balance between peace and assertiveness'
        ]
    },
    { 
        colors: ['White', 'Chocolate'], 
        compatibility: 5, 
        dynamicsSummary: 'A stable and peaceful relationship built on mutual respect for tradition and harmony.',
        strengths: [
            'Shared appreciation for stability',
            'Complementary approach to family life',
            'Mutual respect for values and traditions',
            'Strong foundation for long-term harmony'
        ],
        challenges: [
            'May become too comfortable or stagnant',
            'Risk of avoiding necessary change',
            'Potential for passive approach to challenges',
            'Finding balance between peace and growth'
        ]
    },

    // Grey Combinations (3 variations - excluding those covered above)
    { 
        colors: ['Grey', 'Grey'], 
        compatibility: 4, 
        dynamicsSummary: 'A logical and pragmatic relationship built on mutual objectivity, clarity, and rational decision-making.',
        strengths: [
            'Strong logical connection',
            'Clear and direct communication',
            'Shared value for objectivity',
            'Efficient problem-solving approach'
        ],
        challenges: [
            'Potential lack of emotional depth',
            'Risk of becoming too detached',
            'May struggle with emotional expression',
            'Finding balance between logic and feeling'
        ]
    },
    { 
        colors: ['Grey', 'Pink'], 
        compatibility: 3, 
        dynamicsSummary: 'A relationship that balances logical objectivity with emotional nurturing.',
        strengths: [
            'Pink brings emotional warmth to Grey\'s logic',
            'Grey adds rational perspective to Pink\'s feelings',
            'Complementary decision-making styles',
            'Balance between heart and mind'
        ],
        challenges: [
            'Different emotional processing styles',
            'Grey may find Pink too emotionally driven',
            'Pink may find Grey too detached',
            'Finding common ground in communication'
        ]
    },
    { 
        colors: ['Grey', 'Chocolate'], 
        compatibility: 4, 
        dynamicsSummary: 'A practical and stable relationship built on shared logic, reliability, and traditional values.',
        strengths: [
            'Mutual appreciation for order and structure',
            'Shared practical approach to life',
            'Complementary decision-making process',
            'Strong foundation of reliability'
        ],
        challenges: [
            'May become too routine-oriented',
            'Risk of emotional detachment',
            'Potential resistance to change',
            'Finding balance between tradition and flexibility'
        ]
    },

    // Pink Combinations (2 variations - excluding those covered above)
    { 
        colors: ['Pink', 'Pink'], 
        compatibility: 4, 
        dynamicsSummary: 'A deeply nurturing and empathetic relationship built on mutual care, emotional understanding, and compassion.',
        strengths: [
            'Strong emotional connection and understanding',
            'Mutual support and validation',
            'Shared focus on relationship needs',
            'Gentle and supportive communication'
        ],
        challenges: [
            'May prioritize others\' needs over their own',
            'Risk of emotional exhaustion',
            'Potential for boundary issues',
            'May need more assertiveness'
        ]
    },
    { 
        colors: ['Pink', 'Chocolate'], 
        compatibility: 5, 
        dynamicsSummary: 'A nurturing and stable relationship combining emotional warmth with traditional values and security.',
        strengths: [
            'Shared focus on care and support',
            'Complementary nurturing styles',
            'Mutual appreciation for family and relationships',
            'Strong foundation for long-term commitment'
        ],
        challenges: [
            'May become too focused on others\' needs',
            'Risk of neglecting personal growth',
            'Potential for overprotectiveness',
            'Finding balance between tradition and flexibility'
        ]
    },

    // Chocolate Combination (1 variation - itself)
    { 
        colors: ['Chocolate', 'Chocolate'], 
        compatibility: 5, 
        dynamicsSummary: 'A deeply stable and traditional relationship built on shared values, reliability, and long-term commitment.',
        strengths: [
            'Strong foundation of shared values',
            'Mutual respect for tradition and structure',
            'Reliable and consistent partnership',
            'Clear and established relationship expectations'
        ],
        challenges: [
            'May resist necessary change',
            'Risk of becoming too routine-oriented',
            'Potential for rigid thinking',
            'Finding balance between tradition and growth'
        ]
    }
];

function getMatchDetails(color1, color2) {
    const match = loveMatchData.find(m => 
        (m.colors[0] === color1 && m.colors[1] === color2) ||
        (m.colors[0] === color2 && m.colors[1] === color1)
    );
    
    return match || null;
}

// Helper function to describe compatibility level
function getCompatibilityDescription(level) {
    switch(level) {
        case 5: return 'Exceptional Compatibility';
        case 4: return 'High Compatibility';
        case 3: return 'Moderate Compatibility';
        case 2: return 'Low Compatibility';
        case 1: return 'Challenging Compatibility';
        default: return 'Undefined Compatibility';
    }
}

// Make the data and functions available globally
window.loveMatchData = loveMatchData;
window.getMatchDetails = getMatchDetails;
window.getCompatibilityDescription = getCompatibilityDescription;

// Log for debugging
console.log("Love Match Data loaded successfully!");
console.log("Total combinations:", loveMatchData.length);

// Love Match Search Script - For searching all 55 combinations
document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const color1Select = document.getElementById('color1Select');
    const color2Select = document.getElementById('color2Select');
    const matchButton = document.getElementById('matchButton');
    const searchResults = document.getElementById('searchResults');
    const searchMessage = document.getElementById('searchMessage');
    const topMatchesGrid = document.querySelector('.top-matches-grid');
    
    // Check if love match data is available
    if (typeof window.loveMatchData === 'undefined' || typeof window.getMatchDetails !== 'function') {
        console.error('Love match data not found. Make sure love-match-data.js is loaded correctly.');
        searchResults.style.display = 'block';
        searchMessage.innerHTML = '<strong>Error:</strong> Love match data could not be loaded. Please check if love-match-data.js is included properly.';
        return;
    }
    
    console.log("Love match script initialized with", window.loveMatchData.length, "combinations");
    
    // Function to find a match card based on colors
    function findMatchCard(color1, color2) {
        // Get all cards that are currently visible
        const matchCards = document.querySelectorAll('.match-card');
        
        // Remove any existing highlights
        matchCards.forEach(card => {
            card.classList.remove('highlight');
        });
        
        // Try to find a card with the matching colors in either order
        return Array.from(matchCards).find(card => {
            const cardColor1 = card.getAttribute('data-color1');
            const cardColor2 = card.getAttribute('data-color2');
            
            return (
                (cardColor1 === color1 && cardColor2 === color2) || 
                (cardColor1 === color2 && cardColor2 === color1)
            );
        });
    }
    
    // Function to create a dynamic match card
    function createDynamicMatchCard(matchDetails) {
        // Create new card element
        const card = document.createElement('div');
        card.className = 'match-card dynamic-card highlight';
        card.setAttribute('data-color1', matchDetails.colors[0]);
        card.setAttribute('data-color2', matchDetails.colors[1]);
        
        // Get compatibility description
        const compatibilityDescription = window.getCompatibilityDescription(matchDetails.compatibility);
        
        // Convert color names to lowercase for CSS classes
        const color1Class = matchDetails.colors[0].toLowerCase();
        const color2Class = matchDetails.colors[1].toLowerCase();
        
        // Create card content
        card.innerHTML = `
            <div class="match-header">
                <div class="match-title">
                    <span class="color-dot ${color1Class}"></span>
                    <span class="color-plus">+</span>
                    <span class="color-dot ${color2Class}"></span>
                </div>
                <div class="compatibility-badge">${compatibilityDescription}</div>
            </div>
            <div class="match-content">
                <p class="match-summary">${matchDetails.dynamicsSummary}</p>
                <div class="match-strengths">
                    <h4>Relationship Strengths</h4>
                    <ul>
                        ${matchDetails.strengths.map(strength => `<li>${strength}</li>`).join('')}
                    </ul>
                </div>
                <div class="match-challenges">
                    <h4>Potential Challenges</h4>
                    <ul>
                        ${matchDetails.challenges.map(challenge => `<li>${challenge}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `;
        
        return card;
    }
    
    // Function to remove any dynamically created cards
    function removeAllDynamicCards() {
        document.querySelectorAll('.dynamic-card').forEach(card => {
            card.remove();
        });
    }
    
    // Function to highlight and scroll to a match
    function highlightAndScrollToMatch(matchCard) {
        // Add highlight class
        matchCard.classList.add('highlight');
        
        // Scroll to the element
        matchCard.scrollIntoView({
            behavior: 'smooth', 
            block: 'center'
        });
        
        // Get match information
        const color1 = matchCard.getAttribute('data-color1');
        const color2 = matchCard.getAttribute('data-color2');
        const matchDetails = window.getMatchDetails(color1, color2);
        
        if (!matchDetails) {
            console.error('Could not find match details for', color1, color2);
            return;
        }
        
        // Show success message
        let rankText = '';
        const rankElement = matchCard.querySelector('.match-card-rank');
        if (rankElement) {
            rankText = ` This match is ranked #${rankElement.textContent} in our top compatibility list.`;
        }
        
        // Build compatibility text based on level
        let compatibilityText;
        switch (matchDetails.compatibility) {
            case 5: compatibilityText = 'an <strong>Exceptional (5/5)</strong>'; break;
            case 4: compatibilityText = 'a <strong>High (4/5)</strong>'; break;
            case 3: compatibilityText = 'a <strong>Moderate (3/5)</strong>'; break;
            case 2: compatibilityText = 'a <strong>Low (2/5)</strong>'; break;
            case 1: compatibilityText = 'a <strong>Challenging (1/5)</strong>'; break;
            default: compatibilityText = 'an <strong>Unknown</strong>';
        }
        
        // Display search results
        searchResults.style.display = 'block';
        searchMessage.innerHTML = `
            <div class="search-result-details">
                <h4>${color1} + ${color2}</h4>
                <p>This combination has ${compatibilityText} compatibility level.${rankText}</p>
                <p><em>"${matchDetails.dynamicsSummary}"</em></p>
            </div>
        `;
        
        // Remove highlight after a few seconds for built-in cards
        if (!matchCard.classList.contains('dynamic-card')) {
            setTimeout(() => {
                matchCard.classList.remove('highlight');
            }, 5000);
        }
    }
    
    // Event listener for the match button
    matchButton.addEventListener('click', () => {
        const color1 = color1Select.value;
        const color2 = color2Select.value;
        
        // Reset previous results
        searchResults.style.display = 'none';
        removeAllDynamicCards();
        
        // Validate inputs
        if (!color1 || !color2) {
            searchResults.style.display = 'block';
            searchMessage.textContent = 'Please select both colors to find a match.';
            return;
        }
        
        console.log(`Searching for match: ${color1} + ${color2}`);
        
        // Try to find in existing cards first
        const matchCard = findMatchCard(color1, color2);
        
        if (matchCard) {
            console.log(`Found match in existing cards: ${color1} + ${color2}`);
            // Highlight and scroll to the match
            highlightAndScrollToMatch(matchCard);
        } 
        // If not found in existing cards, use the data from love-match-data.js
        else {
            console.log(`Searching in love-match-data for: ${color1} + ${color2}`);
            
            // Get match details using the global function from love-match-data.js
            const matchDetails = window.getMatchDetails(color1, color2);
            
            if (matchDetails) {
                console.log('Found match in love-match-data:', matchDetails);
                
                // Create a new dynamic card and add it to the grid
                const dynamicCard = createDynamicMatchCard(matchDetails);
                topMatchesGrid.appendChild(dynamicCard);
                
                // Highlight and scroll to the new card
                highlightAndScrollToMatch(dynamicCard);
            } else {
                console.error(`No match found for: ${color1} + ${color2}`);
                searchResults.style.display = 'block';
                searchMessage.innerHTML = `<strong>No match found for ${color1} + ${color2}.</strong> Please try a different combination.`;
            }
        }
    });
    
    // Optional: Add functionality to remove dynamic cards when selecting new colors
    color1Select.addEventListener('change', removeAllDynamicCards);
    color2Select.addEventListener('change', removeAllDynamicCards);
    
    console.log('Love match search initialized successfully.');
});