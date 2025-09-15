'use client';

import { useState } from 'react';
import { Plus, Phone, MessageCircle, Edit, Trash2 } from 'lucide-react';
import { useGuardianStore } from '../lib/store';
import { EmergencyContact } from '../lib/types';

export function ContactManager() {
  const { user, updateUser } = useGuardianStore();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingContact, setEditingContact] = useState<EmergencyContact | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    preferredMethod: 'sms' as 'sms' | 'whatsapp' | 'farcaster',
  });

  const handleAddContact = () => {
    if (!user || !formData.name || !formData.phone) return;

    const newContact: EmergencyContact = {
      id: Date.now().toString(),
      ...formData,
    };

    updateUser({
      ...user,
      emergencyContacts: [...user.emergencyContacts, newContact],
    });

    setFormData({ name: '', phone: '', preferredMethod: 'sms' });
    setShowAddForm(false);
  };

  const handleEditContact = (contact: EmergencyContact) => {
    setEditingContact(contact);
    setFormData({
      name: contact.name,
      phone: contact.phone,
      preferredMethod: contact.preferredMethod,
    });
    setShowAddForm(true);
  };

  const handleUpdateContact = () => {
    if (!user || !editingContact) return;

    const updatedContacts = user.emergencyContacts.map(contact =>
      contact.id === editingContact.id
        ? { ...contact, ...formData }
        : contact
    );

    updateUser({
      ...user,
      emergencyContacts: updatedContacts,
    });

    setFormData({ name: '', phone: '', preferredMethod: 'sms' });
    setShowAddForm(false);
    setEditingContact(null);
  };

  const handleDeleteContact = (contactId: string) => {
    if (!user) return;

    const updatedContacts = user.emergencyContacts.filter(
      contact => contact.id !== contactId
    );

    updateUser({
      ...user,
      emergencyContacts: updatedContacts,
    });
  };

  const getMethodIcon = (method: string) => {
    switch (method) {
      case 'sms':
        return <MessageCircle className="w-4 h-4" />;
      case 'whatsapp':
        return <MessageCircle className="w-4 h-4" />;
      case 'farcaster':
        return <MessageCircle className="w-4 h-4" />;
      default:
        return <Phone className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-foreground">Emergency Contacts</h2>
          <p className="text-sm text-foreground-muted">
            Manage who gets notified during emergencies
          </p>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200"
        >
          <Plus className="w-4 h-4" />
          <span>Add Contact</span>
        </button>
      </div>

      {/* Contact List */}
      <div className="space-y-3">
        {user?.emergencyContacts.map((contact, index) => (
          <div key={contact.id} className="bg-surface rounded-lg p-4 shadow-card">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary font-semibold">
                    {index + 1}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{contact.name}</h3>
                  <div className="flex items-center space-x-2 text-sm text-foreground-muted">
                    <span>{contact.phone}</span>
                    <span>•</span>
                    <div className="flex items-center space-x-1">
                      {getMethodIcon(contact.preferredMethod)}
                      <span className="capitalize">{contact.preferredMethod}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleEditContact(contact)}
                  className="p-2 text-foreground-muted hover:text-primary hover:bg-primary/10 rounded-lg transition-colors duration-200"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDeleteContact(contact.id)}
                  className="p-2 text-foreground-muted hover:text-danger hover:bg-danger/10 rounded-lg transition-colors duration-200"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {(!user?.emergencyContacts || user.emergencyContacts.length === 0) && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">No contacts added</h3>
            <p className="text-foreground-muted mb-4">
              Add emergency contacts to receive alerts when you need help
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-primary text-white px-6 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200"
            >
              Add Your First Contact
            </button>
          </div>
        )}
      </div>

      {/* Add/Edit Contact Form */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-surface rounded-xl p-6 w-full max-w-md shadow-card">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              {editingContact ? 'Edit Contact' : 'Add Emergency Contact'}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter contact name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Enter phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Preferred Method
                </label>
                <select
                  value={formData.preferredMethod}
                  onChange={(e) => setFormData({ 
                    ...formData, 
                    preferredMethod: e.target.value as 'sms' | 'whatsapp' | 'farcaster'
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="sms">SMS</option>
                  <option value="whatsapp">WhatsApp</option>
                  <option value="farcaster">Farcaster</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => {
                  setShowAddForm(false);
                  setEditingContact(null);
                  setFormData({ name: '', phone: '', preferredMethod: 'sms' });
                }}
                className="flex-1 py-2 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                onClick={editingContact ? handleUpdateContact : handleAddContact}
                disabled={!formData.name || !formData.phone}
                className="flex-1 py-2 px-4 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {editingContact ? 'Update' : 'Add'} Contact
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
