import NavbarItem from "./NavbarItem";

export default function Navbar() {
  return (
    <div className="flex p-4 lg:text-lg justify-center gap-6">
      <NavbarItem title="Premieres" param="fetchTrending" />
      <NavbarItem title="Popular" param="fetchTopRated" />
    </div>
  );
}
