using Ardalis.Result;

namespace CCD.FundamentalAnalysis.Domain;

public readonly record struct Percentage
{
    public decimal Value { get; }

    private Percentage(decimal value)
    {
        Value = value;
    }

    public static Result<Percentage> Create(decimal value)
    {
        return Result<Percentage>.Created(new Percentage(value));
    }

    public override string ToString() => Value.ToString();

    public string ToPercentString() => $"{Value:P3}";

    public decimal ToDecimal() => Value;

    public static implicit operator decimal(Percentage percentage) => percentage.Value;
}