package eventify.server.controller;

import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class IntroController {

    @RequestMapping("/")
    public String index() {
        if (!(SecurityContextHolder.getContext().getAuthentication() instanceof AnonymousAuthenticationToken))
            return "redirect:/home";
        return "index";
    }

    @RequestMapping("/index")
    public String index2() {
        if (!(SecurityContextHolder.getContext().getAuthentication() instanceof AnonymousAuthenticationToken))
            return "redirect:/home";
        return "index";
    }

    @RequestMapping("/contact")
    public String contact() {
        if (!(SecurityContextHolder.getContext().getAuthentication() instanceof AnonymousAuthenticationToken))
            return "redirect:/home";
        return "contact";
    }
}