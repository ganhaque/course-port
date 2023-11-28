import React, { useEffect, useState } from 'react';
import { Course } from './Data';
import { useScheduleContext } from './ScheduleProvider';
import "./CourseTimeTable.css"
import { days, mapDaysToShortForm } from './Data';
import { Separator } from '../UI/Separator';

const CourseTimeTable = () => {
  const {
    selectedCourses,
    pickedCourses,
    addPickedCourse,
    removePickedCourse
  } = useScheduleContext();
  const [ isCourseListOpen, setIsCourseListOpen ] = useState();

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
              if (course.days.includes(mapDaysToShortForm[day])) {
                const top = typeof course.begin === "number" ?
                  /* (16 + course.begin * 2 + 7 * 120) : */
                  (course.begin - 7 * 60) : 0
                const height = typeof course.duration === "number" ?
                  /* (16 + course.begin * 2 + 7 * 120) : */
                  (course.duration + 8) : 0
                return (
                  <div
                    key={index}
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
                    className="course-cell"
                  >
                    <p>{`${course.abbreviation} ${course.number} - ${course.title}`}</p>
                    {/* Add more details or customize as needed */}
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
          padding: "0.25rem",
          /* width: "100%rem", */
          flexGrow: "1",
          /* maxWidth: "12rem", */
          /* flexShrink:"2", */
          /* resize: "horizontal", */
          overflow: "scroll",
        }}
      >
        {/* // TODO: sort this based on begin */}
        {sortedCourses.map((course, index) => {
          const isPicked = pickedCourses.some((pickedCourse) => pickedCourse === course);
          /* const backgroundColor = course.begin === "?" ? "hsla(var(--red), 0.75)" : */
          /*   isPicked ? "hsla(var(--primary), 0.75)" : "hsla(var(--grey), 0.75)" */
          /* const className = course.begin === "?" ? "tba-course-cell" : */
          /*   isPicked ? "picked-course-cell" : "not-picked-course-cell" */
          const className = !isPicked ? "not-picked-course-cell" :
            course.begin === "?" ? "tba-course-cell" : "picked-course-cell"
          const height = typeof course.duration === "number" ?
            (course.duration + 8) : 50;
          const prevCourse = sortedCourses[index - 1];
          const isDifferentBeginEnd = prevCourse &&
            (prevCourse.begin !== course.begin || prevCourse.end !== course.end);

          return (

            <>
              {
                isDifferentBeginEnd ? (
                  <Separator
                    style={{
                      margin:"0.5rem 0",
                      backgroundColor:"hsla(var(--primary))"
                    }}
                    orientation="horizontal"
                  />
                ) : (<></>)
              }
              <div
                onClick={() => {
                  if (isPicked) {
                    removePickedCourse(course);
                    console.log("unpicked", course);
                  }
                  else {
                    addPickedCourse(course);
                    console.log("picked", course);
                  }
                }}
                key={index}
                style={{
                  /* marginTop: isDifferentBeginEnd ? "0.5rem" : "0", */
                  /* flexGrow: "1", */
                  /* position: 'absolute', */
                  /* opacity: course.begin === "?" ? "0" : "1", */
                  /* top: `${top}px`, */
                  /* height: `${height}px`, */
                  minHeight: `${height}px`,
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
                <p>{`${course.abbreviation} ${course.number} - ${course.title}`}</p>
                {/* Add more details or customize as needed */}
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default CourseTimeTable;
