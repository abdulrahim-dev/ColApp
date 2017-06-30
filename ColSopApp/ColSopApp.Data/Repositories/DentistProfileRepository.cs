using ColSopApp.Core.Data.Repositories;
using ColSopApp.Core.Entities;

namespace ColSopApp.Data.Repositories
{
    public class DentistProfileRepository : BaseRepository<DentistProfile>,IDentistProfileRepository
    {
        public DentistProfileRepository(IDbContext dbContext):base(dbContext)
        {
            
        }
    }
}