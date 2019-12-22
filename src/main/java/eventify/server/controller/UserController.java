package eventify.server.controller;

import eventify.server.component.PictureStorage;
import eventify.server.jpa.model.User;
import eventify.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

@Controller
public class UserController{

    private UserService userService;
    private PictureStorage pictureStorage;

    @Autowired
    public UserController(UserService userService, PictureStorage pictureStorage) {
        this.userService = userService;
        this.pictureStorage = pictureStorage;
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

    private String failSignup(RedirectAttributes redirectAttributes, String... messages) {
        redirectAttributes.addFlashAttribute("errorMessage", messages);
        return "redirect:/signup";
    }

    @GetMapping(value = "picture/{user}", produces = {MediaType.IMAGE_JPEG_VALUE, MediaType.IMAGE_PNG_VALUE})
    @ResponseBody
    public ResponseEntity<Resource> userPicture(@PathVariable int user) {
        Resource resource = pictureStorage.getUserPicture(user);
        return ResponseEntity.ok(resource);
    }

    @PostMapping("uploadPicture")
    public String uploadProfilePicture(MultipartFile picture) {
        pictureStorage.store(picture, userService.getCurrentUser());
        return "redirect:/settings";
    }

    @PostMapping("updateProfile")
    public String updateProfile(User user) {
        userService.updateUser(user);
        return "redirect:/settings";
    }

}