'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { useParcel } from '@/hooks/useApi';
import { ShipmentHistory } from '@/types';
import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('@/components/MapComponent'), {
  ssr: false,
  loading: () => <div className="h-[400px] w-full bg-gray-100 animate-pulse flex items-center justify-center">Chargement de la carte...</div>
});

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DELIVERED':
        return 'bg-green-400 text-white';
      case 'IN_TRANSIT':
        return 'bg-blue-400 text-white';
      case 'PENDING':
        return 'bg-cyan-400 text-white';
      case 'PROCESSING':
        return 'bg-yellow-400 text-white';
      case 'CUSTOMS_CLEARANCE':
        return 'bg-orange-400 text-white';
      case 'CANCELLED':
        return 'bg-red-400 text-white';
      default:
        return 'bg-gray-400 text-white';
    }
  };

  // Safe formatting helpers
  const formatDate = (dateStr: string | null | undefined) => {
    if (!dateStr) return '-';
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric'
      });
    } catch {
      return dateStr;
    }
  };

  const formatTime = (dateStr: string | null | undefined) => {
    if (!dateStr) return '-';
    try {
      return new Date(dateStr).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      }) + ' pm'; // As per mockups adding suffix, but better to use real format if possible.
    } catch {
      return dateStr;
    }
  };

  const calcVolumetricWeight = (l?: number, w?: number, h?: number) => {
    if (!l || !w || !h) return 0;
    return (l * w * h) / 5000;
  };

  const calcVolume = (l?: number, w?: number, h?: number) => {
    if (!l || !w || !h) return 0;
    return (l * w * h) / 1000000; // cm3 to m3
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <form onSubmit={handleSearch} className="relative mb-10">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              value={trackingNumber}
              onChange={(e) => setTrackingNumber(e.target.value)}
              placeholder="Enter your tracking number (e.g., TRKABC123)"
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
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
          className="bg-white"
        >
          {/* Shipper & Receiver Info */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="font-bold text-gray-900 border-b border-gray-300 pb-2 mb-4">Shipper Information</h3>
              <div className="space-y-1 text-sm text-gray-800">
                <p>{parcel.senderName || '-'}</p>
                <p>{parcel.senderAddress || '-'}</p>
                <p>****</p>
                <p>{parcel.senderEmail || '-'}</p>
              </div>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 border-b border-gray-300 pb-2 mb-4">Receiver Information</h3>
              <div className="space-y-1 text-sm text-gray-800">
                <p>{parcel.receiverName || '-'}</p>
                <p>{parcel.receiverAddress || '-'}</p>
                <p>{parcel.receiverPhone || '-'}</p>
                <p>{parcel.receiverEmail || '-'}</p>
              </div>
            </div>
          </div>

          {/* Status Banner */}
          <div className={`w-full py-6 text-center font-bold text-lg tracking-wider mb-8 ${getStatusColor(parcel.status)}`}>
            SHIPMENT STATUS: {parcel.status.replace('_', ' ')}
          </div>

          {/* Shipment Information */}
          <div className="mb-8">
            <h3 className="font-bold text-gray-900 border-b border-gray-300 pb-2 mb-4">Shipment Information</h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div className="space-y-4">
                <div>
                  <p className="font-bold text-gray-900">Origin:</p>
                  <p className="text-gray-700">{parcel.originCountry || '-'}</p>
                </div>
                <div>
                  <p className="font-bold text-gray-900">Destination:</p>
                  <p className="text-gray-700">{parcel.destinationCountry || '-'}</p>
                </div>
                <div>
                  <p className="font-bold text-gray-900">Weight:</p>
                  <p className="text-gray-700">{parcel.weight ? `${parcel.weight} grams` : '-'}</p>
                </div>
                <div>
                  <p className="font-bold text-gray-900">Product:</p>
                  <p className="text-gray-700">{parcel.product || '-'}</p>
                </div>
                <div>
                  <p className="font-bold text-gray-900">Total Freight:</p>
                  <p className="text-gray-700">{parcel.totalFreight || '-'}</p>
                </div>
                <div>
                  <p className="font-bold text-gray-900">Pick-up Date:</p>
                  <p className="text-gray-700">{formatDate(parcel.pickupDate || parcel.createdAt)}</p>
                </div>
                <div>
                  <p className="font-bold text-gray-900">Comments:</p>
                  <p className="text-gray-700">{parcel.comments || '-'}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="font-bold text-gray-900">Package:</p>
                  <p className="text-gray-700">{parcel.packageQty || '1'}</p>
                </div>
                <div>
                  <p className="font-bold text-gray-900">Carrier:</p>
                  <p className="text-gray-700">{parcel.carrier || '-'}</p>
                </div>
                <div>
                  <p className="font-bold text-gray-900">Shipment Mode:</p>
                  <p className="text-gray-700">{parcel.shipmentMode || '-'}</p>
                </div>
                <div>
                  <p className="font-bold text-gray-900">Qty:</p>
                  <p className="text-gray-700">{parcel.weight ? `${parcel.weight} grams` : '-'}</p>
                </div>
                <div>
                  <p className="font-bold text-gray-900">Expected Delivery Date:</p>
                  <p className="text-gray-700">{formatDate(parcel.estimatedDeliveryDate)}</p>
                </div>
                <div>
                  <p className="font-bold text-gray-900">Pick-up Time:</p>
                  <p className="text-gray-700">{parcel.pickupTime || '13:30 pm'}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="font-bold text-gray-900">Status:</p>
                  <p className="text-gray-700 capitalize">{parcel.status.toLowerCase().replace('_', ' ')}</p>
                </div>
                <div>
                  <p className="font-bold text-gray-900">Type of Shipment:</p>
                  <p className="text-gray-700">{parcel.typeOfShipment || '-'}</p>
                </div>
                <div>
                  <p className="font-bold text-gray-900">Carrier Reference No.:</p>
                  <p className="text-gray-700">{parcel.carrierRefNo || '-'}</p>
                </div>
                <div>
                  <p className="font-bold text-gray-900">Payment Mode:</p>
                  <p className="text-gray-700">{parcel.paymentMode || '-'}</p>
                </div>
                <div>
                  <p className="font-bold text-gray-900">Departure Time:</p>
                  <p className="text-gray-700">{parcel.departureTime || '19:00 pm'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Packages Table */}
          <div className="mb-8">
            <h3 className="font-bold text-gray-900 mb-2">Packages</h3>
            <div className="overflow-x-auto mb-4">
              <table className="w-full text-sm text-left">
                <thead className="bg-cyan-400 text-white">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Qty.</th>
                    <th className="px-4 py-3 font-semibold">Piece Type</th>
                    <th className="px-4 py-3 font-semibold">Description</th>
                    <th className="px-4 py-3 font-semibold">Length(cm)</th>
                    <th className="px-4 py-3 font-semibold">Width(cm)</th>
                    <th className="px-4 py-3 font-semibold">Height(cm)</th>
                    <th className="px-4 py-3 font-semibold">Weight (kg)</th>
                  </tr>
                </thead>
                <tbody className="bg-cyan-50">
                  <tr>
                    <td className="px-4 py-3 border-b border-white">{parcel.packageQty || '1'}</td>
                    <td className="px-4 py-3 border-b border-white">Pallet</td>
                    <td className="px-4 py-3 border-b border-white">{parcel.product || '-'}</td>
                    <td className="px-4 py-3 border-b border-white">{parcel.length || '-'}</td>
                    <td className="px-4 py-3 border-b border-white">{parcel.width || '-'}</td>
                    <td className="px-4 py-3 border-b border-white">{parcel.height || '-'}</td>
                    <td className="px-4 py-3 border-b border-white">{parcel.weight ? (parcel.weight / 1000).toFixed(2) : '-'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            
            <div className="flex flex-wrap justify-between text-sm font-bold text-gray-900 px-4">
              <p>Total Volumetric Weight : {calcVolumetricWeight(parcel.length, parcel.width, parcel.height).toFixed(2)}kg.</p>
              <p>Total Volume : {calcVolume(parcel.length, parcel.width, parcel.height).toFixed(2)}cu. m.</p>
              <p>Total Actual Weight : {parcel.weight ? (parcel.weight / 1000).toFixed(2) : '0.00'}kg.</p>
            </div>
          </div>

          {/* Map Area */}
          {(parcel.latitude && parcel.longitude) ? (
            <div className="mb-8">
              <MapComponent latitude={parcel.latitude} longitude={parcel.longitude} />
            </div>
          ) : (
             <div className="mb-8 h-[400px] w-full bg-gray-100 flex items-center justify-center text-gray-500 rounded-xl">
               Aucune coordonnée GPS disponible pour ce colis.
             </div>
          )}

          {/* Shipment History */}
          <div className="mb-8">
            <h3 className="font-bold text-gray-900 mb-2">Shipment History</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-cyan-400 text-white">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Date</th>
                    <th className="px-4 py-3 font-semibold">Time</th>
                    <th className="px-4 py-3 font-semibold">Location</th>
                    <th className="px-4 py-3 font-semibold">Status</th>
                    <th className="px-4 py-3 font-semibold">Updated By</th>
                    <th className="px-4 py-3 font-semibold">Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {parcel.shipmentHistory?.map((history: ShipmentHistory, i: number) => (
                    <tr key={history.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="px-4 py-3">{new Date(history.timestamp).toISOString().split('T')[0]}</td>
                      <td className="px-4 py-3">{formatTime(history.timestamp)}</td>
                      <td className="px-4 py-3">{history.location || parcel.originCountry}</td>
                      <td className="px-4 py-3 capitalize">{parcel.status.toLowerCase().replace('_', ' ')}</td>
                      <td className="px-4 py-3">admin</td>
                      <td className="px-4 py-3">{history.description}</td>
                    </tr>
                  ))}
                  {(!parcel.shipmentHistory || parcel.shipmentHistory.length === 0) && (
                    <tr>
                      <td colSpan={6} className="px-4 py-3 text-center text-gray-500">Aucun historique disponible</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </motion.div>
      )}
    </div>
  );
}
