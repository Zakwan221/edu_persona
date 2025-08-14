// All 40 personality test questions
const questions = [
    // Personal Interaction Style
    {
        question: "I prefer to think things through carefully before speaking or acting.",
        options: [
            { text: "Strongly Agree", colors: { blue: 2, grey: 2, white: 1 } },
            { text: "Agree", colors: { blue: 1, grey: 1, white: 1 } },
            { text: "Neutral", colors: {} },
            { text: "Disagree", colors: { red: 1, yellow: 1 } },
            { text: "Strongly Disagree", colors: { red: 2, yellow: 2 } }
        ]
    },
    {
        question: "I enjoy being the center of attention at social gatherings.",
        options: [
            { text: "Strongly Agree", colors: { red: 2, yellow: 2, pink: 1 } },
            { text: "Agree", colors: { red: 1, yellow: 1 } },
            { text: "Neutral", colors: {} },
            { text: "Disagree", colors: { black: 1, grey: 1 } },
            { text: "Strongly Disagree", colors: { black: 2, grey: 2 } }
        ]
    },
    {
        question: "I find it easy to stick to routines and schedules.",
        options: [
            { text: "Strongly Agree", colors: { green: 2, chocolate: 2, blue: 1 } },
            { text: "Agree", colors: { green: 1, chocolate: 1 } },
            { text: "Neutral", colors: {} },
            { text: "Disagree", colors: { yellow: 1, purple: 1 } },
            { text: "Strongly Disagree", colors: { yellow: 2, purple: 2 } }
        ]
    },
    {
        question: "I often think about the deeper meaning of life and existence.",
        options: [
            { text: "Strongly Agree", colors: { purple: 2, black: 2, white: 1 } },
            { text: "Agree", colors: { purple: 1, black: 1 } },
            { text: "Neutral", colors: {} },
            { text: "Disagree", colors: { red: 1, yellow: 1 } },
            { text: "Strongly Disagree", colors: { red: 2, yellow: 2 } }
        ]
    },
    {
        question: "I find it difficult to say no when someone asks for my help.",
        options: [
            { text: "Strongly Agree", colors: { pink: 2, white: 2, green: 1 } },
            { text: "Agree", colors: { pink: 1, white: 1 } },
            { text: "Neutral", colors: {} },
            { text: "Disagree", colors: { black: 1, red: 1 } },
            { text: "Strongly Disagree", colors: { black: 2, red: 2 } }
        ]
    },
    {
        question: "I prefer to make decisions based on facts rather than feelings.",
        options: [
            { text: "Strongly Agree", colors: { blue: 2, grey: 2, green: 1 } },
            { text: "Agree", colors: { blue: 1, grey: 1 } },
            { text: "Neutral", colors: {} },
            { text: "Disagree", colors: { pink: 1, purple: 1 } },
            { text: "Strongly Disagree", colors: { pink: 2, purple: 2 } }
        ]
    },
    {
        question: "I enjoy taking risks and seeking new adventures.",
        options: [
            { text: "Strongly Agree", colors: { red: 2, yellow: 2, purple: 1 } },
            { text: "Agree", colors: { red: 1, yellow: 1 } },
            { text: "Neutral", colors: {} },
            { text: "Disagree", colors: { chocolate: 1, white: 1 } },
            { text: "Strongly Disagree", colors: { chocolate: 2, grey: 2 } }
        ]
    },
    {
        question: "I value tradition and established practices.",
        options: [
            { text: "Strongly Agree", colors: { chocolate: 2, green: 2, white: 1 } },
            { text: "Agree", colors: { chocolate: 1, green: 1 } },
            { text: "Neutral", colors: {} },
            { text: "Disagree", colors: { purple: 1, yellow: 1 } },
            { text: "Strongly Disagree", colors: { purple: 2, red: 2 } }
        ]
    },
    {
        question: "I prefer deep one-on-one conversations to large group discussions.",
        options: [
            { text: "Strongly Agree", colors: { black: 2, blue: 2, purple: 1 } },
            { text: "Agree", colors: { black: 1, blue: 1 } },
            { text: "Neutral", colors: {} },
            { text: "Disagree", colors: { yellow: 1, red: 1 } },
            { text: "Strongly Disagree", colors: { yellow: 2, red: 2 } }
        ]
    },
    {
        question: "I'm quick to express my emotions and feelings to others.",
        options: [
            { text: "Strongly Agree", colors: { pink: 2, yellow: 2, red: 1 } },
            { text: "Agree", colors: { pink: 1, yellow: 1 } },
            { text: "Neutral", colors: {} },
            { text: "Disagree", colors: { grey: 1, black: 1 } },
            { text: "Strongly Disagree", colors: { grey: 2, black: 2 } }
        ]
    },
    {
        question: "I try to avoid conflicts, even if it means compromising my own views.",
        options: [
            { text: "Strongly Agree", colors: { white: 2, pink: 2, green: 1 } },
            { text: "Agree", colors: { white: 1, pink: 1 } },
            { text: "Neutral", colors: {} },
            { text: "Disagree", colors: { red: 1, black: 1 } },
            { text: "Strongly Disagree", colors: { red: 2, black: 2 } }
        ]
    },
    {
        question: "I believe having a detailed plan is essential for success.",
        options: [
            { text: "Strongly Agree", colors: { blue: 2, chocolate: 2, green: 1 } },
            { text: "Agree", colors: { blue: 1, chocolate: 1 } },
            { text: "Neutral", colors: {} },
            { text: "Disagree", colors: { yellow: 1, purple: 1 } },
            { text: "Strongly Disagree", colors: { yellow: 2, purple: 2 } }
        ]
    },
    {
        question: "I find it easy to see the positive side of difficult situations.",
        options: [
            { text: "Strongly Agree", colors: { yellow: 2, white: 2, pink: 1 } },
            { text: "Agree", colors: { yellow: 1, white: 1 } },
            { text: "Neutral", colors: {} },
            { text: "Disagree", colors: { grey: 1, black: 1 } },
            { text: "Strongly Disagree", colors: { grey: 2, black: 2 } }
        ]
    },
    {
        question: "I value independence and doing things my own way.",
        options: [
            { text: "Strongly Agree", colors: { black: 2, red: 2, purple: 1 } },
            { text: "Agree", colors: { black: 1, red: 1 } },
            { text: "Neutral", colors: {} },
            { text: "Disagree", colors: { pink: 1, white: 1 } },
            { text: "Strongly Disagree", colors: { pink: 2, green: 2 } }
        ]
    },
    {
        question: "I enjoy creative activities like art, music, or writing.",
        options: [
            { text: "Strongly Agree", colors: { purple: 2, pink: 2, yellow: 1 } },
            { text: "Agree", colors: { purple: 1, pink: 1 } },
            { text: "Neutral", colors: {} },
            { text: "Disagree", colors: { grey: 1, blue: 1 } },
            { text: "Strongly Disagree", colors: { grey: 2, blue: 2 } }
        ]
    },
    {
        question: "I prefer stability and security over excitement and novelty.",
        options: [
            { text: "Strongly Agree", colors: { chocolate: 2, green: 2, grey: 1 } },
            { text: "Agree", colors: { chocolate: 1, green: 1 } },
            { text: "Neutral", colors: {} },
            { text: "Disagree", colors: { red: 1, yellow: 1 } },
            { text: "Strongly Disagree", colors: { red: 2, purple: 2 } }
        ]
    },
    {
        question: "I enjoy competition and striving to be the best.",
        options: [
            { text: "Strongly Agree", colors: { red: 2, blue: 2, black: 1 } },
            { text: "Agree", colors: { red: 1, blue: 1 } },
            { text: "Neutral", colors: {} },
            { text: "Disagree", colors: { white: 1, green: 1 } },
            { text: "Strongly Disagree", colors: { white: 2, pink: 2 } }
        ]
    },
    {
        question: "I find it easy to put others' needs before my own.",
        options: [
            { text: "Strongly Agree", colors: { pink: 2, white: 2, green: 1 } },
            { text: "Agree", colors: { pink: 1, white: 1 } },
            { text: "Neutral", colors: {} },
            { text: "Disagree", colors: { red: 1, black: 1 } },
            { text: "Strongly Disagree", colors: { red: 2, black: 2 } }
        ]
    },
    {
        question: "I enjoy analyzing complex problems and finding logical solutions.",
        options: [
            { text: "Strongly Agree", colors: { blue: 2, grey: 2, purple: 1 } },
            { text: "Agree", colors: { blue: 1, grey: 1 } },
            { text: "Neutral", colors: {} },
            { text: "Disagree", colors: { yellow: 1, pink: 1 } },
            { text: "Strongly Disagree", colors: { yellow: 2, pink: 2 } }
        ]
    },
    {
        question: "I am comfortable with being alone for extended periods.",
        options: [
            { text: "Strongly Agree", colors: { black: 2, grey: 2, blue: 1 } },
            { text: "Agree", colors: { black: 1, grey: 1 } },
            { text: "Neutral", colors: {} },
            { text: "Disagree", colors: { yellow: 1, pink: 1 } },
            { text: "Strongly Disagree", colors: { yellow: 2, pink: 2 } }
        ]
    },
    {
        question: "I tend to take leadership roles in group situations.",
        options: [
            { text: "Strongly Agree", colors: { red: 2, blue: 2, black: 1 } },
            { text: "Agree", colors: { red: 1, blue: 1 } },
            { text: "Neutral", colors: {} },
            { text: "Disagree", colors: { white: 1, pink: 1 } },
            { text: "Strongly Disagree", colors: { white: 2, pink: 2 } }
        ]
    },
    {
        question: "I enjoy helping others with their personal problems.",
        options: [
            { text: "Strongly Agree", colors: { pink: 2, white: 2, yellow: 1 } },
            { text: "Agree", colors: { pink: 1, white: 1 } },
            { text: "Neutral", colors: {} },
            { text: "Disagree", colors: { grey: 1, black: 1 } },
            { text: "Strongly Disagree", colors: { grey: 2, black: 2 } }
        ]
    },
    {
        question: "I prefer to stick to what I know works rather than trying new approaches.",
        options: [
            { text: "Strongly Agree", colors: { chocolate: 2, green: 2, grey: 1 } },
            { text: "Agree", colors: { chocolate: 1, green: 1 } },
            { text: "Neutral", colors: {} },
            { text: "Disagree", colors: { purple: 1, yellow: 1 } },
            { text: "Strongly Disagree", colors: { purple: 2, red: 2 } }
        ]
    },
    {
        question: "I can easily adapt to changing circumstances.",
        options: [
            { text: "Strongly Agree", colors: { yellow: 2, purple: 2, red: 1 } },
            { text: "Agree", colors: { yellow: 1, purple: 1 } },
            { text: "Neutral", colors: {} },
            { text: "Disagree", colors: { chocolate: 1, grey: 1 } },
            { text: "Strongly Disagree", colors: { chocolate: 2, green: 2 } }
        ]
    },
    {
        question: "I prefer working in a team rather than independently.",
        options: [
            { text: "Strongly Agree", colors: { yellow: 2, pink: 2, white: 1 } },
            { text: "Agree", colors: { yellow: 1, pink: 1 } },
            { text: "Neutral", colors: {} },
            { text: "Disagree", colors: { black: 1, grey: 1 } },
            { text: "Strongly Disagree", colors: { black: 2, blue: 2 } }
        ]
    },
    {
        question: "I believe it's important to challenge conventional thinking.",
        options: [
            { text: "Strongly Agree", colors: { purple: 2, red: 2, black: 1 } },
            { text: "Agree", colors: { purple: 1, red: 1 } },
            { text: "Neutral", colors: {} },
            { text: "Disagree", colors: { chocolate: 1, green: 1 } },
            { text: "Strongly Disagree", colors: { chocolate: 2, white: 2 } }
        ]
    },
    {
        question: "I find it easy to stay calm under pressure.",
        options: [
            { text: "Strongly Agree", colors: { grey: 2, blue: 2, green: 1 } },
            { text: "Agree", colors: { grey: 1, blue: 1 } },
            { text: "Neutral", colors: {} },
            { text: "Disagree", colors: { red: 1, yellow: 1 } },
            { text: "Strongly Disagree", colors: { red: 2, pink: 2 } }
        ]
    },
    {
        question: "I enjoy activities that require precision and attention to detail.",
        options: [
            { text: "Strongly Agree", colors: { blue: 2, chocolate: 2, green: 1 } },
            { text: "Agree", colors: { blue: 1, chocolate: 1 } },
            { text: "Neutral", colors: {} },
            { text: "Disagree", colors: { yellow: 1, red: 1 } },
            { text: "Strongly Disagree", colors: { yellow: 2, purple: 2 } }
        ]
    },
    {
        question: "I am more practical than idealistic.",
        options: [
            { text: "Strongly Agree", colors: { green: 2, chocolate: 2, grey: 1 } },
            { text: "Agree", colors: { green: 1, chocolate: 1 } },
            { text: "Neutral", colors: {} },
            { text: "Disagree", colors: { purple: 1, white: 1 } },
            { text: "Strongly Disagree", colors: { purple: 2, white: 2 } }
        ]
    },
    {
        question: "I tend to follow my heart rather than my head.",
        options: [
            { text: "Strongly Agree", colors: { pink: 2, yellow: 2, purple: 1 } },
            { text: "Agree", colors: { pink: 1, yellow: 1 } },
            { text: "Neutral", colors: {} },
            { text: "Disagree", colors: { blue: 1, grey: 1 } },
            { text: "Strongly Disagree", colors: { blue: 2, grey: 2 } }
        ]
    },
    {
        question: "I value harmony and peace over winning an argument.",
        options: [
            { text: "Strongly Agree", colors: { white: 2, pink: 2, green: 1 } },
            { text: "Agree", colors: { white: 1, pink: 1 } },
            { text: "Neutral", colors: {} },
            { text: "Disagree", colors: { red: 1, blue: 1 } },
            { text: "Strongly Disagree", colors: { red: 2, black: 2 } }
        ]
    },
    {
        question: "I often reflect on my own thoughts and feelings.",
        options: [
            { text: "Strongly Agree", colors: { purple: 2, black: 2, blue: 1 } },
            { text: "Agree", colors: { purple: 1, black: 1 } },
            { text: "Neutral", colors: {} },
            { text: "Disagree", colors: { red: 1, yellow: 1 } },
            { text: "Strongly Disagree", colors: { red: 2, yellow: 2 } }
        ]
    },
    {
        question: "I prefer to plan activities in advance rather than be spontaneous.",
        options: [
            { text: "Strongly Agree", colors: { blue: 2, chocolate: 2, green: 1 } },
            { text: "Agree", colors: { blue: 1, chocolate: 1 } },
            { text: "Neutral", colors: {} },
            { text: "Disagree", colors: { yellow: 1, purple: 1 } },
            { text: "Strongly Disagree", colors: { yellow: 2, red: 2 } }
        ]
    },
    {
        question: "I enjoy being in fast-paced, high-energy environments.",
        options: [
            { text: "Strongly Agree", colors: { red: 2, yellow: 2, purple: 1 } },
            { text: "Agree", colors: { red: 1, yellow: 1 } },
            { text: "Neutral", colors: {} },
            { text: "Disagree", colors: { white: 1, grey: 1 } },
            { text: "Strongly Disagree", colors: { white: 2, black: 2 } }
        ]
    },
    {
        question: "I am usually the one who makes others laugh in social settings.",
        options: [
            { text: "Strongly Agree", colors: { yellow: 2, pink: 2, red: 1 } },
            { text: "Agree", colors: { yellow: 1, pink: 1 } },
            { text: "Neutral", colors: {} },
            { text: "Disagree", colors: { grey: 1, blue: 1 } },
            { text: "Strongly Disagree", colors: { grey: 2, black: 2 } }
        ]
    },
    {
        question: "I prefer proven methods over experimental approaches.",
        options: [
            { text: "Strongly Agree", colors: { chocolate: 2, green: 2, blue: 1 } },
            { text: "Agree", colors: { chocolate: 1, green: 1 } },
            { text: "Neutral", colors: {} },
            { text: "Disagree", colors: { purple: 1, red: 1 } },
            { text: "Strongly Disagree", colors: { purple: 2, yellow: 2 } }
        ]
    },
    {
        question: "I am deeply concerned about others' feelings and well-being.",
        options: [
            { text: "Strongly Agree", colors: { pink: 2, white: 2, yellow: 1 } },
            { text: "Agree", colors: { pink: 1, white: 1 } },
            { text: "Neutral", colors: {} },
            { text: "Disagree", colors: { grey: 1, black: 1 } },
            { text: "Strongly Disagree", colors: { grey: 2, black: 2 } }
        ]
    },
    {
        question: "I enjoy intellectual challenges and abstract thinking.",
        options: [
            { text: "Strongly Agree", colors: { blue: 2, purple: 2, black: 1 } },
            { text: "Agree", colors: { blue: 1, purple: 1 } },
            { text: "Neutral", colors: {} },
            { text: "Disagree", colors: { yellow: 1, pink: 1 } },
            { text: "Strongly Disagree", colors: { yellow: 2, pink: 2 } }
        ]
    },
    {
        question: "I am very organized and keep things in their proper place.",
        options: [
            { text: "Strongly Agree", colors: { chocolate: 2, green: 2, blue: 1 } },
            { text: "Agree", colors: { chocolate: 1, green: 1 } },
            { text: "Neutral", colors: {} },
            { text: "Disagree", colors: { purple: 1, yellow: 1 } },
            { text: "Strongly Disagree", colors: { purple: 2, yellow: 2 } }
        ]
    },
    {
        question: "I am more focused on the present than worried about the future.",
        options: [
            { text: "Strongly Agree", colors: { yellow: 2, red: 2, grey: 1 } },
            { text: "Agree", colors: { yellow: 1, red: 1 } },
            { text: "Neutral", colors: {} },
            { text: "Disagree", colors: { blue: 1, black: 1 } },
            { text: "Strongly Disagree", colors: { blue: 2, black: 2 } }
        ]
    }
];

