using Autofac;
using ColSopApp.Core.Data.Repositories;
using ColSopApp.Data.Repositories;
using ColSopApp.Web.References;

namespace ColSopApp.Web.DI_Capsule.Modules
{
    public class RepositoryCapsuleModule : Autofac.Module
    {
        protected override void Load(ContainerBuilder builder)
        {
            builder.RegisterAssemblyTypes(ReferencedAssemblies.Repositories).
                Where(_ => _.Name.EndsWith("Repository")).
                AsImplementedInterfaces().
                InstancePerLifetimeScope();

            builder.RegisterGeneric(typeof(BaseRepository<>)).As(typeof(IRepository<>)).InstancePerDependency();
        }

    }
}