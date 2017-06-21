using System;
using System.Threading.Tasks;
using ColSopApp.Core.Data.Repositories;
using ColSopApp.Core.Entities.Foundation;

namespace ColSopApp.Core.Data
{
    public interface IUnitOfWork : IDisposable
    {
        IRepository<TEntity> Repository<TEntity>() where TEntity : BaseEntity;

        void BeginTransaction();

        int Commit();

        Task<int> CommitAsync();

        void Rollback();

        void Dispose(bool disposing);

    }
}