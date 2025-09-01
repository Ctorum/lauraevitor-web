"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function FailurePage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 5000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="min-h-screen w-full bg-background dark:bg-gray-900 flex items-center justify-center">
      <main className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-4xl font-bold text-red-500 mb-4">Pagamento Falhou</h1>
        <p className="text-lg text-foreground dark:text-gray-300">
          Ocorreu um erro ao processar seu pagamento. Por favor, tente novamente.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Você será redirecionado para a página inicial em breve. Se não for, clique{" "}
          <a href="/" className="text-blue-500 hover:underline">
            aqui
          </a>
          .
        </p>
      </main>
    </div>
  );
}