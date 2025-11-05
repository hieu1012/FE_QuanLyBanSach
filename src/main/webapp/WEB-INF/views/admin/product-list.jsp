<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<div class="card">
    <div class="card-body">

        <div class="d-flex justify-content-between align-items-center mb-3">
            <form method="get" action="<c:url value='/admin/dashboard/products/search' />" class="d-flex" style="gap:10px;">
                <input type="text" name="keyword" class="form-control" placeholder="Tìm kiếm sản phẩm..." value="${keyword}">
                <button class="btn btn-outline-primary" type="submit"><i class="fas fa-search"></i></button>
            </form>

            <a href="<c:url value='/admin/dashboard/products/showForm' />" class="btn btn-primary">
                <i class="fas fa-plus"></i> Thêm sản phẩm
            </a>
        </div>

        <table class="table table-striped align-middle text-center">
            <thead class="table-dark">
            <tr>
                <th>Hình ảnh</th>
                <th>Tên sản phẩm</th>
                <th>Giá</th>
                <th>Tồn kho</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
            </tr>
            </thead>
            <tbody>
            <c:choose>
                <c:when test="${products != null && not empty products}">
                    <c:forEach var="p" items="${products}">
                        <tr>
                            <td>
                                <img src="${not empty p.image ? p.image : 'https://via.placeholder.com/50'}"
                                     alt="image" width="50" height="50" class="rounded">
                            </td>
                            <td><strong>${p.title}</strong></td>
                            <td>${p.price}</td>
                            <td>${p.stock}</td>
                            <td>
                                <span class="badge ${p.isActive ? 'bg-success' : 'bg-secondary'}">
                                        ${p.isActive ? 'Hoạt động' : 'Khóa'}
                                </span>
                            </td>
                            <td>
                                <a href="<c:url value='/admin/dashboard/products/showForm'><c:param name='id' value='${p.id}'/></c:url>"
                                   class="btn btn-warning btn-sm text-white">
                                    <i class="fas fa-edit"></i>
                                </a>
                                <a href="<c:url value='/admin/dashboard/products/delete'><c:param name='productId' value='${p.id}'/></c:url>"
                                   class="btn btn-danger btn-sm"
                                   onclick="return confirm('Xác nhận xóa sản phẩm này?');">
                                    <i class="fas fa-trash"></i>
                                </a>
                            </td>
                        </tr>
                    </c:forEach>
                </c:when>
                <c:otherwise>
                    <tr>
                        <td colspan="6" class="text-muted py-4">Không có sản phẩm nào</td>
                    </tr>
                </c:otherwise>
            </c:choose>
            </tbody>
        </table>
    </div>
</div>
