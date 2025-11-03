<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
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
            background-color: #f5f7fa;
            overflow-x: hidden;
        }

        /* Sidebar */
        .sidebar {
            position: fixed;
            left: 0;
            top: 0;
            width: 260px;
            height: 100vh;
            background: linear-gradient(180deg, #2c3e50 0%, #34495e 100%);
            color: white;
            transition: all 0.3s ease;
            z-index: 1000;
            overflow-y: auto;
            box-shadow: 2px 0 10px rgba(0,0,0,0.1);
        }

        .sidebar.collapsed {
            width: 70px;
        }

        .sidebar-header {
            padding: 20px;
            text-align: center;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            background: rgba(0,0,0,0.2);
        }

        .sidebar-header .logo {
            font-size: 28px;
            margin-bottom: 5px;
        }

        .sidebar-header h3 {
            font-size: 18px;
            font-weight: 600;
            margin: 0;
            white-space: nowrap;
        }

        .sidebar.collapsed .sidebar-header h3 {
            display: none;
        }

        .user-profile {
            padding: 20px;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            text-align: center;
        }

        .user-avatar {
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-size: 24px;
            font-weight: bold;
            margin-bottom: 10px;
            border: 3px solid rgba(255,255,255,0.3);
        }

        .sidebar.collapsed .user-avatar {
            width: 40px;
            height: 40px;
            font-size: 16px;
        }

        .user-info {
            transition: all 0.3s;
        }

        .sidebar.collapsed .user-info {
            display: none;
        }

        .user-info h4 {
            font-size: 16px;
            margin: 5px 0;
            color: white;
        }

        .user-info .user-role {
            display: inline-block;
            padding: 3px 10px;
            background: rgba(255,255,255,0.2);
            border-radius: 12px;
            font-size: 11px;
            text-transform: uppercase;
        }

        .sidebar-menu {
            padding: 20px 0;
        }

        .menu-item {
            display: block;
            padding: 15px 25px;
            color: rgba(255,255,255,0.8);
            text-decoration: none;
            transition: all 0.3s;
            border-left: 3px solid transparent;
        }

        .menu-item:hover {
            background: rgba(255,255,255,0.1);
            color: white;
            text-decoration: none;
            border-left-color: #3498db;
        }

        .menu-item.active {
            background: rgba(52,152,219,0.3);
            color: white;
            border-left-color: #3498db;
        }

        .menu-item i {
            width: 25px;
            margin-right: 15px;
            font-size: 18px;
            text-align: center;
        }

        .sidebar.collapsed .menu-item span {
            display: none;
        }

        .sidebar.collapsed .menu-item {
            padding: 15px;
            text-align: center;
        }

        .main-content {
            margin-left: 260px;
            min-height: 100vh;
            transition: all 0.3s ease;
        }

        .main-content.expanded {
            margin-left: 70px;
        }

        .top-navbar {
            background: white;
            padding: 15px 30px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.08);
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: sticky;
            top: 0;
            z-index: 999;
        }

        .toggle-btn {
            background: #3498db;
            color: white;
            border: none;
            padding: 10px 15px;
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.3s;
        }

        .toggle-btn:hover {
            background: #2980b9;
        }

        .top-navbar .page-title {
            font-size: 24px;
            color: #2c3e50;
            font-weight: 600;
            margin: 0;
        }

        .top-navbar .navbar-actions {
            display: flex;
            gap: 15px;
            align-items: center;
        }

        .navbar-actions .btn-icon {
            background: #f5f7fa;
            border: none;
            width: 40px;
            height: 40px;
            border-radius: 50%;
            cursor: pointer;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .navbar-actions .btn-icon:hover {
            background: #e8ebed;
        }

        .content-wrapper {
            padding: 30px;
        }

        .breadcrumb-custom {
            background: white;
            padding: 15px 20px;
            border-radius: 8px;
            margin-bottom: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        }

        .breadcrumb-custom a {
            color: #3498db;
            text-decoration: none;
        }

        .breadcrumb-custom a:hover {
            text-decoration: underline;
        }

        /* Product Styles */
        .product-header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
            background: white;
            padding: 20px;
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
        }

        .search-box {
            display: flex;
            gap: 10px;
            flex: 1;
            max-width: 400px;
        }

        .table-container {
            background: white;
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
            overflow: hidden;
        }

        .product-img {
            width: 50px;
            height: 50px;
            object-fit: cover;
            border-radius: 8px;
        }

        .btn-action {
            padding: 6px 12px;
            margin: 0 3px;
            border-radius: 5px;
            text-decoration: none;
            font-size: 13px;
            transition: all 0.3s;
            display: inline-block;
        }

        .btn-edit {
            background: #f39c12;
            color: white;
        }

        .btn-edit:hover {
            background: #e67e22;
            color: white;
            text-decoration: none;
        }

        .btn-delete {
            background: #e74c3c;
            color: white;
        }

        .btn-delete:hover {
            background: #c0392b;
            color: white;
            text-decoration: none;
        }

        /* Dashboard Stats */
        .stats-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 20px;
            margin-bottom: 30px;
        }

        .stat-card {
            background: white;
            padding: 25px;
            border-radius: 10px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.08);
            transition: transform 0.3s;
        }

        .stat-card:hover {
            transform: translateY(-5px);
        }

        .stat-icon {
            width: 60px;
            height: 60px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 28px;
            margin-bottom: 15px;
        }

        .stat-card.blue .stat-icon {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
        }

        .stat-title {
            color: #7f8c8d;
            font-size: 14px;
            margin-bottom: 8px;
            text-transform: uppercase;
        }

        .stat-value {
            font-size: 32px;
            font-weight: 700;
            color: #2c3e50;
        }

        @media (max-width: 768px) {
            .sidebar {
                width: 70px;
            }

            .main-content {
                margin-left: 70px;
            }
        }

        .sidebar::-webkit-scrollbar {
            width: 6px;
        }

        .sidebar::-webkit-scrollbar-track {
            background: rgba(0,0,0,0.1);
        }

        .sidebar::-webkit-scrollbar-thumb {
            background: rgba(255,255,255,0.3);
            border-radius: 3px;
        }
    </style>
