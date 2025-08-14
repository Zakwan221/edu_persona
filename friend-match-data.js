// Friendship Match Combinations Full Data
// This file contains all 55 possible color personality combinations for friendship compatibility

const friendMatchData = [
    // Red Combinations (10 variations)
    { 
        colors: ['Red', 'Red'], 
        compatibility: 3, 
        dynamicsSummary: 'A high-energy friendship between two leaders who appreciate each other\'s ambition and directness.',
        strengths: [
            'Mutual respect for each other\'s drive',
            'Straightforward communication',
            'Enjoy taking on challenges together',
            'Push each other to achieve goals'
        ],
        challenges: [
            'Potential competition for leadership',
            'May clash when opinions differ',
            'Both might struggle to compromise',
            'Could lack emotional depth in friendship'
        ]
    },
    { 
        colors: ['Red', 'Blue'], 
        compatibility: 4, 
        dynamicsSummary: 'A productive friendship where Red\'s action-oriented approach combines with Blue\'s thoughtful analysis.',
        strengths: [
            'Complementary problem-solving abilities',
            'Blue provides depth that balances Red\'s pace',
            'Red helps Blue transform ideas into action',
            'Both value competence and results'
        ],
        challenges: [
            'Red may find Blue too cautious or analytical',
            'Blue might see Red as impulsive or domineering',
            'Different communication styles require adjustment',
            'May have different social energy levels'
        ]
    },
    { 
        colors: ['Red', 'Green'], 
        compatibility: 3, 
        dynamicsSummary: 'A balanced friendship where Red\'s leadership meets Green\'s supportive nature.',
        strengths: [
            'Red provides direction when Green hesitates',
            'Green offers emotional insight Red may overlook',
            'Complementary approach to social situations',
            'Red builds Green\'s confidence, Green softens Red\'s approach'
        ],
        challenges: [
            'Red\'s directness may hurt Green\'s feelings',
            'Green might avoid necessary conflict',
            'Different priorities in friendship maintenance',
            'May have different relationship expectations'
        ]
    },
    { 
        colors: ['Red', 'Yellow'], 
        compatibility: 4, 
        dynamicsSummary: 'An energetic friendship full of activity, enthusiasm, and adventure.',
        strengths: [
            'Shared high energy and enthusiasm',
            'Yellow brings fun that balances Red\'s intensity',
            'Red provides focus to Yellow\'s scattered energy',
            'Both enjoy taking on new challenges'
        ],
        challenges: [
            'Red may grow frustrated with Yellow\'s distractibility',
            'Yellow might find Red too serious or controlling',
            'Different levels of follow-through on plans',
            'Red focuses on achievements, Yellow on experiences'
        ]
    },
    { 
        colors: ['Red', 'Purple'], 
        compatibility: 5, 
        dynamicsSummary: 'A visionary friendship that combines creativity with action, capable of innovative achievements.',
        strengths: [
            'Purple generates creative ideas, Red implements them',
            'Mutual appreciation for thinking big',
            'Red provides structure for Purple\'s imagination',
            'Both value growth and new challenges'
        ],
        challenges: [
            'Red may rush Purple\'s creative process',
            'Purple might resist Red\'s practical limitations',
            'Different approaches to decision-making',
            'Red directness may overwhelm sensitive Purple'
        ]
    },
    { 
        colors: ['Red', 'Black'], 
        compatibility: 3, 
        dynamicsSummary: 'A straightforward friendship built on mutual independence and authenticity.',
        strengths: [
            'Direct and honest communication',
            'Mutual respect for personal boundaries',
            'Shared value for authenticity',
            'Neither requires emotional maintenance'
        ],
        challenges: [
            'Both may struggle with emotional vulnerability',
            'Can become competitive or confrontational',
            'May lack warmth or deeper connection',
            'Neither naturally prioritizes the relationship'
        ]
    },
    { 
        colors: ['Red', 'White'], 
        compatibility: 3, 
        dynamicsSummary: 'A complementary friendship where Red\'s decisive leadership balances White\'s peaceful flexibility.',
        strengths: [
            'Red helps White make decisions',
            'White helps Red consider others\' perspectives',
            'Red gives direction, White provides support',
            'Balance between action and reflection'
        ],
        challenges: [
            'Red may overwhelm White\'s need for peace',
            'White might frustrate Red with indecisiveness',
            'Different conflict management styles',
            'May have mismatched energy levels'
        ]
    },
    { 
        colors: ['Red', 'Grey'], 
        compatibility: 3, 
        dynamicsSummary: 'A practical friendship where Red\'s leadership is tempered by Grey\'s logical objectivity.',
        strengths: [
            'Clear, straightforward communication',
            'Grey helps Red think objectively',
            'Red helps Grey take decisive action',
            'Mutual focus on practical solutions'
        ],
        challenges: [
            'May lack emotional depth or expressiveness',
            'Grey might find Red too impulsive',
            'Red may find Grey too detached',
            'Different approaches to social relationships'
        ]
    },
    { 
        colors: ['Red', 'Pink'], 
        compatibility: 3, 
        dynamicsSummary: 'A dynamic friendship where Red\'s drive is balanced by Pink\'s warmth and care.',
        strengths: [
            'Pink brings emotional warmth to Red\'s practicality',
            'Red helps Pink be more assertive',
            'Complementary social approaches',
            'Balance between tasks and relationships'
        ],
        challenges: [
            'Red may seem insensitive to relationship-focused Pink',
            'Pink might appear too emotional to task-focused Red',
            'Different priorities in friendship maintenance',
            'May struggle with conflict resolution styles'
        ]
    },
    { 
        colors: ['Red', 'Chocolate'], 
        compatibility: 4, 
        dynamicsSummary: 'A structured friendship with shared values of reliability and determination.',
        strengths: [
            'Mutual appreciation for hard work and dedication',
            'Both value loyalty and commitment',
            'Chocolate provides stability to Red\'s dynamism',
            'Shared practical approach to life challenges'
        ],
        challenges: [
            'Red may find Chocolate too traditional or cautious',
            'Chocolate might view Red as too disruptive',
            'Different comfort levels with change and risk',
            'May have different social preferences'
        ]
    },

    // Blue Combinations (9 variations - excluding Blue-Red which was covered above)
    { 
        colors: ['Blue', 'Blue'], 
        compatibility: 5, 
        dynamicsSummary: 'A deeply intellectual friendship with meaningful conversations and mutual respect for depth and analysis.',
        strengths: [
            'Rich intellectual exchange',
            'Mutual understanding of need for space',
            'Shared appreciation for depth and complexity',
            'Respect for each other\'s expertise'
        ],
        challenges: [
            'May overthink relationship dynamics',
            'Could lack emotional expression',
            'Might both avoid conflict',
            'Can become too isolated from others'
        ]
    },
    { 
        colors: ['Blue', 'Green'], 
        compatibility: 5, 
        dynamicsSummary: 'A harmonious friendship combining intellectual depth with emotional intelligence.',
        strengths: [
            'Green offers emotional intelligence to complement Blue\'s logic',
            'Blue provides analytical clarity to Green\'s feelings',
            'Shared thoughtfulness and consideration',
            'Both value deep, meaningful connection'
        ],
        challenges: [
            'Blue may seem detached to sensitive Green',
            'Green might appear too emotional to analytical Blue',
            'Both tend to avoid conflict rather than address issues',
            'May need to work on practical action'
        ]
    },
    { 
        colors: ['Blue', 'Yellow'], 
        compatibility: 3, 
        dynamicsSummary: 'A complementary friendship where Yellow\'s spontaneity brings energy to Blue\'s thoughtful depth.',
        strengths: [
            'Yellow helps Blue lighten up and experience more',
            'Blue adds depth to Yellow\'s experiences',
            'Complementary social strengths',
            'Balance between fun and meaning'
        ],
        challenges: [
            'Fundamentally different processing styles',
            'Yellow may find Blue too serious',
            'Blue might see Yellow as scattered or superficial',
            'Different social and energy needs'
        ]
    },
    { 
        colors: ['Blue', 'Purple'], 
        compatibility: 5, 
        dynamicsSummary: 'An intellectually stimulating friendship combining analytical thinking with creative vision.',
        strengths: [
            'Deep, thought-provoking conversations',
            'Mutual appreciation for complexity',
            'Blue helps organize Purple\'s creative ideas',
            'Purple helps Blue think outside conventional frameworks'
        ],
        challenges: [
            'May get lost in theoretical discussions without action',
            'Blue might find Purple too abstract',
            'Purple may find Blue too conventional in thinking',
            'Both might struggle with practical implementation'
        ]
    },
    { 
        colors: ['Blue', 'Black'], 
        compatibility: 4, 
        dynamicsSummary: 'A straightforward, independent friendship with intellectual depth and respect for authenticity.',
        strengths: [
            'Direct, honest communication',
            'Mutual respect for personal boundaries',
            'Shared appreciation for truth and clarity',
            'Neither needs emotional maintenance'
        ],
        challenges: [
            'May struggle with emotional expression',
            'Could lack warmth or vulnerability',
            'Both might be too independent at times',
            'Risk of intellectual competitiveness'
        ]
    },
    { 
        colors: ['Blue', 'White'], 
        compatibility: 3, 
        dynamicsSummary: 'A thoughtful friendship where Blue\'s analytical approach meets White\'s harmonious acceptance.',
        strengths: [
            'White helps Blue be more accepting',
            'Blue helps White with clear thinking',
            'Shared value for reflection',
            'Balance between analysis and harmony'
        ],
        challenges: [
            'Blue may find White too indecisive',
            'White might find Blue too critical',
            'Different approaches to decision-making',
            'Blue seeks clarity while White accepts ambiguity'
        ]
    },
    { 
        colors: ['Blue', 'Grey'], 
        compatibility: 4, 
        dynamicsSummary: 'A logical, analytical friendship with shared appreciation for clear thinking and objectivity.',
        strengths: [
            'Similar rational approach to problems',
            'Mutual respect for facts and evidence',
            'Clear, straightforward communication',
            'Shared value for competence and accuracy'
        ],
        challenges: [
            'May lack emotional expression or warmth',
            'Could become too detached or analytical',
            'Both might avoid addressing relationship issues',
            'Risk of overthinking social dynamics'
        ]
    },
    { 
        colors: ['Blue', 'Pink'], 
        compatibility: 3, 
        dynamicsSummary: 'A balanced friendship where Blue\'s analytical depth meets Pink\'s interpersonal warmth.',
        strengths: [
            'Pink brings emotional connection to Blue\'s world',
            'Blue adds depth to Pink\'s relationship focus',
            'Complementary social strengths',
            'Balance between thinking and feeling'
        ],
        challenges: [
            'Blue may seem cold or distant to Pink',
            'Pink might appear too emotional to Blue',
            'Different communication priorities',
            'Mismatched expectations for emotional sharing'
        ]
    },
    { 
        colors: ['Blue', 'Chocolate'], 
        compatibility: 4, 
        dynamicsSummary: 'A stable, reliable friendship combining intellectual depth with practical tradition.',
        strengths: [
            'Mutual appreciation for structure and reliability',
            'Shared value for competence and knowledge',
            'Chocolate grounds Blue\'s theoretical thinking',
            'Blue adds analytical depth to Chocolate\'s practical wisdom'
        ],
        challenges: [
            'Blue may find Chocolate too conventional',
            'Chocolate might see Blue as too abstract',
            'Different attitudes toward tradition and innovation',
            'May have different social preferences'
        ]
    },

    // Green Combinations (8 variations - excluding Green with Red and Blue covered above)
    { 
        colors: ['Green', 'Green'], 
        compatibility: 5, 
        dynamicsSummary: 'A deeply supportive and harmonious friendship built on mutual care, empathy, and emotional understanding.',
        strengths: [
            'Strong emotional support and validation',
            'Deep mutual understanding and empathy',
            'Create safe space for vulnerability',
            'Naturally prioritize the relationship'
        ],
        challenges: [
            'May avoid necessary conflict',
            'Could become too dependent on each other',
            'Might enable each other\'s people-pleasing tendencies',
            'Both may neglect own needs for the other'
        ]
    },
    { 
        colors: ['Green', 'Yellow'], 
        compatibility: 5, 
        dynamicsSummary: 'A warm, fun friendship combining Yellow\'s enthusiasm with Green\'s supportive nature.',
        strengths: [
            'Yellow brings fun and adventure to Green\'s life',
            'Green provides emotional depth to Yellow\'s experiences',
            'Shared people-orientation',
            'Balance between excitement and emotional connection'
        ],
        challenges: [
            'Green may find Yellow too scattered or uncommitted',
            'Yellow might find Green too serious or sensitive',
            'Different approaches to relationship depth',
            'May have different social energy levels'
        ]
    },
    { 
        colors: ['Green', 'Purple'], 
        compatibility: 4, 
        dynamicsSummary: 'A creative, supportive friendship combining emotional depth with imaginative vision.',
        strengths: [
            'Green provides emotional support for Purple\'s creative process',
            'Purple inspires Green with new perspectives',
            'Shared appreciation for depth and meaning',
            'Both value authentic self-expression'
        ],
        challenges: [
            'Green may find Purple too abstract or distracted',
            'Purple might find Green too focused on practical concerns',
            'Different approaches to decision-making',
            'May have different social preferences'
        ]
    },
    { 
        colors: ['Green', 'Black'], 
        compatibility: 3, 
        dynamicsSummary: 'A friendship balancing Green\'s nurturing support with Black\'s independent authenticity.',
        strengths: [
            'Black\'s honesty balances Green\'s people-pleasing tendencies',
            'Green\'s warmth softens Black\'s intensity',
            'Complementary perspective on relationships',
            'Green helps Black connect emotionally'
        ],
        challenges: [
            'Green may find Black too harsh or detached',
            'Black might see Green as too dependent or emotional',
            'Different needs for closeness and space',
            'Fundamentally different approaches to relationships'
        ]
    },
    { 
        colors: ['Green', 'White'], 
        compatibility: 5, 
        dynamicsSummary: 'A peaceful, harmonious friendship with shared values of acceptance and emotional attunement.',
        strengths: [
            'Strong mutual understanding and support',
            'Shared focus on maintaining harmony',
            'Both value emotional wellbeing',
            'Create accepting, judgment-free space for each other'
        ],
        challenges: [
            'Both avoid conflict, issues may go unaddressed',
            'May lack assertiveness when needed',
            'Could become too comfortable in safe bubble',
            'Might need more challenge or direction'
        ]
    },
    { 
        colors: ['Green', 'Grey'], 
        compatibility: 3, 
        dynamicsSummary: 'A friendship balancing emotional intelligence with logical objectivity.',
        strengths: [
            'Grey\'s logic complements Green\'s emotional approach',
            'Green brings warmth to Grey\'s objectivity',
            'Complementary problem-solving approaches',
            'Balance between feelings and facts'
        ],
        challenges: [
            'Grey may seem too detached to emotional Green',
            'Green might appear too subjective to logical Grey',
            'Different communication priorities',
            'May have mismatched emotional needs'
        ]
    },
    { 
        colors: ['Green', 'Pink'], 
        compatibility: 5, 
        dynamicsSummary: 'A deeply nurturing friendship with strong emotional connection and mutual care.',
        strengths: [
            'Strong emotional bond and understanding',
            'Mutual care and support',
            'Shared focus on relationships',
            'Create safe space for vulnerability'
        ],
        challenges: [
            'May become too caught up in each other\'s problems',
            'Both might neglect personal boundaries',
            'Could enable each other\'s people-pleasing habits',
            'May avoid necessary conflict or hard truths'
        ]
    },
    { 
        colors: ['Green', 'Chocolate'], 
        compatibility: 4, 
        dynamicsSummary: 'A supportive, stable friendship combining emotional warmth with reliable tradition.',
        strengths: [
            'Shared value for reliability and consistency',
            'Both prioritize relationship maintenance',
            'Chocolate provides structure, Green offers emotional depth',
            'Mutual appreciation for stability and security'
        ],
        challenges: [
            'May become too routine-oriented or predictable',
            'Could resist necessary changes',
            'Might both avoid addressing difficult issues',
            'May need more adventure or challenge'
        ]
    },

    // Yellow Combinations (7 variations - excluding those covered above)
    { 
        colors: ['Yellow', 'Yellow'], 
        compatibility: 4, 
        dynamicsSummary: 'An energetic, fun-filled friendship with constant activity, adventure, and social connection.',
        strengths: [
            'Endless fun and spontaneity',
            'Shared enthusiasm for new experiences',
            'Natural optimism and positivity',
            'Strong social connection and network'
        ],
        challenges: [
            'May lack depth or serious conversation',
            'Both might avoid difficult emotions',
            'Could struggle with follow-through on plans',
            'Friendship might lack structure or consistency'
        ]
    },
    { 
        colors: ['Yellow', 'Purple'], 
        compatibility: 5, 
        dynamicsSummary: 'A creative, exciting friendship full of ideas, possibilities, and novel experiences.',
        strengths: [
            'Highly creative energy together',
            'Yellow brings fun to Purple\'s depth',
            'Purple adds meaning to Yellow\'s experiences',
            'Shared enthusiasm for new possibilities'
        ],
        challenges: [
            'May struggle with practical follow-through',
            'Could jump between ideas without completion',
            'Yellow might find Purple too complex at times',
            'Purple may find Yellow too scattered'
        ]
    },
    { 
        colors: ['Yellow', 'Black'], 
        compatibility: 3, 
        dynamicsSummary: 'A contrasting friendship where Yellow\'s sociable energy meets Black\'s independent authenticity.',
        strengths: [
            'Yellow helps Black connect socially',
            'Black helps Yellow be more authentic',
            'Complementary perspectives on life',
            'Balance between fun and depth'
        ],
        challenges: [
            'Fundamentally different energy levels',
            'Yellow may find Black too serious or negative',
            'Black might see Yellow as superficial or scattered',
            'Different needs for social interaction'
        ]
    },
    { 
        colors: ['Yellow', 'White'], 
        compatibility: 4, 
        dynamicsSummary: 'A positive, easygoing friendship where Yellow\'s enthusiasm combines with White\'s peaceful acceptance.',
        strengths: [
            'Yellow energizes White\'s calm nature',
            'White provides grounding for Yellow\'s energy',
            'Shared positive outlook',
            'Both adapt easily to changing circumstances'
        ],
        challenges: [
            'Yellow may overwhelm White with too much activity',
            'White might frustrate Yellow with passivity',
            'Different approaches to decision-making',
            'Mismatched energy levels'
        ]
    },
    { 
        colors: ['Yellow', 'Grey'], 
        compatibility: 2, 
        dynamicsSummary: 'A contrasting friendship between Yellow\'s spontaneous enthusiasm and Grey\'s logical objectivity.',
        strengths: [
            'Yellow brings energy and fun to Grey\'s life',
            'Grey helps Yellow think more clearly',
            'Complementary problem-solving styles',
            'Balance between spontaneity and structure'
        ],
        challenges: [
            'Fundamentally different approaches to life',
            'Yellow finds Grey too boring or critical',
            'Grey sees Yellow as scattered or illogical',
            'Very different communication priorities'
        ]
    },
    { 
        colors: ['Yellow', 'Pink'], 
        compatibility: 4, 
        dynamicsSummary: 'A warm, positive friendship combining Yellow\'s enthusiasm with Pink\'s nurturing care.',
        strengths: [
            'Shared positive energy and warmth',
            'Yellow brings fun, Pink adds emotional depth',
            'Both people-oriented and socially connected',
            'Create uplifting, supportive environment'
        ],
        challenges: [
            'Yellow may seem inconsistent to relationship-focused Pink',
            'Pink might appear too sensitive to carefree Yellow',
            'Different expectations for relationship depth',
            'May have different approaches to emotional processing'
        ]
    },
    { 
        colors: ['Yellow', 'Chocolate'], 
        compatibility: 3, 
        dynamicsSummary: 'A friendship balancing Yellow\'s spontaneous energy with Chocolate\'s grounded stability.',
        strengths: [
            'Yellow helps Chocolate experience more fun',
            'Chocolate provides stability for Yellow',
            'Complementary approaches to life',
            'Balance between tradition and novelty'
        ],
        challenges: [
            'Yellow may find Chocolate too rigid or boring',
            'Chocolate might see Yellow as unreliable',
            'Very different attitudes toward change',
            'Mismatched comfort levels with risk-taking'
        ]
    },

    // Purple Combinations (6 variations - excluding those covered above)
    { 
        colors: ['Purple', 'Purple'], 
        compatibility: 4, 
        dynamicsSummary: 'A deeply creative friendship full of imagination, inspiration, and philosophical exploration.',
        strengths: [
            'Mutual inspiration and idea generation',
            'Deep, meaningful conversations',
            'Shared appreciation for uniqueness',
            'Support for each other\'s creative expression'
        ],
        challenges: [
            'May get lost in ideas without practical action',
            'Both might be inconsistent with plans',
            'Could neglect practical responsibilities',
            'Might compete for creative recognition'
        ]
    },
    { 
        colors: ['Purple', 'Black'], 
        compatibility: 4, 
        dynamicsSummary: 'An authentic, thought-provoking friendship with depth, independence, and unique perspectives.',
        strengths: [
            'Deep, honest conversations',
            'Mutual respect for authenticity',
            'Shared appreciation for independence',
            'Both value original thinking'
        ],
        challenges: [
            'May struggle with emotional expression',
            'Both might be too independent at times',
            'Could lack practical focus',
            'Might have different social needs'
        ]
    },
    { 
        colors: ['Purple', 'White'], 
        compatibility: 3, 
        dynamicsSummary: 'A peaceful, thoughtful friendship where Purple\'s creative depth meets White\'s accepting harmony.',
        strengths: [
            'White provides calm for Purple\'s intensity',
            'Purple adds depth to White\'s perspective',
            'Shared value for authentic expression',
            'Balance between innovation and acceptance'
        ],
        challenges: [
            'Purple may find White too passive',
            'White might find Purple too complex',
            'Different decision-making approaches',
            'May have mismatched energy for deep discussions'
        ]
    },
    { 
        colors: ['Purple', 'Grey'], 
        compatibility: 3, 
        dynamicsSummary: 'A friendship contrasting Purple\'s creative vision with Grey\'s logical objectivity.',
        strengths: [
            'Grey helps organize Purple\'s ideas',
            'Purple inspires Grey\'s creative thinking',
            'Complementary analytical approaches',
            'Balance between innovation and practicality'
        ],
        challenges: [
            'Grey may find Purple too abstract',
            'Purple might see Grey as too rigid',
            'Different values in decision-making',
            'May have different emotional expressiveness'
        ]
    },
    { 
        colors: ['Purple', 'Pink'], 
        compatibility: 4, 
        dynamicsSummary: 'A warm, creative friendship combining imaginative depth with emotional connection.',
        strengths: [
            'Pink grounds Purple\'s ideas with emotional intelligence',
            'Purple inspires Pink with new perspectives',
            'Shared appreciation for depth and meaning',
            'Both value authentic expression'
        ],
        challenges: [
            'Purple may seem distracted to relationship-focused Pink',
            'Pink might appear too conventional to free-thinking Purple',
            'Different priorities in friendship maintenance',
            'May have different social needs'
        ]
    },
    { 
        colors: ['Purple', 'Chocolate'], 
        compatibility: 3, 
        dynamicsSummary: 'A friendship balancing Purple\'s innovative thinking with Chocolate\'s practical tradition.',
        strengths: [
            'Chocolate grounds Purple\'s abstract ideas',
            'Purple brings fresh perspective to Chocolate\'s traditions',
            'Complementary approaches to problems',
            'Balance between creativity and practicality'
        ],
        challenges: [
            'Purple finds Chocolate too conventional',
            'Chocolate sees Purple as impractical',
            'Different comfort levels with change',
            'Conflicting views on tradition vs. innovation'
        ]
    },

    // Black Combinations (5 variations - excluding those covered above)
    { 
        colors: ['Black', 'Black'], 
        compatibility: 3, 
        dynamicsSummary: 'An independent, authentic friendship with straightforward communication and mutual respect for boundaries.',
        strengths: [
            'Completely honest communication',
            'Strong respect for independence',
            'No pretense or social games',
            'Shared value for authenticity'
        ],
        challenges: [
            'May struggle with emotional vulnerability',
            'Both prioritize independence over connection',
            'Could become too isolated as a pair',
            'Friendship might lack warmth or support'
        ]
    },
    { 
        colors: ['Black', 'White'], 
        compatibility: 2, 
        dynamicsSummary: 'A contrasting friendship between Black\'s direct authenticity and White\'s peaceful harmony.',
        strengths: [
            'Black provides clarity White may avoid',
            'White offers acceptance Black rarely finds',
            'Complementary perspectives on conflict',
            'Balance between honesty and peace'
        ],
        challenges: [
            'Fundamentally different approaches to conflict',
            'Black may find White frustratingly passive',
            'White might see Black as too harsh',
            'Very different communication styles'
        ]
    },
    { 
        colors: ['Black', 'Grey'], 
        compatibility: 4, 
        dynamicsSummary: 'A logical, straightforward friendship with shared value for clarity, independence, and objectivity.',
        strengths: [
            'Clear, honest communication',
            'Mutual respect for boundaries',
            'Shared logical approach to problems',
            'Neither requires emotional maintenance'
        ],
        challenges: [
            'May lack emotional warmth or expression',
            'Both might be too independent',
            'Could struggle with vulnerability',
            'Friendship might become too detached'
        ]
    },
    { 
        colors: ['Black', 'Pink'], 
        compatibility: 3, 
        dynamicsSummary: 'A contrasting friendship between Black\'s independent authenticity and Pink\'s warm nurturing.',
        strengths: [
            'Black helps Pink be more assertive',
            'Pink helps Black connect emotionally',
            'Complementary relationship perspectives',
            'Balance between independence and connection'
        ],
        challenges: [
            'Black may find Pink too emotional or clingy',
            'Pink might see Black as too harsh or cold',
            'Very different needs for closeness',
            'Fundamentally different friendship expectations'
        ]
    },
    { 
        colors: ['Black', 'Chocolate'], 
        compatibility: 3, 
        dynamicsSummary: 'A friendship balancing Black\'s independent authenticity with Chocolate\'s reliable tradition.',
        strengths: [
            'Black brings honest perspective to Chocolate',
            'Chocolate provides stability for Black',
            'Mutual appreciation for integrity',
            'Both value substance over appearance'
        ],
        challenges: [
            'Black may find Chocolate too conventional',
            'Chocolate might see Black as too rebellious',
            'Different attitudes toward social norms',
            'May have conflicting values'
        ]
    },

    // White Combinations (4 variations - excluding those covered above)
    { 
        colors: ['White', 'White'], 
        compatibility: 4, 
        dynamicsSummary: 'A peaceful, harmonious friendship with mutual acceptance, adaptability, and conflict avoidance.',
        strengths: [
            'Extremely peaceful relationship',
            'Complete mutual acceptance',
            'Shared value for harmony',
            'Non-judgmental support'
        ],
        challenges: [
            'Avoidance of necessary conflict',
            'May lack direction or initiative',
            'Could become too passive together',
            'Important issues might go unaddressed'
        ]
    },
    { 
        colors: ['White', 'Grey'], 
        compatibility: 3, 
        dynamicsSummary: 'A calm, balanced friendship between White\'s peaceful acceptance and Grey\'s logical objectivity.',
        strengths: [
            'Grey provides clarity to White\'s perspective',
            'White offers acceptance to Grey\'s analysis',
            'Shared calm, low-drama approach',
            'Balance between peace and practicality'
        ],
        challenges: [
            'Grey may find White too indecisive',
            'White might see Grey as too detached',
            'Different approaches to problems',
            'May have mismatched emotional needs'
        ]
    },
    { 
        colors: ['White', 'Pink'], 
        compatibility: 4, 
        dynamicsSummary: 'A gentle, supportive friendship combining White\'s peaceful acceptance with Pink\'s nurturing warmth.',
        strengths: [
            'Strong emotional support and understanding',
            'Shared focus on maintaining harmony',
            'Create safe, judgment-free space together',
            'Mutual care and consideration'
        ],
        challenges: [
            'Both avoid conflict, issues go unaddressed',
            'May lack assertiveness when needed',
            'Could enable each other\'s people-pleasing tendencies',
            'Friendship might lack challenge or growth'
        ]
    },
    { 
        colors: ['White', 'Chocolate'], 
        compatibility: 4, 
        dynamicsSummary: 'A stable, peaceful friendship with shared values of harmony, tradition, and acceptance.',
        strengths: [
            'Mutual appreciation for stability',
            'Shared preference for peaceful interaction',
            'Both value consistency and reliability',
            'Create comfortable, drama-free zone'
        ],
        challenges: [
            'May resist necessary changes',
            'Both avoid addressing problems',
            'Could become too comfortable or stagnant',
            'Friendship might lack growth or challenge'
        ]
    },

    // Grey Combinations (3 variations - excluding those covered above)
    { 
        colors: ['Grey', 'Grey'], 
        compatibility: 4, 
        dynamicsSummary: 'A logical, pragmatic friendship with clear communication and mutual respect for objectivity.',
        strengths: [
            'Clear, straightforward communication',
            'Shared rational approach to problems',
            'Neither requires emotional maintenance',
            'Mutual respect for competence'
        ],
        challenges: [
            'May lack emotional warmth or expression',
            'Both might avoid personal topics',
            'Could become too detached or analytical',
            'Friendship might lack depth or passion'
        ]
    },
    { 
        colors: ['Grey', 'Pink'], 
        compatibility: 3, 
        dynamicsSummary: 'A friendship balancing Grey\'s logical objectivity with Pink\'s emotional nurturing.',
        strengths: [
            'Grey helps Pink think more objectively',
            'Pink brings emotional warmth to Grey\'s life',
            'Complementary problem-solving approaches',
            'Balance between facts and feelings'
        ],
        challenges: [
            'Grey may appear cold to relationship-focused Pink',
            'Pink might seem too emotional to logical Grey',
            'Different communication priorities',
            'Mismatched needs for emotional expression'
        ]
    },
    { 
        colors: ['Grey', 'Chocolate'], 
        compatibility: 4, 
        dynamicsSummary: 'A practical, grounded friendship with shared values for structure and reliability.',
        strengths: [
            'Similar practical approach to life',
            'Mutual appreciation for order and logic',
            'Shared value for consistency and reliability',
            'Straightforward, no-nonsense communication'
        ],
        challenges: [
            'May become too routine-oriented',
            'Both might resist necessary changes',
            'Could lack emotional expressiveness',
            'Friendship might become too predictable'
        ]
    },

    // Pink Combinations (2 variations - excluding those covered above)
    { 
        colors: ['Pink', 'Pink'], 
        compatibility: 4, 
        dynamicsSummary: 'A deeply nurturing and supportive friendship built on mutual care, emotional understanding, and compassion.',
        strengths: [
            'Strong emotional connection and support',
            'Deep understanding of each other\'s feelings',
            'Create safe space for vulnerability',
            'Mutual prioritization of relationship needs'
        ],
        challenges: [
            'May become too enmeshed in each other\'s lives',
            'Both might neglect personal boundaries',
            'Could enable codependent patterns',
            'May avoid necessary confrontation'
        ]
    },
    { 
        colors: ['Pink', 'Chocolate'], 
        compatibility: 5, 
        dynamicsSummary: 'A warm, stable friendship combining nurturing care with reliable tradition and structure.',
        strengths: [
            'Shared focus on maintaining relationships',
            'Mutual appreciation for stability and security',
            'Complementary nurturing approaches',
            'Strong foundation of trust and reliability'
        ],
        challenges: [
            'May become too focused on others\' needs',
            'Both might resist necessary changes',
            'Could become too comfortable or predictable',
            'May need more independence or adventure'
        ]
    },

    // Chocolate Combination (1 variation - itself)
    { 
        colors: ['Chocolate', 'Chocolate'], 
        compatibility: 5, 
        dynamicsSummary: 'A deeply stable and reliable friendship built on shared traditions, consistency, and mutual dependability.',
        strengths: [
            'Extremely consistent and reliable connection',
            'Shared appreciation for tradition and structure',
            'Strong sense of loyalty and commitment',
            'Mutual understanding of values and expectations'
        ],
        challenges: [
            'May become too rigid or set in ways',
            'Could resist beneficial changes or growth',
            'Might judge others by their own traditional standards',
            'Friendship could lack spontaneity or novelty'
        ]
    }
];

function getMatchDetails(color1, color2) {
    const match = friendMatchData.find(m => 
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
window.friendMatchData = friendMatchData;
window.getMatchDetails = getMatchDetails;
window.getCompatibilityDescription = getCompatibilityDescription;

// Log for debugging
console.log("Friend Match Data loaded successfully!");
console.log("Total combinations:", friendMatchData.length);