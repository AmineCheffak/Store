


const navLinks = [
  { name: "Home", link: "/" },
  { name: "About", link: "#About" },
  { name: "Products", link: "#Products" },
];

export default function Nav({size}) {
  return (
    <nav className="p-4 flex justify-between items-center">
      <ul className="flex flex-wrap items-center gap-4">
        {navLinks.map((item, index) => (
          <li key={`${item.name}-${index}`}>
            <a href={item.link} className={`text-black opacity-75 hover:opacity-100 transition-opacity duration-300  ${size}`}>
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}