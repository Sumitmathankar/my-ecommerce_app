using E_Commerce_App.DTOs.Products;
using E_Commerce_App.Models;
using E_Commerce_App.Repositories.Interfaces;
using E_Commerce_App.Services.Interface;

namespace E_Commerce_App.Services.Implmentation
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _productRepository;

        public ProductService(IProductRepository productRepository)
        {
            _productRepository = productRepository;
        }

        public async Task<IEnumerable<ProductDTO>> GetAllAsync()
        {
            var products = await _productRepository.GetAllAsync();
            return products.Select(p => new ProductDTO
            {
                ProductId = p.ProductId,
                Name = p.Name,
                Description = p.Description,
                Price = p.Price,
                StockQuantity = p.StockQuantity,
                Images = p.ProductImages.Select(img => img.ImageUrl).ToList()
            });
        }

        public async Task<ProductDTO?> GetByIdAsync(int id)
        {
            var product = await _productRepository.GetByIdAsync(id);
            if (product == null) return null;

            return new ProductDTO
            {
                ProductId = product.ProductId,
                Name = product.Name,
                Description = product.Description,
                Price = product.Price,
                StockQuantity = product.StockQuantity
            };
        }

        public async Task<ProductDTO> CreateAsync(ProductCreateUpdateDTO dto)
        {
            var newProduct = new Product
            {
                Name = dto.Name,
                Description = dto.Description,
                Price = dto.Price,
                StockQuantity = dto.StockQuantity,
                CategoryId = dto.CategoryId,
                CreatedAt = DateTime.UtcNow
            };

            var created = await _productRepository.AddAsync(newProduct);

            return new ProductDTO
            {
                ProductId = created.ProductId,
                Name = created.Name,
                Description = created.Description,
                Price = created.Price,
                StockQuantity = created.StockQuantity
            };
        }

        public async Task<ProductDTO?> UpdateAsync(int id, ProductCreateUpdateDTO dto)
        {
            var product = await _productRepository.GetByIdAsync(id);
            if (product == null) return null;

            product.Name = dto.Name;
            product.Description = dto.Description;
            product.Price = dto.Price;
            product.StockQuantity = dto.StockQuantity;
            product.CategoryId = dto.CategoryId;

            var updated = await _productRepository.UpdateAsync(product);

            return new ProductDTO
            {
                ProductId = updated.ProductId,
                Name = updated.Name,
                Description = updated.Description,
                Price = updated.Price,
                StockQuantity = updated.StockQuantity
            };
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var product = await _productRepository.GetByIdAsync(id);
            if (product == null) return false;

            await _productRepository.DeleteAsync(id);
            return true;
        }

    }
}