// Color mapping to CSS classes
const colorClasses = {
    black: "color-black",
    white: "color-white",
    red: "color-red",
    blue: "color-blue",
    yellow: "color-yellow",
    green: "color-green",
    purple: "color-purple",
    chocolate: "color-chocolate",
    pink: "color-pink",
    grey: "color-grey"
};

let currentQuestion = 0;
let userScores = {
    black: 0,
    white: 0,
    red: 0,
    blue: 0,
    yellow: 0,
    green: 0,
    purple: 0,
    chocolate: 0,
    pink: 0,
    grey: 0
};

// Track user's answers to allow changing previous answers
let userAnswers = [];

// Global variables to store results for PDF generation
let globalDominantPersonality = null;
let globalSecondPersonality = null;
let globalThirdPersonality = null;
let globalDominantColor = null;
let globalSecondColor = null;
let globalThirdColor = null;

// Initialize the test
function initTest() {
    currentQuestion = 0;
    userScores = {
        black: 0,
        white: 0,
        red: 0,
        blue: 0,
        yellow: 0,
        green: 0,
        purple: 0,
        chocolate: 0,
        pink: 0,
        grey: 0
    };
    userAnswers = [];
    
    // Display the first question
    displayQuestion();
    updateProgress();
    updateNavigationButtons();
    
    // Reset and show question container, hide results
    document.getElementById('question-container').style.display = 'block';
    document.getElementById('question-container').classList.remove('fade-out');
    document.getElementById('results-container').style.display = 'none';
    
    // Scroll to top of test smoothly
    document.querySelector('.test-title').scrollIntoView({ behavior: 'smooth' });
}

