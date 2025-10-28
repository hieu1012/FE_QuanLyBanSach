package iuh.fit.se.entities;

/**
 * Entity Product - Quản lý sản phẩm
 * Đã thêm: constructor, getter, setter thủ công
 */
public class Product {

    private Long id;
    private String title;
    private String description;
    private Double discount;
    private Double discountPrice;
    private String image;
    private Boolean isActive;
    private Double price;
    private Integer stock;
    private Long categoryId;

    // ==================== CONSTRUCTORS ====================

    /** Constructor rỗng */
    public Product() {
    }

    /** Constructor đầy đủ tham số */
    public Product(Long id, String title, String description, Double discount,
                   Double discountPrice, String image, Boolean isActive,
                   Double price, Integer stock, Long categoryId) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.discount = discount;
        this.discountPrice = discountPrice;
        this.image = image;
        this.isActive = isActive;
        this.price = price;
        this.stock = stock;
        this.categoryId = categoryId;
    }

    // ==================== GETTERS & SETTERS ====================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getDiscount() {
        return discount;
    }

    public void setDiscount(Double discount) {
        this.discount = discount;
    }

    public Double getDiscountPrice() {
        return discountPrice;
    }

    public void setDiscountPrice(Double discountPrice) {
        this.discountPrice = discountPrice;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Integer getStock() {
        return stock;
    }

    public void setStock(Integer stock) {
        this.stock = stock;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    // ==================== toString() (tùy chọn) ====================

    @Override
    public String toString() {
        return "Product{" +
                "id=" + id +
                ", title='" + title + '\'' +
                ", price=" + price +
                ", stock=" + stock +
                ", isActive=" + isActive +
                '}';
    }
}