package iuh.fit.se.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import iuh.fit.se.utils.ApiResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.RestClient;

import java.util.HashMap;
import java.util.Map;


@Controller
public class LoginController {

    private final RestClient restClient;
    private final ObjectMapper objectMapper;
    private static final String API_ENDPOINT = "http://localhost:8081/api/users/login";  // Đổi port nếu khác

    @Autowired
    public LoginController(RestClient restClient, ObjectMapper objectMapper) {
        this.restClient = restClient;
        this.objectMapper = objectMapper;
    }

    // GET: /login → Hiển thị form login
    @GetMapping("/login")
    public String showLoginForm() {
        return "login";  // → login.jsp
    }

    // POST: /login → Gọi API login, lưu session nếu thành công
    @PostMapping("/login")
    public String processLogin(@RequestParam String username, @RequestParam String password,
                               HttpSession session, Model model) {
        // Tạo body request
        Map<String, String> credentials = new HashMap<>();
        credentials.put("username", username);
        credentials.put("password", password);

        try {
            // Gọi API POST /users/login
            ApiResponse apiResponse = restClient.post()
                    .uri(API_ENDPOINT)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(credentials)
                    .retrieve()
                    .body(ApiResponse.class);

            if (apiResponse.getStatus() == 200 && apiResponse.getData() != null) {
                // Lưu user vào session (dùng Map hoặc UserDTO)
                session.setAttribute("currentUser", apiResponse.getData());
                return "redirect:/admin/products";  // Redirect đến danh sách sản phẩm
            } else {
                model.addAttribute("error", "Tài khoản hoặc mật khẩu không đúng");
                return "login";
            }
        } catch (Exception e) {
            model.addAttribute("error", "Lỗi hệ thống: " + e.getMessage());
            return "login";
        }
    }

    // GET: /logout → Xóa session, redirect login
    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/login";
    }
}