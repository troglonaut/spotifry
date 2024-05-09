// "use server";

import { getMyPlaylists } from "@/app/lib/actions";
import { getAuthSession } from "@/app/utils/serverUtils";
import { Profile } from "@/types/types";
import { notFound, redirect } from "next/navigation";
import Image from "next/image";
import Typography from "@mui/material/Typography";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

export default async function UsersPage() {
  const session = await getAuthSession();
  if (!session) {
    redirect("/login");
  }

  const res = await getMyPlaylists(session, 50);

  const { href, limit, next, offset, previous, total, items: playlists } = res;

  const rows = playlists.map((p) => ({
    id: p.id,
    name: p.name,
    owner: p.owner.display_name,
    public: p.public,
    totalTracks: p.tracks.total,
  }));

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 300 },
    { field: "id", headerName: "id", width: 130 },
    { field: "owner", headerName: "Owner", width: 200 },
    { field: "public", headerName: "Public", width: 100 },
    { field: "totalTracks", headerName: "# Tracks", width: 200 },
  ];

  return (
    <DataGrid
      sx={{
        "& .MuiDataGrid-cell": {
          color: "white",
        },
        "& .MuiTablePagination-root": {
          color: "white",
        },
      }}
      rows={rows}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      pageSizeOptions={[7, 10]}
      checkboxSelection
    />
  );
}
