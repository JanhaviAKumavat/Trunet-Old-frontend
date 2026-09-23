// import '../../css/table.css';
// import '../../css/form.css';
// import React, { useState, useEffect } from 'react';
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
// import SearchIndentSummary from './SearchIndentSummary';
// import { formatDisplayDate} from 'src/utils/FormatDateTime';

// const IndentSummary = () => {
//   const [data, setData] = useState([]);
//   const [centers, setCenters] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filteredData, setFilteredData] = useState([]);
//   const [searchModalVisible, setSearchModalVisible] = useState(false);
//   const [exportModalVisible, setExportModalVisible] = useState(false);
//   const [exportStartDate, setExportStartDate] = useState('');
//   const [exportEndDate, setExportEndDate] = useState('');
//   const [activeSearch, setActiveSearch] = useState({ 
//     center: '', 
//     product: '', 
//     startDate: '', 
//     endDate: '',
//     usageType: '',
//     keyword: '',
//     outlet: '' 
//   });
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const fetchData = async (searchParams = {}, page = 1) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const params = new URLSearchParams();
      
//       if (searchParams.center) {
//         params.append('center', searchParams.center);
//       }
//       if (searchParams.product) {
//         params.append('product', searchParams.product);
//       }
//       if (searchParams.usageType) {
//         params.append('usageType', searchParams.usageType);
//       }
//       if (searchParams.startDate && searchParams.endDate) {
//         const convertDateFormat = (dateStr) => {
//           const [day, month, year] = dateStr.split('-');
//           return `${year}-${month}-${day}`;
//         };
        
//         params.append('startDate', convertDateFormat(searchParams.startDate));
//         params.append('endDate', convertDateFormat(searchParams.endDate));
//       }
      
//       if (searchParams.keyword && searchParams.keyword.trim()) {
//         console.log('✅ Adding search parameter:', searchParams.keyword);
//         params.append('search', searchParams.keyword.trim());
//       } else {
//         console.log('❌ No keyword to search');
//       }
//       if (searchParams.outlet) {
//         params.append('outlet', searchParams.outlet);
//       }
      
//       params.append('page', page);
//       const url = params.toString() ? `/reports/requests/summary?${params.toString()}` : '/reports/requests/summary';
      
//       console.log('🚀 Fetching URL:', url);
//       console.log('📦 Full search params:', searchParams);
//       console.log('🔑 Keyword being sent:', searchParams.keyword || 'none');
//       const response = await axiosInstance.get(url);
      
//       if (response.data.success) {
//         setData(response.data.data);
//         setFilteredData(response.data.data);
//         setCurrentPage(response.data.pagination.currentPage);
//         setTotalPages(response.data.pagination.totalPages);
//       } else {
//         const errorMessage = response.data.message || 'API returned unsuccessful response';
//         setError(errorMessage);
//         console.error('Backend error:', response.data);
//       }
//     } catch (err) {
//       if (err.response) {
//         const errorMessage = err.response.data?.message || 
//                             err.response.data?.error || 
//                             `Error ${err.response.status}: ${err.response.statusText}`;
//         setError(errorMessage);
//         console.error('Error response:', err.response.data);
//       } else if (err.request) {
//         setError('No response received from server. Please check your network connection.');
//         console.error('Error request:', err.request);
//       } else {
//         setError(err.message || 'An error occurred while fetching data');
//         console.error('Error message:', err.message);
//       }
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
//       console.error('Error fetching data:', error);
//     }
//   };

//   const fetchProducts = async () => {
//     try {
//       const response = await axiosInstance.get('/products/all');
//       if (response.data.success) {
//         setProducts(response.data.data);
//       }
//     } catch (error) {
//       console.error('Error fetching data:', error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//     fetchCenters();
//     fetchProducts();
//   }, []);

//   const handlePageChange = (page) => {
//     if (page < 1 || page > totalPages) return;
//     fetchData(activeSearch, page);
//   };

//   const calculateTotals = () => {
//     const displayData = filteredData.length > 0 ? filteredData : data;
//     const totals = {
//       totalQty: 0,
//     };
  
//     displayData.forEach(item => {
//       totals.totalQty += parseFloat(item.totalQty || 0);
//     });
  
//     return totals;
//   };  

