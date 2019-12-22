package eventify.server.service;

import eventify.server.jpa.model.User;
import eventify.server.jpa.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service("userDetailsService")
public class UserService implements UserDetailsService {

    private UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public Iterable<User> getUsers() {
        return userRepository.findAll();
    }

    public boolean userExists(String username){
        return userRepository.existsByUsername(username);
    }

    public void createUser(User user){
        if(userExists(user.getUsername())){
            throw new IllegalStateException("User already exists. use userexists() before calling this method");
        }

        String password = new BCryptPasswordEncoder().encode(user.getPassword());
        user.setPassword(password);

        user.getAuthority().add("ROLE_USER");

        userRepository.save(user);
    }

    @Override
    @Transactional(readOnly = true)
    public User loadUserByUsername(String s) throws UsernameNotFoundException {
        final User user = userRepository.findByUsername(s);
        user.getAuthorities();
        return user;
    }

    public void updateUser(User settings) {
        final User currentUser = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (!settings.getPassword().equals(""))
            currentUser.setPassword(settings.getPassword());
        currentUser.setName(settings.getName());
        currentUser.setUsername(settings.getUsername());
        userRepository.save(currentUser);
    }

}
