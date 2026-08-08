export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-24 bg-[#131921] text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <h3 className="text-2xl font-black tracking-tight text-white">Amazon</h3>
            <p className="mt-4 text-sm leading-6 text-gray-300">
              Your best destination for modern shopping, smart deals, and fast delivery.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="#" className="rounded-full border border-white/20 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white hover:text-[#131921]">
                Facebook
              </a>
              <a href="#" className="rounded-full border border-white/20 px-3 py-2 text-xs font-semibold text-white transition hover:bg-white hover:text-[#131921]">
                Instagram
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide text-[#fcd200]">Shop</h4>
            <ul className="mt-4 space-y-3 text-sm text-gray-300">
              <li><a href="/" className="transition hover:text-white">Home</a></li>
              <li><a href="#Products" className="transition hover:text-white">Products</a></li>
              <li><a href="#About" className="transition hover:text-white">About us</a></li>
              <li><a href="#" className="transition hover:text-white">Deals</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide text-[#fcd200]">Support</h4>
            <ul className="mt-4 space-y-3 text-sm text-gray-300">
              <li><a href="#" className="transition hover:text-white">Shipping</a></li>
              <li><a href="#" className="transition hover:text-white">Returns</a></li>
              <li><a href="#" className="transition hover:text-white">Payments</a></li>
              <li><a href="#" className="transition hover:text-white">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-wide text-[#fcd200]">Newsletter</h4>
            <p className="mt-4 text-sm leading-6 text-gray-300">
              Subscribe for offers and fresh arrivals.
            </p>
            <div className="mt-4 flex overflow-hidden rounded-full border border-white/20 bg-white">
              <input
                type="email"
                placeholder="Email address"
                className="w-full bg-transparent px-4 py-3 text-sm text-gray-900 outline-none"
              />
              <button className="bg-[#fcd200] px-5 py-3 text-xs font-bold uppercase text-gray-900 transition hover:bg-[#f7ca00]">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-gray-400">
            © {year} Amazon Store. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-xs font-semibold uppercase tracking-wide text-gray-300">
            <span>Privacy</span>
            <span className="h-1 w-1 rounded-full bg-gray-400"></span>
            <span>Terms</span>
            <span className="h-1 w-1 rounded-full bg-gray-400"></span>
            <span>Security</span>
          </div>
        </div>
      </div>
    </footer>
  );
}