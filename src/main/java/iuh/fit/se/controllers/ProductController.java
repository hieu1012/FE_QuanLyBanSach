package iuh.fit.se.controllers;

import iuh.fit.se.entities.Product;
import iuh.fit.se.services.ProductService;
import iuh.fit.se.utils.ApiResponse;
import iuh.fit.se.utils.PageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/products")
public class ProductController {

    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
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

    // GET: /products
    @GetMapping
    public String getList(Model model) {
        List<Product> products = extractList(productService.findAll());
        model.addAttribute("products", products);
        return "product-list";
    }

    // GET: /products/page/{pageNo}
    @GetMapping("/page/{pageNo}")
    public String getListHasPaging(Model model,
                                   @PathVariable int pageNo,
                                   @RequestParam(defaultValue = "10") int pageSize,
                                   @RequestParam(defaultValue = "title,asc") String sort) {
        PageResponse<Product> pageResponse = productService.findAllWithPaging(pageNo - 1, pageSize, sort);
        model.addAttribute("products", pageResponse.getContent());
        model.addAttribute("currentPage", pageNo);
        model.addAttribute("totalPages", pageResponse.getTotalPages());
        model.addAttribute("totalItems", pageResponse.getTotalElements());
        model.addAttribute("sort", sort);
        model.addAttribute("pageSize", pageSize);
        return "product-list";
    }

    // Show form
    @GetMapping("/showForm")
    public String showForm(Model model) {
        model.addAttribute("product", new Product());
        return "product-form";
    }

    // Save or Update
    @PostMapping("/save")
    public String save(@ModelAttribute Product product, Model model) {
        ApiResponse response = (product.getId() == null || product.getId() == 0)
                ? productService.save(product)
                : productService.update(product.getId(), product);

        if (response != null && response.getErrors() != null) {
            model.addAttribute("errors", response.getErrors());
            model.addAttribute("product", product);
            return "product-form";
        }
        return "redirect:/products";
    }

    // Edit form
    @GetMapping("/update")
    public String update(@RequestParam("productId") Long id, Model model) {
        Product product = extractProduct(productService.findById(id));
        model.addAttribute("product", product);
        return "product-form";
    }

    // Delete
    @GetMapping("/delete")
    public String delete(@RequestParam("productId") Long id) {
        productService.delete(id);
        return "redirect:/products";
    }

    // Search
    @GetMapping("/search")
    public String search(@RequestParam String keyword, Model model) {
        List<Product> products = extractList(productService.search(keyword));
        model.addAttribute("products", products);
        model.addAttribute("keyword", keyword);
        return "product-list";
    }

    // Filter by category
    @GetMapping("/category/{categoryId}")
    public String filterByCategory(@PathVariable Long categoryId, Model model) {
        List<Product> products = extractList(productService.findByCategory(categoryId));
        model.addAttribute("products", products);
        model.addAttribute("categoryId", categoryId);
        return "product-list";
    }
}