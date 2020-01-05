package eventify.server.jpa.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.authority.mapping.GrantedAuthoritiesMapper;
import org.springframework.security.core.userdetails.UserDetails;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

@Entity
@Table(name = "users")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class User implements Serializable, UserDetails {
    private int id;
    private String name;
    private String username;
    private String password;
    private boolean enabled = true;
    private List<String> authority = new ArrayList<>();
    private List<Event> attendedEvents;
    private List<Event> createdEvents;

    public User() {  // Default constructor needed for model initialization.
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        User user = (User) o;
        return getId() == user.getId();
    }

    @Override
    public int hashCode() {
        return Objects.hash(getId());
    }

    @Override
    public String toString() {
        return "User{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", username='" + username + '\'' +
                '}';
    }

    @Id
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    @Column(name="username", nullable=false, unique=true)
    public String getUsername(){
        return username;
    }

    public String getName(){
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    @Column(name = "password", nullable = false)
    @JsonIgnore
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Column(name = "enabled", nullable = false)
    @JsonIgnore
    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    @ElementCollection
    @CollectionTable(name="authorities", joinColumns=@JoinColumn(name="username", referencedColumnName="username"))
    @JsonIgnore
    public List<String> getAuthority() {
        return authority;
    }

    public void setAuthority(List<String> authorities) {
        this.authority = authorities;
    }

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "AttendMap", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "event_id"))
    @JsonIgnore
    public List<Event> getAttendedEvents() {
        return attendedEvents;
    }

    public void setAttendedEvents(List<Event> attendedEvents) {
        this.attendedEvents = attendedEvents;
    }

    @OneToMany(mappedBy = "creator", fetch = FetchType.EAGER)
    @JsonIgnore
    public List<Event> getCreatedEvents() {
        return createdEvents;
    }

    public void setCreatedEvents(List<Event> createdEvents) {
        this.createdEvents = createdEvents;
    }

    @Override
    @Transient
    @JsonIgnore
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    @Transient
    @JsonIgnore
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    @Transient
    @JsonIgnore
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    @Transient
    @JsonIgnore
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return getAuthority().stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList());
    }
}