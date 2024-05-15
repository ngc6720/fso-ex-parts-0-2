const Part = ({ part }: { part: Part }) => (
  <li>
    {part.name} {part.exercises}
  </li>
);

const Course = ({ course }: { course: Course }) => {
  const totalExercises = course.parts.reduce(
    (result, item) => result + item.exercises,
    0
  );

  return (
    <>
      <h2>{course.name}</h2>
      <ol>
        {course.parts.map((part) => (
          <Part key={part.id} part={part}></Part>
        ))}
      </ol>
      <p>
        <strong>Total of {totalExercises} exercises</strong>
      </p>
    </>
  );
};

export default Course;
