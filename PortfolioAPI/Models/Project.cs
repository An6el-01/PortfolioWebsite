namespace PortfolioAPI.Models{
    public class Project 
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Organization { get; set; }
        public string? Description {get; set; }
        public string? ImageUrl { get; set; }
        public string? RepositoryUrl { get; set; }
        public string? TechStack { get; set; }
    }
}