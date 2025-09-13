import React, { useState, useEffect } from 'react';
import './App.css';

// Comprehensive Form Component with Editing Support
const ComprehensiveForm = ({ onAdd, onCancel, editingRecord }) => {
  const [formData, setFormData] = useState({
    // Basic Info
    company: editingRecord?.company || '',
    industry: editingRecord?.industry || '',
    employees: editingRecord?.employees || '',
    contactPerson: editingRecord?.contactPerson || '',

    // Content Details
    type: editingRecord?.type || 'quote',
    title: editingRecord?.title || '',
    content: editingRecord?.content || '',
    shareability: editingRecord?.shareability || 'public',
    source: editingRecord?.source || 'Manual Entry',

    // Tech Stack
    itsm: editingRecord?.itsm || '',
    chatPlatform: editingRecord?.chatPlatform || '',
    mfa: editingRecord?.mfa || '',
    otherTechStack: editingRecord?.otherTechStack || '',

    // Business Info
    valueDriver: editingRecord?.valueDriver || '',
    differentiator: editingRecord?.differentiator || '',
    keyProducts: editingRecord?.keyProducts || '',
    pain: editingRecord?.pain || '',
    businessOutcome: editingRecord?.businessOutcome || '',
    metric: editingRecord?.metric || '',

    // Content Types (checkboxes)
    contentTypes: editingRecord?.contentTypes || {
      blog: false,
      caseStudy: false,
      event: false,
      press: false,
      social: false,
      testimonial: false,
      webinar: false
    },

    // Links
    externalLink: editingRecord?.externalLink || '',
    internalLink: editingRecord?.internalLink || '',
    moveworksAcademyLink: editingRecord?.moveworksAcademyLink || '',
    vimeoLink: editingRecord?.vimeoLink || '',

    // Add this line for flags
    flags: editingRecord?.flags || [],

    // Video specific
    videoLength: editingRecord?.videoLength || '',
    lpTitle: editingRecord?.lpTitle || '',
    lpCopy: editingRecord?.lpCopy || '',

    // Notes
    notes: editingRecord?.notes || ''
  });

  const [errors, setErrors] = useState({});
  const [currentTab, setCurrentTab] = useState('basic');

  const contentTypeOptions = [
    { value: 'quote', label: 'Customer Quote' },
    { value: 'case_study', label: 'Case Study' },
    { value: 'testimonial', label: 'Testimonial' },
    { value: 'webinar', label: 'Webinar' },
    { value: 'press', label: 'Press Release' },
    { value: 'social', label: 'Social Media' },
    { value: 'blog', label: 'Blog Post' },
    { value: 'event', label: 'Event' },
    { value: 'video', label: 'Video Content' }
  ];

  const shareabilityOptions = [
    { value: 'public', label: '✅ PUBLIC - Can be posted and used anywhere' },
    { value: 'sometimes', label: '☑️ SOMETIMES - Presentations only, cannot be distributed' },
    { value: 'internal', label: '🛑 INTERNAL - Moveworks employees only' }
  ];

  const industryOptions = [
    'Technology', 'Healthcare', 'Financial Services', 'Manufacturing',
    'Retail', 'Insurance', 'Government', 'Education', 'Pharmaceutical',
    'Energy', 'Media', 'Transportation', 'Other'
  ];

  const valuDriverOptions = [
    'Cost Reduction', 'Improved Efficiency', 'Employee Satisfaction',
    'Digital Transformation', 'Scalability', 'Security', 'Compliance',
    'Innovation', 'User Experience', 'Time Savings'
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.company.trim()) {
      newErrors.company = 'Company name is required';
    }
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const recordData = {
        ...formData,
        id: editingRecord ? editingRecord.id : Date.now(),
        flags: formData.flags || []  // <-- Use formData.flags, not editingRecord.flags
      };

      onAdd(recordData);
    }
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleContentTypeChange = (contentType, checked) => {
    setFormData(prev => ({
      ...prev,
      contentTypes: { ...prev.contentTypes, [contentType]: checked }
    }));
  };

  const tabs = [
    { id: 'basic', label: 'Basic Info', icon: '📝' },
    { id: 'content', label: 'Content Details', icon: '💬' },
    { id: 'tech', label: 'Tech Stack', icon: '⚙️' },
    { id: 'business', label: 'Business Info', icon: '📊' },
    { id: 'governance', label: 'Governance', icon: '🛡️' },
    { id: 'links', label: 'Links & Media', icon: '🔗' }
  ];

  return (
    <div className="modal-overlay">
      <div className="modal-content-large">
        <div className="modal-header">
          <h2>{editingRecord ? 'Edit Customer Content' : 'Add New Customer Content'}</h2>
          <button onClick={onCancel} className="close-button">×</button>
        </div>

        {/* Tab Navigation */}
        <div className="tab-navigation">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={`tab-button ${currentTab === tab.id ? 'active' : ''}`}
            >
              <span className="tab-icon">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        <div className="form-container">
          {/* Basic Info Tab */}
          {currentTab === 'basic' && (
            <div className="tab-content">
              <h3>Basic Company Information</h3>

              <div className="form-row">
                <div className="form-group">
                  <label>Company Name *</label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => handleChange('company', e.target.value)}
                    className={`form-input ${errors.company ? 'error' : ''}`}
                    placeholder="e.g., Databricks"
                  />
                  {errors.company && <span className="error-text">{errors.company}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group half">
                  <label>Industry</label>
                  <select
                    value={formData.industry}
                    onChange={(e) => handleChange('industry', e.target.value)}
                    className="form-input"
                  >
                    <option value="">Select Industry</option>
                    {industryOptions.map(industry => (
                      <option key={industry} value={industry}>{industry}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group half">
                  <label>Number of Employees</label>
                  <input
                    type="text"
                    value={formData.employees}
                    onChange={(e) => handleChange('employees', e.target.value)}
                    className="form-input"
                    placeholder="e.g., 1,000-5,000"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Contact Person</label>
                  <input
                    type="text"
                    value={formData.contactPerson}
                    onChange={(e) => handleChange('contactPerson', e.target.value)}
                    className="form-input"
                    placeholder="e.g., John Smith, VP IT"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Content Details Tab */}
          {currentTab === 'content' && (
            <div className="tab-content">
              <h3>Content Information</h3>

              <div className="form-row">
                <div className="form-group half">
                  <label>Primary Content Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => handleChange('type', e.target.value)}
                    className="form-input"
                  >
                    {contentTypeOptions.map(type => (
                      <option key={type.value} value={type.value}>{type.label}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group half">
                  <label>Shareability Level *</label>
                  <select
                    value={formData.shareability}
                    onChange={(e) => handleChange('shareability', e.target.value)}
                    className="form-input"
                  >
                    {shareabilityOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Title/Headline</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleChange('title', e.target.value)}
                    className="form-input"
                    placeholder="Brief title or headline for this content"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Content/Quote *</label>
                  <textarea
                    value={formData.content}
                    onChange={(e) => handleChange('content', e.target.value)}
                    rows={4}
                    className={`form-input ${errors.content ? 'error' : ''}`}
                    placeholder="Enter the quote, testimonial, case study description, or content details..."
                  />
                  {errors.content && <span className="error-text">{errors.content}</span>}
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Available Content Types</label>
                  <div className="checkbox-group">
                    {Object.entries({
                      blog: 'Blog Post',
                      caseStudy: 'Case Study',
                      event: 'Event',
                      press: 'Press Release',
                      social: 'Social Media',
                      testimonial: 'Testimonial',
                      webinar: 'Webinar'
                    }).map(([key, label]) => (
                      <label key={key} className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={formData.contentTypes[key]}
                          onChange={(e) => handleContentTypeChange(key, e.target.checked)}
                        />
                        {label}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Tech Stack Tab */}
          {currentTab === 'tech' && (
            <div className="tab-content">
              <h3>Technology Stack</h3>

              <div className="form-row">
                <div className="form-group half">
                  <label>ITSM Platform</label>
                  <input
                    type="text"
                    value={formData.itsm}
                    onChange={(e) => handleChange('itsm', e.target.value)}
                    className="form-input"
                    placeholder="e.g., ServiceNow, Jira"
                  />
                </div>

                <div className="form-group half">
                  <label>Chat Platform</label>
                  <input
                    type="text"
                    value={formData.chatPlatform}
                    onChange={(e) => handleChange('chatPlatform', e.target.value)}
                    className="form-input"
                    placeholder="e.g., Microsoft Teams, Slack"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group half">
                  <label>MFA Solution</label>
                  <input
                    type="text"
                    value={formData.mfa}
                    onChange={(e) => handleChange('mfa', e.target.value)}
                    className="form-input"
                    placeholder="e.g., Okta, Duo"
                  />
                </div>

                <div className="form-group half">
                  <label>Other Tech Stack</label>
                  <input
                    type="text"
                    value={formData.otherTechStack}
                    onChange={(e) => handleChange('otherTechStack', e.target.value)}
                    className="form-input"
                    placeholder="Additional technology platforms"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Business Info Tab */}
          {currentTab === 'business' && (
            <div className="tab-content">
              <h3>Business Information</h3>

              <div className="form-row">
                <div className="form-group half">
                  <label>Value Driver</label>
                  <select
                    value={formData.valueDriver}
                    onChange={(e) => handleChange('valueDriver', e.target.value)}
                    className="form-input"
                  >
                    <option value="">Select Value Driver</option>
                    {valuDriverOptions.map(driver => (
                      <option key={driver} value={driver}>{driver}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group half">
                  <label>Key Product(s)</label>
                  <input
                    type="text"
                    value={formData.keyProducts}
                    onChange={(e) => handleChange('keyProducts', e.target.value)}
                    className="form-input"
                    placeholder="e.g., Employee Experience Platform"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Differentiator</label>
                  <textarea
                    value={formData.differentiator}
                    onChange={(e) => handleChange('differentiator', e.target.value)}
                    rows={2}
                    className="form-input"
                    placeholder="What makes this customer story unique or differentiating..."
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Pain Points Addressed</label>
                  <textarea
                    value={formData.pain}
                    onChange={(e) => handleChange('pain', e.target.value)}
                    rows={2}
                    className="form-input"
                    placeholder="What problems did Moveworks solve for this customer..."
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group half">
                  <label>Business Outcome/Stats</label>
                  <input
                    type="text"
                    value={formData.businessOutcome}
                    onChange={(e) => handleChange('businessOutcome', e.target.value)}
                    className="form-input"
                    placeholder="e.g., 73% ticket deflection"
                  />
                </div>

                <div className="form-group half">
                  <label>Key Metric</label>
                  <input
                    type="text"
                    value={formData.metric}
                    onChange={(e) => handleChange('metric', e.target.value)}
                    className="form-input"
                    placeholder="Primary success metric"
                  />
                </div>
              </div>
            </div>
          )}
          {/* Governance Tab */}
          {currentTab === 'governance' && (
            <div className="tab-content">
              <h3>Content Governance & Flags</h3>

              <div className="form-row">
                <div className="form-group">
                  <label>Content Status Flags</label>
                  <div className="checkbox-group">
                    {[
                      { key: 'churned', label: 'Churned Customer', desc: 'Customer has left - do not use content' },
                      { key: 'obsolete', label: 'Obsolete Content', desc: 'Content is outdated or no longer relevant' },
                      { key: 'needs_review', label: 'Needs Review', desc: 'Content requires approval before use' },
                      { key: 'sensitive', label: 'Sensitive Information', desc: 'Contains confidential details' },
                      { key: 'featured', label: 'Featured Content', desc: 'Highlight this content' },
                      { key: 'approved', label: 'Approved for Use', desc: 'Content has been reviewed and approved' }
                    ].map(({ key, label, desc }) => (
                      <label key={key} className="governance-flag-label">
                        <input
                          type="checkbox"
                          checked={formData.flags?.includes(key) || false}
                          onChange={(e) => {
                            const currentFlags = formData.flags || [];
                            if (e.target.checked) {
                              setFormData(prev => ({
                                ...prev,
                                flags: [...currentFlags.filter(f => f !== key), key]
                              }));
                            } else {
                              setFormData(prev => ({
                                ...prev,
                                flags: currentFlags.filter(f => f !== key)
                              }));
                            }
                          }}
                        />
                        <div>
                          <strong>{label}</strong>
                          <span className="flag-description">{desc}</span>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Links & Media Tab */}
          {currentTab === 'links' && (
            <div className="tab-content">
              <h3>Links & Media</h3>

              <div className="form-row">
                <div className="form-group">
                  <label>External Link</label>
                  <input
                    type="url"
                    value={formData.externalLink}
                    onChange={(e) => handleChange('externalLink', e.target.value)}
                    className="form-input"
                    placeholder="https://... (public facing content)"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Internal Link</label>
                  <input
                    type="url"
                    value={formData.internalLink}
                    onChange={(e) => handleChange('internalLink', e.target.value)}
                    className="form-input"
                    placeholder="Internal documentation or resources"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Moveworks Academy Link</label>
                  <input
                    type="url"
                    value={formData.moveworksAcademyLink}
                    onChange={(e) => handleChange('moveworksAcademyLink', e.target.value)}
                    className="form-input"
                    placeholder="Link to Academy content"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group half">
                  <label>Vimeo/Video Link</label>
                  <input
                    type="url"
                    value={formData.vimeoLink}
                    onChange={(e) => handleChange('vimeoLink', e.target.value)}
                    className="form-input"
                    placeholder="Video content URL"
                  />
                </div>

                <div className="form-group half">
                  <label>Video Length</label>
                  <input
                    type="text"
                    value={formData.videoLength}
                    onChange={(e) => handleChange('videoLength', e.target.value)}
                    className="form-input"
                    placeholder="e.g., Full, 2:30, Short"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Landing Page Title</label>
                  <input
                    type="text"
                    value={formData.lpTitle}
                    onChange={(e) => handleChange('lpTitle', e.target.value)}
                    className="form-input"
                    placeholder="Title for landing page or promotional material"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Landing Page Copy</label>
                  <textarea
                    value={formData.lpCopy}
                    onChange={(e) => handleChange('lpCopy', e.target.value)}
                    rows={3}
                    className="form-input"
                    placeholder="Marketing copy for landing page..."
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Internal Notes</label>
                  <textarea
                    value={formData.notes}
                    onChange={(e) => handleChange('notes', e.target.value)}
                    rows={2}
                    className="form-input"
                    placeholder="Internal context, approval status, considerations..."
                  />
                </div>
              </div>
            </div>
          )}

          <div className="form-actions">
            <button onClick={onCancel} className="btn-secondary">
              Cancel
            </button>
            <button onClick={handleSubmit} className="btn-primary">
              {editingRecord ? 'Update Content' : 'Add Content'}

            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDataType, setSelectedDataType] = useState('all');
  const [customerData, setCustomerData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  // Add this to your App component (around line 650, in the App component)

  const [editingRecord, setEditingRecord] = useState(null);

  // Add this function after handleAddContent
  const handleEditRecord = (record) => {
    setEditingRecord(record);
    setShowAddForm(true); // Reuse the same form modal
  };

  const handleUpdateContent = (updatedContent) => {
    setCustomerData(prev =>
      prev.map(item =>
        item.id === updatedContent.id ? updatedContent : item
      )
    );
    setEditingRecord(null);
    setShowAddForm(false);
  };

  // Your existing mock data
  const mockData = [
    {
      id: 1,
      type: 'quote',
      company: 'Databricks',
      content: 'Moveworks has transformed our IT support experience with 73% ticket deflection...',
      shareability: 'public',
      flags: [],
      source: 'Customer Story Database'
    },
    {
      id: 2,
      type: 'case_study',
      company: 'Lockton',
      content: 'Building with the Agentic Automation Engine - Mark Burtson case study',
      shareability: 'public',
      flags: ['featured'],
      source: 'Case Studies (EXTERNAL)'
    },
    {
      id: 3,
      type: 'testimonial',
      company: 'Equinix',
      content: 'Microsoft Teams is a powerful platform, and Moveworks makes it even more valuable. It\'s a symbiotic relationship.',
      shareability: 'sometimes',
      flags: ['needs_review'],
      source: 'Quotes'
    },
    {
      id: 4,
      type: 'webinar',
      company: 'Broadcom',
      content: 'How to build a better knowledge base - Customer webinar featuring Broadcom\'s transformation journey',
      shareability: 'public',
      flags: [],
      source: 'Webinar'
    },
    {
      id: 5,
      type: 'quote',
      company: 'AbbVie',
      content: 'The ROI we\'ve seen from Moveworks has exceeded our expectations, particularly in employee satisfaction scores.',
      shareability: 'internal',
      flags: ['sensitive'],
      source: 'Customer Story Database'
    },
    {
      id: 6,
      type: 'case_study',
      company: 'Northrop Grumman',
      content: 'Boosting Employee Engagement with Employee Comms - 170% stronger response rate than email campaigns',
      shareability: 'sometimes',
      flags: [],
      source: 'Customer Wins'
    },
    {
      id: 7,
      type: 'testimonial',
      company: 'AkzoNobel',
      content: 'Supporting the Digital Transformation Journey at AkzoNobel - comprehensive spotlight story',
      shareability: 'public',
      flags: ['featured'],
      source: 'Customer Spotlight'
    },
    {
      id: 8,
      type: 'quote',
      company: 'Albemarle',
      content: 'Our employees have embraced the chatbot technology, and we\'ve seen significant improvements in ticket resolution times.',
      shareability: 'public',
      flags: ['churned'],
      source: 'Quotes'
    },
    {
      id: 9,
      type: 'case_study',
      company: 'TechCorp',
      content: 'INTERNAL ONLY - Detailed implementation case study with sensitive financial metrics and internal processes',
      shareability: 'internal',
      flags: ['confidential'],
      source: 'Case Studies (INTERNAL)'
    },
    {
      id: 10,
      type: 'webinar',
      company: 'Global Manufacturing Inc',
      content: 'Scaling IT Support in Manufacturing - Joint webinar discussing automation in industrial environments',
      shareability: 'public',
      flags: ['obsolete'],
      source: 'Webinar'
    },
    {
      id: 11,
      type: 'quote',
      company: 'FinanceFirst',
      content: 'Moveworks has revolutionized how our employees interact with IT, reducing our help desk load by 60%.',
      shareability: 'sometimes',
      flags: ['needs_approval'],
      source: 'Customer Story Database'
    },
    {
      id: 12,
      type: 'testimonial',
      company: 'RetailGiant',
      content: 'The integration with our existing systems was seamless, and our employees adopted it faster than any previous tool.',
      shareability: 'public',
      flags: ['recent'],
      source: 'Testimonial Tracker'
    }
  ];

  useEffect(() => {
    setCustomerData(mockData);
    setFilteredData(mockData);
  }, []);

  useEffect(() => {
    let filtered = customerData;

    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedDataType !== 'all') {
      filtered = filtered.filter(item => item.type === selectedDataType);
    }

    setFilteredData(filtered);
  }, [searchTerm, selectedDataType, customerData]);

  const addFlag = (itemId, flagName) => {
    setCustomerData(prev =>
      prev.map(item =>
        item.id === itemId
          ? { ...item, flags: [...new Set([...item.flags, flagName])] }
          : item
      )
    );
  };

  const handleAddContent = (newContent) => {
    setCustomerData(prev => [...prev, newContent]);
    setShowAddForm(false);
  };
  const exportToCSV = (dataToExport, filename) => {
    const headers = [
      'Company', 'Industry', 'Employees', 'Type', 'Content', 'Shareability',
      'Value Driver', 'Business Outcome', 'Flags', 'Source', 'External Link'
    ];

    const csvContent = [
      headers.join(','), // Header row
      ...dataToExport.map(item => [
        `"${item.company || ''}"`,
        `"${item.industry || ''}"`,
        `"${item.employees || ''}"`,
        `"${item.type || ''}"`,
        `"${(item.content || '').replace(/"/g, '""')}"`, // Escape quotes
        `"${item.shareability || ''}"`,
        `"${item.valueDriver || ''}"`,
        `"${item.businessOutcome || ''}"`,
        `"${(item.flags || []).join('; ')}"`,
        `"${item.source || ''}"`,
        `"${item.externalLink || ''}"`
      ].join(','))
    ].join('\n');

    // Create and download file
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="app-container">
      <div className="max-width">
        {/* Header with Add Button */}
        <div className="header">
          <div className="header-top">
            <div>
              <h1>Customer Data Manager</h1>
              <p>Search and manage customer content with governance controls</p>
            </div>
            <div className="header-buttons">
              <button
                onClick={() => exportToCSV(filteredData, 'customer-data-filtered.csv')}
                className="btn-export"
              >
                📥 Export Results ({filteredData.length})
              </button>
              <button
                onClick={() => exportToCSV(customerData, 'customer-data-all.csv')}
                className="btn-export"
              >
                📥 Export All ({customerData.length})
              </button>
              <button
                onClick={() => setShowAddForm(true)}
                className="btn-add-content"
              >
                + Add New Content
              </button>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="search-section">
          <div className="search-controls">
            <input
              type="text"
              placeholder="Search companies, quotes, content..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
            <select
              value={selectedDataType}
              onChange={(e) => setSelectedDataType(e.target.value)}
              className="select-input"
            >
              <option value="all">All Content Types</option>
              <option value="quote">Quotes</option>
              <option value="case_study">Case Studies</option>
              <option value="testimonial">Testimonials</option>
              <option value="webinar">Webinars</option>
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="results-container">
          {filteredData.map(item => (
            <div key={item.id} className="result-card clickable" onClick={() => handleEditRecord(item)}>
              <div className="result-header">
                <div>
                  <h3 className="result-title">{item.company}</h3>
                  <div className="result-meta">
                    {item.source} • {item.type.replace('_', ' ')}
                  </div>
                </div>
                <div>
                  <span className={`badge badge-${item.shareability}`}>
                    {item.shareability.toUpperCase()}
                  </span>
                </div>
              </div>

              <p className="result-content">{item.content}</p>
              <div className="result-footer">
                <div className="flags-container">
                  {item.flags.map(flag => (
                    <span key={flag} className={`flag flag-${flag}`}>
                      {flag.replace('_', ' ')}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredData.length === 0 && (
          <div className="no-results">
            <p>No results found. Try adjusting your search or filters.</p>
          </div>
        )}
      </div>

      {/* Comprehensive Form Modal */}
      {showAddForm && (
        <ComprehensiveForm
          onAdd={editingRecord ? handleUpdateContent : handleAddContent}
          onCancel={() => {
            setShowAddForm(false);
            setEditingRecord(null);
          }}
          editingRecord={editingRecord}
        />
      )}
    </div>
  );
};

export default App;