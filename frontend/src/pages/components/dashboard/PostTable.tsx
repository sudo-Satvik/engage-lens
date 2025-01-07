"use client"

import { useEffect, useState } from 'react'
import axios from 'axios'
import { EngagementData } from '@/types/engagementType'
import { DataTable } from './DataTable'
import { SkeletonTable } from '@/components/dashboard/skeleton-table'
import { ColumnDef } from '@tanstack/react-table'
import { Button } from "@/components/ui/button"
import { ArrowUpDown, Download } from 'lucide-react'

const PostTable = () => {
  const [allPosts, setAllPosts] = useState<EngagementData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    try {
      setIsLoading(true)
      setError(null)

      const postResponse = await axios.get(
        "http://localhost:8000/api/analytics/all-posts"
      )
      if (postResponse.data && postResponse.data.length > 0) {
        setAllPosts(postResponse.data)
        console.log("All posts:", postResponse.data.length, postResponse.data)
      } else {
        const mockResponse = await axios.post(
          "http://localhost:8000/api/analytics/generate-mock-data",
          { count: 200 }
        )
        if (!mockResponse.data) {
          throw new Error("Error generating mock data")
        }
        setAllPosts(mockResponse.data)
      }
    } catch (error) {
      console.error("Error fetching data:", error)
      setError(
        error instanceof Error
          ? error.message
          : "Failed to fetch data. Please try again."
      )
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

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
          <DataTable columns={columns} data={allPosts} />
        )}
      </div>
    </div>
  )
}

export default PostTable

