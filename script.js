// Respuestas correctas oficiales de Fundamentos de Java
const correctAnswers = {
    q1: 'B', q2: 'A', q3: 'B', q4: 'B', q5: 'C',
    q6: 'B', q7: 'B', q8: 'B', q9: 'A', q10: 'C'
};

// Cambiar de pestañas manteniendo el estilo azul
function switchTab(tabName) {
    const quizBtn = document.getElementById('nav-quiz');
    const shareBtn = document.getElementById('nav-share');
    const quizPanel = document.getElementById('panel-quiz');
    const sharePanel = document.getElementById('panel-share');

    if (tabName === 'quiz') {
        quizBtn.className = 'nav-btn btn-active';
        shareBtn.className = 'nav-btn btn-inactive';
        quizPanel.className = 'section-panel active';
        sharePanel.className = 'section-panel';
    } else {
        quizBtn.className = 'nav-btn btn-inactive';
        shareBtn.className = 'nav-btn btn-active';
        quizPanel.className = 'section-panel';
        sharePanel.className = 'section-panel active';
    }
}

// Evaluar cuestionario e incrustar la tarjeta de resultados integrada
function evaluateQuiz(event) {
    event.preventDefault();
    const form = document.getElementById('quiz-form');
    const formData = new FormData(form);
    let score = 0;
    const totalQuestions = Object.keys(correctAnswers).length;

    for (let key in correctAnswers) {
        if (formData.get(key) === correctAnswers[key]) {
            score++;
        }
    }

    // Ocultar el formulario de preguntas
    form.style.display = 'none';

    // Mostrar contenedor de resultados
    const resultCard = document.getElementById('quiz-result');
    const scoreText = document.getElementById('score-text');
    const scoreFeedback = document.getElementById('score-feedback');
    const circleScore = document.querySelector('.circle-score');

    resultCard.style.display = 'flex';
    scoreText.textContent = `${score}/${totalQuestions}`;

    // Configuración dinámica según el puntaje
    if (score === totalQuestions) {
        scoreFeedback.textContent = '¡Dominas los fundamentos de Java!';
        circleScore.style.backgroundColor = '#52a96c'; 
    } else if (score >= 7) {
        scoreFeedback.textContent = '¡Buen trabajo! Tienes bases sólidas.';
        circleScore.style.backgroundColor = '#52a96c';
    } else {
        scoreFeedback.textContent = 'Sigue practicando para dominar el lenguaje.';
        circleScore.style.backgroundColor = '#d9534f'; // Rojo amigable si es menor
    }

    resultCard.scrollIntoView({ behavior: 'smooth' });
}

// Reiniciar cuestionario completamente
function resetQuiz() {
    const form = document.getElementById('quiz-form');
    const resultCard = document.getElementById('quiz-result');
    
    form.reset();
    resultCard.style.display = 'none';
    form.style.display = 'block';
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Manejar el envío de la sección Comparte tu proyecto
function submitProject(event) {
    event.preventDefault(); // Evita que la página se recargue al enviar
    
    const enlace = document.getElementById('enlace').value.trim();
    let warning = document.getElementById('share-warning');
    
    if (enlace && !enlace.startsWith('http')) {
        if (!warning) {
            warning = document.createElement('p');
            warning.id = 'share-warning';
            warning.style.cssText = 'color:#721c24;background:#f8d7da;padding:0.6rem 1rem;border-radius:8px;text-align:center;margin-bottom:1rem;font-weight:600;';
            document.querySelector('.btn-send').before(warning);
        }
        warning.textContent = 'Por favor ingresa un enlace válido (debe empezar con http:// o https://)';
        return;
    }
    
    if (warning) {
        warning.remove();
    }
    
    document.getElementById('share-form').style.display = 'none';
    document.getElementById('share-success').style.display = 'block';
}