</head>
<body>

<!-- Sidebar -->
<div class="sidebar" id="sidebar">
    <div class="sidebar-header">
        <div class="logo">🏢</div>
        <h3>Admin Panel</h3>
    </div>

    <div class="user-profile">
        <div class="user-avatar">
            ${currentUser.fullName.substring(0,1).toUpperCase()}
        </div>
        <div class="user-info">
            <h4>${currentUser.fullName}</h4>
            <span class="user-role">${currentUser.role}</span>
        </div>
    </div>

    <div class="sidebar-menu">
        <a href="<c:url value='/admin/dashboard' />" class="menu-item ${currentPage == 'dashboard' ? 'active' : ''}">
            <i class="fas fa-home"></i>
            <span>Dashboard</span>
        </a>

        <a href="<c:url value='/admin/dashboard/products' />" class="menu-item ${currentPage == 'products' ? 'active' : ''}">
            <i class="fas fa-box"></i>
            <span>Sản phẩm</span>
        </a>

        <a href="<c:url value='/admin/dashboard/categories' />" class="menu-item ${currentPage == 'categories' ? 'active' : ''}">
            <i class="fas fa-folder"></i>
            <span>Danh mục</span>
        </a>

        <a href="<c:url value='/admin/dashboard/users' />" class="menu-item ${currentPage == 'users' ? 'active' : ''}">
            <i class="fas fa-users"></i>
            <span>Người dùng</span>
        </a>

        <a href="<c:url value='/admin/logout' />" class="menu-item">
            <i class="fas fa-sign-out-alt"></i>
            <span>Đăng xuất</span>
        </a>
    </div>
</div>

