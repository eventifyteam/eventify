package eventify.server.controller;

import eventify.server.component.FileSystemPictureStorage;
import eventify.server.jpa.model.Event;
import eventify.server.jpa.repository.EventRepository;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("test")
public class TestController {
    private final EventRepository eventRepository;
    private final FileSystemPictureStorage fileSystemPictureStorage;

    public TestController(EventRepository eventRepository, FileSystemPictureStorage fileSystemPictureStorage) {
        this.eventRepository = eventRepository;
        this.fileSystemPictureStorage = fileSystemPictureStorage;
    }

    @GetMapping("allEvents")
    public Iterable<Event> allEvents() {
        return eventRepository.findAll();
    }

    @GetMapping("pictures")
    public String picturePath() {
        return fileSystemPictureStorage.getRootLocation().toAbsolutePath().toString();
    }
}
