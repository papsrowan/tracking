'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Package, Truck, Clock, CheckCircle } from 'lucide-react';
import { useParcel } from '@/hooks/useApi';
import { ShipmentHistory } from '@/types';

export function TrackingSearch() {
  const [trackingNumber, setTrackingNumber] = useState('');
  const [searchTriggered, setSearchTriggered] = useState(false);

  const { data: parcel, isLoading, error } = useParcel(
    searchTriggered ? trackingNumber : ''
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (trackingNumber.trim()) {
      setSearchTriggered(true);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'DELIVERED':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'IN_TRANSIT':
        return <Truck className="w-5 h-5 text-blue-500" />;
      case 'PROCESSING':
        return <Package className="w-5 h-5 text-yellow-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DELIVERED':
        return 'bg-green-100 text-green-800';
      case 'IN_TRANSIT':
        return 'bg-blue-100 text-blue-800';
      case 'PROCESSING':
        return 'bg-yellow-100 text-yellow-800';
      case 'CUSTOMS_CLEARANCE':
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="Enter your tracking number (e.g., TRKABC123)"
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="px-8 py-4 bg-accent text-white rounded font-bold hover:bg-accent-hover transition-colors disabled:opacity-50 uppercase tracking-wide"
          >
            {isLoading ? 'Tracking...' : 'Track'}
          </button>
        </div>
      </form>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700"
        >
          Parcel not found. Please check your tracking number and try again.
        </motion.div>
      )}

      {parcel && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="p-6 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">Tracking Number</p>
                <p className="text-xl font-bold text-gray-900">{parcel.trackingNumber}</p>
              </div>
              <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(parcel.status)}`}>
                {parcel.status.replace('_', ' ')}
              </span>
            </div>
          </div>

          <div className="p-6 grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500 mb-1">From</p>
              <p className="font-semibold text-gray-900">{parcel.originCountry}</p>
              <p className="text-sm text-gray-600">{parcel.senderName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">To</p>
              <p className="font-semibold text-gray-900">{parcel.destinationCountry}</p>
              <p className="text-sm text-gray-600">{parcel.receiverName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Weight</p>
              <p className="font-semibold text-gray-900">{parcel.weight} kg</p>
            </div>
            <div>
              <p className="text-sm text-gray-500 mb-1">Estimated Delivery</p>
              <p className="font-semibold text-gray-900">
                {new Date(parcel.estimatedDeliveryDate).toLocaleDateString()}
              </p>
            </div>
          </div>

          {parcel.shipmentHistory && parcel.shipmentHistory.length > 0 && (
            <div className="p-6 bg-gray-50">
              <h3 className="font-semibold text-gray-900 mb-4">Shipment History</h3>
              <div className="space-y-4">
                {parcel.shipmentHistory.map((history: ShipmentHistory, index: number) => (
                  <motion.div
                    key={history.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className="mt-1">{getStatusIcon(parcel.status)}</div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{history.description}</p>
                      <p className="text-sm text-gray-500">{history.location}</p>
                      <p className="text-xs text-gray-400">
                        {new Date(history.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );
}
