package eventify.server.service;

import eventify.server.jpa.model.Event;
import eventify.server.jpa.model.User;
import eventify.server.jpa.repository.EventRepository;
import eventify.server.jpa.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service("userDetailsService")
public class UserService implements UserDetailsService {

    private final UserRepository userRepository;
    private final EventRepository eventRepository;

    public UserService(UserRepository userRepository, EventRepository eventRepository) {
        this.userRepository = userRepository;
        this.eventRepository = eventRepository;
    }

    public Iterable<User> getUsers() {
        return userRepository.findAll();
    }

    public User getCurrentUser() {
        return (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }

    public boolean userExists(String username) {
        return userRepository.existsByUsername(username);
    }

    public void createUser(User user) {
        if (userExists(user.getUsername())) {
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
        final User currentUser = getCurrentUser();
        if (!settings.getPassword().equals(""))
            currentUser.setPassword(settings.getPassword());
        currentUser.setName(settings.getName());
        currentUser.setUsername(settings.getUsername());
        userRepository.save(currentUser);
    }

    public void joinEvent(Integer eventId) {
        Optional<Event> eventOptional = eventRepository.findById(eventId);
        if (eventOptional.isPresent()) {
            Event joinedEvent = eventOptional.get();
            User currentUser = getCurrentUser();
            currentUser.getAttendedEvents().add(joinedEvent);
            userRepository.save(currentUser);
        }
    }

    public void cancelJoin(Integer eventId) {
        Optional<Event> eventOptional = eventRepository.findById(eventId);
        if (eventOptional.isPresent()) {
            Event joinedEvent = eventOptional.get();
            User currentUser = getCurrentUser();
            currentUser.getAttendedEvents().remove(joinedEvent);
            userRepository.save(currentUser);
        }
    }
}
