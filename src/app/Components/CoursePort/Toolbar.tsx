'use client';

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
    database
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
        onClick={() => {console.log("Click!")}}
      >
        List View
      </button>
    </div>
  )
}

export default Toolbar;
