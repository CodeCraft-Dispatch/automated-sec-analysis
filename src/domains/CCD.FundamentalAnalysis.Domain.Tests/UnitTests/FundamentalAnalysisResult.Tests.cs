using Ardalis.Result;

namespace CCD.FundamentalAnalysis.Domain.Tests.UnitTests;

[Trait("Category", "Domain")]
[Trait("Category", "Unit")]
public class FundamentalAnalysisResultTests
{
    [Fact]
    public void ShouldCreateFundamentalAnalysisResult()
    {
        // Arrange
        var company = Company.Create(
            name: "Company Name",
            cik: 1234567890,
            factFileId: "FactFileId");
        var fundamentals = Fundamentals.Create(
            grossMargin: 0.5m,
            revenueGrowth: 0.2m,
            operatingMargin: 0.4m,
            netProfitMargin: 0.5m,
            returnOnAssets: 0.6m,
            returnOnEquity: 0.7m,
            debtToEquityRatio: 0.3m);
        var thresholds = FundamentalAnalysisThresholds.Create(
            highGrowth: 0.1m,
            profitableGrossMargin: 0.2m,
            profitableNetMargin: 0.3m,
            stableDebtToEquity: 0.4m,
            strongROA: 0.5m,
            strongROE: 0.6m);

        // Act
        var result = FundamentalAnalysisResult.Create(
            company,
            fundamentals,
            thresholds);

        // Assert
        Assert.True(result.Status == ResultStatus.Created);
        Assert.NotNull(result.Value);
        Assert.Equal(company.Value, result.Value.Company);
        Assert.Equal(fundamentals.Value, result.Value.Fundamentals);
        Assert.True(result.Value.IsHighGrowth());
        Assert.True(result.Value.IsProfitableGrossMargin());
        Assert.True(result.Value.IsProfitableNetMargin());
        Assert.True(result.Value.IsStableDebtToEquity());
        Assert.True(result.Value.HasStrongROA());
        Assert.True(result.Value.HasStrongROE());
        Assert.True(result.Value.HasStrongPerformance());

        Assert.Equal(
            $"{fundamentals.Value}," +
            $"{thresholds.Value}, " +
            $"High Growth: True, " +
            $"Profitable Gross Margin: True, " +
            $"Profitable Net Margin: True, " +
            $"Stable Debt to Equity: True, " +
            $"Strong ROA: True, " +
            $"Strong ROE: True, " +
            $"Strong Performance: True",
            result.Value.ToString());
    }
}