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
// // // // import { formatDate } from 'src/utils/FormatDateTime';
// // // // import SearchUsageDetail from './SearchUsageDetail';
// // // // import { useLocation, useNavigate } from 'react-router-dom';

// // // // const UsageDetail = () => {
// // // //   const [data, setData] = useState([]);
// // // //   const [centers, setCenters] = useState([]);
// // // //   const [products, setProducts] = useState([]);
// // // //   const [customers, setCustomers] = useState([]);
// // // //   const [loading, setLoading] = useState(true);
// // // //   const [error, setError] = useState(null);
// // // //   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
// // // //   const [searchTerm, setSearchTerm] = useState('');
// // // //   const [searchModalVisible, setSearchModalVisible] = useState(false);
// // // //   const [activeSearch, setActiveSearch] = useState({ 
// // // //     center: '', 
// // // //     product: '', 
// // // //     startDate: '', 
// // // //     endDate: '',
// // // //     usageType: '',
// // // //     connectionType: '',
// // // //     customer: '',
// // // //     keyword: '', 
// // // //     outlet: '' 
// // // //   });
// // // //   const [currentPage, setCurrentPage] = useState(1);
// // // //   const [totalPages, setTotalPages] = useState(1);
// // // //   const location = useLocation();
  
// // // //   useEffect(() => {
// // // //     if (location.state?.productId && location.state?.centerId) {
// // // //       const filteredSearch = {
// // // //         product: location.state.productId,
// // // //         center: location.state.centerId,
// // // //         startDate: '',
// // // //         endDate: '',
// // // //         usageType: '',
// // // //         connectionType: '',
// // // //         customer: '',
// // // //         keyword: '',
// // // //         outlet: ''
// // // //       };
      
// // // //       setActiveSearch(filteredSearch);
// // // //       fetchData(filteredSearch, 1);
// // // //       document.title = `Usage Details - ${location.state.productName || 'Product'} at ${location.state.centerName || 'Center'}`;
// // // //     } else {
// // // //       fetchData();
// // // //     }
// // // //   }, [location.state]);

// // // // const convertDateFormat = (dateStr) => {
// // // //   const [day, month, year] = dateStr.split('-');
// // // //   return `${year}-${month}-${day}`;
// // // // };

// // // //   const fetchData = async (searchParams = {}, page = 1) => {
// // // //     try {
// // // //       setLoading(true);
// // // //       setError(null);
// // // //       const params = new URLSearchParams();
  
// // // //       if (searchParams.center) {
// // // //         params.append('center', searchParams.center);
// // // //       }
// // // //       if (searchParams.product) {
// // // //         params.append('product', searchParams.product);
// // // //       }
// // // //       if (searchParams.usageType) {
// // // //         params.append('usageType', searchParams.usageType);
// // // //       }
// // // //       if (searchParams.connectionType) {
// // // //         params.append('connectionType', searchParams.connectionType);
// // // //       }
// // // //       if (searchParams.customer) {
// // // //         params.append('customer', searchParams.customer);
// // // //       }
// // // //       if (searchParams.startDate && searchParams.endDate) {
// // // //         const convertDateFormat = (dateStr) => {
// // // //           if (dateStr.includes('-')) {
// // // //             const parts = dateStr.split('-');
// // // //             if (parts[0].length === 4) {
// // // //               return dateStr;
// // // //             } else {
// // // //               const [day, month, year] = parts;
// // // //               return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
// // // //             }
// // // //           }
// // // //           return dateStr;
// // // //         };
        
// // // //         params.append('startDate', convertDateFormat(searchParams.startDate));
// // // //         params.append('endDate', convertDateFormat(searchParams.endDate));
// // // //       }
      
// // // //       params.append('page', page);
// // // //       const url = params.toString() ? `/reports/usages?${params.toString()}` : '/reports/usages';
      
// // // //       console.log('Fetching Usage Detail URL:', url);
// // // //       console.log('Date params:', {
// // // //         startDate: searchParams.startDate,
// // // //         endDate: searchParams.endDate,
// // // //         convertedStart: searchParams.startDate ? convertDateFormat(searchParams.startDate) : null,
// // // //         convertedEnd: searchParams.endDate ? convertDateFormat(searchParams.endDate) : null
// // // //       });
      
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
  
// // // //   const fetchCustomers = async () => {
// // // //     try {
// // // //       const response = await axiosInstance.get('/customers');
// // // //       if (response.data.success) {
// // // //         setCustomers(response.data.data);
// // // //       }
// // // //     } catch (error) {
// // // //       console.error('Error fetching data:', error);
// // // //     }
// // // //   };

// // // //   useEffect(() => {
// // // //     fetchData();
// // // //     fetchCenters();
// // // //     fetchProducts();
// // // //     fetchCustomers();
// // // //   }, []);

// // // //   const handlePageChange = (page) => {
// // // //     if (page < 1 || page > totalPages) return;
// // // //     fetchData(activeSearch, page);
// // // //   };
// // // //   const getFlattenedData = () => {
// // // //     const flattened = [];
// // // //     data.forEach(usage => {
// // // //       if (usage.items && usage.items.length > 0) {
// // // //         usage.items.forEach(item => {
// // // //           flattened.push({
// // // //             ...usage,
// // // //             item: item,
// // // //             product: item.product,
// // // //             quantity: item.quantity,
// // // //             uniqueKey: `${usage._id}_${item._id}`
// // // //           });
// // // //         });
// // // //       } else {
// // // //         flattened.push({
// // // //           ...usage,
// // // //           item: null,
// // // //           product: null,
// // // //           quantity: 0,
// // // //           uniqueKey: `${usage._id}_no_item`
// // // //         });
// // // //       }
// // // //     });
// // // //     return flattened;
// // // //   };

// // // //   const calculateTotals = () => {
// // // //     const totals = {
// // // //       totalQty: 0,
// // // //       onuCharges: 0,
// // // //       packageAmount: 0,
// // // //       installationCharges: 0,
// // // //       shiftingAmount: 0,
// // // //       wireChangeAmount: 0,
// // // //       totalRevenue: 0,
// // // //     };
  
// // // //     getFlattenedData().forEach(item => {
// // // //       totals.totalQty += parseFloat(item.quantity || 0);
// // // //       totals.onuCharges += parseFloat(item.onuCharges || 0);
// // // //       totals.packageAmount += parseFloat(item.packageAmount || 0);
// // // //       totals.installationCharges += parseFloat(item.installationCharges || 0);
// // // //       totals.shiftingAmount += parseFloat(item.shiftingAmount || 0);
// // // //       totals.wireChangeAmount += parseFloat(item.wireChangeAmount || 0);
// // // //       totals.totalRevenue += parseFloat(item.totalRevenue || 0);
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
// // // //       endDate: '',
// // // //       usageType: '',
// // // //       connectionType: '',
// // // //       customer: '',
// // // //       keyword: '', 
// // // //       outlet: '' 
// // // //     });
// // // //     setSearchTerm('');
// // // //     fetchData({}, 1);
// // // //   };

// // // //   const isSearchActive = () => {
// // // //     return activeSearch.center || 
// // // //            activeSearch.product || 
// // // //            activeSearch.startDate || 
// // // //            activeSearch.endDate ||
// // // //            activeSearch.usageType ||
// // // //            activeSearch.connectionType ||
// // // //            activeSearch.customer ||
// // // //            activeSearch.keyword || 
// // // //            activeSearch.outlet;
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

// // // //   const fetchAllDataForExport = async () => {
// // // //     try {
// // // //       setLoading(true);
    
// // // //       const params = new URLSearchParams();
  
// // // //       if (activeSearch.center) {
// // // //         params.append('center', activeSearch.center);
// // // //       }
// // // //       if (activeSearch.product) {
// // // //         params.append('product', activeSearch.product);
// // // //       }
// // // //       if (activeSearch.usageType) {
// // // //         params.append('usageType', activeSearch.usageType);
// // // //       }
// // // //       if (activeSearch.connectionType) {
// // // //         params.append('connectionType', activeSearch.connectionType);
// // // //       }
// // // //       if (activeSearch.customer) {
// // // //         params.append('customer', activeSearch.customer);
// // // //       }
// // // //       if (activeSearch.startDate && activeSearch.endDate) {
// // // //         const convertDateFormat = (dateStr) => {
// // // //           if (dateStr.includes('-')) {
// // // //             const parts = dateStr.split('-');
// // // //             if (parts[0].length === 4) {
// // // //               return dateStr;
// // // //             } else {
// // // //               const [day, month, year] = parts;
// // // //               return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
// // // //             }
// // // //           }
// // // //           return dateStr;
// // // //         };
        
// // // //         params.append('startDate', convertDateFormat(activeSearch.startDate));
// // // //         params.append('endDate', convertDateFormat(activeSearch.endDate));
// // // //       }
      
// // // //       if (activeSearch.keyword) {
// // // //         params.append('search', activeSearch.keyword);
// // // //       }
// // // //       if (activeSearch.outlet) {
// // // //         params.append('outlet', activeSearch.outlet);
// // // //       }
// // // //       // params.append('export','true');
// // // //       const url = params.toString() ? `/reports/usages?${params.toString()}` : '/reports/usages';
// // // //       console.log('Export URL with filters:', url);
// // // //       console.log('Export Date params:', {
// // // //         startDate: activeSearch.startDate,
// // // //         endDate: activeSearch.endDate,
// // // //         convertedStart: activeSearch.startDate ? convertDateFormat(activeSearch.startDate) : null,
// // // //         convertedEnd: activeSearch.endDate ? convertDateFormat(activeSearch.endDate) : null
// // // //       });
      
// // // //       const response = await axiosInstance.get(url);
      
// // // //       if (response.data.success) {
// // // //         return response.data.data;
// // // //       } else {
// // // //         throw new Error('API returned unsuccessful response');
// // // //       }
// // // //     } catch (err) {
// // // //       console.error('Error fetching data for export:', err);
// // // //       showError('Error fetching data for export');
// // // //       return [];
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };

// // // //   const generateDetailExport = async () => {
// // // //     try {
// // // //       setLoading(true);
    
// // // //       const allData = await fetchAllDataForExport();
      
// // // //       if (!allData || allData.length === 0) {
// // // //         showError('No data available for export');
// // // //         return;
// // // //       }
// // // //       let fileName = 'Usage_stock_report';
      
// // // //       if (isSearchActive()) {
// // // //         const filterParts = [];
        
// // // //         if (activeSearch.startDate && activeSearch.endDate) {
// // // //           filterParts.push(`${activeSearch.startDate}_to_${activeSearch.endDate}`);
// // // //         }
// // // //         if (activeSearch.center) {
// // // //           const centerName = centers.find(c => c._id === activeSearch.center)?.centerName || 'Center';
// // // //           filterParts.push(centerName.replace(/\s+/g, '_'));
// // // //         }
// // // //         if (activeSearch.product) {
// // // //           const productName = products.find(p => p._id === activeSearch.product)?.productTitle || 'Product';
// // // //           filterParts.push(productName.replace(/\s+/g, '_'));
// // // //         }
// // // //         if (activeSearch.usageType) {
// // // //           filterParts.push(activeSearch.usageType.replace(/\s+/g, '_'));
// // // //         }
// // // //         if (activeSearch.connectionType) {
// // // //           filterParts.push(activeSearch.connectionType);
// // // //         }
        
// // // //         if (filterParts.length > 0) {
// // // //           fileName += `_${filterParts.join('_')}`;
// // // //         }
// // // //       }
      
// // // //       fileName += `_${new Date().toISOString().split('T')[0]}.csv`;
  
// // // //       const headers = [
// // // //         'Date',
// // // //         'Type',
// // // //         'Center',
// // // //         'Product',
// // // //         'Product Type',
// // // //         'Qty',
// // // //         'User/Building',
// // // //         'Address',
// // // //         'Mobile',
// // // //         'Package Duration',
// // // //         'Status',
// // // //         'ONU Chrg.',
// // // //         'Pkt. Amt.',
// // // //         'Inst. Chrg.',
// // // //         'Shifting Amount',
// // // //         'Wire Change Amount',
// // // //         'Total Amount',
// // // //         'Reason'
// // // //       ];

// // // //       const flattenedExportData = [];
// // // //       allData.forEach(usage => {
// // // //         if (usage.items && usage.items.length > 0) {
// // // //           usage.items.forEach(item => {
// // // //             flattenedExportData.push({
// // // //               ...usage,
// // // //               item: item,
// // // //               product: item.product,
// // // //               quantity: item.quantity
// // // //             });
// // // //           });
// // // //         } else {
// // // //           flattenedExportData.push({
// // // //             ...usage,
// // // //             item: null,
// // // //             product: null,
// // // //             quantity: 0
// // // //           });
// // // //         }
// // // //       });
  
// // // //       const csvData = flattenedExportData.map(item => [
// // // //         formatDate(item.date || ''),
// // // //         item.usageType || '',
// // // //         item.center?.centerName || '',
// // // //         item.product?.productTitle || '',
// // // //         item.product?.productCategory?.productCategory || '',
// // // //         item.quantity || 0,
// // // //         item.usageType === 'Customer' ? item.customer?.username || item.customer?.name || '' :
// // // //         item.usageType === 'Building' ? item.fromBuilding?.buildingName || item.fromBuilding?.displayName || '' :
// // // //         item.usageType === 'Building to Building' ? `${item.fromBuilding?.buildingName || ''} to ${item.toBuilding?.buildingName || ''}` :
// // // //         item.usageType === 'Control Room' ? item.fromControlRoom?.buildingName || item.fromControlRoom?.displayName || '' : '',
// // // //         item.usageType === 'Customer' ? `${item.customer?.address1 || ''} ${item.customer?.address2 || ''}`.trim() || '' :
// // // //         item.usageType === 'Building' ? `${item.fromBuilding?.address1 || ''} ${item.fromBuilding?.address2 || ''}`.trim() || '' :
// // // //         item.usageType === 'Control Room' ? `${item.fromControlRoom?.address1 || ''} ${item.fromControlRoom?.address2 || ''}`.trim() || '' : '',
// // // //         item.customer?.mobile || '',
// // // //         item.packageDuration || '',
// // // //         item.status || '',
// // // //         item.onuCharges || 0,
// // // //         item.packageAmount || 0,
// // // //         item.installationCharges || 0,
// // // //         item.shiftingAmount || 0,
// // // //         item.wireChangeAmount || 0,
// // // //         item.totalRevenue || 0,
// // // //         item.reason || ''
// // // //       ]);
  
// // // //       const csvContent = [
// // // //         headers.join(','),
// // // //         ...csvData.map(row =>
// // // //           row
// // // //             .map(field => {
// // // //               const stringField = String(field ?? '');
// // // //               return `"${stringField.replace(/"/g, '""')}"`;
// // // //             })
// // // //             .join(',')
// // // //         )
// // // //       ].join('\n');
  
// // // //       const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
// // // //       const link = document.createElement('a');
// // // //       const url = URL.createObjectURL(blob);
// // // //       link.setAttribute('href', url);
// // // //       link.setAttribute('download', fileName);
// // // //       link.style.visibility = 'hidden';
// // // //       document.body.appendChild(link);
// // // //       link.click();
// // // //       document.body.removeChild(link);
// // // //       URL.revokeObjectURL(url);
      
// // // //       console.log('Export completed with filters:', activeSearch);
// // // //     } catch (error) {
// // // //       console.error('Error generating export:', error);
// // // //       showError('Error generating export file');
// // // //     } finally {
// // // //       setLoading(false);
// // // //     }
// // // //   };


// // // //   return (
// // // //     <div>
// // // //       <div className='title'>Usage Stock Report </div>
      
// // // //       <SearchUsageDetail
// // // //         visible={searchModalVisible}
// // // //         onClose={() => setSearchModalVisible(false)}
// // // //         onSearch={handleSearch}
// // // //         centers={centers}
// // // //         products={products}
// // // //         customers={customers}
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
// // // //               disabled={loading}
// // // //             >
// // // //               <i className="fa fa-fw fa-file-excel"></i>
// // // //               {loading ? 'Exporting...' : 'Export'}
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
// // // //         <div>
// // // //         </div>

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
// // // //                   <CTableHeaderCell scope="col" onClick={() => handleSort('date')} className="sortable-header">
// // // //                     Date {getSortIcon('date')}
// // // //                   </CTableHeaderCell>
// // // //                   <CTableHeaderCell scope="col" onClick={() => handleSort('usageType')} className="sortable-header">
// // // //                     Type {getSortIcon('usageType')}
// // // //                   </CTableHeaderCell>
// // // //                   <CTableHeaderCell scope="col" onClick={() => handleSort('center.centerName')} className="sortable-header">
// // // //                     Branch {getSortIcon('center.centerName')}
// // // //                   </CTableHeaderCell>
// // // //                   <CTableHeaderCell scope="col" onClick={() => handleSort('product.productTitle')} className="sortable-header">
// // // //                     Product {getSortIcon('product.productTitle')}
// // // //                   </CTableHeaderCell>
// // // //                   <CTableHeaderCell scope="col" onClick={() => handleSort('product.productCategory.productCategory')} className="sortable-header">
// // // //                     Product Type {getSortIcon('product.productCategory.productCategory')}
// // // //                   </CTableHeaderCell>
// // // //                   <CTableHeaderCell scope="col" onClick={() => handleSort('quantity')} className="sortable-header">
// // // //                     Qty {getSortIcon('quantity')}
// // // //                   </CTableHeaderCell>
// // // //                   <CTableHeaderCell scope="col" className="sortable-header">
// // // //                     User/Building
// // // //                   </CTableHeaderCell>
// // // //                   <CTableHeaderCell scope="col" className="sortable-header">
// // // //                     Address
// // // //                   </CTableHeaderCell>
// // // //                   <CTableHeaderCell scope="col" className="sortable-header">
// // // //                     Mobile
// // // //                   </CTableHeaderCell>
// // // //                   <CTableHeaderCell scope="col" onClick={() => handleSort('packageDuration')} className="sortable-header">
// // // //                     Package Duration {getSortIcon('packageDuration')}
// // // //                   </CTableHeaderCell>
// // // //                   <CTableHeaderCell scope="col" onClick={() => handleSort('status')} className="sortable-header">
// // // //                     Status {getSortIcon('status')}
// // // //                   </CTableHeaderCell>
// // // //                   <CTableHeaderCell scope="col" onClick={() => handleSort('onuCharges')} className="sortable-header">
// // // //                     ONU Chrg. {getSortIcon('onuCharges')}
// // // //                   </CTableHeaderCell>
// // // //                   <CTableHeaderCell scope="col" onClick={() => handleSort('packageAmount')} className="sortable-header">
// // // //                     Pkt. Amt. {getSortIcon('packageAmount')}
// // // //                   </CTableHeaderCell>
// // // //                   <CTableHeaderCell scope="col" onClick={() => handleSort('installationCharges')} className="sortable-header">
// // // //                     Inst. Chrg. {getSortIcon('installationCharges')}
// // // //                   </CTableHeaderCell>
// // // //                   <CTableHeaderCell scope="col" onClick={() => handleSort('shiftingAmount')} className="sortable-header">
// // // //                     Shifting Amount {getSortIcon('shiftingAmount')}
// // // //                   </CTableHeaderCell>
// // // //                   <CTableHeaderCell scope="col" onClick={() => handleSort('wireChangeAmount')} className="sortable-header">
// // // //                     Wire Change Amount {getSortIcon('wireChangeAmount')}
// // // //                   </CTableHeaderCell>
// // // //                   <CTableHeaderCell scope="col" onClick={() => handleSort('totalRevenue')} className="sortable-header">
// // // //                     Total Amount {getSortIcon('totalRevenue')}
// // // //                   </CTableHeaderCell>
// // // //                   <CTableHeaderCell scope="col" onClick={() => handleSort('reason')} className="sortable-header">
// // // //                     Reason {getSortIcon('reason')}
// // // //                   </CTableHeaderCell>
// // // //                 </CTableRow>
// // // //               </CTableHead>
// // // //               <CTableBody>
// // // //                 {filteredFlattenedData.length > 0 ? (
// // // //                   <>
// // // //                     {filteredFlattenedData.map((item) => (
// // // //                       <CTableRow key={item.uniqueKey}>
// // // //                         <CTableDataCell>
// // // //                           {formatDate(item.date || '')}
// // // //                         </CTableDataCell>
// // // //                         <CTableDataCell>{item.usageType || ''}</CTableDataCell>
// // // //                         <CTableDataCell>{item.center?.centerName || ''}</CTableDataCell>
// // // //                         <CTableDataCell>{item.product?.productTitle || 'N/A'}</CTableDataCell>
// // // //                         <CTableDataCell>
// // // //                           {item.product?.productCategory?.productCategory || 'N/A'}
// // // //                         </CTableDataCell>
// // // //                         <CTableDataCell>
// // // //                           {item.quantity || 0}
// // // //                         </CTableDataCell>
// // // //                         <CTableDataCell>
// // // //                           {item.usageType === 'Customer' ? item.customer?.username || item.customer?.name || '' :
// // // //                            item.usageType === 'Building' ? item.fromBuilding?.buildingName || item.fromBuilding?.displayName || '' :
// // // //                            item.usageType === 'Building to Building' ? `${item.fromBuilding?.buildingName || ''} to ${item.toBuilding?.buildingName || ''}` :
// // // //                            item.usageType === 'Control Room' ? item.fromControlRoom?.buildingName || item.fromControlRoom?.displayName || '' :
// // // //                            ''}
// // // //                         </CTableDataCell>
// // // //                         <CTableDataCell>
// // // //                           {item.usageType === 'Customer' ? `${item.customer?.address1 || ''} ${item.customer?.address2 || ''}`.trim() || '' :
// // // //                            item.usageType === 'Building' ? `${item.fromBuilding?.address1 || ''} ${item.fromBuilding?.address2 || ''}`.trim() || 'N/A' :
// // // //                            item.usageType === 'Control Room' ? `${item.fromControlRoom?.address1 || ''} ${item.fromControlRoom?.address2 || ''}`.trim() || '' :
// // // //                            ''}
// // // //                         </CTableDataCell>
// // // //                         <CTableDataCell>{item.customer?.mobile || ''}</CTableDataCell>
// // // //                         <CTableDataCell>{item.packageDuration || ''}</CTableDataCell>
// // // //                         <CTableDataCell>{item.status || ''}</CTableDataCell>
// // // //                         <CTableDataCell>{item.onuCharges || ''}</CTableDataCell>
// // // //                         <CTableDataCell>{item.packageAmount || ''}</CTableDataCell>
// // // //                         <CTableDataCell>{item.installationCharges || ''}</CTableDataCell>
// // // //                         <CTableDataCell>{item.shiftingAmount || ''}</CTableDataCell>
// // // //                         <CTableDataCell>{item.wireChangeAmount || ''}</CTableDataCell>
// // // //                         <CTableDataCell>{item.totalRevenue || ''}</CTableDataCell>
// // // //                         <CTableDataCell>{item.reason || ''}</CTableDataCell>
// // // //                       </CTableRow>
// // // //                     ))}
// // // //                     <CTableRow className='total-row'>
// // // //                       <CTableDataCell colSpan="5">Total</CTableDataCell>
// // // //                       <CTableDataCell>{totals.totalQty.toFixed(2)}</CTableDataCell>
// // // //                       <CTableDataCell colSpan="4"></CTableDataCell>
// // // //                       <CTableDataCell></CTableDataCell>
// // // //                       <CTableDataCell>{totals.onuCharges.toFixed(2)}</CTableDataCell>
// // // //                       <CTableDataCell>{totals.packageAmount.toFixed(2)}</CTableDataCell>
// // // //                       <CTableDataCell>{totals.installationCharges.toFixed(2)}</CTableDataCell>
// // // //                       <CTableDataCell>{totals.shiftingAmount.toFixed(2)}</CTableDataCell>
// // // //                       <CTableDataCell>{totals.wireChangeAmount.toFixed(2)}</CTableDataCell>
// // // //                       <CTableDataCell>{totals.totalRevenue.toFixed(2)}</CTableDataCell>
// // // //                       <CTableDataCell></CTableDataCell>
// // // //                     </CTableRow>
// // // //                   </>
// // // //                 ) : (
// // // //                   <CTableRow>
// // // //                     <CTableDataCell colSpan="18" className="text-center">
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

// // // // export default UsageDetail;


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
// // // import { formatDate } from 'src/utils/FormatDateTime';
// // // import SearchUsageDetail from './SearchUsageDetail';
// // // import { useLocation, useNavigate } from 'react-router-dom';

// // // const UsageDetail = () => {
// // //   const [data, setData] = useState([]);
// // //   const [centers, setCenters] = useState([]);
// // //   const [products, setProducts] = useState([]);
// // //   const [customers, setCustomers] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState(null);
// // //   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
// // //   const [searchTerm, setSearchTerm] = useState('');
// // //   const [searchModalVisible, setSearchModalVisible] = useState(false);
// // //   const [activeSearch, setActiveSearch] = useState({ 
// // //     center: '', 
// // //     product: '', 
// // //     startDate: '', 
// // //     endDate: '',
// // //     usageType: '',
// // //     connectionType: '',
// // //     customer: '',
// // //     keyword: '', 
// // //     outlet: '' 
// // //   });
// // //   const [currentPage, setCurrentPage] = useState(1);
// // //   const [totalPages, setTotalPages] = useState(1);
// // //   const location = useLocation();
// // //   const navigate = useNavigate();
  
// // //   useEffect(() => {
// // //     // Check for state first (from navigation)
// // //     if (location.state?.productId && location.state?.centerId) {
// // //       const filteredSearch = {
// // //         product: location.state.productId,
// // //         center: location.state.centerId,
// // //         startDate: '',
// // //         endDate: '',
// // //         usageType: '',
// // //         connectionType: '',
// // //         customer: '',
// // //         keyword: '',
// // //         outlet: ''
// // //       };
      
// // //       setActiveSearch(filteredSearch);
// // //       fetchData(filteredSearch, 1);
// // //       document.title = `Usage Details - ${location.state.productName || 'Product'} at ${location.state.centerName || 'Center'}`;
// // //     } 
// // //     // Check for URL params as fallback
// // //     else {
// // //       const params = new URLSearchParams(location.search);
// // //       const productParam = params.get('product');
// // //       const centerParam = params.get('center');
      
// // //       if (productParam && centerParam) {
// // //         const filteredSearch = {
// // //           product: productParam,
// // //           center: centerParam,
// // //           startDate: '',
// // //           endDate: '',
// // //           usageType: '',
// // //           connectionType: '',
// // //           customer: '',
// // //           keyword: '',
// // //           outlet: ''
// // //         };
        
// // //         setActiveSearch(filteredSearch);
// // //         fetchData(filteredSearch, 1);
        
// // //         const productName = params.get('productName') ? decodeURIComponent(params.get('productName')) : 'Product';
// // //         const centerName = params.get('centerName') ? decodeURIComponent(params.get('centerName')) : 'Center';
// // //         document.title = `Usage Details - ${productName} at ${centerName}`;
// // //       } else {
// // //         // If no filters, fetch all data
// // //         fetchData();
// // //       }
// // //     }
// // //   }, [location.state, location.search]);

// // //   const convertDateFormat = (dateStr) => {
// // //     if (!dateStr) return '';
// // //     const [day, month, year] = dateStr.split('-');
// // //     return `${year}-${month}-${day}`;
// // //   };

// // //   const fetchData = async (searchParams = {}, page = 1) => {
// // //     try {
// // //       setLoading(true);
// // //       setError(null);
// // //       const params = new URLSearchParams();
  
// // //       // Use the provided searchParams or activeSearch
// // //       const currentSearch = Object.keys(searchParams).length > 0 ? searchParams : activeSearch;
      
// // //       if (currentSearch.center) {
// // //         params.append('center', currentSearch.center);
// // //       }
// // //       if (currentSearch.product) {
// // //         params.append('product', currentSearch.product);
// // //       }
// // //       if (currentSearch.usageType) {
// // //         params.append('usageType', currentSearch.usageType);
// // //       }
// // //       if (currentSearch.connectionType) {
// // //         params.append('connectionType', currentSearch.connectionType);
// // //       }
// // //       if (currentSearch.customer) {
// // //         params.append('customer', currentSearch.customer);
// // //       }
// // //       if (currentSearch.startDate && currentSearch.endDate) {
// // //         params.append('startDate', convertDateFormat(currentSearch.startDate));
// // //         params.append('endDate', convertDateFormat(currentSearch.endDate));
// // //       }
      
// // //       params.append('page', page);
      
// // //       // Log the filters being applied
// // //       console.log('Fetching Usage Detail with filters:', {
// // //         center: currentSearch.center,
// // //         product: currentSearch.product,
// // //         url: params.toString() ? `/reports/usages?${params.toString()}` : '/reports/usages'
// // //       });
      
// // //       const url = params.toString() ? `/reports/usages?${params.toString()}` : '/reports/usages';
      
// // //       const response = await axiosInstance.get(url);
      
