'use client'

/* import { Popover } from "../UI/Popover"; */
import { useScheduleContext } from "./ScheduleProvider";
/* import { useState, useEffect } from "react"; */
/* import { Database, Course, mapDaysToShortForm, timeStringToMinutes } from "./Data"; */
/* import { columns } from "./Columns"; */
import { DataTable } from "./DataTable"
/* import { SelectedPlaceHolder } from "./SelectedPlaceholder"; */
import CourseTimeTable from "./CourseTimeTable";
import HelpPage from "./HelpPage";

function MainContainer() {
  const {
    activePageIndex,
  } = useScheduleContext();


  const pages = [
    /* <DataTable columns={columns} data={filteredCourses} />, */
    <DataTable/>,
    <CourseTimeTable/>,
    /* <SelectedPlaceHolder/>, */
    <HelpPage/>,
  ]

  return (
      <div
        style={{
          display:'flex',
          flexDirection:'column',
          flexGrow:'1',
          backgroundColor: 'hsla(var(--black))',
          /* overflow:'scroll', */
          height: 'calc(100vh - 4rem)',
          /* borderBottomLeftRadius:'0.75rem', */
          /* borderBottomRightRadius:'0.75rem', */
          /* borderRadius:'0.75rem', */
          /* margin:"0 0.5rem" */
          /* padding:"0 0.5rem" */
        }}
      >
        {/* <DataTable columns={columns} data={filteredData} /> */}
        {pages[activePageIndex]}

      </div>
  )
}

export default MainContainer;
