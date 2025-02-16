using Ardalis.Result;

namespace CCD.FundamentalAnalysis.Domain;

public class FundamentalAnalysisResult
{
    public Company Company { get; }
    public Fundamentals Fundamentals { get; }

    private readonly FundamentalAnalysisThresholds _thresholds;
    private readonly BitFlags _flags;

    private readonly Dictionary<
        Func<Fundamentals, FundamentalAnalysisThresholds, bool>,
        BitFlagPosition> thresholdValidationRules = new()
    {
        { (fundamentals, thresholds) => fundamentals.RevenueGrowth > thresholds.HighGrowth, BitFlagPosition.First },
        { (fundamentals, thresholds) => fundamentals.GrossMargin > thresholds.ProfitableGrossMargin, BitFlagPosition.Second },
        { (fundamentals, thresholds) => fundamentals.NetProfitMargin > thresholds.ProfitableNetMargin, BitFlagPosition.Third },
        { (fundamentals, thresholds) => fundamentals.DebtToEquityRatio < thresholds.StableDebtToEquity, BitFlagPosition.Fourth },
        { (fundamentals, thresholds) => fundamentals.ReturnOnAssets > thresholds.StrongROA, BitFlagPosition.Fifth },
        { (fundamentals, thresholds) => fundamentals.ReturnOnEquity > thresholds.StrongROE, BitFlagPosition.Sixth },
        { (fundamentals, thresholds) => fundamentals.ReturnOnAssets > thresholds.StrongROA && fundamentals.ReturnOnEquity > thresholds.StrongROE, BitFlagPosition.Seventh }
    };

    private FundamentalAnalysisResult(
        Company company,
        Fundamentals fundamentals,
        FundamentalAnalysisThresholds thresholds)
    {
        Company = company;
        Fundamentals = fundamentals;
        _thresholds = thresholds;

        _flags = BitFlags.False;

        var rule = thresholdValidationRules
            .Where(condition => condition.Key(fundamentals, _thresholds))
            .ToList();

        foreach (var condition in rule)
        {
            _flags |= condition.Value;
        }
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