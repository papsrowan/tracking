'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Plus } from 'lucide-react';

interface ParcelFormData {
  trackingNumber: string;
  
  senderName: string;
  senderAddress: string;
  senderPhone: string;
  senderEmail: string;
  
  receiverName: string;
  receiverAddress: string;
  receiverPhone: string;
  receiverEmail: string;
  
  weight: string;
  length: string;
  width: string;
  height: string;
  packageType: 'DOCUMENT' | 'STANDARD' | 'FRAGILE' | 'EXPRESS';
  shippingMethod: 'STANDARD' | 'EXPRESS' | 'OVERNIGHT';
  
  originCountry: string;
  destinationCountry: string;
  
  carrier: string;
  typeOfShipment: string;
  shipmentMode: string;
  carrierRefNo: string;
  paymentMode: string;
  product: string;
  comments: string;
  packageQty: string;
  totalFreight: string;
  pickupDate: string;
  pickupTime: string;
  departureTime: string;
  
  latitude: string;
  longitude: string;
  
  description: string;
}

interface CreateParcelFormProps {
  onSubmit: (data: ParcelFormData) => void;
  isLoading?: boolean;
}

const countries = [
  'United States',
  'France',
  'Germany',
  'United Kingdom',
  'Canada',
  'Australia',
  'Japan',
  'China',
  'Brazil',
  'India',
  'Netherlands',
  'Belgium',
];

