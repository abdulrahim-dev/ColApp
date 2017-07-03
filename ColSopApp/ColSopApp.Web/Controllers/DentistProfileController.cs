
using System;
using System.Threading.Tasks;
using System.Web.Http;
using AutoMapper;
using ColSopApp.Core.Entities;
using ColSopApp.Core.Services;
using ColSopApp.Dto.Dtos;
using Microsoft.AspNet.Identity;

namespace ColSopApp.Web.Controllers
{
    [Authorize]
    [RoutePrefix("api/DentistProfile")]
    public class DentistProfileController : ApiController
    {
        private readonly IDentistProfileService _dentistProfileService;
        private readonly IImageHandlerService _imageHandlerService;
        public DentistProfileController(IDentistProfileService dentistProfileService, IImageHandlerService imageHandlerService)
        {
            _dentistProfileService = dentistProfileService;
            _imageHandlerService = imageHandlerService;
        }

        [HttpPost]
        public async Task<IHttpActionResult> PostDentistProfile(DentistProfileDto dentistProfileDto)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest("ModelState : "+ModelState);
                }

                dentistProfileDto.ImagePath=_imageHandlerService.SaveImage(dentistProfileDto.ImagePath);
                DentistProfile dentistProfile = new DentistProfile();

                Mapper.Map(dentistProfileDto, dentistProfile);

                dentistProfile.ApplicationUserId = User.Identity.GetUserId();

                dentistProfile = await _dentistProfileService.AddAsync(dentistProfile);
                dentistProfileDto.Id = dentistProfile.Id;

                return Ok(dentistProfileDto);
            }
            catch (Exception ex)
            {
                return BadRequest("Exception : "+ex.ToString());
            }
            
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                _dentistProfileService.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}