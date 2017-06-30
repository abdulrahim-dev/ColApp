using System.Data.Entity.ModelConfiguration;
using ColSopApp.Core.Entities;

namespace ColSopApp.Data.Configurations
{
    public class DentistProfileConfiguration:EntityTypeConfiguration<DentistProfile>
    {
        public DentistProfileConfiguration()
        {
            Property(c => c.FirstName).IsRequired().HasMaxLength(100);
            Property(c => c.LastName).IsRequired().HasMaxLength(100);
            Property(c => c.Email).IsRequired().HasMaxLength(250);
            Property(c => c.Telephone).HasMaxLength(150);
            Property(c => c.MobilePhone).IsRequired().HasMaxLength(250);
            Property(c => c.AddressLineOne).HasMaxLength(250);
            Property(c => c.AddressLineTwo).HasMaxLength(250);
            Property(c => c.AddressLineThree).HasMaxLength(250);
            Property(c => c.Pincode).HasMaxLength(100);
            Property(c => c.Comments).HasMaxLength(500);
            Property(c => c.Latitude);
            Property(c => c.Longtitude);
            Property(c => c.ImagePath).HasMaxLength(100);

        }
    }
}