// // // // import '../../css/table.css';
// // // // import '../../css/form.css';
// // // // import React, { useState, useEffect } from 'react';
// // // // import {
// // // //   CTable,
// // // //   CTableHead,
// // // //   CTableRow,
// // // //   CTableHeaderCell,
// // // //   CTableBody,
// // // //   CTableDataCell,
// // // //   CCard,
// // // //   CCardBody,
// // // //   CCardHeader,
// // // //   CButton,
// // // //   CFormInput,
// // // //   CSpinner
// // // // } from '@coreui/react';
// // // // import CIcon from '@coreui/icons-react';
// // // // import { cilArrowTop, cilArrowBottom, cilSearch, cilZoomOut } from '@coreui/icons';
// // // // import { CFormLabel } from '@coreui/react-pro';
// // // // import axiosInstance from 'src/axiosInstance';
// // // // import Pagination from 'src/utils/Pagination';
// // // // import { showError } from 'src/utils/sweetAlerts';
// // // // import { formatDate} from 'src/utils/FormatDateTime';
// // // // import CommonSearch from './CommonSearch';
// // // // import { useLocation } from 'react-router-dom';

// // // // const TransferDetail = () => {
// // // //   const [data, setData] = useState([]);
// // // //   const [centers, setCenters] = useState([]);
// // // //   const [products, setProducts] = useState([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [error, setError] = useState(null);
// // // //   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
// // // //   const [searchTerm, setSearchTerm] = useState('');
// // // //   const [searchModalVisible, setSearchModalVisible] = useState(false);
// // // //   const [activeSearch, setActiveSearch] = useState({ 
// // // //     center: '', 
// // // //     product: '', 
// // // //     startDate: '', 
// // // //     endDate: ''
// // // //   });
// // // //   const [currentPage, setCurrentPage] = useState(1);
// // // //   const [totalPages, setTotalPages] = useState(1);
// // // //   const location = useLocation();

// // // //   const getUrlParams = () => {
// // // //     const searchParams = new URLSearchParams(location.search);
// // // //     return {
// // // //       product: searchParams.get('product'),
// // // //       center: searchParams.get('center'),
// // // //       productName: searchParams.get('productName'),
// // // //       centerName: searchParams.get('centerName'),
// // // //       month: searchParams.get('month'),
// // // //       transferType: searchParams.get('transferType')
// // // //     };
// // // //   };
// // // //   useEffect(() => {
// // // //     const initializeData = async () => {
// // // //       try {
// // // //         setLoading(true);
// // // //         const urlParams = getUrlParams();
        
// // // //         console.log('Transfer Detail URL Parameters:', urlParams);

// // // //         await Promise.all([fetchCenters(), fetchProducts()]);
        
// // // //         let searchParams = {};

// // // //         if (urlParams.product && urlParams.center) {
// // // //           searchParams = {
// // // //             product: urlParams.product,
// // // //             center: urlParams.center,
// // // //             startDate: '',
// // // //             endDate: ''
// // // //           };
// // // //           if (urlParams.month) {
// // // //             const [year, month] = urlParams.month.split('-');
// // // //             const monthStart = `${year}-${month.padStart(2, '0')}-01`;
// // // //             const lastDay = new Date(parseInt(year), parseInt(month), 0).getDate();
// // // //             const monthEnd = `${year}-${month.padStart(2, '0')}-${lastDay}`;
            
// // // //             searchParams.date = `01-${month.padStart(2, '0')}-${year} to ${lastDay}-${month.padStart(2, '0')}-${year}`;
// // // //           }
          
// // // //           console.log('Using filtered search from URL:', searchParams);
// // // //           setActiveSearch(searchParams);
          
// // // //           if (urlParams.productName && urlParams.centerName) {
// // // //             const transferTypeText = urlParams.transferType === 'receive' ? 'Received' : 'Given';
// // // //             document.title = `Transfer Details (${transferTypeText}) - ${decodeURIComponent(urlParams.productName)} at ${decodeURIComponent(urlParams.centerName)}`;
// // // //           }
// // // //         } else {
// // // //           console.log('No URL parameters, fetching all data');
// // // //           searchParams = {};
// // // //         }
// // // //         await fetchData(searchParams, 1);
        
// // // //       } catch (error) {
// // // //         console.error('Error initializing data:', error);
// // // //         setError(error.message);
// // // //       } finally {
// // // //         setLoading(false);
// // // //       }
// // // //     };

// // // //     initializeData();
// // // //   }, [location.search]);

// // // //   const fetchData = async (searchParams = {}, page = 1) => {
// // // //     try {
// // // //       setLoading(true);
// // // //       setError(null);
// // // //       const params = new URLSearchParams();

// // // //       const urlParams = getUrlParams();
      
// // // //       const centerId = urlParams.center || searchParams.center;
// // // //       const productId = urlParams.product || searchParams.product;
// // // //       const transferType = urlParams.transferType;
  
// // // //       if (centerId) {
// // // //         if (transferType === 'receive') {
// // // //           params.append('toCenter', centerId);
// // // //         } else if (transferType === 'given') {
// // // //           params.append('fromCenter', centerId);
// // // //         } else {
// // // //           params.append('center', centerId);
// // // //         }
// // // //       }
      
// // // //       if (productId) {
// // // //         params.append('product', productId);
// // // //       }
      
// // // //       if (searchParams.date && searchParams.date.includes(' to ')) {
// // // //         const [startDateStr, endDateStr] = searchParams.date.split(' to ');
// // // //         const convertDateFormat = (dateStr) => {
// // // //           const [day, month, year] = dateStr.split('-');
// // // //           return `${year}-${month}-${day}`;
// // // //         };
        
// // // //         params.append('startDate', convertDateFormat(startDateStr));
// // // //         params.append('endDate', convertDateFormat(endDateStr));
// // // //       }
      
// // // //       if (urlParams.month) {
// // // //         const [year, month] = urlParams.month.split('-');
// // // //         const monthStart = `${year}-${month.padStart(2, '0')}-01`;
// // // //         const lastDay = new Date(parseInt(year), parseInt(month), 0).getDate();
// // // //         const monthEnd = `${year}-${month.padStart(2, '0')}-${lastDay}`;
        
// // // //         params.append('startDate', monthStart);
// // // //         params.append('endDate', monthEnd);
// // // //       }
      
// // // //       params.append('page', page);
// // // //       const url = params.toString() ? `/reports/transfers?${params.toString()}` : '/reports/transfers';
// // // //       console.log('Fetching URL:', url);
// // // //       const response = await axiosInstance.get(url);
      
// // // //       if (response.data.success) {
// // // //         setData(response.data.data);
// // // //         setCurrentPage(response.data.pagination.currentPage);
// // // //         setTotalPages(response.data.pagination.totalPages);
// // // //       } else {
// // // //         const errorMessage = response.data.message || 'API returned unsuccessful response';
// // // //       setError(errorMessage);
// // // //       console.error('Backend error:', response.data);
// // // //       }
// // // //     } catch (err) {
// // // //       if (err.response) {
// // // //         const errorMessage = err.response.data?.message || 
// // // //                             err.response.data?.error || 
// // // //                             `Error ${err.response.status}: ${err.response.statusText}`;
// // // //         setError(errorMessage);
// // // //         console.error('Error response:', err.response.data);
// // // //       } else if (err.request) {
// // // //         setError('No response received from server. Please check your network connection.');
// // // //         console.error('Error request:', err.request);
// // // //       } else {
// // // //         setError(err.message || 'An error occurred while fetching data');
// // // //         console.error('Error message:', err.message);
// // // //       }
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };
// // // //   const fetchCenters = async () => {
// // // //     try {
// // // //       const response = await axiosInstance.get('/centers');
// // // //       if (response.data.success) {
// // // //         setCenters(response.data.data);
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('Error fetching data:', error);
// // // //     }
// // // //   };

// // // //   const fetchProducts = async () => {
// // // //     try {
// // // //       const response = await axiosInstance.get('/products/all');
// // // //       if (response.data.success) {
// // // //         setProducts(response.data.data);
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('Error fetching data:', error);
// // // //     }
// // // //   };

// // // //   useEffect(() => {
// // // //     fetchData();
// // // //     fetchCenters();
// // // //     fetchProducts();
// // // //   }, []);

// // // //   const handlePageChange = (page) => {
// // // //     if (page < 1 || page > totalPages) return;
// // // //     fetchData(activeSearch, page);
// // // //   };

// // // //   const getFlattenedData = () => {
// // // //     const flattened = [];
// // // //     data.forEach(transfer => {
// // // //       if (transfer.products && transfer.products.length > 0) {
// // // //         transfer.products.forEach(product => {
// // // //           flattened.push({
// // // //             ...transfer,
// // // //             productDetail: product,
// // // //             uniqueKey: `${transfer._id}_${product._id}`
// // // //           });
// // // //         });
// // // //       } else {
// // // //         flattened.push({
// // // //           ...transfer,
// // // //           productDetail: null,
// // // //           uniqueKey: `${transfer._id}_no_product`
// // // //         });
// // // //       }
// // // //     });
// // // //     return flattened;
// // // //   };

// // // //   const calculateTotals = () => {
// // // //     const totals = {
// // // //       totalRequestedQty: 0,
// // // //       totalApprovedQty: 0,
// // // //       totalReceivedQty: 0
// // // //     };

// // // //     getFlattenedData().forEach(item => {
// // // //       if (item.productDetail) {
// // // //         totals.totalRequestedQty += parseFloat(item.productDetail.quantity || 0);
// // // //         totals.totalApprovedQty += parseFloat(item.productDetail.approvedQuantity || 0);
// // // //         totals.totalReceivedQty += parseFloat(item.productDetail.receivedQuantity || 0);
// // // //       }
// // // //     });

// // // //     return totals;
// // // //   };

// // // //   const handleSort = (key) => {
// // // //     let direction = 'ascending';
// // // //     if (sortConfig.key === key && sortConfig.direction === 'ascending') {
// // // //       direction = 'descending';
// // // //     }
// // // //     setSortConfig({ key, direction });

// // // //     const sortedData = [...data].sort((a, b) => {
// // // //       let aValue = a;
// // // //       let bValue = b;
      
// // // //       if (key.includes('.')) {
// // // //         const keys = key.split('.');
// // // //         aValue = keys.reduce((obj, k) => obj && obj[k], a);
// // // //         bValue = keys.reduce((obj, k) => obj && obj[k], b);
// // // //       } else {
// // // //         aValue = a[key];
// // // //         bValue = b[key];
// // // //       }
      
// // // //       if (aValue < bValue) {
// // // //         return direction === 'ascending' ? -1 : 1;
// // // //       }
// // // //       if (aValue > bValue) {
// // // //         return direction === 'ascending' ? 1 : -1;
// // // //       }
// // // //       return 0;
// // // //     });

// // // //     setData(sortedData);
// // // //   };

// // // //   const getSortIcon = (key) => {
// // // //     if (sortConfig.key !== key) {
// // // //       return null;
// // // //     }
// // // //     return sortConfig.direction === 'ascending'
// // // //       ? <CIcon icon={cilArrowTop} className="ms-1" />
// // // //       : <CIcon icon={cilArrowBottom} className="ms-1" />;
// // // //   };

// // // //   const handleSearch = (searchData) => {
// // // //     const mergedSearchData = {
// // // //       ...activeSearch,
// // // //       ...searchData
// // // //     };
// // // //     setActiveSearch(mergedSearchData);
// // // //     fetchData(mergedSearchData, 1);
// // // //   };

// // // //   const handleResetSearch = () => {
// // // //     setActiveSearch({ 
// // // //       center: '', 
// // // //       product: '', 
// // // //       startDate: '', 
// // // //       endDate: ''
// // // //     });
// // // //     setSearchTerm('');
// // // //     fetchData({}, 1);
// // // //   };

// // // //   const isSearchActive = () => {
// // // //     return activeSearch.center || 
// // // //            activeSearch.product || 
// // // //            activeSearch.startDate || 
// // // //            activeSearch.endDate
// // // //   };

// // // //   const filteredFlattenedData = getFlattenedData().filter(item => {
// // // //     if (isSearchActive()) {
// // // //       return true;
// // // //     }
// // // //     return Object.values(item).some(value => {
// // // //       if (typeof value === 'object' && value !== null) {
// // // //         return Object.values(value).some(nestedValue => 
// // // //           nestedValue && nestedValue.toString().toLowerCase().includes(searchTerm.toLowerCase())
// // // //         );
// // // //       }
// // // //       return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase());
// // // //     });
// // // //   });

// // // //   if (loading) {
// // // //     return (
// // // //       <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
// // // //         <CSpinner color="primary" />
// // // //       </div>
// // // //     );
// // // //   }

// // // //   if (error) {
// // // //     return (
// // // //       <div className="alert alert-danger" role="alert">
// // // //         Error loading data: {error}
// // // //       </div>
// // // //     );
// // // //   }

// // // //   const totals = calculateTotals();

// // // //   const generateDetailExport = async () => {
// // // //     try {
// // // //       setLoading(true);
// // // //       const params = new URLSearchParams();
  
// // // //       if (activeSearch.center) {
// // // //         params.append('center', activeSearch.center);
// // // //       }
// // // //       if (activeSearch.product) {
// // // //         params.append('product', activeSearch.product);
// // // //       }
// // // //       if (activeSearch.date && activeSearch.date.includes(' to ')) {
// // // //         const [startDateStr, endDateStr] = activeSearch.date.split(' to ');
// // // //         const convertDateFormat = (dateStr) => {
// // // //           const [day, month, year] = dateStr.split('-');
// // // //           return `${year}-${month}-${day}`;
// // // //         };
        
