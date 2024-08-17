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
import { sxOverflowEllipse } from "@/app/sxStyles";

const delimiter = "--delimitizzle**";

export default function MyPlaylistsTable({ data }: { data: PlaylistOfMine[] }) {
  const columns = useMemo<MRT_ColumnDef<PlaylistOfMine>[]>(
    () => [
      {
        header: "Name",
        accessorFn: ({ name, images }) => {
          const imgUrl = images.length && images[0].url;
          const dataArr = [name];
          if (imgUrl) dataArr.push(imgUrl);
          return dataArr.join(delimiter);
        },
        grow: true,
        id: "name",
        maxSize: 130,
        Cell: ({ renderedCellValue, row }) => {
          const [name, src] = (renderedCellValue as string).split(delimiter);
          return (
            <Link href={`/playlists/${row.original.id}`}>
              <Box
                sx={{
                  ...sxOverflowEllipse,
                  display: "flex",
                  alignItems: "center",
                  gap: "1rem",
                }}
              >
                <Image
                  src={src || defaultPlaylistImage}
                  alt="playlist image"
                  width="30"
                  height="30"
                />
                <Typography sx={sxOverflowEllipse}>{name}</Typography>
              </Box>
            </Link>
          );
        },
      },

      {
        header: "# Tracks",
        accessorKey: "tracks.total",
        size: 28,
        Cell: ({ renderedCellValue }) => (
          <Typography>{renderedCellValue}</Typography>
        ),
      },
      {
        header: "Description",
        accessorKey: "description",
        maxSize: 100,
        grow: true,
        Cell: ({ renderedCellValue }) => (
          <Typography sx={sxOverflowEllipse}>{renderedCellValue}</Typography>
        ),
      },
      {
        accessorKey: "owner.display_name",
        header: "Owner",
        size: 35,
        Cell: ({ renderedCellValue, row }) => (
          <Link href={`/users/${row.original.owner.id}`}>
            <Typography sx={sxOverflowEllipse}>{renderedCellValue}</Typography>
          </Link>
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns: columns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
    enableRowSelection: true,
    enableSelectAll: false,
    enableStickyHeader: true,
    enableStickyFooter: true,

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
  return (
    <Box
      sx={{
        td: {
          padding: "0.5rem",
        },
      }}
    >
      <MaterialReactTable table={table} />
    </Box>
  );
}
