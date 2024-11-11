using Ardalis.Result;

namespace CCD.FundamentalAnalysis.Domain;

public class FundamentalAnalysisResult
{
    public Company Company { get; }
    public Fundamentals Fundamentals { get; }

    private readonly FundamentalAnalysisThresholds _thresholds;
    private readonly BitFlags _flags;

    private FundamentalAnalysisResult(
        Company company,
        Fundamentals fundamentals,
        FundamentalAnalysisThresholds thresholds)
    {
        Company = company;
        Fundamentals = fundamentals;
        _thresholds = thresholds;

        _flags = BitFlags.False;

        if (fundamentals.RevenueGrowth > _thresholds.HighGrowth) _flags |= BitFlagPosition.First;
        if (fundamentals.GrossMargin > _thresholds.ProfitableGrossMargin) _flags |= BitFlagPosition.Second;
        if (fundamentals.NetProfitMargin > _thresholds.ProfitableNetMargin) _flags |= BitFlagPosition.Third;
        if (fundamentals.DebtToEquityRatio < _thresholds.StableDebtToEquity) _flags |= BitFlagPosition.Fourth;
        if (fundamentals.ReturnOnAssets > _thresholds.StrongROA) _flags |= BitFlagPosition.Fifth;
        if (fundamentals.ReturnOnEquity > _thresholds.StrongROE) _flags |= BitFlagPosition.Sixth;
        if (HasStrongROA() && HasStrongROE()) _flags |= BitFlagPosition.Seventh;
    }

    public static Result<FundamentalAnalysisResult> Create(
        Company company,
        Fundamentals fundamentals,
        FundamentalAnalysisThresholds thresholds)
    {
        return Result.Created(new FundamentalAnalysisResult(
            company,
            fundamentals,
            thresholds)
            );
    }

    public bool IsHighGrowth() => _flags == BitFlagPosition.First;

    public bool IsProfitableGrossMargin() => _flags == BitFlagPosition.Second;

    public bool IsProfitableNetMargin() => _flags == BitFlagPosition.Third;

    public bool IsStableDebtToEquity() => _flags == BitFlagPosition.Fourth;

    public bool HasStrongROA() => _flags == BitFlagPosition.Fifth;

    public bool HasStrongROE() => _flags == BitFlagPosition.Sixth;

    public bool HasStrongPerformance() => _flags == BitFlagPosition.Seventh;

    public override string ToString() =>    $"{Fundamentals}," +
                                            $"{_thresholds}, " +
                                            $"High Growth: {IsHighGrowth()}, " +
                                            $"Profitable Gross Margin: {IsProfitableGrossMargin()}, " +
                                            $"Profitable Net Margin: {IsProfitableNetMargin()}, " +
                                            $"Stable Debt to Equity: {IsStableDebtToEquity()}, " +
                                            $"Strong ROA: {HasStrongROA()}, " +
                                            $"Strong ROE: {HasStrongROE()}, " +
                                            $"Strong Performance: {HasStrongPerformance()}";
}