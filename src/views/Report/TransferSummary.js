// // import '../../css/table.css';
// // import '../../css/form.css';
// // import React, { useState, useEffect } from 'react';
// // import {
// //   CTable,
// //   CTableHead,
// //   CTableRow,
// //   CTableHeaderCell,
// //   CTableBody,
// //   CTableDataCell,
// //   CCard,
// //   CCardBody,
// //   CCardHeader,
// //   CButton,
// //   CFormInput,
// //   CSpinner
// // } from '@coreui/react';
// // import CIcon from '@coreui/icons-react';
// // import { cilArrowTop, cilArrowBottom, cilSearch, cilZoomOut } from '@coreui/icons';
// // import { CFormLabel } from '@coreui/react-pro';
// // import axiosInstance from 'src/axiosInstance';
// // import Pagination from 'src/utils/Pagination';
// // import { showError } from 'src/utils/sweetAlerts';
// // import { formatDisplayDate } from 'src/utils/FormatDateTime';
// // import SearchIndentSummary from './SearchIndentSummary';

// // const TransferSummary = () => {
// //   const [data, setData] = useState([]);
// //   const [centers, setCenters] = useState([]);
// //   const [products, setProducts] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState(null);
// //   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [searchModalVisible, setSearchModalVisible] = useState(false);
// //   const [activeSearch, setActiveSearch] = useState({ 
// //     center: '', 
// //     product: '', 
// //     startDate: '', 
// //     endDate: '',
// //     usageType: ''
// //   });
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [totalPages, setTotalPages] = useState(1);

// //   const fetchData = async (searchParams = {}, page = 1) => {
// //     try {
// //       setLoading(true);
// //       setError(null);
// //       const params = new URLSearchParams();
    
// //       if (searchParams.center) {
// //         params.append('fromCenter', searchParams.center);
// //       }
// //       if (searchParams.product) {
// //         params.append('product', searchParams.product);
// //       }
// //       if (searchParams.usageType) {
// //         params.append('status', searchParams.usageType);
// //       }
// //       if (searchParams.startDate && searchParams.endDate) {
// //         const convertDateFormat = (dateStr) => {
// //           const [day, month, year] = dateStr.split('-');
// //           return `${year}-${month}-${day}`;
// //         };
        
// //         params.append('startDate', convertDateFormat(searchParams.startDate));
// //         params.append('endDate', convertDateFormat(searchParams.endDate));
// //       }

// //       params.append('page', page);
// //       const url = params.toString() ? `/reports/transfers/summary?${params.toString()}` : '/reports/transfers/summary';
      
// //       console.log('Fetching Transfer URL:', url);
// //       const response = await axiosInstance.get(url);
      
// //       if (response.data.success) {
// //         setData(response.data.data);
// //         setCurrentPage(response.data.pagination.currentPage);
// //         setTotalPages(response.data.pagination.totalPages);
// //       } else {
// //         const errorMessage = response.data.message || 'API returned unsuccessful response';
// //         setError(errorMessage);
// //         console.error('Backend error:', response.data);
// //       }
// //     } catch (err) {
// //       setError(err.message);
// //       console.error('Error fetching transfer data:', err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const fetchCenters = async () => {
// //     try {
// //       const response = await axiosInstance.get('/centers');
// //       if (response.data.success) {
// //         setCenters(response.data.data);
// //       }
// //     } catch (error) {
// //       console.error('Error fetching centers:', error);
// //     }
// //   };

// //   const fetchProducts = async () => {
// //     try {
// //       const response = await axiosInstance.get('/products/all');
// //       if (response.data.success) {
// //         setProducts(response.data.data);
// //       }
// //     } catch (error) {
// //       console.error('Error fetching products:', error);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchData();
// //     fetchCenters();
// //     fetchProducts();
// //   }, []);

// //   const handlePageChange = (page) => {
// //     if (page < 1 || page > totalPages) return;
// //     fetchData(activeSearch, page);
// //   };

// //   const calculateTotals = () => {
// //     const totals = {
// //       totalReceivedQty: 0,
// //       totalRequestedQty: 0,
// //       totalApprovedQty: 0,
// //     };
  
// //     data.forEach(item => {
// //       totals.totalReceivedQty += parseFloat(item.totalReceivedQty || 0);
// //       totals.totalRequestedQty += parseFloat(item.totalRequestedQty || 0);
// //       totals.totalApprovedQty += parseFloat(item.totalApprovedQty || 0);
// //     });
  
// //     return totals;
// //   };  

// //   const handleSort = (key) => {
// //     let direction = 'ascending';
// //     if (sortConfig.key === key && sortConfig.direction === 'ascending') {
// //       direction = 'descending';
// //     }
// //     setSortConfig({ key, direction });

// //     const sortedData = [...data].sort((a, b) => {
// //       let aValue = a;
// //       let bValue = b;
      
// //       if (key.includes('.')) {
// //         const keys = key.split('.');
// //         aValue = keys.reduce((obj, k) => obj && obj[k], a);
// //         bValue = keys.reduce((obj, k) => obj && obj[k], b);
// //       } else {
// //         aValue = a[key];
// //         bValue = b[key];
// //       }
      
// //       if (aValue < bValue) {
// //         return direction === 'ascending' ? -1 : 1;
// //       }
// //       if (aValue > bValue) {
// //         return direction === 'ascending' ? 1 : -1;
// //       }
// //       return 0;
// //     });

// //     setData(sortedData);
// //   };

// //   const getSortIcon = (key) => {
// //     if (sortConfig.key !== key) {
// //       return null;
// //     }
// //     return sortConfig.direction === 'ascending'
// //       ? <CIcon icon={cilArrowTop} className="ms-1" />
// //       : <CIcon icon={cilArrowBottom} className="ms-1" />;
// //   };

// //   const handleSearch = (searchData) => {
// //     const mergedSearchData = {
// //       ...activeSearch,
// //       ...searchData
// //     };
// //     setActiveSearch(mergedSearchData);
// //     fetchData(mergedSearchData, 1);
// //   };

// //   const handleResetSearch = () => {
// //     setActiveSearch({ 
// //       center: '', 
// //       product: '', 
// //       startDate: '', 
// //       endDate: '',
// //       usageType: '',
// //     });
// //     setSearchTerm('');
// //     fetchData({}, 1);
// //   };

// //   const isSearchActive = () => {
// //     return activeSearch.center || 
// //            activeSearch.product || 
// //            activeSearch.startDate || 
// //            activeSearch.endDate ||
// //            activeSearch.usageType 
// //   };
// //   const filteredData = data.filter(item => {
// //     if (isSearchActive()) {
// //       return true;
// //     }
// //     return Object.values(item).some(value => {
// //       if (typeof value === 'object' && value !== null) {
// //         return Object.values(value).some(nestedValue => 
// //           nestedValue && nestedValue.toString().toLowerCase().includes(searchTerm.toLowerCase())
// //         );
// //       }
// //       return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase());
// //     });
// //   });

// //   if (loading) {
// //     return (
// //       <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
// //         <CSpinner color="primary" />
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="alert alert-danger" role="alert">
// //       {error}
// //       </div>
// //     );
// //   }

// //   const totals = calculateTotals();

  
// //   const generateDetailExport = async () => {
// //     try {
// //       setLoading(true);
// //       const params = new URLSearchParams();
      
// //       if (activeSearch.center) {
// //         params.append('fromCenter', activeSearch.center);
// //       }
// //       if (activeSearch.product) {
// //         params.append('product', activeSearch.product);
// //       }
// //       if (activeSearch.usageType) {
// //         params.append('status', activeSearch.usageType);
// //       }
// //       if (activeSearch.startDate && activeSearch.endDate) {
// //         const convertDateFormat = (dateStr) => {
// //           const [day, month, year] = dateStr.split('-');
// //           return `${year}-${month}-${day}`;
// //         };
        
// //         params.append('startDate', convertDateFormat(activeSearch.startDate));
// //         params.append('endDate', convertDateFormat(activeSearch.endDate));
// //       }
// //        params.append('export','true');
// //       const apiUrl = params.toString() 
// //         ? `/reports/transfers/summary?${params.toString()}` 
// //         : '/reports/transfers/summary';
      
// //       const response = await axiosInstance.get(apiUrl);
      
// //       if (!response.data.success) {
// //         throw new Error('API returned unsuccessful response');
// //       }
  
// //       const exportData = response.data.data;
      
// //       if (!exportData || exportData.length === 0) {
// //         showError('No data available for export');
// //         return;
// //       }
  
// //       const headers = [
// //         'Center',
// //         'Parent Center',
// //         'Product',
// //         'Total Qty'
// //       ];
  
// //       const csvData = exportData.map(item => [
// //         item.fromCenter || 'N/A',
// //         item.toCenter || 'N/A',
// //         item.product || 'N/A',
// //         item.totalReceivedQty || 0
// //       ]);
  
