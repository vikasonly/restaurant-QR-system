import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMenuItems, setSelectedCategory } from '../redux/menuSlice';
import { addToCart } from '../redux/cartSlice';
import Hero from '../components/Hero';
import { useToast } from '../context/ToastContext';

// Loading Skeleton Component
const LoadingSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {[...Array(6)].map((_, index) => (
      <div
        key={index}
        className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700 rounded-2xl overflow-hidden animate-pulse shadow-lg"
      >
        <div className="h-52 w-full bg-gray-700/50 rounded-t-2xl"></div>
        <div className="p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="h-5 w-28 bg-gray-700/50 rounded-lg"></div>
            <div className="h-5 w-16 bg-gray-700/50 rounded-lg"></div>
          </div>
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-700/50 rounded-lg"></div>
            <div className="h-4 w-3/4 bg-gray-700/50 rounded-lg"></div>
          </div>
          <div className="flex items-center justify-between pt-3">
            <div className="h-3 w-20 bg-gray-700/50 rounded-lg"></div>
            <div className="h-8 w-24 bg-gray-700/50 rounded-lg"></div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const Homepage = () => {
  const dispatch = useDispatch();
  const toast = useToast();

  const { menuItems = [], categories = [], loading, error, selectedCategory, searchQuery } =
    useSelector((state) => state.menu);

  const user = useSelector((state) => state.auth); // logged-in user

  // Fetch menu items when category or search changes
  useEffect(() => {
    dispatch(fetchMenuItems(selectedCategory));
  }, [dispatch, selectedCategory, searchQuery]);

  const handleCategoryChange = (category) => {
    dispatch(setSelectedCategory(category));
  };

  const handleAddToCart = (item) => {
    if (!user?._id) {
      toast.error('Please login to add items to cart');
      return;
    }

    dispatch(
      addToCart({
        userId: user._id,
        menuItemId: item._id,
        quantity: 1,
      })
    )
      .unwrap()
      .then(() => toast.success(`${item.name} added to cart`))
      .catch((err) => toast.error(err?.message || 'Failed to add to cart'));
  };

  if (loading) {
    return (
      <div className="space-y-10 px-4 md:px-8">
        <Hero />
        <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-wide">
          Explore Our Menu
        </h1>
        <p className="text-gray-400 text-lg md:text-xl">Fresh & delicious vegetarian dishes</p>
        <LoadingSkeleton />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] px-4">
        <h1 className="text-4xl font-bold text-white mb-4">Our Menu</h1>
        <p className="text-gray-400 mb-6">Something went wrong while fetching menu items.</p>
        <div className="bg-red-700/20 border border-red-500/50 rounded-xl p-8 text-center">
          <h2 className="text-red-400 text-lg font-semibold mb-2">Error</h2>
          <p className="text-gray-200 mb-4">{error}</p>
          <button
            onClick={() => dispatch(fetchMenuItems(selectedCategory))}
            className="px-6 py-2 bg-white text-black font-medium rounded-full hover:bg-gray-100 transition"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 md:px-8 space-y-12">
      <Hero />

      {/* Categories */}
      {categories.length > 0 && (
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryChange(category)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-green-400 to-blue-500 text-white shadow-lg'
                  : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/70 border border-gray-700/50'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Menu Items */}
      {menuItems && menuItems.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuItems.map((item) => (
            <div
              key={item._id || item.id}
              className="bg-gradient-to-br from-gray-900/70 to-gray-800/50 border border-gray-700 rounded-3xl overflow-hidden shadow-lg hover:scale-105 transform transition-transform duration-300"
            >
              <div className="relative h-56 w-full overflow-hidden rounded-t-3xl">
                <img
                  src={item.image || 'https://via.placeholder.com/400x300?text=No+Image'}
                  alt={item.name || 'Menu Item'}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                  }}
                />
                {!item.isAvailable && (
                  <div className="absolute top-3 right-3 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                    Unavailable
                  </div>
                )}
              </div>

              <div className="p-6 space-y-3">
                <div className="flex justify-between items-start">
                  <h3 className="text-xl font-bold text-white">{item.name || 'Item Name'}</h3>
                  <span className="text-lg font-extrabold text-green-400">₹{item.price || '0'}</span>
                </div>
                <p className="text-gray-300 text-sm line-clamp-3">
                  {item.description || 'No description available.'}
                </p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xs text-gray-500 uppercase tracking-wider">
                    {item.category || 'Category'}
                  </span>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-400 text-lg">
          No menu items found for this category.
        </div>
      )}
    </div>
  );
};

export default Homepage;
