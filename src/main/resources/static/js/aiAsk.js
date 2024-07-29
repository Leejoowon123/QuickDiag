// node --version # Should be >= 18
// npm install @google/generative-ai

const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");

const MODEL_NAME = "gemini-1.0-pro-001";
const API_KEY = "personal API key"; //개인 API 사용필요.

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
        {text: "input: [\"상세불명 부위의 바이러스감염\",\"녹내장\",\"기타 두통증후군\",\"급성 부비동염\",\"편두통\"]\n" +
                "해당 질병들 중에서 환자의 상태가 가족력에 \"뇌졸중\"이 있고 궐련형 담배의 경우 일 1~2개피, 궐련형전자담배의 경우 일 1~2개피, 음주습관은 일 1~2병, 운동은 주 3회 이상 이라 할때 어느 질병의 확률이 가장 높은지 다른 설명 없이 병명만 보여줘"},
        {text: "output: 환자 상태 고려 질병 가능성 (병명만 요약)\n" +
                "가능성 순위:\n" +
                "\n" +
                "1. 편두통\n" +
                "2. 급성 부비동염\n" +
                "3. 기타 두통증후군\n" +
                "4. 녹내장\n" +
                "5. 상세불명 부위의 바이러스 감염"},
        {text: "input: [\"외이의 기타 장애\",\"외이염\",\"고막의 기타 장애\",\"달리 분류된 질환에서의 외이의 장애\",\"귀인두관의 기타 장애\"]\n" +
                "해당 질병들 중에서 환자의 상태가 가족력에 \"뇌졸중\"이 있고 궐련형 담배의 경우 일 1~2개피, 궐련형전자담배의 경우 일 1~2개피, 음주습관은 일 1~2병, 운동은 주 3회 이상 이라 할때 어느 질병의 확률이 가장 높은지 다른 설명 없이 병명만 보여줘"},
        {text: "output: 환자 상태 고려 질병 가능성 (병명만 요약)\n" +
                "가능성 순위:\n" +
                "\n" +
                "1. 외이염\n" +
                "2. 귀인두관의 기타 장애\n" +
                "3. 고막의 기타 장애\n" +
                "4. 외이의 기타 장애\n" +
                "5. 달리 분류된 질환에서의 외이의 장애"},
        {text: "input: [\"비염\",\"급성 비인두염[감기]\",\"급성 부비동염\",\"귀통증 및 귀의 삼출액\",\"식도염\"]\n" +
                "해당 질병들 중에서 환자의 상태가 가족력에 \"고혈압\"이 있고 궐련형 담배의 경우 일 0개피, 궐련형전자담배의 경우 일 0개피, 음주습관은 일 1~2병, 운동은 주 3회 이상 이라 할때 어느 질병의 확률이 가장 높은지 다른 설명 없이 병명만 보여줘"},
        {text: "output: 환자 상태 고려 질병 가능성 (병명만 요약)\n" +
                "가능성 순위:\n" +
                "\n" +
                "1. 급성 비인두염[감기]\n" +
                "2. 비염\n" +
                "3. 급성 부비동염\n" +
                "4. 귀통증 및 귀의 삼출액\n" +
                "5. 식도염"},
        {text: "input: [\"외이의 기타 장애\",\"고막의 기타 장애\",\"달리 분류된 질환에서의 외이의 장애\",\"귀인두관의 기타 장애\",\"귀통증 및 귀의 삼출액\"]" +
                "해당 질병들 중에서 환자의 상태가 가족력에 \"고혈압\"이 있고 궐련형 담배의 경우 일 0개피, 궐련형전자담배의 경우 일 0개피, 음주습관은 일 1~2병, 운동은 주 3회 이상 이라 할때 어느 질병의 확률이 가장 높은지 다른 설명 없이 병명만 보여줘"},
        {text: "output: 환자 상태 고려 질병 가능성 (병명만 요약)\n" +
                "가능성 순위:\n" +
                "\n" +
                "1. 귀통증 및 귀의 삼출액\n" +
                "2. 귀인두관의 기타 장애\n" +
                "3. 고막의 기타 장애\n" +
                "4. 외이의 기타 장애\n" +
                "5. 달리 분류된 질환에서의 외이의 장애\n"},
        {text: `input: ${userInput}`},
        {text: "output: "}
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
