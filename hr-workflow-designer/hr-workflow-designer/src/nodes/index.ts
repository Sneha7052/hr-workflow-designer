import { StartNode } from './StartNode';
import { TaskNode } from './TaskNode';
import { ApprovalNode } from './ApprovalNode';
import { AutomatedStepNode } from './AutomatedStepNode';
import { EndNode } from './EndNode';
import type { NodeType } from '../types/workflow';

export const nodeTypes: Record<NodeType, any> = {
  startNode: StartNode,
  taskNode: TaskNode,
  approvalNode: ApprovalNode,
  automatedStepNode: AutomatedStepNode,
  endNode: EndNode,
};
