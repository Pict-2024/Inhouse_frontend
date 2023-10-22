export default function NavList() {
  return (
    <nav className="bg-eeeee shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="#" className="text-black text-2xl font-semibold">
          Navbar
        </a>
        <ul className="flex space-x-4">
          <li>
            <a href="#" className="text-black">
              User
            </a>
          </li>
          <li>
            <a href="#" className="text-black">
              Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
