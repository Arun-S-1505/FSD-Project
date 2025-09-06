import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { Product, Review } from '../types';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { createApiUrl } from '../utils/api';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: '' });
  const { addToCart } = useCart();
  const { user } = useAuth();

  useEffect(() => {
    if (id) {
      fetchProduct(parseInt(id));
      fetchReviews(parseInt(id));
    }
  }, [id]);

  const fetchProduct = async (productId: number) => {
    try {
      const response = await fetch(createApiUrl(`/api/products/${productId}`));
      if (response.ok) {
        const data = await response.json();
        setProduct(data);
      } else {
        // Mock product data for development
        const mockProduct: Product = {
          id: productId,
          name: 'Premium Wireless Headphones',
          price: 199.99,
          description: 'Experience premium audio quality with these state-of-the-art wireless headphones. Featuring advanced noise cancellation technology, 30-hour battery life, and superior comfort for all-day wear. Perfect for music lovers, professionals, and anyone who values exceptional sound quality.',
          image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800'
        };
        setProduct(mockProduct);
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReviews = async (productId: number) => {
    try {
      const response = await fetch(createApiUrl(`/api/products/${productId}/reviews`));
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      } else {
        // Mock reviews for development
        const mockReviews: Review[] = [
          {
            id: 1,
            userId: 1,
            userName: 'John Doe',
            rating: 5,
            comment: 'Absolutely love these headphones! Great sound quality and comfort.',
            createdAt: '2024-01-15'
          },
          {
            id: 2,
            userId: 2,
            userName: 'Jane Smith',
            rating: 4,
            comment: 'Very good headphones, but a bit pricey. Worth it for the quality though.',
            createdAt: '2024-01-10'
          }
        ];
        setReviews(mockReviews);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !product) return;

    try {
      const response = await fetch(createApiUrl(`/api/products/${product.id}/reviews`), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(reviewForm)
      });

      if (response.ok) {
        // Refresh reviews
        fetchReviews(product.id);
        setReviewForm({ rating: 5, comment: '' });
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900">Product not found</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Product Image */}
        <div className="aspect-w-1 aspect-h-1">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-96 object-cover rounded-lg"
          />
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
            <p className="text-3xl font-bold text-blue-600 mt-4">${product.price.toFixed(2)}</p>
          </div>

          <div className="prose max-w-none">
            <p className="text-gray-600 text-lg">{product.description}</p>
          </div>

          <button
            onClick={() => addToCart(product)}
            className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold"
          >
            <ShoppingCart className="h-5 w-5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="space-y-8">
        <h2 className="text-2xl font-bold text-gray-900">Customer Reviews</h2>

        {/* Reviews List */}
        <div className="space-y-6">
          {reviews.length === 0 ? (
            <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
          ) : (
            reviews.map(review => (
              <div key={review.id} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-semibold text-gray-900">{review.userName}</h4>
                    <div className="flex items-center space-x-1 mt-1">
                      {renderStars(review.rating)}
                    </div>
                  </div>
                  <span className="text-gray-500 text-sm">{new Date(review.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-gray-700">{review.comment}</p>
              </div>
            ))
          )}
        </div>

        {/* Review Form */}
        {user && (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Write a Review</h3>
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                <select
                  value={reviewForm.rating}
                  onChange={(e) => setReviewForm({ ...reviewForm, rating: parseInt(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                >
                  {[5, 4, 3, 2, 1].map(num => (
                    <option key={num} value={num}>{num} Star{num !== 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
                <textarea
                  rows={4}
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm({ ...reviewForm, comment: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Share your thoughts about this product..."
                  required
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors font-medium"
              >
                Submit Review
              </button>
            </form>
          </div>
        )}

        {!user && (
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <p className="text-gray-600">Please log in to write a review.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;