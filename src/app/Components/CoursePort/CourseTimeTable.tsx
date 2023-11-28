import React from 'react';
import { useScheduleContext } from './ScheduleProvider';
import "./CourseTimeTable.css"
import { days, mapDaysToShortForm } from './Data';

const CourseTimeTable = () => {
  const { selectedCourses } = useScheduleContext();

  /* // Helper function to convert minutes to a time string */
  /* const convertToTime = (minutes: number | string): string => { */
  /*   if (typeof minutes === 'number') { */
  /*     const hours = Math.floor(minutes / 60); */
  /*     const mins = minutes % 60; */
  /*     return `${String(hours)}:${String(mins).padStart(2, '0')}`; */
  /*   } */
  /*   return '-'; */
  /* }; */

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
      flexDirection: "column",
    }}
    >
      <div style={{
        display: 'flex',
        /* height: "200%", */
        height: "calc(100vh - 16rem)",
        resize: "vertical",
        width: "100%",
        /* flexShrink: "2", */
        overflow: "auto",
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
            {selectedCourses.map((course, index) => {
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
      <div>
        Lorem ipsum dolor sit amet, officia excepteur ex fugiat reprehenderit enim labore culpa sint ad nisi Lorem pariatur mollit ex esse exercitation amet. Nisi anim cupidatat excepteur officia. Reprehenderit nostrud nostrud ipsum Lorem est aliquip amet voluptate voluptate dolor minim nulla est proident. Nostrud officia pariatur ut officia. Sit irure elit esse ea nulla sunt ex occaecat reprehenderit commodo officia dolor Lorem duis laboris cupidatat officia voluptate. Culpa proident adipisicing id nulla nisi laboris ex in Lorem sunt duis officia eiusmod. Aliqua reprehenderit commodo ex non excepteur duis sunt velit enim. Voluptate laboris sint cupidatat ullamco ut ea consectetur et est culpa et culpa duis.
      </div>
    </div>
  );
};

export default CourseTimeTable;
