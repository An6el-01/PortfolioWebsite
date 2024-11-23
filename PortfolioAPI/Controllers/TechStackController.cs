using Microsoft.AspNetCore.Mvc;
using PortfolioAPI.Models;
using PortfolioAPI.Data;
using System.Collections.Generic;
using System.Linq;

namespace PortfolioAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TechStackController : ControllerBase
    {
        private readonly PortfolioDbContext _context;

        public TechStackController(PortfolioDbContext context)
        {
            _context = context;
        }
        //GET: api/techstack
        [HttpGet]
        public ActionResult<IEnumerable<TechStack>> GetAllTechStacks([FromQuery] string? type)
        {
            // Check if a 'type' filter is provided
            var techStacks = string.IsNullOrEmpty(type)
                ? _context.TechStacks.ToList() // Return all tech stacks if no filter is applied
                : _context.TechStacks.Where(t => t.Type == type).ToList(); // Filter by type

            return Ok(techStacks);
        }
        //GET: api/techstack/{id}
        [HttpGet("id")]
        public ActionResult<TechStack> GetTechStack(int id)
        {
            var techStack = _context.TechStacks.Find(id);
            if(techStack == null)
            {
                return NotFound("Tech Stack not found[TechStackController{Get}].");
            }
            return Ok(techStack);
        }

        //GET: api/techstack
        [HttpPost]
        public ActionResult<TechStack> AddTechStack(TechStack techStack)
        {
            _context.TechStacks.Add(techStack);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetTechStack), new { id = techStack.Id }, techStack);
        }

        //POST: api/techstack
        [HttpPost]
        public IActionResult UpdateTechStack(int id, TechStack updatedTechStack)
        {
            var techStack = _context.TechStacks.Find(id);
            if(techStack == null){
                return NotFound("Tech Stack not found[TechStackController{Update}]");
            }
            techStack.Name =  updatedTechStack.Name;
            techStack.Icon =  updatedTechStack.Icon;
            techStack.Type =  updatedTechStack.Type;

            _context.SaveChanges();
            return NoContent();
        }

        //DELETE: api/techstack/{id}
        [HttpDelete("id")]
        public IActionResult DeleteTechStack(int id)
        {
            var techStack = _context.TechStacks.Find(id);
            if(techStack == null)
            {
                return NotFound("Tech Stack not found[TechStackController{Delete}]");
            }

            _context.TechStacks.Remove(techStack);
            _context.SaveChanges();
            return NoContent();
        }

        //TEST ENDPOINT
        [HttpGet("test")]
        public IActionResult Test()
        {
            return Ok("Test endpoint working");
        }
    }
}