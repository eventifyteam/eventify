package eventify.server.jpa.repository;

import org.springframework.data.repository.CrudRepository;

import eventify.server.jpa.model.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends CrudRepository<User, Integer> {
    boolean existsByUsername(String username);

    User findByUsername(String s);
}
