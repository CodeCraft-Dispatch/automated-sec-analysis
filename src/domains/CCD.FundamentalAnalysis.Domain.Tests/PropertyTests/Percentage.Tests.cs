using FsCheck;
using FsCheck.Xunit;

namespace CCD.FundamentalAnalysis.Domain.Tests.PropertyTests;

[Trait("Category", "Domain")]
[Trait("Category", "Exploratory")]
[Trait("Category", "Property")]
public class PercentageTests
{
    [Property]
    public void ShouldSetPercentage()
    {
        Prop.ForAll<decimal>(value =>
        {
            var p = Percentage.Create(value);
            return p.Value == value;
        }).QuickCheckThrowOnFailure();
    }

    [Property]
    public void ShouldReturnPercentString()
    {
        Prop.ForAll<decimal>(value =>
        {
            var p = Percentage.Create(value);
            return p.Value.ToPercentString() == $"{value:P3}";
        }).QuickCheckThrowOnFailure();
    }

}