//   const handleSort = (key) => {
//     let direction = 'ascending';
//     if (sortConfig.key === key && sortConfig.direction === 'ascending') {
//       direction = 'descending';
//     }
//     setSortConfig({ key, direction });

//     const displayData = filteredData.length > 0 ? filteredData : data;
//     const sortedData = [...displayData].sort((a, b) => {
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

//     setFilteredData(sortedData);
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

//   const handleFrontendSearch = () => {
//     const trimmedSearch = searchTerm.trim().toLowerCase();
    
//     if (!trimmedSearch) {
//       setFilteredData(data);
//       return;
//     }
    
//     const filtered = data.filter(item => {
//       if (item.product && item.product.toLowerCase().includes(trimmedSearch)) {
//         return true;
//       }
//       if (item.center && item.center.toLowerCase().includes(trimmedSearch)) {
//         return true;
//       }
//       if (item.parentCenter && item.parentCenter.toLowerCase().includes(trimmedSearch)) {
//         return true;
//       }
//       if (item.productCode && item.productCode.toLowerCase().includes(trimmedSearch)) {
//         return true;
//       }
//       if (item.orderNumbers && item.orderNumbers.some(order => 
//         order.toLowerCase().includes(trimmedSearch)
//       )) {
//         return true;
//       }
//       return false;
//     });
    
//     console.log(`🔍 Frontend search: found ${filtered.length} results for "${trimmedSearch}"`);
//     setFilteredData(filtered);
//   };

//   const clearFrontendSearch = () => {
//     setSearchTerm('');
//     setFilteredData(data);
//   };

//   const handleResetSearch = () => {
//     setActiveSearch({ 
//       center: '', 
//       product: '', 
//       startDate: '', 
//       endDate: '',
//       usageType: '',
//       keyword: '', 
//       outlet: '' 
//     });
//     setSearchTerm('');
//     setFilteredData(data);
//     fetchData({}, 1);
//   };

//   const isSearchActive = () => {
//     return activeSearch.center || 
//            activeSearch.product || 
//            activeSearch.startDate || 
//            activeSearch.endDate ||
//            activeSearch.usageType ||
//            activeSearch.keyword || 
//            activeSearch.outlet;
//   };

//   const openExportModal = () => {
//     setExportStartDate(activeSearch.startDate || '');
//     setExportEndDate(activeSearch.endDate || '');
//     setExportModalVisible(true);
//   };

//   const generateDetailExport = async () => {
//     try {
//       setLoading(true);
      
//       if (exportStartDate && exportEndDate && exportStartDate > exportEndDate) {
//         showError('Start date cannot be greater than end date');
//         setLoading(false);
//         return;
//       }
      
//       const params = new URLSearchParams();
      
//       if (activeSearch.center) {
//         params.append('center', activeSearch.center);
//       }
//       if (activeSearch.product) {
//         params.append('product', activeSearch.product);
//       }
//       if (activeSearch.usageType) {
//         params.append('usageType', activeSearch.usageType);
//       }
      
//       if (exportStartDate) {
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
        
//         params.append('startDate', convertDateFormat(exportStartDate));
//       }
//       if (exportEndDate) {
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
      
//       if (activeSearch.keyword) {
//         params.append('search', activeSearch.keyword);
//       }
//       if (activeSearch.outlet) {
//         params.append('outlet', activeSearch.outlet);
//       }
      
//       const apiUrl = params.toString() 
//         ? `/reports/requests/summary?${params.toString()}` 
//         : '/reports/requests/summary';
      
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
//         'Center',
//         'Parent Center',
//         'Product',
//         'Total Qty'
//       ];
  
//       const csvData = exportData.map(item => [
//         item.center || '',
//         item.parentCenter || '',
//         item.product || '',
//         item.totalQty || 0,
//       ]);
  
//       let filename = `indent_summary_report`;
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
//       setLoading(false);
//     }
//   };

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
//         {error}
//       </div>
//     );
//   }

//   const totals = calculateTotals();
//   const displayData = filteredData.length > 0 ? filteredData : data;

//   return (
//     <div>
//       <div className='title'>Indent Summary Report</div>
//       <SearchIndentSummary
//         visible={searchModalVisible}
//         onClose={() => setSearchModalVisible(false)}
//         onSearch={handleSearch}
//         centers={centers}
//         products={products}
//       />

