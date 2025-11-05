package iuh.fit.se.controllers;

import iuh.fit.se.entities.Category;
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
public class CategoryController {

    private final CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
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

    private List<Category> extractList(ApiResponse response) {
        if (response == null || response.getErrors() != null || response.getData() == null) {
            return Collections.emptyList();
        }
        try {
            return (List<Category>) response.getData();
        } catch (ClassCastException e) {
            return Collections.emptyList();
        }
    }

    private Category extractCategory(ApiResponse response) {
        if (response == null || response.getErrors() != null || response.getData() == null) {
            return new Category();
        }
        try {
            return (Category) response.getData();
        } catch (ClassCastException e) {
            return new Category();
        }
    }

    // ==========================================================
    // LIST CATEGORIES
    // ==========================================================

    @GetMapping("/categories")
    public String listCategories(HttpSession session, Model model) {
        if (!isAdminLoggedIn(session)) return "redirect:/admin/login";

        ApiResponse response = categoryService.findAll();
        List<Category> categories = extractList(response);
        Map<String, Object> user = (Map<String, Object>) session.getAttribute("currentUser");

        model.addAttribute("categories", categories);
        model.addAttribute("currentUser", user);
        model.addAttribute("pageTitle", "Quản lý danh mục");
        model.addAttribute("currentPage", "categories");
        model.addAttribute("contentPage", "/WEB-INF/views/admin/category-list.jsp");

        return "admin/dashboard-layout";
    }

    // ==========================================================
    // PAGING
    // ==========================================================

    @GetMapping("/categories/page/{pageNo}")
    public String listCategoriesWithPaging(HttpSession session,
                                           Model model,
                                           @PathVariable int pageNo,
                                           @RequestParam(defaultValue = "10") int pageSize,
                                           @RequestParam(defaultValue = "id,asc") String sort) {
        if (!isAdminLoggedIn(session)) return "redirect:/admin/login";

        PageResponse<Category> pageResponse = categoryService.findAllWithPaging(pageNo - 1, pageSize, sort);
        Map<String, Object> user = (Map<String, Object>) session.getAttribute("currentUser");

        model.addAttribute("categories", pageResponse.getContent());
        model.addAttribute("currentPage", pageNo);
        model.addAttribute("totalPages", pageResponse.getTotalPages());
        model.addAttribute("totalItems", pageResponse.getTotalElements());
        model.addAttribute("sort", sort);
        model.addAttribute("pageSize", pageSize);
        model.addAttribute("currentUser", user);
        model.addAttribute("pageTitle", "Quản lý danh mục");
        model.addAttribute("contentPage", "/WEB-INF/views/admin/category-list.jsp");

        return "admin/dashboard-layout";
    }

    // ==========================================================
    // FORM (CREATE / UPDATE)
    // ==========================================================

    @GetMapping("/categories/showForm")
    public String showForm(HttpSession session, Model model,
                           @RequestParam(value = "id", required = false) Integer id) {
        if (!isAdminLoggedIn(session)) return "redirect:/admin/login";

        Category category = (id != null) ? extractCategory(categoryService.findById(id)) : new Category();
        Map<String, Object> user = (Map<String, Object>) session.getAttribute("currentUser");

        model.addAttribute("category", category);
        model.addAttribute("currentUser", user);
        model.addAttribute("pageTitle", (id == null ? "Thêm danh mục mới" : "Cập nhật danh mục"));
        model.addAttribute("currentPage", "categories");
        model.addAttribute("contentPage", "/WEB-INF/views/admin/category-form.jsp");

        return "admin/dashboard-layout";
    }

    @PostMapping("/categories/save")
    public String saveCategory(HttpSession session, @ModelAttribute Category category, Model model) {
        if (!isAdminLoggedIn(session)) return "redirect:/admin/login";

        ApiResponse response = (category.getId() == null || category.getId() == 0)
                ? categoryService.save(category)
                : categoryService.update(category.getId(), category);

        if (response != null && response.getErrors() != null) {
            Map<String, Object> user = (Map<String, Object>) session.getAttribute("currentUser");
            model.addAttribute("errors", response.getErrors());
            model.addAttribute("category", category);
            model.addAttribute("currentUser", user);
            model.addAttribute("pageTitle", "Lỗi khi lưu danh mục");
            model.addAttribute("contentPage", "/WEB-INF/views/admin/category-form.jsp");
            return "admin/dashboard-layout";
        }

        return "redirect:/admin/dashboard/categories";
    }

    // ==========================================================
    // DELETE CATEGORY
    // ==========================================================

    @GetMapping("/categories/delete")
    public String deleteCategory(HttpSession session, @RequestParam("categoryId") int id) {
        if (!isAdminLoggedIn(session)) return "redirect:/admin/login";
        categoryService.delete(id);
        return "redirect:/admin/dashboard/categories";
    }

    // ==========================================================
    // SEARCH CATEGORY
    // ==========================================================

    @GetMapping("/categories/search")
    public String searchCategories(HttpSession session,
                                   @RequestParam String keyword,
                                   Model model) {
        if (!isAdminLoggedIn(session)) return "redirect:/admin/login";

        List<Category> categories = extractList(categoryService.search(keyword));
        Map<String, Object> user = (Map<String, Object>) session.getAttribute("currentUser");

        model.addAttribute("categories", categories);
        model.addAttribute("keyword", keyword);
        model.addAttribute("currentUser", user);
        model.addAttribute("pageTitle", "Kết quả tìm kiếm danh mục");
        model.addAttribute("contentPage", "/WEB-INF/views/admin/category-list.jsp");

        return "admin/dashboard-layout";
    }
}