// //       const csvContent = [
// //         headers.join(','),
// //         ...csvData.map(row => 
// //           row.map(field => {
// //             const stringField = String(field || '');
// //             return `"${stringField.replace(/"/g, '""')}"`;
// //           }).join(',')
// //         )
// //       ].join('\n');
  
// //       const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
// //       const link = document.createElement('a');
// //       const downloadUrl = URL.createObjectURL(blob);
      
// //       link.setAttribute('href', downloadUrl);
// //       link.setAttribute('download', `transfer_summary_report_${new Date().toISOString().split('T')[0]}.csv`);
// //       link.style.visibility = 'hidden';
      
// //       document.body.appendChild(link);
// //       link.click();
// //       document.body.removeChild(link);
// //       URL.revokeObjectURL(downloadUrl);
    
// //     } catch (error) {
// //       console.error('Error generating export:', error);
// //       showError('Error generating export file');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   return (
// //     <div>
// //       <div className='title'>Transfer Summary Report</div>
// //       <SearchIndentSummary
// //         visible={searchModalVisible}
// //         onClose={() => setSearchModalVisible(false)}
// //         onSearch={handleSearch}
// //         centers={centers}
// //         products={products}
// //       />
// //       <CCard className='table-container mt-4'>
// //         <CCardHeader className='card-header d-flex justify-content-between align-items-center'>
// //           <div>
// //             <CButton 
// //               size="sm" 
// //               className="action-btn me-1"
// //               onClick={() => setSearchModalVisible(true)}
// //             >
// //               <CIcon icon={cilSearch} className='icon' /> Search
// //             </CButton>
// //             {isSearchActive() && (
// //               <CButton 
// //                 size="sm" 
// //                 color="secondary" 
// //                 className="action-btn me-1"
// //                 onClick={handleResetSearch}
// //               >
// //                <CIcon icon={cilZoomOut} className='icon' />
// //                 Reset Search
// //               </CButton>
// //             )}
// //             <CButton 
// //               size="sm" 
// //               className="action-btn me-1"
// //               onClick={generateDetailExport}
// //             >
// //               <i className="fa fa-fw fa-file-excel"></i>
// //                Export
// //             </CButton>
// //           </div>
          
// //           <div>
// //             <Pagination
// //               currentPage={currentPage}
// //               totalPages={totalPages}
// //               onPageChange={handlePageChange}
// //             />
// //           </div>
// //         </CCardHeader>
        
// //         <CCardBody>
// //           <div className='summary-report'>
// //             <h4 className='summary-title'>Showing Result</h4>
// //             <ul className='summary-list'>
// //               <li><strong>{formatDisplayDate(activeSearch.startDate, activeSearch.endDate)}</strong></li>
// //             </ul>
// //           </div>

// //           <div className="d-flex justify-content-between mb-3">
// //             <div>
// //             </div>
// //             <div className='d-flex'>
// //               <CFormLabel className='mt-1 m-1'>Search:</CFormLabel>
// //               <CFormInput
// //                 type="text"
// //                 style={{maxWidth: '350px', height: '30px', borderRadius: '0'}}
// //                 className="d-inline-block square-search"
// //                 value={searchTerm}
// //                 onChange={(e) => setSearchTerm(e.target.value)}
// //               />
// //             </div>
// //           </div>
          
// //           <div className="responsive-table-wrapper">
// //             <CTable striped bordered hover className='responsive-table'>
// //               <CTableHead>
// //                 <CTableRow>
// //                   <CTableHeaderCell scope="col" onClick={() => handleSort('fromCenter')} className="sortable-header">
// //                     Branch {getSortIcon('fromCenter')}
// //                   </CTableHeaderCell>
// //                   <CTableHeaderCell scope="col" onClick={() => handleSort('toCenter')} className="sortable-header">
// //                     Parent Branch {getSortIcon('toCenter')}
// //                   </CTableHeaderCell>
// //                   <CTableHeaderCell scope="col" onClick={() => handleSort('product')} className="sortable-header">
// //                     Product {getSortIcon('product')}
// //                   </CTableHeaderCell>
// //                   <CTableHeaderCell scope="col" onClick={() => handleSort('totalReceivedQty')} className="sortable-header">
// //                     Total Qty {getSortIcon('totalReceivedQty')}
// //                   </CTableHeaderCell>
// //                 </CTableRow>
// //               </CTableHead>
// //               <CTableBody>
// //                 {filteredData.length > 0 ? (
// //                   <>
// //                     {filteredData.map((item, index) => (
// //                       <CTableRow key={index}>
// //                         <CTableDataCell>{item.fromCenter || ''}</CTableDataCell>
// //                         <CTableDataCell>{item.toCenter || ''}</CTableDataCell>
// //                         <CTableDataCell>{item.product || ' '}</CTableDataCell>
// //                         <CTableDataCell>{item.totalReceivedQty || 0}</CTableDataCell>
// //                       </CTableRow>
// //                     ))}
// //                     <CTableRow className='total-row'>
// //                       <CTableDataCell colSpan="3">Total</CTableDataCell>
// //                       <CTableDataCell>{totals.totalReceivedQty.toFixed(2)}</CTableDataCell>
// //                     </CTableRow>
// //                   </>
// //                 ) : (
// //                   <CTableRow>
// //                     <CTableDataCell colSpan="8" className="text-center">
// //                       No data found
// //                     </CTableDataCell>
// //                   </CTableRow>
// //                 )}
// //               </CTableBody>
// //             </CTable>
// //           </div>
// //         </CCardBody>
// //       </CCard>
// //     </div>
// //   );
// // };

// // export default TransferSummary;







// // import '../../css/table.css';
// // import '../../css/form.css';
// // import React, { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// // import {
// //   CTable,
// //   CTableHead,
// //   CTableRow,
// //   CTableHeaderCell,
// //   CTableBody,
// //   CTableDataCell,
// //   CCard,
// //   CCardBody,
// //   CCardHeader,
// //   CButton,
// //   CFormInput,
// //   CSpinner,
// //   CModal,
// //   CModalHeader,
// //   CModalTitle,
// //   CModalBody,
// //   CModalFooter,
// //   CFormLabel
// // } from '@coreui/react';
// // import CIcon from '@coreui/icons-react';
// // import { cilArrowTop, cilArrowBottom, cilSearch, cilZoomOut } from '@coreui/icons';
// // import { CFormLabel as CFormLabelPro } from '@coreui/react-pro';
// // import axiosInstance from 'src/axiosInstance';
// // import Pagination from 'src/utils/Pagination';
// // import { showError, showSuccess } from 'src/utils/sweetAlerts';
// // import { formatDisplayDate } from 'src/utils/FormatDateTime';
// // import SearchIndentSummary from './SearchIndentSummary';

// // const TransferSummary = () => {
// //   const navigate = useNavigate();

// //   const [data, setData] = useState([]);
// //   const [centers, setCenters] = useState([]);
// //   const [products, setProducts] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [exportLoading, setExportLoading] = useState(false);
// //   const [error, setError] = useState(null);
// //   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [searchModalVisible, setSearchModalVisible] = useState(false);
// //   const [exportModalVisible, setExportModalVisible] = useState(false);
// //   const [exportStartDate, setExportStartDate] = useState('');
// //   const [exportEndDate, setExportEndDate] = useState('');
// //   const [activeSearch, setActiveSearch] = useState({ 
// //     center: '', 
// //     product: '', 
// //     startDate: '', 
// //     endDate: '',
// //     usageType: ''
// //   });
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [totalPages, setTotalPages] = useState(1);

// //   const fetchData = async (searchParams = {}, page = 1) => {
// //     try {
// //       setLoading(true);
// //       setError(null);
// //       const params = new URLSearchParams();
    
// //       if (searchParams.center) {
// //         params.append('fromCenter', searchParams.center);
// //       }
// //       if (searchParams.product) {
// //         params.append('product', searchParams.product);
// //       }
// //       if (searchParams.usageType) {
// //         params.append('status', searchParams.usageType);
// //       }
// //       if (searchParams.startDate && searchParams.endDate) {
// //         const convertDateFormat = (dateStr) => {
// //           const [day, month, year] = dateStr.split('-');
// //           return `${year}-${month}-${day}`;
// //         };
        
// //         params.append('startDate', convertDateFormat(searchParams.startDate));
// //         params.append('endDate', convertDateFormat(searchParams.endDate));
// //       }

// //       params.append('page', page);
// //       const url = params.toString() ? `/reports/transfers/summary?${params.toString()}` : '/reports/transfers/summary';
      
// //       console.log('Fetching Transfer URL:', url);
// //       const response = await axiosInstance.get(url);
      
