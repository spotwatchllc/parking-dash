'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { StarIcon } from '@heroicons/react/24/solid';
import { StarIcon as StarIconOutline } from '@heroicons/react/24/outline';

const Page = () => {
  const [activeTab, setActiveTab] = useState('about');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Review submitted:', { rating, comment });
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">About SpotWatch</h1>
          <Link 
            href="/"
            className="px-4 py-2 rounded-md bg-black text-white hover:bg-gray-800 transition-colors text-sm font-medium"
          >
            Back to Map
          </Link>
        </div>
        
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex border-b">
            <button
              className={`py-4 px-6 text-sm font-medium transition-colors ${
                activeTab === 'about' 
                  ? 'border-b-2 border-black text-black' 
                  : 'text-gray-500 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('about')}
            >
              About Us
            </button>
            <button
              className={`py-4 px-6 text-sm font-medium transition-colors ${
                activeTab === 'review' 
                  ? 'border-b-2 border-black text-black' 
                  : 'text-gray-500 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('review')}
            >
              Leave a Review
            </button>
          </div>

          <div className="p-6">
            {activeTab === 'about' && (
              <div>
                <p className="text-gray-700 mb-4">
                  Welcome to SpotWatch, your smart parking solution. We help drivers find available parking spots
                  and assist parking operators in managing their spaces efficiently.
                </p>
                
                <div className="grid md:grid-cols-2 gap-6 my-8">
                  <div className="bg-blue-50 p-5 rounded-lg border border-blue-100">
                    <h3 className="text-lg font-semibold text-blue-700 mb-2">Real-Time Updates</h3>
                    <p className="text-gray-700">
                      Our map shows available parking spaces in real-time.
                    </p>
                  </div>
                  <div className="bg-green-50 p-5 rounded-lg border border-green-100">
                    <h3 className="text-lg font-semibold text-green-700 mb-2">Smart Search</h3>
                    <p className="text-gray-700">
                      Find parking near your destination with just a few clicks.
                    </p>
                  </div>
                </div>
                
                <p className="text-gray-700">
                  Our mission is to make parking stress-free for everyone while optimizing the use of parking resources.
                </p>
              </div>
            )}

            {activeTab === 'review' && !submitted && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Share Your Feedback</h2>
                <p className="text-gray-600 mb-6">
                  We'd love to hear about your experience with SpotWatch. Please rate our app and leave any comments below.
                </p>
                
                <form onSubmit={handleReviewSubmit} className="max-w-2xl">
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          className="focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-black"
                        >
                          {star <= rating ? (
                            <StarIcon className="h-8 w-8 text-yellow-400" />
                          ) : (
                            <StarIconOutline className="h-8 w-8 text-gray-300 hover:text-yellow-200" />
                          )}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                      Comments (Optional)
                    </label>
                    <textarea
                      id="comment"
                      rows={4}
                      className="block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
                      placeholder="Share your thoughts about our application..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    />
                  </div>

                  <Button 
                    type="submit" 
                    disabled={rating === 0}
                    className="bg-black hover:bg-gray-800 text-white"
                  >
                    Submit Review
                  </Button>
                </form>
              </div>
            )}

            {activeTab === 'review' && submitted && (
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 text-center max-w-2xl mx-auto">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">Thank You for Your Feedback!</h2>
                <p className="text-gray-600 mb-4">
                  Your review has been submitted successfully. We appreciate you taking the time to share your thoughts.
                </p>
                <Button 
                  variant="outline" 
                  className="border-black text-black hover:bg-gray-100"
                  onClick={() => {
                    setRating(0);
                    setComment('');
                    setSubmitted(false);
                  }}
                >
                  Submit Another Review
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;