// Display current question
function displayQuestion() {
    const question = questions[currentQuestion];
    document.getElementById('question-text').textContent = question.question;
    
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'option';
        
        // Check if this option was previously selected
        if (userAnswers[currentQuestion] === index) {
            optionElement.classList.add('selected');
        }
        
        optionElement.textContent = option.text;
        optionElement.addEventListener('click', function() {
            selectOption(index);
        });
        optionsContainer.appendChild(optionElement);
    });
    
    // Update navigation buttons
    updateNavigationButtons();
}

// Update navigation buttons visibility and state
function updateNavigationButtons() {
    const prevButton = document.getElementById('prev-button');
    const submitButton = document.getElementById('submit-button');
    
    // Previous button
    if (currentQuestion > 0) {
        prevButton.style.display = 'inline-flex';
    } else {
        prevButton.style.display = 'none';
    }
    
    // Submit button logic
    if (currentQuestion === questions.length - 1) {
        submitButton.style.display = 'inline-flex';
        submitButton.disabled = userAnswers.length < questions.length;
    } else {
        submitButton.style.display = 'none';
    }
}

// Handle option selection
function selectOption(optionIndex) {
    const options = document.querySelectorAll('.option');
    options.forEach(option => option.classList.remove('selected'));
    options[optionIndex].classList.add('selected');
    
    // If this is a new or changed answer, reset previous scores
    if (userAnswers[currentQuestion] !== undefined) {
        // Subtract previous option's scores
        const previousOption = questions[currentQuestion].options[userAnswers[currentQuestion]];
        for (const [color, value] of Object.entries(previousOption.colors)) {
            userScores[color] -= value;
        }
    }
    
    // Add new option's scores
    const selectedOption = questions[currentQuestion].options[optionIndex];
    for (const [color, value] of Object.entries(selectedOption.colors)) {
        userScores[color] += value;
    }
    
    // Store the selected answer
    userAnswers[currentQuestion] = optionIndex;
    
    // Update navigation buttons to check submit button state
    updateNavigationButtons();
    
    // Automatically move to next question if not on last question
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        displayQuestion();
        updateProgress();
    }
}

