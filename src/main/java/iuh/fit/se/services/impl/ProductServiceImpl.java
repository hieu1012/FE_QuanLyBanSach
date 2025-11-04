package iuh.fit.se.services.impl;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import iuh.fit.se.entities.Product;
import iuh.fit.se.services.ProductService;
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
public class ProductServiceImpl implements ProductService {

    private final RestClient restClient;
    private final ObjectMapper objectMapper;
    private static final String ENDPOINT = "http://localhost:8081/api";

    @Autowired
    public ProductServiceImpl(RestClient restClient, ObjectMapper objectMapper) {
        this.restClient = restClient;
        this.objectMapper = objectMapper;
    }

    @Override
    public ApiResponse findById(int id) {
        return restClient.get()
                .uri(ENDPOINT + "/products/{id}", id)
                .accept(MediaType.APPLICATION_JSON)
                .exchange((request, response) -> {
                    try (InputStream body = response.getBody()) {
                        if (body.available() == 0)
                            return ApiResponse.noContent();

                        ApiResponse apiResponse = objectMapper.readValue(body, ApiResponse.class);
                        apiResponse.setData(objectMapper.convertValue(apiResponse.getData(), new TypeReference<Product>() {}));
                        return apiResponse;
                    } catch (IOException e) {
                        e.printStackTrace();
                        return ApiResponse.error("Failed to read product: " + e.getMessage());
                    }
                });
    }

    @Override
    public ApiResponse findAll() {
        return restClient.get()
                .uri(ENDPOINT + "/products")
                .accept(MediaType.APPLICATION_JSON)
                .exchange((request, response) -> {
                    try (InputStream body = response.getBody()) {
                        if (body.available() == 0)
                            return ApiResponse.noContent();

                        ApiResponse apiResponse = objectMapper.readValue(body, ApiResponse.class);
                        apiResponse.setData(objectMapper.convertValue(apiResponse.getData(), new TypeReference<List<Product>>() {}));
                        return apiResponse;
                    } catch (IOException e) {
                        e.printStackTrace();
                        return ApiResponse.error("Failed to read product list: " + e.getMessage());
                    }
                });
    }

    @Override
    public ApiResponse save(Product product) {
        return restClient.post()
                .uri(ENDPOINT + "/products")
                .contentType(MediaType.APPLICATION_JSON)  // thêm dòng này
                .accept(MediaType.APPLICATION_JSON)
                .body(product)
                .exchange((request, response) -> {
                    try (InputStream body = response.getBody()) {
                        if (body.available() == 0)
                            return ApiResponse.noContent();
                        return objectMapper.readValue(body, ApiResponse.class);
                    } catch (IOException e) {
                        e.printStackTrace();
                        return ApiResponse.error("Failed to save product: " + e.getMessage());
                    }
                });
    }

    @Override
    public ApiResponse update(int id, Product product) {
        return restClient.put()
                .uri(ENDPOINT + "/products/{id}", id)
                .contentType(MediaType.APPLICATION_JSON)
                .accept(MediaType.APPLICATION_JSON)
                .body(product)
                .exchange((request, response) -> {
                    try (InputStream body = response.getBody()) {
                        if (body.available() == 0)
                            return ApiResponse.noContent();
                        return objectMapper.readValue(body, ApiResponse.class);
                    } catch (IOException e) {
                        e.printStackTrace();
                        return ApiResponse.error("Failed to update product: " + e.getMessage());
                    }
                });
    }


    @Override
    public ApiResponse delete(int id) {
        return restClient.delete()
                .uri(ENDPOINT + "/products/{id}", id)
                .accept(MediaType.APPLICATION_JSON)
                .exchange((request, response) -> {
                    try (InputStream body = response.getBody()) {
                        if (body.available() == 0)
                            return ApiResponse.noContent();
                        return objectMapper.readValue(body, ApiResponse.class);
                    } catch (IOException e) {
                        e.printStackTrace();
                        return ApiResponse.error("Failed to delete product: " + e.getMessage());
                    }
                });
    }

    @Override
    public ApiResponse search(String keyword) {
        return restClient.get()
                .uri(ENDPOINT + "/products?keyword={keyword}", keyword)
                .accept(MediaType.APPLICATION_JSON)
                .exchange((request, response) -> {
                    try (InputStream body = response.getBody()) {
                        if (body.available() == 0)
                            return ApiResponse.noContent();

                        ApiResponse apiResponse = objectMapper.readValue(body, ApiResponse.class);
                        apiResponse.setData(objectMapper.convertValue(apiResponse.getData(), new TypeReference<List<Product>>() {}));
                        return apiResponse;
                    } catch (IOException e) {
                        e.printStackTrace();
                        return ApiResponse.error("Failed to search product list: " + e.getMessage());
                    }
                });
    }

    @Override
    public PageResponse<Product> findAllWithPaging(int page, int size, String sort) {
        String url = UriComponentsBuilder.fromHttpUrl(ENDPOINT + "/productsHasPage")
                .queryParam("page", page)
                .queryParam("size", size)
                .queryParam("sort", sort)
                .toUriString();

        return restClient.get()
                .uri(url)
                .accept(MediaType.APPLICATION_JSON)
                .exchange((request, response) -> {
                    try (InputStream is = response.getBody()) {
                        return objectMapper.readValue(is, new TypeReference<PageResponse<Product>>() {});
                    } catch (IOException e) {
                        e.printStackTrace();
                        return new PageResponse<>(Collections.emptyList(), 0, 0, 0, 0, true, true);
                    }
                });
    }

    @Override
    public ApiResponse findByCategory(int categoryId) {
        return restClient.get()
                .uri(ENDPOINT + "/products/category/{id}", categoryId)
                .accept(MediaType.APPLICATION_JSON)
                .exchange((request, response) -> {
                    try (InputStream body = response.getBody()) {
                        if (body.available() == 0)
                            return ApiResponse.noContent();

                        ApiResponse apiResponse = objectMapper.readValue(body, ApiResponse.class);
                        apiResponse.setData(objectMapper.convertValue(
                                apiResponse.getData(),
                                new com.fasterxml.jackson.core.type.TypeReference<List<Product>>() {}
                        ));
                        return apiResponse;
                    } catch (IOException e) {
                        e.printStackTrace();
                        return ApiResponse.error("Failed to read products by category: " + e.getMessage());
                    }
                });
    }

}