//       <CModal visible={exportModalVisible} onClose={() => setExportModalVisible(false)} size="md">
//         <CModalHeader>
//           <CModalTitle>Export Indent Summary Report</CModalTitle>
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

//           {(activeSearch.center || activeSearch.product || activeSearch.usageType || activeSearch.outlet) && (
//             <div className="mt-3 p-2 bg-light rounded">
//               <strong>Current Filters:</strong>
//               <ul className="mb-0 mt-1">
//                 {activeSearch.center && (
//                   <li><small>Center: {centers.find(c => c._id === activeSearch.center)?.centerName}</small></li>
//                 )}
//                 {activeSearch.product && (
//                   <li><small>Product: {products.find(p => p._id === activeSearch.product)?.productTitle}</small></li>
//                 )}
//                 {activeSearch.usageType && (
//                   <li><small>Usage Type: {activeSearch.usageType}</small></li>
//                 )}
//                 {activeSearch.outlet && (
//                   <li><small>Outlet: {activeSearch.outlet}</small></li>
//                 )}
//                 {activeSearch.keyword && (
//                   <li><small>Keyword: {activeSearch.keyword}</small></li>
//                 )}
//               </ul>
//             </div>
//           )}
//         </CModalBody>
        
//         <CModalFooter>
//           <CButton color="secondary" onClick={() => setExportModalVisible(false)}>
//             Cancel
//           </CButton>
//           <CButton color="primary" onClick={generateDetailExport}>
//             <i className="fa fa-fw fa-file-excel me-1"></i>
//             Export
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
//                 <CIcon icon={cilZoomOut} className='icon' />
//                 Reset Search
//               </CButton>
//             )}
//             <CButton 
//               size="sm" 
//               className="action-btn me-1"
//               onClick={openExportModal}
//               disabled={data.length === 0}
//             >
//               <i className="fa fa-fw fa-file-excel"></i>
//               Export
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
       
//           <div className='summary-report'>
//             <h4 className='summary-title'>Showing Result</h4>
//             <ul className='summary-list'>
//               <li><strong>{formatDisplayDate(activeSearch.startDate, activeSearch.endDate)}</strong></li>
//               {searchTerm && (
//                 <li><strong>Search: &quot;{searchTerm}&quot; - {displayData.length} results</strong></li>
//               )}
//             </ul>
//           </div>

//           <div className="d-flex justify-content-between mb-3">
//             <div>
//               {(exportStartDate || exportEndDate) && (
//                 <div className="text-muted small">
//                   {exportStartDate && `Export From: ${exportStartDate} `}
//                   {exportEndDate && `To: ${exportEndDate}`}
//                 </div>
//               )}
//             </div>
//             <div className='d-flex align-items-center'>
//               <CFormLabelPro className='mt-1 m-1 me-1'>Search:</CFormLabelPro>
//               <CFormInput
//                 type="text"
//                 style={{maxWidth: '350px', height: '30px', borderRadius: '0'}}
//                 className="d-inline-block square-search"
//                 value={searchTerm}
//                 onChange={(e) => {
//                   const value = e.target.value;
//                   setSearchTerm(value);
//                   if (value.trim()) {
//                     handleFrontendSearch();
//                   } else {
//                     setFilteredData(data);
//                   }
//                 }}
//                 onKeyDown={(e) => {
//                   if (e.key === 'Enter') {
//                     e.preventDefault();
//                     e.stopPropagation();
//                     console.log('⏎ Enter key pressed, searching for:', searchTerm);
//                     handleFrontendSearch();
//                   }
//                 }}
//                 placeholder="Type to search products, centers, orders..."
//               />
//               <CButton 
//                 size="sm" 
//                 className="action-btn ms-1"
//                 onClick={() => {
//                   console.log('🔍 Search button clicked with:', searchTerm);
//                   handleFrontendSearch();
//                 }}
//                 style={{height: '30px'}}
//                 type="button"
//               >
//                 <CIcon icon={cilSearch} className='icon' />
//               </CButton>
//               {searchTerm && (
//                 <CButton 
//                   size="sm" 
//                   color="secondary" 
//                   className="action-btn ms-1"
//                   onClick={clearFrontendSearch}
//                   style={{height: '30px'}}
//                   title="Clear search"
//                 >
//                   ✕
//                 </CButton>
//               )}
//             </div>
//           </div>
          
