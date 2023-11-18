"use client"

import { useEffect, useState } from "react";

import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
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

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../UI/DropdownMenu"

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
    selectedSemester,
    /* setSelectedSemester, */
    selectedCourses,
    /* setSelectedCourses, */
    selectedDepartment,
    selectedDays,
    /* setSelectedDepartment, */
    /* database, */
    addCourse,
    removeCourse,
    filterString,
    visibleColumns,
    setVisibleColumns
  } = useScheduleContext();

  const [sorting, setSorting] = useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [visibleColumnsLoaded, setVisibleColumnsLoaded] = useState(false);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnVisibility,
    },
    enableSortingRemoval: false,
  })

  useEffect(() => {
    setTimeout(() => {
      table.getRowModel().rows.forEach((row) => {
        const isRowSelected = selectedCourses.some((course) => course === (row.original as Course));
        row.toggleSelected(isRowSelected);
      });

      /* column.toggleVisibility(!!value) */
    }, 0);
  }, [selectedSemester, selectedDepartment, selectedDays, filterString, selectedCourses]);

  useEffect(() => {
    /* console.log(visibleColumns); */
    table.getAllColumns().forEach((column) => {
      const isColumnVisible = visibleColumns.some((id) => id === column.id);
      /* console.log(column.id, isColumnVisible); */
      column.toggleVisibility(isColumnVisible);
    })
    setVisibleColumnsLoaded(true);
  }, [visibleColumns])

  return (
    <>
      {visibleColumnsLoaded ? ( // Render the table only when visibleColumnsLoaded is true
        <div style={{
          overflow:"visible",
        }}
        >
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
                    data-state={(row.getIsSelected() && "selected")}
                    onAuxClick={() => {
                      if (row.getIsSelected()) {
                        removeCourse(row.original as Course);
                      }
                      else {
                        addCourse(row.original as Course);
                      }
                    }}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {cell.column.id === 'add' && (
                          <button
                            style={{
                              borderWidth: "0",
                              boxShadow: "none",
                            }}
                            /* className="ghost" */
                            onClick={() => {
                              const course = row.original as Course;
                              if (row.getIsSelected()) {
                                removeCourse(course);
                                console.log("removed", course);
                              }
                              else {
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
                                    width:"1rem",
                                    height:"1rem",
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
                                      width:"1rem",
                                      height:"1rem",
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
      ) : (
          <div
            style={{
              height:"100%",
              display:"flex",
              alignItems:"center",
              justifyContent:"center",
              color:"hsla(var(--muted_foreground))"
            }}
          >
            Loading...
          </div>
        )
      }
    </>
  )
}
