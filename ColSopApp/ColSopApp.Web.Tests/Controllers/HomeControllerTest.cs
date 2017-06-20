using System.Web.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using ColSopApp.Web;
using ColSopApp.Web.Controllers;

namespace ColSopApp.Web.Tests.Controllers
{
    [TestClass]
    public class HomeControllerTest
    {
        [TestMethod]
        public void Index()
        {
            // Arrange
            HomeController controller = new HomeController();

            // Act
            ViewResult result = controller.Index() as ViewResult;

            // Assert
            Assert.IsNotNull(result);
            Assert.AreEqual("Home Page", result.ViewBag.Title);
        }
    }
}
