using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;
using ColSopApp.Web.DI_Capsule;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(ColSopApp.Web.Startup))]

namespace ColSopApp.Web
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);

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