// // // //         params.append('startDate', convertDateFormat(startDateStr));
// // // //         params.append('endDate', convertDateFormat(endDateStr));
// // // //       }
      
// // // //       const apiUrl = params.toString() 
// // // //         ? `/reports/transfers?${params.toString()}` 
// // // //         : '/reports/transfers';
      
// // // //       const response = await axiosInstance.get(apiUrl);
      
// // // //       if (!response.data.success) {
// // // //         throw new Error('API returned unsuccessful response');
// // // //       }
  
// // // //       const exportData = response.data.data;
      
// // // //       if (!exportData || exportData.length === 0) {
// // // //         showError('No data available for export');
// // // //         return;
// // // //       }
  
// // // //       const headers = [
// // // //         'Invoice No.',
// // // //         'Date',
// // // //         'Center',
// // // //         'Parent Center',
// // // //         'Product',
// // // //         'Quantity',
// // // //         'Center Stock',
// // // //         'Parent Stock',
// // // //         'Product Remark',
// // // //         'Approved Quantity',
// // // //         'Approved Remark',
// // // //         'Received Qty.',
// // // //         'Received Remark'
// // // //       ];
  
// // // //       const csvData = exportData.flatMap(transfer => {
// // // //         if (transfer.products && transfer.products.length > 0) {
// // // //           return transfer.products.map(product => [
// // // //             transfer.transferNumber || 'N/A',
// // // //             formatDate(transfer.date),
// // // //             transfer.fromCenter?.centerName || 'N/A',
// // // //             transfer.toCenter?.centerName || 'N/A',
// // // //             product.product?.productTitle || 'N/A',
// // // //             product.quantity || 0,
// // // //             product.fromCenterStock?.availableQuantity || 0,
// // // //             product.toCenterStock?.availableQuantity || 0,
// // // //             product.productRemark || '',
// // // //             product.approvedQuantity || 0,
// // // //             product.approvedRemark || '',
// // // //             product.receivedQuantity || 0,
// // // //             product.receivedRemark || '',
// // // //           ]);
// // // //         } else {
// // // //           return [[
// // // //             transfer.transferNumber || 'N/A',
// // // //             formatDate(transfer.date),
// // // //             transfer.fromCenter?.centerName || 'N/A',
// // // //             transfer.toCenter?.centerName || 'N/A',
// // // //             'No Product',
// // // //             0,
// // // //             0,
// // // //             0,
// // // //             '',
// // // //             0,
// // // //             '',
// // // //             0,
// // // //             '',
// // // //           ]];
// // // //         }
// // // //       });
  
// // // //       const csvContent = [
// // // //         headers.join(','),
// // // //         ...csvData.map(row => 
// // // //           row.map(field => {
// // // //             const stringField = String(field || '');
// // // //             return `"${stringField.replace(/"/g, '""')}"`;
// // // //           }).join(',')
// // // //         )
// // // //       ].join('\n');
  
// // // //       const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
// // // //       const link = document.createElement('a');
// // // //       const downloadUrl = URL.createObjectURL(blob);
      
// // // //       link.setAttribute('href', downloadUrl);
// // // //       link.setAttribute('download', `transfer_detail_report_${new Date().toISOString().split('T')[0]}.csv`);
// // // //       link.style.visibility = 'hidden';
      
// // // //       document.body.appendChild(link);
// // // //       link.click();
// // // //       document.body.removeChild(link);
// // // //       URL.revokeObjectURL(downloadUrl);
    
