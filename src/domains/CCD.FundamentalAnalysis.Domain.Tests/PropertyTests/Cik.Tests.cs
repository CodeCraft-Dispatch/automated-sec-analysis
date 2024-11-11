using FsCheck;
using FsCheck.Xunit;

namespace CCD.FundamentalAnalysis.Domain.Tests.PropertyTests;

[Trait("Category", "Domain")]
[Trait("Category", "Exploratory")]
[Trait("Category", "Property")]
public class CikTests
{
    [Property]
    public void ShouldSetCik()
    {
        Prop.ForAll<ulong>(cik =>
        {
            var c = Cik.Create(cik);
            return c.Value == cik;
        }).QuickCheckThrowOnFailure();
    }

    [Property]
    public void ShouldImplicitlyConvertCikToLong()
    {
        Prop.ForAll<ulong>(cik =>
        {
            var c = Cik.Create(cik);
            return (ulong)c.Value == cik;
        }).QuickCheckThrowOnFailure();
    }

    [Property]
    public void ShouldReturnLongValue()
    {
        Prop.ForAll<ulong>(cik =>
        {
            var c = Cik.Create(cik);
            return c.Value.ToLong() == cik;
        }).QuickCheckThrowOnFailure();
    }

    [Property]
    public void ShouldReturnStringValue()
    {
        Prop.ForAll<ulong>(cik =>
        {
            var c = Cik.Create(cik);
            return c.Value.ToString() == cik.ToString();
        }).QuickCheckThrowOnFailure();
    }
}