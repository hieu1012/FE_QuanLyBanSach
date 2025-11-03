<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${pageTitle} - Admin Dashboard</title>
    <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🏢</text></svg>">
    <link href="<c:url value='/styles/bootstrap.min.css' />" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
            padding: 20px;
        }

        /* Top Navigation Bar */
        .navbar-admin {
            background: rgba(255, 255, 255, 0.95);
            padding: 15px 30px;
            border-radius: 15px;
            margin-bottom: 30px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.1);
            backdrop-filter: blur(10px);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .navbar-left {
            display: flex;
            gap: 20px;
            align-items: center;
        }

        .navbar-admin a {
            color: #2c3e50;
            text-decoration: none;
            font-weight: 500;
            padding: 8px 15px;
            border-radius: 8px;
            transition: all 0.3s;
            display: inline-flex;
            align-items: center;
            gap: 8px;
        }

        .navbar-admin a:hover {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }

        .navbar-right {
            display: flex;
            align-items: center;
            gap: 15px;
        }

        .user-info {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 8px 15px;
            background: #f8f9fa;
            border-radius: 25px;
        }

        .user-avatar {
            width: 35px;
            height: 35px;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: bold;
        }

        /* Form Container */
        .form-container {
            max-width: 900px;
            margin: 0 auto;
            background: white;
            border-radius: 20px;
            padding: 40px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.2);
            animation: slideUp 0.5s ease-out;
        }

        @keyframes slideUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        /* Form Header */
        .form-header {
            text-align: center;
            margin-bottom: 35px;
            padding-bottom: 25px;
            border-bottom: 3px solid #f0f0f0;
        }

        .form-header h2 {
            color: #2c3e50;
            font-size: 32px;
            font-weight: 700;
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 15px;
        }

        .form-header p {
            color: #7f8c8d;
            font-size: 16px;
        }

        /* Alert Messages */
        .alert-custom {
            padding: 15px 20px;
            border-radius: 12px;
            margin-bottom: 25px;
            display: flex;
            align-items: flex-start;
            gap: 12px;
            animation: fadeIn 0.3s;
        }

        @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
        }

        .alert-danger {
            background: #fee;
            border-left: 4px solid #e74c3c;
            color: #c0392b;
        }

        .alert-danger i {
            color: #e74c3c;
            font-size: 20px;
        }

        .alert-danger ul {
            margin: 0;
            padding-left: 20px;
        }

        /* Form Groups */
        .form-group {
            margin-bottom: 25px;
        }

        .form-group label {
            display: block;
            margin-bottom: 10px;
            color: #2c3e50;
            font-weight: 600;
            font-size: 14px;
            display: flex;
            align-items: center;
            gap: 8px;
        }

        .form-group label i {
            color: #667eea;
        }

        .required {
            color: #e74c3c;
            margin-left: 4px;
        }

        .form-control {
            width: 100%;
            padding: 14px 18px;
            border: 2px solid #e8ebed;
            border-radius: 10px;
            font-size: 15px;
            transition: all 0.3s;
            font-family: inherit;
        }

        .form-control:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
        }

        textarea.form-control {
            resize: vertical;
            min-height: 120px;
        }

        /* Form Row */
        .form-row {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 25px;
        }

        /* Helper Text */
        .form-text {
            display: block;
            margin-top: 8px;
            font-size: 13px;
            color: #7f8c8d;
            display: flex;
            align-items: center;
            gap: 6px;
        }

        .form-text i {
            font-size: 12px;
        }

        /* Image Preview */
        .image-preview-container {
            margin-top: 15px;
        }

        .image-preview {
            width: 100%;
            max-width: 300px;
            height: 200px;
            border: 3px dashed #e8ebed;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            background: #f8f9fa;
            transition: all 0.3s;
        }

        .image-preview:hover {
            border-color: #667eea;
        }

        .image-preview img {
            max-width: 100%;
            max-height: 100%;
            object-fit: cover;
        }

        .image-preview-placeholder {
            text-align: center;
            color: #95a5a6;
        }

        .image-preview-placeholder i {
            font-size: 48px;
            margin-bottom: 10px;
            display: block;
        }

        /* Discount Info */
        .discount-info {
            background: linear-gradient(135deg, #f39c12 0%, #f2994a 100%);
            color: white;
            padding: 15px 20px;
            border-radius: 12px;
            margin-bottom: 25px;
            display: flex;
            align-items: center;
            gap: 15px;
            box-shadow: 0 4px 15px rgba(243, 156, 18, 0.3);
        }

        .discount-info i {
            font-size: 32px;
        }

        .discount-info-text {
            flex: 1;
        }

        .discount-info-label {
            font-size: 13px;
            opacity: 0.9;
            margin-bottom: 5px;
        }

        .discount-info-value {
            font-size: 28px;
            font-weight: 700;
        }

        /* Checkbox */
        .form-check-custom {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 18px 20px;
            background: #f8f9fa;
            border-radius: 12px;
            border: 2px solid #e8ebed;
            transition: all 0.3s;
            cursor: pointer;
            margin-bottom: 25px;
        }

        .form-check-custom:hover {
            background: #e8f4ff;
            border-color: #667eea;
        }

        .form-check-custom input[type="checkbox"] {
            width: 24px;
            height: 24px;
            cursor: pointer;
            accent-color: #667eea;
        }

        .form-check-custom label {
            margin: 0;
            cursor: pointer;
            flex: 1;
        }

        .form-check-custom label strong {
            display: block;
            color: #2c3e50;
            margin-bottom: 4px;
        }

        .form-check-custom label small {
            color: #7f8c8d;
            font-size: 13px;
        }

        /* Action Buttons */
        .form-actions {
            display: flex;
            gap: 15px;
            justify-content: flex-end;
            padding-top: 25px;
            border-top: 2px solid #f0f0f0;
        }

        .btn {
            padding: 14px 35px;
            border: none;
            border-radius: 10px;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            display: inline-flex;
            align-items: center;
            gap: 10px;
            text-decoration: none;
        }

        .btn-primary {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        }

        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
            color: white;
        }

        .btn-secondary {
            background: #6c757d;
            color: white;
        }

        .btn-secondary:hover {
            background: #5a6268;
            transform: translateY(-2px);
            color: white;
        }

        /* Responsive */
        @media (max-width: 768px) {
            .form-container {
                padding: 25px;
            }

            .navbar-admin {
                flex-direction: column;
                gap: 15px;
            }

            .navbar-left, .navbar-right {
                flex-direction: column;
                width: 100%;
            }

            .form-actions {
                flex-direction: column;
            }

            .btn {
                width: 100%;
                justify-content: center;
            }
        }
    </style>
