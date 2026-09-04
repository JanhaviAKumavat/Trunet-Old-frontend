import React, { useState, useEffect } from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CFormInput,
  CFormLabel
} from '@coreui/react'
import PropTypes from 'prop-types'
import '../../css/form.css'
import Select from 'react-select'
import axiosInstance from 'src/axiosInstance';
import { showError } from 'src/utils/sweetAlerts';

const IndentUsageSummarySearch = ({ visible, onClose, onSearch, centers, products }) => {
  const [searchData, setSearchData] = useState({
    productId: '',
    center: '',
    reseller: '',
    startDate: '',
    endDate: ''
  })
  
  const [resellers, setResellers] = useState([]);
  const [loadingResellers, setLoadingResellers] = useState(false);
  const [resellerCenters, setResellerCenters] = useState([]);
  const [loadingCenters, setLoadingCenters] = useState(false);

  // Fetch all resellers on component mount
  useEffect(() => {
    const fetchResellers = async () => {
      setLoadingResellers(true);
      try {
        const response = await axiosInstance.get('/resellers');
        if (response.data.success) {
          setResellers(response.data.data || []);
        }
      } catch (error) {
        console.error('Error fetching resellers:', error);
        setResellers([]);
      } finally {
        setLoadingResellers(false);
      }
    };

    fetchResellers();
  }, []);

  // Fetch centers based on selected reseller
  useEffect(() => {
    const fetchCentersByReseller = async () => {
      if (searchData.reseller) {
        setLoadingCenters(true);
        try {
          const response = await axiosInstance.get(`/centers/reseller/${searchData.reseller}`);
          if (response.data.success) {
            setResellerCenters(response.data.data);
          } else {
            setResellerCenters([]);
          }
        } catch (error) {
          console.error('Error fetching centers for reseller:', error);
          setResellerCenters([]);
        } finally {
          setLoadingCenters(false);
        }
      } else {
        setResellerCenters([]);
        // Clear center selection when reseller is cleared
        setSearchData(prev => ({ ...prev, center: '' }));
      }
    };

    fetchCentersByReseller();
  }, [searchData.reseller]);

  useEffect(() => {
    if (!visible) {
      setSearchData({ 
        productId: '', 
        center: '', 
        reseller: '',
        startDate: '', 
        endDate: '' 
      });
      setResellerCenters([]);
    }
  }, [visible])

  const handleChange = (e) => {
    const { name, value } = e.target
    setSearchData(prev => ({ ...prev, [name]: value }))
  }

  // Format date from YYYY-MM-DD to DD-MM-YYYY for API
  const formatDateToDDMMYYYY = (dateString) => {
    if (!dateString) return '';
    if (dateString.match(/^\d{4}-\d{2}-\d{2}$/)) {
      const [year, month, day] = dateString.split('-');
      return `${day}-${month}-${year}`;
    }
    return dateString;
  };

  const handleSearch = () => {
    if (
      (searchData.startDate && !searchData.endDate) ||
      (!searchData.startDate && searchData.endDate)
    ) {
      showError('Please select both Start Date and End Date, or leave both empty.');
      return;
    }

    if (
      searchData.startDate &&
      searchData.endDate &&
      new Date(searchData.startDate) > new Date(searchData.endDate)
    ) {
      showError('Start Date cannot be after End Date.');
      return;
    }

    // Prepare API search data
    const apiSearchData = {};

    // Handle product - use productId
    if (searchData.productId) {
      const selectedProduct = products.find(p => p._id === searchData.productId);
      if (selectedProduct) {
        apiSearchData.productId = selectedProduct._id;
      } else {
        apiSearchData.productId = searchData.productId;
      }
    }

    // Handle center - use the ID
    if (searchData.center && searchData.center !== 'all') {
      const selectedCenter = resellerCenters.find(c => c._id === searchData.center);
      if (selectedCenter) {
        apiSearchData.center = selectedCenter._id;
      } else {
        apiSearchData.center = searchData.center;
      }
    } else if (searchData.center === 'all') {
      apiSearchData.center = 'all';
    }

    // Handle reseller - Send the ID as resellerId
    if (searchData.reseller) {
      const selectedReseller = resellers.find(r => r._id === searchData.reseller);
      if (selectedReseller) {
        apiSearchData.resellerId = selectedReseller._id;
      } else {
        apiSearchData.resellerId = searchData.reseller;
      }
    }

    // Add date filters
    if (searchData.startDate && searchData.endDate) {
      apiSearchData.startDate = formatDateToDDMMYYYY(searchData.startDate);
      apiSearchData.endDate = formatDateToDDMMYYYY(searchData.endDate);
    }

    onSearch(apiSearchData);
    onClose();
  }

  const handleReset = () => {
    setSearchData({ 
      productId: '', 
      center: '', 
      reseller: '',
      startDate: '', 
      endDate: '' 
    });
    setResellerCenters([]);
    onSearch({ productId: '', center: '', resellerId: '', startDate: '', endDate: '' })
    onClose()
  }

  return (
    <CModal size="lg" visible={visible} onClose={onClose}>
      <CModalHeader>
        <CModalTitle>Search</CModalTitle>
      </CModalHeader>

      <CModalBody>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="reseller">
              Reseller
            </label>
            <Select
              id="reseller"
              name="reseller"
              placeholder={loadingResellers ? "Loading resellers..." : "Select Reseller..."}
              value={
                searchData.reseller
                  ? {
                      value: searchData.reseller,
                      label: resellers.find((r) => r._id === searchData.reseller)
                        ? resellers.find((r) => r._id === searchData.reseller).businessName
                        : "",
                    }
                  : null
              }
              onChange={(selected) =>
                setSearchData((prev) => ({
                  ...prev,
                  reseller: selected ? selected.value : "",
                  center: "" // Clear center when reseller changes
                }))
              }
              options={resellers.map((reseller) => ({
                value: reseller._id,
                label: reseller.businessName,
              }))}
              isClearable
              isLoading={loadingResellers}
              classNamePrefix="react-select"
              className="no-radius-input"
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor="center">
              Branch
            </label>
            <Select
              id="center"
              name="center"
              placeholder={
                loadingCenters 
                  ? "Loading branches..." 
                  : searchData.reseller 
                    ? "Select Branch..." 
                    : "Select a reseller first"
              }
              value={
                searchData.center
                  ? {
                      value: searchData.center,
                      label: searchData.center === "all"
                        ? "All Centers"
                        : resellerCenters.find((c) => c._id === searchData.center)
                          ? `${resellerCenters.find((c) => c._id === searchData.center).centerName} (${resellerCenters.find((c) => c._id === searchData.center).centerCode || 'N/A'})`
                          : ""
                    }
                  : null
              }
              onChange={(selected) =>
                setSearchData((prev) => ({
                  ...prev,
                  center: selected ? selected.value : ""
                }))
              }
              options={[
                ...(searchData.reseller ? [{ value: "all", label: "All Centers" }] : []),
                ...resellerCenters.map((center) => ({
                  value: center._id,
                  label: `${center.centerName}`
                }))
              ]}
              isClearable
              isDisabled={!searchData.reseller || loadingCenters}
              isLoading={loadingCenters}
              classNamePrefix="react-select"
              className="no-radius-input"
            />
            {searchData.reseller && !loadingCenters && resellerCenters.length === 0 && (
              <small className="text-muted">No branches found for this reseller</small>
            )}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor="product">
              Product
            </label>
            <Select
              id="product"
              name="productId"
              placeholder="Search Product..."
              value={
                searchData.productId
                  ? {
                      value: searchData.productId,
                      label: products.find((p) => p._id === searchData.productId)
                        ? products.find((p) => p._id === searchData.productId).productTitle
                        : ""
                    }
                  : null
              }
              onChange={(selected) =>
                setSearchData((prev) => ({
                  ...prev,
                  productId: selected ? selected.value : ""
                }))
              }
              options={products.map((product) => ({
                value: product._id,
                label: product.productTitle
              }))}
              isClearable
              classNamePrefix="react-select"
              className="no-radius-input"
            />
          </div>
          <div className="form-group"></div>
        </div>

        {/* Date Range Filters */}
        <div className="form-row">
          <div className="form-group">
            <CFormLabel htmlFor="startDate">Start Date</CFormLabel>
            <CFormInput
              type="date"
              id="startDate"
              name="startDate"
              value={searchData.startDate}
              onChange={handleChange}
              placeholder="Select start date"
            />
            <small className="text-muted">Optional</small>
          </div>
          <div className="form-group">
            <CFormLabel htmlFor="endDate">End Date</CFormLabel>
            <CFormInput
              type="date"
              id="endDate"
              name="endDate"
              value={searchData.endDate}
              onChange={handleChange}
              placeholder="Select end date"
            />
            <small className="text-muted">Optional</small>
          </div>
        </div>
      </CModalBody>

      <CModalFooter>
        <CButton 
          color="secondary" 
          className="me-2" 
          onClick={handleReset}
        >
          Reset
        </CButton>
        <CButton 
          className="reset-button" 
          onClick={handleSearch}
        >
          Search
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

IndentUsageSummarySearch.propTypes = {
  visible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
  centers: PropTypes.array.isRequired,
  products: PropTypes.array.isRequired
}

export default IndentUsageSummarySearch;