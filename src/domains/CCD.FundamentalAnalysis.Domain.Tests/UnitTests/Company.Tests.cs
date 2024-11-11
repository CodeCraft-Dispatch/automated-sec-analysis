using Ardalis.Result;

namespace CCD.FundamentalAnalysis.Domain.Tests.UnitTests;

[Trait("Category", "Domain")]
[Trait("Category", "Unit")]
public class CompanyTests
{
    [Fact]
    public void ShouldCreateCompany()
    {
        // Arrange
        var name = "Company Name";
        var cik = 1234567890UL;
        var factFileId = "FactFileId";

        // Act
        var result = Company.Create(name, cik, factFileId);

        // Assert
        Assert.True(result.Status == ResultStatus.Created);
        Assert.NotNull(result.Value);
        Assert.Equal(name, result.Value.Name);
        Assert.Equal(cik, result.Value.Cik.Value);
        Assert.Equal(factFileId, result.Value.FactFileId.Value);
    }

    [Fact]
    public void ShouldNotCreateCompanyWhenNameIsMissing()
    {
        // Arrange
        var name = string.Empty;
        var cik = 1234567890UL;
        var factFileId = "FactFileId";

        // Act
        var result = Company.Create(name, cik, factFileId);

        // Assert
        Assert.True(result.Status == ResultStatus.Invalid);
        Assert.NotNull(result.ValidationErrors);
        Assert.Contains(result.ValidationErrors, e => e.ErrorMessage == "Name is required");
    }
}