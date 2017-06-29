using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using ColSopApp.Data;

namespace ColSopApp.Web.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            //Only FOr Initialise the database
            //DatabaseInitializer sd=new DatabaseInitializer();
            //sd.Initialize(new ColAppDbContext());
            ViewBag.Title = "Home Page";

            return View();
        }
    }
}
