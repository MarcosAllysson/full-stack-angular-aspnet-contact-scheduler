namespace backend.Classes
{
    public class Contact : BaseEntity
    {
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string CellPhone { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public bool IsFavorite { get; set; } = false;
        public bool IsActive { get; set; } = true;

        public Contact() {}

        public Contact(string name, string email, string cellPhone, string phone, bool isFavorite)
        {
            Name = name;
            Email = email;
            CellPhone = cellPhone;
            Phone = phone;
            IsFavorite = isFavorite;
        }

        public void Update(string name, string email, string cellPhone, string phone, bool isFavorite, bool isActive)
        {
            Name = name;
            Email = email;
            CellPhone = cellPhone;
            Phone = phone;
            IsFavorite = isFavorite;
            IsActive = isActive;
            UpdatedAt = DateTime.UtcNow;
        }

        public void Activate()
        {
            IsActive = true;
            UpdatedAt = DateTime.UtcNow;
        }

        public void Deactivate()
        {
            IsActive = false;
            UpdatedAt = DateTime.UtcNow;
        }

        public void ToggleFavorite()
        {
            IsFavorite = !IsFavorite;
            UpdatedAt = DateTime.UtcNow;
        }
    }
}
