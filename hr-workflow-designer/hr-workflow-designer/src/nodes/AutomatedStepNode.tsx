import { Handle, Position } from 'reactflow';
import type { NodeProps } from 'reactflow';
import { Zap } from 'lucide-react';
import type { WorkflowNodeData } from '../types/workflow';

export const AutomatedStepNode = ({ data, selected }: NodeProps<WorkflowNodeData>) => {
  return (
    <div className={`px-4 py-3 shadow-md rounded-xl bg-white border-2 min-w-[220px] ${
      selected ? 'border-purple-500 ring-2 ring-purple-200' : 'border-slate-200'
    } transition-all duration-200`}>
      <Handle
        type="target"
        position={Position.Top}
        className="w-3 h-3 bg-purple-500 border-2 border-white"
      />
      
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-md bg-purple-100 flex items-center justify-center text-purple-600">
          <Zap size={20} />
        </div>
        <div className="flex-1">
          <div className="text-sm font-bold text-slate-800">{data.title || 'Automated Step'}</div>
          {data.actionId && (
            <div className="text-xs text-slate-500 truncate mt-0.5">Action: {data.actionId}</div>
          )}
        </div>
      </div>
      
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-3 h-3 bg-purple-500 border-2 border-white"
      />
    </div>
  );
};
