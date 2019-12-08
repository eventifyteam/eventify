package eventify.server.controller;

import java.util.List;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import eventify.server.jpa.model.Event;
import eventify.server.jpa.repository.EventRepository;

@RestController
@RequestMapping("/test")
public class TestController {
	private final EventRepository eventRepository;

	public TestController(EventRepository eventRepository) {
		this.eventRepository = eventRepository;
	}

	@RequestMapping("/test")
	public Iterable<Event> test() {
		return eventRepository.findAll();
	}
}
