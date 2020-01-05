package eventify.server.controller;

import eventify.server.jpa.model.Event;
import eventify.server.service.EventService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("events")
public class EventController {
    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }

    @GetMapping("incoming")
    public Iterable<Event> getIncomingEvents() {
        return eventService.getIncomingEvents();
    }
}
