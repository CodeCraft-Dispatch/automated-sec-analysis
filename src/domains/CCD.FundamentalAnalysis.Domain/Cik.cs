using Ardalis.Result;

namespace CCD.FundamentalAnalysis.Domain
{
    public class Cik
    {
        public ulong Value { get; }

        private Cik(ulong value)
        {
            Value = value;
        }

        public static Result<Cik> Create(ulong value)
        {
            if (value > 9999999999)
                return Result<Cik>.Invalid(new ValidationError("CIK cannot be greater than ten digits"));

            return Result<Cik>.Created(new Cik(value));
        }

        public override string ToString() => Value.ToString();

        public ulong ToLong() => Value;

        public static implicit operator ulong(Cik cik) => cik.Value;
    }
}