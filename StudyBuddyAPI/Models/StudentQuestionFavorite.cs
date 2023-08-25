using System;
using System.Collections.Generic;

namespace StudyBuddyAPI.Models;

public partial class StudentQuestionFavorite
{
    public int Id { get; set; }

    public int? StudentId { get; set; }

    public int? QuestionId { get; set; }

 
}
