import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Heart } from "lucide-react";
import PlantLine from "@/components/plant-line";

export default function NotFound() {
    return (
        <div className="min-h-screen w-full bg-background dark:bg-gray-900 flex flex-col items-center justify-center relative overflow-hidden">
            {/* Decorative plants in corners */}
            <Image
                src="/plant.svg"
                alt=""
                className="hidden md:block absolute top-0 left-0 opacity-30"
                width={200}
                height={200}
            />
            <Image
                src="/plant.svg"
                alt=""
                className="hidden md:block absolute bottom-0 right-0 scale-x-[-1] scale-y-[-1] opacity-30"
                width={200}
                height={200}
            />

            {/* Main content */}
            <div className="container mx-auto px-4 text-center max-w-4xl">
                {/* 404 with decorative elements */}
                <div className="relative mb-8">
                    <div className="mb-8">
                        <div className="relative inline-block">
                            <span>
                                <PlantLine className="fixed left-0 top-1/4 -translate-y-1/2" />
                                <h1 className="text-8xl md:text-9xl font-bold text-primary/20 dark:text-primary/30 select-none">
                                    404
                                </h1>
                            </span>
                            <div className="flex items-center justify-center mt-8">
                                <Heart className="w-12 h-12 md:w-8 md:h-8 text-primary fill-primary/20" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main message */}
                <div className="mb-12">
                    <h2 className="font-bold text-3xl md:text-5xl tracking-wide text-[#355A72] dark:text-[#a5b0b8] text-center italic mb-6">
                        Ops! Página não
                        <br />
                        encontrada
                    </h2>

                    <p className="text-muted-foreground text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed">
                        Parece que você se perdeu no caminho para nossa
                        celebração. Mas não se preocupe, ainda há muito amor
                        para compartilhar!
                    </p>

                    <div className="flex items-center justify-center mb-8">
                        <div className="flex items-center space-x-2 text-[#355A72] dark:text-[#a5b0b8]">
                            <Heart className="w-5 h-5 fill-current" />
                            <span className="text-sm uppercase tracking-wider">
                                Vitor & Laura
                            </span>
                            <Heart className="w-5 h-5 fill-current" />
                        </div>
                    </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
                    <Link href="/">
                        <Button
                            size="lg"
                            className="text-white rounded-[1.8rem] border-0 bg-[#6096E8] hover:bg-[#0F5A78] duration-300 font-semibold text-lg italic px-8 py-6 w-full sm:w-auto"
                        >
                            <Home className="w-5 h-5 mr-2" />
                            Voltar ao início
                        </Button>
                    </Link>

                    <Link href="/rsvp">
                        <Button
                            variant="outline"
                            size="lg"
                            className="rounded-[1.8rem] border-2 border-[#6096E8] text-[#6096E8] hover:bg-[#6096E8] hover:text-white duration-300 font-semibold text-lg italic px-8 py-6 w-full sm:w-auto"
                        >
                            <Heart className="w-5 h-5 mr-2" />
                            Confirmar presença
                        </Button>
                    </Link>
                </div>

                {/* Decorative quote */}
                <div className="relative">
                    <blockquote className="text-[#355A72] dark:text-[#a5b0b8] italic text-lg md:text-xl font-light max-w-xl mx-auto">
                        "O amor não se perde, apenas encontra novos caminhos."
                    </blockquote>
                    <div className="absolute -top-4 -left-4 text-4xl text-primary/30 font-serif">
                        "
                    </div>
                    <div className="absolute -bottom-4 -right-4 text-4xl text-primary/30 font-serif">
                        "
                    </div>
                </div>
            </div>

            {/* Floating decorative elements */}
            <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-primary/20 rounded-full animate-pulse"></div>
            <div className="absolute top-3/4 right-1/4 w-3 h-3 bg-primary/10 rounded-full animate-pulse delay-1000"></div>
            <div className="absolute top-1/2 left-1/6 w-1 h-1 bg-primary/30 rounded-full animate-pulse delay-500"></div>
            <div className="absolute bottom-1/4 left-3/4 w-2 h-2 bg-primary/15 rounded-full animate-pulse delay-1500"></div>
        </div>
    );
}
