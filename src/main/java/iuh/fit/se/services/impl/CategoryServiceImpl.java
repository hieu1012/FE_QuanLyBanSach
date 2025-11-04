package iuh.fit.se.services.impl;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import iuh.fit.se.entities.Category;
import iuh.fit.se.services.CategoryService;
import iuh.fit.se.utils.ApiResponse;
import iuh.fit.se.utils.PageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;
import java.io.InputStream;
import java.util.Collections;
import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final RestClient restClient;
    private final ObjectMapper objectMapper;
    private static final String ENDPOINT = "http://localhost:8081/api";

    @Autowired
    public CategoryServiceImpl(RestClient restClient, ObjectMapper objectMapper) {
        this.restClient = restClient;
        this.objectMapper = objectMapper;
    }

    @Override
    public ApiResponse findById(int id) {
        return restClient.get()
                .uri(ENDPOINT + "/categories/{id}", id)
                .accept(MediaType.APPLICATION_JSON)
                .exchange((request, response) -> {
                    try (InputStream body = response.getBody()) {
                        if (body.available() == 0)
                            return ApiResponse.noContent();

                        ApiResponse apiResponse = objectMapper.readValue(body, ApiResponse.class);
                        apiResponse.setData(objectMapper.convertValue(apiResponse.getData(), new TypeReference<Category>() {}));
                        return apiResponse;
                    } catch (IOException e) {
                        e.printStackTrace();
                        return ApiResponse.error("Failed to read category: " + e.getMessage());
                    }
                });
    }

    @Override
    public ApiResponse findAll() {
        return restClient.get()
                .uri(ENDPOINT + "/categories")
                .accept(MediaType.APPLICATION_JSON)
                .exchange((request, response) -> {
                    try (InputStream body = response.getBody()) {
                        if (body.available() == 0)
                            return ApiResponse.noContent();

                        ApiResponse apiResponse = objectMapper.readValue(body, ApiResponse.class);
                        apiResponse.setData(objectMapper.convertValue(apiResponse.getData(), new TypeReference<List<Category>>() {}));
                        return apiResponse;
                    } catch (IOException e) {
                        e.printStackTrace();
                        return ApiResponse.error("Failed to read category list: " + e.getMessage());
                    }
                });
    }

    @Override
    public ApiResponse save(Category category) {
        return restClient.post()
                .uri(ENDPOINT + "/categories")
                .accept(MediaType.APPLICATION_JSON)
                .body(category)
                .exchange((request, response) -> {
                    try (InputStream body = response.getBody()) {
                        if (body.available() == 0)
                            return ApiResponse.noContent();
                        return objectMapper.readValue(body, ApiResponse.class);
                    } catch (IOException e) {
                        e.printStackTrace();
                        return ApiResponse.error("Failed to save category: " + e.getMessage());
                    }
                });
    }

    @Override
    public ApiResponse update(int id, Category category) {
        return restClient.put()
                .uri(ENDPOINT + "/categories/{id}", id)
                .accept(MediaType.APPLICATION_JSON)
                .body(category)
                .exchange((request, response) -> {
                    try (InputStream body = response.getBody()) {
                        if (body.available() == 0)
                            return ApiResponse.noContent();
                        return objectMapper.readValue(body, ApiResponse.class);
                    } catch (IOException e) {
                        e.printStackTrace();
                        return ApiResponse.error("Failed to update category: " + e.getMessage());
                    }
                });
    }

    @Override
    public ApiResponse delete(int id) {
        return restClient.delete()
                .uri(ENDPOINT + "/categories/{id}", id)
                .accept(MediaType.APPLICATION_JSON)
                .exchange((request, response) -> {
                    try (InputStream body = response.getBody()) {
                        if (body.available() == 0)
                            return ApiResponse.noContent();
                        return objectMapper.readValue(body, ApiResponse.class);
                    } catch (IOException e) {
                        e.printStackTrace();
                        return ApiResponse.error("Failed to delete category: " + e.getMessage());
                    }
                });
    }

    @Override
    public ApiResponse search(String keyword) {
        return restClient.get()
                .uri(ENDPOINT + "/categories?keyword={keyword}", keyword)
                .accept(MediaType.APPLICATION_JSON)
                .exchange((request, response) -> {
                    try (InputStream body = response.getBody()) {
                        if (body.available() == 0)
                            return ApiResponse.noContent();

                        ApiResponse apiResponse = objectMapper.readValue(body, ApiResponse.class);
                        apiResponse.setData(objectMapper.convertValue(apiResponse.getData(), new TypeReference<List<Category>>() {}));
                        return apiResponse;
                    } catch (IOException e) {
                        e.printStackTrace();
                        return ApiResponse.error("Failed to search category list: " + e.getMessage());
                    }
                });
    }

    @Override
    public PageResponse<Category> findAllWithPaging(int page, int size, String sort) {
        String url = UriComponentsBuilder.fromHttpUrl(ENDPOINT + "/categoriesHasPage")
                .queryParam("page", page)
                .queryParam("size", size)
                .queryParam("sort", sort)
                .toUriString();

        return restClient.get()
                .uri(url)
                .accept(MediaType.APPLICATION_JSON)
                .exchange((request, response) -> {
                    try (InputStream is = response.getBody()) {
                        return objectMapper.readValue(is, new TypeReference<PageResponse<Category>>() {});
                    } catch (IOException e) {
                        e.printStackTrace();
                        return new PageResponse<>(Collections.emptyList(), 0, 0, 0, 0, true, true);
                    }
                });
    }
}
