package eventify.server.jpa.model;

import javax.persistence.*;

@Entity
@Table(name = "users")
public class User {

    private String username;

    private String password;

    private int enabled = 1;

    public User() {  // Default constructor needed for model initialization.
    }

    @Id
    @Column(name = "username", nullable = false, unique = true)
    public String getUsername() {
        return username;
    }

    public User(String username, String password, int enabled) {
        this.username = username;
        this.password = password;
        this.enabled = enabled;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Column(name = "password", nullable = false)
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Column(name = "enabled", nullable = false)
    public int getEnabled() {
        return enabled;
    }

    public void setEnabled(int enabled) {
        this.enabled = enabled;
    }
}