// //       if (response.data.success) {
// //         setData(response.data.data);
// //         setCurrentPage(response.data.pagination.currentPage);
// //         setTotalPages(response.data.pagination.totalPages);
// //       } else {
// //         const errorMessage = response.data.message || 'API returned unsuccessful response';
// //         setError(errorMessage);
// //         console.error('Backend error:', response.data);
// //       }
// //     } catch (err) {
// //       setError(err.message);
// //       console.error('Error fetching transfer data:', err);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const fetchCenters = async () => {
// //     try {
// //       const response = await axiosInstance.get('/centers');
// //       if (response.data.success) {
// //         setCenters(response.data.data);
// //       }
// //     } catch (error) {
// //       console.error('Error fetching centers:', error);
// //     }
// //   };

// //   const fetchProducts = async () => {
// //     try {
// //       const response = await axiosInstance.get('/products/all');
// //       if (response.data.success) {
// //         setProducts(response.data.data);
// //       }
// //     } catch (error) {
// //       console.error('Error fetching products:', error);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchData();
// //     fetchCenters();
// //     fetchProducts();
// //   }, []);

// //   const handleProductClick = (item) => {
// //   console.log('Transfer Summary product clicked:', {
// //     productId: item.productId,
// //     productName: item.product
// //   });

// //   if (!item.productId) {
// //     console.error('Product ID missing:', item);
// //     return;
// //   }

// //   navigate('/stock-request', {
// //     state: {
// //       productFilter: item.productId,
// //       productName: item.product,
// //       fromTransferReport: true
// //     }
// //   });
// // };

// //   const handlePageChange = (page) => {
// //     if (page < 1 || page > totalPages) return;
// //     fetchData(activeSearch, page);
// //   };

// //   const calculateTotals = () => {
// //     const totals = {
// //       totalReceivedQty: 0,
// //       totalRequestedQty: 0,
// //       totalApprovedQty: 0,
// //     };
  
// //     data.forEach(item => {
// //       totals.totalReceivedQty += parseFloat(item.totalReceivedQty || 0);
// //       totals.totalRequestedQty += parseFloat(item.totalRequestedQty || 0);
// //       totals.totalApprovedQty += parseFloat(item.totalApprovedQty || 0);
// //     });
  
// //     return totals;
// //   };  

// //   const handleSort = (key) => {
// //     let direction = 'ascending';
// //     if (sortConfig.key === key && sortConfig.direction === 'ascending') {
// //       direction = 'descending';
// //     }
// //     setSortConfig({ key, direction });

// //     const sortedData = [...data].sort((a, b) => {
// //       let aValue = a;
// //       let bValue = b;
      
// //       if (key.includes('.')) {
// //         const keys = key.split('.');
// //         aValue = keys.reduce((obj, k) => obj && obj[k], a);
// //         bValue = keys.reduce((obj, k) => obj && obj[k], b);
// //       } else {
// //         aValue = a[key];
// //         bValue = b[key];
// //       }
      
// //       if (aValue < bValue) {
// //         return direction === 'ascending' ? -1 : 1;
// //       }
// //       if (aValue > bValue) {
// //         return direction === 'ascending' ? 1 : -1;
// //       }
// //       return 0;
// //     });

// //     setData(sortedData);
// //   };

// //   const getSortIcon = (key) => {
// //     if (sortConfig.key !== key) {
// //       return null;
// //     }
// //     return sortConfig.direction === 'ascending'
// //       ? <CIcon icon={cilArrowTop} className="ms-1" />
// //       : <CIcon icon={cilArrowBottom} className="ms-1" />;
// //   };

// //   const handleSearch = (searchData) => {
// //     const mergedSearchData = {
// //       ...activeSearch,
// //       ...searchData
// //     };
// //     setActiveSearch(mergedSearchData);
// //     fetchData(mergedSearchData, 1);
// //   };

// //   const handleResetSearch = () => {
// //     setActiveSearch({ 
// //       center: '', 
// //       product: '', 
// //       startDate: '', 
// //       endDate: '',
// //       usageType: '',
// //     });
// //     setSearchTerm('');
// //     fetchData({}, 1);
// //   };

// //   const isSearchActive = () => {
// //     return activeSearch.center || 
// //            activeSearch.product || 
// //            activeSearch.startDate || 
// //            activeSearch.endDate ||
// //            activeSearch.usageType 
// //   };

// //   const openExportModal = () => {
// //     setExportStartDate(activeSearch.startDate || '');
// //     setExportEndDate(activeSearch.endDate || '');
// //     setExportModalVisible(true);
// //   };

// //   const generateDetailExport = async () => {
// //     try {
// //       setExportLoading(true);
      
// //       // Validate dates
// //       if (exportStartDate && exportEndDate && exportStartDate > exportEndDate) {
// //         showError('Start date cannot be greater than end date');
// //         setExportLoading(false);
// //         return;
// //       }
      
// //       const params = new URLSearchParams();
      
// //       if (activeSearch.center) {
// //         params.append('fromCenter', activeSearch.center);
// //       }
// //       if (activeSearch.product) {
// //         params.append('product', activeSearch.product);
// //       }
// //       if (activeSearch.usageType) {
// //         params.append('status', activeSearch.usageType);
// //       }
      
// //       // Use export modal date range (overrides active search dates)
// //       if (exportStartDate) {
// //         // Convert date format if needed (assuming DD-MM-YYYY format from active search)
// //         const convertDateFormat = (dateStr) => {
// //           // Check if date is in DD-MM-YYYY format
// //           if (dateStr.includes('-')) {
// //             const parts = dateStr.split('-');
// //             if (parts[0].length === 2 && parts[1].length === 2 && parts[2].length === 4) {
// //               const [day, month, year] = parts;
// //               return `${year}-${month}-${day}`;
// //             }
// //           }
// //           return dateStr;
// //         };
        
// //         params.append('startDate', convertDateFormat(exportStartDate));
// //       }
// //       if (exportEndDate) {
// //         // Convert date format if needed
// //         const convertDateFormat = (dateStr) => {
// //           if (dateStr.includes('-')) {
// //             const parts = dateStr.split('-');
// //             if (parts[0].length === 2 && parts[1].length === 2 && parts[2].length === 4) {
// //               const [day, month, year] = parts;
// //               return `${year}-${month}-${day}`;
// //             }
// //           }
// //           return dateStr;
// //         };
        
// //         params.append('endDate', convertDateFormat(exportEndDate));
// //       }
      
// //       params.append('export', 'true');
// //       const apiUrl = params.toString() 
// //         ? `/reports/transfers/summary?${params.toString()}` 
// //         : '/reports/transfers/summary';
      
// //       const response = await axiosInstance.get(apiUrl);
      
// //       if (!response.data.success) {
// //         throw new Error('API returned unsuccessful response');
// //       }
  
// //       const exportData = response.data.data;
      
// //       if (!exportData || exportData.length === 0) {
// //         showError('No data available for export');
// //         return;
// //       }
  
// //       const headers = [
// //         'From Center',
// //         'To Center',
// //         'Product',
// //         'Total Qty'
// //       ];
  
// //       const csvData = exportData.map(item => [
// //         item.fromCenter || 'N/A',
// //         item.toCenter || 'N/A',
// //         item.product || 'N/A',
// //         item.totalReceivedQty || 0
// //       ]);
  
// //       // Create filename with date range if applied
// //       let filename = `transfer_summary_report`;
// //       if (exportStartDate && exportEndDate) {
// //         filename += `_${exportStartDate}_to_${exportEndDate}`;
// //       } else if (exportStartDate) {
// //         filename += `_from_${exportStartDate}`;
// //       } else if (exportEndDate) {
// //         filename += `_until_${exportEndDate}`;
// //       } else {
// //         filename += `_${new Date().toISOString().split('T')[0]}`;
// //       }
// //       filename += '.csv';
  
// //       const csvContent = [
// //         headers.join(','),
// //         ...csvData.map(row => 
// //           row.map(field => {
// //             const stringField = String(field || '');
// //             return `"${stringField.replace(/"/g, '""')}"`;
// //           }).join(',')
// //         )
// //       ].join('\n');
  
// //       const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
// //       const link = document.createElement('a');
// //       const downloadUrl = URL.createObjectURL(blob);
      
// //       link.setAttribute('href', downloadUrl);
// //       link.setAttribute('download', filename);
// //       link.style.visibility = 'hidden';
      
// //       document.body.appendChild(link);
// //       link.click();
// //       document.body.removeChild(link);
// //       URL.revokeObjectURL(downloadUrl);
      
// //       showSuccess('Export completed successfully!');
// //       setExportModalVisible(false);
// //       setExportStartDate('');
// //       setExportEndDate('');
    
// //     } catch (error) {
// //       console.error('Error generating export:', error);
// //       showError('Error generating export file');
// //     } finally {
// //       setExportLoading(false);
// //     }
// //   };

