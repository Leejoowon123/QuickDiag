// node --version # Should be >= 18
// npm install @google/generative-ai

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");

const MODEL_NAME = "gemini-1.0-pro-001";
const API_KEY = "Personal API key"; //개인 API 사용필요.

async function runChat(userInput) {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: MODEL_NAME });

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
        {text: "input: 환자 상태 고려 질병 가능성 (병명만 요약)\n" +
                "가능성 순위:\n" +
                "\n" +
                "1. 외이의 기타 장애\n" +
                "2. 고막의 기타 장애\n" +
                "3. 달리 분류된 질환에서의 외이의 장애\n" +
                "4. 기타 만성 폐쇄성 폐질환\n" +
                "5. 폐기종\n" +
                "1순위 질병은 어느 과를 가야할까?"},
        {text: "output: 이비인후과\n"},
        {text: "input: 환자 상태 고려 질병 가능성 (병명만 요약)\n" +
                "가능성 순위:\n" +
                "\n" +
                "1. 급성 비인두염[감기]\n" +
                "2. 비염\n" +
                "3. 급성 부비동염\n" +
                "4. 귀통증 및 귀의 삼출액\n" +
                "5. 식도염\n" +
                "1순위 질병은 어느 과를 가야할까?"},
        {text: "output: 내과"},
        {text: `input: ${userInput}`},
        {text: "output: "},
    ];

    const result = await model.generateContent({
        contents: [{ role: "user", parts }],
        generationConfig,
        safetySettings,
    });
    const response = result.response;
    console.log(response.text());
}
const userInput = process.argv[2];
runChat(userInput);
