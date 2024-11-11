using Ardalis.Result;

namespace CCD.FundamentalAnalysis.Domain;

public class Fundamentals
{
    public Percentage GrossMargin { get; }
    public Percentage RevenueGrowth { get; }
    public Percentage OperatingMargin { get; }
    public Percentage NetProfitMargin { get; }
    public Percentage ReturnOnAssets { get; }
    public Percentage ReturnOnEquity { get; }
    public Percentage DebtToEquityRatio { get; }

    private Fundamentals(
        Percentage grossMargin,
        Percentage revenueGrowth,
        Percentage operatingMargin,
        Percentage netProfitMargin,
        Percentage returnOnAssets,
        Percentage returnOnEquity,
        Percentage debtToEquityRatio)
    {
        GrossMargin = grossMargin;
        RevenueGrowth = revenueGrowth;
        OperatingMargin = operatingMargin;
        NetProfitMargin = netProfitMargin;
        ReturnOnAssets = returnOnAssets;
        ReturnOnEquity = returnOnEquity;
        DebtToEquityRatio = debtToEquityRatio;
    }

    public static Result<Fundamentals> Create(
        decimal grossMargin,
        decimal revenueGrowth,
        decimal operatingMargin,
        decimal netProfitMargin,
        decimal returnOnAssets,
        decimal returnOnEquity,
        decimal debtToEquityRatio)
    {
        return Result.Created(new Fundamentals(
            Percentage.Create(grossMargin),
            Percentage.Create(revenueGrowth),
            Percentage.Create(operatingMargin),
            Percentage.Create(netProfitMargin),
            Percentage.Create(returnOnAssets),
            Percentage.Create(returnOnEquity),
            Percentage.Create(debtToEquityRatio))
            );
    }

    public override string ToString() => $"Gross Margin: {GrossMargin.ToPercentString()}, " +
                                         $"Revenue Growth: {RevenueGrowth.ToPercentString()}, " +
                                         $"Operating Margin: {OperatingMargin.ToPercentString()}, " +
                                         $"Net Profit Margin: {NetProfitMargin.ToPercentString()}, " +
                                         $"ROA: {ReturnOnAssets.ToPercentString()}, " +
                                         $"ROE: {ReturnOnEquity.ToPercentString()}, " +
                                         $"Debt to Equity Ratio: {DebtToEquityRatio.ToPercentString()}";
}