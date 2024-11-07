using Ardalis.Result;

namespace CCD.FundamentalAnalysis.Domain.Tests;

[Trait("Category", "Domain")]
[Trait("Category", "Unit")]
public class PercentageTests
{
    [Fact]
    public void ShouldReturnSuccessResult() {
        // Arrange
        var value = 0.5m;

        // Act
        var result = Percentage.Create(value);

        // Assert
        Assert.Equal(ResultStatus.Created, result.Status);
        Assert.Equal(value, result.Value.Value);
    }

    [Fact]
    public void ShouldImplicitlyConvertPercentageToDecimal() {
        // Arrange
        var value = 0.5m;

        // Act
        var percentage = Percentage.Create(value).Value;

        // Assert
        Assert.Equal(value, percentage);
    }

    [Fact]
    public void ShouldReturnStringValue() {
        // Arrange
        var value = 0.5m;

        // Act
        var percentage = Percentage.Create(value).Value;

        // Assert
        Assert.Equal(value.ToString(), percentage.ToString());
    }

    [Fact]
    public void ShouldReturnPercentString() {
        // Arrange
        var value = 2.005m;

        // Act
        var percentage = Percentage.Create(value).Value;

        // Assert
        Assert.Equal($"200.500%", percentage.ToPercentString());
    }

    [Fact]
    public void ShouldReturnDecimalValue() {
        // Arrange
        var value = 0.5m;

        // Act
        var percentage = Percentage.Create(value).Value;

        // Assert
        Assert.Equal(value, percentage.ToDecimal());
    }
}
