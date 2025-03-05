namespace backend.Classes
{
    public abstract class BaseEntity
    {
        public int Id { get; init; }
        public DateTime CreatedAt { get; init; }
        public DateTime? UpdatedAt { get; set; }

        protected BaseEntity()
        {
            CreatedAt = DateTime.UtcNow;
        }
    }
}
