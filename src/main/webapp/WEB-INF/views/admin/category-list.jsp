<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<div class="card">
    <div class="card-body">

        <div class="d-flex justify-content-between align-items-center mb-3">
            <form method="get" action="<c:url value='/admin/dashboard/categories/search' />" class="d-flex" style="gap:10px;">
                <input type="text" name="keyword" class="form-control" placeholder="Tìm kiếm danh mục..." value="${keyword}">
                <button class="btn btn-outline-primary" type="submit"><i class="fas fa-search"></i></button>
            </form>

            <a href="<c:url value='/admin/dashboard/categories/showForm' />" class="btn btn-primary">
                <i class="fas fa-plus"></i> Thêm danh mục
            </a>
        </div>

        <table class="table table-striped align-middle text-center">
            <thead class="table-dark">
            <tr>
                <th>ID</th>
                <th>Tên danh mục</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
            </tr>
            </thead>
            <tbody>
            <c:choose>
                <c:when test="${categories != null && not empty categories}">
                    <c:forEach var="c" items="${categories}">
                        <tr>
                            <td>${c.id}</td>
                            <td><strong>${c.name}</strong></td>
                            <td>
                                <span class="badge ${c.isActive ? 'bg-success' : 'bg-secondary'}">
                                        ${c.isActive ? 'Hoạt động' : 'Khóa'}
                                </span>
                            </td>
                            <td>
                                <a href="<c:url value='/admin/dashboard/categories/showForm'><c:param name='id' value='${c.id}'/></c:url>"
                                   class="btn btn-warning btn-sm text-white">
                                    <i class="fas fa-edit"></i>
                                </a>
                                <a href="<c:url value='/admin/dashboard/categories/delete'><c:param name='categoryId' value='${c.id}'/></c:url>"
                                   class="btn btn-danger btn-sm"
                                   onclick="return confirm('Xác nhận xóa danh mục này?');">
                                    <i class="fas fa-trash"></i>
                                </a>
                            </td>
                        </tr>
                    </c:forEach>
                </c:when>
                <c:otherwise>
                    <tr>
                        <td colspan="5" class="text-muted py-4">Không có danh mục nào</td>
                    </tr>
                </c:otherwise>
            </c:choose>
            </tbody>
        </table>
    </div>
</div>
