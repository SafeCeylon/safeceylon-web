import DisasterNavbar from '@/components/DisasterNavbar';
import RequestCard from '@/components/RequestCard';

export default function Admin() {
  return (
    <div className="bg-primary h-screen">
      <DisasterNavbar active="dashboard" />
      <div className="px-[50px] md:px-[100px] flex h-4/5 w-full gap-20 mt-5">
        <div className="flex flex-col w-2/3 gap-14 h-full">
          <div className="flex w-full gap-20 h-1/4">
            <div className="text-black flex flex-col w-1/2 items-center h-full rounded-2xl bg-[#FFF9F0]">
              <h4 className="text-lg mt-[10px]">Disaster Victims Status</h4>
              <div className="flex w-full gap-5 px-10 h-full my-5 ">
                <RequestCard name="To Reply" percentage={45} count={90} />
                <RequestCard name="Replied" percentage={38} count={76} />
                <RequestCard name="Closed" percentage={17} count={34} />
              </div>
            </div>
            <div className="text-black flex flex-col bg-white w-1/2 items-center h-full rounded-2xl"></div>
          </div>

          <div className="w-full bg-white h-2/3 rounded-2xl"></div>
        </div>
        <div className="w-1/3 h-full flex flex-col gap-14">
          <div className="text-black flex flex-col bg-white w-full items-center h-1/4 rounded-2xl"></div>
          <div className="w-full bg-white h-2/3 rounded-2xl"></div>
        </div>
      </div>
    </div>
  );
}
