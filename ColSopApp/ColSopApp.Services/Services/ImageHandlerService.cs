using System;
using System.IO;
using System.Web;
using ColSopApp.Core.Services;

namespace ColSopApp.Services.Services
{
    public class ImageHandlerService: IImageHandlerService
    {
        public string SaveImage(string imgStr)
        {
            var path = HttpContext.Current.Server.MapPath("~/ProfileImages/Dentists"); //Path

            //Check if directory exist
            if (!System.IO.Directory.Exists(path))
            {
                Directory.CreateDirectory(path); //Create directory if it doesn't exist
            }

            string imageName = DateTime.Now.ToString("ddMMyyhhmmss") + ".jpg";

            //set the image path
            string imgPath = Path.Combine(path, imageName);

            byte[] imageBytes = Convert.FromBase64String(imgStr);

            File.WriteAllBytes(imgPath, imageBytes);

            return imageName;
        }
    }
}