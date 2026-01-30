"use client";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useContext, useMemo } from "react";
import type { RootState, DispatchType } from "@/store/index";

import { fetchAdminUser } from "./../../store/admin/user/adminUser.slice";
import UserTable from "./../../components/admin/userTable";
import Pagination from "./../../components/admin/pagination";
import { Spinner } from "@heroui/react";

import { AdminModalContext } from "@/components/admin/adminShell";

export default function Home() {
  const dispatch: DispatchType = useDispatch();

  const {
    loading,
    data,
    error,

    searchKeyword,
    searchLoading,
    searchResults,
    searchError,
  } = useSelector((state: RootState) => state.adminUser);

  const { openEditUser, openDeleteUser } = useContext(AdminModalContext);

  useEffect(() => {
    dispatch(fetchAdminUser({ page: 1, pageSize: 19, maNhom: "GP01" }));
  }, [dispatch]);

  const handlePageChange = (page: number) => {
    dispatch(fetchAdminUser({ page, pageSize: 19, maNhom: "GP01" }));
  };

  const isSearching = useMemo(() => !!searchKeyword?.trim(), [searchKeyword]);

  const tableData = useMemo(() => {
    return isSearching ? searchResults : data?.items || [];
  }, [isSearching, searchResults, data?.items]);

  // Loading toàn trang: chỉ cho list load
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <Spinner size="lg" />
      </div>
    );

  if (error)
    return <div>Error: {String((error as any)?.message ?? error)}</div>;

  return (
    <section className="h-full min-h-0 w-full bg-white rounded-xl shadow-sm py-3 flex flex-col overflow-hidden">
      {/* Body: table */}
      <div className="flex-1 min-h-0 px-6 overflow-auto">
        {/* ✅ Search loading indicator */}
        {searchLoading ? (
          <div className="py-4 flex items-center gap-2 text-sm text-default-500">
            <Spinner size="sm" />
            <span>Searching...</span>
          </div>
        ) : null}

        {/* ✅ Search error */}
        {isSearching && searchError ? (
          <p className="py-2 text-sm text-danger-500">
            {searchError.message || "Search failed"}
          </p>
        ) : null}

        {/* ✅ No results */}
        {isSearching &&
        !searchLoading &&
        !searchError &&
        tableData.length === 0 ? (
          <p className="py-6 text-sm text-default-500">
            No results found for:{" "}
            <span className="font-medium">{searchKeyword}</span>
          </p>
        ) : null}

        <UserTable
          data={tableData}
          onEdit={(user) => openEditUser(user)}
          onDelete={(user) => openDeleteUser(user)}
        />
      </div>

      {/* Footer: pagination (ẩn khi đang search) */}
      {!isSearching ? (
        <div className="px-6">
          <Pagination
            currentPage={data?.currentPage || 1}
            totalPages={data?.totalPages || 1}
            onPageChange={handlePageChange}
          />
        </div>
      ) : null}
    </section>
  );
}