export function CreateParcelForm({ onSubmit, isLoading }: CreateParcelFormProps) {
  const [formData, setFormData] = useState<ParcelFormData>({
    trackingNumber: '',
    
    senderName: '',
    senderAddress: '',
    senderPhone: '',
    senderEmail: '',
    
    receiverName: '',
    receiverAddress: '',
    receiverPhone: '',
    receiverEmail: '',
    
    weight: '',
    length: '',
    width: '',
    height: '',
    packageType: 'STANDARD',
    shippingMethod: 'STANDARD',
    
    originCountry: '',
    destinationCountry: '',
    
    carrier: '',
    typeOfShipment: '',
    shipmentMode: '',
    carrierRefNo: '',
    paymentMode: '',
    product: '',
    comments: '',
    packageQty: '',
    totalFreight: '',
    pickupDate: '',
    pickupTime: '',
    departureTime: '',
    
    latitude: '',
    longitude: '',
    
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const generateTrackingNumber = () => {
    const prefix = 'TRK';
    const random = Math.random().toString(36).substring(2, 8).toUpperCase();
    setFormData({ ...formData, trackingNumber: prefix + random });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-lg p-6"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
          <Plus className="w-5 h-5 text-green-600" />
        </div>
        <h2 className="text-xl font-bold text-gray-900">Créer un nouveau colis</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Tracking Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Numéro de tracking
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={formData.trackingNumber}
              onChange={(e) => setFormData({ ...formData, trackingNumber: e.target.value })}
              className="flex-1 px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              placeholder="TRK..."
              required
            />
            <button
              type="button"
              onClick={generateTrackingNumber}
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors text-sm font-medium"
            >
              Générer
            </button>
          </div>
        </div>

        {/* Sender & Receiver Info */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Sender */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <Package className="w-4 h-4" />
              Informations expéditeur
            </h3>
            <div className="grid gap-4">
              <input
                type="text"
                value={formData.senderName}
                onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
                className="px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                placeholder="Nom complet"
                required
              />
              <input
                type="text"
                value={formData.senderAddress}
                onChange={(e) => setFormData({ ...formData, senderAddress: e.target.value })}
                className="px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                placeholder="Adresse complète"
                required
              />
              <input
                type="tel"
                value={formData.senderPhone}
                onChange={(e) => setFormData({ ...formData, senderPhone: e.target.value })}
                className="px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                placeholder="Téléphone"
              />
              <input
                type="email"
                value={formData.senderEmail}
                onChange={(e) => setFormData({ ...formData, senderEmail: e.target.value })}
                className="px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                placeholder="Email"
              />
            </div>
          </div>

          {/* Receiver */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900 flex items-center gap-2">
              <Package className="w-4 h-4" />
              Informations destinataire
            </h3>
            <div className="grid gap-4">
              <input
                type="text"
                value={formData.receiverName}
                onChange={(e) => setFormData({ ...formData, receiverName: e.target.value })}
                className="px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                placeholder="Nom complet"
                required
              />
              <input
                type="text"
                value={formData.receiverAddress}
                onChange={(e) => setFormData({ ...formData, receiverAddress: e.target.value })}
                className="px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                placeholder="Adresse complète"
                required
              />
              <input
                type="tel"
                value={formData.receiverPhone}
                onChange={(e) => setFormData({ ...formData, receiverPhone: e.target.value })}
                className="px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                placeholder="Téléphone"
              />
              <input
                type="email"
                value={formData.receiverEmail}
                onChange={(e) => setFormData({ ...formData, receiverEmail: e.target.value })}
                className="px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                placeholder="Email"
              />
            </div>
          </div>
        </div>

        {/* Shipment Information */}
        <div className="border-t border-gray-100 pt-6">
          <h3 className="font-semibold text-gray-900 mb-4">Détails d'expédition (Shipment Information)</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <select
              value={formData.originCountry}
              onChange={(e) => setFormData({ ...formData, originCountry: e.target.value })}
              className="px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              required
            >
              <option value="">Origine</option>
              {countries.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <select
              value={formData.destinationCountry}
              onChange={(e) => setFormData({ ...formData, destinationCountry: e.target.value })}
              className="px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              required
            >
              <option value="">Destination</option>
              {countries.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            
            <input
              type="text"
              value={formData.carrier}
              onChange={(e) => setFormData({ ...formData, carrier: e.target.value })}
              className="px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              placeholder="Transporteur (ex: DHL)"
            />
            
            <input
              type="text"
              value={formData.typeOfShipment}
              onChange={(e) => setFormData({ ...formData, typeOfShipment: e.target.value })}
              className="px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              placeholder="Type (ex: Air Freight)"
            />
            
            <input
              type="text"
              value={formData.shipmentMode}
              onChange={(e) => setFormData({ ...formData, shipmentMode: e.target.value })}
              className="px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              placeholder="Mode (ex: Air Freight)"
            />
            
            <input
              type="text"
              value={formData.carrierRefNo}
              onChange={(e) => setFormData({ ...formData, carrierRefNo: e.target.value })}
              className="px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              placeholder="Réf. transporteur"
            />

            <input
              type="text"
              value={formData.paymentMode}
              onChange={(e) => setFormData({ ...formData, paymentMode: e.target.value })}
              className="px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              placeholder="Paiement (ex: CASH)"
            />
            
            <input
              type="text"
              value={formData.product}
              onChange={(e) => setFormData({ ...formData, product: e.target.value })}
              className="px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              placeholder="Produit (ex: Private Notice)"
            />

            <input
              type="number"
              value={formData.totalFreight}
              onChange={(e) => setFormData({ ...formData, totalFreight: e.target.value })}
              className="px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              placeholder="Total Freight"
            />
          </div>
        </div>

        {/* Dates and Times */}
        <div className="border-t border-gray-100 pt-6">
          <h3 className="font-semibold text-gray-900 mb-4">Dates & Horaires</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-gray-500 mb-1">Date d'enlèvement</label>
              <input
                type="date"
                value={formData.pickupDate}
                onChange={(e) => setFormData({ ...formData, pickupDate: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Heure d'enlèvement</label>
              <input
                type="time"
                value={formData.pickupTime}
                onChange={(e) => setFormData({ ...formData, pickupTime: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs text-gray-500 mb-1">Heure de départ</label>
              <input
                type="time"
                value={formData.departureTime}
                onChange={(e) => setFormData({ ...formData, departureTime: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              />
            </div>
          </div>
        </div>

        {/* Package Dimensions */}
        <div className="border-t border-gray-100 pt-6">
          <h3 className="font-semibold text-gray-900 mb-4">Colis (Packages)</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="number"
              value={formData.packageQty}
              onChange={(e) => setFormData({ ...formData, packageQty: e.target.value })}
              className="px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              placeholder="Quantité (ex: 1)"
            />
            <input
              type="number"
              step="0.01"
              value={formData.weight}
              onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
              className="px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              placeholder="Poids total (kg)"
              required
            />
            
            <div className="grid grid-cols-3 gap-2 md:col-span-2">
              <input
                type="number"
                value={formData.length}
                onChange={(e) => setFormData({ ...formData, length: e.target.value })}
                className="px-3 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                placeholder="Longueur (cm)"
              />
              <input
                type="number"
                value={formData.width}
                onChange={(e) => setFormData({ ...formData, width: e.target.value })}
                className="px-3 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                placeholder="Largeur (cm)"
              />
              <input
                type="number"
                value={formData.height}
                onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                className="px-3 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                placeholder="Hauteur (cm)"
              />
            </div>
          </div>
        </div>

        {/* GPS Coordinates */}
        <div className="border-t border-gray-100 pt-6">
          <h3 className="font-semibold text-gray-900 mb-4">Coordonnées GPS initiales (Carte)</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="number"
              step="any"
              value={formData.latitude}
              onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
              className="px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              placeholder="Latitude (ex: 48.8566)"
            />
            <input
              type="number"
              step="any"
              value={formData.longitude}
              onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
              className="px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              placeholder="Longitude (ex: 2.3522)"
            />
          </div>
        </div>

        {/* Comments */}
        <div className="border-t border-gray-100 pt-6">
          <textarea
            value={formData.comments}
            onChange={(e) => setFormData({ ...formData, comments: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
            placeholder="Commentaires (ex: Package Registered For Delivery)"
            rows={3}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-4 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {isLoading ? 'Création...' : 'Créer le colis'}
        </button>
      </form>
    </motion.div>
  );
}