// // //       if (response.data.success) {
// // //         setData(response.data.data);
// // //         setCurrentPage(response.data.pagination.currentPage);
// // //         setTotalPages(response.data.pagination.totalPages);
// // //       } else {
// // //         const errorMessage = response.data.message || 'API returned unsuccessful response';
// // //         setError(errorMessage);
// // //         console.error('Backend error:', response.data);
// // //       }
// // //     } catch (err) {
// // //       if (err.response) {
// // //         const errorMessage = err.response.data?.message || 
// // //                             err.response.data?.error || 
// // //                             `Error ${err.response.status}: ${err.response.statusText}`;
// // //         setError(errorMessage);
// // //         console.error('Error response:', err.response.data);
// // //       } else if (err.request) {
// // //         setError('No response received from server. Please check your network connection.');
// // //         console.error('Error request:', err.request);
// // //       } else {
// // //         setError(err.message || 'An error occurred while fetching data');
// // //         console.error('Error message:', err.message);
// // //       }
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const fetchCenters = async () => {
// // //     try {
// // //       const response = await axiosInstance.get('/centers');
// // //       if (response.data.success) {
// // //         setCenters(response.data.data);
// // //       }
// // //     } catch (error) {
// // //       console.error('Error fetching centers:', error);
// // //     }
// // //   };
  
// // //   const fetchProducts = async () => {
// // //     try {
// // //       const response = await axiosInstance.get('/products/all');
// // //       if (response.data.success) {
// // //         setProducts(response.data.data);
// // //       }
// // //     } catch (error) {
// // //       console.error('Error fetching products:', error);
// // //     }
// // //   };
  
// // //   const fetchCustomers = async () => {
// // //     try {
// // //       const response = await axiosInstance.get('/customers');
// // //       if (response.data.success) {
// // //         setCustomers(response.data.data);
// // //       }
// // //     } catch (error) {
// // //       console.error('Error fetching customers:', error);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchCenters();
// // //     fetchProducts();
// // //     fetchCustomers();
// // //   }, []);

// // //   const handlePageChange = (page) => {
// // //     if (page < 1 || page > totalPages) return;
// // //     fetchData(activeSearch, page);
// // //   };

// // //   const getFlattenedData = () => {
// // //     const flattened = [];
// // //     data.forEach(usage => {
// // //       if (usage.items && usage.items.length > 0) {
// // //         usage.items.forEach(item => {
// // //           flattened.push({
// // //             ...usage,
// // //             item: item,
// // //             product: item.product,
// // //             quantity: item.quantity,
// // //             uniqueKey: `${usage._id}_${item._id}`
// // //           });
// // //         });
// // //       } else {
// // //         flattened.push({
// // //           ...usage,
// // //           item: null,
// // //           product: null,
// // //           quantity: 0,
// // //           uniqueKey: `${usage._id}_no_item`
// // //         });
// // //       }
// // //     });
// // //     return flattened;
// // //   };

// // //   const calculateTotals = () => {
// // //     const totals = {
// // //       totalQty: 0,
// // //       onuCharges: 0,
// // //       packageAmount: 0,
// // //       installationCharges: 0,
// // //       shiftingAmount: 0,
// // //       wireChangeAmount: 0,
// // //       totalRevenue: 0,
// // //     };
  
// // //     getFlattenedData().forEach(item => {
// // //       totals.totalQty += parseFloat(item.quantity || 0);
// // //       totals.onuCharges += parseFloat(item.onuCharges || 0);
// // //       totals.packageAmount += parseFloat(item.packageAmount || 0);
// // //       totals.installationCharges += parseFloat(item.installationCharges || 0);
// // //       totals.shiftingAmount += parseFloat(item.shiftingAmount || 0);
// // //       totals.wireChangeAmount += parseFloat(item.wireChangeAmount || 0);
// // //       totals.totalRevenue += parseFloat(item.totalRevenue || 0);
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
// // //       endDate: '',
// // //       usageType: '',
// // //       connectionType: '',
// // //       customer: '',
// // //       keyword: '', 
// // //       outlet: '' 
// // //     });
// // //     setSearchTerm('');
// // //     fetchData({}, 1);
// // //   };

// // //   const isSearchActive = () => {
// // //     return activeSearch.center || 
// // //            activeSearch.product || 
// // //            activeSearch.startDate || 
// // //            activeSearch.endDate ||
// // //            activeSearch.usageType ||
// // //            activeSearch.connectionType ||
// // //            activeSearch.customer ||
// // //            activeSearch.keyword || 
// // //            activeSearch.outlet;
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

// // //   const fetchAllDataForExport = async () => {
// // //     try {
// // //       setLoading(true);
    
// // //       const params = new URLSearchParams();
  
// // //       if (activeSearch.center) {
// // //         params.append('center', activeSearch.center);
// // //       }
// // //       if (activeSearch.product) {
// // //         params.append('product', activeSearch.product);
// // //       }
// // //       if (activeSearch.usageType) {
// // //         params.append('usageType', activeSearch.usageType);
// // //       }
// // //       if (activeSearch.connectionType) {
// // //         params.append('connectionType', activeSearch.connectionType);
// // //       }
// // //       if (activeSearch.customer) {
// // //         params.append('customer', activeSearch.customer);
// // //       }
// // //       if (activeSearch.startDate && activeSearch.endDate) {
// // //         params.append('startDate', convertDateFormat(activeSearch.startDate));
// // //         params.append('endDate', convertDateFormat(activeSearch.endDate));
// // //       }
      
// // //       if (activeSearch.keyword) {
// // //         params.append('search', activeSearch.keyword);
// // //       }
// // //       if (activeSearch.outlet) {
// // //         params.append('outlet', activeSearch.outlet);
// // //       }
// // //       params.append('export','true');
// // //       const url = params.toString() ? `/reports/usages?${params.toString()}` : '/reports/usages';
// // //       console.log('Export URL with filters:', url);
      
// // //       const response = await axiosInstance.get(url);
      
// // //       if (response.data.success) {
// // //         return response.data.data;
// // //       } else {
// // //         throw new Error('API returned unsuccessful response');
// // //       }
// // //     } catch (err) {
// // //       console.error('Error fetching data for export:', err);
// // //       showError('Error fetching data for export');
// // //       return [];
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   const generateDetailExport = async () => {
// // //     try {
// // //       setLoading(true);
    
// // //       const allData = await fetchAllDataForExport();
      
// // //       if (!allData || allData.length === 0) {
// // //         showError('No data available for export');
// // //         return;
// // //       }
      
// // //       let fileName = 'Usage_stock_report';
      
// // //       if (isSearchActive()) {
// // //         const filterParts = [];
        
// // //         if (activeSearch.startDate && activeSearch.endDate) {
// // //           filterParts.push(`${activeSearch.startDate}_to_${activeSearch.endDate}`);
// // //         }
// // //         if (activeSearch.center) {
// // //           const centerName = centers.find(c => c._id === activeSearch.center)?.centerName || 'Center';
// // //           filterParts.push(centerName.replace(/\s+/g, '_'));
// // //         }
// // //         if (activeSearch.product) {
// // //           const productName = products.find(p => p._id === activeSearch.product)?.productTitle || 'Product';
// // //           filterParts.push(productName.replace(/\s+/g, '_'));
// // //         }
// // //         if (activeSearch.usageType) {
// // //           filterParts.push(activeSearch.usageType.replace(/\s+/g, '_'));
// // //         }
// // //         if (activeSearch.connectionType) {
// // //           filterParts.push(activeSearch.connectionType);
// // //         }
        
// // //         if (filterParts.length > 0) {
// // //           fileName += `_${filterParts.join('_')}`;
// // //         }
// // //       }
      
// // //       fileName += `_${new Date().toISOString().split('T')[0]}.csv`;
  
// // //       const headers = [
// // //         'Date',
// // //         'Type',
// // //         'Center',
// // //         'Product',
// // //         'Product Type',
// // //         'Qty',
// // //         'User/Building',
// // //         'Address',
// // //         'Mobile',
// // //         'Package Duration',
// // //         'Status',
// // //         'ONU Chrg.',
// // //         'Pkt. Amt.',
// // //         'Inst. Chrg.',
// // //         'Shifting Amount',
// // //         'Wire Change Amount',
// // //         'Total Amount',
// // //         'Reason'
// // //       ];

// // //       const flattenedExportData = [];
// // //       allData.forEach(usage => {
// // //         if (usage.items && usage.items.length > 0) {
// // //           usage.items.forEach(item => {
// // //             flattenedExportData.push({
// // //               ...usage,
// // //               item: item,
// // //               product: item.product,
// // //               quantity: item.quantity
// // //             });
// // //           });
// // //         } else {
// // //           flattenedExportData.push({
// // //             ...usage,
// // //             item: null,
// // //             product: null,
// // //             quantity: 0
// // //           });
// // //         }
// // //       });
  
// // //       const csvData = flattenedExportData.map(item => [
// // //         formatDate(item.date || ''),
// // //         item.usageType || '',
// // //         item.center?.centerName || '',
// // //         item.product?.productTitle || '',
// // //         item.product?.productCategory?.productCategory || '',
// // //         item.quantity || 0,
// // //         item.usageType === 'Customer' ? item.customer?.username || item.customer?.name || '' :
// // //         item.usageType === 'Building' ? item.fromBuilding?.buildingName || item.fromBuilding?.displayName || '' :
// // //         item.usageType === 'Building to Building' ? `${item.fromBuilding?.buildingName || ''} to ${item.toBuilding?.buildingName || ''}` :
// // //         item.usageType === 'Control Room' ? item.fromControlRoom?.buildingName || item.fromControlRoom?.displayName || '' : '',
// // //         item.usageType === 'Customer' ? `${item.customer?.address1 || ''} ${item.customer?.address2 || ''}`.trim() || '' :
// // //         item.usageType === 'Building' ? `${item.fromBuilding?.address1 || ''} ${item.fromBuilding?.address2 || ''}`.trim() || '' :
// // //         item.usageType === 'Control Room' ? `${item.fromControlRoom?.address1 || ''} ${item.fromControlRoom?.address2 || ''}`.trim() || '' : '',
// // //         item.customer?.mobile || '',
// // //         item.packageDuration || '',
// // //         item.status || '',
// // //         item.onuCharges || 0,
// // //         item.packageAmount || 0,
// // //         item.installationCharges || 0,
// // //         item.shiftingAmount || 0,
// // //         item.wireChangeAmount || 0,
// // //         item.totalRevenue || 0,
// // //         item.reason || ''
// // //       ]);
  
// // //       const csvContent = [
// // //         headers.join(','),
// // //         ...csvData.map(row =>
// // //           row
// // //             .map(field => {
// // //               const stringField = String(field ?? '');
// // //               return `"${stringField.replace(/"/g, '""')}"`;
// // //             })
// // //             .join(',')
// // //         )
// // //       ].join('\n');
  
// // //       const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
// // //       const link = document.createElement('a');
// // //       const url = URL.createObjectURL(blob);
// // //       link.setAttribute('href', url);
// // //       link.setAttribute('download', fileName);
// // //       link.style.visibility = 'hidden';
// // //       document.body.appendChild(link);
// // //       link.click();
// // //       document.body.removeChild(link);
// // //       URL.revokeObjectURL(url);
      
// // //       console.log('Export completed with filters:', activeSearch);
// // //     } catch (error) {
// // //       console.error('Error generating export:', error);
// // //       showError('Error generating export file');
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   return (
// // //     <div>
// // //       <div className='title'>Usage Stock Report </div>
      
// // //       <SearchUsageDetail
// // //         visible={searchModalVisible}
// // //         onClose={() => setSearchModalVisible(false)}
// // //         onSearch={handleSearch}
// // //         centers={centers}
// // //         products={products}
// // //         customers={customers}
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
// // //               disabled={loading}
// // //             >
// // //               <i className="fa fa-fw fa-file-excel"></i>
// // //               {loading ? 'Exporting...' : 'Export'}
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
// // //                   <CTableHeaderCell scope="col" onClick={() => handleSort('date')} className="sortable-header">
// // //                     Date {getSortIcon('date')}
// // //                   </CTableHeaderCell>
// // //                   <CTableHeaderCell scope="col" onClick={() => handleSort('usageType')} className="sortable-header">
// // //                     Type {getSortIcon('usageType')}
// // //                   </CTableHeaderCell>
// // //                   <CTableHeaderCell scope="col" onClick={() => handleSort('center.centerName')} className="sortable-header">
// // //                     Branch {getSortIcon('center.centerName')}
// // //                   </CTableHeaderCell>
// // //                   <CTableHeaderCell scope="col" onClick={() => handleSort('product.productTitle')} className="sortable-header">
// // //                     Product {getSortIcon('product.productTitle')}
// // //                   </CTableHeaderCell>
// // //                   <CTableHeaderCell scope="col" onClick={() => handleSort('product.productCategory.productCategory')} className="sortable-header">
// // //                     Product Type {getSortIcon('product.productCategory.productCategory')}
// // //                   </CTableHeaderCell>
// // //                   <CTableHeaderCell scope="col" onClick={() => handleSort('quantity')} className="sortable-header">
// // //                     Qty {getSortIcon('quantity')}
// // //                   </CTableHeaderCell>
// // //                   <CTableHeaderCell scope="col" className="sortable-header">
// // //                     User/Building
// // //                   </CTableHeaderCell>
// // //                   <CTableHeaderCell scope="col" className="sortable-header">
// // //                     Address
// // //                   </CTableHeaderCell>
// // //                   <CTableHeaderCell scope="col" className="sortable-header">
// // //                     Mobile
// // //                   </CTableHeaderCell>
// // //                   <CTableHeaderCell scope="col" onClick={() => handleSort('packageDuration')} className="sortable-header">
// // //                     Package Duration {getSortIcon('packageDuration')}
// // //                   </CTableHeaderCell>
// // //                   <CTableHeaderCell scope="col" onClick={() => handleSort('status')} className="sortable-header">
// // //                     Status {getSortIcon('status')}
// // //                   </CTableHeaderCell>
// // //                   <CTableHeaderCell scope="col" onClick={() => handleSort('onuCharges')} className="sortable-header">
// // //                     ONU Chrg. {getSortIcon('onuCharges')}
// // //                   </CTableHeaderCell>
// // //                   <CTableHeaderCell scope="col" onClick={() => handleSort('packageAmount')} className="sortable-header">
// // //                     Pkt. Amt. {getSortIcon('packageAmount')}
// // //                   </CTableHeaderCell>
// // //                   <CTableHeaderCell scope="col" onClick={() => handleSort('installationCharges')} className="sortable-header">
// // //                     Inst. Chrg. {getSortIcon('installationCharges')}
// // //                   </CTableHeaderCell>
// // //                   <CTableHeaderCell scope="col" onClick={() => handleSort('shiftingAmount')} className="sortable-header">
// // //                     Shifting Amount {getSortIcon('shiftingAmount')}
// // //                   </CTableHeaderCell>
// // //                   <CTableHeaderCell scope="col" onClick={() => handleSort('wireChangeAmount')} className="sortable-header">
// // //                     Wire Change Amount {getSortIcon('wireChangeAmount')}
// // //                   </CTableHeaderCell>
// // //                   <CTableHeaderCell scope="col" onClick={() => handleSort('totalRevenue')} className="sortable-header">
// // //                     Total Amount {getSortIcon('totalRevenue')}
// // //                   </CTableHeaderCell>
// // //                   <CTableHeaderCell scope="col" onClick={() => handleSort('reason')} className="sortable-header">
// // //                     Reason {getSortIcon('reason')}
// // //                   </CTableHeaderCell>
// // //                 </CTableRow>
// // //               </CTableHead>
// // //               <CTableBody>
// // //                 {filteredFlattenedData.length > 0 ? (
// // //                   <>
// // //                     {filteredFlattenedData.map((item) => (
// // //                       <CTableRow key={item.uniqueKey}>
// // //                         <CTableDataCell>
// // //                           {formatDate(item.date || '')}
// // //                         </CTableDataCell>
// // //                         <CTableDataCell>{item.usageType || ''}</CTableDataCell>
// // //                         <CTableDataCell>{item.center?.centerName || ''}</CTableDataCell>
// // //                         <CTableDataCell>{item.product?.productTitle || 'N/A'}</CTableDataCell>
// // //                         <CTableDataCell>
// // //                           {item.product?.productCategory?.productCategory || 'N/A'}
// // //                         </CTableDataCell>
// // //                         <CTableDataCell>
// // //                           {item.quantity || 0}
// // //                         </CTableDataCell>
// // //                         <CTableDataCell>
// // //                           {item.usageType === 'Customer' ? item.customer?.username || item.customer?.name || '' :
// // //                            item.usageType === 'Building' ? item.fromBuilding?.buildingName || item.fromBuilding?.displayName || '' :
// // //                            item.usageType === 'Building to Building' ? `${item.fromBuilding?.buildingName || ''} to ${item.toBuilding?.buildingName || ''}` :
// // //                            item.usageType === 'Control Room' ? item.fromControlRoom?.buildingName || item.fromControlRoom?.displayName || '' :
// // //                            ''}
// // //                         </CTableDataCell>
// // //                         <CTableDataCell>
// // //                           {item.usageType === 'Customer' ? `${item.customer?.address1 || ''} ${item.customer?.address2 || ''}`.trim() || '' :
// // //                            item.usageType === 'Building' ? `${item.fromBuilding?.address1 || ''} ${item.fromBuilding?.address2 || ''}`.trim() || 'N/A' :
// // //                            item.usageType === 'Control Room' ? `${item.fromControlRoom?.address1 || ''} ${item.fromControlRoom?.address2 || ''}`.trim() || '' :
// // //                            ''}
// // //                         </CTableDataCell>
// // //                         <CTableDataCell>{item.customer?.mobile || ''}</CTableDataCell>
// // //                         <CTableDataCell>{item.packageDuration || ''}</CTableDataCell>
// // //                         <CTableDataCell>{item.status || ''}</CTableDataCell>
// // //                         <CTableDataCell>{item.onuCharges || ''}</CTableDataCell>
// // //                         <CTableDataCell>{item.packageAmount || ''}</CTableDataCell>
// // //                         <CTableDataCell>{item.installationCharges || ''}</CTableDataCell>
// // //                         <CTableDataCell>{item.shiftingAmount || ''}</CTableDataCell>
// // //                         <CTableDataCell>{item.wireChangeAmount || ''}</CTableDataCell>
// // //                         <CTableDataCell>{item.totalRevenue || ''}</CTableDataCell>
// // //                         <CTableDataCell>{item.reason || ''}</CTableDataCell>
// // //                       </CTableRow>
// // //                     ))}
// // //                     <CTableRow className='total-row'>
// // //                       <CTableDataCell colSpan="5">Total</CTableDataCell>
// // //                       <CTableDataCell>{totals.totalQty.toFixed(2)}</CTableDataCell>
// // //                       <CTableDataCell colSpan="4"></CTableDataCell>
// // //                       <CTableDataCell></CTableDataCell>
// // //                       <CTableDataCell>{totals.onuCharges.toFixed(2)}</CTableDataCell>
// // //                       <CTableDataCell>{totals.packageAmount.toFixed(2)}</CTableDataCell>
// // //                       <CTableDataCell>{totals.installationCharges.toFixed(2)}</CTableDataCell>
// // //                       <CTableDataCell>{totals.shiftingAmount.toFixed(2)}</CTableDataCell>
// // //                       <CTableDataCell>{totals.wireChangeAmount.toFixed(2)}</CTableDataCell>
// // //                       <CTableDataCell>{totals.totalRevenue.toFixed(2)}</CTableDataCell>
// // //                       <CTableDataCell></CTableDataCell>
// // //                     </CTableRow>
// // //                   </>
// // //                 ) : (
// // //                   <CTableRow>
// // //                     <CTableDataCell colSpan="18" className="text-center">
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

// // // export default UsageDetail;






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
// // import { formatDate } from 'src/utils/FormatDateTime';
// // import SearchUsageDetail from './SearchUsageDetail';
// // import { useLocation, useNavigate } from 'react-router-dom';

// // const UsageDetail = () => {
// //   const [data, setData] = useState([]);
// //   const [centers, setCenters] = useState([]);
// //   const [products, setProducts] = useState([]);
// //   const [customers, setCustomers] = useState([]);
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
// //     centerId: '', 
// //     productId: '', 
// //     startDate: '', 
// //     endDate: '',
// //     usageType: '',
// //     connectionType: '',
// //     customer: '',
// //     keyword: '', 
// //     outlet: '' 
// //   });
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [totalPages, setTotalPages] = useState(1);
// //   const location = useLocation();
// //   const navigate = useNavigate();
  
// //   useEffect(() => {
// //     // Check for state first (from navigation)
// //     if (location.state?.productId && location.state?.centerId) {
// //       const filteredSearch = {
// //         productId: location.state.productId,
// //         centerId: location.state.centerId,
// //         startDate: '',
// //         endDate: '',
// //         usageType: '',
// //         connectionType: '',
// //         customer: '',
// //         keyword: '',
// //         outlet: ''
// //       };
      
// //       console.log('Setting filters from state:', filteredSearch);
// //       setActiveSearch(filteredSearch);
// //       fetchData(filteredSearch, 1);
// //       document.title = `Usage Details - ${location.state.productName || 'Product'} at ${location.state.centerName || 'Center'}`;
// //     } 
// //     // Check for URL params as fallback
// //     else {
// //       const params = new URLSearchParams(location.search);
// //       const productParam = params.get('productId');
// //       const centerParam = params.get('centerId');
      
// //       if (productParam && centerParam) {
// //         const filteredSearch = {
// //           productId: productParam,
// //           centerId: centerParam,
// //           startDate: '',
// //           endDate: '',
// //           usageType: '',
// //           connectionType: '',
// //           customer: '',
// //           keyword: '',
// //           outlet: ''
// //         };
        
// //         console.log('Setting filters from URL params:', filteredSearch);
// //         setActiveSearch(filteredSearch);
// //         fetchData(filteredSearch, 1);
        
// //         const productName = params.get('productName') ? decodeURIComponent(params.get('productName')) : 'Product';
// //         const centerName = params.get('centerName') ? decodeURIComponent(params.get('centerName')) : 'Center';
// //         document.title = `Usage Details - ${productName} at ${centerName}`;
// //       } else {
// //         // If no filters, fetch all data
// //         fetchData();
// //       }
// //     }
// //   }, [location.state, location.search]);

// //   const convertDateFormat = (dateStr) => {
// //     if (!dateStr) return '';
// //     const [day, month, year] = dateStr.split('-');
// //     return `${year}-${month}-${day}`;
// //   };

// //   const fetchData = async (searchParams = {}, page = 1) => {
// //     try {
// //       setLoading(true);
// //       setError(null);
// //       const params = new URLSearchParams();
  
// //       // Use the provided searchParams or activeSearch
// //       const currentSearch = Object.keys(searchParams).length > 0 ? searchParams : activeSearch;
      
// //       // Log the filters being applied
// //       console.log('Fetching Usage Detail with filters:', {
// //         centerId: currentSearch.centerId,
// //         productId: currentSearch.productId,
// //         usageType: currentSearch.usageType,
// //         connectionType: currentSearch.connectionType,
// //         customer: currentSearch.customer
// //       });
      
// //       // Only add parameters if they have values - using centerId and productId
// //       if (currentSearch.centerId) {
// //         params.append('centerId', currentSearch.centerId);
// //       }
// //       if (currentSearch.productId) {
// //         params.append('productId', currentSearch.productId);
// //       }
// //       if (currentSearch.usageType) {
// //         params.append('usageType', currentSearch.usageType);
// //       }
// //       if (currentSearch.connectionType) {
// //         params.append('connectionType', currentSearch.connectionType);
// //       }
// //       if (currentSearch.customer) {
// //         params.append('customer', currentSearch.customer);
// //       }
// //       if (currentSearch.startDate && currentSearch.endDate) {
// //         params.append('startDate', convertDateFormat(currentSearch.startDate));
// //         params.append('endDate', convertDateFormat(currentSearch.endDate));
// //       }
      
// //       params.append('page', page);
      
// //       const url = params.toString() ? `/reports/usages?${params.toString()}` : '/reports/usages';
// //       console.log('Final API URL:', url);
      
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
  
// //   const fetchCustomers = async () => {
// //     try {
// //       const response = await axiosInstance.get('/customers');
// //       if (response.data.success) {
// //         setCustomers(response.data.data);
// //       }
// //     } catch (error) {
// //       console.error('Error fetching customers:', error);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchCenters();
// //     fetchProducts();
// //     fetchCustomers();
// //   }, []);

// //   const handlePageChange = (page) => {
// //     if (page < 1 || page > totalPages) return;
// //     fetchData(activeSearch, page);
// //   };

// //   const getFlattenedData = () => {
// //     const flattened = [];
// //     data.forEach(usage => {
// //       if (usage.items && usage.items.length > 0) {
// //         usage.items.forEach(item => {
// //           flattened.push({
// //             ...usage,
// //             item: item,
// //             product: item.product,
// //             quantity: item.quantity,
// //             uniqueKey: `${usage._id}_${item._id}`
// //           });
// //         });
// //       } else {
// //         flattened.push({
// //           ...usage,
// //           item: null,
// //           product: null,
// //           quantity: 0,
// //           uniqueKey: `${usage._id}_no_item`
// //         });
// //       }
// //     });
// //     return flattened;
// //   };

// //   const calculateTotals = () => {
// //     const totals = {
// //       totalQty: 0,
// //       onuCharges: 0,
// //       packageAmount: 0,
// //       installationCharges: 0,
// //       shiftingAmount: 0,
// //       wireChangeAmount: 0,
// //       totalRevenue: 0,
// //     };
  
// //     getFlattenedData().forEach(item => {
// //       totals.totalQty += parseFloat(item.quantity || 0);
// //       totals.onuCharges += parseFloat(item.onuCharges || 0);
// //       totals.packageAmount += parseFloat(item.packageAmount || 0);
// //       totals.installationCharges += parseFloat(item.installationCharges || 0);
// //       totals.shiftingAmount += parseFloat(item.shiftingAmount || 0);
// //       totals.wireChangeAmount += parseFloat(item.wireChangeAmount || 0);
// //       totals.totalRevenue += parseFloat(item.totalRevenue || 0);
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
// //       centerId: '', 
// //       productId: '', 
// //       startDate: '', 
// //       endDate: '',
// //       usageType: '',
// //       connectionType: '',
// //       customer: '',
// //       keyword: '', 
// //       outlet: '' 
// //     });
// //     setSearchTerm('');
// //     fetchData({}, 1);
// //   };

// //   const isSearchActive = () => {
// //     return activeSearch.centerId || 
// //            activeSearch.productId || 
// //            activeSearch.startDate || 
// //            activeSearch.endDate ||
// //            activeSearch.usageType ||
// //            activeSearch.connectionType ||
// //            activeSearch.customer ||
// //            activeSearch.keyword || 
// //            activeSearch.outlet;
// //   };

// //   const openExportModal = () => {
// //     setExportStartDate(activeSearch.startDate || '');
// //     setExportEndDate(activeSearch.endDate || '');
// //     setExportModalVisible(true);
// //   };

// //   const fetchAllDataForExport = async () => {
// //     try {
// //       const params = new URLSearchParams();
  
// //       if (activeSearch.centerId) {
// //         params.append('centerId', activeSearch.centerId);
// //       }
// //       if (activeSearch.productId) {
// //         params.append('productId', activeSearch.productId);
// //       }
// //       if (activeSearch.usageType) {
// //         params.append('usageType', activeSearch.usageType);
// //       }
// //       if (activeSearch.connectionType) {
// //         params.append('connectionType', activeSearch.connectionType);
// //       }
// //       if (activeSearch.customer) {
// //         params.append('customer', activeSearch.customer);
// //       }
      
// //       // Use export modal date range (overrides active search dates)
// //       if (exportStartDate) {
// //         params.append('startDate', exportStartDate);
// //       }
// //       if (exportEndDate) {
// //         params.append('endDate', exportEndDate);
// //       }
      
// //       if (activeSearch.keyword) {
// //         params.append('search', activeSearch.keyword);
// //       }
// //       if (activeSearch.outlet) {
// //         params.append('outlet', activeSearch.outlet);
// //       }
// //       params.append('export', 'true');
// //       const url = params.toString() ? `/reports/usages?${params.toString()}` : '/reports/usages';
// //       console.log('Export URL with filters:', url);
      
// //       const response = await axiosInstance.get(url);
      
// //       if (response.data.success) {
// //         return response.data.data;
// //       } else {
// //         throw new Error('API returned unsuccessful response');
// //       }
// //     } catch (err) {
// //       console.error('Error fetching data for export:', err);
// //       showError('Error fetching data for export');
// //       return [];
// //     }
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
    
// //       const allData = await fetchAllDataForExport();
      
// //       if (!allData || allData.length === 0) {
// //         showError('No data available for export');
// //         return;
// //       }
      
// //       let fileName = 'Usage_stock_report';
      
// //       // Add date range to filename if provided
// //       if (exportStartDate && exportEndDate) {
// //         fileName += `_${exportStartDate}_to_${exportEndDate}`;
// //       } else if (exportStartDate) {
// //         fileName += `_from_${exportStartDate}`;
// //       } else if (exportEndDate) {
// //         fileName += `_until_${exportEndDate}`;
// //       }
      
// //       if (isSearchActive()) {
// //         const filterParts = [];
        
// //         if (activeSearch.centerId) {
// //           const centerName = centers.find(c => c._id === activeSearch.centerId)?.centerName || 'Center';
// //           filterParts.push(centerName.replace(/\s+/g, '_'));
// //         }
// //         if (activeSearch.productId) {
// //           const productName = products.find(p => p._id === activeSearch.productId)?.productTitle || 'Product';
// //           filterParts.push(productName.replace(/\s+/g, '_'));
// //         }
// //         if (activeSearch.usageType) {
// //           filterParts.push(activeSearch.usageType.replace(/\s+/g, '_'));
// //         }
// //         if (activeSearch.connectionType) {
// //           filterParts.push(activeSearch.connectionType);
// //         }
        
// //         if (filterParts.length > 0) {
// //           fileName += `_${filterParts.join('_')}`;
// //         }
// //       }
      
// //       fileName += `_${new Date().toISOString().split('T')[0]}.csv`;
  
// //       const headers = [
// //         'Date',
// //         'Type',
// //         'Center',
// //         'Product',
// //         'Product Type',
// //         'Qty',
// //         'User/Building',
// //         'Address',
// //         'Mobile',
// //         'Package Duration',
// //         'Status',
// //         'ONU Chrg.',
// //         'Pkt. Amt.',
// //         'Inst. Chrg.',
// //         'Shifting Amount',
// //         'Wire Change Amount',
// //         'Total Amount',
// //         'Reason'
// //       ];

// //       const flattenedExportData = [];
// //       allData.forEach(usage => {
// //         if (usage.items && usage.items.length > 0) {
// //           usage.items.forEach(item => {
// //             flattenedExportData.push({
// //               ...usage,
// //               item: item,
// //               product: item.product,
// //               quantity: item.quantity
// //             });
// //           });
// //         } else {
// //           flattenedExportData.push({
// //             ...usage,
// //             item: null,
// //             product: null,
// //             quantity: 0
// //           });
// //         }
// //       });
  
// //       const csvData = flattenedExportData.map(item => [
// //         formatDate(item.date || ''),
// //         item.usageType || '',
// //         item.center?.centerName || '',
// //         item.product?.productTitle || '',
// //         item.product?.productCategory?.productCategory || '',
// //         item.quantity || 0,
// //         item.usageType === 'Customer' ? item.customer?.username || item.customer?.name || '' :
// //         item.usageType === 'Building' ? item.fromBuilding?.buildingName || item.fromBuilding?.displayName || '' :
// //         item.usageType === 'Building to Building' ? `${item.fromBuilding?.buildingName || ''} to ${item.toBuilding?.buildingName || ''}` :
// //         item.usageType === 'Control Room' ? item.fromControlRoom?.buildingName || item.fromControlRoom?.displayName || '' : '',
// //         item.usageType === 'Customer' ? `${item.customer?.address1 || ''} ${item.customer?.address2 || ''}`.trim() || '' :
// //         item.usageType === 'Building' ? `${item.fromBuilding?.address1 || ''} ${item.fromBuilding?.address2 || ''}`.trim() || '' :
// //         item.usageType === 'Control Room' ? `${item.fromControlRoom?.address1 || ''} ${item.fromControlRoom?.address2 || ''}`.trim() || '' : '',
// //         item.customer?.mobile || '',
// //         item.packageDuration || '',
// //         item.status || '',
// //         item.onuCharges || 0,
// //         item.packageAmount || 0,
// //         item.installationCharges || 0,
// //         item.shiftingAmount || 0,
// //         item.wireChangeAmount || 0,
// //         item.totalRevenue || 0,
// //         item.reason || ''
// //       ]);
  
// //       const csvContent = [
// //         headers.join(','),
// //         ...csvData.map(row =>
// //           row
// //             .map(field => {
// //               const stringField = String(field ?? '');
// //               return `"${stringField.replace(/"/g, '""')}"`;
// //             })
// //             .join(',')
// //         )
// //       ].join('\n');
  
// //       const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
// //       const link = document.createElement('a');
// //       const url = URL.createObjectURL(blob);
// //       link.setAttribute('href', url);
// //       link.setAttribute('download', fileName);
// //       link.style.visibility = 'hidden';
// //       document.body.appendChild(link);
// //       link.click();
// //       document.body.removeChild(link);
// //       URL.revokeObjectURL(url);
      
// //       showSuccess('Export completed successfully!');
// //       setExportModalVisible(false);
// //       setExportStartDate('');
// //       setExportEndDate('');
      
// //       console.log('Export completed with filters:', activeSearch);
// //     } catch (error) {
// //       console.error('Error generating export:', error);
// //       showError('Error generating export file');
// //     } finally {
// //       setExportLoading(false);
// //     }
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

// //   return (
// //     <div>
// //       <div className='title'>Usage Stock Report </div>
      
// //       <SearchUsageDetail
// //         visible={searchModalVisible}
// //         onClose={() => setSearchModalVisible(false)}
// //         onSearch={handleSearch}
// //         centers={centers}
// //         products={products}
// //         customers={customers}
// //       />

// //       {/* Export Modal */}
// //       <CModal visible={exportModalVisible} onClose={() => setExportModalVisible(false)} size="md">
// //         <CModalHeader>
// //           <CModalTitle>Export Usage Stock Report</CModalTitle>
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
// //           {(activeSearch.centerId || activeSearch.productId || activeSearch.usageType || activeSearch.connectionType || activeSearch.customer) && (
// //             <div className="mt-3 p-2 bg-light rounded">
// //               <strong>Current Filters:</strong>
// //               <ul className="mb-0 mt-1">
// //                 {activeSearch.centerId && (
// //                   <li><small>Center: {centers.find(c => c._id === activeSearch.centerId)?.centerName}</small></li>
// //                 )}
// //                 {activeSearch.productId && (
// //                   <li><small>Product: {products.find(p => p._id === activeSearch.productId)?.productTitle}</small></li>
// //                 )}
// //                 {activeSearch.usageType && (
// //                   <li><small>Usage Type: {activeSearch.usageType}</small></li>
// //                 )}
// //                 {activeSearch.connectionType && (
// //                   <li><small>Connection Type: {activeSearch.connectionType}</small></li>
// //                 )}
// //                 {activeSearch.customer && (
// //                   <li><small>Customer: {customers.find(c => c._id === activeSearch.customer)?.username || activeSearch.customer}</small></li>
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
// //               Export
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
          
// //           <div className="responsive-table-wrapper">
// //             <CTable striped bordered hover className='responsive-table'>
// //               <CTableHead>
// //                 <CTableRow>
// //                   <CTableHeaderCell scope="col" onClick={() => handleSort('date')} className="sortable-header">
// //                     Date {getSortIcon('date')}
// //                   </CTableHeaderCell>
// //                   <CTableHeaderCell scope="col" onClick={() => handleSort('usageType')} className="sortable-header">
// //                     Type {getSortIcon('usageType')}
// //                   </CTableHeaderCell>
// //                   <CTableHeaderCell scope="col" onClick={() => handleSort('center.centerName')} className="sortable-header">
// //                     Branch {getSortIcon('center.centerName')}
// //                   </CTableHeaderCell>
// //                   <CTableHeaderCell scope="col" onClick={() => handleSort('product.productTitle')} className="sortable-header">
// //                     Product {getSortIcon('product.productTitle')}
// //                   </CTableHeaderCell>
// //                   <CTableHeaderCell scope="col" onClick={() => handleSort('product.productCategory.productCategory')} className="sortable-header">
// //                     Product Type {getSortIcon('product.productCategory.productCategory')}
// //                   </CTableHeaderCell>
// //                   <CTableHeaderCell scope="col" onClick={() => handleSort('quantity')} className="sortable-header">
// //                     Qty {getSortIcon('quantity')}
// //                   </CTableHeaderCell>
// //                   <CTableHeaderCell scope="col" className="sortable-header">
// //                     User/Building
// //                   </CTableHeaderCell>
// //                   <CTableHeaderCell scope="col" className="sortable-header">
// //                     Address
// //                   </CTableHeaderCell>
// //                   <CTableHeaderCell scope="col" className="sortable-header">
// //                     Mobile
// //                   </CTableHeaderCell>
// //                   <CTableHeaderCell scope="col" onClick={() => handleSort('packageDuration')} className="sortable-header">
// //                     Package Duration {getSortIcon('packageDuration')}
// //                   </CTableHeaderCell>
// //                   <CTableHeaderCell scope="col" onClick={() => handleSort('status')} className="sortable-header">
// //                     Status {getSortIcon('status')}
// //                   </CTableHeaderCell>
// //                   <CTableHeaderCell scope="col" onClick={() => handleSort('onuCharges')} className="sortable-header">
// //                     ONU Chrg. {getSortIcon('onuCharges')}
// //                   </CTableHeaderCell>
// //                   <CTableHeaderCell scope="col" onClick={() => handleSort('packageAmount')} className="sortable-header">
// //                     Pkt. Amt. {getSortIcon('packageAmount')}
// //                   </CTableHeaderCell>
// //                   <CTableHeaderCell scope="col" onClick={() => handleSort('installationCharges')} className="sortable-header">
// //                     Inst. Chrg. {getSortIcon('installationCharges')}
// //                   </CTableHeaderCell>
// //                   <CTableHeaderCell scope="col" onClick={() => handleSort('shiftingAmount')} className="sortable-header">
// //                     Shifting Amount {getSortIcon('shiftingAmount')}
// //                   </CTableHeaderCell>
// //                   <CTableHeaderCell scope="col" onClick={() => handleSort('wireChangeAmount')} className="sortable-header">
// //                     Wire Change Amount {getSortIcon('wireChangeAmount')}
// //                   </CTableHeaderCell>
// //                   <CTableHeaderCell scope="col" onClick={() => handleSort('totalRevenue')} className="sortable-header">
// //                     Total Amount {getSortIcon('totalRevenue')}
// //                   </CTableHeaderCell>
// //                   <CTableHeaderCell scope="col" onClick={() => handleSort('reason')} className="sortable-header">
// //                     Reason {getSortIcon('reason')}
// //                   </CTableHeaderCell>
// //                 </CTableRow>
// //               </CTableHead>
// //               <CTableBody>
// //                 {filteredFlattenedData.length > 0 ? (
// //                   <>
// //                     {filteredFlattenedData.map((item) => (
// //                       <CTableRow key={item.uniqueKey}>
// //                         <CTableDataCell>
// //                           {formatDate(item.date || '')}
// //                         </CTableDataCell>
// //                         <CTableDataCell>{item.usageType || ''}</CTableDataCell>
// //                         <CTableDataCell>{item.center?.centerName || ''}</CTableDataCell>
// //                         <CTableDataCell>{item.product?.productTitle || 'N/A'}</CTableDataCell>
// //                         <CTableDataCell>
// //                           {item.product?.productCategory?.productCategory || 'N/A'}
// //                         </CTableDataCell>
// //                         <CTableDataCell>
// //                           {item.quantity || 0}
// //                         </CTableDataCell>
// //                         <CTableDataCell>
// //                           {item.usageType === 'Customer' ? item.customer?.username || item.customer?.name || '' :
// //                            item.usageType === 'Building' ? item.fromBuilding?.buildingName || item.fromBuilding?.displayName || '' :
// //                            item.usageType === 'Building to Building' ? `${item.fromBuilding?.buildingName || ''} to ${item.toBuilding?.buildingName || ''}` :
// //                            item.usageType === 'Control Room' ? item.fromControlRoom?.buildingName || item.fromControlRoom?.displayName || '' :
// //                            ''}
// //                         </CTableDataCell>
// //                         <CTableDataCell>
// //                           {item.usageType === 'Customer' ? `${item.customer?.address1 || ''} ${item.customer?.address2 || ''}`.trim() || '' :
// //                            item.usageType === 'Building' ? `${item.fromBuilding?.address1 || ''} ${item.fromBuilding?.address2 || ''}`.trim() || 'N/A' :
// //                            item.usageType === 'Control Room' ? `${item.fromControlRoom?.address1 || ''} ${item.fromControlRoom?.address2 || ''}`.trim() || '' :
// //                            ''}
// //                         </CTableDataCell>
// //                         <CTableDataCell>{item.customer?.mobile || ''}</CTableDataCell>
// //                         <CTableDataCell>{item.packageDuration || ''}</CTableDataCell>
// //                         <CTableDataCell>{item.status || ''}</CTableDataCell>
// //                         <CTableDataCell>{item.onuCharges || ''}</CTableDataCell>
// //                         <CTableDataCell>{item.packageAmount || ''}</CTableDataCell>
// //                         <CTableDataCell>{item.installationCharges || ''}</CTableDataCell>
// //                         <CTableDataCell>{item.shiftingAmount || ''}</CTableDataCell>
// //                         <CTableDataCell>{item.wireChangeAmount || ''}</CTableDataCell>
// //                         <CTableDataCell>{item.totalRevenue || ''}</CTableDataCell>
// //                         <CTableDataCell>{item.reason || ''}</CTableDataCell>
// //                       </CTableRow>
// //                     ))}
// //                     <CTableRow className='total-row'>
// //                       <CTableDataCell colSpan="5">Total</CTableDataCell>
// //                       <CTableDataCell>{totals.totalQty.toFixed(2)}</CTableDataCell>
// //                       <CTableDataCell colSpan="4"></CTableDataCell>
// //                       <CTableDataCell></CTableDataCell>
// //                       <CTableDataCell>{totals.onuCharges.toFixed(2)}</CTableDataCell>
// //                       <CTableDataCell>{totals.packageAmount.toFixed(2)}</CTableDataCell>
// //                       <CTableDataCell>{totals.installationCharges.toFixed(2)}</CTableDataCell>
// //                       <CTableDataCell>{totals.shiftingAmount.toFixed(2)}</CTableDataCell>
// //                       <CTableDataCell>{totals.wireChangeAmount.toFixed(2)}</CTableDataCell>
// //                       <CTableDataCell>{totals.totalRevenue.toFixed(2)}</CTableDataCell>
// //                       <CTableDataCell></CTableDataCell>
// //                     </CTableRow>
// //                   </>
// //                 ) : (
// //                   <CTableRow>
// //                     <CTableDataCell colSpan="18" className="text-center">
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

// // export default UsageDetail;



// // import '../../css/table.css';
// // import '../../css/form.css';

// // import React, { useEffect, useMemo, useState } from 'react';

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
// //   CFormLabel,
// // } from '@coreui/react';

// // import CIcon from '@coreui/icons-react';

// // import {
// //   cilArrowTop,
// //   cilArrowBottom,
// //   cilSearch,
// //   cilZoomOut,
// // } from '@coreui/icons';

// // import { CFormLabel as CFormLabelPro } from '@coreui/react-pro';

// // import axiosInstance from 'src/axiosInstance';
// // import Pagination from 'src/utils/Pagination';
// // import { showError, showSuccess } from 'src/utils/sweetAlerts';
// // import { formatDate } from 'src/utils/FormatDateTime';

// // import SearchUsageDetail from './SearchUsageDetail';

// // import { useLocation } from 'react-router-dom';

// // /* =========================================================
// //    CONSTANTS
// // ========================================================= */

// // const EMPTY_SEARCH = {
// //   centerId: '',
// //   productId: '',
// //   startDate: '',
// //   endDate: '',
// //   usageType: '',
// //   connectionType: '',
// //   customer: '',
// //   keyword: '',
// //   outlet: '',
// //   month: '',
// //   year: '',
// // };

// // /* =========================================================
// //    HELPERS
// // ========================================================= */

// // /**
// //  * Convert ID/object value to string ID safely.
// //  */
// // const getId = (value) => {
// //   if (!value) return '';

// //   if (typeof value === 'object') {
// //     return (
// //       value._id?.toString() ||
// //       value.id?.toString() ||
// //       ''
// //     );
// //   }

// //   return value.toString();
// // };

// // /**
// //  * Convert dates into API format.
// //  *
// //  * Supports:
// //  * DD-MM-YYYY
// //  * YYYY-MM-DD
// //  */
// // const normalizeDateForApi = (dateStr) => {
// //   if (!dateStr) return '';

// //   const value = String(dateStr).trim();

// //   // Already YYYY-MM-DD
// //   if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
// //     return value;
// //   }

// //   // DD-MM-YYYY
// //   if (/^\d{2}-\d{2}-\d{4}$/.test(value)) {
// //     const [day, month, year] = value.split('-');
// //     return `${year}-${month}-${day}`;
// //   }

// //   return value;
// // };

// // /**
// //  * Get first and last date of a selected month.
// //  */
// // const getMonthDateRange = (month, year) => {
// //   if (!month || !year) {
// //     return {
// //       startDate: '',
// //       endDate: '',
// //     };
// //   }

// //   const numericMonth = Number(month);
// //   const numericYear = Number(year);

// //   if (
// //     Number.isNaN(numericMonth) ||
// //     Number.isNaN(numericYear) ||
// //     numericMonth < 1 ||
// //     numericMonth > 12
// //   ) {
// //     return {
// //       startDate: '',
// //       endDate: '',
// //     };
// //   }

// //   const startDate = `${numericYear}-${String(numericMonth).padStart(
// //     2,
// //     '0'
// //   )}-01`;

// //   const lastDay = new Date(
// //     numericYear,
// //     numericMonth,
// //     0
// //   ).getDate();

// //   const endDate = `${numericYear}-${String(numericMonth).padStart(
// //     2,
// //     '0'
// //   )}-${String(lastDay).padStart(2, '0')}`;

// //   return {
// //     startDate,
// //     endDate,
// //   };
// // };

// // /**
// //  * Get nested value safely.
// //  */
// // const getNestedValue = (object, path) => {
// //   if (!object || !path) return '';

// //   return path
// //     .split('.')
// //     .reduce((value, key) => {
// //       if (value === null || value === undefined) {
// //         return '';
// //       }

// //       return value[key];
// //     }, object);
// // };

// // /**
// //  * Convert a value into something searchable.
// //  */
// // const valueToSearchString = (value) => {
// //   if (value === null || value === undefined) {
// //     return '';
// //   }

// //   if (typeof value === 'object') {
// //     return Object.values(value)
// //       .map((item) => valueToSearchString(item))
// //       .join(' ')
// //       .toLowerCase();
// //   }

// //   return String(value).toLowerCase();
// // };

// // /* =========================================================
// //    COMPONENT
// // ========================================================= */

// // const UsageDetail = () => {
// //   const [data, setData] = useState([]);

// //   const [centers, setCenters] = useState([]);
// //   const [products, setProducts] = useState([]);
// //   const [customers, setCustomers] = useState([]);

// //   const [loading, setLoading] = useState(true);
// //   const [exportLoading, setExportLoading] = useState(false);
// //   const [error, setError] = useState(null);

// //   const [sortConfig, setSortConfig] = useState({
// //     key: null,
// //     direction: 'ascending',
// //   });

// //   const [searchTerm, setSearchTerm] = useState('');

// //   const [searchModalVisible, setSearchModalVisible] =
// //     useState(false);

// //   const [exportModalVisible, setExportModalVisible] =
// //     useState(false);

// //   const [exportStartDate, setExportStartDate] = useState('');
// //   const [exportEndDate, setExportEndDate] = useState('');

// //   const [itemDetailModalVisible, setItemDetailModalVisible] =
// //     useState(false);

// //   const [selectedItemDetail, setSelectedItemDetail] =
// //     useState(null);

// //   const [activeSearch, setActiveSearch] = useState({
// //     ...EMPTY_SEARCH,
// //   });

// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [totalPages, setTotalPages] = useState(1);

// //   const location = useLocation();

// //   /* =========================================================
// //      FETCH USAGE DATA
// //   ========================================================= */

// //   const fetchData = async (
// //     searchParams = {},
// //     page = 1
// //   ) => {
// //     try {
// //       setLoading(true);
// //       setError(null);

// //       const params = new URLSearchParams();

// //       const currentSearch =
// //         Object.keys(searchParams).length > 0
// //           ? searchParams
// //           : activeSearch;

// //       console.log(
// //         'Fetching Usage Detail with filters:',
// //         currentSearch
// //       );

// //       /* -----------------------------
// //          CENTER
// //       ----------------------------- */

// //       if (currentSearch.centerId) {
// //         params.append(
// //           'centerId',
// //           currentSearch.centerId
// //         );
// //       }

// //       /* -----------------------------
// //          PRODUCT
// //       ----------------------------- */

// //       if (currentSearch.productId) {
// //         params.append(
// //           'productId',
// //           currentSearch.productId
// //         );
// //       }

// //       /* -----------------------------
// //          USAGE TYPE
// //       ----------------------------- */

// //       if (currentSearch.usageType) {
// //         params.append(
// //           'usageType',
// //           currentSearch.usageType
// //         );
// //       }

// //       /* -----------------------------
// //          CONNECTION TYPE
// //       ----------------------------- */

// //       if (currentSearch.connectionType) {
// //         params.append(
// //           'connectionType',
// //           currentSearch.connectionType
// //         );
// //       }

// //       /* -----------------------------
// //          CUSTOMER
// //       ----------------------------- */

// //       if (currentSearch.customer) {
// //         params.append(
// //           'customer',
// //           currentSearch.customer
// //         );
// //       }

// //       /* -----------------------------
// //          KEYWORD
// //       ----------------------------- */

// //       if (currentSearch.keyword) {
// //         params.append(
// //           'search',
// //           currentSearch.keyword
// //         );
// //       }

// //       /* -----------------------------
// //          OUTLET
// //       ----------------------------- */

// //       if (currentSearch.outlet) {
// //         params.append(
// //           'outlet',
// //           currentSearch.outlet
// //         );
// //       }

// //       /* -----------------------------
// //          DATE RANGE
// //       ----------------------------- */

// //       let startDate = currentSearch.startDate;
// //       let endDate = currentSearch.endDate;

// //       /*
// //        * If Summary navigation supplied month/year,
// //        * convert that month into an exact date range.
// //        *
// //        * Example:
// //        * month = 9
// //        * year = 2026
// //        *
// //        * becomes:
// //        * 2026-09-01 -> 2026-09-30
// //        */

// //       if (
// //         !startDate &&
// //         !endDate &&
// //         currentSearch.month &&
// //         currentSearch.year
// //       ) {
// //         const monthRange = getMonthDateRange(
// //           currentSearch.month,
// //           currentSearch.year
// //         );

// //         startDate = monthRange.startDate;
// //         endDate = monthRange.endDate;
// //       }

// //       if (startDate && endDate) {
// //         params.append(
// //           'startDate',
// //           normalizeDateForApi(startDate)
// //         );

// //         params.append(
// //           'endDate',
// //           normalizeDateForApi(endDate)
// //         );
// //       }

// //       /* -----------------------------
// //          PAGE
// //       ----------------------------- */

// //       params.append('page', page);

// //       const url = params.toString()
// //         ? `/reports/usages?${params.toString()}`
// //         : '/reports/usages';

// //       console.log('Final Usage Detail API URL:', url);

// //       const response = await axiosInstance.get(url);

// //       if (response.data.success) {
// //         setData(response.data.data || []);

// //         setCurrentPage(
// //           response.data.pagination?.currentPage || 1
// //         );

// //         setTotalPages(
// //           response.data.pagination?.totalPages || 1
// //         );
// //       } else {
// //         const errorMessage =
// //           response.data.message ||
// //           'API returned unsuccessful response';

// //         setError(errorMessage);

// //         console.error(
// //           'Backend error:',
// //           response.data
// //         );
// //       }
// //     } catch (err) {
// //       if (err.response) {
// //         const errorMessage =
// //           err.response.data?.message ||
// //           err.response.data?.error ||
// //           `Error ${err.response.status}: ${err.response.statusText}`;

// //         setError(errorMessage);

// //         console.error(
// //           'Error response:',
// //           err.response.data
// //         );
// //       } else if (err.request) {
// //         setError(
// //           'No response received from server. Please check your network connection.'
// //         );

// //         console.error(
// //           'Error request:',
// //           err.request
// //         );
// //       } else {
// //         setError(
// //           err.message ||
// //             'An error occurred while fetching data'
// //         );

// //         console.error(
// //           'Error message:',
// //           err.message
// //         );
// //       }
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   /* =========================================================
// //      FETCH CENTERS
// //   ========================================================= */

// //   const fetchCenters = async () => {
// //     try {
// //       const response = await axiosInstance.get(
// //         '/centers'
// //       );

// //       if (response.data.success) {
// //         setCenters(response.data.data || []);
// //       }
// //     } catch (error) {
// //       console.error(
// //         'Error fetching centers:',
// //         error
// //       );
// //     }
// //   };

// //   /* =========================================================
// //      FETCH PRODUCTS
// //   ========================================================= */

// //   const fetchProducts = async () => {
// //     try {
// //       const response = await axiosInstance.get(
// //         '/products/all'
// //       );

// //       if (response.data.success) {
// //         setProducts(response.data.data || []);
// //       }
// //     } catch (error) {
// //       console.error(
// //         'Error fetching products:',
// //         error
// //       );
// //     }
// //   };

// //   /* =========================================================
// //      FETCH CUSTOMERS
// //   ========================================================= */

// //   const fetchCustomers = async () => {
// //     try {
// //       const response = await axiosInstance.get(
// //         '/customers'
// //       );

// //       if (response.data.success) {
// //         setCustomers(response.data.data || []);
// //       }
// //     } catch (error) {
// //       console.error(
// //         'Error fetching customers:',
// //         error
// //       );
// //     }
// //   };

// //   /* =========================================================
// //      INITIAL DATA
// //   ========================================================= */

// //   useEffect(() => {
// //     fetchCenters();
// //     fetchProducts();
// //     fetchCustomers();
// //   }, []);

// //   /* =========================================================
// //      HANDLE NAVIGATION FROM USAGE SUMMARY
// //   ========================================================= */

// //   useEffect(() => {
// //     /*
// //      * IMPORTANT:
// //      * Usage Summary navigates here with:
// //      *
// //      * productId
// //      * centerId
// //      * productName
// //      * centerName
// //      * startDate/endDate OR month/year
// //      *
// //      * We preserve all of those filters.
// //      */

// //     if (
// //       location.state?.productId &&
// //       location.state?.centerId
// //     ) {
// //       let startDate =
// //         location.state.startDate || '';

// //       let endDate =
// //         location.state.endDate || '';

// //       /*
// //        * If Summary did not send an explicit date range,
// //        * use month/year.
// //        */

// //       if (
// //         !startDate &&
// //         !endDate &&
// //         location.state.month &&
// //         location.state.year
// //       ) {
// //         const monthRange = getMonthDateRange(
// //           location.state.month,
// //           location.state.year
// //         );

// //         startDate = monthRange.startDate;
// //         endDate = monthRange.endDate;
// //       }

// //       const filteredSearch = {
// //         ...EMPTY_SEARCH,

// //         productId:
// //           location.state.productId,

// //         centerId:
// //           location.state.centerId,

// //         startDate,
// //         endDate,

// //         month:
// //           location.state.month || '',

// //         year:
// //           location.state.year || '',
// //       };

// //       console.log(
// //         'Setting Usage Detail filters from Usage Summary:',
// //         filteredSearch
// //       );

// //       setActiveSearch(filteredSearch);

// //       fetchData(
// //         filteredSearch,
// //         1
// //       );

// //       document.title =
// //         `Usage Details - ${
// //           location.state.productName ||
// //           'Product'
// //         } at ${
// //           location.state.centerName ||
// //           'Center'
// //         }`;

// //       return;
// //     }

// //     /* =====================================================
// //        URL PARAMETER FALLBACK
// //     ===================================================== */

// //     const params = new URLSearchParams(
// //       location.search
// //     );

// //     const productParam =
// //       params.get('productId');

// //     const centerParam =
// //       params.get('centerId');

// //     if (
// //       productParam &&
// //       centerParam
// //     ) {
// //       let startDate =
// //         params.get('startDate') || '';

// //       let endDate =
// //         params.get('endDate') || '';

// //       const monthParam =
// //         params.get('month') || '';

// //       const yearParam =
// //         params.get('year') || '';

// //       if (
// //         !startDate &&
// //         !endDate &&
// //         monthParam &&
// //         yearParam
// //       ) {
// //         const monthRange =
// //           getMonthDateRange(
// //             monthParam,
// //             yearParam
// //           );

// //         startDate =
// //           monthRange.startDate;

// //         endDate =
// //           monthRange.endDate;
// //       }

// //       const filteredSearch = {
// //         ...EMPTY_SEARCH,

// //         productId:
// //           productParam,

// //         centerId:
// //           centerParam,

// //         startDate,
// //         endDate,

// //         usageType:
// //           params.get('usageType') || '',

// //         connectionType:
// //           params.get('connectionType') || '',

// //         customer:
// //           params.get('customer') || '',

// //         keyword:
// //           params.get('keyword') || '',

// //         outlet:
// //           params.get('outlet') || '',

// //         month:
// //           monthParam,

// //         year:
// //           yearParam,
// //       };

// //       console.log(
// //         'Setting Usage Detail filters from URL:',
// //         filteredSearch
// //       );

// //       setActiveSearch(filteredSearch);

// //       fetchData(
// //         filteredSearch,
// //         1
// //       );

// //       const productName =
// //         params.get('productName')
// //           ? decodeURIComponent(
// //               params.get('productName')
// //             )
// //           : 'Product';

// //       const centerName =
// //         params.get('centerName')
// //           ? decodeURIComponent(
// //               params.get('centerName')
// //             )
// //           : 'Center';

// //       document.title =
// //         `Usage Details - ${productName} at ${centerName}`;

// //       return;
// //     }

// //     /*
// //      * Normal Usage Detail page.
// //      */
// //     fetchData(
// //       EMPTY_SEARCH,
// //       1
// //     );
// //   }, [
// //     location.state,
// //     location.search,
// //   ]);

// //   /* =========================================================
// //      PAGINATION
// //   ========================================================= */

// //   const handlePageChange = (page) => {
// //     if (
// //       page < 1 ||
// //       page > totalPages
// //     ) {
// //       return;
// //     }

// //     fetchData(
// //       activeSearch,
// //       page
// //     );
// //   };

// //   /* =========================================================
// //      FLATTEN DATA
// //   ========================================================= */

// // const getFlattenedData = () => {
// //   const flattened = [];

// //   const activeProductId = getId(activeSearch.productId);
// //   const activeCenterId = getId(activeSearch.centerId);

// //   // =========================================================
// //   // SUMMARY TARGET QUANTITY
// //   // =========================================================
// //   // When navigated from Usage Summary, we receive the exact
// //   // TotalQuantity that was displayed. We must show ONLY that
// //   // much quantity in the Detail table.
// //   // =========================================================
// //   const summaryTargetQty = Number(
// //     location.state?.summaryTotalQuantity || 0
// //   );

// //   const hasSummaryTarget = summaryTargetQty > 0;

// //   let accumulatedQty = 0;

// //   data.forEach((usage) => {
// //     // Stop once we've shown the summary's total quantity
// //     if (hasSummaryTarget && accumulatedQty >= summaryTargetQty) {
// //       return;
// //     }

// //     const usageCenterId = getId(
// //       usage.center?._id || usage.center || usage.centerId
// //     );

// //     if (activeCenterId && usageCenterId !== activeCenterId) {
// //       return;
// //     }

// //     if (
// //       usage.items &&
// //       Array.isArray(usage.items) &&
// //       usage.items.length > 0
// //     ) {
// //       let itemsToShow = usage.items;

// //       if (activeProductId) {
// //         itemsToShow = usage.items.filter((item) => {
// //           const itemProductId = getId(
// //             item.product?._id || item.product || item.productId
// //           );
// //           return itemProductId === activeProductId;
// //         });
// //       }

// //       itemsToShow.forEach((item) => {
// //         if (hasSummaryTarget && accumulatedQty >= summaryTargetQty) {
// //           return;
// //         }

// //         let itemQty = Number(item.quantity || 0);

// //         // If adding this item would exceed the summary total,
// //         // trim it so the sum matches exactly.
// //         if (
// //           hasSummaryTarget &&
// //           accumulatedQty + itemQty > summaryTargetQty
// //         ) {
// //           itemQty = summaryTargetQty - accumulatedQty;
// //         }

// //         if (itemQty <= 0) return;

// //         accumulatedQty += itemQty;

// //         flattened.push({
// //           ...usage,
// //           item: {
// //             ...item,
// //             quantity: itemQty,
// //           },
// //           product: item.product,
// //           quantity: itemQty,
// //           uniqueKey: `${usage._id || 'usage'}_${
// //             item._id || getId(item.product) || Math.random()
// //           }`,
// //         });
// //       });
// //     }
// //   });

// //   return flattened;
// // };

// //   /* =========================================================
// //      USER / BUILDING LABEL
// //   ========================================================= */

// //   const getUserOrBuildingLabel = (
// //     item
// //   ) => {
// //     if (!item) return '';

// //     if (
// //       item.usageType ===
// //       'Customer'
// //     ) {
// //       return (
// //         item.customer?.username ||
// //         item.customer?.name ||
// //         ''
// //       );
// //     }

// //     if (
// //       item.usageType ===
// //       'Building'
// //     ) {
// //       return (
// //         item.fromBuilding
// //           ?.buildingName ||
// //         item.fromBuilding
// //           ?.displayName ||
// //         ''
// //       );
// //     }

// //     if (
// //       item.usageType ===
// //       'Building to Building'
// //     ) {
// //       return `${item.fromBuilding?.buildingName || ''} to ${
// //         item.toBuilding?.buildingName || ''
// //       }`;
// //     }

// //     if (
// //       item.usageType ===
// //       'Control Room'
// //     ) {
// //       return (
// //         item.fromControlRoom
// //           ?.buildingName ||
// //         item.fromControlRoom
// //           ?.displayName ||
// //         ''
// //       );
// //     }

// //     return '';
// //   };

// //   /* =========================================================
// //      CALCULATE TOTALS
// //   ========================================================= */

// //   const calculateTotals = (
// //     rows
// //   ) => {
// //     const totals = {
// //       totalQty: 0,
// //       onuCharges: 0,
// //       packageAmount: 0,
// //       installationCharges: 0,
// //       shiftingAmount: 0,
// //       wireChangeAmount: 0,
// //       totalRevenue: 0,
// //     };

// //     rows.forEach(
// //       (item) => {
// //         totals.totalQty +=
// //           Number(
// //             item.quantity || 0
// //           );

// //         totals.onuCharges +=
// //           Number(
// //             item.onuCharges || 0
// //           );

// //         totals.packageAmount +=
// //           Number(
// //             item.packageAmount || 0
// //           );

// //         totals.installationCharges +=
// //           Number(
// //             item.installationCharges || 0
// //           );

// //         totals.shiftingAmount +=
// //           Number(
// //             item.shiftingAmount || 0
// //           );

// //         totals.wireChangeAmount +=
// //           Number(
// //             item.wireChangeAmount || 0
// //           );

// //         totals.totalRevenue +=
// //           Number(
// //             item.totalRevenue || 0
// //           );
// //       }
// //     );

// //     return totals;
// //   };

// //   /* =========================================================
// //      SEARCH ACTIVE
// //   ========================================================= */

// //   const isSearchActive = () => {
// //     return Boolean(
// //       activeSearch.centerId ||
// //         activeSearch.productId ||
// //         activeSearch.startDate ||
// //         activeSearch.endDate ||
// //         activeSearch.usageType ||
// //         activeSearch.connectionType ||
// //         activeSearch.customer ||
// //         activeSearch.keyword ||
// //         activeSearch.outlet ||
// //         activeSearch.month ||
// //         activeSearch.year
// //     );
// //   };

// //   /* =========================================================
// //      SORT
// //   ========================================================= */

// //   const handleSort = (
// //     key
// //   ) => {
// //     let direction =
// //       'ascending';

// //     if (
// //       sortConfig.key === key &&
// //       sortConfig.direction ===
// //         'ascending'
// //     ) {
// //       direction =
// //         'descending';
// //     }

// //     setSortConfig({
// //       key,
// //       direction,
// //     });
// //   };

// //   const getSortIcon = (
// //     key
// //   ) => {
// //     if (
// //       sortConfig.key !== key
// //     ) {
// //       return null;
// //     }

// //     return sortConfig.direction ===
// //       'ascending' ? (
// //       <CIcon
// //         icon={cilArrowTop}
// //         className="ms-1"
// //       />
// //     ) : (
// //       <CIcon
// //         icon={cilArrowBottom}
// //         className="ms-1"
// //       />
// //     );
// //   };

// //   /* =========================================================
// //      FILTER + SORT DISPLAY DATA
// //   ========================================================= */

// //   const filteredFlattenedData =
// //     useMemo(() => {
// //       let rows =
// //         getFlattenedData();

// //       /* -----------------------------
// //          LOCAL SEARCH
// //       ----------------------------- */

// //       const searchValue =
// //         searchTerm
// //           .trim()
// //           .toLowerCase();

// //       if (searchValue) {
// //         rows = rows.filter(
// //           (item) =>
// //             valueToSearchString(
// //               item
// //             ).includes(
// //               searchValue
// //             )
// //         );
// //       }

// //       /* -----------------------------
// //          SORT
// //       ----------------------------- */

// //       if (sortConfig.key) {
// //         const key =
// //           sortConfig.key;

// //         rows = [
// //           ...rows,
// //         ].sort(
// //           (a, b) => {
// //             let aValue =
// //               getNestedValue(
// //                 a,
// //                 key
// //               );

// //             let bValue =
// //               getNestedValue(
// //                 b,
// //                 key
// //               );

// //             /*
// //              * Numeric fields
// //              */

// //             const numericKeys =
// //               [
// //                 'quantity',
// //                 'onuCharges',
// //                 'packageAmount',
// //                 'installationCharges',
// //                 'shiftingAmount',
// //                 'wireChangeAmount',
// //                 'totalRevenue',
// //               ];

// //             if (
// //               numericKeys.includes(
// //                 key
// //               )
// //             ) {
// //               aValue =
// //                 Number(
// //                   aValue || 0
// //                 );

// //               bValue =
// //                 Number(
// //                   bValue || 0
// //                 );
// //             } else if (
// //               key === 'date'
// //             ) {
// //               aValue =
// //                 new Date(
// //                   aValue || 0
// //                 ).getTime();

// //               bValue =
// //                 new Date(
// //                   bValue || 0
// //                 ).getTime();
// //             } else {
// //               aValue =
// //                 String(
// //                   aValue ??
// //                     ''
// //                 ).toLowerCase();

// //               bValue =
// //                 String(
// //                   bValue ??
// //                     ''
// //                 ).toLowerCase();
// //             }

// //             if (
// //               aValue < bValue
// //             ) {
// //               return sortConfig.direction ===
// //                 'ascending'
// //                 ? -1
// //                 : 1;
// //             }

// //             if (
// //               aValue > bValue
// //             ) {
// //               return sortConfig.direction ===
// //                 'ascending'
// //                 ? 1
// //                 : -1;
// //             }

// //             return 0;
// //           }
// //         );
// //       }

// //       return rows;
// //     }, [
// //       data,
// //       activeSearch,
// //       searchTerm,
// //       sortConfig,
// //     ]);

// //   /* =========================================================
// //      TOTALS FOR DISPLAYED DATA
// //   ========================================================= */

// //   const totals =
// //     useMemo(
// //       () =>
// //         calculateTotals(
// //           filteredFlattenedData
// //         ),
// //       [filteredFlattenedData]
// //     );

// //   /* =========================================================
// //      SEARCH
// //   ========================================================= */

// //   const handleSearch = (
// //     searchData
// //   ) => {
// //     const mergedSearchData = {
// //       ...activeSearch,
// //       ...searchData,
// //     };

// //     /*
// //      * If user changes date search,
// //      * clear month/year because explicit
// //      * date range should take priority.
// //      */

// //     if (
// //       mergedSearchData.startDate ||
// //       mergedSearchData.endDate
// //     ) {
// //       mergedSearchData.month = '';
// //       mergedSearchData.year = '';
// //     }

// //     setActiveSearch(
// //       mergedSearchData
// //     );

// //     setCurrentPage(1);

// //     fetchData(
// //       mergedSearchData,
// //       1
// //     );

// //     setSearchModalVisible(
// //       false
// //     );
// //   };

// //   /* =========================================================
// //      RESET SEARCH
// //   ========================================================= */

// //   const handleResetSearch = () => {
// //     const resetSearch = {
// //       ...EMPTY_SEARCH,
// //     };

// //     setActiveSearch(
// //       resetSearch
// //     );

// //     setSearchTerm('');

// //     setSortConfig({
// //       key: null,
// //       direction: 'ascending',
// //     });

// //     setCurrentPage(1);

// //     /*
// //      * IMPORTANT:
// //      * Pass resetSearch directly.
// //      *
// //      * Do NOT call fetchData({}),
// //      * because React state update is asynchronous
// //      * and fetchData could use the old activeSearch.
// //      */

// //     fetchData(
// //       resetSearch,
// //       1
// //     );
// //   };

// //   /* =========================================================
// //      ITEM DETAIL MODAL
// //   ========================================================= */

// //   const openItemDetailModal = (
// //     item
// //   ) => {
// //     setSelectedItemDetail(
// //       item
// //     );

// //     setItemDetailModalVisible(
// //       true
// //     );
// //   };

// //   const closeItemDetailModal =
// //     () => {
// //       setItemDetailModalVisible(
// //         false
// //       );

// //       setSelectedItemDetail(
// //         null
// //       );
// //     };

// //   /* =========================================================
// //      EXPORT MODAL
// //   ========================================================= */

// //   const openExportModal =
// //     () => {
// //       let startDate =
// //         activeSearch.startDate ||
// //         '';

// //       let endDate =
// //         activeSearch.endDate ||
// //         '';

// //       /*
// //        * If current page came from
// //        * Usage Summary using month/year,
// //        * export that exact month.
// //        */

// //       if (
// //         !startDate &&
// //         !endDate &&
// //         activeSearch.month &&
// //         activeSearch.year
// //       ) {
// //         const monthRange =
// //           getMonthDateRange(
// //             activeSearch.month,
// //             activeSearch.year
// //           );

// //         startDate =
// //           monthRange.startDate;

// //         endDate =
// //           monthRange.endDate;
// //       }

// //       setExportStartDate(
// //         normalizeDateForApi(
// //           startDate
// //         )
// //       );

// //       setExportEndDate(
// //         normalizeDateForApi(
// //           endDate
// //         )
// //       );

// //       setExportModalVisible(
// //         true
// //       );
// //     };

// //   /* =========================================================
// //      FETCH ALL DATA FOR EXPORT
// //   ========================================================= */

// //   const fetchAllDataForExport =
// //     async () => {
// //       try {
// //         const params =
// //           new URLSearchParams();

// //         /* -----------------------------
// //            CENTER
// //         ----------------------------- */

// //         if (
// //           activeSearch.centerId
// //         ) {
// //           params.append(
// //             'centerId',
// //             activeSearch.centerId
// //           );
// //         }

// //         /* -----------------------------
// //            PRODUCT
// //         ----------------------------- */

// //         if (
// //           activeSearch.productId
// //         ) {
// //           params.append(
// //             'productId',
// //             activeSearch.productId
// //           );
// //         }

// //         /* -----------------------------
// //            USAGE TYPE
// //         ----------------------------- */

// //         if (
// //           activeSearch.usageType
// //         ) {
// //           params.append(
// //             'usageType',
// //             activeSearch.usageType
// //           );
// //         }

// //         /* -----------------------------
// //            CONNECTION TYPE
// //         ----------------------------- */

// //         if (
// //           activeSearch.connectionType
// //         ) {
// //           params.append(
// //             'connectionType',
// //             activeSearch.connectionType
// //           );
// //         }

// //         /* -----------------------------
// //            CUSTOMER
// //         ----------------------------- */

// //         if (
// //           activeSearch.customer
// //         ) {
// //           params.append(
// //             'customer',
// //             activeSearch.customer
// //           );
// //         }

// //         /* -----------------------------
// //            KEYWORD
// //         ----------------------------- */

// //         if (
// //           activeSearch.keyword
// //         ) {
// //           params.append(
// //             'search',
// //             activeSearch.keyword
// //           );
// //         }

// //         /* -----------------------------
// //            OUTLET
// //         ----------------------------- */

// //         if (
// //           activeSearch.outlet
// //         ) {
// //           params.append(
// //             'outlet',
// //             activeSearch.outlet
// //           );
// //         }

// //         /* -----------------------------
// //            DATE
// //         ----------------------------- */

// //         let startDate =
// //           exportStartDate;

// //         let endDate =
// //           exportEndDate;

// //         if (
// //           !startDate &&
// //           !endDate &&
// //           activeSearch.month &&
// //           activeSearch.year
// //         ) {
// //           const monthRange =
// //             getMonthDateRange(
// //               activeSearch.month,
// //               activeSearch.year
// //             );

// //           startDate =
// //             monthRange.startDate;

// //           endDate =
// //             monthRange.endDate;
// //         }

// //         if (startDate) {
// //           params.append(
// //             'startDate',
// //             normalizeDateForApi(
// //               startDate
// //             )
// //           );
// //         }

// //         if (endDate) {
// //           params.append(
// //             'endDate',
// //             normalizeDateForApi(
// //               endDate
// //             )
// //           );
// //         }

// //         params.append(
// //           'export',
// //           'true'
// //         );

// //         const url =
// //           params.toString()
// //             ? `/reports/usages?${params.toString()}`
// //             : '/reports/usages';

// //         console.log(
// //           'Export URL:',
// //           url
// //         );

// //         const response =
// //           await axiosInstance.get(
// //             url
// //           );

// //         if (
// //           response.data.success
// //         ) {
// //           return (
// //             response.data.data ||
// //             []
// //           );
// //         }

// //         throw new Error(
// //           'API returned unsuccessful response'
// //         );
// //       } catch (err) {
// //         console.error(
// //           'Error fetching data for export:',
// //           err
// //         );

// //         showError(
// //           'Error fetching data for export'
// //         );

// //         return [];
// //       }
// //     };

// //   /* =========================================================
// //      GENERATE CSV EXPORT
// //   ========================================================= */

// //   const generateDetailExport =
// //     async () => {
// //       try {
// //         setExportLoading(
// //           true
// //         );

// //         /* -----------------------------
// //            DATE VALIDATION
// //         ----------------------------- */

// //         if (
// //           exportStartDate &&
// //           exportEndDate &&
// //           normalizeDateForApi(
// //             exportStartDate
// //           ) >
// //             normalizeDateForApi(
// //               exportEndDate
// //             )
// //         ) {
// //           showError(
// //             'Start date cannot be greater than end date'
// //           );

// //           setExportLoading(
// //             false
// //           );

// //           return;
// //         }

// //         const allData =
// //           await fetchAllDataForExport();

// //         if (
// //           !allData ||
// //           allData.length === 0
// //         ) {
// //           showError(
// //             'No data available for export'
// //           );

// //           return;
// //         }

// //         /* -----------------------------
// //            FILE NAME
// //         ----------------------------- */

// //         let fileName =
// //           'Usage_stock_report';

// //         if (
// //           exportStartDate &&
// //           exportEndDate
// //         ) {
// //           fileName +=
// //             `_${exportStartDate}_to_${exportEndDate}`;
// //         } else if (
// //           exportStartDate
// //         ) {
// //           fileName +=
// //             `_from_${exportStartDate}`;
// //         } else if (
// //           exportEndDate
// //         ) {
// //           fileName +=
// //             `_until_${exportEndDate}`;
// //         }

// //         const filterParts =
// //           [];

// //         if (
// //           activeSearch.centerId
// //         ) {
// //           const centerName =
// //             centers.find(
// //               (center) =>
// //                 getId(
// //                   center._id
// //                 ) ===
// //                 getId(
// //                   activeSearch.centerId
// //                 )
// //             )?.centerName ||
// //             'Center';

// //           filterParts.push(
// //             centerName.replace(
// //               /\s+/g,
// //               '_'
// //             )
// //           );
// //         }

// //         if (
// //           activeSearch.productId
// //         ) {
// //           const productName =
// //             products.find(
// //               (product) =>
// //                 getId(
// //                   product._id
// //                 ) ===
// //                 getId(
// //                   activeSearch.productId
// //                 )
// //             )?.productTitle ||
// //             'Product';

// //           filterParts.push(
// //             productName.replace(
// //               /\s+/g,
// //               '_'
// //             )
// //           );
// //         }

// //         if (
// //           activeSearch.usageType
// //         ) {
// //           filterParts.push(
// //             activeSearch.usageType.replace(
// //               /\s+/g,
// //               '_'
// //             )
// //           );
// //         }

// //         if (
// //           activeSearch.connectionType
// //         ) {
// //           filterParts.push(
// //             activeSearch.connectionType.replace(
// //               /\s+/g,
// //               '_'
// //             )
// //           );
// //         }

// //         if (
// //           filterParts.length > 0
// //         ) {
// //           fileName +=
// //             `_${filterParts.join('_')}`;
// //         }

// //         fileName +=
// //           `_${new Date()
// //             .toISOString()
// //             .split('T')[0]}.csv`;

// //         /* -----------------------------
// //            CSV HEADERS
// //         ----------------------------- */

// //         const headers = [
// //           'Date',
// //           'Type',
// //           'Center',
// //           'Product',
// //           'Product Type',
// //           'Qty',
// //           'User/Building',
// //           'Address',
// //           'Mobile',
// //           'Package Duration',
// //           'Status',
// //           'ONU Chrg.',
// //           'Pkt. Amt.',
// //           'Inst. Chrg.',
// //           'Shifting Amount',
// //           'Wire Change Amount',
// //           'Total Amount',
// //           'Reason',
// //         ];

// //         /* -----------------------------
// //            FLATTEN EXPORT DATA
// //         ----------------------------- */

// //         const flattenedExportData =
// //           [];

// //         const activeProductId =
// //           getId(
// //             activeSearch.productId
// //           );

// //         const activeCenterId =
// //           getId(
// //             activeSearch.centerId
// //           );

// //         allData.forEach(
// //           (usage) => {
// //             const usageCenterId =
// //               getId(
// //                 usage.center?._id ||
// //                   usage.center ||
// //                   usage.centerId
// //               );

// //             /*
// //              * Extra safety:
// //              * Keep only selected center.
// //              */

// //             if (
// //               activeCenterId &&
// //               usageCenterId !==
// //                 activeCenterId
// //             ) {
// //               return;
// //             }

// //             if (
// //               usage.items &&
// //               Array.isArray(
// //                 usage.items
// //               ) &&
// //               usage.items.length > 0
// //             ) {
// //               let items =
// //                 usage.items;

// //               /*
// //                * IMPORTANT:
// //                * Export ONLY the selected product
// //                * when coming from Usage Summary.
// //                */

// //               if (
// //                 activeProductId
// //               ) {
// //                 items =
// //                   usage.items.filter(
// //                     (item) => {
// //                       const itemProductId =
// //                         getId(
// //                           item.product?._id ||
// //                             item.product ||
// //                             item.productId
// //                         );

// //                       return (
// //                         itemProductId ===
// //                         activeProductId
// //                       );
// //                     }
// //                   );
// //               }

// //               items.forEach(
// //                 (item) => {
// //                   flattenedExportData.push(
// //                     {
// //                       ...usage,
// //                       item,
// //                       product:
// //                         item.product,
// //                       quantity:
// //                         Number(
// //                           item.quantity ||
// //                             0
// //                         ),
// //                     }
// //                   );
// //                 }
// //               );
// //             }
// //           }
// //         );

// //         if (
// //           flattenedExportData.length ===
// //           0
// //         ) {
// //           showError(
// //             'No data available for export'
// //           );

// //           return;
// //         }

// //         /* -----------------------------
// //            CSV DATA
// //         ----------------------------- */

// //         const csvData =
// //           flattenedExportData.map(
// //             (item) => {
// //               const address =
// //                 item.usageType ===
// //                 'Customer'
// //                   ? `${item.customer?.address1 || ''} ${
// //                       item.customer?.address2 ||
// //                       ''
// //                     }`.trim()
// //                   : item.usageType ===
// //                     'Building'
// //                   ? `${item.fromBuilding?.address1 || ''} ${
// //                       item.fromBuilding?.address2 ||
// //                       ''
// //                     }`.trim()
// //                   : item.usageType ===
// //                     'Control Room'
// //                   ? `${item.fromControlRoom?.address1 || ''} ${
// //                       item.fromControlRoom?.address2 ||
// //                       ''
// //                     }`.trim()
// //                   : '';

// //               return [
// //                 formatDate(
// //                   item.date || ''
// //                 ),

// //                 item.usageType ||
// //                   '',

// //                 item.center
// //                   ?.centerName ||
// //                   '',

// //                 item.product
// //                   ?.productTitle ||
// //                   '',

// //                 item.product
// //                   ?.productCategory
// //                   ?.productCategory ||
// //                   '',

// //                 item.quantity || 0,

// //                 getUserOrBuildingLabel(
// //                   item
// //                 ),

// //                 address,

// //                 item.customer
// //                   ?.mobile ||
// //                   '',

// //                 item.packageDuration ||
// //                   '',

// //                 item.status ||
// //                   '',

// //                 item.onuCharges ||
// //                   0,

// //                 item.packageAmount ||
// //                   0,

// //                 item.installationCharges ||
// //                   0,

// //                 item.shiftingAmount ||
// //                   0,

// //                 item.wireChangeAmount ||
// //                   0,

// //                 item.totalRevenue ||
// //                   0,

// //                 item.reason ||
// //                   item.remark ||
// //                   '',
// //               ];
// //             }
// //           );

// //         /* -----------------------------
// //            CSV CONTENT
// //         ----------------------------- */

// //         const csvContent = [
// //           headers.join(','),
// //           ...csvData.map(
// //             (row) =>
// //               row
// //                 .map(
// //                   (field) => {
// //                     const stringField =
// //                       String(
// //                         field ??
// //                           ''
// //                       );

// //                     return `"${stringField.replace(
// //                       /"/g,
// //                       '""'
// //                     )}"`;
// //                   }
// //                 )
// //                 .join(',')
// //           ),
// //         ].join('\n');

// //         /* -----------------------------
// //            DOWNLOAD CSV
// //         ----------------------------- */

// //         const blob =
// //           new Blob(
// //             [
// //               '\uFEFF' +
// //                 csvContent,
// //             ],
// //             {
// //               type:
// //                 'text/csv;charset=utf-8;',
// //             }
// //           );

// //         const link =
// //           document.createElement(
// //             'a'
// //           );

// //         const downloadUrl =
// //           URL.createObjectURL(
// //             blob
// //           );

// //         link.setAttribute(
// //           'href',
// //           downloadUrl
// //         );

// //         link.setAttribute(
// //           'download',
// //           fileName
// //         );

// //         link.style.visibility =
// //           'hidden';

// //         document.body.appendChild(
// //           link
// //         );

// //         link.click();

// //         document.body.removeChild(
// //           link
// //         );

// //         URL.revokeObjectURL(
// //           downloadUrl
// //         );

// //         showSuccess(
// //           'Export completed successfully!'
// //         );

// //         setExportModalVisible(
// //           false
// //         );

// //         setExportStartDate('');
// //         setExportEndDate('');
// //       } catch (error) {
// //         console.error(
// //           'Error generating export:',
// //           error
// //         );

// //         showError(
// //           'Error generating export file'
// //         );
// //       } finally {
// //         setExportLoading(
// //           false
// //         );
// //       }
// //     };

// //   /* =========================================================
// //      LOADING
// //   ========================================================= */

// //   if (loading) {
// //     return (
// //       <div
// //         className="d-flex justify-content-center align-items-center"
// //         style={{
// //           height: '50vh',
// //         }}
// //       >
// //         <CSpinner color="primary" />
// //       </div>
// //     );
// //   }

// //   /* =========================================================
// //      ERROR
// //   ========================================================= */

// //   if (error) {
// //     return (
// //       <div
// //         className="alert alert-danger"
// //         role="alert"
// //       >
// //         Error loading data: {error}
// //       </div>
// //     );
// //   }

// //   /* =========================================================
// //      RENDER
// //   ========================================================= */

// //   return (
// //     <div>
// //       <div className="title">
// //         Usage Stock Report
// //       </div>

// //       {/* =====================================================
// //           SEARCH MODAL
// //       ===================================================== */}

// //       <SearchUsageDetail
// //         visible={
// //           searchModalVisible
// //         }
// //         onClose={() =>
// //           setSearchModalVisible(
// //             false
// //           )
// //         }
// //         onSearch={
// //           handleSearch
// //         }
// //         centers={centers}
// //         products={products}
// //         customers={customers}
// //       />

// //       {/* =====================================================
// //           EXPORT MODAL
// //       ===================================================== */}

// //       <CModal
// //         visible={
// //           exportModalVisible
// //         }
// //         onClose={() =>
// //           setExportModalVisible(
// //             false
// //           )
// //         }
// //         size="md"
// //       >
// //         <CModalHeader>
// //           <CModalTitle>
// //             Export Usage Stock Report
// //           </CModalTitle>
// //         </CModalHeader>

// //         <CModalBody>
// //           {/* START DATE */}

// //           <div className="form-group mb-3">
// //             <CFormLabel htmlFor="exportStartDate">
// //               Start Date (Optional)
// //             </CFormLabel>

// //             <CFormInput
// //               type="date"
// //               id="exportStartDate"
// //               value={
// //                 exportStartDate
// //               }
// //               onChange={(e) =>
// //                 setExportStartDate(
// //                   e.target.value
// //                 )
// //               }
// //             />

// //             <small className="text-muted">
// //               Leave empty to include
// //               all records from
// //               beginning
// //             </small>
// //           </div>

// //           {/* END DATE */}

// //           <div className="form-group mb-3">
// //             <CFormLabel htmlFor="exportEndDate">
// //               End Date (Optional)
// //             </CFormLabel>

// //             <CFormInput
// //               type="date"
// //               id="exportEndDate"
// //               value={
// //                 exportEndDate
// //               }
// //               onChange={(e) =>
// //                 setExportEndDate(
// //                   e.target.value
// //                 )
// //               }
// //             />

// //             <small className="text-muted">
// //               Leave empty to include
// //               all records until today
// //             </small>
// //           </div>

// //           {/* CURRENT FILTERS */}

// //           {isSearchActive() && (
// //             <div className="mt-3 p-2 bg-light rounded">
// //               <strong>
// //                 Current Filters:
// //               </strong>

// //               <ul className="mb-0 mt-1">
// //                 {activeSearch.centerId && (
// //                   <li>
// //                     <small>
// //                       Center:{' '}
// //                       {centers.find(
// //                         (center) =>
// //                           getId(
// //                             center._id
// //                           ) ===
// //                           getId(
// //                             activeSearch.centerId
// //                           )
// //                       )?.centerName ||
// //                         activeSearch.centerId}
// //                     </small>
// //                   </li>
// //                 )}

// //                 {activeSearch.productId && (
// //                   <li>
// //                     <small>
// //                       Product:{' '}
// //                       {products.find(
// //                         (product) =>
// //                           getId(
// //                             product._id
// //                           ) ===
// //                           getId(
// //                             activeSearch.productId
// //                           )
// //                       )?.productTitle ||
// //                         activeSearch.productId}
// //                     </small>
// //                   </li>
// //                 )}

// //                 {activeSearch.usageType && (
// //                   <li>
// //                     <small>
// //                       Usage Type:{' '}
// //                       {
// //                         activeSearch.usageType
// //                       }
// //                     </small>
// //                   </li>
// //                 )}

// //                 {activeSearch.connectionType && (
// //                   <li>
// //                     <small>
// //                       Connection Type:{' '}
// //                       {
// //                         activeSearch.connectionType
// //                       }
// //                     </small>
// //                   </li>
// //                 )}

// //                 {activeSearch.customer && (
// //                   <li>
// //                     <small>
// //                       Customer:{' '}
// //                       {customers.find(
// //                         (customer) =>
// //                           getId(
// //                             customer._id
// //                           ) ===
// //                           getId(
// //                             activeSearch.customer
// //                           )
// //                       )?.username ||
// //                         activeSearch.customer}
// //                     </small>
// //                   </li>
// //                 )}

// //                 {activeSearch.month &&
// //                   activeSearch.year && (
// //                     <li>
// //                       <small>
// //                         Period:{' '}
// //                         {
// //                           activeSearch.month
// //                         }
// //                         /
// //                         {
// //                           activeSearch.year
// //                         }
// //                       </small>
// //                     </li>
// //                   )}
// //               </ul>
// //             </div>
// //           )}
// //         </CModalBody>

// //         <CModalFooter>
// //           <CButton
// //             color="secondary"
// //             onClick={() =>
// //               setExportModalVisible(
// //                 false
// //               )
// //             }
// //           >
// //             Cancel
// //           </CButton>

// //           <CButton
// //             color="primary"
// //             onClick={
// //               generateDetailExport
// //             }
// //             disabled={
// //               exportLoading
// //             }
// //           >
// //             {exportLoading ? (
// //               <>
// //                 <CSpinner
// //                   size="sm"
// //                   className="me-1"
// //                 />
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

// //       {/* =====================================================
// //           ITEM DETAIL MODAL
// //       ===================================================== */}

// //       <CModal
// //         visible={
// //           itemDetailModalVisible
// //         }
// //         onClose={
// //           closeItemDetailModal
// //         }
// //         size="lg"
// //       >
// //         <CModalHeader>
// //           <CModalTitle>
// //             Usage Item Details
// //           </CModalTitle>
// //         </CModalHeader>

// //         <CModalBody>
// //           {selectedItemDetail && (
// //             <>
// //               {/* BASIC INFORMATION */}

// //               <div className="row mb-3">
// //                 <div className="col-md-6 mb-2">
// //                   <strong>
// //                     Date:
// //                   </strong>{' '}
// //                   {formatDate(
// //                     selectedItemDetail.date ||
// //                       ''
// //                   )}
// //                 </div>

// //                 <div className="col-md-6 mb-2">
// //                   <strong>
// //                     Type:
// //                   </strong>{' '}
// //                   {selectedItemDetail.usageType ||
// //                     ''}
// //                 </div>

// //                 <div className="col-md-6 mb-2">
// //                   <strong>
// //                     Branch:
// //                   </strong>{' '}
// //                   {selectedItemDetail.center
// //                     ?.centerName ||
// //                     ''}
// //                 </div>

// //                 <div className="col-md-6 mb-2">
// //                   <strong>
// //                     Status:
// //                   </strong>{' '}
// //                   {selectedItemDetail.status ||
// //                     ''}
// //                 </div>

// //                 <div className="col-md-6 mb-2">
// //                   <strong>
// //                     User/Building:
// //                   </strong>{' '}
// //                   {getUserOrBuildingLabel(
// //                     selectedItemDetail
// //                   )}
// //                 </div>

// //                 <div className="col-md-6 mb-2">
// //                   <strong>
// //                     Mobile:
// //                   </strong>{' '}
// //                   {selectedItemDetail
// //                     .customer
// //                     ?.mobile ||
// //                     ''}
// //                 </div>
// //               </div>

// //               <hr />

// //               {/* PRODUCT INFORMATION */}

// //               <div className="row mb-3">
// //                 <div className="col-md-6 mb-2">
// //                   <strong>
// //                     Product:
// //                   </strong>{' '}
// //                   {selectedItemDetail
// //                     .product
// //                     ?.productTitle ||
// //                     'N/A'}
// //                 </div>

// //                 <div className="col-md-6 mb-2">
// //                   <strong>
// //                     Product Type:
// //                   </strong>{' '}
// //                   {selectedItemDetail
// //                     .product
// //                     ?.productCategory
// //                     ?.productCategory ||
// //                     'N/A'}
// //                 </div>

// //                 <div className="col-md-4 mb-2">
// //                   <strong>
// //                     Quantity:
// //                   </strong>{' '}
// //                   {selectedItemDetail.quantity ||
// //                     0}
// //                 </div>

// //                 <div className="col-md-4 mb-2">
// //                   <strong>
// //                     Old Stock:
// //                   </strong>{' '}
// //                   {selectedItemDetail.item
// //                     ?.oldStock ??
// //                     'N/A'}
// //                 </div>

// //                 <div className="col-md-4 mb-2">
// //                   <strong>
// //                     New Stock:
// //                   </strong>{' '}
// //                   {selectedItemDetail.item
// //                     ?.newStock ??
// //                     'N/A'}
// //                 </div>
// //               </div>

// //               {/* SERIAL NUMBERS */}

// //               {selectedItemDetail
// //                 .item
// //                 ?.serialNumbers &&
// //                 selectedItemDetail.item
// //                   .serialNumbers
// //                   .length > 0 && (
// //                   <>
// //                     <hr />

// //                     <strong>
// //                       Serial Numbers (
// //                       {
// //                         selectedItemDetail
// //                           .item
// //                           .serialNumbers
// //                           .length
// //                       }
// //                       ):
// //                     </strong>

// //                     <div className="d-flex flex-wrap mt-2">
// //                       {selectedItemDetail.item.serialNumbers.map(
// //                         (
// //                           serialNumber,
// //                           index
// //                         ) => (
// //                           <span
// //                             key={
// //                               index
// //                             }
// //                             className="badge bg-secondary me-2 mb-2 p-2"
// //                           >
// //                             {
// //                               serialNumber
// //                             }
// //                           </span>
// //                         )
// //                       )}
// //                     </div>
// //                   </>
// //                 )}

// //               <hr />

// //               {/* AMOUNT INFORMATION */}

// //               <div className="row">
// //                 <div className="col-md-6 mb-2">
// //                   <strong>
// //                     Package Duration:
// //                   </strong>{' '}
// //                   {selectedItemDetail.packageDuration ||
// //                     ''}
// //                 </div>

// //                 <div className="col-md-6 mb-2">
// //                   <strong>
// //                     ONU Charges:
// //                   </strong>{' '}
// //                   {selectedItemDetail.onuCharges ||
// //                     ''}
// //                 </div>

// //                 <div className="col-md-6 mb-2">
// //                   <strong>
// //                     Package Amount:
// //                   </strong>{' '}
// //                   {selectedItemDetail.packageAmount ||
// //                     ''}
// //                 </div>

// //                 <div className="col-md-6 mb-2">
// //                   <strong>
// //                     Installation Charges:
// //                   </strong>{' '}
// //                   {selectedItemDetail.installationCharges ||
// //                     ''}
// //                 </div>

// //                 <div className="col-md-6 mb-2">
// //                   <strong>
// //                     Shifting Amount:
// //                   </strong>{' '}
// //                   {selectedItemDetail.shiftingAmount ||
// //                     ''}
// //                 </div>

// //                 <div className="col-md-6 mb-2">
// //                   <strong>
// //                     Wire Change Amount:
// //                   </strong>{' '}
// //                   {selectedItemDetail.wireChangeAmount ||
// //                     ''}
// //                 </div>

// //                 <div className="col-md-6 mb-2">
// //                   <strong>
// //                     Total Amount:
// //                   </strong>{' '}
// //                   {selectedItemDetail.totalRevenue ||
// //                     ''}
// //                 </div>

// //                 <div className="col-md-6 mb-2">
// //                   <strong>
// //                     Reason:
// //                   </strong>{' '}
// //                   {selectedItemDetail.reason ||
// //                     selectedItemDetail.remark ||
// //                     ''}
// //                 </div>
// //               </div>
// //             </>
// //           )}
// //         </CModalBody>

// //         <CModalFooter>
// //           <CButton
// //             color="secondary"
// //             onClick={
// //               closeItemDetailModal
// //             }
// //           >
// //             Close
// //           </CButton>
// //         </CModalFooter>
// //       </CModal>

// //       {/* =====================================================
// //           MAIN TABLE CARD
// //       ===================================================== */}

// //       <CCard className="table-container mt-4">
// //         <CCardHeader className="card-header d-flex justify-content-between align-items-center">
// //           <div>
// //             {/* SEARCH */}

// //             <CButton
// //               size="sm"
// //               className="action-btn me-1"
// //               onClick={() =>
// //                 setSearchModalVisible(
// //                   true
// //                 )
// //               }
// //             >
// //               <CIcon
// //                 icon={cilSearch}
// //                 className="icon"
// //               />{' '}
// //               Search
// //             </CButton>

// //             {/* RESET */}

// //             {isSearchActive() && (
// //               <CButton
// //                 size="sm"
// //                 color="secondary"
// //                 className="action-btn me-1"
// //                 onClick={
// //                   handleResetSearch
// //                 }
// //               >
// //                 <CIcon
// //                   icon={cilZoomOut}
// //                   className="icon"
// //                 />{' '}
// //                 Reset Search
// //               </CButton>
// //             )}

// //             {/* EXPORT */}

// //             <CButton
// //               size="sm"
// //               className="action-btn me-1"
// //               onClick={
// //                 openExportModal
// //               }
// //               disabled={
// //                 exportLoading ||
// //                 data.length === 0
// //               }
// //             >
// //               <i className="fa fa-fw fa-file-excel"></i>{' '}
// //               Export
// //             </CButton>
// //           </div>

// //           {/* PAGINATION */}

// //           <div>
// //             <Pagination
// //               currentPage={
// //                 currentPage
// //               }
// //               totalPages={
// //                 totalPages
// //               }
// //               onPageChange={
// //                 handlePageChange
// //               }
// //             />
// //           </div>
// //         </CCardHeader>

// //         <CCardBody>
// //           {/* TOP SEARCH */}

// //           <div className="d-flex justify-content-between mb-3">
// //             <div>
// //               {(exportStartDate ||
// //                 exportEndDate) && (
// //                 <div className="text-muted small">
// //                   {exportStartDate &&
// //                     `Export From: ${exportStartDate} `}

// //                   {exportEndDate &&
// //                     `To: ${exportEndDate}`}
// //                 </div>
// //               )}
// //             </div>

// //             <div className="d-flex">
// //               <CFormLabelPro className="mt-1 m-1">
// //                 Search:
// //               </CFormLabelPro>

// //               <CFormInput
// //                 type="text"
// //                 style={{
// //                   maxWidth:
// //                     '350px',
// //                   height:
// //                     '30px',
// //                   borderRadius:
// //                     '0',
// //                 }}
// //                 className="d-inline-block square-search"
// //                 value={
// //                   searchTerm
// //                 }
// //                 onChange={(e) =>
// //                   setSearchTerm(
// //                     e.target.value
// //                   )
// //                 }
// //               />
// //             </div>
// //           </div>

// //           {/* TABLE */}

// //           <div className="responsive-table-wrapper">
// //             <CTable
// //               striped
// //               bordered
// //               hover
// //               className="responsive-table"
// //             >
// //               <CTableHead>
// //                 <CTableRow>
// //                   {/* DATE */}

// //                   <CTableHeaderCell
// //                     scope="col"
// //                     onClick={() =>
// //                       handleSort(
// //                         'date'
// //                       )
// //                     }
// //                     className="sortable-header"
// //                   >
// //                     Date{' '}
// //                     {getSortIcon(
// //                       'date'
// //                     )}
// //                   </CTableHeaderCell>

// //                   {/* TYPE */}

// //                   <CTableHeaderCell
// //                     scope="col"
// //                     onClick={() =>
// //                       handleSort(
// //                         'usageType'
// //                       )
// //                     }
// //                     className="sortable-header"
// //                   >
// //                     Type{' '}
// //                     {getSortIcon(
// //                       'usageType'
// //                     )}
// //                   </CTableHeaderCell>

// //                   {/* BRANCH */}

// //                   <CTableHeaderCell
// //                     scope="col"
// //                     onClick={() =>
// //                       handleSort(
// //                         'center.centerName'
// //                       )
// //                     }
// //                     className="sortable-header"
// //                   >
// //                     Branch{' '}
// //                     {getSortIcon(
// //                       'center.centerName'
// //                     )}
// //                   </CTableHeaderCell>

// //                   {/* PRODUCT */}

// //                   <CTableHeaderCell
// //                     scope="col"
// //                     onClick={() =>
// //                       handleSort(
// //                         'product.productTitle'
// //                       )
// //                     }
// //                     className="sortable-header"
// //                   >
// //                     Product{' '}
// //                     {getSortIcon(
// //                       'product.productTitle'
// //                     )}
// //                   </CTableHeaderCell>

// //                   {/* PRODUCT TYPE */}

// //                   <CTableHeaderCell
// //                     scope="col"
// //                     onClick={() =>
// //                       handleSort(
// //                         'product.productCategory.productCategory'
// //                       )
// //                     }
// //                     className="sortable-header"
// //                   >
// //                     Product Type{' '}
// //                     {getSortIcon(
// //                       'product.productCategory.productCategory'
// //                     )}
// //                   </CTableHeaderCell>

// //                   {/* QTY */}

// //                   <CTableHeaderCell
// //                     scope="col"
// //                     onClick={() =>
// //                       handleSort(
// //                         'quantity'
// //                       )
// //                     }
// //                     className="sortable-header"
// //                   >
// //                     Qty{' '}
// //                     {getSortIcon(
// //                       'quantity'
// //                     )}
// //                   </CTableHeaderCell>

// //                   {/* USER */}

// //                   <CTableHeaderCell
// //                     scope="col"
// //                     className="sortable-header"
// //                   >
// //                     User/Building
// //                   </CTableHeaderCell>

// //                   {/* ADDRESS */}

// //                   <CTableHeaderCell
// //                     scope="col"
// //                     className="sortable-header"
// //                   >
// //                     Address
// //                   </CTableHeaderCell>

// //                   {/* MOBILE */}

// //                   <CTableHeaderCell
// //                     scope="col"
// //                     className="sortable-header"
// //                   >
// //                     Mobile
// //                   </CTableHeaderCell>

// //                   {/* PACKAGE */}

// //                   <CTableHeaderCell
// //                     scope="col"
// //                     onClick={() =>
// //                       handleSort(
// //                         'packageDuration'
// //                       )
// //                     }
// //                     className="sortable-header"
// //                   >
// //                     Package Duration{' '}
// //                     {getSortIcon(
// //                       'packageDuration'
// //                     )}
// //                   </CTableHeaderCell>

// //                   {/* STATUS */}

// //                   <CTableHeaderCell
// //                     scope="col"
// //                     onClick={() =>
// //                       handleSort(
// //                         'status'
// //                       )
// //                     }
// //                     className="sortable-header"
// //                   >
// //                     Status{' '}
// //                     {getSortIcon(
// //                       'status'
// //                     )}
// //                   </CTableHeaderCell>

// //                   {/* ONU */}

// //                   <CTableHeaderCell
// //                     scope="col"
// //                     onClick={() =>
// //                       handleSort(
// //                         'onuCharges'
// //                       )
// //                     }
// //                     className="sortable-header"
// //                   >
// //                     ONU Chrg.{' '}
// //                     {getSortIcon(
// //                       'onuCharges'
// //                     )}
// //                   </CTableHeaderCell>

// //                   {/* PACKAGE AMOUNT */}

// //                   <CTableHeaderCell
// //                     scope="col"
// //                     onClick={() =>
// //                       handleSort(
// //                         'packageAmount'
// //                       )
// //                     }
// //                     className="sortable-header"
// //                   >
// //                     Pkt. Amt.{' '}
// //                     {getSortIcon(
// //                       'packageAmount'
// //                     )}
// //                   </CTableHeaderCell>

// //                   {/* INSTALLATION */}

// //                   <CTableHeaderCell
// //                     scope="col"
// //                     onClick={() =>
// //                       handleSort(
// //                         'installationCharges'
// //                       )
// //                     }
// //                     className="sortable-header"
// //                   >
// //                     Inst. Chrg.{' '}
// //                     {getSortIcon(
// //                       'installationCharges'
// //                     )}
// //                   </CTableHeaderCell>

// //                   {/* SHIFTING */}

// //                   <CTableHeaderCell
// //                     scope="col"
// //                     onClick={() =>
// //                       handleSort(
// //                         'shiftingAmount'
// //                       )
// //                     }
// //                     className="sortable-header"
// //                   >
// //                     Shifting Amount{' '}
// //                     {getSortIcon(
// //                       'shiftingAmount'
// //                     )}
// //                   </CTableHeaderCell>

// //                   {/* WIRE */}

// //                   <CTableHeaderCell
// //                     scope="col"
// //                     onClick={() =>
// //                       handleSort(
// //                         'wireChangeAmount'
// //                       )
// //                     }
// //                     className="sortable-header"
// //                   >
// //                     Wire Change Amount{' '}
// //                     {getSortIcon(
// //                       'wireChangeAmount'
// //                     )}
// //                   </CTableHeaderCell>

// //                   {/* TOTAL */}

// //                   <CTableHeaderCell
// //                     scope="col"
// //                     onClick={() =>
// //                       handleSort(
// //                         'totalRevenue'
// //                       )
// //                     }
// //                     className="sortable-header"
// //                   >
// //                     Total Amount{' '}
// //                     {getSortIcon(
// //                       'totalRevenue'
// //                     )}
// //                   </CTableHeaderCell>

// //                   {/* REASON */}

// //                   <CTableHeaderCell
// //                     scope="col"
// //                     onClick={() =>
// //                       handleSort(
// //                         'reason'
// //                       )
// //                     }
// //                     className="sortable-header"
// //                   >
// //                     Reason{' '}
// //                     {getSortIcon(
// //                       'reason'
// //                     )}
// //                   </CTableHeaderCell>
// //                 </CTableRow>
// //               </CTableHead>

// //               <CTableBody>
// //                 {filteredFlattenedData.length >
// //                 0 ? (
// //                   <>
// //                     {filteredFlattenedData.map(
// //                       (item) => (
// //                         <CTableRow
// //                           key={
// //                             item.uniqueKey
// //                           }
// //                         >
// //                           {/* DATE */}

// //                           <CTableDataCell>
// //                             {formatDate(
// //                               item.date ||
// //                                 ''
// //                             )}
// //                           </CTableDataCell>

// //                           {/* TYPE */}

// //                           <CTableDataCell>
// //                             {item.usageType ||
// //                               ''}
// //                           </CTableDataCell>

// //                           {/* BRANCH */}

// //                           <CTableDataCell>
// //                             {item.center
// //                               ?.centerName ||
// //                               ''}
// //                           </CTableDataCell>

// //                           {/* PRODUCT */}

// //                           <CTableDataCell>
// //                             {item.product
// //                               ?.productTitle ||
// //                               'N/A'}
// //                           </CTableDataCell>

// //                           {/* PRODUCT TYPE */}

// //                           <CTableDataCell>
// //                             {item.product
// //                               ?.productCategory
// //                               ?.productCategory ||
// //                               'N/A'}
// //                           </CTableDataCell>

// //                           {/* QTY */}

// //                           <CTableDataCell
// //                             onClick={() =>
// //                               item.quantity >
// //                                 0 &&
// //                               openItemDetailModal(
// //                                 item
// //                               )
// //                             }
// //                             style={{
// //                               cursor:
// //                                 item.quantity >
// //                                 0
// //                                   ? 'pointer'
// //                                   : 'default',

// //                               color:
// //                                 item.quantity >
// //                                 0
// //                                   ? '#337ab7'
// //                                   : 'inherit',

// //                               fontWeight:
// //                                 item.quantity >
// //                                 0
// //                                   ? 600
// //                                   : 'normal',
// //                             }}
// //                             title={
// //                               item.quantity >
// //                               0
// //                                 ? 'Click to view usage item details'
// //                                 : ''
// //                             }
// //                           >
// //                             {item.quantity ||
// //                               0}
// //                           </CTableDataCell>

// //                           {/* USER / BUILDING */}

// //                           <CTableDataCell>
// //                             {getUserOrBuildingLabel(
// //                               item
// //                             )}
// //                           </CTableDataCell>

// //                           {/* ADDRESS */}

// //                           <CTableDataCell>
// //                             {item.usageType ===
// //                             'Customer'
// //                               ? `${item.customer?.address1 || ''} ${
// //                                   item.customer
// //                                     ?.address2 ||
// //                                   ''
// //                                 }`.trim() ||
// //                                 ''
// //                               : item.usageType ===
// //                                 'Building'
// //                               ? `${item.fromBuilding?.address1 || ''} ${
// //                                   item.fromBuilding
// //                                     ?.address2 ||
// //                                   ''
// //                                 }`.trim() ||
// //                                 'N/A'
// //                               : item.usageType ===
// //                                 'Control Room'
// //                               ? `${item.fromControlRoom?.address1 || ''} ${
// //                                   item.fromControlRoom
// //                                     ?.address2 ||
// //                                   ''
// //                                 }`.trim() ||
// //                                 ''
// //                               : ''}
// //                           </CTableDataCell>

// //                           {/* MOBILE */}

// //                           <CTableDataCell>
// //                             {item.customer
// //                               ?.mobile ||
// //                               ''}
// //                           </CTableDataCell>

// //                           {/* PACKAGE DURATION */}

// //                           <CTableDataCell>
// //                             {item.packageDuration ||
// //                               ''}
// //                           </CTableDataCell>

// //                           {/* STATUS */}

// //                           <CTableDataCell>
// //                             {item.status ||
// //                               ''}
// //                           </CTableDataCell>

// //                           {/* ONU */}

// //                           <CTableDataCell>
// //                             {item.onuCharges ||
// //                               ''}
// //                           </CTableDataCell>

// //                           {/* PACKAGE AMOUNT */}

// //                           <CTableDataCell>
// //                             {item.packageAmount ||
// //                               ''}
// //                           </CTableDataCell>

// //                           {/* INSTALLATION */}

// //                           <CTableDataCell>
// //                             {item.installationCharges ||
// //                               ''}
// //                           </CTableDataCell>

// //                           {/* SHIFTING */}

// //                           <CTableDataCell>
// //                             {item.shiftingAmount ||
// //                               ''}
// //                           </CTableDataCell>

// //                           {/* WIRE CHANGE */}

// //                           <CTableDataCell>
// //                             {item.wireChangeAmount ||
// //                               ''}
// //                           </CTableDataCell>

// //                           {/* TOTAL */}

// //                           <CTableDataCell>
// //                             {item.totalRevenue ||
// //                               ''}
// //                           </CTableDataCell>

// //                           {/* REASON */}

// //                           <CTableDataCell>
// //                             {item.reason ||
// //                               item.remark ||
// //                               ''}
// //                           </CTableDataCell>
// //                         </CTableRow>
// //                       )
// //                     )}

// //                     {/* TOTAL ROW */}

// //                     <CTableRow className="total-row">
// //                       <CTableDataCell colSpan="5">
// //                         Total
// //                       </CTableDataCell>

// //                       <CTableDataCell>
// //                         {totals.totalQty.toFixed(
// //                           2
// //                         )}
// //                       </CTableDataCell>

// //                       <CTableDataCell colSpan="4">
// //                         {''}
// //                       </CTableDataCell>

// //                       <CTableDataCell>
// //                         {''}
// //                       </CTableDataCell>

// //                       <CTableDataCell>
// //                         {totals.onuCharges.toFixed(
// //                           2
// //                         )}
// //                       </CTableDataCell>

// //                       <CTableDataCell>
// //                         {totals.packageAmount.toFixed(
// //                           2
// //                         )}
// //                       </CTableDataCell>

// //                       <CTableDataCell>
// //                         {totals.installationCharges.toFixed(
// //                           2
// //                         )}
// //                       </CTableDataCell>

// //                       <CTableDataCell>
// //                         {totals.shiftingAmount.toFixed(
// //                           2
// //                         )}
// //                       </CTableDataCell>

// //                       <CTableDataCell>
// //                         {totals.wireChangeAmount.toFixed(
// //                           2
// //                         )}
// //                       </CTableDataCell>

// //                       <CTableDataCell>
// //                         {totals.totalRevenue.toFixed(
// //                           2
// //                         )}
// //                       </CTableDataCell>

// //                       <CTableDataCell>
// //                         {''}
// //                       </CTableDataCell>
// //                     </CTableRow>
// //                   </>
// //                 ) : (
// //                   <CTableRow>
// //                     <CTableDataCell
// //                       colSpan="18"
// //                       className="text-center"
// //                     >
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

// // export default UsageDetail;



// import '../../css/table.css';
// import '../../css/form.css';

// import React, { useEffect, useMemo, useState } from 'react';

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
//   CFormLabel,
// } from '@coreui/react';

// import CIcon from '@coreui/icons-react';

// import {
//   cilArrowTop,
//   cilArrowBottom,
//   cilSearch,
//   cilZoomOut,
// } from '@coreui/icons';

// import { CFormLabel as CFormLabelPro } from '@coreui/react-pro';

// import axiosInstance from 'src/axiosInstance';
// import Pagination from 'src/utils/Pagination';
// import { showError, showSuccess } from 'src/utils/sweetAlerts';
// import { formatDate } from 'src/utils/FormatDateTime';

// import SearchUsageDetail from './SearchUsageDetail';

// import { useLocation } from 'react-router-dom';

// /* =========================================================
//    CONSTANTS
// ========================================================= */

// const EMPTY_SEARCH = {
//   centerId: '',
//   productId: '',
//   startDate: '',
//   endDate: '',
//   usageType: '',
//   connectionType: '',
//   customer: '',
//   keyword: '',
//   outlet: '',
//   month: '',
//   year: '',
// };

// /* =========================================================
//    HELPERS
// ========================================================= */

// /**
//  * Convert ID/object value to string ID safely.
//  */
// const getId = (value) => {
//   if (!value) return '';

//   if (typeof value === 'object') {
//     return (
//       value._id?.toString() ||
//       value.id?.toString() ||
//       ''
//     );
//   }

//   return value.toString();
// };

// /**
//  * Convert dates into API format.
//  *
//  * Supports:
//  * DD-MM-YYYY
//  * YYYY-MM-DD
//  */
// const normalizeDateForApi = (dateStr) => {
//   if (!dateStr) return '';

//   const value = String(dateStr).trim();

//   // Already YYYY-MM-DD
//   if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
//     return value;
//   }

//   // DD-MM-YYYY
//   if (/^\d{2}-\d{2}-\d{4}$/.test(value)) {
//     const [day, month, year] = value.split('-');
//     return `${year}-${month}-${day}`;
//   }

//   return value;
// };

// /**
//  * Get first and last date of a selected month.
//  */
// const getMonthDateRange = (month, year) => {
//   if (!month || !year) {
//     return {
//       startDate: '',
//       endDate: '',
//     };
//   }

//   const numericMonth = Number(month);
//   const numericYear = Number(year);

//   if (
//     Number.isNaN(numericMonth) ||
//     Number.isNaN(numericYear) ||
//     numericMonth < 1 ||
//     numericMonth > 12
//   ) {
//     return {
//       startDate: '',
//       endDate: '',
//     };
//   }

//   const startDate = `${numericYear}-${String(numericMonth).padStart(
//     2,
//     '0'
//   )}-01`;

//   const lastDay = new Date(
//     numericYear,
//     numericMonth,
//     0
//   ).getDate();

//   const endDate = `${numericYear}-${String(numericMonth).padStart(
//     2,
//     '0'
//   )}-${String(lastDay).padStart(2, '0')}`;

//   return {
//     startDate,
//     endDate,
//   };
// };

// /**
//  * Get nested value safely.
//  */
// const getNestedValue = (object, path) => {
//   if (!object || !path) return '';

//   return path
//     .split('.')
//     .reduce((value, key) => {
//       if (value === null || value === undefined) {
//         return '';
//       }

//       return value[key];
//     }, object);
// };

// /**
//  * Convert a value into something searchable.
//  */
// const valueToSearchString = (value) => {
//   if (value === null || value === undefined) {
//     return '';
//   }

//   if (typeof value === 'object') {
//     return Object.values(value)
//       .map((item) => valueToSearchString(item))
//       .join(' ')
//       .toLowerCase();
//   }

//   return String(value).toLowerCase();
// };

// /* =========================================================
//    COMPONENT
// ========================================================= */

// const UsageDetail = () => {
//   const [data, setData] = useState([]);

//   const [centers, setCenters] = useState([]);
//   const [products, setProducts] = useState([]);
//   const [customers, setCustomers] = useState([]);

//   const [loading, setLoading] = useState(true);
//   const [exportLoading, setExportLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const [sortConfig, setSortConfig] = useState({
//     key: null,
//     direction: 'ascending',
//   });

//   const [searchTerm, setSearchTerm] = useState('');

//   const [searchModalVisible, setSearchModalVisible] =
//     useState(false);

//   const [exportModalVisible, setExportModalVisible] =
//     useState(false);

//   const [exportStartDate, setExportStartDate] = useState('');
//   const [exportEndDate, setExportEndDate] = useState('');

//   const [itemDetailModalVisible, setItemDetailModalVisible] =
//     useState(false);

//   const [selectedItemDetail, setSelectedItemDetail] =
//     useState(null);

//   const [activeSearch, setActiveSearch] = useState({
//     ...EMPTY_SEARCH,
//   });

//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPages, setTotalPages] = useState(1);

//   const location = useLocation();

//   /* =========================================================
//      FETCH USAGE DATA
//   ========================================================= */

//   const fetchData = async (
//     searchParams = {},
//     page = 1
//   ) => {
//     try {
//       setLoading(true);
//       setError(null);

//       const params = new URLSearchParams();

//       const currentSearch =
//         Object.keys(searchParams).length > 0
//           ? searchParams
//           : activeSearch;

//       console.log(
//         'Fetching Usage Detail with filters:',
//         currentSearch
//       );

//       if (currentSearch.centerId) {
//         params.append('centerId', currentSearch.centerId);
//       }

//       if (currentSearch.productId) {
//         params.append('productId', currentSearch.productId);
//       }

//       if (currentSearch.usageType) {
//         params.append('usageType', currentSearch.usageType);
//       }

//       if (currentSearch.connectionType) {
//         params.append('connectionType', currentSearch.connectionType);
//       }

//       if (currentSearch.customer) {
//         params.append('customer', currentSearch.customer);
//       }

//       if (currentSearch.keyword) {
//         params.append('search', currentSearch.keyword);
//       }

//       if (currentSearch.outlet) {
//         params.append('outlet', currentSearch.outlet);
//       }

//       let startDate = currentSearch.startDate;
//       let endDate = currentSearch.endDate;

//       if (
//         !startDate &&
//         !endDate &&
//         currentSearch.month &&
//         currentSearch.year
//       ) {
//         const monthRange = getMonthDateRange(
//           currentSearch.month,
//           currentSearch.year
//         );

//         startDate = monthRange.startDate;
//         endDate = monthRange.endDate;
//       }

//       if (startDate && endDate) {
//         params.append('startDate', normalizeDateForApi(startDate));
//         params.append('endDate', normalizeDateForApi(endDate));
//       }

//       params.append('page', page);

//       const url = params.toString()
//         ? `/reports/usages?${params.toString()}`
//         : '/reports/usages';

//       console.log('Final Usage Detail API URL:', url);

//       const response = await axiosInstance.get(url);

//       if (response.data.success) {
//         setData(response.data.data || []);

//         setCurrentPage(
//           response.data.pagination?.currentPage || 1
//         );

//         setTotalPages(
//           response.data.pagination?.totalPages || 1
//         );
//       } else {
//         const errorMessage =
//           response.data.message ||
//           'API returned unsuccessful response';

//         setError(errorMessage);

//         console.error('Backend error:', response.data);
//       }
//     } catch (err) {
//       if (err.response) {
//         const errorMessage =
//           err.response.data?.message ||
//           err.response.data?.error ||
//           `Error ${err.response.status}: ${err.response.statusText}`;

//         setError(errorMessage);

//         console.error('Error response:', err.response.data);
//       } else if (err.request) {
//         setError(
//           'No response received from server. Please check your network connection.'
//         );

//         console.error('Error request:', err.request);
//       } else {
//         setError(
//           err.message ||
//             'An error occurred while fetching data'
//         );

//         console.error('Error message:', err.message);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   /* =========================================================
//      FETCH CENTERS
//   ========================================================= */

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

//   /* =========================================================
//      FETCH PRODUCTS
//   ========================================================= */

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

//   /* =========================================================
//      FETCH CUSTOMERS
//   ========================================================= */

//   const fetchCustomers = async () => {
//     try {
//       const response = await axiosInstance.get('/customers');

//       if (response.data.success) {
//         setCustomers(response.data.data || []);
//       }
//     } catch (error) {
//       console.error('Error fetching customers:', error);
//     }
//   };

//   /* =========================================================
//      INITIAL DATA
//   ========================================================= */

//   useEffect(() => {
//     fetchCenters();
//     fetchProducts();
//     fetchCustomers();
//   }, []);

//   /* =========================================================
//      HANDLE NAVIGATION FROM USAGE SUMMARY
//   ========================================================= */

//   useEffect(() => {
//     if (
//       location.state?.productId &&
//       location.state?.centerId
//     ) {
//       let startDate = location.state.startDate || '';
//       let endDate = location.state.endDate || '';

//       if (
//         !startDate &&
//         !endDate &&
//         location.state.month &&
//         location.state.year
//       ) {
//         const monthRange = getMonthDateRange(
//           location.state.month,
//           location.state.year
//         );

//         startDate = monthRange.startDate;
//         endDate = monthRange.endDate;
//       }

//       const filteredSearch = {
//         ...EMPTY_SEARCH,

//         productId: location.state.productId,
//         centerId: location.state.centerId,

//         startDate,
//         endDate,

//         month: location.state.month || '',
//         year: location.state.year || '',
//       };

//       console.log(
//         'Setting Usage Detail filters from Usage Summary:',
//         filteredSearch
//       );

//       setActiveSearch(filteredSearch);

//       fetchData(filteredSearch, 1);

//       document.title = `Usage Details - ${
//         location.state.productName || 'Product'
//       } at ${location.state.centerName || 'Center'}`;

//       return;
//     }

//     /* =====================================================
//        URL PARAMETER FALLBACK
//     ===================================================== */

//     const params = new URLSearchParams(location.search);

//     const productParam = params.get('productId');
//     const centerParam = params.get('centerId');

//     if (productParam && centerParam) {
//       let startDate = params.get('startDate') || '';
//       let endDate = params.get('endDate') || '';

//       const monthParam = params.get('month') || '';
//       const yearParam = params.get('year') || '';

//       if (
//         !startDate &&
//         !endDate &&
//         monthParam &&
//         yearParam
//       ) {
//         const monthRange = getMonthDateRange(
//           monthParam,
//           yearParam
//         );

//         startDate = monthRange.startDate;
//         endDate = monthRange.endDate;
//       }

//       const filteredSearch = {
//         ...EMPTY_SEARCH,

//         productId: productParam,
//         centerId: centerParam,

//         startDate,
//         endDate,

//         usageType: params.get('usageType') || '',
//         connectionType: params.get('connectionType') || '',
//         customer: params.get('customer') || '',
//         keyword: params.get('keyword') || '',
//         outlet: params.get('outlet') || '',

//         month: monthParam,
//         year: yearParam,
//       };

//       console.log(
//         'Setting Usage Detail filters from URL:',
//         filteredSearch
//       );

//       setActiveSearch(filteredSearch);

//       fetchData(filteredSearch, 1);

//       const productName = params.get('productName')
//         ? decodeURIComponent(params.get('productName'))
//         : 'Product';

//       const centerName = params.get('centerName')
//         ? decodeURIComponent(params.get('centerName'))
//         : 'Center';

//       document.title = `Usage Details - ${productName} at ${centerName}`;

//       return;
//     }

//     fetchData(EMPTY_SEARCH, 1);
//   }, [location.state, location.search]);

//   /* =========================================================
//      PAGINATION
//   ========================================================= */

//   const handlePageChange = (page) => {
//     if (page < 1 || page > totalPages) {
//       return;
//     }

//     fetchData(activeSearch, page);
//   };

//   /* =========================================================
//      FLATTEN DATA (TABLE VIEW)
//   ========================================================= */

//   const getFlattenedData = () => {
//     const flattened = [];

//     const activeProductId = getId(activeSearch.productId);
//     const activeCenterId = getId(activeSearch.centerId);

//     // Summary target quantity (when navigated from Usage Summary)
//     const summaryTargetQty = Number(
//       location.state?.summaryTotalQuantity || 0
//     );

//     const hasSummaryTarget = summaryTargetQty > 0;

//     let accumulatedQty = 0;

//     data.forEach((usage) => {
//       if (hasSummaryTarget && accumulatedQty >= summaryTargetQty) {
//         return;
//       }

//       const usageCenterId = getId(
//         usage.center?._id || usage.center || usage.centerId
//       );

//       if (activeCenterId && usageCenterId !== activeCenterId) {
//         return;
//       }

//       if (
//         usage.items &&
//         Array.isArray(usage.items) &&
//         usage.items.length > 0
//       ) {
//         let itemsToShow = usage.items;

//         if (activeProductId) {
//           itemsToShow = usage.items.filter((item) => {
//             const itemProductId = getId(
//               item.product?._id || item.product || item.productId
//             );
//             return itemProductId === activeProductId;
//           });
//         }

//         itemsToShow.forEach((item) => {
//           if (hasSummaryTarget && accumulatedQty >= summaryTargetQty) {
//             return;
//           }

//           let itemQty = Number(item.quantity || 0);

//           if (
//             hasSummaryTarget &&
//             accumulatedQty + itemQty > summaryTargetQty
//           ) {
//             itemQty = summaryTargetQty - accumulatedQty;
//           }

//           if (itemQty <= 0) return;

//           accumulatedQty += itemQty;

//           flattened.push({
//             ...usage,
//             item: {
//               ...item,
//               quantity: itemQty,
//             },
//             product: item.product,
//             quantity: itemQty,
//             uniqueKey: `${usage._id || 'usage'}_${
//               item._id || getId(item.product) || Math.random()
//             }`,
//           });
//         });
//       }
//     });

//     return flattened;
//   };

//   /* =========================================================
//      USER / BUILDING LABEL
//   ========================================================= */

//   const getUserOrBuildingLabel = (item) => {
//     if (!item) return '';

//     if (item.usageType === 'Customer') {
//       return (
//         item.customer?.username ||
//         item.customer?.name ||
//         ''
//       );
//     }

//     if (item.usageType === 'Building') {
//       return (
//         item.fromBuilding?.buildingName ||
//         item.fromBuilding?.displayName ||
//         ''
//       );
//     }

//     if (item.usageType === 'Building to Building') {
//       return `${item.fromBuilding?.buildingName || ''} to ${
//         item.toBuilding?.buildingName || ''
//       }`;
//     }

//     if (item.usageType === 'Control Room') {
//       return (
//         item.fromControlRoom?.buildingName ||
//         item.fromControlRoom?.displayName ||
//         ''
//       );
//     }

//     return '';
//   };

//   /* =========================================================
//      CALCULATE TOTALS
//   ========================================================= */

//   const calculateTotals = (rows) => {
//     const totals = {
//       totalQty: 0,
//       onuCharges: 0,
//       packageAmount: 0,
//       installationCharges: 0,
//       shiftingAmount: 0,
//       wireChangeAmount: 0,
//       totalRevenue: 0,
//     };

//     rows.forEach((item) => {
//       totals.totalQty += Number(item.quantity || 0);
//       totals.onuCharges += Number(item.onuCharges || 0);
//       totals.packageAmount += Number(item.packageAmount || 0);
//       totals.installationCharges += Number(item.installationCharges || 0);
//       totals.shiftingAmount += Number(item.shiftingAmount || 0);
//       totals.wireChangeAmount += Number(item.wireChangeAmount || 0);
//       totals.totalRevenue += Number(item.totalRevenue || 0);
//     });

//     return totals;
//   };

//   /* =========================================================
//      SEARCH ACTIVE
//   ========================================================= */

//   const isSearchActive = () => {
//     return Boolean(
//       activeSearch.centerId ||
//         activeSearch.productId ||
//         activeSearch.startDate ||
//         activeSearch.endDate ||
//         activeSearch.usageType ||
//         activeSearch.connectionType ||
//         activeSearch.customer ||
//         activeSearch.keyword ||
//         activeSearch.outlet ||
//         activeSearch.month ||
//         activeSearch.year
//     );
//   };

//   /* =========================================================
//      SORT
//   ========================================================= */

//   const handleSort = (key) => {
//     let direction = 'ascending';

//     if (
//       sortConfig.key === key &&
//       sortConfig.direction === 'ascending'
//     ) {
//       direction = 'descending';
//     }

//     setSortConfig({
//       key,
//       direction,
//     });
//   };

//   const getSortIcon = (key) => {
//     if (sortConfig.key !== key) {
//       return null;
//     }

//     return sortConfig.direction === 'ascending' ? (
//       <CIcon icon={cilArrowTop} className="ms-1" />
//     ) : (
//       <CIcon icon={cilArrowBottom} className="ms-1" />
//     );
//   };

//   /* =========================================================
//      FILTER + SORT DISPLAY DATA
//   ========================================================= */

//   const filteredFlattenedData = useMemo(() => {
//     let rows = getFlattenedData();

//     const searchValue = searchTerm.trim().toLowerCase();

//     if (searchValue) {
//       rows = rows.filter((item) =>
//         valueToSearchString(item).includes(searchValue)
//       );
//     }

//     if (sortConfig.key) {
//       const key = sortConfig.key;

//       rows = [...rows].sort((a, b) => {
//         let aValue = getNestedValue(a, key);
//         let bValue = getNestedValue(b, key);

//         const numericKeys = [
//           'quantity',
//           'onuCharges',
//           'packageAmount',
//           'installationCharges',
//           'shiftingAmount',
//           'wireChangeAmount',
//           'totalRevenue',
//         ];

//         if (numericKeys.includes(key)) {
//           aValue = Number(aValue || 0);
//           bValue = Number(bValue || 0);
//         } else if (key === 'date') {
//           aValue = new Date(aValue || 0).getTime();
//           bValue = new Date(bValue || 0).getTime();
//         } else {
//           aValue = String(aValue ?? '').toLowerCase();
//           bValue = String(bValue ?? '').toLowerCase();
//         }

//         if (aValue < bValue) {
//           return sortConfig.direction === 'ascending' ? -1 : 1;
//         }

//         if (aValue > bValue) {
//           return sortConfig.direction === 'ascending' ? 1 : -1;
//         }

//         return 0;
//       });
//     }

//     return rows;
//   }, [data, activeSearch, searchTerm, sortConfig]);

//   /* =========================================================
//      TOTALS FOR DISPLAYED DATA
//   ========================================================= */

//   const totals = useMemo(
//     () => calculateTotals(filteredFlattenedData),
//     [filteredFlattenedData]
//   );

//   /* =========================================================
//      SEARCH
//   ========================================================= */

//   const handleSearch = (searchData) => {
//     const mergedSearchData = {
//       ...activeSearch,
//       ...searchData,
//     };

//     if (mergedSearchData.startDate || mergedSearchData.endDate) {
//       mergedSearchData.month = '';
//       mergedSearchData.year = '';
//     }

//     setActiveSearch(mergedSearchData);

//     setCurrentPage(1);

//     fetchData(mergedSearchData, 1);

//     setSearchModalVisible(false);
//   };

//   /* =========================================================
//      RESET SEARCH
//   ========================================================= */

//   const handleResetSearch = () => {
//     const resetSearch = {
//       ...EMPTY_SEARCH,
//     };

//     setActiveSearch(resetSearch);

//     setSearchTerm('');

//     setSortConfig({
//       key: null,
//       direction: 'ascending',
//     });

//     setCurrentPage(1);

//     fetchData(resetSearch, 1);
//   };

//   /* =========================================================
//      ITEM DETAIL MODAL
//   ========================================================= */

//   const openItemDetailModal = (item) => {
//     setSelectedItemDetail(item);
//     setItemDetailModalVisible(true);
//   };

//   const closeItemDetailModal = () => {
//     setItemDetailModalVisible(false);
//     setSelectedItemDetail(null);
//   };

//   /* =========================================================
//      EXPORT MODAL
//   ========================================================= */

//   const openExportModal = () => {
//     let startDate = activeSearch.startDate || '';
//     let endDate = activeSearch.endDate || '';

//     if (
//       !startDate &&
//       !endDate &&
//       activeSearch.month &&
//       activeSearch.year
//     ) {
//       const monthRange = getMonthDateRange(
//         activeSearch.month,
//         activeSearch.year
//       );

//       startDate = monthRange.startDate;
//       endDate = monthRange.endDate;
//     }

//     setExportStartDate(normalizeDateForApi(startDate));
//     setExportEndDate(normalizeDateForApi(endDate));

//     setExportModalVisible(true);
//   };

//   /* =========================================================
//      FETCH ALL DATA FOR EXPORT
//   ========================================================= */

//   const fetchAllDataForExport = async () => {
//     try {
//       const params = new URLSearchParams();

//       if (activeSearch.centerId) {
//         params.append('centerId', activeSearch.centerId);
//       }

//       if (activeSearch.productId) {
//         params.append('productId', activeSearch.productId);
//       }

//       if (activeSearch.usageType) {
//         params.append('usageType', activeSearch.usageType);
//       }

//       if (activeSearch.connectionType) {
//         params.append('connectionType', activeSearch.connectionType);
//       }

//       if (activeSearch.customer) {
//         params.append('customer', activeSearch.customer);
//       }

//       if (activeSearch.keyword) {
//         params.append('search', activeSearch.keyword);
//       }

//       if (activeSearch.outlet) {
//         params.append('outlet', activeSearch.outlet);
//       }

//       let startDate = exportStartDate;
//       let endDate = exportEndDate;

//       if (
//         !startDate &&
//         !endDate &&
//         activeSearch.month &&
//         activeSearch.year
//       ) {
//         const monthRange = getMonthDateRange(
//           activeSearch.month,
//           activeSearch.year
//         );

//         startDate = monthRange.startDate;
//         endDate = monthRange.endDate;
//       }

//       if (startDate) {
//         params.append('startDate', normalizeDateForApi(startDate));
//       }

//       if (endDate) {
//         params.append('endDate', normalizeDateForApi(endDate));
//       }

//       params.append('export', 'true');

//       const url = params.toString()
//         ? `/reports/usages?${params.toString()}`
//         : '/reports/usages';

//       console.log('Export URL:', url);

//       const response = await axiosInstance.get(url);

//       if (response.data.success) {
//         return response.data.data || [];
//       }

//       throw new Error('API returned unsuccessful response');
//     } catch (err) {
//       console.error('Error fetching data for export:', err);
//       showError('Error fetching data for export');
//       return [];
//     }
//   };

//   /* =========================================================
//      GENERATE CSV EXPORT
//   ========================================================= */

//   const generateDetailExport = async () => {
//     try {
//       setExportLoading(true);

//       if (
//         exportStartDate &&
//         exportEndDate &&
//         normalizeDateForApi(exportStartDate) >
//           normalizeDateForApi(exportEndDate)
//       ) {
//         showError('Start date cannot be greater than end date');
//         setExportLoading(false);
//         return;
//       }

//       const allData = await fetchAllDataForExport();

//       if (!allData || allData.length === 0) {
//         showError('No data available for export');
//         return;
//       }

//       /* -----------------------------
//          FILE NAME
//       ----------------------------- */

//       let fileName = 'Usage_stock_report';

//       if (exportStartDate && exportEndDate) {
//         fileName += `_${exportStartDate}_to_${exportEndDate}`;
//       } else if (exportStartDate) {
//         fileName += `_from_${exportStartDate}`;
//       } else if (exportEndDate) {
//         fileName += `_until_${exportEndDate}`;
//       }

//       const filterParts = [];

//       if (activeSearch.centerId) {
//         const centerName =
//           centers.find(
//             (center) =>
//               getId(center._id) === getId(activeSearch.centerId)
//           )?.centerName || 'Center';

//         filterParts.push(centerName.replace(/\s+/g, '_'));
//       }

//       if (activeSearch.productId) {
//         const productName =
//           products.find(
//             (product) =>
//               getId(product._id) === getId(activeSearch.productId)
//           )?.productTitle || 'Product';

//         filterParts.push(productName.replace(/\s+/g, '_'));
//       }

//       if (activeSearch.usageType) {
//         filterParts.push(
//           activeSearch.usageType.replace(/\s+/g, '_')
//         );
//       }

//       if (activeSearch.connectionType) {
//         filterParts.push(
//           activeSearch.connectionType.replace(/\s+/g, '_')
//         );
//       }

//       if (filterParts.length > 0) {
//         fileName += `_${filterParts.join('_')}`;
//       }

//       fileName += `_${new Date().toISOString().split('T')[0]}.csv`;

//       /* -----------------------------
//          CSV HEADERS
//       ----------------------------- */

//       const headers = [
//         'Date',
//         'Type',
//         'Center',
//         'Product',
//         'Product Type',
//         'Qty',
//         'User/Building',
//         'Address',
//         'Mobile',
//         'Package Duration',
//         'Status',
//         'ONU Chrg.',
//         'Pkt. Amt.',
//         'Inst. Chrg.',
//         'Shifting Amount',
//         'Wire Change Amount',
//         'Total Amount',
//         'Reason',
//       ];

//       /* -----------------------------
//          FLATTEN EXPORT DATA
//          (with Summary Total Qty limit)
//       ----------------------------- */

//       const flattenedExportData = [];

//       const activeProductId = getId(activeSearch.productId);
//       const activeCenterId = getId(activeSearch.centerId);

//       /*
//        * IMPORTANT:
//        * When the user came from Usage Summary, we must
//        * limit the export to the SAME quantity that was
//        * shown on the Summary page (and in the on-screen table).
//        *
//        * Otherwise the CSV would contain more rows than the
//        * user actually saw.
//        */
//       const summaryTargetQty = Number(
//         location.state?.summaryTotalQuantity || 0
//       );

//       const hasSummaryTarget = summaryTargetQty > 0;

//       let accumulatedQty = 0;

//       allData.forEach((usage) => {
//         // Stop once we've reached the summary target quantity
//         if (hasSummaryTarget && accumulatedQty >= summaryTargetQty) {
//           return;
//         }

//         const usageCenterId = getId(
//           usage.center?._id || usage.center || usage.centerId
//         );

//         // Extra safety: keep only the selected center
//         if (activeCenterId && usageCenterId !== activeCenterId) {
//           return;
//         }

//         if (
//           usage.items &&
//           Array.isArray(usage.items) &&
//           usage.items.length > 0
//         ) {
//           let items = usage.items;

//           // Keep only the selected product when coming from Summary
//           if (activeProductId) {
//             items = usage.items.filter((item) => {
//               const itemProductId = getId(
//                 item.product?._id || item.product || item.productId
//               );
//               return itemProductId === activeProductId;
//             });
//           }

//           items.forEach((item) => {
//             // Stop once we've reached the summary target quantity
//             if (hasSummaryTarget && accumulatedQty >= summaryTargetQty) {
//               return;
//             }

//             let itemQty = Number(item.quantity || 0);

//             // If adding this item would exceed the summary total,
//             // trim it so the sum matches exactly (same as table view).
//             if (
//               hasSummaryTarget &&
//               accumulatedQty + itemQty > summaryTargetQty
//             ) {
//               itemQty = summaryTargetQty - accumulatedQty;
//             }

//             if (itemQty <= 0) return;

//             accumulatedQty += itemQty;

//             flattenedExportData.push({
//               ...usage,
//               item: {
//                 ...item,
//                 quantity: itemQty,
//               },
//               product: item.product,
//               quantity: itemQty,
//             });
//           });
//         }
//       });

//       if (flattenedExportData.length === 0) {
//         showError('No data available for export');
//         return;
//       }

//       /* -----------------------------
//          CSV DATA
//       ----------------------------- */

//       const csvData = flattenedExportData.map((item) => {
//         const address =
//           item.usageType === 'Customer'
//             ? `${item.customer?.address1 || ''} ${
//                 item.customer?.address2 || ''
//               }`.trim()
//             : item.usageType === 'Building'
//             ? `${item.fromBuilding?.address1 || ''} ${
//                 item.fromBuilding?.address2 || ''
//               }`.trim()
//             : item.usageType === 'Control Room'
//             ? `${item.fromControlRoom?.address1 || ''} ${
//                 item.fromControlRoom?.address2 || ''
//               }`.trim()
//             : '';

//         return [
//           formatDate(item.date || ''),
//           item.usageType || '',
//           item.center?.centerName || '',
//           item.product?.productTitle || '',
//           item.product?.productCategory?.productCategory || '',
//           item.quantity || 0,
//           getUserOrBuildingLabel(item),
//           address,
//           item.customer?.mobile || '',
//           item.packageDuration || '',
//           item.status || '',
//           item.onuCharges || 0,
//           item.packageAmount || 0,
//           item.installationCharges || 0,
//           item.shiftingAmount || 0,
//           item.wireChangeAmount || 0,
//           item.totalRevenue || 0,
//           item.reason || item.remark || '',
//         ];
//       });

//       /* -----------------------------
//          CSV CONTENT
//       ----------------------------- */

//       const csvContent = [
//         headers.join(','),
//         ...csvData.map((row) =>
//           row
//             .map((field) => {
//               const stringField = String(field ?? '');
//               return `"${stringField.replace(/"/g, '""')}"`;
//             })
//             .join(',')
//         ),
//       ].join('\n');

//       /* -----------------------------
//          DOWNLOAD CSV
//       ----------------------------- */

//       const blob = new Blob(['\uFEFF' + csvContent], {
//         type: 'text/csv;charset=utf-8;',
//       });

//       const link = document.createElement('a');
//       const downloadUrl = URL.createObjectURL(blob);

//       link.setAttribute('href', downloadUrl);
//       link.setAttribute('download', fileName);
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

//   /* =========================================================
//      LOADING
//   ========================================================= */

//   if (loading) {
//     return (
//       <div
//         className="d-flex justify-content-center align-items-center"
//         style={{ height: '50vh' }}
//       >
//         <CSpinner color="primary" />
//       </div>
//     );
//   }

//   /* =========================================================
//      ERROR
//   ========================================================= */

//   if (error) {
//     return (
//       <div className="alert alert-danger" role="alert">
//         Error loading data: {error}
//       </div>
//     );
//   }

//   /* =========================================================
//      RENDER
//   ========================================================= */

//   return (
//     <div>
//       <div className="title">Usage Stock Report</div>

//       <SearchUsageDetail
//         visible={searchModalVisible}
//         onClose={() => setSearchModalVisible(false)}
//         onSearch={handleSearch}
//         centers={centers}
//         products={products}
//         customers={customers}
//       />

//       {/* EXPORT MODAL */}
//       <CModal
//         visible={exportModalVisible}
//         onClose={() => setExportModalVisible(false)}
//         size="md"
//       >
//         <CModalHeader>
//           <CModalTitle>Export Usage Stock Report</CModalTitle>
//         </CModalHeader>

//         <CModalBody>
//           <div className="form-group mb-3">
//             <CFormLabel htmlFor="exportStartDate">
//               Start Date (Optional)
//             </CFormLabel>

//             <CFormInput
//               type="date"
//               id="exportStartDate"
//               value={exportStartDate}
//               onChange={(e) => setExportStartDate(e.target.value)}
//             />

//             <small className="text-muted">
//               Leave empty to include all records from beginning
//             </small>
//           </div>

//           <div className="form-group mb-3">
//             <CFormLabel htmlFor="exportEndDate">
//               End Date (Optional)
//             </CFormLabel>

//             <CFormInput
//               type="date"
//               id="exportEndDate"
//               value={exportEndDate}
//               onChange={(e) => setExportEndDate(e.target.value)}
//             />

//             <small className="text-muted">
//               Leave empty to include all records until today
//             </small>
//           </div>

//           {isSearchActive() && (
//             <div className="mt-3 p-2 bg-light rounded">
//               <strong>Current Filters:</strong>
//               <ul className="mb-0 mt-1">
//                 {activeSearch.centerId && (
//                   <li>
//                     <small>
//                       Center:{' '}
//                       {centers.find(
//                         (center) =>
//                           getId(center._id) ===
//                           getId(activeSearch.centerId)
//                       )?.centerName || activeSearch.centerId}
//                     </small>
//                   </li>
//                 )}

//                 {activeSearch.productId && (
//                   <li>
//                     <small>
//                       Product:{' '}
//                       {products.find(
//                         (product) =>
//                           getId(product._id) ===
//                           getId(activeSearch.productId)
//                       )?.productTitle || activeSearch.productId}
//                     </small>
//                   </li>
//                 )}

//                 {activeSearch.usageType && (
//                   <li>
//                     <small>Usage Type: {activeSearch.usageType}</small>
//                   </li>
//                 )}

//                 {activeSearch.connectionType && (
//                   <li>
//                     <small>
//                       Connection Type: {activeSearch.connectionType}
//                     </small>
//                   </li>
//                 )}

//                 {activeSearch.customer && (
//                   <li>
//                     <small>
//                       Customer:{' '}
//                       {customers.find(
//                         (customer) =>
//                           getId(customer._id) ===
//                           getId(activeSearch.customer)
//                       )?.username || activeSearch.customer}
//                     </small>
//                   </li>
//                 )}

//                 {activeSearch.month && activeSearch.year && (
//                   <li>
//                     <small>
//                       Period: {activeSearch.month}/{activeSearch.year}
//                     </small>
//                   </li>
//                 )}
//               </ul>
//             </div>
//           )}
//         </CModalBody>

//         <CModalFooter>
//           <CButton
//             color="secondary"
//             onClick={() => setExportModalVisible(false)}
//           >
//             Cancel
//           </CButton>

//           <CButton
//             color="primary"
//             onClick={generateDetailExport}
//             disabled={exportLoading}
//           >
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

//       {/* ITEM DETAIL MODAL */}
//       <CModal
//         visible={itemDetailModalVisible}
//         onClose={closeItemDetailModal}
//         size="lg"
//       >
//         <CModalHeader>
//           <CModalTitle>Usage Item Details</CModalTitle>
//         </CModalHeader>

//         <CModalBody>
//           {selectedItemDetail && (
//             <>
//               <div className="row mb-3">
//                 <div className="col-md-6 mb-2">
//                   <strong>Date:</strong>{' '}
//                   {formatDate(selectedItemDetail.date || '')}
//                 </div>

//                 <div className="col-md-6 mb-2">
//                   <strong>Type:</strong>{' '}
//                   {selectedItemDetail.usageType || ''}
//                 </div>

//                 <div className="col-md-6 mb-2">
//                   <strong>Branch:</strong>{' '}
//                   {selectedItemDetail.center?.centerName || ''}
//                 </div>

//                 <div className="col-md-6 mb-2">
//                   <strong>Status:</strong>{' '}
//                   {selectedItemDetail.status || ''}
//                 </div>

//                 <div className="col-md-6 mb-2">
//                   <strong>User/Building:</strong>{' '}
//                   {getUserOrBuildingLabel(selectedItemDetail)}
//                 </div>

//                 <div className="col-md-6 mb-2">
//                   <strong>Mobile:</strong>{' '}
//                   {selectedItemDetail.customer?.mobile || ''}
//                 </div>
//               </div>

//               <hr />

//               <div className="row mb-3">
//                 <div className="col-md-6 mb-2">
//                   <strong>Product:</strong>{' '}
//                   {selectedItemDetail.product?.productTitle || 'N/A'}
//                 </div>

//                 <div className="col-md-6 mb-2">
//                   <strong>Product Type:</strong>{' '}
//                   {selectedItemDetail.product?.productCategory
//                     ?.productCategory || 'N/A'}
//                 </div>

//                 <div className="col-md-4 mb-2">
//                   <strong>Quantity:</strong>{' '}
//                   {selectedItemDetail.quantity || 0}
//                 </div>

//                 <div className="col-md-4 mb-2">
//                   <strong>Old Stock:</strong>{' '}
//                   {selectedItemDetail.item?.oldStock ?? 'N/A'}
//                 </div>

//                 <div className="col-md-4 mb-2">
//                   <strong>New Stock:</strong>{' '}
//                   {selectedItemDetail.item?.newStock ?? 'N/A'}
//                 </div>
//               </div>

//               {selectedItemDetail.item?.serialNumbers &&
//                 selectedItemDetail.item.serialNumbers.length > 0 && (
//                   <>
//                     <hr />

//                     <strong>
//                       Serial Numbers (
//                       {selectedItemDetail.item.serialNumbers.length}):
//                     </strong>

//                     <div className="d-flex flex-wrap mt-2">
//                       {selectedItemDetail.item.serialNumbers.map(
//                         (serialNumber, index) => (
//                           <span
//                             key={index}
//                             className="badge bg-secondary me-2 mb-2 p-2"
//                           >
//                             {serialNumber}
//                           </span>
//                         )
//                       )}
//                     </div>
//                   </>
//                 )}

//               <hr />

//               <div className="row">
//                 <div className="col-md-6 mb-2">
//                   <strong>Package Duration:</strong>{' '}
//                   {selectedItemDetail.packageDuration || ''}
//                 </div>

//                 <div className="col-md-6 mb-2">
//                   <strong>ONU Charges:</strong>{' '}
//                   {selectedItemDetail.onuCharges || ''}
//                 </div>

//                 <div className="col-md-6 mb-2">
//                   <strong>Package Amount:</strong>{' '}
//                   {selectedItemDetail.packageAmount || ''}
//                 </div>

//                 <div className="col-md-6 mb-2">
//                   <strong>Installation Charges:</strong>{' '}
//                   {selectedItemDetail.installationCharges || ''}
//                 </div>

//                 <div className="col-md-6 mb-2">
//                   <strong>Shifting Amount:</strong>{' '}
//                   {selectedItemDetail.shiftingAmount || ''}
//                 </div>

//                 <div className="col-md-6 mb-2">
//                   <strong>Wire Change Amount:</strong>{' '}
//                   {selectedItemDetail.wireChangeAmount || ''}
//                 </div>

//                 <div className="col-md-6 mb-2">
//                   <strong>Total Amount:</strong>{' '}
//                   {selectedItemDetail.totalRevenue || ''}
//                 </div>

//                 <div className="col-md-6 mb-2">
//                   <strong>Reason:</strong>{' '}
//                   {selectedItemDetail.reason ||
//                     selectedItemDetail.remark ||
//                     ''}
//                 </div>
//               </div>
//             </>
//           )}
//         </CModalBody>

//         <CModalFooter>
//           <CButton color="secondary" onClick={closeItemDetailModal}>
//             Close
//           </CButton>
//         </CModalFooter>
//       </CModal>

//       {/* MAIN TABLE CARD */}
//       <CCard className="table-container mt-4">
//         <CCardHeader className="card-header d-flex justify-content-between align-items-center">
//           <div>
//             <CButton
//               size="sm"
//               className="action-btn me-1"
//               onClick={() => setSearchModalVisible(true)}
//             >
//               <CIcon icon={cilSearch} className="icon" /> Search
//             </CButton>

//             {isSearchActive() && (
//               <CButton
//                 size="sm"
//                 color="secondary"
//                 className="action-btn me-1"
//                 onClick={handleResetSearch}
//               >
//                 <CIcon icon={cilZoomOut} className="icon" /> Reset Search
//               </CButton>
//             )}

//             <CButton
//               size="sm"
//               className="action-btn me-1"
//               onClick={openExportModal}
//               disabled={exportLoading || data.length === 0}
//             >
//               <i className="fa fa-fw fa-file-excel"></i> Export
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

//             <div className="d-flex">
//               <CFormLabelPro className="mt-1 m-1">Search:</CFormLabelPro>

//               <CFormInput
//                 type="text"
//                 style={{
//                   maxWidth: '350px',
//                   height: '30px',
//                   borderRadius: '0',
//                 }}
//                 className="d-inline-block square-search"
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//               />
//             </div>
//           </div>

//           <div className="responsive-table-wrapper">
//             <CTable striped bordered hover className="responsive-table">
//               <CTableHead>
//                 <CTableRow>
//                   <CTableHeaderCell
//                     scope="col"
//                     onClick={() => handleSort('date')}
//                     className="sortable-header"
//                   >
//                     Date {getSortIcon('date')}
//                   </CTableHeaderCell>

//                   <CTableHeaderCell
//                     scope="col"
//                     onClick={() => handleSort('usageType')}
//                     className="sortable-header"
//                   >
//                     Type {getSortIcon('usageType')}
//                   </CTableHeaderCell>

//                   <CTableHeaderCell
//                     scope="col"
//                     onClick={() => handleSort('center.centerName')}
//                     className="sortable-header"
//                   >
//                     Branch {getSortIcon('center.centerName')}
//                   </CTableHeaderCell>

//                   <CTableHeaderCell
//                     scope="col"
//                     onClick={() => handleSort('product.productTitle')}
//                     className="sortable-header"
//                   >
//                     Product {getSortIcon('product.productTitle')}
//                   </CTableHeaderCell>

//                   <CTableHeaderCell
//                     scope="col"
//                     onClick={() =>
//                       handleSort('product.productCategory.productCategory')
//                     }
//                     className="sortable-header"
//                   >
//                     Product Type{' '}
//                     {getSortIcon(
//                       'product.productCategory.productCategory'
//                     )}
//                   </CTableHeaderCell>

//                   <CTableHeaderCell
//                     scope="col"
//                     onClick={() => handleSort('quantity')}
//                     className="sortable-header"
//                   >
//                     Qty {getSortIcon('quantity')}
//                   </CTableHeaderCell>

//                   <CTableHeaderCell scope="col" className="sortable-header">
//                     User/Building
//                   </CTableHeaderCell>

//                   <CTableHeaderCell scope="col" className="sortable-header">
//                     Address
//                   </CTableHeaderCell>

//                   <CTableHeaderCell scope="col" className="sortable-header">
//                     Mobile
//                   </CTableHeaderCell>

//                   <CTableHeaderCell
//                     scope="col"
//                     onClick={() => handleSort('packageDuration')}
//                     className="sortable-header"
//                   >
//                     Package Duration {getSortIcon('packageDuration')}
//                   </CTableHeaderCell>

//                   <CTableHeaderCell
//                     scope="col"
//                     onClick={() => handleSort('status')}
//                     className="sortable-header"
//                   >
//                     Status {getSortIcon('status')}
//                   </CTableHeaderCell>

//                   <CTableHeaderCell
//                     scope="col"
//                     onClick={() => handleSort('onuCharges')}
//                     className="sortable-header"
//                   >
//                     ONU Chrg. {getSortIcon('onuCharges')}
//                   </CTableHeaderCell>

//                   <CTableHeaderCell
//                     scope="col"
//                     onClick={() => handleSort('packageAmount')}
//                     className="sortable-header"
//                   >
//                     Pkt. Amt. {getSortIcon('packageAmount')}
//                   </CTableHeaderCell>

//                   <CTableHeaderCell
//                     scope="col"
//                     onClick={() => handleSort('installationCharges')}
//                     className="sortable-header"
//                   >
//                     Inst. Chrg. {getSortIcon('installationCharges')}
//                   </CTableHeaderCell>

//                   <CTableHeaderCell
//                     scope="col"
//                     onClick={() => handleSort('shiftingAmount')}
//                     className="sortable-header"
//                   >
//                     Shifting Amount {getSortIcon('shiftingAmount')}
//                   </CTableHeaderCell>

//                   <CTableHeaderCell
//                     scope="col"
//                     onClick={() => handleSort('wireChangeAmount')}
//                     className="sortable-header"
//                   >
//                     Wire Change Amount {getSortIcon('wireChangeAmount')}
//                   </CTableHeaderCell>

//                   <CTableHeaderCell
//                     scope="col"
//                     onClick={() => handleSort('totalRevenue')}
//                     className="sortable-header"
//                   >
//                     Total Amount {getSortIcon('totalRevenue')}
//                   </CTableHeaderCell>

//                   <CTableHeaderCell
//                     scope="col"
//                     onClick={() => handleSort('reason')}
//                     className="sortable-header"
//                   >
//                     Reason {getSortIcon('reason')}
//                   </CTableHeaderCell>
//                 </CTableRow>
//               </CTableHead>

//               <CTableBody>
//                 {filteredFlattenedData.length > 0 ? (
//                   <>
//                     {filteredFlattenedData.map((item) => (
//                       <CTableRow key={item.uniqueKey}>
//                         <CTableDataCell>
//                           {formatDate(item.date || '')}
//                         </CTableDataCell>

//                         <CTableDataCell>
//                           {item.usageType || ''}
//                         </CTableDataCell>

//                         <CTableDataCell>
//                           {item.center?.centerName || ''}
//                         </CTableDataCell>

//                         <CTableDataCell>
//                           {item.product?.productTitle || 'N/A'}
//                         </CTableDataCell>

//                         <CTableDataCell>
//                           {item.product?.productCategory?.productCategory ||
//                             'N/A'}
//                         </CTableDataCell>

//                         <CTableDataCell
//                           onClick={() =>
//                             item.quantity > 0 &&
//                             openItemDetailModal(item)
//                           }
//                           style={{
//                             cursor:
//                               item.quantity > 0 ? 'pointer' : 'default',
//                             color:
//                               item.quantity > 0 ? '#337ab7' : 'inherit',
//                             fontWeight:
//                               item.quantity > 0 ? 600 : 'normal',
//                           }}
//                           title={
//                             item.quantity > 0
//                               ? 'Click to view usage item details'
//                               : ''
//                           }
//                         >
//                           {item.quantity || 0}
//                         </CTableDataCell>

//                         <CTableDataCell>
//                           {getUserOrBuildingLabel(item)}
//                         </CTableDataCell>

//                         <CTableDataCell>
//                           {item.usageType === 'Customer'
//                             ? `${item.customer?.address1 || ''} ${
//                                 item.customer?.address2 || ''
//                               }`.trim() || ''
//                             : item.usageType === 'Building'
//                             ? `${item.fromBuilding?.address1 || ''} ${
//                                 item.fromBuilding?.address2 || ''
//                               }`.trim() || 'N/A'
//                             : item.usageType === 'Control Room'
//                             ? `${item.fromControlRoom?.address1 || ''} ${
//                                 item.fromControlRoom?.address2 || ''
//                               }`.trim() || ''
//                             : ''}
//                         </CTableDataCell>

//                         <CTableDataCell>
//                           {item.customer?.mobile || ''}
//                         </CTableDataCell>

//                         <CTableDataCell>
//                           {item.packageDuration || ''}
//                         </CTableDataCell>

//                         <CTableDataCell>
//                           {item.status || ''}
//                         </CTableDataCell>

//                         <CTableDataCell>
//                           {item.onuCharges || ''}
//                         </CTableDataCell>

//                         <CTableDataCell>
//                           {item.packageAmount || ''}
//                         </CTableDataCell>

//                         <CTableDataCell>
//                           {item.installationCharges || ''}
//                         </CTableDataCell>

//                         <CTableDataCell>
//                           {item.shiftingAmount || ''}
//                         </CTableDataCell>

//                         <CTableDataCell>
//                           {item.wireChangeAmount || ''}
//                         </CTableDataCell>

//                         <CTableDataCell>
//                           {item.totalRevenue || ''}
//                         </CTableDataCell>

//                         <CTableDataCell>
//                           {item.reason || item.remark || ''}
//                         </CTableDataCell>
//                       </CTableRow>
//                     ))}

//                     <CTableRow className="total-row">
//                       <CTableDataCell colSpan="5">Total</CTableDataCell>

//                       <CTableDataCell>
//                         {totals.totalQty.toFixed(2)}
//                       </CTableDataCell>

//                       <CTableDataCell colSpan="4">{''}</CTableDataCell>

//                       <CTableDataCell>{''}</CTableDataCell>

//                       <CTableDataCell>
//                         {totals.onuCharges.toFixed(2)}
//                       </CTableDataCell>

//                       <CTableDataCell>
//                         {totals.packageAmount.toFixed(2)}
//                       </CTableDataCell>

//                       <CTableDataCell>
//                         {totals.installationCharges.toFixed(2)}
//                       </CTableDataCell>

//                       <CTableDataCell>
//                         {totals.shiftingAmount.toFixed(2)}
//                       </CTableDataCell>

//                       <CTableDataCell>
//                         {totals.wireChangeAmount.toFixed(2)}
//                       </CTableDataCell>

//                       <CTableDataCell>
//                         {totals.totalRevenue.toFixed(2)}
//                       </CTableDataCell>

//                       <CTableDataCell>{''}</CTableDataCell>
//                     </CTableRow>
//                   </>
//                 ) : (
//                   <CTableRow>
//                     <CTableDataCell colSpan="18" className="text-center">
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

// export default UsageDetail;





import '../../css/table.css';
import '../../css/form.css';

import React, { useEffect, useMemo, useState } from 'react';

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
import { formatDate } from 'src/utils/FormatDateTime';

import SearchUsageDetail from './SearchUsageDetail';

import { useLocation } from 'react-router-dom';

/* =========================================================
   CONSTANTS
========================================================= */

const EMPTY_SEARCH = {
  centerId: '',
  productId: '',
  startDate: '',
  endDate: '',
  usageType: '',
  connectionType: '',
  customer: '',
  keyword: '',
  outlet: '',
  month: '',
  year: '',
};

/* =========================================================
   HELPERS
========================================================= */

/**
 * Convert ID/object value to string ID safely.
 */
const getId = (value) => {
  if (!value) return '';

  if (typeof value === 'object') {
    return (
      value._id?.toString() ||
      value.id?.toString() ||
      ''
    );
  }

  return value.toString();
};

/**
 * Convert dates into API format.
 *
 * Supports:
 * DD-MM-YYYY
 * YYYY-MM-DD
 */
const normalizeDateForApi = (dateStr) => {
  if (!dateStr) return '';

  const value = String(dateStr).trim();

  // Already YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return value;
  }

  // DD-MM-YYYY
  if (/^\d{2}-\d{2}-\d{4}$/.test(value)) {
    const [day, month, year] = value.split('-');
    return `${year}-${month}-${day}`;
  }

  return value;
};

/**
 * Get first and last date of a selected month.
 */
const getMonthDateRange = (month, year) => {
  if (!month || !year) {
    return {
      startDate: '',
      endDate: '',
    };
  }

  const numericMonth = Number(month);
  const numericYear = Number(year);

  if (
    Number.isNaN(numericMonth) ||
    Number.isNaN(numericYear) ||
    numericMonth < 1 ||
    numericMonth > 12
  ) {
    return {
      startDate: '',
      endDate: '',
    };
  }

  const startDate = `${numericYear}-${String(numericMonth).padStart(
    2,
    '0'
  )}-01`;

  const lastDay = new Date(
    numericYear,
    numericMonth,
    0
  ).getDate();

  const endDate = `${numericYear}-${String(numericMonth).padStart(
    2,
    '0'
  )}-${String(lastDay).padStart(2, '0')}`;

  return {
    startDate,
    endDate,
  };
};

/**
 * Get nested value safely.
 */
const getNestedValue = (object, path) => {
  if (!object || !path) return '';

  return path
    .split('.')
    .reduce((value, key) => {
      if (value === null || value === undefined) {
        return '';
      }

      return value[key];
    }, object);
};

/**
 * Convert a value into something searchable.
 */
const valueToSearchString = (value) => {
  if (value === null || value === undefined) {
    return '';
  }

  if (typeof value === 'object') {
    return Object.values(value)
      .map((item) => valueToSearchString(item))
      .join(' ')
      .toLowerCase();
  }

  return String(value).toLowerCase();
};

/**
 * Normalizes whatever payload the search modal (SearchUsageDetail) sends
 * back into the exact key shape UsageDetail expects (EMPTY_SEARCH keys).
 *
 * This is the fix for "filters not applying properly": if the modal ever
 * sends values under different key names (e.g. `center` instead of
 * `centerId`, `type` instead of `usageType`, or a populated object instead
 * of a raw id string), those selections were silently dropped before —
 * fetchData() never received them, so the API call went out unfiltered and
 * the table showed every branch/product instead of the one picked.
 */
const normalizeSearchPayload = (raw = {}) => {
  const pick = (...keys) => {
    for (const key of keys) {
      if (raw[key] !== undefined && raw[key] !== null && raw[key] !== '') {
        return raw[key];
      }
    }
    return '';
  };

  return {
    centerId: getId(pick('centerId', 'center', 'branch', 'branchId')),
    productId: getId(pick('productId', 'product')),
    startDate: pick('startDate', 'fromDate') || '',
    endDate: pick('endDate', 'toDate') || '',
    usageType: pick('usageType', 'type') || '',
    connectionType: pick('connectionType') || '',
    customer: getId(pick('customer', 'user', 'customerId', 'userId')),
    keyword: pick('keyword', 'search') || '',
    outlet: getId(pick('outlet', 'outletId')),
    month: pick('month') || '',
    year: pick('year') || '',
  };
};

/* =========================================================
   COMPONENT
========================================================= */

const UsageDetail = () => {
  const [data, setData] = useState([]);

  const [centers, setCenters] = useState([]);
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);

  const [loading, setLoading] = useState(true);
  const [exportLoading, setExportLoading] = useState(false);
  const [error, setError] = useState(null);

  const [sortConfig, setSortConfig] = useState({
    key: null,
    direction: 'ascending',
  });

  const [searchTerm, setSearchTerm] = useState('');

  const [searchModalVisible, setSearchModalVisible] =
    useState(false);

  const [exportModalVisible, setExportModalVisible] =
    useState(false);

  const [exportStartDate, setExportStartDate] = useState('');
  const [exportEndDate, setExportEndDate] = useState('');

  const [itemDetailModalVisible, setItemDetailModalVisible] =
    useState(false);

  const [selectedItemDetail, setSelectedItemDetail] =
    useState(null);

  const [activeSearch, setActiveSearch] = useState({
    ...EMPTY_SEARCH,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const location = useLocation();

  /* =========================================================
     FETCH USAGE DATA
  ========================================================= */

  const fetchData = async (
    searchParams = {},
    page = 1
  ) => {
    try {
      setLoading(true);
      setError(null);

      const params = new URLSearchParams();

      const currentSearch =
        Object.keys(searchParams).length > 0
          ? searchParams
          : activeSearch;

      console.log(
        'Fetching Usage Detail with filters:',
        currentSearch
      );

      if (currentSearch.centerId) {
        params.append('centerId', currentSearch.centerId);
      }

      if (currentSearch.productId) {
        params.append('productId', currentSearch.productId);
      }

      if (currentSearch.usageType) {
        params.append('usageType', currentSearch.usageType);
      }

      if (currentSearch.connectionType) {
        params.append('connectionType', currentSearch.connectionType);
      }

      if (currentSearch.customer) {
        params.append('customer', currentSearch.customer);
      }

      if (currentSearch.keyword) {
        params.append('search', currentSearch.keyword);
      }

      if (currentSearch.outlet) {
        params.append('outlet', currentSearch.outlet);
      }

      let startDate = currentSearch.startDate;
      let endDate = currentSearch.endDate;

      if (
        !startDate &&
        !endDate &&
        currentSearch.month &&
        currentSearch.year
      ) {
        const monthRange = getMonthDateRange(
          currentSearch.month,
          currentSearch.year
        );

        startDate = monthRange.startDate;
        endDate = monthRange.endDate;
      }

      if (startDate && endDate) {
        params.append('startDate', normalizeDateForApi(startDate));
        params.append('endDate', normalizeDateForApi(endDate));
      }

      params.append('page', page);

      const url = params.toString()
        ? `/reports/usages?${params.toString()}`
        : '/reports/usages';

      console.log('Final Usage Detail API URL:', url);

      const response = await axiosInstance.get(url);

      if (response.data.success) {
        setData(response.data.data || []);

        setCurrentPage(
          response.data.pagination?.currentPage || 1
        );

        setTotalPages(
          response.data.pagination?.totalPages || 1
        );
      } else {
        const errorMessage =
          response.data.message ||
          'API returned unsuccessful response';

        setError(errorMessage);

        console.error('Backend error:', response.data);
      }
    } catch (err) {
      if (err.response) {
        const errorMessage =
          err.response.data?.message ||
          err.response.data?.error ||
          `Error ${err.response.status}: ${err.response.statusText}`;

        setError(errorMessage);

        console.error('Error response:', err.response.data);
      } else if (err.request) {
        setError(
          'No response received from server. Please check your network connection.'
        );

        console.error('Error request:', err.request);
      } else {
        setError(
          err.message ||
            'An error occurred while fetching data'
        );

        console.error('Error message:', err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  /* =========================================================
     FETCH CENTERS
  ========================================================= */

  const fetchCenters = async () => {
    try {
      const response = await axiosInstance.get('/centers');

      if (response.data.success) {
        setCenters(response.data.data || []);
      }
    } catch (error) {
      console.error('Error fetching centers:', error);
    }
  };

  /* =========================================================
     FETCH PRODUCTS
  ========================================================= */

  const fetchProducts = async () => {
    try {
      const response = await axiosInstance.get('/products/all');

      if (response.data.success) {
        setProducts(response.data.data || []);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  /* =========================================================
     FETCH CUSTOMERS
  ========================================================= */

  const fetchCustomers = async () => {
    try {
      const response = await axiosInstance.get('/customers');

      if (response.data.success) {
        setCustomers(response.data.data || []);
      }
    } catch (error) {
      console.error('Error fetching customers:', error);
    }
  };

  /* =========================================================
     INITIAL DATA
  ========================================================= */

  useEffect(() => {
    fetchCenters();
    fetchProducts();
    fetchCustomers();
  }, []);

  /* =========================================================
     HANDLE NAVIGATION FROM USAGE SUMMARY
  ========================================================= */

  useEffect(() => {
    if (
      location.state?.productId &&
      location.state?.centerId
    ) {
      let startDate = location.state.startDate || '';
      let endDate = location.state.endDate || '';

      if (
        !startDate &&
        !endDate &&
        location.state.month &&
        location.state.year
      ) {
        const monthRange = getMonthDateRange(
          location.state.month,
          location.state.year
        );

        startDate = monthRange.startDate;
        endDate = monthRange.endDate;
      }

      const filteredSearch = {
        ...EMPTY_SEARCH,

        productId: location.state.productId,
        centerId: location.state.centerId,

        startDate,
        endDate,

        month: location.state.month || '',
        year: location.state.year || '',
      };

      console.log(
        'Setting Usage Detail filters from Usage Summary:',
        filteredSearch
      );

      setActiveSearch(filteredSearch);

      fetchData(filteredSearch, 1);

      document.title = `Usage Details - ${
        location.state.productName || 'Product'
      } at ${location.state.centerName || 'Center'}`;

      return;
    }

    /* =====================================================
       URL PARAMETER FALLBACK
    ===================================================== */

    const params = new URLSearchParams(location.search);

    const productParam = params.get('productId');
    const centerParam = params.get('centerId');

    if (productParam && centerParam) {
      let startDate = params.get('startDate') || '';
      let endDate = params.get('endDate') || '';

      const monthParam = params.get('month') || '';
      const yearParam = params.get('year') || '';

      if (
        !startDate &&
        !endDate &&
        monthParam &&
        yearParam
      ) {
        const monthRange = getMonthDateRange(
          monthParam,
          yearParam
        );

        startDate = monthRange.startDate;
        endDate = monthRange.endDate;
      }

      const filteredSearch = {
        ...EMPTY_SEARCH,

        productId: productParam,
        centerId: centerParam,

        startDate,
        endDate,

        usageType: params.get('usageType') || '',
        connectionType: params.get('connectionType') || '',
        customer: params.get('customer') || '',
        keyword: params.get('keyword') || '',
        outlet: params.get('outlet') || '',

        month: monthParam,
        year: yearParam,
      };

      console.log(
        'Setting Usage Detail filters from URL:',
        filteredSearch
      );

      setActiveSearch(filteredSearch);

      fetchData(filteredSearch, 1);

      const productName = params.get('productName')
        ? decodeURIComponent(params.get('productName'))
        : 'Product';

      const centerName = params.get('centerName')
        ? decodeURIComponent(params.get('centerName'))
        : 'Center';

      document.title = `Usage Details - ${productName} at ${centerName}`;

      return;
    }

    fetchData(EMPTY_SEARCH, 1);
  }, [location.state, location.search]);

  /* =========================================================
     PAGINATION
  ========================================================= */

  const handlePageChange = (page) => {
    if (page < 1 || page > totalPages) {
      return;
    }

    fetchData(activeSearch, page);
  };

  /* =========================================================
     FLATTEN DATA (TABLE VIEW)
  ========================================================= */

  const getFlattenedData = () => {
    const flattened = [];

    const activeProductId = getId(activeSearch.productId);
    const activeCenterId = getId(activeSearch.centerId);

    // Summary target quantity (when navigated from Usage Summary)
    const summaryTargetQty = Number(
      location.state?.summaryTotalQuantity || 0
    );

    const hasSummaryTarget = summaryTargetQty > 0;

    let accumulatedQty = 0;

    data.forEach((usage) => {
      if (hasSummaryTarget && accumulatedQty >= summaryTargetQty) {
        return;
      }

      const usageCenterId = getId(
        usage.center?._id || usage.center || usage.centerId
      );

      if (activeCenterId && usageCenterId !== activeCenterId) {
        return;
      }

      if (
        usage.items &&
        Array.isArray(usage.items) &&
        usage.items.length > 0
      ) {
        let itemsToShow = usage.items;

        if (activeProductId) {
          itemsToShow = usage.items.filter((item) => {
            const itemProductId = getId(
              item.product?._id || item.product || item.productId
            );
            return itemProductId === activeProductId;
          });
        }

        itemsToShow.forEach((item) => {
          if (hasSummaryTarget && accumulatedQty >= summaryTargetQty) {
            return;
          }

          let itemQty = Number(item.quantity || 0);

          if (
            hasSummaryTarget &&
            accumulatedQty + itemQty > summaryTargetQty
          ) {
            itemQty = summaryTargetQty - accumulatedQty;
          }

          if (itemQty <= 0) return;

          accumulatedQty += itemQty;

          flattened.push({
            ...usage,
            item: {
              ...item,
              quantity: itemQty,
            },
            product: item.product,
            quantity: itemQty,
            uniqueKey: `${usage._id || 'usage'}_${
              item._id || getId(item.product) || Math.random()
            }`,
          });
        });
      }
    });

    return flattened;
  };

  /* =========================================================
     USER / BUILDING LABEL
  ========================================================= */

  const getUserOrBuildingLabel = (item) => {
    if (!item) return '';

    if (item.usageType === 'Customer') {
      return (
        item.customer?.username ||
        item.customer?.name ||
        ''
      );
    }

    if (item.usageType === 'Building') {
      return (
        item.fromBuilding?.buildingName ||
        item.fromBuilding?.displayName ||
        ''
      );
    }

    if (item.usageType === 'Building to Building') {
      return `${item.fromBuilding?.buildingName || ''} to ${
        item.toBuilding?.buildingName || ''
      }`;
    }

    if (item.usageType === 'Control Room') {
      return (
        item.fromControlRoom?.buildingName ||
        item.fromControlRoom?.displayName ||
        ''
      );
    }

    return '';
  };

  /* =========================================================
     CALCULATE TOTALS
  ========================================================= */

  const calculateTotals = (rows) => {
    const totals = {
      totalQty: 0,
      onuCharges: 0,
      packageAmount: 0,
      installationCharges: 0,
      shiftingAmount: 0,
      wireChangeAmount: 0,
      totalRevenue: 0,
    };

    rows.forEach((item) => {
      totals.totalQty += Number(item.quantity || 0);
      totals.onuCharges += Number(item.onuCharges || 0);
      totals.packageAmount += Number(item.packageAmount || 0);
      totals.installationCharges += Number(item.installationCharges || 0);
      totals.shiftingAmount += Number(item.shiftingAmount || 0);
      totals.wireChangeAmount += Number(item.wireChangeAmount || 0);
      totals.totalRevenue += Number(item.totalRevenue || 0);
    });

    return totals;
  };

  /* =========================================================
     SEARCH ACTIVE
  ========================================================= */

  const isSearchActive = () => {
    return Boolean(
      activeSearch.centerId ||
        activeSearch.productId ||
        activeSearch.startDate ||
        activeSearch.endDate ||
        activeSearch.usageType ||
        activeSearch.connectionType ||
        activeSearch.customer ||
        activeSearch.keyword ||
        activeSearch.outlet ||
        activeSearch.month ||
        activeSearch.year
    );
  };

  /* =========================================================
     SORT
  ========================================================= */

  const handleSort = (key) => {
    let direction = 'ascending';

    if (
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }

    setSortConfig({
      key,
      direction,
    });
  };

  const getSortIcon = (key) => {
    if (sortConfig.key !== key) {
      return null;
    }

    return sortConfig.direction === 'ascending' ? (
      <CIcon icon={cilArrowTop} className="ms-1" />
    ) : (
      <CIcon icon={cilArrowBottom} className="ms-1" />
    );
  };

  /* =========================================================
     FILTER + SORT DISPLAY DATA
  ========================================================= */

  const filteredFlattenedData = useMemo(() => {
    let rows = getFlattenedData();

    const searchValue = searchTerm.trim().toLowerCase();

    if (searchValue) {
      rows = rows.filter((item) =>
        valueToSearchString(item).includes(searchValue)
      );
    }

    if (sortConfig.key) {
      const key = sortConfig.key;

      rows = [...rows].sort((a, b) => {
        let aValue = getNestedValue(a, key);
        let bValue = getNestedValue(b, key);

        const numericKeys = [
          'quantity',
          'onuCharges',
          'packageAmount',
          'installationCharges',
          'shiftingAmount',
          'wireChangeAmount',
          'totalRevenue',
        ];

        if (numericKeys.includes(key)) {
          aValue = Number(aValue || 0);
          bValue = Number(bValue || 0);
        } else if (key === 'date') {
          aValue = new Date(aValue || 0).getTime();
          bValue = new Date(bValue || 0).getTime();
        } else {
          aValue = String(aValue ?? '').toLowerCase();
          bValue = String(bValue ?? '').toLowerCase();
        }

        if (aValue < bValue) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }

        if (aValue > bValue) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }

        return 0;
      });
    }

    return rows;
  }, [data, activeSearch, searchTerm, sortConfig]);

  /* =========================================================
     TOTALS FOR DISPLAYED DATA
  ========================================================= */

  const totals = useMemo(
    () => calculateTotals(filteredFlattenedData),
    [filteredFlattenedData]
  );

  /* =========================================================
     SEARCH
  ========================================================= */

  const handleSearch = (searchData) => {
    // Normalize whatever the modal sent (see normalizeSearchPayload above)
    // so a key-name or id/object mismatch can never silently drop a filter.
    const normalized = normalizeSearchPayload(searchData);

    console.log('🔍 Raw search payload from modal:', searchData);
    console.log('✅ Normalized search payload:', normalized);

    const mergedSearchData = {
      ...activeSearch,
      ...normalized,
    };

    if (mergedSearchData.startDate || mergedSearchData.endDate) {
      mergedSearchData.month = '';
      mergedSearchData.year = '';
    }

    setActiveSearch(mergedSearchData);

    setCurrentPage(1);

    fetchData(mergedSearchData, 1);

    setSearchModalVisible(false);
  };

  /* =========================================================
     RESET SEARCH
  ========================================================= */

  const handleResetSearch = () => {
    const resetSearch = {
      ...EMPTY_SEARCH,
    };

    setActiveSearch(resetSearch);

    setSearchTerm('');

    setSortConfig({
      key: null,
      direction: 'ascending',
    });

    setCurrentPage(1);

    fetchData(resetSearch, 1);
  };

  /* =========================================================
     ITEM DETAIL MODAL
  ========================================================= */

  const openItemDetailModal = (item) => {
    setSelectedItemDetail(item);
    setItemDetailModalVisible(true);
  };

  const closeItemDetailModal = () => {
    setItemDetailModalVisible(false);
    setSelectedItemDetail(null);
  };

  /* =========================================================
     EXPORT MODAL
  ========================================================= */

  const openExportModal = () => {
    let startDate = activeSearch.startDate || '';
    let endDate = activeSearch.endDate || '';

    if (
      !startDate &&
      !endDate &&
      activeSearch.month &&
      activeSearch.year
    ) {
      const monthRange = getMonthDateRange(
        activeSearch.month,
        activeSearch.year
      );

      startDate = monthRange.startDate;
      endDate = monthRange.endDate;
    }

    setExportStartDate(normalizeDateForApi(startDate));
    setExportEndDate(normalizeDateForApi(endDate));

    setExportModalVisible(true);
  };

  /* =========================================================
     FETCH ALL DATA FOR EXPORT
  ========================================================= */

  const fetchAllDataForExport = async () => {
    try {
      const params = new URLSearchParams();

      if (activeSearch.centerId) {
        params.append('centerId', activeSearch.centerId);
      }

      if (activeSearch.productId) {
        params.append('productId', activeSearch.productId);
      }

      if (activeSearch.usageType) {
        params.append('usageType', activeSearch.usageType);
      }

      if (activeSearch.connectionType) {
        params.append('connectionType', activeSearch.connectionType);
      }

      if (activeSearch.customer) {
        params.append('customer', activeSearch.customer);
      }

      if (activeSearch.keyword) {
        params.append('search', activeSearch.keyword);
      }

      if (activeSearch.outlet) {
        params.append('outlet', activeSearch.outlet);
      }

      let startDate = exportStartDate;
      let endDate = exportEndDate;

      if (
        !startDate &&
        !endDate &&
        activeSearch.month &&
        activeSearch.year
      ) {
        const monthRange = getMonthDateRange(
          activeSearch.month,
          activeSearch.year
        );

        startDate = monthRange.startDate;
        endDate = monthRange.endDate;
      }

      if (startDate) {
        params.append('startDate', normalizeDateForApi(startDate));
      }

      if (endDate) {
        params.append('endDate', normalizeDateForApi(endDate));
      }

      params.append('export', 'true');

      const url = params.toString()
        ? `/reports/usages?${params.toString()}`
        : '/reports/usages';

      console.log('Export URL:', url);

      const response = await axiosInstance.get(url);

      if (response.data.success) {
        return response.data.data || [];
      }

      throw new Error('API returned unsuccessful response');
    } catch (err) {
      console.error('Error fetching data for export:', err);
      showError('Error fetching data for export');
      return [];
    }
  };

  /* =========================================================
     GENERATE CSV EXPORT
  ========================================================= */

  const generateDetailExport = async () => {
    try {
      setExportLoading(true);

      if (
        exportStartDate &&
        exportEndDate &&
        normalizeDateForApi(exportStartDate) >
          normalizeDateForApi(exportEndDate)
      ) {
        showError('Start date cannot be greater than end date');
        setExportLoading(false);
        return;
      }

      const allData = await fetchAllDataForExport();

      if (!allData || allData.length === 0) {
        showError('No data available for export');
        return;
      }

      /* -----------------------------
         FILE NAME
      ----------------------------- */

      let fileName = 'Usage_stock_report';

      if (exportStartDate && exportEndDate) {
        fileName += `_${exportStartDate}_to_${exportEndDate}`;
      } else if (exportStartDate) {
        fileName += `_from_${exportStartDate}`;
      } else if (exportEndDate) {
        fileName += `_until_${exportEndDate}`;
      }

      const filterParts = [];

      if (activeSearch.centerId) {
        const centerName =
          centers.find(
            (center) =>
              getId(center._id) === getId(activeSearch.centerId)
          )?.centerName || 'Center';

        filterParts.push(centerName.replace(/\s+/g, '_'));
      }

      if (activeSearch.productId) {
        const productName =
          products.find(
            (product) =>
              getId(product._id) === getId(activeSearch.productId)
          )?.productTitle || 'Product';

        filterParts.push(productName.replace(/\s+/g, '_'));
      }

      if (activeSearch.usageType) {
        filterParts.push(
          activeSearch.usageType.replace(/\s+/g, '_')
        );
      }

      if (activeSearch.connectionType) {
        filterParts.push(
          activeSearch.connectionType.replace(/\s+/g, '_')
        );
      }

      if (filterParts.length > 0) {
        fileName += `_${filterParts.join('_')}`;
      }

      fileName += `_${new Date().toISOString().split('T')[0]}.csv`;

      /* -----------------------------
         CSV HEADERS
      ----------------------------- */

      const headers = [
        'Date',
        'Type',
        'Center',
        'Product',
        'Product Type',
        'Qty',
        'User/Building',
        'Address',
        'Mobile',
        'Package Duration',
        'Status',
        'ONU Chrg.',
        'Pkt. Amt.',
        'Inst. Chrg.',
        'Shifting Amount',
        'Wire Change Amount',
        'Total Amount',
        'Reason',
      ];

      /* -----------------------------
         FLATTEN EXPORT DATA
         (with Summary Total Qty limit)
      ----------------------------- */

      const flattenedExportData = [];

      const activeProductId = getId(activeSearch.productId);
      const activeCenterId = getId(activeSearch.centerId);

      /*
       * IMPORTANT:
       * When the user came from Usage Summary, we must
       * limit the export to the SAME quantity that was
       * shown on the Summary page (and in the on-screen table).
       *
       * Otherwise the CSV would contain more rows than the
       * user actually saw.
       */
      const summaryTargetQty = Number(
        location.state?.summaryTotalQuantity || 0
      );

      const hasSummaryTarget = summaryTargetQty > 0;

      let accumulatedQty = 0;

      allData.forEach((usage) => {
        // Stop once we've reached the summary target quantity
        if (hasSummaryTarget && accumulatedQty >= summaryTargetQty) {
          return;
        }

        const usageCenterId = getId(
          usage.center?._id || usage.center || usage.centerId
        );

        // Extra safety: keep only the selected center
        if (activeCenterId && usageCenterId !== activeCenterId) {
          return;
        }

        if (
          usage.items &&
          Array.isArray(usage.items) &&
          usage.items.length > 0
        ) {
          let items = usage.items;

          // Keep only the selected product when coming from Summary
          if (activeProductId) {
            items = usage.items.filter((item) => {
              const itemProductId = getId(
                item.product?._id || item.product || item.productId
              );
              return itemProductId === activeProductId;
            });
          }

          items.forEach((item) => {
            // Stop once we've reached the summary target quantity
            if (hasSummaryTarget && accumulatedQty >= summaryTargetQty) {
              return;
            }

            let itemQty = Number(item.quantity || 0);

            // If adding this item would exceed the summary total,
            // trim it so the sum matches exactly (same as table view).
            if (
              hasSummaryTarget &&
              accumulatedQty + itemQty > summaryTargetQty
            ) {
              itemQty = summaryTargetQty - accumulatedQty;
            }

            if (itemQty <= 0) return;

            accumulatedQty += itemQty;

            flattenedExportData.push({
              ...usage,
              item: {
                ...item,
                quantity: itemQty,
              },
              product: item.product,
              quantity: itemQty,
            });
          });
        }
      });

      if (flattenedExportData.length === 0) {
        showError('No data available for export');
        return;
      }

      /* -----------------------------
         CSV DATA
      ----------------------------- */

      const csvData = flattenedExportData.map((item) => {
        const address =
          item.usageType === 'Customer'
            ? `${item.customer?.address1 || ''} ${
                item.customer?.address2 || ''
              }`.trim()
            : item.usageType === 'Building'
            ? `${item.fromBuilding?.address1 || ''} ${
                item.fromBuilding?.address2 || ''
              }`.trim()
            : item.usageType === 'Control Room'
            ? `${item.fromControlRoom?.address1 || ''} ${
                item.fromControlRoom?.address2 || ''
              }`.trim()
            : '';

        return [
          formatDate(item.date || ''),
          item.usageType || '',
          item.center?.centerName || '',
          item.product?.productTitle || '',
          item.product?.productCategory?.productCategory || '',
          item.quantity || 0,
          getUserOrBuildingLabel(item),
          address,
          item.customer?.mobile || '',
          item.packageDuration || '',
          item.status || '',
          item.onuCharges || 0,
          item.packageAmount || 0,
          item.installationCharges || 0,
          item.shiftingAmount || 0,
          item.wireChangeAmount || 0,
          item.totalRevenue || 0,
          item.reason || item.remark || '',
        ];
      });

      /* -----------------------------
         CSV CONTENT
      ----------------------------- */

      const csvContent = [
        headers.join(','),
        ...csvData.map((row) =>
          row
            .map((field) => {
              const stringField = String(field ?? '');
              return `"${stringField.replace(/"/g, '""')}"`;
            })
            .join(',')
        ),
      ].join('\n');

      /* -----------------------------
         DOWNLOAD CSV
      ----------------------------- */

      const blob = new Blob(['\uFEFF' + csvContent], {
        type: 'text/csv;charset=utf-8;',
      });

      const link = document.createElement('a');
      const downloadUrl = URL.createObjectURL(blob);

      link.setAttribute('href', downloadUrl);
      link.setAttribute('download', fileName);
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
      setExportLoading(false);
    }
  };

  /* =========================================================
     LOADING
  ========================================================= */

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

  /* =========================================================
     ERROR
  ========================================================= */

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        Error loading data: {error}
      </div>
    );
  }

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div>
      <div className="title">Usage Stock Report</div>

      <SearchUsageDetail
        visible={searchModalVisible}
        onClose={() => setSearchModalVisible(false)}
        onSearch={handleSearch}
        centers={centers}
        products={products}
        customers={customers}
      />

      {/* EXPORT MODAL */}
      <CModal
        visible={exportModalVisible}
        onClose={() => setExportModalVisible(false)}
        size="md"
      >
        <CModalHeader>
          <CModalTitle>Export Usage Stock Report</CModalTitle>
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
              Leave empty to include all records from beginning
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
              Leave empty to include all records until today
            </small>
          </div>

          {isSearchActive() && (
            <div className="mt-3 p-2 bg-light rounded">
              <strong>Current Filters:</strong>
              <ul className="mb-0 mt-1">
                {activeSearch.centerId && (
                  <li>
                    <small>
                      Center:{' '}
                      {centers.find(
                        (center) =>
                          getId(center._id) ===
                          getId(activeSearch.centerId)
                      )?.centerName || activeSearch.centerId}
                    </small>
                  </li>
                )}

                {activeSearch.productId && (
                  <li>
                    <small>
                      Product:{' '}
                      {products.find(
                        (product) =>
                          getId(product._id) ===
                          getId(activeSearch.productId)
                      )?.productTitle || activeSearch.productId}
                    </small>
                  </li>
                )}

                {activeSearch.usageType && (
                  <li>
                    <small>Usage Type: {activeSearch.usageType}</small>
                  </li>
                )}

                {activeSearch.connectionType && (
                  <li>
                    <small>
                      Connection Type: {activeSearch.connectionType}
                    </small>
                  </li>
                )}

                {activeSearch.customer && (
                  <li>
                    <small>
                      Customer:{' '}
                      {customers.find(
                        (customer) =>
                          getId(customer._id) ===
                          getId(activeSearch.customer)
                      )?.username || activeSearch.customer}
                    </small>
                  </li>
                )}

                {activeSearch.month && activeSearch.year && (
                  <li>
                    <small>
                      Period: {activeSearch.month}/{activeSearch.year}
                    </small>
                  </li>
                )}
              </ul>
            </div>
          )}
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
              <>
                <i className="fa fa-fw fa-file-excel me-1"></i>
                Export
              </>
            )}
          </CButton>
        </CModalFooter>
      </CModal>

      {/* ITEM DETAIL MODAL */}
      <CModal
        visible={itemDetailModalVisible}
        onClose={closeItemDetailModal}
        size="lg"
      >
        <CModalHeader>
          <CModalTitle>Usage Item Details</CModalTitle>
        </CModalHeader>

        <CModalBody>
          {selectedItemDetail && (
            <>
              <div className="row mb-3">
                <div className="col-md-6 mb-2">
                  <strong>Date:</strong>{' '}
                  {formatDate(selectedItemDetail.date || '')}
                </div>

                <div className="col-md-6 mb-2">
                  <strong>Type:</strong>{' '}
                  {selectedItemDetail.usageType || ''}
                </div>

                <div className="col-md-6 mb-2">
                  <strong>Branch:</strong>{' '}
                  {selectedItemDetail.center?.centerName || ''}
                </div>

                <div className="col-md-6 mb-2">
                  <strong>Status:</strong>{' '}
                  {selectedItemDetail.status || ''}
                </div>

                <div className="col-md-6 mb-2">
                  <strong>User/Building:</strong>{' '}
                  {getUserOrBuildingLabel(selectedItemDetail)}
                </div>

                <div className="col-md-6 mb-2">
                  <strong>Mobile:</strong>{' '}
                  {selectedItemDetail.customer?.mobile || ''}
                </div>
              </div>

              <hr />

              <div className="row mb-3">
                <div className="col-md-6 mb-2">
                  <strong>Product:</strong>{' '}
                  {selectedItemDetail.product?.productTitle || 'N/A'}
                </div>

                <div className="col-md-6 mb-2">
                  <strong>Product Type:</strong>{' '}
                  {selectedItemDetail.product?.productCategory
                    ?.productCategory || 'N/A'}
                </div>

                <div className="col-md-4 mb-2">
                  <strong>Quantity:</strong>{' '}
                  {selectedItemDetail.quantity || 0}
                </div>

                <div className="col-md-4 mb-2">
                  <strong>Old Stock:</strong>{' '}
                  {selectedItemDetail.item?.oldStock ?? 'N/A'}
                </div>

                <div className="col-md-4 mb-2">
                  <strong>New Stock:</strong>{' '}
                  {selectedItemDetail.item?.newStock ?? 'N/A'}
                </div>
              </div>

              {selectedItemDetail.item?.serialNumbers &&
                selectedItemDetail.item.serialNumbers.length > 0 && (
                  <>
                    <hr />

                    <strong>
                      Serial Numbers (
                      {selectedItemDetail.item.serialNumbers.length}):
                    </strong>

                    <div className="d-flex flex-wrap mt-2">
                      {selectedItemDetail.item.serialNumbers.map(
                        (serialNumber, index) => (
                          <span
                            key={index}
                            className="badge bg-secondary me-2 mb-2 p-2"
                          >
                            {serialNumber}
                          </span>
                        )
                      )}
                    </div>
                  </>
                )}

              <hr />

              <div className="row">
                <div className="col-md-6 mb-2">
                  <strong>Package Duration:</strong>{' '}
                  {selectedItemDetail.packageDuration || ''}
                </div>

                <div className="col-md-6 mb-2">
                  <strong>ONU Charges:</strong>{' '}
                  {selectedItemDetail.onuCharges || ''}
                </div>

                <div className="col-md-6 mb-2">
                  <strong>Package Amount:</strong>{' '}
                  {selectedItemDetail.packageAmount || ''}
                </div>

                <div className="col-md-6 mb-2">
                  <strong>Installation Charges:</strong>{' '}
                  {selectedItemDetail.installationCharges || ''}
                </div>

                <div className="col-md-6 mb-2">
                  <strong>Shifting Amount:</strong>{' '}
                  {selectedItemDetail.shiftingAmount || ''}
                </div>

                <div className="col-md-6 mb-2">
                  <strong>Wire Change Amount:</strong>{' '}
                  {selectedItemDetail.wireChangeAmount || ''}
                </div>

                <div className="col-md-6 mb-2">
                  <strong>Total Amount:</strong>{' '}
                  {selectedItemDetail.totalRevenue || ''}
                </div>

                <div className="col-md-6 mb-2">
                  <strong>Reason:</strong>{' '}
                  {selectedItemDetail.reason ||
                    selectedItemDetail.remark ||
                    ''}
                </div>
              </div>
            </>
          )}
        </CModalBody>

        <CModalFooter>
          <CButton color="secondary" onClick={closeItemDetailModal}>
            Close
          </CButton>
        </CModalFooter>
      </CModal>

      {/* MAIN TABLE CARD */}
      <CCard className="table-container mt-4">
        <CCardHeader className="card-header d-flex justify-content-between align-items-center">
          <div>
            <CButton
              size="sm"
              className="action-btn me-1"
              onClick={() => setSearchModalVisible(true)}
            >
              <CIcon icon={cilSearch} className="icon" /> Search
            </CButton>

            {isSearchActive() && (
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
              className="action-btn me-1"
              onClick={openExportModal}
              disabled={exportLoading || data.length === 0}
            >
              <i className="fa fa-fw fa-file-excel"></i> Export
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
          <div className="d-flex justify-content-between mb-3">
            <div>
              {(exportStartDate || exportEndDate) && (
                <div className="text-muted small">
                  {exportStartDate && `Export From: ${exportStartDate} `}
                  {exportEndDate && `To: ${exportEndDate}`}
                </div>
              )}
            </div>

            <div className="d-flex">
              <CFormLabelPro className="mt-1 m-1">Search:</CFormLabelPro>

              <CFormInput
                type="text"
                style={{
                  maxWidth: '350px',
                  height: '30px',
                  borderRadius: '0',
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
                    scope="col"
                    onClick={() => handleSort('date')}
                    className="sortable-header"
                  >
                    Date {getSortIcon('date')}
                  </CTableHeaderCell>

                  <CTableHeaderCell
                    scope="col"
                    onClick={() => handleSort('usageType')}
                    className="sortable-header"
                  >
                    Type {getSortIcon('usageType')}
                  </CTableHeaderCell>

                  <CTableHeaderCell
                    scope="col"
                    onClick={() => handleSort('center.centerName')}
                    className="sortable-header"
                  >
                    Branch {getSortIcon('center.centerName')}
                  </CTableHeaderCell>

                  <CTableHeaderCell
                    scope="col"
                    onClick={() => handleSort('product.productTitle')}
                    className="sortable-header"
                  >
                    Product {getSortIcon('product.productTitle')}
                  </CTableHeaderCell>

                  <CTableHeaderCell
                    scope="col"
                    onClick={() =>
                      handleSort('product.productCategory.productCategory')
                    }
                    className="sortable-header"
                  >
                    Product Type{' '}
                    {getSortIcon(
                      'product.productCategory.productCategory'
                    )}
                  </CTableHeaderCell>

                  <CTableHeaderCell
                    scope="col"
                    onClick={() => handleSort('quantity')}
                    className="sortable-header"
                  >
                    Qty {getSortIcon('quantity')}
                  </CTableHeaderCell>

                  <CTableHeaderCell scope="col" className="sortable-header">
                    User/Building
                  </CTableHeaderCell>

                  <CTableHeaderCell scope="col" className="sortable-header">
                    Address
                  </CTableHeaderCell>

                  <CTableHeaderCell scope="col" className="sortable-header">
                    Mobile
                  </CTableHeaderCell>

                  <CTableHeaderCell
                    scope="col"
                    onClick={() => handleSort('packageDuration')}
                    className="sortable-header"
                  >
                    Package Duration {getSortIcon('packageDuration')}
                  </CTableHeaderCell>

                  <CTableHeaderCell
                    scope="col"
                    onClick={() => handleSort('status')}
                    className="sortable-header"
                  >
                    Status {getSortIcon('status')}
                  </CTableHeaderCell>

                  <CTableHeaderCell
                    scope="col"
                    onClick={() => handleSort('onuCharges')}
                    className="sortable-header"
                  >
                    ONU Chrg. {getSortIcon('onuCharges')}
                  </CTableHeaderCell>

                  <CTableHeaderCell
                    scope="col"
                    onClick={() => handleSort('packageAmount')}
                    className="sortable-header"
                  >
                    Pkt. Amt. {getSortIcon('packageAmount')}
                  </CTableHeaderCell>

                  <CTableHeaderCell
                    scope="col"
                    onClick={() => handleSort('installationCharges')}
                    className="sortable-header"
                  >
                    Inst. Chrg. {getSortIcon('installationCharges')}
                  </CTableHeaderCell>

                  <CTableHeaderCell
                    scope="col"
                    onClick={() => handleSort('shiftingAmount')}
                    className="sortable-header"
                  >
                    Shifting Amount {getSortIcon('shiftingAmount')}
                  </CTableHeaderCell>

                  <CTableHeaderCell
                    scope="col"
                    onClick={() => handleSort('wireChangeAmount')}
                    className="sortable-header"
                  >
                    Wire Change Amount {getSortIcon('wireChangeAmount')}
                  </CTableHeaderCell>

                  <CTableHeaderCell
                    scope="col"
                    onClick={() => handleSort('totalRevenue')}
                    className="sortable-header"
                  >
                    Total Amount {getSortIcon('totalRevenue')}
                  </CTableHeaderCell>

                  <CTableHeaderCell
                    scope="col"
                    onClick={() => handleSort('reason')}
                    className="sortable-header"
                  >
                    Reason {getSortIcon('reason')}
                  </CTableHeaderCell>
                </CTableRow>
              </CTableHead>

              <CTableBody>
                {filteredFlattenedData.length > 0 ? (
                  <>
                    {filteredFlattenedData.map((item) => (
                      <CTableRow key={item.uniqueKey}>
                        <CTableDataCell>
                          {formatDate(item.date || '')}
                        </CTableDataCell>

                        <CTableDataCell>
                          {item.usageType || ''}
                        </CTableDataCell>

                        <CTableDataCell>
                          {item.center?.centerName || ''}
                        </CTableDataCell>

                        <CTableDataCell>
                          {item.product?.productTitle || 'N/A'}
                        </CTableDataCell>

                        <CTableDataCell>
                          {item.product?.productCategory?.productCategory ||
                            'N/A'}
                        </CTableDataCell>

                        <CTableDataCell
                          onClick={() =>
                            item.quantity > 0 &&
                            openItemDetailModal(item)
                          }
                          style={{
                            cursor:
                              item.quantity > 0 ? 'pointer' : 'default',
                            color:
                              item.quantity > 0 ? '#337ab7' : 'inherit',
                            fontWeight:
                              item.quantity > 0 ? 600 : 'normal',
                          }}
                          title={
                            item.quantity > 0
                              ? 'Click to view usage item details'
                              : ''
                          }
                        >
                          {item.quantity || 0}
                        </CTableDataCell>

                        <CTableDataCell>
                          {getUserOrBuildingLabel(item)}
                        </CTableDataCell>

                        <CTableDataCell>
                          {item.usageType === 'Customer'
                            ? `${item.customer?.address1 || ''} ${
                                item.customer?.address2 || ''
                              }`.trim() || ''
                            : item.usageType === 'Building'
                            ? `${item.fromBuilding?.address1 || ''} ${
                                item.fromBuilding?.address2 || ''
                              }`.trim() || 'N/A'
                            : item.usageType === 'Control Room'
                            ? `${item.fromControlRoom?.address1 || ''} ${
                                item.fromControlRoom?.address2 || ''
                              }`.trim() || ''
                            : ''}
                        </CTableDataCell>

                        <CTableDataCell>
                          {item.customer?.mobile || ''}
                        </CTableDataCell>

                        <CTableDataCell>
                          {item.packageDuration || ''}
                        </CTableDataCell>

                        <CTableDataCell>
                          {item.status || ''}
                        </CTableDataCell>

                        <CTableDataCell>
                          {item.onuCharges || ''}
                        </CTableDataCell>

                        <CTableDataCell>
                          {item.packageAmount || ''}
                        </CTableDataCell>

                        <CTableDataCell>
                          {item.installationCharges || ''}
                        </CTableDataCell>

                        <CTableDataCell>
                          {item.shiftingAmount || ''}
                        </CTableDataCell>

                        <CTableDataCell>
                          {item.wireChangeAmount || ''}
                        </CTableDataCell>

                        <CTableDataCell>
                          {item.totalRevenue || ''}
                        </CTableDataCell>

                        <CTableDataCell>
                          {item.reason || item.remark || ''}
                        </CTableDataCell>
                      </CTableRow>
                    ))}

                    <CTableRow className="total-row">
                      <CTableDataCell colSpan="5">Total</CTableDataCell>

                      <CTableDataCell>
                        {totals.totalQty.toFixed(2)}
                      </CTableDataCell>

                      <CTableDataCell colSpan="4">{''}</CTableDataCell>

                      <CTableDataCell>{''}</CTableDataCell>

                      <CTableDataCell>
                        {totals.onuCharges.toFixed(2)}
                      </CTableDataCell>

                      <CTableDataCell>
                        {totals.packageAmount.toFixed(2)}
                      </CTableDataCell>

                      <CTableDataCell>
                        {totals.installationCharges.toFixed(2)}
                      </CTableDataCell>

                      <CTableDataCell>
                        {totals.shiftingAmount.toFixed(2)}
                      </CTableDataCell>

                      <CTableDataCell>
                        {totals.wireChangeAmount.toFixed(2)}
                      </CTableDataCell>

                      <CTableDataCell>
                        {totals.totalRevenue.toFixed(2)}
                      </CTableDataCell>

                      <CTableDataCell>{''}</CTableDataCell>
                    </CTableRow>
                  </>
                ) : (
                  <CTableRow>
                    <CTableDataCell colSpan="18" className="text-center">
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

export default UsageDetail;