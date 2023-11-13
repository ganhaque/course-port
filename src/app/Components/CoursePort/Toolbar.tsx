'use client';

import { CheckIcon } from "lucide-react";
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
  } = useScheduleContext();

  const [isDepartmentPopoverOpen, setIsDepartmentPopoverOpen] = useState(false);
  const [isSemesterPopoverOpen, setIsSemesterPopoverOpen] = useState(false);

  return (
    <div
      style={{
        backgroundColor: 'hsla(var(--black2))',
        display:'flex',
        alignItems: 'center',
        gap:'0.5rem',
        height:'4rem',
        padding:'1rem',
        /* borderTopLeftRadius:'0.75rem', */
        /* borderTopRightRadius:'0.75rem', */
        borderRadius:'0.75rem',
      }}
    >
      <input
        style={{
          width:'16rem'
        }}
        placeholder="Filter by title"
      >
      </input>

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
          align='start'>
          <Command>
            <CommandInput
              style={{
                /* borderWidth:'0', */
                borderBottomLeftRadius:'0',
                borderBottomRightRadius:'0',
                borderColor:'hsla(var(--red))',
                /* borderBottomWidth:'1px', */
              }}
              placeholder="Type to search..."
            />
            <CommandList
              style={{
                borderWidth:'1px',
                borderBottomLeftRadius:'0.25rem',
                borderBottomRightRadius:'0.25rem',
                borderColor:'hsla(var(--red))',
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
          align='start'>
          <Command>
            <CommandInput
              style={{
                /* borderWidth:'0', */
                /* borderBottomLeftRadius:'0', */
                /* borderBottomRightRadius:'0', */
                borderColor:'hsla(var(--red))',
                /* borderBottomWidth:'1px', */
              }}
              placeholder="Type to search..."
            />
            <CommandList
              style={{
                /* borderWidth:'1px', */
                /* borderBottomLeftRadius:'0.25rem', */
                /* borderBottomRightRadius:'0.25rem', */
                borderRadius:'0.25rem',
                /* borderColor:'hsla(var(--red))', */
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
          Days
        </PopoverTrigger>
        <PopoverContent
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            background: "hsla(var(--darker_black))",
            borderWidth: "1px",
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
                borderColor:'hsla(var(--red))',
              }}
              placeholder="Type to search..."
            />
            <CommandList
              style={{
                borderWidth:'1px',
                borderBottomLeftRadius:'0.25rem',
                borderBottomRightRadius:'0.25rem',
                borderColor:'hsla(var(--red))',
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
                borderColor:'hsla(var(--red))',
              }}
              placeholder="Type to search..."
            />
            <CommandList
              style={{
                borderWidth:'1px',
                borderBottomLeftRadius:'0.25rem',
                borderBottomRightRadius:'0.25rem',
                borderColor:'hsla(var(--red))',
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
        Cycle to next page
      </button>

      <button
        onClick={() => {
          console.log("Selected Course:");
          selectedCourses.forEach((courses) => {
            console.log(courses);
          })
          selectedDays.forEach((day) => {
            console.log(day);
          })
        }}
      >
        DEBUG: Selected Courses
      </button>
    </div>
  )
}

export default Toolbar;