//           <div className="responsive-table-wrapper">
//             <CTable striped bordered hover className='responsive-table'>
//               <CTableHead>
//                 <CTableRow>
//                   <CTableHeaderCell scope="col" onClick={() => handleSort('center')} className="sortable-header">
//                     Branch {getSortIcon('center')}
//                   </CTableHeaderCell>
//                   <CTableHeaderCell scope="col" onClick={() => handleSort('parentCenter')} className="sortable-header">
//                     Branch Center {getSortIcon('parentCenter')}
//                   </CTableHeaderCell>
//                   <CTableHeaderCell scope="col" onClick={() => handleSort('product')} className="sortable-header">
//                     Product {getSortIcon('product')}
//                   </CTableHeaderCell>
//                   <CTableHeaderCell scope="col" onClick={() => handleSort('totalQty')} className="sortable-header">
//                     Total Qty {getSortIcon('totalQty')}
//                   </CTableHeaderCell>
//                 </CTableRow>
//               </CTableHead>
//               <CTableBody>
//                 {displayData.length > 0 ? (
//                   <>
//                     {displayData.map((item, index) => (
//                       <CTableRow key={index}>
//                         <CTableDataCell>{item.center || ''}</CTableDataCell>
//                         <CTableDataCell>{item.parentCenter || 'N/A'}</CTableDataCell>
//                         <CTableDataCell>{item.product || 'No Product'}</CTableDataCell>
//                         <CTableDataCell>{item.totalQty || 0}</CTableDataCell>
//                       </CTableRow>
//                     ))}
//                     <CTableRow className='total-row'>
//                       <CTableDataCell colSpan="3">Total</CTableDataCell>
//                       <CTableDataCell>{totals.totalQty.toFixed(2)}</CTableDataCell>
//                     </CTableRow>
//                   </>
//                 ) : (
//                   <CTableRow>
//                     <CTableDataCell colSpan="10" className="text-center">
//                       {searchTerm ? `No results found for &quot;${searchTerm}&quot;` : 'No data found'}
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

// export default IndentSummary;


import '../../css/table.css';
import '../../css/form.css';
import React, { useState, useEffect } from 'react';
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
  CFormLabel
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilArrowTop, cilArrowBottom, cilSearch, cilZoomOut } from '@coreui/icons';
import { CFormLabel as CFormLabelPro } from '@coreui/react-pro';
import axiosInstance from 'src/axiosInstance';
import Pagination from 'src/utils/Pagination';
import { showError, showSuccess } from 'src/utils/sweetAlerts';
import SearchIndentSummary from './SearchIndentSummary';
import { formatDisplayDate} from 'src/utils/FormatDateTime';
import { useNavigate } from 'react-router-dom';