// // // //     } catch (error) {
// // // //       console.error('Error generating export:', error);
// // // //       showError('Error generating export file');
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   return (
// // // //     <div>
// // // //       <div className='title'>Transfer Detail Report</div>
// // // //       <CommonSearch
// // // //         visible={searchModalVisible}
// // // //         onClose={() => setSearchModalVisible(false)}
// // // //         onSearch={handleSearch}
// // // //         centers={centers}
// // // //         products={products}
// // // //       />
// // // //       <CCard className='table-container mt-4'>
// // // //         <CCardHeader className='card-header d-flex justify-content-between align-items-center'>
// // // //           <div>
// // // //             <CButton 
// // // //               size="sm" 
// // // //               className="action-btn me-1"
// // // //               onClick={() => setSearchModalVisible(true)}
// // // //             >
// // // //               <CIcon icon={cilSearch} className='icon' /> Search
// // // //             </CButton>
// // // //             {isSearchActive() && (
// // // //               <CButton 
// // // //                 size="sm" 
// // // //                 color="secondary" 
// // // //                 className="action-btn me-1"
// // // //                 onClick={handleResetSearch}
// // // //               >
// // // //                <CIcon icon={cilZoomOut} className='icon' />
// // // //                 Reset Search
// // // //               </CButton>
// // // //             )}
// // // //             <CButton 
// // // //               size="sm" 
// // // //               className="action-btn me-1"
// // // //               onClick={generateDetailExport}
// // // //             >
// // // //               <i className="fa fa-fw fa-file-excel"></i>
// // // //                Export
// // // //             </CButton>
// // // //           </div>
          
// // // //           <div>
// // // //             <Pagination
// // // //               currentPage={currentPage}
// // // //               totalPages={totalPages}
// // // //               onPageChange={handlePageChange}
// // // //             />
// // // //           </div>
// // // //         </CCardHeader>
        
// // // //         <CCardBody>
// // // //           <div className="d-flex justify-content-between mb-3">
// // // //             <div>
// // // //             </div>
// // // //             <div className='d-flex'>
// // // //               <CFormLabel className='mt-1 m-1'>Search:</CFormLabel>
// // // //               <CFormInput
// // // //                 type="text"
// // // //                 style={{maxWidth: '350px', height: '30px', borderRadius: '0'}}
// // // //                 className="d-inline-block square-search"
// // // //                 value={searchTerm}
// // // //                 onChange={(e) => setSearchTerm(e.target.value)}
// // // //               />
// // // //             </div>
// // // //           </div>
          
// // // //           <div className="responsive-table-wrapper">
// // // //             <CTable striped bordered hover className='responsive-table'>
// // // //               <CTableHead>
// // // //                 <CTableRow>
// // // //                   <CTableHeaderCell scope="col" onClick={() => handleSort('transferNumber')} className="sortable-header">
// // // //                   Indent No {getSortIcon('transferNumber')}
// // // //                   </CTableHeaderCell>
// // // //                   <CTableHeaderCell scope="col" onClick={() => handleSort('date')} className="sortable-header">
// // // //                     Date {getSortIcon('date')}
// // // //                   </CTableHeaderCell>
// // // //                   <CTableHeaderCell scope="col" onClick={() => handleSort('fromCenter.centerName')} className="sortable-header">
// // // //                    Branch {getSortIcon('fromCenter.centerName')}
// // // //                   </CTableHeaderCell>
// // // //                   <CTableHeaderCell scope="col" onClick={() => handleSort('toCenter.centerName')} className="sortable-header">
// // // //                     Parent Branch {getSortIcon('toCenter.centerName')}
// // // //                   </CTableHeaderCell>
// // // //                   <CTableHeaderCell scope="col" onClick={() => handleSort('productDetail.product.productTitle')} className="sortable-header">
// // // //                     Product {getSortIcon('productDetail.product.productTitle')}
// // // //                   </CTableHeaderCell>
// // // //                   <CTableHeaderCell scope="col" onClick={() => handleSort('productDetail.quantity')} className="sortable-header">
// // // //                     Requested Qty {getSortIcon('productDetail.quantity')}
// // // //                   </CTableHeaderCell>
// // // //                   <CTableHeaderCell scope="col" onClick={() => handleSort('productDetail.toCenterStock.availableQuantity')} className="sortable-header">
// // // //                    Center Stock {getSortIcon('productDetail.toCenterStock.availableQuantity')}
// // // //                   </CTableHeaderCell>
// // // //                   <CTableHeaderCell scope="col" onClick={() => handleSort('productDetail.fromCenterStock.availableQuantity')} className="sortable-header">
// // // //                     Parent Stock {getSortIcon('productDetail.fromCenterStock.availableQuantity')}
// // // //                   </CTableHeaderCell>
// // // //                   <CTableHeaderCell scope="col" onClick={() => handleSort('productDetail.approvedQuantity')} className="sortable-header">
// // // //                     Approved Qty {getSortIcon('productDetail.approvedQuantity')}
// // // //                   </CTableHeaderCell>
// // // //                   <CTableHeaderCell scope="col" onClick={() => handleSort('productDetail.receivedQuantity')} className="sortable-header">
// // // //                     Received Qty {getSortIcon('productDetail.receivedQuantity')}
// // // //                   </CTableHeaderCell>
// // // //                 </CTableRow>
// // // //               </CTableHead>
// // // //               <CTableBody>
// // // //                 {filteredFlattenedData.length > 0 ? (
// // // //                   <>
// // // //                     {filteredFlattenedData.map((item) => (
// // // //                       <CTableRow key={item.uniqueKey}>
// // // //                         <CTableDataCell>{item.transferNumber || ''}</CTableDataCell>
// // // //                         <CTableDataCell>{formatDate(item.date || '')}</CTableDataCell>
// // // //                         <CTableDataCell>{item.toCenter?.centerName || ''}</CTableDataCell>
// // // //                         <CTableDataCell>{item.fromCenter?.centerName || ''}</CTableDataCell>
// // // //                         <CTableDataCell>
// // // //                           {item.productDetail?.product?.productTitle || 'No Product'}
// // // //                         </CTableDataCell>
// // // //                         <CTableDataCell>
// // // //                           {item.productDetail?.quantity || 0}
// // // //                         </CTableDataCell>
// // // //                         <CTableDataCell>
// // // //                           {item.productDetail?.toCenterStock?.availableQuantity || 0}
// // // //                         </CTableDataCell>
// // // //                         <CTableDataCell>
// // // //                           {item.productDetail?.fromCenterStock?.availableQuantity || 0}
// // // //                         </CTableDataCell>
// // // //                         <CTableDataCell>
// // // //                           {item.productDetail?.approvedQuantity || 0}
// // // //                         </CTableDataCell>
// // // //                         <CTableDataCell>
// // // //                           {item.productDetail?.receivedQuantity || 0}
// // // //                         </CTableDataCell>
// // // //                       </CTableRow>
// // // //                     ))}
// // // //                     <CTableRow className='total-row'>
// // // //                       <CTableDataCell colSpan="5">Total</CTableDataCell>
// // // //                       <CTableDataCell>{totals.totalRequestedQty}</CTableDataCell>
// // // //                       <CTableDataCell></CTableDataCell>
// // // //                       <CTableDataCell></CTableDataCell>
// // // //                       <CTableDataCell>{totals.totalApprovedQty}</CTableDataCell>
// // // //                       <CTableDataCell>{totals.totalReceivedQty}</CTableDataCell>
// // // //                     </CTableRow>
// // // //                   </>
// // // //                 ) : (
// // // //                   <CTableRow>
// // // //                     <CTableDataCell colSpan="11" className="text-center">
// // // //                       No data found
// // // //                     </CTableDataCell>
// // // //                   </CTableRow>
// // // //                 )}
// // // //               </CTableBody>
// // // //             </CTable>
// // // //           </div>
// // // //         </CCardBody>
// // // //       </CCard>
// // // //     </div>
// // // //   );
// // // // };

// // // // export default TransferDetail;







// // // import '../../css/table.css';
// // // import '../../css/form.css';
// // // import React, { useState, useEffect } from 'react';
// // // import {
// // //   CTable,
// // //   CTableHead,
// // //   CTableRow,
// // //   CTableHeaderCell,
// // //   CTableBody,
// // //   CTableDataCell,
// // //   CCard,
// // //   CCardBody,
// // //   CCardHeader,
// // //   CButton,
// // //   CFormInput,
// // //   CSpinner
// // // } from '@coreui/react';
// // // import CIcon from '@coreui/icons-react';
// // // import { cilArrowTop, cilArrowBottom, cilSearch, cilZoomOut } from '@coreui/icons';
// // // import { CFormLabel } from '@coreui/react-pro';
// // // import axiosInstance from 'src/axiosInstance';
// // // import Pagination from 'src/utils/Pagination';
// // // import { showError } from 'src/utils/sweetAlerts';
// // // import { formatDate} from 'src/utils/FormatDateTime';
// // // import CommonSearch from './CommonSearch';
// // // import { useLocation } from 'react-router-dom';

// // // const TransferDetail = () => {
// // //   const [data, setData] = useState([]);
// // //   const [centers, setCenters] = useState([]);
// // //   const [products, setProducts] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);
// // //   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
// // //   const [searchTerm, setSearchTerm] = useState('');
// // //   const [searchModalVisible, setSearchModalVisible] = useState(false);
// // //   const [activeSearch, setActiveSearch] = useState({ 
// // //     center: '', 
// // //     product: '', 
// // //     startDate: '', 
// // //     endDate: ''
// // //   });
// // //   const [currentPage, setCurrentPage] = useState(1);
// // //   const [totalPages, setTotalPages] = useState(1);
// // //   const location = useLocation();

// // //   // Helper function to convert DD-MM-YYYY to YYYY-MM-DD for API
// // //   const convertToYYYYMMDD = (dateStr) => {
// // //     if (!dateStr) return '';
// // //     // If already in YYYY-MM-DD format, return as is
// // //     if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
// // //       return dateStr;
// // //     }
// // //     // Convert from DD-MM-YYYY to YYYY-MM-DD
// // //     const parts = dateStr.split('-');
// // //     if (parts.length === 3) {
// // //       const [day, month, year] = parts;
// // //       return `${year}-${month}-${day}`;
// // //     }
// // //     return dateStr;
// // //   };

// // //   const getUrlParams = () => {
// // //     const searchParams = new URLSearchParams(location.search);
// // //     return {
// // //       product: searchParams.get('product'),
// // //       center: searchParams.get('center'),
// // //       productName: searchParams.get('productName'),
// // //       centerName: searchParams.get('centerName'),
// // //       month: searchParams.get('month'),
// // //       transferType: searchParams.get('transferType')
// // //     };
// // //   };
  
// // //   useEffect(() => {
// // //     const initializeData = async () => {
// // //       try {
// // //         setLoading(true);
// // //         const urlParams = getUrlParams();
        
// // //         console.log('Transfer Detail URL Parameters:', urlParams);

// // //         await Promise.all([fetchCenters(), fetchProducts()]);
        
// // //         let searchParams = {};

// // //         if (urlParams.product && urlParams.center) {
// // //           searchParams = {
// // //             product: urlParams.product,
// // //             center: urlParams.center,
// // //             startDate: '',
// // //             endDate: ''
// // //           };
// // //           if (urlParams.month) {
// // //             const [year, month] = urlParams.month.split('-');
// // //             const monthStart = `${year}-${month.padStart(2, '0')}-01`;
// // //             const lastDay = new Date(parseInt(year), parseInt(month), 0).getDate();
// // //             const monthEnd = `${year}-${month.padStart(2, '0')}-${lastDay}`;
            
// // //             // For URL params, we need YYYY-MM-DD format for the API
// // //             searchParams.startDate = monthStart;
// // //             searchParams.endDate = monthEnd;
// // //           }
          
// // //           console.log('Using filtered search from URL:', searchParams);
// // //           setActiveSearch(searchParams);
          
// // //           if (urlParams.productName && urlParams.centerName) {
// // //             const transferTypeText = urlParams.transferType === 'receive' ? 'Received' : 'Given';
// // //             document.title = `Transfer Details (${transferTypeText}) - ${decodeURIComponent(urlParams.productName)} at ${decodeURIComponent(urlParams.centerName)}`;
// // //           }
// // //         } else {
// // //           console.log('No URL parameters, fetching all data');
// // //           searchParams = {};
// // //         }
// // //         await fetchData(searchParams, 1);
        
// // //       } catch (error) {
// // //         console.error('Error initializing data:', error);
// // //         setError(error.message);
// // //       } finally {
// // //         setLoading(false);
// // //       }
// // //     };

// // //     initializeData();
// // //   }, [location.search]);

// // //  const fetchData = async (searchParams = {}, page = 1) => {
// // //   try {
// // //     setLoading(true);
// // //     setError(null);
// // //     const params = new URLSearchParams();

// // //     const urlParams = getUrlParams();
    
// // //     const centerId = urlParams.center || searchParams.center;
// // //     const productId = urlParams.product || searchParams.product;
// // //     const transferType = urlParams.transferType;

// // //     if (centerId) {
// // //       if (transferType === 'receive') {
// // //         params.append('toCenter', centerId);
// // //       } else if (transferType === 'given') {
// // //         params.append('fromCenter', centerId);
// // //       } else {
// // //         params.append('center', centerId);
// // //       }
// // //     }
    
// // //     if (productId) {
// // //       params.append('product', productId);
// // //     }
    
// // //     // Handle dates - convert from DD-MM-YYYY to YYYY-MM-DD for API
// // //     if (searchParams.startDate && searchParams.endDate) {
// // //       const convertedStartDate = convertToYYYYMMDD(searchParams.startDate);
// // //       const convertedEndDate = convertToYYYYMMDD(searchParams.endDate);
      
// // //       params.append('startDate', convertedStartDate);
// // //       params.append('endDate', convertedEndDate);
      
// // //       console.log('Original dates (DD-MM-YYYY):', searchParams.startDate, searchParams.endDate);
// // //       console.log('Converted dates (YYYY-MM-DD):', convertedStartDate, convertedEndDate);
// // //     }
    
// // //     // REMOVED the old date format code that was causing duplicates
// // //     // The old code that checked for searchParams.date has been removed
    
// // //     if (urlParams.month) {
// // //       const [year, month] = urlParams.month.split('-');
// // //       const monthStart = `${year}-${month.padStart(2, '0')}-01`;
// // //       const lastDay = new Date(parseInt(year), parseInt(month), 0).getDate();
// // //       const monthEnd = `${year}-${month.padStart(2, '0')}-${lastDay}`;
      
// // //       params.append('startDate', monthStart);
// // //       params.append('endDate', monthEnd);
// // //     }
    
// // //     params.append('page', page);
// // //     const url = params.toString() ? `/reports/transfers?${params.toString()}` : '/reports/transfers';
// // //     console.log('Fetching URL:', url);
// // //     const response = await axiosInstance.get(url);
    
// // //     if (response.data.success) {
// // //       setData(response.data.data);
// // //       setCurrentPage(response.data.pagination.currentPage);
// // //       setTotalPages(response.data.pagination.totalPages);
// // //     } else {
// // //       const errorMessage = response.data.message || 'API returned unsuccessful response';
// // //       setError(errorMessage);
// // //       console.error('Backend error:', response.data);
// // //     }
// // //   } catch (err) {
// // //     if (err.response) {
// // //       const errorMessage = err.response.data?.message || 
// // //                           err.response.data?.error || 
// // //                           `Error ${err.response.status}: ${err.response.statusText}`;
// // //       setError(errorMessage);
// // //       console.error('Error response:', err.response.data);
// // //     } else if (err.request) {
// // //       setError('No response received from server. Please check your network connection.');
// // //       console.error('Error request:', err.request);
// // //     } else {
// // //       setError(err.message || 'An error occurred while fetching data');
// // //       console.error('Error message:', err.message);
// // //     }
// // //   } finally {
// // //     setLoading(false);
// // //   }
// // // };
  
// // //   const fetchCenters = async () => {
// // //     try {
// // //       const response = await axiosInstance.get('/centers');
// // //       if (response.data.success) {
// // //         setCenters(response.data.data);
// // //       }
// // //     } catch (error) {
// // //       console.error('Error fetching data:', error);
// // //     }
// // //   };

// // //   const fetchProducts = async () => {
// // //     try {
// // //       const response = await axiosInstance.get('/products/all');
// // //       if (response.data.success) {
// // //         setProducts(response.data.data);
// // //       }
// // //     } catch (error) {
// // //       console.error('Error fetching data:', error);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchData();
// // //     fetchCenters();
// // //     fetchProducts();
// // //   }, []);

// // //   const handlePageChange = (page) => {
// // //     if (page < 1 || page > totalPages) return;
// // //     fetchData(activeSearch, page);
// // //   };

// // //   const getFlattenedData = () => {
// // //     const flattened = [];
// // //     data.forEach(transfer => {
// // //       if (transfer.products && transfer.products.length > 0) {
// // //         transfer.products.forEach(product => {
// // //           flattened.push({
// // //             ...transfer,
// // //             productDetail: product,
// // //             uniqueKey: `${transfer._id}_${product._id}`
// // //           });
// // //         });
// // //       } else {
// // //         flattened.push({
// // //           ...transfer,
// // //           productDetail: null,
// // //           uniqueKey: `${transfer._id}_no_product`
// // //         });
// // //       }
// // //     });
// // //     return flattened;
// // //   };

// // //   const calculateTotals = () => {
// // //     const totals = {
// // //       totalRequestedQty: 0,
// // //       totalApprovedQty: 0,
// // //       totalReceivedQty: 0
// // //     };

// // //     getFlattenedData().forEach(item => {
// // //       if (item.productDetail) {
// // //         totals.totalRequestedQty += parseFloat(item.productDetail.quantity || 0);
// // //         totals.totalApprovedQty += parseFloat(item.productDetail.approvedQuantity || 0);
// // //         totals.totalReceivedQty += parseFloat(item.productDetail.receivedQuantity || 0);
// // //       }
// // //     });

// // //     return totals;
// // //   };

// // //   const handleSort = (key) => {
// // //     let direction = 'ascending';
// // //     if (sortConfig.key === key && sortConfig.direction === 'ascending') {
// // //       direction = 'descending';
// // //     }
// // //     setSortConfig({ key, direction });

// // //     const sortedData = [...data].sort((a, b) => {
// // //       let aValue = a;
// // //       let bValue = b;
      
// // //       if (key.includes('.')) {
// // //         const keys = key.split('.');
// // //         aValue = keys.reduce((obj, k) => obj && obj[k], a);
// // //         bValue = keys.reduce((obj, k) => obj && obj[k], b);
// // //       } else {
// // //         aValue = a[key];
// // //         bValue = b[key];
// // //       }
      
// // //       if (aValue < bValue) {
// // //         return direction === 'ascending' ? -1 : 1;
// // //       }
// // //       if (aValue > bValue) {
// // //         return direction === 'ascending' ? 1 : -1;
// // //       }
// // //       return 0;
// // //     });

// // //     setData(sortedData);
// // //   };

// // //   const getSortIcon = (key) => {
// // //     if (sortConfig.key !== key) {
// // //       return null;
// // //     }
// // //     return sortConfig.direction === 'ascending'
// // //       ? <CIcon icon={cilArrowTop} className="ms-1" />
// // //       : <CIcon icon={cilArrowBottom} className="ms-1" />;
// // //   };

// // //   const handleSearch = (searchData) => {
// // //     const mergedSearchData = {
// // //       ...activeSearch,
// // //       ...searchData
// // //     };
// // //     setActiveSearch(mergedSearchData);
// // //     fetchData(mergedSearchData, 1);
// // //   };

// // //   const handleResetSearch = () => {
// // //     setActiveSearch({ 
// // //       center: '', 
// // //       product: '', 
// // //       startDate: '', 
// // //       endDate: ''
// // //     });
// // //     setSearchTerm('');
// // //     fetchData({}, 1);
// // //   };

// // //   const isSearchActive = () => {
// // //     return activeSearch.center || 
// // //            activeSearch.product || 
// // //            activeSearch.startDate || 
// // //            activeSearch.endDate;
// // //   };

// // //   const filteredFlattenedData = getFlattenedData().filter(item => {
// // //     if (isSearchActive()) {
// // //       return true;
// // //     }
// // //     return Object.values(item).some(value => {
// // //       if (typeof value === 'object' && value !== null) {
// // //         return Object.values(value).some(nestedValue => 
// // //           nestedValue && nestedValue.toString().toLowerCase().includes(searchTerm.toLowerCase())
// // //         );
// // //       }
// // //       return value && value.toString().toLowerCase().includes(searchTerm.toLowerCase());
// // //     });
// // //   });

// // //   if (loading) {
// // //     return (
// // //       <div className="d-flex justify-content-center align-items-center" style={{ height: '50vh' }}>
// // //         <CSpinner color="primary" />
// // //       </div>
// // //     );
// // //   }

// // //   if (error) {
// // //     return (
// // //       <div className="alert alert-danger" role="alert">
// // //         Error loading data: {error}
// // //       </div>
// // //     );
// // //   }

// // //   const totals = calculateTotals();

// // //   const generateDetailExport = async () => {
// // //     try {
// // //       setLoading(true);
// // //       const params = new URLSearchParams();
  
// // //       if (activeSearch.center) {
// // //         params.append('center', activeSearch.center);
// // //       }
// // //       if (activeSearch.product) {
// // //         params.append('product', activeSearch.product);
// // //       }
      
// // //       // Convert dates from DD-MM-YYYY to YYYY-MM-DD for API
// // //       if (activeSearch.startDate && activeSearch.endDate) {
// // //         const convertedStartDate = convertToYYYYMMDD(activeSearch.startDate);
// // //         const convertedEndDate = convertToYYYYMMDD(activeSearch.endDate);
        
// // //         params.append('startDate', convertedStartDate);
// // //         params.append('endDate', convertedEndDate);
// // //       }
      
// // //       // Handle old date format for backward compatibility
// // //       if (activeSearch.date && activeSearch.date.includes(' to ')) {
// // //         const [startDateStr, endDateStr] = activeSearch.date.split(' to ');
// // //         const convertDateFormat = (dateStr) => {
// // //           const [day, month, year] = dateStr.split('-');
// // //           return `${year}-${month}-${day}`;
// // //         };
        
// // //         params.append('startDate', convertDateFormat(startDateStr));
// // //         params.append('endDate', convertDateFormat(endDateStr));
// // //       }
      
// // //       params.append('export', 'true');
// // //       const apiUrl = params.toString() 
// // //         ? `/reports/transfers?${params.toString()}` 
// // //         : '/reports/transfers';
      
// // //       const response = await axiosInstance.get(apiUrl);
      
// // //       if (!response.data.success) {
// // //         throw new Error('API returned unsuccessful response');
// // //       }
  
// // //       const exportData = response.data.data;
      
// // //       if (!exportData || exportData.length === 0) {
// // //         showError('No data available for export');
// // //         return;
// // //       }
  
// // //       const headers = [
// // //         'Invoice No.',
// // //         'Date',
// // //         'Center',
// // //         'Parent Center',
// // //         'Product',
// // //         'Quantity',
// // //         'Center Stock',
// // //         'Parent Stock',
// // //         'Product Remark',
// // //         'Approved Quantity',
// // //         'Approved Remark',
// // //         'Received Qty.',
// // //         'Received Remark'
// // //       ];
  
// // //       const csvData = exportData.flatMap(transfer => {
// // //         if (transfer.products && transfer.products.length > 0) {
// // //           return transfer.products.map(product => [
// // //             transfer.transferNumber || 'N/A',
// // //             formatDate(transfer.date),
// // //             transfer.fromCenter?.centerName || 'N/A',
// // //             transfer.toCenter?.centerName || 'N/A',
// // //             product.product?.productTitle || 'N/A',
// // //             product.quantity || 0,
// // //             product.fromCenterStock?.availableQuantity || 0,
// // //             product.toCenterStock?.availableQuantity || 0,
// // //             product.productRemark || '',
// // //             product.approvedQuantity || 0,
// // //             product.approvedRemark || '',
// // //             product.receivedQuantity || 0,
// // //             product.receivedRemark || '',
// // //           ]);
// // //         } else {
// // //           return [[
// // //             transfer.transferNumber || 'N/A',
// // //             formatDate(transfer.date),
// // //             transfer.fromCenter?.centerName || 'N/A',
// // //             transfer.toCenter?.centerName || 'N/A',
// // //             'No Product',
// // //             0,
// // //             0,
// // //             0,
// // //             '',
// // //             0,
// // //             '',
// // //             0,
// // //             '',
// // //           ]];
// // //         }
// // //       });
  
// // //       const csvContent = [
// // //         headers.join(','),
// // //         ...csvData.map(row => 
// // //           row.map(field => {
// // //             const stringField = String(field || '');
// // //             return `"${stringField.replace(/"/g, '""')}"`;
// // //           }).join(',')
// // //         )
// // //       ].join('\n');
  
// // //       const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
// // //       const link = document.createElement('a');
// // //       const downloadUrl = URL.createObjectURL(blob);
      
// // //       link.setAttribute('href', downloadUrl);
// // //       link.setAttribute('download', `transfer_detail_report_${new Date().toISOString().split('T')[0]}.csv`);
// // //       link.style.visibility = 'hidden';
      
// // //       document.body.appendChild(link);
// // //       link.click();
// // //       document.body.removeChild(link);
// // //       URL.revokeObjectURL(downloadUrl);
    
// // //     } catch (error) {
// // //       console.error('Error generating export:', error);
// // //       showError('Error generating export file');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div>
// // //       <div className='title'>Transfer Detail Report</div>
// // //       <CommonSearch
// // //         visible={searchModalVisible}
// // //         onClose={() => setSearchModalVisible(false)}
// // //         onSearch={handleSearch}
// // //         centers={centers}
// // //         products={products}
// // //       />
// // //       <CCard className='table-container mt-4'>
// // //         <CCardHeader className='card-header d-flex justify-content-between align-items-center'>
// // //           <div>
// // //             <CButton 
// // //               size="sm" 
// // //               className="action-btn me-1"
// // //               onClick={() => setSearchModalVisible(true)}
// // //             >
// // //               <CIcon icon={cilSearch} className='icon' /> Search
// // //             </CButton>
// // //             {isSearchActive() && (
// // //               <CButton 
// // //                 size="sm" 
// // //                 color="secondary" 
// // //                 className="action-btn me-1"
// // //                 onClick={handleResetSearch}
// // //               >
// // //                <CIcon icon={cilZoomOut} className='icon' />
// // //                 Reset Search
// // //               </CButton>
// // //             )}
// // //             <CButton 
// // //               size="sm" 
// // //               className="action-btn me-1"
// // //               onClick={generateDetailExport}
// // //             >
// // //               <i className="fa fa-fw fa-file-excel"></i>
// // //                Export
// // //             </CButton>
// // //           </div>
          
// // //           <div>
// // //             <Pagination
// // //               currentPage={currentPage}
// // //               totalPages={totalPages}
// // //               onPageChange={handlePageChange}
// // //             />
// // //           </div>
// // //         </CCardHeader>
        
// // //         <CCardBody>
// // //           <div className="d-flex justify-content-between mb-3">
// // //             <div>
// // //             </div>
// // //             <div className='d-flex'>
// // //               <CFormLabel className='mt-1 m-1'>Search:</CFormLabel>
// // //               <CFormInput
// // //                 type="text"
// // //                 style={{maxWidth: '350px', height: '30px', borderRadius: '0'}}
// // //                 className="d-inline-block square-search"
// // //                 value={searchTerm}
// // //                 onChange={(e) => setSearchTerm(e.target.value)}
// // //               />
// // //             </div>
// // //           </div>
          
// // //           <div className="responsive-table-wrapper">
// // //             <CTable striped bordered hover className='responsive-table'>
// // //               <CTableHead>
// // //                 <CTableRow>
// // //                   <CTableHeaderCell scope="col" onClick={() => handleSort('transferNumber')} className="sortable-header">
// // //                   Indent No {getSortIcon('transferNumber')}
// // //                   </CTableHeaderCell>
// // //                   <CTableHeaderCell scope="col" onClick={() => handleSort('date')} className="sortable-header">
// // //                     Date {getSortIcon('date')}
// // //                   </CTableHeaderCell>
// // //                   <CTableHeaderCell scope="col" onClick={() => handleSort('fromCenter.centerName')} className="sortable-header">
// // //                    Branch {getSortIcon('fromCenter.centerName')}
// // //                   </CTableHeaderCell>
// // //                   <CTableHeaderCell scope="col" onClick={() => handleSort('toCenter.centerName')} className="sortable-header">
// // //                     Parent Branch {getSortIcon('toCenter.centerName')}
// // //                   </CTableHeaderCell>
// // //                   <CTableHeaderCell scope="col" onClick={() => handleSort('productDetail.product.productTitle')} className="sortable-header">
// // //                     Product {getSortIcon('productDetail.product.productTitle')}
// // //                   </CTableHeaderCell>
// // //                   <CTableHeaderCell scope="col" onClick={() => handleSort('productDetail.quantity')} className="sortable-header">
// // //                     Requested Qty {getSortIcon('productDetail.quantity')}
// // //                   </CTableHeaderCell>
// // //                   <CTableHeaderCell scope="col" onClick={() => handleSort('productDetail.toCenterStock.availableQuantity')} className="sortable-header">
// // //                    Center Stock {getSortIcon('productDetail.toCenterStock.availableQuantity')}
// // //                   </CTableHeaderCell>
// // //                   <CTableHeaderCell scope="col" onClick={() => handleSort('productDetail.fromCenterStock.availableQuantity')} className="sortable-header">
// // //                     Parent Stock {getSortIcon('productDetail.fromCenterStock.availableQuantity')}
// // //                   </CTableHeaderCell>
// // //                   <CTableHeaderCell scope="col" onClick={() => handleSort('productDetail.approvedQuantity')} className="sortable-header">
// // //                     Approved Qty {getSortIcon('productDetail.approvedQuantity')}
// // //                   </CTableHeaderCell>
// // //                   <CTableHeaderCell scope="col" onClick={() => handleSort('productDetail.receivedQuantity')} className="sortable-header">
// // //                     Received Qty {getSortIcon('productDetail.receivedQuantity')}
// // //                   </CTableHeaderCell>
// // //                 </CTableRow>
// // //               </CTableHead>
// // //               <CTableBody>
// // //                 {filteredFlattenedData.length > 0 ? (
// // //                   <>
// // //                     {filteredFlattenedData.map((item) => (
// // //                       <CTableRow key={item.uniqueKey}>
// // //                         <CTableDataCell>{item.transferNumber || ''}</CTableDataCell>
// // //                         <CTableDataCell>{formatDate(item.date || '')}</CTableDataCell>
// // //                         <CTableDataCell>{item.toCenter?.centerName || ''}</CTableDataCell>
// // //                         <CTableDataCell>{item.fromCenter?.centerName || ''}</CTableDataCell>
// // //                         <CTableDataCell>
// // //                           {item.productDetail?.product?.productTitle || 'No Product'}
// // //                         </CTableDataCell>
// // //                         <CTableDataCell>
// // //                           {item.productDetail?.quantity || 0}
// // //                         </CTableDataCell>
// // //                         <CTableDataCell>
// // //                           {item.productDetail?.toCenterStock?.availableQuantity || 0}
// // //                         </CTableDataCell>
// // //                         <CTableDataCell>
// // //                           {item.productDetail?.fromCenterStock?.availableQuantity || 0}
// // //                         </CTableDataCell>
// // //                         <CTableDataCell>
// // //                           {item.productDetail?.approvedQuantity || 0}
// // //                         </CTableDataCell>
// // //                         <CTableDataCell>
// // //                           {item.productDetail?.receivedQuantity || 0}
// // //                         </CTableDataCell>
// // //                       </CTableRow>
// // //                     ))}
// // //                     <CTableRow className='total-row'>
// // //                       <CTableDataCell colSpan="5">Total</CTableDataCell>
// // //                       <CTableDataCell>{totals.totalRequestedQty}</CTableDataCell>
// // //                       <CTableDataCell></CTableDataCell>
// // //                       <CTableDataCell></CTableDataCell>
// // //                       <CTableDataCell>{totals.totalApprovedQty}</CTableDataCell>
// // //                       <CTableDataCell>{totals.totalReceivedQty}</CTableDataCell>
// // //                     </CTableRow>
// // //                   </>
// // //                 ) : (
// // //                   <CTableRow>
// // //                     <CTableDataCell colSpan="11" className="text-center">
// // //                       No data found
// // //                     </CTableDataCell>
// // //                   </CTableRow>
// // //                 )}
// // //               </CTableBody>
// // //             </CTable>
// // //           </div>
// // //         </CCardBody>
// // //       </CCard>
// // //     </div>
// // //   );
// // // };

// // // export default TransferDetail;



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
// // import { formatDate} from 'src/utils/FormatDateTime';
// // import CommonSearch from './CommonSearch';
// // import { useLocation, useNavigate } from 'react-router-dom';

// // const TransferDetail = () => {
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
// //     endDate: ''
// //   });
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [totalPages, setTotalPages] = useState(1);
// //   const location = useLocation();
// //   const navigate = useNavigate();

// //   // Helper function to convert DD-MM-YYYY to YYYY-MM-DD for API
// //   const convertToYYYYMMDD = (dateStr) => {
// //     if (!dateStr) return '';
// //     if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
// //       return dateStr;
// //     }
// //     const parts = dateStr.split('-');
// //     if (parts.length === 3) {
// //       const [day, month, year] = parts;
// //       return `${year}-${month}-${day}`;
// //     }
// //     return dateStr;
// //   };

// //   // Handler for clicking on product to navigate to Stock Request List
// //   const handleProductClick = (productId, productName, centerId, centerName) => {
// //     console.log('🔍 Clicking product:', { productId, productName, centerId, centerName });
    
// //     if (!productId) {
// //       console.warn('No product ID provided for navigation');
// //       return;
// //     }
    
// //     navigate('/stockRequest', { 
// //       state: { 
// //         productFilter: productId,
// //         productName: productName || 'Product',
// //         centerFilter: centerId || '',
// //         centerName: centerName || 'Center'
// //       } 
// //     });
// //   };

// //   const getUrlParams = () => {
// //     const searchParams = new URLSearchParams(location.search);
// //     return {
// //       product: searchParams.get('product'),
// //       center: searchParams.get('center'),
// //       productName: searchParams.get('productName'),
// //       centerName: searchParams.get('centerName'),
// //       month: searchParams.get('month'),
// //       transferType: searchParams.get('transferType')
// //     };
// //   };
  
// //   useEffect(() => {
// //     const initializeData = async () => {
// //       try {
// //         setLoading(true);
// //         const urlParams = getUrlParams();
        
// //         console.log('Transfer Detail URL Parameters:', urlParams);

// //         await Promise.all([fetchCenters(), fetchProducts()]);
        
// //         let searchParams = {};

// //         if (urlParams.product && urlParams.center) {
// //           searchParams = {
// //             product: urlParams.product,
// //             center: urlParams.center,
// //             startDate: '',
// //             endDate: ''
// //           };
// //           if (urlParams.month) {
// //             const [year, month] = urlParams.month.split('-');
// //             const monthStart = `${year}-${month.padStart(2, '0')}-01`;
// //             const lastDay = new Date(parseInt(year), parseInt(month), 0).getDate();
// //             const monthEnd = `${year}-${month.padStart(2, '0')}-${lastDay}`;
            
// //             searchParams.startDate = monthStart;
// //             searchParams.endDate = monthEnd;
// //           }
          
// //           console.log('Using filtered search from URL:', searchParams);
// //           setActiveSearch(searchParams);
          
// //           if (urlParams.productName && urlParams.centerName) {
// //             const transferTypeText = urlParams.transferType === 'receive' ? 'Received' : 'Given';
// //             document.title = `Transfer Details (${transferTypeText}) - ${decodeURIComponent(urlParams.productName)} at ${decodeURIComponent(urlParams.centerName)}`;
// //           }
// //         } else {
// //           console.log('No URL parameters, fetching all data');
// //           searchParams = {};
// //         }
// //         await fetchData(searchParams, 1);
        
// //       } catch (error) {
// //         console.error('Error initializing data:', error);
// //         setError(error.message);
// //       } finally {
// //         setLoading(false);
// //       }
// //     };

// //     initializeData();
// //   }, [location.search]);

// //   const fetchData = async (searchParams = {}, page = 1) => {
// //     try {
// //       setLoading(true);
// //       setError(null);
// //       const params = new URLSearchParams();

// //       const urlParams = getUrlParams();
      
// //       const centerId = urlParams.center || searchParams.center;
// //       const productId = urlParams.product || searchParams.product;
// //       const transferType = urlParams.transferType;

// //       if (centerId) {
// //         if (transferType === 'receive') {
// //           params.append('toCenter', centerId);
// //         } else if (transferType === 'given') {
// //           params.append('fromCenter', centerId);
// //         } else {
// //           params.append('center', centerId);
// //         }
// //       }
      
// //       if (productId) {
// //         params.append('product', productId);
// //       }
      
// //       if (searchParams.startDate && searchParams.endDate) {
// //         const convertedStartDate = convertToYYYYMMDD(searchParams.startDate);
// //         const convertedEndDate = convertToYYYYMMDD(searchParams.endDate);
        
// //         params.append('startDate', convertedStartDate);
// //         params.append('endDate', convertedEndDate);
        
// //         console.log('Original dates (DD-MM-YYYY):', searchParams.startDate, searchParams.endDate);
// //         console.log('Converted dates (YYYY-MM-DD):', convertedStartDate, convertedEndDate);
// //       }
      
// //       if (urlParams.month) {
// //         const [year, month] = urlParams.month.split('-');
// //         const monthStart = `${year}-${month.padStart(2, '0')}-01`;
// //         const lastDay = new Date(parseInt(year), parseInt(month), 0).getDate();
// //         const monthEnd = `${year}-${month.padStart(2, '0')}-${lastDay}`;
        
// //         params.append('startDate', monthStart);
// //         params.append('endDate', monthEnd);
// //       }
      
// //       params.append('page', page);
// //       const url = params.toString() ? `/reports/transfers?${params.toString()}` : '/reports/transfers';
// //       console.log('Fetching URL:', url);
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
// //       if (err.response) {
// //         const errorMessage = err.response.data?.message || 
// //                             err.response.data?.error || 
// //                             `Error ${err.response.status}: ${err.response.statusText}`;
// //         setError(errorMessage);
// //         console.error('Error response:', err.response.data);
// //       } else if (err.request) {
// //         setError('No response received from server. Please check your network connection.');
// //         console.error('Error request:', err.request);
// //       } else {
// //         setError(err.message || 'An error occurred while fetching data');
// //         console.error('Error message:', err.message);
// //       }
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
// //       console.error('Error fetching data:', error);
// //     }
// //   };

// //   const fetchProducts = async () => {
// //     try {
// //       const response = await axiosInstance.get('/products/all');
// //       if (response.data.success) {
// //         setProducts(response.data.data);
// //       }
// //     } catch (error) {
// //       console.error('Error fetching data:', error);
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

// //   const getFlattenedData = () => {
// //     const flattened = [];
// //     data.forEach(transfer => {
// //       if (transfer.products && transfer.products.length > 0) {
// //         transfer.products.forEach(product => {
// //           flattened.push({
// //             ...transfer,
// //             productDetail: product,
// //             uniqueKey: `${transfer._id}_${product._id}`
// //           });
// //         });
// //       } else {
// //         flattened.push({
// //           ...transfer,
// //           productDetail: null,
// //           uniqueKey: `${transfer._id}_no_product`
// //         });
// //       }
// //     });
// //     return flattened;
// //   };

// //   const calculateTotals = () => {
// //     const totals = {
// //       totalRequestedQty: 0,
// //       totalApprovedQty: 0,
// //       totalReceivedQty: 0
// //     };

// //     getFlattenedData().forEach(item => {
// //       if (item.productDetail) {
// //         totals.totalRequestedQty += parseFloat(item.productDetail.quantity || 0);
// //         totals.totalApprovedQty += parseFloat(item.productDetail.approvedQuantity || 0);
// //         totals.totalReceivedQty += parseFloat(item.productDetail.receivedQuantity || 0);
// //       }
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
// //       endDate: ''
// //     });
// //     setSearchTerm('');
// //     fetchData({}, 1);
// //   };

// //   const isSearchActive = () => {
// //     return activeSearch.center || 
// //            activeSearch.product || 
// //            activeSearch.startDate || 
// //            activeSearch.endDate;
// //   };

// //   const filteredFlattenedData = getFlattenedData().filter(item => {
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
// //         Error loading data: {error}
// //       </div>
// //     );
// //   }

// //   const totals = calculateTotals();

// //   const generateDetailExport = async () => {
// //     try {
// //       setLoading(true);
// //       const params = new URLSearchParams();
  
// //       if (activeSearch.center) {
// //         params.append('center', activeSearch.center);
// //       }
// //       if (activeSearch.product) {
// //         params.append('product', activeSearch.product);
// //       }
      
// //       if (activeSearch.startDate && activeSearch.endDate) {
// //         const convertedStartDate = convertToYYYYMMDD(activeSearch.startDate);
// //         const convertedEndDate = convertToYYYYMMDD(activeSearch.endDate);
        
// //         params.append('startDate', convertedStartDate);
// //         params.append('endDate', convertedEndDate);
// //       }
      
// //       if (activeSearch.date && activeSearch.date.includes(' to ')) {
// //         const [startDateStr, endDateStr] = activeSearch.date.split(' to ');
// //         const convertDateFormat = (dateStr) => {
// //           const [day, month, year] = dateStr.split('-');
// //           return `${year}-${month}-${day}`;
// //         };
        
// //         params.append('startDate', convertDateFormat(startDateStr));
// //         params.append('endDate', convertDateFormat(endDateStr));
// //       }
      
// //       params.append('export', 'true');
// //       const apiUrl = params.toString() 
// //         ? `/reports/transfers?${params.toString()}` 
// //         : '/reports/transfers';
      
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
// //         'Invoice No.',
// //         'Date',
// //         'Center',
// //         'Parent Center',
// //         'Product',
// //         'Quantity',
// //         'Center Stock',
// //         'Parent Stock',
// //         'Product Remark',
// //         'Approved Quantity',
// //         'Approved Remark',
// //         'Received Qty.',
// //         'Received Remark'
// //       ];
  
// //       const csvData = exportData.flatMap(transfer => {
// //         if (transfer.products && transfer.products.length > 0) {
// //           return transfer.products.map(product => [
// //             transfer.transferNumber || 'N/A',
// //             formatDate(transfer.date),
// //             transfer.fromCenter?.centerName || 'N/A',
// //             transfer.toCenter?.centerName || 'N/A',
// //             product.product?.productTitle || 'N/A',
// //             product.quantity || 0,
// //             product.fromCenterStock?.availableQuantity || 0,
// //             product.toCenterStock?.availableQuantity || 0,
// //             product.productRemark || '',
// //             product.approvedQuantity || 0,
// //             product.approvedRemark || '',
// //             product.receivedQuantity || 0,
// //             product.receivedRemark || '',
// //           ]);
// //         } else {
// //           return [[
// //             transfer.transferNumber || 'N/A',
// //             formatDate(transfer.date),
// //             transfer.fromCenter?.centerName || 'N/A',
// //             transfer.toCenter?.centerName || 'N/A',
// //             'No Product',
// //             0,
// //             0,
// //             0,
// //             '',
// //             0,
// //             '',
// //             0,
// //             '',
// //           ]];
// //         }
// //       });
  
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
// //       link.setAttribute('download', `transfer_detail_report_${new Date().toISOString().split('T')[0]}.csv`);
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
// //       <div className='title'>Transfer Detail Report</div>
// //       <CommonSearch
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
// //           <div className="d-flex justify-content-between mb-3">
// //             <div>
// //               {/* Display active filter chips */}
// //               {activeSearch.product && (
// //                 <span className="filter-chip me-2" style={{
// //                   display: 'inline-block',
// //                   background: '#e9ecef',
// //                   padding: '4px 12px',
// //                   borderRadius: '20px',
// //                   fontSize: '13px',
// //                   marginBottom: '8px'
// //                 }}>
// //                   Product: {products.find(p => p._id === activeSearch.product)?.productTitle || activeSearch.product.substring(0, 8)}
// //                   <button 
// //                     onClick={() => {
// //                       setActiveSearch(prev => ({ ...prev, product: '' }));
// //                       fetchData({ ...activeSearch, product: '' }, 1);
// //                     }}
// //                     style={{
// //                       border: 'none',
// //                       background: 'transparent',
// //                       marginLeft: '8px',
// //                       cursor: 'pointer',
// //                       color: '#dc3545'
// //                     }}
// //                   >
// //                     ×
// //                   </button>
// //                 </span>
// //               )}
// //               {activeSearch.center && (
// //                 <span className="filter-chip me-2" style={{
// //                   display: 'inline-block',
// //                   background: '#e9ecef',
// //                   padding: '4px 12px',
// //                   borderRadius: '20px',
// //                   fontSize: '13px',
// //                   marginBottom: '8px'
// //                 }}>
// //                   Center: {centers.find(c => c._id === activeSearch.center)?.centerName || activeSearch.center.substring(0, 8)}
// //                   <button 
// //                     onClick={() => {
// //                       setActiveSearch(prev => ({ ...prev, center: '' }));
// //                       fetchData({ ...activeSearch, center: '' }, 1);
// //                     }}
// //                     style={{
// //                       border: 'none',
// //                       background: 'transparent',
// //                       marginLeft: '8px',
// //                       cursor: 'pointer',
// //                       color: '#dc3545'
// //                     }}
// //                   >
// //                     ×
// //                   </button>
// //                 </span>
// //               )}
// //               {activeSearch.startDate && activeSearch.endDate && (
// //                 <span className="filter-chip me-2" style={{
// //                   display: 'inline-block',
// //                   background: '#e9ecef',
// //                   padding: '4px 12px',
// //                   borderRadius: '20px',
// //                   fontSize: '13px',
// //                   marginBottom: '8px'
// //                 }}>
// //                   Date: {activeSearch.startDate} to {activeSearch.endDate}
// //                   <button 
// //                     onClick={() => {
// //                       setActiveSearch(prev => ({ ...prev, startDate: '', endDate: '' }));
// //                       fetchData({ ...activeSearch, startDate: '', endDate: '' }, 1);
// //                     }}
// //                     style={{
// //                       border: 'none',
// //                       background: 'transparent',
// //                       marginLeft: '8px',
// //                       cursor: 'pointer',
// //                       color: '#dc3545'
// //                     }}
// //                   >
// //                     ×
// //                   </button>
// //                 </span>
// //               )}
// //             </div>
// //             <div className='d-flex'>
// //               <CFormLabel className='mt-1 m-1'>Search:</CFormLabel>
// //               <CFormInput
// //                 type="text"
// //                 style={{maxWidth: '350px', height: '30px', borderRadius: '0'}}
// //                 className="d-inline-block square-search"
// //                 value={searchTerm}
// //                 onChange={(e) => setSearchTerm(e.target.value)}
// //                 disabled={isSearchActive()}
// //                 placeholder={isSearchActive() ? "Disabled during advanced search" : ""}
// //               />
// //             </div>
// //           </div>
          
// //           <div className="responsive-table-wrapper">
// //             <CTable striped bordered hover className='responsive-table'>
// //               <CTableHead>
// //                 <CTableRow>
// //                   <CTableHeaderCell scope="col" onClick={() => handleSort('transferNumber')} className="sortable-header">
// //                   Indent No {getSortIcon('transferNumber')}
// //                   </CTableHeaderCell>
// //                   <CTableHeaderCell scope="col" onClick={() => handleSort('date')} className="sortable-header">
// //                     Date {getSortIcon('date')}
// //                   </CTableHeaderCell>
// //                   <CTableHeaderCell scope="col" onClick={() => handleSort('fromCenter.centerName')} className="sortable-header">
// //                    Branch {getSortIcon('fromCenter.centerName')}
// //                   </CTableHeaderCell>
// //                   <CTableHeaderCell scope="col" onClick={() => handleSort('toCenter.centerName')} className="sortable-header">
// //                     Parent Branch {getSortIcon('toCenter.centerName')}
// //                   </CTableHeaderCell>
// //                   <CTableHeaderCell scope="col" onClick={() => handleSort('productDetail.product.productTitle')} className="sortable-header">
// //                     Product {getSortIcon('productDetail.product.productTitle')}
// //                   </CTableHeaderCell>
// //                   <CTableHeaderCell scope="col" onClick={() => handleSort('productDetail.quantity')} className="sortable-header">
// //                     Requested Qty {getSortIcon('productDetail.quantity')}
// //                   </CTableHeaderCell>
// //                   <CTableHeaderCell scope="col" onClick={() => handleSort('productDetail.toCenterStock.availableQuantity')} className="sortable-header">
// //                    Center Stock {getSortIcon('productDetail.toCenterStock.availableQuantity')}
// //                   </CTableHeaderCell>
// //                   <CTableHeaderCell scope="col" onClick={() => handleSort('productDetail.fromCenterStock.availableQuantity')} className="sortable-header">
// //                     Parent Stock {getSortIcon('productDetail.fromCenterStock.availableQuantity')}
// //                   </CTableHeaderCell>
// //                   <CTableHeaderCell scope="col" onClick={() => handleSort('productDetail.approvedQuantity')} className="sortable-header">
// //                     Approved Qty {getSortIcon('productDetail.approvedQuantity')}
// //                   </CTableHeaderCell>
// //                   <CTableHeaderCell scope="col" onClick={() => handleSort('productDetail.receivedQuantity')} className="sortable-header">
// //                     Received Qty {getSortIcon('productDetail.receivedQuantity')}
// //                   </CTableHeaderCell>
// //                 </CTableRow>
// //               </CTableHead>
// //               <CTableBody>
// //                 {filteredFlattenedData.length > 0 ? (
// //                   <>
// //                     {filteredFlattenedData.map((item) => {
// //                       // Get product and center info for click handler
// //                       const productId = item.productDetail?.product?._id;
// //                       const productName = item.productDetail?.product?.productTitle;
// //                       const centerId = item.fromCenter?._id || item.toCenter?._id;
// //                       const centerName = item.fromCenter?.centerName || item.toCenter?.centerName;
                      
// //                       return (
// //                         <CTableRow key={item.uniqueKey}>
// //                           <CTableDataCell>{item.transferNumber || ''}</CTableDataCell>
// //                           <CTableDataCell>{formatDate(item.date || '')}</CTableDataCell>
// //                           <CTableDataCell>{item.toCenter?.centerName || ''}</CTableDataCell>
// //                           <CTableDataCell>{item.fromCenter?.centerName || ''}</CTableDataCell>
// //                           {/* Product cell with click handler */}
// //                           <CTableDataCell>
// //                             {item.productDetail?.product?.productTitle ? (
// //                               <span 
// //                                 style={{ 
// //                                   cursor: 'pointer', 
// //                                   color: '#007bff',
// //                                   textDecoration: 'underline'
// //                                 }}
// //                                 onClick={() => handleProductClick(
// //                                   productId, 
// //                                   productName,
// //                                   centerId,
// //                                   centerName
// //                                 )}
// //                                 title="Click to view all stock requests for this product"
// //                               >
// //                                 {item.productDetail.product.productTitle}
// //                               </span>
// //                             ) : (
// //                               'No Product'
// //                             )}
// //                           </CTableDataCell>
// //                           {/* Requested Qty cell with click handler */}
// //                           <CTableDataCell>
// //                             {item.productDetail?.quantity ? (
// //                               <span 
// //                                 style={{ 
// //                                   cursor: 'pointer', 
// //                                   color: '#007bff',
// //                                   textDecoration: 'underline'
// //                                 }}
// //                                 onClick={() => handleProductClick(
// //                                   productId, 
// //                                   productName,
// //                                   centerId,
// //                                   centerName
// //                                 )}
// //                                 title="Click to view all stock requests for this product"
// //                               >
// //                                 {item.productDetail.quantity || 0}
// //                               </span>
// //                             ) : (
// //                               0
// //                             )}
// //                           </CTableDataCell>
// //                           <CTableDataCell>
// //                             {item.productDetail?.toCenterStock?.availableQuantity || 0}
// //                           </CTableDataCell>
// //                           <CTableDataCell>
// //                             {item.productDetail?.fromCenterStock?.availableQuantity || 0}
// //                           </CTableDataCell>
// //                           <CTableDataCell>
// //                             {item.productDetail?.approvedQuantity || 0}
// //                           </CTableDataCell>
// //                           <CTableDataCell>
// //                             {item.productDetail?.receivedQuantity || 0}
// //                           </CTableDataCell>
// //                         </CTableRow>
// //                       );
// //                     })}
// //                     <CTableRow className='total-row'>
// //                       <CTableDataCell colSpan="5">Total</CTableDataCell>
// //                       <CTableDataCell>{totals.totalRequestedQty}</CTableDataCell>
// //                       <CTableDataCell></CTableDataCell>
// //                       <CTableDataCell></CTableDataCell>
// //                       <CTableDataCell>{totals.totalApprovedQty}</CTableDataCell>
// //                       <CTableDataCell>{totals.totalReceivedQty}</CTableDataCell>
// //                     </CTableRow>
// //                   </>
// //                 ) : (
// //                   <CTableRow>
// //                     <CTableDataCell colSpan="11" className="text-center">
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

// // export default TransferDetail;





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
//   CSpinner
// } from '@coreui/react';
// import CIcon from '@coreui/icons-react';
// import { cilArrowTop, cilArrowBottom, cilSearch, cilZoomOut } from '@coreui/icons';
// import { CFormLabel } from '@coreui/react-pro';
// import axiosInstance from 'src/axiosInstance';
// import Pagination from 'src/utils/Pagination';
// import { showError } from 'src/utils/sweetAlerts';
// import { formatDate} from 'src/utils/FormatDateTime';
// import CommonSearch from './CommonSearch';
// import { useLocation, useNavigate } from 'react-router-dom';

// const TransferDetail = () => {
//   const [data, setData] = useState([]);
//   const [centers, setCenters] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
//   const [searchTerm, setSearchTerm] = useState('');
//   const [searchModalVisible, setSearchModalVisible] = useState(false);
//   const [activeSearch, setActiveSearch] = useState({ 
//     center: '', 
//     product: '', 
//     startDate: '', 
//     endDate: ''
//   });
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);
//   const location = useLocation();
//   const navigate = useNavigate();

