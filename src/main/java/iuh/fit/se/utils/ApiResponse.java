package iuh.fit.se.utils;

import java.util.Collections;
import java.util.Map;

public class ApiResponse {

	private int status;

	private Map<String, Object> errors = null;

	private Object data;

	private String message;

	public ApiResponse() {
	}

	public ApiResponse(int status,Map<String, Object> errors,
			Object data,String message) {
		this.status = status;
		this.errors = errors;
		this.data = data;
		this.message = message;
	}

	public int getStatus() {
		return status;
	}

	public void setStatus(int status) {
		this.status = status;
	}

	public Map<String, Object> getErrors() {
		return errors;
	}

	public void setErrors(Map<String, Object> errors) {
		this.errors = errors;
	}

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	@Override
	public String toString() {
		return "ApiResponse [status=" + status + ", errors=" + errors + ", data=" + data + ", message=" + message + "]";
	}

    public static ApiResponse ok(Object data) {
        return new ApiResponse(200, null, data, null);
    }

    public static ApiResponse noContent() {
        return new ApiResponse(204, null, Collections.emptyList(), null);
    }

    public static ApiResponse badRequest(Map<String, Object> errors, String message) {
        return new ApiResponse(400, errors, null, message);
    }

    public static ApiResponse error(String message) {
        return new ApiResponse(500, null, null, message);
    }

}
