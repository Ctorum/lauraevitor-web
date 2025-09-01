"use client"

import { useState, useMemo } from "react"
import { Search, Filter, Grid3X3, Grid2X2, LayoutGrid } from "lucide-react"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface MasonryItem {
  id: string
  title: string
  imageUrl: string
  category?: string
  tags?: string[]
  width: number
  height: number
}

interface MasonryGalleryProps {
  items: MasonryItem[]
  columns?: number
  showSearch?: boolean
  showFilter?: boolean
  showLayoutToggle?: boolean
  className?: string
}

export default function MasonryGallery({
  items,
  columns = 3,
  showSearch = true,
  showFilter = true,
  showLayoutToggle = true,
  className = "",
}: MasonryGalleryProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [columnCount, setColumnCount] = useState(columns)

  const categories = useMemo(() => {
    const cats = items.map((item) => item.category).filter(Boolean)
    return Array.from(new Set(cats)) as string[]
  }, [items])

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        searchTerm === "" ||
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.tags?.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))

      const matchesCategory = selectedCategory === null || item.category === selectedCategory

      return matchesSearch && matchesCategory
    })
  }, [items, searchTerm, selectedCategory])

  const getColumnClass = () => {
    switch (columnCount) {
      case 2:
        return "columns-2"
      case 3:
        return "columns-3"
      case 4:
        return "columns-4"
      case 5:
        return "columns-5"
      default:
        return "columns-3"
    }
  }

  return (
    <div className={`w-full space-y-6 ${className}`}>
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center flex-1">

          {showFilter && categories.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => setSelectedCategory(null)}>All Categories</DropdownMenuItem>
                {categories.map((category: string) => (
                  <DropdownMenuItem key={category} onClick={() => setSelectedCategory(category)}>
                    {category}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {showLayoutToggle && (
          <div className="flex gap-2">
            <Button variant={columnCount === 2 ? "default" : "outline"} size="sm" onClick={() => setColumnCount(2)}>
              <Grid2X2 className="h-4 w-4" />
            </Button>
            <Button variant={columnCount === 3 ? "default" : "outline"} size="sm" onClick={() => setColumnCount(3)}>
              <Grid3X3 className="h-4 w-4" />
            </Button>
            <Button variant={columnCount === 4 ? "default" : "outline"} size="sm" onClick={() => setColumnCount(4)}>
              <LayoutGrid className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>

      <div className="text-sm text-muted-foreground">
        Showing {filteredItems.length} of {items.length} items
        {selectedCategory && (
          <Badge variant="secondary" className="ml-2">
            {selectedCategory}
          </Badge>
        )}
      </div>

      <div className={`${getColumnClass()} gap-4 space-y-4`}>
        {filteredItems.map((item: MasonryItem) => (
          <div key={item.id} className="break-inside-avoid mb-4 group cursor-pointer">
            <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] bg-white">
              <Image
                src={item.imageUrl || "/placeholder.svg"}
                alt={item.title}
                width={item.width}
                height={item.height}
                className="w-full h-auto object-cover"
              />

              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />

              {item.category && (
                <Badge className="absolute bottom-3 left-3 bg-black/80 text-white border-none hover:bg-black/90 text-xs px-2 py-1">
                  {item.category}
                </Badge>
              )}

              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <h3 className="text-white text-lg font-semibold text-center px-4 drop-shadow-lg">{item.title}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredItems.length === 0 && (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-2">No items found</div>
          <Button
            variant="outline"
            onClick={() => {
              setSearchTerm("")
              setSelectedCategory(null)
            }}
          >
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  )
}
