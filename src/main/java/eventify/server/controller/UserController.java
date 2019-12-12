package eventify.server.controller;

import eventify.server.jpa.model.User;
import eventify.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
public class UserController {

    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/signup")
    public String signupPost(User user) {
        userService.createUser(user);
        return "index";
    }
}