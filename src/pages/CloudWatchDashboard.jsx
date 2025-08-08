import React from 'react';

const CloudWatchDashboard = () => {
  const dashboardUrl = "https://cloudwatch.amazonaws.com/dashboard.html?dashboard=goorm-cloudwatch&context=eyJSIjoidXMtZWFzdC0xIiwiRCI6ImN3LWRiLTAwNDQwNzE1NzcwNCIsIlUiOiJ1cy1lYXN0LTFfTDBWYlBja3VSIiwiQyI6Ijc2Mzl2M21kbTc1OXVuYnNlM3I4bHBtZWJmIiwiSSI6InVzLWVhc3QtMToxNTJjMzNkMS1kZjEzLTQ0ZDctOWIwNS04YjEwZDk3ZjI5NWEiLCJNIjoiUHVibGljIn0=";

  return (
    <div style={{ padding: '20px', backgroundColor: '#f0f2f5' }}>
      <h1>AWS CloudWatch 대시보드</h1>
      
      <iframe
        src={dashboardUrl}
        title="AWS CloudWatch Dashboard"
        width="100%"
        height="700px"
        frameBorder="0"
        allowFullScreen
        style={{ border: '1px solid #ddd', borderRadius: '8px' }}
      ></iframe>
    </div>
  );
};

export default CloudWatchDashboard;