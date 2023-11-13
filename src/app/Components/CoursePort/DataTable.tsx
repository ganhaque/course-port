"use client"

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../UI/Table"

import { PlusCircle, MinusCircle } from "lucide-react";
import { useScheduleContext } from "./ScheduleProvider";
import { Course } from "./Data";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const {
    /* selectedSemester, */
    /* setSelectedSemester, */
    selectedCourses,
    /* setSelectedCourses, */
    /* selectedDepartment, */
    /* setSelectedDepartment, */
    /* database, */
    addCourse,
    removeCourse,
  } = useScheduleContext();

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() ||
                  (selectedCourses.some(course =>
                    course.number === row.getValue("number") && course.section === row.getValue("section")))
                    && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {cell.column.id === 'add' && (
                      <button
                        style={{
                          borderWidth: "0",
                          boxShadow: "none",
                        }}
                        onClick={() => {
                          row.toggleSelected(!row.getIsSelected());
                          const course = row.original as Course;
                          if (row.getIsSelected()) {
                            removeCourse(course);
                            console.log("removed", course);
                          }
                          else {
                            // Call the function with the course data
                            addCourse(course);
                            console.log("added", course);
                          }
                        }}
                      >
                        {row.getIsSelected() ? (
                          <div
                            style={{
                              color:"hsla(var(--red))"
                            }}
                          >
                            <MinusCircle
                              style={{
                                width:"1.5rem",
                                height:"1.5rem",
                              }}
                            />
                          </div>
                        ) : (
                            <div
                              style={{
                                color:"hsla(var(--green))"
                              }}
                            >
                              <PlusCircle
                                style={{
                                  width:"1.5rem",
                                  height:"1.5rem",
                                }}
                              />
                            </div>
                          )}
                      </button>
                    )}
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
        </TableBody>
      </Table>
    </div>
  )
}
