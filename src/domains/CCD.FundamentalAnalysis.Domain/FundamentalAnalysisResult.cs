using Ardalis.Result;

namespace CCD.FundamentalAnalysis.Domain;

public class FundamentalAnalysisResult
{
    public string CompanyName { get; }
    public FactFileId FactFileId { get; }
    public Cik Cik { get; }
    public Percentage GrossMargin { get; }
    public Percentage RevenueGrowth { get; }
    public Percentage OperatingMargin { get; }
    public Percentage NetProfitMargin { get; }
    public Percentage ROA { get; }
    public Percentage ROE { get; }
    public Percentage DebtToEquityRatio { get; }

    private FundamentalAnalysisThresholds _thresholds;

    private FundamentalAnalysisResult(
        string companyName,
        FactFileId factFileId,
        Cik cik,
        Percentage grossMargin,
        Percentage revenueGrowth,
        Percentage operatingMargin,
        Percentage netProfitMargin,
        Percentage roa,
        Percentage roe,
        Percentage debtToEquityRatio,
        FundamentalAnalysisThresholds thresholds)
    {
        CompanyName = companyName;
        FactFileId = factFileId;
        Cik = cik;
        GrossMargin = grossMargin;
        RevenueGrowth = revenueGrowth;
        OperatingMargin = operatingMargin;
        NetProfitMargin = netProfitMargin;
        ROA = roa;
        ROE = roe;
        DebtToEquityRatio = debtToEquityRatio;
        _thresholds = thresholds;
    }

    public static Result<FundamentalAnalysisResult> Create(
        string companyName,
        string factFileId,
        long cik,
        decimal grossMargin,
        decimal revenueGrowth,
        decimal operatingMargin,
        decimal netProfitMargin,
        decimal roa,
        decimal roe,
        decimal debtToEquityRatio,
        FundamentalAnalysisThresholds thresholds)
    {
        return Result.Created(new FundamentalAnalysisResult(
            companyName,
            FactFileId.Create(factFileId),
            Cik.Create(cik),
            Percentage.Create(grossMargin),
            Percentage.Create(revenueGrowth),
            Percentage.Create(operatingMargin),
            Percentage.Create(netProfitMargin),
            Percentage.Create(roa),
            Percentage.Create(roe),
            Percentage.Create(debtToEquityRatio),
            thresholds));
    }

    public bool IsHighGrowth() => RevenueGrowth > _thresholds.HighGrowth;

    public bool IsProfitableGrossMargin() => GrossMargin > _thresholds.ProfitableGrossMargin;

    public bool IsProfitableNetMargin() => NetProfitMargin > _thresholds.ProfitableNetMargin;

    public bool IsStableDebtToEquity() => DebtToEquityRatio < _thresholds.StableDebtToEquity;

    public bool HasStrongPerformance() => ROA > _thresholds.StrongROA && ROE > _thresholds.StrongROE;

    public override string ToString() => $"Company: {CompanyName}, " +
                                         $"Gross Margin: {GrossMargin.ToPercentString()}, " +
                                         $"Revenue Growth: {RevenueGrowth.ToPercentString()}, " +
                                         $"Operating Margin: {OperatingMargin.ToPercentString()}, " +
                                         $"Net Profit Margin: {NetProfitMargin.ToPercentString()}, " +
                                         $"ROA: {ROA.ToPercentString()}, " +
                                         $"ROE: {ROE.ToPercentString()}, " +
                                         $"Debt to Equity Ratio: {DebtToEquityRatio.ToPercentString()}, " +
                                         $"High Growth: {_thresholds.HighGrowth.ToPercentString()}, " +
                                         $"Profitable Gross Margin: {_thresholds.ProfitableGrossMargin.ToPercentString()}, " +
                                         $"Profitable Net Margin: {_thresholds.ProfitableNetMargin.ToPercentString()}, " +
                                         $"Stable Debt to Equity: {_thresholds.StableDebtToEquity.ToPercentString()}, " +
                                         $"Strong ROA: {_thresholds.StrongROA.ToPercentString()}, " +
                                         $"Strong ROE: {_thresholds.StrongROE.ToPercentString()}";
}