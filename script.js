// ============================================
// 특별한 편지 - 완전히 새로 작성한 script.js
// 중복 없음, 꼬임 없음
// ============================================

console.log('🚀 스크립트 로드됨');

// DOM 요소
const secretStage = document.getElementById('secret-stage');
const mailboxStage = document.getElementById('mailbox-stage');
const letterStage = document.getElementById('letter-stage');
const openedStage = document.getElementById('opened-stage');

const secretBtn = document.getElementById('secret-btn');
const mailboxBtn = document.getElementById('mailbox-btn');
const envelope = document.getElementById('envelope');

// 현재 단계
let currentStage = 'secret';

// ============================================
// 1. 비밀 단계 -> 우편함 단계
// ============================================
secretBtn.addEventListener('click', () => {
    console.log('🔘 비밀 버튼 클릭');
    
    // Step 1: 우편함을 먼저 뒤에 준비
    secretStage.style.zIndex = '2';
    mailboxStage.style.zIndex = '1';
    mailboxStage.classList.add('active');
    console.log('📬 우편함 준비 (뒤에)');
    
    // Step 2: 비밀 단계 전체를 서서히 페이드아웃
    setTimeout(() => {
        secretStage.classList.add('opening');
        console.log('🌫️ 비밀 단계 페이드아웃 시작');
    }, 100);
    
    // Step 3: 페이드아웃 완료 후 비밀 단계 제거 (1.4초 후)
    setTimeout(() => {
        secretStage.classList.remove('active', 'opening');
        secretStage.style.zIndex = '';
        mailboxStage.style.zIndex = '';
        currentStage = 'mailbox';
        console.log('✅ 우편함 단계로 전환 완료');
    }, 1400);
});

// ============================================
// 2. 우편함 단계 -> 편지 단계
// ============================================
mailboxBtn.addEventListener('click', () => {
    console.log('📬 우편함 클릭');
    
    // 우편함 열기 애니메이션
    mailboxBtn.classList.add('opening');
    
    // 1.2초 후 다음 단계로
    setTimeout(() => {
        mailboxStage.classList.remove('active');
        console.log('📭 우편함 페이드아웃');
        
        // 0.8초 후 편지 등장
        setTimeout(() => {
            letterStage.classList.add('active');
            currentStage = 'letter';
            console.log('✅ 편지 단계로 전환 완료');
        }, 800);
    }, 1200);
});

// ============================================
// 3. 편지 스와이프로 열기
// ============================================
let startY = 0;
let isDragging = false;

envelope.addEventListener('mousedown', (e) => {
    isDragging = true;
    startY = e.clientY;
});

envelope.addEventListener('touchstart', (e) => {
    isDragging = true;
    startY = e.touches[0].clientY;
}, {passive: true});

document.addEventListener('mouseup', (e) => {
    if (!isDragging) return;
    
    const endY = e.clientY;
    const distance = startY - endY;
    
    console.log('🏁 스와이프 거리:', distance);
    
    if (distance > 100) {
        openEnvelope();
    }
    
    isDragging = false;
});

envelope.addEventListener('touchend', (e) => {
    if (!isDragging) return;
    
    const endY = e.changedTouches[0].clientY;
    const distance = startY - endY;
    
    console.log('🏁 스와이프 거리:', distance);
    
    if (distance > 100) {
        openEnvelope();
    }
    
    isDragging = false;
});

function openEnvelope() {
    console.log('💌 편지 열기!');
    
    // 봉투 열기
    envelope.classList.add('opening');
    
    // 0.6초 후 다음 단계로
    setTimeout(() => {
        letterStage.classList.remove('active');
        console.log('📪 편지봉투 페이드아웃');
        
        // 0.8초 후 열린 편지 등장
        setTimeout(() => {
            openedStage.classList.add('active');
            currentStage = 'opened';
            console.log('✅ 열린 편지 단계로 전환 완료');
        }, 800);
    }, 600);
}

console.log('✅ 스크립트 초기화 완료');