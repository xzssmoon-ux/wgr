let currentPage = 1;

const userAnswers = {
    q1: "", q2: "", q3: "", q4: "", q5: ""
};

// Смена фона всего сайта
const pageColors = [
    '#ffe6e6', // 1
    '#ffebf0', // 2
    '#1a1a1a', // 3
    '#e53935', // 4
    '#d1c4e9', // 5
    '#b2ebf2', // 6
    '#ffcc80', // 7
    '#a5d6a7', // 8
    '#f48fb1', // 9
    '#81d4fa', // 10
    '#ffab91', // 11
    '#c8e6c9', // 12
    '#ffffff'  // 13
];

function nextPage(pageNum) {
    document.getElementById('page' + currentPage).classList.remove('active');
    currentPage = pageNum;
    document.getElementById('page' + currentPage).classList.add('active');
    document.body.style.backgroundColor = pageColors[currentPage - 1];
}

// Сердечки
function createHearts() {
    const container = document.getElementById('hearts-container');
    const heart = document.createElement('div');
    heart.classList.add('floating-heart');
    const icons = ['❤️', '💖', '💕', '💗', '💓'];
    heart.innerHTML = icons[Math.floor(Math.random() * icons.length)];
    heart.style.left = Math.random() * 100 + 'vw';
    heart.style.animationDuration = Math.random() * 3 + 3 + 's';
    heart.style.fontSize = Math.random() * 20 + 10 + 'px';
    container.appendChild(heart);
    setTimeout(() => { heart.remove(); }, 6000);
}
setInterval(createHearts, 300);

// --- ЛОГИКА ВОПРОСОВ ---

function handleQ1(answer) {
    userAnswers.q1 = answer;
    const ans1Text = document.getElementById('ans1-text');
    const q2Block = document.getElementById('q2-block');
    
    if (answer === 'Да, я красотка') {
        ans1Text.innerHTML = "Конечно так, это же очевидно! 😉❤️";
    } else if (answer === 'Я няшная') {
        ans1Text.innerHTML = "Да, ты очень няшная и милая! 🥰❤️";
    } else if (answer === 'Нет') {
        ans1Text.innerHTML = "Неправда! Вообще-то ты очень красивая и милая! 😘❤️";
    }
    
    ans1Text.classList.add('show');
    nextPage(8);
    
    setTimeout(() => {
        q2Block.style.display = "block";
        q2Block.classList.add('show');
    }, 3000);
}

function submitTextAns() {
    const text = document.getElementById('whoAmI').value;
    if (text.trim() === "") { alert("Напиши хоть что-нибудь 🙈"); return; }
    userAnswers.q2 = text;
    nextPage(9);
}

function handleQ3(isYes) {
    userAnswers.q3 = isYes ? "Да" : "Нет";
    const trustText = document.getElementById('trust-text');
    const q4Block = document.getElementById('q4-block');
    
    // Убрали "Эх... ну ладно 😔"
    trustText.innerHTML = isYes ? "Спасибо, солнышко! ❤️" : ""; 
    if(isYes) trustText.classList.add('show');
    
    nextPage(10);
    
    setTimeout(() => {
        q4Block.style.display = "block";
        q4Block.classList.add('show');
    }, 3000);
}

function handleQ4(isYes) {
    const q4Block = document.getElementById('q4-block');
    const q4RepeatBlock = document.getElementById('q4-repeat-block');
    
    if (isYes) {
        q4Block.style.display = "none";
        q4RepeatBlock.style.display = "block";
    } else {
        userAnswers.q4 = "Нет";
        nextPage(11);
    }
}

function handleQ4Final(answer) {
    userAnswers.q4 = answer;
    nextPage(11);
}

function submitOpinion() {
    const text = document.getElementById('myOpinion').value;
    if (text.trim() === "") { alert("Напиши хоть что-нибудь 🙈"); return; }
    userAnswers.q5 = text;
    nextPage(12);
}

// --- АДМИН ПАНЕЛЬ ---

function openAdmin() {
    document.getElementById('admin-modal').style.display = 'flex';
    // Скрываем поля ввода, показываем, если пароль верный
    document.getElementById('admin-auth').style.display = 'block';
    document.getElementById('admin-content').style.display = 'none';
    document.getElementById('admin-pass').value = '';
}

function closeAdmin() {
    document.getElementById('admin-modal').style.display = 'none';
}

function checkPass() {
    const pass = document.getElementById('admin-pass').value;
    if (pass === '1110') {
        document.getElementById('admin-auth').style.display = 'none';
        document.getElementById('admin-content').style.display = 'block';
        
        // Формируем отчет
        const dataText = `
1. Ты красивая?
Ответ: ${userAnswers.q1 || "— не отвечено —"}

2. Кто я для тебя?
Ответ: ${userAnswers.q2 || "— не отвечено —"}

3. Ты мне доверяешь?
Ответ: ${userAnswers.q3 || "— не отвечено —"}

4. Ты меня любишь?
Ответ: ${userAnswers.q4 || "— не отвечено —"}

5. Какое мнение обо мне?
Ответ: ${userAnswers.q5 || "— не отвечено —"}
        `;
        
        document.getElementById('admin-data').innerText = dataText.trim();
    } else {
        alert("Неверный пароль!");
    }
}
