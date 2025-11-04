package iuh.fit.se.entities;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Product {
    private Integer id;
    private String title;
    private String description;
    private Double price;
    private Double discountPrice;
    private Integer discount;
    private Integer stock;
    private String image;
    private Boolean isActive;

    // Thông tin danh mục đi kèm
    private Category category;
}
