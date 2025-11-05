package iuh.fit.se.controllers;

import iuh.fit.se.entities.Product;
import iuh.fit.se.entities.Category;
import iuh.fit.se.services.ProductService;
import iuh.fit.se.services.CategoryService;
import iuh.fit.se.utils.ApiResponse;
import iuh.fit.se.utils.PageResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@Controller
@RequestMapping("/admin/dashboard")
public class ProductController {

    private final ProductService productService;
    private final CategoryService categoryService;

    @Autowired
    public ProductController(ProductService productService, CategoryService categoryService) {
        this.productService = productService;
        this.categoryService = categoryService;
    }

    // ==========================================================
    // HELPER METHODS
    // ==========================================================

    private boolean isAdminLoggedIn(HttpSession session) {
        Object user = session.getAttribute("currentUser");
        if (user == null) return false;

        try {
            Map<String, Object> userMap = (Map<String, Object>) user;
            String role = (String) userMap.get("role");
            Boolean isActive = (Boolean) userMap.get("isActive");
            return Boolean.TRUE.equals(isActive) &&
                    (role != null && (role.equalsIgnoreCase("ADMIN") || role.equalsIgnoreCase("MASTER")));
        } catch (Exception e) {
            return false;
        }
    }

    @SuppressWarnings("unchecked")
    private <T> List<T> extractList(ApiResponse response) {
        if (response == null || response.getErrors() != null || response.getData() == null) {
            return Collections.emptyList();
        }
        try {
            return (List<T>) response.getData();
        } catch (ClassCastException e) {
            return Collections.emptyList();
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

    // ==========================================================
    // PRODUCT LIST (NO PAGING)
    // ==========================================================

    @GetMapping("/products")
    public String listProducts(HttpSession session, Model model) {
        if (!isAdminLoggedIn(session)) return "redirect:/admin/login";

        ApiResponse response = productService.findAll();
        List<Product> products = extractList(response);
        Map<String, Object> user = (Map<String, Object>) session.getAttribute("currentUser");

        model.addAttribute("products", products);
        model.addAttribute("currentUser", user);
        model.addAttribute("pageTitle", "Quản lý sản phẩm");
        model.addAttribute("currentPage", "products");
        model.addAttribute("contentPage", "/WEB-INF/views/admin/product-list.jsp");

        return "admin/dashboard-layout";
    }

    // ==========================================================
    // PRODUCT LIST (WITH PAGING)
    // ==========================================================

    @GetMapping("/products/page/{pageNo}")
    public String listProductsWithPaging(HttpSession session,
                                         Model model,
                                         @PathVariable int pageNo,
                                         @RequestParam(defaultValue = "10") int pageSize,
                                         @RequestParam(defaultValue = "id,asc") String sort) {
        if (!isAdminLoggedIn(session)) return "redirect:/admin/login";

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
        model.addAttribute("contentPage", "/WEB-INF/views/admin/product-list.jsp");

        return "admin/dashboard-layout";
    }

    // ==========================================================
    // PRODUCT FORM (CREATE + UPDATE)
    // ==========================================================

    @GetMapping("/products/showForm")
    public String showForm(HttpSession session, Model model,
                           @RequestParam(value = "id", required = false) Integer id) {
        if (!isAdminLoggedIn(session)) return "redirect:/admin/login";

        // Load product (nếu có id)
        Product product = (id != null) ? extractProduct(productService.findById(id)) : new Product();

        // Load categories
        ApiResponse categoryResponse = categoryService.findAll();
        List<Category> categories = extractList(categoryResponse);

        Map<String, Object> user = (Map<String, Object>) session.getAttribute("currentUser");

        model.addAttribute("product", product);
        model.addAttribute("categories", categories);
        model.addAttribute("currentUser", user);
        model.addAttribute("pageTitle", (id == null ? "Thêm sản phẩm mới" : "Cập nhật sản phẩm"));
        model.addAttribute("currentPage", "products");
        model.addAttribute("contentPage", "/WEB-INF/views/admin/product-form.jsp");

        return "admin/dashboard-layout";
    }

    // ==========================================================
    // SAVE / UPDATE PRODUCT
    // ==========================================================

    @PostMapping("/products/save")
    public String saveProduct(HttpSession session, @ModelAttribute Product product, Model model) {
        if (!isAdminLoggedIn(session)) return "redirect:/admin/login";

        ApiResponse response = (product.getId() == null || product.getId() == 0)
                ? productService.save(product)
                : productService.update(product.getId(), product);

        if (response != null && response.getErrors() != null) {
            // Load lại danh mục nếu có lỗi
            ApiResponse categoryResponse = categoryService.findAll();
            List<Category> categories = extractList(categoryResponse);
            Map<String, Object> user = (Map<String, Object>) session.getAttribute("currentUser");

            model.addAttribute("categories", categories);
            model.addAttribute("errors", response.getErrors());
            model.addAttribute("product", product);
            model.addAttribute("currentUser", user);
            model.addAttribute("pageTitle", "Lỗi khi lưu sản phẩm");
            model.addAttribute("contentPage", "/WEB-INF/views/admin/product-form.jsp");
            return "admin/dashboard-layout";
        }

        return "redirect:/admin/dashboard/products";
    }

    // ==========================================================
    // DELETE PRODUCT
    // ==========================================================

    @GetMapping("/products/delete")
    public String deleteProduct(HttpSession session, @RequestParam("productId") int id) {
        if (!isAdminLoggedIn(session)) return "redirect:/admin/login";
        productService.delete(id);
        return "redirect:/admin/dashboard/products";
    }

    // ==========================================================
    // SEARCH PRODUCT
    // ==========================================================

    @GetMapping("/products/search")
    public String searchProducts(HttpSession session,
                                 @RequestParam String keyword,
                                 Model model) {
        if (!isAdminLoggedIn(session)) return "redirect:/admin/login";

        List<Product> products = extractList(productService.search(keyword));
        Map<String, Object> user = (Map<String, Object>) session.getAttribute("currentUser");

        model.addAttribute("products", products);
        model.addAttribute("keyword", keyword);
        model.addAttribute("currentUser", user);
        model.addAttribute("pageTitle", "Kết quả tìm kiếm sản phẩm");
        model.addAttribute("contentPage", "/WEB-INF/views/admin/product-list.jsp");

        return "admin/dashboard-layout";
    }

    // ==========================================================
    // FILTER BY CATEGORY
    // ==========================================================

    @GetMapping("/products/category/{categoryId}")
    public String filterByCategory(HttpSession session,
                                   @PathVariable int categoryId,
                                   Model model) {
        if (!isAdminLoggedIn(session)) return "redirect:/admin/login";

        ApiResponse response = productService.findByCategory(categoryId);
        List<Product> products = extractList(response);

        Map<String, Object> user = (Map<String, Object>) session.getAttribute("currentUser");
        model.addAttribute("products", products);
        model.addAttribute("categoryId", categoryId);
        model.addAttribute("currentUser", user);
        model.addAttribute("pageTitle", "Sản phẩm theo danh mục");
        model.addAttribute("contentPage", "/WEB-INF/views/admin/product-list.jsp");

        return "admin/dashboard-layout";
    }
}
