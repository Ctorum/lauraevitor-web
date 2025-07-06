import { BranchIcon } from "./branch-icon"
import Image from "next/image"
import vl from '../public/veame-laurao.svg'

export function History() {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <h2>NOSSA HISTÓRIA</h2>
      <div className="flex items-center justify-center">
        <div className="flex items-center justify-center w-[30rem] h-[35rem] p-[1rem] rounded-[0.9rem] bg-[#D9D9D9] mr-[5rem]">
          <p className="text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio deserunt cupiditate dignissimos nihil? Libero eos quasi iusto cum nisi magnam ullam, ducimus non maiores dolor? Impedit voluptas maxime quos dolore magni veniam, perferendis expedita sequi eos aliquid tempore itaque. Cum, sapiente. Nostrum debitis numquam eos eum atque amet unde ipsam ipsa fugit quas neque aliquam rerum esse ratione sunt veritatis nesciunt porro ex, officiis incidunt expedita consequatur pariatur ab. Pariatur obcaecati porro aperiam voluptatibus. Vel, possimus, atque eius aperiam et iusto libero modi saepe quidem sint nostrum reprehenderit quaerat at ullam repudiandae? Aspernatur temporibus sed nam sapiente, id accusamus sunt.</p>
        </div>

        <Image src={vl} alt="" className="w-[30.125rem] h-[28.75rem]" />
      </div>
    </section>
  )
}
