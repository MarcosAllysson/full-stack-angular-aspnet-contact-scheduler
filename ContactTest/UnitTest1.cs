using backend.Classes;

namespace ContactTest
{
    public class UnitTest1
    {
        [Fact]
        public void Contact_DefaultConstructor_SetsDefaultValues()
        {
            // Arrange & Act
            var contact = new Contact();

            // Assert
            Assert.True(contact.IsActive);
            Assert.False(contact.IsFavorite);
            Assert.NotEqual(default, contact.CreatedAt);
            Assert.Null(contact.UpdatedAt);
        }

        [Fact]
        public void Contact_ParameterizedConstructor_SetsProperties()
        {
            // Arrange & Act
            var contact = new Contact("Test Name", "test@example.com", "11999998888", "1133334444", false);

            // Assert
            Assert.Equal("Test Name", contact.Name);
            Assert.Equal("test@example.com", contact.Email);
            Assert.Equal("11999998888", contact.CellPhone);
            Assert.Equal("1133334444", contact.Phone);
            Assert.True(contact.IsActive);
            Assert.False(contact.IsFavorite);
        }

        [Fact]
        public void Update_ShouldUpdatePropertiesAndUpdateTimestamp()
        {
            // Arrange
            var contact = new Contact("Test Name", "test@example.com", "11999998888", "1133334444", false);
            var initialTimestamp = contact.UpdatedAt;

            // Act
            contact.Update("Updated Name", "updated@example.com", "11999997777", "1133335555", false, false);

            // Assert
            Assert.Equal("Updated Name", contact.Name);
            Assert.Equal("updated@example.com", contact.Email);
            Assert.Equal("11999997777", contact.CellPhone);
            Assert.Equal("1133335555", contact.Phone);
            Assert.NotEqual(initialTimestamp, contact.UpdatedAt);
        }

        [Fact]
        public void Deactivate_ShouldSetIsActiveToFalse()
        {
            // Arrange
            var contact = new Contact();

            // Act
            contact.Deactivate();

            // Assert
            Assert.False(contact.IsActive);
            Assert.NotNull(contact.UpdatedAt);
        }

        [Fact]
        public void Activate_ShouldSetIsActiveToTrue()
        {
            // Arrange
            var contact = new Contact();
            contact.Deactivate();

            // Act
            contact.Activate();

            // Assert
            Assert.True(contact.IsActive);
        }

        [Fact]
        public void ToggleFavorite_ShouldToggleIsFavorite()
        {
            // Arrange
            var contact = new Contact();
            Assert.False(contact.IsFavorite);

            // Act
            contact.ToggleFavorite();

            // Assert
            Assert.True(contact.IsFavorite);

            // Act again
            contact.ToggleFavorite();

            // Assert again
            Assert.False(contact.IsFavorite);
        }
    }
}