// //   const filteredData = data.filter(item => {
// //     if (isSearchActive()) {
// //       return true;
// //     }
// //     return Object.values(item).some(value => {
// //       if (typeof value === 'object' && value !== null) {
// //         return Object.values(value).some(nestedValue => 
// //           nestedValue && nestedValue.toString().toLowerCase().includes(searchTerm.toLowerCase())
// //         );
// //       }
// //       return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase());
// //     });
// //   });

// //   if (loading) {
// //     return (
// //       <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
// //         <CSpinner color="primary" />
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="alert alert-danger" role="alert">
// //       {error}
// //       </div>
// //     );
// //   }

// //   const totals = calculateTotals();

// //   return (
// //     <div>
// //       <div className='title'>Transfer Summary Report</div>
// //       <SearchIndentSummary
// //         visible={searchModalVisible}
// //         onClose={() => setSearchModalVisible(false)}
// //         onSearch={handleSearch}
// //         centers={centers}
// //         products={products}
// //       />

// //       {/* Export Modal */}
// //       <CModal visible={exportModalVisible} onClose={() => setExportModalVisible(false)} size="md">
// //         <CModalHeader>
// //           <CModalTitle>Export Transfer Summary Report</CModalTitle>
// //         </CModalHeader>
        
// //         <CModalBody>
// //           <div className="form-group mb-3">
// //             <CFormLabel htmlFor="exportStartDate">Start Date (Optional)</CFormLabel>
// //             <CFormInput
// //               type="date"
// //               id="exportStartDate"
// //               value={exportStartDate}
// //               onChange={(e) => setExportStartDate(e.target.value)}
// //               placeholder="Select start date"
// //             />
// //             <small className="text-muted">Leave empty to include all records from beginning</small>
// //           </div>
          
// //           <div className="form-group mb-3">
// //             <CFormLabel htmlFor="exportEndDate">End Date (Optional)</CFormLabel>
// //             <CFormInput
// //               type="date"
// //               id="exportEndDate"
// //               value={exportEndDate}
// //               onChange={(e) => setExportEndDate(e.target.value)}
// //               placeholder="Select end date"
// //             />
// //             <small className="text-muted">Leave empty to include all records until today</small>
// //           </div>

// //           {/* Show current filters summary */}
// //           {(activeSearch.center || activeSearch.product || activeSearch.usageType) && (
// //             <div className="mt-3 p-2 bg-light rounded">
// //               <strong>Current Filters:</strong>
// //               <ul className="mb-0 mt-1">
// //                 {activeSearch.center && (
// //                   <li><small>From Center: {centers.find(c => c._id === activeSearch.center)?.centerName}</small></li>
// //                 )}
// //                 {activeSearch.product && (
// //                   <li><small>Product: {products.find(p => p._id === activeSearch.product)?.productTitle}</small></li>
// //                 )}
// //                 {activeSearch.usageType && (
// //                   <li><small>Status: {activeSearch.usageType}</small></li>
// //                 )}
// //               </ul>
// //             </div>
// //           )}
// //         </CModalBody>
        
// //         <CModalFooter>
// //           <CButton color="secondary" onClick={() => setExportModalVisible(false)}>
// //             Cancel
// //           </CButton>
// //           <CButton color="primary" onClick={generateDetailExport} disabled={exportLoading}>
// //             {exportLoading ? (
// //               <>
// //                 <CSpinner size="sm" className="me-1" />
// //                 Exporting...
// //               </>
// //             ) : (
// //               <>
// //                 <i className="fa fa-fw fa-file-excel me-1"></i>
// //                 Export
// //               </>
// //             )}
// //           </CButton>
// //         </CModalFooter>
// //       </CModal>

// //       <CCard className='table-container mt-4'>
// //         <CCardHeader className='card-header d-flex justify-content-between align-items-center'>
// //           <div>
// //             <CButton 
// //               size="sm" 
// //               className="action-btn me-1"
// //               onClick={() => setSearchModalVisible(true)}
// //             >
// //               <CIcon icon={cilSearch} className='icon' /> Search
// //             </CButton>
// //             {isSearchActive() && (
// //               <CButton 
// //                 size="sm" 
// //                 color="secondary" 
// //                 className="action-btn me-1"
// //                 onClick={handleResetSearch}
// //               >
// //                <CIcon icon={cilZoomOut} className='icon' />
// //                 Reset Search
// //               </CButton>
// //             )}
// //             <CButton 
// //               size="sm" 
// //               className="action-btn me-1"
// //               onClick={openExportModal}
// //               disabled={exportLoading || data.length === 0}
// //             >
// //               <i className="fa fa-fw fa-file-excel"></i>
// //                Export
// //             </CButton>
// //           </div>
          
// //           <div>
// //             <Pagination
// //               currentPage={currentPage}
// //               totalPages={totalPages}
// //               onPageChange={handlePageChange}
// //             />
// //           </div>
// //         </CCardHeader>
        
// //         <CCardBody>
// //           <div className="d-flex justify-content-between mb-3">
// //             <div>
// //               {(exportStartDate || exportEndDate) && (
// //                 <div className="text-muted small">
// //                   {exportStartDate && `Export From: ${exportStartDate} `}
// //                   {exportEndDate && `To: ${exportEndDate}`}
// //                 </div>
// //               )}
// //             </div>
// //             <div className='d-flex'>
// //               <CFormLabelPro className='mt-1 m-1'>Search:</CFormLabelPro>
// //               <CFormInput
// //                 type="text"
// //                 style={{maxWidth: '350px', height: '30px', borderRadius: '0'}}
// //                 className="d-inline-block square-search"
// //                 value={searchTerm}
// //                 onChange={(e) => setSearchTerm(e.target.value)}
// //               />
// //             </div>
// //           </div>

// //           <div className='summary-report'>
// //             <h4 className='summary-title'>Showing Result</h4>
// //             <ul className='summary-list'>
// //               <li><strong>{formatDisplayDate(activeSearch.startDate, activeSearch.endDate)}</strong></li>
// //             </ul>
// //           </div>
          
// //           <div className="responsive-table-wrapper">
// //             <CTable striped bordered hover className='responsive-table'>
// //               <CTableHead>
// //                 <CTableRow>
// //                   <CTableHeaderCell scope="col" onClick={() => handleSort('fromCenter')} className="sortable-header">
// //                     Branch {getSortIcon('fromCenter')}
// //                   </CTableHeaderCell>
// //                   <CTableHeaderCell scope="col" onClick={() => handleSort('toCenter')} className="sortable-header">
// //                     Parent Branch {getSortIcon('toCenter')}
// //                   </CTableHeaderCell>
// //                   <CTableHeaderCell scope="col" onClick={() => handleSort('product')} className="sortable-header">
// //                     Product {getSortIcon('product')}
// //                   </CTableHeaderCell>
// //                   <CTableHeaderCell scope="col" onClick={() => handleSort('totalReceivedQty')} className="sortable-header">
// //                     Total Qty {getSortIcon('totalReceivedQty')}
// //                   </CTableHeaderCell>
// //                 </CTableRow>
// //               </CTableHead>
// //               <CTableBody>
// //                 {filteredData.length > 0 ? (
// //                   <>
// //                     {filteredData.map((item, index) => (
// //                       <CTableRow key={index}>
// //                         <CTableDataCell>{item.fromCenter || ''}</CTableDataCell>
// //                         <CTableDataCell>{item.toCenter || ''}</CTableDataCell>
// //                         <CTableDataCell>{item.product ? (
// //                           <span
// //                           style={{
// //                             cursor: 'pointer',
// //                             color: '#007bff',
// //                             textDecoration: 'underline'
// //                           }}
// //                           onClick={() => handleProductClick(item)}
// //                           title="Click to view stock request details"
// //                           >
// //                             {item.product}
// //                             </span>
// //                             ) : (
// //                               'No Product'
// //                             )}
// //                          </CTableDataCell>
// //                         <CTableDataCell>{item.totalReceivedQty || 0}</CTableDataCell>
// //                       </CTableRow>
// //                     ))}
// //                     <CTableRow className='total-row'>
// //                       <CTableDataCell colSpan="3">Total</CTableDataCell>
// //                       <CTableDataCell>{totals.totalReceivedQty.toFixed(2)}</CTableDataCell>
// //                     </CTableRow>
// //                   </>
// //                 ) : (
// //                   <CTableRow>
// //                     <CTableDataCell colSpan="8" className="text-center">
// //                       No data found
// //                     </CTableDataCell>
// //                   </CTableRow>
// //                 )}
// //               </CTableBody>
// //             </CTable>
// //           </div>
// //         </CCardBody>
// //       </CCard>
// //     </div>
// //   );
// // };

// // export default TransferSummary;







