using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudyBuddyAPI.Models;

namespace StudyBuddyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuestionsController : ControllerBase
    {
        private readonly StudyBuddyDbContext _dbContext;

        public QuestionsController(StudyBuddyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public ActionResult<IEnumerable<Question>> GetQuestions() 
        {
            return _dbContext.Questions.ToList();
        }

        [HttpGet("{id}")]
        public ActionResult<Question> GetQuestion(int id)
        {
            var question = _dbContext.Questions.Find(id);
            if (question == null) { return NotFound(); }
            return question;
        }

        [HttpPost]
        public IActionResult CreateQuestion([FromBody] Question question)
        {
            _dbContext.Questions.Add(question);
            _dbContext.SaveChanges();
            return CreatedAtAction(nameof(GetQuestion), new {id = question.Id }, question);
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteQuestion(int id)
        {
            var question = _dbContext.Questions.Find(id);
            if (question == null) { return NotFound(); };
            _dbContext.Questions.Remove(question);
            _dbContext.SaveChanges();
            return NoContent();
        }
    }
}
