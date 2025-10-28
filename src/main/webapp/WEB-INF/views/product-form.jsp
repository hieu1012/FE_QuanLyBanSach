<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${product.id != null ? 'Edit Product' : 'Add New Product'}</title>
    <link href="<c:url value='/styles/bootstrap.min.css' />" rel="stylesheet">
    <link href="<c:url value='/styles/main.css' />" rel="stylesheet">
</head>
<body>
<div class="container mt-4">
    <h3 class="text-center">${product.id != null ? 'Edit Product' : 'Add New Product'}</h3>
    <hr />

    <c:if test="${errors != null}">
        <div class="alert alert-danger">
            <ul>
                <c:forEach var="err" items="${errors}">
                    <li>${err}</li>
                </c:forEach>
            </ul>
        </div>
    </c:if>

    <form action="<c:url value='/products/save' />" method="post">
        <input type="hidden" name="id" value="${product.id}" />

        <div class="mb-3">
            <label>Title</label>
            <input type="text" name="title" value="${product.title}" class="form-control" required />
        </div>

        <div class="mb-3">
            <label>Description</label>
            <textarea name="description" class="form-control" rows="3">${product.description}</textarea>
        </div>

        <div class="row">
            <div class="col-md-6 mb-3">
                <label>Price ($)</label>
                <input type="number" step="0.01" name="price" value="${product.price}" class="form-control" required />
            </div>
            <div class="col-md-6 mb-3">
                <label>Discount (%)</label>
                <input type="number" step="0.01" name="discount" value="${product.discount}" class="form-control" />
                <small class="text-muted">Leave blank if no discount</small>
            </div>
        </div>

        <c:if test="${product.discount != null && product.discount > 0}">
            <div class="mb-3">
                <label>Discounted Price: <strong>$${product.discountPrice}</strong></label>
            </div>
        </c:if>

        <div class="row">
            <div class="col-md-6 mb-3">
                <label>Stock</label>
                <input type="number" name="stock" value="${product.stock}" class="form-control" required />
            </div>
            <div class="col-md-6 mb-3">
                <label>Image URL</label>
                <input type="url" name="image" value="${product.image}" class="form-control"
                       placeholder="https://example.com/image.jpg" />
            </div>
        </div>

        <div class="mb-3">
            <label>Category ID</label>
            <input type="number" name="categoryId" value="${product.categoryId}" class="form-control" required />
        </div>

        <div class="mb-3 form-check">
            <input type="checkbox" name="isActive" class="form-check-input"
            ${product.isActive ? 'checked' : ''} />
            <label class="form-check-label">Active</label>
        </div>

        <button type="submit" class="btn btn-primary">Save</button>
        <a href="<c:url value='/products' />" class="btn btn-secondary">Cancel</a>
    </form>
</div>
</body>
</html>