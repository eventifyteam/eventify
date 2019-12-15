package eventify.server.component;

import eventify.server.jpa.model.User;
import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

@Component
public class FileSystemPictureStorage implements PictureStorage {
    private final Path rootLocation = Paths.get("eventifyPictures");

    @Override
    public void store(MultipartFile file, User user) {
        String filename = String.valueOf(user.getId());
        try {
            try (InputStream inputStream = file.getInputStream()) {
                Files.copy(inputStream, this.rootLocation.resolve(filename),
                        StandardCopyOption.REPLACE_EXISTING);
            }
        } catch (IOException e) {
            throw new IllegalStateException("Failed to store file " + filename, e);
        }

    }

    @Override
    public Resource getUserPicture(int userId) {
        Path picturePath = rootLocation.resolve(String.valueOf(userId));
        if (Files.exists(picturePath)) {
            try {
                return new UrlResource(picturePath.toUri());
            } catch (MalformedURLException e) {
                e.printStackTrace();
            }
        }
        return defaultPicture();
    }

    public Resource defaultPicture() {
        try {
            return new UrlResource(rootLocation.resolve("default").toUri());
        } catch (MalformedURLException e) {
            e.printStackTrace();
            return null;
        }
    }

    public Path getRootLocation() {
        return rootLocation;
    }
}
