import { ColumnDef } from "@tanstack/react-table"
import {
  Course, timeStringToMinutes,
} from "./Data";
import { ChevronRight } from "lucide-react";

// import { PlusCircle, MinusCircle } from "lucide-react";
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Popover, PopoverContent, PopoverTrigger } from "../UI/Popover";
import { Separator } from "../UI/Separator";

function getAMPMTime(minutes: number): string {
  /* if (isNaN(minutes)) { */
  /*   return "TBA"; */
  /* } */
  if (minutes < 0 || minutes > 1439) {
    return 'Invalid input';
  }

  const hours: number = Math.floor(minutes / 60);
  const mins: number = minutes % 60;

  const ampm: string = hours >= 12 ? 'PM' : 'AM';
  const displayHours: number = hours % 12 || 12;

  const formattedTime: string = `${displayHours}:${mins.toString().padStart(2, '0')} ${ampm}`;

  return formattedTime;
}

function getTimeWithoutAMPM(minutes: number): string {
  /* if (isNaN(minutes)) { */
  /*   return "TBA"; */
  /* } */
  if (minutes < 0 || minutes > 1439) {
    return 'Invalid input';
  }

  const hours: number = Math.floor(minutes / 60);
  const mins: number = minutes % 60;

  /* const ampm: string = hours >= 12 ? 'PM' : 'AM'; */
  const displayHours: number = hours % 12 || 12;

  const formattedTime: string = `${displayHours}:${mins.toString().padStart(2, '0')}`;

  return formattedTime;
}

function getHourMinuteString(minutes: number): string {
  if (isNaN(minutes)) {
    return "TBA";
  }
  if (minutes < 0) {
    return 'Invalid input';
  }

  const hours: number = Math.floor(minutes / 60);
  const mins: number = minutes % 60;

  if (hours === 0) {
    return `${mins}m`;
  } else if (mins === 0) {
    return `${hours}h`;
  } else {
    return `${hours}h${mins}m`;
  }
}

interface ColumnId {
  id: string;
  label: string;
  /* icon: React.ComponentType<any>; // Assuming your icon components are React components */
}

export const columnIdArray: ColumnId[] = [
  { id: "available", label: "Available" },
  { id: "enrollmentCount", label: "Enrollment Count" },
  { id: "capacity", label: "Capacity" },
  { id: "abbreviation", label: "Abbreviation" },
  { id: "number", label: "Course Number" },
  { id: "type", label: "Type" },
  { id: "title", label: "Title" },
  { id: "section", label: "Section" },
  { id: "creditHour", label: "Credit Hour" },
  { id: "begin-end", label: "Begin-End" },
  { id: "duration", label: "Duration" },
  { id: "days", label: "Days" },
  { id: "roomNumber", label: "Room Number" },
  { id: "building", label: "Building" },
  { id: "specialEnrollment", label: "Special Enrollment" },
  { id: "instructor", label: "Instructor" },
];

export const initialVisibleColumnId: string[] = [
  "available",
  /* "enrollmentCount", */
  /* "capacity", */
  /* "abbreviation", */
  "number",
  "type",
  "title",
  "section",
  "creditHour",
  "begin-end",
  /* "duration", */
  "days",
  /* "roomNumber", */
  /* "building", */
  "specialEnrollment",
  "instructor",
];

