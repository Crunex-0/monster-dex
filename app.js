const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbyhkhLmQ8DqD489j28gtILot5DL8mJulojNRnpE6ZPKbuRtB1tfz_pSQKjHNjx36Aj7/exec";

// 1. 페이지가 열리면 저장된 몬스터 불러오기
window.onload = function() {
    fetch(SCRIPT_URL)
        .then(response => response.json())
        .then(data => {
            const list = document.getElementById('monster-list');
            list.innerHTML = ""; // 로딩 문구 삭제
            data.forEach(monster => {
                const card = `<div class="monster-card">
                    <h3>${monster.name}</h3>
                    <p><b>속성:</b> ${monster.type}</p>
                    <p>${monster.desc}</p>
                </div>`;
                list.innerHTML += card;
            });
        });
};

// 2. 버튼 누르면 구글 시트로 전송하기
function addMonster() {
    const name = document.getElementById('monster-name').value;
    const type = document.getElementById('monster-type').value;
    const desc = document.getElementById('monster-desc').value;

    if(!name || !type) return alert("이름과 속성을 입력해주세요!");

    fetch(SCRIPT_URL, {
        method: 'POST',
        body: JSON.stringify({ name, type, desc })
    })
    .then(() => {
        alert("등록 완료!");
        location.reload(); // 새로고침해서 목록 업데이트
    });
}