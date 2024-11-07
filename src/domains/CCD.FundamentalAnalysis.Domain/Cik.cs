using Ardalis.Result;

namespace CCD.FundamentalAnalysis.Domain
{
    public class Cik
    {
        public long Value { get; }

        private Cik(long value)
        {
            Value = value;
        }

        public static Result<Cik> Create(long value)
        {
            if (value <= 0)
                return Result<Cik>.Invalid(new ValidationError("CIK cannot be less than or equal to 0"));

            if (value > 9999999999)
                return Result<Cik>.Invalid(new ValidationError("CIK cannot be greater than ten digits"));

            return Result<Cik>.Created(new Cik(value));
        }

        public override string ToString() => Value.ToString();

        public long ToLong() => Value;

        public static implicit operator long(Cik cik) => cik.Value;
    }
}