using Microsoft.AspNetCore.Mvc;
using PortfolioAPI.Models;
using PortfolioAPI.Data;
using System.Collections.Generic;
using System.Linq;

namespace PortfolioAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    
    public class ExperienceController : ControllerBase
    {
        private readonly PortfolioDbContext _context;
        public ExperienceController(PortfolioDbContext context)
        {
            _context = context;
        }

        //GET: api/experience
        [HttpGet]
        public ActionResult<IEnumerable<Experience>> GetAllExperiences([FromQuery] string? type)
        {
            var experiences = string.IsNullOrEmpty(type)
                ? _context.Experiences.ToList()
                : _context.Experiences.Where(e => e.Type.ToLower() == type.ToLower()).ToList();

            return Ok(experiences);
        }

        //GET: api/experience/{id}
        [HttpGet("{id}")]
        public ActionResult<Experience> GetExperience(int id)
        {
            var experience = _context.Experiences.Find(id);
            if (experience == null) return NotFound();

            return Ok(experience);
        }

        //POST: api/experience
        [HttpPost]
        public ActionResult<Experience> AddExperience(Experience experience)
        {
            _context.Experiences.Add(experience);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetExperience), new { id = experience.Id }, experience);
        }

        //PUT: api/experience/{id}
        [HttpPut("{id}")]
        public ActionResult UpdateExperience(int id, Experience updatedExperience)
        {
            var experience = _context.Experiences.Find(id);
            if (experience == null) return NotFound();

            experience.Name = updatedExperience.Name;
            experience.Date = updatedExperience.Date;
            experience.Description = updatedExperience.Description;
            experience.Role = updatedExperience.Role;
            experience.Type = updatedExperience.Type;
            experience.ImageUrl = updatedExperience.ImageUrl;

            _context.SaveChanges();
            return NoContent();
        }

        //DELETE: api/experience/{id}
        [HttpDelete("{id}")]
        public ActionResult DeleteExperience(int id)
        {
            var experience = _context.Experiences.Find(id);
            if(experience == null) return NotFound();

            _context.Experiences.Remove(experience);
            _context.SaveChanges();
            return NoContent();
        }
    }
}