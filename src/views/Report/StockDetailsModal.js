import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CSpinner,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
} from '@coreui/react';
import axiosInstance from 'src/axiosInstance';
import Pagination from 'src/utils/Pagination';

// type: 'stock' | 'damage'
// Shows stock-out history (date, type, branch, qty, serial numbers) for one branch + product,
// using the same /availableStock/transactions API as the Transaction Report page.
const StockDetailsModal = ({ visible, onClose, row, type }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [entries, setEntries] = useState([]);
  const [expanded, setExpanded] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const isDamage = type === 'damage';

  const fetchDetails = async (page = 1) => {
    if (!row) return;
    try {
      setLoading(true);
      setError(null);
      setExpanded({});

      const params = new URLSearchParams();
      params.append('center', row.centerId);
      params.append('product', row.productId);
      if (isDamage) {
        params.append('usageType', 'Damage');
      }
      params.append('page', page);

      const response = await axiosInstance.get(`/availableStock/transactions?${params.toString()}`);
      if (response.data.success) {
        setEntries(response.data.data || []);
        setCurrentPage(response.data.pagination?.currentPage || page);
        setTotalPages(response.data.pagination?.totalPages || 1);
      } else {
        setEntries([]);
        setError(response.data.message || 'Failed to load details');
      }
    } catch (err) {
      setEntries([]);
      setError(err.response?.data?.message || err.message || 'Failed to load details');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (visible && row) {
      setCurrentPage(1);
      fetchDetails(1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, row, type]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    fetchDetails(page);
  };

  const total = entries.reduce((sum, e) => sum + Number(e.Qty || 0), 0);

  return (
    <CModal visible={visible} onClose={onClose} size="xl" scrollable>
      <CModalHeader>
        <CModalTitle>
          {isDamage ? 'Damage' : 'Stock'} Details
          {row ? ` - ${row.productName} (${row.centerName})` : ''}
        </CModalTitle>
      </CModalHeader>

      <CModalBody>
        {loading ? (
          <div className="d-flex justify-content-center py-4">
            <CSpinner color="primary" />
          </div>
        ) : error ? (
          <div className="alert alert-danger mb-0">{error}</div>
        ) : entries.length === 0 ? (
          <p className="text-center mb-0">No details found</p>
        ) : (
          <>
            <div className="d-flex justify-content-end mb-2">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
            <div className="responsive-table-wrapper">
              <CTable striped bordered hover className="responsive-table">
                <CTableHead>
                  <CTableRow>
                    <CTableHeaderCell>Date</CTableHeaderCell>
                    <CTableHeaderCell>Type</CTableHeaderCell>
                    <CTableHeaderCell>Branch</CTableHeaderCell>
                    <CTableHeaderCell>Product</CTableHeaderCell>
                    <CTableHeaderCell>Qty</CTableHeaderCell>
                    <CTableHeaderCell>Serial Numbers</CTableHeaderCell>
                  </CTableRow>
                </CTableHead>
                <CTableBody>
                  {entries.map((e, idx) => {
                    const serials = e.SerialNumbers || [];
                    return (
                      <CTableRow key={e._id || idx}>
                        <CTableDataCell>{e.Date || ''}</CTableDataCell>
                        <CTableDataCell>{e.Type || ''}</CTableDataCell>
                        <CTableDataCell>{e.Center || ''}</CTableDataCell>
                        <CTableDataCell>{e.Product || ''}</CTableDataCell>
                        <CTableDataCell>{e.Qty || 0}</CTableDataCell>
                        <CTableDataCell>
                          {serials.length === 0 ? (
                            '-'
                          ) : (
                            <>
                              <span
                                style={{ cursor: 'pointer', color: '#337ab7' }}
                                onClick={() => setExpanded((p) => ({ ...p, [idx]: !p[idx] }))}
                              >
                                {expanded[idx] ? 'Hide' : `View (${serials.length})`}
                              </span>
                              {expanded[idx] && (
                                <div style={{ maxHeight: 120, overflowY: 'auto' }}>
                                  {serials.map((s) => (
                                    <div key={s}>{s}</div>
                                  ))}
                                </div>
                              )}
                            </>
                          )}
                        </CTableDataCell>
                      </CTableRow>
                    );
                  })}
                </CTableBody>
              </CTable>
              <div className="text-end fw-bold">Total (this page): {total}</div>
            </div>
          </>
        )}
      </CModalBody>

      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Close
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

StockDetailsModal.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  row: PropTypes.object,
  type: PropTypes.oneOf(['stock', 'damage']),
};

export default StockDetailsModal;