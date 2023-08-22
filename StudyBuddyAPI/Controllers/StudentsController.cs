using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudyBuddyAPI.Models;

namespace StudyBuddyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StudentsController : ControllerBase
    {
        private readonly StudyBuddyDbContext _dbContext;

        public StudentsController(StudyBuddyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Student>> GetStudents() 
        {
            return _dbContext.Students.ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<Student> GetStudent(int id)
        {
            var student = _dbContext.Students.Find(id);
            if (student == null) { return NotFound(); }
            return student;
        }

        [HttpPost]
        public IActionResult CreateStudent([FromBody] Student student)
        {
            _dbContext.Students.Add(student);
            _dbContext.SaveChanges();

            return CreatedAtAction(nameof(GetStudent), new {id = student.Id}, student);
        }


    }
}
