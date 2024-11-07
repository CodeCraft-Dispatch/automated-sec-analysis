using Ardalis.Result;

namespace CCD.FundamentalAnalysis.Domain.Tests;

[Trait("Category", "Domain")]
[Trait("Category", "Unit")]
public class CikTests
{
    [Fact]
    public void ShouldReturnValidationErrorOnZeroValue()
    {
        var result = Cik.Create(0);

        Assert.Equal(ResultStatus.Invalid, result.Status);
        Assert.Single(result.ValidationErrors);
        Assert.Equal("CIK cannot be less than or equal to 0", result.ValidationErrors.First().ErrorMessage);
    }

    [Fact]
    public void ShouldReturnValidationErrorOnNegativeValue()
    {
        var result = Cik.Create(-1);

        Assert.Equal(ResultStatus.Invalid, result.Status);
        Assert.Single(result.ValidationErrors);
        Assert.Equal("CIK cannot be less than or equal to 0", result.ValidationErrors.First().ErrorMessage);
    }

    [Fact]
    public void ShouldReturnValidationErrorOnGreaterThan10Digits()
    {
        var result = Cik.Create(10000000000);

        Assert.Equal(ResultStatus.Invalid, result.Status);
        Assert.Single(result.ValidationErrors);
        Assert.Equal("CIK cannot be greater than ten digits", result.ValidationErrors.First().ErrorMessage);
    }

    [Fact]
    public void ShouldCreateCik()
    {
        var result = Cik.Create(123L);

        Assert.Equal(ResultStatus.Created, result.Status);
        Assert.Equal(123L, result.Value);
    }

    [Fact]
    public void ShouldImplicitlyConvertCikToLong()
    {
        Cik cik = Cik.Create(123L).Value;

        Assert.Equal(123L, cik);
    }

    [Fact]
    public void ShouldReturnLongValue()
    {
        var cik = Cik.Create(123L).Value;

        Assert.Equal(123L, cik.ToLong());
    }

    [Fact]
    public void ShouldReturnStringValue()
    {
        var cik = Cik.Create(123L).Value;

        Assert.Equal("123", cik.ToString());
    }
}