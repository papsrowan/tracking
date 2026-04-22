'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, Plus, AlertCircle } from 'lucide-react';

interface ParcelFormData {
  trackingNumber: string;
  senderName: string;
  senderAddress: string;
  senderPhone: string;
  receiverName: string;
  receiverAddress: string;
  receiverPhone: string;
  weight: string;
  length: string;
  width: string;
  height: string;
  packageType: 'DOCUMENT' | 'STANDARD' | 'FRAGILE' | 'EXPRESS';
  shippingMethod: 'STANDARD' | 'EXPRESS' | 'OVERNIGHT';
  originCountry: string;
  destinationCountry: string;
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
];

export function CreateParcelForm({ onSubmit, isLoading }: CreateParcelFormProps) {
  const [formData, setFormData] = useState<ParcelFormData>({
    trackingNumber: '',
    senderName: '',
    senderAddress: '',
    senderPhone: '',
    receiverName: '',
    receiverAddress: '',
    receiverPhone: '',
    weight: '',
    length: '',
    width: '',
    height: '',
    packageType: 'STANDARD',
    shippingMethod: 'STANDARD',
    originCountry: '',
    destinationCountry: '',
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

      <form onSubmit={handleSubmit} className="space-y-6">
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

        {/* Sender Info */}
        <div className="border-t border-gray-100 pt-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Package className="w-4 h-4" />
            Informations expéditeur
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              value={formData.senderName}
              onChange={(e) => setFormData({ ...formData, senderName: e.target.value })}
              className="px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              placeholder="Nom de l'expéditeur"
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
              type="text"
              value={formData.senderAddress}
              onChange={(e) => setFormData({ ...formData, senderAddress: e.target.value })}
              className="md:col-span-2 px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              placeholder="Adresse complète"
              required
            />
          </div>
        </div>

        {/* Receiver Info */}
        <div className="border-t border-gray-100 pt-6">
          <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Package className="w-4 h-4" />
            Informations destinataire
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              value={formData.receiverName}
              onChange={(e) => setFormData({ ...formData, receiverName: e.target.value })}
              className="px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              placeholder="Nom du destinataire"
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
              type="text"
              value={formData.receiverAddress}
              onChange={(e) => setFormData({ ...formData, receiverAddress: e.target.value })}
              className="md:col-span-2 px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              placeholder="Adresse complète"
              required
            />
          </div>
        </div>

        {/* Package Details */}
        <div className="border-t border-gray-100 pt-6">
          <h3 className="font-semibold text-gray-900 mb-4">Détails du colis</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <select
              value={formData.packageType}
              onChange={(e) => setFormData({ ...formData, packageType: e.target.value as any })}
              className="px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
            >
              <option value="DOCUMENT">Document</option>
              <option value="STANDARD">Standard</option>
              <option value="FRAGILE">Fragile</option>
              <option value="EXPRESS">Express</option>
            </select>
            <select
              value={formData.shippingMethod}
              onChange={(e) => setFormData({ ...formData, shippingMethod: e.target.value as any })}
              className="px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
            >
              <option value="STANDARD">Standard</option>
              <option value="EXPRESS">Express</option>
              <option value="OVERNIGHT">Overnight</option>
            </select>
            <input
              type="number"
              step="0.01"
              value={formData.weight}
              onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
              className="px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              placeholder="Poids (kg)"
              required
            />
            <div className="grid grid-cols-3 gap-2">
              <input
                type="number"
                value={formData.length}
                onChange={(e) => setFormData({ ...formData, length: e.target.value })}
                className="px-3 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                placeholder="Long."
              />
              <input
                type="number"
                value={formData.width}
                onChange={(e) => setFormData({ ...formData, width: e.target.value })}
                className="px-3 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                placeholder="Larg."
              />
              <input
                type="number"
                value={formData.height}
                onChange={(e) => setFormData({ ...formData, height: e.target.value })}
                className="px-3 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                placeholder="Haut."
              />
            </div>
          </div>
        </div>

        {/* Countries */}
        <div className="border-t border-gray-100 pt-6">
          <h3 className="font-semibold text-gray-900 mb-4">Itinéraire</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <select
              value={formData.originCountry}
              onChange={(e) => setFormData({ ...formData, originCountry: e.target.value })}
              className="px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
              required
            >
              <option value="">Pays d'origine</option>
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
              <option value="">Pays de destination</option>
              {countries.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div className="border-t border-gray-100 pt-6">
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
            placeholder="Description du contenu (optionnel)"
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
