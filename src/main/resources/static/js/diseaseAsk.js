/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = "AIzaSyDjjJn_37Y6NuthLBX-VSXWQHqNpUFGYyw";
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});
const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
};
console.log("런 전 generationConfig: "+generationConfig.temperature);

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

console.log("런 전 safetySettings: "+safetySettings);

async function run(message) {
    // console.log("run: "+message)
    console.log("generationConfig: "+generationConfig);
    console.log("safetySettings: "+safetySettings);
    const chatSession = model.startChat({
        generationConfig,
        safetySettings,
        history: [
            {
                role: "user",
                parts: [
                    {text: "급성 부비동염"},
                ],
            },
            {
                role: "model",
                parts: [
                    {text: "## 급성 부비동염: 자세한 정보\n\n급성 부비동염은 부비동에 염증이 생겨 발생하는 질환입니다. 부비동은 코 주변 뼈에 있는 공기 주머니로, 코의 기능을 돕는 역할을 합니다. 급성 부비동염은 일반적으로 감기나 알레르기와 같은 다른 질병으로 인해 부비동이 막히면 발생합니다.\n\n**증상:**\n\n* 코막힘\n* 콧물 (녹색, 노란색, 끈적끈적한)\n* 얼굴 통증이나 압력 (특히 눈, 이마, 뺨, 이빨에)\n* 두통\n* 냄새 맡기 어려움\n* 발열\n* 피로감\n* 기침\n\n**원인:**\n\n* **바이러스 감염:** 대부분의 경우 급성 부비동염은 감기 바이러스에 의해 발생합니다.\n* **세균 감염:** 바이러스 감염 후 세균 감염이 발생할 수도 있습니다.\n* **알레르기:** 꽃가루, 먼지, 애완 동물의 비듬 등 알레르기 유발 물질은 부비동을 막아 급성 부비동염을 유발할 수 있습니다.\n* **코의 구조적 문제:** 코 중격 만곡증, 비용종과 같은 코의 구조적 문제는 부비동 배액을 방해하여 급성 부비동염을 유발할 수 있습니다.\n* **기타 원인:** 흡연, 공기 오염, 건조한 환경, 면역 체계 약화 등도 급성 부비동염을 유발할 수 있습니다.\n\n**주의 사항:**\n\n* 급성 부비동염은 일반적으로 10일에서 14일 이내에 호전됩니다.\n* 증상이 악화되거나 10일 이상 지속될 경우 의사의 진료를 받으세요.\n* 자가 치료는 위험할 수 있으므로 의사의 진료를 받는 것이 중요합니다.\n\n\n**본 정보는 일반적인 정보 제공을 목적으로 하며, 의학적 조언을 대신할 수 없습니다. 급성 부비동염에 대한 우려 사항은 의사와 상담하세요.**"},
                ],
            },
            {
                role: "user",
                parts: [
                    {text: "편두통"},
                ],
            },
            {
                role: "model",
                parts: [
                    {text: "## 편두통: 자세한 정보\n\n편두통은 두통 중 가장 흔한 유형 중 하나로, 보통 머리 한쪽에 심한 통증을 유발하는 질환입니다.  \n\n**증상:**\n\n* **통증:** 한쪽 머리에 심한 통증이 발생하며, 보통 4시간에서 72시간 지속됩니다. 통증은 맥박을 치는 것처럼 느껴지거나, 심하게 욱신거리거나, 찌르는 듯한 느낌을 받을 수 있습니다.\n* **오심 및 구토:** 편두통이 심하면 오심과 구토를 동반할 수 있습니다.\n* **빛과 소리에 대한 민감성:** 밝은 빛이나 큰 소리에 민감하게 반응하여 두통이 악화될 수 있습니다.\n* **시각 장애:** 빛 번쩍임, 시야 흐림, 시력 상실과 같은 시각 장애가 나타날 수 있습니다.\n* **기타 증상:** 목덜미 통증, 어지러움, 졸림, 집중력 저하 등이 동반될 수 있습니다.\n\n**원인:**\n\n편두통의 정확한 원인은 아직 밝혀지지 않았지만, 유전적 요인과 환경적 요인이 복합적으로 작용하는 것으로 알려져 있습니다.\n\n* **뇌 활동의 변화:** 편두통 발작 동안 뇌의 활동에 변화가 생기면서 통증이 발생하는 것으로 추측됩니다.\n* **신경 전달 물질의 불균형:** 세로토닌, 도파민 등 신경 전달 물질의 불균형이 편두통을 유발할 수 있습니다.\n* **혈관 수축과 확장:** 편두통 발작 시 뇌혈관이 수축되고 확장되는 과정에서 통증이 발생할 수 있습니다.\n* **유전적 요인:** 편두통은 가족력이 있는 경우 발생 위험이 높습니다.\n* **환경적 요인:** 스트레스, 수면 부족, 불규칙적인 식사, 카페인 섭취, 흡연, 알코올 섭취, 날씨 변화 등이 편두통을 유발하거나 악화시킬 수 있습니다.\n\n**주의 사항:**\n\n* 편두통은 심각한 질환이 아니지만, 삶의 질을 크게 떨어뜨릴 수 있습니다.\n* 통증이 심하거나 자주 발생하는 경우 의사의 진료를 받는 것이 중요합니다.\n* 편두통이 있는 경우, 밝은 빛과 큰 소리에 주의하고, 스트레스를 관리하며, 규칙적인 생활 습관을 유지하는 것이 도움이 됩니다.\n\n**본 정보는 일반적인 정보 제공을 목적으로 하며, 의학적 조언을 대신할 수 없습니다. 편두통에 대한 우려 사항은 의사와 상담하세요.**\n"},
                ],
            },
        ],
    });
    // console.log("try전:"+message)
    // const result = await chatSession.sendMessage(message);
    // console.log(result.response.text());
    try{
        console.log("try: "+message)
        const result = await chatSession.sendMessage(message);
        /*const result = await model.generateContent(message
            // ,{
            // history: [{ role: "user", chatSession }],
            // generationConfig,
            // safetySettings,
            // }
        );*/
        const response = await result.response;
        const text = await response.text();

        if(text) {
            console.log("ai Answer : " + text);
            //질병 정보 추출 및 HTML 업데이트 로직 추가
            // updateAnswer(text);
            return 200
        }
    }
    catch (error){
        console.error(`서버 에러가 발생했습니다: ${error}`);
    }
}
//const message ="편두통";
run("편두통");
// const message = process.argv[2];
// run("급성 부비동염");
async function sendInput() {
    const inputField = document.getElementById("chatInput");
    const message1 = inputField.value.trim();
    console.log("사용자 메시지: ", message1);
    inputField.value = "";
    // message = message1;
    //run();
}

/*const {     //js파일 내에서 ai 정상 연결
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = "AIzaSyDjjJn_37Y6NuthLBX-VSXWQHqNpUFGYyw";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
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

async function chat(message){
    try{
        const result = await model.generateContent(message);
        const response = await result.response;
        const text = await response.text();

        if(text) {
            console.log("ai Answer : "+text);
            //질병 정보 추출 및 HTML 업데이트 로직 추가
            updateAnswer(text);
            return 200
        }
    }
    catch (error){
        console.error(`서버 에러가 발생했습니다: ${error}`);
    }
}

function sendMessage() {
    const inputField = document.getElementById("chatInput");
    const message = inputField.value;
    console.log("User message: "+ message);
    inputField.value = "" //입력 필드 초기화

    chat(message);
}

function sendMessageOnEnter(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}
chat("안녕");*/

