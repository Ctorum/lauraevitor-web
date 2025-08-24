"use client"

import Header from "@/components/header"
import MasonryGallery from "@/components/masonry-gallery"
import { useState } from "react"
export default function Pictures() {
   const [defaultItems, setDefaultItems] = useState([
      {
         id: "1",
         title: "Image 1",
         imageUrl: "https://via.placeholder.com/150",
         tags: ["tag1", "tag2"],
         width: 350,
         height: 350,
      },
      {
         id: "2",
         title: "Image 2",
         imageUrl: "https://via.placeholder.com/150",
         tags: ["tag3", "tag4"],
         width: 350,
         height: 350,
      },
      {
         id: "3",
         title: "Image 3",
         imageUrl: "https://via.placeholder.com/150",
         tags: ["tag5", "tag6"],
         width: 350,
         height: 350,
      },
   ])

   return (
      <div className="min-h-screen w-full bg-background dark:bg-gray-900">
         <main className="container mx-auto px-4 pt-32 pb-8">
            <MasonryGallery items={defaultItems}/>
         </main>
      </div>
   )
}