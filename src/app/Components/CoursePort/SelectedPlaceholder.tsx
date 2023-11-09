import { useScheduleContext } from "./ScheduleProvider";

export const SelectedPlaceHolder = () => {
  const {
    /* selectedSemester, */
    /* setSelectedSemester, */
    selectedCourses,
    /* setSelectedCourses, */
    /* selectedDepartment, */
    /* setSelectedDepartment, */
    /* database */
  } = useScheduleContext();

  return (
    <div>
      {selectedCourses.map((course) => (
        <div>
          {course.number}
          {course.title}
        </div>
      ))}
    </div>
  )
}
