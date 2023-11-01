import {Link} from 'react-router-dom'
export default function NavList() {
  return (
    <nav className="bg-eeeee shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="#" className="text-black text-2xl font-semibold">
          Navbar
        </a>
        <ul className="flex space-x-4">
          <li>
            <Link to={'/auth/login'}>Login</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
