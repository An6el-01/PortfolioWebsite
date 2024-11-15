using Microsoft.AspNetCore.Mvc;
using PortfolioAPI.Data;
using PortfolioAPI.Models;
using System.Collections.Generic;
using System.Linq;

namespace PortfolioAPI.Controllers{
    [ApiController]
[Route("api/[controller]")]
public class ProjectsController : ControllerBase
{
    private readonly PortfolioDbContext _context;

    public ProjectsController(PortfolioDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public ActionResult<IEnumerable<Project>> GetAllProjects()
    {
        var projects = _context.Projects.ToList();
        return Ok(projects);
    }

    [HttpGet("{id}")]
    public ActionResult<Project> GetProject(int id)
    {
        var project = _context.Projects.Find(id);
        if (project == null)
        {
            return NotFound();
        }
        return Ok(project);
    }

    [HttpPost]
    public ActionResult<Project> AddProject(Project project)
    {
        _context.Projects.Add(project);
        _context.SaveChanges();
        return CreatedAtAction(nameof(GetProject), new { id = project.Id }, project);
    }

    [HttpPut("{id}")]
    public ActionResult UpdateProject(int id, Project updatedProject)
    {
        var project = _context.Projects.Find(id);
        if (project == null)
        {
            return NotFound();
        }

        project.Name = updatedProject.Name;
        project.Description = updatedProject.Description;
        project.ImageUrl = updatedProject.ImageUrl;
        project.RepositoryUrl = updatedProject.RepositoryUrl;
        project.TechStack = updatedProject.TechStack;

        _context.SaveChanges();
        return NoContent();
    }

    [HttpDelete("{id}")]
    public ActionResult DeleteProject(int id)
    {
        var project = _context.Projects.Find(id);
        if (project == null)
        {
            return NotFound();
        }

        _context.Projects.Remove(project);
        _context.SaveChanges();
        return NoContent();
    }
    [HttpGet("test")]
public IActionResult Test()
{
    return Ok("ProjectsController is working!");
}

}

}
