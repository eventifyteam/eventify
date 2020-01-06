package eventify.server.controller;

import eventify.server.jpa.model.Event;
import eventify.server.service.EventService;
import eventify.server.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("events")
public class EventController {
    private final EventService eventService;
    private final UserService userService;

    public EventController(EventService eventService, UserService userService) {
        this.eventService = eventService;
        this.userService = userService;
    }

    @GetMapping("incoming")
    public @ResponseBody
    Iterable<Event> getIncomingEvents() {
        return eventService.getIncomingEvents();
    }

    @PostMapping("create")
    public String createEvent(Event event) {
        event.setCreator(userService.getCurrentUser());
        eventService.createEvent(event);

        return "redirect:/home";
    }
}
