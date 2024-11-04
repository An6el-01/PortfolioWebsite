using Microsoft.AspNetCore.Mvc;
using PortfolioAPI.Models;
using System.Collections.Generic;

[ApiController]
[Route("api/[controller]")]

public class ExperienceController : ControllerBase
{
    private static List<Experience> experiences = new List<Experience>();

    [HttpGet]
    public ActionResult<IEnumerable<Experience>> GetAllExperiences()
    {
        return Ok(experiences);
    }

    [HttpGet("{id}")]
    public ActionResult<Experience> GetExperience(int id)
    {
        var experience = experiences.Find(e => e.Id == id);
        if (experience == null) return NotFound();
        return Ok(experience);
    }

    [HttpPost]
    public ActionResult<Experience> AddExperience(Experience experience)
    {
        experiences.Add(experience);
        return CreatedAtAction(nameof(GetExperience), new { id = experience.Id }, experience);
    }

    [HttpPut("{id}")]
    public ActionResult UpdateExperience(int id, Experience updatedExperience)
    {
        var experience = experiences.Find(e => e.Id == id);
        if (experience == null) return NotFound();

        experience.Name = updatedExperience.Name;
        experience.Date = updatedExperience.Date;
        experience.Description = updatedExperience.Description;
        experience.Role = updatedExperience.Role;

        return NoContent(); 
    }

    [HttpDelete("{id}")]    
    public ActionResult DeleteExperience(int id)
    {
        var experience = experiences.Find(e => e.Id == id);
        if (experience == null) return NotFound();

        experiences.Remove(experience);
        return NoContent();
    }
}