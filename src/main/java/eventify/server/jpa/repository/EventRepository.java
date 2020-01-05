package eventify.server.jpa.repository;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import eventify.server.jpa.model.Event;

@Repository
public interface EventRepository extends CrudRepository<Event, Integer> {

    @Query("SELECT e FROM Event e WHERE e.date > current_date ORDER BY e.date ASC")
    Iterable<Event> incomingEvents();
}
