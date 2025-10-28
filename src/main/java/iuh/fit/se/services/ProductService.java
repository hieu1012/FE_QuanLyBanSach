package iuh.fit.se.services;


import iuh.fit.se.entities.Product;
import iuh.fit.se.utils.ApiResponse;
import iuh.fit.se.utils.PageResponse;

public interface ProductService {

    ApiResponse findById(Long id);

    ApiResponse findAll();

    PageResponse<Product> findAllWithPaging(int page, int size, String sort);

    ApiResponse save(Product product);

    ApiResponse update(Long id, Product product);

    ApiResponse delete(Long id);

    ApiResponse search(String keyword);

    ApiResponse findByCategory(Long categoryId);
}