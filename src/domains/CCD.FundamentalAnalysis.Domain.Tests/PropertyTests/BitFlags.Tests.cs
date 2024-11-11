using FsCheck;
using FsCheck.Xunit;

namespace CCD.FundamentalAnalysis.Domain.Tests.PropertyTests;

[Trait("Category", "Domain")]
[Trait("Category", "Exploratory")]
[Trait("Category", "Property")]
public class BitFlagsTests
{
    private static BitFlagPosition CreateBitFlagPositionFromByte(byte b)
    {
        return BitFlagPosition.FromValue((byte)(b % 8));
    }

    [Property]
    public void SetsAFlag()
    {
        Prop.ForAll<byte>(b =>
        {
            var flag = CreateBitFlagPositionFromByte(b);
            var flags = BitFlags.False | flag;
            return flags == flag;
        }).QuickCheckThrowOnFailure();
    }

    [Property]
    public void SetsAFlagTwice()
    {
        Prop.ForAll<byte>(b =>
        {
            var flag = CreateBitFlagPositionFromByte(b);
            var flags = BitFlags.False | flag | flag;
            return flags == flag;
        }).QuickCheckThrowOnFailure();
    }

    [Property]
    public void ClearsAFlag()
    {
        Prop.ForAll<byte>(b =>
        {
            var flag = CreateBitFlagPositionFromByte(b);
            var flags = BitFlags.True & flag;
            return flags != flag;
        }).QuickCheckThrowOnFailure();
    }

    [Property]
    public void ClearsAFlagTwice()
    {
        Prop.ForAll<byte>(b =>
        {
            var flag = CreateBitFlagPositionFromByte(b);
            var flags = BitFlags.True & flag & flag;
            return flags != flag;
        }).QuickCheckThrowOnFailure();
    }

    [Property]
    public void TogglesAFlag()
    {
        Prop.ForAll<byte>(b =>
        {
            var flag = CreateBitFlagPositionFromByte(b);
            var flags = BitFlags.False ^ flag;
            return flags == flag;
        }).QuickCheckThrowOnFailure();
    }

    [Property]
    public void TogglesAFlagTwice()
    {
        Prop.ForAll<byte>(b =>
        {
            var flag = CreateBitFlagPositionFromByte(b);
            var flags = BitFlags.False;
            var twice = flags ^ flag ^ flag;
            return twice == flags;
        }).QuickCheckThrowOnFailure();
    }

    [Property]
    public void ChecksATrueFlag()
    {
        Prop.ForAll<byte>(b =>
        {
            var flag = CreateBitFlagPositionFromByte(b);
            var flags = BitFlags.True;
            return flags == flag;
        }).QuickCheckThrowOnFailure();
    }

    [Property]
    public void ChecksAFalseFlag()
    {
        Prop.ForAll<byte>(b =>
        {
            var flag = CreateBitFlagPositionFromByte(b);
            var flags = BitFlags.False;
            return flags != flag;
        }).QuickCheckThrowOnFailure();
    }

}
