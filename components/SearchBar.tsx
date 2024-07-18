export default function SearchBar() {
  return (
    <div className="flex items-center justify-center text-white">
      <div className="flex gap-5">
        <div className="flex items-center px-[10px] bg-[#ffffff20] rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search anything..."
            className="w-[80%] h-[50px] px-5 bg-transparent focus:outline-none text-white"
          />
        </div>
        <button className="bg-[#ff9900] px-[20px] py-[12px] rounded-lg">
          Search
        </button>
      </div>
      <div></div>
    </div>
  );
}
