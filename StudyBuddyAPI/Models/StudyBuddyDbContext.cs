using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace StudyBuddyAPI.Models;

public partial class StudyBuddyDbContext : DbContext
{
    public StudyBuddyDbContext(DbContextOptions<StudyBuddyDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Question> Questions { get; set; }

    public virtual DbSet<Student> Students { get; set; }

    public virtual DbSet<StudentQuestionFavorite> StudentQuestionFavorites { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Question>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Question__3214EC07C76CFC70");

            entity.Property(e => e.Answer).HasMaxLength(250);
            entity.Property(e => e.Question1)
                .HasMaxLength(250)
                .HasColumnName("Question");
        });

        modelBuilder.Entity<Student>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Students__3214EC074FAFDB72");

            entity.Property(e => e.Username).HasMaxLength(25);
        });

        //modelBuilder.Entity<StudentQuestionFavorite>(entity =>
        //{
        //    entity.HasKey(e => e.Id).HasName("PK__StudentQ__3214EC07DDAE44BE");

        //    entity.HasOne(d => d.Question).WithMany(p => p.StudentQuestionFavorites)
        //        .HasForeignKey(d => d.QuestionId)
        //        .HasConstraintName("FK__StudentQu__Quest__3C69FB99");

        //    entity.HasOne(d => d.Student).WithMany(p => p.StudentQuestionFavorites)
        //        .HasForeignKey(d => d.StudentId)
        //        .HasConstraintName("FK__StudentQu__Stude__3B75D760");
        //});

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
