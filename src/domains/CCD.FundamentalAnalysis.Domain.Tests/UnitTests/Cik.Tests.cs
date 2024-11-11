using Ardalis.Result;

namespace CCD.FundamentalAnalysis.Domain.Tests.UnitTests;

[Trait("Category", "Domain")]
[Trait("Category", "Unit")]
public class CikTests
{
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
        var result = Cik.Create(123UL);

        Assert.Equal(ResultStatus.Created, result.Status);
        Assert.Equal(123UL, result.Value);
    }

    [Fact]
    public void ShouldImplicitlyConvertCikToLong()
    {
        Cik cik = Cik.Create(123UL).Value;

        Assert.Equal(123UL, cik);
    }

    [Fact]
    public void ShouldReturnLongValue()
    {
        var cik = Cik.Create(123UL).Value;

        Assert.Equal(123UL, cik.ToLong());
    }

    [Fact]
    public void ShouldReturnStringValue()
    {
        var cik = Cik.Create(123UL).Value;

        Assert.Equal("123", cik.ToString());
    }
}