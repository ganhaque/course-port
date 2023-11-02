'use client'

/* import { Popover } from "../UI/Popover"; */
import { useScheduleContext } from "./ScheduleProvider";
import { useState, useEffect } from "react";
import { Course } from "./Data";

function MainContainer() {
  const {
    selectedSemester,
    setSelectedSemester,
    selectedCourses,
    setSelectedCourses,
    selectedDepartment,
    setSelectedDepartment,
    database
  } = useScheduleContext();
  const [filteredData, setFilteredData] = useState<Course[]>([]);

  // Use useEffect to update filtered data when selectedSemester or selectedDepartment changes
  useEffect(() => {
    const filteredSemester = database.find(
      (semester) => semester.semesterTitle === selectedSemester
    );

    console.log('Filtered Semester:', filteredSemester);
    if (filteredSemester) {
      const filteredDepartment = filteredSemester.departments.find(
        (dept) => dept.departmentTitle === selectedDepartment
      );
      if (filteredDepartment) {
        console.log('Filtered Department:', filteredDepartment);
        setFilteredData(filteredDepartment.courses)
      }
    }


    /* const filteredData = database.filter( */
    /*   (semester) => semester.semesterTitle === selectedSemester)[0]; */
    /* const departmentData = filteredData.departments.filter( */
    /*   (dept) => dept.departmentTitle === selectedDepartment)[0]; */
    /* setFilteredData(departmentData ? departmentData.courses : []); */
  }, [selectedSemester, selectedDepartment, database]);

  return (
    <div
      style={{
        display:'flex',
        flexDirection:'column',
        flexGrow:'1',
        backgroundColor: 'hsla(var(--black2))',
        /* borderBottomLeftRadius:'0.75rem', */
        /* borderBottomRightRadius:'0.75rem', */
        borderRadius:'0.75rem',
      }}
    >
      {filteredData.map((course) => (
        <div
          style={{
            display:'flex',
            gap:'0.5rem',
          }}
          key={course.title}
        >
          {/* Render course information here */}
          <div>{course.available}</div>
          <div>{course.enrollmentCount}</div>
          <div>{course.abbreviation}</div>
          <div>{course.number}</div>
          <div>{course.section}</div>
          <div>{course.title}</div>
          <div>{course.creditHour}</div>
          <div>{course.begin}</div>
          <div>{course.end}</div>
          <div>{course.days}</div>
          <div>{course.roomNumber}</div>
          <div>{course.building}</div>
          <div>{course.instructor}</div>
        </div>
      ))}
    </div>
  )
}

export default MainContainer;
