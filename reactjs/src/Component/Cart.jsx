


export default function Cart({ product ,onClick }) {
    return (
        <div className="group flex h-full flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition duration-200 hover:shadow-lg">

            {/* Image */}
            <div className="flex h-64 w-full items-center justify-center overflow-hidden bg-white p-4">
                <img
                    src={product.images?.[0]}
                    alt={product.title}
                    className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                />
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col p-4">

                {/* Title */}
                <h3 className="line-clamp-2 min-h-12 text-base font-medium leading-6 text-gray-900">
                    {product.title}
                </h3>

                {/* Description */}
                <p className="mt-2 line-clamp-2 text-sm leading-5 text-gray-500">
                    {product.description}
                </p>

                {/* Rating */}
                <div className="mt-3 flex items-center gap-1">
                    <span className="text-sm text-gray-700">4.5</span>

                    <div className="text-sm text-[#f08804]">
                        ★★★★★
                    </div>

                    <span className="text-xs text-gray-500">
                        (120)
                    </span>
                </div>

                {/* Price */}
                <div className="mt-3">
                    <span className="text-2xl font-semibold text-gray-900">
                        ${Number(product.price).toFixed(2)}
                    </span>
                </div>

                {/* Button */}
                <button
                    type="button"
                    onClick={onClick}
                    className="mt-auto w-full rounded-full border border-[#fcd200] bg-[#ffd814] px-4 py-2 text-sm font-medium text-gray-900 transition hover:bg-[#f7ca00] active:scale-[0.98]"
                >
                    Add to Cart
                </button>

            </div>
        </div>
    );
}
