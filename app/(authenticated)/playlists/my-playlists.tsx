"use client";

import { PlaylistOfMine } from "@/types/types";
import {
  MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useMemo } from "react";
import Image from "next/image";
import { Box, Button, Typography } from "@mui/material";
import defaultPlaylistImage from "@/public/images/playlist.png";
import Link from "next/link";
import { ellipseStyles } from "@/app/utils/serverUtils";

const delimiter = "--delimitizzle**";

export default function MyPlaylistsTable({ data }: { data: PlaylistOfMine[] }) {
  const memoizedColumns = useMemo<MRT_ColumnDef<PlaylistOfMine>[]>(
    () => [
      {
        accessorFn: ({ name, images }) => {
          const imgUrl = images.length && images[0].url;
          const dataArr = [name];
          if (imgUrl) dataArr.push(imgUrl);
          return dataArr.join(delimiter);
        },
        grow: true,
        header: "Name",
        maxSize: 130,
        Cell: ({ renderedCellValue }) => {
          const [name, src] = (renderedCellValue as string).split(delimiter);
          return (
            <Box
              sx={{
                ...ellipseStyles,
                display: "flex",
                alignItems: "center",
                gap: "1rem",
              }}
            >
              <Image
                src={src || defaultPlaylistImage}
                alt="playlist image"
                width="85"
                height="85"
                priority
              />
              <Typography sx={ellipseStyles}>{name}</Typography>
            </Box>
          );
        },
        id: "name",
      },

      {
        accessorKey: "tracks.total",
        header: "# Tracks",
        size: 28,
        Cell: ({ renderedCellValue }) => (
          <Typography>{renderedCellValue}</Typography>
        ),
      },
      {
        accessorKey: "description",
        header: "Description",
        maxSize: 100,
        grow: true,
        Cell: ({ renderedCellValue }) => (
          <Typography sx={{ ...ellipseStyles }}>{renderedCellValue}</Typography>
        ),
      },
      {
        accessorKey: "owner.display_name",
        header: "Owner",
        size: 35,
        Cell: ({ renderedCellValue, row }) => (
          <Link href={`/users/${row.original.owner.id}`}>
            <Typography sx={ellipseStyles}>{renderedCellValue}</Typography>
          </Link>
        ),
      },
    ],
    []
  );
  const table = useMaterialReactTable({
    columns: memoizedColumns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableRowSelection: true,
    enableSelectAll: false,
    layoutMode: "grid",
    renderTopToolbarCustomActions: ({ table }) => (
      <Button
        onClick={() => {
          const selectedRows = table.getSelectedRowModel().rows;

          console.info(
            `%c🔬 selectedRows`,
            "color: limegreen; font-size: 20px;",
            selectedRows
          );
        }}
      >
        Log Rows
      </Button>
    ),
  });
  return <MaterialReactTable table={table} />;
}
