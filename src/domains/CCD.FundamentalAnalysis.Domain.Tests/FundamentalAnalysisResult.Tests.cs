using Ardalis.Result;

namespace CCD.FundamentalAnalysis.Domain.Tests;

[Trait("Category", "Domain")]
[Trait("Category", "Unit")]
public class FundamentalAnalysisResultTests
{
    [Fact]
    public void ShouldReturnSuccessResult() {
        // Arrange
        var companyName = "Company Name";
        var factFileId = Guid.NewGuid().ToString();
        var cik = 2L;
        var percentage = 0.5m;
        var lowPercentage = 0.1m;
        var highPercentage = 0.9m;
        var thresholds = FundamentalAnalysisThresholds.Create(
            highGrowth: lowPercentage,
            profitableGrossMargin: lowPercentage,
            profitableNetMargin: lowPercentage,
            stableDebtToEquity: highPercentage,
            strongROA: lowPercentage,
            strongROE: lowPercentage
        ).Value;

        // Act
        var result = FundamentalAnalysisResult.Create(
            companyName,
            factFileId,
            cik,
            percentage,
            percentage,
            percentage,
            percentage,
            percentage,
            percentage,
            percentage,
            thresholds
        );

        // Assert
        Assert.Equal(ResultStatus.Created, result.Status);

        var value = result.Value;
        Assert.Equal(companyName, value.CompanyName);
        Assert.Equal(factFileId, value.FactFileId);
        Assert.Equal(cik, value.Cik);
        Assert.Equal(percentage, value.GrossMargin);
        Assert.Equal(percentage, value.RevenueGrowth);
        Assert.Equal(percentage, value.OperatingMargin);
        Assert.Equal(percentage, value.NetProfitMargin);
        Assert.Equal(percentage, value.ROA);
        Assert.Equal(percentage, value.ROE);
        Assert.Equal(percentage, value.DebtToEquityRatio);

        Assert.Equal(
            $"Company: Company Name, " +
            $"Gross Margin: {value.GrossMargin.ToPercentString()}, " +
            $"Revenue Growth: {value.RevenueGrowth.ToPercentString()}, " +
            $"Operating Margin: {value.OperatingMargin.ToPercentString()}, " +
            $"Net Profit Margin: {value.NetProfitMargin.ToPercentString()}, " +
            $"ROA: {value.ROA.ToPercentString()}, " +
            $"ROE: {value.ROE.ToPercentString()}, " +
            $"Debt to Equity Ratio: {value.DebtToEquityRatio.ToPercentString()}, " +
            $"High Growth: {thresholds.HighGrowth.ToPercentString()}, " +
            $"Profitable Gross Margin: {thresholds.ProfitableGrossMargin.ToPercentString()}, " +
            $"Profitable Net Margin: {thresholds.ProfitableNetMargin.ToPercentString()}, " +
            $"Stable Debt to Equity: {thresholds.StableDebtToEquity.ToPercentString()}, " +
            $"Strong ROA: {thresholds.StrongROA.ToPercentString()}, " +
            $"Strong ROE: {thresholds.StrongROE.ToPercentString()}", value.ToString()
        );

        Assert.True(value.IsHighGrowth(), "IsHighGrowth");
        Assert.True(value.IsProfitableGrossMargin(), "IsProfitableGrossMargin");
        Assert.True(value.IsProfitableNetMargin(), "IsProfitableNetMargin");
        Assert.True(value.IsStableDebtToEquity(), "IsStableDebtToEquity");
        Assert.True(value.HasStrongPerformance(), "HasStrongPerformance");

    }
}