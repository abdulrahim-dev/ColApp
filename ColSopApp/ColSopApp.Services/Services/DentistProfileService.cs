using ColSopApp.Core.Data;
using ColSopApp.Core.Entities;
using ColSopApp.Core.Services;

namespace ColSopApp.Services.Services
{
    public class DentistProfileService:BaseService<DentistProfile>,IDentistProfileService
    {
        public DentistProfileService(IUnitOfWork unitOfWork) :base(unitOfWork)
        {
            
        }
    }
}