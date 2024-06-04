import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyDjjJn_37Y6NuthLBX-VSXWQHqNpUFGYyw";
const genAI = new GoogleGenerativeAI(apiKey);
async function chat(prompt){
    try{
        const model = genAI.getGenerativeModel({model: 'gemini-1.5-flash'});
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = await response.text();

        if (text) {
            console.log(text);
            var template = '<div class="line"><span class="chat-box">' + text +'</span></div>';

            document.querySelector('.chatbot-body').insertAdjacentHTML('beforeend',template);
            return 200
        }

    }

    catch (error){
        console.error(`서버 에러가 발생했습니다: ${error}`);
    }
}
const diseaseLinks = document.querySelectorAll('.form__input a');
for (const link of diseaseLinks) {
    console.log("질병명 클릭 이벤트 for문");
    link.addEventListener('click', (event) => {
        event.preventDefault(); // 기본 링크 동작 방지
        const diseaseName = link.textContent;
        sendDiseaseName(diseaseName);
    });
    console.log("질병명 클릭 이벤트 for문 완료");

}
document.querySelector('#send').addEventListener('click', function(){
    var template = '<div class="line"><span class="chat-box mine">' + document.querySelector("input").value +'</span></div>';

    document.querySelector('.chatbot-body').insertAdjacentHTML('beforeend',template);

    chat(document.querySelector('input').value).then(result => {
        var template = '<div class="line"><span class="chat-box">' + text +'</span></div>';

        document.querySelector('.chatbot-body').insertAdjacentHTML('beforeend',template);
    });

});

function sendDiseaseName(diseaseName){
    var template = '<div class="line"><span class="chat-box mine">' + diseaseName +'</span></div>';
    document.querySelector('.chatbot-body').insertAdjacentHTML('beforeend',template);
    chat(diseaseName).then(result => {
        var template = '<div class="line"><span class="chat-box">' + text +'</span></div>';

        document.querySelector('.chatbot-body').insertAdjacentHTML('beforeend',template);
    });

}