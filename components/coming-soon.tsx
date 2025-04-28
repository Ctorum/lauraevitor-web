import { BranchIcon } from "./branch-icon"

export function ComingSoon() {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4 text-center">
        <div className="flex items-center justify-center mb-6">
          <BranchIcon className="w-8 h-auto opacity-70 transform rotate-180 mr-4" />
          <h2 className="text-3xl md:text-4xl font-script text-gray-800 dark:text-gray-200">Em breve</h2>
          <BranchIcon className="w-8 h-auto opacity-70 ml-4" />
        </div>

        <div className="max-w-2xl mx-auto">
          <p className="text-[#859098] dark:text-[#a5b0b8] text-lg mb-8">
            As páginas de presentes e confirmação de presença estarão disponíveis em breve. Estamos trabalhando para
            tornar este momento especial para todos.
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">Lista de Presentes</h3>
              <p className="text-[#859098] dark:text-[#a5b0b8]">
                Nossa lista de presentes estará disponível em breve. Agradecemos sua paciência.
              </p>
            </div>

            <div className="p-6 border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3">Confirmação de Presença</h3>
              <p className="text-[#859098] dark:text-[#a5b0b8]">
                O formulário de RSVP estará disponível em breve. Fique atento para confirmar sua presença.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
