using E_Commerce_App.DTOs.Products;

namespace E_Commerce_App.Services.Interface
{
    public interface IProductService
    {
        Task<IEnumerable<ProductDTO>> GetAllAsync();
        Task<ProductDTO?> GetByIdAsync(int id);
        Task<ProductDTO> CreateAsync(ProductCreateUpdateDTO dto);
        Task<ProductDTO?> UpdateAsync(int id, ProductCreateUpdateDTO dto);
        Task<bool> DeleteAsync(int id);
    }
}
