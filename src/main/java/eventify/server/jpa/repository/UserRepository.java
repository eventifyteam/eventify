package eventify.server.jpa.repository;

import org.springframework.data.repository.CrudRepository;

import eventify.server.jpa.model.User;

public interface UserRepository extends CrudRepository<User, String> {
}
