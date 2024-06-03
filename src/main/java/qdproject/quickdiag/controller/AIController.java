package qdproject.quickdiag.controller;


import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import qdproject.quickdiag.dto.DataDTO;
import qdproject.quickdiag.dto.UserDTO;
import qdproject.quickdiag.service.*;

import org.springframework.web.servlet.mvc.support.RedirectAttributes;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletResponse;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;


@Controller
@RequiredArgsConstructor
public class AIController {

    @Autowired
    private ChatService chatService;
    @Autowired
    private ChatService2 chatService2;
    private final UserService userService;
    private final DataService dataService;
    private final DiseaseService diseaseService;

    @PostMapping("/diag/askAI") //RequestParam 등 추가, Gemini input을 위한 전처리 기능 구현 _liftyun
    public String generateHealthInformation(@RequestParam(value = "head[]", required = false) String[] headArray,
                                            @RequestParam(value = "eye[]", required = false) String[] eyeArray,
                                            @RequestParam(value = "nose[]", required = false) String[] noseArray,
                                            @RequestParam(value = "mouse[]", required = false) String[] mouseArray,
                                            @RequestParam(value = "ear[]", required = false) String[] earArray,
                                            @RequestParam(value = "neck[]", required = false) String[] neckArray,
                                            @RequestParam(value = "chest[]", required = false) String[] chestArray,
                                            @RequestParam(value = "gas[]", required = false) String[] gasArray,
                                            @RequestParam(value = "etc[]", required = false) String[] etcArray,
                                            HttpSession session, Model model, RedirectAttributes redirectAttributes,  HttpServletResponse response) {
        // Flask 서버의 URL 설정
        String flaskUrl = "http://localhost:8000/predict";
        System.out.println("api요청시작");

        // HTTP 요청 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        //증상을 받아와서 하나의 String으로 재처리
        List<String> symptoms = new ArrayList<>();
        if(headArray == null && eyeArray == null && noseArray == null && mouseArray == null && earArray == null
                && neckArray == null && chestArray == null && gasArray == null && etcArray == null) {
            redirectAttributes.addFlashAttribute("error", "적어도 하나의 증상을 선택해야 합니다.");
            return "redirect:/user/selectDiag";
        } else {
            if(headArray != null){
                symptoms.addAll(Arrays.asList(headArray));
                /*for(int i = 0; headArray.length >= i; i++){
                    userInput = String.join(",",headArray);
                }*/
            }
            if(eyeArray != null){
                symptoms.addAll(Arrays.asList(eyeArray));
                /*for(int i = 0; eyeArray.length >= i; i++){
                    userInput = String.join(",",eyeArray);
                }*/
            }
            if(noseArray != null){
                symptoms.addAll(Arrays.asList(noseArray));
                /*for(int i = 0; noseArray.length >= i; i++){
                    userInput = String.join(",",noseArray);
                }*/
            }
            if(mouseArray != null){
                symptoms.addAll(Arrays.asList(mouseArray));
                /*for(int i = 0; mouseArray.length >= i; i++){
                    userInput = String.join(",",mouseArray);
                }*/
            }
            if(earArray != null){
                symptoms.addAll(Arrays.asList(earArray));
                /*for(int i = 0; earArray.length >= i; i++){
                    userInput = String.join(",",earArray);
                }*/
            }
            if(neckArray != null){
                symptoms.addAll(Arrays.asList(neckArray));
                /*for(int i = 0; neckArray.length >= i; i++){
                    userInput = String.join(",",neckArray);
                }*/
            }
            if(chestArray != null){
                symptoms.addAll(Arrays.asList(chestArray));
                /*for(int i = 0; chestArray.length >= i; i++){
                    userInput = String.join(",",chestArray);
                }*/
            }
            if(gasArray != null){
                symptoms.addAll(Arrays.asList(gasArray));
                /*for(int i = 0; gasArray.length >= i; i++){
                    userInput = String.join(",",gasArray);
                }*/
            }
            if(etcArray != null){
                symptoms.addAll(Arrays.asList(etcArray));
                /*for(int i = 0; etcArray.length >= i; i++){
                    userInput = String.join(",",etcArray);
                }*/
            }
        }
        String userInput = String.join(",", symptoms);
        // JSON 형식으로 데이터 생성
        String jsonBody = "{\"symptoms\": \"" + userInput + "\"}";
        System.out.println(jsonBody);

        // HTTP 요청 보내기
        HttpEntity<String> requestEntity = new HttpEntity<>(jsonBody, headers);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> responseEntity = restTemplate.postForEntity(flaskUrl, requestEntity, String.class);

        // Flask에서 생성한 응답 JSON을 파싱
        ObjectMapper objectMapper = new ObjectMapper();
        try {
            JsonNode responseJson = objectMapper.readTree(responseEntity.getBody());
            JsonNode predictionsNode = responseJson.get("predictions");
            // 로그인 세션 정보를 불러와 DB에서 정보 추출
            String loginUserId = (String) session.getAttribute("loginUserId");
            DataDTO dataDTO = dataService.userDataFrom(loginUserId);
            //환자 나이 정보 출력을 위함
            UserDTO userDTO = userService.mypageForm(loginUserId);
            String text = "해당 질병들 중에서 환자의 상태가 "
                    + "나이는 " + userDTO.getUser_birthday()
                    + ", 가족력에 "+ dataDTO.getUser_family()
                    + "이 있고, 궐련형 담배는 " + dataDTO.getUser_smoking()
                    + ", 궐련형 전자담배는 " + dataDTO.getUser_esmoking()
                    + ", 음주 습관은 " + dataDTO.getUser_drinking()
                    + ", 운동은 " + dataDTO.getUser_workout()
                    + "이라 할 때 어느 질병의 확률이 가장 높은지 다른 설명 없이 병명만 보여줘";
            //Gemini input을 위한 Json + String 처리.
            String ask = predictionsNode + text;
            System.out.println("요청완료");
            System.out.println(predictionsNode);
            System.out.println(text);
//            String scriptOutput = chatService.runScriptWithInput(String.valueOf(predictionsNode));
            String scriptOutput = chatService.runScriptWithInput(ask);
            model.addAttribute("scriptOutput",scriptOutput);

            List<String> diseaseNames = diseaseService.extractDiseaseNames(scriptOutput);

            model.addAttribute("diseaseNames", diseaseNames);

            /*model.addAttribute("diseaseName_1", diseaseNames.get(0));
            model.addAttribute("diseaseName_2", diseaseNames.get(1));
            model.addAttribute("diseaseName_3", diseaseNames.get(2));
            model.addAttribute("diseaseName_4", diseaseNames.get(3));
            model.addAttribute("diseaseName_5", diseaseNames.get(4));*/
            //각 질병명 추출
           /* Pattern pattern = Pattern.compile("\\d+\\. (.*)");
            Matcher matcher = pattern.matcher(scriptOutput);

            List<String> diseaseName = new ArrayList<>();

            while (matcher.find()){
                diseaseName.add(matcher.group(1));
            }
            System.out.println("병명 : "+diseaseName);*/


            String ask2 = scriptOutput + "1순위 질병은 어느 과를 가야할까?";
            System.out.println(ask2);
            String scriptOutput2 = chatService2.runScriptWithInput(ask2);
            model.addAttribute("scriptOutput2",scriptOutput2);

            try {
                // 한글 문자열을 UTF-8로 URL 인코딩
                String encodedValue = URLEncoder.encode(scriptOutput2, StandardCharsets.UTF_8.toString());

                // 쿠키 생성
                Cookie cookie = new Cookie("scriptOutput2", encodedValue);
                cookie.setPath("/user/map"); // 쿠키가 전송될 경로 설정
                cookie.setMaxAge(60 * 30); // 쿠키의 유효 시간 설정(예: 1시간)

                // 응답에 쿠키 추가
                response.addCookie(cookie);
            } catch (Exception e) {
                // 인코딩 실패 시 처리
                e.printStackTrace();
            }


        } catch (Exception e) {
            e.printStackTrace();
        }



        // 이동할 View의 이름을 반환
        return "askAI";
    }

}