</head>
<body>

<!-- Navigation Bar -->
<div class="navbar-admin">
    <div class="navbar-left">
        <a href="<c:url value='/admin/dashboard' />">
            <i class="fas fa-home"></i> Dashboard
        </a>
        <a href="<c:url value='/admin/dashboard/products' />">
            <i class="fas fa-box"></i> Sản phẩm
        </a>
        <a href="<c:url value='/admin/dashboard/categories' />">
            <i class="fas fa-folder"></i> Danh mục
        </a>
    </div>

    <div class="navbar-right">
        <div class="user-info">
            <div class="user-avatar">
                ${currentUser.fullName.substring(0,1).toUpperCase()}
            </div>
            <span><strong>${currentUser.fullName}</strong></span>
        </div>
        <a href="<c:url value='/admin/logout' />">
            <i class="fas fa-sign-out-alt"></i> Đăng xuất
        </a>
    </div>
</div>

<!-- Form Container -->
<div class="form-container">
    <!-- Form Header -->
    <div class="form-header">
        <h2>
            <i class="fas fa-box"></i>
            ${product.id != null ? 'Cập nhật sản phẩm' : 'Thêm sản phẩm mới'}
        </h2>
        <p>Điền đầy đủ thông tin sản phẩm bên dưới</p>
    </div>

    <!-- Error Messages -->
    <c:if test="${errors != null && not empty errors}">
        <div class="alert-custom alert-danger">
            <i class="fas fa-exclamation-circle"></i>
            <div>
                <strong>Có lỗi xảy ra:</strong>
                <ul>
                    <c:forEach var="err" items="${errors}">
                        <li>${err}</li>
                    </c:forEach>
                </ul>
            </div>
        </div>
    </c:if>

    <!-- Form -->
    <form action="<c:url value='/admin/dashboard/products/save' />" method="post" id="productForm">
        <input type="hidden" name="id" value="${product.id}" />

        <!-- Product Name -->
        <div class="form-group">
            <label>
                <i class="fas fa-tag"></i>
                Tên sản phẩm
                <span class="required">*</span>
            </label>
            <input type="text"
                   name="title"
                   value="${product.title}"
                   class="form-control"
                   required
                   placeholder="Nhập tên sản phẩm..."
                   maxlength="200" />
        </div>

        <!-- Description -->
        <div class="form-group">
            <label>
                <i class="fas fa-align-left"></i>
                Mô tả sản phẩm
            </label>
            <textarea name="description"
                      class="form-control"
                      placeholder="Nhập mô tả chi tiết về sản phẩm...">${product.description}</textarea>
            <span class="form-text">
                <i class="fas fa-info-circle"></i>
                Mô tả giúp khách hàng hiểu rõ hơn về sản phẩm
            </span>
        </div>

        <!-- Price & Discount Row -->
        <div class="form-row">
            <div class="form-group">
                <label>
                    <i class="fas fa-dollar-sign"></i>
                    Giá gốc ($)
                    <span class="required">*</span>
                </label>
                <input type="number"
                       step="0.01"
                       name="price"
                       value="${product.price}"
                       class="form-control"
                       required
                       placeholder="0.00"
                       min="0"
                       oninput="calculateDiscount()" />
            </div>

            <div class="form-group">
                <label>
                    <i class="fas fa-percent"></i>
                    Giảm giá (%)
                </label>
                <input type="number"
                       step="0.01"
                       name="discount"
                       value="${product.discount}"
                       class="form-control"
                       placeholder="0"
                       min="0"
                       max="100"
                       oninput="calculateDiscount()" />
                <span class="form-text">
                    <i class="fas fa-info-circle"></i>
                    Để trống nếu không có giảm giá
                </span>
            </div>
        </div>

        <!-- Discount Info -->
        <div id="discountInfo" style="display: ${product.discount != null && product.discount > 0 ? 'flex' : 'none'};">
            <div class="discount-info">
                <i class="fas fa-tag"></i>
                <div class="discount-info-text">
                    <div class="discount-info-label">Giá sau khi giảm</div>
                    <div class="discount-info-value">$<span id="finalPrice">${product.discountPrice}</span></div>
                </div>
            </div>
        </div>

        <!-- Stock & Image Row -->
        <div class="form-row">
            <div class="form-group">
                <label>
                    <i class="fas fa-boxes"></i>
                    Số lượng tồn kho
                    <span class="required">*</span>
                </label>
                <input type="number"
                       name="stock"
                       value="${product.stock}"
                       class="form-control"
                       required
                       placeholder="0"
                       min="0" />
            </div>

            <div class="form-group">
                <label>
                    <i class="fas fa-layer-group"></i>
                    Mã danh mục
                    <span class="required">*</span>
                </label>
                <select name="categoryId" class="form-control" required>
                    <option value="">-- Chọn danh mục --</option>
                    <option value="1" ${product.categoryId == 1 ? 'selected' : ''}>Sách</option>
                    <option value="2" ${product.categoryId == 2 ? 'selected' : ''}>Điện tử</option>
                    <option value="3" ${product.categoryId == 3 ? 'selected' : ''}>Thời trang</option>
                    <option value="4" ${product.categoryId == 4 ? 'selected' : ''}>Đồ gia dụng</option>
                </select>
            </div>
        </div>

        <!-- Image URL -->
        <div class="form-group">
            <label>
                <i class="fas fa-image"></i>
                URL hình ảnh
            </label>
            <input type="url"
                   name="image"
                   value="${product.image}"
                   class="form-control"
                   placeholder="https://example.com/image.jpg"
                   onchange="previewImage(this.value)" />
            <span class="form-text">
                <i class="fas fa-info-circle"></i>
                Nhập đường dẫn URL của hình ảnh sản phẩm
            </span>

            <!-- Image Preview -->
            <div class="image-preview-container">
                <div class="image-preview" id="imagePreview">
                    <c:choose>
                        <c:when test="${not empty product.image}">
                            <img src="${product.image}" alt="Preview" onerror="showPlaceholder()">
                        </c:when>
                        <c:otherwise>
                            <div class="image-preview-placeholder">
                                <i class="fas fa-image"></i>
                                <div>Preview ảnh</div>
                            </div>
                        </c:otherwise>
                    </c:choose>
                </div>
            </div>
        </div>

        <!-- Active Status -->
        <div class="form-check-custom">
            <input type="checkbox"
                   name="isActive"
                   id="isActive"
            ${product.isActive || product.id == null ? 'checked' : ''} />
            <label for="isActive">
                <strong><i class="fas fa-toggle-on"></i> Kích hoạt sản phẩm</strong>
                <small>Sản phẩm sẽ hiển thị trên website khi được kích hoạt</small>
            </label>
        </div>

        <!-- Action Buttons -->
        <div class="form-actions">
            <a href="<c:url value='/admin/dashboard/products' />" class="btn btn-secondary">
                <i class="fas fa-times"></i>
                Hủy bỏ
            </a>
            <button type="submit" class="btn btn-primary">
                <i class="fas fa-save"></i>
                ${product.id != null ? 'Cập nhật' : 'Lưu sản phẩm'}
            </button>
        </div>
    </form>
