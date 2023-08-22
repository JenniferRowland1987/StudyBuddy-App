using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudyBuddyAPI.Models;

namespace StudyBuddyAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FavoritesController : ControllerBase
    {
        private readonly StudyBuddyDbContext _dbContext;

        public FavoritesController(StudyBuddyDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        [HttpGet]
        public ActionResult<IEnumerable<StudentQuestionFavorite>> GetAllFavorites()
        {
            return _dbContext.StudentQuestionFavorites.ToList();
        }

        [HttpGet("{id}")]
        public IActionResult GetFavorites(int id)
        {
            var student = _dbContext.Students.Find(id);
            var favorites = _dbContext.StudentQuestionFavorites.Where(f => f.StudentId == id).ToList();
            return Ok (favorites);
        }

        [HttpPost]
        public IActionResult AddFavorite([FromBody] StudentQuestionFavorite studentQuestionFavorite)
        {
            if (studentQuestionFavorite == null)
            {
                return BadRequest();
            }
            var student = _dbContext.Students.FirstOrDefault(s => s.Id == studentQuestionFavorite.StudentId);
            var question = _dbContext.Questions.FirstOrDefault(q => q.Id == studentQuestionFavorite.QuestionId);

            if (student == null || question == null) 
            {
                return NotFound();
            }

            var existingFavorite = _dbContext.StudentQuestionFavorites.FirstOrDefault(f => f.StudentId == student.Id && f.QuestionId == question.Id);
            if (existingFavorite != null) { return BadRequest(); }

            var newFavorite = new StudentQuestionFavorite { StudentId = student.Id, QuestionId = question.Id };

            _dbContext.StudentQuestionFavorites.Add(newFavorite);
            _dbContext.SaveChanges();

            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteFavorite(int id)
        {
            var favorite = _dbContext.StudentQuestionFavorites.Find(id);
            if (favorite == null) { return NotFound(); } 
            _dbContext.StudentQuestionFavorites.Remove(favorite);
            _dbContext.SaveChanges();
            return NoContent();
        }



    }
}
