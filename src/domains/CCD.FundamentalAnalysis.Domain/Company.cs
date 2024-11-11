using Ardalis.Result;

namespace CCD.FundamentalAnalysis.Domain;

public class Company
{
    public string Name { get; }
    public Cik Cik { get; }
    public FactFileId FactFileId { get; }

    private Company(string name, Cik cik, FactFileId factFileId)
    {
        Name = name;
        Cik = cik;
        FactFileId = factFileId;
    }

    public static Result<Company> Create(string name, ulong cik, string factFileId)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            return Result<Company>.Invalid(new ValidationError("Name is required"));
        }

        return Result<Company>.Created(new Company(name, Cik.Create(cik), FactFileId.Create(factFileId)));
    }
}