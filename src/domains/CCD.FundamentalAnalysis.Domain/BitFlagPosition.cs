
using Ardalis.SmartEnum;

namespace CCD.FundamentalAnalysis.Domain;

public class BitFlagPosition : SmartEnum<BitFlagPosition, byte>
{
    public static readonly BitFlagPosition First = new(0, "First");
    public static readonly BitFlagPosition Second = new(1, "Second");
    public static readonly BitFlagPosition Third = new(2, "Third");
    public static readonly BitFlagPosition Fourth = new(3, "Fourth");
    public static readonly BitFlagPosition Fifth = new(4, "Fifth");
    public static readonly BitFlagPosition Sixth = new(5, "Sixth");
    public static readonly BitFlagPosition Seventh = new(6, "Seventh");
    public static readonly BitFlagPosition Eighth = new(7, "Eighth");

    private BitFlagPosition(byte value, string name) : base(name, value) { }
}