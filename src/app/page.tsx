import Search from "./components/Search";
import StudentProfiles from "./components/StudentProfiles";

export default function Home() {
  return (
    <div className="mx-auto">
      <h1 className="text-sky-900 text-6xl font-black text-center mt-8">Get inspired.</h1>
      <h3 className="text-[#89C2D9] text-3xl font-bold text-center mt-6">Thousands of verified applications. Take your pick.</h3>
      <Search />
      <StudentProfiles />
    </div>
  );
}
