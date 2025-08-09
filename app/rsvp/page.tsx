import PlantLine from "@/components/plant-line";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

export default function Token() {
  return (
    <div className="pt-20 w-full h-full flex flex-col items-center justify-center gap-16">
      <section className="w-full flex-[35%] relative flex items-center justify-center">
        <PlantLine className="w-1/3 absolute left-0 top-1/2 -translate-y-1/2" />
        <h1 className="text-4xl text-third font-bold italic">
          Deposite aqui o seu token
        </h1>
      </section>

      <section className="flex-[65%]">
        <InputOTP maxLength={6}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <span className="w-12 h-1.5 mx-4 bg-primary rounded-full" />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </section>

      <span className="absolute left-0 bottom-0 w-full h-96 flex items-center justify-between">
        <img
          src="/images/plant.png"
          alt="plant-1"
          className="h-full scale-x-[-1]"
        />
        <img src="/images/plant.png" alt="plant-2" className="h-full" />
      </span>
    </div>
  );
}
