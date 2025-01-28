package com.api_frontend.api_frontend.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class MealController {

    @GetMapping("/")
    public String goHome() {
        return "/html/index.html";
    }

}
