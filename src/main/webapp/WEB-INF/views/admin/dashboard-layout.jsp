<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%--@elvariable id="pageTitle" type="java.lang.String"--%>
<%--@elvariable id="currentUser" type="java.util.Map"--%>
<%--@elvariable id="currentPage" type="java.lang.String"--%>
<%--@elvariable id="contentPage" type="java.lang.String"--%>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>${pageTitle} - Admin Dashboard</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" rel="stylesheet">
</head>

<body style="background:#f5f7fa; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">

<!-- Sidebar -->
<div class="d-flex">
    <div class="bg-dark text-white p-3" style="width:250px; min-height:100vh;">
        <h4 class="text-center mb-4">Admin Panel</h4>

        <div class="text-center mb-3">
            <div class="rounded-circle bg-primary d-inline-flex align-items-center justify-content-center"
                 style="width:60px; height:60px; font-size:24px;">
                ${currentUser.fullName.substring(0,1).toUpperCase()}
            </div>
            <p class="mt-2 mb-0">${currentUser.fullName}</p>
            <span class="badge bg-secondary">${currentUser.role}</span>
        </div>

        <hr/>

        <ul class="nav flex-column">
            <li class="nav-item">
                <a class="nav-link text-white ${currentPage == 'dashboard' ? 'fw-bold text-info' : ''}"
                   href="<c:url value='/admin/dashboard' />">
                    <i class="fas fa-home"></i> Dashboard
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link text-white ${currentPage == 'products' ? 'fw-bold text-info' : ''}"
                   href="<c:url value='/admin/dashboard/products' />">
                    <i class="fas fa-box"></i> Sản phẩm
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link text-white ${currentPage == 'categories' ? 'fw-bold text-info' : ''}"
                   href="<c:url value='/admin/dashboard/categories' />">
                    <i class="fas fa-folder"></i> Danh mục
                </a>
            </li>
            <li class="nav-item">
                <a class="nav-link text-white" href="<c:url value='/admin/logout' />">
                    <i class="fas fa-sign-out-alt"></i> Đăng xuất
                </a>
            </li>
        </ul>
    </div>

    <!-- Main Content -->
    <div class="flex-grow-1 p-4">
        <h2>${pageTitle}</h2>
        <hr/>

        <!-- Include content dynamically -->
        <jsp:include page="${contentPage}" />
    </div>
</div>

</body>
</html>