<!-- Main Content -->
<div class="main-content" id="mainContent">
    <div class="top-navbar">
        <div style="display: flex; align-items: center; gap: 20px;">
            <button class="toggle-btn" onclick="toggleSidebar()">
                <i class="fas fa-bars"></i>
            </button>
            <h1 class="page-title">${pageTitle}</h1>
        </div>

        <div class="navbar-actions">
            <button class="btn-icon" title="Thông báo">
                <i class="fas fa-bell"></i>
            </button>
            <button class="btn-icon" title="Hồ sơ">
                <i class="fas fa-user"></i>
            </button>
        </div>
    </div>

    <div class="content-wrapper">
        <div class="breadcrumb-custom">
            <i class="fas fa-home"></i>
            <a href="<c:url value='/admin/dashboard' />">Dashboard</a> / ${pageTitle}
        </div>

        <!-- DYNAMIC CONTENT -->
        <c:choose>
            <%-- DASHBOARD PAGE --%>
            <c:when test="${currentPage == 'dashboard'}">
                <div class="stats-grid">
                    <div class="stat-card blue">
                        <div class="stat-icon">
                            <i class="fas fa-box"></i>
                        </div>
                        <div class="stat-title">Tổng sản phẩm</div>
                        <div class="stat-value">1,234</div>
                    </div>
                </div>
                <p style="text-align: center; color: #7f8c8d;">Chào mừng đến với Admin Dashboard!</p>
            </c:when>

            <%-- PRODUCTS PAGE --%>
            <c:when test="${currentPage == 'products'}">
                <!-- Product Header -->
                <div class="product-header">
                    <div class="search-box">
                        <form method="get" action="<c:url value='/admin/dashboard/products/search' />" style="display: flex; gap: 10px; width: 100%;">
                            <input type="text" name="keyword" value="${keyword}"
                                   placeholder="🔍 Tìm kiếm sản phẩm..."
                                   class="form-control" />
                            <button type="submit" class="btn btn-secondary">Tìm kiếm</button>
                        </form>
                    </div>
                    <a href="<c:url value='/admin/dashboard/products/showForm' />" class="btn btn-primary">
                        <i class="fas fa-plus"></i> Thêm sản phẩm
                    </a>
                </div>

                <!-- Product Table -->
                <div class="table-container">
                    <table class="table table-hover mb-0">
                        <thead style="background: #f8f9fa;">
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
                        <c:if test="${products != null && not empty products}">
                            <c:forEach var="p" items="${products}">
                                <tr>
                                    <td>
                                        <img src="${not empty p.image ? p.image : 'https://via.placeholder.com/50'}"
                                             class="product-img" alt="Product">
                                    </td>
                                    <td><strong><c:out value="${p.title}" /></strong></td>
                                    <td><strong>$${p.price}</strong></td>
                                    <td>${p.stock}</td>
                                    <td>
                                            <span class="badge ${p.isActive ? 'bg-success' : 'bg-secondary'}">
                                                    ${p.isActive ? 'Hoạt động' : 'Khóa'}
                                            </span>
                                    </td>
                                    <td>
                                        <a href="<c:url value='/admin/dashboard/products/update'><c:param name='productId' value='${p.id}' /></c:url>"
                                           class="btn-action btn-edit">
                                            <i class="fas fa-edit"></i> Sửa
                                        </a>
                                        <a href="<c:url value='/admin/dashboard/products/delete'><c:param name='productId' value='${p.id}' /></c:url>"
                                           onclick="return confirm('Bạn có chắc muốn xóa?');"
                                           class="btn-action btn-delete">
                                            <i class="fas fa-trash"></i> Xóa
                                        </a>
                                    </td>
                                </tr>
                            </c:forEach>
                        </c:if>
                        </tbody>
                    </table>

                    <c:if test="${products == null || empty products}">
                        <div style="padding: 40px; text-align: center; color: #7f8c8d;">
                            <i class="fas fa-inbox" style="font-size: 48px; margin-bottom: 15px; display: block;"></i>
                            Không tìm thấy sản phẩm nào
                        </div>
                    </c:if>
                </div>
            </c:when>

            <%-- OTHER PAGES --%>
            <c:otherwise>
                <div class="alert alert-info">
                    <i class="fas fa-info-circle"></i> Trang đang được phát triển...
                </div>
            </c:otherwise>
        </c:choose>
    </div>
</div>

<script>
    function toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.getElementById('mainContent');

        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('expanded');

        const isCollapsed = sidebar.classList.contains('collapsed');
        localStorage.setItem('sidebarCollapsed', isCollapsed);
    }

    window.addEventListener('DOMContentLoaded', function() {
        const isCollapsed = localStorage.getItem('sidebarCollapsed') === 'true';
        if (isCollapsed) {
            document.getElementById('sidebar').classList.add('collapsed');
            document.getElementById('mainContent').classList.add('expanded');
        }
    });

    if (window.innerWidth <= 768) {
        document.getElementById('sidebar').classList.add('collapsed');
        document.getElementById('mainContent').classList.add('expanded');
    }
</script>

</body>
</html>