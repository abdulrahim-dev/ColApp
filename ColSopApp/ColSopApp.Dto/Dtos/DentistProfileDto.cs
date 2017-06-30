namespace ColSopApp.Dto.Dtos
{
    public class DentistProfileDto : BaseDto
    {
        public DentistProfileDto()
        {
            
        }
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string Telephone { get; set; }

        public string MobilePhone { get; set; }

        //for simplification I just made it a string
        public string AddressLineOne { get; set; }

        public string AddressLineTwo { get; set; }

        public string AddressLineThree { get; set; }

        public string Pincode { get; set; }

        public string Comments { get; set; }

        public decimal Latitude { get; set; }

        public decimal Longtitude { get; set; }

        public string ImagePath { get; set; }


        public string ApplicationUserId { get; set; }
    }
}