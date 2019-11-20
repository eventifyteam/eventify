package eventify.server.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class ViewController {

    @RequestMapping("/index")
    public String index() {

        return "index";
    }

    @RequestMapping("/home")
    public String login() {
        return "home";
    }

    @RequestMapping("/contact")
    public String contact() {
        return "contact";
    }
}