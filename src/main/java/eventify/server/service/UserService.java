package eventify.server.service;

import eventify.server.jpa.model.User;
import eventify.server.jpa.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Iterable<User> getUsers() {
        return userRepository.findAll();
    }

    public void createUser(User user) {
        //  TODO: Check if that user already exists.
        String password = new BCryptPasswordEncoder().encode(user.getPassword());
        user.setPassword(password);

        user.getAuthority().add("ROLE_USER");

        userRepository.save(user);
    }
}
