using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using ColSopApp.Web.DI_Capsule;
using ColSopApp.Web.Mapping;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(ColSopApp.Web.Startup))]

namespace ColSopApp.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            //https://code.msdn.microsoft.com/windowsdesktop/Architecture-real-world-8ac333a2/sourcecode?fileId=141308&pathId=366130227
            //Code sample

            ConfigureAuth(app);

            //Mapping
            var mappingDefinitions = new MappingDefinitions();
            mappingDefinitions.Initialise();

            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
            AreaRegistration.RegisterAllAreas();

            var config = new HttpConfiguration();
            config.MapHttpAttributeRoutes();

            WebApiConfig.Register(config);

            new WebCapsule().Initialise(config);

            app.UseWebApi(config);
        }
    }
}
