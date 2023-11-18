import { ColumnDef } from "@tanstack/react-table"
import {
  Course,
} from "./Data";

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
  },
  {
    accessorKey: "abbreviation",
    header: "ABBR",
  },
  {
    // sortDescFirst: false,
    invertSorting: true,
    accessorKey: "number",
    header: ({ column }) => {
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
                <button className="ghost">
                  {lab.type}+
                </button>
              </PopoverTrigger>
              <PopoverContent
                side="right"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "start",
                  background: "hsla(var(--darker_black))",
                  borderWidth: "1px",
                  borderColor: "hsla(var(--yellow))",
                  borderRadius: "0.25rem",
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
                  {lab.roomNumber ? lab.roomNumber : "TBA"}
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
                  {lab.instructor ? lab.instructor : "TBA"}
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
  },
  {
    accessorKey: "section",
    header: "S",
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
      columnId
    ) => {
      if (rowA.original.begin === rowB.original.begin) return 0;
      if (rowA.original.begin === "TBA") {
        return -1;
      }
      if (rowB.original.begin === "TBA") {
        return 1;
      }
      return rowA.original.begin < rowB.original.begin ? 1 : -1;
      /* const numA = rowA.getValue(columnId).count; */
      /* const numB= rowB.getValue(columnId).count; */
      /**/
      /* return numA < numB ? 1 : numA > numB ? -1 : 0; */
    },
    cell: ({ row }) => {
      if (row.original.begin === "TBA" || row.original.end === "TBA") {
        return <div>TBA</div>
      }
      const begin = getTimeWithoutAMPM(row.original.begin);
      const end = getAMPMTime(row.original.end);
      return <div className="">{begin}-{end}</div>
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
    // header: ({ column }) => {
    //   return (
    //     <button
    //       className="ghost"
    //       onClick={() => column.toggleSorting(column.getIsSorted() === "asc" )}
    //     >
    //       Days
    //       <ArrowUpDown style={{
    //         marginLeft:"0.5rem",
    //         height : "1rem",
    //         width : "1rem",
    //       }} className="ml-2 h-4 w-4" />
    //     </button>
    //   )
    // },
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
    /* cell: ({ row }) => { */
    /*   return ( */
    /*     <div */
    /*       style={{ */
    /*         fontSize:"0.75rem" */
    /*       }} */
    /*     > */
    /*       {row.original.specialEnrollment} */
    /*     </div> */
    /*   ); */
    /* }, */
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
  },
]
