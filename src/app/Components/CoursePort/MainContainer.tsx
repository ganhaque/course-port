'use client'

/* import { Popover } from "../UI/Popover"; */
import { useScheduleContext } from "./ScheduleProvider";
import { useState, useEffect } from "react";
import { Course } from "./Data";
import { columns } from "./Columns";
/* import { */
/*   Table, */
/*   TableBody, */
/*   TableCaption, */
/*   TableCell, */
/*   TableHead, */
/*   TableHeader, */
/*   TableRow, */
/* } from "../UI/Table" */
import { DataTable } from "./DataTable"

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

    /* console.log('Filtered Semester:', filteredSemester); */
    if (filteredSemester) {
      const filteredDepartment = filteredSemester.departments.find(
        (dept) => dept.departmentTitle === selectedDepartment
      );
      if (filteredDepartment) {
        /* console.log('Filtered Department:', filteredDepartment); */
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
      {/* <Table> */}
      {/*   <TableCaption>Classes for {selectedDepartment} in {selectedSemester}</TableCaption> */}
      {/*   <TableHeader> */}
      {/*     <TableRow> */}
      {/*       <TableHead */}
      {/*         style={{ */}
      {/*         }} */}
      {/*       >Enrollment</TableHead> */}
      {/*       <TableHead */}
      {/*         style={{ */}
      {/*         }}>Available</TableHead> */}
      {/*       <TableHead>Abbreviation</TableHead> */}
      {/*       <TableHead>Number</TableHead> */}
      {/*       <TableHead>Title</TableHead> */}
      {/*       <TableHead>Credit Hour</TableHead> */}
      {/*     </TableRow> */}
      {/*   </TableHeader> */}
      {/*   <TableBody> */}
      {/*     {filteredData.map((course) => ( */}
      {/*       <TableRow> */}
      {/*         <TableCell>{course.enrollmentCount}</TableCell> */}
      {/*         <TableCell>{course.available}</TableCell> */}
      {/*         <TableCell className="font-medium">{course.abbreviation}</TableCell> */}
      {/*         <TableCell className="font-medium">{course.number}</TableCell> */}
      {/*         <TableCell className="text-right">{course.title}</TableCell> */}
      {/*         <TableCell className="text-right">{course.creditHour}</TableCell> */}
      {/*       </TableRow> */}
      {/*     ))} */}
      {/*   </TableBody> */}
      {/* </Table> */}

      <DataTable columns={columns} data={filteredData} />

    </div>
  )
}

export default MainContainer;
