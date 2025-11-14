namespace E_Commerce_App.DTOs.Products
{
    // For returning data
    public class ProductDTO
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public int StockQuantity { get; set; }
        public List<string> Images { get; set; } = new();
    }

    // For creating/updating
    public class ProductCreateUpdateDTO
    {
        public string Name { get; set; }
        public string? Description { get; set; }
        public decimal Price { get; set; }
        public int StockQuantity { get; set; }
        public int? CategoryId { get; set; }
    }
}
