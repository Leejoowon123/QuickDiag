import {GoogleGenerativeAI, HarmBlockThreshold, HarmCategory} from "@google/generative-ai";

const apiKey = "AIzaSyDjjJn_37Y6NuthLBX-VSXWQHqNpUFGYyw";
const genAI = new GoogleGenerativeAI(apiKey);

async function chat(prompt) {
    const generationConfig = {
        temperature: 0,
        topK: 1,
        topP: 1,
        maxOutputTokens: 2048,
    };

    const safetySettings = [
        {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
            category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
            threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
    ];
    const parts = [
        {text: "input: 급성 부비동염"},
        {text: "output: ## 급성 부비동염: 증상, 원인, 치료 및 예방\n" +
                "\n" +
                "급성 부비동염은 코 주변의 빈 공간인 부비동에 염증이 생겨 발생하는 질환입니다. 일반적으로 바이러스 감염으로 인해 발생하지만, 세균 감염이나 알레르기로 인해 발생하기도 합니다. \n" +
                "\n" +
                "증상:\n" +
                "\n" +
                "1. 콧물 (끈적끈적하고 노란색 또는 녹색일 수 있음)\n" +
                "2. 코막힘\n" +
                "3. 얼굴 통증이나 압박감 (특히 이마, 뺨, 눈 주변)\n" +
                "4. 두통\n" +
                "5. 발열\n" +
                "6. 기침\n" +
                "7. 후각 상실\n" +
                "8. 피로감\n" +
                "9. 구취\n" +
                "\n" +
                "원인:\n" +
                "\n" +
                "1. 바이러스 감염: 감기나 독감 바이러스는 가장 흔한 원인입니다.\n" +
                "2. 세균 감염: 바이러스 감염 후 세균 감염이 발생할 수 있습니다.\n" +
                "3. 알레르기: 꽃가루, 먼지, 애완동물의 비듬 등 알레르기 유발 물질에 대한 반응으로 부비동이 붓고 염증이 발생할 수 있습니다.\n" +
                "4. 코 폴립: 코 안쪽에 혹처럼 자란 폴립이 부비동의 배수를 방해할 수 있습니다.\n" +
                "5. 코 구조의 이상: 코 구조의 이상으로 인해 부비동의 배수가 잘 되지 않을 수 있습니다.\n" +
                "\n" +
                "주의 사항:\n" +
                "\n" +
                "1. 급성 부비동염은 대부분의 경우 1~2주 안에 치료됩니다.\n" +
                "2. 증상이 10일 이상 지속되거나 악화되는 경우 의사의 진찰을 받아야 합니다.\n" +
                "3. 자가 진단은 위험할 수 있으므로, 증상이 나타나면 의사와 상담하여 정확한 진단과 치료를 받는 것이 중요합니다."},
        {text: "input: 편두통"},
        {text: "output: ## 편두통: 잦은 고통, 이제는 안녕\n" +
                "\n" +
                "편두통은 두통 중 가장 흔한 유형 중 하나로, 심한 통증과 함께 여러 증상을 동반하며 삶의 질을 크게 저하시키는 질환입니다. \n" +
                "\n" +
                "편두통의 주요 증상:\n" +
                "\n" +
                "1. 심한 두통: 보통 한쪽 머리에 발생하며, 욱신거리거나  throbbing하는 듯한 통증을 느낍니다.\n" +
                "2. 구역질 및 구토: 두통과 함께 나타날 수 있으며, 심할 경우 극심한 불쾌감을 유발합니다.\n" +
                "3. 빛과 소리에 대한 민감성: 밝은 빛이나 큰 소리에 극도로 민감해지고 불편함을 느낍니다.\n" +
                "4. 시력 장애: 눈앞에 번쩍이는 빛이나 깜빡이는 점, 시야가 흐릿해지는 등의 시력 장애가 나타날 수 있습니다.\n" +
                "5. 감각 이상: 얼굴, 팔, 다리 등에 저림이나 마비 증상이 나타날 수 있습니다.\n" +
                "6. 피로감: 두통이 발생하기 전이나 후에 심한 피로감을 느낄 수 있습니다.\n" +
                "\n" +
                "편두통의 원인:\n" +
                "\n" +
                "1. 유전적 요인: 가족력이 있는 경우 편두통 발병 가능성이 높습니다.\n" +
                "2. 호르몬 변화: 여성의 경우 생리 주기, 임신, 폐경 등 호르몬 변화에 따라 편두통이 발생할 수 있습니다.\n" +
                "3. 스트레스: 스트레스는 편두통을 유발하거나 악화시킬 수 있습니다.\n" +
                "4. 수면 부족: 불규칙적인 수면 패턴이나 수면 부족은 편두통의 위험 요소가 될 수 있습니다.\n" +
                "5. 음식: 특정 음식, 술, 카페인 등은 편두통을 유발할 수 있습니다.\n" +
                "6. 환경적 요인: 빛, 소리, 냄새 등에 민감하게 반응하여 편두통이 발생할 수 있습니다.\n" +
                "\n" +
                "주의 사항:\n" +
                "\n" +
                "1. 편두통 증상이 심하거나 자주 발생하는 경우 의사와 상담하여 정확한 진단과 치료를 받는 것이 중요합니다.\n" +
                "2. 편두통은 다른 질환의 증상일 수도 있으므로, 의사의 진찰을 통해 다른 질환과 감별 진단을 받아야 합니다.\n" +
                "\n" +
                "자세한 정보는 의료 전문가와 상담하여 확인하시기 바랍니다."},
        {text: `input: ${prompt}`},
        {text: "output: "}
    ];
    try {
        const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
        const result = await model.generateContentStream({
            contents: [{ role: "user", parts }],
            generationConfig,
            safetySettings,
        });

        // 새로운 답변을 표시할 span 태그를 생성합니다.
        const responseSpan = document.createElement('span');
        responseSpan.classList.add('chat-box');
        const lineDiv = document.createElement('div');
        lineDiv.classList.add('line');
        lineDiv.appendChild(responseSpan);
        document.querySelector('.chatbot-body').insertAdjacentElement('beforeend', lineDiv);

        // 스트림 데이터를 받아올 때마다 span 태그의 내용을 갱신합니다.
        for await (const chunk of result.stream) {
            let chunkText = chunk.text();

            // '**' 사이의 텍스트를 <strong> 태그로 변환
            chunkText = chunkText.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

            // <br> 태그를 줄바꿈으로 변환
            chunkText = chunkText.replace(/\n/g, '<br>');

            // 변환된 HTML을 responseSpan에 추가
            responseSpan.innerHTML += chunkText;
        }

    } catch (error) {
        console.error(`서버 에러가 발생했습니다: ${error}`);
    }

}

const diseaseLinks = document.querySelectorAll('.form__input a');
for (const link of diseaseLinks) {
    link.addEventListener('click', (event) => {
        event.preventDefault(); // 기본 링크 동작 방지
        const diseaseName = link.textContent;
        sendDiseaseName(diseaseName);
    });
}
// '전송' 버튼 클릭 이벤트
document.querySelector('#send').addEventListener('click', function () {
    sendMessage();
});

// 입력 필드에서 엔터 키 이벤트
document.querySelector("#chatInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // 엔터 키 기본 동작(폼 제출 등) 방지
        sendMessage();
    }
});

