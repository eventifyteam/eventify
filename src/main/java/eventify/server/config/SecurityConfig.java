package eventify.server.config;

import eventify.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.sql.DataSource;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Override
    protected void configure(HttpSecurity http) throws Exception {  // Spring Security Configuration
        http
                .formLogin().defaultSuccessUrl("/home")
                .and()
                .csrf().disable();
        http
                .logout()
                .logoutUrl("/logout")
                .logoutSuccessUrl("/index");
    }

    @Override
    public void configure(WebSecurity web) {
        web.ignoring().antMatchers("/css/**")
                .antMatchers("/icon-fonts/**")
                .antMatchers("/images/**")
                .antMatchers("/js/**");
    }

    @Autowired
    public void configAuthentication(final AuthenticationManagerBuilder auth, final DataSource dataSource,
                                     UserService userService) throws Exception {
        auth.userDetailsService(userService).passwordEncoder(passwordEncoder());

        auth.jdbcAuthentication()
                .dataSource(dataSource)
                .usersByUsernameQuery("select username, password, enabled from users where username=?")
                .authoritiesByUsernameQuery("select username, authority from authorities where username=?");
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}