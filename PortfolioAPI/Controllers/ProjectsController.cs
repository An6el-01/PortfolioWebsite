using Microsoft.AspNetCore.Mvc;
using PortfolioAPI.Models;
using System.Collections.Generic;

[ApiController]
[Route("api/[controller]")]
public class ProjectController : ControllerBase
{
    private static List<Project> projects = new List<Project>();

    [HttpGet]
    public ActionResult<IEnumerable<Project>> GetAllProjects()
    {
        return Ok(projects);
    }

    [HttpGet("{id}")]
    public ActionResult<Project> GetProject(int id)
    {
        var project = projects.Find( p => p.Id == id);
        if (project == null) return NotFound();
        return Ok(project);
    }

    [HttpPost]
    public ActionResult<Project> AddProject(Project project)
    {
        projects.Add(project);
        return CreatedAtAction(nameof(GetProject), new { id = project.Id }, project);
    }

    [HttpPut("{id}")]
    public ActionResult UpdateProject(int id, Project updatedProject)
    {
        var project = projects.Find(p => p.Id == id);
        if (project == null) return NotFound();

        project.Name = updatedProject.Name;
        project.Description = updatedProject.Description;
        project.ImageUrl = updatedProject.ImageUrl;
        project.RepositoryUrl = updatedProject.RepositoryUrl;
        project.TechStack = updatedProject.TechStack;

        return NoContent();
    }

    [HttpDelete("{id}")]
    public ActionResult DeleteProject(int id)
    {
        var project = projects.Find(p =>p.Id == id);
        if (project == null) return NotFound();
        
        projects.Remove(project);
        return NoContent();
    }
}