//   // Helper function to convert DD-MM-YYYY to YYYY-MM-DD for API
//   const convertToYYYYMMDD = (dateStr) => {
//     if (!dateStr) return '';
//     if (dateStr.match(/^\d{4}-\d{2}-\d{2}$/)) {
//       return dateStr;
//     }
//     const parts = dateStr.split('-');
//     if (parts.length === 3) {
//       const [day, month, year] = parts;
//       return `${year}-${month}-${day}`;
//     }
//     return dateStr;
//   };

//   // Handler for clicking on product to navigate to Stock Request List
//   const handleProductClick = (productId, productName) => {
//     console.log('🔍 Clicking product:', { productId, productName });
    
//     if (!productId) {
//       console.warn('No product ID provided for navigation');
//       return;
//     }
    
//     // Navigate to stock request list with product filter
//     navigate('/stock-request', { 
//       state: { 
//         productFilter: productId,
//         productName: productName || 'Product',
//         fromTransferReport: true
//       } 
//     });
//   };

//   const getUrlParams = () => {
//     const searchParams = new URLSearchParams(location.search);
//     return {
//       product: searchParams.get('product'),
//       center: searchParams.get('center'),
//       productName: searchParams.get('productName'),
//       centerName: searchParams.get('centerName'),
//       month: searchParams.get('month'),
//       transferType: searchParams.get('transferType')
//     };
//   };
  
