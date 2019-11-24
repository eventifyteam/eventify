package eventify.server.controller;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@PreAuthorize("isAuthenticated()")
public class MainController {

	@RequestMapping("/home")
	public String login() {
		return "home";
	}
}
