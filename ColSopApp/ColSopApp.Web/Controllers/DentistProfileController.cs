
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
        public DentistProfileController(IDentistProfileService dentistProfileService)
        {
            _dentistProfileService = dentistProfileService;
        }

        [HttpPost]
        public async Task<IHttpActionResult> PostDentistProfile(DentistProfileDto dentistProfileDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            DentistProfile dentistProfile = new DentistProfile();

            Mapper.Map(dentistProfileDto, dentistProfile);

            dentistProfile.ApplicationUserId = User.Identity.GetUserId();

            dentistProfile = await _dentistProfileService.AddAsync(dentistProfile);
            dentistProfileDto.Id = dentistProfile.Id;

            return Ok(dentistProfileDto);
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