import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"

import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export function SectionGallery() {
    const gallery = [
        {
            url: '/images/vl-img.svg'
        },
    ]

    return(
        <section className="w-full mt-[5rem] md:mt-[15rem] pt-[2rem] flex flex-col items-center justify-center">
            <h2 className="text-[2rem] font-bold italic text-[#355A72] relative top-[1.5rem]">FOTOS</h2>
            <div className="bg-[#B3C7D0] w-full h-[30rem] flex items-center justify-center">
                <Carousel  opts={{
                    align: "start",
                }}
                className="w-full max-w-[50%] hidden md:flex bg-[#B3C7D0]">
                <CarouselContent>
                    {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index} className="bg-[#B3C7D0] md:basis-2/2 lg:basis-3/3">
                        <div className="bg-[#B3C7D0] flex items-center justify-center">
                        <Card className="border-[0] w-[512px] rounded-[0] bg-[#B3C7D0]">
                            <CardContent className="flex aspect-square items-center justify-center w-[512px] h-[424px] bg-[#B3C7D0]">
                            <Image src={gallery[0].url} alt="img" width={512} height={424} className="bg-[none]"/>
                            </CardContent>
                        </Card>
                        </div>
                    </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselNext/>
                <CarouselPrevious/>
                </Carousel>

                <Carousel
                opts={{
                    align: "start",
                }}
                orientation="vertical"
                className="w-full max-w-xs block md:hidden"
                >
                <CarouselContent className="-mt-1 h-[15rem]">
                    {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index} className="pt-1 md:basis-1/2 bg-[#B3C7D0]">
                        <div className="bg-[#B3C7D0]">
                        <Card className="h-[14rem] border-[0] rounded-[0] bg-[#B3C7D0]">
                            <CardContent className="border-[0]">
                            <Image src={gallery[0].url} alt="img" width={312} height={224} className="w-[100%] h-[100%] bg-[none]"/>
                            </CardContent>
                        </Card>
                        </div>
                    </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
                </Carousel>
            </div>
            <button className="relative top-[-2rem] md:top-[-2.5rem] w-[15rem] border-[2px] bg-[#fff] border-[#4B5770] text-[#355A72] border-solid pt-[1rem] pb-[1rem] pr-[2rem] pl-[2rem] md:pt-[1.75rem] md:pb-[1.75rem] md:pr-[4rem] md:pl-[4rem]">VER TODOS</button>
        </section>
    )
}