</div>

<script>
    // Preview image
    function previewImage(url) {
        const preview = document.getElementById('imagePreview');

        if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
            preview.innerHTML = '<img src="' + url + '" alt="Preview" onerror="showPlaceholder()">';
        } else {
            showPlaceholder();
        }
    }

    // Show placeholder
    function showPlaceholder() {
        const preview = document.getElementById('imagePreview');
        preview.innerHTML = '<div class="image-preview-placeholder"><i class="fas fa-image"></i><div>Preview ảnh</div></div>';
    }

    // Calculate discount price
    function calculateDiscount() {
        const priceInput = document.querySelector('input[name="price"]');
        const discountInput = document.querySelector('input[name="discount"]');
        const discountInfo = document.getElementById('discountInfo');
        const finalPriceSpan = document.getElementById('finalPrice');

        const price = parseFloat(priceInput.value) || 0;
        const discount = parseFloat(discountInput.value) || 0;

        if (discount > 0 && price > 0) {
            const finalPrice = price - (price * discount / 100);
            finalPriceSpan.textContent = finalPrice.toFixed(2);
            discountInfo.style.display = 'flex';
        } else {
            discountInfo.style.display = 'none';
        }
    }

    // Form validation
    document.getElementById('productForm').addEventListener('submit', function(e) {
        const price = parseFloat(document.querySelector('input[name="price"]').value);
        const stock = parseInt(document.querySelector('input[name="stock"]').value);

        if (price <= 0) {
            e.preventDefault();
            alert('Giá sản phẩm phải lớn hơn 0!');
            return false;
        }

        if (stock < 0) {
            e.preventDefault();
            alert('Số lượng tồn kho không được âm!');
            return false;
        }

        return true;
    });

    // Initialize
    window.addEventListener('DOMContentLoaded', function() {
        calculateDiscount();
    });
</script>

</body>
</html>