// Move to previous question
function moveToPreviousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        displayQuestion();
        updateProgress();
    }
}

// Update progress bar
function updateProgress() {
    const progress = ((currentQuestion) / (questions.length - 1)) * 100;
    document.getElementById('progress-bar').style.width = `${progress}%`;
    document.getElementById('progress-text').textContent = 
        `${Math.round(progress)}% Complete (Question ${currentQuestion + 1} of ${questions.length})`;
}

// Handle test submission
function submitTest() {
    // Ensure all questions are answered
    if (userAnswers.length === questions.length) {
        showResults();
    } else {
        alert('Please answer all questions before submitting.');
    }
}

// Helper function to get RGB color values for PDF
function getColorRGB(colorName) {
    const colorMap = {
        black: [0, 0, 0],
        white: [255, 255, 255],
        red: [255, 0, 0],
        blue: [0, 0, 255],
        yellow: [255, 215, 0],
        green: [0, 128, 0],
        purple: [128, 0, 128],
        chocolate: [210, 105, 30],
        pink: [255, 105, 180],
        grey: [128, 128, 128]
    };
    return colorMap[colorName] || [200, 200, 200];
}

// Generate PDF that looks exactly like the results image
function generatePDF() {
    if (!globalDominantPersonality) {
        alert('No results to save. Please complete the test first.');
        return;
    }

    try {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF();
        
        // Page setup - white background
        pdf.setFillColor(255, 255, 255);
        pdf.rect(0, 0, 210, 297, 'F');
        
        // GREEN HEADER - exactly like image
        pdf.setFillColor(76, 175, 80);
        pdf.rect(0, 0, 210, 42, 'F');
        
        // Header text
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(18);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Color Personality Test', 105, 16, { align: 'center' });
        
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        pdf.text('Answer 40 questions to discover your color personality. This test will reveal the color', 105, 25, { align: 'center' });
        pdf.text('that best represents your personality traits and characteristics.', 105, 32, { align: 'center' });
        
        // Progress bar - thin white line
        pdf.setFillColor(255, 255, 255);
        pdf.rect(15, 36, 180, 2, 'F');
        
        pdf.setFontSize(8);
        pdf.text('100% Complete (Question 40 of 40)', 105, 41, { align: 'center' });
        
        // Main content area starts here
        let yPos = 55;
        
        // "Your Personality Colors:" title
        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Your Personality Colors:', 105, yPos, { align: 'center' });
        yPos += 12;
        
        // PRIMARY COLOR BOX - large colored rectangle
        const primaryColor = getColorRGB(globalDominantColor);
        pdf.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
        pdf.rect(15, yPos, 180, 22, 'F');
        
        // Primary color text with proper contrast
        if (globalDominantColor === 'white' || globalDominantColor === 'yellow') {
            pdf.setTextColor(0, 0, 0);
        } else {
            pdf.setTextColor(255, 255, 255);
        }
        pdf.setFontSize(20);
        pdf.setFont('helvetica', 'bold');
        pdf.text(globalDominantPersonality.name, 105, yPos + 10, { align: 'center' });
        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'normal');
        pdf.text(`${globalDominantPersonality.title} (Primary)`, 105, yPos + 18, { align: 'center' });
        
        yPos += 32;
        
        // 2x3 GRID LAYOUT - exactly matching the image
        const boxWidth = 85;
        const boxHeight = 42;
        const leftX = 15;
        const rightX = 110;
        const gap = 8;
        
        // ROW 1: Description | Strengths
        // Description box (left)
        pdf.setFillColor(248, 251, 253);
        pdf.rect(leftX, yPos, boxWidth, boxHeight, 'F');
        pdf.setDrawColor(200, 200, 200);
        pdf.rect(leftX, yPos, boxWidth, boxHeight);
        
        pdf.setTextColor(76, 175, 80);
        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Description', leftX + 5, yPos + 10);
        
        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'normal');
        const descLines = pdf.splitTextToSize(globalDominantPersonality.description, boxWidth - 10);
        pdf.text(descLines.slice(0, 4), leftX + 5, yPos + 17);
        
        // Strengths box (right)
        pdf.setFillColor(248, 251, 253);
        pdf.rect(rightX, yPos, boxWidth, boxHeight, 'F');
        pdf.setDrawColor(200, 200, 200);
        pdf.rect(rightX, yPos, boxWidth, boxHeight);
        
        pdf.setTextColor(76, 175, 80);
        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Strengths', rightX + 5, yPos + 10);
        
        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(7);
        pdf.setFont('helvetica', 'normal');
        let strengthY = yPos + 17;
        globalDominantPersonality.strengths.slice(0, 5).forEach(strength => {
            const strengthLines = pdf.splitTextToSize(`• ${strength}`, boxWidth - 10);
            pdf.text(strengthLines, rightX + 5, strengthY);
            strengthY += strengthLines.length * 4;
        });
        
        yPos += boxHeight + gap;
        
        // ROW 2: Weaknesses | Best Friend Matches
        // Weaknesses box (left)
        pdf.setFillColor(248, 251, 253);
        pdf.rect(leftX, yPos, boxWidth, boxHeight, 'F');
        pdf.setDrawColor(200, 200, 200);
        pdf.rect(leftX, yPos, boxWidth, boxHeight);
        
        pdf.setTextColor(76, 175, 80);
        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Weaknesses', leftX + 5, yPos + 10);
        
        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(7);
        pdf.setFont('helvetica', 'normal');
        let weaknessY = yPos + 17;
        globalDominantPersonality.weaknesses.slice(0, 4).forEach(weakness => {
            const weaknessLines = pdf.splitTextToSize(`• ${weakness}`, boxWidth - 10);
            pdf.text(weaknessLines, leftX + 5, weaknessY);
            weaknessY += weaknessLines.length * 4;
        });
        
        // Best Friend Matches box (right)
        pdf.setFillColor(248, 251, 253);
        pdf.rect(rightX, yPos, boxWidth, boxHeight, 'F');
        pdf.setDrawColor(200, 200, 200);
        pdf.rect(rightX, yPos, boxWidth, boxHeight);
        
        pdf.setTextColor(76, 175, 80);
        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Best Friend Matches', rightX + 5, yPos + 10);
        
        // Friend badges
        let badgeX = rightX + 5;
        let badgeY = yPos + 20;
        globalDominantPersonality.friendMatch.forEach((friend, index) => {
            pdf.setFillColor(165, 214, 167);
            pdf.roundedRect(badgeX, badgeY, 22, 8, 2, 2, 'F');
            pdf.setTextColor(56, 142, 60);
            pdf.setFontSize(7);
            pdf.setFont('helvetica', 'bold');
            pdf.text(friend, badgeX + 11, badgeY + 5, { align: 'center' });
            badgeX += 24;
            if (badgeX > rightX + 65) {
                badgeX = rightX + 5;
                badgeY += 10;
            }
        });
        
        yPos += boxHeight + gap;
        
        // ROW 3: Best Love Matches | Future Career Paths
        // Best Love Matches box (left)
        pdf.setFillColor(248, 251, 253);
        pdf.rect(leftX, yPos, boxWidth, boxHeight, 'F');
        pdf.setDrawColor(200, 200, 200);
        pdf.rect(leftX, yPos, boxWidth, boxHeight);
        
        pdf.setTextColor(76, 175, 80);
        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Best Love Matches', leftX + 5, yPos + 10);
        
        // Love badges
        badgeX = leftX + 5;
        badgeY = yPos + 20;
        globalDominantPersonality.loveMatch.forEach((match, index) => {
            pdf.setFillColor(165, 214, 167);
            pdf.roundedRect(badgeX, badgeY, 22, 8, 2, 2, 'F');
            pdf.setTextColor(56, 142, 60);
            pdf.setFontSize(7);
            pdf.setFont('helvetica', 'bold');
            pdf.text(match, badgeX + 11, badgeY + 5, { align: 'center' });
            badgeX += 24;
            if (badgeX > leftX + 65) {
                badgeX = leftX + 5;
                badgeY += 10;
            }
        });
        
        // Future Career Paths box (right)
        pdf.setFillColor(248, 251, 253);
        pdf.rect(rightX, yPos, boxWidth, boxHeight, 'F');
        pdf.setDrawColor(200, 200, 200);
        pdf.rect(rightX, yPos, boxWidth, boxHeight);
        
        pdf.setTextColor(76, 175, 80);
        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Future Career Paths', rightX + 5, yPos + 10);
        
        // Career badges - multiple rows
        badgeX = rightX + 5;
        badgeY = yPos + 17;
        globalDominantPersonality.futureCareer.slice(0, 8).forEach((career, index) => {
            const badgeWidth = Math.min(career.length * 1.1 + 3, 38);
            pdf.setFillColor(165, 214, 167);
            pdf.roundedRect(badgeX, badgeY, badgeWidth, 6, 1, 1, 'F');
            pdf.setTextColor(56, 142, 60);
            pdf.setFontSize(6);
            pdf.setFont('helvetica', 'bold');
            pdf.text(career, badgeX + badgeWidth/2, badgeY + 4, { align: 'center' });
            
            badgeX += badgeWidth + 2;
            if (badgeX > rightX + 75) {
                badgeX = rightX + 5;
                badgeY += 8;
            }
        });
        
        yPos += boxHeight + 15;
        
        // SECONDARY COLORS - Two colored boxes side by side
        pdf.setTextColor(76, 175, 80);
        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Secondary Personality Color', leftX + 5, yPos);
        pdf.text('Tertiary Personality Color', rightX + 5, yPos);
        
        yPos += 8;
        
        // Second color box
        const secondColor = getColorRGB(globalSecondColor);
        pdf.setFillColor(secondColor[0], secondColor[1], secondColor[2]);
        pdf.rect(leftX, yPos, boxWidth, 22, 'F');
        
        if (globalSecondColor === 'white' || globalSecondColor === 'yellow') {
            pdf.setTextColor(0, 0, 0);
        } else {
            pdf.setTextColor(255, 255, 255);
        }
        pdf.setFontSize(15);
        pdf.setFont('helvetica', 'bold');
        pdf.text(globalSecondPersonality.name, leftX + boxWidth/2, yPos + 9, { align: 'center' });
        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'normal');
        pdf.text(globalSecondPersonality.title, leftX + boxWidth/2, yPos + 17, { align: 'center' });
        
        // Third color box
        const thirdColor = getColorRGB(globalThirdColor);
        pdf.setFillColor(thirdColor[0], thirdColor[1], thirdColor[2]);
        pdf.rect(rightX, yPos, boxWidth, 22, 'F');
        
        if (globalThirdColor === 'white' || globalThirdColor === 'yellow') {
            pdf.setTextColor(0, 0, 0);
        } else {
            pdf.setTextColor(255, 255, 255);
        }
        pdf.setFontSize(15);
        pdf.setFont('helvetica', 'bold');
        pdf.text(globalThirdPersonality.name, rightX + boxWidth/2, yPos + 9, { align: 'center' });
        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'normal');
        pdf.text(globalThirdPersonality.title, rightX + boxWidth/2, yPos + 17, { align: 'center' });
        
        yPos += 28;
        
        // Descriptions for secondary colors
        pdf.setTextColor(0, 0, 0);
        pdf.setFontSize(7);
        pdf.setFont('helvetica', 'normal');
        const secondDescLines = pdf.splitTextToSize(globalSecondPersonality.description, boxWidth - 5);
        pdf.text(secondDescLines.slice(0, 3), leftX + 3, yPos);
        
        const thirdDescLines = pdf.splitTextToSize(globalThirdPersonality.description, boxWidth - 5);
        pdf.text(thirdDescLines.slice(0, 3), rightX + 3, yPos);
        
        yPos = Math.max(yPos + 18, 245); // Ensure enough space for buttons
        
        // ACTION BUTTONS - exactly like in the image
        // Row 1: Retake Test (green) | Save as PDF (red)
        pdf.setFillColor(76, 175, 80);
        pdf.roundedRect(55, yPos, 40, 10, 2, 2, 'F');
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(8);
        pdf.setFont('helvetica', 'bold');
        pdf.text('Retake Test', 75, yPos + 6, { align: 'center' });
        
        pdf.setFillColor(220, 53, 69);
        pdf.roundedRect(105, yPos, 40, 10, 2, 2, 'F');
        pdf.setTextColor(255, 255, 255);
        pdf.text('Save as PDF', 125, yPos + 6, { align: 'center' });
        
        yPos += 15;
        
        // Row 2: Three smaller buttons
        pdf.setFillColor(76, 175, 80);
        pdf.roundedRect(40, yPos, 40, 8, 2, 2, 'F');
        pdf.setTextColor(255, 255, 255);
        pdf.setFontSize(7);
        pdf.text('Save to Profile', 60, yPos + 5, { align: 'center' });
        
        pdf.setFillColor(108, 117, 125);
        pdf.roundedRect(85, yPos, 45, 8, 2, 2, 'F');
        pdf.setTextColor(255, 255, 255);
        pdf.text('Discard Results', 107.5, yPos + 5, { align: 'center' });
        
        pdf.setFillColor(108, 117, 125);
        pdf.roundedRect(135, yPos, 30, 8, 2, 2, 'F');
        pdf.setTextColor(255, 255, 255);
        pdf.text('Go Home', 150, yPos + 5, { align: 'center' });
        
        // Save the PDF
        const testDate = new Date().toLocaleDateString();
        pdf.save(`PersonaQuest_Color_Test_Results_${testDate.replace(/\//g, '-')}.pdf`);
        
        // Success feedback
        const pdfButton = document.getElementById('save-pdf-button');
        const originalText = pdfButton.innerHTML;
        pdfButton.innerHTML = '<i class="fas fa-check"></i> PDF Saved!';
        pdfButton.style.background = 'linear-gradient(135deg, #28a745, #20c997)';
        
        setTimeout(() => {
            pdfButton.innerHTML = originalText;
            pdfButton.style.background = 'linear-gradient(135deg, #dc3545, #c82333)';
        }, 2000);
        
    } catch (error) {
        console.error('Error generating PDF:', error);
        alert('Sorry, there was an error generating the PDF. Please try again.');
    }
}

