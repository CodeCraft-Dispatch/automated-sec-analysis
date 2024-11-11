using Ardalis.Result;
using FsCheck;
using FsCheck.Xunit;

namespace CCD.FundamentalAnalysis.Domain.Tests.PropertyTests;

[Trait("Category", "Domain")]
[Trait("Category", "Exploratory")]
[Trait("Category", "Property")]
public class CompanyTests
{
    [Property]
    public void ShouldCreateCompany()
    {
        var name = Arb.Generate<string>().Where(x => !string.IsNullOrWhiteSpace(x)).Sample(1, 1).First();
        var factFileId = Arb.Generate<string>().Where(x => !string.IsNullOrWhiteSpace(x)).Sample(1, 1).First();

        Prop.ForAll<ulong>(cik =>
        {
            var result = Company.Create(name, cik, factFileId);

            Assert.True(result.Status == ResultStatus.Created);

            return (result.Status == ResultStatus.Created).ToProperty()
                .And(result.Value.Name == name)
                .And(result.Value.Cik.Value == cik)
                .And(result.Value.FactFileId.Value == factFileId);
        });
    }

    [Property]
    public void ShouldNotCreateCompanyWhenNameIsMissing()
    {
        var name = string.Empty;
        var factFileId = Arb.Generate<string>().Where(x => !string.IsNullOrWhiteSpace(x)).Sample(1, 1).First();

        Prop.ForAll<ulong>(cik =>
        {
            var result = Company.Create(name, cik, factFileId);

            Assert.True(result.Status == ResultStatus.Invalid);

            return (result.Status == ResultStatus.Invalid).ToProperty()
                .And(result.ValidationErrors != null && result.ValidationErrors.Any(e => e.ErrorMessage == "Name is required"));
        });
    }
}
