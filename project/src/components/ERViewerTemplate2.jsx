import React from 'react';
import ReactFlow from 'reactflow';
import 'reactflow/dist/style.css';

const parseLabelHTML = (htmlString) => {
  return <div dangerouslySetInnerHTML={{ __html: htmlString }} />;
};

const ERViewerTemplate2 = ({ initialNodes, initialEdges }) => {
  const parsedNodes = initialNodes.map((node) => ({
    ...node,
    data: {
      ...node.data,
      label: parseLabelHTML(node.data.label),
    },
  }));

  return (
    <div className="w-full h-full" style={{ minHeight: '100%' }}>
      <ReactFlow
        nodes={parsedNodes}
        edges={initialEdges}
        defaultViewport={{ x: 0, y: 0, zoom: 0.5 }}
        fitView
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default ERViewerTemplate2;