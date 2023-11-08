import * as React from "react"
import "./Table.css"

/* import { cn } from "@/lib/utils" */

const Table = React.forwardRef<
HTMLTableElement,
React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div
    className="table-container"
    /* className="relative w-full overflow-auto" */
  >
    <table
      ref={ref}
      className="table"
      /* className={"w-full caption-bottom text-sm"} */
      {...props}
    />
  </div>
))
Table.displayName = "Table"

const TableHeader = React.forwardRef<
HTMLTableSectionElement,
React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={"table-header"} {...props} />
))
TableHeader.displayName = "TableHeader"

const TableBody = React.forwardRef<
HTMLTableSectionElement,
React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className="table-body"
    /* className={"[&_tr:last-child]:border-0"} */
    {...props}
  />
))
TableBody.displayName = "TableBody"

const TableFooter = React.forwardRef<
HTMLTableSectionElement,
React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={"bg-primary font-medium text-primary-foreground"}
    {...props}
  />
))
TableFooter.displayName = "TableFooter"

const TableRow = React.forwardRef<
HTMLTableRowElement,
React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    style={{
      /* borderBottomWidth:"1px", */
    }}
    className="table-row"
    /* className={ */
    /*   "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted" */
    /* } */
    {...props}
  />
))
TableRow.displayName = "TableRow"

const TableHead = React.forwardRef<
HTMLTableCellElement,
React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className="table-head"
    /* className={ */
    /*   "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0" */
    /* } */
    {...props}
  />
))
TableHead.displayName = "TableHead"

const TableCell = React.forwardRef<
HTMLTableCellElement,
React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className="table-cell"
    /* className={"p-4 align-middle [&:has([role=checkbox])]:pr-0"} */
    {...props}
  />
))
TableCell.displayName = "TableCell"

const TableCaption = React.forwardRef<
HTMLTableCaptionElement,
React.HTMLAttributes<HTMLTableCaptionElement>
>(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className="table-caption"
    /* className={"mt-4 text-sm text-muted-foreground"} */
    {...props}
  />
))
TableCaption.displayName = "TableCaption"

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
}
