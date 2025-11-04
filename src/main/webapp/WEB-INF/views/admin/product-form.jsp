<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<div class="card">
    <div class="card-body">
        <form method="post" action="<c:url value='/admin/dashboard/products/save' />">

            <input type="hidden" name="id" value="${product.id}" />

            <div class="mb-3">
                <label class="form-label fw-bold">Tên sản phẩm</label>
                <input type="text" class="form-control" name="title" value="${product.title}" required>
            </div>

            <div class="mb-3">
                <label class="form-label fw-bold">Mô tả</label>
                <textarea class="form-control" name="description" rows="3">${product.description}</textarea>
            </div>

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

            <div class="mb-3">
                <label class="form-label fw-bold">Ảnh sản phẩm (URL)</label>
                <input type="text" class="form-control" name="image" value="${product.image}">
            </div>

            <div class="form-check mb-3">
                <input class="form-check-input" type="checkbox" name="isActive" id="isActive"
                ${product.isActive ? 'checked' : ''}>
                <label class="form-check-label" for="isActive">Hoạt động</label>
            </div>

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
