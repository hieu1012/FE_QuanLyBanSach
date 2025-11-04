package iuh.fit.se.services;

import iuh.fit.se.entities.Product;
import iuh.fit.se.utils.ApiResponse;
import iuh.fit.se.utils.PageResponse;

public interface ProductService {

    // Lấy sản phẩm theo id
    ApiResponse findById(int id);

    // Lấy tất cả sản phẩm
    ApiResponse findAll();

    // Lấy danh sách sản phẩm có phân trang
    PageResponse<Product> findAllWithPaging(int page, int size, String sort);

    // Thêm mới sản phẩm
    ApiResponse save(Product product);

    // Cập nhật sản phẩm
    ApiResponse update(int id, Product product);

    // Xóa sản phẩm
    ApiResponse delete(int id);

    // Tìm kiếm sản phẩm theo từ khóa
    ApiResponse search(String keyword);

    ApiResponse findByCategory(int categoryId);

}