// Calculate and display results
function showResults() {
    // Sort colors by their scores in descending order
    const sortedColors = Object.entries(userScores)
        .sort(([,a], [,b]) => b - a);
    
    // Find top 3 dominant colors
    const [dominantColor, secondColor, thirdColor] = sortedColors.map(entry => entry[0]);
    
    // Store global references for PDF generation
    globalDominantColor = dominantColor;
    globalSecondColor = secondColor;
    globalThirdColor = thirdColor;
    
    // Get personality data for top colors
    const dominantPersonality = {
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
            ]
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
            ]
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
            ]
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
            ]
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
            ]
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
            ]
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
            ]
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
            ]
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
            ]
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
            ]
        }
    }[dominantColor];
    
    const secondPersonality = {
        black: {
            name: "BLACK",
            title: "The Independent & Mysterious",
            description: "Values privacy and personal space. Often an observer rather than a participant in social settings. Prefers deep intellectual conversations over small talk."
        },
        white: {
            name: "WHITE",
            title: "The Peaceful & Pure",
            description: "Seeks peace and harmony in all aspects of life. Avoids drama and dislikes conflict. Strong moral compass—values honesty and fairness."
        },
        red: {
            name: "RED",
            title: "The Passionate & Bold",
            description: "Thrives on challenges and competition. Highly ambitious—always aims to be the best. Has a strong personality and doesn't back down easily."
        },
        blue: {
            name: "BLUE",
            title: "The Loyal & Intelligent",
            description: "Prefers logic over emotions when making decisions. Very loyal and trustworthy—keeps promises. Avoids emotional drama and foolish risks."
        },
        yellow: {
            name: "YELLOW",
            title: "The Optimistic & Cheerful",
            description: "Always looks at the bright side of life. Highly social—loves making people laugh. Enjoys spontaneity and dislikes strict routines."
        },
        green: {
            name: "GREEN",
            title: "The Balanced & Practical",
            description: "Prefers stability over excitement. Careful decision-maker—avoids impulsive choices. Values hard work and consistency."
        },
        purple: {
            name: "PURPLE",
            title: "The Creative & Unique",
            description: "Highly imaginative and artistic. Thinks outside the box—loves creativity. Values emotional depth and intellectual conversations."
        },
        chocolate: {
            name: "CHOCOLATE",
            title: "The Grounded & Practical",
            description: "Extremely loyal and responsible. Prefers tradition and structure over unpredictability. Hardworking and puts family first."
        },
        pink: {
            name: "PINK",
            title: "The Kind & Loving",
            description: "Very nurturing and enjoys caring for others. Loves romance, beauty, and sentimental moments. Prefers harmony and dislikes arguments."
        },
        grey: {
            name: "GREY",
            title: "The Calm & Logical",
            description: "Prefers neutrality and avoids drama. Thinks logically and doesn't let emotions control decisions. Values privacy and independence."
        }
    }[secondColor];
    
    const thirdPersonality = {
        black: {
            name: "BLACK",
            title: "The Independent & Mysterious",
            description: "Values privacy and personal space. Often an observer rather than a participant in social settings. Prefers deep intellectual conversations over small talk."
        },
        white: {
            name: "WHITE",
            title: "The Peaceful & Pure",
            description: "Seeks peace and harmony in all aspects of life. Avoids drama and dislikes conflict. Strong moral compass—values honesty and fairness."
        },
        red: {
            name: "RED",
            title: "The Passionate & Bold",
            description: "Thrives on challenges and competition. Highly ambitious—always aims to be the best. Has a strong personality and doesn't back down easily."
        },
        blue: {
            name: "BLUE",
            title: "The Loyal & Intelligent",
            description: "Prefers logic over emotions when making decisions. Very loyal and trustworthy—keeps promises. Avoids emotional drama and foolish risks."
        },
        yellow: {
            name: "YELLOW",
            title: "The Optimistic & Cheerful",
            description: "Always looks at the bright side of life. Highly social—loves making people laugh. Enjoys spontaneity and dislikes strict routines."
        },
        green: {
            name: "GREEN",
            title: "The Balanced & Practical",
            description: "Prefers stability over excitement. Careful decision-maker—avoids impulsive choices. Values hard work and consistency."
        },
        purple: {
            name: "PURPLE",
            title: "The Creative & Unique",
            description: "Highly imaginative and artistic. Thinks outside the box—loves creativity. Values emotional depth and intellectual conversations."
        },
        chocolate: {
            name: "CHOCOLATE",
            title: "The Grounded & Practical",
            description: "Extremely loyal and responsible. Prefers tradition and structure over unpredictability. Hardworking and puts family first."
        },
        pink: {
            name: "PINK",
            title: "The Kind & Loving",
            description: "Very nurturing and enjoys caring for others. Loves romance, beauty, and sentimental moments. Prefers harmony and dislikes arguments."
        },
        grey: {
            name: "GREY",
            title: "The Calm & Logical",
            description: "Prefers neutrality and avoids drama. Thinks logically and doesn't let emotions control decisions. Values privacy and independence."
        }
    }[thirdColor];
    
    // Store global references for PDF generation
    globalDominantPersonality = dominantPersonality;
    globalSecondPersonality = secondPersonality;
    globalThirdPersonality = thirdPersonality;
    
    // Hide question container and show results with animation
    document.getElementById('question-container').style.display = 'none';
    document.getElementById('results-container').style.display = 'block';
    
    // Build the results HTML
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = `
        <h2 class="result-heading">Your Personality Colors:</h2>
        <div class="result-display">
            <h1 id="result-color" class="${colorClasses[dominantColor]}">${dominantPersonality.name}</h1>
            <h3 class="result-subtitle">${dominantPersonality.title} (Primary)</h3>
        </div>
        
        <div class="result-details">
            <div class="result-card fade-in" style="animation-delay: 0.2s">
                <h3><i class="fas fa-info-circle"></i> Description</h3>
                <p>${dominantPersonality.description}</p>
            </div>
            
            <div class="result-card fade-in" style="animation-delay: 0.4s">
                <h3><i class="fas fa-star"></i> Strengths</h3>
                <ul class="result-list">
                    ${dominantPersonality.strengths.map(strength => `<li>${strength}</li>`).join('')}
                </ul>
            </div>
            
            <div class="result-card fade-in" style="animation-delay: 0.6s">
                <h3><i class="fas fa-exclamation-circle"></i> Weaknesses</h3>
                <ul class="result-list">
                    ${dominantPersonality.weaknesses.map(weakness => `<li>${weakness}</li>`).join('')}
                </ul>
            </div>
            
            <div class="result-card fade-in" style="animation-delay: 0.8s">
                <h3><i class="fas fa-user-friends"></i> Best Friend Matches</h3>
                <div class="match-container">
                    ${dominantPersonality.friendMatch.map(color => `<span class="match-badge">${color}</span>`).join('')}
                </div>
            </div>
            
            <div class="result-card fade-in" style="animation-delay: 1s">
                <h3><i class="fas fa-heart"></i> Best Love Matches</h3>
                <div class="match-container">
                    ${dominantPersonality.loveMatch.map(color => `<span class="match-badge">${color}</span>`).join('')}
                </div>
            </div>
            
            <div class="result-card fade-in" style="animation-delay: 1.2s">
                <h3><i class="fas fa-briefcase"></i> Future Career Paths</h3>
                <div class="match-container">
                    ${dominantPersonality.futureCareer.map(career => `<span class="match-badge">${career}</span>`).join('')}
                </div>    
            </div>
            
            <div class="result-card fade-in" style="animation-delay: 1.4s">
                <h3><i class="fas fa-palette"></i> Secondary Personality Color</h3>
                <div class="result-display">
                    <h2 class="${colorClasses[secondColor]}">${secondPersonality.name}</h2>
                    <p>${secondPersonality.description}</p>
                </div>
            </div>
            
            <div class="result-card fade-in" style="animation-delay: 1.6s">
                <h3><i class="fas fa-palette"></i> Tertiary Personality Color</h3>
                <div class="result-display">
                    <h2 class="${colorClasses[thirdColor]}">${thirdPersonality.name}</h2>
                    <p>${thirdPersonality.description}</p>
                </div>
            </div>
        </div>
        
        <div class="result-actions fade-in" style="animation-delay: 1.8s">
            <button id="retake-button" class="button-primary"><i class="fas fa-redo"></i> Retake Test</button>
            <button id="save-pdf-button" class="button-primary"><i class="fas fa-file-pdf"></i> Save as PDF</button>
            <div id="logged-in-actions" style="display: none;">
                <button id="save-results-button" class="button-primary"><i class="fas fa-save"></i> Save to Profile</button>
                <button id="discard-results-button" class="button-secondary"><i class="fas fa-times"></i> Discard Results</button>
            </div>
            <a href="index.html" class="button-secondary"><i class="fas fa-home"></i> Go Home</a>
        </div>
    `;
    
    // Check if user is logged in
    const currentUser = window.utils.storage.get('currentUser');
    if (currentUser) {
        // Show logged-in actions
        document.getElementById('logged-in-actions').style.display = 'inline-block';
    }
    
    // Set up retake button
    document.getElementById('retake-button').addEventListener('click', initTest);
    
    // Set up save PDF button
    document.getElementById('save-pdf-button').addEventListener('click', generatePDF);
    
    // Set up save results button
    const saveButton = document.getElementById('save-results-button');
    if (saveButton) {
        saveButton.addEventListener('click', () => {
            saveResultsToProfile(dominantColor, secondColor, thirdColor, dominantPersonality, secondPersonality, thirdPersonality);
        });
    }
    
    // Set up discard results button
    const discardButton = document.getElementById('discard-results-button');
    if (discardButton) {
        discardButton.addEventListener('click', () => {
            if (confirm('Are you sure you want to discard these results? They will not be saved to your profile.')) {
                // Check if user is logged in
                const currentUser = window.utils.storage.get('currentUser');
                if (currentUser) {
                    window.location.href = 'profile.html';
                } else {
                    window.location.href = 'index.html';
                }
            }
        });
    }
    
    // Scroll to results smoothly
    document.getElementById('results-container').scrollIntoView({ behavior: 'smooth' });
}

