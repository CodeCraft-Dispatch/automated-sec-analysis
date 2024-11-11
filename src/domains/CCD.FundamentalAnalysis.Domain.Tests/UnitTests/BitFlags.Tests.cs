
namespace CCD.FundamentalAnalysis.Domain.Tests.UnitTests;

[Trait("Category", "Domain")]
[Trait("Category", "Unit")]
public class BigFlagsTests {
    private static BitFlagPosition CreateBitFlagPositionFromByte(byte b)
    {
        return BitFlagPosition.FromValue((byte)(b % 8));
    }

    [Fact]
    public void ShouldSetFlag() {
        // Arrange
        var flags = new BitFlags();
        
        // Act
        flags |= BitFlagPosition.First;
        
        // Assert
        Assert.True(flags == BitFlagPosition.First);
    }

    [Fact]
    public void AllFlagsSet()
    {
        var flags = BitFlags.False;
        for (byte b = 0; b < 8; b++)
        {
            var flag = CreateBitFlagPositionFromByte(b);
            flags |= flag;
        }
        Assert.Equal(BitFlags.True, flags);
    }
    
    [Fact]
    public void ShouldClearFlag() {
        // Arrange
        var flags = BitFlags.True;
        
        // Act
        flags &= BitFlagPosition.First;
        
        // Assert
        Assert.False(flags == BitFlagPosition.First); // should not be set.
    }

    [Fact]
    public void AllFlagsCleared()
    {
        var flags = BitFlags.True;
        for (byte b = 0; b < 8; b++)
        {
            var flag = CreateBitFlagPositionFromByte(b);
            flags &= flag;
        }
        Assert.Equal(BitFlags.False, flags);
    }

    [Fact]
    public void ShouldToggleFlag() {
        // Arrange
        var flags = new BitFlags();
        
        // Act
        flags ^= BitFlagPosition.First;
        
        // Assert
        Assert.True(flags == BitFlagPosition.First);
    }
    
    [Fact]
    public void ShouldCheckFlag() {
        // Arrange
        var flags = BitFlags.True;
        
        // Act
        var result = flags == BitFlagPosition.First;
        
        // Assert
        Assert.True(result);
    }
    
    [Fact]
    public void ShouldCheckFlagIsNotSet() {
        // Arrange
        var flags = new BitFlags();
        
        // Act
        var result = flags != BitFlagPosition.First;
        
        // Assert
        Assert.True(result);
    }
    
    [Fact]
    public void ShouldReturnUnderlyingByte() {
        // Arrange
        var flags = BitFlags.True;
        
        // Act
        byte result = flags;
        
        // Assert
        Assert.Equal(255, result);
    }
    
    [Fact]
    public void ShouldReturnStringRepresentation() {
        // Arrange
        var flags = BitFlags.True;
        
        // Act
        string result = flags.ToString();
        
        // Assert
        Assert.Equal("11111111", result);
    }
}