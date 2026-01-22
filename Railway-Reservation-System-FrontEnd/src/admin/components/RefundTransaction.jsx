import { useState, useEffect } from 'react';
import AdminLayout from '../components/AdminLayout';
import DataTable from '../components/DataTable';
import ConfirmDialog from '../components/ConfirmDialog';
import PrimaryButton from '../components/PrimaryButton';

export default function RefundTransaction() {
  const [refunds, setRefunds] = useState([]);
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [selectedRefund, setSelectedRefund] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const columns = [
    { key: 'refund_id', label: 'Refund ID' },
    { key: 'pnr_number', label: 'PNR' },
    { key: 'user_name', label: 'User' },
    { 
      key: 'refund_amount', 
      label: 'Amount',
      render: (value) => `₹${value}`
    },
    { 
      key: 'refund_status', 
      label: 'Status',
      render: (value) => (
        <span className={`px-2 py-1 text-xs rounded-full ${
          value === 'Completed' ? 'bg-green-100 text-green-800' :
          value === 'Processing' ? 'bg-blue-100 text-blue-800' :
          value === 'Failed' ? 'bg-red-100 text-red-800' :
          'bg-yellow-100 text-yellow-800'
        }`}>
          {value}
        </span>
      )
    },
    { 
      key: 'refund_mode', 
      label: 'Mode',
      render: (value) => (
        <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
          {value}
        </span>
      )
    },
    { key: 'initiated_on', label: 'Initiated On' },
    { key: 'remarks', label: 'Remarks' }
  ];

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchRefunds();
  }, [filterStatus]);

  const fetchRefunds = async () => {
    try {
      const response = await fetch(`/api/admin/refunds?status=${filterStatus}`);
      const data = await response.json();
      setRefunds(data);
    } catch (error) {
      console.error('Error fetching refunds:', error);
      // Fallback to mock data
      setRefunds([
        {
          refund_id: 1,
          booking_id: 101,
          pnr_number: 'PNR123456',
          user_id: 1,
          user_name: 'John Doe',
          refund_amount: '2500.00',
          refund_status: 'Initiated',
          refund_mode: 'Bank',
          transaction_id: 'TXN789012',
          initiated_on: '2024-01-15 10:30:00',
          completed_on: null,
          remarks: 'Train cancelled due to technical issues'
        },
        {
          refund_id: 2,
          booking_id: 102,
          pnr_number: 'PNR789012',
          user_id: 2,
          user_name: 'Jane Smith',
          refund_amount: '1800.00',
          refund_status: 'Processing',
          refund_mode: 'UPI',
          transaction_id: 'TXN345678',
          initiated_on: '2024-01-14 15:45:00',
          completed_on: null,
          remarks: 'Passenger requested cancellation'
        },
        {
          refund_id: 3,
          booking_id: 103,
          pnr_number: 'PNR345678',
          user_id: 3,
          user_name: 'Bob Johnson',
          refund_amount: '3200.00',
          refund_status: 'Completed',
          refund_mode: 'CreditCard',
          transaction_id: 'TXN901234',
          initiated_on: '2024-01-13 09:15:00',
          completed_on: '2024-01-14 11:20:00',
          remarks: 'Emergency cancellation'
        }
      ]);
    }
  };

  const handleApprove = (refund) => {
    setSelectedRefund(refund);
    setShowApproveDialog(true);
  };

  const handleReject = (refund) => {
    setSelectedRefund(refund);
    setShowRejectDialog(true);
  };

  const confirmApprove = async () => {
    setLoading(true);
    
    try {
      const response = await fetch(`/api/admin/refunds/${selectedRefund.refund_id}/approve`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (response.ok) {
        await fetchRefunds();
        setShowApproveDialog(false);
      } else {
        console.error('Failed to approve refund');
      }
    } catch (error) {
      console.error('Error approving refund:', error);
    } finally {
      setLoading(false);
    }
  };

  const confirmReject = async () => {
    setLoading(true);
    
    try {
      const response = await fetch(`/api/admin/refunds/${selectedRefund.refund_id}/reject`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' }
      });
      
      if (response.ok) {
        await fetchRefunds();
        setShowRejectDialog(false);
      } else {
        console.error('Failed to reject refund');
      }
    } catch (error) {
      console.error('Error rejecting refund:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredRefunds = filterStatus === 'all' 
    ? refunds 
    : refunds.filter(refund => refund.refund_status === filterStatus);

  // Custom actions for refund table
  const refundActions = (refund) => {
    if (refund.refund_status === 'Initiated') {
      return (
        <div className="flex space-x-2">
          <PrimaryButton
            size="sm"
            onClick={() => handleApprove(refund)}
          >
            Approve
          </PrimaryButton>
          <PrimaryButton
            size="sm"
            variant="danger"
            onClick={() => handleReject(refund)}
          >
            Reject
          </PrimaryButton>
        </div>
      );
    }
    return null;
  };

  // Enhanced columns with custom actions
  const enhancedColumns = [
    ...columns,
    {
      key: 'actions',
      label: 'Actions',
      render: (_, refund) => refundActions(refund)
    }
  ];

  return (
    <AdminLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Refund Transactions</h1>
            <p className="text-gray-600">Manage refund requests and approvals</p>
          </div>
          
          {/* Filter */}
          <div className="flex items-center space-x-4">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
            >
              <option value="all">All Status</option>
              <option value="Initiated">Initiated</option>
              <option value="Processing">Processing</option>
              <option value="Completed">Completed</option>
              <option value="Failed">Failed</option>
            </select>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600">Total Refunds</p>
            <p className="text-2xl font-bold text-gray-900">{refunds.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">
              {refunds.filter(r => r.refund_status === 'Initiated').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600">Processing</p>
            <p className="text-2xl font-bold text-blue-600">
              {refunds.filter(r => r.refund_status === 'Processing').length}
            </p>
          </div>
          <div className="bg-white rounded-lg shadow p-4">
            <p className="text-sm text-gray-600">Completed</p>
            <p className="text-2xl font-bold text-green-600">
              {refunds.filter(r => r.refund_status === 'Completed').length}
            </p>
          </div>
        </div>

        {/* Table */}
        <DataTable
          columns={enhancedColumns}
          data={filteredRefunds}
          showActions={false} // We're using custom actions
        />

        {/* Approve Confirmation */}
        <ConfirmDialog
          open={showApproveDialog}
          onClose={() => setShowApproveDialog(false)}
          onConfirm={confirmApprove}
          title="Approve Refund"
          message={`Are you sure you want to approve refund of ₹${selectedRefund?.refund_amount} for PNR ${selectedRefund?.pnr_number}?`}
          confirmText="Approve"
          loading={loading}
        />

        {/* Reject Confirmation */}
        <ConfirmDialog
          open={showRejectDialog}
          onClose={() => setShowRejectDialog(false)}
          onConfirm={confirmReject}
          title="Reject Refund"
          message={`Are you sure you want to reject refund for PNR ${selectedRefund?.pnr_number}?`}
          confirmText="Reject"
          loading={loading}
        />
      </div>
    </AdminLayout>
  );
}