// Function to save test results to user profile
function saveResultsToProfile(dominantColor, secondColor, thirdColor, dominantPersonality, secondPersonality, thirdPersonality) {
    // Get current user
    const currentUser = window.utils.storage.get('currentUser');
    
    if (!currentUser) {
        alert('You must be logged in to save your results. Please log in and take the test again.');
        window.location.href = 'login.html';
        return;
    }
    
    // Calculate percentages based on scores
    const totalScore = Object.values(userScores).reduce((sum, score) => sum + score, 0);
    const dominantScore = userScores[dominantColor];
    const secondScore = userScores[secondColor];
    const thirdScore = userScores[thirdColor];
    
    // Calculate percentages - scale them slightly to make them more dramatic
    const dominantPercentage = Math.round((dominantScore / totalScore) * 100 * 1.2);
    const secondPercentage = Math.round((secondScore / totalScore) * 100 * 0.9);
    const thirdPercentage = Math.round((thirdScore / totalScore) * 100 * 0.7);
    
    // Create color objects
    const colorData = [
        {
            name: dominantPersonality.name,
            color: getColorHexCode(dominantColor),
            title: dominantPersonality.title,
            percentage: dominantPercentage,
            description: dominantPersonality.description
        },
        {
            name: secondPersonality.name,
            color: getColorHexCode(secondColor),
            title: secondPersonality.title,
            percentage: secondPercentage,
            description: secondPersonality.description
        },
        {
            name: thirdPersonality.name,
            color: getColorHexCode(thirdColor),
            title: thirdPersonality.title,
            percentage: thirdPercentage,
            description: thirdPersonality.description
        }
    ];
    
    // Initialize personalityHistory if it doesn't exist
    if (!currentUser.personalityHistory) {
        currentUser.personalityHistory = [];
    }
    
    // Add new test to history
    currentUser.personalityHistory.unshift({
        date: new Date().toISOString(),
        colors: colorData
    });
    
    // Update user object
    currentUser.personality = colorData;
    currentUser.hasCompletedTest = true;
    
    // Save updated user back to storage
    window.utils.storage.set('currentUser', currentUser);
    
    // Also update in the users array
    const users = window.utils.storage.get('users') || [];
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
        users[userIndex].personality = colorData;
        users[userIndex].hasCompletedTest = true;
        
        // Also update personality history
        if (!users[userIndex].personalityHistory) {
            users[userIndex].personalityHistory = [];
        }
        
        users[userIndex].personalityHistory = currentUser.personalityHistory;
        
        window.utils.storage.set('users', users);
    }
    
    // Show confirmation and redirect to profile
    const saveButton = document.getElementById('save-results-button');
    saveButton.disabled = true;
    saveButton.innerHTML = '<i class="fas fa-check"></i> Saved!';
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = 'result-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            Results saved successfully! Redirecting to your profile...
        </div>
    `;
    
    document.querySelector('.result-actions').appendChild(notification);
    
    // Redirect to profile after short delay
    setTimeout(() => {
        window.location.href = 'profile.html';
    }, 2000);
}

// Helper function to get hex code for colors
function getColorHexCode(colorName) {
    const colorMap = {
        black: '#000000',
        white: '#FFFFFF',
        red: '#E53935',
        blue: '#1976D2',
        yellow: '#FDD835',
        green: '#43A047',
        purple: '#8E24AA',
        chocolate: '#795548',
        pink: '#EC407A',
        grey: '#757575'
    };
    
    return colorMap[colorName] || '#CCCCCC'; // Default gray if color not found
}

// Start the test when page loads
document.addEventListener('DOMContentLoaded', () => {
    // Add CSS for result notifications
    const style = document.createElement('style');
    style.textContent = `
        .result-notification {
            background-color: #e8f5e9;
            color: #2e7d32;
            border-radius: 8px;
            padding: 15px;
            margin-top: 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: fadeIn 0.5s ease;
        }
        
        .notification-content {
            display: flex;
            align-items: center;
            gap: 10px;
            font-weight: 600;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    initTest();
    
    // Add event listeners for navigation buttons
    document.getElementById('prev-button').addEventListener('click', moveToPreviousQuestion);
    document.getElementById('submit-button').addEventListener('click', submitTest);
    
    // Ensure utils is defined for storage access
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
                },
                clear: function() {
                    localStorage.clear();
                }
            }
        };
    }
    
    // Check if user is logged in
    const currentUser = window.utils.storage.get('currentUser');
    if (!currentUser) {
        // Create a login reminder
        const reminder = document.createElement('div');
        reminder.className = 'login-reminder';
        reminder.innerHTML = `
            <div class="reminder-content">
                <p><strong>Note:</strong> You'll need to be logged in to save your results. <a href="login.html">Log in here</a> before taking the test.</p>
            </div>
        `;
        
        // Insert at the top of test container
        const testContainer = document.querySelector('.test-container');
        testContainer.insertBefore(reminder, testContainer.firstChild);
    }
});