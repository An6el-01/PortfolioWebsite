using Microsoft.AspNetCore.Mvc;
using PortfolioAPI.Models;
using System.Collections.Generic;

[ApiController]
[Route("api/[controller]")]
public class TechStackController : ControllerBase
{
    private static List<TechStack> techStacks = new List<TechStack>();

    [HttpGet]
    public ActionResult<IEnumerable<TechStack>> GetAllTechStacks()
    {
        return Ok(techStacks);
    }

    [HttpGet("{id}")]
    public ActionResult<TechStack> GetTechStack(int id)
    {
        var techStack = techStacks.Find(ts => ts.Id == id);
        if (techStack == null) return NotFound();
        return Ok(techStack);
    }

    [HttpPut("{id}")]
    public ActionResult UpdateTechStack(int id, TechStack updatedTechStack)
    {
        var techStack = techStacks.Find(t => t.Id == id);
        if (techStack == null) return NotFound();

        techStack.Name = updatedTechStack.Name;
        techStack.Icon = updatedTechStack.Icon;

        return NoContent();
    }

    [HttpDelete("{id}")]
    public ActionResult DeleteTechStack(int id)
    {
        var techStack = techStacks.Find(t => t.Id == id);
        if (techStack == null) return NotFound();

        techStacks.Remove(techStack);
        return NoContent();
    }
}