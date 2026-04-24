'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, LogOut, List, CheckCircle, XCircle, Edit2 } from 'lucide-react';
import { CreateParcelForm } from './CreateParcelForm';
import { adminApiService } from '@/services/api';
import { Parcel } from '@/types';

interface AdminDashboardProps {
  onLogout: () => void;
}

type Tab = 'create' | 'list';

const statusOptions = [
  { value: 'PROCESSING', label: 'En traitement', color: 'bg-yellow-100 text-yellow-700' },
  { value: 'IN_TRANSIT', label: 'En transit', color: 'bg-blue-100 text-blue-700' },
  { value: 'CUSTOMS_CLEARANCE', label: 'Douane', color: 'bg-purple-100 text-purple-700' },
  { value: 'OUT_FOR_DELIVERY', label: 'En livraison', color: 'bg-orange-100 text-orange-700' },
  { value: 'DELIVERED', label: 'Livré', color: 'bg-green-100 text-green-700' },
  { value: 'CANCELLED', label: 'Annulé', color: 'bg-red-100 text-red-700' },
];

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<Tab>('create');
  const [parcels, setParcels] = useState<Parcel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [selectedParcel, setSelectedParcel] = useState<Parcel | null>(null);
  const [newStatus, setNewStatus] = useState('');
  const [statusLocation, setStatusLocation] = useState('');
  const [statusDescription, setStatusDescription] = useState('');
  const [statusLatitude, setStatusLatitude] = useState('');
  const [statusLongitude, setStatusLongitude] = useState('');
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  useEffect(() => {
    if (activeTab === 'list') {
      loadParcels();
    }
  }, [activeTab]);

  const loadParcels = async () => {
    try {
      setIsLoading(true);
      const data = await adminApiService.getAllParcelsAdmin();
      setParcels(data);
    } catch (error) {
      setMessage({ type: 'error', text: 'Erreur lors du chargement des colis' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateParcel = async (formData: any) => {
    try {
      setIsLoading(true);
      setMessage(null);

      const parcelData = {
        trackingNumber: formData.trackingNumber,
        senderName: formData.senderName,
        senderAddress: formData.senderAddress,
        senderPhone: formData.senderPhone || '',
        senderEmail: formData.senderEmail || '',
        receiverName: formData.receiverName,
        receiverAddress: formData.receiverAddress,
        receiverPhone: formData.receiverPhone || '',
        receiverEmail: formData.receiverEmail || '',
        weight: parseFloat(formData.weight),
        length: formData.length ? parseFloat(formData.length) : 0,
        width: formData.width ? parseFloat(formData.width) : 0,
        height: formData.height ? parseFloat(formData.height) : 0,
        packageType: formData.packageType,
        shippingMethod: formData.shippingMethod,
        originCountry: formData.originCountry,
        destinationCountry: formData.destinationCountry,
        carrier: formData.carrier || '',
        typeOfShipment: formData.typeOfShipment || '',
        shipmentMode: formData.shipmentMode || '',
        carrierRefNo: formData.carrierRefNo || '',
        paymentMode: formData.paymentMode || '',
        product: formData.product || '',
        comments: formData.comments || '',
        packageQty: formData.packageQty ? parseInt(formData.packageQty, 10) : 1,
        totalFreight: formData.totalFreight ? parseFloat(formData.totalFreight) : 0,
        pickupDate: formData.pickupDate || null,
        pickupTime: formData.pickupTime || null,
        departureTime: formData.departureTime || null,
        latitude: formData.latitude ? parseFloat(formData.latitude) : null,
        longitude: formData.longitude ? parseFloat(formData.longitude) : null,
        description: formData.description || '',
      };

      await adminApiService.createParcel(parcelData);
      setMessage({ type: 'success', text: 'Colis créé avec succès!' });
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Erreur lors de la création du colis',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const openUpdateModal = (parcel: Parcel) => {
    setSelectedParcel(parcel);
    setNewStatus(parcel.status);
    setStatusLocation('');
    setStatusDescription('');
    setStatusLatitude(parcel.latitude?.toString() || '');
    setStatusLongitude(parcel.longitude?.toString() || '');
    setIsUpdateModalOpen(true);
  };

  const handleUpdateStatus = async () => {
    if (!selectedParcel || !newStatus) return;

    try {
      setIsLoading(true);
      await adminApiService.updateParcelStatus(
        selectedParcel.id!.toString(),
        newStatus,
        statusLocation,
        statusDescription,
        statusLatitude ? parseFloat(statusLatitude) : null,
        statusLongitude ? parseFloat(statusLongitude) : null
      );
      setMessage({ type: 'success', text: 'Statut mis à jour avec succès!' });
      setIsUpdateModalOpen(false);
      loadParcels();
    } catch (error: any) {
      setMessage({
        type: 'error',
        text: error.response?.data?.message || 'Erreur lors de la mise à jour du statut',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
              <h1 className="text-xl font-bold text-gray-900">Admin Transit</h1>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Déconnexion
            </button>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex gap-8">
            <button
              onClick={() => setActiveTab('create')}
              className={`py-4 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'create'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <span className="flex items-center gap-2">
                <Package className="w-4 h-4" />
                Créer un colis
              </span>
            </button>
            <button
              onClick={() => setActiveTab('list')}
              className={`py-4 border-b-2 font-medium text-sm transition-colors ${
                activeTab === 'list'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <span className="flex items-center gap-2">
                <List className="w-4 h-4" />
                Liste des colis
              </span>
            </button>
          </nav>
        </div>
      </div>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {message && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`mb-6 p-4 rounded-xl flex items-center gap-3 ${
              message.type === 'success'
                ? 'bg-green-50 border border-green-200 text-green-700'
                : 'bg-red-50 border border-red-200 text-red-700'
            }`}
          >
            {message.type === 'success' ? (
              <CheckCircle className="w-5 h-5" />
            ) : (
              <XCircle className="w-5 h-5" />
            )}
            {message.text}
          </motion.div>
        )}

        {activeTab === 'create' ? (
          <CreateParcelForm onSubmit={handleCreateParcel} isLoading={isLoading} />
        ) : (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-xl font-bold text-gray-900">Tous les colis</h2>
            </div>
            {isLoading ? (
              <div className="p-8 text-center text-gray-500">Chargement...</div>
            ) : parcels.length === 0 ? (
              <div className="p-8 text-center text-gray-500">Aucun colis trouvé</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Tracking</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Expéditeur</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Destinataire</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Destination</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Statut</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {parcels.map((parcel: Parcel) => (
                      <tr key={parcel.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-blue-600">
                          {parcel.trackingNumber}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{parcel.senderName}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{parcel.receiverName}</td>
                        <td className="px-6 py-4 text-sm text-gray-600">{parcel.destinationCountry}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                            (parcel.status as string) === 'DELIVERED'
                              ? 'bg-green-100 text-green-700'
                              : (parcel.status as string) === 'IN_TRANSIT'
                              ? 'bg-blue-100 text-blue-700'
                              : (parcel.status as string) === 'PENDING'
                              ? 'bg-yellow-100 text-yellow-700'
                              : (parcel.status as string) === 'PROCESSING'
                              ? 'bg-indigo-100 text-indigo-700'
                              : (parcel.status as string) === 'OUT_FOR_DELIVERY'
                              ? 'bg-orange-100 text-orange-700'
                              : (parcel.status as string) === 'EXCEPTION'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {parcel.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => openUpdateModal(parcel)}
                            className="flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                          >
                            <Edit2 className="w-4 h-4" />
                            Modifier statut
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </main>

      {/* Status Update Modal */}
      {isUpdateModalOpen && selectedParcel && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Modifier le statut
            </h3>
            <p className="text-gray-600 mb-6">
              Colis: <span className="font-medium text-blue-600">{selectedParcel.trackingNumber}</span>
            </p>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nouveau statut
                </label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                >
                  {statusOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Localisation (optionnel)
                </label>
                <input
                  type="text"
                  value={statusLocation}
                  onChange={(e) => setStatusLocation(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                  placeholder="Ex: Centre de tri Paris"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description (optionnel)
                </label>
                <textarea
                  value={statusDescription}
                  onChange={(e) => setStatusDescription(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                  placeholder="Ex: Colis en cours de livraison"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Latitude
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={statusLatitude}
                    onChange={(e) => setStatusLatitude(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                    placeholder="Ex: 48.8566"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Longitude
                  </label>
                  <input
                    type="number"
                    step="any"
                    value={statusLongitude}
                    onChange={(e) => setStatusLongitude(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none"
                    placeholder="Ex: 2.3522"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setIsUpdateModalOpen(false)}
                className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
              >
                Annuler
              </button>
              <button
                onClick={handleUpdateStatus}
                disabled={isLoading}
                className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
              >
                {isLoading ? 'Mise à jour...' : 'Mettre à jour'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