function sendMessage() {
    const inputElement = document.querySelector("#chatInput");
    const input = inputElement.value;
    if (input.trim() !== "") { // 입력값이 비어있지 않는 경우에만 처리
        const template = '<div class="line"><span class="chat-box mine">' + input + '</span></div>';
        document.querySelector('.chatbot-body').insertAdjacentHTML('beforeend', template);
        chat(input); // chat 함수가 메시지를 처리하는 부분
        inputElement.value = ''; // 입력 필드 초기화
    }
}

function sendDiseaseName(diseaseName) {
    const template = '<div class="line"><span class="chat-box mine">' + diseaseName + '</span></div>';
    document.querySelector('.chatbot-body').insertAdjacentHTML('beforeend', template);
    chat(diseaseName);
}

document.addEventListener('DOMContentLoaded', function() {
    const chatbotToggle = document.getElementById('chatbotToggle');
    const chatbotBody = document.getElementById('chatbotBody');

    chatbotToggle.addEventListener('click', function() {
        if (chatbotBody.classList.contains('hidden')) {
            chatbotBody.classList.remove('hidden'); // 챗봇 본문 보이기
            chatbotToggle.textContent = '챗봇 닫기'; // 버튼 텍스트 변경
        } else {
            chatbotBody.classList.add('hidden'); // 챗봇 본문 숨기기
            chatbotToggle.textContent = '챗봇 열기'; // 버튼 텍스트 변경
        }
    });
});
