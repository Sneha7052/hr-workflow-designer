import type { WorkflowNode, WorkflowEdge } from '../types/workflow';

// Mock data
const mockAutomations = [
  { id: "send_email", label: "Send Email", params: ["to", "subject"] },
  { id: "generate_doc", label: "Generate Document", params: ["template", "recipient"] },
  { id: "update_db", label: "Update Database", params: ["table", "recordId"] }
];

export const getAutomations = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockAutomations);
    }, 500);
  });
};

export const simulateWorkflow = async (nodes: WorkflowNode[], edges: WorkflowEdge[], onLog: (log: string) => void) => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      // 1. Validation
      const startNodes = nodes.filter(n => n.type === 'startNode');
      const endNodes = nodes.filter(n => n.type === 'endNode');
      
      if (startNodes.length === 0) throw new Error("Workflow must have a Start Node.");
      if (startNodes.length > 1) throw new Error("Workflow can only have one Start Node.");
      if (endNodes.length === 0) throw new Error("Workflow must have at least one End Node.");
      
      const startNode = startNodes[0];
      
      // Basic cycle detection and traversal
      const visited = new Set<string>();
      let currentNodeId: string | null = startNode.id;
      
      onLog(`Starting workflow simulation...`);
      
      while (currentNodeId) {
        if (visited.has(currentNodeId)) {
          throw new Error(`Cycle detected at node ${currentNodeId}. Workflows must be acyclic.`);
        }
        
        visited.add(currentNodeId);
        
        const node = nodes.find(n => n.id === currentNodeId);
        if (!node) throw new Error(`Node ${currentNodeId} not found.`);
        
        onLog(`Executing [${node.type}]: ${node.data.title || 'Untitled'}`);
        
        // Simulate execution time
        await new Promise(r => setTimeout(r, 800));
        
        if (node.type === 'endNode') {
          onLog(`Workflow terminated successfully at End Node: ${node.data.endMessage || ''}`);
          break;
        }
        
        // Find next node
        const outgoingEdges = edges.filter(e => e.source === currentNodeId);
        
        if (outgoingEdges.length === 0) {
          throw new Error(`Node ${node.data.title} is a dead end. Workflows must terminate at an End Node.`);
        }
        
        if (outgoingEdges.length > 1) {
          // For simplicity in this mock, we just follow the first edge unless it's a branch node (which we don't have strictly defined logic for here)
          onLog(`Multiple outgoing edges found. Following default path...`);
        }
        
        currentNodeId = outgoingEdges[0].target;
      }
      
      resolve();
    } catch (err: any) {
      onLog(`ERROR: ${err.message}`);
      reject(err);
    }
  });
};
