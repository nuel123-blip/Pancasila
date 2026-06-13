// --- NAVIGASI SINGLE PAGE APPLICATION (SPA) ---
const navItems = document.querySelectorAll('.nav-item');
const sections = document.querySelectorAll('.content-section');

navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = item.getAttribute('data-target');
        switchTab(targetId);
        
        // Menutup menu mobile setelah klik jika dalam mode responsive
        document.querySelector('.nav-links').classList.remove('active');
    });
});

function switchTab(targetId) {
    // Ubah status aktif pada navigasi
    navItems.forEach(nav => {
        if(nav.getAttribute('data-target') === targetId) {
            nav.classList.add('active');
        } else {
            nav.classList.remove('active');
        }
    });

    // Tampilkan section yang dituju
    sections.forEach(section => {
        if (section.id === targetId) {
            section.classList.add('active');
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            section.classList.remove('active');
        }
    });
}

// TOGGLE MENU MOBILE
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});


// --- INTERAKTIF SUB-TABS (SIMULASI vs KUIS) ---
function switchInteractive(tabName) {
    const tabs = document.querySelectorAll('.int-tab-btn');
    const containers = document.querySelectorAll('.interactive-box');
    
    tabs.forEach((tab, index) => {
        if(tabName === 'simulasi' && index === 0 || tabName === 'kuis' && index === 1) {
            tab.classList.add('active');
            containers[index].classList.add('active');
        } else {
            tab.classList.remove('active');
            containers[index].classList.remove('active');
        }
    });
}


// --- FITUR: SIMULASI KOMENTAR TOXIC ---
function analisisKomentar() {
    const input = document.getElementById('commentInput').value.toLowerCase();
    const resultBox = document.getElementById('simulationResult');
    
    if(!input.trim()) {
        alert("Silakan ketikkan komentar terlebih dahulu untuk simulasi.");
        return;
    }

    // Database sederhana kata kunci sensitif/toxic Sila 1
    const kataKunciToxic = ['gimmick agama', 'kuno', 'dongeng', 'sesat', 'menyembah apa', 'pindah agama aja', 'lelucon ritual', 'candaan agama'];
    const kataKunciPositif = ['toleransi', 'menghargai', 'saling menghormati', 'damai', 'kebebasan beragama', 'etika'];

    let isToxic = false;
    let isPositive = false;

    kataKunciToxic.forEach(word => { if(input.includes(word)) isToxic = true; });
    kataKunciPositif.forEach(word => { if(input.includes(word)) isPositive = true; });

    resultBox.classList.remove('hidden');

    if (isToxic) {
        resultBox.className = "sim-result-box alert-danger";
        resultBox.innerHTML = `
            <h4><i class="fa-solid fa-ban"></i> Terdeteksi Potensi Pelanggaran Etika Digital</h4>
            <p>Komentar Anda terindikasi menyinggung sensitivitas keagamaan/SARA. Tindakan ini merusak esensi Sila ke-1 Pancasila dan dapat memicu konflik sosial digital serta berpotensi terkena UU ITE.</p>
        `;
    } else if (isPositive) {
        resultBox.className = "sim-result-box alert-success";
        resultBox.innerHTML = `
            <h4><i class="fa-solid fa-circle-check"></i> Komentar Sehat & Pancasilais!</h4>
            <p>Luar biasa! Komentar Anda mencerminkan kedewasaan berpikir, toleransi tinggi, dan empati. Anda membantu merawat kerukunan umat beragama di internet.</p>
        `;
    } else {
        resultBox.className = "sim-result-box alert-success";
        resultBox.innerHTML = `
            <h4><i class="fa-solid = fa-circle-info"></i> Komentar Netral</h4>
            <p>Komentar aman secara etika mendasar. Ingat untuk selalu menyebarkan vibrasi positif di kolom komentar manapun!</p>
        `;
    }
}


// --- FITUR: KUIS INTERAKTIF ---
const quizData = [
    {
        question: "Menemukan sebuah konten video yang menjadikan ritual ibadah agama lain sebagai lelucon komedi, tindakan bijak Anda adalah...",
        options: [
            "Ikut tertawa dan membagikannya ke grup WA karena dianggap lucu.",
            "Mengabaikannya saja karena tidak mau ambil pusing.",
            "Melaporkan akun/konten tersebut (Report) dan tidak memberi panggung di kolom komentar."
        ],
        answer: 2
    },
    {
        question: "Apakah arti kebebasan berekspresi di Indonesia yang berlandaskan Pancasila?",
        options: [
            "Bebas berekspresi tanpa batas dan aturan apapun karena itu hak asasi.",
            "Bebas berpendapat namun dibatasi oleh hak orang lain dan nilai-nilai etika luhur.",
            "Hanya boleh berbicara hal-hal yang disukai oleh penguasa."
        ],
        answer: 1
    }
];

let currentQuestionIndex = 0;
let score = 0;

function loadQuestion() {
    const qBox = document.getElementById('question-box');
    const oBox = document.getElementById('options-box');
    const nextBtn = document.getElementById('next-btn');
    
    nextBtn.classList.add('hidden');
    oBox.innerHTML = "";
    
    let currentQuiz = quizData[currentQuestionIndex];
    qBox.innerText = `${currentQuestionIndex + 1}. ${currentQuiz.question}`;
    
    currentQuiz.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.innerText = option;
        button.classList.add('option-btn');
        button.onclick = () => selectOption(button, index, currentQuiz.answer);
        oBox.appendChild(button);
    });
}

function selectOption(selectedBtn, optionIndex, correctIndex) {
    const allButtons = document.querySelectorAll('.option-btn');
    allButtons.forEach(btn => btn.disabled = true); // matikan tombol lain
    
    if (optionIndex === correctIndex) {
        selectedBtn.classList.add('correct');
        score++;
    } else {
        selectedBtn.classList.add('wrong');
        allButtons[correctIndex].classList.add('correct'); // tunjukkan yang benar
    }
    
    document.getElementById('next-btn').classList.remove('hidden');
}

function nextQuestion() {
    currentQuestionIndex++;
    if(currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        showQuizResult();
    }
}

function showQuizResult() {
    document.getElementById('quiz-wrapper').classList.add('hidden');
    const qResult = document.getElementById('quiz-result');
    qResult.classList.remove('hidden');
    qResult.innerHTML = `
        <h4>Kuis Selesai!</h4>
        <p>Skor Anda: <strong>${score} / ${quizData.length}</strong></p>
        <p>${score === quizData.length ? 'Luar biasa! Anda memahami dengan baik etika Pancasila di dunia siber.' : 'Mari tingkatkan lagi kesadaran moral kebangsaan kita.'}</p>
        <button class="btn btn-secondary" onclick="resetQuiz()">Ulangi Kuis</button>
    `;
}

function resetQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById('quiz-wrapper').classList.remove('hidden');
    document.getElementById('quiz-result').classList.add('hidden');
    loadQuestion();
}

// Inisialisasi Kuis saat web dimuat
loadQuestion();


// --- CLAIM BADGE (KESIMPULAN) ---
function claimBadge() {
    document.getElementById('badgeStatus').classList.remove('hidden');
}