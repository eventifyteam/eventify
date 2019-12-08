package eventify.server.jpa.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import eventify.server.jpa.model.Event;

@Repository
public interface EventRepository extends CrudRepository<Event, Integer> {
}
