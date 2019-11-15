package eventify.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ServerApplication {

	public static void main(String[] args) {
		System.setProperty("spring.config.name", "eventify");
		SpringApplication.run(ServerApplication.class, args);
	}

}
