'use client';

import { GrDatabase } from "react-icons/gr";
import {
  CheckIcon,
  CalendarDays,
  /* XIcon, */
  Clock, Palette,
  Settings,
  CalendarCheck,
  ChevronRight,
  ChevronLeft,
  Paintbrush
  /* ChevronRightSquare */
} from "lucide-react";
import { MdPalette } from "react-icons/md";
import { MixerHorizontalIcon } from "@radix-ui/react-icons"
/* import { */
/*   DropdownMenu, */
/*   DropdownMenuCheckboxItem, */
/*   DropdownMenuContent, */
/*   DropdownMenuTrigger, */
/* } from "../UI/DropdownMenu" */
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
  /* timeIntervals, */
  departments,
  semesters,
  days,
  /* mapDaysToShortForm, */
  departmentToAbbreviationMap,
  timeStringToMinutes,
} from './Data'
import { useState } from "react";
import { useScheduleContext } from "./ScheduleProvider";
import './Toolbar.css';
import { columnIdArray } from "./Columns";
import { Separator } from "../UI/Separator";
import { ThemeMap } from "./Colorscheme";
import { TooltipProvider } from "@radix-ui/react-tooltip";

/* TODO: Toolbar change based on the page it's on */
function Toolbar() {
  /* const reversedTimeIntervals = [...timeIntervals].reverse(); */
  /* const [fromTime, setFromTime] = useState(timeIntervals[0]); // Initialize the selected time state */
  /* const [toTime, setToTime] = useState(reversedTimeIntervals[0]); // Initialize the selected time state */
  /* const [toTime, setToTime] = useState(reversedTimeIntervals[0]); // Initialize the selected time state */
  const {
    selectedSemester,
    setSelectedSemester,
    /* selectedCourses, */
    /* setSelectedCourses, */
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
    setVisibleColumns,
    toggleSelectedDays,
    toggleDaySelection,
    isShowTBADays,
    setIsShowTBADays,
    isShowTBATime,
    setIsShowTBATime,
    timeIntervals,
    reversedTimeIntervals,
    fromTime,
    setFromTime,
    toTime,
    setToTime,
    /* selectedTheme, */
    setSelectedTheme,
  } = useScheduleContext();

  /* const timeIntervals = Object.keys(timeStringToMinutes); */
  /* const reversedTimeIntervals = Object.keys(timeStringToMinutes).reverse(); */

  const [isDepartmentPopoverOpen, setIsDepartmentPopoverOpen] = useState(false);
  const [isSemesterPopoverOpen, setIsSemesterPopoverOpen] = useState(false);
  const [isFromPopoverOpen, setIsFromPopoverOpen] = useState(false);
  const [isToPopoverOpen, setIsToPopoverOpen] = useState(false);

  return (
    <div className="toolbar-container" >

      <Popover>
        <PopoverTrigger asChild>
          <button
            style={{
              display:"flex",
              /* height:"100%", */
              alignItems:"center",
              justifyContent:"center",
            }}
            className="tooltip-container"
          >
            <MixerHorizontalIcon style={{height:"1.25rem", width:"1.25rem"}}/>
            <div className="tooltip-content-right-side">
              Columns
            </div>
          </button>
        </PopoverTrigger>
        <PopoverContent align='start'>
          <Command
            filter={(value, search) => {
              if (value.includes(search.toLowerCase())) return 1
              return 0
            }}
          >
            <CommandInput
              placeholder="Toggle column visibility"
            />
            <CommandList>
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
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>


      <input
        style={{
          minWidth:'10rem',
          maxWidth:'20rem',
          flexGrow:'1',
          overflow:'hidden'
        }}
        value={filterString}
        onChange={(event) => {setFilterString(event.target.value)}}
        placeholder="Filter by number, title, or instructor"
      >
      </input>

      <Popover open={isSemesterPopoverOpen} onOpenChange={(isOpen) => {setIsSemesterPopoverOpen(isOpen)}}>
        <PopoverTrigger>
          {selectedSemester}
        </PopoverTrigger>
        <PopoverContent align='start'>
          <Command
            filter={(value, search) => {
              if (value.includes(search.toLowerCase())) return 1
              return 0
            }}
          >
            <CommandInput
              placeholder="Filter semester"
            />
            <CommandList>
              <CommandEmpty> No result found. </CommandEmpty>
              <CommandGroup>
                {semesters.map((semester, index) => (
                  <CommandItem
                    style={{
                      backgroundColor: selectedSemester === semester ? "hsla(var(--grey), 0.4)" : "",
                      color: selectedSemester === semester ? "hsla(var(--primary))" : "hsla(var(--base05))"
                    }}
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

      <Popover open={isDepartmentPopoverOpen} onOpenChange={(isOpen) => {setIsDepartmentPopoverOpen(isOpen)}}>
        <PopoverTrigger>
          {/* {departmentToAbbreviationMap[selectedDepartment]} */}
          {database[selectedSemester][selectedDepartment][0].abbreviation}
          {/* {departmentToAbbreviationMap[selectedDepartment] === "" ? "" : " - "} */}
          {/* {selectedDepartment} */}
        </PopoverTrigger>
        <PopoverContent align='start'>
          <Command
            filter={(value, search) => {
              if (value.includes(search.toLowerCase())) return 1
              return 0
            }}
          >
            <CommandInput
              placeholder="Filter Department"
            />
            <CommandList>
              <CommandEmpty> No result found. </CommandEmpty>
              <CommandGroup>
                {/* <CommandItem */}
                {/*   onSelect={() => { */}
                {/*     setSelectedDepartment("ALL"); */}
                {/*     setIsDepartmentPopoverOpen(false); */}
                {/*   }}> */}
                {/*   ALL!!! */}
                {/* </CommandItem> */}
                {/* Filter out the one without any abbreviation/no class, add a setting to change this later*/}
                {departments
                  .filter(department => database[selectedSemester][department].length !== 0)
                  .map((department, index) => (
                    <CommandItem
                      style={{
                        backgroundColor: selectedDepartment === department ? "hsla(var(--grey), 0.4)" : "",
                        color: selectedDepartment === department ? "hsla(var(--primary))" : "hsla(var(--base05))"
                      }}
                      key={index}
                      onSelect={() => {
                        setSelectedDepartment(department);
                        setIsDepartmentPopoverOpen(false);
                      }}>
                      {/* {departmentToAbbreviationMap[department]} */}
                      {/* {departmentToAbbreviationMap[department] === "" ? "" : " - "} */}
                      {database[selectedSemester][department][0].abbreviation}
                      { " - " }
                      {
                        department
                        .toLowerCase()
                        .replace(/\b\w/g, (match) => match.toUpperCase())
                      }
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
            <Clock style={{height:"1.25rem", width:"1.25rem", marginRight:"0.5rem"}}/>
            Time
          </div>
        </PopoverTrigger>
        <PopoverContent
          style={{
            borderWidth:"1px",
            borderColor:"hsla(var(--primary))"
          }}
        >
          {/* <div */}
          {/*   style={{ */}
          {/*     display:"flex", */}
          {/*     flexDirection:"column", */}
          {/*   }} */}
          {/* > */}
          <button
            style={{
              width:"100%",
            }}
            className="ghost"
            onClick={() => {
              setIsShowTBATime(!isShowTBATime);
            }}
          >
            <CheckIcon style={{
              marginRight:"0.5rem",
              height:"1rem",
              width:"1rem",
              opacity: isShowTBATime ? "1" : "0"
            }}/>
            TBA
          </button>
          <button
            style={{
              width:"100%",
            }}
            className="ghost"
            onClick={() => {
              setFromTime(timeIntervals[0]);
              setToTime(reversedTimeIntervals[0]);
            }}
          >
            Reset
          </button>
          {/* </div> */}
          <Separator
            style={{
              margin:"0.25rem 0",
              backgroundColor:"hsla(var(--primary))"
            }}
            orientation="horizontal"
          />
          <div
            style={{
              display: "flex",
              padding: "0.5rem",
              alignItems: "center",
            }}
          >
            <Popover open={isFromPopoverOpen} onOpenChange={(isOpen) => {setIsFromPopoverOpen(isOpen)}}>
              <PopoverTrigger>
                {fromTime}
              </PopoverTrigger>
              <PopoverContent
                style={{
                  backgroundColor:'hsla(var(--black))',
                  borderRadius:'0.25rem',
                }}
                align='start'
              >
                <Command>
                  <CommandInput
                    placeholder="From"
                  />
                  <CommandList>
                    <CommandEmpty> No result found. </CommandEmpty>
                    <CommandGroup>
                      {timeIntervals
                        .map((time, index) => (
                          <CommandItem
                            key={index}
                            onSelect={() => {
                              setFromTime(time)
                              setIsFromPopoverOpen(false);
                            }}
                          >
                            {time}
                          </CommandItem>
                        ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
            <div style={{margin:"0 0.5rem"}}>
              -
            </div>
            <Popover open={isToPopoverOpen} onOpenChange={(isOpen) => {setIsToPopoverOpen(isOpen)}}>
              <PopoverTrigger>
                {toTime}
              </PopoverTrigger>
              <PopoverContent
                style={{
                  backgroundColor:'hsla(var(--black))',
                  borderRadius:'0.25rem',
                }}
                align='start'
              >
                <Command>
                  <CommandInput
                    placeholder="To"
                  />
                  <CommandList>
                    <CommandEmpty> No result found. </CommandEmpty>
                    <CommandGroup>
                      {timeIntervals
                        .filter((time) => {
                          return timeStringToMinutes[time] > timeStringToMinutes[fromTime]
                        })
                        .map((time, index) => (
                          <CommandItem
                            key={index}
                            onSelect={() => {
                              setToTime(time)
                              setIsToPopoverOpen(false);
                            }}
                          >
                            {time}
                          </CommandItem>
                        ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
          </div>
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
            <div
              style={{
                display:"flex",
                alignItems:"center"
              }}
              /* className="tooltip-container" */
            >
              <CalendarDays
                style={{
                  height:"1.25rem",
                  width:"1.25rem",
                  marginRight:"0.5rem"
                }}
              />
              {/* <div className="tooltip-content-right-side"> */}
              {/*   Days */}
              {/* </div> */}
              Days
            </div>
          </div>
        </PopoverTrigger>
        <PopoverContent
          style={{
            borderWidth:"1px",
            borderColor:"hsla(var(--primary)"
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
                toggleDaySelection(day);
              }}
            >
              <CheckIcon style={{
                marginRight:"0.5rem",
                height:"1rem",
                width:"1rem",
                opacity: selectedDays[day] ? "1" : "0"
              }}/>
              {day}
            </button>
          ))}
          <button
            className="ghost"
            style={{
              width:"100%",
              display:"flex",
              alignItems:"center",
            }}
            onClick={() => {
              setIsShowTBADays(!isShowTBADays);
            }}
          >
            <CheckIcon style={{
              marginRight:"0.5rem",
              height:"1rem",
              width:"1rem",
              opacity: isShowTBADays ? "1" : "0"
            }}/>
            TBA
          </button>
          <Separator
            style={{
              margin:"0.25rem 0",
              backgroundColor:"hsla(var(--primary))"
            }}
            orientation="horizontal"
          />
          <button
            style={{
              width:"100%",
            }}
            className="ghost"
            onClick={() => {
              toggleSelectedDays();
            }}
          >
            Inverse
          </button>
          <button
            style={{
              width:"100%",
            }}
            className="ghost"
            onClick={() => {
              setIsShowTBADays(true);
              const updatedDays: { [day: string]: boolean } = {};
              Object.keys(selectedDays).forEach(day => {
                updatedDays[day] = true;
              });
              setSelectedDays(updatedDays);
            }}
          >
            Reset
          </button>
        </PopoverContent>
      </Popover>

      <Popover>
        <PopoverTrigger
          className="tooltip-container"
        >
          <div
            style={{
              display:"flex",
              alignItems:"center"
            }}
          >
            <MdPalette
              style={{
                height:"1.25rem",
                width:"1.25rem",
                /* marginRight:"0.5rem" */
              }}
            />
            <div className="tooltip-content-right-side">
              Theme
            </div>
            {/* Theme */}
          </div>
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
              if (value.includes(search.toLowerCase())) return 1
              return 0
            }}
          >
            <CommandInput
              placeholder="Switch theme"
            />
            <CommandList>
              <CommandEmpty> No result found. </CommandEmpty>
              <CommandGroup>
                {Object.entries(ThemeMap).map(([themeKey, theme]) => (
                  <CommandItem
                    key={themeKey}
                    onSelect={() => {
                      setSelectedTheme(themeKey);
                    }}>
                    {theme.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <button
        style={{
          display:"flex",
          /* height:"100%", */
          alignItems:"center",
          justifyContent:"center",
          marginLeft:"auto",
        }}
        /* className="ghost" */
        className="tooltip-container"
        onClick={() => {
          console.log("Cycle through pages~");
          /* NOTE: the 3 is the length of the pages array in MainContainer, */
          /* remember to update it when adding new page to the array */
          setActivePageIndex((activePageIndex + 1) % 2);
        }}
      >
        {activePageIndex !== 0 ? (
          <div
            style={{
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
            }}
          >
            <div className="tooltip-content-left-side">
              Booklet
              <ChevronRight
                style={{
                  height:"1.25rem",
                  width:"1.25rem",
                  /* marginRight:"0.5rem" */
                }}
              />
            </div>
            <GrDatabase
              style={{
                height:"1.25rem",
                width:"1.25rem",
              }}
            />
          </div>
        ) : (
            <div
              style={{
                display:"flex",
                alignItems:"center",
                justifyContent:"center",
              }}
            >
              <div className="tooltip-content-left-side">
                Time Table
                <ChevronRight
                  style={{
                    height:"1.25rem",
                    width:"1.25rem",
                    /* marginRight:"0.5rem" */
                  }}
                />
              </div>
              <CalendarCheck
                style={{
                  height:"1.25rem",
                  width:"1.25rem",
                }}
              />
            </div>
          )}
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
