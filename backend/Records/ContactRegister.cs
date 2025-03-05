namespace backend.Records
{
    public record ContactRegister(
        string Name,
        string Email,
        string CellPhone,
        string Phone,
        bool IsFavorite
    );

    public record ContactUpdate(
        int Id,
        string Name,
        string Email,
        string CellPhone,
        string Phone,
        bool IsFavorite,
        bool IsActive
    );

    public record ContactResponse(
        int Id,
        string Name,
        string Email,
        string CellPhone,
        string Phone,
        bool IsFavorite,
        bool IsActive,
        DateTime CreatedAt,
        DateTime? UpdatedAt
    );
}