//   useEffect(() => {
//     const initializeData = async () => {
//       try {
//         setLoading(true);
//         const urlParams = getUrlParams();
        
//         console.log('Transfer Detail URL Parameters:', urlParams);

//         await Promise.all([fetchCenters(), fetchProducts()]);
        
//         let searchParams = {};

//         if (urlParams.product && urlParams.center) {
//           searchParams = {
//             product: urlParams.product,
//             center: urlParams.center,
//             startDate: '',
//             endDate: ''
//           };
//           if (urlParams.month) {
//             const [year, month] = urlParams.month.split('-');
//             const monthStart = `${year}-${month.padStart(2, '0')}-01`;
//             const lastDay = new Date(parseInt(year), parseInt(month), 0).getDate();
//             const monthEnd = `${year}-${month.padStart(2, '0')}-${lastDay}`;
            
//             searchParams.startDate = monthStart;
//             searchParams.endDate = monthEnd;
//           }
          
//           console.log('Using filtered search from URL:', searchParams);
//           setActiveSearch(searchParams);
          
//           if (urlParams.productName && urlParams.centerName) {
//             const transferTypeText = urlParams.transferType === 'receive' ? 'Received' : 'Given';
//             document.title = `Transfer Details (${transferTypeText}) - ${decodeURIComponent(urlParams.productName)} at ${decodeURIComponent(urlParams.centerName)}`;
//           }
//         } else {
//           console.log('No URL parameters, fetching all data');
//           searchParams = {};
//         }
//         await fetchData(searchParams, 1);
        
