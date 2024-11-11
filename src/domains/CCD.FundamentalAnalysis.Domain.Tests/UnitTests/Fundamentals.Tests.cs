using Ardalis.Result;

namespace CCD.FundamentalAnalysis.Domain.Tests.UnitTests;

[Trait("Category", "Domain")]
[Trait("Category", "Unit")]
public class FundamentalsTests
{
    [Fact]
    public void ShouldCreateFundamentals()
    {
        // Arrange
        var grossMargin = 0.5m;
        var revenueGrowth = 0.1m;
        var operatingMargin = 0.2m;
        var netProfitMargin = 0.3m;
        var returnOnAssets = 0.4m;
        var returnOnEquity = 0.5m;
        var debtToEquityRatio = 0.6m;

        // Act
        var result = Fundamentals.Create(
            grossMargin,
            revenueGrowth,
            operatingMargin,
            netProfitMargin,
            returnOnAssets,
            returnOnEquity,
            debtToEquityRatio);

        // Assert
        Assert.True(result.Status == ResultStatus.Created);
        Assert.NotNull(result.Value);
        Assert.Equal(grossMargin, result.Value.GrossMargin.Value);
        Assert.Equal(revenueGrowth, result.Value.RevenueGrowth.Value);
        Assert.Equal(operatingMargin, result.Value.OperatingMargin.Value);
        Assert.Equal(netProfitMargin, result.Value.NetProfitMargin.Value);
        Assert.Equal(returnOnAssets, result.Value.ReturnOnAssets.Value);
        Assert.Equal(returnOnEquity, result.Value.ReturnOnEquity.Value);
        Assert.Equal(debtToEquityRatio, result.Value.DebtToEquityRatio.Value);
    }
}