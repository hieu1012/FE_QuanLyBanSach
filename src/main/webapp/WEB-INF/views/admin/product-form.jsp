<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<div class="card">
    <div class="card-body">
        <form method="post" action="<c:url value='/admin/dashboard/products/save' />">

            <input type="hidden" name="id" value="${product.id}" />

            <!-- Tên sản phẩm -->
            <div class="mb-3">
                <label class="form-label fw-bold">Tên sản phẩm</label>
                <input type="text" class="form-control" name="title" value="${product.title}" required>
            </div>

            <!-- Mô tả -->
            <div class="mb-3">
                <label class="form-label fw-bold">Mô tả</label>
                <textarea class="form-control" name="description" rows="3">${product.description}</textarea>
            </div>

            <!-- Giá - Tồn kho - Giảm giá -->
            <div class="row">
                <div class="col-md-4 mb-3">
                    <label class="form-label fw-bold">Giá</label>
                    <input type="number" step="0.01" class="form-control" name="price" value="${product.price}">
                </div>
                <div class="col-md-4 mb-3">
                    <label class="form-label fw-bold">Tồn kho</label>
                    <input type="number" class="form-control" name="stock" value="${product.stock}">
                </div>
                <div class="col-md-4 mb-3">
                    <label class="form-label fw-bold">Giảm giá (%)</label>
                    <input type="number" class="form-control" name="discount" value="${product.discount}">
                </div>
            </div>

            <!-- Ảnh -->
            <div class="mb-3">
                <label class="form-label fw-bold">Ảnh sản phẩm (URL)</label>
                <input type="text" class="form-control" name="image" value="${product.image}">
            </div>

            <!-- Danh mục -->
            <div class="mb-3">
                <label class="form-label fw-bold">Danh mục</label>
                <select class="form-select" name="category.id" required>
                    <option value="">-- Chọn danh mục --</option>
                    <c:forEach var="cat" items="${categories}">
                        <option value="${cat.id}"
                                <c:if test="${product.category != null && product.category.id == cat.id}">
                                    selected
                                </c:if>>
                                ${cat.name}
                        </option>
                    </c:forEach>
                </select>
            </div>

            <!-- Trạng thái -->
            <div class="form-check mb-3">
                <input class="form-check-input" type="checkbox" name="isActive" id="isActive"
                       <c:if test="${product.isActive}">checked</c:if>>
                <label class="form-check-label" for="isActive">Hoạt động</label>
            </div>

            <!-- Nút hành động -->
            <div class="d-flex justify-content-between">
                <a href="<c:url value='/admin/dashboard/products' />" class="btn btn-secondary">
                    <i class="fas fa-arrow-left"></i> Quay lại
                </a>
                <button type="submit" class="btn btn-success">
                    <i class="fas fa-save"></i> Lưu
                </button>
            </div>
        </form>
    </div>
</div>
