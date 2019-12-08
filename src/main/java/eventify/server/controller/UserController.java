package eventify.server.controller;


import eventify.server.jpa.model.User;
import eventify.server.jpa.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
public class UserController {

    private UserRepository userRepository;

    @Autowired
    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /*
    @PostMapping(value = "/all")
    public Iterable<User> getUsers() throws ParseException {

        return userRepository.findAll();
    }
    */

    //  TODO: Test method
    @PostMapping(value = "/add")
    public eventify.server.jpa.model.User createUser(User userDto) {
        User user = new User("xd3", "xd3", 1);  // TEST CODE

        // Record data into a database
        userRepository.save(user);
        return user;
    }
}
