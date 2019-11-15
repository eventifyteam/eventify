package eventify.server;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties
@EntityScan(basePackages = {"Model"})
public class ServerApplication {

    public static void main(String[] args) {
        System.setProperty("spring.config.name", "eventify");
        SpringApplication.run(ServerApplication.class, args);
    }

}
