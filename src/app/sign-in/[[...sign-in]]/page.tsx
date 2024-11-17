import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center dark mt-8">
      <SignIn />
    </div>
  );
}