const IndentSummary = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [centers, setCenters] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [searchModalVisible, setSearchModalVisible] = useState(false);
  const [exportModalVisible, setExportModalVisible] = useState(false);
  const [exportStartDate, setExportStartDate] = useState('');
  const [exportEndDate, setExportEndDate] = useState('');
  const [activeSearch, setActiveSearch] = useState({ 
    center: '', 
    product: '', 
    startDate: '', 
    endDate: '',
    usageType: '',
    keyword: '',
    outlet: '' 
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchData = async (searchParams = {}, page = 1) => {
    try {
      setLoading(true);
      setError(null);
      const params = new URLSearchParams();
      
      if (searchParams.center) {
        params.append('center', searchParams.center);
      }
      if (searchParams.product) {
        params.append('product', searchParams.product);
      }
      if (searchParams.usageType) {
        params.append('usageType', searchParams.usageType);
      }
      if (searchParams.startDate && searchParams.endDate) {
        const convertDateFormat = (dateStr) => {
          const [day, month, year] = dateStr.split('-');
          return `${year}-${month}-${day}`;
        };
        
        params.append('startDate', convertDateFormat(searchParams.startDate));
        params.append('endDate', convertDateFormat(searchParams.endDate));
      }
      
      if (searchParams.keyword && searchParams.keyword.trim()) {
        console.log('✅ Adding search parameter:', searchParams.keyword);
        params.append('search', searchParams.keyword.trim());
      } else {
        console.log('❌ No keyword to search');
      }
      if (searchParams.outlet) {
        params.append('outlet', searchParams.outlet);
      }
      
      params.append('page', page);
      const url = params.toString() ? `/reports/requests/summary?${params.toString()}` : '/reports/requests/summary';
      
      console.log('🚀 Fetching URL:', url);
      console.log('📦 Full search params:', searchParams);
      console.log('🔑 Keyword being sent:', searchParams.keyword || 'none');
      const response = await axiosInstance.get(url);
      
      if (response.data.success) {
        setData(response.data.data);
        setFilteredData(response.data.data);
        setCurrentPage(response.data.pagination.currentPage);
        setTotalPages(response.data.pagination.totalPages);
      } else {
        const errorMessage = response.data.message || 'API returned unsuccessful response';
        setError(errorMessage);
        console.error('Backend error:', response.data);
      }
    } catch (err) {
      if (err.response) {
        const errorMessage = err.response.data?.message || 
                            err.response.data?.error || 
                            `Error ${err.response.status}: ${err.response.statusText}`;
        setError(errorMessage);
        console.error('Error response:', err.response.data);
      } else if (err.request) {
        setError('No response received from server. Please check your network connection.');
        console.error('Error request:', err.request);
      } else {
        setError(err.message || 'An error occurred while fetching data');
        console.error('Error message:', err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  const fetchCenters = async () => {
    try {
      const response = await axiosInstance.get('/centers');
      if (response.data.success) {
        setCenters(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get('/products/all');
      if (response.data.success) {
        setProducts(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchCenters();
    fetchProducts();
  }, []);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    fetchData(activeSearch, page);
  };

  const calculateTotals = () => {
    const displayData = filteredData.length > 0 ? filteredData : data;
    const totals = {
      totalQty: 0,
    };
  
    displayData.forEach(item => {
      totals.totalQty += parseFloat(item.totalQty || 0);
    });
  
    return totals;
  };  

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });

    const displayData = filteredData.length > 0 ? filteredData : data;
    const sortedData = [...displayData].sort((a, b) => {
      let aValue = a;
      let bValue = b;
      
      if (key.includes('.')) {
        const keys = key.split('.');
        aValue = keys.reduce((obj, k) => obj && obj[k], a);
        bValue = keys.reduce((obj, k) => obj && obj[k], b);
      } else {
        aValue = a[key];
        bValue = b[key];
      }
      
      if (aValue < bValue) {
        return direction === 'ascending' ? -1 : 1;
      }
      if (aValue > bValue) {
        return direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });

    setFilteredData(sortedData);
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return null;
    }
    return sortConfig.direction === 'ascending'
      ? <CIcon icon={cilArrowTop} className="ms-1" />
      : <CIcon icon={cilArrowBottom} className="ms-1" />;
  };

  const handleSearch = (searchData) => {
    const mergedSearchData = {
      ...activeSearch,
      ...searchData
    };
    setActiveSearch(mergedSearchData);
    fetchData(mergedSearchData, 1);
  };

  const handleFrontendSearch = () => {
    const trimmedSearch = searchTerm.trim().toLowerCase();
    
    if (!trimmedSearch) {
      setFilteredData(data);
      return;
    }
    
    const filtered = data.filter(item => {
      if (item.product && item.product.toLowerCase().includes(trimmedSearch)) {
        return true;
      }
      if (item.center && item.center.toLowerCase().includes(trimmedSearch)) {
        return true;
      }
      if (item.parentCenter && item.parentCenter.toLowerCase().includes(trimmedSearch)) {
        return true;
      }
      if (item.productCode && item.productCode.toLowerCase().includes(trimmedSearch)) {
        return true;
      }
      if (item.orderNumbers && item.orderNumbers.some(order => 
        order.toLowerCase().includes(trimmedSearch)
      )) {
        return true;
      }
      return false;
    });
    
    console.log(`🔍 Frontend search: found ${filtered.length} results for "${trimmedSearch}"`);
    setFilteredData(filtered);
  };

  // Drill down from a summary row into the detail report (IndentDetail),
  // filtered to this exact center + product. Uses the real centerId /
  // productId from the summary row (not names), so the detail page's
  // /reports/requests call never hits the "Invalid ID format" error.
  const handleTotalQtyClick = (item) => {
    if (!item.totalQty || !item.centerId || !item.productId) return;

    const params = new URLSearchParams();
    params.append('centerId', item.centerId);
    params.append('productId', item.productId);

    if (item.center) params.append('centerName', encodeURIComponent(item.center));
    if (item.product) params.append('productName', encodeURIComponent(item.product));

    // The summary report defaults to the current month unless a custom
    // range was searched. Carry the same period across so the detail
    // rows shown actually add up to the Total Qty that was clicked.
    if (activeSearch.startDate && activeSearch.endDate) {
      const [day, month, year] = activeSearch.startDate.split('-');
      params.append('month', `${year}-${month}`);
    } else {
      const now = new Date();
      params.append('month', `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`);
    }

    navigate(`/indent-detail?${params.toString()}`);
  };

  const clearFrontendSearch = () => {
    setSearchTerm('');
    setFilteredData(data);
  };

  const handleResetSearch = () => {
    setActiveSearch({ 
      center: '', 
      product: '', 
      startDate: '', 
      endDate: '',
      usageType: '',
      keyword: '', 
      outlet: '' 
    });
    setSearchTerm('');
    setFilteredData(data);
    fetchData({}, 1);
  };

  const isSearchActive = () => {
    return activeSearch.center || 
           activeSearch.product || 
           activeSearch.startDate || 
           activeSearch.endDate ||
           activeSearch.usageType ||
           activeSearch.keyword || 
           activeSearch.outlet;
  };

  const openExportModal = () => {
    setExportStartDate(activeSearch.startDate || '');
    setExportEndDate(activeSearch.endDate || '');
    setExportModalVisible(true);
  };

  const generateDetailExport = async () => {
    try {
      setLoading(true);
      
      if (exportStartDate && exportEndDate && exportStartDate > exportEndDate) {
        showError('Start date cannot be greater than end date');
        setLoading(false);
        return;
      }
      
      const params = new URLSearchParams();
      
      if (activeSearch.center) {
        params.append('center', activeSearch.center);
      }
      if (activeSearch.product) {
        params.append('product', activeSearch.product);
      }
      if (activeSearch.usageType) {
        params.append('usageType', activeSearch.usageType);
      }
      
      if (exportStartDate) {
        const convertDateFormat = (dateStr) => {
          if (dateStr.includes('-')) {
            const parts = dateStr.split('-');
            if (parts[0].length === 2 && parts[1].length === 2 && parts[2].length === 4) {
              const [day, month, year] = parts;
              return `${year}-${month}-${day}`;
            }
          }
          return dateStr;
        };
        
        params.append('startDate', convertDateFormat(exportStartDate));
      }
      if (exportEndDate) {
        const convertDateFormat = (dateStr) => {
          if (dateStr.includes('-')) {
            const parts = dateStr.split('-');
            if (parts[0].length === 2 && parts[1].length === 2 && parts[2].length === 4) {
              const [day, month, year] = parts;
              return `${year}-${month}-${day}`;
            }
          }
          return dateStr;
        };
        
        params.append('endDate', convertDateFormat(exportEndDate));
      }
      
      if (activeSearch.keyword) {
        params.append('search', activeSearch.keyword);
      }
      if (activeSearch.outlet) {
        params.append('outlet', activeSearch.outlet);
      }
      
      const apiUrl = params.toString() 
        ? `/reports/requests/summary?${params.toString()}` 
        : '/reports/requests/summary';
      
      const response = await axiosInstance.get(apiUrl);
      
      if (!response.data.success) {
        throw new Error('API returned unsuccessful response');
      }
  
      const exportData = response.data.data;
      
      if (!exportData || exportData.length === 0) {
        showError('No data available for export');
        return;
      }
  
      const headers = [
        'Center',
        'Parent Center',
        'Product',
        'Total Qty'
      ];
  
      const csvData = exportData.map(item => [
        item.center || '',
        item.parentCenter || '',
        item.product || '',
        item.totalQty || 0,
      ]);
  
      let filename = `indent_summary_report`;
      if (exportStartDate && exportEndDate) {
        filename += `_${exportStartDate}_to_${exportEndDate}`;
      } else if (exportStartDate) {
        filename += `_from_${exportStartDate}`;
      } else if (exportEndDate) {
        filename += `_until_${exportEndDate}`;
      } else {
        filename += `_${new Date().toISOString().split('T')[0]}`;
      }
      filename += '.csv';
  
      const csvContent = [
        headers.join(','),
        ...csvData.map(row => 
          row.map(field => {
            const stringField = String(field || '');
            return `"${stringField.replace(/"/g, '""')}"`;
          }).join(',')
        )
      ].join('\n');
  
      const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const downloadUrl = URL.createObjectURL(blob);
      
      link.setAttribute('href', downloadUrl);
      link.setAttribute('download', filename);
      link.style.visibility = 'hidden';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(downloadUrl);
      
      showSuccess('Export completed successfully!');
      setExportModalVisible(false);
      setExportStartDate('');
      setExportEndDate('');
    
    } catch (error) {
      console.error('Error generating export:', error);
      showError('Error generating export file');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
        <CSpinner color="primary" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    );
  }

  const totals = calculateTotals();
  const displayData = filteredData.length > 0 ? filteredData : data;

  return (
    <div>
      <div className='title'>Indent Summary Report</div>
      <SearchIndentSummary
        visible={searchModalVisible}
        onClose={() => setSearchModalVisible(false)}
        onSearch={handleSearch}
        centers={centers}
        products={products}
      />

      <CModal visible={exportModalVisible} onClose={() => setExportModalVisible(false)} size="md">
        <CModalHeader>
          <CModalTitle>Export Indent Summary Report</CModalTitle>
        </CModalHeader>
        
        <CModalBody>
          <div className="form-group mb-3">
            <CFormLabel htmlFor="exportStartDate">Start Date (Optional)</CFormLabel>
            <CFormInput
              type="date"
              id="exportStartDate"
              value={exportStartDate}
              onChange={(e) => setExportStartDate(e.target.value)}
              placeholder="Select start date"
            />
            <small className="text-muted">Leave empty to include all records from beginning</small>
          </div>
          
          <div className="form-group mb-3">
            <CFormLabel htmlFor="exportEndDate">End Date (Optional)</CFormLabel>
            <CFormInput
              type="date"
              id="exportEndDate"
              value={exportEndDate}
              onChange={(e) => setExportEndDate(e.target.value)}
              placeholder="Select end date"
            />
            <small className="text-muted">Leave empty to include all records until today</small>
          </div>

          {(activeSearch.center || activeSearch.product || activeSearch.usageType || activeSearch.outlet) && (
            <div className="mt-3 p-2 bg-light rounded">
              <strong>Current Filters:</strong>
              <ul className="mb-0 mt-1">
                {activeSearch.center && (
                  <li><small>Center: {centers.find(c => c._id === activeSearch.center)?.centerName}</small></li>
                )}
                {activeSearch.product && (
                  <li><small>Product: {products.find(p => p._id === activeSearch.product)?.productTitle}</small></li>
                )}
                {activeSearch.usageType && (
                  <li><small>Usage Type: {activeSearch.usageType}</small></li>
                )}
                {activeSearch.outlet && (
                  <li><small>Outlet: {activeSearch.outlet}</small></li>
                )}
                {activeSearch.keyword && (
                  <li><small>Keyword: {activeSearch.keyword}</small></li>
                )}
              </ul>
            </div>
          )}
        </CModalBody>
        
        <CModalFooter>
          <CButton color="secondary" onClick={() => setExportModalVisible(false)}>
            Cancel
          </CButton>
          <CButton color="primary" onClick={generateDetailExport}>
            <i className="fa fa-fw fa-file-excel me-1"></i>
            Export
          </CButton>
        </CModalFooter>
      </CModal>

      <CCard className='table-container mt-4'>
        <CCardHeader className='card-header d-flex justify-content-between align-items-center'>
          <div>
            <CButton 
              size="sm" 
              className="action-btn me-1"
              onClick={() => setSearchModalVisible(true)}
            >
              <CIcon icon={cilSearch} className='icon' /> Search
            </CButton>
            {isSearchActive() && (
              <CButton 
                size="sm" 
                color="secondary" 
                className="action-btn me-1"
                onClick={handleResetSearch}
              >
                <CIcon icon={cilZoomOut} className='icon' />
                Reset Search
              </CButton>
            )}
            <CButton 
              size="sm" 
              className="action-btn me-1"
              onClick={openExportModal}
              disabled={data.length === 0}
            >
              <i className="fa fa-fw fa-file-excel"></i>
              Export
            </CButton>
          </div>
          
          <div>
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </CCardHeader>
      

        <CCardBody>
       
          <div className='summary-report'>
            <h4 className='summary-title'>Showing Result</h4>
            <ul className='summary-list'>
              <li><strong>{formatDisplayDate(activeSearch.startDate, activeSearch.endDate)}</strong></li>
              {searchTerm && (
                <li><strong>Search: &quot;{searchTerm}&quot; - {displayData.length} results</strong></li>
              )}
            </ul>
          </div>

          <div className="d-flex justify-content-between mb-3">
            <div>
              {(exportStartDate || exportEndDate) && (
                <div className="text-muted small">
                  {exportStartDate && `Export From: ${exportStartDate} `}
                  {exportEndDate && `To: ${exportEndDate}`}
                </div>
              )}
            </div>
            <div className='d-flex align-items-center'>
              <CFormLabelPro className='mt-1 m-1 me-1'>Search:</CFormLabelPro>
              <CFormInput
                type="text"
                style={{maxWidth: '350px', height: '30px', borderRadius: '0'}}
                className="d-inline-block square-search"
                value={searchTerm}
                onChange={(e) => {
                  const value = e.target.value;
                  setSearchTerm(value);
                  if (value.trim()) {
                    handleFrontendSearch();
                  } else {
                    setFilteredData(data);
                  }
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log('⏎ Enter key pressed, searching for:', searchTerm);
                    handleFrontendSearch();
                  }
                }}
                placeholder="Type to search products, centers, orders..."
              />
              <CButton 
                size="sm" 
                className="action-btn ms-1"
                onClick={() => {
                  console.log('🔍 Search button clicked with:', searchTerm);
                  handleFrontendSearch();
                }}
                style={{height: '30px'}}
                type="button"
              >
                <CIcon icon={cilSearch} className='icon' />
              </CButton>
              {searchTerm && (
                <CButton 
                  size="sm" 
                  color="secondary" 
                  className="action-btn ms-1"
                  onClick={clearFrontendSearch}
                  style={{height: '30px'}}
                  title="Clear search"
                >
                  ✕
                </CButton>
              )}
            </div>
          </div>
          
          <div className="responsive-table-wrapper">
            <CTable striped bordered hover className='responsive-table'>
              <CTableHead>
                <CTableRow>
                  <CTableHeaderCell scope="col" onClick={() => handleSort('center')} className="sortable-header">
                    Branch {getSortIcon('center')}
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col" onClick={() => handleSort('parentCenter')} className="sortable-header">
                    Branch Center {getSortIcon('parentCenter')}
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col" onClick={() => handleSort('product')} className="sortable-header">
                    Product {getSortIcon('product')}
                  </CTableHeaderCell>
                  <CTableHeaderCell scope="col" onClick={() => handleSort('totalQty')} className="sortable-header">
                    Total Qty {getSortIcon('totalQty')}
                  </CTableHeaderCell>
                </CTableRow>
              </CTableHead>
              <CTableBody>
                {displayData.length > 0 ? (
                  <>
                    {displayData.map((item, index) => (
                      <CTableRow key={index}>
                        <CTableDataCell>{item.center || ''}</CTableDataCell>
                        <CTableDataCell>{item.parentCenter || 'N/A'}</CTableDataCell>
                        <CTableDataCell>{item.product || 'No Product'}</CTableDataCell>
                        <CTableDataCell
                          onClick={() => handleTotalQtyClick(item)}
                          style={{
                            cursor: item.totalQty > 0 ? 'pointer' : 'default',
                            color: item.totalQty > 0 ? '#337ab7' : 'inherit',
                            fontWeight: item.totalQty > 0 ? 600 : 'normal'
                          }}
                          title={item.totalQty > 0 ? 'Click to view detail requests' : ''}
                        >
                          {item.totalQty || 0}
                        </CTableDataCell>
                      </CTableRow>
                    ))}
                    <CTableRow className='total-row'>
                      <CTableDataCell colSpan="3">Total</CTableDataCell>
                      <CTableDataCell>{totals.totalQty.toFixed(2)}</CTableDataCell>
                    </CTableRow>
                  </>
                ) : (
                  <CTableRow>
                    <CTableDataCell colSpan="10" className="text-center">
                      {searchTerm ? `No results found for &quot;${searchTerm}&quot;` : 'No data found'}
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

export default IndentSummary;