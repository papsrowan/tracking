'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calculator, DollarSign, Info, MapPin, Truck } from 'lucide-react';
import { useCalculateShipping } from '@/hooks/useApi';
import { ShippingCalculationResponse } from '@/types';

const fromOptions = [
  { value: 'United States', label: '📦 From Your Place', description: 'We pick up from your address' },
  { value: 'France', label: '🏭 From Warehouse', description: 'Drop off at our nearest facility' },
];

const destinationOptions = [
  { value: 'Belgium', label: '🏘️ Near Region', description: 'Within 200km radius' },
  { value: 'France', label: '🗺️ Domestic', description: 'Within the same country' },
  { value: 'United States', label: '🌍 International', description: 'Cross-border worldwide shipping' },
];

const packageTypes = [
  { value: 'DOCUMENT', label: 'Document', description: 'Letters, papers, small documents' },
  { value: 'STANDARD', label: 'Standard', description: 'Regular packages and boxes' },
  { value: 'FRAGILE', label: 'Fragile', description: 'Delicate items requiring special care' },
  { value: 'EXPRESS', label: 'Express', description: 'Urgent deliveries' },
];

export function ShippingCalculator() {
  const [formData, setFormData] = useState({
    originCountry: '',
    destinationCountry: '',
    weight: '',
    packageType: 'STANDARD',
  });

  const [result, setResult] = useState<ShippingCalculationResponse | null>(null);

  const calculateMutation = useCalculateShipping();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.originCountry && formData.destinationCountry && formData.weight) {
      const response = await calculateMutation.mutateAsync({
        originCountry: formData.originCountry,
        destinationCountry: formData.destinationCountry,
        weight: parseFloat(formData.weight),
        packageType: formData.packageType as 'DOCUMENT' | 'STANDARD' | 'FRAGILE' | 'EXPRESS',
      });
      setResult(response);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100"
      >
        {/* Header */}
        <div className="p-6 border-b border-gray-100 bg-primary">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-accent rounded flex items-center justify-center">
              <Calculator className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-heading font-bold text-white">Shipping Calculator</h2>
              <p className="text-sm text-blue-200">Calculate shipping costs for your deliveries</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          <div className="grid md:grid-cols-2 gap-6 mb-6">

            {/* FROM */}
            <div>
              <label className="block text-sm font-bold text-dark mb-3 uppercase tracking-wide flex items-center gap-2">
                <MapPin className="w-4 h-4 text-accent" />
                From
              </label>
              <div className="grid gap-3">
                {fromOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      formData.originCountry === option.value
                        ? 'border-accent bg-accent/5'
                        : 'border-gray-100 hover:border-accent/40'
                    }`}
                  >
                    <input
                      type="radio"
                      name="from"
                      value={option.value}
                      checked={formData.originCountry === option.value}
                      onChange={(e) => setFormData({ ...formData, originCountry: e.target.value })}
                      className="accent-accent w-4 h-4"
                      required
                    />
                    <div>
                      <p className={`font-bold text-sm ${formData.originCountry === option.value ? 'text-accent' : 'text-dark'}`}>
                        {option.label}
                      </p>
                      <p className="text-xs text-gray-500">{option.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* DESTINATION */}
            <div>
              <label className="block text-sm font-bold text-dark mb-3 uppercase tracking-wide flex items-center gap-2">
                <Truck className="w-4 h-4 text-accent" />
                Destination
              </label>
              <div className="grid gap-3">
                {destinationOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      formData.destinationCountry === option.value
                        ? 'border-accent bg-accent/5'
                        : 'border-gray-100 hover:border-accent/40'
                    }`}
                  >
                    <input
                      type="radio"
                      name="destination"
                      value={option.value}
                      checked={formData.destinationCountry === option.value}
                      onChange={(e) => setFormData({ ...formData, destinationCountry: e.target.value })}
                      className="accent-accent w-4 h-4"
                      required
                    />
                    <div>
                      <p className={`font-bold text-sm ${formData.destinationCountry === option.value ? 'text-accent' : 'text-dark'}`}>
                        {option.label}
                      </p>
                      <p className="text-xs text-gray-500">{option.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Weight */}
            <div>
              <label className="block text-sm font-bold text-dark mb-2 uppercase tracking-wide">
                Weight (kg)
              </label>
              <input
                type="number"
                step="0.1"
                min="0.1"
                value={formData.weight}
                onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                placeholder="Enter weight in kg"
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
                required
              />
            </div>

            {/* Package Type */}
            <div>
              <label className="block text-sm font-bold text-dark mb-2 uppercase tracking-wide">
                Package Type
              </label>
              <select
                value={formData.packageType}
                onChange={(e) => setFormData({ ...formData, packageType: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-gray-100 focus:border-accent focus:ring-2 focus:ring-accent/20 outline-none transition-all"
              >
                {packageTypes.map((type) => (
                  <option key={type.value} value={type.value}>{type.label} — {type.description}</option>
                ))}
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={calculateMutation.isPending}
            className="w-full py-4 bg-accent text-white rounded-xl font-bold hover:bg-accent-hover transition-colors disabled:opacity-50 flex items-center justify-center gap-2 shadow-[0_0_15px_rgba(255,107,0,0.3)] hover:shadow-[0_0_20px_rgba(255,107,0,0.5)] uppercase tracking-wide"
          >
            <DollarSign className="w-5 h-5" />
            {calculateMutation.isPending ? 'Calculating...' : 'Calculate Cost'}
          </button>
        </form>

        {result && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="border-t border-gray-100 bg-primary/5 p-6"
          >
            <h3 className="font-heading font-bold text-dark mb-4 flex items-center gap-2">
              <Info className="w-5 h-5 text-accent" />
              Cost Breakdown
            </h3>
            <div className="space-y-3">
              {[
                { label: 'Base Shipping Cost', value: result.baseCost },
                { label: 'Customs Fee', value: result.customsFee },
                { label: 'Insurance Fee', value: result.insuranceFee },
                { label: 'Handling Fee', value: result.handlingFee },
                { label: 'Tax', value: result.tax },
              ].map((item) => (
                <div key={item.label} className="flex justify-between items-center py-2 border-b border-gray-100 last:border-0">
                  <span className="text-gray-600">{item.label}</span>
                  <span className="font-medium text-dark">${item.value.toFixed(2)}</span>
                </div>
              ))}
              <div className="pt-3 mt-2 border-t-2 border-accent/30">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-dark">Total Price</span>
                  <span className="text-2xl font-bold text-accent">${result.totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
