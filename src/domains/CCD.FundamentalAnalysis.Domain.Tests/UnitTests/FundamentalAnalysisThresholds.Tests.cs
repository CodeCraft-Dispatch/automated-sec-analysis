using Ardalis.Result;

namespace CCD.FundamentalAnalysis.Domain.Tests.UnitTests;

[Trait("Category", "Domain")]
[Trait("Category", "Unit")]
public class FundamentalAnalysisThresholdsTests
{
    [Fact]
    public void ShouldCreateFundamentalAnalysisThresholds() {
        // Arrange
        var percentage = 0.5m;

        // Act
        var thresholds = FundamentalAnalysisThresholds.Create(
            percentage,
            percentage,
            percentage,
            percentage,
            percentage,
            percentage);

        // Assert
        Assert.Equal(ResultStatus.Created, thresholds.Status);

        var value = thresholds.Value;
        Assert.Equal(percentage, value.HighGrowth);
        Assert.Equal(percentage, value.ProfitableGrossMargin);
        Assert.Equal(percentage, value.ProfitableNetMargin);
        Assert.Equal(percentage, value.StableDebtToEquity);
        Assert.Equal(percentage, value.StrongROA);
        Assert.Equal(percentage, value.StrongROE);
    }

    [Fact]
    public void ShouldReturnStringValue() {
        // Arrange
        var percentage = 0.5m;

        // Act
        var thresholds = FundamentalAnalysisThresholds.Create(
            percentage,
            percentage,
            percentage,
            percentage,
            percentage,
            percentage);

        // Assert
        Assert.Equal(ResultStatus.Created, thresholds.Status);

        var value = thresholds.Value;
        Assert.Equal($"High Growth: {value.HighGrowth.ToPercentString()}, " +
                     $"Profitable Gross Margin: {value.ProfitableGrossMargin.ToPercentString()}, " +
                     $"Profitable Net Margin: {value.ProfitableNetMargin.ToPercentString()}, " +
                     $"Stable Debt to Equity: {value.StableDebtToEquity.ToPercentString()}, " +
                     $"Strong ROA: {value.StrongROA.ToPercentString()}, " +
                     $"Strong ROE: {value.StrongROE.ToPercentString()}", value.ToString());
    }
}