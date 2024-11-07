using Ardalis.Result;

namespace CCD.FundamentalAnalysis.Domain;

public class FundamentalAnalysisThresholds
{
    public Percentage HighGrowth { get; }
    public Percentage ProfitableGrossMargin { get; }
    public Percentage ProfitableNetMargin { get; }
    public Percentage StableDebtToEquity { get; }
    public Percentage StrongROA { get; }
    public Percentage StrongROE { get; }

    private FundamentalAnalysisThresholds(
        Percentage highGrowth,
        Percentage profitableGrossMargin,
        Percentage profitableNetMargin,
        Percentage stableDebtToEquity,
        Percentage strongROA,
        Percentage strongROE)
    {
        HighGrowth = highGrowth;
        ProfitableGrossMargin = profitableGrossMargin;
        ProfitableNetMargin = profitableNetMargin;
        StableDebtToEquity = stableDebtToEquity;
        StrongROA = strongROA;
        StrongROE = strongROE;
    }

    public static Result<FundamentalAnalysisThresholds> Create(
        decimal highGrowth,
        decimal profitableGrossMargin,
        decimal profitableNetMargin,
        decimal stableDebtToEquity,
        decimal strongROA,
        decimal strongROE)
    {
        return Result.Created(new FundamentalAnalysisThresholds(
            Percentage.Create(highGrowth),
            Percentage.Create(profitableGrossMargin),
            Percentage.Create(profitableNetMargin),
            Percentage.Create(stableDebtToEquity),
            Percentage.Create(strongROA),
            Percentage.Create(strongROE))
            );
    }

    public override string ToString() => $"High Growth: {HighGrowth.ToPercentString()}, " +
                                         $"Profitable Gross Margin: {ProfitableGrossMargin.ToPercentString()}, " +
                                         $"Profitable Net Margin: {ProfitableNetMargin.ToPercentString()}, " +
                                         $"Stable Debt to Equity: {StableDebtToEquity.ToPercentString()}, " +
                                         $"Strong ROA: {StrongROA.ToPercentString()}, " +
                                         $"Strong ROE: {StrongROE.ToPercentString()}";
}