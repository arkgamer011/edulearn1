'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ShieldCheck, CreditCard, Wallet, CheckCircle2 } from 'lucide-react';

export default function CheckoutPage() {
  const [selectedMethod, setSelectedMethod] = useState('upi');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setIsSuccess(true);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="flex-1 flex flex-col bg-white min-h-screen items-center justify-center p-6 text-center">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h1>
        <p className="text-gray-500 mb-8">You have successfully enrolled in Lakshya JEE 2026.</p>
        <Link href="/profile" className="w-full py-3 px-4 bg-indigo-600 text-white font-bold rounded-xl shadow-sm hover:bg-indigo-700">
          Go to My Courses
        </Link>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-gray-50 min-h-screen pb-24">
      <div className="bg-white p-4 flex items-center border-b border-gray-100 sticky top-0 z-10">
        <Link href="/course/lakshya-jee-2026" className="text-gray-900 mr-4">
          <ChevronLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-lg font-bold text-gray-900">Checkout</h1>
      </div>

      <div className="p-4">
        {/* Order Summary */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-6">
          <h2 className="font-bold text-gray-900 mb-4">Order Summary</h2>
          <div className="flex gap-3 mb-4 pb-4 border-b border-gray-100">
            <div className="relative w-20 h-16 rounded-lg overflow-hidden shrink-0">
              <Image src="https://picsum.photos/seed/jee/200/150" alt="Course" fill className="object-cover" referrerPolicy="no-referrer" />
            </div>
            <div>
              <h3 className="font-bold text-sm text-gray-900 line-clamp-1">Lakshya JEE 2026</h3>
              <p className="text-xs text-gray-500">Complete Class 12th + JEE</p>
            </div>
          </div>
          
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Course Price</span>
              <span>₹6,000</span>
            </div>
            <div className="flex justify-between text-green-600">
              <span>Discount (25% OFF)</span>
              <span>-₹1,500</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Platform Fee</span>
              <span>₹0</span>
            </div>
            <div className="pt-2 mt-2 border-t border-gray-100 flex justify-between font-bold text-lg text-gray-900">
              <span>Total Amount</span>
              <span>₹4,500</span>
            </div>
          </div>
        </div>

        {/* Payment Methods */}
        <h2 className="font-bold text-gray-900 mb-3 px-1">Payment Method</h2>
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-6">
          
          {/* UPI Option */}
          <label className={`flex items-center p-4 border-b border-gray-50 cursor-pointer ${selectedMethod === 'upi' ? 'bg-indigo-50/50' : ''}`}>
            <input 
              type="radio" 
              name="payment" 
              value="upi" 
              checked={selectedMethod === 'upi'} 
              onChange={() => setSelectedMethod('upi')}
              className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
            />
            <div className="ml-3 flex-1">
              <span className="block text-sm font-bold text-gray-900">UPI (Paytm, PhonePe, GPay)</span>
              <div className="flex gap-2 mt-2">
                <div className="bg-white border border-gray-200 px-2 py-1 rounded text-[10px] font-bold text-blue-600">Paytm</div>
                <div className="bg-white border border-gray-200 px-2 py-1 rounded text-[10px] font-bold text-purple-600">PhonePe</div>
                <div className="bg-white border border-gray-200 px-2 py-1 rounded text-[10px] font-bold text-gray-800">GPay</div>
              </div>
            </div>
          </label>

          {/* Card Option */}
          <label className={`flex items-center p-4 border-b border-gray-50 cursor-pointer ${selectedMethod === 'card' ? 'bg-indigo-50/50' : ''}`}>
            <input 
              type="radio" 
              name="payment" 
              value="card" 
              checked={selectedMethod === 'card'} 
              onChange={() => setSelectedMethod('card')}
              className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
            />
            <div className="ml-3 flex-1 flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-gray-400" />
              <span className="block text-sm font-bold text-gray-900">Credit / Debit Card</span>
            </div>
          </label>

          {/* Net Banking Option */}
          <label className={`flex items-center p-4 cursor-pointer ${selectedMethod === 'netbanking' ? 'bg-indigo-50/50' : ''}`}>
            <input 
              type="radio" 
              name="payment" 
              value="netbanking" 
              checked={selectedMethod === 'netbanking'} 
              onChange={() => setSelectedMethod('netbanking')}
              className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
            />
            <div className="ml-3 flex-1 flex items-center gap-3">
              <Wallet className="w-5 h-5 text-gray-400" />
              <span className="block text-sm font-bold text-gray-900">Net Banking</span>
            </div>
          </label>
        </div>

        <div className="flex items-center gap-2 text-xs text-gray-500 justify-center mb-4">
          <ShieldCheck className="w-4 h-4 text-green-500" />
          <span>100% Secure Payments</span>
        </div>
      </div>

      {/* Fixed Bottom Bar */}
      <div className="fixed bottom-0 w-full max-w-md bg-white border-t border-gray-200 p-4 z-50">
        <button 
          onClick={handlePayment}
          disabled={isProcessing}
          className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-indigo-200 hover:bg-indigo-700 transition-colors flex items-center justify-center disabled:opacity-70"
        >
          {isProcessing ? (
            <span className="flex items-center gap-2">
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </span>
          ) : (
            `Pay ₹4,500`
          )}
        </button>
      </div>
    </div>
  );
}
