import AdminLayout from '../../layouts/AdminLayout';
import { Settings, Shield, Bell, Globe, Mail, Save } from 'lucide-react';

export default function AdminSettings() {
  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-heading font-bold text-gray-900 mb-2">
              Platform Settings
            </h1>
            <p className="text-gray-600">
              Manage global configuration and platform preferences.
            </p>
          </div>
          <button className="flex items-center gap-2 bg-primary-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-primary-700 transition-shadow">
            <Save className="w-5 h-5" />
            Save Configuration
          </button>
        </div>

        <div className="space-y-6">
          {/* General Settings */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center gap-2">
              <Settings className="w-5 h-5 text-gray-400" />
              <h3 className="font-bold text-gray-900">General Configuration</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Platform Name</label>
                  <input type="text" defaultValue="Trextechies Academy" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-primary-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Support Email</label>
                  <input type="email" defaultValue="support@trextechies.com" className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-primary-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center gap-2">
              <Shield className="w-5 h-5 text-gray-400" />
              <h3 className="font-bold text-gray-900">Security & Access</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-bold text-gray-900">Enable Student Registration</p>
                  <p className="text-xs text-gray-500">Allow new students to sign up without an invite.</p>
                </div>
                <input type="checkbox" className="w-5 h-5 text-primary-600 rounded" defaultChecked />
              </div>
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="text-sm font-bold text-gray-900">Required Test Proctoring</p>
                  <p className="text-xs text-gray-500">Enable AI proctoring for final assessments.</p>
                </div>
                <input type="checkbox" className="w-5 h-5 text-primary-600 rounded" />
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-200 flex items-center gap-2">
              <Bell className="w-5 h-5 text-gray-400" />
              <h3 className="font-bold text-gray-900">Email Notifications</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded text-primary-600" />
                  <span className="text-sm text-gray-700">Notify admin on new tutorial request</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded text-primary-600" />
                  <span className="text-sm text-gray-700">Notify student on curriculum assignment</span>
                </div>
                <div className="flex items-center gap-2">
                  <input type="checkbox" defaultChecked className="rounded text-primary-600" />
                  <span className="text-sm text-gray-700">Send weekly activity reports to staff</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