//       } catch (error) {
//         console.error('Error initializing data:', error);
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     initializeData();
//   }, [location.search]);

//   const fetchData = async (searchParams = {}, page = 1) => {
//     try {
//       setLoading(true);
//       setError(null);
//       const params = new URLSearchParams();

//       const urlParams = getUrlParams();
      
//       const centerId = urlParams.center || searchParams.center;
//       const productId = urlParams.product || searchParams.product;
//       const transferType = urlParams.transferType;

//       if (centerId) {
//         if (transferType === 'receive') {
//           params.append('toCenter', centerId);
//         } else if (transferType === 'given') {
//           params.append('fromCenter', centerId);
//         } else {
//           params.append('center', centerId);
//         }
//       }
      
//       if (productId) {
//         params.append('product', productId);
//       }
      
//       if (searchParams.startDate && searchParams.endDate) {
//         const convertedStartDate = convertToYYYYMMDD(searchParams.startDate);
//         const convertedEndDate = convertToYYYYMMDD(searchParams.endDate);
        
//         params.append('startDate', convertedStartDate);
//         params.append('endDate', convertedEndDate);
        
//         console.log('Original dates (DD-MM-YYYY):', searchParams.startDate, searchParams.endDate);
//         console.log('Converted dates (YYYY-MM-DD):', convertedStartDate, convertedEndDate);
//       }
      
//       if (urlParams.month) {
//         const [year, month] = urlParams.month.split('-');
//         const monthStart = `${year}-${month.padStart(2, '0')}-01`;
//         const lastDay = new Date(parseInt(year), parseInt(month), 0).getDate();
//         const monthEnd = `${year}-${month.padStart(2, '0')}-${lastDay}`;
        
//         params.append('startDate', monthStart);
//         params.append('endDate', monthEnd);
//       }
      
//       params.append('page', page);
//       const url = params.toString() ? `/reports/transfers?${params.toString()}` : '/reports/transfers';
//       console.log('Fetching URL:', url);
//       const response = await axiosInstance.get(url);
      
//       if (response.data.success) {
//         setData(response.data.data || []);
//         setCurrentPage(response.data.pagination?.currentPage || 1);
//         setTotalPages(response.data.pagination?.totalPages || 1);
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
//         setCenters(response.data.data || []);
//       }
//     } catch (error) {
//       console.error('Error fetching centers:', error);
//     }
//   };

//   const fetchProducts = async () => {
//     try {
//       const response = await axiosInstance.get('/products/all');
//       if (response.data.success) {
//         setProducts(response.data.data || []);
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

//   const handlePageChange = (page) => {
//     if (page < 1 || page > totalPages) return;
//     fetchData(activeSearch, page);
//   };

//   const getFlattenedData = () => {
//     const flattened = [];
//     data.forEach(transfer => {
//       if (transfer.products && transfer.products.length > 0) {
//         transfer.products.forEach((product, index) => {
//           // ✅ FIX: Generate a unique key using transfer._id, product._id, and index
//           const productId = product?.product?._id || product?.product || 'no_product';
//           const uniqueKey = `${transfer._id}_${productId}_${index}`;
          
//           flattened.push({
//             ...transfer,
//             productDetail: product,
//             uniqueKey: uniqueKey
//           });
//         });
//       } else {
//         // ✅ FIX: Handle case with no products
//         flattened.push({
//           ...transfer,
//           productDetail: null,
//           uniqueKey: `${transfer._id}_no_product`
//         });
//       }
//     });
//     return flattened;
//   };

//   const calculateTotals = () => {
//     const totals = {
//       totalRequestedQty: 0,
//       totalApprovedQty: 0,
//       totalReceivedQty: 0
//     };

//     getFlattenedData().forEach(item => {
//       if (item.productDetail) {
//         totals.totalRequestedQty += parseFloat(item.productDetail.quantity || 0);
//         totals.totalApprovedQty += parseFloat(item.productDetail.approvedQuantity || 0);
//         totals.totalReceivedQty += parseFloat(item.productDetail.receivedQuantity || 0);
//       }
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
//       endDate: ''
//     });
//     setSearchTerm('');
//     fetchData({}, 1);
//   };

//   const isSearchActive = () => {
//     return activeSearch.center || 
//            activeSearch.product || 
//            activeSearch.startDate || 
//            activeSearch.endDate;
//   };

//   const filteredFlattenedData = getFlattenedData().filter(item => {
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
//       <div className="alert alert-danger m-4" role="alert">
//         <h5>Error Loading Data</h5>
//         <p>{error}</p>
//         <CButton color="primary" size="sm" onClick={() => window.location.reload()}>
//           Retry
//         </CButton>
//       </div>
//     );
//   }

//   const totals = calculateTotals();

//   const generateDetailExport = async () => {
//     try {
//       setLoading(true);
//       const params = new URLSearchParams();
  
//       if (activeSearch.center) {
//         params.append('center', activeSearch.center);
//       }
//       if (activeSearch.product) {
//         params.append('product', activeSearch.product);
//       }
      
//       if (activeSearch.startDate && activeSearch.endDate) {
//         const convertedStartDate = convertToYYYYMMDD(activeSearch.startDate);
//         const convertedEndDate = convertToYYYYMMDD(activeSearch.endDate);
        
//         params.append('startDate', convertedStartDate);
//         params.append('endDate', convertedEndDate);
//       }
      
//       if (activeSearch.date && activeSearch.date.includes(' to ')) {
//         const [startDateStr, endDateStr] = activeSearch.date.split(' to ');
//         const convertDateFormat = (dateStr) => {
//           const [day, month, year] = dateStr.split('-');
//           return `${year}-${month}-${day}`;
//         };
        
//         params.append('startDate', convertDateFormat(startDateStr));
//         params.append('endDate', convertDateFormat(endDateStr));
//       }
      
