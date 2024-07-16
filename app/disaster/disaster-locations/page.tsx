import DisasterNavbar from "@/components/DisasterNavbar";
import RequestCard from "@/components/RequestCard";

export default function Admin() {
  return (
    <div className="bg-primary h-screen">
      <DisasterNavbar />
      <div className="px-[50px] md:px-[100px] flex h-4/5 w-full gap-20">
        <div className="flex flex-col w-full gap-14 h-full">
          <div className="w-full bg-white h-full rounded-2xl">
            <div className="w-full bg-orange-300 h-20 flex-shrink-0"></div>
            <div className="w-full bg-slate-400 flex-grow">
              hello
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
