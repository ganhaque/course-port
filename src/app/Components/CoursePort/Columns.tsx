import { ColumnDef } from "@tanstack/react-table"
import { Course } from "./Data";

// import { PlusCircle, MinusCircle } from "lucide-react";
import { ArrowUpDown, MoreHorizontal } from "lucide-react"

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
          Available
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
          Enrollment
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
    header: "Abbreviation",
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
          Number
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
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "section",
    header: "Section",
  },
  {
    accessorKey: "begin",
    header: "Begin",
  },
  {
    accessorKey: "end",
    header: "End",
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
