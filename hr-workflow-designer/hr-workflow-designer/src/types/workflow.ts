import type { Node, Edge } from 'reactflow';

export type NodeType = 'startNode' | 'taskNode' | 'approvalNode' | 'automatedStepNode' | 'endNode';

export interface WorkflowNodeData {
  title: string;
  type?: NodeType;
  // Start Node
  metadata?: Record<string, string>;
  // Task Node
  description?: string;
  assignee?: string;
  dueDate?: string;
  customFields?: Record<string, string>;
  // Approval Node
  approverRole?: string;
  autoApproveThreshold?: number;
  // Automated Step Node
  actionId?: string;
  actionParams?: Record<string, string>;
  // End Node
  endMessage?: string;
  showSummary?: boolean;
  // Internal state
  error?: string;
}

export type WorkflowNode = Node<WorkflowNodeData, NodeType>;
export type WorkflowEdge = Edge;