export const columns: ColumnDef<Course>[] = [
  {
    id: "add",
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "available",
    header: ({ column }) => {
      return (
        <button
          className="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          A
          <ArrowUpDown style={{
            marginLeft:"0.5rem",
            height : "1rem",
            width : "1rem",
          }} className="ml-2 h-4 w-4" />
        </button>
      )
    },
    cell: ({ row }) => {
      const available = row.original.available;
      const capacity = row.original.capacity;
      const percentage =
        capacity !== 0
          ? available / capacity * 100
          : 0

      return (
        <div
          style={{
            color: available === 0 ?
              "hsla(var(--grey))" :
              `color-mix(in oklch, hsl(var(--green)) ${percentage}%, hsl(var(--red)))`
          }}
        >
          {row.original.available}
        </div>
      );
    }
  },
  {
    accessorKey: "enrollmentCount",
    header: ({ column }) => {
      return (
        <button
          className="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          E
          <ArrowUpDown style={{
            marginLeft:"0.5rem",
            height : "1rem",
            width : "1rem",
          }} className="ml-2 h-4 w-4" />
        </button>
      )
    },
    cell: ({ row }) => {
      const enrollmentCount = row.original.enrollmentCount;
      const capacity = row.original.capacity;
      const percentage =
        capacity !== 0
          ? enrollmentCount / capacity * 100
          : 100

      return (
        <div
          style={{
            color: `color-mix(in oklch, hsl(var(--green)), hsl(var(--red)) ${percentage}%)`
          }}
        >
          {row.original.enrollmentCount}
        </div>
      );
    }
  },
  {
    accessorKey: "capacity",
    header: ({ column }) => {
      return (
        <button
          className="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          C
          <ArrowUpDown style={{
            marginLeft:"0.5rem",
            height : "1rem",
            width : "1rem",
          }} className="ml-2 h-4 w-4" />
        </button>
      )
    },
    cell: ({ row }) => {
      const enrollmentCount = row.original.enrollmentCount;
      const capacity = row.original.capacity;
      const percentage =
        capacity !== 0
          ? enrollmentCount / capacity * 100
          : 100

      return (
        <div
          style={{
            color: `color-mix(in oklch, hsl(var(--green)), hsl(var(--red)) ${percentage}%)`
          }}
        >
          {row.original.capacity}
        </div>
      );
    }
  },
  {
    accessorKey: "abbreviation",
    header: "ABBR",
  },
  {
    // sortDescFirst: false,
    invertSorting: true,
    accessorKey: "number",
    sortingFn: (
      rowA: any,
      rowB: any,
      /* columnId */
    ) => {
      if (rowA.original.number === rowB.original.number) {
        return rowA.original.section < rowB.original.section ? 1 : -1;
      }
      return rowA.original.number < rowB.original.number ? 1 : -1;
    },
    header: ({ column }) => {
      /* column.toggleSorting(column.getIsSorted() === "asc"); */
      return (
        <button
          className="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc" )}
        >
          N
          <ArrowUpDown style={{
            marginLeft:"0.5rem",
            height : "1rem",
            width : "1rem",
          }} className="ml-2 h-4 w-4" />
        </button>
      )
    },
    cell: ({ row }) => {
      const number = row.original.number;
      const color1 =
        number < 2000 
          ? "green"
          : number < 3000
            ? "yellow"
            : number < 4000
              ? "orange"
              : number < 5000
                ? "red"
                : "purple"
      const color2 =
        number < 2000
          ? "yellow"
          : number < 3000
            ? "orange"
            : number < 4000
              ? "red"
              : number < 5000
                ? "purple"
                : "blue"

      const percentage =
        number < 2000
          ? ((number - 1000) / 1000) * 100
          : number < 3000
            ? ((number - 2000) / 1000) * 100
            : number < 4000
              ? ((number - 3000) / 1000) * 100
              : number < 5000
                ? ((number - 4000) / 1000) * 100
                : ((number - 5000) / 5000) * 100
      return (
        <div
          style={{
            color: `color-mix(in oklch, hsl(var(--${color1})) , hsl(var(--${color2})) ${percentage}%)`
          }}
        >
          {row.original.number}
        </div>
      );
    }
  },
  {
    accessorKey: "section",
    header: "S",
    cell: ({ row }) => {
      const colors = [
        "green",
        "yellow",
        /* "orange", */
        "red",
        "purple",
        "blue",
      ]
      return (
        <div
          style={{
            /* color: (row.original.section === 1) */
            /*   ? "hsla(var(--grey))" */
            /*   : `hsla(var(--${colors[row.original.section % colors.length]}))` */
            color: row.original.section === 1 ?
              "hsla(var(--grey))" :
              `hsla(var(--${colors[row.original.section % colors.length]}))`
          }}
        >
          {row.original.section}
          {/* {row.original.section === 1 ? "" : row.original.section} */}
        </div>
      );
    }
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: ({ row }) => {
      const lab = row.original.lab;
      return (
        <div>
          {row.original.type && <div>{row.original.type}</div>}
          {row.original.type && lab && ' - '}
          {lab && (
            <Popover>
              <PopoverTrigger asChild>
                <button 
                  style={{
                    display:"flex",
                    /* height:"100%", */
                    alignItems:"center",
                    justifyContent:"center",
                    marginLeft:"auto",
                    paddingRight:"0.25rem",
                  }}
                  className="ghost">
                  {lab.type}
                  <ChevronRight
                    style={{
                      textAlign:"center",
                      height:"1.25rem",
                      width:"1.25rem",
                    }}
                  />
                </button>
              </PopoverTrigger>
              <PopoverContent
                side="right"
                style={{
                  alignItems: "start",
                  borderWidth: "1px",
                  borderColor: "hsla(var(--primary))",
                }}
              >
                <div
                  style={{
                    padding: "0.25rem",
                    display: "flex",
                    gap: "0.5rem",
                  }}
                >
                  <div style={{ color:"hsla(var(--muted_foreground))" }} >
                    Begin-End:
                  </div>
                  {(lab.begin === "TBA" || lab.end === "TBA")
                    ? "TBA"
                    : (getTimeWithoutAMPM(lab.begin) + "-" + getAMPMTime(lab.end))}
                </div>
                <div
                  style={{
                    padding: "0.25rem",
                    display: "flex",
                    gap: "0.5rem",
                  }}
                >
                  <div style={{ color:"hsla(var(--muted_foreground))" }} >
                    Days:
                  </div>
                  {lab.days ? lab.days : <div style={{color:"hsla(var(--grey))"}}>TBA</div>}
                </div>
                {/* <Separator */}
                {/*   style={{ */}
                {/*     margin:"0.25rem 0", */}
                {/*     backgroundColor:"hsla(var(--yellow))" */}
                {/*   }} */}
                {/*   orientation="horizontal" */}
                {/* /> */}
                <div
                  style={{
                    padding: "0.25rem",
                    display: "flex",
                    gap: "0.5rem",
                  }}
                >
                  <div style={{ color:"hsla(var(--muted_foreground))" }} >
                    Location:
                  </div>
                  {lab.roomNumber ? lab.roomNumber : <div style={{color:"hsla(var(--grey))"}}>TBA</div>}
                  {" "}
                  {lab.building ? lab.building : ""}
                </div>
                {/* <Separator */}
                {/*   style={{ */}
                {/*     margin:"0.25rem 0", */}
                {/*     backgroundColor:"hsla(var(--yellow))" */}
                {/*   }} */}
                {/*   orientation="horizontal" */}
                {/* /> */}
                <div style={{ padding: "0.25rem", display: "flex", gap: "0.5rem", }} >
                  <div
                    style={{
                      color:"hsla(var(--muted_foreground))"
                    }}
                  >
                    Instructor:
                  </div>
                  {lab.instructor ? lab.instructor : <div style={{color:"hsla(var(--grey))"}}>TBA</div>}
                </div>
              </PopoverContent>
            </Popover>
          )}
          {/* {lab && <div>{lab.type}+</div>} */}
        </div>
      )
    },
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => {
      const number = row.original.number;
      const color1 =
        number < 2000 
          ? "green"
          : number < 3000
            ? "yellow"
            : number < 4000
              ? "orange"
              : number < 5000
                ? "red"
                : "purple"
      const color2 =
        number < 2000
          ? "yellow"
          : number < 3000
            ? "orange"
            : number < 4000
              ? "red"
              : number < 5000
                ? "purple"
                : "blue"

      const percentage =
        number < 2000
          ? ((number - 1000) / 1000) * 100
          : number < 3000
            ? ((number - 2000) / 1000) * 100
            : number < 4000
              ? ((number - 3000) / 1000) * 100
              : number < 5000
                ? ((number - 4000) / 1000) * 100
                : ((number - 5000) / 5000) * 100
      return (
        <div
          style={{
            color: `color-mix(in oklch, hsl(var(--${color1})) , hsl(var(--${color2})) ${percentage}%)`
          }}
        >
          {/* {row.original.title} */}
          {
            row.original.title
            .toLowerCase()
            .replace(/\b\w/g, (match) => match.toUpperCase())
            .replace(/Ii\b/g, 'II') // Keeps 'II' in uppercase
            .replace(/Iii\b/g, 'III')
            .replace(/Iv\b/g, 'IV')
            .replace(/Vi\b/g, 'VI')
            .replace(/Vii\b/g, 'VII')
            .replace(/Viii\b/g, 'VIII')
          }
        </div>
      );
    }
  },
  {
    accessorKey: "creditHour",
    header: "CR",
    cell: ({ row }) => {
      const creditHour = row.original.creditHour;
      const color =
        creditHour === "1.0" ?
          "blue" :
          creditHour === "3.0" ?
            "grey" :
            creditHour === "4.0" ?
              "yellow" :
              "red"


      return (
        <div
          style={{
            color:`hsla(var(--${color}))`
          }}
        >
          { row.original.creditHour }
        </div>
      );
    }
  },
  {
    accessorKey: "begin-end",
    header: ({ column }) => {
      return (
        <button
          className="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Begin-End
          <ArrowUpDown style={{
            marginLeft:"0.5rem",
            height : "1rem",
            width : "1rem",
          }} className="ml-2 h-4 w-4" />
        </button>
      )
    },
    sortingFn: (
      rowA: any,
      rowB: any,
      /* columnId */
    ) => {
      if (rowA.original.begin === "TBA" && rowB.original.begin === "TBA") return 0;
      if (rowA.original.begin === "TBA") {
        return -1;
      }
      if (rowB.original.begin === "TBA") {
        return 1;
      }
      if (rowA.original.begin === rowB.original.begin) {
        return rowA.original.end < rowB.original.end ? 1 : -1;
      }
      return rowA.original.begin < rowB.original.begin ? 1 : -1;
      /* const numA = rowA.getValue(columnId).count; */
      /* const numB= rowB.getValue(columnId).count; */
      /**/
      /* return numA < numB ? 1 : numA > numB ? -1 : 0; */
    },
    cell: ({ row }) => {
      const begin = row.original.begin;
      const end = row.original.end;
      if (begin === "TBA" || end === "TBA" || row.original.duration === "TBA") {
        return (
          <div
            style={{
              color:`hsla(var(--grey))`
            }}
          >
            TBA
          </div>
        )
      }
      const formattedBegin = getTimeWithoutAMPM(begin);
      const formattedEnd = getAMPMTime(end);


      const breakpoints = [
        "7:00 AM",
        "9:00 AM",
        "12:30 PM",
        "3:30 PM",
        "6:00 PM",
        "9:00 PM",
      ]
      const breakpointsMapped = breakpoints.map(time => timeStringToMinutes[time])
      /* const color1 = */
      /*   begin < 666 */
      /*     ? "yellow" */
      /*     : begin < 960 */
      /*       ? "red" */
      /*       : "purple" */
      /* const color2 = "purple"; */
      /* const color2 = */
      /*   begin < 666 */
      /*     ? "red" */
      /*     : begin < 960 */
      /*       ? "purple" */
      /*       : "blue" */
      /* const percentage = (begin - 420) / 1260 * 100 */
      /* const percentage =  */
      /*   begin < 666 */
      /*     ? ((begin - 420) / (666 - 420)) * 100 */
      /*     : begin < 960 */
      /*       ? ((begin - 666) / (960 - 666)) * 100 */
      /*       : ((begin - 960) / (1260 - 960)) * 100 */

      const color1 =
        begin < breakpointsMapped[1]
          ? "green"
          : begin < breakpointsMapped[2]
            ? "yellow"
            : begin < breakpointsMapped[3]
              ? "orange"
              : begin < breakpointsMapped[4]
                ? "red"
                : "purple"
      const color2 =
        begin < breakpointsMapped[1]
          ? "yellow"
          : begin < breakpointsMapped[2]
            ? "orange"
            : begin < breakpointsMapped[3]
              ? "red"
              : begin < breakpointsMapped[4]
                ? "purple"
                : "blue"

      const percentage =
        begin < breakpointsMapped[1]
          ? ((begin - breakpointsMapped[0]) / (breakpointsMapped[1] - breakpointsMapped[0]))
          : begin < breakpointsMapped[2]
            ? ((begin - breakpointsMapped[1]) / (breakpointsMapped[2] - breakpointsMapped[1]))
            : begin < breakpointsMapped[3]
              ? ((begin - breakpointsMapped[2]) / (breakpointsMapped[3] - breakpointsMapped[2]))
              : begin < breakpointsMapped[4]
                ? ((begin - breakpointsMapped[3]) / (breakpointsMapped[4] - breakpointsMapped[3]))
                : ((begin - breakpointsMapped[4]) / (breakpointsMapped[5] - breakpointsMapped[4]))
      return (
        <div
          style={{
            /* color:`hsla(var(--${color}))` */
            /* color: `color-mix(in oklch, hsl(var(--green)) , hsl(var(--blue)) ${percentage}%)` */
            color: `color-mix(in oklch, hsl(var(--${color1})), hsl(var(--${color2})) ${percentage * 100}%)`
            /* color: `color-mix(in oklch, hsl(var(--${color1})) ${percentage}%, hsl(var(--${color2})))` */
          }}
        >
          {formattedBegin}
          -
          {formattedEnd}
        </div>
      )
    },
  },
  {
    accessorKey: "duration",
    header: "Duration",
    cell: ({ row }) => {
      if (row.original.duration === "TBA") return <div>TBA</div>;
      return <div className="">{getHourMinuteString(row.original.duration)}</div>
    },
  },
  {
    accessorKey: "days",
    header: "Days",
    cell: ({ row }) => {
      const color =
        row.original.days === "TBA"
          ? "grey"
          : row.original.days.includes("M W F")
            ? "orange"
            : row.original.days.includes("T TH")
              ? "blue"
              : "green"
      /* : row.original.number < 4000 */
      /*   ? "orange" */
      /*   : row.original.number < 5000 */
      /*     ? "red" */
      /*     : "purple" */
      return (
        <div
          style={{
            color:`hsla(var(--${color}))`
          }}
        >
          {row.original.days}
        </div>
      );
    }
  },
  {
    accessorKey: "roomNumber",
    header: "Room",
  },
  {
    accessorKey: "building",
    header: "Building",
  },
  {
    accessorKey: "specialEnrollment",
    header: "Special",
    cell: ({ row }) => {
      return (
        <div
          style={{
            /* fontSize:"0.75rem" */
          }}
        >
          {/* {row.original.specialEnrollment} */}
          {row.original.specialEnrollment ? (
            row.original.specialEnrollment
            .toLowerCase()
            .replace(/\b\w/g, (match) => match.toUpperCase())
            .replace(/Ci\b/g, 'CI') // Keeps 'CI' in uppercase
          ) : (
              ""
            )}
        </div>
      );
    },
  },
  {
    accessorKey: "instructor",
    header: ({ column }) => {
      return (
        <button
          className="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc" )}
        >
          Instructor
          <ArrowUpDown style={{
            marginLeft:"0.5rem",
            height : "1rem",
            width : "1rem",
          }} className="ml-2 h-4 w-4" />
        </button>
      )
    },
    cell: ({ row }) => {
      const number = row.original.number;
      const color1 =
        number < 2000 
          ? "green"
          : number < 3000
            ? "yellow"
            : number < 4000
              ? "orange"
              : number < 5000
                ? "red"
                : "purple"
      const color2 =
        number < 2000
          ? "yellow"
          : number < 3000
            ? "orange"
            : number < 4000
              ? "red"
              : number < 5000
                ? "purple"
                : "blue"

      const percentage =
        number < 2000
          ? ((number - 1000) / 1000) * 100
          : number < 3000
            ? ((number - 2000) / 1000) * 100
            : number < 4000
              ? ((number - 3000) / 1000) * 100
              : number < 5000
                ? ((number - 4000) / 1000) * 100
                : ((number - 5000) / 5000) * 100

      return (
        row.original.instructor ? (
          <div
            style={{
              color: `color-mix(in oklch, hsl(var(--${color1})) , hsl(var(--${color2})) ${percentage}%)`
            }}
          >
            {/* {row.original.instructor} */}
            {
              row.original.instructor
              .toLowerCase()
              .replace(/\b\w/g, (match) => match.toUpperCase())
            }
          </div>
        ) : (
            <div style={{
              color: `hsla(var(--grey))`
            }}>
              ?
            </div>
          )
      );
    }
  },
]