//       params.append('export', 'true');
//       const apiUrl = params.toString() 
//         ? `/reports/transfers?${params.toString()}` 
//         : '/reports/transfers';
      
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
//         'Invoice No.',
//         'Date',
//         'Center',
//         'Parent Center',
//         'Product',
//         'Quantity',
//         'Center Stock',
//         'Parent Stock',
//         'Product Remark',
//         'Approved Quantity',
//         'Approved Remark',
//         'Received Qty.',
//         'Received Remark'
//       ];
  
//       const csvData = exportData.flatMap(transfer => {
//         if (transfer.products && transfer.products.length > 0) {
//           return transfer.products.map(product => [
//             transfer.transferNumber || 'N/A',
//             formatDate(transfer.date),
//             transfer.fromCenter?.centerName || 'N/A',
//             transfer.toCenter?.centerName || 'N/A',
//             product.product?.productTitle || 'N/A',
//             product.quantity || 0,
//             product.fromCenterStock?.availableQuantity || 0,
//             product.toCenterStock?.availableQuantity || 0,
//             product.productRemark || '',
//             product.approvedQuantity || 0,
//             product.approvedRemark || '',
//             product.receivedQuantity || 0,
//             product.receivedRemark || '',
//           ]);
//         } else {
//           return [[
//             transfer.transferNumber || 'N/A',
//             formatDate(transfer.date),
//             transfer.fromCenter?.centerName || 'N/A',
//             transfer.toCenter?.centerName || 'N/A',
//             'No Product',
//             0,
//             0,
//             0,
//             '',
//             0,
//             '',
//             0,
//             '',
//           ]];
//         }
//       });
  
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
//       link.setAttribute('download', `transfer_detail_report_${new Date().toISOString().split('T')[0]}.csv`);
//       link.style.visibility = 'hidden';
      
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);
//       URL.revokeObjectURL(downloadUrl);
    
//     } catch (error) {
//       console.error('Error generating export:', error);
//       showError('Error generating export file');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       <div className='title'>Transfer Detail Report</div>
//       <CommonSearch
//         visible={searchModalVisible}
//         onClose={() => setSearchModalVisible(false)}
//         onSearch={handleSearch}
//         centers={centers}
//         products={products}
//       />
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
//               onClick={generateDetailExport}
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
//               {/* Display active filter chips */}
//               {activeSearch.product && (
//                 <span className="filter-chip me-2" style={{
//                   display: 'inline-block',
//                   background: '#e9ecef',
//                   padding: '4px 12px',
//                   borderRadius: '20px',
//                   fontSize: '13px',
//                   marginBottom: '8px'
//                 }}>
//                   Product: {products.find(p => p._id === activeSearch.product)?.productTitle || activeSearch.product.substring(0, 8)}
//                   <button 
//                     onClick={() => {
//                       setActiveSearch(prev => ({ ...prev, product: '' }));
//                       fetchData({ ...activeSearch, product: '' }, 1);
//                     }}
//                     style={{
//                       border: 'none',
//                       background: 'transparent',
//                       marginLeft: '8px',
//                       cursor: 'pointer',
//                       color: '#dc3545'
//                     }}
//                   >
//                     ×
//                   </button>
//                 </span>
//               )}
//               {activeSearch.center && (
//                 <span className="filter-chip me-2" style={{
//                   display: 'inline-block',
//                   background: '#e9ecef',
//                   padding: '4px 12px',
//                   borderRadius: '20px',
//                   fontSize: '13px',
//                   marginBottom: '8px'
//                 }}>
//                   Center: {centers.find(c => c._id === activeSearch.center)?.centerName || activeSearch.center.substring(0, 8)}
//                   <button 
//                     onClick={() => {
//                       setActiveSearch(prev => ({ ...prev, center: '' }));
//                       fetchData({ ...activeSearch, center: '' }, 1);
//                     }}
//                     style={{
//                       border: 'none',
//                       background: 'transparent',
//                       marginLeft: '8px',
//                       cursor: 'pointer',
//                       color: '#dc3545'
//                     }}
//                   >
//                     ×
//                   </button>
//                 </span>
//               )}
//               {activeSearch.startDate && activeSearch.endDate && (
//                 <span className="filter-chip me-2" style={{
//                   display: 'inline-block',
//                   background: '#e9ecef',
//                   padding: '4px 12px',
//                   borderRadius: '20px',
//                   fontSize: '13px',
//                   marginBottom: '8px'
//                 }}>
//                   Date: {activeSearch.startDate} to {activeSearch.endDate}
//                   <button 
//                     onClick={() => {
//                       setActiveSearch(prev => ({ ...prev, startDate: '', endDate: '' }));
//                       fetchData({ ...activeSearch, startDate: '', endDate: '' }, 1);
//                     }}
//                     style={{
//                       border: 'none',
//                       background: 'transparent',
//                       marginLeft: '8px',
//                       cursor: 'pointer',
//                       color: '#dc3545'
//                     }}
//                   >
//                     ×
//                   </button>
//                 </span>
//               )}
//             </div>
//             <div className='d-flex'>
//               <CFormLabel className='mt-1 m-1'>Search:</CFormLabel>
//               <CFormInput
//                 type="text"
//                 style={{maxWidth: '350px', height: '30px', borderRadius: '0'}}
//                 className="d-inline-block square-search"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 disabled={isSearchActive()}
//                 placeholder={isSearchActive() ? "Disabled during advanced search" : ""}
//               />
//             </div>
//           </div>
          
//           <div className="responsive-table-wrapper">
//             <CTable striped bordered hover className='responsive-table'>
//               <CTableHead>
//                 <CTableRow>
//                   <CTableHeaderCell scope="col" onClick={() => handleSort('transferNumber')} className="sortable-header">
//                   Indent No {getSortIcon('transferNumber')}
//                   </CTableHeaderCell>
//                   <CTableHeaderCell scope="col" onClick={() => handleSort('date')} className="sortable-header">
//                     Date {getSortIcon('date')}
//                   </CTableHeaderCell>
//                   <CTableHeaderCell scope="col" onClick={() => handleSort('fromCenter.centerName')} className="sortable-header">
//                    Branch {getSortIcon('fromCenter.centerName')}
//                   </CTableHeaderCell>
//                   <CTableHeaderCell scope="col" onClick={() => handleSort('toCenter.centerName')} className="sortable-header">
//                     Parent Branch {getSortIcon('toCenter.centerName')}
//                   </CTableHeaderCell>
//                   <CTableHeaderCell scope="col" onClick={() => handleSort('productDetail.product.productTitle')} className="sortable-header">
//                     Product {getSortIcon('productDetail.product.productTitle')}
//                   </CTableHeaderCell>
//                   <CTableHeaderCell scope="col" onClick={() => handleSort('productDetail.quantity')} className="sortable-header">
//                     Requested Qty {getSortIcon('productDetail.quantity')}
//                   </CTableHeaderCell>
//                   <CTableHeaderCell scope="col" onClick={() => handleSort('productDetail.toCenterStock.availableQuantity')} className="sortable-header">
//                    Center Stock {getSortIcon('productDetail.toCenterStock.availableQuantity')}
//                   </CTableHeaderCell>
//                   <CTableHeaderCell scope="col" onClick={() => handleSort('productDetail.fromCenterStock.availableQuantity')} className="sortable-header">
//                     Parent Stock {getSortIcon('productDetail.fromCenterStock.availableQuantity')}
//                   </CTableHeaderCell>
//                   <CTableHeaderCell scope="col" onClick={() => handleSort('productDetail.approvedQuantity')} className="sortable-header">
//                     Approved Qty {getSortIcon('productDetail.approvedQuantity')}
//                   </CTableHeaderCell>
//                   <CTableHeaderCell scope="col" onClick={() => handleSort('productDetail.receivedQuantity')} className="sortable-header">
//                     Received Qty {getSortIcon('productDetail.receivedQuantity')}
//                   </CTableHeaderCell>
//                 </CTableRow>
//               </CTableHead>
//               <CTableBody>
//                 {filteredFlattenedData.length > 0 ? (
//                   <>
//                     {filteredFlattenedData.map((item) => {
//                       // Get product and center info for click handler
//                       const productId = item.productDetail?.product?._id;
//                       const productName = item.productDetail?.product?.productTitle;
//                       const centerId = item.fromCenter?._id || item.toCenter?._id;
//                       const centerName = item.fromCenter?.centerName || item.toCenter?.centerName;
                      
//                       return (
//                         <CTableRow key={item.uniqueKey}>
//                           <CTableDataCell>{item.transferNumber || ''}</CTableDataCell>
//                           <CTableDataCell>{formatDate(item.date || '')}</CTableDataCell>
//                           <CTableDataCell>{item.toCenter?.centerName || ''}</CTableDataCell>
//                           <CTableDataCell>{item.fromCenter?.centerName || ''}</CTableDataCell>
//                           {/* Product cell with click handler */}
//                           <CTableDataCell>
//                             {item.productDetail?.product?.productTitle ? (
//                               <span 
//                                 style={{ 
//                                   cursor: 'pointer', 
//                                   color: '#007bff',
//                                   textDecoration: 'underline'
//                                 }}
//                                 onClick={() => {
//                                   console.log('🖱️ Product clicked:', { productId, productName, centerId, centerName });
//                                   handleProductClick(
//                                     productId, 
//                                     productName
//                                   );
//                                 }}
//                                 title="Click to view all stock requests for this product"
//                               >
//                                 {item.productDetail.product.productTitle}
//                               </span>
//                             ) : (
//                               'No Product'
//                             )}
//                           </CTableDataCell>
//                           {/* Requested Qty cell with click handler */}
//                           <CTableDataCell>
//                             {item.productDetail?.quantity ? (
//                               <span 
//                                 style={{ 
//                                   cursor: 'pointer', 
//                                   color: '#007bff',
//                                   textDecoration: 'underline'
//                                 }}
//                                 onClick={() => {
//                                   console.log('🖱️ Quantity clicked:', { productId, productName, centerId, centerName, quantity: item.productDetail.quantity });
//                                   handleProductClick(
//                                     productId, 
//                                     productName
//                                   );
//                                 }}
//                                 title="Click to view all stock requests for this product"
//                               >
//                                 {item.productDetail.quantity || 0}
//                               </span>
//                             ) : (
//                               0
//                             )}
//                           </CTableDataCell>
//                           <CTableDataCell>
//                             {item.productDetail?.toCenterStock?.availableQuantity || 0}
//                           </CTableDataCell>
//                           <CTableDataCell>
//                             {item.productDetail?.fromCenterStock?.availableQuantity || 0}
//                           </CTableDataCell>
//                           <CTableDataCell>
//                             {item.productDetail?.approvedQuantity || 0}
//                           </CTableDataCell>
//                           <CTableDataCell>
//                             {item.productDetail?.receivedQuantity || 0}
//                           </CTableDataCell>
//                         </CTableRow>
//                       );
//                     })}
//                     <CTableRow className='total-row'>
//                       <CTableDataCell colSpan="5">Total</CTableDataCell>
//                       <CTableDataCell>{totals.totalRequestedQty}</CTableDataCell>
//                       <CTableDataCell></CTableDataCell>
//                       <CTableDataCell></CTableDataCell>
//                       <CTableDataCell>{totals.totalApprovedQty}</CTableDataCell>
//                       <CTableDataCell>{totals.totalReceivedQty}</CTableDataCell>
//                     </CTableRow>
//                   </>
//                 ) : (
//                   <CTableRow>
//                     <CTableDataCell colSpan="11" className="text-center">
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

// export default TransferDetail;






import '../../css/table.css';
import '../../css/form.css';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
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
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import {
  cilArrowTop,
  cilArrowBottom,
  cilSearch,
  cilZoomOut,
} from '@coreui/icons';
import { CFormLabel } from '@coreui/react-pro';
import axiosInstance from 'src/axiosInstance';
import Pagination from 'src/utils/Pagination';
import { showError } from 'src/utils/sweetAlerts';
import { formatDate } from 'src/utils/FormatDateTime';
import CommonSearch from './CommonSearch';

const EMPTY_SEARCH = {
  center: '',
  product: '',
  startDate: '',
  endDate: '',
};

const getId = (value) => {
  if (!value) return '';
  if (typeof value === 'object') {
    return String(value._id || value.id || '');
  }
  return String(value);
};

const getProductId = (productDetail) =>
  getId(productDetail?.product);

