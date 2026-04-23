import React, { useCallback, useRef } from 'react';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
  useReactFlow,
} from 'reactflow';

import { v4 as uuidv4 } from 'uuid';
import { useWorkflowStore } from '../../store/useWorkflowStore';
import { nodeTypes } from '../../nodes';
import type { NodeType, WorkflowNode } from '../../types/workflow';


const Flow = () => {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { project } = useReactFlow();
  
  const { 
    nodes, 
    edges, 
    onNodesChange, 
    onEdgesChange, 
    onConnect, 
    addNode,
    setSelectedNodeId
  } = useWorkflowStore();

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow') as NodeType;

      if (typeof type === 'undefined' || !type) {
        return;
      }

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect();
      
      if (!reactFlowBounds) return;

      const position = project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      // Enforce only one start node rule
      if (type === 'startNode' && nodes.some(n => n.type === 'startNode')) {
        alert('A workflow can only have one Start Node.');
        return;
      }

      const newNode: WorkflowNode = {
        id: uuidv4(),
        type,
        position,
        data: { title: `New ${type.replace('Node', '')}` },
      };

      addNode(newNode);
    },
    [project, nodes, addNode]
  );

  return (
    <div className="w-full h-full" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onInit={(instance) => instance.fitView()}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onSelectionChange={useCallback((params: { nodes: WorkflowNode[] }) => {
          if (params.nodes.length > 0) {
            setSelectedNodeId(params.nodes[0].id);
          } else {
            setSelectedNodeId(null);
          }
        }, [setSelectedNodeId])}
        nodeTypes={nodeTypes}
        fitView
        className="bg-slate-50"
      >
        <Background color="#cbd5e1" gap={16} />
        <Controls className="bg-white shadow-md border-slate-200 rounded-md overflow-hidden" />
        <MiniMap 
          nodeColor={(node) => {
            switch (node.type) {
              case 'startNode': return '#10b981'; // emerald-500
              case 'taskNode': return '#6366f1'; // indigo-500
              case 'approvalNode': return '#f59e0b'; // amber-500
              case 'automatedStepNode': return '#a855f7'; // purple-500
              case 'endNode': return '#f43f5e'; // rose-500
              default: return '#cbd5e1'; // slate-300
            }
          }}
          className="bg-white border border-slate-200 shadow-md rounded-lg"
          maskColor="rgba(241, 245, 249, 0.6)"
        />
      </ReactFlow>
    </div>
  );
};

export default function WorkflowCanvas() {
  return (
    <div className="w-full h-full flex flex-col relative">
      <ReactFlowProvider>
        <Flow />
      </ReactFlowProvider>
    </div>
  );
}
