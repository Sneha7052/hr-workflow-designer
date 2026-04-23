import { create } from 'zustand';
import { addEdge, applyNodeChanges, applyEdgeChanges } from 'reactflow';
import type { Connection, EdgeChange, NodeChange, OnNodesChange, OnEdgesChange, OnConnect } from 'reactflow';
import type { WorkflowNode, WorkflowEdge, WorkflowNodeData } from '../types/workflow';

interface WorkflowState {
  nodes: WorkflowNode[];
  edges: WorkflowEdge[];
  selectedNodeId: string | null;
  simulationLogs: string[];
  isSimulating: boolean;
  
  onNodesChange: OnNodesChange;
  onEdgesChange: OnEdgesChange;
  onConnect: OnConnect;
  
  addNode: (node: WorkflowNode) => void;
  updateNodeData: (nodeId: string, data: Partial<WorkflowNodeData>) => void;
  setSelectedNodeId: (nodeId: string | null) => void;
  setNodes: (nodes: WorkflowNode[]) => void;
  setEdges: (edges: WorkflowEdge[]) => void;
  
  addSimulationLog: (log: string) => void;
  clearSimulationLogs: () => void;
  setIsSimulating: (isSimulating: boolean) => void;
}

export const useWorkflowStore = create<WorkflowState>((set, get) => ({
  nodes: [],
  edges: [],
  selectedNodeId: null,
  simulationLogs: [],
  isSimulating: false,

  onNodesChange: (changes: NodeChange[]) => {
    set({
      nodes: applyNodeChanges(changes, get().nodes) as WorkflowNode[],
    });
  },
  
  onEdgesChange: (changes: EdgeChange[]) => {
    set({
      edges: applyEdgeChanges(changes, get().edges) as WorkflowEdge[],
    });
  },
  
  onConnect: (connection: Connection) => {
    set({
      edges: addEdge(connection, get().edges),
    });
  },
  
  addNode: (node: WorkflowNode) => {
    set({
      nodes: [...get().nodes, node],
    });
  },
  
  updateNodeData: (nodeId: string, data: Partial<WorkflowNodeData>) => {
    set({
      nodes: get().nodes.map((node) => {
        if (node.id === nodeId) {
          return {
            ...node,
            data: { ...node.data, ...data },
          };
        }
        return node;
      }),
    });
  },
  
  setSelectedNodeId: (nodeId: string | null) => {
    if (get().selectedNodeId !== nodeId) {
      set({ selectedNodeId: nodeId });
    }
  },

  setNodes: (nodes: WorkflowNode[]) => set({ nodes }),
  setEdges: (edges: WorkflowEdge[]) => set({ edges }),
  
  addSimulationLog: (log: string) => set({ simulationLogs: [...get().simulationLogs, log] }),
  clearSimulationLogs: () => set({ simulationLogs: [] }),
  setIsSimulating: (isSimulating: boolean) => set({ isSimulating }),
}));
