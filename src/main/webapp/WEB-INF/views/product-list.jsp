<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="jakarta.tags.core"%>
<%@ taglib prefix="fmt" uri="jakarta.tags.fmt"%>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Product Management</title>
    <link href="<c:url value='/styles/bootstrap.min.css' />" rel="stylesheet">
    <link href="<c:url value='/styles/main.css' />" rel="stylesheet">
    <style>
        .product-img { width: 50px; height: 50px; object-fit: cover; border-radius: 4px; }
        .price-discount { color: red; font-weight: bold; }
        .price-original { text-decoration: line-through; color: #888; font-size: 0.9em; }
    </style>
</head>
<body>
<div class="container mt-4">
    <div class="col-12">
        <h3 class="text-center">Product Management</h3>
        <hr />

        <!-- Search & Add Button -->
        <div class="row mb-3" style="float: right;">
            <div class="col-12">
                <form method="get" action="<c:url value='/products/search' />" class="d-inline">
                    <input type="text" name="keyword" placeholder="Search product..." class="form-control d-inline" style="width: 200px;" />
                    <input type="submit" value="Search" class="btn btn-secondary" />
                </form>
                <a href="<c:url value='/products/showForm' />" class="btn btn-primary">Add Product</a>
            </div>
        </div>

        <div class="panel panel-info">
            <div class="panel-heading">
                <div class="panel-title">Product List</div>
            </div>
            <div class="panel-body">
                <table class="table table-striped table-bordered">
                    <tr>
                        <th>Image</th>
                        <th>Title</th>
                        <th>Price</th>
                        <th>Discount</th>
                        <th>Stock</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>

                    <!-- Loop through products -->
                    <c:if test="${products != null}">
                        <c:forEach var="p" items="${products}">
                            <c:url var="updateLink" value="/products/update">
                                <c:param name="productId" value="${p.id}" />
                            </c:url>
                            <c:url var="deleteLink" value="/products/delete">
                                <c:param name="productId" value="${p.id}" />
                            </c:url>

                            <tr>
                                <td>
                                    <img src="${not empty p.image ? p.image : 'https://via.placeholder.com/50?text=No+Img'}"
                                         class="product-img" alt="Product">
                                </td>
                                <td><c:out value="${p.title}" /></td>
                                <td>
                                    <c:choose>
                                        <c:when test="${p.discount != null && p.discount > 0}">
                                            <span class="price-discount">$${p.discountPrice}</span>
                                            <br><small class="price-original">$${p.price}</small>
                                        </c:when>
                                        <c:otherwise>
                                            $${p.price}
                                        </c:otherwise>
                                    </c:choose>
                                </td>
                                <td>
                                    <c:if test="${p.discount != null && p.discount > 0}">
                                        ${p.discount}%
                                    </c:if>
                                    <c:if test="${p.discount == null || p.discount == 0}">
                                        -
                                    </c:if>
                                </td>
                                <td>${p.stock}</td>
                                <td>
                                    <span class="badge ${p.isActive ? 'bg-success' : 'bg-secondary'}">
                                            ${p.isActive ? 'Active' : 'Inactive'}
                                    </span>
                                </td>
                                <td>
                                    <a href="${updateLink}" class="text-warning">Update</a> |
                                    <a href="${deleteLink}"
                                       onclick="return confirm('Are you sure you want to delete this product?');"
                                       class="text-danger">Delete</a>
                                </td>
                            </tr>
                        </c:forEach>
                    </c:if>

                    <c:if test="${products == null || empty products}">
                        <tr>
                            <td colspan="7" class="text-center text-muted">No products found.</td>
                        </tr>
                    </c:if>
                </table>

                <!-- Pagination -->
                <c:if test="${totalPages > 1}">
                    <nav>
                        <ul class="pagination justify-content-end">
                            <c:forEach var="i" begin="1" end="${totalPages}">
                                <c:choose>
                                    <c:when test="${currentPage != i}">
                                        <li class="page-item">
                                            <a class="page-link"
                                               href="<c:url value='/products/page/${i}'>
                                                   <c:param name='pageSize' value='${pageSize}' />
                                                   <c:param name='sort' value='${sort}' />
                                                 </c:url>">${i}</a>
                                        </li>
                                    </c:when>
                                    <c:otherwise>
                                        <li class="page-item active">
                                            <span class="page-link">${i}</span>
                                        </li>
                                    </c:otherwise>
                                </c:choose>
                            </c:forEach>
                        </ul>
                    </nav>
                </c:if>
            </div>
        </div>
    </div>
</div>
</body>
</html>