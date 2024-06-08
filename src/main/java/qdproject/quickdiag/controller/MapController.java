package qdproject.quickdiag.controller;


import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.ModelAndView;
import qdproject.quickdiag.service.UserService;

import java.net.URLDecoder;
import java.nio.charset.StandardCharsets;

@Controller
@RequiredArgsConstructor
public class MapController {

    private final UserService userService;

    @GetMapping("/user/map")
    public ModelAndView handleMap(@CookieValue(value = "scriptOutput2", defaultValue = "") String scriptOutput2,
                                  HttpSession session, Model model) {
        String loginUserId = (String) session.getAttribute("loginUserId");
        model.addAttribute("loginUserId",loginUserId);
        try {
            // URL 디코딩을 통해 인코딩된 쿠키 값을 복원
            String decodedValue = URLDecoder.decode(scriptOutput2, StandardCharsets.UTF_8.toString());

            ModelAndView modelAndView = new ModelAndView("map");
            modelAndView.addObject("dataFromCookie", decodedValue);

            return modelAndView;
        } catch (Exception e) {
            // 디코딩 실패 시 처리
            e.printStackTrace();
            return new ModelAndView("errorPage");
        }
    }

    @GetMapping("/user/map/test")
    public String maptest(){
        return "maptest";
    }
}