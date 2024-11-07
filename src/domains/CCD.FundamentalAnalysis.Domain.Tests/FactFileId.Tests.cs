using Ardalis.Result;

namespace CCD.FundamentalAnalysis.Domain.Tests;

[Trait("Category", "Domain")]
[Trait("Category", "Unit")]
public class FactFileIdTests
{
    [Fact]
    public void ShouldReturnValidationErrorOnEmptyValue()
    {
        var result = FactFileId.Create(string.Empty);

        Assert.Equal(ResultStatus.Invalid, result.Status);
        Assert.Single(result.ValidationErrors);
        Assert.Equal("FactFileId cannot be empty", result.ValidationErrors.First().ErrorMessage);
    }

    [Fact]
    public void ShouldCreateFactFileId()
    {
        var result = FactFileId.Create("123");

        Assert.Equal(ResultStatus.Created, result.Status);
        Assert.Equal("123", result.Value);
    }

    [Fact]
    public void ShouldImplicitlyConvertFactFileIdToString()
    {
        FactFileId id = FactFileId.Create("123").Value;

        Assert.Equal("123", id);
    }

    [Fact]
    public void ShouldReturnStringValue()
    {
        var id = FactFileId.Create("123").Value;

        Assert.Equal("123", id.ToString());
    }
}