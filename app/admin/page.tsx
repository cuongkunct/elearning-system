"use client";

import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import type { RootState, DispatchType } from "@/store/index";
import { fetchAdminUser } from "@/store/admin/user/adminUser.slice";
import UserTable from "../../components/admin/userTable";
import Pagination from "../../components/admin/pagination";
import { Spinner } from "@heroui/react";

export default function Home() {
  const dispatch: DispatchType = useDispatch();
  const { loading, data, error } = useSelector(
    (state: RootState) => state.adminUser
  );

  // Fetch data khi page component mount
  useEffect(() => {
    dispatch(fetchAdminUser({ page: 1, pageSize: 19, maNhom: "GP01" }));
  }, [dispatch]);

  const handlePageChange = (page: number) => {
    dispatch(fetchAdminUser({ page, pageSize: 19, maNhom: "GP01" }));
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" />
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;

  return (
    <section className="h-full min-h-0 w-full bg-white rounded-xl shadow-sm py-3 flex flex-col overflow-hidden">
      {/* Body: table nằm đây, có padding và có thể scroll nếu muốn */}
      <div className="flex-1 min-h-0 px-6 overflow-auto">
        <UserTable data={data?.items || []} />
      </div>

      {/* Footer: pagination luôn “dính đáy” của panel */}
      <div className="px-6">
        <Pagination
          currentPage={data?.currentPage || 1}
          totalPages={data?.totalPages || 1}
          onPageChange={handlePageChange}
        />
      </div>
    </section>
  );
}
