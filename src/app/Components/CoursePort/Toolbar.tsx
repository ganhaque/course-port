'use client';

import { CheckIcon, CalendarDays } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../UI/DropdownMenu"
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "../UI/Popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "../UI/Command";
import {
  timeIntervals,
  departments,
  semesters,
  days,
  mapDaysToShortForm,
} from './Data'
import { useState } from "react";
import { useScheduleContext } from "./ScheduleProvider";
import './toolbar.css';
import { columnIdArray } from "./Columns";

function Toolbar() {
  const reversedTimeIntervals = [...timeIntervals].reverse();
  const [fromTime, setFromTime] = useState(timeIntervals[0]); // Initialize the selected time state
  const [toTime, setToTime] = useState(reversedTimeIntervals[0]); // Initialize the selected time state
  const {
    selectedSemester,
    setSelectedSemester,
    selectedCourses,
    setSelectedCourses,
    selectedDepartment,
    setSelectedDepartment,
    selectedDays,
    setSelectedDays,
    database,
    activePageIndex,
    setActivePageIndex,
    filterString,
    setFilterString,
    visibleColumns,
    setVisibleColumns
  } = useScheduleContext();

  const [isDepartmentPopoverOpen, setIsDepartmentPopoverOpen] = useState(false);
  const [isSemesterPopoverOpen, setIsSemesterPopoverOpen] = useState(false);

  return (
    <div className="toolbar-container" >
      <input
        style={{
          width:'16rem'
        }}
        value={filterString}
        onChange={(event) => {setFilterString(event.target.value)}}
        placeholder="Filter courses"
      >
      </input>

      <Popover>
        <PopoverTrigger asChild>
          <button className="ml-auto">
            Columns
          </button>
        </PopoverTrigger>
        <PopoverContent
          style={{
            backgroundColor:'hsla(var(--black))',
            /* padding:'0.25rem', */
            borderRadius:'0.25rem',
            borderColor:'hsla(var(--yellow))',
            borderWidth:"1px",
          }}
          align='start'
        >
          <Command
            filter={(value, search) => {
              if (value.includes(search)) return 1
              return 0
            }}
          >
            <CommandInput
              style={{
                borderBottomLeftRadius:'0',
                borderBottomRightRadius:'0',
                borderColor:'hsla(var(--yellow))',
                borderBottomWidth:"0",
              }}
              placeholder="Toggle column visibility"
            />
            <CommandList
              style={{
                borderWidth:'1px',
                borderBottomLeftRadius:'0.25rem',
                borderBottomRightRadius:'0.25rem',
                borderColor:'hsla(var(--yellow))',
              }}
            >
              <CommandEmpty> No result found. </CommandEmpty>
              <CommandGroup>

                {columnIdArray.map((item, index) => {
                  const isColumnVisible = visibleColumns.some((id) => id === item.id);
                  return (
                    <CommandItem
                      key={index}
                      onSelect={() => {
                        console.log(item.id)
                        if (isColumnVisible) {
                          setVisibleColumns(prevState => prevState.filter
                            (element => element !== item.id));
                        }
                        else {
                          setVisibleColumns(prevState => [...prevState, item.id]);
                        }
                      }}
                    >
                      <CheckIcon style={{
                        marginRight:"0.5rem",
                        height:"1rem",
                        width:"1rem",
                        opacity: (isColumnVisible) ? "1" : "0"
                      }}
                      />
                      {item.label}
                    </CommandItem>
                  )
                })}
                {/* {semesters.map((semester, index) => ( */}
                {/*   <CommandItem */}
                {/*     key={index} */}
                {/*     onSelect={() => { */}
                {/*       setSelectedSemester(semester); */}
                {/*       setIsSemesterPopoverOpen(false); */}
                {/*     }}> */}
                {/*     {semester} */}
                {/*   </CommandItem> */}
                {/* ))} */}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      Semester:
      <Popover open={isSemesterPopoverOpen} onOpenChange={(isOpen) => {setIsSemesterPopoverOpen(isOpen)}}>
        <PopoverTrigger>
          {selectedSemester}
        </PopoverTrigger>
        <PopoverContent
          style={{
            backgroundColor:'hsla(var(--black))',
            /* padding:'0.25rem', */
            borderRadius:'0.25rem',
          }}
          align='start'
        >
          <Command
            filter={(value, search) => {
              if (value.includes(search)) return 1
              return 0
            }}
          >
            <CommandInput
              style={{
                borderBottomLeftRadius:'0',
                borderBottomRightRadius:'0',
                borderColor:'hsla(var(--yellow))',
                borderBottomWidth:"0",
              }}
              placeholder="Filter semester"
            />
            <CommandList
              style={{
                borderWidth:'1px',
                borderBottomLeftRadius:'0.25rem',
                borderBottomRightRadius:'0.25rem',
                borderColor:'hsla(var(--yellow))',
              }}
            >
              <CommandEmpty> No result found. </CommandEmpty>
              <CommandGroup>
                {semesters.map((semester, index) => (
                  <CommandItem
                    key={index}
                    onSelect={() => {
                      setSelectedSemester(semester);
                      setIsSemesterPopoverOpen(false);
                    }}>
                    {semester}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      Department:
      <Popover open={isDepartmentPopoverOpen} onOpenChange={(isOpen) => {setIsDepartmentPopoverOpen(isOpen)}}>
        <PopoverTrigger>
          {selectedDepartment}
          {/* Department: */}
        </PopoverTrigger>
        <PopoverContent
          style={{
            backgroundColor:'hsla(var(--black))',
            /* padding:'0.25rem', */
            borderRadius:'0.25rem',
            padding:'0.25rem'
          }}
          align='start'
        >
          <Command
            filter={(value, search) => {
              if (value.includes(search)) return 1
              return 0
            }}
          >
            <CommandInput
              style={{
                borderBottomLeftRadius:'0',
                borderBottomRightRadius:'0',
                borderColor:'hsla(var(--yellow))',
                borderBottomWidth:"0",
              }}
              placeholder="Filter Department"
            />
            <CommandList
              style={{
                borderWidth:'1px',
                borderBottomLeftRadius:'0.25rem',
                borderBottomRightRadius:'0.25rem',
                borderColor:'hsla(var(--yellow))',
              }}
            >
              <CommandEmpty> No result found. </CommandEmpty>
              <CommandGroup>
                {departments.map((department, index) => (
                  <CommandItem
                    key={index}
                    onSelect={() => {
                      setSelectedDepartment(department);
                      setIsDepartmentPopoverOpen(false);
                    }}>
                    {department}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger>
          <div
            style={{
              display:"flex",
              alignItems:"center"
            }}
          >
            <CalendarDays style={{height:"1rem", width:"1rem", marginRight:"0.5rem"}}/>
            Days
          </div>
        </PopoverTrigger>
        <PopoverContent
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "hsla(var(--darker_black))",
            borderWidth: "1px",
            borderColor: "hsla(var(--yellow))",
            borderRadius: "0.25rem"
          }}
        >
          {days.map((day) => (
            <button
              key={day}
              style={{
                width:"100%",
                display:"flex",
                alignItems:"center",
              }}
              className="ghost"
              onClick={() => {
                console.log("click");
                setSelectedDays((prevSelectedDays) => {
                  const isDaySelected = prevSelectedDays.includes(day);

                  if (isDaySelected) {
                    return prevSelectedDays.filter((selectedDay) => selectedDay !== day);
                  }
                  else {
                    return [...prevSelectedDays, day];
                  }
                });
              }}

            >
              <CheckIcon style={{
                marginRight:"0.5rem",
                height:"1rem",
                width:"1rem",
                opacity: (selectedDays.some(sday => sday === day)) ? "1" : "0"
              }}
              />
              {day}
            </button>
          ))}
        </PopoverContent>
      </Popover>

      From:
      <Popover>
        <PopoverTrigger>
          {fromTime}
        </PopoverTrigger>
        <PopoverContent
          style={{
            backgroundColor:'hsla(var(--black))',
            borderRadius:'0.25rem',
          }}
          align='start'>
          <Command>
            <CommandInput
              style={{
                borderBottomLeftRadius:'0',
                borderBottomRightRadius:'0',
                borderColor:'hsla(var(--yellow))',
                borderBottomWidth:"0",
              }}
              placeholder="Type to search..."
            />
            <CommandList
              style={{
                borderWidth:'1px',
                borderBottomLeftRadius:'0.25rem',
                borderBottomRightRadius:'0.25rem',
                borderColor:'hsla(var(--yellow))',
              }}
            >
              <CommandEmpty> No result found. </CommandEmpty>
              <CommandGroup>
                {timeIntervals.map((time, index) => (
                  <CommandItem key={index} onSelect={() => {setFromTime(time)}}>
                    {time}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      To:
      <Popover>
        <PopoverTrigger>
          {toTime}
        </PopoverTrigger>
        <PopoverContent
          style={{
            backgroundColor:'hsla(var(--black))',
            borderRadius:'0.25rem',
          }}
          align='start'>
          <Command>
            <CommandInput
              style={{
                borderBottomLeftRadius:'0',
                borderBottomRightRadius:'0',
                borderColor:'hsla(var(--yellow))',
                borderBottomWidth:"0",
              }}
              placeholder="Type to search..."
            />
            <CommandList
              style={{
                borderWidth:'1px',
                borderBottomLeftRadius:'0.25rem',
                borderBottomRightRadius:'0.25rem',
                borderColor:'hsla(var(--yellow))',
              }}
            >
              <CommandEmpty> No result found. </CommandEmpty>
              <CommandGroup>
                {reversedTimeIntervals.map((time, index) => (
                  <CommandItem key={index} onSelect={() => {setToTime(time)}}>
                    {time}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>


      <button
        onClick={() => {
          console.log("Cycle through pages~");
          /* NOTE: the 2 is the length of the pages array in MainContainer, */
          /* remember to update it when adding new page to the array */
          setActivePageIndex((activePageIndex + 1) % 2);
        }}
      >
        Time Table View
      </button>

      {/* <button */}
      {/*   onClick={() => { */}
      {/*     console.log("Selected Course:"); */}
      {/*     selectedCourses.forEach((courses) => { */}
      {/*       console.log(courses); */}
      {/*     }) */}
      {/*     selectedDays.forEach((day) => { */}
      {/*       console.log(day); */}
      {/*     }) */}
      {/*   }} */}
      {/* > */}
      {/*   DEBUG: Selected Courses */}
      {/* </button> */}
    </div>
  )
}

export default Toolbar;
