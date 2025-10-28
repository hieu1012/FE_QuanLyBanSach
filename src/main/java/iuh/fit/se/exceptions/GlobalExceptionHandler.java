package iuh.fit.se.exceptions;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.ModelAndView;

import java.time.LocalDateTime;
import java.util.LinkedHashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

	// === XỬ LÝ LỖI EMPLOYEE ===
	@ExceptionHandler(EmployeeServiceException.class)
	public ModelAndView handleEmployeeException(EmployeeServiceException ex, HttpServletRequest request) {
		return buildErrorPage(ex.getMessage(), request);
	}

	// === XỬ LÝ LỖI PRODUCT (THÊM MỚI) ===
	@ExceptionHandler(ProductServiceException.class)
	public ModelAndView handleProductException(ProductServiceException ex, HttpServletRequest request) {
		return buildErrorPage(ex.getMessage(), request);
	}

	// === XỬ LÝ TẤT CẢ LỖI KHÁC (500, NullPointer, v.v.) ===
	@ExceptionHandler(Exception.class)
	public ModelAndView handleGlobalException(Exception ex, HttpServletRequest request) {
		ex.printStackTrace(); // Log chi tiết
		String message = ex.getMessage();
		if (message == null || message.isBlank()) {
			message = "Đã xảy ra lỗi hệ thống. Vui lòng thử lại sau.";
		}
		return buildErrorPage(message, request);
	}

	// === HELPER: Tạo trang lỗi JSP chung ===
	private ModelAndView buildErrorPage(String message, HttpServletRequest request) {
		ModelAndView model = new ModelAndView();
		model.addObject("url", request.getRequestURL().toString());
		model.addObject("message", message);
		model.addObject("timestamp", LocalDateTime.now());
		model.setViewName("error"); // → src/main/webapp/WEB-INF/views/error.jsp
		return model;
	}
}