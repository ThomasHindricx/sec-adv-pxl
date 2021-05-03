using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SecAdvYellowTeamB.Controllers
{
    [Route("/")]
    [ApiController]
    public class RestController : ControllerBase
    {
        [HttpGet("/")]
        public IActionResult Public()
        {
            return Ok("Public endpoint");
        }

        [HttpGet("team")]
        [Authorize("read:team")]
        public IActionResult GetTeam()
        {
            return Ok("Thomas Hindricx, Simon Damiaens, Jari Gielen, Didier Colson");
        }

        [HttpGet("gedicht")]
        [Authorize("read:gedicht")]
        public IActionResult GetPoem()
        {
            return Ok("Hier kabbelt het water van nu naar later/De open brug is een pas op de plaats aan de stroom/Een stilte kruist er je droom");
        }
    }
}
