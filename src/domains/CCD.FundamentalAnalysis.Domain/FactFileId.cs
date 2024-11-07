using Ardalis.Result;

namespace CCD.FundamentalAnalysis.Domain;

public class FactFileId
{
    public string Value { get; }

    private FactFileId(string value)
    {
        Value = value;
    }

    public static Result<FactFileId> Create(string value)
    {
        if (string.IsNullOrWhiteSpace(value))
            return Result<FactFileId>.Invalid(new ValidationError("FactFileId cannot be empty"));

        return Result<FactFileId>.Created(new FactFileId(value));
    }

    public override string ToString() => Value;

    public static implicit operator string(FactFileId id) => id.Value;
}
