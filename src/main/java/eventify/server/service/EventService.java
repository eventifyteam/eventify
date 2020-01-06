package eventify.server.service;

import eventify.server.jpa.model.Event;
import eventify.server.jpa.repository.EventRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class EventService {
    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    public Iterable<Event> getAllEvents() {
        return eventRepository.findAll();
    }

    public Iterable<Event> getIncomingEvents() {
        return eventRepository.incomingEvents();
    }

    public void createEvent(Event event) {
        eventRepository.save(event);
    }
}
