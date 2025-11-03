package iuh.fit.se.controllers;

import iuh.fit.se.entities.Product;
import iuh.fit.se.services.ProductService;
import iuh.fit.se.utils.ApiResponse;
import iuh.fit.se.utils.PageResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/admin/dashboard")
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    // === HELPER: Kiểm tra quyền truy cập ===
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

    // === HELPER: Trích xuất List<Product> an toàn ===
    private List<Product> extractList(ApiResponse response) {
        if (response == null || response.getErrors() != null || response.getData() == null) {
            return new ArrayList<>();
        }
        try {
            return (List<Product>) response.getData();
        } catch (ClassCastException e) {
            return new ArrayList<>();
        }
    }

    private Product extractProduct(ApiResponse response) {
        if (response == null || response.getErrors() != null || response.getData() == null) {
            return new Product();
        }
        try {
            return (Product) response.getData();
        } catch (ClassCastException e) {
            return new Product();
        }
    }

    // GET: /admin/dashboard/products
    @GetMapping("/products")
    public String getList(HttpSession session, Model model) {
        if (!isAdminLoggedIn(session)) {
            return "redirect:/admin/login";
        }

        List<Product> products = extractList(productService.findAll());
        Map<String, Object> user = (Map<String, Object>) session.getAttribute("currentUser");

        model.addAttribute("products", products);
        model.addAttribute("currentUser", user);
        model.addAttribute("pageTitle", "Quản lý sản phẩm");
        model.addAttribute("currentPage", "products");  // Quan trọng!

        return "admin/dashboard-layout";  // Trả về layout chính
    }

    // GET: /admin/dashboard/products/page/{pageNo}
    @GetMapping("/products/page/{pageNo}")
    public String getListHasPaging(HttpSession session,
                                   Model model,
                                   @PathVariable int pageNo,
                                   @RequestParam(defaultValue = "10") int pageSize,
                                   @RequestParam(defaultValue = "title,asc") String sort) {
        if (!isAdminLoggedIn(session)) {
            return "redirect:/admin/login";
        }

        PageResponse<Product> pageResponse = productService.findAllWithPaging(pageNo - 1, pageSize, sort);
        Map<String, Object> user = (Map<String, Object>) session.getAttribute("currentUser");

        model.addAttribute("products", pageResponse.getContent());
        model.addAttribute("currentPage", pageNo);
        model.addAttribute("totalPages", pageResponse.getTotalPages());
        model.addAttribute("totalItems", pageResponse.getTotalElements());
        model.addAttribute("sort", sort);
        model.addAttribute("pageSize", pageSize);
        model.addAttribute("currentUser", user);
        model.addAttribute("pageTitle", "Quản lý sản phẩm");

        return "admin/product-list";
    }

    // Show form
    @GetMapping("/products/showForm")
    public String showForm(HttpSession session, Model model) {
        if (!isAdminLoggedIn(session)) {
            return "redirect:/admin/login";
        }

        Map<String, Object> user = (Map<String, Object>) session.getAttribute("currentUser");
        model.addAttribute("product", new Product());
        model.addAttribute("currentUser", user);
        model.addAttribute("pageTitle", "Thêm sản phẩm mới");
        model.addAttribute("currentPage", "products");

        return "admin/product-form";  // Form riêng biệt
    }

    // Save or Update
    @PostMapping("/products/save")
    public String save(HttpSession session, @ModelAttribute Product product, Model model) {
        if (!isAdminLoggedIn(session)) {
            return "redirect:/admin/login";
        }

        ApiResponse response = (product.getId() == null || product.getId() == 0)
                ? productService.save(product)
                : productService.update(product.getId(), product);

        if (response != null && response.getErrors() != null) {
            Map<String, Object> user = (Map<String, Object>) session.getAttribute("currentUser");
            model.addAttribute("errors", response.getErrors());
            model.addAttribute("product", product);
            model.addAttribute("currentUser", user);
            return "admin/product-form";
        }
        return "redirect:/admin/dashboard/products";
    }

    // Edit form
    @GetMapping("/products/update")
    public String update(HttpSession session, @RequestParam("productId") Long id, Model model) {
        if (!isAdminLoggedIn(session)) {
            return "redirect:/admin/login";
        }

        Product product = extractProduct(productService.findById(id));
        Map<String, Object> user = (Map<String, Object>) session.getAttribute("currentUser");

        model.addAttribute("product", product);
        model.addAttribute("currentUser", user);
        model.addAttribute("pageTitle", "Cập nhật sản phẩm");

        return "admin/product-form";
    }

    // Delete
    @GetMapping("/products/delete")
    public String delete(HttpSession session, @RequestParam("productId") Long id) {
        if (!isAdminLoggedIn(session)) {
            return "redirect:/admin/login";
        }

        productService.delete(id);
        return "redirect:/admin/dashboard/products";
    }

    // Search
    @GetMapping("/products/search")
    public String search(HttpSession session, @RequestParam String keyword, Model model) {
        if (!isAdminLoggedIn(session)) {
            return "redirect:/admin/login";
        }

        List<Product> products = extractList(productService.search(keyword));
        Map<String, Object> user = (Map<String, Object>) session.getAttribute("currentUser");

        model.addAttribute("products", products);
        model.addAttribute("keyword", keyword);
        model.addAttribute("currentUser", user);
        model.addAttribute("pageTitle", "Tìm kiếm sản phẩm");

        return "admin/product-list";
    }

    // Filter by category
    @GetMapping("/products/category/{categoryId}")
    public String filterByCategory(HttpSession session, @PathVariable Long categoryId, Model model) {
        if (!isAdminLoggedIn(session)) {
            return "redirect:/admin/login";
        }

        List<Product> products = extractList(productService.findByCategory(categoryId));
        Map<String, Object> user = (Map<String, Object>) session.getAttribute("currentUser");

        model.addAttribute("products", products);
        model.addAttribute("categoryId", categoryId);
        model.addAttribute("currentUser", user);
        model.addAttribute("pageTitle", "Sản phẩm theo danh mục");

        return "admin/product-list";
    }
}