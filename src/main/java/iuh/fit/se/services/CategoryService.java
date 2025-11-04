package iuh.fit.se.services;

import iuh.fit.se.entities.Category;
import iuh.fit.se.utils.ApiResponse;
import iuh.fit.se.utils.PageResponse;

public interface CategoryService {

    // Lấy danh mục theo id
    ApiResponse findById(int id);

    // Lấy tất cả danh mục
    ApiResponse findAll();

    // Lấy danh mục có phân trang
    PageResponse<Category> findAllWithPaging(int page, int size, String sort);

    // Thêm mới danh mục
    ApiResponse save(Category category);

    // Cập nhật danh mục
    ApiResponse update(int id, Category category);

    // Xóa danh mục
    ApiResponse delete(int id);

    // Tìm kiếm danh mục theo từ khóa
    ApiResponse search(String keyword);
}
