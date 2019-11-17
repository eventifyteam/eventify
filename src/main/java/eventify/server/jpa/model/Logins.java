package eventify.server.jpa.model;

import javax.persistence.*;

@Entity
@Table(name = "logins")
public class Logins {

    @Id
    @Column(name = "username", nullable = false, unique = true)
    private String username;

    @Column(name = "password", nullable = false)
    private String password;

    @Column(name = "enabled", nullable = false)
    private int enabled = 1;

}