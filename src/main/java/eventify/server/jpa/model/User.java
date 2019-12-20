package eventify.server.jpa.model;

import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "users")
@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class User implements Serializable{
    private int id;
    private String name;
    private String username;
    private String password;
    private int enabled=1;
    private List<String> authority=new ArrayList<>();
    private List<Event> attendedEvents;
    private List<Event> createdEvents;

    public User(){  // Default constructor needed for model initialization.
    }

    @Id
    public int getId(){
        return id;
    }

    public void setId(int id){
        this.id=id;
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
    public int getEnabled() {
        return enabled;
    }

    public void setEnabled(int enabled) {
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
    public List<Event> getAttendedEvents() {
        return attendedEvents;
    }

    public void setAttendedEvents(List<Event> attendedEvents) {
        this.attendedEvents = attendedEvents;
    }

    @OneToMany(mappedBy = "creator", fetch = FetchType.EAGER)
    public List<Event> getCreatedEvents() {
        return createdEvents;
    }

    public void setCreatedEvents(List<Event> createdEvents) {
        this.createdEvents = createdEvents;
    }
}