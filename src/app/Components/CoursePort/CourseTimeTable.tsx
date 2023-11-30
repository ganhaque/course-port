import React, { useEffect, useState } from 'react';
import { Course } from './Data';
import { useScheduleContext } from './ScheduleProvider';
import "./CourseTimeTable.css"
import { days, mapDaysToShortForm } from './Data';
import { Separator } from '../UI/Separator';
import {
  getAMPMTime,
  getTimeWithoutAMPM,
  getHourMinuteString
} from "./Helper";
import { X } from "lucide-react"
import { PiEyeSlashBold } from "react-icons/pi";

const CourseTimeTable = () => {
  const {
    selectedCourses,
    pickedCourses,
    /* addConflict, */
    /* conflictedCourses, */
    addPickedCourse,
    addPickedCourseNoCollision,
    removePickedCourse,
    removeSelectedCourse,
    /* addConflictedCourse, */
    /* removeConflictedCourse, */
  } = useScheduleContext();
  /* const [ isCourseListOpen, setIsCourseListOpen ] = useState(); */

  /* // Sort selectedCourses based on the 'begin' property */
  /* const sortedCourses = [...selectedCourses].sort((a, b) => { */
  /*   if (a.begin === "?" && b.begin === "?") return 0; */
  /*   if (a.begin === "?") return -1; */
  /*   if (b.begin === "?") return 1; */
  /*   // Replace 'begin' with the actual property name you want to sort by */
  /*   // Assuming 'begin' is a numerical value, modify the comparison logic accordingly if it's of a different type */
  /*   return a.begin - b.begin; */
  /* }); */
  /**/
  /* useEffect(() => { */
  /* }, [selectedCourses]); */

  // State variable to store sorted courses
  const [sortedCourses, setSortedCourses] = useState<Course[]>([]);

  // Sort selectedCourses based on the 'begin' property
  useEffect(() => {
    const sortCourses = () => {
      const sorted = [...selectedCourses].sort((a, b) => {
        if (a.begin === "?" && b.begin === "?") return 0;
        if (a.begin === "?") return 1;
        if (b.begin === "?") return -1;
        if (a.begin === b.begin) {
          if (a.duration === "?" || b.duration === "?") return 0;
          return a.duration - b.duration;
        }
        return a.begin - b.begin;
      });
      setSortedCourses(sorted);
    };

    sortCourses();
  }, [selectedCourses]); // Trigger sorting whenever selectedCourses changes


  const convertToTime = (minutes : number) => {
    const hours = Math.floor(minutes / 60);
    /* const mins = minutes % 60; */
    let period = 'AM'; // Default to AM

    if (hours >= 12) {
      period = 'PM';
    }

    let displayHours = hours % 12; // Convert to 12-hour format
    if (displayHours === 0) {
      displayHours = 12; // 12 AM or 12 PM
    }

    return `${displayHours} ${period}`;
  };

  return (
    <div style={{
      display: "flex",
      /* height: "100%", */
      /* resize: "vertical", */
      overflow: "auto",
      /* flexDirection: "column", */
    }}
    >

      <div style={{
        display: 'flex',
        /* flexGrow:"1", */
        /* height: "200%", */
        /* height: "calc(100vh - 16rem)", */
        /* width: "calc(100vw - 12rem)", */
        /* resize: "horizontal", */
        resize: "horizontal",
        /* width: "80%", */
        width: "100%",
        /* minWidth: "80%", */
        /* maxWidth: "200%", */
        /* flexShrink: "2", */
        overflow: "auto",
        scrollbarWidth: "none",
        /* maxHeight: "100%", */
        /* gap: '4px' */
        /* width:'100vw', */
      }}>
        {/* Render time column */}
        <div style={{
          /* display:'flex', */
          /* flexDirection:'column', */
          /* gap: "16px", */
          /* marginTop:'30px' */
        }}>
          <div style={{
            backgroundColor: "hsla(var(--grey), 0.25)",
            height: "30px",
          }}>
          </div>
          {Array.from({ length: 28 }, (_, i) => i * 30).map((time) => {
            /* const offset = convertToPixel(time + 7 * 60); // Add offset to adjust the displayed range */
            return (
              <div
                key={time}
                style={{
                  /* height: '30px', */
                  /* height: '30px', */
                  /* backgroundColor: time % 60 ? "hsla(var(--black2))" : "hsla(var(--grey))", */
                  /* backgroundColor: "hsla(var(--grey), 0.25)", */
                  /* borderBottom: time % 60 ? "1px solid white" : "1px dashed white", */
                  borderTop: time % 60 ? "1px dashed hsla(var(--white), 0.25)" : "1px solid hsla(var(--white), 0.5)",
                  /* borderTopStyle: time % 60 ? "dashed" : "solid", */
                }}
                className="time-cell"
              >
                {!(time % 60) ?
                  (convertToTime(time + 7 * 60)) : ("")}
              </div>
            );
          })}
        </div>

        {/* Render days */}
        {days.map((day) => (
          <div
            style={{
              flexGrow: '1',
              height: '100%',
              position: 'relative', // Add relative positioning for absolute children
            }}
            key={day}
            /* className= {`weekday-${day}`} */
          >
            <div
              style={{
                position: "absolute",
                padding: "0.25rem",
                height: '30px',
                width: "100%",
                textAlign: 'center',
                backgroundColor: "hsla(var(--grey), 0.25)",
                borderLeft: "1px solid hsla(var(--white), 0.5)",
              }}
              className='weekday-cell'
            >
              {day}
            </div>
            <div
              style={{
                /* padding: "0.25rem", */
                height: '30px',
                /* width: "100%", */
                /* textAlign: 'center', */
                /* backgroundColor: "hsla(var(--grey), 0.25)", */
              }}
            >
            </div>

            {Array.from({ length: 28 }, (_, i) => i * 30).map((time) => {
              /* const offset = convertToPixel(time + 7 * 60); // Add offset to adjust the displayed range */
              return (
                <div
                  key={time}
                  style={{
                    height: '30px',
                    /* backgroundColor: time % 60 ? "hsla(var(--black2))" : "hsla(var(--grey))", */
                    /* borderBottom: time % 60 ? "1px solid white" : "1px dashed white", */
                    /* borderTop: time % 60 ? "1px dashed white" : "1px solid white", */
                    borderTop: time % 60 ? "1px dashed hsla(var(--white), 0.25)" : "1px solid hsla(var(--white), 0.5)",
                    /* borderTopStyle: time % 60 ? "dashed" : "solid", */
                    borderLeft: "1px solid hsla(var(--white), 0.5)",
                  }}
                  className="empty-cell"
                >
                </div>
              );
            })}

            {/* Render courses for each day */}
            {pickedCourses.map((course, index) => {
              if (course.days
                .replace('TH', 'H') // replace TH with H to prevent confusing with T
                .includes(mapDaysToShortForm[day])) {
                const top = typeof course.begin === "number" ?
                  /* (16 + course.begin * 2 + 7 * 120) : */
                  (course.begin - 6 * 60 - 30) : 0
                const height = typeof course.duration === "number" ?
                  /* (16 + course.begin * 2 + 7 * 120) : */
                  (course.duration + 8) : 0
                const labTop = !course.lab ? "" : typeof course.lab.begin === "number" ?
                  /* (16 + course.begin * 2 + 7 * 120) : */
                  (course.lab.begin - 6 * 60 - 30) : 0
                const labHeight = !course.lab ? "" : typeof course.lab.duration === "number" ?
                  /* (16 + course.begin * 2 + 7 * 120) : */
                  (course.lab.duration + 8) : 0

                /* const isConflicted = conflictedCourses.some((conflictedCourse) => conflictedCourse === course); */
                /* const className = isConflicted ? "conflicted-course-cell course-cell" : "course-cell"; */

                return (
                  <div
                    key={index}
                  >
                    <div
                      style={{
                        /* position: 'absolute', */
                        opacity: course.begin === "?" ? "0" : "1",
                        top: `${top}px`,
                        height: `${height}px`,
                        /* width: '100%', */
                        /* background: 'hsla(var(--blue), 0.75)', */
                        /* color: 'hsla(var(--white))', */
                        /* border: '1px solid #ccc', */
                        /* padding: '4px', */
                      }}
                      /* className={className} */
                      className={"course-cell"}
                    >
                      <div
                        style={{
                          position: "relative",
                        }}
                      >
                        <div
                          onClick={() => { removePickedCourse(course); }}
                          className='close-top-right-hover'
                        >
                          <PiEyeSlashBold style={{height: "1.5rem", width: "1.5rem"}}/>
                        </div>
                        <div>
                          {`${course.abbreviation} ${course.number} - `}
                          {
                            course.title
                            .toLowerCase()
                            .replace(/\b\w/g, (match) => match.toUpperCase())
                            .replace(/Ii\b/g, 'II') // Keeps 'II' in uppercase
                            .replace(/Iii\b/g, 'III')
                            .replace(/Iv\b/g, 'IV')
                            .replace(/Vi\b/g, 'VI')
                            .replace(/Vii\b/g, 'VII')
                            .replace(/Viii\b/g, 'VIII')
                          }
                          {` (${course.section})`}
                          <div
                            style={{
                              color: "hsla(var(--white), 0.75)",
                              fontSize: "14px",
                            }}
                          >
                            <div>
                              {course.building ? (
                                <div>
                                  {`${course.roomNumber} `}
                                  {`${course.building.toLowerCase().replace(/\b\w/g, (match) => match.toUpperCase())}`}
                                </div>
                              ) : (<div>TBA</div>)}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {course.lab && course.lab.days
                      .replace('TH', 'H') // replace TH with H to prevent confusing with T
                      .includes(mapDaysToShortForm[day]) && (
                        <div
                          style={{
                            /* position: 'absolute', */
                            opacity: course.lab.begin === "?" ? "0" : "1",
                            top: `${labTop}px`,
                            height: `${labHeight}px`,
                            /* width: '100%', */
                            /* background: 'hsla(var(--blue), 0.75)', */
                            /* color: 'hsla(var(--white))', */
                            /* border: '1px solid #ccc', */
                            /* padding: '4px', */
                          }}
                          className={"lab-cell course-cell"}
                        >
                          <div
                            style={{
                              position: "relative",
                            }}
                          >
                            <div
                              onClick={() => { removePickedCourse(course); }}
                              className='close-top-right-hover'
                            >
                              <PiEyeSlashBold style={{height: "1.5rem", width: "1.5rem"}}/>
                            </div>
                            <div>{`${course.abbreviation} ${course.number} (${course.section}) ${course.lab.type} `}</div>
                            <div
                              style={{
                                color: "hsla(var(--white), 0.75)",
                                fontSize: "14px",
                              }}
                            >
                              {course.lab.building ? (
                                <div>
                                  {`${course.lab.roomNumber} `}
                                  {`${course.lab.building.toLowerCase().replace(/\b\w/g, (match) => match.toUpperCase())}`}
                                </div>
                              ) : (<div>TBA</div>)}
                            </div>
                            {/* <div>{`${course.section}`}</div> */}
                          </div>
                        </div>
                      )}
                  </div>
                );
              }
              return null;
            })}
          </div>
        ))}
      </div>
      {/* <div */}
      {/*   style={{ */}
      {/*     width: "1rem", */}
      {/*     backgroundColor: "hsla(var(--green))", */}
      {/*   }} */}
      {/* > */}
      {/*   a */}
      {/* </div> */}

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "0.25rem",
          /* flexWrap: "wrap", */
          /* minWidth: "0rem", */
          /* height: "54.375rem", */
          padding: "0.5rem",
          /* width: "100%rem", */
          flexGrow: "1",
          /* maxWidth: "12rem", */
          /* flexShrink:"2", */
          /* resize: "horizontal", */
          overflow: "scroll",
          /* alignItems: "center", */
        }}
      >
        <h2
          style={{
            marginBottom: "0.25rem"
          }}
        >
          Course Picker
        </h2>
        {sortedCourses.length === 0 && (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
            }}
          >
            <div>
              No course seems to be selected.
            </div>
            <div>
              Help: you can select courses from the booklet by clicking on them to view them here
            </div>
          </div>
        )}
        {sortedCourses.map((course, index) => {
          const isPicked = pickedCourses.some((pickedCourse) => pickedCourse === course);
          /* const isConflicted = conflictedCourses.some((conflictedCourse) => conflictedCourse === course); */
          /* const backgroundColor = course.begin === "?" ? "hsla(var(--red), 0.75)" : */
          /*   isPicked ? "hsla(var(--primary), 0.75)" : "hsla(var(--grey), 0.75)" */
          const className = course.begin === "?" ? "tba-course-cell" :
            isPicked ? "picked-course-cell" : "not-picked-course-cell"
          /* const className = isConflicted ? "conflicted-course-cell" : !isPicked ? "not-picked-course-cell" : */
          /*   course.begin === "?" ? "tba-course-cell" : "picked-course-cell" */

          const height = typeof course.duration === "number" ?
            (course.duration + 8) : 50;
          const labHeight = !course.lab ? "" : typeof course.lab.duration === "number" ?
            (course.lab.duration + 8) : 50;


          const prevCourse = sortedCourses[index - 1];
          const isDifferentBeginEnd = !prevCourse || prevCourse &&
            (prevCourse.begin !== course.begin || prevCourse.end !== course.end);
          const isDifferentDays = !prevCourse || prevCourse &&
            (prevCourse.days !== course.days)

          return (
            <div
              key={index}
            >
              {isDifferentBeginEnd ? (
                <div
                  style={{
                    display:"flex",
                  }}
                >
                  <Separator
                    style={{
                      marginTop:"0.5rem",
                      marginBottom:"0.5rem",
                      marginLeft: "0.5rem",
                      marginRight: "0.25rem",
                      backgroundColor:"hsla(var(--primary))",
                      /* width: "auto", */
                      flex: 1,
                    }}
                    orientation="horizontal"
                  />
                  <div
                  >
                    {/* {course.begin} - {course.end} */}
                    {(course.begin === "?" || course.end === "?")
                      ? "?"
                      : (getTimeWithoutAMPM(course.begin) + "-" + getAMPMTime(course.end))}
                  </div>
                  <Separator
                    style={{
                      marginTop:"0.5rem",
                      marginBottom:"0.5rem",
                      marginLeft: "0.25rem",
                      marginRight: "0.5rem",
                      backgroundColor:"hsla(var(--primary))",
                      /* width: "auto", */
                      flex: 1,
                    }}
                    orientation="horizontal"
                  />
                </div>
              ) : (<></>)}
              {isDifferentBeginEnd || isDifferentDays ? (
                <div
                  style={{
                    display:"flex",
                  }}
                >
                  <Separator
                    style={{
                      marginTop:"0.5rem",
                      marginBottom:"0.5rem",
                      marginLeft: "1.5rem",
                      marginRight: "0.25rem",
                      backgroundColor:"hsla(var(--secondary))",
                      /* width: "auto", */
                      flex: 1,
                    }}
                    orientation="horizontal"
                  />
                  <div
                  >
                    {/* {course.begin} - {course.end} */}
                    {/* {(course.days === "?") */}
                    {/*   ? "?" */}
                    {/*   : (course.days)} */}
                    {course.days}
                  </div>
                  <Separator
                    style={{
                      marginTop:"0.5rem",
                      marginBottom:"0.5rem",
                      marginLeft: "0.25rem",
                      marginRight: "1.5rem",
                      backgroundColor:"hsla(var(--secondary))",
                      /* width: "auto", */
                      flex: 1,
                    }}
                    orientation="horizontal"
                  />
                </div>
              ) : (<></>)}

              <div
                onClick={() => {
                  if (isPicked) {
                    removePickedCourse(course);
                    /* removeConflictedCourse(course); */
                    console.log("unpicked", course);
                  }
                  else {
                    /* addPickedCourseNoCollision(course); */
                    addPickedCourseNoCollision(course);
                    /* addConflictedCourse(course); */
                    console.log("picked", course);
                    }
                }}
                style={{
                  /* marginTop: isDifferentBeginEnd ? "0.5rem" : "0", */
                  /* flexGrow: "1", */
                  /* position: 'absolute', */
                  /* opacity: course.begin === "?" ? "0" : "1", */
                  /* top: `${top}px`, */
                  /* height: `${height}px`, */
                  minHeight: `${height}px`,
                  borderBottomRightRadius: course.lab ? "0" : "0.25rem"
                  /* width: '6rem', */
                  /* background: 'hsla(var(--primary), 0.75)', */
                  /* background: backgroundColor, */
                  /* borderRadius: "0.25rem", */
                  /* color: 'hsla(var(--white))', */
                  /* border: '1px solid #ccc', */
                  /* padding: '0.25rem', */
                }}
                className= {className}
              >
                <div
                  style={{
                    position: "relative",
                  }}
                >
                  <div
                    onClick={(event) => {
                      event.stopPropagation();
                      removePickedCourse(course);
                      removeSelectedCourse(course);
                      /* removeConflictedCourse(course); */
                    }}
                    className='close-top-right-hover'
                  >
                    <X style={{height: "1.5rem", width: "1.5rem"}}/>
                  </div>
                  <div>
                    <div>
                      {`${course.abbreviation} ${course.number} - `}
                      {
                        course.title
                        .toLowerCase()
                        .replace(/\b\w/g, (match) => match.toUpperCase())
                        .replace(/Ii\b/g, 'II') // Keeps 'II' in uppercase
                        .replace(/Iii\b/g, 'III')
                        .replace(/Iv\b/g, 'IV')
                        .replace(/Vi\b/g, 'VI')
                        .replace(/Vii\b/g, 'VII')
                        .replace(/Viii\b/g, 'VIII')
                      }
                      {` (${course.section})`}
                      <div
                        style={{
                          color: "hsla(var(--white), 0.75)",
                          fontSize: "14px",
                        }}
                      >
                        {course.building ? (
                          <div>
                            {`${course.roomNumber} `}
                            {`${course.building.toLowerCase().replace(/\b\w/g, (match) => match.toUpperCase())}`}
                          </div>
                        ) : (<div>TBA</div>)}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Add more details or customize as needed */}
              </div>

              {course.lab && (
                <div
                  onClick={() => {
                    if (isPicked) {
                      removePickedCourse(course);
                      console.log("unpicked", course);
                    }
                    else {
                      /* addPickedCourse(course); */
                      addPickedCourseNoCollision(course);
                      console.log("picked", course);
                    }
                  }}
                  style={{
                    minHeight: `${labHeight}px`,
                    /* width: "80%", */
                    marginLeft: "2rem",
                    borderTopLeftRadius: "0",
                    borderTopRightRadius: "0",
                  }}
                  className= {className}
                >
                  <div>
                    <div>
                      {`${course.lab.type} | ${course.lab.days} | `}
                      {/* </div> */}
                      {/* <div> */}
                      {(course.lab.begin === "?" || course.lab.end === "?")
                        ? "?"
                        : (getTimeWithoutAMPM(course.lab.begin) + "-" + getAMPMTime(course.lab.end))}
                      {/* {")"} */}
                    </div>
                    <div
                      style={{
                        color: "hsla(var(--white), 0.75)",
                        fontSize: "14px",
                      }}
                    >
                      <div>
                        {course.lab.building ? (
                          <div>
                            {`${course.lab.roomNumber} `}
                            {`${course.lab.building.toLowerCase().replace(/\b\w/g, (match) => match.toUpperCase())}`}
                          </div>
                        ) : (<div>TBA</div>)}
                      </div>
                    </div>
                  </div>
                </div>
              )}

            </div>
          );
        })}
      </div>

    </div>
  );
};

export default CourseTimeTable;
