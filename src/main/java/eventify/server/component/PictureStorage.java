package eventify.server.component;

import eventify.server.jpa.model.User;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.nio.file.Path;
import java.util.stream.Stream;

public interface PictureStorage {

	void store(MultipartFile file, User user);

	Resource getUserPicture(int userId);

	Resource defaultPicture();
}
