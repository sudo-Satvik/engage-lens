"use client"

import { useEffect, useState } from 'react'
import axios from 'axios'
import { EngagementData } from '@/types/engagementType'
import { DataTable } from './DataTable'
import { SkeletonTable } from '@/components/dashboard/skeleton-table'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from "@/components/ui/button"
import { ArrowUpDown, Download } from 'lucide-react'
import { Pagination } from '@/components/ui/pagination'

interface PostResponse {
  posts: EngagementData[];
  currentPage: number;
  totalPages: number;
  totalPosts: number;
}

const PostTable = () => {
  const [allPosts, setAllPosts] = useState<EngagementData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalPosts, setTotalPosts] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const fetchData = async (page: number = 1) => {
    try {
      setIsLoading(true);
      setError(null);

      const postResponse = await axios.get<PostResponse>(
        `https://engage-lens-backend.onrender.com/api/analytics/all-posts?page=${page}&limit=${rowsPerPage}`
      );
      
      if (postResponse.data && postResponse.data.posts) {
        setAllPosts(postResponse.data.posts);
        setCurrentPage(postResponse.data.currentPage);
        setTotalPages(postResponse.data.totalPages);
        setTotalPosts(postResponse.data.totalPosts);
      } else {
        throw new Error("Failed to fetch posts");
      }
    } catch (error) {
      console.error("Error in fetchData:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to fetch data. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData()
  }, [rowsPerPage])

  const columns: ColumnDef<EngagementData>[] = [
    {
      accessorFn: (row) => row.id,
      id: "id",
      header: "ID",
    },
    {
      accessorFn: (row) => row.postType,
      id: "postType",
      header: "Post Type",
    },
    {
      accessorFn: (row) => row.likes,
      id: "likes",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Likes
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorFn: (row) => row.shares,
      id: "shares",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Shares
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorFn: (row) => row.comments,
      id: "comments",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Comments
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
      },
    },
    {
      accessorFn: (row) => new Date(row.timestamp).toLocaleDateString(),
      id: "timestamp",
      header: "Date",
    },
  ]

  const downloadCSV = () => {
    const headers = columns.map(column => column.id).join(',')
    const csvData = allPosts.map(post => 
      columns.map(column => post[column.id as keyof EngagementData]).join(',')
    ).join('\n')
    const csvContent = `${headers}\n${csvData}`
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob)
      link.setAttribute('href', url)
      link.setAttribute('download', 'engagement_data.csv')
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  const handleRowsPerPageChange = (value: number) => {
    setRowsPerPage(value);
    setCurrentPage(1); // Reset to first page when changing rows per page
    fetchData(1);
  };

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="space-y-8">
      <div>
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-xl lg:text-2xl font-bold tracking-tight">All Posts Overview</h2>
            <h3 className="text-md text-gray-400 tracking-tight">Individual Posts Records</h3>
          </div>
          <Button onClick={downloadCSV} disabled={isLoading}>
            <Download className="mr-2 h-4 w-4" />
            Download CSV
          </Button>
        </div>
        {isLoading ? (
          <SkeletonTable />
        ) : (
          <>
            <DataTable 
              columns={columns} 
              data={allPosts}
              pagination={
                <Pagination 
                  currentPage={currentPage}
                  totalPages={totalPages}
                  onPageChange={fetchData}
                />
              }
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleRowsPerPageChange}
            />
            <div className="text-sm text-muted-foreground mt-2">
              Total Posts: {totalPosts}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default PostTable

