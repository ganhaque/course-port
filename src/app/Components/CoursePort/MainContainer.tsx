'use client'

/* import { Popover } from "../UI/Popover"; */
import { useScheduleContext } from "./ScheduleProvider";
/* import { useState, useEffect } from "react"; */
/* import { Database, Course, mapDaysToShortForm, timeStringToMinutes } from "./Data"; */
/* import { columns } from "./Columns"; */
import { DataTable } from "./DataTable"
import { SelectedPlaceHolder } from "./SelectedPlaceholder";
import Settings from "./Settings";

function MainContainer() {
  const {
    activePageIndex,
  } = useScheduleContext();


  const pages = [
    <Settings/>,
    /* <DataTable columns={columns} data={filteredCourses} />, */
    <DataTable/>,
    <SelectedPlaceHolder/>,
  ]

  return (
    <div
      style={{
        display:'flex',
        flexDirection:'column',
        flexGrow:'1',
        backgroundColor: 'hsla(var(--black))',
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