const convertToYYYYMMDD = (dateStr) => {
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

const TransferDetail = () => {
  const location = useLocation();
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
  const [activeSearch, setActiveSearch] = useState(EMPTY_SEARCH);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const urlParams = useMemo(
    () => new URLSearchParams(location.search),
    [location.search]
  );

  const productId = urlParams.get('product') || '';
  const centerId = urlParams.get('center') || '';
  const toCenterId = urlParams.get('toCenter') || '';
  const transferType = urlParams.get('transferType') || '';
  const productName = urlParams.get('productName') || '';
  const centerName = urlParams.get('centerName') || '';
  const summaryQty = urlParams.get('summaryQty');
  const startDateFromUrl = urlParams.get('startDate') || '';
  const endDateFromUrl = urlParams.get('endDate') || '';

  const fetchCenters = useCallback(async () => {
    try {
      const response = await axiosInstance.get('/centers');
      if (response.data?.success) {
        setCenters(response.data.data || []);
      }
    } catch (err) {
      console.error('Error fetching centers:', err);
    }
  }, []);

  const fetchProducts = useCallback(async () => {
    try {
      const response = await axiosInstance.get('/products/all');
      if (response.data?.success) {
        setProducts(response.data.data || []);
      }
    } catch (err) {
      console.error('Error fetching products:', err);
    }
  }, []);

  const fetchData = useCallback(async (searchParams = {}, page = 1) => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();

      const selectedProduct = productId || searchParams.product;
      const selectedCenter = centerId || searchParams.center;
      const selectedParentCenter = toCenterId;

      if (selectedProduct) {
        params.set('product', selectedProduct);
      }

      if (selectedCenter) {
        if (transferType === 'receive') {
          params.set('toCenter', selectedCenter);
        } else {
          params.set('fromCenter', selectedCenter);
        }
      }

      // Restrict to the exact parent branch selected in Transfer Summary.
      if (selectedParentCenter) {
        params.set('toCenter', selectedParentCenter);
      }

      const startDate = startDateFromUrl || searchParams.startDate;
      const endDate = endDateFromUrl || searchParams.endDate;

      if (startDate) {
        params.set('startDate', convertToYYYYMMDD(startDate));
      }

      if (endDate) {
        params.set('endDate', convertToYYYYMMDD(endDate));
      }

      params.set('page', String(page));

      const response = await axiosInstance.get(
        `/reports/transfers?${params.toString()}`
      );

      if (!response.data?.success) {
        throw new Error(
          response.data?.message || 'Unable to fetch transfer details.'
        );
      }

      setData(response.data.data || []);
      setCurrentPage(response.data.pagination?.currentPage || page);
      setTotalPages(response.data.pagination?.totalPages || 1);
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.message ||
        'Error fetching transfer details.'
      );
      console.error('Error fetching transfer details:', err);
    } finally {
      setLoading(false);
    }
  }, [
    productId,
    centerId,
    toCenterId,
    transferType,
    startDateFromUrl,
    endDateFromUrl,
  ]);

  useEffect(() => {
    fetchCenters();
    fetchProducts();
  }, [fetchCenters, fetchProducts]);

  useEffect(() => {
    const initialSearch = {
      ...EMPTY_SEARCH,
      product: productId,
      center: centerId,
      startDate: startDateFromUrl,
      endDate: endDateFromUrl,
    };

    setActiveSearch(initialSearch);
    setSearchTerm('');
    setSortConfig({ key: null, direction: 'ascending' });
    fetchData(initialSearch, 1);

    if (productName || centerName) {
      document.title = `Transfer Details - ${productName} - ${centerName}`;
    }
  }, [
    location.search,
    fetchData,
    productId,
    centerId,
    startDateFromUrl,
    endDateFromUrl,
    productName,
    centerName,
  ]);

  const getFlattenedData = useCallback(() => {
    const flattened = [];

    data.forEach((transfer, transferIndex) => {
      const productsInTransfer = Array.isArray(transfer.products)
        ? transfer.products
        : [];

      productsInTransfer.forEach((productDetail, productIndex) => {
        flattened.push({
          ...transfer,
          productDetail,
          uniqueKey:
            `${transfer._id || transferIndex}_` +
            `${getProductId(productDetail) || 'no-product'}_${productIndex}`,
        });
      });
    });

    return flattened;
  }, [data]);

  // Keep only the records matching the clicked summary row.
  const summaryFilteredData = useMemo(() => {
    return getFlattenedData().filter((item) => {
      if (productId && getProductId(item.productDetail) !== productId) {
        return false;
      }

      if (centerId) {
        const expectedSource = transferType === 'receive'
          ? getId(item.toCenter)
          : getId(item.fromCenter);

        if (expectedSource !== centerId) {
          return false;
        }
      }

      if (toCenterId && getId(item.toCenter) !== toCenterId) {
        return false;
      }

      return true;
    });
  }, [
    getFlattenedData,
    productId,
    centerId,
    toCenterId,
    transferType,
  ]);

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    fetchData(activeSearch, page);
  };

  const handleSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === 'ascending'
        ? 'descending'
        : 'ascending';

    setSortConfig({ key, direction });

    const getValue = (item, path) =>
      path.split('.').reduce((value, part) => value?.[part], item) ?? '';

    setData((previous) => [...previous].sort((a, b) => {
      const aValue = getValue(a, key);
      const bValue = getValue(b, key);

      const comparison =
        typeof aValue === 'number' && typeof bValue === 'number'
          ? aValue - bValue
          : String(
              typeof aValue === 'object'
                ? aValue?.centerName || aValue?.productTitle || ''
                : aValue
            ).localeCompare(
              String(
                typeof bValue === 'object'
                  ? bValue?.centerName || bValue?.productTitle || ''
                  : bValue
              ),
              undefined,
              { numeric: true, sensitivity: 'base' }
            );

      return direction === 'ascending' ? comparison : -comparison;
    }));
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) return null;

    return sortConfig.direction === 'ascending'
      ? <CIcon icon={cilArrowTop} className="ms-1" />
      : <CIcon icon={cilArrowBottom} className="ms-1" />;
  };

  const handleSearch = (searchData) => {
    const merged = { ...activeSearch, ...searchData };
    setActiveSearch(merged);
    setSearchModalVisible(false);
    fetchData(merged, 1);
  };

  const handleResetSearch = () => {
    // The clicked summary-row filters must remain active.
    const reset = {
      ...EMPTY_SEARCH,
      product: productId,
      center: centerId,
      startDate: startDateFromUrl,
      endDate: endDateFromUrl,
    };

    setActiveSearch(reset);
    setSearchTerm('');
    fetchData(reset, 1);
  };

  const isAdvancedSearchActive = Boolean(
    activeSearch.product ||
    activeSearch.center ||
    activeSearch.startDate ||
    activeSearch.endDate
  );

  const filteredData = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    return summaryFilteredData.filter((item) => {
      if (!term) return true;

      const product = item.productDetail?.product;
      const searchableText = [
        item.transferNumber,
        item.fromCenter?.centerName,
        item.toCenter?.centerName,
        product?.productTitle,
        item.productDetail?.quantity,
        item.productDetail?.approvedQuantity,
        item.productDetail?.receivedQuantity,
      ].join(' ').toLowerCase();

      return searchableText.includes(term);
    });
  }, [summaryFilteredData, searchTerm]);

  const totals = useMemo(() => {
    return filteredData.reduce((result, item) => {
      result.requested += Number(item.productDetail?.quantity) || 0;
      result.approved += Number(item.productDetail?.approvedQuantity) || 0;
      result.received += Number(item.productDetail?.receivedQuantity) || 0;
      return result;
    }, { requested: 0, approved: 0, received: 0 });
  }, [filteredData]);

  const generateDetailExport = async () => {
    try {
      setExportLoading(true);

      const headers = [
        'Indent No.',
        'Date',
        'Branch',
        'Parent Branch',
        'Product',
        'Requested Qty',
        'Center Stock',
        'Parent Stock',
        'Approved Qty',
        'Received Qty',
      ];

      const escapeCsv = (value) =>
        `"${String(value ?? '').replace(/"/g, '""')}"`;

      const rows = filteredData.map((item) => {
        const product = item.productDetail || {};

        return [
          item.transferNumber || 'N/A',
          formatDate(item.date || ''),
          item.fromCenter?.centerName || '',
          item.toCenter?.centerName || '',
          product.product?.productTitle || 'No Product',
          product.quantity ?? 0,
          product.toCenterStock?.availableQuantity ?? 0,
          product.fromCenterStock?.availableQuantity ?? 0,
          product.approvedQuantity ?? 0,
          product.receivedQuantity ?? 0,
        ];
      });

      if (!rows.length) {
        showError('No data available for export.');
        return;
      }

      const csv = [
        headers.map(escapeCsv).join(','),
        ...rows.map((row) => row.map(escapeCsv).join(',')),
      ].join('\r\n');

      const blob = new Blob(['\uFEFF', csv], {
        type: 'text/csv;charset=utf-8;',
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');

      link.href = url;
      link.download =
        `transfer_detail_${new Date().toISOString().slice(0, 10)}.csv`;

      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('Error exporting transfer details:', err);
      showError('Error generating export file.');
    } finally {
      setExportLoading(false);
    }
  };

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
        <h5>Error Loading Transfer Details</h5>
        <p>{error}</p>
        <CButton
          color="primary"
          size="sm"
          onClick={() => fetchData(activeSearch, currentPage)}
        >
          Retry
        </CButton>
      </div>
    );
  }

  return (
    <div>
      <div className="title">Transfer Detail Report</div>

      <div className="d-flex align-items-center justify-content-between flex-wrap gap-2 mt-2">
        <div>
          <CButton
            size="sm"
            color="secondary"
            onClick={() => navigate(-1)}
          >
            Back to Summary
          </CButton>
        </div>

        {summaryQty !== null && (
          <div className="alert alert-info py-2 px-3 mb-0">
            Summary Total Qty: <strong>{summaryQty}</strong>
          </div>
        )}
      </div>

      <CommonSearch
        visible={searchModalVisible}
        onClose={() => setSearchModalVisible(false)}
        onSearch={handleSearch}
        centers={centers}
        products={products}
      />

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

            {isAdvancedSearchActive && (
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
              onClick={generateDetailExport}
              disabled={exportLoading || !filteredData.length}
            >
              {exportLoading ? 'Exporting...' : 'Export CSV'}
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
            <div>
              {productName && (
                <div>
                  <strong>Product:</strong> {productName}
                </div>
              )}
              {centerName && (
                <div>
                  <strong>Branch:</strong> {centerName}
                </div>
              )}
              {toCenterId && (
                <div>
                  <strong>Parent Branch ID:</strong> {toCenterId}
                </div>
              )}
            </div>

            <div className="d-flex align-items-center">
              <CFormLabel className="mt-1 m-1">Search:</CFormLabel>
              <CFormInput
                type="text"
                placeholder="Search displayed details..."
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
                    onClick={() => handleSort('transferNumber')}
                    className="sortable-header"
                  >
                    Indent No. {getSortIcon('transferNumber')}
                  </CTableHeaderCell>

                  <CTableHeaderCell
                    onClick={() => handleSort('date')}
                    className="sortable-header"
                  >
                    Date {getSortIcon('date')}
                  </CTableHeaderCell>

                  <CTableHeaderCell
                    onClick={() => handleSort('fromCenter.centerName')}
                    className="sortable-header"
                  >
                    Branch {getSortIcon('fromCenter.centerName')}
                  </CTableHeaderCell>

                  <CTableHeaderCell
                    onClick={() => handleSort('toCenter.centerName')}
                    className="sortable-header"
                  >
                    Parent Branch {getSortIcon('toCenter.centerName')}
                  </CTableHeaderCell>

                  <CTableHeaderCell
                    onClick={() => handleSort('productDetail.product.productTitle')}
                    className="sortable-header"
                  >
                    Product {getSortIcon('productDetail.product.productTitle')}
                  </CTableHeaderCell>

                  <CTableHeaderCell
                    onClick={() => handleSort('productDetail.quantity')}
                    className="sortable-header"
                  >
                    Requested Qty {getSortIcon('productDetail.quantity')}
                  </CTableHeaderCell>

                  <CTableHeaderCell>Center Stock</CTableHeaderCell>
                  <CTableHeaderCell>Parent Stock</CTableHeaderCell>

                  <CTableHeaderCell
                    onClick={() => handleSort('productDetail.approvedQuantity')}
                    className="sortable-header"
                  >
                    Approved Qty {getSortIcon('productDetail.approvedQuantity')}
                  </CTableHeaderCell>

                  <CTableHeaderCell
                    onClick={() => handleSort('productDetail.receivedQuantity')}
                    className="sortable-header"
                  >
                    Received Qty {getSortIcon('productDetail.receivedQuantity')}
                  </CTableHeaderCell>
                </CTableRow>
              </CTableHead>

              <CTableBody>
                {filteredData.length ? (
                  <>
                    {filteredData.map((item) => {
                      const product = item.productDetail || {};

                      return (
                        <CTableRow key={item.uniqueKey}>
                          <CTableDataCell>
                            {item.transferNumber || ''}
                          </CTableDataCell>

                          <CTableDataCell>
                            {formatDate(item.date || '')}
                          </CTableDataCell>

                          <CTableDataCell>
                            {item.fromCenter?.centerName || ''}
                          </CTableDataCell>

                          <CTableDataCell>
                            {item.toCenter?.centerName || ''}
                          </CTableDataCell>

                          <CTableDataCell>
                            {product.product?.productTitle || 'No Product'}
                          </CTableDataCell>

                          <CTableDataCell>
                            {product.quantity ?? 0}
                          </CTableDataCell>

                          <CTableDataCell>
                            {product.toCenterStock?.availableQuantity ?? 0}
                          </CTableDataCell>

                          <CTableDataCell>
                            {product.fromCenterStock?.availableQuantity ?? 0}
                          </CTableDataCell>

                          <CTableDataCell>
                            {product.approvedQuantity ?? 0}
                          </CTableDataCell>

                          <CTableDataCell>
                            {product.receivedQuantity ?? 0}
                          </CTableDataCell>
                        </CTableRow>
                      );
                    })}

                    <CTableRow className="total-row">
                      <CTableDataCell colSpan={5}>Total</CTableDataCell>
                      <CTableDataCell>{totals.requested}</CTableDataCell>
                      <CTableDataCell />
                      <CTableDataCell />
                      <CTableDataCell>{totals.approved}</CTableDataCell>
                      <CTableDataCell>{totals.received}</CTableDataCell>
                    </CTableRow>
                  </>
                ) : (
                  <CTableRow>
                    <CTableDataCell colSpan={10} className="text-center">
                      No matching transfer details found.
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

export default TransferDetail;
