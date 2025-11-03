package iuh.fit.se.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import iuh.fit.se.utils.ApiResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestClient;

import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/admin")
public class AdminController {

    private final RestClient restClient;
    private final ObjectMapper objectMapper;

    @Value("${app.api.base-url:http://localhost:8081/api}")
    private String apiBaseUrl;

    @Autowired
    public AdminController(RestClient restClient, ObjectMapper objectMapper) {
        this.restClient = restClient;
        this.objectMapper = objectMapper;
    }

    // === HELPER ===
    private boolean isAdminLoggedIn(HttpSession session) {
        Object user = session.getAttribute("currentUser");
        if (user == null) return false;

        try {
            Map<String, Object> userMap = (Map<String, Object>) user;
            String role = (String) userMap.get("role");
            Boolean isActive = (Boolean) userMap.get("isActive");
            return isActive != null && isActive &&
                    (role != null && (role.equals("ADMIN") || role.equals("MASTER")));
        } catch (Exception e) {
            return false;
        }
    }

    // === LOGIN ===
    @GetMapping("/login")
    public String showAdminLogin(HttpSession session) {
        // Nếu đã đăng nhập, redirect về dashboard
        if (isAdminLoggedIn(session)) {
            return "redirect:/admin/dashboard";
        }
        return "admin/login";
    }

    @PostMapping("/login")
    public String processLogin(@RequestParam String username,
                               @RequestParam String password,
                               HttpSession session,
                               Model model) {
        // Tạo body request
        Map<String, String> credentials = new HashMap<>();
        credentials.put("username", username);
        credentials.put("password", password);

        try {
            // Gọi API POST /users/login
            String loginEndpoint = apiBaseUrl + "/users/login";

            System.out.println("=== DEBUG LOGIN ===");
            System.out.println("API Endpoint: " + loginEndpoint);
            System.out.println("Username: " + username);
            System.out.println("Password: " + (password != null ? "***" : "null"));

            ApiResponse apiResponse = restClient.post()
                    .uri(loginEndpoint)
                    .contentType(MediaType.APPLICATION_JSON)
                    .body(credentials)
                    .retrieve()
                    .onStatus(HttpStatusCode::is4xxClientError, (request, response) -> {
                        System.out.println("4xx Error: " + response.getStatusCode());
                        // Không throw exception ở đây, để xử lý bên dưới
                    })
                    .body(ApiResponse.class);

            System.out.println("API Response: " + apiResponse);

            if (apiResponse != null && apiResponse.getStatus() == 200 && apiResponse.getData() != null) {
                Map<String, Object> userData = (Map<String, Object>) apiResponse.getData();
                String role = (String) userData.get("role");

                System.out.println("Login successful! User role: " + role);

                // Chỉ cho phép ADMIN và MASTER đăng nhập
                if ("ADMIN".equals(role) || "MASTER".equals(role)) {
                    session.setAttribute("currentUser", userData);
                    return "redirect:/admin/dashboard";
                } else {
                    model.addAttribute("error", "Bạn không có quyền truy cập vào trang quản trị");
                    return "admin/login";
                }
            } else {
                System.out.println("Login failed: Invalid response");
                model.addAttribute("error", "Tài khoản hoặc mật khẩu không đúng");
                return "admin/login";
            }

        } catch (HttpClientErrorException e) {
            System.out.println("HTTP Error: " + e.getStatusCode() + " - " + e.getMessage());
            System.out.println("Response Body: " + e.getResponseBodyAsString());

            // Parse error message từ API nếu có
            try {
                Map<String, Object> errorBody = objectMapper.readValue(
                        e.getResponseBodyAsString(),
                        Map.class
                );
                String errorMessage = (String) errorBody.get("message");
                model.addAttribute("error", errorMessage != null ? errorMessage : "Tài khoản hoặc mật khẩu không đúng");
            } catch (Exception ex) {
                model.addAttribute("error", "Tài khoản hoặc mật khẩu không đúng");
            }
            return "admin/login";

        } catch (Exception e) {
            System.out.println("Exception during login: " + e.getClass().getName());
            e.printStackTrace();
            model.addAttribute("error", "Lỗi hệ thống: " + e.getMessage());
            return "admin/login";
        }
    }

    // === DASHBOARD ===
    @GetMapping("/dashboard")
    public String dashboard(HttpSession session, Model model) {
        if (!isAdminLoggedIn(session)) {
            return "redirect:/admin/login";
        }

        Map<String, Object> user = (Map<String, Object>) session.getAttribute("currentUser");

        model.addAttribute("pageTitle", "Dashboard");
        model.addAttribute("currentUser", user);
        model.addAttribute("currentPage", "dashboard");
        model.addAttribute("contentPage", "/WEB-INF/views/admin/dashboard-content.jsp");
        model.addAttribute("productCount", 1234); // Lấy từ service

        return "admin/dashboard-layout";
    }

    // === PRODUCTS ===
    @GetMapping("/products")
    public String productList(HttpSession session) {
        if (!isAdminLoggedIn(session)) {
            return "redirect:/admin/login";
        }
        return "redirect:/admin/dashboard/products";
    }

    // === LOGOUT ===
    @GetMapping("/logout")
    public String logout(HttpSession session) {
        session.invalidate();
        return "redirect:/admin/login";
    }
}