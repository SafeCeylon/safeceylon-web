'use client';

import RequestCard from '@/components/RequestCard';
import GoogleMaps_withSearch from '@/components/GoogleMaps_withSearch';

/*
must need foemat

  {
    type: <Flood | LandSlide | Hurricane>,
    lat: <latitude>,
    lng: <longitude>,
  }

*/

const locationTableData = [
  {
    type: "Flood",
    lat: 6.930744760579417,
    lng: 79.89585272911694,
  },
  // 6.899745085541083, 79.91594916918893 - Flood
  {
    type: "Flood",
    lat: 6.899745085541083,
    lng: 79.91594916918893,
  },
  // 6.949339272308375, 79.91821880178134 - Flood
  {
    type: "Flood",
    lat: 6.949339272308375,
    lng: 79.91821880178134,
  },
  // 6.923770323083465, 79.93573541773218 - Hurricane
  {
    type: "Hurricane",
    lat: 6.923770323083465,
    lng: 79.93573541773218,
  },
  // 6.933084520066893, 79.91076296697634 - Hurricane
  {
    type: "Hurricane",
    lat: 6.933084520066893,
    lng: 79.91076296697634,
  },
  // 6.897546289418614, 79.93515802002683 - LandSlide
  {
    type: "LandSlide",
    lat: 6.897546289418614,
    lng: 79.93515802002683,
  },
  // 6.886798314835731, 79.94064329822753 - LandSlide
  {
    type: "LandSlide",
    lat: 6.886798314835731,
    lng: 79.94064329822753,
  },
  {
    type: "LandSlide",
    lat: 6.9141692720477765, 
    lng:  79.88430509873614,
  },
  // 6.9361899805264935, 79.9259541217618 - Hurricane
  {
    type: "Hurricane",
    lat: 6.9361899805264935,
    lng: 79.9259541217618,
  }, 
]

export default function Admin() {
  return (
    <div className="px-[50px] md:px-[100px] flex h-4/5 w-full gap-20 mt-5">
      <div className="flex flex-col w-2/3 gap-14 h-full">
        <div className="flex w-full gap-20 h-1/4">
          <div className="text-black flex flex-col w-1/2 items-center h-full rounded-2xl bg-[#FFF9F0]">
            <h4 className="text-lg mt-[10px]">Disaster Victims Status</h4>
            <div className="flex w-full gap-5 px-10 h-full my-5 ">
              <RequestCard />
              <RequestCard />
              <RequestCard />
            </div>
          </div>
          <div className="text-black flex flex-col bg-white w-1/2 items-center h-full rounded-2xl"></div>
        </div>

        <div className="w-full bg-white h-2/3 rounded-2xl">
          <GoogleMaps_withSearch />
        </div>
      </div>
      <div className="w-1/3 h-full flex flex-col gap-14">
        <div className="text-black flex flex-col bg-white w-full items-center h-1/4 rounded-2xl"></div>
        <div className="w-full bg-white h-2/3 rounded-2xl"></div>
      </div>
    </div>
  );
}

// export locationTableData
export { locationTableData };