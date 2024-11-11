using FsCheck;
using FsCheck.Xunit;

namespace CCD.FundamentalAnalysis.Domain.Tests.PropertyTests;

[Trait("Category", "Domain")]
[Trait("Category", "Exploratory")]
[Trait("Category", "Property")]
public class FactFileIdTests
{
    [Property]
    public void ShouldSetFactFileId()
    {
        Prop.ForAll(Arb.Default.String().Filter(x => !string.IsNullOrWhiteSpace(x)), factFileId =>
        {
            var f = FactFileId.Create(factFileId);
            return f.Value == factFileId;
        }).QuickCheckThrowOnFailure();
    }

}
