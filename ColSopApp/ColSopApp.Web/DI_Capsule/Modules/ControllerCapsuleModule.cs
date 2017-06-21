using System.Reflection;
using Autofac;
using Autofac.Integration.WebApi;

namespace ColSopApp.Web.DI_Capsule.Modules
{
    public class ControllerCapsuleModule : Autofac.Module
    {
        protected override void Load(ContainerBuilder builder)
        {

            // Register the MVC Controllers
            //builder.RegisterControllers(Assembly.Load("ColSopApp.Web"));

            // Register the Web API Controllers
            //builder.RegisterApiControllers(Assembly.GetCallingAssembly());
            builder.RegisterApiControllers(Assembly.Load("ColSopApp.Web"));

        }
    }
}