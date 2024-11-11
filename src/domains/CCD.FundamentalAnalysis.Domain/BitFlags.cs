
namespace CCD.FundamentalAnalysis.Domain;

/// <summary>
/// Represents 8 flags stored in a single byte
/// </summary>
/// <remarks>
/// This class is a value type and is immutable. It is designed to be used in a bitwise manner.
/// The class is designed to be used with the <see cref="BitFlagPosition"/>  enum to set, clear, toggle and check flags.
/// </remarks>
public readonly record struct BitFlags
{
    public static readonly BitFlags False = new(0);
    public static readonly BitFlags True = new(255);

    private readonly byte _flags;

    // private constructor to initialize the flags
    private BitFlags(byte initialFlags)
    {
        _flags = initialFlags;
    }

    /// <summary>
    /// Creates a new instance of the BitFlags class with all flags set to false
    /// </summary>
    public BitFlags() : this(0) { }

    /// <summary>
    /// Sets a flag
    /// </summary>
    /// <param name="flags"></param>
    /// <param name="position"></param>
    /// <returns></returns>
    public static BitFlags operator |(BitFlags flags, BitFlagPosition position)
    {
        byte newFlags = (byte)(flags._flags | (1 << position));
        return new BitFlags(newFlags);
    }

    /// <summary>
    /// Clears a flag
    /// </summary>
    /// <param name="flags"></param>
    /// <param name="position"></param>
    /// <returns></returns>
    public static BitFlags operator &(BitFlags flags, BitFlagPosition position)
    {
        byte newFlags = (byte)(flags._flags & ~(1 << position));
        return new BitFlags(newFlags);
    }

    /// <summary>
    /// Toggles a flag
    /// </summary>
    /// <param name="flags"></param>
    /// <param name="position"></param>
    /// <returns></returns>
    public static BitFlags operator ^(BitFlags flags, BitFlagPosition position)
    {
        byte newFlags = (byte)(flags._flags ^ (1 << position));
        return new BitFlags(newFlags);
    }

    /// <summary>
    /// Check if a flag is set
    /// </summary>
    /// <param name="flags"></param>
    /// <param name="position"></param>
    /// <returns></returns>
    public static bool operator ==(BitFlags flags, BitFlagPosition position)
    {
        return (flags._flags & (1 << position)) != 0;
    }

    /// <summary>
    /// Check if a flag is not set
    /// </summary>
    /// <param name="flags"></param>
    /// <param name="position"></param>
    /// <returns></returns>
    public static bool operator !=(BitFlags flags, BitFlagPosition position)
    {
        return !(flags == position);
    }

    /// <summary>
    /// Implicit conversion to byte for retrieving the underlying byte
    /// </summary>
    /// <param name="flags"></param>
    public static implicit operator byte(BitFlags flags)
    {
        return flags._flags;
    }

    /// <summary>
    /// Returns the string representation of the flags as a binary string
    /// </summary>
    /// <returns></returns>
    public override string ToString()
    {
        return Convert.ToString(_flags, 2).PadLeft(8, '0');
    }

}