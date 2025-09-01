"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/"); // Redirecionar para a página inicial após 3 segundos
    }, 3000);

    return () => clearTimeout(timer); // Limpar o timer
  }, [router]);

  return (
    <div className="min-h-screen w-full bg-background dark:bg-gray-900 flex items-center justify-center">
      <main className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-4xl font-bold text-green-500 mb-4">Pagamento Realizado com Sucesso!</h1>
        <p className="text-lg text-foreground dark:text-gray-300">
          Seu pagamento foi processado com sucesso. Você será redirecionado em breve.
        </p>
        <p className="text-sm text-gray-500 mt-2">
          Se você não for redirecionado automaticamente, por favor clique{" "}
          <a href="/" className="text-blue-500 hover:underline">
            aqui
          </a>
          .
        </p>
      </main>
    </div>
  );
}