package iuh.fit.se;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.core.env.Environment;

@SpringBootApplication
public class SpringWebCallRestApiDemoApplication {

    public static void main(String[] args) {
        ConfigurableApplicationContext ctx = SpringApplication.run(SpringWebCallRestApiDemoApplication.class, args);
        Environment env = ctx.getEnvironment();

        // Lấy port (8080 hoặc random nếu dùng server.port=0)
        String port = env.getProperty("local.server.port", env.getProperty("server.port", "8080"));

        // Lấy context path (thường là "")
        String contextPath = env.getProperty("server.servlet.context-path", "");
        if (contextPath == null) contextPath = "";
        if (!contextPath.isEmpty() && !contextPath.startsWith("/")) {
            contextPath = "/" + contextPath;
        }

        // Đường dẫn trang chủ (Admin Dashboard)
        String homePath = "/admin/products"; // ← Trang chính của bạn

        String url = "http://localhost:" + port + contextPath + homePath;

        // In ra console với kiểu đẹp
        System.out.println();
        System.out.println("================================================================");
        System.out.println("FRONTEND WEB UI IS READY!");
        System.out.println("   Login: http://localhost:" + port + contextPath + "/admin/login");
        System.out.println("================================================================");
        System.out.println();
    }
}