// import '../../css/table.css';
// import '../../css/form.css';
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import {
//   CTable,
//   CTableHead,
//   CTableRow,
//   CTableHeaderCell,
//   CTableBody,
//   CTableDataCell,
//   CCard,
//   CCardBody,
//   CCardHeader,
//   CButton,
//   CFormInput,
//   CSpinner,
//   CModal,
//   CModalHeader,
//   CModalTitle,
//   CModalBody,
//   CModalFooter,
//   CFormLabel
// } from '@coreui/react';
// import CIcon from '@coreui/icons-react';
// import { cilArrowTop, cilArrowBottom, cilSearch, cilZoomOut } from '@coreui/icons';
// import { CFormLabel as CFormLabelPro } from '@coreui/react-pro';
// import axiosInstance from 'src/axiosInstance';
// import Pagination from 'src/utils/Pagination';
// import { showError, showSuccess } from 'src/utils/sweetAlerts';
// import { formatDisplayDate } from 'src/utils/FormatDateTime';
// import SearchIndentSummary from './SearchIndentSummary';

// const TransferSummary = () => {
//   const navigate = useNavigate();

//   const [data, setData] = useState([]);
//   const [centers, setCenters] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [exportLoading, setExportLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchModalVisible, setSearchModalVisible] = useState(false);
//   const [exportModalVisible, setExportModalVisible] = useState(false);
//   const [exportStartDate, setExportStartDate] = useState('');
//   const [exportEndDate, setExportEndDate] = useState('');
//   const [activeSearch, setActiveSearch] = useState({ 
//     center: '', 
//     product: '', 
//     startDate: '', 
//     endDate: '',
//     usageType: ''
//   });
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const fetchData = async (searchParams = {}, page = 1) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const params = new URLSearchParams();
    
//       if (searchParams.center) {
//         params.append('fromCenter', searchParams.center);
//       }
//       if (searchParams.product) {
//         params.append('product', searchParams.product);
//       }
//       if (searchParams.usageType) {
//         params.append('status', searchParams.usageType);
//       }
//       if (searchParams.startDate && searchParams.endDate) {
//         const convertDateFormat = (dateStr) => {
//           const [day, month, year] = dateStr.split('-');
//           return `${year}-${month}-${day}`;
//         };
        
//         params.append('startDate', convertDateFormat(searchParams.startDate));
//         params.append('endDate', convertDateFormat(searchParams.endDate));
//       }

//       params.append('page', page);
//       const url = params.toString() ? `/reports/transfers/summary?${params.toString()}` : '/reports/transfers/summary';
      
//       console.log('Fetching Transfer URL:', url);
//       const response = await axiosInstance.get(url);
      
//       if (response.data.success) {
//         setData(response.data.data);
//         setCurrentPage(response.data.pagination.currentPage);
//         setTotalPages(response.data.pagination.totalPages);
//       } else {
//         const errorMessage = response.data.message || 'API returned unsuccessful response';
//         setError(errorMessage);
//         console.error('Backend error:', response.data);
//       }
//     } catch (err) {
//       setError(err.message);
//       console.error('Error fetching transfer data:', err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchCenters = async () => {
//     try {
//       const response = await axiosInstance.get('/centers');
//       if (response.data.success) {
//         setCenters(response.data.data);
//       }
//     } catch (error) {
//       console.error('Error fetching centers:', error);
//     }
//   };

//   const fetchProducts = async () => {
//     try {
//       const response = await axiosInstance.get('/products/all');
//       if (response.data.success) {
//         setProducts(response.data.data);
//       }
//     } catch (error) {
//       console.error('Error fetching products:', error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//     fetchCenters();
//     fetchProducts();
//   }, []);

//   const handleProductClick = (item) => {
//     console.log('Transfer Summary product clicked:', {
//       productId: item.productId,
//       productName: item.product,
//       fromCenterId: item.fromCenterId
//     });

//     if (!item.productId) {
//       console.error('Product ID missing:', item);
//       return;
//     }

//     // Navigate to stock request with both productId AND centerId (fromCenterId)
//     navigate('/stock-request', {
//       state: {
//         productFilter: item.productId,
//         productName: item.product,
//         centerFilter: item.fromCenterId, // Pass the fromCenterId as center filter
//         fromTransferReport: true
//       }
//     });
//   };

//   const handlePageChange = (page) => {
//     if (page < 1 || page > totalPages) return;
//     fetchData(activeSearch, page);
//   };

//   const calculateTotals = () => {
//     const totals = {
//       totalReceivedQty: 0,
//       totalRequestedQty: 0,
//       totalApprovedQty: 0,
//     };
  
//     data.forEach(item => {
//       totals.totalReceivedQty += parseFloat(item.totalReceivedQty || 0);
//       totals.totalRequestedQty += parseFloat(item.totalRequestedQty || 0);
//       totals.totalApprovedQty += parseFloat(item.totalApprovedQty || 0);
//     });
  
//     return totals;
//   };  

//   const handleSort = (key) => {
//     let direction = 'ascending';
//     if (sortConfig.key === key && sortConfig.direction === 'ascending') {
//       direction = 'descending';
//     }
//     setSortConfig({ key, direction });

//     const sortedData = [...data].sort((a, b) => {
//       let aValue = a;
//       let bValue = b;
      
//       if (key.includes('.')) {
//         const keys = key.split('.');
//         aValue = keys.reduce((obj, k) => obj && obj[k], a);
//         bValue = keys.reduce((obj, k) => obj && obj[k], b);
//       } else {
//         aValue = a[key];
//         bValue = b[key];
//       }
      
//       if (aValue < bValue) {
//         return direction === 'ascending' ? -1 : 1;
//       }
//       if (aValue > bValue) {
//         return direction === 'ascending' ? 1 : -1;
//       }
//       return 0;
//     });

//     setData(sortedData);
//   };

//   const getSortIcon = (key) => {
//     if (sortConfig.key !== key) {
//       return null;
//     }
//     return sortConfig.direction === 'ascending'
//       ? <CIcon icon={cilArrowTop} className="ms-1" />
//       : <CIcon icon={cilArrowBottom} className="ms-1" />;
//   };

//   const handleSearch = (searchData) => {
//     const mergedSearchData = {
//       ...activeSearch,
//       ...searchData
//     };
//     setActiveSearch(mergedSearchData);
//     fetchData(mergedSearchData, 1);
//   };

//   const handleResetSearch = () => {
//     setActiveSearch({ 
//       center: '', 
//       product: '', 
//       startDate: '', 
//       endDate: '',
//       usageType: '',
//     });
//     setSearchTerm('');
//     fetchData({}, 1);
//   };

//   const isSearchActive = () => {
//     return activeSearch.center || 
//            activeSearch.product || 
//            activeSearch.startDate || 
//            activeSearch.endDate ||
//            activeSearch.usageType 
//   };

//   const openExportModal = () => {
//     setExportStartDate(activeSearch.startDate || '');
//     setExportEndDate(activeSearch.endDate || '');
//     setExportModalVisible(true);
//   };

//   const generateDetailExport = async () => {
//     try {
//       setExportLoading(true);
      
//       // Validate dates
//       if (exportStartDate && exportEndDate && exportStartDate > exportEndDate) {
//         showError('Start date cannot be greater than end date');
//         setExportLoading(false);
//         return;
//       }
      
//       const params = new URLSearchParams();
      
//       if (activeSearch.center) {
//         params.append('fromCenter', activeSearch.center);
//       }
//       if (activeSearch.product) {
//         params.append('product', activeSearch.product);
//       }
//       if (activeSearch.usageType) {
//         params.append('status', activeSearch.usageType);
//       }
      
//       // Use export modal date range (overrides active search dates)
//       if (exportStartDate) {
//         // Convert date format if needed (assuming DD-MM-YYYY format from active search)
//         const convertDateFormat = (dateStr) => {
//           // Check if date is in DD-MM-YYYY format
//           if (dateStr.includes('-')) {
//             const parts = dateStr.split('-');
//             if (parts[0].length === 2 && parts[1].length === 2 && parts[2].length === 4) {
//               const [day, month, year] = parts;
//               return `${year}-${month}-${day}`;
//             }
//           }
//           return dateStr;
//         };
        
//         params.append('startDate', convertDateFormat(exportStartDate));
//       }
//       if (exportEndDate) {
//         // Convert date format if needed
//         const convertDateFormat = (dateStr) => {
//           if (dateStr.includes('-')) {
//             const parts = dateStr.split('-');
//             if (parts[0].length === 2 && parts[1].length === 2 && parts[2].length === 4) {
//               const [day, month, year] = parts;
//               return `${year}-${month}-${day}`;
//             }
//           }
//           return dateStr;
//         };
        
//         params.append('endDate', convertDateFormat(exportEndDate));
//       }
      
//       params.append('export', 'true');
//       const apiUrl = params.toString() 
//         ? `/reports/transfers/summary?${params.toString()}` 
//         : '/reports/transfers/summary';
      
//       const response = await axiosInstance.get(apiUrl);
      
//       if (!response.data.success) {
//         throw new Error('API returned unsuccessful response');
//       }
  
//       const exportData = response.data.data;
      
//       if (!exportData || exportData.length === 0) {
//         showError('No data available for export');
//         return;
//       }
  
//       const headers = [
//         'From Center',
//         'To Center',
//         'Product',
//         'Total Qty'
//       ];
  
//       const csvData = exportData.map(item => [
//         item.fromCenter || 'N/A',
//         item.toCenter || 'N/A',
//         item.product || 'N/A',
//         item.totalReceivedQty || 0
//       ]);
  
//       // Create filename with date range if applied
//       let filename = `transfer_summary_report`;
//       if (exportStartDate && exportEndDate) {
//         filename += `_${exportStartDate}_to_${exportEndDate}`;
//       } else if (exportStartDate) {
//         filename += `_from_${exportStartDate}`;
//       } else if (exportEndDate) {
//         filename += `_until_${exportEndDate}`;
//       } else {
//         filename += `_${new Date().toISOString().split('T')[0]}`;
//       }
//       filename += '.csv';
  
//       const csvContent = [
//         headers.join(','),
//         ...csvData.map(row => 
//           row.map(field => {
//             const stringField = String(field || '');
//             return `"${stringField.replace(/"/g, '""')}"`;
//           }).join(',')
//         )
//       ].join('\n');
  
//       const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
//       const link = document.createElement('a');
//       const downloadUrl = URL.createObjectURL(blob);
      
//       link.setAttribute('href', downloadUrl);
//       link.setAttribute('download', filename);
//       link.style.visibility = 'hidden';
      
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       URL.revokeObjectURL(downloadUrl);
      
//       showSuccess('Export completed successfully!');
//       setExportModalVisible(false);
//       setExportStartDate('');
//       setExportEndDate('');
    
//     } catch (error) {
//       console.error('Error generating export:', error);
//       showError('Error generating export file');
//     } finally {
//       setExportLoading(false);
//     }
//   };

//   const filteredData = data.filter(item => {
//     if (isSearchActive()) {
//       return true;
//     }
//     return Object.values(item).some(value => {
//       if (typeof value === 'object' && value !== null) {
//         return Object.values(value).some(nestedValue => 
//           nestedValue && nestedValue.toString().toLowerCase().includes(searchTerm.toLowerCase())
//         );
//       }
//       return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase());
//     });
//   });

//   if (loading) {
//     return (
//       <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
//         <CSpinner color="primary" />
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="alert alert-danger" role="alert">
//       {error}
//       </div>
//     );
//   }

//   const totals = calculateTotals();

//   return (
//     <div>
//       <div className='title'>Transfer Summary Report</div>
//       <SearchIndentSummary
//         visible={searchModalVisible}
//         onClose={() => setSearchModalVisible(false)}
//         onSearch={handleSearch}
//         centers={centers}
//         products={products}
//       />

//       {/* Export Modal */}
//       <CModal visible={exportModalVisible} onClose={() => setExportModalVisible(false)} size="md">
//         <CModalHeader>
//           <CModalTitle>Export Transfer Summary Report</CModalTitle>
//         </CModalHeader>
        
//         <CModalBody>
//           <div className="form-group mb-3">
//             <CFormLabel htmlFor="exportStartDate">Start Date (Optional)</CFormLabel>
//             <CFormInput
//               type="date"
//               id="exportStartDate"
//               value={exportStartDate}
//               onChange={(e) => setExportStartDate(e.target.value)}
//               placeholder="Select start date"
//             />
//             <small className="text-muted">Leave empty to include all records from beginning</small>
//           </div>
          
//           <div className="form-group mb-3">
//             <CFormLabel htmlFor="exportEndDate">End Date (Optional)</CFormLabel>
//             <CFormInput
//               type="date"
//               id="exportEndDate"
//               value={exportEndDate}
//               onChange={(e) => setExportEndDate(e.target.value)}
//               placeholder="Select end date"
//             />
//             <small className="text-muted">Leave empty to include all records until today</small>
//           </div>

//           {/* Show current filters summary */}
//           {(activeSearch.center || activeSearch.product || activeSearch.usageType) && (
//             <div className="mt-3 p-2 bg-light rounded">
//               <strong>Current Filters:</strong>
//               <ul className="mb-0 mt-1">
//                 {activeSearch.center && (
//                   <li><small>From Center: {centers.find(c => c._id === activeSearch.center)?.centerName}</small></li>
//                 )}
//                 {activeSearch.product && (
//                   <li><small>Product: {products.find(p => p._id === activeSearch.product)?.productTitle}</small></li>
//                 )}
//                 {activeSearch.usageType && (
//                   <li><small>Status: {activeSearch.usageType}</small></li>
//                 )}
//               </ul>
//             </div>
//           )}
//         </CModalBody>
        
//         <CModalFooter>
//           <CButton color="secondary" onClick={() => setExportModalVisible(false)}>
//             Cancel
//           </CButton>
//           <CButton color="primary" onClick={generateDetailExport} disabled={exportLoading}>
//             {exportLoading ? (
//               <>
//                 <CSpinner size="sm" className="me-1" />
//                 Exporting...
//               </>
//             ) : (
//               <>
//                 <i className="fa fa-fw fa-file-excel me-1"></i>
//                 Export
//               </>
//             )}
//           </CButton>
//         </CModalFooter>
//       </CModal>

//       <CCard className='table-container mt-4'>
//         <CCardHeader className='card-header d-flex justify-content-between align-items-center'>
//           <div>
//             <CButton 
//               size="sm" 
//               className="action-btn me-1"
//               onClick={() => setSearchModalVisible(true)}
//             >
//               <CIcon icon={cilSearch} className='icon' /> Search
//             </CButton>
//             {isSearchActive() && (
//               <CButton 
//                 size="sm" 
//                 color="secondary" 
//                 className="action-btn me-1"
//                 onClick={handleResetSearch}
//               >
//                <CIcon icon={cilZoomOut} className='icon' />
//                 Reset Search
//               </CButton>
//             )}
//             <CButton 
//               size="sm" 
//               className="action-btn me-1"
//               onClick={openExportModal}
//               disabled={exportLoading || data.length === 0}
//             >
//               <i className="fa fa-fw fa-file-excel"></i>
//                Export
//             </CButton>
//           </div>
          
//           <div>
//             <Pagination
//               currentPage={currentPage}
//               totalPages={totalPages}
//               onPageChange={handlePageChange}
//             />
//           </div>
//         </CCardHeader>
        
//         <CCardBody>
//           <div className="d-flex justify-content-between mb-3">
//             <div>
//               {(exportStartDate || exportEndDate) && (
//                 <div className="text-muted small">
//                   {exportStartDate && `Export From: ${exportStartDate} `}
//                   {exportEndDate && `To: ${exportEndDate}`}
//                 </div>
//               )}
//             </div>
//             <div className='d-flex'>
//               <CFormLabelPro className='mt-1 m-1'>Search:</CFormLabelPro>
//               <CFormInput
//                 type="text"
//                 style={{maxWidth: '350px', height: '30px', borderRadius: '0'}}
//                 className="d-inline-block square-search"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//           </div>

//           <div className='summary-report'>
//             <h4 className='summary-title'>Showing Result</h4>
//             <ul className='summary-list'>
//               <li><strong>{formatDisplayDate(activeSearch.startDate, activeSearch.endDate)}</strong></li>
//             </ul>
//           </div>
          
//           <div className="responsive-table-wrapper">
//             <CTable striped bordered hover className='responsive-table'>
//               <CTableHead>
//                 <CTableRow>
//                   <CTableHeaderCell scope="col" onClick={() => handleSort('fromCenter')} className="sortable-header">
//                     Branch {getSortIcon('fromCenter')}
//                   </CTableHeaderCell>
//                   <CTableHeaderCell scope="col" onClick={() => handleSort('toCenter')} className="sortable-header">
//                     Parent Branch {getSortIcon('toCenter')}
//                   </CTableHeaderCell>
//                   <CTableHeaderCell scope="col" onClick={() => handleSort('product')} className="sortable-header">
//                     Product {getSortIcon('product')}
//                   </CTableHeaderCell>
//                   <CTableHeaderCell scope="col" onClick={() => handleSort('totalReceivedQty')} className="sortable-header">
//                     Total Qty {getSortIcon('totalReceivedQty')}
//                   </CTableHeaderCell>
//                 </CTableRow>
//               </CTableHead>
//               <CTableBody>
//                 {filteredData.length > 0 ? (
//                   <>
//                     {filteredData.map((item, index) => (
//                       <CTableRow key={index}>
//                         <CTableDataCell>{item.fromCenter || ''}</CTableDataCell>
//                         <CTableDataCell>{item.toCenter || ''}</CTableDataCell>
//                         <CTableDataCell>{item.product ? (
//                           <span
//                           style={{
//                             cursor: 'pointer',
//                             color: '#007bff',
//                             textDecoration: 'underline'
//                           }}
//                           onClick={() => handleProductClick(item)}
//                           title="Click to view stock request details"
//                           >
//                             {item.product}
//                             </span>
//                             ) : (
//                               'No Product'
//                             )}
//                          </CTableDataCell>
//                         <CTableDataCell>{item.totalReceivedQty || 0}</CTableDataCell>
//                       </CTableRow>
//                     ))}
//                     <CTableRow className='total-row'>
//                       <CTableDataCell colSpan="3">Total</CTableDataCell>
//                       <CTableDataCell>{totals.totalReceivedQty.toFixed(2)}</CTableDataCell>
//                     </CTableRow>
//                   </>
//                 ) : (
//                   <CTableRow>
//                     <CTableDataCell colSpan="8" className="text-center">
//                       No data found
//                     </CTableDataCell>
//                   </CTableRow>
//                 )}
//               </CTableBody>
//             </CTable>
//           </div>
//         </CCardBody>
//       </CCard>
//     </div>
//   );
// };

// export default TransferSummary;








import '../../css/table.css';
import '../../css/form.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CCard,
  CCardBody,
  CCardHeader,
  CButton,
  CFormInput,
  CSpinner,
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormLabel,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import {
  cilArrowTop,
  cilArrowBottom,
  cilSearch,
  cilZoomOut,
} from '@coreui/icons';
import { CFormLabel as CFormLabelPro } from '@coreui/react-pro';
import axiosInstance from 'src/axiosInstance';
import Pagination from 'src/utils/Pagination';
import { showError, showSuccess } from 'src/utils/sweetAlerts';
import { formatDisplayDate } from 'src/utils/FormatDateTime';
import SearchIndentSummary from './SearchIndentSummary';

const EMPTY_SEARCH = {
  center: '',
  product: '',
  startDate: '',
  endDate: '',
  usageType: '',
};

const TransferSummary = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [centers, setCenters] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [exportLoading, setExportLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending',
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [exportModalVisible, setExportModalVisible] = useState(false);
  const [exportStartDate, setExportStartDate] = useState('');
  const [exportEndDate, setExportEndDate] = useState('');
  const [activeSearch, setActiveSearch] = useState(EMPTY_SEARCH);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const convertDateFormat = (dateStr) => {
    if (!dateStr) return '';

    if (/^\d{4}-\d{2}-\d{2}$/.test(dateStr)) {
      return dateStr;
    }

    if (/^\d{2}-\d{2}-\d{4}$/.test(dateStr)) {
      const [day, month, year] = dateStr.split('-');
      return `${year}-${month}-${day}`;
    }

    return dateStr;
  };

  const fetchData = async (searchParams = {}, page = 1) => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();

      if (searchParams.center) {
        params.set('fromCenter', searchParams.center);
      }

      if (searchParams.product) {
        params.set('product', searchParams.product);
      }

      if (searchParams.usageType) {
        params.set('status', searchParams.usageType);
      }

      if (searchParams.startDate) {
        params.set(
          'startDate',
          convertDateFormat(searchParams.startDate)
        );
      }

      if (searchParams.endDate) {
        params.set(
          'endDate',
          convertDateFormat(searchParams.endDate)
        );
      }

      params.set('page', String(page));

      const response = await axiosInstance.get(
        `/reports/transfers/summary?${params.toString()}`
      );

      if (!response.data?.success) {
        throw new Error(
          response.data?.message || 'Unable to fetch transfer summary.'
        );
      }

      setData(response.data.data || []);
      setCurrentPage(response.data.pagination?.currentPage || page);
      setTotalPages(response.data.pagination?.totalPages || 1);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        'Error fetching transfer summary.'
      );
      console.error('Error fetching transfer summary:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCenters = async () => {
    try {
      const response = await axiosInstance.get('/centers');
      if (response.data?.success) {
        setCenters(response.data.data || []);
      }
    } catch (err) {
      console.error('Error fetching centers:', err);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get('/products/all');
      if (response.data?.success) {
        setProducts(response.data.data || []);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  };

  useEffect(() => {
    fetchData();
    fetchCenters();
    fetchProducts();
  }, []);

  // Open detail records belonging to this summary row.
  const handleQuantityClick = (item) => {
    const productId =
      item.productId ||
      (typeof item.product === 'object'
        ? item.product?._id
        : null);

    const fromCenterId =
      item.fromCenterId ||
      (typeof item.fromCenter === 'object'
        ? item.fromCenter?._id
        : null);

    const toCenterId =
      item.toCenterId ||
      (typeof item.toCenter === 'object'
        ? item.toCenter?._id
        : null);

    if (!productId || !fromCenterId) {
      showError(
        'Unable to open transfer details: product ID or branch ID is missing.'
      );
      console.error('Missing summary row IDs:', item);
      return;
    }

    const params = new URLSearchParams();

    params.set('product', String(productId));
    params.set('center', String(fromCenterId));
    params.set('transferType', 'given');
    params.set(
      'productName',
      typeof item.product === 'string'
        ? item.product
        : item.product?.productTitle || item.productName || ''
    );
    params.set(
      'centerName',
      typeof item.fromCenter === 'string'
        ? item.fromCenter
        : item.fromCenter?.centerName || item.fromCenterName || ''
    );

    if (toCenterId) {
      params.set('toCenter', String(toCenterId));
    }

    // Preserve the aggregate quantity as context for the detail report.
    params.set(
      'summaryQty',
      String(Number(item.totalReceivedQty) || 0)
    );

    if (activeSearch.startDate) {
      params.set(
        'startDate',
        convertDateFormat(activeSearch.startDate)
      );
    }

    if (activeSearch.endDate) {
      params.set(
        'endDate',
        convertDateFormat(activeSearch.endDate)
      );
    }

    navigate(`/transfer-detail?${params.toString()}`);
  };

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    fetchData(activeSearch, page);
  };

  const handleSort = (key) => {
    const direction =
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
        ? 'descending'
        : 'ascending';

    setSortConfig({ key, direction });

    setData((previousData) =>
      [...previousData].sort((a, b) => {
        const getValue = (item) => {
          const value = item[key];

          if (value && typeof value === 'object') {
            return value.centerName || value.productTitle || '';
          }

          return value ?? '';
        };

        const aValue = getValue(a);
        const bValue = getValue(b);

        const comparison =
          typeof aValue === 'number' && typeof bValue === 'number'
            ? aValue - bValue
            : String(aValue).localeCompare(String(bValue), undefined, {
                numeric: true,
                sensitivity: 'base',
              });

        return direction === 'ascending'
          ? comparison
          : -comparison;
      })
    );
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;

    return sortConfig.direction === 'ascending'
      ? <CIcon icon={cilArrowTop} className="ms-1" />
      : <CIcon icon={cilArrowBottom} className="ms-1" />;
  };

  const handleSearch = (searchData) => {
    const merged = { ...EMPTY_SEARCH, ...searchData };

    setActiveSearch(merged);
    setSearchModalVisible(false);
    setSortConfig({ key: null, direction: 'ascending' });
    fetchData(merged, 1);
  };

  const handleResetSearch = () => {
    setActiveSearch({ ...EMPTY_SEARCH });
    setSearchTerm('');
    setSortConfig({ key: null, direction: 'ascending' });
    fetchData({}, 1);
  };

  const isSearchActive = Boolean(
    activeSearch.center ||
    activeSearch.product ||
    activeSearch.startDate ||
    activeSearch.endDate ||
    activeSearch.usageType
  );

  const openExportModal = () => {
    setExportStartDate(
      convertDateFormat(activeSearch.startDate || '')
    );
    setExportEndDate(
      convertDateFormat(activeSearch.endDate || '')
    );
    setExportModalVisible(true);
  };

  const generateDetailExport = async () => {
    try {
      if (
        exportStartDate &&
        exportEndDate &&
        exportStartDate > exportEndDate
      ) {
        showError('Start date cannot be greater than end date.');
        return;
      }

      setExportLoading(true);

      const params = new URLSearchParams();

      if (activeSearch.center) {
        params.set('fromCenter', activeSearch.center);
      }

      if (activeSearch.product) {
        params.set('product', activeSearch.product);
      }

      if (activeSearch.usageType) {
        params.set('status', activeSearch.usageType);
      }

      if (exportStartDate) {
        params.set('startDate', convertDateFormat(exportStartDate));
      }

      if (exportEndDate) {
        params.set('endDate', convertDateFormat(exportEndDate));
      }

      params.set('export', 'true');

      const response = await axiosInstance.get(
        `/reports/transfers/summary?${params.toString()}`
      );

      if (!response.data?.success) {
        throw new Error(
          response.data?.message || 'Export request failed.'
        );
      }

      const exportData = response.data.data || [];

      if (!exportData.length) {
        showError('No data available for export.');
        return;
      }

      const headers = [
        'From Center',
        'To Center',
        'Product',
        'Total Qty',
      ];

      const escapeCsv = (value) =>
        `"${String(value ?? '').replace(/"/g, '""')}"`;

      const rows = exportData.map((item) => [
        item.fromCenter?.centerName ||
          item.fromCenter ||
          item.fromCenterName ||
          'N/A',
        item.toCenter?.centerName ||
          item.toCenter ||
          item.toCenterName ||
          'N/A',
        item.product?.productTitle ||
          item.product ||
          item.productName ||
          'N/A',
        item.totalReceivedQty ?? 0,
      ]);

      const csvContent = [
        headers.map(escapeCsv).join(','),
        ...rows.map((row) => row.map(escapeCsv).join(',')),
      ].join('\r\n');

      const blob = new Blob(['\uFEFF', csvContent], {
        type: 'text/csv;charset=utf-8;',
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');

      const dateLabel = new Date().toISOString().slice(0, 10);
      link.href = url;
      link.download = `transfer_summary_report_${dateLabel}.csv`;

      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);

      showSuccess('Export completed successfully!');
      setExportModalVisible(false);
    } catch (err) {
      console.error('Error exporting transfer summary:', err);
      showError(
        err.response?.data?.message || 'Error generating export file.'
      );
    } finally {
      setExportLoading(false);
    }
  };

  const normalizedText = (value) => {
    if (value == null) return '';

    if (typeof value === 'object') {
      return Object.values(value)
        .map((nested) =>
          nested && typeof nested === 'object'
            ? normalizedText(nested)
            : String(nested ?? '')
        )
        .join(' ');
    }

    return String(value);
  };

  const filteredData = data.filter((item) =>
    normalizedText(item).toLowerCase().includes(searchTerm.trim().toLowerCase())
  );

  const totals = filteredData.reduce(
    (result, item) => {
      result.totalReceivedQty += Number(item.totalReceivedQty) || 0;
      return result;
    },
    { totalReceivedQty: 0 }
  );

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: '50vh' }}
      >
        <CSpinner color="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger m-4" role="alert">
        <p className="mb-2">{error}</p>
        <CButton color="primary" size="sm" onClick={() => fetchData(activeSearch, currentPage)}>
          Retry
        </CButton>
      </div>
    );
  }

  return (
    <div>
      <div className="title">Transfer Summary Report</div>

      <SearchIndentSummary
        visible={searchModalVisible}
        onClose={() => setSearchModalVisible(false)}
        onSearch={handleSearch}
        centers={centers}
        products={products}
      />

      <CModal
        visible={exportModalVisible}
        onClose={() => setExportModalVisible(false)}
        size="md"
      >
        <CModalHeader>
          <CModalTitle>Export Transfer Summary Report</CModalTitle>
        </CModalHeader>

        <CModalBody>
          <div className="form-group mb-3">
            <CFormLabel htmlFor="exportStartDate">
              Start Date (Optional)
            </CFormLabel>
            <CFormInput
              type="date"
              id="exportStartDate"
              value={exportStartDate}
              onChange={(e) => setExportStartDate(e.target.value)}
            />
            <small className="text-muted">
              Leave empty to include records from the beginning.
            </small>
          </div>

          <div className="form-group mb-3">
            <CFormLabel htmlFor="exportEndDate">
              End Date (Optional)
            </CFormLabel>
            <CFormInput
              type="date"
              id="exportEndDate"
              value={exportEndDate}
              onChange={(e) => setExportEndDate(e.target.value)}
            />
            <small className="text-muted">
              Leave empty to include records until today.
            </small>
          </div>
        </CModalBody>

        <CModalFooter>
          <CButton
            color="secondary"
            onClick={() => setExportModalVisible(false)}
          >
            Cancel
          </CButton>
          <CButton
            color="primary"
            onClick={generateDetailExport}
            disabled={exportLoading}
          >
            {exportLoading ? (
              <>
                <CSpinner size="sm" className="me-1" />
                Exporting...
              </>
            ) : (
              'Export CSV'
            )}
          </CButton>
        </CModalFooter>
      </CModal>

      <CCard className="table-container mt-4">
        <CCardHeader className="card-header d-flex justify-content-between align-items-center flex-wrap gap-2">
          <div>
            <CButton
              size="sm"
              className="action-btn me-1"
              onClick={() => setSearchModalVisible(true)}
            >
              <CIcon icon={cilSearch} className="icon" /> Search
            </CButton>

            {isSearchActive && (
              <CButton
                size="sm"
                color="secondary"
                className="action-btn me-1"
                onClick={handleResetSearch}
              >
                <CIcon icon={cilZoomOut} className="icon" /> Reset Search
              </CButton>
            )}

            <CButton
              size="sm"
              className="action-btn"
              onClick={openExportModal}
              disabled={!data.length || exportLoading}
            >
              Export
            </CButton>
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </CCardHeader>

        <CCardBody>
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-3">
            <div className="summary-report">
              <h4 className="summary-title">Showing Result</h4>
              <ul className="summary-list">
                <li>
                  <strong>
                    {formatDisplayDate(
                      activeSearch.startDate,
                      activeSearch.endDate
                    )}
                  </strong>
                </li>
              </ul>
            </div>

            <div className="d-flex align-items-center">
              <CFormLabelPro className="mt-1 m-1">
                Search:
              </CFormLabelPro>
              <CFormInput
                type="text"
                placeholder="Search current page..."
                style={{
                  maxWidth: '350px',
                  height: '30px',
                  borderRadius: 0,
                }}
                className="d-inline-block square-search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="responsive-table-wrapper">
            <CTable striped bordered hover className="responsive-table">
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell
                    onClick={() => handleSort('fromCenter')}
                    className="sortable-header"
                  >
                    Branch {getSortIcon('fromCenter')}
                  </CTableHeaderCell>
                  <CTableHeaderCell
                    onClick={() => handleSort('toCenter')}
                    className="sortable-header"
                  >
                    Parent Branch {getSortIcon('toCenter')}
                  </CTableHeaderCell>
                  <CTableHeaderCell
                    onClick={() => handleSort('product')}
                    className="sortable-header"
                  >
                    Product {getSortIcon('product')}
                  </CTableHeaderCell>
                  <CTableHeaderCell
                    onClick={() => handleSort('totalReceivedQty')}
                    className="sortable-header"
                  >
                    Total Qty {getSortIcon('totalReceivedQty')}
                  </CTableHeaderCell>
                </CTableRow>
              </CTableHead>

              <CTableBody>
                {filteredData.length ? (
                  <>
                    {filteredData.map((item, index) => (
                      <CTableRow key={item._id || `${item.productId}-${item.fromCenterId}-${index}`}>
                        <CTableDataCell>
                          {typeof item.fromCenter === 'object'
                            ? item.fromCenter?.centerName || ''
                            : item.fromCenter || item.fromCenterName || ''}
                        </CTableDataCell>

                        <CTableDataCell>
                          {typeof item.toCenter === 'object'
                            ? item.toCenter?.centerName || ''
                            : item.toCenter || item.toCenterName || ''}
                        </CTableDataCell>

                        <CTableDataCell>
                          {typeof item.product === 'object'
                            ? item.product?.productTitle || item.productName || ''
                            : item.product || item.productName || 'No Product'}
                        </CTableDataCell>

                        <CTableDataCell>
                          <button
                            type="button"
                            onClick={() => handleQuantityClick(item)}
                            title="View transfer details for this summary row"
                            aria-label={`View transfer details for quantity ${item.totalReceivedQty ?? 0}`}
                            style={{
                              border: 'none',
                              background: 'transparent',
                              padding: '2px 6px',
                              color: '#007bff',
                              textDecoration: 'underline',
                              cursor: 'pointer',
                              fontWeight: 600,
                            }}
                          >
                            {item.totalReceivedQty ?? 0}
                          </button>
                        </CTableDataCell>
                      </CTableRow>
                    ))}

                    <CTableRow className="total-row">
                      <CTableDataCell colSpan={3}>
                        Total
                      </CTableDataCell>
                      <CTableDataCell>
                        {totals.totalReceivedQty.toFixed(2)}
                      </CTableDataCell>
                    </CTableRow>
                  </>
                ) : (
                  <CTableRow>
                    <CTableDataCell colSpan={4} className="text-center">
                      No data found
                    </CTableDataCell>
                  </CTableRow>
                )}
              </CTableBody>
            </CTable>
          </div>
        </CCardBody>
      </CCard>
    </div>
  );
};

export default TransferSummary;
