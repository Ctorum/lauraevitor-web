import { BranchIcon } from "./branch-icon"
import Image from "next/image"
import vl from '../public/veame-laurao.svg'
import PlantLine from "./plant-line"

export function History() {
  return (
    <section className="flex flex-col py-16 bg-white dark:bg-gray-900 text-center w-full">
      <div className="relative w-full flex flex-row items-center justify-center">
        <PlantLine amount={2} className="overflow-hidden absolute bottom-[1rem] left-0 w-[calc(100%-10rem)]" />
        <h2 className="mb-[7.375rem] text-[2rem] font-bold italic text-[#355A72] absolute z-[1] pl-[1rem]">NOSSA HISTÓRIA</h2>
      </div>
      <div className="flex flex-col-reverse md:flex-row items-center justify-center">
        <div className="flex items-center justify-center w-[20rem] mt-[5rem] md:w-[30rem] md:h-[35rem] p-[1rem] rounded-[0.9rem] bg-[#D9D9D9] md:mt-[0] md:mr-[5rem]">
          <p className="text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio deserunt cupiditate dignissimos nihil? Libero eos quasi iusto cum nisi magnam ullam, ducimus non maiores dolor? Impedit voluptas maxime quos dolore magni veniam, perferendis expedita sequi eos aliquid tempore itaque. Cum, sapiente. Nostrum debitis numquam eos eum atque amet unde ipsam ipsa fugit quas neque aliquam rerum esse ratione sunt veritatis nesciunt porro ex, officiis incidunt expedita consequatur pariatur ab. Pariatur obcaecati porro aperiam voluptatibus. Vel, possimus, atque eius aperiam et iusto libero modi saepe quidem sint nostrum reprehenderit quaerat at ullam repudiandae? Aspernatur temporibus sed nam sapiente, id accusamus sunt.</p>
        </div>

        <div className={`md:w-[34.125rem] md:h-[32.75rem] w-[24rem] h-[22.75rem] img-cs`}>
          <Image src={vl} alt="Vitor e Laura" className="w-[100%] h-[20.75rem] md:w-[30.125rem] md:h-[28.75rem]" />
        </div>

      </div>
    </section>
  )
}
