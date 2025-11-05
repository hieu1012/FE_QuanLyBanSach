<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<div class="card">
    <div class="card-body">
        <form method="post" action="<c:url value='/admin/dashboard/categories/save' />">

            <input type="hidden" name="id" value="${category.id}" />

            <div class="mb-3">
                <label class="form-label fw-bold">Tên danh mục</label>
                <input type="text" class="form-control" name="name" value="${category.name}" required>
            </div>


            <div class="form-check mb-3">
                <input class="form-check-input" type="checkbox" name="isActive" id="isActive"
                ${category.isActive ? 'checked' : ''}>
                <label class="form-check-label" for="isActive">Hoạt động</label>
            </div>

            <div class="d-flex justify-content-between">
                <a href="<c:url value='/admin/dashboard/categories' />" class="btn btn-secondary">
                    <i class="fas fa-arrow-left"></i> Quay lại
                </a>
                <button type="submit" class="btn btn-success">
                    <i class="fas fa-save"></i> Lưu
                </button>
            </div>
        </form>
    </div>
</div>
