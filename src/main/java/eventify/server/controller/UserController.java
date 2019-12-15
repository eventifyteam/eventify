package eventify.server.controller;

import eventify.server.jpa.model.User;
import eventify.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import java.util.ArrayList;
import java.util.List;

@Controller
public class UserController{

    private UserService userService;

    @Autowired
    public UserController(UserService userService){
        this.userService=userService;
    }

    @GetMapping("/signup")
    public String signup(){
        return "signup";
    }

    @PostMapping("/signup")
    public String signupPost(User user, RedirectAttributes redirectAttributes){
        if(user.getPassword().equals("")){
            return failSignup(redirectAttributes, "You need to enter password");
        }

        if(userService.userExists(user.getUsername())){
            return failSignup(redirectAttributes, "This user already exists.");
        }

        userService.createUser(user);
        return "index";
    }

    private String failSignup(RedirectAttributes redirectAttributes, String... messages){
        redirectAttributes.addFlashAttribute("errorMessage", messages);
        return "redirect:/signup";
    }
}