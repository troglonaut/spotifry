"use client";

import { PlaylistOfMine } from "@/types/types";
import {
  MRT_ColumnDef,
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { useMemo } from "react";
import Image from "next/image";
import { Box, Typography } from "@mui/material";
import defaultPlaylistImage from "@/public/images/playlist.png";
import Link from "next/link";

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
        header: "Name",
        size: 150,
        Cell: ({ renderedCellValue }) => {
          const [name, src] = (renderedCellValue as string).split(delimiter);
          return (
            <Box
              sx={{
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
              />
              <Typography>{name}</Typography>
            </Box>
          );
        },
        id: "nombre",
      },
      {
        accessorKey: "owner.display_name",
        header: "Owner",
        size: 150,
        Cell: ({ renderedCellValue, row }) => (
          <Link href={`/users/${row.original.owner.id}`}>
            <Typography>{renderedCellValue}</Typography>
          </Link>
        ),
      },

      {
        accessorKey: "tracks.total",
        header: "# Tracks",
        size: 20,
        Cell: ({ renderedCellValue }) => (
          <Typography>{renderedCellValue}</Typography>
        ),
      },
      {
        accessorKey: "description",
        header: "Description",
        size: 200,
        Cell: ({ renderedCellValue }) => (
          <Typography>{renderedCellValue}</Typography>
        ),
      },
    ],
    []
  );
  const table = useMaterialReactTable({
    columns: memoizedColumns,
    data, //data must be memoized or stable (useState, useMemo, defined outside of this component, etc.)
  });
  // return <></>;
  return <MaterialReactTable table={table} />;
}
